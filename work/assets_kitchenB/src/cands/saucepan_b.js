  // PROFILES: lathe body (base bead, straight wall, rolled rim), lathe lid (flange, dome, collar, knob), handle = extruded side profile with a hang hole
  const body = grp(g);
  const cu = M(C.copper, { r: 0.3, m: 0.85, name: 'metal' }), dk = M(0xa85f30, { r: 0.35, m: 0.85, name: 'metal' });
  add(lathe([[0, 0], [0.72, 0], [0.8, 0.03], [0.83, 0.1], [0.82, 0.88], [0.86, 0.93], [0.86, 0.97], [0.8, 0.97], [0, 0.97]], 36), cu, [0, 0, 0], body);
  add(lathe([[0.83, 0.12], [0.845, 0.14], [0.845, 0.19], [0.83, 0.21]], 36), dk, [0, 0, 0], body);
  add(lathe([[0, 0.97], [0.88, 0.97], [0.9, 1.0], [0.82, 1.03], [0.6, 1.14], [0.3, 1.19], [0.12, 1.2], [0.1, 1.24], [0.08, 1.27], [0.15, 1.3], [0.17, 1.35], [0.12, 1.4], [0, 1.41]], 32), cu, [0, 0, 0], body);
  const hs = new THREE.Shape(); hs.moveTo(0, 0.82); hs.lineTo(0.25, 0.86); hs.lineTo(2.1, 1.06); hs.quadraticCurveTo(2.4, 1.1, 2.4, 0.98); hs.quadraticCurveTo(2.38, 0.88, 2.1, 0.9); hs.lineTo(0.25, 0.7); hs.lineTo(0, 0.62); hs.closePath();
  const hh = new THREE.Path(); hh.absarc(2.2, 0.99, 0.05, 0, TAU, true); hs.holes.push(hh);
  const hg = new THREE.ExtrudeGeometry(hs, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.045, bevelSize: 0.035, bevelSegments: 2, curveSegments: 6 }); hg.translate(0, 0, -0.07);
  add(hg, cu, [0.8, 0, 0], body);
  for (const z of [-0.09, 0.09]) add(new THREE.SphereGeometry(0.045, 8, 6), dk, [0.84, 0.76, z], body);
  fitAll(body, 1.4);
