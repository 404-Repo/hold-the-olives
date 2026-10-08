  // PRIMITIVES / BOXES like the reference: square bottle = a bevelled glass box with a low-poly (4 side) lathe shoulder turned 45 degrees, round neck cylinder, amber liquid = smaller bevelled box, coloured band = a bevelled box sleeve, round cork lathe
  const body = grp(g);
  const gl = glass(0.42);
  add(rbox(1.8, 2.6, 1.8, 0.18, 3), gl, [0, 0, 0], body);
  add(lathe([[1.27, 2.55], [1.2, 2.75], [0.8, 3.05], [0.38, 3.2], [0, 3.22]], 4), gl, [0, 0, 0], body, [0, PI / 4, 0]);
  add(new THREE.CylinderGeometry(0.3, 0.34, 0.75, 18), gl, [0, 3.5, 0], body);
  add(new THREE.TorusGeometry(0.31, 0.06, 6, 18), gl, [0, 3.86, 0], body, [PI / 2, 0, 0]);
  add(rbox(1.62, 2.3, 1.62, 0.14, 3), M(0xc0661a, { r: 0.1 }), [0, 0.12, 0], body);
  add(rbox(1.86, 1.1, 1.86, 0.14, 3), M(0xb4432c, { r: 0.5 }), [0, 0.7, 0], body);
  add(lathe([[0, 3.7], [0.26, 3.7], [0.28, 4.0], [0.38, 4.04], [0.4, 4.2], [0.35, 4.4], [0, 4.4]], 16), M(0xc89a62, { r: 0.85 }), [0, 0, 0], body);
  fitAll(body, 4.4);
