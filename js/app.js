/* Site interactions */
(() => {
  'use strict';
  const D = CONTENT;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const root = document.documentElement;
  const store = {
    get(k, d) { try { const v = localStorage.getItem('phelo:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('phelo:' + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  const safe = (name, fn) => { try { fn(); } catch (e) { console.warn('[' + name + ']', e); } };
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  let calm = store.get('calm', null);
  if (calm === null) calm = mqReduce.matches;

  /* ---------------- ZONES ---------------- */
  const WORK = ['reactor', 'lab', 'field', 'lead', 'skills', 'vault', 'output', 'cv', 'next'];
  const ZONES = [
    { id: 'home', name: 'Home', sub: 'The grid at night', buddy: null },
    { id: 'origin', name: 'Origin', sub: 'About me', buddy: null },
    { id: 'journey', name: 'Journey', sub: 'Around the globe', buddy: null },
    { id: 'reactor', name: 'Reactor', sub: 'Education', buddy: { pose: 'read', expr: 'focus', prop: 'paper' },
      say: ['Four schools. One very busy core.', 'Select a ring. I’ll pretend I remember every lecture.', 'Each ring took a few years and a lot of coffee.'] },
    { id: 'lab', name: 'Lab', sub: 'Projects & research', buddy: { pose: 'tablet', expr: 'focus', prop: 'tablet' },
      say: ['Welcome to the lab. Please don’t touch the transformer.', 'Open the microgrid. It cut operating costs 32%, on paper.', 'The results are real. The lab coat is imaginary.'] },
    { id: 'field', name: 'Field station', sub: 'Experience', buddy: { pose: 'tablet', expr: 'happy', prop: 'tablet', hat: 'hardhat' },
      say: ['Hard hat on. Safety first, then solar.', 'Flip a breaker. They’re all rated for curiosity.'] },
    { id: 'lead', name: 'Leadership', sub: 'People & training', buddy: { pose: 'point', expr: 'happy' },
      say: ['Leadership is power distribution, with feelings.', 'Four of four milestones. Fully charged.', 'Click the slides. I promise there’s no quiz.'] },
    { id: 'skills', name: 'Skills', sub: 'Tools & software', buddy: { pose: 'think', expr: 'focus' },
      say: ['No “Python 97%” here. 97% of what?', 'Pick a tool. I’ll tell you where I actually used it.'] },
    { id: 'vault', name: 'Archive', sub: 'Publications', buddy: { pose: 'read', expr: 'focus', prop: 'paper' },
      say: ['One published, one cooking.', 'Peer reviewed. Mostly by Reviewer 2.'] },
    { id: 'output', name: 'Power output', sub: 'Achievements', buddy: { pose: 'celebrate', expr: 'proud', prop: 'trophy' },
      say: ['Trophy room. I promise I’m humble.', 'Started in 2019 with a water filter. Escalated from there.'] },
    { id: 'cv', name: 'Terminal', sub: 'CV', buddy: { pose: 'point', expr: 'soft' },
      say: ['The serious version. Recruiters, this one’s for you.', 'The download button is right there. No captcha.'] },
    { id: 'offduty', name: 'Off duty', sub: 'Interests', buddy: null },
    { id: 'ram', name: 'Lounge', sub: 'Fun facts', buddy: null },
    { id: 'next', name: 'Forecast', sub: 'Now & next', buddy: { pose: 'think', expr: 'focus' },
      say: ['Solid line: done. Dashed line: working on it.', 'Forecasts come with error bars. So do I.'] },
    { id: 'contact', name: 'Transmission', sub: 'Contact', buddy: { pose: 'transmit', expr: 'happy', prop: 'radio' },
      say: ['Signal’s strong. Say hi.', 'Every good connection starts with a signal. Yours is next.'] }
  ];
  const ZI = Object.fromEntries(ZONES.map((z, i) => [z.id, i]));
  const TRANS = {
    'journey>reactor': 'All that walking. Time to study.',
    'lab>field': 'From simulation to the real world. Grab a hard hat.',
    'field>lead': 'From hard hats to people skills.',
    'lead>skills': 'Now, the technical toolbox.',
    'field>skills': 'Let me empty my pockets.',
    'skills>vault': 'Now, the paperwork.',
    'vault>output': 'Papers in, medals out.',
    'output>cv': 'Okay, serious face. Recruiter mode.',
    'ram>next': 'Back to work. The future won’t optimize itself.',
    'offduty>next': 'Back to work. The future won’t optimize itself.',
    'next>contact': 'If the forecast looks good, send a signal.',
    'cv>field': 'Want the full story behind a line? Flip a breaker.',
    'lab>reactor': 'Back to school? Brave.'
  };

  const state = { cur: null, prev: null, visits: {}, seen: new Set(store.get('seen', [])), ach: new Set(store.get('ach', [])), pokes: 0, overload: false, tired: false };

  /* ---------------- TOASTS & ACHIEVEMENTS ---------------- */
  const ACH = {
    explorer: ['Grid fully energized', 'You visited every zone.', '⚡'],
    poke: ['Persistent poker', 'You poked the engineer six times.', '!'],
    ball: ['Secret ball found', 'There’s always a football somewhere.', '⚽'],
    overload: ['Overload mode', 'Who touched the main breaker?', '⚡'],
    gator: ['Florida local', 'You spotted the gator.', '🐊'],
    tired: ['Engineer is tired', 'Leave him long enough and he naps.', 'z'],
    goal: ['Top corner', 'Your first goal at the pitch.', '⚽'],
    facts: ['Fully loaded', 'You read every fact in memory.', '★']
  };
  function toast(title, text, icon = '★') {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<i aria-hidden="true">${esc(icon)}</i><span><b>${esc(title)}</b>${esc(text)}</span>`;
    $('#toasts').append(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 450); }, 3600);
  }
  function unlock(key) {
    const a = ACH[key];
    if (!a) return;
    const first = !state.ach.has(key);
    state.ach.add(key); store.set('ach', [...state.ach]);
    toast((first ? 'Achievement: ' : '') + a[0], a[1], a[2]);
  }

  /* ---------------- COMPANION ---------------- */
  const buddy = { el: $('#buddy'), btn: $('#buddyCh'), bubble: $('#buddyBubble'), svg: null, timer: 0, back: 0, hidden: store.get('buddyHidden', false), intro: false };
  function buddyInit() {
    buddy.btn.innerHTML = Character.svg({ pose: 'wave', expr: 'happy', cls: 'buddy-svg' });
    buddy.svg = buddy.btn.querySelector('svg');
    buddy.el.classList.add('away');
    if (buddy.hidden) { buddy.el.hidden = true; $('#buddyShow').hidden = false; }
    buddy.btn.addEventListener('click', () => poke(buddy.svg, say));
    $('#buddyHide').addEventListener('click', () => { buddy.hidden = true; store.set('buddyHidden', true); buddy.el.hidden = true; $('#buddyShow').hidden = false; $('#buddyShow').focus(); });
    $('#buddyShow').addEventListener('click', () => { buddy.hidden = false; store.set('buddyHidden', false); buddy.el.hidden = false; $('#buddyShow').hidden = true; dress(state.cur); say('I’m back. Did I miss anything?'); });
  }
  function say(text, ms = 4200) {
    if (!text) return;
    buddy.bubble.textContent = text;
    buddy.bubble.classList.add('show');
    clearTimeout(buddy.timer);
    buddy.timer = setTimeout(() => buddy.bubble.classList.remove('show'), innerWidth < 760 ? Math.min(ms, 3000) : ms);
  }
  function dress(id) {
    const z = ZONES[ZI[id]];
    if (!z || !z.buddy) { buddy.el.classList.add('away'); buddy.bubble.classList.remove('show'); return false; }
    const b = z.buddy;
    Character.setGear(buddy.svg, { hat: b.hat || '', prop: b.prop || '' });
    Character.setPose(buddy.svg, b.pose);
    Character.setFace(buddy.svg, b.expr);
    buddy.svg.classList.remove('waving');
    buddy.el.classList.remove('away');
    return true;
  }
  function poke(svg, speak) {
    const R = [
      { pose: 'wave', expr: 'wink', s: 'Hey! That’s me.', a: 'waving' },
      { pose: 'confused', expr: 'confused', s: 'Yes? Can I help you?' },
      { pose: 'celebrate', expr: 'happy', s: 'Okay, okay. I’m awake.', a: 'jump' },
      { pose: 'stand', expr: 'wow', s: 'That tickles. Electrically.', a: 'shake' },
      { pose: 'confused', expr: 'confused', s: 'I’m going to need you to stop poking the engineer.' },
      { pose: 'celebrate', expr: 'proud', s: 'Fine. You found an easter egg.', a: 'jump' }
    ];
    const r = R[state.pokes % R.length];
    state.pokes++;
    if (state.pokes === 6) unlock('poke');
    const before = svg.dataset.pose, face = svg.querySelector('.ch-face')?.dataset.expr || 'happy';
    Character.setPose(svg, r.pose); Character.setFace(svg, r.expr);
    svg.classList.remove('waving', 'jump', 'shake'); void svg.getBBox;
    if (r.a) { svg.classList.add(r.a); setTimeout(() => svg.classList.remove(r.a), 2000); }
    speak(r.s, 2800);
    clearTimeout(svg._back);
    svg._back = setTimeout(() => {
      if (svg === buddy.svg && state.cur && ZONES[ZI[state.cur]].buddy) { dress(state.cur); return; }
      Character.setPose(svg, before); Character.setFace(svg, face);
    }, 2600);
  }

  /* ---------------- NAVIGATION ---------------- */
  function go(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const jump = () => { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'instant' }); try { history.replaceState(null, '', '#' + id); } catch (e) { /* sandboxed */ } };
    if (calm) { jump(); return; }
    const t = $('#travel');
    t.classList.remove('go'); void t.offsetWidth; t.classList.add('go');
    setTimeout(jump, 240);
    setTimeout(() => t.classList.remove('go'), 650);
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-go]');
    if (!a) return;
    e.preventDefault();
    go(a.dataset.go);
  });

  function railInit() {
    $('#rail').innerHTML = ZONES.map(z => `<a href="#${z.id}" data-go="${z.id}" data-z="${z.id}"><i></i><span>${esc(z.name)}</span></a>`).join('');
  }
  let railFlash = 0, railLast = '';
  function railUpdate() {
    const i = ZI[state.cur] ?? 0;
    if (state.cur && state.cur !== railLast) {
      railLast = state.cur;
      const z = ZONES[ZI[state.cur]];
      $('#markZone').textContent = z ? z.name : '';
      $('.hud').classList.toggle('in-zone', state.cur !== 'home');
      $('#rail').classList.add('flash'); clearTimeout(railFlash);
      railFlash = setTimeout(() => $('#rail').classList.remove('flash'), 2400);
    }
    $('#rail').style.setProperty('--fill', (i / (ZONES.length - 1) * 100) + '%');
    $('#rail').style.setProperty('--fillN', (i / (ZONES.length - 1)).toFixed(4));
    $$('#rail a').forEach(a => { a.classList.toggle('now', a.dataset.z === state.cur); a.classList.toggle('seen', state.seen.has(a.dataset.z)); a.toggleAttribute('aria-current', a.dataset.z === state.cur); });
    const hb = $('#homeBtn'); if (hb) hb.hidden = !state.cur || state.cur === 'home';
    const n = state.seen.size, N = ZONES.length;
    $('#hudCount').textContent = `Explored ${n} of ${N}`;
    $('#heroStatus').textContent = n <= 1 ? 'Grid online. Scroll to start exploring.' : `Grid online. ${n} of ${N} zones explored.`;
    $('#footExplore').textContent = n === N ? 'You explored every zone. The grid is fully energized.' : `You’ve explored ${n} of ${N} zones.`;
  }

  function mapRender() {
    const tall = innerWidth < 600;
    const pos = tall
      ? ZONES.map((z, i) => { const r = Math.floor(i / 3), c = i % 3; return [[62, 180, 298][r % 2 ? 2 - c : c], 44 + r * 118]; })
      : [[90, 80], [270, 80], [450, 80], [630, 80], [810, 80], [900, 210], [720, 210], [540, 210], [360, 210], [180, 210], [90, 340], [270, 340], [450, 340], [630, 340], [810, 340]];
    let d = `M${pos[0][0]} ${pos[0][1]}`;
    pos.slice(1).forEach(p => { d += ` L${p[0]} ${p[1]}`; });
    const svg = `<svg viewBox="${tall ? '0 0 360 600' : '0 0 1000 420'}" role="group" aria-label="Map of the zones">
      <path d="${d}" fill="none" stroke="#24406b" stroke-width="4"/><path class="pulse" d="${d}" fill="none" stroke="#46d9ff" stroke-width="4"/>
      ${ZONES.map((z, i) => `<g class="map-node ${state.seen.has(z.id) ? 'seen' : ''} ${z.id === state.cur ? 'now' : ''}" data-id="${z.id}" tabindex="0" role="button" aria-label="Travel to ${esc(z.name)}: ${esc(z.sub)}">
        <circle cx="${pos[i][0]}" cy="${pos[i][1]}" r="30" fill="transparent"/><circle class="n" cx="${pos[i][0]}" cy="${pos[i][1]}" r="15"/>
        <text x="${pos[i][0]}" y="${pos[i][1] + 40}" text-anchor="middle">${esc(z.name)}</text><text class="s" x="${pos[i][0]}" y="${pos[i][1] + 57}" text-anchor="middle">${esc(z.sub)}</text></g>`).join('')}
    </svg>`;
    $('#mapBody').innerHTML = svg;
    $('#mapCount').textContent = `${state.seen.size} of ${ZONES.length} explored. Green means visited.`;
  }
  function mapInit() {
    const dlg = $('#mapDlg');
    $('#mapBtn').addEventListener('click', () => { mapRender(); dlg.showModal(); });
    const travel = el => { const id = el.dataset.id; dlg.close(); go(id); };
    $('#mapBody').addEventListener('click', e => { const n = e.target.closest('.map-node'); if (n) travel(n); });
    $('#mapBody').addEventListener('keydown', e => { const n = e.target.closest('.map-node'); if (n && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); travel(n); } });
  }
  function dialogsInit() {
    $$('dialog').forEach(d => {
      d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) d.close(); });
    });
  }

  /* ---------------- ZONE TRACKING ---------------- */
  function enterZone(id) {
    if (id === state.cur) return;
    state.prev = state.cur; state.cur = id;
    state.visits[id] = (state.visits[id] || 0) + 1;
    state.seen.add(id); store.set('seen', [...state.seen]);
    railUpdate();
    const z = ZONES[ZI[id]];
    const shown = !buddy.hidden && dress(id);
    let line = TRANS[`${state.prev}>${id}`] || '';
    if (!line && z.say) line = state.visits[id] > 1 ? pick([`Back in the ${z.name.toLowerCase()}? It missed you.`, ...z.say]) : z.say[0];
    if (shown) {
      if (!buddy.intro) { buddy.intro = true; say('Hi, I’m Phelo. I’ll tag along from here.', 3000); setTimeout(() => say(line), 3200); }
      else setTimeout(() => say(line), 350);
    }
    if (id === 'ram') loungeEnter();
    if (id === 'offduty') offEnter();
    if (state.seen.size === ZONES.length && !state.ach.has('explorer')) unlock('explorer');
  }
  function observeZones() {
    const io = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) enterZone(e.target.dataset.zone); }); }, { rootMargin: '-48% 0px -48% 0px' });
    $$('.zone').forEach(z => io.observe(z));
    const live = new IntersectionObserver(es => { es.forEach(e => { e.target.dataset.live = e.isIntersecting ? '1' : '0'; }); }, { rootMargin: '150px' });
    $$('.zone').forEach(z => live.observe(z));
  }

  /* ---------------- HOME ---------------- */
  const hero = { ch: null, core: null, clicks: [] };
  function homeInit() {
    $$('[data-fill]').forEach(el => { const v = D[el.dataset.fill]; if (v) el.textContent = v; });
    const name = $('.hero-name');
    let i = 0;
    name.innerHTML = D.name.split(' ').map(w => `<span class="w">${[...w].map(ch => `<span class="l" style="--i:${i++}">${esc(ch)}</span>`).join('')}</span>`).join(' ');
    name.setAttribute('aria-label', D.name);
    $('#heroSky').innerHTML = Scenes.heroSky();
    $('#heroGround').innerHTML = Scenes.ground();
    $('#core').innerHTML = Scenes.heroCore();
    $('#heroCh').innerHTML = Character.svg({ pose: 'stand', expr: 'happy', back: 'backpack', label: 'Illustrated Phelo with a backpack, standing in front of a glowing data center' }) + '<div class="say hero-say" id="heroSay"></div>';
    hero.ch = $('#heroCh svg');
    const heroSay = (t, ms = 3000) => { const b = $('#heroSay'); b.textContent = t; b.classList.add('show'); clearTimeout(b._t); b._t = setTimeout(() => b.classList.remove('show'), ms); };
    hero.say = heroSay;
    $('#heroCh').addEventListener('click', () => poke(hero.ch, heroSay));
    setTimeout(() => { waveOnce(hero.ch); heroSay('Welcome to my world. Pick a door, or just scroll.', 4200); }, 1400);
    setInterval(() => { if (state.cur === 'home' && !calm && !state.tired) waveOnce(hero.ch); }, 11000);
    const core = $('#core');
    $('#home').addEventListener('pointermove', e => {
      if (calm) return;
      const r = core.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * 0.45;
      const k = Math.min(1, Math.hypot(e.clientX - cx, e.clientY - cy) / 650);
      core.style.setProperty('--heat', (1 - k).toFixed(2));
    });
    core.addEventListener('click', () => {
      core.classList.remove('burst'); void core.offsetWidth; core.classList.add('burst');
      const now = Date.now();
      hero.clicks = hero.clicks.filter(t => now - t < 4000); hero.clicks.push(now);
      if (hero.clicks.length >= 5) { hero.clicks = []; toggleOverload(); }
      else heroSay(pick(['Careful, that data center runs on curiosity.', 'Load rising…', 'Cooling fans at max.', 'One more and I’m not responsible.']), 1800);
    });
    motes();
  }
  function waveOnce(svg) {
    const before = svg.dataset.pose;
    Character.setPose(svg, 'wave'); svg.classList.add('waving');
    setTimeout(() => { svg.classList.remove('waving'); Character.setPose(svg, before === 'wave' ? 'stand' : before); }, 2300);
  }
  function motes() {
    const c = $('#motes'), ctx = c.getContext('2d');
    let W = 0, H = 0, P = [];
    const cols = ['70,217,255', '67,235,160', '255,181,71'];
    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = c.clientWidth; H = c.clientHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      P = Array.from({ length: Math.round(Math.min(70, W / 22)) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + .6, v: Math.random() * .35 + .12, a: Math.random() * .6 + .2, c: cols[Math.random() < .7 ? 0 : Math.random() < .6 ? 1 : 2], w: Math.random() * Math.PI * 2 }));
    };
    size(); addEventListener('resize', size);
    const tick = () => {
      requestAnimationFrame(tick);
      if (calm || $('#home').dataset.live === '0') return;
      ctx.clearRect(0, 0, W, H);
      const sp = state.overload ? 4 : 1;
      for (const p of P) {
        p.y -= p.v * sp; p.w += .02; p.x += Math.sin(p.w) * .3;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        ctx.beginPath(); ctx.fillStyle = `rgba(${p.c},${p.a})`; ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
        ctx.beginPath(); ctx.fillStyle = `rgba(${p.c},${p.a * .15})`; ctx.arc(p.x, p.y, p.r * 4, 0, 6.283); ctx.fill();
      }
    };
    tick();
  }

  /* ---------------- ORIGIN ---------------- */
  function originInit() {
    $('#room').innerHTML = Scenes.room(D.links.photo);
    const roomCh = $('#room .ch-room');
    const room = $('#room');
    $('#chapters').innerHTML = D.origin.map((c, i) => `<article class="chapter" data-i="${i}"><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></article>`).join('');
    const colors = ['#ffd76a', '#9be8c4', '#9fd6ff', '#ffb3a0'];
    $('#values').innerHTML = D.values.map((v, i) => `<li style="--c:${colors[i % 4]};--r:${[-2, 1.5, -1, 2][i % 4]}deg">${esc(v)}</li>`).join('');
    const map = { type: ['type', 'focus', ''], wave: ['sitwave', 'wink', ''], think: ['sitthink', 'focus', ''], sitcoffee: ['sitcoffee', 'soft', 'mug'] };
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        $$('.chapter').forEach(c => c.classList.toggle('on', c === e.target));
        const c = D.origin[+e.target.dataset.i]; const m = map[c.scene] || map.type;
        Character.setGear(roomCh, { prop: m[2] }); Character.setPose(roomCh, m[0]); Character.setFace(roomCh, m[1]);
        roomCh.classList.toggle('waving', c.scene === 'wave');
        room.dataset.pin = c.pin || ''; room.dataset.glow = c.glow || '';
      });
    }, { rootMargin: '-42% 0px -42% 0px' });
    $$('.chapter').forEach(c => io.observe(c));
    $('.chapter')?.classList.add('on');
    const openPhoto = () => { $('#photoImg').src = D.links.photo; $('#photoDlg').showModal(); };
    const pol = $('#room .polaroid');
    pol.addEventListener('click', openPhoto);
    pol.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPhoto(); } });
    roomCh.style.cursor = 'pointer';
    roomCh.addEventListener('click', () => poke(roomCh, say));
  }

  /* ---------------- JOURNEY ---------------- */
  const gl = { idx: -1 };
  function journeyInit() {
    const L = D.journey, N = L.length, stage = $('#glStage'), cv = $('#globe'), card = $('#glCard');
    $('#glStops').innerHTML = L.map((l, i) => `<li><button data-i="${i}"><b>${esc(l.level)}</b><small>${esc(l.when)}</small></button></li>`).join('');
    const hasGeo = !!(window.d3 && d3.geoOrthographic && typeof WORLD !== 'undefined');
    const ctx = cv.getContext('2d');
    const proj = hasGeo ? d3.geoOrthographic().clipAngle(90).precision(0.6) : null;
    const path = hasGeo ? d3.geoPath(proj, ctx) : null;
    const grat = hasGeo ? d3.geoGraticule10() : null;
    const HI = new Set(['818', '840']);
    const st = { rot: [-12, -18, 0], k: 0.78, fly: null, prog: 1, spin: false, drag: null, raf: 0, W: 0, H: 0, started: false, play: 0 };
    gl.st = st;

    function legs(upto) { const out = []; for (let k = 1; k <= upto; k++) { const a = L[k - 1].geo, b = L[k].geo; if (a && b && (a[0] !== b[0] || a[1] !== b[1])) out.push([a, b, k]); } return out; }
    function size() {
      const r = stage.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
      st.W = Math.max(1, Math.round(r.width)); st.H = Math.max(1, Math.round(r.height));
      cv.width = st.W * dpr; cv.height = st.H * dpr; cv.style.width = st.W + 'px'; cv.style.height = st.H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
    }
    function draw() {
      if (!hasGeo) return;
      const { W, H } = st, cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 * 0.86 * st.k;
      proj.translate([cx, cy]).scale(R).rotate(st.rot);
      ctx.clearRect(0, 0, W, H);
      let g = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.22);
      g.addColorStop(0, 'rgba(70,217,255,.38)'); g.addColorStop(1, 'rgba(70,217,255,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.22, 0, 6.2832); ctx.fill();
      g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.05, cx, cy, R);
      g.addColorStop(0, '#174a8a'); g.addColorStop(1, '#05132e');
      ctx.beginPath(); path({ type: 'Sphere' }); ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); path(grat); ctx.strokeStyle = 'rgba(120,180,255,.10)'; ctx.lineWidth = 0.6; ctx.stroke();
      ctx.beginPath(); for (const f of WORLD.features) if (!HI.has(f.id)) path(f);
      ctx.fillStyle = '#1a3a63'; ctx.fill(); ctx.strokeStyle = 'rgba(127,227,255,.28)'; ctx.lineWidth = 0.6; ctx.stroke();
      ctx.beginPath(); for (const f of WORLD.features) if (HI.has(f.id)) path(f);
      ctx.fillStyle = '#1d6656'; ctx.fill(); ctx.strokeStyle = 'rgba(67,235,160,.75)'; ctx.lineWidth = 1.1; ctx.stroke();
      ctx.beginPath(); path({ type: 'Sphere' }); ctx.strokeStyle = 'rgba(127,227,255,.45)'; ctx.lineWidth = 1.2; ctx.stroke();
      const cur = gl.idx;
      legs(cur).forEach(([a, b, k]) => {
        let coords = [a, b];
        if (k === cur && st.prog < 1) { const ip = d3.geoInterpolate(a, b); coords = Array.from({ length: 41 }, (_, n) => ip(n / 40 * st.prog)); }
        ctx.beginPath(); path({ type: 'LineString', coordinates: coords });
        ctx.strokeStyle = 'rgba(255,181,71,.35)'; ctx.lineWidth = 7; ctx.stroke();
        ctx.strokeStyle = '#ffcf7a'; ctx.lineWidth = 2.2; ctx.stroke();
        if (k === cur && st.prog < 1) {
          const p = proj(coords[coords.length - 1]);
          if (p && d3.geoDistance(coords[coords.length - 1], [-st.rot[0], -st.rot[1]]) < 1.55) {
            ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.arc(p[0], p[1], 11, 0, 6.2832); ctx.fill();
            ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(p[0], p[1], 4.5, 0, 6.2832); ctx.fill();
          }
        }
      });
      const seen = new Map();
      L.forEach((l, k) => { if (l.geo) { const key = l.geo.join(); if (!seen.has(key)) seen.set(key, { geo: l.geo, city: l.city, ks: [] }); seen.get(key).ks.push(k); } });
      const t = performance.now() / 1000;
      ctx.font = '600 14px "Hanken Grotesk", system-ui, sans-serif'; ctx.textBaseline = 'middle';
      for (const s of seen.values()) {
        if (d3.geoDistance(s.geo, [-st.rot[0], -st.rot[1]]) > 1.5) continue;
        const p = proj(s.geo); if (!p) continue;
        const here = s.ks.includes(cur) && st.prog >= 1, visited = s.ks.some(k => k <= cur);
        const col = here ? '70,217,255' : visited ? '67,235,160' : '170,190,220';
        const pulse = here ? 10 + 6 * Math.sin(t * 3) : 9;
        ctx.fillStyle = `rgba(${col},.22)`; ctx.beginPath(); ctx.arc(p[0], p[1], pulse + 6, 0, 6.2832); ctx.fill();
        ctx.fillStyle = `rgb(${col})`; ctx.beginPath(); ctx.arc(p[0], p[1], 5, 0, 6.2832); ctx.fill();
        ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(3,8,20,.85)'; ctx.strokeText(s.city, p[0] + 12, p[1] - 12);
        ctx.fillStyle = here ? '#fff' : '#cfe0ff'; ctx.fillText(s.city, p[0] + 12, p[1] - 12);
      }
    }
    function tick(now) {
      st.raf = 0;
      let more = false;
      if (st.fly) {
        const f = st.fly, u = f.dur ? Math.min(1, (now - f.t0) / f.dur) : 1;
        const e = u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
        st.rot = [f.from[0] + (f.to[0] - f.from[0]) * e, f.from[1] + (f.to[1] - f.from[1]) * e, 0];
        st.k = f.k0 + (f.k1 - f.k0) * e - f.dip * Math.sin(Math.PI * u);
        st.prog = e;
        if (u >= 1) { st.fly = null; st.prog = 1; arrived(); } else more = true;
      }
      if (st.spin && !st.drag && !calm) { st.rot[0] += 0.12; more = true; }
      if (gl.idx >= 0 && L[gl.idx].geo && !calm && $('#journey').dataset.live !== '0') more = true;
      draw();
      if (more && !document.hidden) loop();
    }
    function loop() { if (!st.raf) st.raf = requestAnimationFrame(tick); }
    const tag = $('#glTag');
    function arrived() {
      const l = L[gl.idx];
      tag.textContent = l.geo ? `You are here: ${l.city}` : 'Next stop: not decided yet';
      tag.classList.add('show');
      const trav = $('#glCard .gl-trav svg');
      if (trav) { trav.classList.add('waving'); Character.setPose(trav, 'wave'); setTimeout(() => { trav.classList.remove('waving'); Character.setPose(trav, 'stand'); }, 2200); }
    }
    function renderCard(i) {
      const l = L[i], s = Scenes.SKIES[l.id] || Scenes.SKIES[l.art] || Scenes.SKIES.next, gc = Scenes.GROUNDS[l.id] || Scenes.GROUNDS[l.art] || '#0b1426';
      card.innerHTML = `<div class="gl-post" style="--s1:${s[0]};--s2:${s[1]};--s3:${s[2]};--gc:${gc}">${Scenes.levelArt(l.art || l.id)}
          <div class="gl-trav">${Character.svg({ pose: 'stand', expr: l.future ? 'wow' : 'happy', back: 'backpack', hat: l.gear === 'hardhat' ? 'hardhat' : '' })}</div></div>
        <div class="gl-body"><span class="lv-num">Stop ${i + 1} of ${N}${l.future ? ' · not booked yet' : ''}</span>
          <h3>${esc(l.level)}</h3><p class="lv-title">${esc(l.title)}</p><p class="lv-meta">${esc(l.when)} · ${esc(l.place)}</p>
          <ul class="${l.future ? 'future' : ''}">${l.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
          ${l.unlocked.length ? `<div class="unlocks" aria-label="Unlocked">${l.unlocked.map(u => `<span>${esc(u)}</span>`).join('')}</div>` : ''}</div>`;
      $$('#glStops button').forEach((b, k) => { b.toggleAttribute('aria-current', k === i); b.classList.toggle('done', k < i); });
      $('#glPrev').disabled = i === 0;
      $('#glNext').disabled = i === N - 1;
      $('#glNext').textContent = i < N - 1 ? `Next: ${L[i + 1].level === '?' ? 'the unknown' : L[i + 1].level}` : 'End of the road, for now';
      $('#glQ').classList.toggle('show', !!l.future);
    }
    function flyTo(i) {
      i = clamp(i, 0, N - 1);
      if (i === gl.idx && !st.fly) return;
      const prev = gl.idx; gl.idx = i; renderCard(i);
      const l = L[i];
      tag.classList.remove('show');
      if (prev >= 0 && l.geo) { tag.textContent = `Flying to ${l.city}…`; tag.classList.add('show'); }
      if (!hasGeo) { arrived(); return; }
      const to = l.geo ? [-l.geo[0], -l.geo[1] + 8, 0] : [st.rot[0] - 70, -15, 0];
      const from = st.rot.slice(); let dl = to[0] - from[0]; dl = ((dl % 360) + 540) % 360 - 180; to[0] = from[0] + dl;
      const a = prev >= 0 ? L[prev].geo : null, b = l.geo;
      const dist = a && b ? d3.geoDistance(a, b) : 0.8;
      const dur = calm ? 0 : Math.round(1500 + dist * 900);
      st.fly = { t0: performance.now(), dur, from, to, k0: st.k, k1: l.geo ? 1 : 0.74, dip: Math.min(0.42, 0.1 + dist * 0.2) };
      st.prog = (prev === i - 1) ? 0 : 1;
      st.spin = !l.geo;
      loop();
    }
    gl.flyTo = flyTo;
    const phone = matchMedia('(max-width: 760px)');
    const reveal = () => {
      if (!phone.matches) return;
      const top = stage.getBoundingClientRect().top, hud = 96;
      if (top < hud || top > innerHeight * 0.35) window.scrollTo({ top: scrollY + top - hud, behavior: calm ? 'auto' : 'smooth' });
    };
    $('#glPrev').addEventListener('click', () => { stopPlay(); flyTo(gl.idx - 1); reveal(); });
    $('#glNext').addEventListener('click', () => { stopPlay(); flyTo(gl.idx + 1); reveal(); });
    $('#glStops').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { stopPlay(); flyTo(+b.dataset.i); reveal(); } });
    function stopPlay() { clearInterval(st.play); st.play = 0; $('#glPlay').setAttribute('aria-pressed', 'false'); $('#glPlay').textContent = 'Play the tour'; }
    $('#glPlay').addEventListener('click', () => {
      if (st.play) { stopPlay(); return; }
      $('#glPlay').setAttribute('aria-pressed', 'true'); $('#glPlay').textContent = 'Pause the tour';
      if (gl.idx >= N - 1) flyTo(0); else flyTo(gl.idx + 1);
      st.play = setInterval(() => { if (gl.idx >= N - 1) { stopPlay(); return; } flyTo(gl.idx + 1); }, 5200);
    });
    $('#journey').addEventListener('keydown', e => {
      if (e.target.closest('input, textarea')) return;
      if (e.key === 'ArrowRight') { stopPlay(); flyTo(gl.idx + 1); } else if (e.key === 'ArrowLeft') { stopPlay(); flyTo(gl.idx - 1); }
    });
    cv.addEventListener('pointerdown', e => { if (!hasGeo) return; st.drag = { x: e.clientX, y: e.clientY, r: st.rot.slice() }; st.fly = null; st.prog = 1; cv.setPointerCapture(e.pointerId); stage.classList.add('grabbing'); });
    cv.addEventListener('pointermove', e => { if (!st.drag) return; const d = st.drag; st.rot = [d.r[0] + (e.clientX - d.x) * 0.35, clamp(d.r[1] - (e.clientY - d.y) * 0.35, -75, 75), 0]; draw(); });
    const end = () => { st.drag = null; stage.classList.remove('grabbing'); loop(); };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
    card.addEventListener('click', e => { if (e.target.closest('.gator')) unlock('gator'); });
    new ResizeObserver(size).observe(stage);
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting && !st.started) { st.started = true; setTimeout(() => flyTo(0), calm ? 0 : 350); } }, { threshold: 0.35 });
    io.observe(stage);
    renderCard(0); gl.idx = -1;
    gl.redraw = () => { loop(); };
    if (!hasGeo) stage.classList.add('no-globe');
  }

  /* ---------------- REACTOR ---------------- */
  const RX_C = { stem: '#ffd76a', zewail: '#43eba0', unl: '#7aa7ff', uf: '#ff9a3c' };
  function reactorInit() {
    const E = D.education, R = [96, 148, 200, 252];
    let s = `<svg viewBox="0 0 600 600" role="group" aria-label="Reactor diagram: four rings around a core, from high school at the center to the University of Florida on the outside">
      <defs><radialGradient id="rxCore" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="#9fe9ff"/><stop offset=".8" stop-color="#2d6bff"/><stop offset="1" stop-color="#0d2a6b"/></radialGradient>
      <radialGradient id="rxGlow"><stop offset="0" stop-color="#46d9ff" stop-opacity=".45"/><stop offset="1" stop-color="#46d9ff" stop-opacity="0"/></radialGradient></defs>
      <circle cx="300" cy="300" r="290" fill="url(#rxGlow)" opacity=".5"/>`;
    E.forEach((e, i) => {
      const c = RX_C[e.id] || '#46d9ff', r = R[i];
      s += `<g class="rx-ring" data-i="${i}"><circle class="band" cx="300" cy="300" r="${r}" fill="none" stroke="${c}" stroke-width="10" opacity=".35"/>
        <circle cx="300" cy="300" r="${r}" fill="none" stroke="transparent" stroke-width="40"/>
        <g class="rx-orbit" style="--d:${18 + i * 9}s;animation-direction:${i % 2 ? 'reverse' : 'normal'}"><circle cx="300" cy="${300 - r}" r="20" fill="${c}" opacity=".18"/><circle cx="300" cy="${300 - r}" r="8" fill="#fff" stroke="${c}" stroke-width="4"/></g>
        <text x="300" y="${300 + r + 5}" font-family="Hanken Grotesk, sans-serif" font-size="14" font-weight="700" fill="${c}" text-anchor="middle" stroke="#061230" stroke-width="6" paint-order="stroke">${esc(e.short)}</text></g>`;
    });
    s += `<circle class="rx-core" cx="300" cy="300" r="52" fill="url(#rxCore)"/><text x="300" y="306" text-anchor="middle" font-family="Anybody, sans-serif" font-weight="800" font-size="16" fill="#04122a">curiosity</text></svg>`;
    $('#rxFig').innerHTML = s;
    $('#rxTabs').innerHTML = E.map((e, i) => `<button role="tab" id="rxt${i}" aria-controls="rxDetail" aria-selected="false" style="--c:${RX_C[e.id]}" data-i="${i}">${esc(e.short)}</button>`).join('');
    const sel = i => {
      const e = E[i], c = RX_C[e.id];
      $$('#rxTabs button').forEach((b, k) => { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; });
      $$('.rx-ring').forEach((g, k) => g.classList.toggle('sel', k === i));
      const d = $('#rxDetail'); d.style.setProperty('--c', c); d.setAttribute('aria-labelledby', 'rxt' + i);
      d.innerHTML = `<h3>${esc(e.name)}</h3><p class="deg">${esc(e.degree)}</p><p class="meta">${esc(e.when)} · ${esc(e.where)}</p><ul>${e.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>`;
    };
    $('#rxTabs').addEventListener('click', e => { const b = e.target.closest('button'); if (b) sel(+b.dataset.i); });
    $('#rxTabs').addEventListener('keydown', e => {
      const cur = $$('#rxTabs button').findIndex(b => b.getAttribute('aria-selected') === 'true');
      const n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (n) { e.preventDefault(); const k = (cur + n + E.length) % E.length; sel(k); $('#rxt' + k).focus(); }
    });
    $('#rxFig').addEventListener('click', e => { const g = e.target.closest('.rx-ring'); if (g) sel(+g.dataset.i); });
    sel(E.length - 1);
    $('#fuel').innerHTML = D.coursework.map(g => `<li class="fuel-g"><h4>${esc(g.group)}</h4><ul>${g.items.map(c => `<li>${esc(c)}</li>`).join('')}</ul></li>`).join('');
    const nC = D.coursework.reduce((t, g) => t + g.items.length, 0); $('#fuelNote').textContent = `${nC} courses across electrical, mechanical, thermal, control and energy engineering.`;
    moreToggle($('#fuel').parentElement, $('#fuel'), `Show all ${nC} courses`, 'Show fewer courses');
    $('#secretBall').addEventListener('click', () => { $('#secretBall').hidden = true; rollBall(); unlock('ball'); say('You found my ball! I’ve been looking everywhere.'); });
  }

  /* ---------------- LAB ---------------- */
  function labInit() {
    $('#bench').innerHTML = D.projects.map((p, i) => `<button class="station" data-i="${i}" aria-haspopup="dialog">
      <span class="art">${Scenes.station(p.art)}</span>
      <span class="plate"><small>${esc(p.status)}</small><b>${esc(p.title)}</b><span class="open">Open the experiment</span></span></button>`).join('');
    $('#bench').addEventListener('click', e => { const b = e.target.closest('.station'); if (b) openProject(+b.dataset.i); });
    let lastCat = '';
    const rows = D.logbook.map(l => {
      const head = l.cat && l.cat !== lastCat ? `<tr class="lb-cat"><th colspan="3" scope="colgroup">${esc(l.cat)}</th></tr>` : '';
      lastCat = l.cat || lastCat;
      const name = l.url ? `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.name)}</a>` : esc(l.name);
      return head + `<tr><td>${name}</td><td>${esc(l.what)}</td><td>${esc(l.tools)}</td></tr>`;
    }).join('');
    $('#logbook tbody').innerHTML = rows + `<tr class="classified"><td>Experiment #5</td><td>Classified. <button class="linkbtn" id="exp5">Try to open it</button></td><td>Unknown</td></tr>`;
    let nb = 0;
    $$('#logbook tbody tr').forEach(tr => { if (!tr.classList.contains('lb-cat') && !tr.classList.contains('classified')) nb++; if (nb > 4 || (nb === 4 && tr.classList.contains('lb-cat'))) tr.classList.add('lb-more'); });
    moreToggle($('#logbook').parentElement, $('#logbook'), `Show all ${D.logbook.length} builds`, 'Show fewer builds');
    $('#exp5').addEventListener('click', () => {
      const lines = ['Error 404: experiment not found. Probably still in my head.', 'Segmentation fault (idea dumped).', 'It worked on my machine.', 'Simulation diverged. Reducing time step… and expectations.', 'Access denied. Even I don’t have clearance.'];
      if (!buddy.hidden) { Character.setPose(buddy.svg, 'confused'); Character.setFace(buddy.svg, 'confused'); setTimeout(() => dress(state.cur), 2600); }
      say(pick(lines), 3200);
    });
  }
  function openProject(i) {
    const p = D.projects[i];
    const imgs = (p.images || []).map(src => `<img src="${esc(src)}" alt="${esc(p.title)}" loading="lazy">`).join('');
    const links = (p.links || []).filter(l => l.url).map(l => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('');
    $('#projBody').innerHTML = `<div class="proj"><button class="x" data-close aria-label="Close project">×</button>
      <div class="proj-vis">${Scenes.station(p.art)}${imgs}</div>
      <div class="proj-body"><span class="tag">${esc(p.status)}${p.when ? ' · ' + esc(p.when) : ''}</span><h2 id="projTitle">${esc(p.title)}</h2><p>${esc(p.overview)}</p>
        <h3>The problem</h3><p>${esc(p.problem)}</p>
        <h3>My part</h3><p>${esc(p.contribution)}</p>
        <h3>How</h3><ol>${p.method.map(m => `<li>${esc(m)}</li>`).join('')}</ol>
        <h3>Results</h3><div class="readouts">${p.results.map(r => `<div><b>${esc(r.v)}</b><span>${esc(r.l)}</span></div>`).join('')}</div>
        ${p.note ? `<p style="margin-top:12px">${esc(p.note)}</p>` : ''}
        <h3>Tools</h3><div class="chips">${p.tools.map(t => `<span>${esc(t)}</span>`).join('')}</div>
        ${links ? `<div class="proj-links">${links}</div>` : ''}</div></div>`;
    $('#projDlg').showModal();
    $('#projDlg .x').focus();
  }

  /* ---------------- FIELD ---------------- */
  function fieldInit() {
    $('#fieldSky').innerHTML = Scenes.fieldSky();
    const brk = (x, i) => `<button class="brk" role="switch" aria-checked="false" data-i="${i}"><span class="lever" aria-hidden="true"></span><span><b>${esc(x.short || x.org)}</b><small>${esc(x.when)}</small></span><span class="lamp" aria-hidden="true"></span></button>`;
    $('#bkWork').innerHTML = D.experience.map((x, i) => x.bank === 'work' ? brk(x, i) : '').join('');

    const sel = i => {
      const x = D.experience[i];
      $$('.brk').forEach(b => b.setAttribute('aria-checked', +b.dataset.i === i));
      $('#feeder').innerHTML = `<span class="when">Feeder live · ${esc(x.when)}</span><h3>${esc(x.org)}</h3><p class="role">${esc(x.role)}</p>
        <ul>${x.did.map(d => `<li>${esc(d)}</li>`).join('')}</ul><div class="chips">${x.skills.map(s => `<span>${esc(s)}</span>`).join('')}</div>`;
    };
    $('.gear').addEventListener('click', e => { const b = e.target.closest('.brk'); if (b) sel(+b.dataset.i); });
    sel(0);
  }

  /* ---------------- LEADERSHIP ---------------- */
  function leadInit() {
    const Ld = D.leadership, people = D.experience.map((x, i) => ({ ...x, i })).filter(x => x.bank === 'people');
    $('#ldScene').innerHTML = Scenes.trainerRoom();
    const scene = $('#ldScene'), tch = $('#ldScene .ch-trainer');
    let s = 0;
    const showSlide = k => {
      s = (k + Ld.slides.length) % Ld.slides.length;
      $('#trSlide').innerHTML = Scenes.trainerSlide(s, Ld.slides[s]);
      $('#ldSlideNo').textContent = `Slide ${s + 1} of ${Ld.slides.length}: ${Ld.slides[s]}`;
      scene.classList.toggle('qa', s === Ld.slides.length - 1);
      Character.setPose(tch, s === Ld.slides.length - 1 ? 'wave' : 'point');
      tch.classList.toggle('waving', s === Ld.slides.length - 1);
    };
    $('#ldNext').addEventListener('click', () => showSlide(s + 1));
    scene.addEventListener('click', () => showSlide(s + 1));
    showSlide(0);
    const T = Ld.trainer;
    $('#ldCert').innerHTML = `<svg class="seal" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 2l5 6 8-2 2 8 8 2-2 8 6 5-6 5 2 8-8 2-2 8-8-2-5 6-5-6-8 2-2-8-8-2 2-8-6-5 6-5-2-8 8-2 2-8 8 2z" fill="#ffb547"/><circle cx="32" cy="32" r="17" fill="#1b0e07" opacity=".2"/><path d="M34 18 24 35h8l-2 12 11-18h-8z" fill="#1b0e07"/></svg>
      <div><small>${esc(T.by)} · ${esc(T.when)}</small><b>${esc(T.title)}</b><span>${esc(T.how)}</span></div>`;
    const A = Ld.aspire;
    $('#ldAspire').innerHTML = `<h3>${esc(A.program)}</h3><p class="sub">${esc(A.name)} · ${esc(A.when)}</p>
      <div class="batt" role="list" aria-label="Leadership milestones, all completed"><span class="cap" aria-hidden="true"></span>
        ${A.milestones.map((m, k) => ({ m, k })).reverse().map(({ m, k }) => `<div class="bcell" role="listitem" style="--i:${k}"><b>${k + 1}</b><span>${esc(m)}</span></div>`).join('')}</div>
      <p class="charged">Charged: ${A.milestones.length} of ${A.milestones.length} milestones</p>
      <ul class="ld-skills">${A.skills.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { $('#ldAspire').classList.add('go'); io.disconnect(); } }, { threshold: 0.4 });
    io.observe($('#ldAspire'));
    $('#ldReach').innerHTML = Ld.reach.map(r => `<div><b>${esc(r.v)}</b><span>${esc(r.l)}</span></div>`).join('');
    const narrow = matchMedia('(max-width: 600px)');
    let cur = people[0].i;
    const drawGraph = () => {
      const node = (p, x, y, lx, ly, anchor, hit) => `<g class="ld-node${p.i === cur ? ' sel' : ''}" data-i="${p.i}" tabindex="0" role="button" aria-label="${esc(p.role)}, ${esc(p.org)}">
        ${hit}<circle class="dot" cx="${x}" cy="${y}" r="12"/>
        <text x="${lx}" y="${ly}" text-anchor="${anchor}">${esc(p.short || p.org)}</text></g>`;
      const wire = (d) => `<path class="pulse" d="${d}" stroke="#ffb547" stroke-width="2.4" fill="none"/><path d="${d}" stroke="rgba(255,181,71,.25)" stroke-width="1.4" fill="none"/>`;
      const hub = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="42" fill="#ffb547" opacity=".15"/><circle cx="${cx}" cy="${cy}" r="30" fill="#2a1a10" stroke="#ffb547" stroke-width="3"/>
        <text x="${cx}" y="${cy + 5}" text-anchor="middle" font-family="Anybody, sans-serif" font-weight="800" font-size="15" fill="#ffd9a8">Phelo</text>`;
      if (narrow.matches) {
        const top = 108, gap = 46, bx = 44, H = top + (people.length - 1) * gap + 30;
        $('#ldGraph').innerHTML = `<svg class="ld-bus" viewBox="0 0 340 ${H}" role="group" aria-label="Leadership and community roles">
          ${wire(`M${bx} 72 V${top + (people.length - 1) * gap}`)}
          ${people.map((p, k) => wire(`M${bx} ${top + k * gap} H${bx + 32}`)).join('')}
          ${hub(bx, 44)}
          ${people.map((p, k) => { const y = top + k * gap; return node(p, bx + 44, y, bx + 66, y + 5, 'start', `<rect x="${bx + 24}" y="${y - 22}" width="${336 - bx - 24}" height="44" fill="transparent"/>`); }).join('')}
        </svg>`;
      } else {
        const cx = 320, cy = 210, n = people.length;
        const nodes = people.map((p, k) => { const a = -Math.PI / 2 + k * 2 * Math.PI / n; return { p, x: +(cx + Math.cos(a) * 250).toFixed(1), y: +(cy + Math.sin(a) * 160).toFixed(1) }; });
        $('#ldGraph').innerHTML = `<svg viewBox="0 0 640 420" role="group" aria-label="Leadership and community roles">
          ${nodes.map(({ x, y }) => wire(`M${cx} ${cy} L${x} ${y}`)).join('')}
          ${hub(cx, cy)}
          ${nodes.map(({ p, x, y }) => node(p, x, y, x, (y + (y > cy ? 32 : -20)).toFixed(1), 'middle', `<circle cx="${x}" cy="${y}" r="22" fill="transparent"/>`)).join('')}
        </svg>`;
      }
    };
    const sel = (i, tapped) => {
      cur = i;
      const x = D.experience[i];
      $$('.ld-node').forEach(g => g.classList.toggle('sel', +g.dataset.i === i));
      $('#ldPanel').innerHTML = `<span class="when">${esc(x.when)}</span><h3>${esc(x.role)}</h3><p class="role">${esc(x.org)}</p>
        <ul>${x.did.map(d => `<li>${esc(d)}</li>`).join('')}</ul><div class="chips">${x.skills.map(k => `<span>${esc(k)}</span>`).join('')}</div>`;
      if (tapped && narrow.matches) $('#ldPanel').scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'nearest' });
    };
    drawGraph();
    narrow.addEventListener('change', drawGraph);
    $('#ldGraph').addEventListener('click', e => { const g = e.target.closest('.ld-node'); if (g) sel(+g.dataset.i, true); });
    $('#ldGraph').addEventListener('keydown', e => { const g = e.target.closest('.ld-node'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sel(+g.dataset.i, true); } });
    sel(cur);
  }

  function moreToggle(box, target, more, less) {
    box.classList.add('clampable', 'clamped');
    const b = document.createElement('button');
    b.className = 'btn more-btn'; b.type = 'button'; b.textContent = more; b.setAttribute('aria-expanded', 'false');
    target.after(b);
    b.addEventListener('click', () => {
      const open = box.classList.toggle('clamped') === false;
      b.textContent = open ? less : more; b.setAttribute('aria-expanded', String(open));
      if (!open) box.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
    });
  }

  /* ---------------- SKILLS ---------------- */
  const SK_C = { energy: '#43eba0', ai: '#46d9ff', sw: '#7aa7ff', ctl: '#c49bff', media: '#ffb547' };
  function skillsInit() {
    const all = [];
    $('#bags').innerHTML = D.skills.map(b => `<div class="bag" style="--c:${SK_C[b.key]}"><h3><i aria-hidden="true"></i>${esc(b.cat)}</h3><div class="slots">${b.items.map(it => {
      const k = all.push({ ...it, cat: b.cat, c: SK_C[b.key] }) - 1;
      return `<button class="slot ${it.used.length ? 'used' : ''}" aria-pressed="false" data-k="${k}" aria-label="${esc(it.n)}"><b>${esc(it.s)}</b><small>${esc(it.n)}</small></button>`;
    }).join('')}</div></div>`).join('') + `<p class="legend">A dot means I’ve used it in a project you can find on this site.</p>`;
    let last = 0;
    const sel = k => {
      const it = all[k];
      $$('.slot').forEach(s => s.setAttribute('aria-pressed', +s.dataset.k === k));
      const card = $('#itemCard'); card.style.setProperty('--c', it.c);
      card.innerHTML = `<div class="sym">${esc(it.s)}</div><h3>${esc(it.n)}</h3><p class="cat">${esc(it.cat)}</p><h4>Where I’ve used it</h4>${it.used.length ? `<ul>${it.used.map(u => `<li>${esc(u)}</li>`).join('')}</ul>` : `<p class="none">In the toolkit. No project on this site shows it off yet.</p>`}`;
      if (state.cur === 'skills' && Date.now() - last > 2500) { last = Date.now(); say(`Equipped: ${it.n}.`, 2000); }
    };
    const one = matchMedia('(max-width: 1100px)'), inv = $('#itemCard').parentElement;
    $('#bags').addEventListener('click', e => {
      const b = e.target.closest('.slot'); if (!b) return;
      sel(+b.dataset.k);
      const card = $('#itemCard');
      if (one.matches) {
        const bag = b.closest('.bag');
        if (card.previousElementSibling !== bag) bag.after(card);
        card.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'nearest' });
      }
    });
    one.addEventListener('change', () => { if (!one.matches && $('#itemCard').parentElement !== inv) inv.append($('#itemCard')); });
    sel(0);
  }

  /* ---------------- VAULT ---------------- */
  function vaultInit() {
    $('#drawer').innerHTML = D.publications.map(p => {
      const draft = p.status !== 'Published';
      return `<article class="record ${draft ? 'draft' : ''}" data-tab="${esc(p.status)}"><span class="stamp" aria-hidden="true">${esc(p.status)}</span>
        <div><h3>${esc(p.title)}</h3><div class="meta">
          ${p.authors ? `<span><b>Authors:</b> ${esc(p.authors)}</span>` : ''}${p.venue ? `<span><b>Journal:</b> ${esc(p.venue)}</span>` : ''}
          ${p.date ? `<span><b>Date:</b> ${esc(p.date)}</span>` : ''}<span><b>Status:</b> ${esc(p.status)}</span>
          ${p.doi ? `<span><b>DOI:</b> <a href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener">${esc(p.doi)}</a></span>` : ''}</div>
          <p class="sum">${esc(p.abstract || p.summary)}</p>
          ${p.pdf || p.doi ? `<div class="rec-actions">${p.pdf ? `<button class="btn primary" data-pdf="${esc(p.pdf)}" data-title="${esc(p.title)}">Read the paper</button><a class="btn" href="${esc(p.pdf)}" download>Download PDF</a>` : ''}${p.doi ? `<a class="btn ${p.pdf ? '' : 'primary'}" href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener">${p.pdf ? 'Journal page' : 'Read it at the journal'}</a>` : ''}</div>` : ''}</div>
        <div><h4>My contribution</h4><ul>${p.mine.map(m => `<li>${esc(m)}</li>`).join('')}</ul></div></article>`;
    }).join('');
  }

  /* ---------------- OUTPUT ---------------- */
  const KIND = {
    medal: ['#ffd76a', 'Medal', '<svg viewBox="0 0 24 24"><path d="M7 2h4l1 5-3 2zM17 2h-4l-1 5 3 2z"/><circle cx="12" cy="15" r="6"/></svg>'],
    trophy: ['#ff9a3c', 'Competition', '<svg viewBox="0 0 24 24"><path d="M6 3h12v4a6 6 0 0 1-12 0zM10 14h4v3h3v3H7v-3h3z"/><path d="M4 4h2v4H4a2 2 0 0 1 0-4zM18 4h2a2 2 0 0 1 0 4h-2z"/></svg>'],
    scholar: ['#46d9ff', 'Scholarship & selection', '<svg viewBox="0 0 24 24"><path d="M12 3 1 9l11 6 9-4.9V17h2V9z"/><path d="M5 13v4c0 2 3.5 4 7 4s7-2 7-4v-4l-7 3.8z"/></svg>']
  };
  function outputInit() {
    const A = D.achievements, cols = D.achievementCols.map(c => c[0]), colName = Object.fromEntries(D.achievementCols);
    $('#outputLede').textContent = `${A.length} awards, medals and scholarships since ${D.achievementCols[0][1]}, stacked by year. Select a cell for the story.`;
    $('#cols').innerHTML = cols.map(c => `<div class="col">${A.map((a, i) => a.col === c ? `<button class="cell" style="--c:${KIND[a.kind][0]}" aria-pressed="false" data-i="${i}" aria-label="${esc(a.t)}">${KIND[a.kind][2]}</button>` : '').join('')}<span>${esc(colName[c])}</span></div>`).join('');
    const sel = i => {
      const a = A[i];
      $$('.cell').forEach(c => c.setAttribute('aria-pressed', +c.dataset.i === i));
      $('#readout').innerHTML = `<span class="k">${esc(colName[a.col])} · ${esc(KIND[a.kind][1])}</span><h3>${esc(a.t)}</h3><p>${esc(a.d)}</p>
        <div class="keyrow">${Object.values(KIND).map(k => `<span style="--c:${k[0]}"><i></i>${esc(k[1])}</span>`).join('')}</div>`;
    };
    $('#cols').addEventListener('click', e => { const b = e.target.closest('.cell'); if (b) sel(+b.dataset.i); });
    sel(0);
  }

  /* ---------------- CV TERMINAL ---------------- */
  function cvInit() {
    $('#cvDownload').href = D.links.cv;
    const ex = D.experience, item = (t, d, sub, li) => `<div class="cv-item"><div class="top"><b>${esc(t)}</b><span class="d">${esc(d)}</span></div>${sub ? `<div class="sub">${esc(sub)}</div>` : ''}${li && li.length ? `<ul>${li.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}</div>`;
    const S = {
      summary: ['Summary', () => `<p>${esc(D.summary)}</p><h4 style="margin:18px 0 6px">Research interests</h4><ul class="cv-item" style="border:0;padding:0">${D.interestsResearch.map(x => `<li>${esc(x)}</li>`).join('')}</ul><p style="margin-top:14px">${esc(D.lookingFor)}</p>`],
      education: ['Education', () => D.education.slice().reverse().map(e => item(`${e.degree}, ${e.name}`, e.when, e.where, e.notes)).join('')],
      research: ['Research experience', () => item('Graduate Researcher, TEA Lab, University of Florida', 'Nov 2026 – now', 'PI: Dr. Ivan Ruchkin', ex.find(x => x.id === 'tea').did) + item('Research Intern, Power & Energy Lab, University of Nebraska–Lincoln', 'Aug – Dec 2023', '', ex.find(x => x.id === 'unl').did.concat(['Joined the lab on my own initiative: the first student from the Egyptian exchange cohort to do research there'])) + item('Undergraduate thesis: AI-based EMS for a hybrid electro-thermal microgrid', '2024 – 2025', 'Zewail City · Supervisor: Dr. Amgad A. El-Deib · Team lead', D.projects[0].method.concat(['32% lower operating cost, 20,000+ t/yr CO₂ reduction, 7.7-year payback']))],
      experience: ['Work experience', () => ex.filter(x => x.bank === 'work' && x.id !== 'unl' && x.id !== 'tea').map(x => item(`${x.role}, ${x.org}`, x.when, '', x.did)).join('')],
      projects: ['Projects', () => D.projects.map(p => item(p.title, p.when, p.status, [p.overview])).join('') + D.logbook.map(l => item(l.name, '', l.tools, [l.what])).join('')],
      publications: ['Publications', () => D.publications.map(p => item(p.title, p.date || p.status, [p.authors, p.venue, p.doi ? 'DOI: ' + p.doi : ''].filter(Boolean).join(' · '), p.mine)).join('')],
      awards: ['Awards & achievements', () => { const cn = Object.fromEntries(D.achievementCols); return D.achievements.map(a => item(a.t, cn[a.col], '', [a.d])).join(''); }],
      leadership: ['Leadership, teaching & community', () => ex.filter(x => x.bank === 'people').map(x => item(`${x.role}, ${x.org}`, x.when, '', x.did)).join('')],
      skills: ['Technical skills', () => `<dl class="cv-skills">${D.cvSkills.map(b => `<dt>${esc(b.cat)}</dt><dd>${esc(b.text)}</dd>`).join('')}</dl>`],
      coursework: ['Related coursework', () => `<dl class="cv-skills">${D.coursework.map(g => `<dt>${esc(g.group)}</dt><dd>${g.items.map(esc).join(', ')}</dd>`).join('')}</dl>`]
    };
    const keys = Object.keys(S);
    $('#cmds').innerHTML = keys.map(k => `<button data-k="${k}">${k}</button>`).join('');
    const show = k => {
      $$('#cmds button').forEach(b => b.setAttribute('aria-current', b.dataset.k === k));
      $('#termOut').innerHTML = `<p class="prompt">phelo@grid:~$ cat ${k}.txt</p><h3>${esc(S[k][0])}</h3>${S[k][1]()}`;
    };
    const paper = () => {
      const l = D.links;
      $('#termOut').innerHTML = `<div class="cv-sec cv-paper-head"><h3>${esc(D.name)}</h3><p>${esc(l.email)} · ${esc(l.linkedin.replace(/^https?:\/\/(www\.)?/, ''))} · ${esc(l.github.replace(/^https?:\/\//, ''))}</p></div>` +
        keys.map(k => `<section class="cv-sec"><h3>${esc(S[k][0])}</h3>${S[k][1]()}</section>`).join('');
    };
    $('#cmds').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { show(b.dataset.k); $('#termOut').scrollTop = 0; } });
    $('#paperBtn').addEventListener('click', () => {
      const on = $('#paperBtn').getAttribute('aria-pressed') !== 'true';
      $('#paperBtn').setAttribute('aria-pressed', on); $('#paperBtn').textContent = on ? 'Terminal view' : 'Paper view';
      $('#term').classList.toggle('paper', on);
      if (on) paper(); else show('summary');
    });
    show('summary');
  }

  /* ---------------- OFF DUTY ---------------- */
  const off = { ch: null, kicking: false };
  function offInit() {
    $('#offScene').innerHTML = Scenes.offDuty();
    off.ch = $('#offScene .ch-off');
    $('#offLegend').innerHTML = D.interests.map(i => `<li><button data-obj="${i.id}">${esc(i.label)}</button></li>`).join('');
    const pop = $('#offPop');
    const show = t => { pop.textContent = t; pop.classList.add('show'); clearTimeout(pop._t); pop._t = setTimeout(() => pop.classList.remove('show'), 3600); };
    const act = id => {
      const it = D.interests.find(x => x.id === id);
      if (!it) return;
      if (id === 'football') { kick(); show(it.msg); return; }
      show(it.msgs ? pick(it.msgs) : it.msg);
      const poses = { gym: ['celebrate', 'proud'], coffee: ['coffee', 'soft', 'mug'], globe: ['point', 'happy'], robot: ['think', 'focus'], rocket: ['point', 'wow'], music: ['stand', 'proud'], swim: ['wave', 'wink'] };
      const p = poses[id] || ['wave', 'happy'];
      Character.setGear(off.ch, { prop: p[2] || '' }); Character.setPose(off.ch, p[0]); Character.setFace(off.ch, p[1]);
      clearTimeout(off.ch._t); off.ch._t = setTimeout(() => { Character.setGear(off.ch, { prop: '' }); Character.setPose(off.ch, 'stand'); Character.setFace(off.ch, 'happy'); }, 2600);
    };
    $('#offduty').addEventListener('click', e => { const o = e.target.closest('[data-obj]'); if (o) act(o.dataset.obj); else if (e.target.closest('.od-ch')) act('football'); });
    $('#offScene').addEventListener('keydown', e => { const o = e.target.closest('.obj'); if (o && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); act(o.dataset.obj); } });
    off.show = show;
    const sc = $('#offScene'); requestAnimationFrame(() => { if (sc.scrollWidth > sc.clientWidth) sc.scrollLeft = (sc.scrollWidth - sc.clientWidth) * .55; });
  }
  function offEnter() {
    const from = state.prev;
    const t = from === 'cv' ? 'Recruiters gone? Good. Let’s play.' : WORK.includes(from) ? 'Off duty. Laptop closed. Mostly.' : 'Welcome to the fun part. Click the ball.';
    setTimeout(() => off.show && off.show(t), 500);
  }
  function kick() {
    if (off.kicking) return;
    off.kicking = true;
    const ball = $('#offScene .ball'), gol = $('#offScene .gol');
    Character.setPose(off.ch, 'kick'); Character.setFace(off.ch, 'wow');
    const done = () => {
      Character.setPose(off.ch, 'celebrate'); Character.setFace(off.ch, 'proud'); off.ch.classList.add('jump');
      gol.classList.add('show');
      if (!state.ach.has('goal')) unlock('goal');
      setTimeout(() => { gol.classList.remove('show'); off.ch.classList.remove('jump'); Character.setPose(off.ch, 'stand'); Character.setFace(off.ch, 'happy'); ball.style.transform = ''; off.kicking = false; }, 2200);
    };
    if (calm || !ball.animate) { setTimeout(done, 300); return; }
    ball.style.transformBox = 'fill-box'; ball.style.transformOrigin = 'center';
    setTimeout(() => {
      const a = ball.animate([{ transform: 'translate(0,0) rotate(0deg)' }, { transform: 'translate(150px,-290px) rotate(380deg)', offset: .5 }, { transform: 'translate(300px,-200px) rotate(720deg)' }], { duration: 900, easing: 'cubic-bezier(.3,.6,.4,1)', fill: 'forwards' });
      a.onfinish = () => { done(); setTimeout(() => a.cancel(), 2100); };
    }, 220);
  }

  /* ---------------- FUN FACTS ---------------- */
  const ram = { ch: null, order: [], pos: 0, t: 0, read: new Set() };
  function ramInit() {
    $('#lounge').insertAdjacentHTML('afterbegin', Scenes.lounge());
    ram.ch = $('#lounge .ch-lounge');
    ram.order = D.facts.map((_, i) => i).sort(() => Math.random() - .5);
    $('#factBtn').addEventListener('click', nextFact);
    ram.ch.addEventListener('click', nextFact);
  }
  function lgSay(t, ms = 3600) { const b = $('#lgBubble'); b.textContent = t; b.classList.add('show'); clearTimeout(b._t); b._t = setTimeout(() => b.classList.remove('show'), ms); }
  function loungeEnter() {
    const t = WORK.includes(state.prev) ? 'Shift’s over. The grid is optimized. I am not.' : state.prev === 'offduty' ? 'That match wore me out.' : 'Shh. Recharging.';
    setTimeout(() => lgSay(t), 400);
  }
  function nextFact() {
    const i = ram.order[ram.pos % ram.order.length]; ram.pos++;
    ram.read.add(i);
    const p = $('#factText'); p.textContent = D.facts[i]; p.classList.remove('flash'); void p.offsetWidth; p.classList.add('flash');
    $('#factCount').textContent = `Fact ${ram.read.size} of ${D.facts.length} loaded`;
    $('#lounge').classList.add('awake');
    const reacts = [['sitcoffee', 'wow', 'mug', 'Huh? Oh, a fact. Here.'], ['sitwave', 'wink', '', 'That one’s true, I swear.'], ['sitthink', 'focus', '', 'Let me think of a better one…'], ['sitcoffee', 'happy', 'mug', 'Okay, I’m awake now.']];
    const r = pick(reacts);
    Character.setGear(ram.ch, { prop: r[2] }); Character.setPose(ram.ch, r[0]); Character.setFace(ram.ch, r[1]);
    ram.ch.classList.toggle('waving', r[0] === 'sitwave');
    lgSay(r[3], 2400);
    clearTimeout(ram.t);
    ram.t = setTimeout(() => { $('#lounge').classList.remove('awake'); Character.setGear(ram.ch, { prop: '' }); Character.setPose(ram.ch, 'doze'); Character.setFace(ram.ch, 'sleep'); ram.ch.classList.remove('waving'); }, 8000);
    if (ram.read.size === D.facts.length && !state.ach.has('facts')) unlock('facts');
  }

  /* ---------------- FORECAST ---------------- */
  function forecastInit() {
    $('#fcDone').innerHTML = D.done.map(x => `<li>${esc(x)}</li>`).join('');
    $('#fcDoing').innerHTML = D.doing.map(x => `<li>${esc(x)}</li>`).join('');
    $('#fcNext').innerHTML = D.next.map(x => `<li>${esc(x)}</li>`).join('');
    $('#looking').textContent = D.lookingFor;
    const s = $('#fcSvg');
    const pts = [[2017.7, .08, 'STEM high school'], [2019.4, .17, 'ICAN gold'], [2020.8, .26, 'Zewail City'], [2023.8, .42, 'Nebraska lab'], [2024.6, .48, 'Elsewedy'], [2025.5, .57, 'B.Eng.'], [2026.45, .64, 'First paper', 1], [2026.7, .67, '']];
    const plan = [[2027.5, .74, 'Summer research'], [2028.4, .82, 'M.S. thesis'], [2030.6, .95, 'A company?']];
    const NOW = 2026.9;
    const draw = () => {
      const W = s.clientWidth, H = s.clientHeight, m = { l: 30, r: 20, t: 26, b: 36 }, narrow = W < 560;
      const X = y => m.l + (y - 2017) / (2031.5 - 2017) * (W - m.l - m.r), Y = v => H - m.b - v * (H - m.t - m.b);
      const path = a => a.map((p, i) => `${i ? 'L' : 'M'}${X(p[0]).toFixed(1)} ${Y(p[1]).toFixed(1)}`).join(' ');
      const nowY = .7, fut = [[NOW, nowY], ...plan];
      const up = fut.map(p => [p[0], p[1] + (p[0] - NOW) * .03]), dn = fut.map(p => [p[0], p[1] - (p[0] - NOW) * .045]);
      const band = path(up) + ' ' + dn.reverse().map(p => `L${X(p[0]).toFixed(1)} ${Y(p[1]).toFixed(1)}`).join(' ') + 'Z';
      let o = '';
      for (let y = 2017; y <= 2031; y += narrow ? 3 : 1) o += `<text x="${X(y)}" y="${H - 12}" text-anchor="middle" font-size="12" fill="#7d8fae">${narrow ? "'" + String(y).slice(2) : y}</text><path d="M${X(y)} ${m.t} V${H - m.b}" stroke="rgba(150,190,255,.07)"/>`;
      o += `<text x="${m.l}" y="${m.t - 8}" font-size="12" fill="#7d8fae">Capability (uncalibrated, illustrative)</text>`;
      o += `<path d="${band}" fill="rgba(255,181,71,.14)" stroke="rgba(255,181,71,.25)"/>`;
      o += `<path d="${path([...pts.map(p => [p[0], p[1]]), [NOW, nowY]])}" fill="none" stroke="#43eba0" stroke-width="3" stroke-linejoin="round"/>`;
      o += `<path d="${path(fut)}" fill="none" stroke="#ffb547" stroke-width="2.6" stroke-dasharray="7 7"/>`;
      o += `<path d="M${X(NOW)} ${m.t} V${H - m.b}" stroke="#46d9ff" stroke-width="1.5"/><text x="${X(NOW) - 6}" y="${H - m.b - 8}" text-anchor="end" font-size="13" font-weight="700" fill="#46d9ff">Now</text>`;
      pts.forEach((p, i) => { const show = p[2] && (!narrow || [0, 3, 5].includes(i)); o += `<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="5" fill="#43eba0"/>` + (show ? `<text x="${X(p[0]) + (p[3] ? -8 : 0)}" y="${Y(p[1]) + (p[3] ? 22 : -12)}" text-anchor="${p[3] ? 'end' : 'middle'}" font-size="12.5" fill="#d5e0f0">${esc(p[2])}</text>` : ''); });
      plan.forEach((p, k) => { if (narrow && k < plan.length - 1) { o += `<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="5" fill="none" stroke="#ffb547" stroke-width="2"/>`; return; } o += `<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="5" fill="none" stroke="#ffb547" stroke-width="2"/><text x="${X(p[0]) + (p[0] > 2030 ? -10 : 0)}" y="${Y(p[1]) + (p[0] > 2030 ? -14 : 28)}" text-anchor="${p[0] > 2030 ? 'end' : 'middle'}" font-size="12.5" fill="#ffd9a8">${esc(p[2])}</text>`; });
      s.setAttribute('viewBox', `0 0 ${W} ${H}`);
      s.innerHTML = o;
    };
    const ro = new ResizeObserver(draw); ro.observe(s);
  }

  /* ---------------- CONTACT ---------------- */
  const IC = {
    mail: '<svg viewBox="0 0 24 24"><path d="M3 5h18v14H3zm2 2v.5l7 4.5 7-4.5V7z"/></svg>',
    in: '<svg viewBox="0 0 24 24"><path d="M4 9h3.6v11H4zM5.8 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.4V20h-3.6v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H10z"/></svg>',
    gh: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M6 2h8l5 5v15H6zm7 1.5V8h4.5zM9 12h7v1.6H9zm0 3.4h7V17H9z"/></svg>',
    sch: '<svg viewBox="0 0 24 24"><path d="M12 3 1 9l11 6 9-4.9V17h2V9z"/></svg>'
  };
  function contactInit() {
    $('#contactSky').innerHTML = Scenes.contactSky();
    const L = D.links, strip = u => u.replace(/^https?:\/\/(www\.)?/, '');
    const rows = [
      ['mail', 'Email', `<a href="mailto:${esc(L.email)}">${esc(L.email)}</a>`, `<button class="copy" data-copy="${esc(L.email)}">Copy</button>`],
      L.linkedin && ['in', 'LinkedIn', `<a href="${esc(L.linkedin)}" target="_blank" rel="noopener">${esc(strip(L.linkedin))}</a>`],
      L.github && ['gh', 'GitHub', `<a href="${esc(L.github)}" target="_blank" rel="noopener">${esc(strip(L.github))}</a>`],
      L.scholar && ['sch', 'Google Scholar', `<a href="${esc(L.scholar)}" target="_blank" rel="noopener">Research profile</a>`],
      L.orcid && ['sch', 'ORCID', `<a href="${esc(L.orcid)}" target="_blank" rel="noopener">${esc(strip(L.orcid))}</a>`],
      L.researchgate && ['sch', 'ResearchGate', `<a href="${esc(L.researchgate)}" target="_blank" rel="noopener">Research profile</a>`],
      ['doc', 'CV', `<span>Two pages, updated November 2026</span>`, `<span class="acts"><button class="copy" data-pdf="cv">View</button><a class="copy" href="${esc(L.cv)}" download style="text-decoration:none;color:inherit;display:inline-flex;align-items:center">Download</a></span>`]
    ].filter(Boolean);
    $('#channels').innerHTML = rows.map(r => `<li><span class="ic" aria-hidden="true">${IC[r[0]]}</span><span class="t"><small>${r[1]}</small>${r[2]}</span>${r[3] || ''}</li>`).join('');
    $('#contact').addEventListener('click', async e => {
      const b = e.target.closest('[data-copy]'); if (!b) return;
      try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = 'Copied'; } catch (err) { b.textContent = 'Select & copy'; }
      setTimeout(() => { b.textContent = 'Copy'; }, 2000);
    });
    $('#composer').addEventListener('submit', e => {
      e.preventDefault();
      const n = $('#cName').value.trim(), msg = $('#cMsg').value.trim();
      if (!msg) { $('#cMsg').focus(); return; }
      const href = `mailto:${L.email}?subject=${encodeURIComponent('Hello from your website' + (n ? ' — ' + n : ''))}&body=${encodeURIComponent(msg + (n ? '\n\n— ' + n : ''))}`;
      const a = document.createElement('a'); a.href = href; a.target = '_blank'; a.rel = 'noopener'; document.body.append(a); a.click(); a.remove();
      $('#composerNote').innerHTML = `Your email app should open with this message ready to send. If it didn’t, write to <b>${esc(L.email)}</b> directly. <button class="copy" type="button" data-copy="${esc(L.email)}">Copy address</button>`;
      say('Signal drafted. Hit send in your email app and I’ll see it.');
    });
  }

  /* ---------------- SECTION NAVIGATION ---------------- */
  const HOME_IC = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2 11.5h3V21h5.5v-6h3v6H19v-9.5h3z"/></svg>';
  function zoneNavInit() {
    ZONES.forEach((z, i) => {
      if (z.id === 'home') return;
      const sec = document.getElementById(z.id), nx = ZONES[i + 1];
      if (!sec) return;
      const nav = document.createElement('nav');
      const inner = { origin: '.origin-text', ram: '.ram-side' }[z.id];
      const own = z.id === 'journey' || z.id === 'contact';
      nav.className = 'zone-nav' + (own ? ' wrap' : '');
      nav.setAttribute('aria-label', `${z.name}: navigation`);
      nav.innerHTML = `<a class="btn home" href="#home" data-go="home">${HOME_IC}<span class="zn-l">Back to home</span></a>` +
        (nx ? `<a class="btn" href="#${nx.id}" data-go="${nx.id}">Next: ${esc(nx.name)}</a>` : '') +
        `<button class="btn" data-summary><span class="zn-long">1-minute summary</span><span class="zn-short">Summary</span></button>`;
      if (z.id === 'contact') sec.querySelector('.contact-grid').after(nav);
      else if (z.id === 'journey') sec.append(nav);
      else (sec.querySelector(inner || ':scope > .wrap:last-of-type') || sec).append(nav);
    });
  }

  /* ---------------- SUMMARY ---------------- */
  function summaryHTML() {
    const L = D.links, W = D.experience.filter(x => x.bank === 'work'), P = D.experience.filter(x => x.bank === 'people');
    const pubs = D.publications, nPub = pubs.filter(p => p.status === 'Published').length, nPrep = pubs.length - nPub;
    const brief = p => p.id === 'ems'
      ? [p.status, ...p.results.map(r => `${r.v.replace(/ t$/, ' tons of').replace(/ yr$/, '-year')} ${r.l}`)].filter(Boolean).join(' · ')
      : `${p.results[0].v} ${p.results[0].l}`;
    const nProj = D.projects.length + D.logbook.length;
    const awards = D.achievements.filter(a => a.kind !== 'scholar');
    const colName = c => (D.achievementCols.find(x => x[0] === c) || [c, c])[1];
    const nums = [
      { k: 'projects', v: `${nProj}+`, l: 'projects in power, energy, AI and design, with more underway in my master’s',
        title: `${nProj}+ projects so far, with more underway`, list: D.projects.map(p => [p.title, brief(p)]).concat(D.logbook.map(x => [x.name, x.tools])) },
      { k: 'scholarships', v: String(D.scholarships.length), l: 'scholarships, from high school to grad school',
        title: 'Scholarships', list: D.scholarships.map(x => [x.t, x.d]) },
      { k: 'awards', v: String(awards.length), l: 'local, national and international awards',
        title: 'Awards: local, national and international', list: awards.map(a => [a.t, a.d.includes(colName(a.col)) ? a.d : `${colName(a.col)} · ${a.d}`]) },
      { k: 'pubs', v: String(nPub), l: `paper${nPub === 1 ? '' : 's'} published${nPrep ? `, ${nPrep} in progress` : ''}`,
        title: 'Publications', list: pubs.map(p => [p.title, p.status === 'Published' ? [p.venue, p.date].filter(Boolean).join(' · ') : p.status]) }
    ];
    summaryHTML.nums = nums;
    const li = (a, b, sub) => `<li><span><b>${esc(a)}</b>${sub ? `<span class="sub">${esc(sub)}</span>` : ''}</span>${b ? `<small>${esc(b)}</small>` : ''}</li>`;
    const sec = (t, body) => `<section class="sum-sec"><h3>${esc(t)}</h3>${body}</section>`;
    const email = `mailto:${L.email}?subject=${encodeURIComponent('Hello from your website')}`;
    const left = [
      sec('Education', `<ul>${['uf', 'zewail', 'unl', 'stem'].map(id => D.education.find(e => e.id === id)).filter(Boolean).map(e => li(e.degree, e.when, e.name)).join('')}</ul>`),
      sec('Experience', `<ul>${W.map(x => li(x.role, x.when, x.org)).join('')}</ul>`),
      sec('Research interests', `<ul>${D.interestsResearch.map(x => `<li><span>${esc(x)}</span></li>`).join('')}</ul>`),
      sec('Leadership & community', `<ul>${P.map(x => li(x.role, x.when, x.org)).join('')}</ul>`),
      sec('Coursework', `<dl>${D.coursework.map(g => `<dt>${esc(g.group)}</dt><dd>${g.items.slice(0, 6).map(esc).join(', ')}${g.items.length > 6 ? '…' : ''}</dd>`).join('')}</dl>`)
    ].join('');
    const right = [
      sec('Selected projects', `<ul>${D.projects.map(p => li(p.title, '', brief(p))).join('')}${D.logbook.slice(0, 3).map(l => li(l.name, '', l.tools)).join('')}</ul>`),
      sec('Publications', `<ul>${pubs.map(p => `<li><span><b>${esc(p.title)}</b><span class="sub">${esc([p.venue, p.date || p.status].filter(Boolean).join(' · '))}</span>${p.pdf ? `<button class="linkbtn" data-pdf="${esc(p.pdf)}" data-title="${esc(p.title)}">Read the paper</button> ` : ''}${p.doi ? `<a href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener">DOI: ${esc(p.doi)}</a>` : ''}</span></li>`).join('')}</ul>`),
      sec('Skills', `<dl>${D.cvSkills.map(b => `<dt>${esc(b.cat)}</dt><dd>${esc(b.text)}</dd>`).join('')}</dl>`),
      sec('Awards & scholarships', `<p>${D.achievements.map(a => esc(a.t)).join(' · ')}</p>`),
      sec('Now & next', `<ul>${D.doing.map(x => li(x, 'now')).join('')}${D.next.map(x => li(x, 'next')).join('')}</ul>`)
    ].join('');
    return `<div class="sum-in">
      <div class="sum-top"><span class="sum-tag">The 1-minute version</span><span class="sum-acts"><button class="btn home" data-sumhome>${HOME_IC}Back to home</button><button class="x" data-close aria-label="Close summary">×</button></span></div>
      <header class="sum-head"><img src="${esc(L.photo)}" alt="${esc(D.name)}" width="120" height="120"><div><h2 id="sumTitle">${esc(D.name)}</h2>
        <p>${esc(D.subtitle)}</p><p class="loc">Gainesville, Florida · ${esc(L.email)}</p></div></header>
      <div class="sum-acts"><button class="btn primary" data-pdf="cv">View my CV (PDF)</button><a class="btn" href="${email}">Email me</a><button class="copy" data-copy="${esc(L.email)}">Copy email</button>
        ${L.linkedin ? `<a class="btn" href="${esc(L.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : ''}${L.github ? `<a class="btn" href="${esc(L.github)}" target="_blank" rel="noopener">GitHub</a>` : ''}</div>
      <div class="sum-nums">${nums.map(n => `<button class="sum-stat" type="button" data-k="${n.k}" aria-expanded="false" aria-controls="sumMore"><b>${esc(n.v)}</b><span>${esc(n.l)}</span><i class="tap">See the list</i></button>`).join('')}</div>
      <div class="sum-more" id="sumMore" hidden></div>
      <p class="sum-lead">${esc(D.summary)}</p>
      <p class="sum-look"><span class="led"></span>${esc(D.lookingFor)}</p>
      <div class="sum-grid"><div>${left}</div><div>${right}</div></div>
      <div class="sum-foot"><p>Want the full story, with the character, the lab and the easter eggs?</p><button class="btn primary" data-sumhome>Explore the full world</button><a class="btn" href="${email}">Email me</a></div>
    </div>`;
  }
  function openSummary() {
    const dlg = $('#sumDlg');
    $('#sumBody').innerHTML = summaryHTML();
    if (!dlg.open) dlg.showModal();
    $('#sumBody').scrollTop = 0;
    try { history.replaceState(null, '', '#summary'); } catch (e) { /* sandboxed */ }
  }
  function summaryInit() {
    const dlg = $('#sumDlg');
    document.addEventListener('click', e => {
      if (e.target.closest('[data-summary]')) { e.preventDefault(); openSummary(); return; }
      if (e.target.closest('[data-sumhome]')) { e.preventDefault(); dlg.close(); go('home'); }
    });
    $('#sumBody').addEventListener('click', e => {
      const t = e.target.closest('.sum-stat'); if (!t) return;
      const more = $('#sumMore'), n = (summaryHTML.nums || []).find(x => x.k === t.dataset.k); if (!n) return;
      const open = t.getAttribute('aria-expanded') === 'true';
      $$('#sumBody .sum-stat').forEach(b => b.setAttribute('aria-expanded', 'false'));
      if (open) { more.hidden = true; return; }
      t.setAttribute('aria-expanded', 'true');
      more.innerHTML = `<h3>${esc(n.title)}</h3><ul>${n.list.map(([a, b]) => `<li><b>${esc(a)}</b>${b ? `<span>${esc(b)}</span>` : ''}</li>`).join('')}</ul>`;
      more.hidden = false;
      more.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'nearest' });
    });
    dlg.addEventListener('close', () => { try { if (location.hash === '#summary') history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* sandboxed */ } });
    $('#heroEmail').href = `mailto:${D.links.email}?subject=${encodeURIComponent('Hello from your website')}`;
    document.addEventListener('click', async e => {
      const b = e.target.closest('#sumDlg [data-copy]'); if (!b) return;
      try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = 'Copied'; } catch (err) { b.textContent = D.links.email; }
      setTimeout(() => { b.textContent = 'Copy email'; }, 2200);
    });
  }

  /* ---------------- PDF VIEWER ---------------- */
  function openPdf(url, title) {
    const open = () => { const a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; document.body.append(a); a.click(); a.remove(); };
    if (innerWidth < 760) { open(); return; }
    $('#pdfTitle').textContent = title;
    $('#pdfOpen').href = url; $('#pdfDown').href = url;
    $('#pdfFrame').src = url;
    $('#pdfDlg').showModal();
  }
  function pdfInit() {
    $('#pdfDlg').addEventListener('close', () => { $('#pdfFrame').src = 'about:blank'; });
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-pdf]'); if (!b) return;
      e.preventDefault();
      const cv = b.dataset.pdf === 'cv';
      openPdf(cv ? D.links.cv : b.dataset.pdf, cv ? `${D.name}: CV` : (b.dataset.title || 'Paper'));
    });
  }

  /* ---------------- EASTER EGGS ---------------- */
  function rollBall() {
    if (calm) return;
    const b = document.createElement('div');
    b.innerHTML = '<svg viewBox="0 0 40 40" width="46" height="46" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#f1f1ec"/><path d="M20 11l8 6-3 9h-10l-3-9z" fill="#1d2433"/></svg>';
    Object.assign(b.style, { position: 'fixed', left: '-60px', bottom: '16px', zIndex: 80, pointerEvents: 'none' });
    document.body.append(b);
    const a = b.animate([{ transform: 'translateX(0) rotate(0)' }, { transform: `translateX(${innerWidth + 120}px) rotate(1080deg)` }], { duration: 2600, easing: 'cubic-bezier(.3,.1,.5,1)' });
    a.onfinish = () => b.remove();
  }
  function toggleOverload() {
    state.overload = !state.overload;
    root.classList.toggle('overload', state.overload);
    if (state.overload) {
      unlock('overload');
      if (hero.say) hero.say('OVERLOAD! Who touched the main breaker?', 3200);
      if (!buddy.hidden && ZONES[ZI[state.cur]]?.buddy) { Character.setPose(buddy.svg, 'celebrate'); Character.setFace(buddy.svg, 'wow'); }
      say('OVERLOAD! Type “overload” again or click the data center 5 times to calm it down.', 4200);
    } else { say('Breaker reset. Everything’s fine. Probably.'); if (state.cur) dress(state.cur); }
  }
  function sleepMode(on) {
    if (on === state.tired) return;
    state.tired = on;
    const zz = buddy.el.querySelector('.zz');
    if (on) {
      if (!buddy.hidden && ZONES[ZI[state.cur]]?.buddy) {
        Character.setGear(buddy.svg, { prop: '' }); Character.setPose(buddy.svg, 'stand'); Character.setFace(buddy.svg, 'sleep');
        buddy.svg.querySelector('.j-head').style.transform = 'rotate(12deg)';
        if (!zz) buddy.el.insertAdjacentHTML('beforeend', '<span class="zz" aria-hidden="true">z z Z</span>');
      }
      if (hero.ch) Character.setFace(hero.ch, 'sleep');
      if (!state.ach.has('tired')) unlock('tired');
    } else {
      zz?.remove();
      if (hero.ch) Character.setFace(hero.ch, 'happy');
      if (state.cur && ZONES[ZI[state.cur]]?.buddy) { dress(state.cur); say(pick(['I was just… optimizing my eyelids.', 'I’m up. I’m up. Where were we?', 'Low-power mode. Sorry. Back now.'])); }
    }
  }
  function eggsInit() {
    const K = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let k = 0, typed = '';
    addEventListener('keydown', e => {
      if (e.target && e.target.closest && e.target.closest('input, textarea, select')) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      k = key === K[k] ? k + 1 : key === K[0] ? 1 : 0;
      if (k === K.length) { k = 0; toggleOverload(); }
      if (key.length === 1) {
        typed = (typed + key).slice(-12);
        if (typed.endsWith('overload')) { typed = ''; toggleOverload(); }
        else if (typed.endsWith('sleep')) { typed = ''; sleepMode(true); }
        else if (typed.endsWith('coffee')) { typed = ''; sleepMode(false); say('Coffee acquired. Systems nominal.'); }
        else if (typed.endsWith('messi')) { typed = ''; rollBall(); say('GOAT detected.'); }
      }
    });
    let idle = 0;
    const wake = () => { clearTimeout(idle); if (state.tired) sleepMode(false); idle = setTimeout(() => sleepMode(true), 60000); };
    ['pointerdown', 'keydown', 'scroll', 'pointermove'].forEach(ev => addEventListener(ev, wake, { passive: true }));
    wake();
    setInterval(() => {
      const z = ZONES[ZI[state.cur]];
      if (document.hidden || state.tired || buddy.hidden || !z || !z.buddy || buddy.bubble.classList.contains('show')) return;
      if (Math.random() < .5) say(pick(z.say));
    }, 40000);
    console.log('%c⚡ Hi, fellow engineer.', 'font:700 16px sans-serif;color:#46d9ff', '\nYou opened the console, so you’re my kind of person.\nTry typing “overload”, “sleep”, “coffee” or “messi” on the page. Or the Konami code.');
  }

  /* ---------------- MOTION ---------------- */
  function motionInit() {
    const btn = $('#motionBtn');
    const apply = () => {
      root.classList.toggle('calm', calm);
      btn.setAttribute('aria-pressed', calm);
      btn.title = calm ? 'Motion is reduced. Turn animation back on' : 'Reduce motion';
      $$('svg').forEach(s => { try { if (calm) s.pauseAnimations?.(); else s.unpauseAnimations?.(); } catch (e) { /* not an outer svg */ } });
      if (gl.redraw) gl.redraw();
    };
    btn.addEventListener('click', () => { calm = !calm; store.set('calm', calm); apply(); });
    mqReduce.addEventListener?.('change', e => { if (store.get('calm', null) === null) { calm = e.matches; apply(); } });
    apply();
  }

  /* ---------------- BOOT ---------------- */
  safe('buddy', buddyInit);
  safe('rail', railInit);
  safe('home', homeInit);
  safe('origin', originInit);
  safe('journey', journeyInit);
  safe('reactor', reactorInit);
  safe('lab', labInit);
  safe('field', fieldInit);
  safe('lead', leadInit);
  safe('skills', skillsInit);
  safe('vault', vaultInit);
  safe('output', outputInit);
  safe('cv', cvInit);
  safe('offduty', offInit);
  safe('ram', ramInit);
  safe('forecast', forecastInit);
  safe('contact', contactInit);
  safe('hud', () => {
    const hud = $('.hud'), f = () => hud.classList.toggle('solid', scrollY > 24);
    addEventListener('scroll', f, { passive: true }); f();
  });
  safe('pdf', pdfInit);
  safe('zonenav', zoneNavInit);
  safe('summary', summaryInit);
  safe('map', mapInit);
  safe('dialogs', dialogsInit);
  safe('eggs', eggsInit);
  safe('motion', motionInit);
  safe('observe', observeZones);
  railUpdate();
  const h = location.hash.slice(1);
  if (h === 'summary') setTimeout(openSummary, 60);
  else if (h && ZI[h] !== undefined) setTimeout(() => go(h), 60);
})();
