# Repository audit and implementation plan — 2026-09-08

Scope confirmed by owner: remediate by.leandro using its actual features, not the PBT application in the original brief. No files were changed before repository discovery and route/dependency inspection.

## Architecture and dependencies

Next.js App Router, installed/locked Next 15.5.18 (manifest ^15.1.0), React 19, TypeScript, Tailwind, AWS Amplify. Static public server pages surround three client editors. No middleware, authentication, authorization roles, dynamic user routes, public UGC database, dashboard, forum, tournament history, profiles, loadout persistence, or admin routes exist. Amplify contains unused AUTH variables; these do not implement authentication.

MongoDB supports usage, feedback and rate limiting. Challonge imports use fixed upstream hosts, optional server API key, four fallback strategies and timeouts. Same-origin checks and database rate limits protect public POST endpoints; these are abuse controls, not authentication. Editor content and images stay in browser memory; exported images are downloaded. Background removal dynamically imports IMG.LY and downloads model assets. Deck data comes from a generated local part catalog. Large tool page contains card, poster, winner, deck, feedback and export workflows; preserve these implementations.

Existing public content: substantial homepage, about, contact, FAQ, policies, changelog, five static articles with related links, Article and breadcrumb schema. Root adds WebApplication and Organization schema on every page. All pages have canonical paths except homepage inherits root. Social metadata is partly inherited from homepage. Robots blocks APIs; sitemap explicitly lists public routes. Existing 404, route and global error boundaries; editors have processing/error/empty states. No maintenance mode or authenticated 403 page is needed; APIs already return 403 for cross-origin requests.

## Route inventory (before changes)

| Routes | Classification | Decision |
| --- | --- | --- |
| / | Public + indexable | Improve accurate workflow, mobile navigation and remove invented preview scores |
| /tool | Public + indexable | Preserve editor; add server-rendered help; exclude ads near controls and user images |
| /deck-builder | Public + indexable | Preserve editor; explain selection constraints and exports; exclude ads |
| /bg-remover | Public + indexable | Preserve editor; add browser/model limitations and help; exclude ads |
| /articles | Public + indexable | Existing knowledge hub; improve task navigation, no duplicate /guides hub |
| /articles/beyblade-x-standard-vs-cx-builds | Public + indexable | Existing product-specific guide |
| /articles/beyblade-x-deck-sizes-explained | Public + indexable | Existing product-specific guide |
| /articles/beyblade-x-tournament-formats-explained | Public + indexable | Existing explanatory guide; owner to verify event-rule claims |
| /articles/challonge-import-guide-for-organizers | Public + indexable | Clarify collection and import limitations |
| /articles/designing-a-tournament-result-card-people-repost | Public + indexable | Existing practical design guide |
| /about, /contact, /faq, /privacy, /terms, /changelog | Public + indexable | Purposeful trust/help pages; exclude ads |
| /api/challonge | API/system (POST) | Preserve imports and abuse controls; noindex response header |
| /api/feedback | API/system (POST) | Preserve feedback; noindex response header |
| /api/usage | API/system (GET, POST) | Preserve counts; honor analytics consent on automatic registration |
| /api/health/mongodb | API/system (GET) | Preserve endpoint; noindex response header |
| /robots.txt, /sitemap.xml, /manifest.webmanifest, /ads.txt, icons/assets | API/system | Preserve discovery and verification |
| Unknown URLs | Public + noindex, missing | Preserve genuine 404; no advertising |

No route consolidation, removal, invented community routes or automatic UGC indexing is warranted. Query variants use the canonical clean path; default Next trailing-slash normalization remains. No private content may be added to public inventory in future.

## Findings, likely causes and priorities

**CRITICAL:** AdSense script loads globally before consent, including editors/errors; denied Consent Mode does not stop script requests. Custom preferences are not a certified CMP. No route eligibility mechanism exists.

**HIGH:** Persistent usage identifier is created and sent with user agent before analytics choice. Privacy description calls these anonymous totals, despite per-browser records. Preferences cannot be reopened except deleting storage. Do not claim approval can be guaranteed: the actual reviewed URL/date and AdSense account details are unavailable. Site-wide ad inventory and browser-heavy tool surfaces are plausible contributors, not proven rejection reasons.

**MEDIUM:** Mobile header hides discovery links. Tool main landmarks lack skip-link targets. Metadata social titles/URLs often inherit homepage values. JSON-LD serialization has no explicit less-than escape; configured origin needs validation. Public docs omit background-removal troubleshooting and precise deck restrictions. Existing homepage contains invented sample scores. API rate-limit database failures occur outside response error handling; no database credentials are available for successful integration testing. Large editor bundle and canvas processing need measured browser checks, not a rewrite.

**LOW:** No automated regression/SEO tests; lint script uses deprecated interactive Next lint with no config. Sitemap modification dates are manually maintained. Asset licensing/part catalog accuracy and author biography require owner confirmation. No field Core Web Vitals dataset is available.

## Hosts

Only configured production origin is https://www.byleandro.space; byleandro.space appears in explanatory copy as the apex name. No first-party app/community/stats host or host-based routing exists. Challonge organization subdomains are third-party imports, not owned surfaces. Live www content was accessible through web research; apex fetch was inconclusive. DNS/CDN inventory must be confirmed by owner; no completeness claim beyond repository evidence.

## Planned changes and regression risk

1. Central fail-closed advertising policy and remove global ad bootstrap. Keep publisher verification and ads.txt. Ads remain unserved until real certified CMP integration and placement review; a custom checkbox must never authorize ad scripts. Risk: intentional advertising delivery change, no editor behavior change.
2. Reopenable, keyboard-accessible preferences, analytics event signaling, consent-aware usage registration; update privacy truthfully. Risk: tracking counts will change to consenting visitors; test rejection/acceptance/revocation/storage failure.
3. Shared metadata builder, JSON-LD serializer, explicit public inventory/sitemap, API noindex headers, host normalization only for known equivalent apex. Risk: shared SEO layer; validate every rendered canonical and route.
4. Add one specific background-removal guide, tool help, homepage FAQ and mobile discovery links. Reuse current design and /articles hub. Risk: layout/spacing; do not alter export DOM or calculations.
5. Add meaningful unit and HTTP/browser checks, lint/type/build checks and final readiness report with limitations. Do not invent successful auth/database/subdomain checks.

## Policy references

- https://support.google.com/adsense/answer/10502938 — publisher content and placement restrictions.
- https://support.google.com/adsense/answer/13554116 — certified CMP and regional requirements.
- https://developers.google.com/search/docs/crawling-indexing/robots/intro — robots is not a privacy/index-exclusion boundary.
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap — canonical sitemap inventory.
