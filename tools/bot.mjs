// Plays a whole stage with real touch taps, like a decent player. Logs telemetry, shoots frames, reports the end card.
//   node tools/bot.mjs [--stage=1] [--speed=3] [--towers=6] [--out=dir] [--w=390 --h=844] [--max=600] [--early=1]
import puppeteer from 'puppeteer';
import fs from 'fs';
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=').slice(1).join('=') : d; };
const W = +arg('w', 390), H = +arg('h', 844), OUT = arg('out', '/Users/atlas/astrocade-game6/work/lead/bot'), STAGE = arg('stage', '1');
const MAXT = +arg('max', 600), TOWERS = +arg('towers', 6), SPEED = +arg('speed', 3), EARLY = arg('early', '1') === '1';
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--no-sandbox'] });
const errs = []; const log = [];
try {
  const p = await b.newPage(); await p.setViewport({ width: W, height: H, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  p.on('pageerror', (e) => errs.push('pageerror ' + e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('response', (r) => { if (r.status() >= 400) errs.push(r.status() + ' ' + r.url()); });
  await p.goto('http://localhost:8798/?dev_stage=' + STAGE); await p.waitForFunction('window.__READY__', { timeout: 60000 });
  const box = async (sel) => { const e = await p.$(sel); if (!e) return null; const r = await e.boundingBox(); return r && r.width ? r : null; };
  const tapSel = async (sel) => { const r = await box(sel); if (r) await p.touchscreen.tap(r.x + r.width / 2, r.y + r.height / 2); return !!r; };
  const G = () => p.evaluate(() => window.__GAME__);
  await tapSel('#startb'); await sleep(3800);
  for (let i = 1; i < SPEED; i++) { await tapSel('#b-speed'); await sleep(80); }
  const W8 = { 1: ['pick', 'pickle'], 2: ['pick', 'pickle', 'mustard'], 3: ['pick', 'pickle', 'mustard', 'pepper'], 4: ['pick', 'pickle', 'mustard', 'pepper', 'grater'], 5: ['pick', 'pickle', 'mustard', 'pepper', 'grater', 'toaster'], E: ['pick', 'pickle', 'mustard', 'pepper', 'grater', 'toaster'] }[STAGE];
  const t0 = Date.now(); let n = 0, lastShot = 0, built = 0;
  const menuItem = async (pred) => { const items = await p.$$('#menu-items .mi'); for (const it of items) { const txt = await it.evaluate((e) => e.textContent + '|' + e.className); if (pred(txt)) { const r = await it.boundingBox(); await p.touchscreen.tap(r.x + r.width / 2, r.y + r.height / 2); return true; } } return false; };
  while ((Date.now() - t0) / 1000 < MAXT) {
    const g = await G(); if (!g) break;
    if (g.over) break;
    log.push({ t: +((Date.now() - t0) / 1000).toFixed(1), wave: g.wave, crumbs: g.crumbs, lives: g.lives, enemies: g.enemies, towers: g.towers, layers: g.layers, kills: g.kills, draws: g.draws, tris: g.tris, fps: g.fps });
    const visible = g.pads.map((q, i) => ({ q, i })).filter(({ q }) => q[1] > 90 && q[1] < H - 110 && q[0] > 10 && q[0] < W - 10);
    const free = visible.filter(({ q }) => !q[2]);
    const mine = visible.filter(({ q }) => q[2] && q[3] < 3);
    if (g.towers < TOWERS && free.length && g.crumbs >= 90) {
      const { q } = free[0];
      await p.touchscreen.tap(q[0], q[1]); await sleep(250);
      const want = W8[built % W8.length];
      const names = { pick: 'Toothpick', pickle: 'Pickle', mustard: 'Mustard', pepper: 'Pepper', grater: 'Grater', toaster: 'Toaster' };
      if (await menuItem((t) => t.includes(names[want]) && !t.includes('locked') && !t.includes(' no'))) built++;
      await sleep(200); await tapSel('#menu-close');
    } else if (mine.length && g.crumbs >= 120) {
      const { q } = mine[n % mine.length];
      await p.touchscreen.tap(q[0], q[1]); await sleep(250);
      const order = ['Tomato', 'Cheese', 'Lettuce', 'Bacon'];
      const title = await p.$eval('#menu-title', (e) => e.textContent);
      const have = order.filter((o) => title.includes(o));
      const pick = order.find((o) => !have.includes(o)) || 'Tomato';
      await menuItem((t) => t.includes('+ ' + pick) && !t.includes(' no'));
      await sleep(200); await tapSel('#menu-close');
    }
    if (g.state === 'prep' || (EARLY && g.countdown > 0)) await tapSel('#b-next');
    if ((Date.now() - lastShot) > 9000) { lastShot = Date.now(); await p.screenshot({ path: `${OUT}/f${String(n).padStart(3, '0')}.jpg`, quality: 78 }); }
    n++; await sleep(500);
  }
  await sleep(2500);
  await p.screenshot({ path: `${OUT}/zz_end.jpg`, quality: 80 });
  const end = await p.evaluate(() => ({ title: document.getElementById('end-title').textContent, stars: document.querySelectorAll('#end-stars span:not(.off)').length, stats: document.getElementById('end-stats').textContent, best: document.getElementById('end-best').textContent }));
  const g = await G();
  const peak = (k) => Math.max(...log.map((l) => l[k] || 0));
  console.log(JSON.stringify({ secs: (Date.now() - t0) / 1000, end, wave: g.wave, lives: g.lives, kills: g.kills, towers: g.towers, layers: g.layers, clubs: g.clubs, peakDraws: peak('draws'), peakTris: peak('tris'), peakEnemies: peak('enemies') }));
  fs.writeFileSync(`${OUT}/log.json`, JSON.stringify(log));
} finally { console.log(errs.slice(0, 20).join('\n')); await b.close(); }
