  // DIFFERENT BREAKDOWN: square bevelled brass plinth (rbox), octagonal faceted stem lathe, flared octagonal cup, a tall slim candle with two drips, flame = lathe teardrop inside a soft transparent halo
  const body = grp(g);
  const b = brass();
  add(rbox(1.6, 0.22, 1.6, 0.07), b, [0, 0, 0], body);
  add(rbox(1.2, 0.14, 1.2, 0.05), b, [0, 0.2, 0], body);
  add(lathe([[0, 0.32], [0.45, 0.32], [0.3, 0.45], [0.18, 0.6], [0.16, 1.0], [0.28, 1.12], [0.16, 1.24], [0.15, 1.45], [0.5, 1.62], [0.48, 1.7], [0, 1.68]], 8), b, [0, 0, 0], body);
  const wax = M(0xf4ead0, { r: 0.55 });
  add(lathe([[0, 1.66], [0.27, 1.66], [0.27, 2.86], [0.22, 2.92], [0, 2.9]], 16), wax, [0, 0, 0], body);
  for (const [a, l] of [[0.9, 0.5], [3.6, 0.32]]) add(new THREE.CapsuleGeometry(0.055, l, 3, 6), wax, [0.26 * Math.cos(a), 2.88 - l / 2, 0.26 * Math.sin(a)], body);
  add(new THREE.CylinderGeometry(0.02, 0.02, 0.1, 5), M(0x2a2420, { r: 0.8 }), [0, 2.95, 0], body);
  const fl = [[0, 2.97], [0.09, 3.02], [0.12, 3.1], [0.1, 3.2], [0.05, 3.3], [0, 3.4]];
  add(lathe(fl, 12), glow(0xffb347, 1.8), [0, 0, 0], body);
  add(new THREE.SphereGeometry(0.2, 12, 8), M(0xffd27a, { r: 1, t: 0.25, e: 0xffb347, ei: 1.0 }), [0, 3.14, 0], body, null, [1, 1.3, 1]);
  fitAll(body, 3.4);
