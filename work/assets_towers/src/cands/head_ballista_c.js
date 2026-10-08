  // DIFFERENT READING: a Roman torsion ballista built of toothpicks: a square pick frame with two rope skeins, two pick arms, a trough and a big bolt
  const body = grp(g);
  const wood = timber(C.wood), dark = timber(0xa8784a), pick = M(C.pick, { r: 0.55 }), rope = M(0xd9c79a, { r: 0.9 }), str = M(0xf4efe4, { r: 0.8 }), frill = M(C.frill, { r: 0.2 });
  add(new THREE.CylinderGeometry(0.4, 0.42, 0.1, 28), wood, [0, 0.05, 0], body);
  add(new THREE.CylinderGeometry(0.12, 0.16, 0.2, 12), dark, [0, 0.2, 0], body);
  const aim = grp(body, [0, 0.36, 0], null, [-0.1, 0, 0]);
  add(new THREE.BoxGeometry(0.16, 0.06, 0.95), wood, [0, 0, 0.0], aim);                // trough
  // the frame: four picks making a box at the front
  const fz = 0.28, fy = 0.12;
  for (const x of [-0.2, 0.2]) for (const z of [fz - 0.07, fz + 0.07]) rod([x, -0.03, z], [x, 0.3, z], 0.022, pick, aim, 6);
  for (const y of [0.0, 0.27]) rod([-0.24, y, fz], [0.24, y, fz], 0.03, dark, aim, 6);
  // rope skeins
  for (const s of [-1, 1]) add(new THREE.CylinderGeometry(0.05, 0.05, 0.28, 10), rope, [s * 0.2, 0.135, fz], aim);
  // arms swept back, string to the slider
  for (const s of [-1, 1]) { rod([s * 0.2, fy, fz], [s * 0.52, fy, fz - 0.24], 0.024, pick, aim, 6); add(new THREE.ConeGeometry(0.045, 0.1, 6), frill, [s * 0.54, fy, fz - 0.26], aim, [0, 0, -s * PI / 2]);
    rod([s * 0.52, fy, fz - 0.24], [0, 0.05, -0.35], 0.008, str, aim, 4); }
  add(new THREE.BoxGeometry(0.1, 0.06, 0.1), dark, [0, 0.05, -0.35], aim);
  add(new THREE.CylinderGeometry(0.03, 0.03, 0.85, 8), pick, [0, 0.06, 0.08], aim, [PI / 2, 0, 0]);
  add(new THREE.ConeGeometry(0.03, 0.14, 8), pick, [0, 0.06, 0.57], aim, [PI / 2, 0, 0]);
  fitAll(body, 0.75);
