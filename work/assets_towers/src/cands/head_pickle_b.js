  // PROFILES: a lathe pickle with sin-noise warts and a slight banana bend, crimped lathe caps, a cork carriage as an extruded stepped side profile
  const body = grp(g);
  const skin = M(C.pickleSkin, { r: 0.26 }), flesh = M(0xc6cf72, { r: 0.3 }), seedm = M(0xe8e2a8, { r: 0.4 });
  const cork = M(C.cork, { r: 0.9 }), cap = M(C.red, { r: 0.3, m: 0.3 }), crimp = metal(0xc9ccd0);
  const L = 0.82, prof = [];
  for (let i = 0; i <= 14; i++) { const t = i / 14, y = -L / 2 + L * t; prof.push([(i === 0) ? 0 : 0.17 * Math.pow(Math.sin(PI * Math.min(1, t * 1.06)), 0.45) + (i === 14 ? 0 : 0), y]); }
  prof[14] = [0.14, L / 2]; prof.push([0, L / 2]);
  const pg = deform(lathe(prof, 20), (v) => {
    const r = Math.hypot(v.x, v.z); if (r < 1e-3) return;
    const th = Math.atan2(v.z, v.x), bump = 1 + 0.07 * Math.max(0, Math.sin(th * 7) * Math.sin(v.y * 38));
    v.x *= bump; v.z *= bump; v.x += 0.06 * Math.cos(v.y * 3.6) ;
  });
  const P = grp(body, [0, 0.43, 0.0], null, [-0.45, 0, 0]);
  add(pg, skin, [0, 0, 0], P, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.135, 0.135, 0.012, 18), flesh, [0.062, 0, L / 2 + 0.004], P, [PI / 2, 0, 0]);
  for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; add(new THREE.SphereGeometry(0.02, 6, 4), seedm, [0.062 + Math.cos(a) * 0.065, Math.sin(a) * 0.065, L / 2 + 0.01], P, null, [1, 1, 0.4]); }
  // carriage side profile (x = world z, y = world y), stepped like a cannon cheek
  const cs = new THREE.Shape();
  cs.moveTo(-0.32, 0.06); cs.lineTo(0.26, 0.06); cs.lineTo(0.26, 0.3); cs.lineTo(0.12, 0.38); cs.lineTo(0.0, 0.36); cs.lineTo(-0.08, 0.3); cs.lineTo(-0.18, 0.26); cs.lineTo(-0.24, 0.2); cs.lineTo(-0.32, 0.17); cs.closePath();
  for (const s of [-1, 1]) add(sideSlab(cs, 0.08, 0.012, 0.01), cork, [s * 0.16, 0, 0], body);
  add(new THREE.BoxGeometry(0.26, 0.1, 0.5), cork, [0, 0.13, -0.03], body);
  const capG = deform(lathe([[0, 0], [0.11, 0], [0.115, 0.012], [0.112, 0.045], [0.1, 0.05], [0, 0.052]], 21), (v) => { const r = Math.hypot(v.x, v.z); if (r > 0.105) { const th = Math.atan2(v.z, v.x), k = 1 + 0.06 * Math.cos(th * 21); v.x *= k; v.z *= k; } });
  for (const s of [-1, 1]) for (const z of [-0.2, 0.16]) {
    add(capG, crimp, [s * 0.2, 0.11, z], body, [0, 0, -s * PI / 2]);
    add(new THREE.CylinderGeometry(0.085, 0.085, 0.012, 18), cap, [s * 0.255, 0.11, z], body, [0, 0, PI / 2]);
  }
  fitAll(body, 0.8);
