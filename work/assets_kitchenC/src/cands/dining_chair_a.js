  // PRIMITIVES + TURNED LEGS: lathe baluster front legs, raked back posts (rods) with ball finials, a bevelled seat with a rounded front, rod stretchers, five vertical slats, a crest rail extruded from a shaped outline (arched top, scrolled ear ends)
  const body = grp(g);
  const wd = timber(C.wood, 0.55), wd2 = timber(0xb8864f, 0.55);
  const legG = lathe([[0, 0], [0.2, 0], [0.24, 0.12], [0.18, 0.4], [0.2, 1.2], [0.28, 1.6], [0.2, 2.0], [0.17, 2.6], [0.26, 3.0], [0.22, 3.4], [0.25, 4.1], [0, 4.1]], 10);
  for (const s of [-1, 1]) add(legG, wd, [s * 1.85, 0, 1.75], body);
  add(rbox(4.4, 0.42, 4.3, 0.12), wd, [0, 4.08, 0.05], body);
  const B = grp(body, [0, 0, -1.95], null, [-0.06, 0, 0]);
  for (const s of [-1, 1]) { add(new THREE.CylinderGeometry(0.22, 0.24, 9.0, 10), wd, [s * 1.85, 4.5, 0], B); add(new THREE.SphereGeometry(0.28, 12, 8), wd2, [s * 1.85, 9.15, 0], B); }
  for (const s of [-1, 1]) rod([s * 1.85, 1.3, 1.75], [s * 1.85, 1.3, -1.9], 0.1, wd2, body, 8);
  rod([-1.85, 1.0, 1.75], [1.85, 1.0, 1.75], 0.1, wd2, body, 8);
  for (let i = 0; i < 5; i++) add(rbox(0.36, 3.1, 0.16, 0.06), wd, [-1.24 + i * 0.62, 5.0, 0], B);
  add(rbox(3.8, 0.3, 0.2, 0.08), wd2, [0, 4.75, 0], B);
  const cs = new THREE.Shape(); cs.moveTo(-2.3, 0); cs.lineTo(2.3, 0); cs.quadraticCurveTo(2.6, 0.2, 2.5, 0.75); cs.quadraticCurveTo(2.35, 1.15, 2.0, 1.0); cs.quadraticCurveTo(1.0, 1.15, 0.5, 1.25); cs.quadraticCurveTo(0, 1.55, -0.5, 1.25); cs.quadraticCurveTo(-1.0, 1.15, -2.0, 1.0); cs.quadraticCurveTo(-2.35, 1.15, -2.5, 0.75); cs.quadraticCurveTo(-2.6, 0.2, -2.3, 0);
  const cg = new THREE.ExtrudeGeometry(cs, { depth: 0.24, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.07, bevelSegments: 2, curveSegments: 8 }); cg.translate(0, 0, -0.12);
  add(cg, wd, [0, 8.05, 0], B);
  fitAll(body, 10.0);
