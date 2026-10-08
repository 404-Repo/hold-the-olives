  // PROFILES: each door one extruded frame (outer rounded rectangle with a rounded hole, fat bevel) over a recessed flat panel; the crown a cove
  // side profile extruded across the front and returned down both sides; copper bar handles as rods; flat back
  const body = grp(g); g.userData.mounts = 'back';
  const cr = enamel(C.cream, 0.3), crd = M(0xe6dcc6, { r: 0.35 }), cu = M(C.copper, { r: 0.3, m: 0.5, name: 'metal' });
  const W = 4.0, H = 7.0, D = 3.2, ch = 0.45;
  add(rbox(W - 0.12, H - ch, D - 0.3, 0.05), cr, [0, 0, -0.15], body);
  const dw = (W - 0.2) / 2, dh = H - ch - 0.2;
  for (const s of [-1, 1]) {
    const dx = s * (dw / 2 + 0.04), dz = D / 2 - 0.3 + 0.07, yc = 0.1 + dh / 2;
    const fr = rrect(dw - 0.08, dh - 0.08, 0.05); fr.holes.push(rrectPath(dw - 0.7, dh - 0.82, 0.04));
    const fg = new THREE.ExtrudeGeometry(fr, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.035, bevelSegments: 2, curveSegments: 3 });
    add(fg, cr, [dx, yc, dz], body);
    add(rpanel(dw - 0.6, dh - 0.7, 0.05, 0.015), crd, [dx, yc, dz + 0.01], body);
    const hx = dx - s * (dw / 2 - 0.2);
    rod([hx, 0.7, dz + 0.1], [hx, 0.7, dz + 0.26], 0.04, cu, body, 8); rod([hx, 1.7, dz + 0.1], [hx, 1.7, dz + 0.26], 0.04, cu, body, 8);
    rod([hx, 0.56, dz + 0.26], [hx, 1.84, dz + 0.26], 0.055, cu, body, 10);
  }
  const cp = new THREE.Shape(); // x = forward overhang, y = up
  cp.moveTo(0, 0); cp.lineTo(0.06, 0); cp.quadraticCurveTo(0.08, 0.2, 0.22, 0.26); cp.lineTo(0.24, 0.32); cp.lineTo(0.26, 0.34); cp.lineTo(0.26, ch); cp.lineTo(0, ch); cp.closePath();
  const front = new THREE.ExtrudeGeometry(cp, { depth: W - 0.12, bevelEnabled: false, curveSegments: 5 }); front.rotateY(-PI / 2); front.translate((W - 0.12) / 2, 0, 0);
  add(front, cr, [0, H - ch, D / 2 - 0.3 - 0.0], body);
  for (const s of [-1, 1]) {
    const side = new THREE.ExtrudeGeometry(cp, { depth: D - 0.3, bevelEnabled: false, curveSegments: 5 });
    if (s > 0) { side.translate(0, 0, 0); add(side, cr, [(W - 0.12) / 2, H - ch, -D / 2], body); } else { side.rotateY(PI); add(side, cr, [-(W - 0.12) / 2, H - ch, D / 2 - 0.3], body); }
  }
  add(rbox(W - 0.12, ch, D - 0.3, 0.02), cr, [0, H - ch, -0.15], body);
  fitWHD(body, 4.0, 7.0, 3.2);
