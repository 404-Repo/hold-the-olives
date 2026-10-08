  // PRIMITIVES: closed copper cylinder body, base and rim tori, domed sphere-cap lid with a flange, ball knob on a stem, rounded-box handle, rivets
  const body = grp(g);
  const cu = M(C.copper, { r: 0.3, m: 0.5, name: 'metal' }), dk = M(0xa85f30, { r: 0.35, m: 0.5, name: 'metal' });
  const R = 0.82, H = 0.95;
  add(new THREE.CylinderGeometry(R, R, H, 36), cu, [0, H / 2, 0], body);
  add(new THREE.TorusGeometry(R, 0.04, 6, 36), dk, [0, 0.04, 0], body, [PI / 2, 0, 0]);
  add(new THREE.TorusGeometry(R + 0.01, 0.05, 6, 36), cu, [0, H, 0], body, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(R - 0.02, R - 0.02, 0.04, 36), cu, [0, H + 0.02, 0], body);
  add(new THREE.SphereGeometry(R - 0.04, 28, 8, 0, TAU, 0, PI / 2), cu, [0, H + 0.02, 0], body, null, [1, 0.3, 1]);
  add(new THREE.CylinderGeometry(0.07, 0.1, 0.12, 12), dk, [0, H + 0.29, 0], body);
  add(new THREE.SphereGeometry(0.14, 14, 10), cu, [0, H + 0.4, 0], body, null, [1, 0.75, 1]);
  const hd = grp(body, [R - 0.05, H - 0.15, 0], null, [0, 0, 0.1]);
  add(rbox(2.2, 0.12, 0.26, 0.05), cu, [1.1, 0, 0], hd);
  add(new THREE.TorusGeometry(0.1, 0.04, 6, 14), cu, [2.1, 0.06, 0], hd, [PI / 2, 0, 0]);
  for (const z of [-0.08, 0.08]) add(new THREE.SphereGeometry(0.045, 8, 6), cu, [R - 0.01, H - 0.08, z], body);
  fitAll(body, 1.4);
