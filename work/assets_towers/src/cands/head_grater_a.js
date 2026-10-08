  // PRIMITIVES: a 4-sided open frustum, each face studded with rows of raised steel lips over dark slots, a black loop handle, a turntable
  const body = grp(g);
  const steel = M(C.steel, { r: 0.28, m: 0.85, name: 'metal', ds: true }), dark = M(0x2a2d30, { r: 0.6 }), blk = M(0x1d1d1f, { r: 0.45 }), base = metal(0x9aa1a7, 0.35);
  add(new THREE.CylinderGeometry(0.42, 0.44, 0.06, 28), base, [0, 0.03, 0], body);
  add(new THREE.CylinderGeometry(0.34, 0.36, 0.04, 28), blk, [0, 0.08, 0], body);
  const H = 0.62, rb = 0.36, rt = 0.27, y0 = 0.1;
  add(new THREE.CylinderGeometry(rt, rb, H, 4, 1, true), steel, [0, y0 + H / 2, 0], body, [0, PI / 4, 0]);
  add(new THREE.CylinderGeometry(rt * 0.98, rt * 0.98, 0.012, 4), dark, [0, y0 + H - 0.03, 0], body, [0, PI / 4, 0]);
  add(new THREE.TorusGeometry(rb * 0.99, 0.015, 4, 4), steel, [0, y0 + 0.01, 0], body, [PI / 2, 0, PI / 4]);
  add(new THREE.TorusGeometry(rt * 0.99, 0.018, 4, 4), steel, [0, y0 + H, 0], body, [PI / 2, 0, PI / 4]);
  const ab = rb * Math.SQRT1_2, at = rt * Math.SQRT1_2, tilt = Math.atan2(ab - at, H);
  const rows = [[6, 4, 0.05, 0.025], [5, 3, 0.07, 0.03], [8, 5, 0.035, 0.018], [3, 1, 0.24, 0.035]];
  for (let f = 0; f < 4; f++) {
    const face = grp(body, [0, 0, 0], null, [0, f * PI / 2, 0]);
    const [nr, nc, w, h] = rows[f];
    for (let i = 0; i < nr; i++) {
      const t = (i + 0.7) / (nr + 0.4), y = y0 + 0.06 + t * (H - 0.14), a = ab + (at - ab) * ((y - y0) / H), half = a * 0.75;
      for (let j = 0; j < nc; j++) {
        const x = nc === 1 ? 0 : -half + 2 * half * (j + 0.5) / nc + (i % 2 ? 0.02 : -0.02);
        const o = grp(face, [x, y, a + 0.004], null, [tilt, 0, 0]);
        add(new THREE.BoxGeometry(w, h, 0.012), dark, [0, 0, 0], o);
        add(new THREE.BoxGeometry(w, h * 0.45, 0.03), steel, [0, -h * 0.55, 0.012], o, [0.6, 0, 0]);
      }
    }
  }
  tube([[-0.16, y0 + H, 0], [-0.17, y0 + H + 0.13, 0], [0, y0 + H + 0.19, 0], [0.17, y0 + H + 0.13, 0], [0.16, y0 + H, 0]], 0.035, blk, body, 20, 8);
  fitAll(body, 0.9);
