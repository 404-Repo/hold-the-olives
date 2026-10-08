  // PROFILES: one mitten outline (palm, thumb, cuff) extruded with a fat bevel so it puffs; diamond quilting = shallow grooves pushed into the top by deform; cream cuff band extruded from a strip
  const body = grp(g);
  const red = M(C.red, { r: 0.85, name: 'fabric' }), cuff = M(0xe9e2d0, { r: 0.85, name: 'fabric' });
  const s = new THREE.Shape(); // shape y = world -z: fingers at shape y < 0 (world +z)
  s.moveTo(-0.58, 0.95); s.lineTo(-0.6, 0.0); s.bezierCurveTo(-0.95, -0.05, -1.05, -0.55, -0.85, -0.7); s.bezierCurveTo(-0.7, -0.8, -0.6, -0.55, -0.55, -0.4);
  s.bezierCurveTo(-0.6, -1.2, -0.3, -1.45, 0.02, -1.45); s.bezierCurveTo(0.4, -1.45, 0.62, -1.15, 0.62, -0.6); s.lineTo(0.6, 0.95); s.closePath();
  const geo = slab(s, 0.26, 0.11, 0.06, 10, 3);
  deform(geo, (v) => { if (v.y > 0.16) { const u = (v.x + v.z) / 0.32, w = (v.x - v.z) / 0.32; const d = Math.min(Math.abs(u - Math.round(u)), Math.abs(w - Math.round(w))); if (d < 0.12) v.y -= 0.035 * (1 - d / 0.12); } });
  add(geo, red, [0, 0, 0], body);
  add(rbox(1.36, 0.3, 0.42, 0.13), cuff, [0, 0, -1.08], body);
  add(new THREE.TorusGeometry(0.13, 0.04, 6, 12), cuff, [0.5, 0.27, -1.3], body, [PI / 2, 0, 0]);
  fitAll(body, 0.3);
