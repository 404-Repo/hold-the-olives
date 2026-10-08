  // PROFILES: one lathe cross-section with wall thickness and a rolled rim (outside up, inside down); handle = extruded side
  // profile (thick at the pan, tapering, a hang hole) rising gently; egg = wobbly discSheet white with a glossy lathe yolk
  const body = grp(g);
  const cu = M(C.copper, { r: 0.3, m: 0.5, name: 'metal', ds: true }), cuIn = M(0xb8693a, { r: 0.35, m: 0.5, name: 'metal' });
  add(lathe([[0, 0], [1.0, 0], [1.1, 0.03], [1.22, 0.2], [1.3, 0.4], [1.34, 0.44], [1.31, 0.46]], 40), cu, [0, 0, 0], body);
  add(lathe([[1.31, 0.46], [1.26, 0.42], [1.17, 0.2], [1.07, 0.07], [0.98, 0.05], [0, 0.05]], 40), cuIn, [0, 0, 0], body);
  const hs = new THREE.Shape(); hs.moveTo(0, 0.2); hs.lineTo(0.3, 0.28); hs.lineTo(2.0, 0.5); hs.quadraticCurveTo(2.3, 0.54, 2.3, 0.42); hs.quadraticCurveTo(2.28, 0.33, 2.0, 0.36); hs.lineTo(0.3, 0.16); hs.lineTo(0, 0.08); hs.closePath();
  const hh = new THREE.Path(); hh.absarc(2.12, 0.43, 0.045, 0, TAU, true); hs.holes.push(hh);
  const hg = new THREE.ExtrudeGeometry(hs, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 2, curveSegments: 6 }); hg.translate(0, 0, -0.06);
  add(hg, cu, [1.22, 0, 0], body);
  add(new THREE.CylinderGeometry(0.11, 0.11, 0.06, 12), cu, [1.33, 0.32, 0], body, [0, 0, PI / 2]);
  const ew = M(0xfbf7ee, { r: 0.3 });
  add(discSheet(0.72, 4, 20, (t) => 0.1 - 0.05 * t * t, (th) => 1 + 0.12 * Math.sin(th * 3) + 0.07 * Math.cos(th * 5)), M(0xfbf7ee, { r: 0.3, ds: true }), [0.05, 0.0, 0.0], body);
  add(lathe([[0, 0.24], [0.12, 0.22], [0.2, 0.17], [0.24, 0.12], [0.25, 0.08]], 18), M(0xf7b51a, { r: 0.18 }), [-0.08, 0, 0.1], body);
  fitAll(body, 0.6);
