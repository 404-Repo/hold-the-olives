import puppeteer from 'puppeteer';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const [,, stage = '1', px = '2', py = '3', pz = '-9.6', lx = '-7.4', ly = '3', lz = '-9.6', out = 'wall'] = process.argv;
const b = await puppeteer.launch({ headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--no-sandbox'] });
try {
  const p = await b.newPage(); await p.setViewport({ width: 844, height: 390, deviceScaleFactor: 1.5, isMobile: true, hasTouch: true });
  await p.goto('http://localhost:8798/?dev_stage=' + stage); await p.waitForFunction('window.__READY__');
  const r = await (await p.$('#startb')).boundingBox(); await p.touchscreen.tap(r.x + r.width / 2, r.y + r.height / 2); await sleep(4200);
  await p.evaluate((a) => { const R = window.__DEV__.rig; R.play([{ t: 0, pos: a.slice(0, 3), look: a.slice(3) }, { t: 99, pos: a.slice(0, 3), look: a.slice(3) }]); }, [+px, +py, +pz, +lx, +ly, +lz]);
  await sleep(800); await p.screenshot({ path: `/Users/atlas/astrocade-game6/work/lead/${out}.jpg`, quality: 80 });
} finally { await b.close(); }
