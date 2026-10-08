  // DIFFERENT READING: a squat hammered saucepan (deformed lathe, dimples), a darker copper band at the base, a flat lid with a steel loop
  // handle across its top, and a round tube handle that rises in a curve
  const body = grp(g);
  const cu = M(C.copper, { r: 0.3, m: 0.5, name: 'metal' }), dk = M(0xa85f30, { r: 0.35, m: 0.5, name: 'metal' }), st = metal(C.steel, 0.3);
  add(deform(lathe([[0, 0], [0.86, 0], [0.92, 0.05], [0.94, 0.5], [0.95, 0.86], [0.99, 0.9], [0, 0.9]], 32), (v) => { const r = Math.hypot(v.x, v.z); if (r > 0.9 && v.y > 0.08 && v.y < 0.84) { const k = 1 + 0.012 * Math.sin(Math.atan2(v.z, v.x) * 16) * Math.sin(v.y * 30); v.x *= k; v.z *= k; } }), cu, [0, 0, 0], body);
  add(new THREE.CylinderGeometry(0.945, 0.93, 0.14, 32), dk, [0, 0.09, 0], body);
  add(lathe([[0, 0.9], [1.0, 0.9], [1.01, 0.93], [0.9, 0.98], [0.5, 1.03], [0, 1.04]], 32), cu, [0, 0, 0], body);
  tube([[-0.28, 1.02, 0], [-0.24, 1.22, 0], [0, 1.3, 0], [0.24, 1.22, 0], [0.28, 1.02, 0]], 0.055, st, body, 16, 8);
  tube([[0.9, 0.62, 0], [1.4, 0.78, 0], [2.2, 0.98, 0], [2.85, 1.08, 0]], 0.085, cu, body, 12, 8);
  add(new THREE.SphereGeometry(0.11, 10, 8), cu, [2.88, 1.08, 0], body, null, [1.3, 1, 1]);
  fitAll(body, 1.4);
