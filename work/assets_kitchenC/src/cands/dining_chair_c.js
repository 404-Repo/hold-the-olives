  // DIFFERENT READING: a farmhouse chair with a tied blue seat cushion (the thing you see from above), turned legs and posts (lathe) topped with acorn finials, a wide arched crest rail with a scalloped top, six slender slats
  const body = grp(g);
  const wd = timber(C.wood, 0.55), wd2 = timber(0xb8864f, 0.55);
  const legG = lathe([[0, 0], [0.2, 0], [0.23, 0.15], [0.17, 0.5], [0.22, 1.5], [0.17, 2.4], [0.26, 3.0], [0.2, 3.5], [0.24, 4.1], [0, 4.1]], 10);
  for (const s of [-1, 1]) add(legG, wd, [s * 1.85, 0, 1.75], body);
  const post = lathe([[0, 0], [0.22, 0], [0.24, 0.2], [0.19, 0.6], [0.22, 3.0], [0.2, 4.4], [0.24, 4.6], [0.19, 5.0], [0.2, 8.6], [0.27, 8.8], [0.3, 9.1], [0.22, 9.35], [0.08, 9.55], [0, 9.6]], 10);
  const B = grp(body, [0, 0, -1.95], null, [-0.05, 0, 0]);
  for (const s of [-1, 1]) add(post, wd, [s * 1.85, 0, 0], B);
  add(rbox(4.4, 0.36, 4.3, 0.1), wd, [0, 4.08, 0.05], body);
  const cu = deform(new THREE.BoxGeometry(4.0, 0.4, 3.9, 6, 2, 6), (v) => { const u = v.x / 2.0, t = v.z / 1.95; if (v.y > 0) v.y += 0.18 * (1 - u * u) * (1 - t * t); v.y -= 0.05 * u * u * t * t; });
  add(cu, M(0x3f6fae, { r: 0.85, name: 'fabric' }), [0, 4.64, 0.08], body);
  for (const s of [-1, 1]) { add(new THREE.TorusGeometry(0.12, 0.04, 6, 10), M(0xe9e2d0, { r: 0.85, name: 'fabric' }), [s * 1.85, 4.75, -1.85], body, [PI / 2, 0, 0]); rod([s * 1.85, 4.7, -1.8], [s * 1.9, 4.1, -1.6], 0.035, M(0xe9e2d0, { r: 0.85, name: 'fabric' }), body, 5); }
  for (let i = 0; i < 6; i++) add(rbox(0.26, 3.2, 0.14, 0.05), wd, [-1.3 + i * 0.52, 5.2, 0], B);
  add(rbox(3.8, 0.28, 0.2, 0.08), wd2, [0, 4.95, 0], B);
  const cs = new THREE.Shape(); cs.moveTo(-1.75, 0); cs.lineTo(1.75, 0); cs.lineTo(1.75, 0.8);
  for (let i = 0; i < 6; i++) { const x0 = 1.75 - i * 0.583, x1 = x0 - 0.583, top = 0.8 + 0.45 * Math.sin(PI * (1 - (x0 + x1) / 2 / 1.75) / 2 + 0.0) * (1 - Math.abs((x0 + x1) / 2) / 1.75 * 0.6); cs.quadraticCurveTo((x0 + x1) / 2, top + 0.25, x1, 0.8 + 0.45 * (1 - Math.abs(x1) / 1.75 * 0.6)); }
  cs.lineTo(-1.75, 0);
  const cg = new THREE.ExtrudeGeometry(cs, { depth: 0.24, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 2, curveSegments: 6 }); cg.translate(0, 0, -0.12);
  add(cg, wd, [0, 8.45, 0], B);
  for (const s of [-1, 1]) rod([s * 1.85, 1.3, 1.75], [s * 1.85, 1.3, -1.9], 0.1, wd2, body, 8);
  rod([-1.85, 1.0, 1.75], [1.85, 1.0, 1.75], 0.1, wd2, body, 8);
  fitAll(body, 10.0);
