  // A: primitives. Sphere body under a translucent oil cap, capsule drips, a puddle disc and drops.
  const o = olive({ H: 0.36, col: 0xa8a838, expr: 'smug', legH: 0.03 }, 'prim');
  const oil = M(0xd9b23a, { t: 0.72, r: 0.06 }), W = o.W, cy = o.cy;
  add(new THREE.SphereGeometry(1, 16, 6, 0, TAU, 0, PI * 0.3), oil, [0, cy + o.Hb * 0.03, 0], g, null, [W / 2 * 1.04, o.Hb / 2 * 1.02, o.D / 2 * 1.04]);
  for (const [th, len] of [[0.95, 0.07], [-1.1, 0.1], [2.3, 0.06], [-2.6, 0.09], [PI, 0.05]]) {
    const s = o.S(cy + o.Hb * 0.3, th);
    add(new THREE.CapsuleGeometry(W * 0.03, len, 3, 6), oil, [s.p.x * 1.01, s.p.y - len / 2, s.p.z * 1.01], g);
    add(new THREE.SphereGeometry(W * 0.045, 8, 6), oil, [s.p.x * 1.02, s.p.y - len - W * 0.02, s.p.z * 1.02], g, null, [1, 1.3, 1]);
  }
  add(new THREE.CylinderGeometry(W * 0.62, W * 0.62, 0.006, 22), oil, [W * 0.08, 0.003, W * 0.05], g, null, [1, 1, 0.8]);
  for (const [x, z, r] of [[W * 0.78, W * 0.42, 0.016], [W * 0.95, W * 0.1, 0.011], [-W * 0.62, W * 0.55, 0.013]]) add(new THREE.SphereGeometry(r, 8, 5), oil, [x, r * 0.35, z], g, null, [1, 0.45, 1]);
