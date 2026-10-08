  // PRIMITIVES: wicker as a stack of six oval rope rings (tori, alternating tones) on a woven base disc; napkin = four triangular extruded flaps folded over the rim plus a sagging centre disc; rolls = squashed spheres with a cross score
  const body = grp(g), O = grp(body); O.scale.set(1.3, 1, 1);
  const w1 = M(0xc08a48, { r: 0.75 }), w2 = M(0xa8743a, { r: 0.8 });
  add(new THREE.CylinderGeometry(0.95, 0.95, 0.1, 28), w2, [0, 0.05, 0], O);
  for (let i = 0; i < 6; i++) add(new THREE.TorusGeometry(0.98 + i * 0.05, 0.075, 6, 32), i % 2 ? w2 : w1, [0, 0.12 + i * 0.13, 0], O, [PI / 2, 0, 0]);
  const lin = M(0xe9e2d0, { r: 0.85, ds: true, name: 'fabric' });
  add(new THREE.CylinderGeometry(1.0, 0.9, 0.05, 24), lin, [0, 0.55, 0], O);
  const tri = new THREE.Shape(); tri.moveTo(-0.6, 0); tri.quadraticCurveTo(0, 0.08, 0.6, 0); tri.quadraticCurveTo(0.2, 0.4, 0, 0.72); tri.quadraticCurveTo(-0.2, 0.4, -0.6, 0); tri.closePath();
  for (const [a, sx] of [[PI / 4, 1.3], [3 * PI / 4, 1.3], [-3 * PI / 4, 1.3], [-PI / 4, 1.3]]) {
    const F = grp(body, [Math.cos(a) * 1.3 * sx, 0.86, -Math.sin(a) * 1.3], null, [0, a + PI / 2, 0]);
    add(deform(new THREE.ExtrudeGeometry(tri, { depth: 0.03, bevelEnabled: false, curveSegments: 6 }), (v) => { v.z -= 0.35 * v.x * v.x; }), lin, [0, 0, 0], F, [PI + 0.2, 0, 0]);
  }
  const crust = M(C.crust, { r: 0.45 }), score = M(0xe8c27a, { r: 0.6 });
  for (const [x, z] of [[-0.6, 0.2], [0.05, 0.38], [0.65, 0.15], [-0.3, -0.35], [0.4, -0.38]]) {
    add(new THREE.SphereGeometry(0.42, 14, 10), crust, [x, 0.8, z], body, null, [1, 0.7, 1]);
    add(new THREE.TorusGeometry(0.3, 0.025, 4, 12, PI), score, [x, 0.92, z], body, [0, 0.5, 0], [1, 0.5, 1]);
    add(new THREE.TorusGeometry(0.3, 0.025, 4, 12, PI), score, [x, 0.92, z], body, [0, 2.07, 0], [1, 0.5, 1]);
  }
  fitAll(body, 1.2);
