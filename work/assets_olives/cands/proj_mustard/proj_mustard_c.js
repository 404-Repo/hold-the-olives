// proj_mustard (HOLD THE OLIVES), candidate proj_mustard_c. Generated as Three.js code, 404 recipe path B.
export default function (THREE) {
  const g = new THREE.Group();
  // ---- shared helpers (inlined into every module by build.mjs; no imports) ----
  const TAU = Math.PI * 2, PI = Math.PI, V = (x, y, z) => new THREE.Vector3(x, y, z);
  const _mats = {};
  function M(color, o = {}) {
    const k = color + JSON.stringify(o);
    if (_mats[k]) return _mats[k];
    const m = new THREE.MeshStandardMaterial({ color, roughness: o.r ?? 0.25, metalness: o.m ?? 0 });
    if (o.t !== undefined) { m.transparent = true; m.opacity = o.t; m.depthWrite = false; }
    if (o.ds) m.side = THREE.DoubleSide;
    if (o.name) m.name = o.name;
    if (o.e !== undefined) { m.emissive = new THREE.Color(o.e); m.emissiveIntensity = o.ei ?? 0.3; }
    return (_mats[k] = m);
  }
  function add(geo, mat, p = [0, 0, 0], parent = g, rot, scl) {
    const m = new THREE.Mesh(geo, mat); m.position.set(p[0], p[1], p[2]);
    if (rot) m.rotation.set(rot[0], rot[1], rot[2]);
    if (scl) m.scale.set(scl[0], scl[1], scl[2]);
    m.castShadow = true; m.receiveShadow = true;
    parent.add(m); return m;
  }
  function grp(parent = g, p = [0, 0, 0], name) {
    const o = new THREE.Group(); o.position.set(p[0], p[1], p[2]); if (name) o.name = name; parent.add(o); return o;
  }
  // orient an object so local +Z points along n, local +Y as close to up as possible
  function orient(o, n, up = V(0, 1, 0)) {
    const z = n.clone().normalize(); let x = up.clone().cross(z);
    if (x.lengthSq() < 1e-6) x = V(1, 0, 0); x.normalize();
    const y = z.clone().cross(x);
    o.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(x, y, z));
  }
  // a point and normal on a body of revolution with radius r(y), depth squashed by zk
  function surf(r, y, th, zk = 1, c = [0, 0]) {
    const e = 1e-3, rr = r(y), d = (r(y + e) - r(y - e)) / (2 * e);
    return { p: V(c[0] + rr * Math.sin(th), y, c[1] + rr * Math.cos(th) * zk),
             n: V(Math.sin(th), -d, Math.cos(th) / zk).normalize() };
  }
  function at(parent, s, out = 0) { const o = new THREE.Group(); o.position.copy(s.p).addScaledVector(s.n, out); orient(o, s.n); parent.add(o); return o; }
  // big readable eye: white ball, dark flattened pupil, white glint; optional lid cap
  function eye(parent, s, R, o = {}) {
    const c = s.p.clone().addScaledVector(s.n, -R * (o.sink ?? 0.4));
    const L = s.n.clone().multiplyScalar(0.6).add(V(o.lx ?? 0, 0.18 + (o.ly ?? 0), 0.8)).normalize();
    const eg = new THREE.Group(); eg.position.copy(c); orient(eg, L); parent.add(eg);
    add(new THREE.SphereGeometry(R, 11, 8), M(0xffffff, { r: 0.18 }), [0, 0, 0], eg);
    const pr = R * (o.pr ?? 0.54);
    add(new THREE.SphereGeometry(pr, 9, 6), M(0x161616, { r: 0.2 }), [0, 0, R - pr * 0.3], eg, null, [1, 1, 0.55]);
    add(new THREE.SphereGeometry(R * 0.17, 6, 4), M(0xffffff, { r: 0.1, e: 0xffffff, ei: 0.6 }), [-R * 0.24, R * 0.26, R * 0.99], eg);
    if (o.lid) {
      const lg = new THREE.Group(); lg.rotation.z = o.lidTilt ?? 0; eg.add(lg);
      add(new THREE.SphereGeometry(R * 1.08, 11, 4, 0, TAU, 0, PI * o.lid), M(o.lidColor ?? 0x777777, { ds: true }), [0, 0, 0], lg, [o.lidPitch ?? 0.15, 0, 0]);
      // dark lash line on the lid edge
      add(new THREE.TorusGeometry(R * 1.08 * Math.sin(PI * o.lid), R * 0.08, 3, 11), M(0x1c1c1c, { r: 0.4 }), [0, R * 1.08 * Math.cos(PI * o.lid), 0], lg, [PI / 2 + (o.lidPitch ?? 0.15), 0, 0]);
    }
    return eg;
  }
  // a capsule brow lying on the surface; tilt>0 raises the local +X end
  function brow(parent, s, len, rad, tilt, col = 0x26261a) {
    const o = at(parent, s, rad * 0.2);
    add(new THREE.CapsuleGeometry(rad, len, 3, 6), M(col, { r: 0.45 }), [0, 0, 0], o, [0, 0, PI / 2 + tilt], [1, 1, 0.7]);
    return o;
  }
  // a torus arc on the surface, centred on the point; rotZ 0 = arch (frown / raised brow), PI = smile
  function arc(parent, s, r, tube, len, rotZ = 0, col = 0x26261a) {
    const o = at(parent, s, tube * 0.3), mid = PI / 2 + rotZ;
    add(new THREE.TorusGeometry(r, tube, 5, 10, len), M(col, { r: 0.45 }), [-r * Math.cos(mid), -r * Math.sin(mid), 0], o, [0, 0, mid - len / 2]);
    return o;
  }
  function dot(parent, s, r, col = 0x2a1418, sq = [1, 1, 0.5]) { const o = at(parent, s, 0); add(new THREE.SphereGeometry(r, 8, 6), M(col, { r: 0.4 }), [0, 0, 0], o, null, sq); return o; }
  function lathe(pts, seg = 16) { return new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p[0], p[1])), seg); }
  function sampleProfile(r, y0, y1, n, close = true) {
    const pts = []; for (let i = 0; i <= n; i++) { const y = y0 + (y1 - y0) * i / n; pts.push([(close && (i === 0 || i === n)) ? 0 : Math.max(1e-4, r(y)), y]); }
    return pts;
  }
  function placeOnGround() {
    const box = new THREE.Box3(), v = new THREE.Vector3(), m = new THREE.Matrix4(), im = new THREE.Matrix4();
    g.updateMatrixWorld(true);
    g.traverse((n) => {
      const p = n.isMesh && n.geometry.attributes.position; if (!p) return;
      const put = (mat) => { for (let i = 0; i < p.count; i++) box.expandByPoint(v.fromBufferAttribute(p, i).applyMatrix4(mat)); };
      if (n.isInstancedMesh) { for (let c = 0; c < n.count; c++) { n.getMatrixAt(c, im); put(m.multiplyMatrices(n.matrixWorld, im)); } return; }
      put(n.matrixWorld);
    });
    const c = box.getCenter(new THREE.Vector3());
    g.children.forEach((o) => { o.position.x -= c.x; o.position.y -= box.min.y; o.position.z -= c.z; });
  }

  // ---- the olive character, in three independent constructions ----
  // method 'prim': a scaled sphere body, sphere feet tucked under, sphere eyes
  // method 'lathe': a swept egg profile with a pit hole, cylinder legs and boot feet
  // method 'bean': a capsule body, capsule legs + feet, little arms, eyes set wider
  function olive(spec, method, parent = g) {
    const H = spec.H, col = spec.col, legH = spec.legH ?? H * 0.1;
    const Hb = H - legH, W = Hb * (spec.wr ?? 0.78), D = W * (spec.dr ?? 0.94), y0 = legH, cy = y0 + Hb / 2;
    const P = spec.pointy ?? 0.5;
    const body = M(col, { r: 0.25 }), dark = M(spec.dark ?? new THREE.Color(col).multiplyScalar(0.75).getHex(), { r: 0.3 });
    let r;
    if (method === 'bean') {
      const rad = W / 2, half = Hb / 2 - rad;
      r = (y) => { const u = Math.abs(y - cy); if (u <= half) return rad; const q = Math.min(1, (u - half) / rad); return rad * Math.sqrt(Math.max(0, 1 - q * q)); };
      add(new THREE.CapsuleGeometry(rad, Math.max(0.001, half * 2), 5, 14), body, [0, cy, 0], parent, null, [1, 1, D / W]);
    } else {
      r = (y) => { const u = Math.max(-1, Math.min(1, (y - cy) / (Hb / 2))); const b = 1 + (spec.egg ?? 0.06) * -u; return (W / 2) * b * Math.pow(Math.max(0, 1 - u * u), P); };
      if (method === 'prim') {
        const geo = new THREE.SphereGeometry(1, 16, 12), pa = geo.attributes.position;
        for (let i = 0; i < pa.count; i++) { const y = pa.getY(i), k = Math.sqrt(Math.max(0, 1 - y * y)); const want = r(cy + y * Hb / 2) / (W / 2); const s = k > 1e-4 ? want / k : 0; pa.setXYZ(i, pa.getX(i) * s * W / 2, cy + y * Hb / 2, pa.getZ(i) * s * D / 2); }
        geo.computeVertexNormals(); add(geo, body, [0, 0, 0], parent);
      } else {
        const pts = sampleProfile(r, y0, y0 + Hb, 14);
        if (spec.hole !== false) { const hr = spec.holeR ?? 0.07; pts[pts.length - 1] = [W * hr, y0 + Hb - Hb * 0.006]; pts.push([W * hr * 0.7, y0 + Hb - Hb * 0.06]); pts.push([0, y0 + Hb - Hb * 0.06]); }
        const geo = lathe(pts, 16); add(geo, body, [0, 0, 0], parent, null, [1, 1, D / W]);
      }
    }
    const zk = D / W, S = (y, th) => surf(r, y, th, zk);
    // the eyes: big, high on the front, looking a little up so they read from above
    const eR = spec.eyeR ?? W * 0.2, eY = y0 + Hb * (spec.eyeY ?? 0.63), eTh = spec.eyeTh ?? (method === 'bean' ? 0.46 : 0.4);
    const lidC = new THREE.Color(col).multiplyScalar(0.85).getHex();
    const ex = spec.expr ?? 'angry';
    const eo = { pr: spec.pr, lidColor: lidC, sink: spec.sink ?? 0.52 };
    const E = {}; // per-side options
    for (const sd of [-1, 1]) {
      const o = { ...eo };
      if (ex === 'sly') { o.lid = 0.46; o.lidTilt = sd * -0.1; o.lx = -0.3; }
      if (ex === 'smug') { o.lid = 0.4; o.lidTilt = sd * -0.08; o.ly = 0.05; }
      if (ex === 'grumpy') { o.lid = 0.3; o.lidTilt = sd * 0.3; }
      if (ex === 'pompous') { o.lid = sd > 0 ? 0.36 : 0.18; o.ly = 0.12; }
      if (ex === 'surprised') { o.pr = spec.pr ?? 0.4; }
      E[sd] = o;
      eye(parent, S(eY, sd * eTh), eR * (ex === 'surprised' ? 1.08 : 1), o);
      // brows
      const bS = S(eY + eR * (ex === 'surprised' ? 1.55 : 1.25), sd * eTh * 0.95);
      const bl = eR * 1.0, br = eR * (spec.browR ?? 0.2);
      if (ex === 'angry') brow(parent, bS, bl, br, sd * 0.42);
      else if (ex === 'grumpy') brow(parent, S(eY + eR * 1.05, sd * eTh * 0.92), bl * 1.25, br * 1.7, sd * 0.38, new THREE.Color(col).multiplyScalar(0.55).getHex());
      else if (ex === 'sly') arc(parent, S(eY + eR * 1.3, sd * eTh), eR * 0.8, br * 0.8, 1.5, sd * -0.25, 0x2a1024);
      else if (ex === 'surprised') arc(parent, bS, eR * 0.75, br * 0.9, 2.0, 0);
      else if (ex === 'smug') { if (sd < 0) arc(parent, S(eY + eR * 1.6, sd * eTh), eR * 0.7, br * 0.9, 1.8, 0); else brow(parent, S(eY + eR * 1.15, sd * eTh), bl, br, 0.0); }
      else if (ex === 'pompous') { if (sd < 0) arc(parent, S(eY + eR * 1.75, sd * eTh), eR * 0.75, br, 1.9, 0); else brow(parent, S(eY + eR * 1.2, sd * eTh), bl, br, sd * -0.1); }
    }
    // the mouth
    const mY = y0 + Hb * (spec.mouthY ?? 0.36), mS = S(mY, spec.mouthTh ?? 0);
    const mc = spec.mouthCol ?? 0x2a1418, mt = eR * 0.13;
    if (ex === 'angry' || ex === 'grumpy') arc(parent, mS, eR * (ex === 'grumpy' ? 1.0 : 0.85), mt * (ex === 'grumpy' ? 1.4 : 1), 1.9, 0, mc);
    else if (ex === 'sly') arc(parent, S(mY, 0.12), eR * 0.9, mt, 1.3, PI + 0.35, mc);
    else if (ex === 'smug') arc(parent, mS, eR * 0.9, mt, 1.7, PI + 0.15, mc);
    else if (ex === 'surprised') { const o = at(parent, mS, 0); add(new THREE.TorusGeometry(eR * 0.32, eR * 0.12, 6, 12), M(mc, { r: 0.4 }), [0, 0, 0], o, null, [0.85, 1.1, 1]); add(new THREE.CircleGeometry(eR * 0.33, 10), M(0x1a0c0e, { r: 0.6 }), [0, 0, -eR * 0.02], o); }
    else if (ex === 'pompous') arc(parent, mS, eR * 0.55, mt, 1.2, 0.1, mc);
    // back detail: the stem scar and a little highlight bump, so the back is not a blank egg
    if (spec.scar !== false) { const bk = at(parent, S(y0 + Hb * 0.45, PI), 0); add(new THREE.TorusGeometry(W * 0.09, W * 0.025, 4, 10), dark, [0, 0, 0], bk); add(new THREE.SphereGeometry(W * 0.05, 6, 4), dark, [0, 0, 0], bk, null, [1, 1, 0.5]); const tp = at(parent, S(y0 + Hb * 0.97, PI), 0); add(new THREE.CapsuleGeometry(W * 0.025, W * 0.06, 2, 5), dark, [0, 0, W * 0.02], tp, [-0.9, 0, 0]); }
    // feet
    const fx = W * (spec.footX ?? 0.22), fr = W * (spec.footR ?? 0.13) * (spec.thick ?? 1), legC = dark;
    if (spec.feet === false) { /* no feet: a bobbing olive */ }
    else if (method === 'prim') {
      for (const sd of [-1, 1]) add(new THREE.SphereGeometry(fr, 10, 7), legC, [sd * fx, fr * 0.7, fr * 0.45], parent, [0, sd * 0.25, 0], [1, 0.7, 1.45]);
    } else if (method === 'lathe') {
      for (const sd of [-1, 1]) {
        add(new THREE.CylinderGeometry(fr * 0.5, fr * 0.55, legH + Hb * 0.06, 8), legC, [sd * fx, (legH + Hb * 0.06) / 2, 0], parent);
        add(new THREE.SphereGeometry(fr, 10, 6, 0, TAU, 0, PI / 2), legC, [sd * fx, 0, fr * 0.35], parent, [0, sd * 0.2, 0], [0.95, 0.75, 1.4]);
        add(new THREE.CircleGeometry(fr, 10), legC, [sd * fx, 0.0005, fr * 0.35], parent, [PI / 2, 0, 0], [0.95, 1.4, 1]);
      }
    } else {
      for (const sd of [-1, 1]) {
        add(new THREE.CapsuleGeometry(fr * 0.5, legH, 3, 8), legC, [sd * fx, legH * 0.5 + fr * 0.5, 0], parent);
        add(new THREE.CapsuleGeometry(fr * 0.55, fr * 1.0, 3, 8), legC, [sd * fx, fr * 0.55, fr * 0.45], parent, [PI / 2, 0, 0]);
      }
    }
    if (spec.arms ?? method === 'bean') for (const sd of [-1, 1]) {
      const sp = S(y0 + Hb * 0.42, sd * PI / 2), ar = W * (spec.armR ?? 0.06), al = W * (spec.armL ?? 0.22);
      add(new THREE.CapsuleGeometry(ar, al, 3, 8), body, [sp.p.x + sd * ar * 0.6, sp.p.y - al * 0.35, sp.p.z + W * 0.02], parent, [0.2, 0, sd * 0.45]);
    }
    return { r, S, W, D, Hb, y0, cy, eR, eY, eTh, zk, body, dark };
  }

  // ---- boss helpers ----
  // a whole green olive with its red pimento, size s tall, for filling jars
  function miniOlive(parent, p, s, rot = [0, 0, 0], col = 0x8aa52e) {
    const o = grp(parent, p); o.rotation.set(rot[0], rot[1], rot[2]);
    add(new THREE.SphereGeometry(s * 0.5, 9, 7), M(col, { r: 0.25 }), [0, 0, 0], o, null, [0.78, 1, 0.78]);
    add(new THREE.SphereGeometry(s * 0.15, 6, 4), M(0xe03a2a, { r: 0.25 }), [0, s * 0.47, 0], o, null, [1, 0.55, 1]);
    return o;
  }
  // an eye painted as raised shapes on a curved band of radius R (cylinder about Y), at height y, azimuth th
  function bandEye(parent, R, y, th, w, sd, o = {}) {
    const e = grp(parent, [Math.sin(th) * R, y, Math.cos(th) * R]); e.rotation.y = th;
    add(new THREE.SphereGeometry(w, 14, 10), M(0xffffff, { r: 0.2 }), [0, 0, 0], e, null, [1, o.h ?? 0.72, 0.22]);
    add(new THREE.SphereGeometry(w * 0.48, 12, 8), M(0x161616, { r: 0.2 }), [sd * -w * 0.08, -w * 0.06, w * 0.16], e, null, [1, 1, 0.25]);
    add(new THREE.SphereGeometry(w * 0.14, 6, 4), M(0xffffff, { r: 0.1, e: 0xffffff, ei: 0.6 }), [-w * 0.22, w * 0.12, w * 0.27], e, null, [1, 1, 0.4]);
    // angry brow: a dark wedge slanting down to the inside, overlapping the top of the eye
    const b = add(new THREE.BoxGeometry(w * 2.3, w * 0.42, w * 0.2), M(o.browCol ?? 0x1f2a12, { r: 0.4 }), [0, w * (o.browY ?? 0.66), w * 0.14], e);
    b.rotation.z = sd * (o.browTilt ?? 0.38);
    return e;
  }

  // ---- this object ----
  // C: a different reading. A squeezed-out squiggle: stacked tori of shrinking radius (a soft-serve coil) ending in a
  // little pointed tip, as it leaves the squeezer.
  const mus = M(0xf2b705, { r: 0.25 });
  const pts = []; for (let i = 0; i <= 60; i++) { const t = i / 60, a = t * TAU * 2.6, r = 0.075 * (1 - t * 0.85); pts.push(V(Math.cos(a) * r, 0.035 + t * 0.15, Math.sin(a) * r)); }
  add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 70, 0.036, 8, false), mus);
  add(new THREE.SphereGeometry(0.075, 14, 8), mus, [0, 0.04, 0], g, null, [1, 0.6, 1]);
  add(new THREE.ConeGeometry(0.03, 0.07, 10), mus, [pts[60].x, 0.215, pts[60].z]);

  placeOnGround();
  return g;
}
