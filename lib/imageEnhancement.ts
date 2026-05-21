export interface Adjustments {
  brightness: number;  // -100 to 100
  contrast: number;    // -100 to 100
  saturation: number;  // -100 to 100
  sharpness: number;   // 0 to 100
}

export const DEFAULT_ADJUSTMENTS: Adjustments = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  sharpness: 0,
};

function clamp(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)));
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r
    ? (g - b) / d + (g < b ? 6 : 0)
    : max === g ? (b - r) / d + 2
    : (r - g) / d + 4;
  return [h / 6, s, l];
}

function hue2rgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

export async function blobToImageData(blob: Blob): Promise<ImageData> {
  const url = URL.createObjectURL(blob);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      resolve(ctx.getImageData(0, 0, canvas.width, canvas.height));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Failed to load image")); };
    img.src = url;
  });
}

export function imageDataToCanvas(imageData: ImageData): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  canvas.getContext("2d")!.putImageData(imageData, 0, 0);
  return canvas;
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error("toBlob failed")),
      "image/png",
      1.0,
    );
  });
}

// Sharpen alpha edges with an S-curve. crispness 0 = original, 100 = hard cutout.
export function refineAlphaEdges(imageData: ImageData, crispness: number): ImageData {
  if (crispness <= 0) return imageData;

  const { data, width, height } = imageData;
  const result = new Uint8ClampedArray(data);

  const c = Math.min(crispness, 100) / 100;

  for (let i = 3; i < data.length; i += 4) {
    const a = data[i];
    if (a === 0 || a === 255) continue;

    const n = a / 255;
    // S-curve: pushes near-0 toward 0 and near-255 toward 255
    const curved = n < 0.5
      ? 0.5 * Math.pow(2 * n, 1 + c * 5)
      : 1 - 0.5 * Math.pow(2 * (1 - n), 1 + c * 5);

    result[i] = clamp(curved * 255);
  }

  // Morphological erosion pass to remove 1px fringe at crispness > 40
  if (crispness > 40) {
    const erosionStrength = (crispness - 40) / 60; // 0 to 1
    if (erosionStrength > 0) {
      erodeAlpha(result, width, height, 1, erosionStrength);
    }
  }

  return new ImageData(result, width, height);
}

// Erode the alpha mask to remove background-color fringe pixels.
// strength: 0 = no effect, 1 = full 1px erosion
function erodeAlpha(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  radius: number,
  strength: number,
): void {
  const alphaSnapshot = new Uint8Array(width * height);
  for (let i = 0; i < alphaSnapshot.length; i++) alphaSnapshot[i] = data[i * 4 + 3];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (alphaSnapshot[idx] === 0) continue;

      let minNeighbor = 255;
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const ny = y + dy, nx = x + dx;
          if (ny < 0 || ny >= height || nx < 0 || nx >= width) {
            minNeighbor = 0;
          } else {
            minNeighbor = Math.min(minNeighbor, alphaSnapshot[ny * width + nx]);
          }
        }
      }

      // Blend between original and eroded based on strength
      const eroded = minNeighbor;
      data[idx * 4 + 3] = clamp(data[idx * 4 + 3] * (1 - strength) + eroded * strength);
    }
  }
}

// Apply brightness/contrast/saturation/sharpness adjustments.
// Optionally composite onto a solid background color (e.g. for JPG export).
export async function applyAdjustments(
  imageData: ImageData,
  adj: Adjustments,
  bgColor: string | null,
): Promise<ImageData> {
  const { data, width, height } = imageData;
  const result = new Uint8ClampedArray(data);

  const hasAdj = adj.brightness !== 0 || adj.contrast !== 0 || adj.saturation !== 0;

  // Precompute contrast factor (Photoshop-style formula)
  const cf = adj.contrast !== 0
    ? (259 * (adj.contrast + 255)) / (255 * (259 - adj.contrast))
    : 1;

  if (hasAdj) {
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) continue;

      let r = data[i], g = data[i + 1], b = data[i + 2];

      if (adj.brightness !== 0) {
        const bv = adj.brightness * 2.55;
        r = clamp(r + bv); g = clamp(g + bv); b = clamp(b + bv);
      }

      if (adj.contrast !== 0) {
        r = clamp(cf * (r - 128) + 128);
        g = clamp(cf * (g - 128) + 128);
        b = clamp(cf * (b - 128) + 128);
      }

      if (adj.saturation !== 0) {
        const [h, s, l] = rgbToHsl(r, g, b);
        const ns = Math.max(0, Math.min(1, s + adj.saturation / 100));
        [r, g, b] = hslToRgb(h, ns, l);
      }

      result[i] = r; result[i + 1] = g; result[i + 2] = b;
    }
  }

  let out = new ImageData(result, width, height);

  if (adj.sharpness > 0) {
    out = await applyUnsharpMask(out, adj.sharpness);
  }

  if (bgColor) {
    out = compositeOnBackground(out, bgColor);
  }

  return out;
}

async function applyUnsharpMask(imageData: ImageData, amount: number): Promise<ImageData> {
  const { width, height } = imageData;

  const srcCanvas = imageDataToCanvas(imageData);

  const blurCanvas = document.createElement("canvas");
  blurCanvas.width = width;
  blurCanvas.height = height;
  const blurCtx = blurCanvas.getContext("2d")!;
  // Two-pass blur for stronger effect at higher sharpness values
  const blurRadius = 0.5 + amount / 100;
  blurCtx.filter = `blur(${blurRadius.toFixed(1)}px)`;
  blurCtx.drawImage(srcCanvas, 0, 0);
  const blurred = blurCtx.getImageData(0, 0, width, height);

  const src = imageData.data;
  const blr = blurred.data;
  const result = new Uint8ClampedArray(src);
  const scale = (amount / 100) * 1.2; // cap at 1.2× to avoid halos

  for (let i = 0; i < src.length; i += 4) {
    if (src[i + 3] === 0) continue;
    result[i] = clamp(src[i] + scale * (src[i] - blr[i]));
    result[i + 1] = clamp(src[i + 1] + scale * (src[i + 1] - blr[i + 1]));
    result[i + 2] = clamp(src[i + 2] + scale * (src[i + 2] - blr[i + 2]));
  }

  return new ImageData(result, width, height);
}

function compositeOnBackground(imageData: ImageData, bgColor: string): ImageData {
  const { width, height } = imageData;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(imageDataToCanvas(imageData), 0, 0);
  return ctx.getImageData(0, 0, width, height);
}

// Build the CSS filter string for real-time preview (instant, no pixel processing).
export function buildCssFilter(adj: Adjustments): string {
  const parts: string[] = [];
  if (adj.brightness !== 0)
    parts.push(`brightness(${(1 + adj.brightness / 100).toFixed(3)})`);
  if (adj.contrast !== 0)
    parts.push(`contrast(${(1 + adj.contrast / 100).toFixed(3)})`);
  if (adj.saturation !== 0)
    parts.push(`saturate(${Math.max(0, 1 + adj.saturation / 100).toFixed(3)})`);
  return parts.length ? parts.join(" ") : "none";
}

// SVG convolution kernel for sharpness preview (injected inline in the page).
export function buildSharpenKernelValues(sharpness: number): string {
  const s = (sharpness / 100) * 0.5; // keep subtle to avoid artifacts
  return `0 -${s} 0 -${s} ${1 + 4 * s} -${s} 0 -${s} 0`;
}
