  // EXTRUDE: a square with one corner folded over (outline with the corner cut, plus the folded triangle lying on top), a blue stripe across one edge
  const body = grp(g);
  const s = new THREE.Shape(); s.moveTo(-0.65, -0.65); s.lineTo(0.65, -0.65); s.lineTo(0.65, 0.3); s.lineTo(0.3, 0.65); s.lineTo(-0.65, 0.65); s.closePath();
  add(slab(s, 0.03, 0.008, 0.0), linen(0xf4efe2), [0, 0, 0], body);
  const t = new THREE.Shape(); t.moveTo(0.65, 0.3); t.lineTo(0.3, 0.65); t.lineTo(0.3, 0.3); t.closePath();
  add(slab(t, 0.02, 0.006, 0.0), linen(0xe9e2d0), [0, 0.03, 0], body);
  add(new THREE.BoxGeometry(1.3, 0.006, 0.08), stripe(), [0, 0.031, 0.5], body);
  fitAll(body, 0.05);
