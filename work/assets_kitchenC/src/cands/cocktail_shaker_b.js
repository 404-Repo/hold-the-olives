  // PRIMITIVES: tin = tapered cylinder + bottom bead torus, strainer = cylinder band + cone shoulder + short neck, cap = cylinder + squashed sphere top; torus seams
  const body = grp(g);
  const st = metal(C.steel, 0.25), dk = metal(0x9aa3ab, 0.3);
  add(new THREE.CylinderGeometry(0.8, 0.63, 1.65, 28), st, [0, 0.83, 0], body);
  add(new THREE.TorusGeometry(0.63, 0.04, 6, 28), dk, [0, 0.06, 0], body, [PI / 2, 0, 0]);
  add(new THREE.TorusGeometry(0.81, 0.045, 6, 28), dk, [0, 1.68, 0], body, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.8, 0.8, 0.22, 28), st, [0, 1.8, 0], body);
  add(new THREE.CylinderGeometry(0.3, 0.8, 0.55, 28), st, [0, 2.18, 0], body);
  add(new THREE.CylinderGeometry(0.28, 0.3, 0.14, 20), dk, [0, 2.5, 0], body);
  add(new THREE.CylinderGeometry(0.32, 0.32, 0.32, 20), st, [0, 2.73, 0], body);
  add(new THREE.SphereGeometry(0.32, 20, 8, 0, TAU, 0, PI / 2), st, [0, 2.89, 0], body, null, [1, 0.35, 1]);
  fitAll(body, 3.0);
