import fs from 'node:fs';
const results = [];
for (const origin of ['https://www.byleandro.space','https://byleandro.space']) {
  for (const path of ['/','/robots.txt','/sitemap.xml','/not-a-real-page-remediation-check']) {
    try {
      const response=await fetch(origin+path,{redirect:'manual',signal:AbortSignal.timeout(15000)});
      const body=await response.text();
      results.push({origin,path,status:response.status,location:response.headers.get('location'),robots:response.headers.get('x-robots-tag'),canonical:body.match(/rel="canonical" href="([^"]+)"/)?.[1],hasAdScript:/<script[^>]+src="[^"]*adsbygoogle/.test(body),hasSitemap:body.includes('sitemap.xml'),securityHeaders:['content-security-policy','x-content-type-options','strict-transport-security'].filter(header=>response.headers.has(header))});
    } catch(error) {results.push({origin,path,error:error.message});}
  }
}
fs.writeFileSync('/tmp/byleandro-host-results.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
