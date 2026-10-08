import { createServer } from 'http'; import fs from 'fs'; import path from 'path'; import { createRequire } from 'module';
const puppeteer = createRequire('/Users/atlas/404-game-recipe/package.json')('puppeteer');
const ROOT = '/Users/atlas/astrocade-game6/game';
const html = `<!doctype html><script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js"}}</script>
<script type="module">import * as THREE from 'three'; import { ASSET } from '/assetlib.js';
const s = await ASSET('./assets/club_sandwich.js', { height: 3.0, keepHierarchy: true });
const L = s.userData.layers || {}; const keys = Object.keys(L).sort();
let tris = 0; L.l1 && L.l1.traverse((o) => { if (o.isMesh) tris += o.geometry.index ? o.geometry.index.count / 3 : o.geometry.attributes.position.count / 3; });
const b = new THREE.Box3().setFromObject(s);
const parts = {}; for (const n of ['layer_bread','layer_cheese','head_pickle','pad_coaster']) { const o = await ASSET('./assets/' + n + '.js', { height: 0.1 }); parts[n] = !!o; }
window.OUT = { keys, l1Visible: L.l1 && L.l1.visible, l1Tris: tris, l9isGroup: !!(L.l9 && L.l9.isObject3D), h: +(b.max.y - b.min.y).toFixed(3), parts };</script>`;
const srv = createServer((q, r) => { const u = q.url.split('?')[0]; if (u === '/') { r.writeHead(200, { 'content-type': 'text/html' }); return r.end(html); }
  const f = path.join(ROOT, u); if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': 'text/javascript' }); r.end(fs.readFileSync(f)); }).listen(0);
const br = await puppeteer.launch({ headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--no-sandbox'] });
try { const p = await br.newPage(); p.on('pageerror', (e) => console.log('ERR', e.message));
  await p.goto('http://localhost:' + srv.address().port + '/'); await p.waitForFunction('window.OUT', { timeout: 60000 });
  console.log(JSON.stringify(await p.evaluate('window.OUT'))); } finally { await br.close(); srv.close(); }
