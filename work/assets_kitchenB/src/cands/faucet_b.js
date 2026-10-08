  // PROFILES: one smooth gooseneck as a TubeGeometry along a Catmull-Rom path (rise, arch, drop), a turned lathe escutcheon and aerator,
  // a lathe lever hub on the side with an extruded tapered lever blade
  const body = grp(g);
  const st = metal(C.steel, 0.25), dk = M(0x2a2a2a, { r: 0.6 });
  add(lathe([[0, 0], [0.6, 0], [0.62, 0.05], [0.55, 0.14], [0.36, 0.2], [0.3, 0.45], [0.24, 0.55], [0, 0.55]], 24), st, [0, 0, 0], body);
  const path = [[0, 0.5, 0], [0, 2.5, 0], [0, 4.3, 0.05], [0, 5.5, 0.35], [0, 5.8, 1.2], [0, 5.5, 2.1], [0, 4.9, 2.45], [0, 4.4, 2.5]];
  tube(path, 0.2, st, body, 40, 12);
  add(lathe([[0, 4.45], [0.2, 4.45], [0.24, 4.4], [0.24, 4.18], [0.2, 4.15], [0, 4.15]], 16), st, [0, 0, 2.5], body);
  add(new THREE.CylinderGeometry(0.15, 0.15, 0.02, 14), dk, [0, 4.14, 2.5], body);
  add(lathe([[0, 0], [0.24, 0], [0.26, 0.1], [0.24, 0.42], [0, 0.44]], 16), st, [0.12, 1.4, 0], body, [0, 0, -PI / 2]);
  const lv = new THREE.Shape(); lv.moveTo(-0.07, 0); lv.lineTo(0.07, 0); lv.lineTo(0.045, 0.9); lv.quadraticCurveTo(0, 0.98, -0.045, 0.9); lv.closePath();
  const lg = new THREE.ExtrudeGeometry(lv, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.02, bevelSegments: 2 }); lg.translate(0, 0, -0.03);
  add(lg, st, [0.48, 1.4, 0], body, [0, PI / 2, -0.35]);
  fitAll(body, 6.0);
