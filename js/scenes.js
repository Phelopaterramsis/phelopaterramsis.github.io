/* Illustrated scenes */
const Scenes = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647, (seed - 1) / 2147483646);
  const reseed = n => { seed = n; };
  const f = n => Math.round(n * 10) / 10;

  function stars(n, w, maxY, tw = 0.3) {
    let s = '<g class="stars">';
    for (let i = 0; i < n; i++) {
      const r = rnd() < 0.08 ? 1.8 : rnd() * 1.1 + 0.4;
      s += `<circle cx="${f(rnd() * w)}" cy="${f(rnd() * maxY)}" r="${f(r)}" fill="#dfeaff" opacity="${f(0.25 + rnd() * 0.6)}"${rnd() < tw ? ` class="tw" style="animation-delay:${f(rnd() * 6)}s"` : ''}/>`;
    }
    return s + '</g>';
  }

  function tower(x, base, h, stroke = '#26416d', sw = 3) {
    const top = base - h, w0 = h * 0.17, w1 = h * 0.05, yk = top + h * 0.2;
    const lx = (y, side) => x + side * (w1 + (w0 - w1) * (y - yk) / (base - yk));
    let d = `M${f(x - w0)} ${base} L${f(x - w1)} ${f(yk)} L${x} ${top} L${f(x + w1)} ${f(yk)} L${f(x + w0)} ${base}`;
    const n = 6;
    for (let i = 0; i < n; i++) {
      const ya = yk + (base - yk) * i / n, yb = yk + (base - yk) * (i + 1) / n;
      d += ` M${f(lx(ya, -1))} ${f(ya)} L${f(lx(yb, 1))} ${f(yb)} M${f(lx(ya, 1))} ${f(ya)} L${f(lx(yb, -1))} ${f(yb)}`;
    }
    const a1 = top + h * 0.2, a2 = top + h * 0.34, e1 = h * 0.24, e2 = h * 0.18;
    d += ` M${f(x - e1)} ${f(a1)} H${f(x + e1)} M${f(x - e2)} ${f(a2)} H${f(x + e2)}`;
    d += ` M${f(x - e1)} ${f(a1)} v10 M${f(x + e1)} ${f(a1)} v10 M${f(x - e2)} ${f(a2)} v10 M${f(x + e2)} ${f(a2)} v10`;
    return { svg: `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`, arms: [[x - e1, a1 + 10], [x + e1, a1 + 10], [x - e2, a2 + 10], [x + e2, a2 + 10]] };
  }
  const cable = (a, b, sag) => `M${f(a[0])} ${f(a[1])} Q${f((a[0] + b[0]) / 2)} ${f((a[1] + b[1]) / 2 + sag)} ${f(b[0])} ${f(b[1])}`;

  function line(towers, color, pulse = '#46d9ff', sag = 34) {
    let s = '';
    for (let i = 0; i < towers.length - 1; i++) {
      for (const k of [0, 1, 2, 3]) {
        const d = cable(towers[i].arms[k], towers[i + 1].arms[k], sag);
        s += `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.4" opacity=".8"/>`;
        if (k < 2) s += `<path class="pulse" d="${d}" fill="none" stroke="${k ? '#43eba0' : pulse}" stroke-width="2.4" stroke-linecap="round" style="animation-delay:${f(rnd() * -4)}s"/>`;
      }
    }
    return s;
  }

  function turbine(x, base, h, color = '#9fb6d6', dur = 7) {
    const hy = base - h, L = h * 0.42;
    const blade = `<path d="M${x} ${hy} C${x - 5} ${hy - L * 0.3} ${x - 3} ${hy - L * 0.8} ${x} ${hy - L} C${x + 3} ${hy - L * 0.7} ${x + 5} ${hy - L * 0.3} ${x} ${hy}Z" fill="${color}"/>`;
    return `<g><path d="M${x - h * 0.025} ${base} L${x - h * 0.012} ${hy} L${x + h * 0.012} ${hy} L${x + h * 0.025} ${base}Z" fill="${color}" opacity=".9"/>
      <g class="spin" style="transform-origin:${x}px ${hy}px;animation-duration:${dur}s">${blade}<g transform="rotate(120 ${x} ${hy})">${blade}</g><g transform="rotate(240 ${x} ${hy})">${blade}</g></g>
      <circle cx="${x}" cy="${hy}" r="${f(h * 0.03)}" fill="${color}"/></g>`;
  }

  function panels(x0, x1, y0, rows, w = 40, color = '#12305a', edge = '#3a8fc4') {
    let s = '';
    for (let r = 0; r < rows; r++) {
      const y = y0 + r * (w * 0.7), sc = 1 + r * 0.12, pw = w * sc;
      for (let x = x0 + (r % 2) * pw * 0.3; x < x1; x += pw * 1.08) {
        s += `<path d="M${f(x)} ${f(y)} h${f(pw)} l${f(-pw * 0.2)} ${f(pw * 0.42)} h${f(-pw)}Z" fill="${color}"/><path d="M${f(x)} ${f(y)} h${f(pw)}" stroke="${edge}" stroke-width="1.4" opacity=".8"/>`;
      }
    }
    return s;
  }

  function palm(x, base, h, color = '#1a1030', lean = 18) {
    const tx = x + lean, ty = base - h;
    let s = `<path d="M${x - 6} ${base} Q${x + lean * 0.2} ${base - h * 0.5} ${tx - 3} ${ty} L${tx + 3} ${ty} Q${x + lean * 0.3} ${base - h * 0.5} ${x + 6} ${base}Z" fill="${color}"/>`;
    for (const [dx, dy] of [[-1, 0.2], [-0.8, -0.4], [0, -0.7], [0.8, -0.4], [1, 0.25], [0.4, 0.5], [-0.4, 0.5]]) {
      const ex = tx + dx * h * 0.42, ey = ty + dy * h * 0.3 + h * 0.08;
      s += `<path d="M${tx} ${ty} Q${f((tx + ex) / 2)} ${f(Math.min(ty, ey) - h * 0.12)} ${f(ex)} ${f(ey)} Q${f((tx + ex) / 2)} ${f(Math.min(ty, ey) - h * 0.05)} ${tx} ${ty + 4}Z" fill="${color}"/>`;
    }
    return s;
  }

  /* ------------------------------ HOME ------------------------------ */
  function heroSky() {
    reseed(11);
    let s = `<svg class="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs>
      <linearGradient id="hsSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02050f"/><stop offset=".5" stop-color="#061331"/><stop offset=".8" stop-color="#0b2a4d"/><stop offset="1" stop-color="#114059"/></linearGradient>
      <radialGradient id="hsHz" cx=".55" cy="1" r=".7"><stop offset="0" stop-color="#2fd3b0" stop-opacity=".32"/><stop offset=".5" stop-color="#1b6f9a" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
      <rect width="1600" height="900" fill="url(#hsSky)"/><rect width="1600" height="900" fill="url(#hsHz)"/>`;
    s += stars(160, 1600, 600);
    s += `<path d="M0 640 C200 598 300 560 460 590 C600 615 700 560 860 575 C1000 588 1120 538 1280 562 C1420 584 1500 556 1600 566 V900 H0Z" fill="#0c2142"/>`;
    for (let i = 0; i < 46; i++) {
      const x = 640 + rnd() * 420, y = 585 + rnd() * 30;
      s += `<rect x="${f(x)}" y="${f(y)}" width="${f(2 + rnd() * 3)}" height="${f(2 + rnd() * 2)}" fill="${rnd() < 0.7 ? '#ffd58a' : '#7fe0ff'}" opacity="${f(0.4 + rnd() * 0.5)}"/>`;
    }
    s += turbine(170, 650, 210, '#5f7ea8', 8) + turbine(300, 630, 170, '#54739e', 6.5) + turbine(60, 660, 150, '#4b6a94', 9);
    s += `<path d="M0 720 C180 690 360 668 560 690 C760 712 940 680 1120 688 C1320 698 1460 676 1600 684 V900 H0Z" fill="#0a1a36"/>`;
    const T = [-60, 420, 900, 1380, 1860].map(x => tower(x, 770, 270, '#2a4a7a', 3));
    s += T.map(t => t.svg).join('') + line(T, '#3a5f96');
    s += `<path d="M900 790 L1600 760 V900 H880Z" fill="#081631"/>` + panels(960, 1640, 780, 4, 42);
    return s + '</svg>';
  }

  function heroCore() {
    reseed(17);
    const cols = [112, 155, 198, 241, 284], rows = 24, ledC = ['#46d9ff', '#46d9ff', '#43eba0', '#46d9ff', '#ffb547'];
    let leds = '';
    cols.forEach((x, c) => {
      leds += `<rect x="${x}" y="212" width="34" height="${rows * 16 + 6}" rx="2" fill="#061127" stroke="#1d3a66" stroke-width="1.2"/>`;
      for (let r = 0; r < rows; r++) {
        const on = rnd() > 0.12, col = ledC[Math.floor(rnd() * ledC.length)];
        leds += `<rect class="led" x="${x + 5}" y="${220 + r * 16}" width="${on ? 18 + Math.round(rnd() * 6) : 8}" height="3.4" rx="1.5" fill="${col}" style="animation-duration:${f(1.1 + rnd() * 2.6)}s;animation-delay:${f(-rnd() * 3)}s"/>`;
      }
    });
    let side = '';
    for (let c = 0; c < 3; c++) for (let r = 0; r < 22; r++) {
      if (rnd() < 0.2) continue;
      side += `<rect class="led" x="${12 + c * 24}" y="${22 + r * 17}" width="14" height="3" rx="1.5" fill="${rnd() < 0.8 ? '#2fa8d6' : '#2fbf86'}" style="animation-duration:${f(1.4 + rnd() * 3)}s;animation-delay:${f(-rnd() * 3)}s"/>`;
    }
    const fan = (cx, cy) => `<g transform="translate(${cx} ${cy}) scale(1 .38)"><circle r="24" fill="#0a1a36" stroke="#2c5a8f" stroke-width="3"/>
      <g class="spin" style="transform-origin:0px 0px;animation-duration:1.4s">${[0, 90, 180, 270].map(a => `<path d="M0 0 C6 -8 6 -18 0 -21 C-4 -14 -3 -6 0 0Z" fill="#46d9ff" opacity=".7" transform="rotate(${a})"/>`).join('')}</g></g>`;
    const bolt = 'M338 -150 L312 -92 L332 -86 L300 -24 L320 -18 L292 38 L308 42 L296 84';
    return `<svg viewBox="0 0 520 640" class="dc-svg" aria-hidden="true"><defs>
      <radialGradient id="dcGlow" cx=".55" cy=".42" r=".6"><stop offset="0" stop-color="#46d9ff" stop-opacity=".42"/><stop offset=".55" stop-color="#2e7bff" stop-opacity=".12"/><stop offset="1" stop-color="#2e7bff" stop-opacity="0"/></radialGradient>
      <linearGradient id="dcFront" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#12295a"/><stop offset="1" stop-color="#081530"/></linearGradient>
      <radialGradient id="dcFlash"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="#bff4ff" stop-opacity=".6"/><stop offset="1" stop-color="#46d9ff" stop-opacity="0"/></radialGradient>
      <linearGradient id="dcSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0a1835"/><stop offset="1" stop-color="#050d20"/></linearGradient></defs>
      <ellipse class="dc-glow" cx="275" cy="300" rx="260" ry="330" fill="url(#dcGlow)"/>
      <ellipse cx="270" cy="628" rx="240" ry="16" fill="#46d9ff" opacity=".2"/>
      <path class="flow" d="M-20 286 C30 300 70 290 100 276" fill="none" stroke="#46d9ff" stroke-width="3"/><path class="flow" d="M-20 352 C30 366 70 350 100 340" fill="none" stroke="#43eba0" stroke-width="3" style="animation-delay:-1s"/>
      <path d="M330 630 V196 L420 156 V596Z" fill="url(#dcSide)"/>
      <g transform="translate(330 196) skewY(-24)">${side}</g>
      <rect x="100" y="196" width="230" height="434" fill="url(#dcFront)"/>
      ${leds}
      <rect x="100" y="196" width="230" height="8" fill="#46d9ff" opacity=".55"/>
      <path d="M100 196 L190 156 H420 L330 196Z" fill="#16305a"/>
      <path d="M100 196 H330 L420 156 M330 196 V630 M100 196 V630" fill="none" stroke="#7fe3ff" stroke-width="1.6" opacity=".55"/>
      ${fan(190, 180)}${fan(250, 176)}${fan(312, 172)}
      <g class="vapor" fill="#cfe9ff">${[190, 250, 312].map((x, i) => `<circle cx="${x}" cy="166" r="${7 + i}" style="animation-delay:${-i * 0.9}s"/>`).join('')}</g>
      <path d="M360 168 V86" stroke="#7d95bd" stroke-width="4"/><path d="M346 120 h28 M350 102 h20" stroke="#7d95bd" stroke-width="3"/>
      <circle class="ch-blink" cx="360" cy="84" r="5" fill="#ff7a59"/>
      <g class="dc-bolt" transform="translate(64 0)"><path d="${bolt}" fill="none" stroke="#46d9ff" stroke-width="12" stroke-linejoin="round" opacity=".35"/><path d="${bolt}" fill="none" stroke="#f2fdff" stroke-width="4.2" stroke-linejoin="round"/></g>
      <circle class="dc-flash" cx="360" cy="84" r="90" fill="url(#dcFlash)"/>
    </svg>`;
  }

  function ground(fill = '#040a18', edge = '#1d4f7a') {
    return `<svg viewBox="0 0 1600 140" preserveAspectRatio="none" aria-hidden="true"><path d="M0 34 C260 14 520 40 800 22 C1080 6 1340 30 1600 18 V140 H0Z" fill="${fill}"/>
      <path d="M0 34 C260 14 520 40 800 22 C1080 6 1340 30 1600 18" fill="none" stroke="${edge}" stroke-width="2" vector-effect="non-scaling-stroke" opacity=".7"/></svg>`;
  }

  /* ------------------------------ ORIGIN ROOM ------------------------------ */
  function room(photo) {
    reseed(5);
    return `<svg viewBox="0 0 720 560" class="room-svg" role="img" aria-label="Phelo's room: a desk with a laptop and an energy dashboard, a window onto the grid at night, a corkboard with a map and a photo">
      <defs><linearGradient id="rmWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141232"/><stop offset="1" stop-color="#231a3c"/></linearGradient>
        <radialGradient id="rmLamp" cx="600" cy="360" r="300" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffb547" stop-opacity=".28"/><stop offset="1" stop-color="#ffb547" stop-opacity="0"/></radialGradient>
        <radialGradient id="rmScreen" cx="330" cy="320" r="120" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#46d9ff" stop-opacity=".25"/><stop offset="1" stop-color="#46d9ff" stop-opacity="0"/></radialGradient>
        <linearGradient id="rmGlass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050d26"/><stop offset="1" stop-color="#0f2a52"/></linearGradient></defs>
      <rect width="720" height="560" fill="url(#rmWall)"/>
      <rect width="720" height="560" fill="url(#rmLamp)"/>
      <g class="rm-window"><rect x="34" y="46" width="230" height="176" rx="6" fill="#2b2448"/><rect x="44" y="56" width="210" height="156" fill="url(#rmGlass)"/>
        <g opacity=".9">${stars(26, 210, 90).replace('<g class="stars">', '<g transform="translate(44 56)">')}</g>
        <path d="M44 190 C90 176 140 182 190 172 C220 168 240 172 254 170 V212 H44Z" fill="#0a1a38"/>
        <path d="M150 196 L156 140 L162 196 M146 150 H166 M148 162 H164" stroke="#36598d" stroke-width="2" fill="none"/>
        <path class="pulse" d="M44 158 Q100 170 156 150 Q210 132 254 150" stroke="#43eba0" stroke-width="2" fill="none"/>
        <g fill="#ffd58a">${Array.from({ length: 14 }, (_, i) => `<rect x="${60 + i * 13}" y="${194 + (i % 3) * 4}" width="3" height="3" opacity=".7"/>`).join('')}</g>
        <rect class="win-glow" x="44" y="56" width="210" height="156" fill="#46d9ff" opacity="0"/>
        <path d="M149 56 V212 M44 134 H254" stroke="#2b2448" stroke-width="6"/></g>
      <g><rect x="296" y="66" width="150" height="8" rx="2" fill="#4a3326"/>
        ${[['#3b5a8a', 14, 50], ['#8a3b3b', 12, 44], ['#c9a14a', 16, 54], ['#2f6f5e', 12, 46], ['#6a4c8c', 14, 50], ['#406a9a', 10, 40]].map((b, i, a) => { const x = 306 + a.slice(0, i).reduce((t, c) => t + c[1] + 2, 0); return `<rect x="${x}" y="${66 - b[2]}" width="${b[1]}" height="${b[2]}" rx="2" fill="${b[0]}"/>`; }).join('')}
        <path d="M412 66 l6 -22 h18 l6 22Z" fill="#284a75"/><path d="M416 52 h22 M414 59 h26" stroke="#46d9ff" stroke-width="1" opacity=".6"/></g>
      <g class="rm-board"><rect x="470" y="36" width="226" height="196" rx="6" fill="#6e4b33"/><rect x="478" y="44" width="210" height="180" rx="3" fill="#7f5a3e"/>
        <g class="rm-map"><rect x="490" y="56" width="124" height="88" rx="2" fill="#efe6d2" transform="rotate(-3 552 100)"/>
          <path d="M506 120 C530 80 560 74 600 96" fill="none" stroke="#7a8aa0" stroke-width="1.4" stroke-dasharray="3 4" transform="rotate(-3 552 100)"/>
          <g transform="rotate(-3 552 100)"><circle class="pin pin-egypt" cx="600" cy="96" r="5" fill="#ff7a59"/><circle class="pin pin-nebraska" cx="530" cy="82" r="5" fill="#46d9ff"/><circle class="pin pin-florida" cx="506" cy="120" r="5" fill="#43eba0"/>
          <text x="596" y="114" font-size="9" fill="#2d3a4e" font-family="Hanken Grotesk, sans-serif" text-anchor="end">Cairo</text><text x="538" y="76" font-size="9" fill="#2d3a4e" font-family="Hanken Grotesk, sans-serif">Lincoln</text><text x="514" y="134" font-size="9" fill="#2d3a4e" font-family="Hanken Grotesk, sans-serif">Gainesville</text></g></g>
        <g class="polaroid" tabindex="0" role="button" aria-label="Open the real photo of Phelo" transform="rotate(6 652 104)"><rect x="616" y="54" width="72" height="88" rx="2" fill="#f7f5ef"/><image href="${photo}" x="621" y="59" width="62" height="62" preserveAspectRatio="xMidYMid slice"/>
          <text x="652" y="135" font-size="8.5" fill="#4a4f5c" text-anchor="middle" font-family="Hanken Grotesk, sans-serif">the real one</text><circle cx="652" cy="56" r="3.5" fill="#ff7a59"/></g>
        <rect x="492" y="158" width="58" height="50" fill="#ffd76a" transform="rotate(-4 521 183)"/><rect x="560" y="162" width="58" height="50" fill="#9be8c4" transform="rotate(3 589 187)"/><rect x="628" y="156" width="52" height="50" fill="#9fd6ff" transform="rotate(-2 654 181)"/>
        <g font-family="Anybody, sans-serif" font-weight="700" font-size="10" fill="#2a2633" text-anchor="middle"><text x="521" y="188" transform="rotate(-4 521 183)">curious</text><text x="589" y="192" transform="rotate(3 589 187)">persistent</text><text x="654" y="186" transform="rotate(-2 654 181)">builder</text></g></g>
      <rect x="0" y="520" width="720" height="40" fill="#120e24"/><path d="M0 520 H720" stroke="#2e2450" stroke-width="2"/>
      <ellipse cx="400" cy="532" rx="250" ry="10" fill="#0b0818" opacity=".7"/>
      <rect x="0" y="0" width="720" height="560" fill="url(#rmScreen)"/>
      <g class="rm-chair"><path d="M188 366 C186 410 186 440 190 460" stroke="#2a3550" stroke-width="12" stroke-linecap="round" fill="none"/><rect x="186" y="456" width="116" height="16" rx="6" fill="#33405f"/><path d="M244 472 V506 M214 512 H274" stroke="#2a3550" stroke-width="8" stroke-linecap="round"/><circle cx="214" cy="514" r="5" fill="#1b2236"/><circle cx="274" cy="514" r="5" fill="#1b2236"/></g>
      <g class="rm-ch">${Character.svg({ pose: 'type', expr: 'focus', place: [150, 170, 190, 354], cls: 'ch-room' })}</g>
      <g class="rm-desk"><rect x="300" y="398" width="404" height="14" rx="3" fill="#4d3528"/><rect x="306" y="412" width="392" height="18" fill="#3a271e"/><rect x="318" y="430" width="12" height="90" fill="#33231b"/><rect x="674" y="430" width="12" height="90" fill="#33231b"/>
        <rect x="560" y="430" width="110" height="60" fill="#3a271e"/><rect x="600" y="456" width="30" height="4" rx="2" fill="#6b4d3c"/>
        <path d="M352 396 h116 l4 4 h-124Z" fill="#b8c3d4"/><path d="M466 397 L446 318 L450 316 L471 396Z" fill="#c7d1df"/><path d="M462 392 L444 322" stroke="#46d9ff" stroke-width="3" opacity=".6"/>
        <rect x="520" y="256" width="170" height="112" rx="6" fill="#18233c"/><rect x="527" y="263" width="156" height="98" rx="3" fill="#0a1630"/>
        <path class="dash-line" d="M535 340 L555 322 L575 330 L595 300 L615 312 L635 286 L655 296 L675 276" fill="none" stroke="#43eba0" stroke-width="2.2"/>
        <path d="M535 350 H675" stroke="#2b4a78" stroke-width="1"/><rect x="535" y="272" width="40" height="6" rx="2" fill="#46d9ff" opacity=".7"/><rect x="580" y="272" width="24" height="6" rx="2" fill="#ffb547" opacity=".7"/>
        <rect x="598" y="368" width="14" height="22" fill="#18233c"/><rect x="578" y="390" width="54" height="8" rx="2" fill="#18233c"/>
        <g class="rm-mug"><rect x="644" y="372" width="20" height="24" rx="3" fill="#e9eef5"/><path d="M664 378 c8 0 8 12 0 12" fill="none" stroke="#e9eef5" stroke-width="3"/><path d="M655 377 l-4 7 h4 l-2 6 l6 -8 h-4 l2 -5Z" fill="#46d9ff"/>
          <g class="ch-steam" fill="none" stroke="#cfe6ff" stroke-width="1.6" opacity=".6"><path d="M650 366 c-3 -5 3 -7 0 -12"/><path d="M657 365 c-3 -5 3 -7 0 -12"/></g></g>
        <g><path d="M700 398 h-30 v-6 h30Z" fill="#2d3550"/><path d="M686 392 L664 318 L630 304" stroke="#2d3550" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M612 296 l34 -8 l6 24 l-30 10Z" fill="#3a4466"/>
          <path d="M624 318 L560 398 L700 398 L650 312Z" fill="#ffcf7a" opacity=".08"/></g></g>
      <g class="rm-ball"><circle cx="96" cy="500" r="20" fill="#f1f1ec"/><path d="M96 489 l9 6 -3 10 h-12 l-3 -10Z" fill="#1d2433"/><path d="M96 489 v-9 M105 495 l9 -3 M102 505 l6 8 M90 505 l-6 8 M87 495 l-9 -3" stroke="#1d2433" stroke-width="1.6"/></g>
    </svg>`;
  }

  /* ------------------------------ JOURNEY LEVELS ------------------------------ */
  const SKIES = {
    egypt: ['#170c26', '#5a2440', '#d9693f'], zewail: ['#08142c', '#123b5e', '#2b8a92'], nebraska: ['#0a1430', '#24497a', '#7fa6cf'],
    industry: ['#141426', '#3b2c3e', '#9a6845'], egypt2: ['#140b2a', '#4a2f5e', '#e08a4c'], florida: ['#1a1040', '#6a2f6a', '#f08a4b'], next: ['#030714', '#0a1d3f', '#126a7a']
  };
  const GROUNDS = { egypt: '#3a1d26', zewail: '#0d2236', nebraska: '#2a3550', industry: '#1d1b26', egypt2: '#24172e', florida: '#173322', next: '#061226' };

  function levelArt(id) {
    reseed(id.length * 13);
    let s = `<svg viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true">`;
    const tw = tower(1520, 600, 300, 'rgba(10,15,35,.75)', 4);
    if (id === 'egypt') {
      s += `<circle cx="1080" cy="380" r="150" fill="#ffb547" opacity=".12"/><circle cx="1080" cy="380" r="86" fill="#ffc15e"/>`;
      s += `<path d="M1150 600 L1270 450 L1390 600Z" fill="#8b3f3a" opacity=".75"/><path d="M1270 450 L1390 600 H1300Z" fill="#6c2e30" opacity=".75"/><path d="M1340 600 L1430 500 L1520 600Z" fill="#7d3a37" opacity=".7"/><path d="M1060 600 L1120 530 L1180 600Z" fill="#7d3a37" opacity=".6"/>`;
      s += `<path d="M0 560 C300 520 600 560 900 540 C1200 520 1400 560 1600 545 V600 H0Z" fill="#4a2230"/>`;
      s += `<g><rect x="260" y="400" width="360" height="200" fill="#2b1631"/><rect x="250" y="392" width="380" height="14" fill="#3a1e3c"/>
        ${Array.from({ length: 18 }, (_, i) => `<rect x="${282 + (i % 9) * 38}" y="${430 + Math.floor(i / 9) * 60}" width="22" height="30" fill="#ffcf7a" opacity="${(0.35 + ((i * 7) % 5) * 0.12).toFixed(2)}"/>`).join('')}
        <rect x="410" y="540" width="60" height="60" fill="#1c0f22"/><path d="M640 400 V300" stroke="#3a1e3c" stroke-width="4"/><path d="M642 304 h40 v24 h-40Z" fill="#c0392b" opacity=".85"/><path d="M642 312 h40" stroke="#fff" stroke-width="6" opacity=".9"/><path d="M642 320 h40" stroke="#111" stroke-width="6" opacity=".9"/>
        <text x="440" y="384" text-anchor="middle" font-family="Anybody, sans-serif" font-weight="800" font-size="26" fill="#ffcf7a" opacity=".8">STEM</text></g>`;
      s += palm(150, 600, 220, '#1d0e22', 16) + palm(780, 600, 180, '#1d0e22', -14);
    } else if (id === 'zewail') {
      s += `<g fill="#0e2a45">${[[120, 420, 200], [360, 360, 170], [560, 450, 120], [740, 330, 230], [1010, 400, 160]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${600 - y}"/>`).join('')}</g>`;
      s += `<g stroke="#2b6b8a" stroke-width="1.4" opacity=".7">${[[120, 420, 200], [360, 360, 170], [740, 330, 230], [1010, 400, 160]].map(([x, y, w]) => Array.from({ length: Math.floor((600 - y) / 30) }, (_, i) => `<path d="M${x} ${y + 30 * (i + 1)} h${w}"/>`).join('') + Array.from({ length: Math.floor(w / 30) }, (_, i) => `<path d="M${x + 30 * (i + 1)} ${y} V600"/>`).join('')).join('')}</g>`;
      s += `<g fill="#46d9ff" opacity=".55">${Array.from({ length: 30 }, () => `<rect x="${Math.round(130 + rnd() * 1030)}" y="${Math.round(350 + rnd() * 220)}" width="10" height="14"/>`).join('')}</g>`;
      s += panels(370, 520, 340, 1, 30, '#1b4f80', '#7fe0ff') + panels(750, 960, 310, 1, 30, '#1b4f80', '#7fe0ff');
      s += turbine(1300, 600, 330, '#bcd3ec', 6) + turbine(1420, 600, 240, '#a9c2de', 8);
    } else if (id === 'nebraska') {
      s += `<path d="M0 520 C400 506 800 512 1200 504 C1400 500 1500 506 1600 504 V600 H0Z" fill="#1f2d48"/>`;
      for (let i = 0; i < 9; i++) s += turbine(700 + i * 95, 515, 120 - i * 4, '#c7d6ea', 5 + (i % 3));
      s += `<g><rect x="230" y="370" width="70" height="230" fill="#5c6d88"/><ellipse cx="265" cy="370" rx="35" ry="16" fill="#7c8ca6"/><rect x="310" y="430" width="140" height="170" fill="#7a2f2f"/><path d="M300 434 L380 380 L460 434Z" fill="#5a2222"/><rect x="360" y="500" width="40" height="100" fill="#3d1818"/></g>`;
      s += `<g stroke="#4c6a3a" stroke-width="5" opacity=".7">${Array.from({ length: 40 }, (_, i) => `<path d="M${i * 40} 600 l14 -42"/>`).join('')}</g>`;
      s += `<g class="snow" fill="#fff">${Array.from({ length: 70 }, () => `<circle cx="${Math.round(rnd() * 1600)}" cy="${Math.round(rnd() * -600)}" r="${(1 + rnd() * 2.2).toFixed(1)}" opacity="${(0.4 + rnd() * 0.5).toFixed(2)}"/>`).join('')}</g>`;
    } else if (id === 'industry') {
      s += `<g fill="#1b1a2a">${Array.from({ length: 3 }, (_, i) => `<rect x="${200 + i * 120}" y="470" width="80" height="130"/><rect x="${210 + i * 120}" y="440" width="60" height="30"/>`).join('')}</g>`;
      s += `<g stroke="#2e2c44" stroke-width="5">${Array.from({ length: 5 }, (_, i) => `<path d="M${180 + i * 100} 600 V380"/>`).join('')}<path d="M170 390 H590 M170 420 H590"/></g>`;
      s += `<g fill="#9aa6c4">${Array.from({ length: 4 }, (_, i) => `<rect x="${224 + i * 100}" y="${392}" width="12" height="30" rx="3"/>`).join('')}</g>`;
      s += `<g class="pumpjack"><path d="M1230 600 L1270 470 L1310 600" fill="none" stroke="#2e2c44" stroke-width="10"/><g class="nod" style="transform-origin:1270px 470px"><rect x="1150" y="460" width="260" height="18" rx="6" fill="#3d3a58"/><path d="M1400 452 c30 0 30 34 0 34Z" fill="#3d3a58"/></g><path d="M1405 486 V600" stroke="#2e2c44" stroke-width="4"/></g>`;
      s += `<g>${[700, 820].map(x => `<circle cx="${x}" cy="555" r="45" fill="#2e2c44"/><circle cx="${x}" cy="555" r="34" fill="#c27a3a" opacity=".7"/><circle cx="${x}" cy="555" r="10" fill="#2e2c44"/>`).join('')}</g>`;
      s += `<g><path d="M920 600 V470 L1000 420 L1080 470 V600Z" fill="#23202f"/>${panels(938, 1060, 438, 1, 26, '#1d4f80', '#ffcf7a')}</g>`;
    } else if (id === 'florida') {
      s += `<circle cx="1180" cy="430" r="110" fill="#ffb26b" opacity=".85"/><circle cx="1180" cy="430" r="190" fill="#ffb26b" opacity=".12"/>`;
      s += `<g><rect x="500" y="250" width="70" height="350" fill="#3a1d3d"/><path d="M490 250 L535 180 L580 250Z" fill="#2c1530"/><circle cx="535" cy="300" r="20" fill="#ffd9a8" opacity=".85"/><path d="M535 300 v-12 M535 300 l9 5" stroke="#3a1d3d" stroke-width="3"/>
        ${Array.from({ length: 6 }, (_, i) => `<rect x="${514 + (i % 2) * 28}" y="${350 + Math.floor(i / 2) * 60}" width="14" height="28" fill="#ffcf7a" opacity=".55"/>`).join('')}</g>`;
      s += `<g fill="#1b1430"><ellipse cx="230" cy="420" rx="200" ry="90"/><ellipse cx="120" cy="450" rx="120" ry="60"/><ellipse cx="340" cy="455" rx="120" ry="60"/><rect x="215" y="440" width="30" height="160"/></g>`;
      s += `<g stroke="#4a5c4a" stroke-width="2" opacity=".6">${Array.from({ length: 18 }, (_, i) => `<path d="M${60 + i * 20} ${470 + (i % 3) * 10} v${30 + (i % 4) * 12}"/>`).join('')}</g>`;
      s += `<path d="M760 600 C800 560 1100 548 1400 560 C1500 566 1560 580 1600 600Z" fill="#1d3a5c"/><path d="M880 572 h120 M1040 580 h140 M1200 570 h90" stroke="#ffb26b" stroke-width="3" opacity=".5"/>`;
      s += `<g class="gator" role="button" tabindex="0" aria-label="Something is in the lake"><ellipse cx="1110" cy="566" rx="40" ry="8" fill="#2c4a2c"/><circle cx="1088" cy="559" r="6" fill="#3d6b3a"/><circle cx="1106" cy="559" r="6" fill="#3d6b3a"/><circle cx="1088" cy="558" r="2.4" fill="#ffd76a"/><circle cx="1106" cy="558" r="2.4" fill="#ffd76a"/></g>`;
      s += palm(700, 600, 300, '#1a0f2e', 20) + palm(860, 600, 230, '#1a0f2e', -16) + palm(1380, 600, 260, '#1a0f2e', 12);
    } else {
      s += `<defs><linearGradient id="qGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bff4ff"/><stop offset=".55" stop-color="#46d9ff"/><stop offset="1" stop-color="#43eba0"/></linearGradient></defs>`;
      s += `<g fill="#0b1d3a" opacity=".7">${Array.from({ length: 34 }, (_, k) => { const w = 24 + rnd() * 40, hh = 30 + rnd() * 110; return `<rect x="${Math.round(k * 48)}" y="${Math.round(600 - hh - 40)}" width="${Math.round(w)}" height="${Math.round(hh + 40)}"/>`; }).join('')}</g>`;
      s += `<path d="M0 600 C200 560 360 540 520 520 C640 506 760 496 860 492" fill="none" stroke="#ffb547" stroke-width="5" stroke-dasharray="14 16" class="flow" opacity=".8"/>`;
      s += `<g class="qmark"><text x="1000" y="592" text-anchor="middle" font-family="Anybody, sans-serif" font-weight="900" font-size="330" fill="none" stroke="#46d9ff" stroke-width="24" opacity=".18">?</text>
        <text x="1000" y="592" text-anchor="middle" font-family="Anybody, sans-serif" font-weight="900" font-size="330" fill="url(#qGrad)">?</text></g>`;
      s += `<g><path d="M640 600 V360" stroke="#c9a36a" stroke-width="10"/>
        <g font-family="Hanken Grotesk, sans-serif" font-weight="700" font-size="22" fill="#1c1430">
          <path d="M646 372 h170 l22 20 -22 20 h-170Z" fill="#ffd76a"/><text x="660" y="400">Research</text>
          <path d="M634 428 h-160 l-22 20 22 20 h160Z" fill="#9be8c4"/><text x="490" y="456">Industry</text>
          <path d="M646 484 h150 l22 20 -22 20 h-150Z" fill="#9fd6ff"/><text x="660" y="512">A startup</text></g></g>`;
      s += `<g fill="#fff">${Array.from({ length: 18 }, () => `<circle class="tw" cx="${Math.round(860 + rnd() * 420)}" cy="${Math.round(80 + rnd() * 300)}" r="${(1 + rnd() * 2).toFixed(1)}" style="animation-delay:${(rnd() * 4).toFixed(1)}s"/>`).join('')}</g>`;
    }
    s += `<g>${tw.svg}</g>`;
    s += `<path d="${cable([-80, 490], tw.arms[0], 40)}" stroke="rgba(10,15,35,.7)" stroke-width="2" fill="none"/><path class="pulse" d="${cable([-80, 490], tw.arms[0], 40)}" stroke="#46d9ff" stroke-width="2.6" fill="none"/>`;
    return s + '</svg>';
  }

  /* ------------------------------ LAB STATIONS ------------------------------ */
  function station(art) {
    const base = `<ellipse cx="160" cy="206" rx="140" ry="12" fill="#000" opacity=".35"/>`;
    if (art === 'microgrid') return `<svg viewBox="0 0 320 220" aria-hidden="true">${base}
      <path d="M20 200 H300" stroke="#1f3b5e" stroke-width="3"/>
      ${turbine(58, 200, 120, '#bcd3ec', 4)}
      <g transform="translate(86 160)"><path d="M0 40 l8 -26 h46 l-8 26Z" fill="#1b4f80"/><path d="M8 14 h46" stroke="#7fe0ff" stroke-width="2"/><path d="M2 34 h44" stroke="#ffb547" stroke-width="2" opacity=".7"/></g>
      <g><path d="M160 200 V130 l20 -14 v14 l20 -14 v14 l20 -14 v14 l20 -14 V200Z" fill="#2c3f5e"/><rect x="226" y="86" width="12" height="44" fill="#3a4f70"/>
        <g class="smoke" fill="#9fb0c8" opacity=".4"><circle cx="232" cy="78" r="6"/><circle cx="238" cy="66" r="8"/><circle cx="230" cy="52" r="9"/></g>
        ${[0, 1, 2].map(i => `<rect x="${172 + i * 22}" y="150" width="12" height="16" fill="#ffcf7a" opacity=".8"/>`).join('')}</g>
      <g><rect x="262" y="140" width="34" height="60" rx="14" fill="#36557f"/><ellipse cx="279" cy="142" rx="17" ry="6" fill="#4d74a6"/><text x="279" y="176" font-size="9" fill="#cfe6ff" text-anchor="middle" font-family="Hanken Grotesk, sans-serif">LAES</text></g>
      <path class="flow" d="M64 196 C100 190 130 196 160 186" fill="none" stroke="#43eba0" stroke-width="3"/><path class="flow" d="M128 178 C140 176 150 178 160 176" fill="none" stroke="#46d9ff" stroke-width="3"/><path class="flow" d="M262 186 C252 186 248 188 240 188" fill="none" stroke="#ffb547" stroke-width="3"/></svg>`;
    if (art === 'battery') return `<svg viewBox="0 0 320 220" aria-hidden="true">${base}
      <rect x="30" y="92" width="130" height="104" rx="8" fill="#22324f"/><rect x="40" y="102" width="110" height="62" rx="3" fill="#081429"/>
      <path class="dash-line" d="M46 116 C70 118 90 122 104 132 C118 142 130 150 144 156" fill="none" stroke="#43eba0" stroke-width="2.4"/>
      <path d="M46 156 C70 154 92 148 108 138 C122 128 134 120 144 116" fill="none" stroke="#ffb547" stroke-width="2" opacity=".7"/>
      <circle cx="52" cy="180" r="6" fill="#ff7a59"/><circle cx="72" cy="180" r="6" fill="#46d9ff"/><rect x="96" y="175" width="50" height="10" rx="3" fill="#33496f"/>
      ${[0, 1, 2].map(i => `<g transform="translate(${196 + i * 36} 0)"><rect x="0" y="104" width="26" height="92" rx="6" fill="#2a3b5c"/><rect x="8" y="98" width="10" height="8" rx="2" fill="#7e8fae"/>
        <rect class="charge c${i}" x="4" y="110" width="18" height="82" rx="3" fill="${['#43eba0', '#ffb547', '#ff7a59'][i]}"/></g>`).join('')}
      <path d="M160 130 C176 120 186 100 205 98 M160 150 C190 160 220 90 241 98" fill="none" stroke="#7e8fae" stroke-width="2"/></svg>`;
    if (art === 'transformer') return `<svg viewBox="0 0 320 220" aria-hidden="true">${base}
      <g class="field" fill="none" stroke="#46d9ff" stroke-width="1.6" stroke-dasharray="4 6" opacity=".7"><ellipse cx="160" cy="118" rx="96" ry="70"/><ellipse cx="160" cy="118" rx="122" ry="88"/></g>
      <path d="M96 56 H224 V180 H96Z M122 82 V154 H198 V82Z" fill="#3a4a66" fill-rule="evenodd"/><path d="M96 56 H224" stroke="#6b7fa6" stroke-width="3"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="86" y="${70 + i * 14}" width="46" height="9" rx="4" fill="#d88a3a"/><rect x="188" y="${70 + i * 14}" width="46" height="9" rx="4" fill="#c97a2e"/>`).join('')}
      <path d="M30 206 V196 H60 V206 H90 V196 H120 V206 H150 V196 H180 V206 H210 V196 H240 V206 H270 V196 H290" fill="none" stroke="#43eba0" stroke-width="2" class="dash-line"/></svg>`;
    return `<svg viewBox="0 0 320 220" aria-hidden="true">${base}
      <g class="sun"><circle cx="252" cy="52" r="22" fill="#ffc15e"/><g class="spin" style="transform-origin:252px 52px;animation-duration:24s" stroke="#ffc15e" stroke-width="3" stroke-linecap="round">${Array.from({ length: 10 }, (_, i) => { const a = i * Math.PI / 5; return `<path d="M${f(252 + Math.cos(a) * 30)} ${f(52 + Math.sin(a) * 30)} L${f(252 + Math.cos(a) * 40)} ${f(52 + Math.sin(a) * 40)}"/>`; }).join('')}</g></g>
      <path class="ray" d="M240 70 L150 130" stroke="#ffd76a" stroke-width="2" stroke-dasharray="4 8" opacity=".7"/>
      <g transform="translate(36 102)"><path d="M0 70 L30 0 H170 L140 70Z" fill="#163e6e"/>${Array.from({ length: 4 }, (_, i) => `<path d="M${30 + i * 35} 0 L${i * 35} 70" stroke="#5fb4e8" stroke-width="1.4"/>`).join('')}<path d="M15 35 H155" stroke="#5fb4e8" stroke-width="1.4"/><path d="M30 0 H170" stroke="#bff4ff" stroke-width="2.4"/>
        <path d="M86 70 V96" stroke="#5a6b8a" stroke-width="8"/><path d="M62 98 H110" stroke="#5a6b8a" stroke-width="6"/></g>
      ${turbine(264, 200, 96, '#bcd3ec', 5)}</svg>`;
  }

  /* ------------------------------ FIELD STATION ------------------------------ */
  function fieldSky() {
    reseed(3);
    let s = `<svg class="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs><linearGradient id="fdSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0d0b24"/><stop offset=".45" stop-color="#2d1d47"/><stop offset=".72" stop-color="#8a3f52"/><stop offset=".86" stop-color="#e2774a"/><stop offset="1" stop-color="#ffb26b"/></linearGradient></defs>
      <rect width="1600" height="900" fill="url(#fdSky)"/>${stars(60, 1600, 300, 0.2)}<circle cx="1220" cy="740" r="120" fill="#ffc77a" opacity=".9"/><circle cx="1220" cy="740" r="230" fill="#ffc77a" opacity=".12"/>`;
    s += `<path d="M0 720 C300 700 600 716 900 706 C1200 696 1400 712 1600 704 V900 H0Z" fill="#2a1a33"/>`;
    const T = [-100, 360, 820, 1280, 1740].map(x => tower(x, 760, 260, '#1a1024', 4));
    s += T.map(t => t.svg).join('') + line(T, '#1a1024', '#ffd76a');
    s += `<path d="M0 760 H1600 V900 H0Z" fill="#160f22"/>` + panels(-20, 1640, 772, 5, 46, '#1a2c55', '#ffb26b');
    return s + '</svg>';
  }

  /* ------------------------------ OFF DUTY ------------------------------ */
  const SK = { skin: '#d79a76', skinSh: '#b8775a', eye: '#1b120e', mouth: '#5e1c22' };
  function person(x, base, h, o) {
    const r = h * .15, hy = base - h + r, sh = hy + r + 2, waist = base - h * .4, bw = h * .3, hair = '#2a1c14';
    const arm = (sx, [hx, hyy]) => `<path d="M${sx} ${sh + 4} L${hx} ${hyy}" stroke="${o.top}" stroke-width="${h * .085}" stroke-linecap="round"/><circle cx="${hx}" cy="${hyy}" r="${h * .045}" fill="${SK.skin}"/>`;
    const legs = o.dress
      ? `<rect x="${x - bw * .32}" y="${base - h * .22}" width="${h * .07}" height="${h * .2}" fill="${SK.skin}"/><rect x="${x + bw * .32 - h * .07}" y="${base - h * .22}" width="${h * .07}" height="${h * .2}" fill="${SK.skin}"/>`
      : `<rect x="${x - bw * .42}" y="${waist - 2}" width="${bw * .4}" height="${base - waist}" rx="3" fill="${o.legs}"/><rect x="${x + bw * .02}" y="${waist - 2}" width="${bw * .4}" height="${base - waist}" rx="3" fill="${o.legs}"/>`;
    const body = o.dress
      ? `<path d="M${x - bw / 2} ${sh + 3} Q${x} ${sh - 3} ${x + bw / 2} ${sh + 3} L${x + bw * .72} ${base - h * .2} H${x - bw * .72}Z" fill="${o.top}"/>`
      : `<rect x="${x - bw / 2}" y="${sh}" width="${bw}" height="${waist - sh + 2}" rx="${bw * .3}" fill="${o.top}"/>`;
    const back = o.long ? `<rect x="${x - r * 1.12}" y="${hy - r * .4}" width="${r * 2.24}" height="${r * (o.dress ? 2.3 : 2)}" rx="${r * .9}" fill="${hair}"/>` : '';
    const tail = o.tail ? `<ellipse cx="${x + r * 1.15}" cy="${hy - r * .15}" rx="${r * .45}" ry="${r * .8}" fill="${hair}" transform="rotate(-20 ${x + r * 1.15} ${hy})"/>` : '';
    const cap = o.long
      ? `<path d="M${x - r * 1.05} ${hy + r * .2} C${x - r * 1.2} ${hy - r * 1.3} ${x + r * 1.2} ${hy - r * 1.3} ${x + r * 1.05} ${hy + r * .2} C${x + r * .7} ${hy - r * .55} ${x - r * .1} ${hy - r * .7} ${x - r * 1.05} ${hy + r * .2}Z" fill="${hair}"/>`
      : `<path d="M${x - r * 1.02} ${hy - r * .05} C${x - r * 1.1} ${hy - r * 1.25} ${x + r * 1.1} ${hy - r * 1.25} ${x + r * 1.02} ${hy - r * .05} C${x + r * .6} ${hy - r * .62} ${x - r * .6} ${hy - r * .62} ${x - r * 1.02} ${hy - r * .05}Z" fill="${hair}"/>`;
    return `<g>${back}${tail}${legs}<ellipse cx="${x - bw * .22}" cy="${base}" rx="${h * .07}" ry="${h * .03}" fill="#333a52"/><ellipse cx="${x + bw * .22}" cy="${base}" rx="${h * .07}" ry="${h * .03}" fill="#333a52"/>
      ${arm(x - bw / 2, o.lh)}${arm(x + bw / 2, o.rh)}${body}<rect x="${x - r * .3}" y="${hy + r * .8}" width="${r * .6}" height="${r * .5}" fill="${SK.skinSh}"/><circle cx="${x}" cy="${hy}" r="${r}" fill="${SK.skin}"/>${cap}
      <circle cx="${x - r * .36}" cy="${hy + r * .05}" r="${r * .11}" fill="${SK.eye}"/><circle cx="${x + r * .36}" cy="${hy + r * .05}" r="${r * .11}" fill="${SK.eye}"/>
      <path d="M${x - r * .32} ${hy + r * .42} Q${x} ${hy + r * .7} ${x + r * .32} ${hy + r * .42}" fill="none" stroke="${SK.mouth}" stroke-width="${r * .1}" stroke-linecap="round"/></g>`;
  }
  function thought() {
    const cloud = 'M420 232 A58 58 0 0 1 392 132 A70 70 0 0 1 500 70 A130 130 0 0 1 690 62 A76 76 0 0 1 812 118 A62 62 0 0 1 800 232 A150 150 0 0 1 610 244 A150 150 0 0 1 420 232Z';
    const b = 236, hm = b - 98 * .4 + 6, hs = b - 86 * .4 + 6;
    return `<g class="od-think" aria-hidden="true">
      <defs><linearGradient id="odThink" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc8ff"/><stop offset=".7" stop-color="#cfe9ff"/><stop offset="1" stop-color="#ffe2c4"/></linearGradient><clipPath id="odThinkClip"><path d="${cloud}"/></clipPath></defs>
      <circle class="tb tb1" cx="666" cy="293" r="4.5" fill="#fff"/><circle class="tb tb2" cx="653" cy="279" r="6.5" fill="#fff"/><circle class="tb tb3" cx="638" cy="263" r="8.5" fill="#fff"/>
      <g class="tc"><path d="${cloud}" fill="url(#odThink)"/>
        <g clip-path="url(#odThinkClip)"><circle cx="768" cy="150" r="22" fill="#fff3c4" opacity=".9"/><path d="M430 168 q14 -14 30 -2 q12 -10 24 2Z M736 196 q10 -10 22 -1 q9 -7 18 1Z" fill="#fff" opacity=".85"/>
          <ellipse cx="610" cy="282" rx="250" ry="52" fill="#6cc28a"/><ellipse cx="610" cy="276" rx="200" ry="36" fill="#7fd39b"/>
          ${person(548, b, 106, { top: '#4a78c2', legs: '#2d3550', lh: [521, b - 44], rh: [579, hm] })}
          ${person(610, b, 98, { top: '#b0476b', dress: true, long: true, lh: [583, hm], rh: [639, hs] })}
          ${person(668, b, 86, { top: '#2fa889', legs: '#3b4a7a', long: true, tail: true, lh: [643, hs], rh: [694, b - 34] })}
          <path d="M720 166 c-5 -8 -17 -4 -12 5 l12 12 l12 -12 c5 -9 -7 -13 -12 -5Z" fill="#ff6b8a"/>
          <text x="604" y="92" text-anchor="middle" font-family="Hanken Grotesk, sans-serif" font-weight="800" font-size="25" fill="#22184a">Everything I’ve done</text>
          <text x="604" y="120" text-anchor="middle" font-family="Hanken Grotesk, sans-serif" font-weight="800" font-size="25" fill="#22184a">is because of them.</text></g>
        <path d="${cloud}" fill="none" stroke="#fff" stroke-width="6"/></g></g>`;
  }
  function offDuty() {
    reseed(9);
    const obj = (id, label, inner) => `<g class="obj" data-obj="${id}" tabindex="0" role="button" aria-label="${label}">${inner}</g>`;
    return `<svg viewBox="0 0 1200 640" class="off-svg" role="group" aria-label="Off-duty scene: a football pitch at sunset with things Phelo enjoys">
      <defs><linearGradient id="odSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1a5e"/><stop offset=".5" stop-color="#a5457c"/><stop offset=".85" stop-color="#ff955a"/><stop offset="1" stop-color="#ffc27a"/></linearGradient>
        <linearGradient id="odGrass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a7d52"/><stop offset="1" stop-color="#1c5a3b"/></linearGradient></defs>
      <rect width="1200" height="640" fill="url(#odSky)"/><circle cx="930" cy="380" r="70" fill="#ffe0a3" opacity=".9"/><circle cx="930" cy="380" r="140" fill="#ffe0a3" opacity=".15"/>
      <path d="M0 400 C200 380 380 392 600 384 C820 376 1000 392 1200 384 V640 H0Z" fill="#3b2361"/>
      ${palm(70, 440, 250, '#23123f', 20)}${palm(1150, 440, 230, '#23123f', -18)}${palm(1040, 430, 160, '#2b1748', 10)}
      <path d="M0 430 L1200 430 L1200 640 L0 640Z" fill="url(#odGrass)"/>
      ${Array.from({ length: 8 }, (_, i) => `<path d="M${i * 150} 430 h75 L${i * 150 + 90} 640 h-80Z" fill="#fff" opacity=".04"/>`).join('')}
      <path d="M0 446 H1200" stroke="#fff" stroke-width="3" opacity=".6"/><path d="M600 446 V640" stroke="#fff" stroke-width="3" opacity=".35"/><ellipse cx="600" cy="560" rx="160" ry="44" fill="none" stroke="#fff" stroke-width="3" opacity=".3"/>
      <g class="goal"><path d="M960 470 V330 H1130 V470" fill="none" stroke="#f4f4f0" stroke-width="7"/><path d="M972 340 L1000 312 H1118 V330" fill="none" stroke="#f4f4f0" stroke-width="3" opacity=".6"/>
        <g stroke="#fff" stroke-width="1" opacity=".3">${Array.from({ length: 9 }, (_, i) => `<path d="M${980 + i * 18} 336 V468"/>`).join('')}${Array.from({ length: 7 }, (_, i) => `<path d="M966 ${350 + i * 18} H1124"/>`).join('')}</g></g>
      ${obj('gym', 'Gym and fitness', `<g transform="translate(70 560)"><rect x="0" y="-12" width="14" height="40" rx="4" fill="#2b2f45"/><rect x="62" y="-12" width="14" height="40" rx="4" fill="#2b2f45"/><rect x="12" y="2" width="52" height="10" rx="3" fill="#9aa6bd"/><rect x="-8" y="-4" width="10" height="26" rx="3" fill="#3b4160"/><rect x="74" y="-4" width="10" height="26" rx="3" fill="#3b4160"/></g>`)}
      ${obj('swim', 'Swimming', `<g transform="translate(205 596)"><ellipse cx="0" cy="0" rx="46" ry="16" fill="#ff6b6b"/><ellipse cx="0" cy="-3" rx="22" ry="7" fill="#1c5a3b"/><path d="M-40 -4 a46 16 0 0 1 20 -10 M40 -4 a46 16 0 0 0 -20 -10" stroke="#fff" stroke-width="8" fill="none"/></g>`)}
      ${obj('music', 'Music and photography', `<g transform="translate(300 500)"><rect x="0" y="40" width="150" height="12" rx="4" fill="#6b4a37"/><rect x="10" y="52" width="10" height="34" fill="#4d3527"/><rect x="130" y="52" width="10" height="34" fill="#4d3527"/>
        <path d="M24 40 C24 12 64 12 64 40" fill="none" stroke="#1d2a3d" stroke-width="6"/><rect x="18" y="28" width="12" height="16" rx="4" fill="#2b3d57"/><rect x="58" y="28" width="12" height="16" rx="4" fill="#2b3d57"/>
        <rect x="88" y="18" width="46" height="26" rx="5" fill="#1f2433"/><circle cx="111" cy="31" r="9" fill="#3b4b6b"/><circle cx="111" cy="31" r="5" fill="#46d9ff" opacity=".6"/><rect x="92" y="14" width="12" height="6" rx="2" fill="#1f2433"/></g>`)}
      ${obj('globe', 'Places and cultures', `<g transform="translate(520 560)"><path d="M0 30 h40 M20 30 V18" stroke="#c9a14a" stroke-width="5"/><circle cx="20" cy="-6" r="24" fill="#2b6fb3"/><path d="M6 -20 c8 4 6 12 14 12 c6 0 4 10 10 12 M24 -28 c-4 6 4 8 8 6" fill="none" stroke="#43eba0" stroke-width="4" stroke-linecap="round"/><path d="M-6 -6 a26 26 0 0 0 52 0" fill="none" stroke="#c9a14a" stroke-width="3"/></g>`)}
      ${obj('family', 'Family', `<g transform="translate(812 560)"><rect x="-10" y="20" width="80" height="8" rx="3" fill="#6b4a37"/><rect x="0" y="28" width="6" height="40" fill="#4d3527"/><rect x="54" y="28" width="6" height="40" fill="#4d3527"/>
        <path d="M14 20 L20 -4 M46 20 L40 -4" stroke="#4d3527" stroke-width="3"/><rect x="4" y="-30" width="52" height="42" rx="4" fill="#8a5a3c"/><rect x="9" y="-25" width="42" height="32" rx="2" fill="#9fd8ff"/>
        <path d="M9 1 Q30 -6 51 1 V7 H9Z" fill="#6cc28a"/>${[[20, 5, 2.6], [30, 5, 2.4], [39, 5, 2.1]].map(([x, y, r]) => `<circle cx="${x}" cy="${y - 12}" r="${r}" fill="${SK.skin}"/><rect x="${x - r}" y="${y - 9}" width="${r * 2}" height="${r * 3.4}" rx="${r}" fill="${['#4a78c2', '#b0476b', '#2fa889'][[20, 30, 39].indexOf(x)]}"/>`).join('')}
        <path d="M58 -40 c-3 -5 -10 -2 -7 3 l7 7 l7 -7 c3 -5 -4 -8 -7 -3Z" fill="#ff6b8a" class="ch-blink"/></g>`)}
      ${obj('ai', 'Energy and AI', `<g transform="translate(935 548)"><circle cx="24" cy="12" r="30" fill="#46d9ff" opacity=".16"/>
        <rect x="4" y="46" width="40" height="26" rx="4" fill="#3b4160"/><rect x="0" y="40" width="48" height="8" rx="3" fill="#5a6385"/>
        <g fill="#9aa6bd">${[12, 20, 28, 36].map(v => `<rect x="${v - 1.5}" y="-12" width="3" height="7"/><rect x="${v - 1.5}" y="29" width="3" height="7"/><rect x="-6" y="${v - 13.5}" width="7" height="3"/><rect x="47" y="${v - 13.5}" width="7" height="3"/>`).join('')}</g>
        <rect x="4" y="-6" width="40" height="36" rx="5" fill="#16223a" stroke="#46d9ff" stroke-width="2"/><path d="M27 0 l-9 13 h7 l-4 12 l12 -15 h-7 l4 -10Z" fill="#43eba0"/></g>`)}
      ${obj('rocket', 'Startups', `<g transform="translate(1090 520)"><path d="M20 0 C34 14 36 44 30 66 H10 C4 44 6 14 20 0Z" fill="#eef2f6"/><circle cx="20" cy="28" r="7" fill="#46d9ff"/><path d="M10 52 L-2 72 H10Z M30 52 L42 72 H30Z" fill="#ff7a59"/><path class="flame" d="M12 68 Q20 96 28 68Z" fill="#ffc15e"/></g>`)}
      <g class="od-ch">${Character.svg({ pose: 'stand', expr: 'happy', place: [590, 300, 160, 298], cls: 'ch-off' })}</g>
      ${thought()}
      ${obj('football', 'Football: take a shot', `<g class="ball"><circle cx="760" cy="586" r="17" fill="#f4f4f0"/><path d="M760 577 l7.5 5 -2.8 8.6 h-9.4 l-2.8 -8.6Z" fill="#1d2433"/><path d="M760 577 v-8 M767.5 582 l7 -3 M764.7 590.6 l5 6 M755.3 590.6 l-5 6 M752.5 582 l-7 -3" stroke="#1d2433" stroke-width="1.6"/></g>`)}
      <text class="gol" x="1045" y="300" text-anchor="middle" font-family="Anybody, sans-serif" font-weight="900" font-size="64" fill="#ffd76a" opacity="0">GOOOL!</text>
    </svg>`;
  }

  /* ------------------------------ LEADERSHIP ------------------------------ */
  function trainerRoom() {
    reseed(44);
    const person = (x, y, s, k) => { const sx = k % 4 === 1 ? 1 : -1; return `<g transform="translate(${x} ${y}) scale(${s})">
      ${k % 2 ? `<g class="hand"><path d="M${sx * 24} 22 L${sx * 34} -44" stroke="#2a3a66" stroke-width="10" stroke-linecap="round"/><circle cx="${sx * 35}" cy="-48" r="7" fill="#c98f6c"/></g>` : ''}
      <path d="M-34 60 C-34 22 -22 14 0 14 C22 14 34 22 34 60Z" fill="#18213f"/><circle cx="0" cy="-6" r="18" fill="#18213f"/>
      <path d="M-34 60 C-34 22 -22 14 0 14 C22 14 34 22 34 60" fill="none" stroke="#3a5a92" stroke-width="2"/><path d="M-14 -21 A18 18 0 0 1 16 -14" fill="none" stroke="#5a86c8" stroke-width="2"/></g>`; };
    return `<svg viewBox="0 0 720 460" class="tr-svg" role="img" aria-label="Phelo presenting a training session on the Sustainable Development Goals to an audience">
      <defs><linearGradient id="trWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14123a"/><stop offset="1" stop-color="#1d1a45"/></linearGradient>
        <radialGradient id="trSpot" cx="160" cy="300" r="230" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffcf7a" stop-opacity=".28"/><stop offset="1" stop-color="#ffcf7a" stop-opacity="0"/></radialGradient>
        <radialGradient id="trBeam" cx="500" cy="160" r="260" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#46d9ff" stop-opacity=".16"/><stop offset="1" stop-color="#46d9ff" stop-opacity="0"/></radialGradient></defs>
      <rect width="720" height="460" fill="url(#trWall)"/><rect width="720" height="460" fill="url(#trBeam)"/>
      <path d="M120 0 L40 380 H290 L210 0Z" fill="#ffcf7a" opacity=".07"/><rect width="720" height="460" fill="url(#trSpot)"/>
      <rect x="0" y="380" width="720" height="80" fill="#100d2c"/><path d="M0 380 H720" stroke="#2f2a5e" stroke-width="2"/>
      <g><rect x="318" y="40" width="372" height="238" rx="8" fill="#0d1530"/><rect x="328" y="50" width="352" height="218" rx="3" fill="#f2f5fa"/>
        <g class="tr-slide" id="trSlide"></g><path d="M504 278 V312 M470 312 H538" stroke="#26315a" stroke-width="6" stroke-linecap="round"/></g>
      <g class="tr-ch">${Character.svg({ pose: 'point', expr: 'happy', place: [80, 82, 172, 320], cls: 'ch-trainer' })}</g>
      <g class="tr-aud">${[[70, 430, 1], [180, 440, 2], [300, 428, 3], [420, 442, 4], [540, 430, 5], [650, 440, 6], [130, 470, 7], [360, 472, 8], [590, 470, 9]].map(([x, y, k]) => person(x, y, 1.15, k)).join('')}</g>
    </svg>`;
  }
  function trainerSlide(i, title) {
    const pal = ['#46d9ff', '#43eba0', '#ffb547', '#ff7a59', '#7aa7ff'];
    const words = title.split(' '); let lines = [''], n = 0;
    words.forEach(w => { if ((lines[n] + ' ' + w).trim().length > 24) { lines[++n] = w; } else lines[n] = (lines[n] + ' ' + w).trim(); });
    const head = lines.map((l, k) => `<text x="352" y="${92 + k * 28}" font-family="Anybody, sans-serif" font-weight="800" font-size="24" fill="#10203a">${l.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>`).join('');
    let art = '';
    if (i === 0) art = Array.from({ length: 17 }, (_, k) => `<rect x="${352 + (k % 9) * 34}" y="${164 + Math.floor(k / 9) * 34}" width="28" height="28" rx="5" fill="${pal[k % 5]}" opacity=".85"/>`).join('');
    else if (i === 1) art = `<circle cx="420" cy="200" r="26" fill="#ffc15e"/><path d="M500 166 l-18 34 h16 l-10 30 l30 -40 h-16 l12 -24Z" fill="#46d9ff"/><path d="M552 228 l20 -46 h70 l-20 46Z" fill="#1b4f80"/><path d="M572 182 h70" stroke="#7fe0ff" stroke-width="3"/>`;
    else if (i === 2) art = `<circle cx="430" cy="200" r="38" fill="#2b6fb3"/><path d="M406 186 c10 6 8 16 20 14 c8 0 6 14 14 16 M436 172 c-4 6 6 10 10 8" fill="none" stroke="#43eba0" stroke-width="5" stroke-linecap="round"/>
      <path d="M512 236 L540 214 L568 222 L596 196 L624 204 L652 178" fill="none" stroke="#ff7a59" stroke-width="4"/><path d="M512 240 H656" stroke="#9aa6b6" stroke-width="2"/>`;
    else art = `<text x="504" y="246" text-anchor="middle" font-family="Anybody, sans-serif" font-weight="900" font-size="110" fill="#46d9ff">?</text>`;
    return head + art + `<text x="664" y="258" text-anchor="end" font-family="Hanken Grotesk, sans-serif" font-size="12" fill="#6a7790">${i + 1}</text>`;
  }

  /* ------------------------------ CONTACT ------------------------------ */
  function contactSky() {
    reseed(31);
    const cities = [[390, 768, 'Cairo'], [760, 749, 'Lincoln'], [1060, 756, 'Gainesville']];
    let lights = '';
    for (let i = 0; i < 90; i++) { const x = 200 + rnd() * 1200; lights += `<rect x="${f(x)}" y="${f(790 + rnd() * 70)}" width="3" height="3" fill="${rnd() < 0.7 ? '#ffd58a' : '#7fe0ff'}" opacity="${f(0.3 + rnd() * 0.5)}"/>`; }
    return `<svg class="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs><linearGradient id="ctSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02050f"/><stop offset="1" stop-color="#0a2140"/></linearGradient></defs>
      <rect width="1600" height="900" fill="url(#ctSky)"/>${stars(150, 1600, 700)}
      <path d="M0 800 C300 762 600 746 800 748 C1000 750 1300 764 1600 800 V900 H0Z" fill="#06142b"/><path d="M0 800 C300 762 600 746 800 748 C1000 750 1300 764 1600 800" fill="none" stroke="#46d9ff" stroke-width="2" opacity=".3"/>
      ${lights}
      <g class="rings" fill="none" stroke="#46d9ff">${[0, 1, 2].map(i => `<circle class="ring" cx="1060" cy="756" r="22" style="animation-delay:${i * 1.3}s"/>`).join('')}</g>
      <g fill="none" stroke-width="2.4">
        <path class="arc" d="M390 768 Q575 560 760 749" stroke="#43eba0"/>
        <path class="arc" d="M760 749 Q575 680 390 768" stroke="#43eba0" opacity=".55"/>
        <path class="arc" d="M390 768 Q725 400 1060 756" stroke="#46d9ff"/>
        <path class="arc" d="M1060 756 Q1210 590 1350 778" stroke="#ffb547"/></g>
      ${cities.map(([x, y, n]) => `<circle cx="${x}" cy="${y}" r="8" fill="#bff4ff"/><circle cx="${x}" cy="${y}" r="18" fill="#46d9ff" opacity=".2"/><text x="${x}" y="${y + 44}" text-anchor="middle" font-family="Hanken Grotesk, sans-serif" font-size="22" font-weight="600" fill="#cfe0ff">${n}</text>`).join('')}
      <circle cx="1350" cy="778" r="20" fill="none" stroke="#ffb547" stroke-width="2.4" stroke-dasharray="5 5"/>
      <text x="1350" y="790" text-anchor="middle" font-family="Anybody, sans-serif" font-size="30" font-weight="900" fill="#ffb547">?</text>
      <text x="1350" y="830" text-anchor="middle" font-family="Hanken Grotesk, sans-serif" font-size="22" font-weight="600" fill="#ffd9a8">Next</text>
    </svg>`;
  }

  return { heroSky, heroCore, ground, room, levelArt, SKIES, GROUNDS, station, fieldSky, offDuty, contactSky, tower, turbine, trainerRoom, trainerSlide };
})();
