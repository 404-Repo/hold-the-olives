  // C: a different reading (the reference's crinkle face). A lathe chip with a rolled skin rim, and the crinkle-cut
  // ridges across both faces as parallel rounded bars clipped to the disc.
  const skin = M(0x4f6b1e, { r: 0.3 }), flesh = M(0x7c9c2c, { r: 0.3 }), ridge = M(0x91ae3c, { r: 0.3 }), seed = M(0xc9d27a, { r: 0.3 });
  const R = 0.165, T = 0.05;
  add(lathe([[0, 0], [R - 0.02, 0], [R, 0.012], [R + 0.004, T / 2], [R, T - 0.012], [R - 0.02, T], [0, T]], 40), skin);
  for (const sd of [-1, 1]) {
    add(new THREE.CircleGeometry(R - 0.018, 36), flesh, [0, sd > 0 ? T + 0.001 : -0.001, 0], g, [-sd * PI / 2, 0, 0]);
    for (let i = -5; i <= 5; i++) { const x = i * 0.026, half = Math.sqrt(Math.max(0, (R - 0.025) ** 2 - x * x)); if (half < 0.02) continue; add(new THREE.CapsuleGeometry(0.007, half * 2 - 0.014, 2, 5), ridge, [x, sd > 0 ? T + 0.002 : -0.002, 0], g, [PI / 2, 0, 0], [1, 1, 0.5]); }
    for (let i = 0; i < 7; i++) { const a = i / 7 * TAU; add(new THREE.SphereGeometry(0.014, 6, 4), seed, [Math.sin(a) * R * 0.32, sd > 0 ? T + 0.005 : -0.005, Math.cos(a) * R * 0.32], g, [0, a, 0], [0.6, 0.3, 1]); }
  }
