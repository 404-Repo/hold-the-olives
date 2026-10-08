  // C: primitives. A rounded box for the body and two fat cylinders for the top lobes, crust colour; toasted faces
  // as thin boxes and discs set on front and back; upright, faces +Z.
  const crust = M(0xc88a3e, { r: 0.6 }), toast = M(0xdca55a, { r: 0.7 });
  const T = 0.14;
  add(new THREE.BoxGeometry(0.68, 0.5, T), crust, [0, 0.25 + 0.02, 0]);
  add(new THREE.CapsuleGeometry(0.02, 0.64, 2, 6), crust, [0, 0.02, 0], g, [0, 0, PI / 2], [1, 1, T / 0.04]);
  for (const sd of [-1, 1]) add(new THREE.CylinderGeometry(0.24, 0.24, T, 20), crust, [sd * 0.2, 0.62, 0], g, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.2, 0.2, T, 20), crust, [0, 0.66, 0], g, [PI / 2, 0, 0]);
  for (const sd of [-1, 1]) {
    const z = sd * (T / 2 + 0.002), ry = sd > 0 ? 0 : PI;
    add(new THREE.PlaneGeometry(0.6, 0.5), toast, [0, 0.3, z], g, [0, ry, 0]);
    for (const x of [-0.2, 0.2]) add(new THREE.CircleGeometry(0.2, 16), toast, [x, 0.62, z], g, [0, ry, 0]);
    add(new THREE.CircleGeometry(0.16, 16), toast, [0, 0.66, z], g, [0, ry, 0]);
  }
