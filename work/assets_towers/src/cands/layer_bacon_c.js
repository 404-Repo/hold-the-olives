  // DIFFERENT READING: crisp-fried strips, a subdivided slab rippled lengthwise AND crinkled at the edges, darker crisp rims, fat ribbons
  const body = grp(g);
  const lean = M(0xa83a26, { r: 0.3 }), crisp = M(0x7e2a1a, { r: 0.35 }), fat = M(C.fat, { r: 0.3 });
  const rip = (ph) => (v) => { v.y += 0.024 * Math.sin(12 * v.x + ph) + 0.01 * Math.sin(30 * v.x + ph * 2) * (Math.abs(v.z) / 0.14); };
  const strip = (z, ph, yaw) => {
    const o = grp(body, [0, 0.04, z], null, [0, yaw, 0]);
    add(deform(new THREE.BoxGeometry(1.12, 0.026, 0.27, 24, 1, 2), rip(ph)), lean, [0, 0, 0], o);
    for (const s of [-1, 1]) add(deform(new THREE.BoxGeometry(1.1, 0.03, 0.03, 24, 1, 1).translate(0, 0, s * 0.125), rip(ph)), crisp, [0, 0, 0], o);
    for (const zz of [-0.06, 0.055]) add(deform(new THREE.BoxGeometry(1.08, 0.031, 0.04, 24, 1, 1).translate(0, 0, zz), rip(ph)), fat, [0, 0.001, 0], o);
  };
  strip(-0.32, 0, 0.06); strip(0, 1.9, -0.05); strip(0.32, 3.7, 0.03);
  fitH(body, 0.09);
