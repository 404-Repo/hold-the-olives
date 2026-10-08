  // EXTRUDE: each rear leg+post is one piece extruded from a side profile (kick-back foot, rake above the seat), a crest rail with a heart cut-out, slats bowed by a deform, a saddle seat extruded from a plan outline with a rounded front, tapered square front legs
  const body = grp(g);
  const wd = timber(C.wood, 0.55), wd2 = timber(0xb8864f, 0.55);
  const rp = new THREE.Shape(); rp.moveTo(-2.55, 0); rp.lineTo(-2.15, 0); rp.lineTo(-1.95, 4.3); rp.lineTo(-2.3, 9.7); rp.quadraticCurveTo(-2.45, 9.95, -2.65, 9.75); rp.lineTo(-2.35, 4.3); rp.closePath();
  for (const s of [-1, 1]) add(sideSlab(rp, 0.44, 0.06, 0.05, 4), wd, [s * 1.85, 0, 0], body);
  for (const s of [-1, 1]) add(new THREE.CylinderGeometry(0.2, 0.15, 4.1, 4), wd, [s * 1.85, 2.05, 1.75], body, [0, PI / 4, 0], [1.2, 1, 1.2]);
  const sp = new THREE.Shape(); sp.moveTo(-2.2, -2.1); sp.lineTo(2.2, -2.1); sp.lineTo(2.25, 1.6); sp.quadraticCurveTo(2.2, 2.2, 1.6, 2.2); sp.lineTo(-1.6, 2.2); sp.quadraticCurveTo(-2.2, 2.2, -2.25, 1.6); sp.closePath();
  add(deform(slab(sp, 0.42, 0.1, 0.08, 8), (v) => { v.y -= 0.06 * Math.exp(-(v.x * v.x + v.z * v.z) / 2); }), wd, [0, 4.08, 0.0], body);
  for (const [a, b] of [[[-1.85, 1.2, 1.7], [-1.85, 1.2, -2.1]], [[1.85, 1.2, 1.7], [1.85, 1.2, -2.1]], [[-1.85, 0.9, 1.75], [1.85, 0.9, 1.75]]]) rod(a, b, 0.09, wd2, body, 6);
  const slat = deform(new THREE.BoxGeometry(0.34, 3.4, 0.14, 1, 6, 1), (v) => { v.z += 0.12 * Math.sin((v.y / 3.4 + 0.5) * PI); });
  for (let i = 0; i < 5; i++) { const x = -1.24 + i * 0.62; add(slat, wd, [x, 6.35, -2.27 - 0.06 * 0.0], body, [-0.065, 0, 0]); }
  const cs = new THREE.Shape(); cs.moveTo(-2.45, 0); cs.lineTo(2.45, 0); cs.lineTo(2.5, 0.95); cs.quadraticCurveTo(1.2, 1.35, 0, 1.45); cs.quadraticCurveTo(-1.2, 1.35, -2.5, 0.95); cs.closePath();
  const ht = new THREE.Path(); ht.moveTo(0, 0.35); ht.bezierCurveTo(-0.45, 0.65, -0.3, 1.05, 0, 0.88); ht.bezierCurveTo(0.3, 1.05, 0.45, 0.65, 0, 0.35); cs.holes.push(ht);
  const cg = new THREE.ExtrudeGeometry(cs, { depth: 0.22, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 2, curveSegments: 8 }); cg.translate(0, 0, -0.11);
  add(cg, wd, [0, 8.1, -2.42], body, [-0.065, 0, 0]);
  add(rbox(4.0, 0.3, 0.2, 0.08), wd2, [0, 4.6, -2.15], body);
  fitAll(body, 10.0);
