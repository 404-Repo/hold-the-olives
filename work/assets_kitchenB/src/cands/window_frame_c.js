  // DIFFERENT READING: a 2 x 2 casement: a flat wide casing, and inside it four separate opening SASHES (each its own bevelled frame with a hole),
  // split by a chunky centre post and a thick meeting rail; little turn-catches on the centre post; a deep sill with a lip and corbels under it
  const body = grp(g); g.userData.mounts = 'back';
  const wh = M(0xf7f4ee, { r: 0.4 }), whd = M(0xe9e4da, { r: 0.45 }), cu = M(C.copper, { r: 0.3, m: 0.5, name: 'metal' });
  const W = 9.1, H = 4.6, cw = 0.5, y0 = 0.4;
  const cas = rrect(W, H, 0.08); cas.holes.push(rrectPath(W - 2 * cw, H - 2 * cw, 0.02));
  add(new THREE.ExtrudeGeometry(cas, { depth: 0.18, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 2, curveSegments: 2 }), wh, [0, y0 + H / 2, -0.26], body);
  const iw = W - 2 * cw, ih = H - 2 * cw;
  add(rpanel(0.3, ih, 0.3, 0.05), wh, [0, y0 + H / 2, -0.17], body);
  add(rpanel(iw, 0.3, 0.3, 0.05), wh, [0, y0 + H / 2, -0.17], body);
  const sw = (iw - 0.3) / 2, shh = (ih - 0.3) / 2;
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) {
    const fr = rrect(sw - 0.04, shh - 0.04, 0.04); fr.holes.push(rrectPath(sw - 0.4, shh - 0.4, 0.03));
    add(new THREE.ExtrudeGeometry(fr, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.02, bevelSegments: 2, curveSegments: 2 }), wh, [sx * (0.15 + sw / 2), y0 + H / 2 + sy * (0.15 + shh / 2), -0.2], body);
  }
  for (const sy of [-1, 1]) add(new THREE.SphereGeometry(0.06, 8, 6), cu, [0, y0 + H / 2 + sy * 0.5, 0.0], body);
  add(rbox(W + 0.4, 0.22, 0.6, 0.06), wh, [0, 0.18, 0], body);
  add(rbox(W + 0.36, 0.08, 0.08, 0.03), wh, [0, 0.39, 0.25], body);
  for (const x of [-3.6, 3.6]) add(rbox(0.3, 0.2, 0.36, 0.06), whd, [x, 0, -0.12], body);
  fitWHD(body, 9.5, 5.0, 0.6);
