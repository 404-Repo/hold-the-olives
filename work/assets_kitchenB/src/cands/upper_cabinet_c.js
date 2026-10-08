  // DIFFERENT READING: a face-framed cabinet: a visible cream face frame (stiles, top and bottom rails) with two INSET shaker doors sitting in it,
  // a deeper recessed panel per door, copper bar handles horizontal on the bottom rails, a slim crown with a dentil-free bead, a light rail at the bottom
  const body = grp(g); g.userData.mounts = 'back';
  const cr = enamel(C.cream, 0.3), crd = M(0xe4d9c2, { r: 0.35 }), sh = M(0xcfc3aa, { r: 0.5 }), cu = M(C.copper, { r: 0.3, m: 0.5, name: 'metal' });
  const W = 4.0, H = 7.0, D = 3.2;
  add(rbox(W - 0.12, 6.45, D - 0.2, 0.04), cr, [0, 0.15, -0.1], body);
  const fz = D / 2 - 0.15;
  add(rpanel(0.22, 6.45, 0.14, 0.03), cr, [-(W - 0.12) / 2 + 0.11, 0.15 + 3.225, fz], body);
  add(rpanel(0.22, 6.45, 0.14, 0.03), cr, [(W - 0.12) / 2 - 0.11, 0.15 + 3.225, fz], body);
  add(rpanel(0.14, 6.45, 0.14, 0.03), cr, [0, 0.15 + 3.225, fz], body);
  add(rpanel(W - 0.12, 0.26, 0.14, 0.03), cr, [0, 0.15 + 0.13, fz], body);
  add(rpanel(W - 0.12, 0.26, 0.14, 0.03), cr, [0, 6.6 - 0.13, fz], body);
  const dw = (W - 0.12 - 0.44 - 0.14) / 2 - 0.04, dh = 6.45 - 0.52 - 0.08, yc = 0.15 + 3.225;
  for (const s of [-1, 1]) {
    const dx = s * (0.07 + 0.02 + dw / 2);
    add(new THREE.BoxGeometry(dw + 0.04, dh + 0.04, 0.02), sh, [dx, yc, fz - 0.05], body);
    const fr = rrect(dw, dh, 0.03); fr.holes.push(rrectPath(dw - 0.62, dh - 0.72, 0.03));
    add(new THREE.ExtrudeGeometry(fr, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2, curveSegments: 3 }), cr, [dx, yc, fz - 0.06], body);
    add(rpanel(dw - 0.6, dh - 0.7, 0.04, 0.012), crd, [dx, yc, fz - 0.04], body);
    rod([dx - 0.35, 0.8, fz + 0.06], [dx - 0.35, 0.8, fz + 0.2], 0.035, cu, body, 8); rod([dx + 0.35, 0.8, fz + 0.06], [dx + 0.35, 0.8, fz + 0.2], 0.035, cu, body, 8);
    rod([dx - 0.47, 0.8, fz + 0.2], [dx + 0.47, 0.8, fz + 0.2], 0.05, cu, body, 10);
  }
  add(rbox(W - 0.04, 0.12, D - 0.08, 0.035), crd, [0, 6.6, -0.04], body);
  add(rbox(W, 0.28, D, 0.08), cr, [0, 6.72, 0], body);
  add(rbox(W - 0.1, 0.15, D - 0.15, 0.04), crd, [0, 0, -0.075], body);
  fitWHD(body, 4.0, 7.0, 3.2);
