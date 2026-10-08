// Open the build menu and the upgrade menu with real taps, and screenshot both.
import puppeteer from 'puppeteer';
const W = 390, H = 844, OUT = '/Users/atlas/astrocade-game6/work/lead/shot';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--no-sandbox'] });
const errs = [];
try {
  const p = await b.newPage(); await p.setViewport({ width: W, height: H, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('http://localhost:8798/'); await p.waitForFunction('window.__READY__'); 
  const tap = async (sel) => { const r = await (await p.$(sel)).boundingBox(); await p.touchscreen.tap(r.x + r.width / 2, r.y + r.height / 2); };
  await tap('#startb'); await sleep(4000);
  const g = await p.evaluate(() => window.__GAME__);
  const pad = g.pads.find((q) => q[1] > 300 && q[1] < 600);
  await p.touchscreen.tap(pad[0], pad[1]); await sleep(500);
  await p.screenshot({ path: OUT + '/m1_build.jpg', quality: 80 });
  const items = await p.$$('#menu-items .mi'); const r = await items[0].boundingBox(); await p.touchscreen.tap(r.x + r.width / 2, r.y + r.height / 2); await sleep(700);
  await p.screenshot({ path: OUT + '/m2_upgrade.jpg', quality: 80 });
  for (const k of [0, 1]) { const it = await p.$$('#menu-items .mi'); const rr = await it[k].boundingBox(); await p.touchscreen.tap(rr.x + rr.width / 2, rr.y + rr.height / 2); await sleep(700); }
  await p.evaluate(() => 0);
  await p.screenshot({ path: OUT + '/m3_layers.jpg', quality: 80 });
  console.log(JSON.stringify((({ pads, ...o }) => o)(await p.evaluate(() => window.__GAME__))));
} finally { console.log(errs.join('\n')); await b.close(); }
