const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
// Load project TypeScript without adding a runtime dependency or emitting files.
const cache = new Map();
function load(file) {
  const absolute = path.resolve(file);
  if (cache.has(absolute)) return cache.get(absolute).exports;
  const loaded = { exports: {} }; cache.set(absolute, loaded);
  const code = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  new Function('require', 'module', 'exports', code)(name => name.startsWith('.') ? load(path.resolve(path.dirname(absolute), name + '.ts')) : name.startsWith('@/') ? load(name.slice(2) + '.ts') : require(name), loaded, loaded.exports);
  return loaded.exports;
}
const consent = load('lib/consent.ts');
const ads = load('lib/ad-policy.ts');
const seo = load('lib/seo.ts');
const parts = load('lib/beybladeParts.ts');

test('missing, malformed, expired, future and legacy consent fail closed', () => {
  for (const raw of [null, '{}', 'oops', JSON.stringify({analytics: true}), JSON.stringify({analytics: 'true', decidedAt: new Date().toISOString()}), JSON.stringify({analytics: true, decidedAt: '2020-01-01'}), JSON.stringify({analytics: true, decidedAt: '2099-01-01'})]) assert.equal(consent.parseConsent(raw), null);
  assert.equal(consent.parseConsent(JSON.stringify({analytics: false, decidedAt: new Date().toISOString()})).analytics, false);
  assert.equal(consent.parseConsent(JSON.stringify({analytics: true, decidedAt: new Date().toISOString()})).analytics, true);
});
test('storage failures deny analytics', () => {
  global.window = { localStorage: { getItem() { throw new Error('blocked'); } } };
  assert.equal(consent.analyticsAllowed(), false); delete global.window;
});
test('ads fail closed until CMP and placements are integrated', () => {
  for (const route of [...ads.AD_REVIEW_CANDIDATES, '/', '/tool', '/deck-builder', '/bg-remover', '/privacy', '/api/usage', '/missing', '/articles/unknown']) {
    for (const content of ['reviewed-editorial', 'ugc', 'empty', 'error', 'private', 'reported', 'deleted']) {
      for (const choice of ['verified-cmp-granted', 'denied', 'unknown']) assert.equal(ads.canShowAds({path: route, content, consent: choice, placementReviewed: true}), false);
    }
  }
  assert.equal(ads.APPROVED_AD_ROUTES.length, 0);
});
test('metadata uses exact page identity and rejects external/query canonicals', () => {
  const result = seo.pageMetadata('Deck guide', 'Specific instructions', '/articles/deck', true);
  assert.equal(result.alternates.canonical, '/articles/deck');
  assert.equal(result.openGraph.url, '/articles/deck');
  assert.equal(result.twitter.title, 'Deck guide');
  assert.equal(result.openGraph.type, 'article');
  for (const bad of ['https://evil.test', '//evil.test', '/tool?sort=1', '/tool#x', '/<script>']) assert.throws(() => seo.pageMetadata('x', 'x', bad));
});
test('structured data cannot close its script element', () => {
  const payload = { name: '</script><script>alert(1)</script>' };
  const encoded = seo.serializeJsonLd(payload);
  assert.ok(!encoded.includes('<'));
  assert.deepEqual(JSON.parse(encoded), payload);
});
test('sitemap contains each real public page exactly once and no system paths', () => {
  const sitemap = load('app/sitemap.ts').default();
  const urls = sitemap.map(item => item.url);
  assert.equal(new Set(urls).size, urls.length);
  const pages = fs.readdirSync('app', {recursive: true}).filter(file => /(^|\/)page\.tsx$/.test(file));
  for (const file of pages) {
    const route = '/' + file.replace(/(^|\/)page\.tsx$/, '');
    assert.ok(urls.includes('https://www.byleandro.space' + route), route);
  }
  for (const url of urls) assert.ok(!/\/api\/|\?|#|\/login|\/admin/.test(url));
});
test('deck growth preserves existing selections and avoids duplicate parts', () => {
  const first = parts.createStandardBuild();
  const deck = parts.withBuildCount([first], 6);
  assert.deepEqual(deck[0], first);
  for (const field of ['bladeId', 'bitId']) assert.equal(new Set(deck.map(build => build[field])).size, 6);
  const separateRatchets = deck.filter(build => !parts.findPart(parts.STANDARD_BLADES, build.bladeId)?.integratedRatchet);
  assert.equal(new Set(separateRatchets.map(build => build.ratchetId)).size, separateRatchets.length);
  assert.deepEqual(parts.withBuildCount(deck, 3), deck.slice(0, 3));
});
test('integrated ratchets and optional armor follow documented picker rules', () => {
  const blade = parts.STANDARD_BLADES.find(part => part.integratedRatchet);
  assert.ok(blade);
  const build = {...parts.createStandardBuild(), bladeId: blade.id};
  assert.equal(parts.collectUsedPartIds([build]).ratchet.size, 0);
  const cx = parts.createCxBuild();
  assert.equal(parts.collectUsedPartIds([cx]).armor.size, 0);
  const used = new Set([parts.ALL_BITS[0].id]);
  assert.ok(!parts.availableOptions(parts.ALL_BITS, used).some(part => used.has(part.id)));
  assert.ok(parts.availableOptions(parts.ALL_BITS, used, parts.ALL_BITS[0].id).some(part => used.has(part.id)));
});
test('robots leaves rendering assets and public noindex responses crawlable', () => {
  const robots = load('app/robots.ts').default();
  assert.equal(robots.rules.allow, '/');
  assert.ok(!robots.rules.disallow.some(rule => rule.includes('_next')));
  assert.equal(robots.sitemap, 'https://www.byleandro.space/sitemap.xml');
});

test('API contracts preserve usage, feedback and import behavior with mocked dependencies', async () => {
  let writes = [];
  const collection = {
    createIndex: async () => {}, countDocuments: async () => 2,
    updateOne: async (...args) => writes.push(args),
    insertOne: async entry => { writes.push(entry); return {insertedId: {toString: () => 'test-id'}}; },
  };
  cache.set(path.resolve('lib/mongodb.ts'), {exports: {getAppDatabase: async () => ({collection: () => collection, command: async () => ({ok:1})})}});
  cache.set(path.resolve('lib/rateLimit.ts'), {exports: {
    isSameOriginRequest: () => true, getClientIp: () => 'test',
    checkRateLimit: async () => ({allowed: true}), rateLimitResponse: () => Response.json({}, {status:429}),
  }});
  const usage = load('app/api/usage/route.ts');
  const post = (route, payload) => new Request(`http://localhost${route}`, {method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
  assert.equal((await usage.POST(post('/api/usage',{sessionId:'bad'}))).status,400);
  assert.equal((await usage.POST(post('/api/usage',{sessionId:'1234567890abcdef'}))).status,200);
  assert.equal(writes.length,1);
  assert.equal((await (await usage.GET(new Request('http://localhost/api/usage'))).json()).data.totalUsers,2);
  const feedback=load('app/api/feedback/route.ts');
  assert.equal((await feedback.POST(post('/api/feedback',{category:'spam'}))).status,400);
  const submitted=await feedback.POST(post('/api/feedback',{category:'problem',title:'Export issue',message:'The exported image is missing its logo.',page:'/tool'}));
  assert.equal(submitted.status,200);
  assert.equal(writes[1].message,'The exported image is missing its logo.');
  assert.equal(writes[1].sessionId,undefined);
  const originalFetch=global.fetch;
  try {
    const fetched=[];
    global.fetch=async url => {
      fetched.push(url);
      return Response.json({tournament:{name:'Fixture tournament',tournament_type:'swiss',participants:[{participant:{id:1,name:'Fixture A'}},{participant:{id:2,name:'Fixture B'}}],matches:[{match:{state:'complete',scores_csv:'4-2',player1_id:1,player2_id:2,winner_id:1,round:1}}]}});
    };
    const importer=load('app/api/challonge/route.ts');
    const result=await importer.POST(post('/api/challonge',{url:'https://challonge.com/fixture'}));
    assert.equal(result.status,200);
    const data=await result.json();
    assert.equal(data.ok,true);
    assert.ok(fetched.every(url=>new URL(url).hostname==='challonge.com'));
    assert.ok(JSON.stringify(data).includes('Fixture A'));
  } finally { global.fetch=originalFetch; }
});
