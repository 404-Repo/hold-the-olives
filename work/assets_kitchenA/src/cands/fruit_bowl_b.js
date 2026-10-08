  // b: lathe bowl with a thick rounded rim and foot ring; lathe pear and apples (dimpled tops); ellipsoid lemons; grapes.
  const bowl = M(C.cream, 0.4, 0, undefined, { side: DS }), lem = M(C.lemon, 0.35), app = M(0xd8382c, 0.3), appY = M(0xea9a3a, 0.35);
  const pearM = M(0x9cc23a, 0.4), grape = M(0x5a2f6e, 0.25), stemM = M(0x5a3a22, 0.8, 0, 'timber'), leaf = M(0x4f8f3a, 0.5, 0, 'foliage', { side: DS });
  add(sLathe([[0, 0.12], [0.5, 0.0], [0.62, 0.0], [0.6, 0.1], [0.9, 0.22], [1.25, 0.45], [1.42, 0.68], [1.38, 0.74], [1.22, 0.62], [0.85, 0.36], [0, 0.26]], 24, 2), bowl);
  const apple = (x, y, z, m, s = 1) => { const q = grp(x, y, z, 0.15, x, -0.1);
    add(sLathe([[0, 0.05], [0.18, 0.0], [0.27, 0.12], [0.28, 0.3], [0.2, 0.44], [0.06, 0.42], [0, 0.38]], 12, 2), m, 0, 0, 0, 0, 0, 0, q).scale.setScalar(s);
    add(cyl(0.02, 0.02, 0.14, 4), stemM, 0, 0.44 * s, 0, 0, 0, 0.3, q); };
  const lemon = (x, y, z, ry) => { const q = grp(x, y, z, 0, ry, 0.15); add(sLathe([[0, -0.3], [0.05, -0.27], [0.15, -0.18], [0.19, 0], [0.15, 0.18], [0.05, 0.27], [0, 0.3]], 12, 2), lem, 0, 0, 0, 0, 0, Math.PI / 2, q); };
  apple(-0.55, 0.52, 0.3, app); apple(0.35, 0.5, 0.55, appY); apple(0.6, 0.55, -0.3, app, 1.05);
  lemon(-0.12, 0.72, 0.62, 0.4); lemon(-0.72, 0.72, -0.25, 1.3); lemon(0.08, 0.92, 0.12, 2.3);
  const pr = grp(-0.15, 0.62, -0.45, -0.15, 0, 0.1);
  add(sLathe([[0, 0], [0.2, 0.02], [0.27, 0.16], [0.24, 0.32], [0.14, 0.48], [0.1, 0.62], [0.06, 0.68], [0, 0.7]], 12, 2), pearM, 0, 0, 0, 0, 0, 0, pr);
  add(cyl(0.02, 0.025, 0.15, 4), stemM, 0.02, 0.76, 0, 0, 0, -0.25, pr);
  add(sph(0.1, 6, 4), leaf, 0.12, 0.74, 0, 0, 0, -0.6, pr).scale.set(1.2, 0.2, 0.5);
  for (let r = 0; r < 4; r++) { const n = [8, 6, 4, 1][r]; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + r * 0.6;
    add(sph(0.085, 8, 6), grape, 0.78 + Math.cos(a) * (0.26 - r * 0.07), 0.66 + r * 0.12, 0.12 + Math.sin(a) * (0.26 - r * 0.07)); } }
  finish(HEIGHT);
