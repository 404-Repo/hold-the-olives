// club_sandwich (HOLD THE OLIVES), candidate club_sandwich_d (final). Three.js code, 404 recipe path B.
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
  // STANDING HALVES (lead's in-game note, 2026-10-08: from 55-62 deg above the flat halves read as two bread faces). Same polar-lathe layers as
  // candidate c, but each triangle half stands on its crust edge, right angle at the bottom back, so the cut face with every layer faces +Z and UP.
  // The layer stack runs sideways; l1 is the outermost slice of each half, l9 the inner slices where the halves meet.
  // POLAR LATHES: every layer is a custom lathe swept round the incentre of a rounded triangle (radius = soft-max of the three edge
  // distances), so bread puffs and rounds at the corners, turkey folds, lettuce ruffles and droops, bacon waves, cheese sags at the corners.
  const root = grp(g);
  const S = 2.3, L = S * Math.SQRT2, D = L / 2, ri = S * (2 - Math.SQRT2) / 2;
  const NRM = [PI / 2, 5 * PI / 4, 7 * PI / 4];          // outward edge normals (angle in x-z): hypotenuse front, the two legs
  const rT = (th, p = 10) => { let s = 0; for (const n of NRM) s += Math.pow(Math.max(0, Math.cos(th - n)), p); return ri / Math.pow(s, 1 / p); };
  const rMax = Math.max(rT(0), rT(PI), rT(3 * PI / 2));   // the farthest (front) corners
  // rows: (th) => [[out, y], ...] where out = metres beyond the triangle's edge (negative = inset; null = the centre point)
  const polyLathe = (rows, segs = 30) => {
    const pos = [], idx = [], nr = rows(0).length;
    for (let j = 0; j <= segs; j++) { const th = j / segs * TAU, rr = rows(th), R0 = rT(th);
      for (let i = 0; i < nr; i++) { const [out, y] = rr[i], r = out === null ? 0 : Math.max(0, R0 + out); pos.push(r * Math.cos(th), y, -ri + r * Math.sin(th)); } }
    for (let j = 0; j < segs; j++) for (let i = 0; i < nr - 1; i++) { const a = j * nr + i, b = (j + 1) * nr + i; idx.push(a, a + 1, b + 1, a, b + 1, b); }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals(); return geo;
  };
  const corner = (th) => Math.min(1, Math.pow(Math.max(0, (rT(th) - ri * 1.15) / (rMax - ri * 1.15)), 1.2));   // 0 mid-edge .. 1 at the corners
  const toastM = M(C.toast, { r: 0.7 }), crumbM = M(C.crumb, { r: 0.85 }), turkeyM = M(C.turkey, { r: 0.5 });
  const letM = M(C.lettuce, { r: 0.3, ds: true }), let2 = M(C.lettuce2, { r: 0.35, ds: true }), tomM = M(C.tomato, { r: 0.12 }), tomFl = M(C.tomatoFl, { r: 0.14 }), seedM = M(C.seed, { r: 0.1 });
  const baconM = M(C.bacon, { r: 0.26 }), fatM = M(C.fat, { r: 0.3 }), cheeseM = M(C.cheese, { r: 0.25, ds: true });
  const H = { l1: 0.26, l2: 0.19, l3: 0.12, l4: 0.15, l5: 0.24, l6: 0.13, l7: 0.08, l8: 0.12, l9: 0.26 };
  const halves = [{ side: -1, x: -0.03, z: 0.1, yaw: 0.12 }, { side: 1, x: 0.03, z: -0.1, yaw: -0.12 }];
  const build = {
    toast: (o, h, top) => {
      add(polyLathe(() => [[null, 0], [-0.07, 0], [-0.015, 0.02], [0, 0.08], [0, h - 0.08], [-0.02, h - 0.015], [-0.08, h], [null, h + (top ? 0.035 : 0.01)]]), toastM, [0, 0, 0], o);
      add(new THREE.BoxGeometry(L * 0.76, h * 0.68, 0.012), crumbM, [0, h / 2, 0.004], o);
    },
    turkey: (o, h) => add(polyLathe((th) => { const w = 0.02 * Math.sin(7 * th); return [[null, 0], [-0.03, 0], [0.03 + w, h * 0.12], [-0.01, h * 0.3], [0.05 + w, h * 0.45], [0.0, h * 0.62], [0.04 - w, h * 0.78], [-0.02, h], [null, h]]; }), turkeyM, [0, 0, 0], o),
    lettuce: (o, h) => {
      add(polyLathe((th) => [[null, h * 0.3], [-0.1, h * 0.32], [0.06, h * 0.45 + 0.03 * Math.sin(13 * th)], [0.17 + 0.03 * Math.sin(5 * th), h * 0.4 + 0.07 * Math.sin(17 * th)], [0.21 + 0.03 * Math.sin(5 * th), h * 0.1 + 0.06 * Math.sin(17 * th + 1)]], 46), letM, [0, 0, 0], o);
      add(polyLathe((th) => [[null, h * 0.1], [-0.05, h * 0.1], [0.12 + 0.02 * Math.sin(7 * th), h * 0.15 + 0.05 * Math.sin(11 * th + 2)]], 32), let2, [0, 0, 0], o);
    },
    tomato: (o, h) => {
      add(polyLathe(() => [[null, 0], [-0.06, 0], [-0.06, h], [null, h]], 36), tomFl, [0, 0, 0], o);
      for (const [x, z] of [[-0.48, -0.02], [0.48, -0.02], [0, -0.04], [-0.27, -0.48], [0.27, -0.48], [0, -0.76]]) {
        const s = grp(o, [x * S / 1.25, 0, z * S / 1.25]); s.scale.set(1.4, 1, 1.4);
        add(lathe([[0, 0], [0.2, 0], [0.225, 0.03], [0.228, h * 0.5], [0.22, h * 0.9 - 0.02], [0.2, h * 0.9], [0, h * 0.9]], 12), tomM, [0, 0, 0], s);
        add(new THREE.CylinderGeometry(0.175, 0.175, 0.01, 12), tomFl, [0, h * 0.9 + 0.003, 0], s);
        for (let i = 0; i < 3; i++) { const a = i / 3 * TAU + 0.4; add(new THREE.SphereGeometry(0.055, 5, 2), seedM, [Math.cos(a) * 0.1, h * 0.9 + 0.004, Math.sin(a) * 0.1], s, [0, -a, 0], [1.3, 0.25, 0.7]); }
      }
    },
    bacon: (o, h) => {
      add(polyLathe((th) => { const w = 0.05 * Math.sin(12 * th); return [[null, h * 0.35], [-0.05, h * 0.35], [0.06, h * 0.3 + w], [0.07, h * 0.62 + w], [-0.02, h * 0.7], [null, h * 0.7]]; }, 48), baconM, [0, 0, 0], o);
      add(polyLathe((th) => { const w = 0.05 * Math.sin(12 * th); return [[0.072, h * 0.42 + w], [0.072, h * 0.5 + w]]; }, 48), fatM, [0, 0, 0], o);
    },
    cheese: (o, h) => add(polyLathe((th) => { const c = corner(th); return [[null, h * 0.75], [-0.1, h * 0.75], [0.06 + 0.1 * c, h * 0.7 - 0.18 * c], [0.07 + 0.1 * c, h * 0.45 - 0.2 * c], [0.0, h * 0.45], [null, h * 0.45]]; }, 44), cheeseM, [0, 0, 0], o),
  };
  const kinds = { l1: 'toast', l2: 'turkey', l3: 'lettuce', l4: 'tomato', l5: 'toast', l6: 'bacon', l7: 'cheese', l8: 'lettuce', l9: 'toast' };
  const T = Object.values(H).reduce((a, b) => a + b, 0);
  const layers = {}; let c = 0;
  for (const k of ['l9', 'l8', 'l7', 'l6', 'l5', 'l4', 'l3', 'l2', 'l1']) {
    const LG = grp(root, [0, 0, 0], k); layers[k] = LG;
    for (const hf of halves) {
      const holder = grp(LG, [hf.x, 0, hf.z], null, [0, hf.yaw, 0]);
      const rz = grp(holder, [0, 0, 0], null, [0, 0, -PI / 2]);        // local +y (the stack) -> world +x; the back leg stands up
      const ry = grp(rz, [0, 0, 0], null, [0, -PI / 4, 0]);             // legs onto the axes
      build[kinds[k]](grp(ry, [0, hf.side > 0 ? c : -(c + H[k]), D]), H[k], k === 'l1');   // apex (right angle) to the origin
    }
    c += H[k];
  }
  // a big frilled cocktail pick rising out of each half's cut face near the top, attached to the top layer group
  const pickM = M(C.pick, { r: 0.55 }), frM = M(C.frill, { r: 0.12, ds: true });
  for (const hf of halves) {
    const o = grp(layers.l1, [hf.x, 0, hf.z], null, [0, hf.yaw, 0]), px = hf.side * T / 2, pz = 0.45, top = S - pz;
    add(new THREE.CylinderGeometry(0.045, 0.045, 1.9, 8), pickM, [px, top - 0.35, pz], o);
    add(new THREE.CylinderGeometry(0.07, 0.055, 0.16, 10), frM, [px, top + 0.62, pz], o);
    for (let i = 0; i < 9; i++) { const a = i / 9 * TAU, f = grp(o, [px, top + 0.7 + (i % 3) * 0.025, pz], null, [0, -a, 0]);
      add(new THREE.TorusGeometry(0.13 + (i % 2) * 0.04, 0.022, 3, 7, PI * 1.2), frM, [0.12, 0.05, 0], f, [0, 0, -0.3]); }
  }
  g.userData.layers = layers;
  fitAll(root, 3.0);

  placeOnGround();
  return g;
}
