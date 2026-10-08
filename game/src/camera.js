// A tilt-zoom camera over the counter. One finger pans, pinch zooms, two
// fingers dragged up or down tilt between a plan view and a low counter view.
// Taps are passed through to the game. The default framing fits the field.
import * as THREE from 'three';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export class CounterCam {
  constructor(camera, dom) {
    this.cam = camera; this.dom = dom;
    this.tx = 0; this.tz = -8; this.dist = 24; this.pitch = 0.96; this.yaw = 0;
    this.g = { tx: 0, tz: -8, dist: 24, pitch: 0.96 };       // goals
    this.bounds = [-6, -20, 6, 3];
    this.minD = 7; this.maxD = 40; this.fitD = 24;
    this.shakeT = 0; this.shakeA = 0;
    this.cine = null;
    this.onTap = null;
    this.locked = false;
    this.pointers = new Map();
    this.last = null;
    this._bind();
  }

  setBounds(b) { this.bounds = b; }

  /** Pan by screen-aligned amounts: right, and up the screen (into the view). */
  pan(r, f) {
    // right = (cos, -sin), forward (up the screen) = (-sin, -cos)
    const c = Math.cos(this.yaw), sn = Math.sin(this.yaw);
    this.g.tx += r * c - f * sn;
    this.g.tz += -r * sn - f * c;
  }

  /** Find the distance and target that show the whole field with room for the HUD. */
  fit(pitch = this.g.pitch) {
    const [x0, z0, x1, z1] = this.bounds;
    const c = this.cam, save = { tx: this.tx, tz: this.tz, dist: this.dist, pitch: this.pitch };
    const pts = [[x0, z0], [x1, z0], [x0, z1], [x1, z1], [0, z0], [0, z1]];
    const v = new THREE.Vector3();
    let tz = (z0 + z1) / 2, dist = 20, tx0 = (x0 + x1) / 2;
    const portrait = c.aspect < 1;
    const yTop = portrait ? 0.80 : 0.52, yBot = portrait ? -0.74 : -0.6, xLim = portrait ? 0.97 : 0.9;
    for (let it = 0; it < 6; it++) {
      let lo = 4, hi = 90;
      for (let k = 0; k < 28; k++) {
        const mid = (lo + hi) / 2;
        this._place(tx0, tz, mid, pitch); c.updateMatrixWorld(true);
        let ok = true;
        for (const [x, z] of pts) { v.set(x, 0, z).project(c); if (v.z > 1 || Math.abs(v.x) > xLim || v.y > yTop || v.y < yBot) { ok = false; break; } }
        if (ok) hi = mid; else lo = mid;
      }
      dist = hi;
      this._place(tx0, tz, dist, pitch); c.updateMatrixWorld(true);
      let ymax = -9, ymin = 9;
      for (const [x, z] of pts) { v.set(x, 0, z).project(c); ymax = Math.max(ymax, v.y); ymin = Math.min(ymin, v.y); }
      const off = ((ymax - yTop) + (ymin - yBot)) / 2;   // >0: field sits high, move target forward
      // move the target along the view's forward axis to centre the field vertically
      tz -= off * dist * 0.35 * Math.cos(this.yaw); tx0 -= off * dist * 0.35 * Math.sin(this.yaw);
    }
    Object.assign(this, save);
    this.fitD = dist; this.fitTz = tz; this.fitTx = tx0;
    this.maxD = dist * 1.12; this.minD = Math.max(6, dist * 0.32);
    return { dist, tz, tx: tx0 };
  }

  home(instant = false) {
    const { dist, tz, tx } = this.fit(this.g.pitch);
    Object.assign(this.g, { tx, tz, dist });
    if (instant) { this.tx = tx; this.tz = tz; this.dist = dist; this.pitch = this.g.pitch; }
  }

  shake(a = 0.25, t = 0.3) { this.shakeA = Math.max(this.shakeA, a); this.shakeT = Math.max(this.shakeT, t); }

  /** A short camera move: keys [{pos:[x,y,z], look:[x,y,z], t}], then back to the rig. */
  play(keys, onDone) { this.cine = { keys, t: 0, onDone, total: keys[keys.length - 1].t }; }
  skipCine() { if (this.cine) { const d = this.cine.onDone; this.cine = null; d && d(); } }

  _place(tx, tz, dist, pitch) {
    const c = this.cam;
    c.position.set(tx + Math.sin(this.yaw) * Math.cos(pitch) * dist, Math.sin(pitch) * dist, tz + Math.cos(this.yaw) * Math.cos(pitch) * dist);
    c.lookAt(tx, 0, tz);
  }

  update(dt) {
    const k = 1 - Math.exp(-dt * 9);
    const g = this.g;
    g.dist = clamp(g.dist, this.minD, this.maxD);
    g.pitch = clamp(g.pitch, 0.55, 1.35);
    // the closer you zoom, the more you may pan
    const z = 1 - (g.dist - this.minD) / Math.max(1, this.maxD - this.minD);
    const [x0, z0, x1, z1] = this.bounds;
    const fx = this.fitTz ?? (z0 + z1) / 2, fxx = this.fitTx ?? 0;
    const sl = 2.2;   // some give even at full zoom-out, so a drag always answers
    g.tx = clamp(g.tx, fxx + (x0 - fxx) * z - sl, fxx + (x1 - fxx) * z + sl);
    g.tz = clamp(g.tz, fx + (z0 - fx) * z - sl * 1.4, fx + (z1 - fx) * z + sl);
    this.tx += (g.tx - this.tx) * k; this.tz += (g.tz - this.tz) * k;
    this.dist += (g.dist - this.dist) * k; this.pitch += (g.pitch - this.pitch) * k;
    if (this.cine) {
      const C = this.cine; C.t += dt;
      const ks = C.keys; let i = 0;
      while (i < ks.length - 2 && C.t > ks[i + 1].t) i++;
      const a = ks[i], b = ks[i + 1] || ks[i];
      let u = b.t > a.t ? clamp((C.t - a.t) / (b.t - a.t), 0, 1) : 1;
      u = u * u * (3 - 2 * u);
      const P = (p, q) => p.map((v, j) => v + (q[j] - v) * u);
      const pos = P(a.pos, b.pos), look = P(a.look, b.look);
      this.cam.position.set(...pos); this.cam.lookAt(...look);
      if (C.t >= C.total) { const d = C.onDone; this.cine = null; d && d(); }
    } else {
      this._place(this.tx, this.tz, this.dist, this.pitch);
    }
    if (this.shakeT > 0) {
      this.shakeT -= dt;
      const a = this.shakeA * Math.max(0, this.shakeT) * 3;
      this.cam.position.x += (Math.random() - 0.5) * a; this.cam.position.y += (Math.random() - 0.5) * a;
    }
  }

  _bind() {
    const el = this.dom;
    const down = (e) => {
      el.setPointerCapture?.(e.pointerId);
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: performance.now(), moved: 0, button: e.button });
      if (this.pointers.size === 2) this.last = this._pair();
    };
    const move = (e) => {
      const p = this.pointers.get(e.pointerId); if (!p) return;
      const dx = e.clientX - p.x, dy = e.clientY - p.y;
      p.x = e.clientX; p.y = e.clientY; p.moved += Math.abs(dx) + Math.abs(dy);
      if (this.locked || this.cine) return;
      if (this.pointers.size === 1) {
        if (p.moved < 8) return;
        if (p.button === 2) { this.g.pitch += dy * 0.006; return; }
        // pan in world units: one screen height is about the visible depth
        const s = this.dist * 1.6 / el.clientHeight;
        this.pan(-dx * s, dy * s / Math.max(0.5, Math.sin(this.pitch)));   // drag down pulls the far end toward you
      } else if (this.pointers.size === 2) {
        const now = this._pair();
        if (this.last) {
          this.g.dist *= this.last.d / Math.max(10, now.d);
          this.g.pitch += (now.cy - this.last.cy) * 0.005;
          const s = this.dist * 1.6 / el.clientHeight;
          this.pan(-(now.cx - this.last.cx) * s, 0);
        }
        this.last = now;
      }
    };
    const up = (e) => {
      const p = this.pointers.get(e.pointerId); if (!p) return;
      const wasPair = this.pointers.size > 1;
      this.pointers.delete(e.pointerId);
      if (this.pointers.size < 2) this.last = null;
      if (!wasPair && p.moved < 12 && performance.now() - p.t < 600 && p.button !== 2 && this.onTap) this.onTap(e.clientX, e.clientY);
      if (wasPair) for (const q of this.pointers.values()) q.moved = 999;   // the finger left behind is not a tap
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', (e) => { this.pointers.delete(e.pointerId); this.last = null; });
    el.addEventListener('contextmenu', (e) => e.preventDefault());
    el.addEventListener('wheel', (e) => { e.preventDefault(); if (!this.locked) this.g.dist *= Math.exp(e.deltaY * 0.0012); }, { passive: false });
  }
  _pair() {
    const [a, b] = [...this.pointers.values()];
    return { d: Math.hypot(a.x - b.x, a.y - b.y), cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
  }
}
