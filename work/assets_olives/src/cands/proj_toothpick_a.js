  // A: primitives. A cylinder shaft with a cone point at each end, lying along Z (flight direction +Z).
  const wood = M(0xe8cfa0, { r: 0.6, name: 'timber' }), L = 0.6, r = 0.016, tip = 0.09;
  const p = grp(g, [0, r, 0]); p.rotation.x = PI / 2;
  add(new THREE.CylinderGeometry(r, r, L - tip * 2, 10, 2), wood, [0, 0, 0], p);
  add(new THREE.ConeGeometry(r, tip, 10), wood, [0, (L - tip) / 2, 0], p);
  add(new THREE.ConeGeometry(r, tip, 10), wood, [0, -(L - tip) / 2, 0], p, [PI, 0, 0]);
