  // DIFFERENT READING: the cocktail-hour lamp: a faceted brass ball body (lathe, 8 sides, like the concept's cut-glass globe) on a stepped round foot, a tall slim neck, a deep pleated drum shade (lathe ring deformed into pleats, scalloped hem), bulb glow
  const body = grp(g);
  const b = brass(0.25);
  add(lathe([[0, 0], [1.35, 0], [1.4, 0.1], [1.3, 0.25], [1.0, 0.32], [0.9, 0.48], [0.5, 0.55], [0, 0.55]], 24), b, [0, 0, 0], body);
  add(lathe([[0, 0.5], [0.5, 0.5], [1.05, 0.8], [1.4, 1.5], [1.45, 2.0], [1.3, 2.6], [0.85, 3.1], [0.4, 3.3], [0, 3.3]], 8), b, [0, 0, 0], body);
  add(lathe([[0, 3.25], [0.3, 3.25], [0.22, 3.6], [0.2, 4.4], [0.32, 4.55], [0.2, 4.7], [0, 4.7]], 12), b, [0, 0, 0], body);
  add(new THREE.SphereGeometry(0.55, 16, 12), glow(0xfff0c8, 2.0), [0, 5.3, 0], body, null, [1, 1.15, 1]);
  const R0 = 2.4, R1 = 1.8, y0 = 4.75, y1 = 8.85, P = 24;
  const sg = deform(new THREE.CylinderGeometry(R1, R0, y1 - y0, P * 2, 2, true), (v) => { const th = Math.atan2(v.z, v.x), j = Math.round((th / TAU) * P * 2), k = 1 + 0.05 * (j % 2 === 0 ? 1 : -1); v.x *= k; v.z *= k; if (v.y < -(y1 - y0) / 2 + 0.01) v.y -= 0.12 * (j % 2 === 0 ? 1 : 0); });
  add(sg, M(0xf2e6c8, { r: 0.85, ds: true, e: 0xffc070, ei: 0.35, name: 'fabric' }), [0, (y0 + y1) / 2, 0], body);
  add(new THREE.TorusGeometry(R1 * 1.03, 0.08, 6, 32), b, [0, y1, 0], body, [PI / 2, 0, 0]);
  for (const s of [-1, 1]) rod([s * 0.1, 4.6, 0], [s * 1.0, 8.2, 0], 0.04, b, body, 6);
  add(new THREE.SphereGeometry(0.18, 10, 8), b, [0, 8.3, 0], body);
  fitAll(body, 9.0);
