  // PRIMITIVES: brass base disc + stacked cylinders/spheres column, bulb sphere emissive; shade = a ring of 28 thin bevelled panels (boxes) leaning on a frustum, top and bottom tori; a top ball finial
  const body = grp(g);
  const b = brass();
  add(new THREE.CylinderGeometry(1.4, 1.5, 0.3, 28), b, [0, 0.15, 0], body);
  add(new THREE.CylinderGeometry(0.6, 1.0, 0.3, 24), b, [0, 0.45, 0], body);
  add(new THREE.SphereGeometry(0.95, 20, 14), b, [0, 1.7, 0], body, null, [1, 1.2, 1]);
  add(new THREE.CylinderGeometry(0.35, 0.5, 0.6, 16), b, [0, 3.0, 0], body);
  add(new THREE.SphereGeometry(0.42, 16, 10), b, [0, 3.5, 0], body, null, [1, 0.7, 1]);
  add(new THREE.CylinderGeometry(0.22, 0.3, 1.0, 12), b, [0, 4.2, 0], body);
  add(new THREE.CylinderGeometry(0.3, 0.3, 0.3, 12), b, [0, 4.85, 0], body);
  add(new THREE.SphereGeometry(0.55, 16, 12), glow(0xfff0c8, 2.0), [0, 5.6, 0], body, null, [1, 1.2, 1]);
  const R0 = 2.6, R1 = 1.6, y0 = 5.0, y1 = 8.7, n = 28, h = y1 - y0, tilt = Math.atan2(R0 - R1, h), sh = M(0xf2e6c8, { r: 0.85, e: 0xffc070, ei: 0.35, name: 'fabric' });
  for (let i = 0; i < n; i++) {
    const a = i / n * TAU, r = (R0 + R1) / 2, P = grp(body, [r * Math.cos(a), (y0 + y1) / 2, r * Math.sin(a)], null, [0, -a + PI / 2, 0]);
    add(new THREE.BoxGeometry(2 * PI * r / n * 1.1, h / Math.cos(tilt), 0.08), sh, [0, 0, 0], P, [-tilt, 0, 0]);
  }
  add(new THREE.TorusGeometry(R0, 0.08, 6, 36), M(0xe8d8b4, { r: 0.7, name: 'fabric' }), [0, y0, 0], body, [PI / 2, 0, 0]);
  add(new THREE.TorusGeometry(R1, 0.07, 6, 28), M(0xe8d8b4, { r: 0.7, name: 'fabric' }), [0, y1, 0], body, [PI / 2, 0, 0]);
  add(new THREE.SphereGeometry(0.2, 10, 8), b, [0, 8.85, 0], body);
  fitAll(body, 9.0);
