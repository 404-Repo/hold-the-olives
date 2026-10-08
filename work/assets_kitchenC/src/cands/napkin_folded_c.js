  // DIFFERENT READING: soft pillowy folded cloth: a segmented box deformed to puff in the middle and sag at the corners, a smaller folded-back top flap turned at one corner, the blue stripe as a band of the same puffed form
  const body = grp(g);
  const lin = linen(), bl = stripe();
  const puff = (w, h, d, a = 0.06) => deform(new THREE.BoxGeometry(w, h, d, 6, 2, 8), (v) => { const u = v.x / (w / 2), t = v.z / (d / 2); if (v.y > 0) v.y += a * (1 - u * u) * (1 - t * t); v.x *= 1 - 0.03 * t * t; });
  add(puff(1.5, 0.22, 2.0), lin, [0, 0.11, 0], body);
  add(puff(1.44, 0.16, 1.4, 0.05), lin, [0.01, 0.3, -0.28], body);
  add(puff(1.46, 0.165, 0.14, 0.04), bl, [0.01, 0.3, 0.35], body);
  add(puff(1.52, 0.225, 0.14, 0.05), bl, [0, 0.11, 0.62], body);
  const tri = new THREE.Shape(); tri.moveTo(0, 0); tri.lineTo(0.5, 0); tri.lineTo(0, 0.5); tri.closePath();
  add(slab(tri, 0.05, 0.015, 0.0), lin, [-0.7, 0.4, -0.95], body);
  fitAll(body, 0.5);
