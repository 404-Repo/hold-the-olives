  // PROFILES: canopy = side profile (vertical back, sloped front, rolled lower lip) extruded across the width with bevels (vertical side cheeks);
  // band and chimney as bevelled panels; a steel trim cove where chimney meets canopy; a round knob row
  const body = grp(g); g.userData.mounts = 'back';
  const st = metal(C.steel, 0.3), cr = enamel(C.cream, 0.3), dk = M(0x3a3d40, { r: 0.6, m: 0.5, name: 'metal' });
  const W = 5.8, D = 4.4;
  const p = new THREE.Shape(); // x = world z (0 at wall, negative... we use x = distance from wall), y = up
  p.moveTo(0, 0.5); p.lineTo(D, 0.5); p.lineTo(D, 0.62); p.lineTo(D - 0.15, 0.7); p.lineTo(2.3, 2.1); p.lineTo(2.1, 2.2); p.lineTo(0, 2.2); p.closePath();
  const cg = new THREE.ExtrudeGeometry(p, { depth: W - 0.16, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.06, bevelSegments: 2, curveSegments: 4 });
  cg.rotateY(-PI / 2); cg.translate((W - 0.16) / 2, 0, 0); // now shape x runs along world +z from the wall at z = 0
  add(cg, st, [0, 0, -D], body);
  add(rbox(W, 0.55, D, 0.12), cr, [0, 0, -D / 2], body);
  add(rbox(W + 0.08, 0.08, D + 0.08, 0.03), st, [0, 0.5, -D / 2], body);
  add(rbox(2.4, 4.9, 2.0, 0.08), cr, [0, 2.1, -D + 1.0], body);
  add(rbox(2.56, 0.14, 2.16, 0.05), st, [0, 2.12, -D + 1.08], body);
  add(new THREE.BoxGeometry(W - 0.6, 0.02, D - 0.6), dk, [0, -0.005, -D / 2], body);
  for (let i = 0; i < 3; i++) add(lathe([[0, 0], [0.12, 0], [0.13, 0.05], [0.1, 0.1], [0, 0.11]], 12), st, [1.4 + i * 0.4, 0.27, 0.0], body, [PI / 2, 0, 0]);
  fitAll(body, 7.0);
