  // PROFILES: the side profile (rectangle with a scooped grip waist on both long sides) extruded across the width as the foam; the scrub pad an extruded
  // rounded rectangle on top with a fuzzy deformed top face
  const body = grp(g);
  const yel = M(0xf5cd2a, { r: 0.85 }), grn = M(0x2f7a32, { r: 0.95, name: 'fabric' });
  const p = new THREE.Shape(); // x = world z (length), y = world y
  p.moveTo(-0.57, 0); p.lineTo(0.57, 0); p.lineTo(0.57, 0.12); p.quadraticCurveTo(0.49, 0.16, 0.57, 0.2); p.lineTo(0.57, 0.3); p.lineTo(-0.57, 0.3); p.lineTo(-0.57, 0.2); p.quadraticCurveTo(-0.49, 0.16, -0.57, 0.12); p.closePath();
  const sg = new THREE.ExtrudeGeometry(p, { depth: 0.7, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 2, curveSegments: 6 }); sg.rotateY(PI / 2); sg.translate(-0.35, 0.03, 0);
  // the waist also scoops the long sides: push x in around mid-height
  deform(sg, (v) => { const k = Math.exp(-Math.pow((v.y - 0.19) / 0.05, 2)); v.x *= 1 - 0.12 * k; });
  add(sg, yel, [0, 0, 0], body);
  const pad = slab(rrect(0.72, 1.12, 0.06), 0.13, 0.03, 0.025, 4, 2);
  deform(pad, (v) => { if (v.y > 0.1) v.y += 0.012 * Math.sin(v.x * 40) * Math.cos(v.z * 37); });
  add(pad, grn, [0, 0.36, 0], body);
  fitAll(body, 0.45);
