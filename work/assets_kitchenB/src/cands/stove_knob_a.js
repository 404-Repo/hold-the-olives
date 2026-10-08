  // PRIMITIVES: steel skirt disc + bevel ring, cream cylinder body with a rounded-box grip bar and a pointer notch
  const body = grp(g);
  const cr = enamel(C.cream, 0.3), steel = metal(C.steel, 0.3);
  add(new THREE.CylinderGeometry(0.34, 0.36, 0.04, 28), steel, [0, 0.02, 0], body);
  add(new THREE.TorusGeometry(0.33, 0.02, 6, 28), steel, [0, 0.04, 0], body, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.22, 0.24, 0.16, 24), cr, [0, 0.12, 0], body);
  add(new THREE.TorusGeometry(0.2, 0.03, 6, 24), cr, [0, 0.2, 0], body, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.2, 0.2, 0.02, 24), cr, [0, 0.2, 0], body);
  add(rbox(0.4, 0.15, 0.13, 0.05), cr, [0, 0.2, 0], body);
  add(new THREE.BoxGeometry(0.03, 0.02, 0.1), M(0x9a5a2e, { r: 0.4 }), [0, 0.35, 0.1], body);
  fitAll(body, 0.35);
