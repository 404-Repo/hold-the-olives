// All the numbers that make the game. Positions are world metres at 10x scale
// (one world metre is 10 cm of kitchen). The counter top is y = 0; the camera
// looks along -Z, so olives come from far (negative z) toward the sandwich.

export const ENEMY_SCALE = 1.55;  // jumbo olives: read at phone size
export const FIELD = 0.82;        // the authored layouts below are compacted by this so the whole field fits a phone

export const WEAPONS = {
  pick:    { name: 'Toothpick Ballista', short: 'Fast single shots', cost: 60,  range: 3.4, dmg: 10, rate: 1.7, kind: 'bolt',   pierce: true, unlock: 1, head: 'head_ballista', proj: 'proj_toothpick', speed: 16 },
  pickle:  { name: 'Pickle Cannon',      short: 'Lobs pickles, splash', cost: 90, range: 3.8, dmg: 16, rate: 0.62, kind: 'lob', splash: 1.0, unlock: 1, head: 'head_pickle', proj: 'proj_pickle', speed: 8 },
  mustard: { name: 'Mustard Squeezer',   short: 'Sticky slow, cone', cost: 75,  range: 2.8, dmg: 4,  rate: 1.4, kind: 'cone', slow: 0.5, slowT: 1.6, unlock: 2, head: 'head_mustard', proj: 'proj_mustard', speed: 9 },
  pepper:  { name: 'Pepper Mill',        short: 'Sneeze cloud, hits all near', cost: 100, range: 2.3, dmg: 9, rate: 1.0, kind: 'aura', unlock: 3, head: 'head_pepper' },
  grater:  { name: 'Cheese Grater',      short: 'Shreds armour', cost: 110, range: 3.1, dmg: 6,  rate: 2.6, kind: 'bolt', shred: 3.0, unlock: 4, head: 'head_grater', proj: 'proj_shred', speed: 14 },
  toaster: { name: 'Toaster',            short: 'Toast barrage, huge splash', cost: 160, range: 5.2, dmg: 46, rate: 0.3, kind: 'lob', splash: 1.5, unlock: 5, head: 'head_toaster', proj: 'proj_toast', speed: 7 },
};
export const WEAPON_ORDER = ['pick', 'pickle', 'mustard', 'pepper', 'grater', 'toaster'];

export const LAYERS = {
  lettuce: { name: 'Lettuce', short: '+25% range', model: 'layer_lettuce', h: 0.12, range: 1.25 },
  tomato:  { name: 'Tomato',  short: '+40% damage', model: 'layer_tomato', h: 0.12, dmg: 1.4 },
  cheese:  { name: 'Cheese',  short: '+35% speed', model: 'layer_cheese', h: 0.07, rate: 1.35 },
  bacon:   { name: 'Bacon',   short: 'Sets olives sizzling', model: 'layer_bacon', h: 0.09, burn: 0.45 },
};
export const LAYER_ORDER = ['lettuce', 'tomato', 'cheese', 'bacon'];
export const LAYER_COST = [45, 80, 120];
export const CLUB_BONUS = 1.25;
export const SELL_BACK = 0.7;

// hp, speed m/s, bites taken from the sandwich, crumbs dropped, display height (m, before ENEMY_SCALE)
export const OLIVES = {
  green:   { name: 'Green Olive',   model: 'olive_green',    hp: 30,  speed: 0.95, bites: 1, reward: 4,  h: 0.35 },
  kalamata:{ name: 'Kalamata',      model: 'olive_kalamata', hp: 18,  speed: 1.55, bites: 1, reward: 3,  h: 0.30 },
  stuffed: { name: 'Stuffed Olive', model: 'olive_stuffed',  hp: 42,  speed: 0.9,  bites: 1, reward: 5,  h: 0.36, split: 'pimento' },
  pimento: { name: 'Pimento',       model: 'pimento_runner', hp: 12,  speed: 1.8,  bites: 1, reward: 2,  h: 0.18 },
  ring:    { name: 'Olive Ring',    model: 'olive_ring',     hp: 22,  speed: 2.1,  bites: 1, reward: 4,  h: 0.32, roll: true, dodge: 0.25 },
  knight:  { name: 'Martini Knight',model: 'olive_knight',   hp: 70,  speed: 0.8,  bites: 2, reward: 9,  h: 0.9,  armor: 0.6 },
  brute:   { name: 'Castelvetrano', model: 'olive_brute',    hp: 240, speed: 0.55, bites: 3, reward: 18, h: 0.55 },
  greaser: { name: 'Greaser',       model: 'olive_greaser',  hp: 48,  speed: 0.95, bites: 1, reward: 6,  h: 0.36, slick: true },
  jar:     { name: 'THE JAR',       model: 'boss_jar',       hp: 2200, speed: 0.32, bites: 12, reward: 150, h: 2.4, boss: true, spawn: 'green', spawnEvery: 3.5 },
  bottle:  { name: 'THE OIL BOTTLE',model: 'boss_oil_bottle',hp: 3600, speed: 0.3,  bites: 14, reward: 220, h: 3.2, boss: true, slick: true, spawn: 'greaser', spawnEvery: 5 },
  martini: { name: 'THE MARTINI',   model: 'boss_martini',   hp: 5200, speed: 0.28, bites: 20, reward: 400, h: 3.6, boss: true, spawn: 'knight', spawnEvery: 4.5 },
};

// First time an olive type appears, the game introduces it.
export const INTRO = {
  green: 'Green olives. Determined. Not fast.',
  kalamata: 'Kalamatas! Quick and sneaky, they come in packs.',
  stuffed: 'Stuffed olives: pop one and the pimento keeps running.',
  ring: 'Olive rings roll like wheels. Hard to hit!',
  knight: 'Martini Knights: toothpicks bounce off. Cheese graters shred their armour.',
  brute: 'A Castelvetrano. Big, grumpy, takes three bites.',
  greaser: 'Greasers leave oil. Olives behind them speed up.',
};

const W = (t, n, gap = 1, at = 0) => ({ t, n, gap, at });

// Stage geometry. `path` is the olives' route (x, z) from the spawn to the sandwich.
// `plat` raises boxes of the counter (cutting boards, trays): [x0, z0, x1, z1, height].
export const STAGES = [
  {
    id: 'board', num: 1, name: 'The Cutting Board', time: 'Morning',
    blurb: 'The counter by the window. Breakfast is over; lunch is not.',
    look: 'morning', music: 'stage_a',
    bounds: [-6.2, -21, 6.2, 3.5],
    path: [[-3.2, -20.5], [-3.2, -16.2], [-1, -14.6], [3.2, -14.2], [3.8, -11.6], [2.2, -9.6], [-2.6, -9.2], [-3.8, -6.6], [-2.4, -4.6], [2.6, -4.2], [3.4, -1.8], [1.6, 0.2], [0.4, 0.9]],
    plat: [[-5.2, -12.6, 5.2, -2.4, 0.32]],
    pads: [[0.6, -18.2], [-0.4, -11.8], [1.4, -12.0], [5.6, -12.6], [0.6, -7.2], [-0.8, -6.9], [-5.6, -9.0], [0.4, -2.2], [-0.9, -1.4], [5.0, -4.6], [-1.6, -16.6], [1.4, -16.2]],
    sandwich: [0.4, 2.0],
    start: 160, lives: 20,
    gadget: null,
    waves: [
      [W('green', 8, 1.5)],
      [W('green', 12, 1.1)],
      [W('kalamata', 6, 0.75), W('green', 8, 1.1, 5)],
      [W('green', 14, 0.85), W('kalamata', 6, 0.6, 7)],
      [W('kalamata', 12, 0.5), W('green', 10, 0.9, 4)],
      [W('green', 20, 0.6)],
      [W('kalamata', 14, 0.42), W('green', 14, 0.75, 3)],
      [W('green', 16, 0.6), W('kalamata', 16, 0.4, 5), W('green', 10, 0.5, 12)],
    ],
  },
  {
    id: 'stove', num: 2, name: 'The Stovetop', time: 'Late morning',
    blurb: 'Four burners, two pans, and a jar that has had enough.',
    look: 'stove', music: 'stage_a',
    bounds: [-6.2, -21, 6.2, 3.5],
    path: [[4.4, -20.5], [4.4, -17.5], [0.2, -16.6], [-4.0, -15.2], [-4.2, -12.0], [-0.4, -10.4], [3.6, -9.6], [4.2, -6.6], [0.6, -5.4], [-3.8, -4.4], [-3.6, -1.6], [-1.2, 0.4], [0.2, 1.0]],
    plat: [],
    burners: [[0.2, -16.4], [3.9, -8.4], [-3.7, -3.2]],
    pads: [[2.2, -18.8], [-2.0, -17.6], [-1.6, -13.2], [-2.4, -11.6], [1.6, -12.4], [0.8, -8.0], [6.0, -11.0], [2.2, -7.2], [-1.2, -7.0], [-1.6, -2.4], [-5.8, -7.4], [1.0, -2.4], [-5.4, -0.2], [2.6, -14.8]],
    sandwich: [0.4, 2.0],
    start: 200, lives: 20,
    gadget: 'burner',
    waves: [
      [W('green', 12, 1.0)],
      [W('stuffed', 8, 1.2)],
      [W('kalamata', 10, 0.5), W('stuffed', 6, 1.2, 4)],
      [W('ring', 8, 0.9)],
      [W('green', 16, 0.6), W('ring', 8, 0.7, 6)],
      [W('stuffed', 14, 0.7), W('kalamata', 12, 0.4, 5)],
      [W('ring', 14, 0.5), W('green', 14, 0.6, 3)],
      [W('stuffed', 18, 0.55), W('ring', 10, 0.5, 8)],
      [W('kalamata', 24, 0.32), W('stuffed', 12, 0.6, 4), W('ring', 12, 0.45, 10)],
      [W('jar', 1, 1), W('green', 12, 0.9, 6), W('ring', 10, 0.6, 16)],
    ],
  },
  {
    id: 'sink', num: 3, name: 'The Sink', time: 'Noon',
    blurb: 'Over the drying rack, past the sponge, round the plughole.',
    look: 'noon', music: 'stage_a',
    bounds: [-6.2, -21, 6.2, 3.5],
    path: [[-4.6, -20.5], [-4.6, -14.8], [-1.8, -13.4], [2.0, -14.6], [4.4, -12.6], [4.0, -8.8], [0.6, -7.4], [-3.0, -8.2], [-4.4, -5.4], [-2.2, -2.8], [2.8, -3.0], [3.6, -0.6], [1.6, 0.8], [0.4, 1.1]],
    plat: [[-6.2, -21, -2.6, -15.6, 0.45]],
    tap: [0.4, -10.8],
    pads: [[-2.4, -18.0], [-0.4, -16.6], [0.0, -11.4], [2.0, -11.4], [6.0, -11.0], [2.0, -5.6], [-1.0, -5.6], [-0.6, -10.2], [-5.8, -9.4], [0.4, -1.2], [-1.4, -0.8], [5.6, -3.6], [2.6, -17.0], [-2.4, -11.0]],
    sandwich: [0.4, 2.0],
    start: 220, lives: 20,
    gadget: 'tap',
    waves: [
      [W('green', 14, 0.8)],
      [W('knight', 4, 2.0)],
      [W('stuffed', 10, 0.8), W('knight', 3, 2, 4)],
      [W('ring', 14, 0.45)],
      [W('knight', 8, 1.3), W('kalamata', 12, 0.4, 3)],
      [W('green', 24, 0.4), W('knight', 6, 1.2, 6)],
      [W('ring', 18, 0.4), W('stuffed', 10, 0.7, 4)],
      [W('knight', 12, 0.9), W('kalamata', 18, 0.35, 5)],
      [W('stuffed', 20, 0.5), W('ring', 16, 0.4, 3), W('knight', 8, 1, 10)],
      [W('knight', 16, 0.7), W('green', 30, 0.3, 2), W('ring', 20, 0.35, 12)],
    ],
  },
  {
    id: 'lunch', num: 4, name: 'Sunday Lunch', time: 'Afternoon',
    blurb: 'The dining table, laid for six. The olives were not invited.',
    look: 'afternoon', music: 'stage_a',
    bounds: [-6.2, -21, 6.2, 3.5],
    path: [[0.0, -20.5], [0.0, -17.6], [-4.2, -16.0], [-4.0, -12.4], [0.0, -11.6], [4.2, -12.0], [4.4, -7.6], [1.0, -6.6], [-3.8, -7.0], [-4.2, -3.4], [-1.0, -2.2], [2.8, -2.8], [3.4, -0.4], [1.4, 0.9], [0.4, 1.1]],
    plat: [],
    pads: [[-2.0, -18.8], [2.0, -18.8], [-1.8, -14.2], [-6.0, -14.0], [2.0, -14.2], [2.2, -9.4], [-1.6, -9.4], [6.0, -9.6], [-1.6, -4.6], [1.0, -4.4], [-6.0, -5.2], [0.8, -0.2], [-1.2, 0.2], [5.4, -4.6], [0.0, -14.0]],
    sandwich: [0.4, 2.0],
    start: 260, lives: 20,
    gadget: 'pepper',
    waves: [
      [W('green', 16, 0.7), W('kalamata', 8, 0.5, 6)],
      [W('greaser', 6, 1.5), W('green', 12, 0.7, 3)],
      [W('brute', 2, 4)],
      [W('knight', 8, 1.0), W('greaser', 6, 1.2, 4)],
      [W('ring', 20, 0.35), W('brute', 2, 3, 6)],
      [W('stuffed', 20, 0.45), W('greaser', 8, 0.9, 5)],
      [W('brute', 4, 2.5), W('kalamata', 20, 0.3, 3)],
      [W('knight', 14, 0.7), W('ring', 16, 0.4, 5)],
      [W('greaser', 12, 0.7), W('green', 30, 0.28, 2), W('brute', 3, 2.5, 8)],
      [W('stuffed', 24, 0.4), W('knight', 12, 0.7, 4), W('ring', 20, 0.3, 10)],
      [W('brute', 6, 1.8), W('greaser', 14, 0.6, 3), W('kalamata', 30, 0.25, 8)],
      [W('bottle', 1, 1), W('greaser', 10, 0.9, 8), W('brute', 3, 3, 18)],
    ],
  },
  {
    id: 'bar', num: 5, name: 'Cocktail Hour', time: 'Evening',
    blurb: 'The bar cart, under the lamps. The Martini is waiting.',
    look: 'evening', music: 'stage_b',
    bounds: [-6.2, -21, 6.2, 3.5],
    path: [[-4.2, -20.5], [-4.2, -17.0], [0.0, -15.8], [4.2, -16.8], [4.6, -13.0], [1.8, -11.0], [-3.6, -11.6], [-4.4, -8.0], [-1.0, -6.4], [3.8, -7.0], [4.2, -3.6], [0.6, -2.4], [-3.0, -2.2], [-3.2, 0.2], [-1.2, 1.0], [0.2, 1.2]],
    plat: [],
    pads: [[-1.8, -19.2], [2.0, -18.6], [0.0, -13.6], [-2.0, -13.8], [6.0, -14.8], [2.4, -13.2], [-1.6, -9.0], [1.6, -8.6], [-6.0, -9.8], [6.0, -5.2], [1.6, -4.6], [-1.0, -4.4], [-1.0, -0.4], [1.8, -0.4], [-5.8, -1.6], [6.0, -9.4]],
    sandwich: [0.4, 2.0],
    start: 320, lives: 20,
    gadget: 'ice',
    waves: [
      [W('green', 20, 0.5), W('kalamata', 14, 0.35, 5)],
      [W('knight', 10, 0.9), W('stuffed', 10, 0.6, 4)],
      [W('ring', 24, 0.3), W('greaser', 8, 0.8, 5)],
      [W('brute', 5, 2.0), W('knight', 8, 0.9, 4)],
      [W('stuffed', 26, 0.35), W('ring', 20, 0.3, 6)],
      [W('greaser', 14, 0.6), W('brute', 4, 2.0, 5), W('kalamata', 30, 0.22, 10)],
      [W('knight', 20, 0.55), W('ring', 24, 0.28, 6)],
      [W('brute', 8, 1.4), W('stuffed', 24, 0.35, 4)],
      [W('kalamata', 50, 0.18), W('greaser', 16, 0.5, 4), W('knight', 10, 0.8, 10)],
      [W('jar', 1, 1), W('ring', 26, 0.3, 4), W('brute', 4, 2, 12)],
      [W('knight', 26, 0.45), W('greaser', 20, 0.45, 6), W('brute', 6, 1.6, 14)],
      [W('martini', 1, 1), W('knight', 12, 1.0, 10), W('brute', 6, 2.2, 20), W('kalamata', 40, 0.25, 30)],
    ],
  },
];

// Endless: the Midnight Snack. Plays on the first stage's counter by fridge light.
export const ENDLESS = { ...STAGES[0], id: 'night', num: 'E', name: 'Midnight Snack', time: 'Night', look: 'night', music: 'stage_b', blurb: 'Endless. The fridge light is on. How long can lunch last?', start: 220, gadget: 'burner', burners: [[-1.0, -14.6], [3.6, -9.8], [-3.0, -4.6]], waves: null };

export function endlessWave(n) {
  // n from 1. Escalates forever; a boss every 10th wave.
  const types = ['green', 'kalamata', 'stuffed', 'ring', 'knight', 'greaser', 'brute'];
  const avail = types.slice(0, Math.min(types.length, 2 + Math.floor(n / 2)));
  const out = [];
  if (n % 10 === 0) out.push(W(['jar', 'bottle', 'martini'][(n / 10 - 1) % 3], 1, 1));
  const groups = 1 + Math.min(3, Math.floor(n / 3));
  for (let g = 0; g < groups; g++) {
    const t = avail[(n * 7 + g * 3) % avail.length];
    const base = t === 'brute' ? 2 : t === 'knight' ? 6 : 12;
    out.push(W(t, Math.round(base + n * (t === 'brute' ? 0.25 : 1.1)), Math.max(0.2, 1.0 - n * 0.03), g * 4));
  }
  return out;
}

export const GADGETS = {
  swat:   { name: 'SWAT', cd: 18, radius: 1.4, dmg: 70, stun: 1.2, hint: 'Tap the counter to swat with the spatula' },
  burner: { name: 'FLAME', cd: 26, dmg: 45, dur: 4, radius: 1.5, hint: 'Tap a burner to light it' },
  tap:    { name: 'RINSE', cd: 34, push: 4.5, dmg: 20, hint: 'Tap the counter to rinse a lane back' },
  pepper: { name: 'PEPPER', cd: 30, slow: 0.5, dur: 4, dmg: 10, hint: 'Tap to dust the table with pepper' },
  ice:    { name: 'ICE', cd: 36, dur: 3, hint: 'Tap to tip the ice bucket: everything freezes' },
};

// Compact every stage's field (not the props' sizes: the room gets bigger around it).
for (const st of STAGES) {
  const f = (p) => [p[0] * FIELD, p[1] * FIELD];
  st.path = st.path.map(f); st.pads = st.pads.map(f); st.sandwich = f(st.sandwich);
  if (st.burners) st.burners = st.burners.map(f);
  if (st.tap) st.tap = f(st.tap);
  st.plat = (st.plat || []).map(([x0, z0, x1, z1, h]) => [x0 * FIELD, z0 * FIELD, x1 * FIELD, z1 * FIELD, h]);
  st.bounds = st.bounds.map((v) => v * FIELD);
}
ENDLESS.path = STAGES[0].path; ENDLESS.pads = STAGES[0].pads; ENDLESS.sandwich = STAGES[0].sandwich; ENDLESS.plat = STAGES[0].plat; ENDLESS.bounds = STAGES[0].bounds;
ENDLESS.burners = ENDLESS.burners.map((p) => [p[0] * FIELD, p[1] * FIELD]);
for (const k in WEAPONS) WEAPONS[k].range *= 0.9;

export function hpScale(stageNum, wave) {
  const s = typeof stageNum === 'number' ? stageNum : 3;
  return (1 + 0.22 * (s - 1)) * (1 + 0.075 * wave);
}
