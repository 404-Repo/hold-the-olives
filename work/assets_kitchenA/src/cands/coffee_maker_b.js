  // b: extruded side section (one C-shaped piece swept along x, bevelled), lathe carafe with a pour lip.
  const red = M(C.red, 0.3), steel = M(C.steel, 0.35, 0.55, 'metal'), dark = M(0x2a2624, 0.6), coffee = M(0x4a2a18, 0.15);
  // section in (z, y), front +z
  const sec = [[-1.15, 0], [1.15, 0], [1.15, 0.38], [-0.3, 0.38], [-0.3, 2.45], [1.1, 2.45], [1.15, 3.35], [-1.15, 3.35]];
  add(ext(sec, 2.0, 0.16), red, 0, 0, 0, 0, -Math.PI / 2, 0);
  add(rbox(2.04, 0.36, 1.45, 0.08), steel, 0, 2.62, 0.42);
  add(rbox(1.7, 1.9, 0.06, 0.03), steel, 0, 1.45, -0.27);
  add(cyl(0.42, 0.16, 0.4, 16), steel, 0, 2.28, 0.4);
  add(cyl(0.6, 0.6, 0.05, 20), steel, 0, 0.4, 0.42);
  const glass = M(0xd8eef0, 0.05, 0, undefined, { transparent: true, opacity: 0.42, depthWrite: false, side: DS });
  add(sLathe([[0.36, 0.0], [0.56, 0.12], [0.6, 0.45], [0.48, 0.8], [0.36, 0.95], [0.38, 1.05]], 20), glass, 0, 0.43, 0.42);
  add(sLathe([[0, 0.02], [0.38, 0.02], [0.55, 0.14], [0.58, 0.4], [0, 0.4]], 18), coffee, 0, 0.43, 0.42);
  add(cyl(0.42, 0.4, 0.12, 18), dark, 0, 1.52, 0.42);
  add(tube([[0.45, 1.3, 0.42], [0.85, 1.25, 0.42], [0.85, 0.75, 0.42], [0.55, 0.62, 0.42]], 0.08, 12, 6), dark);
  add(rbox(0.5, 0.18, 0.08, 0.04), dark, 0.55, 0.2, 1.16);
  finish(HEIGHT);
