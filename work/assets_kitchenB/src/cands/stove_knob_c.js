  // DIFFERENT READING: a fluted cream dial (lathe with scalloped sides via deform) with a domed top and pointer ridge, sitting on a knurled steel skirt
  const body = grp(g);
  const cr = enamel(C.cream, 0.3), steel = metal(C.steel, 0.3);
  add(deform(lathe([[0, 0], [0.36, 0], [0.37, 0.03], [0.33, 0.05], [0, 0.05]], 40), (v) => { const r = Math.hypot(v.x, v.z); if (r > 0.34) { const k = 1 + 0.025 * Math.cos(Math.atan2(v.z, v.x) * 20); v.x *= k; v.z *= k; } }), steel, [0, 0, 0], body);
  add(deform(lathe([[0, 0.04], [0.25, 0.04], [0.26, 0.07], [0.25, 0.22], [0.2, 0.28], [0.1, 0.305], [0, 0.31]], 36), (v) => { const r = Math.hypot(v.x, v.z); if (r > 0.18 && v.y < 0.25) { const k = 1 + 0.06 * Math.cos(Math.atan2(v.z, v.x) * 12); v.x *= k; v.z *= k; } }), cr, [0, 0, 0], body);
  add(rbox(0.06, 0.06, 0.3, 0.025), cr, [0, 0.28, 0.0], body);
  add(new THREE.BoxGeometry(0.035, 0.012, 0.12), M(0x9a5a2e, { r: 0.4 }), [0, 0.345, 0.07], body);
  fitAll(body, 0.35);
