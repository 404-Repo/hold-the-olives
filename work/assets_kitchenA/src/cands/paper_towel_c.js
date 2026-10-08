  // c: different reading: a half-used roll; the free end has been pulled out across the counter as a long ribbon in
  // front of the stand; the stand has a square walnut-edged base with a curved arm and a knob.
  const wood = M(C.block, 0.55, 0, 'timber'), paper = M(0xfbfaf4, 0.85, 0, 'fabric'), paperD = M(0xfbfaf4, 0.85, 0, 'fabric', { side: DS }), core = M(0xb8956a, 0.8);
  add(rbox(1.5, 0.16, 1.5, 0.12), wood, 0, 0.08, 0);
  add(cyl(0.08, 0.08, 2.5, 10), wood, 0, 1.4, 0);
  add(sph(0.16, 10, 8), wood, 0, 2.66, 0);
  add(cyl(0.5, 0.5, 2.25, 20), paper, 0, 1.3, 0);
  add(cyl(0.2, 0.2, 2.27, 14), core, 0, 1.3, 0);
  // ribbon: from the roll's front face down onto the counter and forward
  const geo = new THREE.PlaneGeometry(2.0, 1, 1, 10), p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) { const t = p.getY(i) + 0.5; // 0 at the roll, 1 at the free end
    const y = t < 0.4 ? 1.2 * (1 - t / 0.4) + 0.18 * (t / 0.4) : 0.18 - 0.16 * Math.min(1, (t - 0.4) / 0.15);
    const z = 0.52 + t * 1.6 + (t < 0.4 ? 0 : 0); p.setXYZ(i, p.getX(i) * 0.95, Math.max(0.02, y), z); }
  geo.computeVertexNormals(); add(geo, paperD, 0, 0, 0);
  finish(HEIGHT);
