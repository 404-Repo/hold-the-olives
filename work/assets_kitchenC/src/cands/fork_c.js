  // TUBES: every part swept along a curved path: a fat handle tube (flattened) that rises at its end, a palm tube, and four tine tubes that fan from the palm and curve up at their tips
  const body = grp(g);
  const st = metal(C.steel, 0.25);
  const hd = tube([[0, 0.05, 1.0], [0, 0.05, 0.7], [0, 0.045, 0.2], [0, 0.04, -0.15]], 0.12, st, body, 12, 10); hd.scale.set(1, 0.45, 1);
  add(new THREE.SphereGeometry(0.12, 10, 6), st, [0, 0.05 * 0.45, 1.0], body, null, [1, 0.45, 1]);
  const palm = tube([[-0.13, 0.03, -0.42], [0, 0.025, -0.38], [0.13, 0.03, -0.42]], 0.05, st, body, 8, 6); palm.scale.set(1, 0.6, 1);
  tube([[0, 0.025, -0.15], [0, 0.025, -0.4]], 0.06, st, body, 4, 6).scale.set(1, 0.5, 1);
  for (let i = 0; i < 4; i++) { const x = -0.135 + i * 0.09; tube([[x * 0.8, 0.025, -0.4], [x, 0.03, -0.6], [x, 0.05, -0.85], [x, 0.09, -0.98]], 0.028, st, body, 8, 6); }
  fitD(body, 2.0);
