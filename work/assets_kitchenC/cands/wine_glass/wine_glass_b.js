// wine_glass (HOLD THE OLIVES), candidate wine_glass_b. Three.js code, 404 recipe path B. 10x world scale, metres.
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
  // kitchenB: metalness 0.5 not 0.85: the game has no environment map, and at 0.85 steel rendered near-black (faucet looked black in the set render)
  const metal = (c = C.steel, r = 0.28) => M(c, { r, m: 0.55, name: 'metal' }); // kitchenC: env map now, metalness capped at 0.6
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
  // ---- kitchenB additions ----
  // rounded box, y from 0 to h, centred on x/z, outer size exactly w x h x d (bevel trap compensated)
  function rbox(w, h, d, r, cs = 3) { r = Math.min(r, h / 2 - 1e-3, w / 2 - 1e-3, d / 2 - 1e-3); return slab(rrect(w - 2 * r, d - 2 * r, r * 0.8), h, r, r, cs, 2); }
  // rounded box extruded along z (a panel facing +z), centred on all axes, outer size w x h x d
  function rpanel(w, h, d, r, cs = 3) {
    r = Math.min(r, d / 2 - 1e-3, w / 2 - 1e-3, h / 2 - 1e-3);
    const geo = new THREE.ExtrudeGeometry(rrect(w - 2 * r, h - 2 * r, r * 0.8), { depth: Math.max(1e-3, d - 2 * r), bevelEnabled: true, bevelThickness: r, bevelSize: r, bevelSegments: 2, curveSegments: cs });
    geo.translate(0, 0, -(d - 2 * r) / 2); return geo;
  }
  const enamel = (c = C.cream, r = 0.3) => M(c, { r });
  const glass = (t = 0.4) => M(0xd8eef0, { r: 0.05, t });
  function fitWHD(body, W, H, D) { const b = bounds(g); body.scale.set(body.scale.x * W / (b.max.x - b.min.x), body.scale.y * H / (b.max.y - b.min.y), body.scale.z * D / (b.max.z - b.min.z)); }
  // ---- kitchenC additions ----
  const brass = (r = 0.3) => M(0xc9a04a, { r, m: 0.55, name: 'metal' });
  const linen = (c = 0xe9e2d0) => M(c, { r: 0.85, name: 'fabric' });
  const stripe = () => M(0x3f6fae, { r: 0.85, name: 'fabric' });
  const ceramic = (c = C.cream, r = 0.25) => M(c, { r });
  const glassDS = (t = 0.4) => M(0xd8eef0, { r: 0.05, t, ds: true });
  const liquid = (c, t = 0.85, r = 0.08) => M(c, { r, t });
  const glow = (c = 0xffc46b, ei = 1.6) => M(c, { r: 0.6, e: c, ei });
  // outer radius of a wall profile [[r,y],...] (y ascending) at height y
  function rAt(pts, y) {
    if (y <= pts[0][1]) return pts[0][0];
    for (let i = 1; i < pts.length; i++) if (y <= pts[i][1]) { const a = pts[i - 1], b = pts[i], t = (y - a[1]) / Math.max(1e-6, b[1] - a[1]); return a[0] + (b[0] - a[0]) * t; }
    return pts[pts.length - 1][0];
  }
  // a closed vessel profile, wound so every face points out of the solid (base centre -> out -> up -> rim -> down inside -> floor centre)
  // wall: outer wall points [r,y] bottom to rim (y ascending, not including the centre); t wall thickness; floor floor top height
  function vesselPts(wall, t, floor) {
    const top = wall[wall.length - 1], out = [[0, wall[0][1]], ...wall, [top[0] - t * 0.5, top[1] + t * 0.35]];
    const inner = wall.filter((p) => p[1] > floor + 1e-3).map((p) => [Math.max(0.001, p[0] - t), p[1]]).reverse();
    inner[0] = [top[0] - t, top[1]];
    return [...out, ...inner, [Math.max(0.001, rAt(wall, floor) - t), floor], [0, floor]];
  }
  function vessel(wall, t, floor, seg = 24) { return lathe(vesselPts(wall, t, floor), seg); }
  // the liquid that fills a vessel from its floor up to level (a solid, wound outward, slightly inside the inner wall)
  function fillPts(wall, t, floor, level, n = 6, gap = 0.012) {
    const pts = [[0, floor + 0.004]];
    for (let i = 0; i <= n; i++) { const y = floor + 0.004 + (level - floor - 0.004) * i / n; pts.push([Math.max(0.002, rAt(wall, y) - t - gap), y]); }
    pts.push([0, level]); return pts;
  }
  function fill(wall, t, floor, level, seg = 24, n = 6) { return lathe(fillPts(wall, t, floor, level, n), seg); }
  // a thin flat leaf/petal outline (shape space), length L, width W, pointed tip at +y
  function leafShape(L, W) { const s = new THREE.Shape(); s.moveTo(0, 0); s.quadraticCurveTo(W, L * 0.35, 0, L); s.quadraticCurveTo(-W, L * 0.35, 0, 0); return s; }

  // ---- this object ----
  // PRIMITIVES: foot = squashed cylinder + sphere cap, stem = cylinder with a knop sphere, bowl = open sphere segment (double-sided), wine = sphere bottom cap + flat top disc
  const body = grp(g);
  const gl = glassDS(0.38);
  add(new THREE.CylinderGeometry(0.58, 0.62, 0.07, 28), gl, [0, 0.035, 0], body);
  add(new THREE.CylinderGeometry(0.1, 0.48, 0.14, 24), gl, [0, 0.14, 0], body);
  add(new THREE.CylinderGeometry(0.075, 0.09, 0.78, 10), gl, [0, 0.6, 0], body);
  add(new THREE.SphereGeometry(0.12, 12, 8), gl, [0, 0.62, 0], body, null, [1, 0.6, 1]);
  const R = 0.62, cy = 1.5;
  add(new THREE.SphereGeometry(R, 28, 14, 0, TAU, 0.5, PI - 0.5), gl, [0, cy, 0], body);
  add(new THREE.TorusGeometry(R * Math.sin(0.5), 0.025, 6, 28), glass(0.5), [0, cy + R * Math.cos(0.5), 0], body, [PI / 2, 0, 0]);
  const wl = -0.22, a = Math.acos(wl / R);
  add(new THREE.SphereGeometry(R - 0.035, 28, 8, 0, TAU, a, PI - a - 0.02), liquid(0x7a1426, 0.9, 0.12), [0, cy, 0], body);
  add(new THREE.CircleGeometry(Math.sqrt((R - 0.035) ** 2 - wl * wl), 28), liquid(0x8e1a2e, 0.9, 0.05), [0, cy + wl, 0], body, [-PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.09, 0.1, 0.2, 10), gl, [0, 0.98, 0], body);
  fitAll(body, 2.2);

  placeOnGround();
  return g;
}
