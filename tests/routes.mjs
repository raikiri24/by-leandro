import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
const base = process.env.TEST_BASE_URL || 'http://localhost:3100';
const canonicalOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.byleandro.space';
const sitemap = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemap.status, 200);
const xml = await sitemap.text();
const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
assert.equal(new Set(paths).size, paths.length);
const results = [];
for (const path of paths) {
  const response = await fetch(base + path);
  const html = await response.text();
  assert.equal(response.status, 200, path);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  assert.equal(new URL(canonical?.[1]).href, new URL(canonicalOrigin + path).href, `canonical ${path}`);
  assert.ok(html.includes('id="main-content"'), `skip target ${path}`);
  assert.ok(/<h1[ >]/.test(html), `heading ${path}`);
  assert.ok(/<meta name="description" content="[^"]+"/.test(html), `description ${path}`);
  assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), `indexability ${path}`);
  assert.ok(!/<script[^>]+src="[^"]*adsbygoogle/.test(html), `ad delivery ${path}`);
  assert.equal(new URL(html.match(/property="og:url" content="([^"]+)"/)?.[1]).href, new URL(canonicalOrigin + path).href, `social URL ${path}`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  assert.ok(schemas.length > 0, `schema ${path}`);
  if (path.startsWith('/articles/')) assert.ok(schemas.some(value => value['@type'] === 'BreadcrumbList'), path);
  // Every local page link in server HTML must resolve to a known route (anchors excluded).
  const links = [...html.matchAll(/<a[^>]* href="(\/[^"]*)"/g)].map(match => match[1].split(/[?#]/)[0]);
  for (const link of links) assert.ok(paths.includes(link), `${path} links to unknown page ${link}`);
  results.push({path, status: response.status, canonical: canonical?.[1], schemas: schemas.length});
}
const variant = await (await fetch(`${base}/articles?utm_source=test`)).text();
assert.ok(variant.includes(`rel="canonical" href="${canonicalOrigin}/articles"`));
if (base.startsWith('http://localhost') && canonicalOrigin === 'https://www.byleandro.space') {
  const redirect = await new Promise((resolve,reject) => {
    const request = http.get(base + '/articles?utm_source=test', {headers:{host:'byleandro.space'}}, response => {response.resume();resolve({status:response.statusCode,location:response.headers.location});});
    request.on('error',reject);
  });
  assert.equal(redirect.status,308);
  assert.equal(redirect.location,'https://www.byleandro.space/articles?utm_source=test');
}
const missing = await fetch(`${base}/not-a-real-page`);
assert.equal(missing.status, 404);
assert.match(await missing.text(), /name="robots" content="noindex/);
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
assert.ok(!robots.includes('Disallow: /_next'));
for (const endpoint of ['/api/feedback', '/api/usage', '/api/challonge']) {
  const response = await fetch(base + endpoint, {method: 'POST', headers: {origin: 'https://unrelated.invalid', 'content-type': 'application/json'}, body: '{}'});
  assert.equal(response.status, 403, endpoint);
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
  assert.equal((await response.json()).ok, false);
}
const health = await fetch(`${base}/api/health/mongodb`);
assert.ok([200, 500].includes(health.status));
assert.equal(health.headers.get('x-robots-tag'), 'noindex, nofollow');
const healthBody = await health.json();
assert.ok(!JSON.stringify(healthBody).includes('MONGODB_URI environment'));
fs.writeFileSync('/tmp/byleandro-route-results.json', JSON.stringify({results, checks: ['query canonical','404 status/noindex','robots','cross-origin POST denial on three APIs','health status and noindex']}, null, 2));
console.log(`PASS: ${results.length} public routes; sitemap, canonical/query, schema, local links, 404, robots and API origin checks.`);
