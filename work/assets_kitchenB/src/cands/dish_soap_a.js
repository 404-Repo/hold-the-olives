  // PRIMITIVES: a flat rounded-box bottle in translucent sage with a darker green soap block inside (to 70%), a white collar cylinder, pump stem, rounded head box, nozzle cylinder
  const body = grp(g);
  const bot = M(0x86b8a8, { r: 0.25, t: 0.5 }), soap = M(0x5f9a5a, { r: 0.15 }), wh = M(0xf7f5f0, { r: 0.35 });
  add(rbox(1.0, 1.45, 0.6, 0.18), bot, [0, 0, 0], body);
  add(rbox(0.86, 0.95, 0.46, 0.14), soap, [0, 0.06, 0], body);
  add(new THREE.CylinderGeometry(0.2, 0.32, 0.18, 16), bot, [0, 1.52, 0], body);
  add(new THREE.CylinderGeometry(0.2, 0.2, 0.16, 16), wh, [0, 1.68, 0], body);
  add(new THREE.CylinderGeometry(0.07, 0.07, 0.2, 10), wh, [0, 1.86, 0], body);
  add(rbox(0.26, 0.2, 0.3, 0.07), wh, [0, 1.95, 0], body);
  rod([0, 2.07, 0.1], [0, 2.07, 0.42], 0.05, wh, body, 8);
  rod([0, 2.07, 0.42], [0, 1.98, 0.5], 0.045, wh, body, 8);
  fitAll(body, 2.2);
