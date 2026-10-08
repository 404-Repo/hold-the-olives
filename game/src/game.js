// The tower defense itself: olives on the path, sandwich towers on coasters,
// projectiles, waves, crumbs, bites, gadgets.
import * as THREE from 'three';
import { model, Pool } from './models.js';
import { buildWorld, heightAt } from './world.js';
import { WEAPONS, WEAPON_ORDER, LAYERS, LAYER_ORDER, LAYER_COST, CLUB_BONUS, SELL_BACK, OLIVES, INTRO, GADGETS, ENEMY_SCALE, hpScale, endlessWave, QUIPS, NEXT_NAMES } from './data.js';
const pick = (a) => a[Math.floor(Math.random() * a.length)];

const V = new THREE.Vector3(), V2 = new THREE.Vector3(), Q = new THREE.Quaternion(), E = new THREE.Euler(), S = new THREE.Vector3(), M = new THREE.Matrix4();
const COL = new THREE.Color();
const WHITE = new THREE.Color(1, 1, 1);
const rand = (a, b) => a + Math.random() * (b - a);
const TS = 1.45;  // tower stacks read bigger than life at the overview zoom (critic round 1: towers too small)

export class Game {
  constructor(ctx) {
    Object.assign(this, ctx);          // scene, renderer, rig, ui, audio, fx, stage, endless, save
    this.enemies = []; this.towers = []; this.projs = []; this.slicks = []; this.burners = [];
    this.crumbs = this.stage.start; this.lives = this.stage.lives || 20; this.maxLives = this.lives;
    this.score = 0; this.kills = 0; this.leaked = 0; this.earlyBonus = 0;
    this.wave = 0; this.waveTotal = this.endless ? Infinity : this.stage.waves.length;
    this.spawnQ = []; this.waveT = 0; this.countdown = -1; this.state = 'prep';
    this.time = 0; this.speedMul = 1; this.over = false; this.result = null;
    this.selected = null; this.armed = null;
    this.gcd = { swat: 0, g2: 0 };
    this.seen = new Set(this.save.seen || []);
    this.bossActive = null;
    this.stats = { built: 0, layers: 0, clubs: 0 };
    this.combo = 0; this.comboT = 0; this.bestCombo = 0; this.quipT = 2;
    this.by = {}; this.kinds = {}; this.bosses = 0; this.earlyCalls = 0; this.maxTowers = 0;
  }

  async init() {
    const st = this.stage;
    const w = await buildWorld(this.scene, st, this.renderer);
    this.world = w; this.curve = w.curve; this.length = w.length;
    // dense samples of the path for fast lookup
    const n = Math.ceil(this.length / 0.1);
    this.px = new Float32Array(n + 1); this.pz = new Float32Array(n + 1); this.py = new Float32Array(n + 1);
    this.tx = new Float32Array(n + 1); this.tz = new Float32Array(n + 1);
    const p = new THREE.Vector3(), t = new THREE.Vector3();
    for (let i = 0; i <= n; i++) {
      this.curve.getPointAt(i / n, p); this.curve.getTangentAt(i / n, t);
      this.px[i] = p.x; this.pz[i] = p.z; this.py[i] = heightAt(st, p.x, p.z);
      const l = Math.hypot(t.x, t.z) || 1; this.tx[i] = t.x / l; this.tz[i] = t.z / l;
    }
    this.ns = n;

    this.group = new THREE.Group(); this.scene.add(this.group);
    // olives: one instanced pool per kind
    this.pools = {};
    const kinds = new Set();
    if (this.endless) Object.keys(OLIVES).forEach((k) => kinds.add(k));
    else for (const wave of st.waves) for (const g of wave) { kinds.add(g.t); const d = OLIVES[g.t]; if (d.split) kinds.add(d.split); if (d.spawn) kinds.add(d.spawn); }
    for (const k of kinds) {
      const d = OLIVES[k];
      if (d.boss) continue;
      const proto = await model(d.model, { height: d.h * ENEMY_SCALE });
      this.pools[k] = new Pool(proto, k === 'brute' ? 40 : 140, this.group);
    }
    // health bars: two instanced quads that face the camera
    const barG = new THREE.PlaneGeometry(1, 1);
    this.barBg = new THREE.InstancedMesh(barG, new THREE.MeshBasicMaterial({ color: 0x2a1d14, depthTest: false, transparent: true, opacity: 0.75 }), 300);
    this.barFg = new THREE.InstancedMesh(barG, new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false, transparent: true }), 300);
    for (const b of [this.barBg, this.barFg]) { b.count = 0; b.frustumCulled = false; this.group.add(b); }
    this.barBg.renderOrder = 10; this.barFg.renderOrder = 11;
    for (let i = 0; i < 300; i++) this.barFg.setColorAt(i, WHITE);

    // projectiles: prototypes to clone
    this.projProto = {};
    for (const k of WEAPON_ORDER) {
      const wd = WEAPONS[k];
      if (wd.proj && !this.projProto[wd.proj]) {
        const h = { proj_toothpick: 0.12, proj_pickle: 0.12, proj_mustard: 0.32, proj_toast: 0.5, proj_shred: 0.1 }[wd.proj] || 0.2;
        this.projProto[wd.proj] = await model(wd.proj === 'proj_shred' ? 'proj_pickle' : wd.proj, { height: h });
      }
    }
    this.projPools = {};

    // tower parts, loaded once and cloned
    this.parts = {};
    const partNames = ['pad_coaster', 'layer_bread', 'flag_club', ...LAYER_ORDER.map((l) => LAYERS[l].model), ...WEAPON_ORDER.map((w) => WEAPONS[w].head)];
    const partH = { pad_coaster: 0.09, layer_bread: 0.16, flag_club: 0.9, layer_lettuce: 0.12, layer_tomato: 0.12, layer_cheese: 0.07, layer_bacon: 0.09, head_ballista: 0.75, head_pickle: 0.8, head_mustard: 1.0, head_pepper: 1.0, head_grater: 0.9, head_toaster: 0.95 };
    await Promise.all(partNames.map(async (nm) => { this.parts[nm] = await model(nm, { height: partH[nm] }); }));

    // pads
    this.pads = [];
    const ringG = new THREE.RingGeometry(0.62, 0.74, 40); ringG.rotateX(-Math.PI / 2);
    this.padRingMat = new THREE.MeshBasicMaterial({ color: 0xfff2c0, transparent: true, opacity: 0.7, depthWrite: false });
    for (const [x, z] of this.placePads(st)) {
      const y = heightAt(st, x, z);
      const pad = this.parts.pad_coaster.clone(); pad.position.set(x, y, z); pad.rotation.y = rand(0, 6);
      pad.traverse((m) => { if (m.isMesh) m.receiveShadow = true; });
      this.group.add(pad);
      const ring = new THREE.Mesh(ringG, this.padRingMat); ring.position.set(x, y + 0.11, z); this.group.add(ring);
      this.pads.push({ x, z, y, pad, ring, tower: null });
    }
    // range ring for the selected tower
    const rg = new THREE.RingGeometry(0.97, 1, 64); rg.rotateX(-Math.PI / 2);
    this.rangeRing = new THREE.Mesh(rg, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, depthWrite: false }));
    const rf = new THREE.CircleGeometry(1, 64); rf.rotateX(-Math.PI / 2);
    this.rangeFill = new THREE.Mesh(rf, new THREE.MeshBasicMaterial({ color: 0xfff2c0, transparent: true, opacity: 0.16, depthWrite: false }));
    this.rangeRing.visible = this.rangeFill.visible = false; this.group.add(this.rangeRing, this.rangeFill);

    // the sandwich (what you defend) on its plate
    const [sx, sz] = st.sandwich;
    this.sandPos = new THREE.Vector3(sx, 0, sz);
    const plate = await model('dinner_plate', { height: 0.25 }); plate.position.set(sx, 0, sz); plate.scale.multiplyScalar(1.45); this.group.add(plate);
    plate.traverse((m) => { if (m.isMesh) { m.receiveShadow = true; m.castShadow = true; } });
    this.sandwich = await model('club_sandwich', { height: 3.0, keepHierarchy: true });
    this.sandwich.position.set(sx, 0.2, sz); this.sandwich.rotation.y = -0.5;
    this.sandwich.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
    this.group.add(this.sandwich);
    const L = this.sandwich.userData.layers || {};
    this.sandLayers = Object.keys(L).sort((a, b) => +a.slice(1) - +b.slice(1)).map((k) => L[k]);   // l1 = top
    // burners (stove gadget)
    for (const b of st.burners || []) this.burners.push({ x: b[0], z: b[1], t: 0 });
    // spawn point marker for the camera intro
    this.spawnPos = new THREE.Vector3(this.px[0], 0, this.pz[0]);
    this.ui.setGadgets(this.stage.gadget);
    this.refreshHud();
  }

  /**
   * Where the coasters go. Greedy: each pick is the free spot that covers the
   * most path within a typical tower's reach, a thumb's width from the flour
   * and from other coasters, off the board's edge and clear of the props.
   */
  placePads(st) {
    const want = st.pads.length;
    const [x0, z0, x1, z1] = st.bounds;
    const props = (this.world.props || []);
    const near = (x, z) => { let m = 1e9; for (let i = 0; i <= this.ns; i += 2) { const d = (this.px[i] - x) ** 2 + (this.pz[i] - z) ** 2; if (d < m) m = d; } return Math.sqrt(m); };
    const cands = [];
    for (let x = x0 + 0.8; x <= x1 - 0.8; x += 0.35) for (let z = z0 + 1.5; z <= z1 - 0.6; z += 0.35) {
      const d = near(x, z);
      if (d < 1.25 || d > 2.6) continue;
      if (Math.hypot(x - st.sandwich[0], z - st.sandwich[1]) < 2.6) continue;
      if (props.some((p) => Math.hypot(p[0] - x, p[1] - z) < p[2] + 0.75)) continue;
      let edge = false;
      for (const [a, b, c, e] of st.plat || []) { const inX = x > a - 0.7 && x < c + 0.7, inZ = z > b - 0.7 && z < e + 0.7; const deep = x > a + 0.7 && x < c - 0.7 && z > b + 0.7 && z < e - 0.7; if (inX && inZ && !deep) edge = true; }
      if (edge) continue;
      let cover = 0;
      for (let i = 0; i <= this.ns; i += 3) if ((this.px[i] - x) ** 2 + (this.pz[i] - z) ** 2 < 9) cover++;
      cands.push({ x, z, cover });
    }
    const out = [];
    while (out.length < want && cands.length) {
      cands.sort((a, b) => b.cover - a.cover);
      const c = cands.shift();
      out.push([+c.x.toFixed(2), +c.z.toFixed(2)]);
      for (let i = cands.length - 1; i >= 0; i--) if (Math.hypot(cands[i].x - c.x, cands[i].z - c.z) < 1.75) cands.splice(i, 1);
      // diminishing returns: spread along the route rather than stacking at one bend
      for (const k of cands) if (Math.hypot(k.x - c.x, k.z - c.z) < 3.4) k.cover *= 0.72;
    }
    return out;
  }

  // ----- path helpers
  at(d, off = 0, out = V) {
    const f = Math.max(0, Math.min(this.ns, (d / this.length) * this.ns));
    const i = Math.min(this.ns - 1, Math.floor(f)), u = f - i;
    const x = this.px[i] + (this.px[i + 1] - this.px[i]) * u, z = this.pz[i] + (this.pz[i + 1] - this.pz[i]) * u;
    const tx = this.tx[i], tz = this.tz[i];
    out.set(x - tz * off, this.py[i] + (this.py[i + 1] - this.py[i]) * u, z + tx * off);
    out.userData = { tx, tz };
    return out;
  }

  // ----- waves
  startWave() {
    if (this.over || this.wave >= this.waveTotal) return;
    let bonus = 0;
    if (this.countdown > 0 && this.wave > 0) { this.earlyCalls++; bonus = Math.ceil(this.countdown * 1.5); this.crumbs += bonus; this.score += bonus * 10; this.earlyBonus += bonus; this.fx.text3(this.sandPos.x, 3.2, this.sandPos.z, `+${bonus} early!`, '#ffe066'); }
    const groups = this.endless ? endlessWave(this.wave + 1) : this.stage.waves[this.wave];
    this.wave++;
    this.spawnQ = [];
    for (const g of groups) for (let i = 0; i < g.n; i++) this.spawnQ.push({ t: g.at + i * g.gap, type: g.t });
    this.spawnQ.sort((a, b) => a.t - b.t);
    this.waveT = 0; this.countdown = -1; this.state = 'running';
    this.audio.sfx('ding');
    const big = groups.find((g) => OLIVES[g.t].boss);
    const fresh = [...new Set(groups.map((g) => g.t))].filter((t) => !this.seen.has(t) && INTRO[t]);
    if (big) this.ui.banner(OLIVES[big.t].name, 'is coming', 2600);
    else this.ui.banner(this.endless ? `WAVE ${this.wave}` : (this.wave === this.waveTotal ? 'FINAL WAVE' : `WAVE ${this.wave}`), fresh.length ? INTRO[fresh[0]] : '', 1800);
    for (const t of fresh) this.seen.add(t);
    this.save.seen = [...this.seen];
    this.refreshHud();
  }

  spawn(type, d = 0, off = null) {
    const def = OLIVES[type];
    const sc = hpScale(this.stage.num, this.wave);
    const e = {
      type, def, hp: def.hp * sc, maxHp: def.hp * sc, d, off: off ?? rand(-0.32, 0.32), speed: def.speed * rand(0.94, 1.06),
      slowT: 0, slowF: 1, burnT: 0, burnDps: 0, shredT: 0, stunT: 0, frozenT: 0, flash: 0, phase: rand(0, 6), alive: true,
      pos: new THREE.Vector3(), yaw: 0, spawnT: def.spawnEvery || 0, boss: !!def.boss, h: def.h * ENEMY_SCALE, born: this.time,
    };
    if (def.boss) {
      e.obj = null;
      model(def.model, { height: def.h, keepHierarchy: true }).then((o) => {
        e.obj = o; o.traverse((m) => { if (m.isMesh) m.castShadow = true; }); this.group.add(o);
        if (!e.alive) this.group.remove(o);
      });
      this.bossActive = e;
      this.ui.boss(def.name, 1);
      this.audio.music('boss');
      this.audio.sfx('lid');
      // the entrance shot: look at the spawn, then come back
      const s = this.at(0, 0, V2).clone();
      const c = this.rig.cam.position.clone();
      this.rig.play([
        { t: 0, pos: c.toArray(), look: [this.rig.tx, 0, this.rig.tz] },
        { t: 1.1, pos: [s.x + 3.5, 4.2, s.z + 7.5], look: [s.x, 1.4, s.z] },
        { t: 2.6, pos: [s.x + 3.2, 3.8, s.z + 6.8], look: [s.x, 1.6, s.z] },
        { t: 3.6, pos: c.toArray(), look: [this.rig.tx, 0, this.rig.tz] },
      ]);
    }
    this.enemies.push(e);
    if (def.boss) setTimeout(() => this.say(e, pick(QUIPS[type] || ['...'])), 3700);
    else if (this.quipT <= 0 && Math.random() < 0.35) { this.quipT = 3.5; setTimeout(() => this.say(e, pick(QUIPS[type] || QUIPS.spawn)), 700); }
    return e;
  }

  say(e, text) {
    if (!e.alive) return;
    this.fx.bubble(e.pos.x, e.pos.y + e.h + 0.5, e.pos.z, text);
  }

  /** What the next wave holds, for the button. */
  nextPreview() {
    const groups = this.endless ? endlessWave(this.wave + 1) : this.stage.waves[this.wave];
    if (!groups) return '';
    const n = {}; for (const g of groups) n[g.t] = (n[g.t] || 0) + g.n;
    return Object.entries(n).map(([t, c]) => OLIVES[t].boss ? NEXT_NAMES[t] : `${c} ${NEXT_NAMES[t]}`).join(', ');
  }

  // ----- towers
  statsOf(t) {
    const w = WEAPONS[t.weapon];
    let range = w.range, dmg = w.dmg, rate = w.rate, burn = 0;
    for (const l of t.layers) { const L = LAYERS[l]; if (L.range) range *= L.range; if (L.dmg) dmg *= L.dmg; if (L.rate) rate *= L.rate; if (L.burn) burn += L.burn; }
    range *= 1 + 0.04 * t.layers.length;          // a taller sandwich sees further
    if (t.club) { range *= 1.08; dmg *= CLUB_BONUS; rate *= CLUB_BONUS; }
    return { range, dmg, rate, burn };
  }

  async build(pad, weapon) {
    const w = WEAPONS[weapon];
    if (pad.tower || this.crumbs < w.cost) return false;
    this.crumbs -= w.cost;
    const t = { pad, weapon, layers: [], spent: w.cost, cd: 0.3, yaw: Math.PI, priority: 'first', club: false, group: new THREE.Group(), stack: [], head: null, recoil: 0, built: this.time, pulse: 0 };
    pad.tower = t; pad.ring.visible = false;
    t.group.position.set(pad.x, pad.y + 0.09, pad.z); t.group.scale.setScalar(TS);
    this.group.add(t.group);
    this.towers.push(t); this.maxTowers = Math.max(this.maxTowers, this.towers.length);
    this.layout(t, null);
    this.stats.built++;
    this.audio.sfx('build');
    this.fx.burst(pad.x, pad.y + 0.4, pad.z, 0xf3ddb0, 14, 2.2);
    this.refreshHud();
    return true;
  }

  /** Rebuild a tower's stack: bread, layers, (top bread), head, flag. */
  layout(t, dropped) {
    const g = t.group;
    while (g.children.length) g.remove(g.children[0]);
    let y = 0;
    const put = (name, isNew) => {
      const o = this.parts[name].clone();
      o.position.y = y; o.rotation.y = rand(-0.25, 0.25);
      o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
      g.add(o);
      const b = new THREE.Box3().setFromObject(o); y += Math.max(0.04, b.max.y - b.min.y) * 0.92;
      if (isNew) { o.userData.drop = 1.6; o.userData.baseY = o.position.y; o.position.y += 1.6; }
      return o;
    };
    put('layer_bread');
    if (!t.layers.length) put('layer_lettuce', false);   // a sandwich from the first crumb: the critic read bread plus crossbow as a placeholder
    t.layers.forEach((l, i) => put(LAYERS[l].model, dropped === i));
    put('layer_bread', t.layers.length > 0 && dropped !== null);
    t.head = put(WEAPONS[t.weapon].head, false);
    t.headY = t.head.position.y;
    t.height = y * TS;
    if (t.club) {
      // a frilled pick through the stack, standing proud beside the weapon
      const f = this.parts.flag_club.clone();
      f.position.set(0.36, Math.max(0, t.headY - 0.55), -0.3);
      f.traverse((m) => { if (m.isMesh) m.castShadow = true; });
      g.add(f);
    }
  }

  addLayer(t, layer) {
    const n = t.layers.length;
    if (n >= 3) return false;
    const cost = LAYER_COST[n];
    if (this.crumbs < cost) return false;
    this.crumbs -= cost; t.spent += cost;
    t.layers.push(layer);
    const becameClub = t.layers.length === 3 && new Set(t.layers).size === 3;
    if (becameClub) { t.club = true; this.stats.clubs++; }
    this.layout(t, t.layers.length - 1);
    this.stats.layers++;
    this.audio.sfx('layer');
    if (becameClub) {
      this.ui.banner('CLUB!', 'Three different layers: +25% everything', 1600);
      this.audio.sfx('club');
      this.fx.burst(t.pad.x, t.height + 0.5, t.pad.z, 0xffe066, 30, 3.5);
      this.score += 250;
    }
    this.refreshHud();
    return true;
  }

  sell(t) {
    const back = Math.floor(t.spent * SELL_BACK);
    this.crumbs += back;
    this.group.remove(t.group);
    t.pad.tower = null; t.pad.ring.visible = true;
    this.towers.splice(this.towers.indexOf(t), 1);
    this.fx.text3(t.pad.x, 1.2, t.pad.z, `+${back}`, '#fff2c0');
    this.audio.sfx('coin');
    this.deselect();
    this.refreshHud();
  }

  select(pad) {
    this.selected = pad;
    const t = pad.tower;
    if (t) {
      const r = this.statsOf(t).range;
      this.rangeRing.scale.setScalar(r); this.rangeFill.scale.setScalar(r);
      this.rangeRing.position.set(pad.x, pad.y + 0.06, pad.z); this.rangeFill.position.copy(this.rangeRing.position);
      this.rangeRing.visible = this.rangeFill.visible = true;
    } else this.rangeRing.visible = this.rangeFill.visible = false;
    this.ui.openMenu(this, pad);
    // keep the coaster you tapped in view above the menu
    const top = document.getElementById('menu').getBoundingClientRect().top;
    V.set(pad.x, pad.y + 0.5, pad.z).project(this.rig.cam);
    const y = (1 - V.y) / 2 * innerHeight;
    if (y > top - 70) this._preNudge = this._preNudge || { tx: this.rig.g.tx, tz: this.rig.g.tz };
    if (y > top - 70) this.rig.pan(0, -(y - (top - 110)) * (this.rig.dist * 1.6 / innerHeight) / Math.max(0.5, Math.sin(this.rig.pitch)));
  }
  previewRange(pad, r) {
    if (!r) { if (!pad.tower) this.rangeRing.visible = this.rangeFill.visible = false; return; }
    this.rangeRing.scale.setScalar(r); this.rangeFill.scale.setScalar(r);
    this.rangeRing.position.set(pad.x, pad.y + 0.06, pad.z); this.rangeFill.position.copy(this.rangeRing.position);
    this.rangeRing.visible = this.rangeFill.visible = true;
  }
  deselect() {
    this.selected = null; this.rangeRing.visible = this.rangeFill.visible = false; this.ui.closeMenu();
    if (this._preNudge) { this.rig.g.tx = this._preNudge.tx; this.rig.g.tz = this._preNudge.tz; this._preNudge = null; }
  }

  // ----- input
  groundAt(sx, sy) {
    const r = new THREE.Raycaster();
    const ndc = new THREE.Vector2((sx / innerWidth) * 2 - 1, -(sy / innerHeight) * 2 + 1);
    r.setFromCamera(ndc, this.rig.cam);
    const p = new THREE.Vector3();
    if (!r.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.15), p)) return null;
    return p;
  }

  tap(sx, sy) {
    if (this.over) return;
    if (this.armed) {
      const p = this.groundAt(sx, sy);
      if (p) this.useGadget(this.armed, p);
      return;
    }
    // nearest pad on screen, forgiving for thumbs
    let best = null, bd = 1e9;
    for (const pad of this.pads) {
      V.set(pad.x, pad.y + 0.4, pad.z).project(this.rig.cam);
      const x = (V.x + 1) / 2 * innerWidth, y = (1 - V.y) / 2 * innerHeight;
      const d = Math.hypot(x - sx, y - sy);
      if (d < bd) { bd = d; best = pad; }
    }
    const reach = Math.max(38, Math.min(70, innerHeight * 0.055));
    if (best && bd < reach) { this.audio.sfx('tick'); this.select(best); }
    else this.deselect();
  }

  arm(which) {
    const key = which === 1 ? 'swat' : this.stage.gadget;
    const slot = which === 1 ? 'swat' : 'g2';
    if (this.gcd[slot] > 0 || this.over) return;
    const G = GADGETS[key];
    if (key === 'pepper' || key === 'ice') { this.useGadget(key, null); return; }
    this.armed = this.armed === key ? null : key;
    this.ui.armed(this.armed ? which : 0, this.armed ? G.hint : '');
    this.deselect();
  }

  useGadget(key, p) {
    const G = GADGETS[key];
    const slot = key === 'swat' ? 'swat' : 'g2';
    if (key === 'swat') {
      this.fx.spatula(p.x, p.z);
      setTimeout(() => {
        this.audio.sfx('slap'); this.rig.shake(0.5, 0.35);
        this.fx.ring(p.x, p.z, G.radius, 0xfff2c0);
        for (const e of this.enemies) if (e.alive && e.pos.distanceTo(p) < G.radius + 0.2 && !e.boss) { this.hurt(e, G.dmg, 'swat'); e.stunT = G.stun; }
        for (const e of this.enemies) if (e.alive && e.boss && e.pos.distanceTo(p) < G.radius + 1) this.hurt(e, G.dmg, 'swat');
      }, 260);
    } else if (key === 'burner') {
      let best = null, bd = 3;
      for (const b of this.burners) { const d = Math.hypot(b.x - p.x, b.z - p.z); if (d < bd) { bd = d; best = b; } }
      if (!best) { this.ui.toast('Tap on a burner'); return; }
      best.t = G.dur; this.audio.sfx('whoosh'); this.fx.ring(best.x, best.z, G.radius, 0xff7a2a);
    } else if (key === 'tap') {
      this.audio.sfx('splash'); this.fx.ring(p.x, p.z, 2.2, 0x9fd8ff); this.rig.shake(0.3, 0.3);
      for (const e of this.enemies) if (e.alive && !e.boss && e.pos.distanceTo(p) < 2.6) { e.d = Math.max(0, e.d - G.push); this.hurt(e, G.dmg, 'tap'); e.stunT = 0.6; }
      this.fx.burst(p.x, 0.3, p.z, 0x9fd8ff, 30, 4);
    } else if (key === 'pepper') {
      this.audio.sfx('grind');
      for (const e of this.enemies) if (e.alive) { e.slowT = G.dur; e.slowF = G.slow; this.hurt(e, G.dmg, 'pepper'); }
      this.fx.pepperStorm(this.rig.tx, this.rig.tz);
    } else if (key === 'ice') {
      this.audio.sfx('ice'); this.rig.shake(0.4, 0.4);
      for (const e of this.enemies) if (e.alive) e.frozenT = G.dur * (e.boss ? 0.4 : 1);
      this.fx.iceFall(this.rig.tx, this.rig.tz);
    }
    this.gcd[slot] = G.cd;
    this.armed = null; this.ui.armed(0, '');
  }

  // ----- damage
  hurt(e, dmg, src, w) {
    if (!e.alive) return;
    let a = e.def.armor || 0;
    if (e.shredT > 0 || src === 'grater') a = 0;
    if (src === 'lob' || src === 'aura') a *= 0.5;
    let k = dmg * (1 - a);
    if (e.shredT > 0) k *= 1.3;
    if (a > 0.3 && src === 'bolt' && Math.random() < 0.5) this.fx.ping(e.pos.x, e.pos.y + e.h, e.pos.z);
    e.hp -= k; e.flash = 0.12; e.src = src === 'lob' && w ? w : src;
    if (e.boss) {
      this.ui.boss(e.def.name, Math.max(0, e.hp / e.maxHp));
      if (!e.enraged && e.hp < e.maxHp * 0.4 && e.hp > 0) {
        e.enraged = true; e.speed *= 1.3; e.spawnEvery = (e.def.spawnEvery || 4) * 0.6;
        const lines = { jar: 'THE JAR has lost its lid!', bottle: 'THE OIL BOTTLE is boiling!', martini: 'THE MARTINI is SHAKEN!' };
        this.ui.banner(lines[e.type] || 'ENRAGED', 'hit it with everything', 1800); this.rig.shake(0.5, 0.5); this.audio.sfx('lid');
      }
    }
    if (e.hp <= 0) this.kill(e);
  }

  kill(e) {
    e.alive = false; this.kills++;
    const r = e.def.reward;
    this.crumbs += r; this.score += r * 10;
    // chain pops within a second and a half: small wins on top of small wins
    this.by[e.src] = (this.by[e.src] || 0) + 1; this.kinds[e.type] = (this.kinds[e.type] || 0) + 1; if (e.boss) this.bosses++;
    this.combo = this.comboT > 0 ? this.combo + 1 : 1; this.comboT = 0.9;
    if (this.combo > this.bestCombo) this.bestCombo = this.combo;
    if (this.combo >= 5 && this.combo % 5 === 0) {
      const bonus = this.combo / 5 * 2; this.crumbs += bonus; this.score += this.combo * 20;
      this.fx.text3(e.pos.x, e.pos.y + e.h + 0.9, e.pos.z, `COMBO x${this.combo}  +${bonus}`, '#ffd24d', 1.15);
      this.audio.sfx('club', 0.5);
    }
    if (!e.boss && this.quipT <= 0 && Math.random() < 0.08) { this.quipT = 3; this.fx.bubble(e.pos.x, e.pos.y + e.h + 0.6, e.pos.z, pick(QUIPS.pop)); }
    const col = { green: 0x8aa52e, kalamata: 0x5a2a4e, stuffed: 0x8aa52e, pimento: 0xe03a2a, ring: 0x221c22, knight: 0x8aa52e, brute: 0xa6c93a, greaser: 0xd9b23a }[e.type] || 0x8aa52e;
    this.fx.splat(e.pos.x, e.pos.y, e.pos.z, col, e.boss ? 3 : e.type === 'brute' ? 1.4 : 0.8);
    this.fx.burst(e.pos.x, e.pos.y + e.h * 0.5, e.pos.z, col, e.boss ? 60 : 10, e.boss ? 6 : 2.6);
    this.fx.crumbs(e.pos.x, e.pos.y + 0.3, e.pos.z, Math.min(8, 2 + Math.floor(r / 3)));
    this.fx.text3(e.pos.x, e.pos.y + e.h + 0.2, e.pos.z, `+${r}`, '#ffe9a8');
    this.audio.sfx(e.boss ? 'bossdie' : 'pop');
    if (e.def.split) for (let i = 0; i < 2; i++) { const s = this.spawn(e.def.split, Math.max(0, e.d + (i ? 0.2 : -0.2)), e.off + (i ? 0.15 : -0.15)); s.stunT = 0.25; }
    if (e.boss) {
      if (e.obj) this.group.remove(e.obj);
      this.bossActive = null; this.ui.boss(null);
      this.audio.music(this.stage.music);
      this.rig.shake(0.8, 0.6);
      this.ui.banner(`${e.def.name}`, 'is done for!', 2200);
      this.score += 2000;
    }
  }

  leak(e) {
    e.alive = false;
    if (e.boss && e.obj) this.group.remove(e.obj);
    if (e.boss) { this.bossActive = null; this.ui.boss(null); this.audio.music(this.stage.music); }
    const b = e.def.bites;
    this.lives = Math.max(0, this.lives - b); this.leaked += b;
    this.audio.sfx('chomp'); this.rig.shake(0.35, 0.25);
    this.fx.burst(this.sandPos.x, 2.0, this.sandPos.z, 0xf3ddb0, 16, 3);
    this.fx.text3(this.sandPos.x, 3.4, this.sandPos.z, b > 1 ? `-${b} bites!` : pick(['CHOMP', ...QUIPS.bite]), '#ff7a6a');
    this.ui.flash();
    this.updateSandwich();
    if (this.lives <= 0) this.finish(false);
    this.refreshHud();
  }

  updateSandwich() {
    const L = this.sandLayers; if (!L.length) return;
    // the top layers go first; the bottom slice stays until the end
    const gone = Math.round((1 - this.lives / this.maxLives) * (L.length - 1));
    L.forEach((m, i) => { m.visible = i >= gone; });
  }

  finish(won) {
    if (this.over) return;
    this.over = true; this.state = 'over';
    const stars = won ? (this.lives >= this.maxLives * 0.9 ? 3 : this.lives >= this.maxLives * 0.5 ? 2 : 1) : 0;
    if (won) this.score += this.lives * 100;
    this.result = { won, stars, score: this.score, combo: this.bestCombo, by: this.by, kinds: this.kinds, bosses: this.bosses, earlyCalls: this.earlyCalls, maxTowers: this.maxTowers, maxLives: this.maxLives, kills: this.kills, lives: this.lives, wave: this.wave, early: this.earlyBonus, clubs: this.stats.clubs, time: this.time };
    this.audio.sfx(won ? 'win' : 'lose');
    this.audio.music(won ? 'victory' : null);
    if (won) this.fx.confetti(this.sandPos.x, this.sandPos.z);
    setTimeout(() => this.onEnd && this.onEnd(this.result), won ? 1800 : 1400);
  }

  // ----- the loop
  update(dtReal) {
    const dt = Math.min(0.05, dtReal) * this.speedMul;
    this.time += dt;
    if (!this.over) this.sim(dt);
    this.draw(dtReal);
  }

  sim(dt) {
    // spawning
    if (this.state === 'running') {
      this.waveT += dt;
      while (this.spawnQ.length && this.spawnQ[0].t <= this.waveT) this.spawn(this.spawnQ.shift().type);
      if (!this.spawnQ.length && this.countdown < 0 && this.wave < this.waveTotal) this.countdown = this.endless ? 12 : 14;
      if (!this.spawnQ.length && this.wave >= this.waveTotal && !this.enemies.some((e) => e.alive)) this.finish(true);
    }
    if (this.countdown > 0) {
      const alive = this.enemies.some((e) => e.alive);
      this.countdown -= dt * (alive ? 1 : 2.2);
      if (this.countdown <= 0) this.startWave();
    }
    for (const k in this.gcd) if (this.gcd[k] > 0) this.gcd[k] = Math.max(0, this.gcd[k] - dt);
    this.comboT -= dt; this.quipT -= dt;
    // slicks age
    for (const s of this.slicks) s.t -= dt;
    this.slicks = this.slicks.filter((s) => s.t > 0);
    // burners
    for (const b of this.burners) if (b.t > 0) {
      b.t -= dt;
      for (const e of this.enemies) if (e.alive && Math.hypot(e.pos.x - b.x, e.pos.z - b.z) < GADGETS.burner.radius) this.hurt(e, GADGETS.burner.dmg * dt, 'fire');
    }

    // olives
    for (const e of this.enemies) {
      if (!e.alive) continue;
      e.flash = Math.max(0, e.flash - dt);
      if (e.burnT > 0) { e.burnT -= dt; this.hurt(e, e.burnDps * dt, 'burn'); if (!e.alive) continue; }
      if (e.shredT > 0) e.shredT -= dt;
      if (e.slowT > 0) e.slowT -= dt; else e.slowF = 1;
      let sp = e.speed * (e.slowT > 0 ? e.slowF : 1);
      if (e.stunT > 0) { e.stunT -= dt; sp = 0; }
      if (e.frozenT > 0) { e.frozenT -= dt; sp = 0; }
      for (const s of this.slicks) if (Math.abs(s.d - e.d) < 0.7 && !e.def.slick) { sp *= 1.4; break; }
      e.d += sp * dt;
      e.phase += sp * dt * (e.def.roll ? 1 : 9);
      this.at(e.d, e.off, e.pos);
      const u = e.pos.userData; e.yaw = Math.atan2(u.tx, u.tz);
      if (e.def.slick && (!e.lastSlick || e.d - e.lastSlick > 1.5)) { e.lastSlick = e.d; this.slicks.push({ d: e.d, t: e.boss ? 10 : 7 }); this.fx.oil(e.pos.x, e.pos.y, e.pos.z, e.boss ? 1.4 : 0.6); }
      if (e.boss && e.def.spawn) {
        e.spawnT -= dt;
        if (e.spawnT <= 0) {
          e.spawnT = e.spawnEvery || e.def.spawnEvery;
          for (let i = 0; i < 3; i++) this.spawn(e.def.spawn, Math.max(0, e.d - 0.6 - i * 0.3), rand(-0.4, 0.4));
          this.audio.sfx('lid'); e.spit = 0.8;
        }
      }
      if (e.d >= this.length) this.leak(e);
    }
    this.enemies = this.enemies.filter((e) => e.alive);

    // towers
    for (const t of this.towers) {
      const s = this.statsOf(t), w = WEAPONS[t.weapon];
      t.cd -= dt;
      t.recoil = Math.max(0, t.recoil - dt * 4);
      const pos = V2.set(t.pad.x, t.pad.y, t.pad.z);
      if (w.kind === 'aura') {
        if (t.cd <= 0) {
          let any = false;
          for (const e of this.enemies) if (e.alive && Math.hypot(e.pos.x - pos.x, e.pos.z - pos.z) < s.range) { any = true; this.hurt(e, s.dmg, 'aura'); if (s.burn) { e.burnT = 2; e.burnDps = s.dmg * s.burn / 2; } }
          if (any) { t.cd = 1 / s.rate; t.recoil = 1; this.fx.puff(pos.x, t.height * 0.8, pos.z, s.range); this.audio.sfx('grind', 0.4); }
        }
        continue;
      }
      // pick a target
      let tgt = null, score = -1e9;
      for (const e of this.enemies) {
        if (!e.alive) continue;
        const d = Math.hypot(e.pos.x - pos.x, e.pos.z - pos.z);
        if (d > s.range) continue;
        const sc = t.priority === 'strong' ? e.hp : t.priority === 'close' ? -d : e.d;
        if (sc > score) { score = sc; tgt = e; }
      }
      if (tgt) {
        const want = Math.atan2(tgt.pos.x - pos.x, tgt.pos.z - pos.z);
        let dy = want - t.yaw; while (dy > Math.PI) dy -= Math.PI * 2; while (dy < -Math.PI) dy += Math.PI * 2;
        t.yaw += dy * Math.min(1, dt * 14);
        if (t.cd <= 0 && Math.abs(dy) < 0.5) { t.cd = 1 / s.rate; this.fire(t, tgt, s, w); }
      }
    }

    // projectiles
    for (const p of this.projs) {
      p.t += dt;
      if (p.kind === 'bolt') {
        if (p.target.alive) p.to.copy(p.target.pos).setY(p.target.pos.y + p.target.h * 0.5);
        V.subVectors(p.to, p.pos); const d = V.length(); const step = p.speed * dt;
        if (d <= step + 0.15) { p.done = true; this.impact(p); }
        else { p.pos.addScaledVector(V, step / d); p.dir.copy(V).normalize(); }
      } else {
        const u = Math.min(1, p.t / p.dur);
        p.pos.lerpVectors(p.from, p.to, u); p.pos.y += Math.sin(u * Math.PI) * p.arc;
        p.spin += dt * 10;
        if (u >= 1) { p.done = true; this.impact(p); }
      }
    }
    this.projs = this.projs.filter((p) => { if (p.done) { this.group.remove(p.obj); } return !p.done; });
  }

  fire(t, tgt, s, w) {
    t.recoil = 1;
    const start = new THREE.Vector3(t.pad.x, t.height * 0.85 + t.pad.y, t.pad.z);
    const obj = this.projProto[w.proj] ? this.projProto[w.proj].clone() : new THREE.Group();
    if (w.kind === 'bolt') {
      this.audio.sfx(t.weapon === 'grater' ? 'shred' : 'thwip', 0.5);
      if (tgt.def.dodge && Math.random() < tgt.def.dodge) {
        // a ring dodges: the bolt flies past where it was
        const to = tgt.pos.clone().add(new THREE.Vector3(rand(-0.6, 0.6), 0.1, rand(-0.6, 0.6)));
        this.projs.push({ kind: 'bolt', pos: start, to, target: { alive: false }, speed: w.speed, dir: new THREE.Vector3(), obj, t: 0, dmg: 0, miss: true, w, s, tw: t });
      } else this.projs.push({ kind: 'bolt', pos: start, to: tgt.pos.clone(), target: tgt, speed: w.speed, dir: new THREE.Vector3(), obj, t: 0, dmg: s.dmg, w, s, tw: t });
    } else {
      // lead the target: where will it be when this lands?
      const dist = Math.hypot(tgt.pos.x - start.x, tgt.pos.z - start.z);
      const dur = w.kind === 'cone' ? 0.35 + dist * 0.05 : 0.6 + dist * 0.09;
      const lead = this.at(tgt.d + tgt.speed * (tgt.slowT > 0 ? tgt.slowF : 1) * dur * (tgt.stunT > 0 || tgt.frozenT > 0 ? 0 : 1), tgt.off, new THREE.Vector3());
      this.audio.sfx(t.weapon === 'toaster' ? 'toast' : t.weapon === 'mustard' ? 'squirt' : 'thunk', 0.6);
      this.projs.push({ kind: w.kind, from: start, pos: start.clone(), to: lead, dur, arc: w.kind === 'cone' ? 0.6 : 1.4 + dist * 0.25, obj, t: 0, spin: 0, dmg: s.dmg, w, s, tw: t });
    }
    const p = this.projs[this.projs.length - 1];
    p.obj.position.copy(p.pos); this.group.add(p.obj);
  }

  impact(p) {
    const { w, s } = p;
    if (p.kind === 'bolt') {
      if (p.miss) { this.fx.text3(p.to.x, p.to.y + 0.6, p.to.z, 'miss', '#d0d0d0', 0.7); return; }
      const e = p.target;
      this.hurt(e, p.dmg, p.w.shred ? 'grater' : 'bolt');
      if (w.shred) e.shredT = w.shred;
      if (s.burn) { e.burnT = 2; e.burnDps = p.dmg * s.burn / 2; }
      this.fx.burst(p.to.x, p.to.y, p.to.z, w.shred ? 0xf7c534 : 0xe8cfa0, 3, 1.2);
      return;
    }
    const R = w.kind === 'cone' ? 0.85 : w.splash;
    let n = 0;
    for (const e of this.enemies) {
      if (!e.alive) continue;
      const d = Math.hypot(e.pos.x - p.to.x, e.pos.z - p.to.z);
      if (d > R + (e.boss ? 1 : 0.15)) continue;
      n++;
      if (w.kind === 'cone') { e.slowT = w.slowT; e.slowF = Math.min(e.slowF, w.slow); }
      this.hurt(e, p.dmg * (d < R * 0.5 ? 1 : 0.7), 'lob', p.w.proj === 'proj_toast' ? 'toast' : p.w.proj === 'proj_mustard' ? 'mustard' : 'pickle');
      if (s.burn && e.alive) { e.burnT = 2; e.burnDps = p.dmg * s.burn / 2; }
    }
    const col = w.kind === 'cone' ? 0xf2b705 : p.w.proj === 'proj_toast' ? 0xdca55a : 0x7c9c2c;
    this.fx.splat(p.to.x, p.to.y, p.to.z, col, R * (w.kind === 'cone' ? 0.9 : 0.7));
    this.fx.burst(p.to.x, p.to.y + 0.2, p.to.z, col, w.kind === 'cone' ? 6 : 12, 2.2);
    if (p.w.proj === 'proj_toast') { this.rig.shake(0.25, 0.2); this.audio.sfx('boom', 0.6); }
    else this.audio.sfx(w.kind === 'cone' ? 'splat' : 'squish', 0.5);
  }

  draw(dt) {
    const cam = this.rig.cam;
    // olives into their pools
    for (const k in this.pools) this.pools[k].begin();
    let nb = 0;
    const cq = cam.quaternion;
    for (const e of this.enemies) {
      if (!e.alive) continue;
      const def = e.def;
      const moving = e.stunT <= 0 && e.frozenT <= 0;
      const hop = moving ? Math.abs(Math.sin(e.phase)) : 0;
      const age = Math.min(1, (this.time - e.born) * 3);
      if (e.boss) {
        if (e.obj) {
          e.obj.position.set(e.pos.x, e.pos.y + hop * 0.12, e.pos.z);
          e.obj.rotation.set(0, e.yaw, Math.sin(e.phase * 0.5) * 0.06);
          const lid = e.obj.userData.lid || e.obj.userData.cork || e.obj.userData.olive;
          if (lid) { e.spit = Math.max(0, (e.spit || 0) - dt); lid.position.y = (lid.userData.y0 ??= lid.position.y) + e.spit * 0.5; lid.rotation.y += e.spit * dt * 8; }
        }
      } else {
        const pool = this.pools[e.type]; if (!pool) continue;
        if (def.roll) {
          // the ring's face looks along +Z, so its axle is local Z: turn it side-on to the road and spin about Z
          E.set(0, e.yaw - Math.PI / 2, 0, 'YXZ'); Q.setFromEuler(E);
          const q2 = new THREE.Quaternion().setFromAxisAngle(V.set(0, 0, 1), -e.d / (e.h * 0.5));
          Q.multiply(q2);
          S.setScalar(age);
          M.compose(V2.set(e.pos.x, e.pos.y, e.pos.z), Q, S);
          // a ring rolls about its centre: lift it so it rotates around the middle
          M.multiply(new THREE.Matrix4().makeTranslation(0, -e.h * 0.5, 0)); M.premultiply(new THREE.Matrix4().makeTranslation(0, e.h * 0.5, 0));
        } else {
          E.set(0, e.yaw, Math.sin(e.phase) * 0.14 * (moving ? 1 : 0), 'YXZ'); Q.setFromEuler(E);
          const sq = 1 + (hop - 0.5) * 0.12;
          S.set((2 - sq) * age, sq * age, (2 - sq) * age);
          M.compose(V2.set(e.pos.x, e.pos.y + hop * 0.08 * e.h * 3, e.pos.z), Q, S);
        }
        COL.setRGB(1, 1, 1);
        if (e.flash > 0) COL.setRGB(2.4, 2.4, 2.4);
        else if (e.frozenT > 0) COL.setRGB(0.7, 0.95, 1.6);
        else if (e.slowT > 0 && e.slowF < 1) COL.setRGB(1.35, 1.2, 0.55);
        else if (e.burnT > 0) COL.setRGB(1.5, 0.85, 0.6);
        pool.push(M, COL);
      }
      // health bar
      if (e.hp < e.maxHp && nb < 300 && !e.boss) {
        const w = Math.max(0.32, e.h * 0.62), f = Math.max(0, e.hp / e.maxHp);
        V.set(e.pos.x, e.pos.y + e.h + 0.22, e.pos.z);
        M.compose(V, cq, S.set(w + 0.06, 0.11, 1)); this.barBg.setMatrixAt(nb, M);
        V2.set(-(1 - f) * w / 2, 0, 0).applyQuaternion(cq); V.add(V2);
        M.compose(V, cq, S.set(w * f, 0.07, 1)); this.barFg.setMatrixAt(nb, M);
        COL.setHSL(0.33 * f, 0.85, 0.5); this.barFg.setColorAt(nb, COL);
        nb++;
      }
    }
    for (const k in this.pools) this.pools[k].end();
    this.barBg.count = this.barFg.count = nb;
    this.barBg.instanceMatrix.needsUpdate = this.barFg.instanceMatrix.needsUpdate = true;
    if (this.barFg.instanceColor) this.barFg.instanceColor.needsUpdate = true;

    // towers: aim, recoil, layers dropping into place
    for (const t of this.towers) {
      if (t.head) {
        t.head.rotation.y = t.yaw;
        const r = t.recoil;
        t.head.scale.set(1 + r * 0.08, 1 - r * 0.1, 1 + r * 0.08);
      }
      for (const o of t.group.children) if (o.userData.drop > 0) {
        o.userData.drop = Math.max(0, o.userData.drop - dt * 6);
        o.position.y = o.userData.baseY + o.userData.drop;
        if (o.userData.drop === 0) { this.fx.burst(t.pad.x, o.position.y * TS + 0.1, t.pad.z, 0xf3ddb0, 6, 1.5); }
      }
    }
    // projectiles face their flight
    for (const p of this.projs) {
      p.obj.position.copy(p.pos);
      if (p.kind === 'bolt') { p.obj.lookAt(V.copy(p.pos).add(p.dir)); p.obj.rotateX(Math.PI / 2); }
      else p.obj.rotation.set(p.spin, p.spin * 0.7, 0);
    }
    // pads breathe when you can afford something
    const cheap = Math.min(...WEAPON_ORDER.filter((k) => this.unlocked(k)).map((k) => WEAPONS[k].cost));
    this.padRingMat.opacity = this.crumbs >= cheap ? 0.45 + Math.sin(this.time * 4) * 0.3 : 0.18;
    // burners glow
    for (const b of this.burners) if (b.t > 0) this.fx.flame(b.x, b.z, GADGETS.burner.radius, dt);
    // the HUD
    this.ui.tick(this);
  }

  unlocked(k) {
    if (this.endless) return true;
    return WEAPONS[k].unlock <= Math.max(this.stage.num, this.save.reached || 1);
  }

  refreshHud() { this.ui.hud(this); }

  telemetry() {
    return {
      wave: this.wave, waves: this.waveTotal === Infinity ? -1 : this.waveTotal, crumbs: this.crumbs, lives: this.lives, countdown: +this.countdown.toFixed(1),
      enemies: this.enemies.length, towers: this.towers.length, kills: this.kills, state: this.state,
      layers: this.towers.reduce((a, t) => a + t.layers.length, 0), clubs: this.stats.clubs,
      pads: this.pads.map((p) => { V.set(p.x, p.y + 0.4, p.z).project(this.rig.cam); return [Math.round((V.x + 1) / 2 * innerWidth), Math.round((1 - V.y) / 2 * innerHeight), p.tower ? p.tower.weapon : '', p.tower ? p.tower.layers.length : 0]; }),
    };
  }

  dispose() {
    this.scene.remove(this.group);
    if (this.world) this.scene.remove(this.world.root);
  }
}
