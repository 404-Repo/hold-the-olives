  // PROFILES: the whole face (casing, mullions, transom) as ONE extruded rounded rectangle with six rounded pane holes, fat bevel; a second thinner
  // extrusion set back as the inner lining; the sill a side profile (deep shelf, raised front lip, drip under the nose) extruded across; flat back
  const body = grp(g); g.userData.mounts = 'back';
  const wh = M(0xf7f4ee, { r: 0.4 }), whd = M(0xe9e4da, { r: 0.45 });
  const W = 9.1, H = 4.75, fw = 0.42, mw = 0.2, y0 = 0.22;
  const face = rrect(W - 0.1, H - 0.1, 0.12); const lin = rrect(W - 2 * fw + 0.1, H - 2 * fw + 0.1, 0.04);
  const pw = (W - 2 * fw - 2 * mw) / 3, ph = (H - 2 * fw - mw) / 2;
  for (let cx = 0; cx < 3; cx++) for (let cy = 0; cy < 2; cy++) { const px = -W / 2 + fw + pw / 2 + cx * (pw + mw), py = -H / 2 + fw + ph / 2 + cy * (ph + mw); const h = new THREE.Path(); const r = 0.06, x = px - pw / 2, y = py - ph / 2;
    h.moveTo(x + r, y); h.lineTo(x + pw - r, y); h.quadraticCurveTo(x + pw, y, x + pw, y + r); h.lineTo(x + pw, y + ph - r); h.quadraticCurveTo(x + pw, y + ph, x + pw - r, y + ph); h.lineTo(x + r, y + ph); h.quadraticCurveTo(x, y + ph, x, y + ph - r); h.lineTo(x, y + r); h.quadraticCurveTo(x, y, x + r, y);
    face.holes.push(h); }
  const fg = new THREE.ExtrudeGeometry(face, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 2, curveSegments: 3 });
  add(fg, wh, [0, y0 + H / 2, -0.12], body);
  const ring = rrect(W - 0.5, H - 0.5, 0.06); ring.holes.push(rrectPath(W - 2 * fw - 0.02, H - 2 * fw - 0.02, 0.04));
  add(new THREE.ExtrudeGeometry(ring, { depth: 0.12, bevelEnabled: false, curveSegments: 2 }), whd, [0, y0 + H / 2, -0.3], body);
  const sp = new THREE.Shape(); // x = forward (world z from the wall), y = up
  sp.moveTo(0, 0.05); sp.lineTo(0.45, 0.05); sp.lineTo(0.45, 0.0); sp.lineTo(0.6, 0.0); sp.lineTo(0.6, 0.3); sp.quadraticCurveTo(0.6, 0.33, 0.57, 0.33); sp.lineTo(0.53, 0.33); sp.lineTo(0.52, 0.26); sp.lineTo(0, 0.26); sp.closePath();
  const sg = new THREE.ExtrudeGeometry(sp, { depth: W + 0.4, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.02, bevelSegments: 2, curveSegments: 3 });
  sg.rotateY(-PI / 2); sg.translate((W + 0.4) / 2, 0, -0.3);
  add(sg, wh, [0, 0, 0], body);
  fitWHD(body, 9.5, 5.0, 0.6);
