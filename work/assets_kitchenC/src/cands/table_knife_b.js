  // PRIMITIVES: blade = a thin box with a half-disc tip (cylinder), a steel ferrule, handle = rounded box with a domed end; slight lift so it rests on its handle
  const body = grp(g);
  const st = metal(C.steel, 0.25);
  add(new THREE.BoxGeometry(0.22, 0.035, 1.05), st, [0, 0.02, -0.55], body);
  add(new THREE.CylinderGeometry(0.11, 0.11, 0.035, 16, 1, false, 0, PI), st, [0, 0.02, -1.07], body, [0, PI / 2, 0]);
  add(new THREE.CylinderGeometry(0.075, 0.075, 0.1, 12), st, [0, 0.06, 0.03], body, [PI / 2, 0, 0], [1.3, 1, 0.8]);
  add(rbox(0.24, 0.12, 0.95, 0.05), st, [0, 0.0, 0.56], body);
  add(new THREE.SphereGeometry(0.12, 12, 8), st, [0, 0.06, 1.03], body, null, [1, 0.5, 0.6]);
  fitD(body, 2.3);
