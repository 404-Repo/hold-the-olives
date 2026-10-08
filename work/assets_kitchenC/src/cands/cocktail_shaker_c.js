  // DIFFERENT READING: a chunky toy cobbler with an exaggerated bulb shoulder, a faceted (12 side) tin with a hammered look, a copper seam band and a round knob on the cap
  const body = grp(g);
  const st = metal(C.steel, 0.25), cu = M(C.copper, { r: 0.3, m: 0.5, name: 'metal' });
  add(lathe([[0, 0], [0.58, 0], [0.64, 0.06], [0.82, 1.5], [0.84, 1.6], [0, 1.6]], 12), st, [0, 0, 0], body);
  add(lathe([[0.83, 1.56], [0.88, 1.6], [0.88, 1.74], [0.83, 1.78]], 24), cu, [0, 0, 0], body);
  add(lathe([[0, 1.74], [0.84, 1.74], [0.9, 1.95], [0.78, 2.2], [0.42, 2.38], [0.28, 2.45], [0, 2.45]], 24), st, [0, 0, 0], body);
  add(lathe([[0, 2.42], [0.32, 2.42], [0.34, 2.75], [0.26, 2.8], [0, 2.8]], 16), st, [0, 0, 0], body);
  add(new THREE.SphereGeometry(0.13, 12, 8), cu, [0, 2.87, 0], body);
  fitAll(body, 3.0);
