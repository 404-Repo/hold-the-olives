  // EXTRUDE: a wave band drawn in side profile and swept across the strip's width; fat stripes are thinner sweeps of the same band, slightly proud
  const body = grp(g);
  const lean = M(C.bacon, { r: 0.28 }), fat = M(C.fat, { r: 0.32 });
  const band = (t, ph, k) => {
    const sh = new THREE.Shape(), n = 28, xs = [];
    for (let i = 0; i <= n; i++) xs.push(-0.55 + 1.1 * i / n);
    const y = (x) => 0.024 * Math.sin(k * x + ph);
    sh.moveTo(xs[0], y(xs[0]) - t / 2); xs.forEach((x) => sh.lineTo(x, y(x) - t / 2));
    for (let i = n; i >= 0; i--) sh.lineTo(xs[i], y(xs[i]) + t / 2);
    return sh;
  };
  const sweep = (sh, w) => { const geo = new THREE.ExtrudeGeometry(sh, { depth: w, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.004, bevelSegments: 1, curveSegments: 4 }); geo.translate(0, 0, -w / 2); return geo; };
  const strip = (z, w, ph, yaw) => {
    const o = grp(body, [0, 0, z], null, [0, yaw, 0]), k = 13;
    add(sweep(band(0.026, ph, k), w), lean, [0, 0, 0], o);
    for (const [s, ww] of [[-0.3, 0.045], [0.05, 0.03], [0.32, 0.04]]) add(sweep(band(0.032, ph, k), ww), fat, [0, 0, s * w], o);
  };
  strip(-0.33, 0.25, 0, 0.05); strip(0, 0.26, 2.1, -0.04); strip(0.33, 0.25, 4.3, 0.03);
  fitH(body, 0.09);
