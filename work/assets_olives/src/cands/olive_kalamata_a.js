  // kalamata, method 'prim': slim almond, purple-black, sly half-lidded eyes, hands clasped behind its back (scheming)
  const o = olive({ H: 0.30, col: 0x5a2a4e, expr: 'sly', legH: 0.028, wr: 0.64, pointy: 0.72, egg: 0.02, eyeR: 0.038, eyeTh: 0.5, browR: 0.24, arms: false }, 'prim');
  for (const sd of [-1, 1]) {
    const s = o.S(o.y0 + o.Hb * 0.42, sd * 2.2), tip = o.S(o.y0 + o.Hb * 0.36, PI + sd * 0.25);
    const a = s.p.clone().addScaledVector(s.n, o.W * 0.03), b = tip.p.clone().addScaledVector(tip.n, o.W * 0.07);
    const mid = a.clone().lerp(b, 0.5).addScaledVector(V(Math.sin(sd * 2.6), 0, Math.cos(2.6)), o.W * 0.09);
    add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([a, mid, b]), 8, o.W * 0.055, 6, false), o.body);
    add(new THREE.SphereGeometry(o.W * 0.075, 8, 6), o.body, [b.x, b.y, b.z]);
  }
