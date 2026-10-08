  // c: different breakdown: a horizontal pill body (capsule along x) with bulbous red end caps,
  // a chrome centre shell, chrome skirt, toast up. Retro 50s reading.
  const red = M(C.red, 0.3), chrome = M(C.steel, 0.25, 0.55, 'metal'), dark = M(0x2a2624, 0.8), toastM = M(C.toast, 0.7);
  const cap = new THREE.CapsuleGeometry(0.8, 1.3, 6, 16); cap.scale(1, 1, 1);
  add(cap, red, 0, 1.0, 0, 0, 0, Math.PI / 2).scale.set(1.08, 1.0, 0.98);
  add(cyl(0.83, 0.83, 1.1, 20, true), chrome, 0, 1.0, 0, 0, 0, Math.PI / 2).scale.set(1, 1, 1);
  add(rbox(2.7, 0.5, 1.5, 0.15), red, 0, 0.3, 0);                   // flat-bottomed skirt
  add(rbox(2.84, 0.12, 1.64, 0.06), chrome, 0, 0.1, 0);
  for (const z of [-0.24, 0.24]) {
    add(rbox(1.5, 0.12, 0.22, 0.05), dark, 0, 1.78, z);
    add(rbox(1.3, 0.4, 0.13, 0.06), toastM, 0, 1.92, z);
  }
  add(rbox(0.32, 0.1, 0.22, 0.05), chrome, 1.72, 1.2, 0);
  add(cyl(0.15, 0.15, 0.1, 16), chrome, 0.75, 0.42, 0.78, Math.PI / 2);
  finish(HEIGHT);
