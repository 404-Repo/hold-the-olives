  // PROFILES: lathe skirt (dished steel collar), lathe knob body with a soft shoulder, grip fin = extruded side profile with a bevel
  const body = grp(g);
  const cr = enamel(C.cream, 0.3), steel = metal(C.steel, 0.3);
  add(lathe([[0, 0], [0.36, 0], [0.38, 0.015], [0.34, 0.045], [0.25, 0.06], [0.0, 0.06]], 28), steel, [0, 0, 0], body);
  add(lathe([[0, 0.05], [0.23, 0.05], [0.24, 0.08], [0.235, 0.17], [0.21, 0.2], [0.0, 0.205]], 24), cr, [0, 0, 0], body);
  const fin = new THREE.Shape(); fin.moveTo(-0.2, 0.15); fin.lineTo(0.2, 0.15); fin.lineTo(0.19, 0.27); fin.quadraticCurveTo(0.17, 0.31, 0.12, 0.31); fin.lineTo(-0.12, 0.31); fin.quadraticCurveTo(-0.17, 0.31, -0.19, 0.27); fin.closePath();
  const fg = new THREE.ExtrudeGeometry(fin, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.025, bevelSegments: 3, curveSegments: 4 }); fg.translate(0, 0, -0.03);
  add(fg, cr, [0, 0, 0], body);
  add(new THREE.SphereGeometry(0.025, 8, 6), M(0x9a5a2e, { r: 0.4 }), [0.15, 0.21, 0.0], body, null, [1, 0.6, 1]);
  fitAll(body, 0.35);
