  // PRIMITIVES: stacked cylinders and squashed spheres for the turned body, torus beads, a copper crown of spheres
  const body = grp(g);
  const wal = timber(C.walnut, 0.45), cop = metal(C.copper, 0.3);
  add(new THREE.CylinderGeometry(0.3, 0.32, 0.08, 24), wal, [0, 0.04, 0], body);
  add(new THREE.CylinderGeometry(0.22, 0.26, 0.1, 24), wal, [0, 0.13, 0], body);
  add(new THREE.SphereGeometry(0.26, 24, 12), wal, [0, 0.33, 0], body, null, [1, 0.85, 1]);
  add(new THREE.CylinderGeometry(0.15, 0.2, 0.14, 24), wal, [0, 0.55, 0], body);
  add(new THREE.TorusGeometry(0.16, 0.025, 6, 24), cop, [0, 0.62, 0], body, [PI / 2, 0, 0]);
  add(new THREE.SphereGeometry(0.21, 24, 10), wal, [0, 0.72, 0], body, null, [1, 0.6, 1]);
  add(new THREE.CylinderGeometry(0.16, 0.18, 0.05, 24), cop, [0, 0.84, 0], body);
  add(new THREE.CylinderGeometry(0.14, 0.12, 0.06, 18), cop, [0, 0.89, 0], body);
  for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; add(new THREE.SphereGeometry(0.03, 8, 6), cop, [Math.cos(a) * 0.13, 0.94, Math.sin(a) * 0.13], body); }
  add(new THREE.SphereGeometry(0.06, 12, 8), cop, [0, 0.96, 0], body);
  fitAll(body, 1.0);
