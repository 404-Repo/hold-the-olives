  // a: primitives. C-frame: base plinth, back tower, overhanging head with steel band, filter cone, hotplate, glass carafe.
  const red = M(C.red, 0.3), steel = M(C.steel, 0.35, 0.55, 'metal'), dark = M(0x2a2624, 0.6), coffee = M(0x3a1d10, 0.15);
  add(rbox(2.1, 0.35, 2.3, 0.14), red, 0, 0.18, 0);
  add(rbox(2.1, 3.0, 0.8, 0.22), red, 0, 1.75, -0.75);
  add(rbox(2.1, 0.8, 2.2, 0.22), red, 0, 2.95, -0.05);
  add(rbox(2.14, 0.32, 1.5, 0.08), steel, 0, 2.55, 0.32);           // steel band under the head front
  add(rbox(1.9, 2.0, 0.08, 0.04), steel, 0, 1.45, -0.33);            // inner steel wall
  add(cyl(0.45, 0.18, 0.45, 16), red, 0, 2.2, 0.35);                 // filter cone
  add(cyl(0.62, 0.62, 0.05, 20), steel, 0, 0.38, 0.35);              // hotplate
  // carafe
  const gl = GLASS(0.42);
  add(cyl(0.48, 0.55, 0.95, 20, true), M(0xd8eef0, 0.05, 0, undefined, { transparent: true, opacity: 0.42, depthWrite: false, side: DS }), 0, 0.88, 0.35);
  add(cyl(0.5, 0.5, 0.45, 20), coffee, 0, 0.64, 0.35).scale.set(0.98, 1, 0.98);
  add(cyl(0.5, 0.5, 0.1, 20), dark, 0, 1.4, 0.35);
  add(new THREE.TorusGeometry(0.3, 0.07, 8, 14, Math.PI), dark, 0.62, 0.92, 0.35, 0, 0, -Math.PI / 2);
  for (const x of [-0.75, 0.75]) add(rbox(0.22, 0.08, 0.22, 0.04), dark, x, 0.37, 0.95);
  add(cyl(0.08, 0.08, 0.06, 10), M(0xffe08a, 0.3, 0, undefined, { emissive: 0xff9a2a, emissiveIntensity: 0.6 }), 0.7, 0.2, 1.16, Math.PI / 2);
  // back: a water window, vent slats and a cord so the back reads as a machine
  const wtr = M(0x9fd6e8, 0.1, 0, undefined, { transparent: true, opacity: 0.75 });
  add(rbox(0.36, 1.5, 0.08, 0.06), wtr, 0.55, 1.75, -1.16);
  add(rbox(0.46, 1.6, 0.05, 0.05), steel, 0.55, 1.75, -1.13);
  for (let i = 0; i < 4; i++) add(rbox(0.8, 0.07, 0.08, 0.03), dark, -0.35, 2.8 - i * 0.18, -1.17);
  add(tube([[-0.5, 0.55, -1.12], [-0.5, 0.35, -1.45], [-0.3, 0.06, -1.7]], 0.05, 8, 6), dark);
  finish(HEIGHT);
