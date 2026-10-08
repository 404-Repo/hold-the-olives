  // LATHE: one smooth turned walnut profile (foot, belly, waist, shoulder), a copper collar, a lathed copper crown knob
  const body = grp(g);
  const wal = timber(C.walnut, 0.4), cop = metal(C.copper, 0.28);
  add(lathe([[0, 0], [0.31, 0], [0.32, 0.03], [0.3, 0.07], [0.23, 0.1], [0.22, 0.14], [0.26, 0.22], [0.28, 0.32], [0.26, 0.42], [0.19, 0.5], [0.15, 0.56],
    [0.15, 0.6], [0.19, 0.64], [0.22, 0.7], [0.21, 0.77], [0.17, 0.81], [0, 0.82]], 28), wal, [0, 0, 0], body);
  add(new THREE.TorusGeometry(0.155, 0.022, 6, 28), cop, [0, 0.58, 0], body, [PI / 2, 0, 0]);
  add(lathe([[0, 0.8], [0.17, 0.8], [0.18, 0.83], [0.13, 0.86], [0.12, 0.9], [0.14, 0.93], [0.09, 0.97], [0.05, 0.99], [0.06, 1.02], [0.04, 1.05], [0, 1.06]], 22), cop, [0, 0, 0], body);
  for (let i = 0; i < 8; i++) { const a = i / 8 * TAU; add(new THREE.ConeGeometry(0.025, 0.06, 6), cop, [Math.cos(a) * 0.13, 0.95, Math.sin(a) * 0.13], body, [Math.sin(a) * 0.4, 0, -Math.cos(a) * 0.4]); }
  fitAll(body, 1.0);
