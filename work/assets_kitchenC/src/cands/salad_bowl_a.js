  // PROFILES: turned wooden bowl = closed thick-wall lathe with a foot ring; salad = 22 cupped ruffled lettuce leaves (discSheet with a wavy rim, curled) heaped in a mound; tomato halves = hemispheres with a pale cut face and seed dots
  const body = grp(g);
  add(vessel([[0.75, 0], [0.8, 0.06], [0.85, 0.12], [1.3, 0.3], [1.62, 0.65], [1.75, 1.0]], 0.12, 0.2, 32), timber(0xc8894a, 0.5), [0, 0, 0], body);
  const L1 = M(C.lettuce, { r: 0.4, ds: true }), L2 = M(0x8fd04e, { r: 0.4, ds: true }), L3 = M(C.lettuce2, { r: 0.4, ds: true });
  const leaf = discSheet(0.55, 3, 14, (r, th) => 0.25 * r * r + 0.05 * r * Math.sin(th * 7), (th) => 1 + 0.12 * Math.sin(th * 7));
  for (let i = 0; i < 22; i++) { const a = i * 2.39996, k = Math.sqrt((i + 0.5) / 22), x = Math.cos(a) * 1.15 * k, z = Math.sin(a) * 1.15 * k, y = 0.95 + 0.32 * (1 - k * k);
    add(leaf, [L1, L2, L3][i % 3], [x, y, z], body, [0.6 * Math.sin(a * 1.3), a, 0.6 * Math.cos(a * 0.7) + 0.4 * k], [1, 1.2, 0.8]); }
  const tom = M(C.tomato, { r: 0.25 }), cut = M(0xf0715a, { r: 0.3 }), seed = M(C.seed, { r: 0.4 });
  for (let i = 0; i < 7; i++) { const a = i * 0.9 + 0.4, k = 0.35 + 0.5 * ((i * 37) % 10) / 10, x = Math.cos(a) * 1.15 * k, z = Math.sin(a) * 1.15 * k, y = 1.0 + 0.35 * (1 - k * k) + 0.1;
    const T = grp(body, [x, y, z], null, [-0.4 + 0.3 * Math.sin(i), a, 0.3 * Math.cos(i)]);
    add(new THREE.SphereGeometry(0.22, 12, 6, 0, TAU, PI / 2, PI / 2), tom, [0, 0, 0], T);
    add(new THREE.CircleGeometry(0.22, 12), cut, [0, 0.002, 0], T, [-PI / 2, 0, 0]);
    for (const s of [-1, 1]) add(new THREE.SphereGeometry(0.05, 6, 4), seed, [s * 0.09, 0.01, 0], T, null, [1, 0.4, 1.4]); }
  fitAll(body, 1.2);
