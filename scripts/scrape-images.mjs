import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_OUTPUT_DIR = "scrapped_images";
const FETCH_RETRIES = 2;

const CONTENT_TYPE_EXTENSIONS = new Map([
  ["image/jpeg", ".jpg"],
  ["image/jpg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["image/svg+xml", ".svg"],
  ["image/avif", ".avif"],
  ["image/bmp", ".bmp"],
  ["image/tiff", ".tiff"],
  ["image/x-icon", ".ico"],
  ["image/vnd.microsoft.icon", ".ico"],
]);

const URL_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".avif",
  ".bmp",
  ".tif",
  ".tiff",
  ".ico",
]);

function printUsage() {
  console.log("Usage: npm run scrape-images -- <links-file> [output-folder]");
  console.log("");
  console.log("Input file format:");
  console.log("- One direct image URL or web page URL per line");
  console.log("- Blank lines and lines starting with # are ignored");
}

function readInput(input) {
  const urls = [];
  let skipped = 0;

  for (const line of input.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed) {
      continue;
    }

    if (trimmed.startsWith("#")) {
      skipped += 1;
      continue;
    }

    urls.push(trimmed);
  }

  return { skipped, urls };
}

function normalizeContentType(contentType) {
  return contentType.split(";")[0].trim().toLowerCase();
}

function extensionFromContentType(contentType) {
  return CONTENT_TYPE_EXTENSIONS.get(normalizeContentType(contentType));
}

function extensionFromUrl(url) {
  try {
    const parsed = new URL(url);
    const extension = path.extname(parsed.pathname).toLowerCase();

    if (URL_EXTENSIONS.has(extension)) {
      return extension === ".jpeg" ? ".jpg" : extension;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function baseNameFromUrl(url, index) {
  let candidate = `image-${index}`;

  try {
    const parsed = new URL(url);
    const fileName = path.basename(parsed.pathname, path.extname(parsed.pathname));
    const decoded = decodeURIComponent(fileName);

    if (decoded) {
      candidate = decoded;
    }
  } catch {
    // Validation happens before download; keep the generated fallback name here.
  }

  const safeName = candidate
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return safeName || `image-${index}`;
}

async function pathExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

async function uniqueFilePath(outputDir, fileName, url) {
  const parsed = path.parse(fileName);
  let candidate = path.join(outputDir, fileName);

  if (!(await pathExists(candidate))) {
    return candidate;
  }

  const hash = createHash("sha256").update(url).digest("hex").slice(0, 8);
  candidate = path.join(outputDir, `${parsed.name}-${hash}${parsed.ext}`);

  if (!(await pathExists(candidate))) {
    return candidate;
  }

  for (let count = 2; ; count += 1) {
    candidate = path.join(outputDir, `${parsed.name}-${hash}-${count}${parsed.ext}`);

    if (!(await pathExists(candidate))) {
      return candidate;
    }
  }
}

function fail(reason) {
  return { ok: false, reason };
}

function parseHttpUrl(url) {
  try {
    const parsedUrl = new URL(url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return fail("Only HTTP and HTTPS URLs are supported");
    }

    return { ok: true, parsedUrl };
  } catch {
    return fail("Invalid URL");
  }
}

async function fetchUrl(url) {
  const parsed = parseHttpUrl(url);

  if (!parsed.ok) {
    return parsed;
  }

  let lastError = "Request failed";

  for (let attempt = 0; attempt <= FETCH_RETRIES; attempt += 1) {
    try {
      const response = await fetch(parsed.parsedUrl);

      if (!response.ok) {
        return fail(`HTTP ${response.status} ${response.statusText}`.trim());
      }

      return { ok: true, response };
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Request failed";

      if (attempt < FETCH_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
      }
    }
  }

  return fail(lastError);
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function maybeAbsoluteUrl(value, pageUrl) {
  const trimmed = decodeHtmlEntities(value.trim());

  if (!trimmed || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
    return undefined;
  }

  try {
    const parsed = new URL(trimmed, pageUrl);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return undefined;
    }

    return parsed.href;
  } catch {
    return undefined;
  }
}

function addUrl(urls, value, pageUrl) {
  const url = maybeAbsoluteUrl(value, pageUrl);

  if (url) {
    urls.add(url);
  }
}

function addSrcSetUrls(urls, srcset, pageUrl) {
  for (const candidate of srcset.split(",")) {
    const [url] = candidate.trim().split(/\s+/);
    addUrl(urls, url || "", pageUrl);
  }
}

function extractImageUrlsFromHtml(html, pageUrl) {
  const urls = new Set();

  for (const tagMatch of html.matchAll(/<(?:img|source)\b[^>]*>/gi)) {
    const tag = tagMatch[0];

    for (const match of tag.matchAll(/\b(?:src|data-src|data-original|data-lazy-src)=["']([^"']+)["']/gi)) {
      addUrl(urls, match[1], pageUrl);
    }

    for (const match of tag.matchAll(/\b(?:srcset|data-srcset)=["']([^"']+)["']/gi)) {
      addSrcSetUrls(urls, match[1], pageUrl);
    }
  }

  for (const match of html.matchAll(/<link\b[^>]*\brel=["'][^"']*(?:icon|image_src)[^"']*["'][^>]*\bhref=["']([^"']+)["'][^>]*>/gi)) {
    addUrl(urls, match[1], pageUrl);
  }

  for (const match of html.matchAll(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*\brel=["'][^"']*(?:icon|image_src)[^"']*["'][^>]*>/gi)) {
    addUrl(urls, match[1], pageUrl);
  }

  for (const match of html.matchAll(/<meta\b[^>]*\b(?:property|name)=["'][^"']*image[^"']*["'][^>]*\bcontent=["']([^"']+)["'][^>]*>/gi)) {
    addUrl(urls, match[1], pageUrl);
  }

  for (const match of html.matchAll(/<meta\b[^>]*\bcontent=["']([^"']+)["'][^>]*\b(?:property|name)=["'][^"']*image[^"']*["'][^>]*>/gi)) {
    addUrl(urls, match[1], pageUrl);
  }

  for (const match of html.matchAll(/url\((["']?)([^"')]+)\1\)/gi)) {
    addUrl(urls, match[2], pageUrl);
  }

  return [...urls];
}

async function saveImageResponse(url, response, index, outputDir) {
  const contentType = response.headers.get("content-type") || "";


  if (!normalizeContentType(contentType).startsWith("image/")) {
    return fail(contentType ? `Not an image response (${contentType})` : "Missing image content type");
  }

  const extension = extensionFromContentType(contentType) || extensionFromUrl(url) || ".img";
  const fileBaseName = `${String(index).padStart(3, "0")}-${baseNameFromUrl(url, index)}`;
  const filePath = await uniqueFilePath(outputDir, `${fileBaseName}${extension}`, url);
  const arrayBuffer = await response.arrayBuffer();

  await writeFile(filePath, Buffer.from(arrayBuffer));

  return {
    ok: true,
    filePath,
  };
}

async function downloadImage(url, index, outputDir) {
  const fetched = await fetchUrl(url);

  if (!fetched.ok) {
    return fetched;
  }

  return saveImageResponse(url, fetched.response, index, outputDir);
}

async function resolveImageUrls(url) {
  const fetched = await fetchUrl(url);

  if (!fetched.ok) {
    return fetched;
  }

  const contentType = fetched.response.headers.get("content-type") || "";
  const normalizedContentType = normalizeContentType(contentType);

  if (normalizedContentType.startsWith("image/")) {
    return { ok: true, urls: [url], sourceType: "image" };
  }

  if (!normalizedContentType.startsWith("text/html")) {
    return fail(contentType ? `Not an image or HTML response (${contentType})` : "Missing content type");
  }

  const html = await fetched.response.text();
  const imageUrls = extractImageUrlsFromHtml(html, url);

  if (imageUrls.length === 0) {
    return fail("No image URLs found on page");
  }

  return { ok: true, urls: imageUrls, sourceType: "page" };
}

async function main() {
  const [, , linksFile, outputFolder = DEFAULT_OUTPUT_DIR] = process.argv;

  if (!linksFile || linksFile === "--help" || linksFile === "-h") {
    printUsage();
    process.exitCode = linksFile ? 0 : 1;
    return;
  }

  const inputPath = path.resolve(process.cwd(), linksFile);
  const outputDir = path.resolve(process.cwd(), outputFolder);

  let input;

  try {
    input = await readFile(inputPath, "utf8");
  } catch (error) {
    console.error(`Could not read links file: ${inputPath}`);
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
    return;
  }

  const { skipped, urls } = readInput(input);

  if (urls.length === 0) {
    console.log("No image URLs found in the input file.");
    return;
  }

  await mkdir(outputDir, { recursive: true });

  let downloaded = 0;
  let failed = 0;
  const seenImageUrls = new Set();

  console.log(`Saving images to ${path.relative(process.cwd(), outputDir) || "."}`);

  for (const url of urls) {
    const resolved = await resolveImageUrls(url);

    if (!resolved.ok) {
      failed += 1;
      console.log(`[failed] ${url} (${resolved.reason})`);
      continue;
    }

    if (resolved.sourceType === "page") {
      console.log(`[page] ${url} (${resolved.urls.length} image URL${resolved.urls.length === 1 ? "" : "s"} found)`);
    }

    for (const imageUrl of resolved.urls) {
      if (seenImageUrls.has(imageUrl)) {
        skipped += 1;
        console.log(`[skipped] ${imageUrl} (duplicate)`);
        continue;
      }

      seenImageUrls.add(imageUrl);

      const index = downloaded + 1;
      const result = await downloadImage(imageUrl, index, outputDir);

      if (result.ok) {
        downloaded += 1;
        console.log(`[downloaded] ${imageUrl} -> ${path.relative(process.cwd(), result.filePath)}`);
      } else {
        failed += 1;
        console.log(`[failed] ${imageUrl} (${result.reason})`);
      }
    }
  }

  console.log("");
  console.log("Done.");
  console.log(`Downloaded: ${downloaded}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);

  if (failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : error);
  process.exitCode = 1;
});
