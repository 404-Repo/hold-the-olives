  // PROFILES: chicken body = a lathe swept along z (an egg-shaped roast, flattened beneath), drumsticks = capsules with a bone end and a white paper frill (lathe with crimps), wings = extruded side profiles; platter = extruded oval slab with a raised rim (shape with hole); potatoes = rounded boxes
  const body = grp(g);
  const ov = (a, b, n = 40) => { const s = new THREE.Shape(); for (let i = 0; i <= n; i++) { const t = i / n * TAU; i ? s.lineTo(a * Math.cos(t), b * Math.sin(t)) : s.moveTo(a, 0); } return s; };
  const pl = ceramic(0xf6f1e4, 0.25);
  add(slab(ov(3.0, 2.0), 0.18, 0.05, 0.0, 40), pl, [0, 0, 0], body);
  const rim = ov(3.25, 2.25); const h = new THREE.Path(); for (let i = 0; i <= 40; i++) { const t = -i / 40 * TAU; i ? h.lineTo(2.85 * Math.cos(t), 1.85 * Math.sin(t)) : h.moveTo(2.85, 0); } rim.holes.push(h);
  add(slab(rim, 0.14, 0.04, 0.0, 40), pl, [0, 0.18, 0], body);
  const skin = M(0xc8742c, { r: 0.32 }), skin2 = M(0xa8561c, { r: 0.35 }), bone = M(0xf2e6cc, { r: 0.5 });
  const prof = []; for (let i = 0; i <= 12; i++) { const t = i / 12; prof.push([1.0 * Math.pow(Math.sin(PI * t), 0.7) * (1 - 0.15 * t), -1.3 + 2.6 * t]); }
  const bl = deform(lathe(prof, 24), (v) => { if (v.x < -0.45) v.x = -0.45 + (v.x + 0.45) * 0.3; });
  add(bl, skin, [0, 0.95, 0], body, [PI / 2, 0, PI / 2]);
  add(new THREE.SphereGeometry(0.5, 12, 8), skin2, [0, 1.45, 0.2], body, null, [1.3, 0.25, 1.6]);
  for (const s of [-1, 1]) {
    const D = grp(body, [s * 0.5, 1.15, 1.2], null, [-0.7, s * 0.3, 0]);
    add(new THREE.CapsuleGeometry(0.33, 0.55, 4, 12), skin, [0, 0, 0], D, [PI / 2, 0, 0]);
    rod([0, 0, 0.5], [0, 0, 0.95], 0.08, bone, D, 8);
    add(deform(lathe([[0.1, 0], [0.2, 0.04], [0.22, 0.22], [0.08, 0.24]], 16), (v) => { const r = Math.hypot(v.x, v.z); if (v.y > 0.1) { const k = 1 + 0.18 * Math.cos(Math.atan2(v.z, v.x) * 8); v.x *= k; v.z *= k; } }), M(0xffffff, { r: 0.7, ds: true }), [0, 0, 0.88], D, [PI / 2, 0, 0]);
    const ws = new THREE.Shape(); ws.moveTo(0, 0); ws.quadraticCurveTo(0.6, 0.35, 1.0, 0.0); ws.quadraticCurveTo(0.6, -0.25, 0, -0.2); ws.closePath();
    add(new THREE.ExtrudeGeometry(ws, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 2, curveSegments: 6 }), skin2, [s * 0.95, 0.95, 0.4], body, [0, s * PI / 2, -0.2]);
  }
  const pot = M(0xd8a845, { r: 0.4 });
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU + 0.1; add(rbox(0.5, 0.36, 0.42, 0.14), pot, [Math.cos(a) * 2.3, 0.18, Math.sin(a) * 1.45], body, [0, a * 2, 0]); }
  const herb = M(0x3f8a3a, { r: 0.55, name: 'foliage' });
  for (let i = 0; i < 5; i++) { const a = i / 5 * TAU + 0.6; add(new THREE.SphereGeometry(0.2, 6, 4), herb, [Math.cos(a) * 2.6, 0.38, Math.sin(a) * 1.65], body, null, [1.6, 0.5, 0.7]); }
  fitAll(body, 2.6);
