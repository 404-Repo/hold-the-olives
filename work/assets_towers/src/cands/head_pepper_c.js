  // DIFFERENT READING: a squat CHUNKY mill on its own walnut stand, octagonal faceted turning, a big crown with cone points
  const body = grp(g);
  const wal = timber(C.walnut, 0.42), wal2 = timber(0x5a3c28, 0.45), cop = metal(C.copper, 0.28);
  add(new THREE.CylinderGeometry(0.38, 0.4, 0.07, 28), wal2, [0, 0.035, 0], body);
  add(lathe([[0, 0.07], [0.3, 0.07], [0.3, 0.12], [0.24, 0.15], [0.3, 0.26], [0.32, 0.36], [0.29, 0.46], [0.2, 0.54], [0.2, 0.6], [0.27, 0.66], [0.27, 0.73], [0.2, 0.76], [0, 0.76]], 16), wal, [0, 0, 0], body, [0, PI / 8, 0]);
  add(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 16), cop, [0, 0.57, 0], body, [0, PI / 8, 0]);
  add(new THREE.CylinderGeometry(0.2, 0.22, 0.06, 20), cop, [0, 0.79, 0], body);
  add(new THREE.CylinderGeometry(0.19, 0.2, 0.08, 20, 1, true), M(C.copper, { r: 0.28, m: 0.85, name: 'metal', ds: true }), [0, 0.86, 0], body);
  for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; add(new THREE.ConeGeometry(0.04, 0.1, 6), cop, [Math.cos(a) * 0.18, 0.95, Math.sin(a) * 0.18], body);
    add(new THREE.SphereGeometry(0.03, 6, 4), cop, [Math.cos(a) * 0.18, 1.0, Math.sin(a) * 0.18], body); }
  add(new THREE.SphereGeometry(0.09, 12, 8), cop, [0, 0.9, 0], body);
  fitAll(body, 1.0);
