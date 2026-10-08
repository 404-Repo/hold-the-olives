  // B: lathe. Swept body; the oil sheen is a second, slightly larger sweep of the crown; drips are swept teardrops.
  const o = olive({ H: 0.36, col: 0xa8a838, expr: 'smug', legH: 0.035 }, 'lathe');
  const oil = M(0xd9b23a, { t: 0.72, r: 0.06 }), W = o.W, cy = o.cy, top = o.y0 + o.Hb;
  const crown = []; for (let i = 0; i <= 6; i++) { const y = cy + o.Hb * 0.22 + (top - cy - o.Hb * 0.22) * i / 6; crown.push([o.r(y) * 1.05 + 0.002, y + 0.002]); }
  crown.push([W * 0.08, top + 0.004]);
  add(lathe(crown, 16), oil, [0, 0, 0], g, null, [1, 1, o.zk]);
  const drop = (len, rr) => lathe([[0, -len], [rr * 0.6, -len + rr * 0.25], [rr, -len + rr * 1.1], [rr * 0.55, -len + rr * 2.4], [rr * 0.35, 0], [0, 0.001]], 8);
  for (const [th, len] of [[0.9, 0.08], [-1.2, 0.11], [2.2, 0.07], [-2.5, 0.1], [PI, 0.06]]) {
    const s = o.S(cy + o.Hb * 0.25, th);
    add(drop(len, W * 0.045), oil, [s.p.x * 1.02, s.p.y, s.p.z * 1.02], g);
  }
  const pud = new THREE.Shape(); for (let i = 0; i <= 24; i++) { const a = i / 24 * TAU, rr = W * (0.58 + 0.08 * Math.sin(a * 3) + 0.05 * Math.cos(a * 5)); i ? pud.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : pud.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); }
  add(new THREE.ExtrudeGeometry(pud, { depth: 0.006, bevelEnabled: false, curveSegments: 4 }), oil, [W * 0.08, 0.0, W * 0.05], g, [-PI / 2, 0, 0]);
  for (const [x, z, r] of [[W * 0.85, W * 0.45, 0.016], [-W * 0.7, W * 0.5, 0.012]]) add(new THREE.SphereGeometry(r, 8, 5), oil, [x, r * 0.35, z], g, null, [1, 0.45, 1]);
