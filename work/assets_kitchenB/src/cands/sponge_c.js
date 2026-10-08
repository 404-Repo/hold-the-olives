  // DIFFERENT READING: a soft, slightly squashed sponge: subdivided yellow box bulged by deform (pillowy top and sides), pores as darker sunken dots,
  // green pad as a thinner sheet hugging the top with rounded edges
  const body = grp(g);
  const yel = M(0xf5cd2a, { r: 0.85 }), yd = M(0xd3a414, { r: 0.95 }), grn = M(0x2f7a32, { r: 0.95, name: 'fabric' });
  const b = deform(new THREE.BoxGeometry(0.74, 0.3, 1.12, 6, 3, 8), (v) => { const ux = v.x / 0.37, uz = v.z / 0.56, uy = v.y / 0.15; const bul = (1 - ux * ux) * (1 - uz * uz); v.y += 0.03 * bul * Math.sign(v.y); const side = 1 - uy * uy; v.x *= 1 + 0.06 * side * (1 - uz * uz); v.z *= 1 + 0.04 * side * (1 - ux * ux); const r = 0.045; if (Math.abs(ux) > 0.95 && Math.abs(uz) > 0.95) { v.x *= 0.96; v.z *= 0.97; } });
  add(b, yel, [0, 0.15, 0], body);
  for (let i = 0; i < 22; i++) { const t = i * 2.39996, side = i % 4; const u = ((i * 0.618) % 1) - 0.5, y = 0.07 + ((i * 0.381) % 1) * 0.18;
    const pos = side === 0 ? [0.39, y, u * 1.0] : side === 1 ? [-0.39, y, u * 1.0] : side === 2 ? [u * 0.6, y, 0.58] : [u * 0.6, y, -0.58];
    add(new THREE.SphereGeometry(0.03, 5, 3), yd, pos, body, null, [1, 1.2, 1]); }
  add(rbox(0.78, 0.12, 1.16, 0.05), grn, [0, 0.32, 0], body);
  fitAll(body, 0.45);
