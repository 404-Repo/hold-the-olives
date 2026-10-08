  // DIFFERENT READING: a faceted (10 side) teak bowl on a foot, leaves as extruded leaf shapes curled up by a deform, whole cherry tomatoes plus halves, and a pair of wooden salad servers standing in the leaves
  const body = grp(g);
  const wood = timber(0xb87a40, 0.5);
  add(vessel([[0.6, 0], [0.62, 0.15], [0.7, 0.2], [1.3, 0.38], [1.65, 0.7], [1.72, 0.95]], 0.12, 0.3, 10), wood, [0, 0, 0], body);
  const lf = deform(new THREE.ExtrudeGeometry(leafShape(0.95, 0.45), { depth: 0.02, bevelEnabled: false, curveSegments: 6 }), (v) => { v.z += 0.35 * (v.x * v.x) + 0.12 * v.y * v.y + 0.03 * Math.sin(v.y * 18); });
  const L = [M(C.lettuce, { r: 0.4, ds: true }), M(0x8fd04e, { r: 0.4, ds: true }), M(C.lettuce2, { r: 0.4, ds: true })];
  for (let i = 0; i < 20; i++) { const a = i * 2.39996, k = Math.sqrt((i + 0.5) / 20); const F = grp(body, [Math.cos(a) * 0.4 * k, 0.8 + 0.2 * (1 - k), Math.sin(a) * 0.4 * k], null, [0, -a + PI / 2, 0]);
    add(lf, L[i % 3], [0, 0, 0], F, [-(0.5 + 0.8 * k), 0, 0.3 * Math.sin(i)]); }
  const tom = M(C.tomato, { r: 0.22 }), cut = M(0xf0715a, { r: 0.3 }), cal = M(0x3f8a3a, { r: 0.5 });
  for (let i = 0; i < 6; i++) { const a = i * 1.1, x = Math.cos(a) * 0.75, z = Math.sin(a) * 0.75; add(new THREE.SphereGeometry(0.21, 12, 8), tom, [x, 1.25, z], body); add(new THREE.ConeGeometry(0.07, 0.04, 5), cal, [x, 1.46, z], body); }
  for (let i = 0; i < 4; i++) { const a = i * 1.6 + 0.6, x = Math.cos(a) * 0.35, z = Math.sin(a) * 0.35; add(new THREE.SphereGeometry(0.21, 12, 6, 0, TAU, PI / 2, PI / 2), tom, [x, 1.38, z], body, [0.3, a, 0]); add(new THREE.CircleGeometry(0.21, 12), cut, [x, 1.385, z], body, [-PI / 2 + 0.3, 0, a]); }
  const sv = timber(0xd9b07a, 0.5);
  for (const s of [-1, 1]) { const S = grp(body, [s * 0.25, 1.0, -0.4], null, [0.35, 0, s * 0.25]); rod([0, 0, 0], [0, 1.6, 0], 0.06, sv, S, 8); add(new THREE.SphereGeometry(0.22, 10, 6), sv, [0, 0, 0], S, null, [1, 1.4, 0.35]); }
  fitAll(body, 1.2);
