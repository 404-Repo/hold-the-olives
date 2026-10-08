// Juice: bursts of olive and crumbs, splats that stay on the counter for a
// while, rings, floating numbers, the spatula, flames, pepper, ice, confetti.
import * as THREE from 'three';

const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), P = new THREE.Vector3(), C = new THREE.Color();

export class FX {
  constructor(scene, rig) {
    this.scene = scene; this.rig = rig;
    this.root = new THREE.Group(); scene.add(this.root);
    // particles: one instanced low-poly blob
    const CAP = 700;
    this.pm = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.07, 0), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 }), CAP);
    this.pm.count = 0; this.pm.frustumCulled = false; this.pm.castShadow = false;
    for (let i = 0; i < CAP; i++) this.pm.setColorAt(i, C.set(0xffffff));
    this.root.add(this.pm);
    this.parts = []; this.cap = CAP;
    // splats: flat discs on the counter
    const SC = 160;
    const sg = new THREE.CircleGeometry(0.5, 14); sg.rotateX(-Math.PI / 2);
    // wobble the edge so it reads as a splash, not a coin
    const pos = sg.attributes.position;
    for (let i = 1; i < pos.count; i++) { const k = 0.75 + 0.35 * Math.abs(Math.sin(i * 2.7)); pos.setX(i, pos.getX(i) * k); pos.setZ(i, pos.getZ(i) * k); }
    this.sm = new THREE.InstancedMesh(sg, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.15, transparent: true, opacity: 0.82, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 }), SC);
    this.sm.count = 0; this.sm.frustumCulled = false; this.sm.renderOrder = 2;
    for (let i = 0; i < SC; i++) this.sm.setColorAt(i, C.set(0xffffff));
    this.root.add(this.sm);
    this.splats = []; this.scap = SC;
    // rings
    this.rings = [];
    // floating text: DOM
    this.texts = [];
    this.layer = document.createElement('div');
    Object.assign(this.layer.style, { position: 'fixed', inset: '0', pointerEvents: 'none', overflow: 'hidden', zIndex: 3 });
    document.body.appendChild(this.layer);
    // the spatula
    this.spat = null;
    this.flames = new Map();
  }

  setSpatula(obj) { this.spatProto = obj; }

  burst(x, y, z, color, n = 10, speed = 2.5) {
    for (let i = 0; i < n; i++) {
      if (this.parts.length >= this.cap) this.parts.shift();
      const a = Math.random() * Math.PI * 2, u = Math.random();
      this.parts.push({ x, y, z, vx: Math.cos(a) * speed * (0.3 + u), vy: speed * (0.8 + Math.random()), vz: Math.sin(a) * speed * (0.3 + u), life: 0.6 + Math.random() * 0.5, t: 0, s: 0.7 + Math.random() * 1.1, c: new THREE.Color(color).offsetHSL(0, 0, (Math.random() - 0.5) * 0.12), g: 9 });
    }
  }
  crumbs(x, y, z, n) {
    for (let i = 0; i < n; i++) {
      if (this.parts.length >= this.cap) this.parts.shift();
      const a = Math.random() * Math.PI * 2;
      this.parts.push({ x, y, z, vx: Math.cos(a) * 1.4, vy: 3 + Math.random() * 2, vz: Math.sin(a) * 1.4, life: 0.9, t: 0, s: 1.4, c: new THREE.Color(0xe0a656), g: 10, crumb: true });
    }
  }
  splat(x, y, z, color, r = 0.8) {
    if (this.splats.length >= this.scap) this.splats.shift();
    this.splats.push({ x, y: y + 0.02 + Math.random() * 0.01, z, r: r * (0.8 + Math.random() * 0.4), rot: Math.random() * 6, c: new THREE.Color(color), t: 0, life: 14 });
  }
  oil(x, y, z, r) { this.splat(x, y, z, 0xd9b23a, r); }
  ring(x, z, r, color) {
    const g = new THREE.RingGeometry(0.85, 1, 48); g.rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, depthWrite: false }));
    m.position.set(x, 0.12, z); this.root.add(m);
    this.rings.push({ m, r, t: 0, life: 0.45 });
  }
  ping(x, y, z) { this.burst(x, y, z, 0xfff6c8, 3, 1.5); }
  puff(x, y, z, r) {
    for (let i = 0; i < 14; i++) {
      if (this.parts.length >= this.cap) this.parts.shift();
      const a = Math.random() * Math.PI * 2, d = Math.random() * r;
      this.parts.push({ x: x + Math.cos(a) * d * 0.3, y, z: z + Math.sin(a) * d * 0.3, vx: Math.cos(a) * r * 1.4, vy: 0.4, vz: Math.sin(a) * r * 1.4, life: 0.7, t: 0, s: 0.9, c: new THREE.Color(0x3a3330), g: 0.5, drag: 2.5 });
    }
  }
  pepperStorm(cx, cz) {
    for (let i = 0; i < 160; i++) {
      if (this.parts.length >= this.cap) this.parts.shift();
      this.parts.push({ x: cx + (Math.random() - 0.5) * 14, y: 6 + Math.random() * 5, z: cz + (Math.random() - 0.5) * 22, vx: 0, vy: -3 - Math.random() * 2, vz: 0, life: 2.2, t: 0, s: 0.8, c: new THREE.Color(0x2a2522), g: 1 });
    }
  }
  iceFall(cx, cz) {
    for (let i = 0; i < 60; i++) {
      if (this.parts.length >= this.cap) this.parts.shift();
      this.parts.push({ x: cx + (Math.random() - 0.5) * 12, y: 8 + Math.random() * 6, z: cz + (Math.random() - 0.5) * 20, vx: 0, vy: -8, vz: 0, life: 1.6, t: 0, s: 3.2, c: new THREE.Color(0xd8f2ff), g: 12, bounce: true });
    }
  }
  confetti(x, z) {
    const cols = [0xe23a3a, 0x3a7fe2, 0xf2c12e, 0x6cc23a, 0xffffff];
    for (let i = 0; i < 140; i++) {
      if (this.parts.length >= this.cap) this.parts.shift();
      const a = Math.random() * Math.PI * 2;
      this.parts.push({ x, y: 3, z, vx: Math.cos(a) * 4 * Math.random(), vy: 6 + Math.random() * 5, vz: Math.sin(a) * 4 * Math.random(), life: 2.5, t: 0, s: 1.1, c: new THREE.Color(cols[i % cols.length]), g: 6, drag: 0.8 });
    }
  }
  flame(x, z, r, dt) {
    for (let i = 0; i < 4; i++) {
      if (this.parts.length >= this.cap) this.parts.shift();
      const a = Math.random() * Math.PI * 2, d = r * (0.55 + Math.random() * 0.45);
      this.parts.push({ x: x + Math.cos(a) * d, y: 0.25, z: z + Math.sin(a) * d, vx: 0, vy: 2.2 + Math.random(), vz: 0, life: 0.45, t: 0, s: 1.5, c: new THREE.Color(Math.random() < 0.5 ? 0xff8a2a : 0x4aa8ff), g: -1, glow: true });
    }
  }
  spatula(x, z) {
    // a big wooden spatula comes down from above the camera and slaps the spot
    if (!this.spatProto) return;
    const s = this.spatProto.clone(); this.root.add(s);
    s.position.set(x, 6, z + 2); s.rotation.set(-1.2, 0, 0);
    const t0 = performance.now();
    const step = () => {
      const u = (performance.now() - t0) / 1000;
      if (u < 0.26) { const k = u / 0.26; s.position.set(x, 6 - 5.7 * k * k, z + 2 - 2 * k); s.rotation.x = -1.2 + 1.2 * k * k - Math.PI / 2 * k * k; }
      else if (u < 0.7) { s.position.y = 0.3 + (u - 0.26) * 3; }
      else { this.root.remove(s); return; }
      requestAnimationFrame(step);
    };
    step();
  }
  bubble(x, y, z, str) {
    const el = document.createElement('div'); el.textContent = str;
    Object.assign(el.style, { position: 'absolute', left: '0', top: '0', font: '900 13px "Arial Rounded MT Bold", Nunito, system-ui, sans-serif', color: '#2a1d14', background: '#fffaf0', padding: '3px 8px 4px', borderRadius: '10px', border: '2px solid #2a1d14', whiteSpace: 'nowrap', boxShadow: '0 2px 0 rgba(0,0,0,.25)' });
    this.layer.appendChild(el);
    this.texts.push({ el, p: new THREE.Vector3(x, y, z), t: 0, life: 1.4, bubble: true });
  }
  text3(x, y, z, str, color = '#fff', scale = 1) {
    const el = document.createElement('div');
    el.textContent = str;
    Object.assign(el.style, { position: 'absolute', left: '0', top: '0', font: `900 ${Math.round(16 * scale)}px "Arial Rounded MT Bold", Nunito, system-ui, sans-serif`, color, textShadow: '0 2px 0 #2a1d14, 0 0 4px #2a1d14', whiteSpace: 'nowrap', willChange: 'transform' });
    this.layer.appendChild(el);
    this.texts.push({ el, p: new THREE.Vector3(x, y, z), t: 0, life: 0.9 });
    if (this.texts.length > 40) { const o = this.texts.shift(); o.el.remove(); }
  }

  update(dt, cam) {
    // particles
    let n = 0;
    for (const p of this.parts) {
      p.t += dt;
      if (p.t > p.life) continue;
      if (p.drag) { const k = Math.exp(-p.drag * dt); p.vx *= k; p.vz *= k; p.vy *= k; }
      p.vy -= p.g * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
      if (p.y < 0.03 && p.vy < 0) { p.y = 0.03; p.vy *= p.bounce ? -0.3 : -0.25; p.vx *= 0.6; p.vz *= 0.6; }
      const k = 1 - Math.max(0, (p.t - p.life * 0.6) / (p.life * 0.4));
      Q.setFromAxisAngle(S.set(1, 1, 0).normalize(), p.t * 9);
      M.compose(P.set(p.x, p.y, p.z), Q, S.setScalar(p.s * k));
      this.pm.setMatrixAt(n, M);
      if (p.glow) C.copy(p.c).multiplyScalar(2.5); else C.copy(p.c);
      this.pm.setColorAt(n, C);
      n++;
    }
    this.parts = this.parts.filter((p) => p.t <= p.life);
    this.pm.count = n; this.pm.instanceMatrix.needsUpdate = true; if (this.pm.instanceColor) this.pm.instanceColor.needsUpdate = true;
    // splats
    let s = 0;
    for (const sp of this.splats) {
      sp.t += dt;
      const grow = Math.min(1, sp.t * 10);
      const fade = sp.t > sp.life - 3 ? Math.max(0, (sp.life - sp.t) / 3) : 1;
      Q.setFromAxisAngle(S.set(0, 1, 0), sp.rot);
      M.compose(P.set(sp.x, sp.y, sp.z), Q, S.set(sp.r * grow * (0.6 + 0.4 * fade), 1, sp.r * grow * (0.6 + 0.4 * fade)));
      this.sm.setMatrixAt(s, M); this.sm.setColorAt(s, sp.c); s++;
    }
    this.splats = this.splats.filter((sp) => sp.t < sp.life);
    this.sm.count = s; this.sm.instanceMatrix.needsUpdate = true; if (this.sm.instanceColor) this.sm.instanceColor.needsUpdate = true;
    // rings
    for (const r of this.rings) {
      r.t += dt; const u = r.t / r.life;
      r.m.scale.setScalar(r.r * (0.3 + 0.7 * Math.sqrt(u))); r.m.material.opacity = 0.9 * (1 - u);
      if (u >= 1) { this.root.remove(r.m); r.m.geometry.dispose(); r.m.material.dispose(); }
    }
    this.rings = this.rings.filter((r) => r.t < r.life);
    // floating text
    const w = innerWidth, h = innerHeight;
    for (const t of this.texts) {
      t.t += dt;
      P.copy(t.p); P.y += t.bubble ? 0.3 : t.t * 1.2; P.project(cam);
      const x = (P.x + 1) / 2 * w, y = (1 - P.y) / 2 * h;
      const a = t.bubble ? (t.t > t.life - 0.2 ? (t.life - t.t) / 0.2 : 1) : 1 - Math.max(0, (t.t - t.life * 0.5) / (t.life * 0.5));
      t.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${0.8 + Math.min(1, t.t * 8) * 0.3})`;
      t.el.style.opacity = a;
      if (t.t > t.life) t.el.remove();
    }
    this.texts = this.texts.filter((t) => t.t <= t.life);
  }

  clear() {
    this.parts = []; this.splats = [];
    for (const r of this.rings) this.root.remove(r.m);
    this.rings = [];
    for (const t of this.texts) t.el.remove();
    this.texts = [];
  }
}
