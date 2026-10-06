const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
// Load project TypeScript without adding a runtime dependency or emitting files.
const cache = new Map();
function load(file) {
  const absolute = path.resolve(file);
  if (cache.has(absolute)) return cache.get(absolute).exports;
  const loaded = { exports: {} };
  cache.set(absolute, loaded);
  const code = ts.transpileModule(fs.readFileSync(absolute, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  new Function("require", "module", "exports", code)(
    (name) =>
      name.startsWith(".")
        ? load(path.resolve(path.dirname(absolute), name + ".ts"))
        : name.startsWith("@/")
          ? load(name.slice(2) + ".ts")
          : require(name),
    loaded,
    loaded.exports,
  );
  return loaded.exports;
}
const seo = load("lib/seo.ts");
test("each sitemap entry matches a real page and a single configured origin", () => {
  const site = load("lib/site.ts");
  const entries = load("app/sitemap.ts").default();
  const urls = entries.map((item) => item.url);
  assert.equal(new Set(urls).size, urls.length);
  const pages = fs
    .readdirSync("app", { recursive: true })
    .filter((file) => /(^|\/)page\.tsx$/.test(file));
  for (const file of pages) {
    const route = "/" + file.replace(/(^|\/)page\.tsx$/, "");
    assert.ok(urls.includes(site.SITE_URL + route), route);
  }
  assert.equal(urls.length, pages.length);
  assert.ok(entries.every((item) => !item.lastModified));
  assert.equal(
    load("app/robots.ts").default().sitemap,
    site.SITE_URL + "/sitemap.xml",
  );
});
test("metadata uses exact page identity and rejects invalid canonicals", () => {
  const result = seo.pageMetadata(
    "ERP",
    "Custom modules",
    "/services/erp-development",
  );
  assert.equal(result.alternates.canonical, "/services/erp-development");
  assert.equal(result.openGraph.url, "/services/erp-development");
  for (const bad of [
    "https://evil.test",
    "//evil.test",
    "/tool?sort=1",
    "/tool#x",
    "/<script>",
  ])
    assert.throws(() => seo.pageMetadata("x", "x", bad));
});
test("structured data cannot close its script element", () => {
  const payload = { name: "</script><script>alert(1)</script>" };
  const encoded = seo.serializeJsonLd(payload);
  assert.ok(!encoded.includes("<"));
  assert.deepEqual(JSON.parse(encoded), payload);
});
