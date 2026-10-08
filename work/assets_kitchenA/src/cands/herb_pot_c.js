  // c: different reading: basil as it grows: five upright stems each carrying stacked opposite leaf pairs, biggest at
  // the bottom, a crown pair on top; a plain tapered pot with a rim.
  const terra = M(C.terracotta, 0.75), soil = M(0x3b2a1e, 0.95), stem = M(0x5c8a3a, 0.6, 0, 'foliage');
  const leafA = M(C.basil, 0.35, 0, 'foliage'), leafB = M(0x55a444, 0.35, 0, 'foliage');
  add(cyl(0.56, 0.42, 0.68, 16), terra, 0, 0.34, 0);
  add(cyl(0.64, 0.62, 0.2, 16), terra, 0, 0.76, 0);
  add(cyl(0.56, 0.56, 0.04, 16), soil, 0, 0.85, 0);
  const stems = [[0, 0, 0.95], [0.28, 0.12, 0.8], [-0.25, 0.2, 0.75], [0.1, -0.3, 0.78], [-0.2, -0.22, 0.7]];
  stems.forEach(([x, z, h], si) => {
    const s = grp(x, 0.86, z, z * 0.5, si, -x * 0.5);
    add(cyl(0.035, 0.045, h, 5), stem, 0, h / 2, 0, 0, 0, 0, s);
    for (let j = 0; j < 4; j++) {
      const y = 0.18 + j * h / 4.2, sz = 0.3 - j * 0.045, rot = j * Math.PI / 2;
      for (const side of [-1, 1]) {
        const l = add(sph(sz, 8, 6), (j + si) % 2 ? leafA : leafB, 0, y, 0, 0, rot, 0, s);
        l.geometry = l.geometry; l.scale.set(1.0, 0.25, 0.62);
        l.position.set(Math.cos(rot) * sz * 0.9 * side, y + 0.04, -Math.sin(rot) * sz * 0.9 * side);
        l.rotation.set(0, rot, side * 0.35);
      }
    }
    add(sph(0.12, 8, 6), leafB, 0, h + 0.05, 0, 0, 0, 0, s).scale.set(0.8, 1.3, 0.5);
  });
  finish(HEIGHT);
