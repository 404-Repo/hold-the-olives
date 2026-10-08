// Close-up of a built tower stack: real taps to build and layer, then the dev camera frames it.
import puppeteer from 'puppeteer';
const OUT = '/Users/atlas/astrocade-game6/work/lead/close';
import fs from 'fs'; fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--no-sandbox'] });
try {
  const p = await b.newPage(); await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  p.on('pageerror', (e) => console.log('pageerror', e.message));
  await p.goto('http://localhost:8798/?dev_stage=' + (process.argv[2] || '1')); await p.waitForFunction('window.__READY__');
  const tap = async (sel) => { const r = await (await p.$(sel)).boundingBox(); await p.touchscreen.tap(r.x + r.width / 2, r.y + r.height / 2); };
  await tap('#startb'); await sleep(3500);
  await p.evaluate(() => { const g = window.__DEV__.game; g.crumbs = 2000; });   // dev: money for a close-up of every part
  const g0 = await p.evaluate(() => window.__GAME__);
  const pads = g0.pads.filter((q) => q[1] > 150 && q[1] < 560).slice(0, 6);
  const plan = [[0, ['Tomato', 'Cheese', 'Lettuce']], [1, ['Bacon', 'Tomato', 'Cheese']], [2, ['Lettuce']], [3, []], [4, ['Cheese', 'Bacon']], [5, ['Tomato']]];
  for (let i = 0; i < pads.length; i++) {
    const q = pads[i]; await p.touchscreen.tap(q[0], q[1]); await sleep(300);
    const items = await p.$$('#menu-items .mi:not(.locked)'); if (!items[i % items.length]) continue;
    let r = await items[i % items.length].boundingBox(); await p.touchscreen.tap(r.x + r.width / 2, r.y + r.height / 2); await sleep(400);
    for (const l of plan[i][1]) { const its = await p.$$('#menu-items .mi'); for (const it of its) { if ((await it.evaluate((e) => e.textContent)).includes('+ ' + l)) { r = await it.boundingBox(); await p.touchscreen.tap(r.x + r.width / 2, r.y + r.height / 2); await sleep(500); break; } } }
    await tap('#menu-close'); await sleep(300);
  }
  await tap('#b-next'); await sleep(5000);
  await p.screenshot({ path: OUT + '/a_overview.jpg', quality: 82 });
  await p.evaluate(() => { const r = window.__DEV__.rig; r.g.dist = r.minD * 1.1; r.g.pitch = 0.75; });
  await sleep(1500); await p.screenshot({ path: OUT + '/b_close.jpg', quality: 82 });
  await p.evaluate(() => { const r = window.__DEV__.rig; r.g.tz += 4; r.g.pitch = 0.6; });
  await sleep(1500); await p.screenshot({ path: OUT + '/c_low.jpg', quality: 82 });
} finally { await b.close(); }
