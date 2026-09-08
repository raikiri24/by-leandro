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
await send('Browser.setDownloadBehavior',{behavior:'allow',downloadPath:'/tmp/byleandro-editor-downloads'});
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await go('/deck-builder');
await click('6G');
assert.equal(await evaluate("[...document.querySelectorAll('h3')].filter(node=>/^Beyblade [1-6]$/.test(node.textContent.trim())).length"),6);
await click('CX');
assert.ok(await evaluate("document.body.innerText.includes('Lock Chip')"));
await click('Download Deck'); await wait(3000);
assert.ok(fs.readdirSync('/tmp/byleandro-editor-downloads').some(name=>name.endsWith('.jpg')), 'deck JPG downloaded');
await go('/tool'); await wait(3300);
const modes=[];
for(const mode of ['Cards','Pub Mat','Winners']) {
  await click(mode);
  const download=await evaluate("[...document.querySelectorAll('button')].find(node=>node.textContent.includes('Download') && !node.disabled)?.textContent.trim()");
  assert.ok(download,mode+' download button');
  await click(download); await wait(2000);
  modes.push(mode);
}
const files=fs.readdirSync('/tmp/byleandro-editor-downloads').filter(name=>name.endsWith('.jpg'));
assert.ok(files.length>=4, 'deck and three graphic modes exported');
for(const file of files) {
  const bytes=fs.readFileSync('/tmp/byleandro-editor-downloads/'+file);
  assert.equal(bytes[0],255); assert.equal(bytes[1],216);
  assert.ok(bytes.length>1000,file);
}
await go('/bg-remover');
await evaluate(`(() => {
  const canvas=document.createElement('canvas'); canvas.width=256;canvas.height=256;
  const ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,256,256);ctx.fillStyle='red';ctx.fillRect(70,40,120,190);
  return new Promise(resolve=>canvas.toBlob(blob=>{const transfer=new DataTransfer();transfer.items.add(new File([blob],'test-shape.png',{type:'image/png'}));const input=document.querySelector('input[type=file]');input.files=transfer.files;input.dispatchEvent(new Event('change',{bubbles:true}));resolve(true);},'image/png'));
})()`);
let background='processing';
for(let i=0;i<60;i++) {
  await wait(1000);
  const state=await evaluate("document.body.innerText");
  if(state.toLowerCase().includes('something went wrong')) {background='processing error';break;}
  const download=await evaluate("[...document.querySelectorAll('button')].find(node=>node.textContent.includes('Download') && !node.disabled)?.textContent.trim()");
  if(download) {await click(download);await wait(1500);background='exported';break;}
}
fs.writeFileSync('/tmp/byleandro-editor-results.json',JSON.stringify({modes,files,background,exceptions,requests},null,2));
console.log(JSON.stringify({modes,files,background,exceptions},null,2));
socket.close();
