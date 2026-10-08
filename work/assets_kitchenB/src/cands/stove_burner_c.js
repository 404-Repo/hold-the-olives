  // DIFFERENT READING (concept art): one chunky cast-iron "petal" grate: a rounded-square frame with four bold arms whose inner
  // tips kink up, corner feet; a flat steel spill disc with a raised torus rim; a stepped two-tier cap
  const body = grp(g);
  const iron = M(0x2b2a2c, { r: 0.55, m: 0.35, name: 'metal' }), steel = metal(C.steel, 0.3), cap = M(0x1d1c1e, { r: 0.4, m: 0.3, name: 'metal' });
  add(new THREE.CylinderGeometry(0.92, 0.92, 0.03, 32), steel, [0, 0.015, 0], body);
  add(new THREE.TorusGeometry(0.92, 0.035, 6, 32), steel, [0, 0.03, 0], body, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.46, 0.5, 0.1, 20), cap, [0, 0.08, 0], body);
  add(new THREE.CylinderGeometry(0.3, 0.38, 0.06, 20), cap, [0, 0.16, 0], body);
  add(new THREE.CylinderGeometry(0.12, 0.12, 0.02, 12), M(0x6a6d70, { r: 0.4, m: 0.6, name: 'metal' }), [0, 0.2, 0], body);
  const W = 2.24, fr = rrect(W, W, 0.62); const h = rrectPath(W - 0.28, W - 0.28, 0.5); fr.holes.push(h);
  add(slab(fr, 0.1, 0.035, 0.035, 8), iron, [0, 0.2, 0], body);
  for (let i = 0; i < 4; i++) {
    const a = i / 4 * TAU, arm = grp(body, [0, 0, 0], null, [0, -a, 0]);
    add(rbox(0.62, 0.1, 0.16, 0.04), iron, [0.82, 0.2, 0], arm);
    const tip = add(rbox(0.26, 0.1, 0.16, 0.04), iron, [0.5, 0.24, 0], arm); tip.rotation.z = 0.35;
    const d = W / 2 - 0.12, ca = a + PI / 4; add(rbox(0.2, 0.22, 0.2, 0.06), iron, [Math.cos(ca) * d * 1.1, 0, Math.sin(ca) * d * 1.1], body);
  }
  fitWHD(body, 2.4, 0.3, 2.4);
