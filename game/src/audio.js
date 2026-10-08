// Sound. Atlas-generated music and effects where we have them, small Web
// Audio synths for the rest. Music takes are short (13 to 41 s), so each cue
// is a playlist of takes chained with crossfades rather than one hard loop.
import { AUDIO } from './assets_list.js';

const have = new Set(AUDIO || []);
const FILES = {
  pop: 'sfx_pop', chomp: 'sfx_chomp', ding: 'sfx_wave_ding', lid: 'sfx_jar_lid', coin: 'sfx_collect', thwip: 'sfx_thwip',
  thunk: 'sfx_cannon', squirt: 'sfx_splurt', grind: 'sfx_grinder', toast: 'sfx_toaster', lose: 'sfx_defeat',
  layer: 'sfx_layer_plop', build: 'sfx_place', slap: 'sfx_slap',
};
const MUSIC = {
  menu: ['music_menu'],
  stage_a: ['music_stage_a', 'music_stage_a_alt', 'music_stage_a2', 'music_stage_a3'],
  stage_b: ['music_stage_b', 'music_stage_b2'],
  boss: ['music_boss', 'music_boss_alt'],
  victory: ['music_victory'],
};

export class Audio {
  constructor() {
    this.ctx = null; this.buf = {}; this.on = true; this.cue = null; this.last = {};
    this.musicVol = 0.42; this.sfxVol = 0.8;
  }

  unlock() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain(); this.master.gain.value = this.on ? 1 : 0; this.master.connect(this.ctx.destination);
    this.mBus = this.ctx.createGain(); this.mBus.gain.value = this.musicVol; this.mBus.connect(this.master);
    this.sBus = this.ctx.createGain(); this.sBus.gain.value = this.sfxVol; this.sBus.connect(this.master);
    // a soft noise buffer for synthesized splats and whooshes
    const n = this.ctx.createBuffer(1, this.ctx.sampleRate, this.ctx.sampleRate);
    const d = n.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    this.noise = n;
    this.loadAll();
  }

  async load(name) {
    if (!have.has(name) || this.buf[name]) return this.buf[name];
    try {
      const r = await fetch(`./audio/${name}.mp3`);
      const a = await r.arrayBuffer();
      this.buf[name] = await this.ctx.decodeAudioData(a);
    } catch (e) { console.warn('[audio]', name, e.message); }
    return this.buf[name];
  }
  loadAll() {
    const names = [...Object.values(FILES), ...Object.values(MUSIC).flat()].filter((n) => have.has(n));
    // effects first; music is bigger
    names.sort((a, b) => (a.startsWith('sfx') ? 0 : 1) - (b.startsWith('sfx') ? 0 : 1));
    (async () => { for (const n of names) await this.load(n); if (this.pending) { const p = this.pending; this.pending = null; this.music(p); } })();
  }

  setOn(on) { this.on = on; if (this.master) this.master.gain.value = on ? 1 : 0; }

  sfx(name, vol = 1) {
    if (!this.ctx || !this.on) return;
    const now = this.ctx.currentTime;
    if (this.last[name] && now - this.last[name] < 0.045) return;      // one per frame, or a wave is a wall of noise
    this.last[name] = now;
    const f = FILES[name], b = f && this.buf[f];
    if (b) {
      const s = this.ctx.createBufferSource(); s.buffer = b;
      s.playbackRate.value = name === 'chomp' || name === 'ding' ? 1 : 0.9 + Math.random() * 0.22;
      const g = this.ctx.createGain(); g.gain.value = vol;
      s.connect(g).connect(this.sBus); s.start();
      return;
    }
    this.synth(name, vol);
  }

  synth(name, vol) {
    const c = this.ctx, t = c.currentTime;
    const tone = (type, f0, f1, dur, v = 0.3, delay = 0) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = type; o.frequency.setValueAtTime(f0, t + delay); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + delay + dur);
      g.gain.setValueAtTime(0.0001, t + delay); g.gain.exponentialRampToValueAtTime(v * vol, t + delay + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + delay + dur);
      o.connect(g).connect(this.sBus); o.start(t + delay); o.stop(t + delay + dur + 0.05);
    };
    const noise = (dur, f, q = 1, v = 0.4, type = 'bandpass', delay = 0) => {
      const s = c.createBufferSource(); s.buffer = this.noise;
      const fl = c.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q;
      const g = c.createGain();
      g.gain.setValueAtTime(v * vol, t + delay); g.gain.exponentialRampToValueAtTime(0.0001, t + delay + dur);
      s.connect(fl).connect(g).connect(this.sBus); s.start(t + delay, Math.random() * 0.5); s.stop(t + delay + dur + 0.05);
    };
    switch (name) {
      case 'tick': tone('sine', 900, 1200, 0.06, 0.12); break;
      case 'nope': tone('square', 220, 160, 0.16, 0.08); break;
      case 'slap': noise(0.18, 1800, 0.8, 0.9); tone('sine', 160, 60, 0.15, 0.5); break;
      case 'club': [523, 659, 784, 1047].forEach((f, i) => tone('triangle', f, f, 0.22, 0.18, i * 0.07)); break;
      case 'win': [523, 659, 784, 1047, 1319].forEach((f, i) => tone('triangle', f, f, 0.3, 0.2, i * 0.09)); break;
      case 'bossdie': noise(0.9, 400, 0.6, 0.8, 'lowpass'); tone('sawtooth', 300, 40, 0.9, 0.2); break;
      case 'whoosh': noise(0.6, 600, 0.5, 0.5, 'lowpass'); break;
      case 'splash': noise(0.5, 2400, 0.6, 0.6); noise(0.3, 700, 1, 0.4, 'bandpass', 0.05); break;
      case 'ice': for (let i = 0; i < 6; i++) tone('sine', 2400 + Math.random() * 1600, 1800, 0.12, 0.08, i * 0.06); noise(0.5, 3000, 1, 0.3); break;
      case 'splat': noise(0.15, 900, 1.2, 0.35); break;
      case 'squish': noise(0.16, 500, 1.5, 0.35); tone('sine', 220, 90, 0.12, 0.2); break;
      case 'boom': noise(0.5, 200, 0.7, 0.7, 'lowpass'); tone('sine', 120, 40, 0.4, 0.4); break;
      case 'shred': noise(0.08, 4000, 2, 0.25); break;
      default: tone('sine', 600, 400, 0.08, 0.1);
    }
  }

  /** Switch the music cue. null stops it. */
  music(cue) {
    if (!this.ctx) { this.pending = cue; return; }
    if (cue === this.cue && this.track) return;
    this.cue = cue;
    if (this.track) { const tr = this.track; this.track = null; tr.stop(1.2); }
    clearTimeout(this.nextT);
    if (!cue) return;
    const list = (MUSIC[cue] || []).filter((n) => this.buf[n]);
    if (!list.length) { this.pending = cue; this.cue = null; return; }
    this.idx = 0;
    this.playNext(cue, list, cue !== 'victory');
  }

  playNext(cue, list, loop) {
    if (this.cue !== cue) return;
    const name = list[this.idx % list.length]; this.idx++;
    const b = this.buf[name];
    const c = this.ctx, t = c.currentTime;
    const s = c.createBufferSource(); s.buffer = b;
    const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(1, t + 0.8);
    s.connect(g).connect(this.mBus); s.start(t);
    const tr = { s, g, stop: (fade) => { const n = c.currentTime; g.gain.cancelScheduledValues(n); g.gain.setValueAtTime(g.gain.value, n); g.gain.exponentialRampToValueAtTime(0.0001, n + fade); s.stop(n + fade + 0.1); } };
    this.track = tr;
    if (!loop) return;
    // overlap the next take before this one's faded tail
    const len = Math.max(2, b.duration - 1.6);
    this.nextT = setTimeout(() => { if (this.track === tr) { tr.stop(1.5); this.track = null; this.playNext(cue, list, loop); } }, len * 1000);
  }
}
