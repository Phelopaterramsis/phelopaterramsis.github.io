/* Illustrated character */
const Character = (() => {
  const C = {
    skin: '#d79a76', skinSh: '#b8775a', skinHi: '#e8b391',
    hair: '#3a2519', hairHi: '#6f4a34', hairLo: '#24160e', hairBack: '#2e1c12',
    beard: '#2a1a11', beardHi: '#45301f',
    sweater: '#55372a', sweaterSh: '#3a251c', sweaterHi: '#6c4836',
    pants: '#243049', pantsSh: '#1a2337',
    shoe: '#eef3f8', sole: '#8d9bb0', accent: '#3fd8ff',
    mouth: '#5e1c22', teeth: '#fbfbf7', eye: '#1b120e'
  };

  const HAIR_BACK = `<g class="ch-hair-back">
    <path d="M66 108 C60 107.6 55.8 104 54.6 98.4 Q50.8 94.6 52.4 88.4 Q49.4 82.6 51.6 76 Q49.4 69 52.6 62.4 Q51.6 53.6 56 47 L151 47 Q155.4 53.6 154.4 62.4 Q157.6 69 155.4 76 Q157.6 82.6 154.6 88.4 Q156.2 94.6 152.4 98.4 C151.2 104 147 107.6 141 108 Q136 104.6 131 106 L76 106 Q71 104.6 66 108Z" fill="${C.hairBack}"/>
    <path d="M55.4 96.4 Q52.6 90 54.6 84 M152 96.4 Q154.8 90 152.8 84 M52.8 72 Q51.6 66.4 53.8 61.6 M154.6 72 Q155.8 66.4 153.6 61.6" fill="none" stroke="${C.hairHi}" stroke-width="1.6" stroke-linecap="round" opacity=".55"/>
  </g>`;
  const HAIR = `<g class="ch-hair">
    <path d="M59.4 88.6 C55.2 82.6 52.8 74.2 53.6 65.6 Q51 60 53.8 54.4 Q53 46 59.2 41.6 Q58.2 34.6 63.6 30.6 Q60.6 25.8 64.4 21.6 Q66.6 25.4 69.6 24.8 Q73.6 16.6 82.2 14.4 Q87.6 7.8 96.6 8.6 Q101.6 3.4 109.8 5.4 Q116.6 2.6 123.6 6.6 Q132.4 7 137.4 14 Q143 12.4 146.4 15.2 Q143.8 17.6 143.4 20.4 Q150.4 24.8 151.2 33.4 Q156.8 39 154.6 47.4 Q157.8 54.6 154.4 61.6 Q155.6 70 151.4 77.6 Q149.8 84.6 144.6 89.4 Q143.2 84.4 139.8 81.8 Q138.4 77.4 137.2 72 L136 66.4 C135.2 62.4 133.4 58.8 130.6 56 Q126.8 51.6 120.8 51 Q117.4 51.6 114.8 53.6 Q117.2 57.4 115.4 61 Q112.6 58.8 110.6 55 Q106.4 50.8 100.4 50.2 Q91.6 49.4 83.6 52.8 C78.6 55 75.8 58.4 74.2 62.4 L72.2 69.6 Q70.6 75.6 69.4 79.4 Q65.4 82.4 63.4 87.4 Q61.4 86.6 59.4 88.6Z" fill="${C.hair}"/>
    <path d="M77.4 46.6 C79.6 37.4 86.6 30.6 96.4 28.2 M91.2 45.4 C95.2 34.6 104.6 27.6 116.8 25.4 M106.6 46.6 C112.4 37.8 122 32.4 133 32 M121.6 49.4 C128.6 44 136.8 41.8 145.2 43 M66.2 50.4 C64.4 42.6 67.4 35.4 74 30.6 M60.6 75.4 C57.6 68.2 57.8 60.4 61.4 53.6 M146.6 75.4 C149.6 68.2 149.4 60.4 145.8 53.6 M82.4 19.6 C90 15.4 99.4 14 107.6 16 M118.4 14.6 C126.2 15.4 133 19 137.6 24.4" fill="none" stroke="${C.hairHi}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
    <path d="M70.4 40.4 C75.2 33.6 82.6 28.8 91.4 27.2 M101.4 36.2 C108.2 30.6 117 27.6 126.4 27.8 M66.4 61.8 C64.4 67.4 64.2 73.6 65.6 79 M141.2 60.6 C143.4 66.4 143.6 72.4 142.2 78 M136.4 37.8 C141 39.6 144.6 42.8 147 47" fill="none" stroke="${C.hairLo}" stroke-width="2.2" stroke-linecap="round" opacity=".75"/>
    <path d="M57.8 61.4 c-2.2 -4 -0.4 -8.4 3.8 -9.4 M149.2 61.4 c2.2 -4 0.4 -8.4 -3.8 -9.4 M64.6 38.4 c0.6 -4.4 4.6 -7 9 -6.2 M139.6 25.8 c3.4 0.8 5.6 3.8 5.6 7.6 M57.4 80.6 c-2 -3.6 -1.4 -7.6 1.6 -10 M150 80.6 c2 -3.6 1.4 -7.6 -1.6 -10" fill="none" stroke="${C.hairHi}" stroke-width="1.7" stroke-linecap="round" opacity=".7"/>
    <path d="M111.6 55 Q113.8 57 114.2 59.6" fill="none" stroke="${C.hairHi}" stroke-width="1.3" stroke-linecap="round" opacity=".6"/>
  </g>`;

  const P = {
    head: [103, 126], ba: [70, 144], bf: [70, 206], fa: [137, 144], ff: [137, 206],
    bt: [92, 246], bs: [92, 316], ft: [116, 246], fs: [116, 316], root: [104, 246]
  };

  const POSES = {
    stand:     { ba: 7,  bf: -6,  fa: -7,   ff: -8,   bt: 3,   bs: 0,  ft: -3,  fs: 0,  head: 0 },
    wave:      { ba: 7,  bf: -6,  fa: -152, ff: -28,  bt: 3,   bs: 0,  ft: -3,  fs: 0,  head: -4 },
    point:     { ba: 7,  bf: -6,  fa: -96,  ff: -4,   bt: 3,   bs: 0,  ft: -3,  fs: 0,  head: -2 },
    think:     { ba: 10, bf: -60, fa: -15,  ff: -192, bt: 3,   bs: 0,  ft: -3,  fs: 0,  head: 5 },
    confused:  { ba: 8,  bf: -8,  fa: -128, ff: -98,  bt: 3,   bs: 0,  ft: -3,  fs: 0,  head: 8 },
    celebrate: { ba: 150, bf: 22, fa: -150, ff: -22,  bt: 10,  bs: 6,  ft: -10, fs: 6,  head: -6, y: -10 },
    coffee:    { ba: 7,  bf: -6,  fa: -12,  ff: -150, bt: 3,   bs: 0,  ft: -3,  fs: 0,  head: 3 },
    tablet:    { ba: 6,  bf: -40, fa: -18,  ff: -82,  bt: 3,   bs: 0,  ft: -3,  fs: 0,  head: 9 },
    read:      { ba: -22, bf: -78, fa: -26, ff: -76,  bt: 3,   bs: 0,  ft: -3,  fs: 0,  head: 10 },
    transmit:  { ba: 7,  bf: -6,  fa: -165, ff: -6,   bt: 3,   bs: 0,  ft: -3,  fs: 0,  head: -8 },
    kick:      { ba: -40, bf: -20, fa: 38,  ff: -20,  bt: 18,  bs: 22, ft: -78, fs: -6, head: 6, rot: -6 },
    sit:       { ba: 4,  bf: -50, fa: -6,   ff: -60,  bt: -86, bs: 88, ft: -90, fs: 90, head: 0, y: 84 },
    type:      { ba: -46, bf: -48, fa: -56, ff: -38,  bt: -86, bs: 88, ft: -90, fs: 90, head: 8, y: 84 },
    sitcoffee: { ba: 4,  bf: -50, fa: -12,  ff: -150, bt: -86, bs: 88, ft: -90, fs: 90, head: 3, y: 84 },
    lie:       { ba: 160, bf: 70, fa: -38, ff: -118, bt: -30, bs: 52, ft: -18, fs: 36, head: -4, rot: -90, x: 0, y: 0 },
    sitwave:   { ba: 4,  bf: -50, fa: -152, ff: -28,  bt: -86, bs: 88, ft: -90, fs: 90, head: -4, y: 84 },
    sitthink:  { ba: 4,  bf: -50, fa: -15,  ff: -192, bt: -86, bs: 88, ft: -90, fs: 90, head: 6, y: 84 },
    doze:      { ba: 6,  bf: -30, fa: 0,    ff: -40,  bt: -86, bs: 88, ft: -90, fs: 90, head: 16, y: 84 }
  };

  const rot = (deg, p) => `transform:rotate(${deg}deg);transform-origin:${p[0]}px ${p[1]}px`;

  /* ---------- Face parts ---------- */
  const eyes = {
    open: `<g class="ch-eyes">
        <ellipse cx="89" cy="74" rx="3.8" ry="4.3" fill="${C.eye}"/><ellipse cx="117" cy="74" rx="3.8" ry="4.3" fill="${C.eye}"/>
        <circle cx="90.4" cy="72.4" r="1.2" fill="#fff"/><circle cx="118.4" cy="72.4" r="1.2" fill="#fff"/>
        <path d="M82.5 78.6 Q89 74.4 95.5 78.6 L95.5 82 L82.5 82Z M110.5 78.6 Q117 74.4 123.5 78.6 L123.5 82 L110.5 82Z" fill="${C.skin}"/>
      </g>`,
    closed: `<g fill="none" stroke="${C.eye}" stroke-width="2.4" stroke-linecap="round">
        <path d="M83.5 75.5 Q89 79.5 94.5 75.5"/><path d="M111.5 75.5 Q117 79.5 122.5 75.5"/></g>`,
    wink: `<g><ellipse cx="89" cy="74" rx="3.8" ry="4.3" fill="${C.eye}"/><circle cx="90.4" cy="72.4" r="1.2" fill="#fff"/>
        <path d="M82.5 78.6 Q89 74.4 95.5 78.6 L95.5 82 L82.5 82Z" fill="${C.skin}"/>
        <path d="M111.5 75 Q117 79 122.5 75" fill="none" stroke="${C.eye}" stroke-width="2.4" stroke-linecap="round"/></g>`,
    wide: `<g class="ch-eyes"><ellipse cx="89" cy="73.5" rx="4.2" ry="5" fill="${C.eye}"/><ellipse cx="117" cy="73.5" rx="4.2" ry="5" fill="${C.eye}"/>
        <circle cx="90.6" cy="71.8" r="1.4" fill="#fff"/><circle cx="118.6" cy="71.8" r="1.4" fill="#fff"/></g>`,
    focus: `<g class="ch-eyes"><ellipse cx="89" cy="75" rx="3.6" ry="3.4" fill="${C.eye}"/><ellipse cx="117" cy="75" rx="3.6" ry="3.4" fill="${C.eye}"/>
        <circle cx="90.2" cy="73.8" r="1" fill="#fff"/><circle cx="118.2" cy="73.8" r="1" fill="#fff"/>
        <path d="M83 71.6 h12 v2.4 h-12Z M111 71.6 h12 v2.4 h-12Z" fill="${C.skin}"/></g>`
  };
  const brows = {
    calm: `M80.5 64.5 C85 60.5 92 59.6 97.5 61.6 M108.5 61.6 C114 59.6 121 60.5 125.5 64.5`,
    up: `M80.5 61 C85 56.5 92 55.6 97.5 58 M108.5 58 C114 55.6 121 56.5 125.5 61`,
    confused: `M80.5 66 C85 63 92 62 97.5 63.5 M108.5 58.5 C114 55 121 55.5 125.5 59`,
    focus: `M81 64 C86 62.5 92 62.6 97.5 64 M108.5 64 C114 62.6 120 62.5 125 64`
  };
  const mouths = {
    grin: `<path d="M87.5 102.2 C93 114.5 113 114.5 118.5 102.2 C110 104.4 96 104.4 87.5 102.2Z" fill="${C.mouth}"/>
           <path d="M89.6 102.8 C96 104.8 110 104.8 116.4 102.8 L115 106.6 C108.5 108.2 97.5 108.2 91 106.6Z" fill="${C.teeth}"/>`,
    smile: `<path d="M90 104 C96 109.5 110 109.5 116 104" fill="none" stroke="${C.mouth}" stroke-width="2.6" stroke-linecap="round"/>`,
    o: `<ellipse cx="103" cy="107" rx="4.6" ry="5.6" fill="${C.mouth}"/>`,
    flat: `<path d="M94 106 C99 104.4 106 107.6 112 105.4" fill="none" stroke="${C.mouth}" stroke-width="2.6" stroke-linecap="round"/>`,
    sleep: `<ellipse cx="104" cy="106.5" rx="3.2" ry="2.6" fill="${C.mouth}"/>`
  };
  const EXPR = {
    happy:    { e: 'open', b: 'calm', m: 'grin' },
    soft:     { e: 'open', b: 'calm', m: 'smile' },
    wink:     { e: 'wink', b: 'up', m: 'grin' },
    wow:      { e: 'wide', b: 'up', m: 'o' },
    confused: { e: 'open', b: 'confused', m: 'flat' },
    focus:    { e: 'focus', b: 'focus', m: 'smile' },
    sleep:    { e: 'closed', b: 'calm', m: 'sleep' },
    proud:    { e: 'closed', b: 'up', m: 'grin' }
  };

  function face(expr) {
    const x = EXPR[expr] || EXPR.happy;
    return `<g class="ch-face" data-expr="${expr}">
      ${eyes[x.e]}
      <path class="ch-brows" d="${brows[x.b]}" fill="none" stroke="${C.hair}" stroke-width="4.6" stroke-linecap="round"/>
      <path d="M104.5 76 C106.5 83 110 88.5 107 92.2 C105 93.8 101.5 93.4 99.8 91.6" fill="none" stroke="${C.skinSh}" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M68 86 C69 98 72 109 80 118 C88 127 96 132 103 132 C111 132 119 127 126 118 C133 109 136.5 98 137 86 C134.5 93 130.5 98.5 125 101.5 C118 97.6 110 96.6 103 97.6 C96 96.6 88 97.6 81.5 101.5 C75.5 98.5 70.6 93 68 86Z" fill="${C.beard}"/>
      <path d="M78 110 l2 4 M86 120 l1.4 4 M96 125 l.6 4 M112 125 l-.6 4 M121 119 l-1.6 4 M128 109 l-2 4" stroke="${C.beardHi}" stroke-width="1.6" stroke-linecap="round"/>
      ${mouths[x.m]}
      <path d="M83.5 101.4 C88.5 95 97 94 103 96.6 C109 94 117.5 95 122.5 101.4 C116.5 100.2 110 100.8 103 102.4 C96 100.8 89.5 100.2 83.5 101.4Z" fill="${C.beard}"/>
      <path d="M77 90 C79 93 80 95.5 80.4 98" fill="none" stroke="${C.skinSh}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
    </g>`;
  }

  /* ---------- Accessories ---------- */
  const HATS = {
    hardhat: `<g class="ch-hat"><path d="M66 60 C66 32 83 18 104 18 C125 18 142 32 142 60Z" fill="#f2bb3a"/>
      <path d="M98 19 C99 30 99 46 98 60 h12 C111 46 111 30 110 19.5Z" fill="#ffd166"/>
      <path d="M58 58 h92 c5 0 5 8 0 8 h-92 c-5 0 -5 -8 0 -8Z" fill="#d89b22"/></g>`,
    headphones: `<g class="ch-hat"><path d="M64 78 C60 26 146 26 142 78" fill="none" stroke="#1d2a3d" stroke-width="7" stroke-linecap="round"/>
      <rect x="56" y="70" width="14" height="24" rx="6" fill="#2b3d57"/><rect x="136" y="70" width="14" height="24" rx="6" fill="#2b3d57"/>
      <rect x="59" y="76" width="4" height="12" rx="2" fill="${C.accent}"/><rect x="143" y="76" width="4" height="12" rx="2" fill="${C.accent}"/></g>`,
    cap: ''
  };
  const BACK = {
    backpack: `<g class="ch-pack"><path d="M60 148 h22 v86 h-26 c-5 0 -8 -4 -8 -9 v-62 c0 -9 5 -15 12 -15Z" fill="#2d4a6b"/>
      <path d="M50 196 h18 v24 h-18Z" fill="#24405f"/><path d="M53 200 h12" stroke="${C.accent}" stroke-width="2"/></g>`
  };
  const PACK_STRAP = `<path d="M86 134 C81 160 79 192 82 222" fill="none" stroke="#24405f" stroke-width="7" stroke-linecap="round"/>`;

  const PROPS = {
    mug: `<g class="ch-prop"><rect x="134" y="246" width="17" height="21" rx="3" fill="#e9eef5"/>
      <path d="M151 251 c7 0 7 11 0 11" fill="none" stroke="#e9eef5" stroke-width="3"/>
      <path d="M143.5 250 l-4 7 h4 l-2.5 6 l6 -8 h-4 l2.5 -5Z" fill="#3fd8ff"/>
      <g class="ch-steam" fill="none" stroke="#cfe6ff" stroke-width="1.6" stroke-linecap="round" opacity=".7">
        <path d="M139 242 c-3 -4 3 -6 0 -10"/><path d="M145 241 c-3 -4 3 -6 0 -10"/></g></g>`,
    tablet: `<g class="ch-prop"><rect x="126" y="244" width="40" height="28" rx="4" fill="#16223a" transform="rotate(-14 146 258)"/>
      <rect x="129.5" y="247" width="33" height="22" rx="2" fill="#3fd8ff" opacity=".85" transform="rotate(-14 146 258)"/>
      <path d="M133 262 l6 -5 l5 3 l7 -8 l6 4" fill="none" stroke="#0b1d35" stroke-width="1.8" transform="rotate(-14 146 258)"/></g>`,
    paper: `<g class="ch-prop"><rect x="128" y="236" width="30" height="38" rx="2" fill="#f4f1e8" transform="rotate(-8 143 255)"/>
      <path d="M133 245 h20 M133 251 h20 M133 257 h14 M133 263 h18" stroke="#9aa6b6" stroke-width="1.5" transform="rotate(-8 143 255)"/></g>`,
    trophy: `<g class="ch-prop"><path d="M124 230 h26 c0 14 -5 22 -13 23 c-8 -1 -13 -9 -13 -23Z" fill="#f5c542"/>
      <path d="M124 233 c-7 0 -7 10 1 11 M150 233 c7 0 7 10 -1 11" fill="none" stroke="#f5c542" stroke-width="2.6"/>
      <rect x="133" y="252" width="8" height="8" fill="#d9a21f"/><rect x="128" y="259" width="18" height="6" rx="1" fill="#b98316"/></g>`,
    radio: `<g class="ch-prop"><rect x="125" y="244" width="15" height="26" rx="3" fill="#27364f"/>
      <rect x="128" y="248" width="9" height="7" rx="1" fill="#3fd8ff"/><path d="M137 244 v-26" stroke="#9fb0c8" stroke-width="2.4"/>
      <circle cx="137" cy="217" r="2.6" fill="#4ef0a0" class="ch-blink"/></g>`,
    ball: `<g class="ch-prop"><circle cx="140" cy="262" r="11" fill="#f4f4f0"/><path d="M140 256 l5 3.6 -2 6 h-6 l-2 -6Z" fill="#1d2433"/></g>`
  };

  function limb(kind) {
    if (kind === 'arm-b') return `<path d="M59 142 C59 133 81 133 81 142 L80 208 C80 214 60 214 60 208Z" fill="${C.sweaterSh}"/>`;
    if (kind === 'arm-f') return `<path d="M126 142 C126 133 148 133 148 142 L147 208 C147 214 127 214 127 208Z" fill="${C.sweater}"/><path d="M144 148 L143.5 206" stroke="${C.sweaterHi}" stroke-width="2" opacity=".6"/><path d="M147.4 146 L146.6 206" stroke="#7fdcff" stroke-width="1.6" opacity=".3"/>`;
    return '';
  }
  function forearm(x, shade) {
    const s = shade ? C.sweaterSh : C.sweater;
    return `<path d="M${x - 9.5} 202 h19 l-1.2 56 h-16.6Z" fill="${s}"/>
      <path d="M${x - 8.5} 254 h17 v9 h-17Z" fill="${C.sweaterSh}"/>
      <path d="M${x - 7} 256.5 v4.5 M${x - 3} 256.5 v4.5 M${x + 1} 256.5 v4.5 M${x + 5} 256.5 v4.5" stroke="${shade ? '#2c1b14' : C.sweaterSh}" stroke-width="1.3" opacity=".8"/>
      <circle cx="${x}" cy="271" r="9.6" fill="${shade ? C.skinSh : C.skin}"/>
      <path d="M${x + 5} 264 c5 1 7 5 5 8" fill="none" stroke="${shade ? C.skinSh : C.skin}" stroke-width="5" stroke-linecap="round"/>`;
  }
  function thigh(x, shade) {
    return `<path d="M${x - 13} 238 h26 l-1.5 76 c0 9 -23 9 -23 0Z" fill="${shade ? C.pantsSh : C.pants}"/>`;
  }
  function shin(x, shade) {
    return `<path d="M${x - 10.5} 310 h21 l-1.4 72 h-18.2Z" fill="${shade ? C.pantsSh : C.pants}"/>
      <path d="M${x - 12} 378 h24 c11 0 23 6 25 14 c1 4.5 -2 7 -6 7 h-43 c-3 0 -4.4 -2 -4.4 -5Z" fill="${shade ? '#cfd7e2' : C.shoe}"/>
      <path d="M${x - 14} 396 h51 v4.6 h-51Z" fill="${C.sole}"/>
      <path d="M${x - 2} 384 l12 8" stroke="${C.accent}" stroke-width="2.6" stroke-linecap="round"/>`;
  }

  /* ---------- Build the SVG ---------- */
  function svg(opts = {}) {
    const o = Object.assign({ pose: 'stand', expr: 'happy', hat: '', back: '', prop: '', cls: '', label: '' }, opts);
    const p = Object.assign({}, POSES.stand, POSES[o.pose] || {});
    const rootT = `transform:translate(${p.x || 0}px,${p.y || 0}px) rotate(${p.rot || 0}deg);transform-origin:${P.root[0]}px ${P.root[1]}px`;
    const pl = o.place ? `x="${o.place[0]}" y="${o.place[1]}" width="${o.place[2]}" height="${o.place[3]}"` : '';
    return `<svg class="ch ${o.cls}" ${pl} viewBox="0 0 220 410" overflow="visible" data-pose="${o.pose}" ${o.label ? `role="img" aria-label="${o.label}"` : 'aria-hidden="true"'}>
      <ellipse class="ch-shadow" cx="108" cy="402" rx="50" ry="7" fill="#000" opacity=".28"/>
      <g class="ch-root" style="${rootT}">
       <g class="ch-bob">
        ${o.back ? BACK[o.back] || '' : ''}
        <g class="j j-ba" style="${rot(p.ba, P.ba)}">${limb('arm-b')}<g class="j j-bf" style="${rot(p.bf, P.bf)}">${forearm(70, true)}</g></g>
        <g class="j j-bt" style="${rot(p.bt, P.bt)}">${thigh(92, true)}<g class="j j-bs" style="${rot(p.bs, P.bs)}">${shin(92, true)}</g></g>
        <g class="j j-ft" style="${rot(p.ft, P.ft)}">${thigh(116, false)}<g class="j j-fs" style="${rot(p.fs, P.fs)}">${shin(116, false)}</g></g>
        <path d="M69 234 h70 v20 c0 5 -4 8 -9 8 h-52 c-5 0 -9 -3 -9 -8Z" fill="${C.pants}"/>
        <path d="M92 112 h24 v28 h-24Z" fill="${C.skinSh}"/>
        <g class="ch-torso">
          <path d="M70 136 C80 128 92 127 104 128 C116 127 127 128 137 136 C143 142 144 152 143 166 L140 238 C140 244 135 247 129 247 L79 247 C73 247 68 244 68 238 L65 166 C64 152 65 142 70 136Z" fill="${C.sweater}"/>
          <path d="M80 150 v86 M90 146 v92 M100 145 v94 M110 145 v94 M120 146 v92 M130 150 v86" stroke="${C.sweaterSh}" stroke-width="1.2" opacity=".35"/>
          <path d="M68 236 h72 v8 c0 3 -3 5 -7 5 h-58 c-4 0 -7 -2 -7 -5Z" fill="${C.sweaterSh}"/>
          <path d="M139 142 C143 156 142 200 140 236" fill="none" stroke="#7fdcff" stroke-width="2" opacity=".35"/>
          <path d="M84 134 C92 146 116 146 124 134 C116 140 92 140 84 134Z" fill="${C.sweaterSh}" opacity=".7"/>
          <path d="M88 129 C93 139 115 139 120 129" fill="none" stroke="${C.sweaterSh}" stroke-width="6" stroke-linecap="round"/>
          ${o.back === 'backpack' ? PACK_STRAP : ''}
        </g>
        <g class="j j-head" style="${rot(p.head, P.head)}"><g class="ch-headbob">
          ${HAIR_BACK}
          <ellipse cx="67" cy="87" rx="7.5" ry="11" fill="${C.skin}"/><path d="M66 82 c3 2 3 8 0 10" fill="none" stroke="${C.skinSh}" stroke-width="1.8"/>
          <ellipse cx="138.5" cy="87" rx="5.5" ry="10" fill="${C.skinSh}"/>
          <path d="M68 70 C68 44 82 30 103 30 C124 30 138 44 138 70 L138 88 C138 112 123 128 103 128 C83 128 68 112 68 88Z" fill="${C.skin}"/>
          <path d="M68 70 C68 50 76 38 88 33 C78 42 74 56 74 72 L74 90 C74 100 76 108 80 115 C72 108 68 98 68 88Z" fill="${C.skinSh}" opacity=".55"/><ellipse cx="80" cy="88" rx="6" ry="4" fill="#e07d6a" opacity=".22"/><ellipse cx="127" cy="88" rx="6" ry="4" fill="#e07d6a" opacity=".22"/>
          ${face(o.expr)}
          ${HAIR}
          ${o.hat ? HATS[o.hat] || '' : ''}
        </g></g>
        <g class="j j-fa" style="${rot(p.fa, P.fa)}">${limb('arm-f')}<g class="j j-ff" style="${rot(p.ff, P.ff)}"><g class="ch-hand">${forearm(137, false)}${o.prop ? `<g transform="translate(5,8)">${PROPS[o.prop] || ''}</g>` : ''}</g></g></g>
       </g>
      </g>
    </svg>`;
  }

  function setPose(svgEl, pose) {
    const p = Object.assign({}, POSES.stand, POSES[pose] || {});
    const set = (sel, k) => { const g = svgEl.querySelector(sel); if (g) g.style.transform = `rotate(${p[k]}deg)`; };
    set('.j-ba', 'ba'); set('.j-bf', 'bf'); set('.j-fa', 'fa'); set('.j-ff', 'ff');
    set('.j-bt', 'bt'); set('.j-bs', 'bs'); set('.j-ft', 'ft'); set('.j-fs', 'fs'); set('.j-head', 'head');
    const r = svgEl.querySelector('.ch-root');
    if (r) r.style.transform = `translate(${p.x || 0}px,${p.y || 0}px) rotate(${p.rot || 0}deg)`;
    svgEl.dataset.pose = pose;
  }
  function setFace(svgEl, expr) {
    const f = svgEl.querySelector('.ch-face');
    if (f) f.outerHTML = face(expr);
  }
  function setGear(svgEl, { hat, prop } = {}) {
    if (hat !== undefined) {
      svgEl.querySelectorAll('.ch-hat').forEach(n => n.remove());
      if (hat && HATS[hat]) svgEl.querySelector('.ch-headbob').insertAdjacentHTML('beforeend', HATS[hat]);
    }
    if (prop !== undefined) {
      svgEl.querySelectorAll('.ch-prop').forEach(n => n.remove());
      if (prop && PROPS[prop]) svgEl.querySelector('.ch-hand').insertAdjacentHTML('beforeend', `<g class="ch-prop" transform="translate(5,8)">${PROPS[prop]}</g>`);
    }
  }
  return { svg, setPose, setFace, setGear, POSES, colors: C };
})();
