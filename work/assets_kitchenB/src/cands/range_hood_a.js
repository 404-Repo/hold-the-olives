  // PRIMITIVES: canopy = a subdivided box whose top is pulled in toward the back wall (a slanted pyramid, back face flush), cream rounded-box band below it,
  // tall cream chimney box, dark filter grilles underneath, a row of steel buttons on the band front, a light strip
  const body = grp(g); g.userData.mounts = 'back';
  const st = metal(C.steel, 0.3), cr = enamel(C.cream, 0.3), dk = M(0x3a3d40, { r: 0.6, m: 0.5, name: 'metal' }), lt = M(0xfff4d6, { r: 0.3, e: 0xfff1c8, ei: 0.6 });
  const W = 6.0, D = 4.6, cw = 2.4, cd = 2.0, bandH = 0.55, canH = 1.6;
  add(rbox(W, bandH, D, 0.12), cr, [0, 0, -D / 2], body);
  const can = deform(new THREE.BoxGeometry(W, canH, D, 2, 2, 2), (v) => { const t = (v.y + canH / 2) / canH; const s = 1 - t * (1 - (cw + 0.3) / W); v.x *= s; const zb = -D / 2; v.z = zb + (v.z - zb) * (1 - t * (1 - (cd + 0.3) / D)); });
  add(can, st, [0, bandH + canH / 2, -D / 2 + 0.0], body).position.z = 0;
  // the canopy geometry is centred on z = 0 with its back at -D/2, so shift the whole canopy back to the band
  body.children[body.children.length - 1].position.set(0, bandH + canH / 2, -D / 2);
  add(rbox(W + 0.06, 0.08, D + 0.06, 0.03), st, [0, bandH - 0.04, -D / 2], body);
  add(rbox(cw, 7.0 - bandH - canH, cd, 0.06), cr, [0, bandH + canH - 0.02, -D + cd / 2], body);
  add(rbox(cw + 0.1, 0.12, cd + 0.1, 0.04), st, [0, bandH + canH - 0.06, -D + cd / 2], body);
  for (const x of [-1.5, 1.5]) add(new THREE.BoxGeometry(2.3, 0.02, 3.2), dk, [x, -0.005, -D / 2], body);
  add(new THREE.BoxGeometry(0.9, 0.03, 0.3), lt, [0, -0.01, -0.5], body);
  for (let i = 0; i < 4; i++) add(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 12), st, [1.2 + i * 0.32, bandH / 2, 0.02], body, [PI / 2, 0, 0]);
  fitAll(body, 7.0);
