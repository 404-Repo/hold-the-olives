import * as THREE from 'three';
import { CounterCam } from './camera.js';
import { Game } from './game.js';
import { UI } from './ui.js';
import { Audio } from './audio.js';
import { FX } from './fx.js';
import { model, snapshot, hasAsset } from './models.js';
import { STAGES, ENDLESS, WEAPONS, WEAPON_ORDER, LAYERS, LAYER_ORDER } from './data.js';

const $ = (id) => document.getElementById(id);

// ---------- save
const SAVE_KEY = 'hold-the-olives-v1';
let save = { stars: {}, best: {}, reached: 1, seen: [], sound: true, endless: { wave: 0, score: 0 } };
try { const s = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); if (s) save = { ...save, ...s }; } catch {}
const persist = () => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch {} };

// ---------- renderer
const canvas = $('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight, false);
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 400);
const look = $('look');
const rig = new CounterCam(camera, look);
const audio = new Audio();
audio.setOn(save.sound !== false);
const ui = new UI(audio);
const fx = new FX(scene, rig);

function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.fov = w < h ? 56 : 44;          // portrait sees more width with a wider lens
  camera.updateProjectionMatrix();
  if (game) { rig.home(false); }
}
addEventListener('resize', resize);

// ---------- state
let game = null, preloaded = null, current = null, paused = false;
let title = true;

async function makeGame(stage, endless) {
  const g = new Game({ scene, renderer, rig, ui, audio, fx, stage, endless, save });
  await g.init();
  return g;
}

async function buildIcons() {
  const icon = async (key, name, h, opts) => { if (!hasAsset(name)) return; const o = await model(name, { height: h }); ui.icons[key] = snapshot(renderer, o, 128, opts); };
  const jobs = [];
  for (const k of WEAPON_ORDER) jobs.push(icon(k, WEAPONS[k].head, 1, { yaw: -0.5 }));
  for (const l of LAYER_ORDER) jobs.push(icon(l, LAYERS[l].model, 0.2, { yaw: 0.3 }));
  jobs.push(icon('flag', 'flag_club', 1));
  jobs.push(icon('g_swat', 'spatula', 1, { yaw: 0.8 }));
  jobs.push(icon('g_burner', 'stove_burner', 0.3));
  jobs.push(icon('g_tap', 'faucet', 1));
  jobs.push(icon('g_pepper', 'head_pepper', 1));
  jobs.push(icon('g_ice', 'ice_bucket', 1));
  await Promise.all(jobs);
  if (hasAsset('spatula')) fx.setSpatula(await model('spatula', { height: 0.25 }));
}

function startStage(stage, endless = false) {
  $('fade').classList.add('on');
  setTimeout(async () => {
    ui.show('title', false); ui.show('select', false); ui.show('end', false); ui.show('pause', false);
    title = false; paused = false;
    if (game) { game.dispose(); game = null; }
    fx.clear();
    current = { stage, endless };
    let g;
    if (preloaded && preloaded.stage === stage && !endless) { g = preloaded; preloaded = null; }
    else { g = await makeGame(stage, endless); }
    if (preloaded) { preloaded.dispose(); preloaded = null; }
    game = g; ui.game = g;
    g.onEnd = onEnd;
    rig.setBounds(stage.bounds);
    resize();
    rig.home(true);
    ui.show('hud', true);
    $('b-speed').textContent = '1x'; g.speedMul = 1;
    ui.hud(g); ui.setGadgets(stage.gadget);
    audio.music(stage.music);
    // the opening shot: stand at the counter like a person, then drop to olive height
    const sx = g.spawnPos.x, sz = g.spawnPos.z;
    const end = camera.position.clone();
    rig.play([
      { t: 0, pos: [11, 13, 9], look: [-3, 1.5, -14] },
      { t: 1.1, pos: [sx + 6, 3.0, sz + 8], look: [sx, 0.8, sz] },
      { t: 2.6, pos: end.toArray(), look: [rig.tx, 0, rig.tz] },
    ], () => {});
    $('fade').classList.remove('on');
    ui.banner(stage.name, `${stage.time}. ${endless ? 'How long can lunch last?' : stage.blurb}`, 2600);
    if (stage.num === 1 && !endless && !(save.stars.board > 0)) setTimeout(() => ui.hint('Tap a glowing coaster to build a sandwich tower'), 2700);
  }, 380);
}

function onEnd(r) {
  const stage = current.stage, endless = current.endless;
  const id = endless ? 'night' : stage.id;
  let best = false;
  if (endless) {
    if (r.wave > (save.endless.wave || 0) || r.score > (save.endless.score || 0)) best = true;
    save.endless = { wave: Math.max(save.endless.wave || 0, r.wave), score: Math.max(save.endless.score || 0, r.score) };
  } else {
    if (r.won) {
      save.stars[id] = Math.max(save.stars[id] || 0, r.stars);
      save.reached = Math.max(save.reached || 1, stage.num + 1);
    }
    if (r.score > (save.best[id] || 0)) { best = !!save.best[id] || r.won; save.best[id] = r.score; }
  }
  persist();
  ui.show('hud', false); game.deselect();
  $('end-title').textContent = endless ? `LASTED ${r.wave - (r.won ? 0 : 1)} WAVES` : r.won ? (r.stars === 3 ? 'NOT ONE OLIVE GOT A BITE' : 'LUNCH IS SAVED') : 'LUNCH WAS EATEN';
  const st = $('end-stars'); st.innerHTML = '';
  if (!endless) for (let i = 0; i < 3; i++) { const s = document.createElement('span'); s.textContent = '★'; if (i >= r.stars) s.className = 'off'; st.append(s); }
  const mm = Math.floor(r.time / 60), ss = Math.floor(r.time % 60).toString().padStart(2, '0');
  $('end-stats').innerHTML = `score <b>${r.score.toLocaleString('en-US')}</b><br>olives popped <b>${r.kills}</b> &nbsp; bites left <b>${r.lives}</b><br>clubs built <b>${r.clubs}</b> &nbsp; early bonus <b>${r.early}</b> &nbsp; time <b>${mm}:${ss}</b>`;
  $('end-best').textContent = best ? 'NEW BEST!' : endless ? `best: wave ${save.endless.wave}, ${save.endless.score.toLocaleString('en-US')}` : save.best[id] ? `best ${save.best[id].toLocaleString('en-US')}` : '';
  const next = !endless && r.won && STAGES[stage.num];
  $('b-endnext').textContent = next ? `NEXT: ${next.name.toUpperCase()}` : r.won && !endless && stage.num === 5 ? 'MIDNIGHT SNACK' : 'TRY AGAIN';
  $('b-endnext').onclick = () => { audio.sfx('tick'); if (next) startStage(next); else if (r.won && stage.num === 5) startStage(ENDLESS, true); else startStage(stage, endless); };
  ui.show('end', true);
}

function showSelect() {
  ui.show('title', false); ui.show('end', false); ui.show('pause', false); ui.show('hud', false);
  const box = $('stages'); box.innerHTML = '';
  let total = 0;
  const row = (st, endless) => {
    const id = endless ? 'night' : st.id;
    const locked = endless ? !(save.stars.board > 0) : st.num > (save.reached || 1);
    const stars = save.stars[id] || 0; total += stars;
    const b = document.createElement('button'); b.className = 'st' + (locked ? ' locked' : '') + (endless ? ' endless' : '');
    const best = endless ? (save.endless.wave ? `best: wave ${save.endless.wave}` : '') : save.best[id] ? `best ${save.best[id].toLocaleString('en-US')}` : '';
    b.innerHTML = `<div class="num">${endless ? '∞' : st.num}</div><div><div class="nm"></div><div class="ds"></div><div class="bs"></div></div><div class="sr"></div>`;
    b.querySelector('.nm').textContent = st.name;
    b.querySelector('.ds').textContent = locked ? (endless ? 'Clear the Cutting Board to unlock' : 'Clear the stage before it') : `${st.time}. ${st.blurb}`;
    b.querySelector('.bs').textContent = best;
    if (!endless) b.querySelector('.sr').innerHTML = [0, 1, 2].map((i) => `<span class="${i < stars ? '' : 'off'}">★</span>`).join('');
    b.onclick = () => { if (locked) { audio.sfx('nope'); return; } audio.sfx('tick'); startStage(st, endless); };
    box.append(b);
  };
  STAGES.forEach((s) => row(s, false));
  row(ENDLESS, true);
  $('stars-total').textContent = `${total} of 15 stars`;
  ui.show('select', true);
  audio.music('menu');
}

// ---------- buttons
$('startb').addEventListener('click', () => {
  audio.unlock();
  if (!window.__READY__) return;
  const dev = new URLSearchParams(location.search).get('dev_stage');   // dev only: jump to a stage
  if (dev) { startStage(dev === 'E' ? ENDLESS : STAGES[+dev - 1], dev === 'E'); return; }
  const returning = (save.reached || 1) > 1 || Object.keys(save.stars).length;
  if (returning) showSelect(); else startStage(STAGES[0]);
});
$('b-pause').addEventListener('click', () => { if (!game || game.over) return; paused = true; ui.show('pause', true); $('b-sound').textContent = `sound: ${audio.on ? 'on' : 'off'}`; });
$('b-resume').addEventListener('click', () => { paused = false; ui.show('pause', false); });
$('b-restart').addEventListener('click', () => { if (current) startStage(current.stage, current.endless); });
$('b-quit').addEventListener('click', () => { paused = false; if (game) { game.dispose(); game = null; } showSelect(); });
$('b-sound').addEventListener('click', () => { audio.setOn(!audio.on); save.sound = audio.on; persist(); $('b-sound').textContent = `sound: ${audio.on ? 'on' : 'off'}`; });
$('b-endretry').addEventListener('click', () => { if (current) startStage(current.stage, current.endless); });
$('b-endhouse').addEventListener('click', () => { if (game) { game.dispose(); game = null; } showSelect(); });

rig.onTap = (x, y) => {
  if (rig.cine) { rig.skipCine(); return; }
  if (game && !paused) {
    game.tap(x, y);
    if (game.towers.length && game.state === 'prep') ui.hint('Tap START when you are ready. Tap a tower to stack a layer.', 5000);
  }
};
look.addEventListener('pointerdown', () => { if (rig.cine && game) rig.skipCine(); });

// keyboard: pan, zoom, waves (desktop)
const keys = new Set();
addEventListener('keydown', (e) => {
  keys.add(e.code);
  if (!game) return;
  if (e.code === 'Space') { e.preventDefault(); $('b-next').click(); }
  if (e.code === 'Escape') game.deselect();
  if (e.code === 'KeyF') $('b-speed').click();
});
addEventListener('keyup', (e) => keys.delete(e.code));

// ---------- the loop
let last = performance.now(), fpsN = 0, fpsT = last, fps = 60;
function frame() {
  requestAnimationFrame(frame);
  const now = performance.now();
  const dt = Math.min(0.1, (now - last) / 1000); last = now;
  fpsN++; if (now - fpsT >= 1000) { fps = fpsN * 1000 / (now - fpsT); fpsN = 0; fpsT = now; }
  if (keys.size && !rig.cine) {
    const s = rig.dist * 0.9 * dt;
    if (keys.has('ArrowUp') || keys.has('KeyW')) rig.g.tz -= s;
    if (keys.has('ArrowDown') || keys.has('KeyS')) rig.g.tz += s;
    if (keys.has('ArrowLeft') || keys.has('KeyA')) rig.g.tx -= s;
    if (keys.has('ArrowRight') || keys.has('KeyD')) rig.g.tx += s;
    if (keys.has('KeyQ')) rig.g.dist *= 1 + dt; if (keys.has('KeyE')) rig.g.dist *= 1 - dt;
  }
  rig.update(dt);
  if (game && !paused && !title) game.update(dt);
  fx.update(paused ? 0 : dt * (game ? game.speedMul : 1), camera);
  renderer.render(scene, camera);
  const info = renderer.info.render;
  window.__GAME__ = {
    pos: [+rig.tx.toFixed(3), +rig.tz.toFixed(3)], fps: Math.round(fps), speed: game ? game.speedMul : 0,
    score: game ? game.score : 0, over: game ? game.over : false, draws: info.calls, tris: info.triangles,
    title, paused, stage: current ? current.stage.id : null, cam: { dist: +rig.dist.toFixed(2), pitch: +rig.pitch.toFixed(3) },
    ...(game ? game.telemetry() : {}),
  };
}

// ---------- boot
(async () => {
  try {
    await buildIcons();
    $('loadmsg').textContent = 'Setting the table...';
    preloaded = await makeGame(STAGES[0], false);
    // show the counter behind the title while we wait
    rig.setBounds(STAGES[0].bounds); resize(); rig.home(true);
  } catch (e) { console.warn('[boot]', e); }
  const art = $('title-art');
  const img = new Image(); img.onload = () => { art.style.backgroundImage = `url(${img.src})`; }; img.src = './img/title.jpg';
  $('loadmsg').textContent = (save.reached || 1) > 1 ? 'Welcome back. The olives remember you.' : 'Tap PLAY. Olives fear bread.';
  window.__READY__ = true;
  frame();
})();

window.__START__ = () => $('startb').click();
