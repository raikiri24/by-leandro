// Samples an image and returns its most prominent colors as "r, g, b" strings,
// skipping near-white/near-black/low-saturation pixels so logos on transparent
// or white backgrounds still yield usable accent colors.
export async function extractPalette(src: string, count = 2): Promise<string[]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const size = 48;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve([]);
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        const buckets = new Map<string, { count: number; r: number; g: number; b: number }>();
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 200) continue;

          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          if (max > 240 && min > 240) continue; // near-white
          if (max < 20) continue; // near-black
          if (max - min < 12) continue; // low saturation / gray

          const key = `${r >> 4},${g >> 4},${b >> 4}`;
          const bucket = buckets.get(key) || { count: 0, r: 0, g: 0, b: 0 };
          bucket.count += 1;
          bucket.r += r;
          bucket.g += g;
          bucket.b += b;
          buckets.set(key, bucket);
        }

        const sorted = [...buckets.values()].sort((a, b) => b.count - a.count);
        resolve(
          sorted.slice(0, count).map((bucket) => {
            const r = Math.round(bucket.r / bucket.count);
            const g = Math.round(bucket.g / bucket.count);
            const b = Math.round(bucket.b / bucket.count);
            return `${r}, ${g}, ${b}`;
          }),
        );
      } catch {
        resolve([]);
      }
    };
    img.onerror = () => resolve([]);
    img.src = src;
  });
}
