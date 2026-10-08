// Scratch look renderer: node look.mjs <spec.json> <out.png>
// spec: { size, scenes: [{ title, items: [{src, x, z, rotY, height, stack}], el, az, dist, target:[x,y,z] }] }
// items with stack:true are placed on the previous stacked item's top the way the game does (scale to height, y += h * 0.92).
import { createServer } from 'http';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const puppeteer = createRequire('/Users/atlas/404-game-recipe/package.json')('puppeteer');
const ROOT = '/Users/atlas/astrocade-game6';
const [specPath, outPath] = process.argv.slice(2);
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const html = `<!doctype html><html><head><script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js"}}</script></head>
<body style="margin:0;background:#222"><script type="module">
import * as THREE from 'three';
const spec = ${JSON.stringify(spec)};
const S = spec.size || 640, n = spec.scenes.length;
const r = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
r.setSize(S * Math.min(n, 3), S * Math.ceil(n / 3)); r.setScissorTest(true); r.shadowMap.enabled = true;
r.toneMapping = THREE.ACESFilmicToneMapping; r.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(r.domElement);
const height = (o) => { const b = new THREE.Box3().setFromObject(o); return b.max.y - b.min.y; };
for (let si = 0; si < n; si++) {
  const sc = spec.scenes[si], scene = new THREE.Scene(); scene.background = new THREE.Color(0xe9dcc4);
  scene.add(new THREE.HemisphereLight(0xfff6e8, 0x8a7458, 1.3));
  const sun = new THREE.DirectionalLight(0xfff1dc, 2.6); sun.position.set(6, 12, 8); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8 }); scene.add(sun);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ color: 0xc99a64, roughness: 0.7 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  let sy = 0;
  for (const it of sc.items) {
    const mod = await import('/' + it.src + '?v=' + Date.now());
    const o = mod.default(THREE);
    if (it.height) o.scale.multiplyScalar(it.height / height(o));
    o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
    o.rotation.y = it.rotY || 0;
    o.position.set(it.x || 0, it.y || 0, it.z || 0);
    if (it.stack) { o.position.y = sy; sy += Math.max(0.04, height(o)) * 0.92; }
    if (it.hide) for (const k of it.hide) o.userData.layers[k].visible = false;
    scene.add(o);
  }
  const t = new THREE.Vector3(...(sc.target || [0, 0.6, 0])), el = (sc.el ?? 45) * Math.PI / 180, az = (sc.az ?? 30) * Math.PI / 180, d = sc.dist ?? 6;
  const cam = new THREE.PerspectiveCamera(sc.fov ?? 35, 1, 0.05, 200);
  cam.position.set(t.x + d * Math.cos(el) * Math.sin(az), t.y + d * Math.sin(el), t.z + d * Math.cos(el) * Math.cos(az)); cam.lookAt(t);
  const x = (si % 3) * S, y = (Math.ceil(n / 3) - 1 - Math.floor(si / 3)) * S;
  r.setViewport(x, y, S, S); r.setScissor(x, y, S, S); r.render(scene, cam);
}
window.DONE = true;
</script></body></html>`;
const srv = createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  if (u === '/' || u === '/look.html') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end(html); }
  const f = path.join(ROOT, u);
  if (!f.startsWith(ROOT) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': 'text/javascript' }); res.end(fs.readFileSync(f));
}).listen(0);
const port = srv.address().port;
const browser = await puppeteer.launch({ headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--no-sandbox'] });
try {
  const page = await browser.newPage();
  page.on('pageerror', (e) => console.error('pageerror', e.message));
  page.on('console', (m) => { if (m.type() === 'error') console.error('console', m.text()); });
  const S = spec.size || 640, n = spec.scenes.length;
  await page.setViewport({ width: S * Math.min(n, 3), height: S * Math.ceil(n / 3) });
  await page.goto(`http://localhost:${port}/look.html`);
  await page.waitForFunction('window.DONE === true', { timeout: 120000 });
  await page.screenshot({ path: outPath });
  console.log('wrote', outPath);
} finally { await browser.close(); srv.close(); }
