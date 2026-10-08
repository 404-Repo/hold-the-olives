  // PRIMITIVES: each strip a zigzag chain of tilted boxes, cream fat bars on top of each link
  const body = grp(g);
  const lean = M(C.bacon, { r: 0.3 }), fat = M(C.fat, { r: 0.35 });
  const strip = (z, w, ph, yaw) => {
    const o = grp(body, [0, 0, z], null, [0, yaw, 0]), n = 8, L = 1.12 / n;
    for (let i = 0; i < n; i++) {
      const x = -0.56 + L * (i + 0.5), y = 0.03 + 0.022 * Math.sin(i * 1.6 + ph), t = 0.022 * 1.6 * Math.cos(i * 1.6 + ph) / L * 0.6;
      const l = grp(o, [x, y, 0], null, [0, 0, Math.atan(t)]);
      add(new THREE.BoxGeometry(L * 1.08, 0.028, w), lean, [0, 0, 0], l);
      for (const s of [-0.28, 0.22]) add(new THREE.BoxGeometry(L * 1.1, 0.032, w * 0.16), fat, [0, 0.001, s * w], l);
    }
  };
  strip(-0.32, 0.27, 0, 0.05); strip(0, 0.28, 2, -0.04); strip(0.32, 0.26, 4, 0.03);
  fitH(body, 0.09);
