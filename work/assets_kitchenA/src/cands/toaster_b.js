  // b: extruded side profile (a loaf-shaped section swept along x), chrome trim belt, toast peeking up.
  const red = M(C.red, 0.3), chrome = M(C.steel, 0.25, 0.55, 'metal'), dark = M(0x2a2624, 0.8);
  const toastM = M(C.toast, 0.7), crust = M(C.crust, 0.7);
  // side section in (z, y): flat base, near-vertical sides bulging slightly, generous rounded top.
  const prof = [];
  const W = 0.82, Hh = 1.7;
  for (let i = 0; i <= 12; i++) { const t = i / 12, a = Math.PI * t; prof.push([Math.cos(a) * W, Hh - 0.42 + Math.sin(a) * 0.42 * 1.0 * (0.6 + 0.4 * Math.sin(a))]); }
  prof.push([-W - 0.04, 0.6], [-W + 0.02, 0.12], [-W + 0.14, 0.0], [W - 0.14, 0.0], [W - 0.02, 0.12], [W + 0.04, 0.6]);
  const body = add(ext(prof.reverse().map(([z, y]) => [z, y]), 2.7, 0.18), red, 0, 0.12, 0, 0, Math.PI / 2, 0);
  add(rbox(2.86, 0.16, 1.82, 0.08), chrome, 0, 0.62, 0);            // trim belt
  add(rbox(2.6, 0.12, 1.5, 0.06), dark, 0, 0.08, 0);                // plinth
  for (const z of [-0.26, 0.26]) {
    add(rbox(1.95, 0.08, 0.24, 0.04), dark, 0, 1.84, z);
    add(rbox(1.7, 0.5, 0.14, 0.06), toastM, 0, 1.92, z);            // toast slice
    add(rbox(1.78, 0.08, 0.16, 0.04), crust, 0, 2.17, z);
  }
  add(rbox(0.36, 0.1, 0.22, 0.05), chrome, 1.48, 1.25, 0);
  add(rbox(0.1, 0.6, 0.12, 0.04), chrome, 1.37, 1.1, 0);
  add(cyl(0.15, 0.15, 0.1, 16), chrome, -0.9, 0.36, 0.86, Math.PI / 2);
  finish(HEIGHT);
