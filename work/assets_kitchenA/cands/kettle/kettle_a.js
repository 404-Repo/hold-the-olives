// kettle (HOLD THE OLIVES), candidate kettle_a. Three.js code, 404 recipe path B. 10x world scale, metres.
export default function (THREE) {
  const g = new THREE.Group();
  const HEIGHT = 2.4;
  // ---- kitchenA helpers (inlined; no imports) ----
  const root = new THREE.Group(); g.add(root);
  const DS = THREE.DoubleSide;
  const M = (color, roughness = 0.5, metalness = 0, name, extra = {}) => {
    const m = new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
    if (name) m.name = name; return m;
  };
  const GLASS = (o = 0.42) => M(0xd8eef0, 0.05, 0, undefined, { transparent: true, opacity: o, depthWrite: false });
  const add = (geo, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, parent = root) => {
    const me = new THREE.Mesh(geo, mat); me.position.set(x, y, z); me.rotation.set(rx, ry, rz);
    me.castShadow = true; me.receiveShadow = true; parent.add(me); return me;
  };
  const grp = (x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, parent = root) => {
    const q = new THREE.Group(); q.position.set(x, y, z); q.rotation.set(rx, ry, rz); parent.add(q); return q;
  };
  // Rounded box with exact analytic normals: s bevel segments per edge.
  const rbox = (w, h, d, r, s = 2) => {
    r = Math.min(r, w / 2 - 1e-4, h / 2 - 1e-4, d / 2 - 1e-4);
    const n = 2 * s + 1, geo = new THREE.BoxGeometry(2, 2, 2, n, n, n);
    const p = geo.attributes.position, nr = geo.attributes.normal, H = [w / 2, h / 2, d / 2];
    const v = [0, 0, 0], o = [0, 0, 0], f = [0, 0, 0];
    for (let k = 0; k < p.count; k++) {
      v[0] = p.getX(k); v[1] = p.getY(k); v[2] = p.getZ(k);
      for (let a = 0; a < 3; a++) {
        const i = Math.round((v[a] + 1) / 2 * n), inner = H[a] - r;
        if (i <= s) { o[a] = -inner; f[a] = -(s - i) / s; }
        else if (i >= n - s) { o[a] = inner; f[a] = (i - (n - s)) / s; }
        else { o[a] = -inner + 2 * inner * (i - s) / (n - 2 * s); f[a] = 0; }
      }
      // bend the fractions into a quarter-circle feel
      const dx = Math.sin(f[0] * Math.PI / 2), dy = Math.sin(f[1] * Math.PI / 2), dz = Math.sin(f[2] * Math.PI / 2);
      const L = Math.hypot(dx, dy, dz) || 1;
      p.setXYZ(k, o[0] + dx / L * r, o[1] + dy / L * r, o[2] + dz / L * r);
      nr.setXYZ(k, dx / L, dy / L, dz / L);
    }
    return geo;
  };
  // Lathe from [radius, y] pairs.
  const lathe = (pts, seg = 20) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(Math.max(r, 0), y)), seg);
  // Smooth lathe: a closed-ish profile sampled through a Catmull-Rom spline.
  const sLathe = (pts, seg = 20, div = 3) => {
    const c = new THREE.SplineCurve(pts.map(([r, y]) => new THREE.Vector2(r, y)));
    return new THREE.LatheGeometry(c.getPoints(pts.length * div).map((q) => new THREE.Vector2(Math.max(q.x, 0), q.y)), seg);
  };
  // Extrude a 2D outline [[x,y]...] along z, centred on z; bevel grows the outline (traps.md) so it is inset here.
  const ext = (pts, depth, bev = 0, curveSeg = 3) => {
    const sh = new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y)));
    const geo = new THREE.ExtrudeGeometry(sh, { depth: Math.max(depth - 2 * bev, 1e-3), bevelEnabled: bev > 0,
      bevelThickness: bev, bevelSize: bev * 0.9, bevelOffset: -bev * 0.9, bevelSegments: 2, curveSegments: curveSeg });
    geo.translate(0, 0, -(depth - 2 * bev) / 2); geo.computeVertexNormals(); return geo;
  };
  // Rounded rectangle outline (for ext), centred.
  const rrect = (w, h, r, seg = 4) => {
    const out = [], cs = [[w / 2 - r, h / 2 - r, 0], [-w / 2 + r, h / 2 - r, 1], [-w / 2 + r, -h / 2 + r, 2], [w / 2 - r, -h / 2 + r, 3]];
    for (const [cx, cy, q] of cs) for (let i = 0; i <= seg; i++) { const a = (q + i / seg) * Math.PI / 2; out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); }
    return out;
  };
  // Tube along points.
  const tube = (pts, rad, seg = 16, rs = 6, closed = false) =>
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map((q) => new THREE.Vector3(...q)), closed), seg, rad, rs, closed);
  const sph = (r, ws = 10, hs = 8) => new THREE.SphereGeometry(r, ws, hs);
  const cyl = (rt, rb, h, s = 16, open = false) => new THREE.CylinderGeometry(rt, rb, h, s, 1, open);
  // Measure every vertex (instanced-aware), scale root to a target height, then base y=0 and centre x/z.
  const measure = () => {
    const box = new THREE.Box3(), v = new THREE.Vector3(), m = new THREE.Matrix4(), im = new THREE.Matrix4();
    g.updateMatrixWorld(true);
    g.traverse((n) => {
      const p = n.isMesh && n.geometry.attributes.position; if (!p) return;
      const put = (mat) => { for (let i = 0; i < p.count; i++) box.expandByPoint(v.fromBufferAttribute(p, i).applyMatrix4(mat)); };
      if (n.isInstancedMesh) { for (let c = 0; c < n.count; c++) { n.getMatrixAt(c, im); put(m.multiplyMatrices(n.matrixWorld, im)); } return; }
      put(n.matrixWorld);
    });
    return box;
  };
  const finish = (H) => {
    let box = measure();
    if (H) { const s = H / (box.max.y - box.min.y); root.scale.multiplyScalar(s); box = measure(); }
    const c = box.getCenter(new THREE.Vector3());
    g.children.forEach((o) => { o.position.x -= c.x; o.position.y -= box.min.y; o.position.z -= c.z; });
  };
  // Common palette (STYLE_LOCK)
  const C = { red: 0xd5473a, cream: 0xf2ead8, sage: 0x86b8a8, walnut: 0x6b4a32, block: 0xc99a64, steel: 0xbcc3c9,
    copper: 0xc8773e, linen: 0xe9e2d0, stripe: 0x3f6fae, basil: 0x3f8a3a, terracotta: 0xc0603a, olive: 0x8aa52e,
    pimento: 0xe03a2a, oil: 0xd9b23a, crumb: 0xf3ddb0, crust: 0xc88a3e, toast: 0xdca55a, lemon: 0xf5d23a, black: 0x1e1c1e };

  // ---- this object ----
  // a: primitives. Hemisphere-dome body on a short wall, lid disc + cream knob, cone spout, cream torus-arc handle.
  const red = M(C.red, 0.3), cream = M(C.cream, 0.45), steel = M(C.steel, 0.3, 0.55, 'metal');
  add(cyl(1.0, 1.02, 0.35, 24), red, 0, 0.2, 0);
  add(new THREE.SphereGeometry(1.0, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), red, 0, 0.37, 0).scale.set(1, 0.95, 1);
  add(new THREE.TorusGeometry(1.0, 0.04, 6, 24), steel, 0, 0.04, 0, Math.PI / 2);
  add(cyl(0.48, 0.52, 0.14, 20), red, 0, 1.3, 0);
  add(new THREE.TorusGeometry(0.5, 0.025, 6, 24), steel, 0, 1.25, 0, Math.PI / 2);
  add(sph(0.13, 12, 8), cream, 0, 1.45, 0).scale.set(1, 0.8, 1);
  add(cyl(0.06, 0.07, 0.08, 10), cream, 0, 1.38, 0);
  const sp = add(cyl(0.08, 0.2, 0.85, 12, true), red, 0, 0.75, 1.05, 0.95, 0, 0); sp.material = M(C.red, 0.3, 0, undefined, { side: DS });
  // handle: arc in the y-z plane from front shoulder to back shoulder
  add(new THREE.TorusGeometry(0.68, 0.09, 8, 20, Math.PI), cream, 0, 1.38, 0, 0, Math.PI / 2, 0);
  for (const z of [-0.68, 0.68]) add(cyl(0.035, 0.035, 0.32, 8), steel, 0, 1.24, z * 0.92, z > 0 ? 0.35 : -0.35);
  finish(HEIGHT);

  return g;
}
