  // C: a different reading. A tall tapered marasca-style lathe bottle (wide shoulders narrowing to the base), the oil a
  // matching inner sweep, a swept cork (named group, pivot at its base), a tilted swept colour band with an olive branch
  // tube, stern eyes riding on the shoulders, and splayed little feet.
  const glass = M(0xd8eef0, { t: 0.32, r: 0.05 }), glassRim = M(0xd8eef0, { t: 0.5, r: 0.05 }), oil = M(0xd9b23a, { t: 0.7, r: 0.08 });
  const cork = M(0xc9a06a, { r: 0.85 }), leaf = M(0x86b84a, { r: 0.35 }), limb = M(0x7f9a2a, { r: 0.28 });
  const r = (y) => y < 0.28 ? 0 : y < 0.34 ? 0.48 : y < 2.0 ? 0.48 + (y - 0.34) / 1.66 * 0.16 : y < 2.5 ? 0.64 - Math.pow((y - 2.0) / 0.5, 1.3) * 0.43 : y < 2.95 ? 0.21 : 0;
  const pts = [[0, 0.3], [0.44, 0.3], [0.48, 0.34]]; for (let y = 0.5; y <= 2.9; y += 0.15) pts.push([r(y), y]); pts.push([0.21, 2.95], [0.25, 2.97], [0.25, 3.0]);
  add(lathe(pts, 26), glass);
  const ip = [[0, 0.34]]; for (let y = 0.36; y <= 2.3; y += 0.15) ip.push([r(y) - 0.04, y]); ip.push([0, 2.32]);
  add(lathe(ip, 22), oil);
  add(lathe([[0.62, 1.4], [0.645, 1.42], [0.65, 1.9], [0.63, 1.92]], 26), M(0x4f7a2a, { r: 0.35 }));
  for (const sd of [-1, 1]) bandEye(g, 0.66, 1.68, sd * 0.4, 0.17, sd, { h: 0.6, browTilt: 0.2, browY: 0.55 });
  const stem = []; for (let i = 0; i <= 12; i++) { const a = PI * 0.4 + i / 12 * PI * 1.2; stem.push(V(Math.sin(a) * 0.67, 1.65 + Math.sin(i * 0.8) * 0.1, Math.cos(a) * 0.67)); }
  add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(stem), 30, 0.02, 4, false), M(0x6b4a32, { r: 0.6 }));
  for (let i = 1; i < 12; i++) { const p = stem[i], a = Math.atan2(p.x, p.z), lf = grp(g, [p.x * 1.01, p.y, p.z * 1.01]); lf.rotation.set(0, a, (i % 2 ? 1 : -1) * 0.9); add(new THREE.SphereGeometry(0.1, 8, 5), leaf, [0, 0.07, 0.01], lf, null, [0.38, 1, 0.2]); }
  for (const i of [3, 7, 10]) { const p = stem[i]; add(new THREE.SphereGeometry(0.06, 8, 6), M(0x2a3a1a, { r: 0.25 }), [p.x * 1.05, p.y - 0.08, p.z * 1.05], g, null, [0.85, 1, 0.85]); }
  const ck = grp(g, [0, 2.88, 0], 'cork'); g.userData.cork = ck; g.userData.joints = { cork: ck };
  add(lathe([[0, 0], [0.19, 0], [0.26, 0.28], [0.27, 0.31], [0.25, 0.33], [0, 0.335]], 16), cork, [0, 0, 0], ck);
  for (const sd of [-1, 1]) {
    add(new THREE.CylinderGeometry(0.12, 0.14, 0.3, 12), limb, [sd * 0.24, 0.17, 0], g, [0, 0, sd * 0.15]);
    add(new THREE.SphereGeometry(0.19, 12, 6, 0, TAU, 0, PI / 2), limb, [sd * 0.31, 0, 0.1], g, [0, sd * 0.3, 0], [1, 0.75, 1.35]);
  }
