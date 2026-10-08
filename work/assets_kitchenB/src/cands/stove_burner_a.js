  // PRIMITIVES: steel spill disc, dark crown, notched cap; grate = flat torus ring on four feet + five rounded-box arms
  const body = grp(g);
  const iron = M(0x2b2a2c, { r: 0.55, m: 0.35, name: 'metal' }), steel = metal(C.steel, 0.3), cap = M(0x1d1c1e, { r: 0.4, m: 0.3, name: 'metal' });
  add(new THREE.CylinderGeometry(0.95, 1.0, 0.04, 32), steel, [0, 0.02, 0], body);
  add(new THREE.TorusGeometry(0.97, 0.025, 6, 32), steel, [0, 0.04, 0], body, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.5, 0.56, 0.08, 24), M(0x55585c, { r: 0.4, m: 0.7, name: 'metal' }), [0, 0.08, 0], body);
  for (let i = 0; i < 16; i++) { const a = i / 16 * TAU; add(new THREE.BoxGeometry(0.06, 0.03, 0.08), cap, [Math.cos(a) * 0.5, 0.11, Math.sin(a) * 0.5], body, [0, -a, 0]); }
  add(new THREE.CylinderGeometry(0.4, 0.46, 0.06, 24), cap, [0, 0.15, 0], body);
  add(new THREE.CylinderGeometry(0.16, 0.2, 0.03, 16), cap, [0, 0.195, 0], body);
  // grate
  const R = 1.1;
  add(new THREE.TorusGeometry(R, 0.08, 6, 36), iron, [0, 0.22, 0], body, [PI / 2, 0, 0], [1, 1, 0.9]);
  for (let i = 0; i < 4; i++) { const a = (i + 0.5) / 4 * TAU; add(new THREE.CylinderGeometry(0.07, 0.09, 0.2, 8), iron, [Math.cos(a) * R, 0.1, Math.sin(a) * R], body); }
  for (let i = 0; i < 5; i++) {
    const a = i / 5 * TAU + PI / 2, mid = (0.52 + R) / 2;
    const arm = grp(body, [Math.cos(a) * mid, 0, Math.sin(a) * mid], null, [0, -a, 0]);
    add(rbox(R - 0.52 + 0.1, 0.1, 0.14, 0.035), iron, [0, 0.2, 0], arm);
    add(rbox(0.14, 0.12, 0.15, 0.04), iron, [-(R - 0.52) / 2 + 0.02, 0.18, 0], arm);
  }
  fitWHD(body, 2.4, 0.3, 2.4);
