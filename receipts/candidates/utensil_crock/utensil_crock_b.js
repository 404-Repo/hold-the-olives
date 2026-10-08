// utensil_crock (HOLD THE OLIVES), candidate utensil_crock_b. Three.js code, 404 recipe path B. 10x world scale, metres.
export default function (THREE) {
  const g = new THREE.Group();
  const HEIGHT = 2.6;
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
  // b: lathe crock with a bellied wall, thick rolled rim and foot; lathe spoon bowl and ladle cup; whisk wires as tubes.
  const sage = M(C.sage, 0.45, 0, undefined, { side: DS }), wood = M(C.block, 0.55, 0, 'timber'), steel = M(C.steel, 0.3, 0.55, 'metal');
  const steelD = M(C.steel, 0.3, 0.55, 'metal', { side: DS });
  add(sLathe([[0, 0.02], [0.5, 0.0], [0.6, 0.08], [0.64, 0.5], [0.62, 1.1], [0.6, 1.25], [0.66, 1.32], [0.62, 1.38], [0.54, 1.33], [0.52, 1.1], [0.52, 1.0], [0, 1.0]], 20, 2), sage);
  // spoon: handle + lathe bowl (shallow cup) tilted to face out
  const sp = grp(-0.28, 0.95, 0.12, 0.18, 0, 0.3);
  add(cyl(0.05, 0.06, 1.25, 8), wood, 0, 0.62, 0, 0, 0, 0, sp);
  const bowl = add(lathe([[0, 0], [0.12, 0.02], [0.2, 0.08], [0.22, 0.12], [0.18, 0.1], [0, 0.06]], 12), M(C.block, 0.55, 0, 'timber', { side: DS }), 0, 1.45, 0.02, Math.PI / 2, 0, 0, sp);
  bowl.scale.set(1, 1, 1.5);
  // whisk: handle and 5 wire loops (tubes)
  const wh = grp(-0.02, 0.95, -0.22, -0.12, 0, 0.08);
  add(cyl(0.065, 0.06, 0.75, 10), steel, 0, 0.38, 0, 0, 0, 0, wh);
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI; const c = Math.cos(a), s = Math.sin(a);
    add(tube([[0, 0.72, 0], [0.18 * c, 0.95, 0.18 * s], [0.22 * c, 1.25, 0.22 * s], [0, 1.45, 0], [-0.22 * c, 1.25, -0.22 * s], [-0.18 * c, 0.95, -0.18 * s], [0, 0.72, 0]], 0.014, 20, 4), steel, 0, 0, 0, 0, 0, 0, wh); }
  // ladle
  const la = grp(0.22, 0.95, -0.08, -0.12, 0, -0.22);
  add(tube([[0, 0, 0], [0, 1.2, 0], [0, 1.42, 0.05], [0, 1.45, 0.15]], 0.035, 10, 6), steel, 0, 0, 0, 0, 0, 0, la);
  add(lathe([[0, 0], [0.16, 0.03], [0.24, 0.12], [0.26, 0.2]], 14), steelD, 0, 1.3, 0.38, -0.3, 0, 0, la);
  // spatula: handle + extruded slotted blade
  const st = grp(0.32, 0.95, 0.25, 0.18, 0, -0.38);
  add(cyl(0.05, 0.055, 0.85, 8), wood, 0, 0.42, 0, 0, 0, 0, st);
  const blade = new THREE.Shape(rrect(0.38, 0.6, 0.12).map(([x, y]) => new THREE.Vector2(x, y)));
  for (const x of [-0.08, 0.08]) { const h = new THREE.Path(rrect(0.05, 0.32, 0.024, 2).map(([a, b]) => new THREE.Vector2(a + x, b))); blade.holes.push(h); }
  add(new THREE.ExtrudeGeometry(blade, { depth: 0.05, bevelEnabled: false, curveSegments: 3 }), wood, 0, 1.15, -0.025, 0, 0, 0, st);
  finish(HEIGHT);

  return g;
}
