// The DOM side: HUD, tower menus, banners, boss bar, screens.
import { WEAPONS, WEAPON_ORDER, LAYERS, LAYER_ORDER, LAYER_COST, SELL_BACK, GADGETS } from './data.js';

const $ = (id) => document.getElementById(id);

export class UI {
  constructor(audio) {
    this.audio = audio;
    this.icons = {};
    this.game = null;
    this._bannerT = 0;
    this.menuPad = null;
    $('b-next').addEventListener('click', () => { const g = this.game; if (!g || g.over) return; if (g.wave < g.waveTotal && (g.state === 'prep' || g.countdown > 0)) { g.startWave(); this.audio.sfx('tick'); } });
    $('b-speed').addEventListener('click', () => { const g = this.game; if (!g) return; g.speedMul = g.speedMul === 1 ? 2 : g.speedMul === 2 ? 3 : 1; $('b-speed').textContent = g.speedMul + 'x'; this.audio.sfx('tick'); });
    $('b-gadget1').addEventListener('click', () => this.game && this.game.arm(1));
    $('b-gadget2').addEventListener('click', () => this.game && this.game.arm(2));
    $('menu-close').addEventListener('click', () => this.game && this.game.deselect());
    // keep taps on the HUD from reaching the counter
    for (const id of ['bottombar', 'menu', 'topbar']) $(id).addEventListener('pointerdown', (e) => e.stopPropagation());
  }

  show(id, on = true) { $(id).classList.toggle('hidden', !on); }

  hud(g) {
    $('crumbs').textContent = g.crumbs;
    $('bites').textContent = g.lives;
    $('wave').textContent = Math.max(1, g.wave);
    $('waves').textContent = g.waveTotal === Infinity ? '∞' : g.waveTotal;
    $('score').textContent = g.score.toLocaleString('en-US');
    if (this.menuPad) this.renderMenu(g, this.menuPad, true);
  }

  tick(g) {
    // the next wave button
    const b = $('b-next'), small = $('next-bonus');
    let label = 'NEXT WAVE', sub = '';
    if (g.over) { label = '...'; }
    else if (g.state === 'prep') { label = g.wave === 0 ? 'START' : 'NEXT WAVE'; sub = g.nextPreview(); }
    else if (g.countdown > 0) { label = `WAVE ${g.wave + 1} IN ${Math.ceil(g.countdown)}`; sub = `now: +${Math.ceil(g.countdown * 1.5)} crumbs | ${g.nextPreview()}`; }
    else if (g.wave >= g.waveTotal) { label = g.endless ? 'HOLD ON' : 'LAST WAVE'; sub = `${g.enemies.length} olives left`; }
    else { label = `WAVE ${g.wave}`; sub = `${g.enemies.length + g.spawnQ.length} olives`; }
    if (b.dataset.l !== label) { b.firstChild.nodeValue = label; b.dataset.l = label; }
    if (small.textContent !== sub) small.textContent = sub;
    const can = !g.over && g.wave < g.waveTotal && (g.state === 'prep' || g.countdown > 0);
    b.classList.toggle('off', !can);
    b.classList.toggle('pulse', can && (g.state === 'prep'));
    // the gadgets
    const cd = (slot, key, el) => {
      const G = GADGETS[key]; if (!G) return;
      const f = g.gcd[slot] / G.cd;
      el.querySelector('.cd').style.height = (f * 100).toFixed(1) + '%';
      el.classList.toggle('cooling', f > 0);
    };
    cd('swat', 'swat', $('b-gadget1'));
    if (g.stage.gadget) cd('g2', g.stage.gadget, $('b-gadget2'));
    if (this._crumbs !== g.crumbs) { this._crumbs = g.crumbs; $('crumbs').textContent = g.crumbs; if (this.menuPad) this.renderMenu(g, this.menuPad, true); }
  }

  setGadgets(key) {
    const g2 = $('b-gadget2');
    g2.classList.toggle('hidden', !key);
    if (key) { g2.querySelector('.gl').textContent = GADGETS[key].name; const ic = this.icons['g_' + key]; g2.querySelector('.gi').style.backgroundImage = ic ? `url(${ic})` : ''; }
    const ic1 = this.icons.g_swat; $('b-gadget1').querySelector('.gi').style.backgroundImage = ic1 ? `url(${ic1})` : '';
  }

  armed(which, hint) {
    $('b-gadget1').classList.toggle('armed', which === 1);
    $('b-gadget2').classList.toggle('armed', which === 2);
    this.hint(hint);
  }

  hint(text, ms = 0) {
    const h = $('hint'); h.textContent = text || ''; h.classList.toggle('on', !!text);
    clearTimeout(this._hintT);
    if (ms) this._hintT = setTimeout(() => h.classList.remove('on'), ms);
  }

  banner(title, sub = '', ms = 1800) {
    const b = $('banner');
    b.innerHTML = '';
    b.append(document.createTextNode(title));
    if (sub) { const s = document.createElement('small'); s.textContent = sub; b.append(s); }
    b.classList.add('on');
    clearTimeout(this._bannerT);
    this._bannerT = setTimeout(() => b.classList.remove('on'), ms);
  }

  toast(msg, ms = 1600) {
    const t = $('toast'); t.textContent = msg; t.classList.add('on');
    clearTimeout(this._toastT); this._toastT = setTimeout(() => t.classList.remove('on'), ms);
  }

  flash() {
    const f = $('fade');
    f.style.background = '#c0301f'; f.style.transition = 'none'; f.style.opacity = '0.28';
    requestAnimationFrame(() => { f.style.transition = 'opacity .45s'; f.style.opacity = '0'; setTimeout(() => { f.style.background = ''; f.style.transition = ''; }, 500); });
  }

  boss(name, frac) {
    if (!name) { this.show('bossbar', false); return; }
    this.show('bossbar', true);
    $('bossname').textContent = name;
    $('bossfill').style.width = (frac * 100).toFixed(1) + '%';
  }

  openMenu(g, pad) { this.menuPad = pad; this.renderMenu(g, pad); this.show('menu', true); this.hint(''); }
  closeMenu() { this.menuPad = null; this.show('menu', false); }

  renderMenu(g, pad, quiet) {
    const items = $('menu-items'), title = $('menu-title');
    items.innerHTML = '';
    const mk = (cls, img, n, d, c, on) => {
      const b = document.createElement('button'); b.className = 'mi ' + cls;
      if (img) { const i = document.createElement('img'); i.src = img; i.alt = ''; b.append(i); }
      const nn = document.createElement('div'); nn.className = 'n'; nn.textContent = n; b.append(nn);
      if (d) { const dd = document.createElement('div'); dd.className = 'd'; dd.textContent = d; b.append(dd); }
      if (c !== null) { const cc = document.createElement('div'); cc.className = 'c'; cc.textContent = c; b.append(cc); }
      b.addEventListener('click', (e) => { e.stopPropagation(); on && on(); });
      items.append(b);
      return b;
    };
    const t = pad.tower;
    if (!t) {
      title.innerHTML = 'BUILD A SANDWICH<small>a weapon on a slice of bread</small>';
      for (const k of WEAPON_ORDER) {
        const w = WEAPONS[k];
        const unlocked = g.unlocked(k);
        const b = mk(unlocked ? (g.crumbs >= w.cost ? '' : 'no') : 'locked', this.icons[k], w.name, unlocked ? w.short : `stage ${w.unlock}`, unlocked ? w.cost : null, () => {
          if (!unlocked) { this.toast(`Unlocks at stage ${w.unlock}`); return; }
          if (g.crumbs < w.cost) { this.toast('Not enough crumbs'); this.audio.sfx('nope'); return; }
          g.build(pad, k).then(() => g.select(pad));
        });
        b.addEventListener('pointerenter', () => unlocked && g.previewRange(pad, w.range));
      }
      if (!quiet) g.previewRange(pad, null);
    } else {
      const w = WEAPONS[t.weapon], s = g.statsOf(t);
      const n = t.layers.length;
      const stack = t.layers.map((l) => LAYERS[l].name).join(' + ') || 'just bread';
      title.innerHTML = '';
      title.append(document.createTextNode(`${w.name.toUpperCase()}${t.club ? '  • CLUB' : ''}`));
      const sm = document.createElement('small'); sm.textContent = `${stack}  |  dmg ${s.dmg.toFixed(0)}  rate ${s.rate.toFixed(1)}/s  range ${s.range.toFixed(1)}`; title.append(sm);
      if (n < 3) {
        const cost = LAYER_COST[n];
        for (const l of LAYER_ORDER) {
          const L = LAYERS[l];
          const willClub = n === 2 && new Set([...t.layers, l]).size === 3;
          mk(g.crumbs >= cost ? '' : 'no', this.icons[l], `+ ${L.name}`, willClub ? `${L.short}, makes a CLUB!` : L.short, cost, () => {
            if (g.crumbs < cost) { this.toast('Not enough crumbs'); this.audio.sfx('nope'); return; }
            g.addLayer(t, l); g.select(pad);
          });
        }
      } else {
        mk('', this.icons.flag, t.club ? 'CLUB' : 'Full stack', t.club ? '+25% to everything' : 'three layers is the most a sandwich can take', null, null);
      }
      const pr = { first: 'FIRST', strong: 'STRONGEST', close: 'CLOSEST' };
      mk('', null, `Aim: ${pr[t.priority]}`, 'tap to change', null, () => { t.priority = t.priority === 'first' ? 'strong' : t.priority === 'strong' ? 'close' : 'first'; this.renderMenu(g, pad); });
      mk('sell', null, 'Sell', 'eat it', `+${Math.floor(t.spent * SELL_BACK)}`, () => g.sell(t));
    }
  }
}
