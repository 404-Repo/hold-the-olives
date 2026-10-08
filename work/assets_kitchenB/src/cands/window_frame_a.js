  // PRIMITIVES: rounded-box outer casing (head, jambs), a deeper inner jamb lining, two mullions and one transom (3 x 2 panes), a sash bead around each
  // opening, a deep sill box with horns past the casing and a raised lip at its front edge; NO glass; flat back
  const body = grp(g); g.userData.mounts = 'back';
  const wh = M(0xf7f4ee, { r: 0.4 }), whd = M(0xe9e4da, { r: 0.45 });
  const W = 9.1, H = 4.75, fw = 0.42, d = 0.38, z0 = -0.3, sillH = 0.25;
  const fz = z0 + d / 2, y0 = sillH;
  add(rpanel(W, fw, d, 0.06), wh, [0, y0 + H - fw / 2, fz], body);
  add(rpanel(fw, H, d, 0.06), wh, [-W / 2 + fw / 2, y0 + H / 2, fz], body);
  add(rpanel(fw, H, d, 0.06), wh, [W / 2 - fw / 2, y0 + H / 2, fz], body);
  add(rpanel(W, 0.2, d, 0.05), wh, [0, y0 + 0.1, fz], body);
  const iw = W - 2 * fw, ih = H - fw - 0.2, ix0 = -iw / 2, iy0 = y0 + 0.2;
  for (const i of [1, 2]) add(rpanel(0.18, ih, d - 0.08, 0.04), wh, [ix0 + iw * i / 3, iy0 + ih / 2, fz - 0.04], body);
  add(rpanel(iw, 0.18, d - 0.08, 0.04), wh, [0, iy0 + ih / 2, fz - 0.04], body);
  // sash beads: a thin step inside every opening
  for (let cx = 0; cx < 3; cx++) for (let cy = 0; cy < 2; cy++) {
    const pw = iw / 3 - 0.18, ph = ih / 2 - 0.09 - 0.0, px = ix0 + iw * (cx + 0.5) / 3, py = iy0 + (cy ? ih * 0.75 + 0.045 : ih * 0.25 - 0.045);
    const fr = rrect(pw, ph, 0.02); fr.holes.push(rrectPath(pw - 0.16, ph - 0.16, 0.02));
    add(new THREE.ExtrudeGeometry(fr, { depth: 0.06, bevelEnabled: false, curveSegments: 1 }), whd, [px, py, z0 + 0.12], body);
  }
  add(rbox(W + 0.4, sillH, 0.6, 0.06), wh, [0, 0, 0], body);
  add(rbox(W + 0.36, 0.09, 0.08, 0.03), wh, [0, sillH - 0.01, 0.25], body);
  fitWHD(body, 9.5, 5.0, 0.6);
