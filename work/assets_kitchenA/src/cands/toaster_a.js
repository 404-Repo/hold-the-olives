  // a: primitives. Rounded red body, chrome base band, chrome top plate, two slots, side lever, front dial.
  const red = M(C.red, 0.3), chrome = M(C.steel, 0.25, 0.55, 'metal'), dark = M(0x2a2624, 0.8);
  add(rbox(2.8, 1.72, 1.6, 0.42, 3), red, 0, 0.98, 0);
  add(rbox(2.92, 0.22, 1.72, 0.1), chrome, 0, 0.26, 0);
  add(rbox(2.3, 0.08, 1.1, 0.04), chrome, 0, 1.84, 0);
  const toastM = M(C.toast, 0.7), crustM = M(C.crust, 0.7);
  for (const z of [-0.24, 0.24]) {
    add(rbox(1.9, 0.1, 0.2, 0.05), dark, 0, 1.85, z);
    add(rbox(1.62, 0.36, 0.13, 0.06), toastM, 0, 1.92, z);           // toast peeking out
    add(rbox(1.7, 0.08, 0.15, 0.04), crustM, 0, 2.1, z);
  }
  for (const x of [-1.1, 1.1]) for (const z of [-0.6, 0.6]) add(cyl(0.1, 0.12, 0.14, 10), dark, x, 0.07, z);
  add(rbox(0.12, 0.7, 0.14, 0.05), chrome, 1.42, 1.15, 0.1);       // lever slot plate
  add(rbox(0.32, 0.1, 0.22, 0.05), chrome, 1.55, 1.3, 0.1);        // lever
  add(cyl(0.16, 0.16, 0.1, 16), chrome, 0.95, 0.68, 0.82, Math.PI / 2);
  add(rbox(0.06, 0.18, 0.06, 0.02), dark, 0.95, 0.68, 0.88);
  add(cyl(0.06, 0.06, 0.06, 10), chrome, 0.62, 0.62, 0.81, Math.PI / 2);
  finish(HEIGHT);
