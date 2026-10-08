// club_sandwich (HOLD THE OLIVES), candidate club_sandwich_a. Three.js code, 404 recipe path B.
export default function (THREE) {
  const g = new THREE.Group();
  // ---- shared helpers (inlined into every module by build.mjs; no imports) ----
  const TAU = Math.PI * 2, PI = Math.PI, V = (x, y, z) => new THREE.Vector3(x, y, z);
  const _mats = {};
  function M(color, o = {}) {
    const k = color + JSON.stringify(o);
    if (_mats[k]) return _mats[k];
    const m = new THREE.MeshStandardMaterial({ color, roughness: o.r ?? 0.5, metalness: o.m ?? 0 });
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
  function grp(parent = g, p = [0, 0, 0], name, rot) {
    const o = new THREE.Group(); o.position.set(p[0], p[1], p[2]); if (name) o.name = name;
    if (rot) o.rotation.set(rot[0], rot[1], rot[2]); parent.add(o); return o;
  }
  function lathe(pts, seg = 16) { return new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(Math.max(0, p[0]), p[1])), seg); }
  // rounded rectangle centred on 0 (shape space x, y)
  function rrect(w, d, r, sh = new THREE.Shape()) {
    const x = -w / 2, y = -d / 2; r = Math.min(r, w / 2 - 1e-4, d / 2 - 1e-4);
    sh.moveTo(x + r, y); sh.lineTo(x + w - r, y); sh.quadraticCurveTo(x + w, y, x + w, y + r);
    sh.lineTo(x + w, y + d - r); sh.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
    sh.lineTo(x + r, y + d); sh.quadraticCurveTo(x, y + d, x, y + d - r);
    sh.lineTo(x, y + r); sh.quadraticCurveTo(x, y, x + r, y); return sh;
  }
  function rrectPath(w, d, r) { return rrect(w, d, r, new THREE.Path()); }
  // the bread-slice outline in plan (shape x = world x, shape y = world -z; the dome points to shape +y = world -z)
  function breadShape(W, D, sh = new THREE.Shape()) {
    const w = W / 2, d = D / 2, sb = 0.08 * W;           // straight sides; shoulders bulge by sb; dome on top
    const yS = d - 0.42 * D;                              // where the shoulder starts
    sh.moveTo(-w + 0.1 * W, -d);
    sh.lineTo(w - 0.1 * W, -d);
    sh.quadraticCurveTo(w, -d, w - 0.005 * W, -d + 0.1 * W);
    sh.lineTo(w - 0.03 * W, yS);
    sh.bezierCurveTo(w + sb, yS + 0.05 * D, w + sb, d - 0.04 * D, w - 0.18 * W, d - 0.03 * D);
    sh.bezierCurveTo(w * 0.35, d + 0.02 * D, -w * 0.35, d + 0.02 * D, -w + 0.18 * W, d - 0.03 * D);
    sh.bezierCurveTo(-w - sb, d - 0.04 * D, -w - sb, yS + 0.05 * D, -w + 0.03 * W, yS);
    sh.lineTo(-w + 0.005 * W, -d + 0.1 * W);
    sh.quadraticCurveTo(-w, -d, -w + 0.1 * W, -d);
    return sh;
  }
  // extrude a plan shape upward: y from y0 to y0 + h INCLUDING the bevel (bevel trap compensated by caller insetting the shape by bs)
  function slab(shape, h, bt = 0, bs = 0, curveSegments = 6, bevelSegments = 2) {
    const geo = new THREE.ExtrudeGeometry(shape, { depth: Math.max(1e-3, h - 2 * bt), bevelEnabled: bt > 0, bevelThickness: bt, bevelSize: bs, bevelSegments, curveSegments });
    geo.rotateX(-PI / 2); geo.translate(0, bt, 0); return geo;
  }
  // extrude a side profile (shape x = world z, shape y = world y) across world x, centred
  function sideSlab(shape, w, bt = 0, bs = 0, curveSegments = 6) {
    const geo = new THREE.ExtrudeGeometry(shape, { depth: Math.max(1e-3, w - 2 * bt), bevelEnabled: bt > 0, bevelThickness: bt, bevelSize: bs, bevelSegments: 2, curveSegments });
    geo.rotateY(-PI / 2); geo.translate((w - 2 * bt) / 2, 0, 0); return geo;
  }
  function deform(geo, fn) {
    const p = geo.attributes.position, v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); fn(v); p.setXYZ(i, v.x, v.y, v.z); }
    p.needsUpdate = true; geo.computeVertexNormals(); return geo;
  }
  // a cylinder from point a to point b
  function rod(a, b, r, mat, parent = g, seg = 8, r2) {
    const A = V(...a), B = V(...b), L = A.distanceTo(B);
    const m = add(new THREE.CylinderGeometry(r2 ?? r, r, L, seg), mat, [0, 0, 0], parent);
    m.position.copy(A).add(B).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(V(0, 1, 0), B.clone().sub(A).normalize()); return m;
  }
  function tube(points, r, mat, parent = g, seg = 24, rs = 8, closed = false) {
    const c = new THREE.CatmullRomCurve3(points.map((p) => V(...p)), closed);
    return add(new THREE.TubeGeometry(c, seg, r, rs, closed), mat, [0, 0, 0], parent);
  }
  // radial sheet (disc) as an indexed grid: rings x segs, f(r, th) -> y ; r scaled by rad(th)
  function discSheet(R, rings, segs, fy, frad = () => 1) {
    const pos = [], idx = [];
    pos.push(0, fy(0, 0), 0);
    for (let i = 1; i <= rings; i++) for (let j = 0; j < segs; j++) {
      const th = j / segs * TAU, r = R * i / rings * frad(th, i / rings);
      pos.push(r * Math.cos(th), fy(i / rings, th), r * Math.sin(th));
    }
    const id = (i, j) => i === 0 ? 0 : 1 + (i - 1) * segs + (j % segs);
    for (let j = 0; j < segs; j++) idx.push(0, id(1, j + 1), id(1, j));
    for (let i = 1; i < rings; i++) for (let j = 0; j < segs; j++) {
      const a = id(i, j), b = id(i, j + 1), c = id(i + 1, j), d = id(i + 1, j + 1);
      idx.push(a, b, d, a, d, c);
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx); geo.computeVertexNormals(); return geo;
  }
  function placeOnGround(root = g) {
    const box = new THREE.Box3(), v = new THREE.Vector3(), m = new THREE.Matrix4(), im = new THREE.Matrix4();
    root.updateMatrixWorld(true);
    root.traverse((n) => {
      const p = n.isMesh && n.geometry.attributes.position; if (!p) return;
      const put = (mat) => { for (let i = 0; i < p.count; i++) box.expandByPoint(v.fromBufferAttribute(p, i).applyMatrix4(mat)); };
      if (n.isInstancedMesh) { for (let c = 0; c < n.count; c++) { n.getMatrixAt(c, im); put(m.multiplyMatrices(n.matrixWorld, im)); } return; }
      put(n.matrixWorld);
    });
    const c = box.getCenter(new THREE.Vector3());
    root.children.forEach((o) => { o.position.x -= c.x; o.position.y -= box.min.y; o.position.z -= c.z; });
  }
  // food and kitchen colours (STYLE_LOCK)
  const C = { crumb: 0xf3ddb0, crust: 0xc88a3e, toast: 0xdca55a, lettuce: 0x6cc23a, lettuce2: 0x4f9a2a, lettuceL: 0xb5dc6a,
    tomato: 0xe2432f, tomatoFl: 0xf0715a, seed: 0xf6a23c, cheese: 0xf7c534, bacon: 0xb4432c, fat: 0xf2cfa8, turkey: 0xedcaa6,
    pickle: 0x7c9c2c, pickleSkin: 0x4f6b1e, mustard: 0xf2b705, wood: 0xc99a64, walnut: 0x6b4a32, cream: 0xf2ead8,
    red: 0xd5473a, copper: 0xc8773e, steel: 0xbcc3c9, pick: 0xe8cfa0, frill: 0xe23a3a, sage: 0x86b8a8, cork: 0xb98a5a, ink: 0x1e1e1e };
  const timber = (c = C.wood, r = 0.6) => M(c, { r, name: 'timber' });
  const metal = (c = C.steel, r = 0.3) => M(c, { r, m: 0.85, name: 'metal' });
  // measure the vertex bounds of everything under root (instance-aware)
  function bounds(root = g) {
    const box = new THREE.Box3(), v = new THREE.Vector3(), m = new THREE.Matrix4(), im = new THREE.Matrix4();
    root.updateMatrixWorld(true);
    root.traverse((n) => {
      const p = n.isMesh && n.geometry.attributes.position; if (!p) return;
      const put = (mat) => { for (let i = 0; i < p.count; i++) box.expandByPoint(v.fromBufferAttribute(p, i).applyMatrix4(mat)); };
      if (n.isInstancedMesh) { for (let c = 0; c < n.count; c++) { n.getMatrixAt(c, im); put(m.multiplyMatrices(n.matrixWorld, im)); } return; }
      put(n.matrixWorld);
    });
    return box;
  }
  // squash or stretch a group in y only so its total height is exactly H (layers: the game scales by height)
  function fitH(body, H) { const b = bounds(g); body.scale.y *= H / (b.max.y - b.min.y); }
  // scale a group uniformly so the whole asset is H tall
  function fitAll(body, H) { const b = bounds(g); body.scale.multiplyScalar(H / (b.max.y - b.min.y)); }
  // scale a group uniformly so the whole asset is L long in z
  function fitD(body, L) { const b = bounds(g); body.scale.multiplyScalar(L / (b.max.z - b.min.z)); }

  // ---- this object ----
  // EXTRUDE: each layer of each triangular half is an extruded rounded right triangle (bevelled), with a pale crumb plate on every bread cut face,
  // ruffled lettuce ribbons swept round the outline, glossy tomato slices poking out, wavy bacon, drooping cheese. Two halves in a V.
  const root = grp(g);
  const S = 1.25, L = S * Math.SQRT2, D = L / 2, ri = S * (2 - Math.SQRT2) / 2, IC = [0, -ri];     // incentre (x, z)
  // triangle in shape space (x, y = -z): hypotenuse on y = 0 (front, +z), apex at y = D (back). k scales about the incentre
  const tri = (k = 1, r = 0.1) => {
    const P = [[-L / 2, 0], [L / 2, 0], [0, D]].map(([x, y]) => [x * k, ri + (y - ri) * k]), sh = new THREE.Shape();
    const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    for (let i = 0; i < 3; i++) {
      const A = P[i], B = P[(i + 1) % 3], Cc = P[(i + 2) % 3], lab = Math.hypot(B[0] - A[0], B[1] - A[1]), lbc = Math.hypot(Cc[0] - B[0], Cc[1] - B[1]);
      const p0 = lerp(A, B, r * k / lab * 2.2), p1 = lerp(A, B, 1 - r * k / lab * 2.2), p2 = lerp(B, Cc, r * k / lbc * 2.2);
      if (i === 0) sh.moveTo(p0[0], p0[1]); else sh.lineTo(p0[0], p0[1]);
      sh.lineTo(p1[0], p1[1]); sh.quadraticCurveTo(B[0], B[1], p2[0], p2[1]);
    }
    sh.closePath(); return sh;
  };
  const kIn = (d) => 1 - d / ri, kOut = (d) => 1 + d / ri;
  // outline sample: perimeter points of the triangle scaled by k (local x, z)
  const outline = (k, n) => {
    const P = [[-L / 2, 0], [L / 2, 0], [0, -D]].map(([x, z]) => [x * k, -ri + (z + ri) * k]), per = [];
    const lens = [0, 1, 2].map((i) => Math.hypot(P[(i + 1) % 3][0] - P[i][0], P[(i + 1) % 3][1] - P[i][1])), tot = lens[0] + lens[1] + lens[2];
    for (let j = 0; j < n; j++) { let s = j / n * tot, i = 0; while (s > lens[i]) { s -= lens[i]; i++; } const A = P[i], B = P[(i + 1) % 3], t = s / lens[i]; per.push([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t]); }
    return per;
  };
  // a ruffled ribbon from the inner outline (k0, y=0) out to the outer outline (k1) with a wavy outer edge
  const ruffle = (k0, k1, amp, waves, n = 132, droop = 0.03) => {
    const a = outline(k0, n), b = outline((k0 + k1) / 2, n), c = outline(k1, n), pos = [], idx = [];
    for (let j = 0; j < n; j++) {
      const w = Math.sin(j / n * TAU * waves), w2 = Math.sin(j / n * TAU * waves * 2.3 + 1);
      pos.push(a[j][0], 0, a[j][1], b[j][0], amp * 0.35 * w2, b[j][1], c[j][0] + 0.03 * w2 * (c[j][0] - IC[0]), -droop + amp * w, c[j][1] + 0.03 * w2 * (c[j][1] - IC[1]));
    }
    for (let j = 0; j < n; j++) { const J = (j + 1) % n; for (let r = 0; r < 2; r++) { const p = j * 3 + r, q = J * 3 + r; idx.push(p, q, q + 1, p, q + 1, p + 1); } }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals(); return geo;
  };
  const toastM = M(C.toast, { r: 0.7 }), crustM = M(C.crust, { r: 0.65 }), crumbM = M(C.crumb, { r: 0.85 }), turkeyM = M(C.turkey, { r: 0.5 }), turkey2 = M(0xd9aa86, { r: 0.55 });
  const letM = M(C.lettuce, { r: 0.32, ds: true }), let2 = M(C.lettuce2, { r: 0.35, ds: true }), tomM = M(C.tomato, { r: 0.12 }), tomFl = M(C.tomatoFl, { r: 0.14 }), seedM = M(C.seed, { r: 0.1 });
  const baconM = M(C.bacon, { r: 0.28 }), fatM = M(C.fat, { r: 0.3 }), cheeseM = M(C.cheese, { r: 0.28 });
  const H = { l1: 0.4, l2: 0.28, l3: 0.17, l4: 0.22, l5: 0.38, l6: 0.2, l7: 0.12, l8: 0.17, l9: 0.4 };
  const halves = [{ x: -0.85, z: 0, yaw: -0.35 }, { x: 0.85, z: 0, yaw: 0.35 }];
  const layers = {}; let y = 0;
  const build = {
    toast: (o, h) => {
      add(slab(tri(kIn(0.03)), h, 0.05, 0.03, 6, 3), toastM, [0, 0, 0], o);
      add(new THREE.BoxGeometry(L * 0.74, h * 0.72, 0.012), crumbM, [0, h / 2, 0.004], o);
      add(slab(tri(kIn(0.012), 0.1), 0.012, 0, 0, 6), crustM, [0, h * 0.5, 0], o, null, [1.002, 1, 1.002]);
    },
    turkey: (o, h) => {
      for (let i = 0; i < 3; i++) { const t = h / 3; add(slab(tri(kOut(0.02 - i * 0.015)), t * 1.02, 0.03, 0.02, 6, 2), i % 2 ? turkey2 : turkeyM, [0.01 * (i - 1), i * t, 0.012 * (1 - i)], o); }
    },
    lettuce: (o, h) => {
      add(slab(tri(kIn(0.02)), h * 0.5, 0.02, 0.01), let2, [0, h * 0.2, 0], o);
      add(ruffle(kIn(0.05), kOut(0.17), 0.06, 13), letM, [0, h * 0.55, 0], o);
      add(ruffle(kIn(0.05), kOut(0.11), 0.045, 17, 132, 0.0), let2, [0, h * 0.35, 0], o, [0, 0.05, 0]);
    },
    tomato: (o, h) => {
      add(slab(tri(kIn(0.06)), h, 0.03, 0.02), tomFl, [0, 0, 0], o);
      const spots = [[-0.48, -0.03], [0.48, -0.03], [0, -0.05], [-0.26, -0.47], [0.26, -0.47], [0, -0.75]];
      for (const [x, z] of spots) {
        const s = grp(o, [x, 0, z]);
        add(new THREE.CylinderGeometry(0.22, 0.22, h * 0.9, 20), tomM, [0, h * 0.45, 0], s);
        add(new THREE.CylinderGeometry(0.19, 0.19, 0.01, 20), tomFl, [0, h * 0.9 + 0.003, 0], s);
        for (let i = 0; i < 5; i++) { const a = i / 5 * TAU; add(new THREE.SphereGeometry(0.045, 6, 3), seedM, [Math.cos(a) * 0.1, h * 0.9 + 0.004, Math.sin(a) * 0.1], s, [0, -a, 0], [1.3, 0.25, 0.7]); }
      }
    },
    bacon: (o, h) => {
      add(slab(tri(kIn(0.05)), h * 0.5, 0.02, 0.01), baconM, [0, h * 0.2, 0], o);
      const wave = (len, ph) => deform(new THREE.BoxGeometry(len, h * 0.32, 0.12, 20, 1, 1), (v) => { v.y += h * 0.22 * Math.sin(v.x * 11 + ph); });
      const edges = [[[0, 0.02], 0, L * 0.92], [[-L / 4 - 0.01, -D / 2 - 0.01], PI / 4, S * 0.86], [[L / 4 + 0.01, -D / 2 - 0.01], -PI / 4, S * 0.86]];
      edges.forEach(([[x, z], yaw, len], i) => {
        const e = grp(o, [x, h * 0.45, z], null, [0, yaw, 0]);
        add(wave(len, i * 2), baconM, [0, 0, 0.0], e);
        add(wave(len * 0.98, i * 2), fatM, [0, h * 0.06, 0.035], e, null, [1, 0.35, 0.4]);
        add(wave(len * 0.98, i * 2), fatM, [0, -h * 0.07, 0.035], e, null, [1, 0.3, 0.4]);
      });
    },
    cheese: (o, h) => {
      const geo = slab(tri(kOut(0.1), 0.06), h * 0.7, 0.012, 0.008, 6);
      deform(geo, (v) => { const dx = v.x - IC[0], dz = v.z - IC[1], r = Math.hypot(dx, dz), d = Math.max(0, r - 0.55); v.y -= 0.5 * d * d; });
      add(geo, cheeseM, [0, h * 0.3, 0], o);
    },
  };
  const kinds = { l1: 'toast', l2: 'turkey', l3: 'lettuce', l4: 'tomato', l5: 'toast', l6: 'bacon', l7: 'cheese', l8: 'lettuce', l9: 'toast' };
  for (const k of ['l9', 'l8', 'l7', 'l6', 'l5', 'l4', 'l3', 'l2', 'l1']) {
    const L_ = grp(root, [0, y, 0], k); layers[k] = L_;
    for (const hf of halves) build[kinds[k]](grp(L_, [hf.x, 0, hf.z], null, [0, hf.yaw, 0]), H[k]);
    y += H[k];
  }
  // a big frilled cocktail pick through each half, attached to the top layer
  const pickM = M(C.pick, { r: 0.55 }), frM = M(C.frill, { r: 0.12, ds: true });
  for (const hf of halves) {
    const o = grp(layers.l1, [hf.x, 0, hf.z], null, [0, hf.yaw, 0]);
    const px = 0, pz = -ri, top = H.l1;
    add(new THREE.CylinderGeometry(0.035, 0.035, 1.5, 8), pickM, [px, top - 0.45, pz], o);
    add(new THREE.CylinderGeometry(0.055, 0.045, 0.14, 10), frM, [px, top + 0.37, pz], o);
    for (let i = 0; i < 16; i++) { const a = i / 16 * TAU; const f = grp(o, [px, top + 0.44 + (i % 3) * 0.02, pz], null, [0, -a, 0]);
      add(new THREE.TorusGeometry(0.1 + (i % 2) * 0.03, 0.014, 4, 10, PI * 1.2), frM, [0.09, 0.04, 0], f, [0, 0, -0.3]); }
  }
  g.userData.layers = layers;
  fitAll(root, 3.0);

  placeOnGround();
  return g;
}
