  // PROFILES: steel bucket = closed thick-wall lathe (tapered, base step, rolled rim); ring handles = tori hung from ball bosses on both sides; ice = a heap of rounded transparent cubes; tongs = two tube arms joined by a spring loop, leaning on the rim
  const body = grp(g);
  const st = metal(C.steel, 0.25);
  const W = [[0.85, 0], [0.9, 0.05], [0.9, 0.14], [0.86, 0.18], [1.05, 1.7], [1.12, 1.76], [1.14, 1.84]];
  add(vessel(W, 0.07, 0.2, 32), st, [0, 0, 0], body);
  for (const s of [-1, 1]) { add(new THREE.SphereGeometry(0.12, 12, 8), st, [s * 1.08, 1.38, 0], body); add(new THREE.TorusGeometry(0.3, 0.05, 8, 18), st, [s * 1.2, 1.12, 0], body, [0, PI / 2, 0]); }
  const ice = M(0xe6f6fa, { r: 0.08, t: 0.7 }), cube = rbox(0.42, 0.42, 0.42, 0.09, 2);
  for (let i = 0; i < 16; i++) { const a = i * 2.39996, k = Math.sqrt((i + 0.5) / 16), x = Math.cos(a) * 0.75 * k, z = Math.sin(a) * 0.75 * k;
    add(cube, ice, [x, 1.5 + 0.28 * (1 - k * k) + (i % 2) * 0.05, z], body, [i * 0.7, i * 1.3, i * 0.4]); }
  const T = grp(body, [0.35, 1.65, -0.2], null, [0, 0.4, -0.75]);
  for (const s of [-1, 1]) tube([[0, 0, 0], [s * 0.1, 0.4, 0], [s * 0.08, 1.3, 0], [s * 0.16, 1.6, 0]], 0.05, st, T, 10, 6).scale.set(1, 1, 1.6);
  tube([[-0.08, -0.02, 0], [0, -0.15, 0], [0.08, -0.02, 0]], 0.05, st, T, 6, 6);
  fitAll(body, 2.6);
