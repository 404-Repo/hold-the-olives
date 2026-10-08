  // SPHERES DEFORMED: oval platter lathe (wound outward, rim lip) scaled 1.5 on x; chicken body = a sphere deformed into a plump breast-up roast (flat base, breastbone ridge, rear cavity bump), skin-tone with darker roasted patches; drumsticks = lathe (meaty bulb to a bone knob) angled up; wings tucked = squashed spheres; potatoes = lumpy spheres; rosemary sprigs
  const body = grp(g), P = grp(body); P.scale.set(1.5, 1, 1);
  add(lathe([[0, 0], [1.4, 0], [1.5, 0.06], [1.5, 0.12], [1.7, 0.2], [2.1, 0.32], [2.15, 0.38], [2.05, 0.36], [1.6, 0.24], [0, 0.2]], 40), ceramic(0xf6f1e4, 0.25), [0, 0, 0], P);
  const skin = M(0xc8742c, { r: 0.32 }), skin2 = M(0xa8561c, { r: 0.35 }), bone = M(0xf2e6cc, { r: 0.5 });
  const ch = grp(body, [0, 0.22, 0]);
  const bod = deform(new THREE.SphereGeometry(1.0, 32, 20), (v) => { v.x *= 1.0; v.z *= 1.35; v.y *= 0.82; if (v.y < -0.35) v.y = -0.35 + (v.y + 0.35) * 0.25; v.y += 0.12 * Math.exp(-v.x * v.x * 12) * Math.max(0, v.y); v.y += 0.08 * Math.max(0, v.z) * Math.max(0, v.y); });
  add(bod, skin, [0, 0.62, 0], ch);
  for (let i = 0; i < 10; i++) { const a = i * 2.39996, e = 0.3 + 0.9 * ((i * 7) % 10) / 10; add(new THREE.SphereGeometry(0.22, 8, 6), skin2, [Math.sin(e) * Math.cos(a) * 0.92, 0.62 + Math.cos(e) * 0.7, Math.sin(e) * Math.sin(a) * 1.25], ch, null, [1, 0.35, 1]); }
  const drum = lathe([[0, 0], [0.12, 0.02], [0.1, 0.08], [0.07, 0.18], [0.09, 0.3], [0.3, 0.55], [0.36, 0.8], [0.3, 1.0], [0.15, 1.12], [0, 1.14]], 14);
  for (const s of [-1, 1]) { const D = grp(ch, [s * 0.45, 0.85, 0.85], null, [-1.0, 0, -s * 0.35]); add(drum, skin, [0, -0.9, 0], D, [PI, 0, 0]); add(new THREE.SphereGeometry(0.11, 8, 6), bone, [0, 0.0, 0], D, null, [1, 0.8, 1]);
    add(new THREE.SphereGeometry(0.45, 14, 10), skin, [s * 0.8, 0.55, -0.3], ch, [0, 0, s * 0.4], [0.5, 0.6, 1.0]); }
  const pot = M(0xd8a845, { r: 0.4 }), potD = M(0xb9822e, { r: 0.45 }), pg = deform(new THREE.SphereGeometry(0.3, 10, 8), (v) => { const k = 1 + 0.12 * Math.sin(v.x * 11) * Math.cos(v.z * 9); v.multiplyScalar(k); v.y *= 0.8; });
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU + 0.2, x = Math.cos(a) * 2.25, z = Math.sin(a) * 1.55; add(pg, i % 3 ? pot : potD, [x, 0.42, z], body, [i, i * 2, 0]); }
  const herb = M(0x3f8a3a, { r: 0.55, name: 'foliage' }), ng = new THREE.ConeGeometry(0.04, 0.2, 4);
  for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + 0.45, x = Math.cos(a) * 2.5, z = Math.sin(a) * 1.75, H = grp(body, [x, 0.4, z], null, [0, -a, 0]);
    rod([-0.35, 0, 0], [0.35, 0.05, 0], 0.025, herb, H, 4); for (let k = 0; k < 7; k++) for (const s of [-1, 1]) add(ng, herb, [-0.3 + k * 0.1, 0.02, s * 0.06], H, [s * 1.1, 0, 0]); }
  fitAll(body, 2.6);
