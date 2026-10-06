// Start Chrome with --remote-debugging-port=9337 and the production app first.
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = process.env.TEST_BASE_URL || 'http://localhost:3117';
const targets = await (await fetch('http://127.0.0.1:9337/json/list')).json();
const socket = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, {once: true}));
let nextId = 0;
const pending = new Map();
const exceptions = [];
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const item = pending.get(message.id); pending.delete(message.id);
    if (message.error) item?.reject(message.error); else item?.resolve(message.result);
  }
  if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails);
});
function send(method, params = {}) {
  const id = ++nextId;
  return new Promise((resolve, reject) => { pending.set(id, {resolve, reject}); socket.send(JSON.stringify({id, method, params})); });
}
async function evaluate(expression) {
  const response = await send('Runtime.evaluate', {expression, returnByValue: true, awaitPromise: true});
  if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails));
  return response.result.value;
}
await send('Page.enable');
await send('Runtime.enable');
for (const width of [1440, 390]) {
  await send('Emulation.setDeviceMetricsOverride', {width, height: 1000, deviceScaleFactor: 1, mobile: width < 700});
  await send('Page.navigate', {url: base});
  await new Promise(resolve => setTimeout(resolve, 2000));
  assert.equal(await evaluate('document.querySelectorAll("h1").length'), 1);
  assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true, `overflow ${width}`);
  await evaluate('document.querySelector("details summary").click()');
  assert.equal(await evaluate('document.querySelector("details").open'), true);
  if (width < 700) {
    await evaluate(`document.querySelector('button[aria-label="Open menu"]').click()`);
    assert.equal(await evaluate(`document.querySelector('button[aria-expanded="true"]') !== null`), true);
    await evaluate(`document.querySelector('button[aria-label="Close menu"]').click()`);
  }
  const screenshot = await send('Page.captureScreenshot', {format: 'png'});
  fs.writeFileSync(`/tmp/byld-home-${width}.png`, Buffer.from(screenshot.data, 'base64'));
}
await send('Page.navigate', {url: base + '/contact'});
await new Promise(resolve => setTimeout(resolve, 1000));
assert.equal(await evaluate('document.querySelector("form").checkValidity()'), false);
assert.equal(await evaluate('document.querySelector("button[type=submit]").textContent.includes("PREPARE INQUIRY EMAIL")'), true);
assert.equal(exceptions.length, 0, JSON.stringify(exceptions));
socket.close();
console.log('PASS: desktop and mobile overflow, menu, FAQ, contact validation, and browser runtime checks.');
