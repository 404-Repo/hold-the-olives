  // PROFILE: a frill skirt: an open lathe flaring up and out, its rim crinkled into a fringe by vertex waves; pointed pick through it
  const body = grp(g);
  const pick = M(C.pick, { r: 0.55 }), fr = M(C.frill, { r: 0.1, ds: true });
  add(new THREE.CylinderGeometry(0.022, 0.022, 0.72, 8), pick, [0, 0.41, 0], body);
  add(new THREE.ConeGeometry(0.022, 0.06, 8), pick, [0, 0.02, 0], body, [PI, 0, 0]);
  const skirt = deform(new THREE.CylinderGeometry(0.15, 0.03, 0.18, 32, 4, true), (v) => {
    const t = (v.y + 0.09) / 0.18, th = Math.atan2(v.z, v.x), k = 1 + t * 0.35 * Math.sin(th * 16);
    v.x *= k; v.z *= k; v.y += t * t * 0.04 * Math.cos(th * 16);
  });
  add(skirt, fr, [0, 0.8, 0], body);
  const skirt2 = deform(new THREE.CylinderGeometry(0.1, 0.03, 0.14, 24, 3, true), (v) => { const t = (v.y + 0.07) / 0.14, th = Math.atan2(v.z, v.x), k = 1 + t * 0.4 * Math.sin(th * 12 + 1); v.x *= k; v.z *= k; });
  add(skirt2, fr, [0, 0.79, 0], body);
  add(new THREE.CylinderGeometry(0.035, 0.035, 0.06, 10), fr, [0, 0.71, 0], body);
  fitAll(body, 0.9);
