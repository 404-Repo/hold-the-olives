  // EXTRUDE: the whole fork outline in plan (chunky handle, neck, palm, four rounded tines) extruded and bevelled, then bent so the handle end and the tines lift off the table (lying flat, long axis z, tines toward -z)
  const body = grp(g);
  const s = new THREE.Shape(), hw = 0.13;
  s.moveTo(-0.05, 0.9); s.lineTo(-0.1, 0.25); s.quadraticCurveTo(-hw, 0.0, 0, -0.02); s.quadraticCurveTo(hw, 0.0, 0.1, 0.25); s.lineTo(0.05, 0.9);
  s.quadraticCurveTo(0.16, 1.1, 0.16, 1.3);
  const tw = 0.06, gap = (0.32 - 4 * tw) / 3;
  for (let i = 3; i >= 0; i--) { const x0 = -0.16 + i * (tw + gap), x1 = x0 + tw;
    s.lineTo(x1, 1.95); s.quadraticCurveTo(x1, 2.0, (x0 + x1) / 2, 2.0); s.quadraticCurveTo(x0, 2.0, x0, 1.95);
    if (i > 0) { s.lineTo(x0, 1.45); s.quadraticCurveTo(x0 - gap / 2, 1.4, x0 - gap, 1.45); } }
  s.lineTo(-0.16, 1.3); s.quadraticCurveTo(-0.16, 1.1, -0.05, 0.9);
  const geo = deform(slab(s, 0.05, 0.012, 0.0, 6), (v) => { const t = -v.z; v.y += 0.06 * Math.max(0, (t - 1.2) / 0.8) ** 2 + 0.03 * Math.max(0, (0.5 - t) / 0.5) ** 2; });
  add(geo, metal(C.steel, 0.25), [0, 0, 0], body);
  add(new THREE.SphereGeometry(0.11, 12, 6), metal(C.steel, 0.25), [0, 0.035, -0.3], body, null, [1, 0.3, 2.4]);
  fitD(body, 2.0);
