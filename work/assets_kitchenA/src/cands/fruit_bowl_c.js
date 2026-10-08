  // c: different reading: a sage footed compote (pedestal bowl) with a heaped pyramid of fruit: grapes draped over the rim.
  const bowl = M(C.sage, 0.4, 0, undefined, { side: DS }), lem = M(C.lemon, 0.35), app = M(0xd8382c, 0.3), pearM = M(0x9cc23a, 0.4);
  const grape = M(0x5a2f6e, 0.25), stemM = M(0x5a3a22, 0.8, 0, 'timber');
  add(sLathe([[0, 0], [0.6, 0], [0.62, 0.06], [0.25, 0.14], [0.2, 0.3], [0.3, 0.38], [0.9, 0.52], [1.25, 0.66], [1.2, 0.7], [0.85, 0.58], [0, 0.48]], 22, 2), bowl);
  const sp = (r, m, x, y, z, sx = 1, sy = 1, sz = 1) => add(sph(r, 12, 8), m, x, y, z).scale.set(sx, sy, sz);
  sp(0.26, app, -0.45, 0.72, 0.25); sp(0.26, app, 0.35, 0.72, 0.35); sp(0.24, lem, 0.1, 0.72, -0.45, 1.35, 1, 1);
  sp(0.24, lem, -0.25, 0.95, -0.1, 1.35, 1, 1); sp(0.26, app, 0.2, 0.98, 0.0);
  sp(0.22, pearM, -0.05, 1.18, 0.15); sp(0.15, pearM, -0.05, 1.4, 0.15); add(cyl(0.02, 0.02, 0.14, 4), stemM, -0.05, 1.58, 0.15);
  // grapes draped over the front-right rim and hanging
  const path = [[0.6, 0.85, 0.2], [0.85, 0.75, 0.4], [1.0, 0.62, 0.55], [1.05, 0.45, 0.6]];
  path.forEach(([x, y, z], j) => { for (let i = 0; i < 6 - j; i++) { const a = i / (6 - j) * Math.PI * 2; sp(0.085, grape, x + Math.cos(a) * 0.14, y + Math.sin(a * 2) * 0.04, z + Math.sin(a) * 0.14); } });
  finish(HEIGHT);
