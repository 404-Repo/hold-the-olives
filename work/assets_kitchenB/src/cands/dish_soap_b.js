  // PROFILES: a lathe bottle (rounded base, straight wall, sloped shoulder, neck) squashed to an oval, a lathe soap fill inside, a turned white pump
  // (collar, stem, flared head) and a nozzle as an extruded side profile
  const body = grp(g);
  const bot = M(0x86b8a8, { r: 0.25, t: 0.5 }), soap = M(0x5f9a5a, { r: 0.15 }), wh = M(0xf7f5f0, { r: 0.35 });
  const B = grp(body, [0, 0, 0], null, null); B.scale.set(1, 1, 0.62);
  add(lathe([[0, 0], [0.42, 0], [0.5, 0.06], [0.52, 0.2], [0.52, 1.15], [0.45, 1.35], [0.25, 1.48], [0.2, 1.52], [0.2, 1.6], [0, 1.6]], 24), bot, [0, 0, 0], B);
  add(lathe([[0, 0.05], [0.42, 0.05], [0.46, 0.15], [0.46, 1.0], [0.0, 1.02]], 20), soap, [0, 0, 0], B);
  add(lathe([[0, 1.55], [0.23, 1.55], [0.24, 1.6], [0.23, 1.72], [0.07, 1.74], [0.07, 1.86], [0.15, 1.88], [0.17, 1.95], [0.15, 2.04], [0, 2.06]], 18), wh, [0, 0, 0], body);
  const nz = new THREE.Shape(); nz.moveTo(0, 1.9); nz.lineTo(0.42, 1.93); nz.lineTo(0.5, 1.86); nz.lineTo(0.47, 1.83); nz.lineTo(0.4, 1.88); nz.lineTo(0, 1.84); nz.closePath();
  const ng = new THREE.ExtrudeGeometry(nz, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 }); ng.rotateY(-PI / 2); ng.translate(0.03, 0, 0);
  add(ng, wh, [0, 0, 0], body);
  fitAll(body, 2.2);
