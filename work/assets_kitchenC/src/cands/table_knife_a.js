  // EXTRUDE: blade outline in plan (straight spine, gently curved edge, round tip) extruded thin and bevelled, a bolster, a chunky flattened handle as an extruded rounded outline; lying flat, long axis z, blade toward -z
  const body = grp(g);
  const st = metal(C.steel, 0.25);
  const b = new THREE.Shape(); b.moveTo(-0.09, 0); b.lineTo(0.09, 0); b.lineTo(0.12, -0.8); b.quadraticCurveTo(0.12, -1.18, -0.02, -1.22); b.quadraticCurveTo(-0.13, -1.0, -0.13, -0.7); b.closePath();
  add(deform(slab(b, 0.035, 0.01, 0.0, 8), (v) => { v.y += 0.0; }), st, [0, 0.0, 0], body, [0, PI, 0]);
  add(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 12), st, [0, 0.06, -0.05], body, [PI / 2, 0, 0], [1.2, 1, 0.75]);
  const h = new THREE.Shape(); h.moveTo(-0.08, 0); h.lineTo(0.08, 0); h.quadraticCurveTo(0.14, 0.5, 0.13, 0.85); h.quadraticCurveTo(0.12, 1.0, 0, 1.0); h.quadraticCurveTo(-0.12, 1.0, -0.13, 0.85); h.quadraticCurveTo(-0.14, 0.5, -0.08, 0);
  add(slab(h, 0.11, 0.04, 0.03, 8), st, [0, 0.0, -0.05], body, [0, PI, 0]);
  fitD(body, 2.3);
