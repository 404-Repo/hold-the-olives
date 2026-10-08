  // a: primitives. Hemisphere bowl (open, double sided) on a ring foot; lemons, apples, a pear and grapes as spheres.
  const bowl = M(C.cream, 0.4, 0, undefined, { side: DS }), lem = M(C.lemon, 0.35), app = M(0xd8382c, 0.3), appY = M(0xe8a03a, 0.35);
  const pear = M(0x9cc23a, 0.4), grape = M(0x5a2f6e, 0.25), stemM = M(0x5a3a22, 0.8, 0, 'timber');
  add(new THREE.SphereGeometry(1.35, 22, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2 * 0.62), bowl, 0, 1.05, 0).scale.set(1, 0.72, 1);
  add(new THREE.TorusGeometry(1.2, 0.07, 6, 22), bowl, 0, 0.66, 0, Math.PI / 2).scale.set(1.0, 1, 1);
  add(cyl(0.55, 0.6, 0.12, 18), bowl, 0, 0.06, 0);
  const lemon = (x, y, z, ry) => { const q = grp(x, y, z, 0, ry, 0.2); add(sph(0.18, 12, 8), lem, 0, 0, 0, 0, 0, 0, q).scale.set(1.35, 1, 1);
    for (const s of [-1, 1]) add(cyl(0.02, 0.06, 0.08, 6), lem, s * 0.26, 0, 0, 0, 0, s * Math.PI / 2, q); };
  const apple = (x, y, z, m) => { add(sph(0.26, 12, 10), m, x, y, z).scale.set(1, 0.9, 1); add(cyl(0.02, 0.02, 0.14, 4), stemM, x, y + 0.27, z, 0, 0, 0.3); };
  apple(-0.5, 0.75, 0.3, app); apple(0.35, 0.72, 0.5, appY); apple(0.55, 0.78, -0.35, app);
  lemon(-0.15, 0.75, 0.65, 0.4); lemon(-0.7, 0.8, -0.3, 1.2); lemon(0.0, 0.95, 0.1, 2.2);
  // pear: two spheres + stalk
  add(sph(0.25, 12, 8), pear, -0.15, 0.95, -0.4); add(sph(0.17, 12, 8), pear, -0.15, 1.25, -0.4); add(cyl(0.02, 0.025, 0.14, 4), stemM, -0.13, 1.45, -0.4, 0, 0, -0.2);
  // grapes: a cone-shaped cluster
  let gi = 0; for (let r = 0; r < 4; r++) { const n = [7, 5, 3, 1][r]; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + r;
    add(sph(0.085, 8, 6), grape, 0.75 + Math.cos(a) * (0.24 - r * 0.07), 0.7 + r * 0.12, 0.1 + Math.sin(a) * (0.24 - r * 0.07)); gi++; } }
  finish(HEIGHT);
