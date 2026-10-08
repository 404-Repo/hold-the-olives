  // PROFILES: turned brass lathe body (round base, baluster column, collar), harp rods, bulb sphere (emissive), pleated shade = an open lathe frustum deformed into a 32-pleat zigzag, double-sided cream fabric with a warm glow, rolled rims, finial
  const body = grp(g);
  const b = brass();
  add(lathe([[0, 0], [1.5, 0], [1.56, 0.08], [1.5, 0.3], [1.2, 0.38], [0.6, 0.45], [0.5, 0.6], [0.7, 1.0], [0.95, 1.8], [0.98, 2.5], [0.8, 3.2], [0.45, 3.6], [0.35, 3.9], [0.48, 4.05], [0.3, 4.2], [0.25, 4.6], [0.38, 4.75], [0.2, 4.9], [0, 4.9]], 24), b, [0, 0, 0], body);
  add(new THREE.CylinderGeometry(0.1, 0.1, 0.6, 8), b, [0, 5.2, 0], body);
  add(new THREE.SphereGeometry(0.55, 16, 12), glow(0xfff0c8, 2.0), [0, 5.85, 0], body, null, [1, 1.2, 1]);
  for (const s of [-1, 1]) rod([s * 0.08, 5.0, 0], [s * 0.9, 7.6, 0], 0.04, b, body, 6);
  const R0 = 2.6, R1 = 1.6, y0 = 5.1, y1 = 8.75, P = 32;
  const sg = deform(new THREE.CylinderGeometry(R1, R0, y1 - y0, P * 2, 1, true), (v) => { const th = Math.atan2(v.z, v.x), k = 1 + 0.045 * (Math.round((th / TAU) * P * 2) % 2 === 0 ? 1 : -1); v.x *= k; v.z *= k; });
  add(sg, M(0xf2e6c8, { r: 0.85, ds: true, e: 0xffc070, ei: 0.35, name: 'fabric' }), [0, (y0 + y1) / 2, 0], body);
  add(new THREE.TorusGeometry(R0 * 1.02, 0.07, 6, 40), M(0xe8d8b4, { r: 0.7, name: 'fabric' }), [0, y0, 0], body, [PI / 2, 0, 0]);
  add(new THREE.TorusGeometry(R1 * 1.02, 0.06, 6, 32), M(0xe8d8b4, { r: 0.7, name: 'fabric' }), [0, y1, 0], body, [PI / 2, 0, 0]);
  add(new THREE.SphereGeometry(0.16, 10, 8), b, [0, 7.75, 0], body);
  fitAll(body, 9.0);
