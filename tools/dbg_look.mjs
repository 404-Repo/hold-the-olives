// dev: which look and lights the running stage actually has
import puppeteer from 'puppeteer';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--no-sandbox'] });
try {
  const p = await b.newPage(); await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await p.goto('http://localhost:8798/?dev_stage=' + (process.argv[2] || 'E')); await p.waitForFunction('window.__READY__');
  const r = await (await p.$('#startb')).boundingBox(); await p.touchscreen.tap(r.x + r.width / 2, r.y + r.height / 2); await sleep(5000);
  console.log(await p.evaluate(() => { const g = window.__DEV__.game; const sc = g.scene; const L = []; sc.traverse((o) => { if (o.isLight) L.push(o.type + ' ' + o.intensity.toFixed(2) + ' ' + o.color.getHexString()); }); return JSON.stringify({ id: g.stage.id, look: g.stage.look, bg: sc.background.getHexString(), roots: sc.children.filter((c) => c.name === 'world').length, L }); }));
} finally { await b.close(); }
