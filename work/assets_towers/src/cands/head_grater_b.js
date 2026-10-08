  // EXTRUDE: each side an extruded trapezoid panel with real holes (you see the dark inside through them), a solid black handle bar, a lathe turntable
  const body = grp(g);
  const steel = M(C.steel, { r: 0.28, m: 0.85, name: 'metal', ds: true }), inner = M(0x34383c, { r: 0.7, ds: true }), blk = M(0x1d1d1f, { r: 0.45 }), base = metal(0x9aa1a7, 0.35);
  add(lathe([[0, 0], [0.42, 0], [0.44, 0.03], [0.42, 0.06], [0.36, 0.07], [0.35, 0.1], [0, 0.1]], 28), base, [0, 0, 0], body);
  const H = 0.62, wb = 0.52, wt = 0.38, y0 = 0.1, tilt = Math.atan2((wb - wt) / 2, H), Hs = H / Math.cos(tilt);
  const panel = (kind) => {
    const sh = new THREE.Shape(); sh.moveTo(-wb / 2, 0); sh.lineTo(wb / 2, 0); sh.lineTo(wt / 2, Hs); sh.lineTo(-wt / 2, Hs); sh.closePath();
    const rows = kind === 0 ? 7 : kind === 1 ? 5 : kind === 2 ? 9 : 2;
    for (let i = 0; i < rows; i++) {
      const v = 0.07 + (i + 0.5) / rows * (Hs - 0.14), half = (wb + (wt - wb) * v / Hs) / 2 - 0.05, n = kind === 3 ? 1 : Math.max(2, Math.round(half * 2 / (kind === 2 ? 0.06 : 0.09)));
      for (let j = 0; j < n; j++) {
        const x = n === 1 ? 0 : -half + 2 * half * (j + 0.5) / n + (i % 2 ? 0.012 : -0.012), p = new THREE.Path();
        if (kind === 3) { const w = half * 1.3, h = 0.03; p.moveTo(x - w, v - h); p.lineTo(x + w, v - h); p.lineTo(x + w, v + h); p.lineTo(x - w, v + h); p.closePath(); }
        else { const r = kind === 1 ? 0.024 : kind === 2 ? 0.012 : 0.017; p.absellipse(x, v, r, r * 1.5, 0, TAU, false); }
        sh.holes.push(p);
      }
    }
    const geo = new THREE.ExtrudeGeometry(sh, { depth: 0.012, bevelEnabled: false, curveSegments: 3 }); return geo;
  };
  const a = wb / 2;
  for (let f = 0; f < 4; f++) {
    const o = grp(body, [0, 0, 0], null, [0, f * PI / 2, 0]);
    add(panel(f), steel, [0, y0, a], o, [-tilt, 0, 0]);
  }
  add(new THREE.BoxGeometry(wb * 0.92, H * 0.96, wb * 0.92), inner, [0, y0 + H / 2, 0], body, null, [0.86, 1, 0.86]);
  // handle: a solid D loop rising from the top rim
  tube([[-0.17, y0 + H - 0.02, 0], [-0.2, y0 + H + 0.12, 0], [-0.08, y0 + H + 0.2, 0], [0.08, y0 + H + 0.2, 0], [0.2, y0 + H + 0.12, 0], [0.17, y0 + H - 0.02, 0]], 0.04, blk, body, 24, 8);
  add(new THREE.BoxGeometry(wt + 0.03, 0.03, wt + 0.03), steel, [0, y0 + H, 0], body);
  fitAll(body, 0.9);
