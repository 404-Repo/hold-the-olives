  // DIFFERENT READING: a cream bell hood: the canopy a curved side profile (concave flare, like a mantle) in cream, edged by a chunky steel band
  // with a rolled lip, a steel chimney with two horizontal seams, and a copper rail along the band front
  const body = grp(g); g.userData.mounts = 'back';
  const st = metal(C.steel, 0.3), cr = enamel(C.cream, 0.3), cu = M(C.copper, { r: 0.3, m: 0.5, name: 'metal' });
  const W = 6.0, D = 4.4;
  const p = new THREE.Shape(); p.moveTo(0, 0.6); p.lineTo(D - 0.1, 0.6); p.quadraticCurveTo(D - 0.4, 1.0, 2.6, 1.6); p.quadraticCurveTo(2.1, 1.9, 2.1, 2.4); p.lineTo(0, 2.4); p.closePath();
  const cg = new THREE.ExtrudeGeometry(p, { depth: W - 0.2, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.08, bevelSegments: 3, curveSegments: 8 });
  cg.rotateY(-PI / 2); cg.translate((W - 0.2) / 2, 0, 0);
  add(cg, cr, [0, 0, -D], body);
  add(rbox(W + 0.1, 0.62, D + 0.05, 0.14), st, [0, 0, -D / 2 - 0.02], body);
  add(new THREE.BoxGeometry(W - 0.5, 0.02, D - 0.6), M(0x3a3d40, { r: 0.6, m: 0.5, name: 'metal' }), [0, -0.005, -D / 2], body);
  for (const x of [-2.4, 2.4]) rod([x, 0.31, 0.02], [x, 0.31, 0.25], 0.05, cu, body, 8);
  rod([-2.5, 0.31, 0.25], [2.5, 0.31, 0.25], 0.065, cu, body, 10);
  add(rbox(2.3, 4.7, 2.0, 0.06), st, [0, 2.3, -D + 1.0], body);
  for (const y of [3.9, 5.5]) add(new THREE.BoxGeometry(2.32, 0.04, 2.02), M(0x8c9298, { r: 0.4, m: 0.5, name: 'metal' }), [0, y, -D + 1.0], body);
  fitAll(body, 7.0);
