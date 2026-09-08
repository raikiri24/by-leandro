// Dependency-free Chrome DevTools Protocol regression checks. Start headless
// Chrome with --remote-debugging-port=9223 and the app on port 3100 first.
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = process.env.TEST_BASE_URL || 'http://localhost:3100';
const targets = await (await fetch('http://127.0.0.1:9223/json/list')).json();
const socket = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, {once:true}));
let nextId = 0;
const pending = new Map();
const requests = [];
const exceptions = [];
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.id) { const item = pending.get(message.id); pending.delete(message.id); if (message.error) item?.reject(message.error); else item?.resolve(message.result); }
  if (message.method === 'Network.requestWillBeSent') requests.push(message.params.request.url);
  if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails);
});
function send(method, params = {}) {
  const id = ++nextId;
  return new Promise((resolve,reject) => { pending.set(id,{resolve,reject}); socket.send(JSON.stringify({id,method,params})); });
}
async function evaluate(expression) {
  const response = await send('Runtime.evaluate', {expression, returnByValue:true, awaitPromise:true});
  if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails));
  return response.result.value;
}
const wait = ms => new Promise(resolve => setTimeout(resolve,ms));
async function go(path) {
  await send('Page.navigate', {url:base+path});
  for(let i=0;i<50;i++) {
    await wait(200);
    if(await evaluate(`location.pathname === ${JSON.stringify(path)} && document.readyState === 'complete' && !!document.querySelector('button')`)) break;
  }
  await wait(500);
}
async function click(text) {
  assert.ok(await evaluate(`(() => { const element = [...document.querySelectorAll('button')].find(node => node.textContent.trim() === ${JSON.stringify(text)}); if (!element) return false; element.focus(); element.click(); return true; })()`), 'button '+text);
  await wait(150);
}
await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
await send('Browser.setDownloadBehavior',{behavior:'allow',downloadPath:'/tmp/byleandro-downloads'});
await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await go('/'); await evaluate('localStorage.clear()'); await go('/');
assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true, 'homepage horizontal overflow');
assert.equal(await evaluate("document.querySelectorAll('nav[aria-label=\"Tools and guides\"] a').length"),6);
await click('Manage preferences');
assert.equal(await evaluate("document.querySelector('dialog').open"),true);
assert.equal(await evaluate("document.querySelector('dialog input').checked"),false);
await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27,nativeVirtualKeyCode:27});
await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27,nativeVirtualKeyCode:27});
await wait(150);
assert.equal(await evaluate("document.querySelector('dialog').open"),false);
assert.equal(await evaluate('document.activeElement.textContent.trim()'),'Manage preferences');
await click('Reject optional analytics');
await click('Cookie preferences');
assert.equal(await evaluate("document.querySelector('dialog').open"),true);
await click('Cancel');
await go('/tool'); await wait(3300);
assert.equal(await evaluate("localStorage.getItem('leandro-tool-session-id')"),null);
assert.ok(!requests.some(url=>url.includes('/api/usage')), 'rejected usage requests');
assert.ok(!requests.some(url=>/googlesyndication|googletagmanager|google-analytics/.test(url)), 'optional third-party requests');
const toolButtons = await evaluate("[...document.querySelectorAll('button')].map(node=>node.textContent.trim())");
fs.writeFileSync('/tmp/byleandro-tool-buttons.json',JSON.stringify(toolButtons,null,2));
await click('Cookie preferences');
await evaluate("document.querySelector('dialog input').click()"); await click('Save preferences'); await wait(500);
assert.ok(requests.some(url=>url.includes('/api/usage')), 'consent enables existing usage API');
await click('Cookie preferences'); await evaluate("document.querySelector('dialog input').click()"); await click('Save preferences');
assert.equal(await evaluate("localStorage.getItem('leandro-tool-session-id')"),null);
const layouts=[];
for(const width of [320,390,768,1440]) {
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});
  for(const path of ['/','/articles','/articles/background-removal-and-export','/privacy','/deck-builder','/bg-remover','/tool']) {
    await go(path);
    const state=await evaluate(`({width:innerWidth,scroll:document.documentElement.scrollWidth,main:!!document.getElementById('main-content'),title:document.title})`);
    assert.equal(state.main,true,path);
    layouts.push({path,viewport:width,...state});
    if (path !== '/tool') assert.ok(state.scroll<=state.width,`overflow ${path} at ${width}: ${state.scroll}`);
  }
}
await go('/deck-builder');
const deckButtons=await evaluate("[...document.querySelectorAll('button')].map(node=>node.textContent.trim())");
fs.writeFileSync('/tmp/byleandro-deck-buttons.json',JSON.stringify(deckButtons,null,2));
await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false}).then(result=>fs.writeFileSync('/tmp/byleandro-desktop.png',Buffer.from(result.data,'base64')));
await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true}); await go('/');
await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false}).then(result=>fs.writeFileSync('/tmp/byleandro-mobile.png',Buffer.from(result.data,'base64')));
fs.writeFileSync('/tmp/byleandro-browser-results.json',JSON.stringify({layouts,exceptions,requests},null,2));
console.log('PASS: cookie dialog, Escape/focus return, reject/accept/revoke usage, no advertising requests, 28 viewport/route checks. See browser results for exceptions.');
socket.close();
