const IMG = { portrait: 'assets/marka-portrait-hq.png', point: 'assets/marka-point-hq.png', selfie: 'assets/marka-selfie-hq.png' };
const HEAD = "'Bricolage Grotesque', system-ui, sans-serif";
const BODY = "'DM Sans', system-ui, sans-serif";
const MONO = "'DM Mono', ui-monospace, monospace";
const INK = '#12121a', BG = '#f4f3fb', MUTED = '#5d6075', LINE = 'rgba(110,100,210,0.14)';
const SERIF = "'Instrument Serif', Georgia, serif";
let GRAD = 'linear-gradient(100deg, #3d6bff, #8b5cf6)';
const gradText = () => ({ backgroundImage: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' });
const GLOW = '0 14px 30px -10px rgba(91,92,246,0.55)';
const BRAND = ['#d4623c', '#f2dcc8', '#2f3b31'];
const MOTION = { enter: Easing.easeOutCubic, move: Easing.easeInOutCubic, pop: Easing.easeOutBack };

function kf(T, keys, ease) {
  ease = ease || MOTION.move;
  if (T <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1] = keys[i], [t0, v0] = keys[i - 1];
    if (T <= t1) { const p = t1 === t0 ? 1 : (T - t0) / (t1 - t0); return v0 + (v1 - v0) * ease(p); }
  }
  return keys[keys.length - 1][1];
}
const inOut = (T, a, b, d = 0.4) => kf(T, [[a, 0], [a + d, 1], [b - d, 1], [b, 0]], MOTION.enter);
const pop = (T, s, d = 0.55) => kf(T, [[s, 0], [s + d, 1]], MOTION.pop);
const fade = (T, s, d = 0.3) => kf(T, [[s, 0], [s + d, 1]], MOTION.enter);
const typed = (txt, T, s, e) => txt.slice(0, Math.round(clamp((T - s) / (e - s), 0, 1) * txt.length));
const abs = (x, y, extra) => Object.assign({ position: 'absolute', left: x, top: y }, extra);
const stripes = 'repeating-linear-gradient(135deg, rgba(21,23,28,0.06) 0 10px, transparent 10px 20px)';

/* ---------- shared bits ---------- */
function MiniPost({ w, kind, T, t0, accent }) {
  const mh = Math.round(w * 1.0);
  let media;
  if (kind === 'post') media = (
    <div style={{ height: '100%', background: BRAND[0], display: 'flex', alignItems: 'flex-end', padding: 20, boxSizing: 'border-box' }}>
      <div style={{ font: `800 ${w * 0.12}px/1.02 ${HEAD}`, color: BRAND[1], textWrap: 'balance' }}>Slow mornings start here.</div>
    </div>);
  if (kind === 'carousel') {
    const idx = kf(T, [[t0 + 1.2, 0], [t0 + 1.7, 1], [t0 + 2.9, 1], [t0 + 3.4, 2]]);
    media = (
      <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', height: '100%', transform: `translateX(${-idx * w}px)` }}>
          {['01', '02', '03'].map((n, i) => (
            <div key={n} style={{ width: w, flex: 'none', height: '100%', background: [BRAND[1], BRAND[0], BRAND[2]][i], padding: 20, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ font: `500 ${w * 0.055}px ${MONO}`, color: i === 0 ? BRAND[2] : BRAND[1] }}>GLAZE GUIDE</div>
              <div style={{ font: `800 ${w * 0.3}px/1 ${HEAD}`, color: i === 0 ? BRAND[0] : BRAND[1] }}>{n}</div>
            </div>))}
        </div>
        <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: 4, background: '#fff', opacity: Math.abs(idx - i) < 0.5 ? 1 : 0.45 }}></div>)}
        </div>
      </div>);
  }
  if (kind === 'image') media = (
    <div style={{ height: '100%', background: BRAND[1], position: 'relative' }}>
      <div style={{ position: 'absolute', left: '22%', top: '22%', width: '56%', height: '56%', borderRadius: '50%', background: BRAND[0] }}></div>
      <div style={{ position: 'absolute', left: '36%', top: '36%', width: '28%', height: '28%', borderRadius: '50%', background: BRAND[2] }}></div>
    </div>);
  if (kind === 'video') {
    const p = clamp((T - t0) / 5, 0, 1);
    media = (
      <div style={{ height: '100%', background: BRAND[2], position: 'relative' }}>
        <div style={{ position: 'absolute', left: '50%', top: '45%', transform: 'translate(-35%,-50%)', width: 0, height: 0, borderTop: `${w * 0.08}px solid transparent`, borderBottom: `${w * 0.08}px solid transparent`, borderLeft: `${w * 0.13}px solid ${BRAND[1]}` }}></div>
        <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.25)' }}>
          <div style={{ width: `${p * 100}%`, height: '100%', borderRadius: 3, background: BRAND[0] }}></div>
        </div>
        <div style={{ position: 'absolute', right: 16, top: 14, font: `500 ${w * 0.055}px ${MONO}`, color: BRAND[1] }}>0:15</div>
      </div>);
  }
  return (
    <div style={{ width: w, background: '#fff', borderRadius: 20, padding: 12, boxSizing: 'border-box', boxShadow: '0 24px 48px -28px rgba(90,70,200,0.35)', border: `1px solid ${LINE}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '2px 4px 12px' }}>
        <div style={{ width: 26, height: 26, borderRadius: 13, background: BRAND[0] }}></div>
        <div style={{ font: `600 16px ${BODY}`, color: INK }}>clayhouse.co</div>
      </div>
      <div style={{ height: mh - 24, borderRadius: 12, overflow: 'hidden' }}>{media}</div>
    </div>
  );
}

function Browser({ url }) {
  return (
    <div style={{ width: 1100, height: 640, background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 40px 80px -40px rgba(90,70,200,0.35)', border: `1px solid ${LINE}` }}>
      <div style={{ height: 56, display: 'flex', alignItems: 'center', gap: 10, padding: '0 22px', borderBottom: `1px solid ${LINE}`, background: '#f7f8fa' }}>
        {[0, 1, 2].map(i => <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: '#d5d9e0' }}></div>)}
        <div style={{ marginLeft: 20, flex: 1, height: 34, borderRadius: 17, background: '#fff', border: `1px solid ${LINE}`, display: 'flex', alignItems: 'center', padding: '0 18px', font: `500 17px ${BODY}`, color: MUTED }}>{url}</div>
      </div>
      <div style={{ padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ font: `800 26px ${HEAD}`, color: BRAND[2] }}>Clayhouse</div>
        <div style={{ display: 'flex', gap: 28, font: `500 17px ${BODY}`, color: MUTED }}><span>Shop</span><span>Studio</span><span>Journal</span></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, padding: '20px 48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, paddingTop: 30 }}>
          <div style={{ font: `800 54px/1.02 ${HEAD}`, color: BRAND[2], textWrap: 'balance' }}>Handmade stoneware for slow mornings.</div>
          <div style={{ font: `400 19px/1.45 ${BODY}`, color: MUTED }}>Small-batch mugs and bowls, thrown and glazed in our Portland studio.</div>
          <div style={{ alignSelf: 'flex-start', background: BRAND[0], color: '#fff', font: `600 18px ${BODY}`, padding: '14px 24px', borderRadius: 999 }}>Shop the collection</div>
        </div>
        <div style={{ height: 380, borderRadius: 18, background: `${stripes}, ${BRAND[1]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `500 15px ${MONO}`, color: BRAND[2] }}>product photo</div>
      </div>
    </div>
  );
}

/* ---------- Hook + Meet: website → brand profile ---------- */
function Website({ T, C, accent }) {
  const M = C.Meet, X = C.Create;
  const bx = kf(T, [[0, 410], [2.3, 410], [3.1, 190], [M - 0.2, 190], [M + 0.8, 1070]]);
  const by = kf(T, [[0, 190], [M - 0.2, 190], [M + 0.8, 230]]);
  const bs = kf(T, [[0, 0.95], [2.3, 1], [M - 0.2, 1.01], [M + 0.8, 0.6]]);
  const out = kf(T, [[X - 0.3, 1], [X + 0.25, 0]], MOTION.enter);
  const lift = (1 - out) * -40;
  const scan = clamp((T - (M + 3.3)) / 0.8, 0, 1);
  const scanOn = inOut(T, M + 3.2, M + 4.3, 0.15);
  const url = 'clayhouse.co';
  const press = 1 - 0.06 * kf(T, [[M + 3.0, 0], [M + 3.12, 1], [M + 3.3, 0]], MOTION.move);
  const inp = fade(T, M + 1.0, 0.45);
  const tiles = [
    { k: 'PRODUCT', v: 'Handmade stoneware' },
    { k: 'AUDIENCE', v: 'Home cooks, 25–40' },
    { k: 'COLORS', v: null },
    { k: 'VOICE', v: 'Warm, unhurried' },
  ];
  const cardX = [1390, 1515, 1640], cardY = [250, 290, 330], cardR = [-8, 0, 8];
  const cardsOut = kf(T, [[M - 0.5, 1], [M + 0.1, 0]], MOTION.enter);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: out, transform: `translateY(${lift}px)` }}>
      {cardX.map((x, i) => {
        const p = pop(T, 2.8 + i * 0.28);
        return (
          <div key={i} style={abs(x, cardY[i] + (1 - p) * 40 + (1 - cardsOut) * 40, { opacity: Math.min(clamp(p, 0, 1) * 1.4, 1) * cardsOut, transform: `rotate(${cardR[i]}deg) scale(${0.85 + 0.15 * p})`, transformOrigin: 'bottom center' })}>
            <MiniPost w={230} kind={['post', 'image', 'video'][i]} T={T} t0={3} accent={accent} />
          </div>);
      })}
      <div style={abs(bx, by, { transform: `scale(${bs})`, transformOrigin: 'top left' })}>
        <Browser url={url} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 56 + scan * 584, height: 4, backgroundImage: GRAD, opacity: scanOn, boxShadow: `0 0 50px 22px ${accent}44` }}></div>
      </div>
      <div style={abs(1000, 120 + (1 - inp) * 24, { width: 800, height: 88, opacity: inp, background: '#fff', borderRadius: 44, border: `1px solid ${LINE}`, boxShadow: '0 20px 40px -30px rgba(90,70,200,0.4)', display: 'flex', alignItems: 'center', padding: '0 10px 0 34px', boxSizing: 'border-box', gap: 16 })}>
        <div style={{ flex: 1, font: `500 26px ${BODY}`, color: T < M + 1.8 ? '#9aa0ac' : INK }}>
          {T < M + 1.8 ? 'Paste your website' : typed(url, T, M + 1.8, M + 2.7)}
          {T >= M + 1.8 && T < M + 3.0 && Math.floor(T * 3) % 2 === 0 ? <span style={{ color: accent }}>|</span> : null}
        </div>
        <div style={{ backgroundImage: GRAD, boxShadow: GLOW, color: '#fff', font: `600 22px ${BODY}`, padding: '0 28px', height: 68, display: 'flex', alignItems: 'center', borderRadius: 34, transform: `scale(${press})` }}>Learn my brand</div>
      </div>
      {tiles.map((tl, i) => {
        const p = pop(T, M + 4.2 + i * 0.7, 0.5);
        return (
          <div key={tl.k} style={abs(1000 + (i % 2) * 410, 640 + Math.floor(i / 2) * 130 + (1 - p) * 24, { width: 390, height: 112, opacity: clamp(p, 0, 1), background: '#fff', borderRadius: 22, border: `1px solid ${LINE}`, padding: '20px 26px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' })}>
            <div style={{ font: `500 15px ${MONO}`, color: accent, letterSpacing: '0.08em' }}>{tl.k}</div>
            {tl.v ? <div style={{ font: `600 28px ${HEAD}`, color: INK }}>{tl.v}</div> : (
              <div style={{ display: 'flex', gap: 10 }}>{BRAND.map(c => <div key={c} style={{ width: 54, height: 34, borderRadius: 10, background: c, border: `1px solid ${LINE}` }}></div>)}</div>)}
          </div>);
      })}
    </div>
  );
}

/* ---------- Create: formats + platforms ---------- */
function Formats({ T, C, accent }) {
  const X = C.Create, E = C.Extras;
  const out = kf(T, [[E - 0.3, 1], [E + 0.25, 0]], MOTION.enter);
  const kinds = [['post', 'Post'], ['carousel', 'Carousel'], ['image', 'Image'], ['video', 'Video']];
  const plats = ['Instagram', 'TikTok', 'Facebook', 'X', '+ more'];
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: out, transform: `translateY(${(1 - out) * -40}px)` }}>
      {kinds.map(([k, label], i) => {
        const s = X + 0.6 + i * 0.7, p = pop(T, s);
        return (
          <div key={k} style={abs(660 + i * 300, 230 + (1 - p) * 50, { opacity: clamp(p * 1.5, 0, 1) * (T >= s ? 1 : 0), transform: `translateY(${6 * Math.sin(T * 1.6 + i * 1.1)}px) rotate(${(1 - p) * (i % 2 ? 4 : -4)}deg) scale(${0.88 + 0.12 * p})`, display: 'flex', flexDirection: 'column', gap: 18 })}>
            <MiniPost w={270} kind={k} T={T} t0={s} accent={accent} />
            <div style={{ font: `600 26px ${HEAD}`, color: INK, paddingLeft: 6 }}>{label}</div>
          </div>);
      })}
      <div style={abs(660, 690, { display: 'flex', gap: 14 })}>
        {plats.map((p, i) => {
          const a = pop(T, X + 3.7 + i * 0.3, 0.45);
          return <div key={p} style={{ opacity: clamp(a, 0, 1), transform: `translateY(${(1 - a) * 20}px)`, background: i === 4 ? 'transparent' : '#fff', border: `1.5px solid ${i === 4 ? accent : LINE}`, color: i === 4 ? accent : INK, font: `600 26px ${BODY}`, padding: '14px 28px', borderRadius: 999 }}>{p}</div>;
        })}
      </div>
    </div>
  );
}

/* ---------- Extras: ad cloning, Reddit, approval ---------- */
function StructBox({ label, on, accent, style }) {
  return (
    <div style={Object.assign({ position: 'absolute', border: `2.5px dashed ${accent}`, borderRadius: 10, opacity: on, transform: `scale(${1.06 - 0.06 * on})` }, style)}>
      <div style={{ position: 'absolute', top: -14, left: 10, background: accent, color: '#fff', font: `500 13px ${MONO}`, padding: '3px 8px', borderRadius: 6, letterSpacing: '0.06em' }}>{label}</div>
    </div>);
}
function AdCard({ brand, T, s, accent }) {
  const box = i => clamp(pop(T, s + i * 0.3, 0.4), 0, 1.2);
  return (
    <div style={{ position: 'relative', width: 300, height: 420, background: '#fff', borderRadius: 20, border: `1px solid ${LINE}`, boxShadow: '0 24px 48px -30px rgba(90,70,200,0.35)', padding: 18, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ height: 62, display: 'flex', alignItems: 'center', font: `800 26px/1.05 ${HEAD}`, color: brand ? BRAND[2] : 'transparent', background: brand ? 'transparent' : '#dde2ea', borderRadius: 8 }}>{brand ? 'Mugs that survive Monday.' : ''}</div>
      <div style={{ flex: 1, borderRadius: 12, background: brand ? BRAND[1] : `${stripes}, #e7ebf1`, position: 'relative' }}>
        {brand && <div style={{ position: 'absolute', left: '30%', top: '22%', width: '40%', aspectRatio: '1', borderRadius: '50%', background: BRAND[0] }}></div>}
      </div>
      <div style={{ height: 54, borderRadius: 27, background: brand ? BRAND[0] : '#c9d0db', color: '#fff', font: `600 20px ${BODY}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{brand ? 'Shop now' : ''}</div>
      <StructBox label="HOOK" on={box(0)} accent={accent} style={{ left: 10, top: 10, right: 10, height: 78 }} />
      <StructBox label="VISUAL" on={box(1)} accent={accent} style={{ left: 10, top: 100, right: 10, bottom: 88 }} />
      <StructBox label="CTA" on={box(2)} accent={accent} style={{ left: 10, bottom: 10, right: 10, height: 70 }} />
    </div>);
}
function Workspace({ T, C, accent }) {
  const E = C.Extras, Z = C.CTA;
  const vis = kf(T, [[E - 0.15, 0], [E + 0.4, 1], [Z - 0.3, 1], [Z + 0.2, 0]], MOTION.enter);
  const page = kf(T, [[E + 2.4, 0], [E + 2.9, 1], [E + 4.9, 1], [E + 5.4, 2]]);
  const tabs = [{ l: 36, w: 128, t: 'Ad ideas' }, { l: 200, w: 188, t: 'Reddit replies' }, { l: 424, w: 142, t: 'Approvals' }];
  const lerpTab = k => { const i = Math.min(Math.floor(page), 1), f = page - i; return tabs[i][k] + (tabs[i + 1][k] - tabs[i][k]) * f; };
  const reply = "Stoneware fired at high temperature chips far less than earthenware. A fully glazed rim helps too. Happy to share more tips!";
  const approved = T >= E + 6.1;
  const click = 1 - 0.25 * kf(T, [[E + 6.0, 0], [E + 6.08, 1], [E + 6.25, 0]]);
  const ab = pop(T, E + 6.1, 0.4);
  return (
    <div style={abs(660, 190 + (1 - vis) * 40, { width: 1160, height: 700, opacity: vis, background: '#fff', borderRadius: 28, border: `1px solid ${LINE}`, boxShadow: '0 40px 80px -50px rgba(90,70,200,0.4)', overflow: 'hidden' })}>
      <div style={{ position: 'relative', height: 80, borderBottom: `1px solid ${LINE}` }}>
        {tabs.map((tb, i) => <div key={tb.t} style={abs(tb.l, 26, { font: `600 22px ${BODY}`, color: Math.round(page) === i ? INK : '#9aa0ac' })}>{tb.t}</div>)}
        <div style={abs(lerpTab('l'), 76, { width: lerpTab('w'), height: 4, borderRadius: 2, backgroundImage: GRAD })}></div>
      </div>
      <div style={{ position: 'relative', height: 620, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: 3480, height: 620, display: 'flex', transform: `translateX(${-page * 1160}px)` }}>
          <div style={{ position: 'relative', width: 1160, flex: 'none' }}>
            <div style={abs(150, 30, { font: `500 15px ${MONO}`, color: MUTED, letterSpacing: '0.08em' })}>TOP-PERFORMING AD</div>
            <div style={abs(150, 70)}><AdCard brand={false} T={T} s={E + 0.5} accent={accent} /></div>
            <div style={abs(490, 270, { width: 180 * clamp(fade(T, E + 1.4, 0.5), 0, 1), height: 3, background: INK, borderRadius: 2 })}></div>
            <div style={abs(490, 225, { font: `600 18px ${BODY}`, color: INK, opacity: fade(T, E + 1.5) })}>Clone structure</div>
            <div style={abs(710, 30, { font: `500 15px ${MONO}`, color: accent, letterSpacing: '0.08em', opacity: fade(T, E + 1.8) })}>YOUR VERSION</div>
            <div style={abs(710 + (1 - fade(T, E + 1.8, 0.5)) * 40, 70, { opacity: fade(T, E + 1.8, 0.4) })}><AdCard brand={true} T={T} s={E + 1.9} accent={accent} /></div>
          </div>
          <div style={{ position: 'relative', width: 1160, flex: 'none' }}>
            <div style={abs(120, 50, { width: 920, display: 'flex', flexDirection: 'column', gap: 14 })}>
              <div style={{ font: `500 18px ${MONO}`, color: MUTED }}>r/Pottery · 2h</div>
              <div style={{ font: `800 40px/1.1 ${HEAD}`, color: INK }}>Any tips for finding mugs that don’t chip?</div>
              <div style={{ font: `500 18px ${BODY}`, color: MUTED }}>128 comments</div>
            </div>
            <div style={abs(120, 270, { width: 920, minHeight: 250, border: `2px solid ${accent}`, borderRadius: 22, padding: '24px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 16, opacity: fade(T, E + 2.9, 0.4) })}>
              <div style={{ alignSelf: 'flex-start', font: `600 16px ${BODY}`, color: accent, background: `${accent}18`, padding: '6px 14px', borderRadius: 999 }}>Draft by Marka · your brand voice</div>
              <div style={{ font: `400 28px/1.4 ${BODY}`, color: INK }}>{typed(reply, T, E + 3.1, E + 4.7)}</div>
            </div>
          </div>
          <div style={{ position: 'relative', width: 1160, flex: 'none' }}>
            <div style={abs(150, 50)}><MiniPost w={320} kind="post" T={T} t0={E} accent={accent} /></div>
            <div style={abs(560, 80, { display: 'flex', flexDirection: 'column', gap: 18, width: 500 })}>
              <div style={{ font: `500 16px ${MONO}`, color: MUTED, letterSpacing: '0.06em' }}>INSTAGRAM · FRI 9:00</div>
              <div style={{ font: `800 40px/1.1 ${HEAD}`, color: INK }}>Slow mornings start here.</div>
              <div style={{ alignSelf: 'flex-start', font: `600 20px ${BODY}`, padding: '10px 20px', borderRadius: 999, background: approved ? '#e3f3e6' : '#fbefd9', color: approved ? '#1f6b34' : '#8a5a00', transform: `scale(${approved ? 0.9 + 0.1 * ab : 1})` }}>{approved ? '✓ Approved · goes live Fri 9:00' : 'Waiting for your approval'}</div>
            </div>
            <div style={abs(560, 330, { display: 'flex', gap: 16 })}>
              <div style={{ width: 220, height: 72, borderRadius: 36, background: approved ? '#1f6b34' : undefined, backgroundImage: approved ? 'none' : GRAD, boxShadow: approved ? 'none' : GLOW, color: '#fff', font: `600 24px ${BODY}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${click})` }}>{approved ? 'Approved' : 'Approve'}</div>
              <div style={{ width: 140, height: 72, borderRadius: 36, border: `1.5px solid ${LINE}`, color: INK, font: `600 24px ${BODY}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Edit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Cursor({ T, C }) {
  const E = C.Extras;
  const x = kf(T, [[E + 5.3, 1560], [E + 5.95, 1336]]);
  const y = kf(T, [[E + 5.3, 900], [E + 5.95, 640]]);
  const o = kf(T, [[E + 5.2, 0], [E + 5.4, 1], [C.CTA - 0.3, 1], [C.CTA, 0]], MOTION.enter);
  const s = 1 - 0.15 * kf(T, [[E + 6.0, 0], [E + 6.08, 1], [E + 6.25, 0]]);
  return (
    <div style={abs(x, y, { opacity: o, transform: `scale(${s})`, transformOrigin: 'top left', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))' })}>
      <svg width="34" height="44" viewBox="0 0 34 44"><path d="M2 2 L2 36 L11 28 L17 42 L23 39 L17 26 L30 26 Z" fill={INK} stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" /></svg>
    </div>);
}

/* ---------- CTA ---------- */
function Closing({ T, C, accent }) {
  const Z = C.CTA;
  const l1 = fade(T, Z + 0.1, 0.5), l2 = fade(T, Z + 0.9, 0.5), row = fade(T, Z + 1.9, 0.5), wm = fade(T, Z + 2.2, 0.5);
  const pulse = 1 + 0.05 * kf(T, [[Z + 2.9, 0], [Z + 3.1, 1], [Z + 3.4, 0]]);
  const line = (o, txt, g) => <div style={Object.assign({ opacity: o, transform: `translateY(${(1 - o) * 30}px)`, font: `800 112px/1.04 ${HEAD}`, color: INK, letterSpacing: '-0.045em', paddingBottom: 6, alignSelf: 'flex-start' }, g ? gradText() : {})}>{txt}</div>;
  return (
    <div style={abs(140, 230, { display: 'flex', flexDirection: 'column', gap: 0, width: 960 })}>
      {line(l1, 'Paste your website.')}
      {line(l2, 'Get your content.', true)}
      <div style={{ marginTop: 56, display: 'flex', gap: 14, opacity: row, transform: `translateY(${(1 - row) * 24}px)` }}>
        <div style={{ width: 400, height: 92, borderRadius: 46, background: '#fff', border: `1px solid ${LINE}`, display: 'flex', alignItems: 'center', padding: '0 34px', boxSizing: 'border-box', font: `500 26px ${BODY}`, color: '#9aa0ac' }}>yourwebsite.com</div>
        <div style={{ height: 92, borderRadius: 46, backgroundImage: GRAD, boxShadow: GLOW, color: '#fff', padding: '0 38px', display: 'flex', alignItems: 'center', font: `600 28px ${BODY}`, transform: `scale(${pulse})` }}>Start your 3-day trial</div>
      </div>
      <div style={{ marginTop: 44, opacity: wm, font: `800 56px ${HEAD}`, color: INK, letterSpacing: '-0.03em', display: 'flex', alignItems: 'baseline' }}>marka<span style={{ font: `italic 400 62px ${SERIF}`, letterSpacing: 0, color: accent, marginLeft: 2, paddingBottom: 4, borderBottom: `3px solid ${accent}`, borderRadius: 4 }}>.social</span></div>
    </div>
  );
}

/* ---------- Marka ---------- */
function Cat({ T, C }) {
  const P = { meet: [200, 160, 640, 592], create: [110, 200, 470, 650], extras: [110, 250, 490, 454], cta: [1160, 200, 640, 520] };
  const k = i => kf(T, [[C.Meet, P.meet[i]], [C.Create - 0.3, P.meet[i]], [C.Create + 0.5, P.create[i]], [C.Extras - 0.3, P.create[i]], [C.Extras + 0.5, P.extras[i]], [C.CTA - 0.3, P.extras[i]], [C.CTA + 0.5, P.cta[i]]]);
  const [x, y, w, h] = [k(0), k(1), k(2), k(3)];
  const e = pop(T, C.Meet, 0.7), o = fade(T, C.Meet, 0.3);
  const pt = fade(T, C.Create - 0.2, 0.4) * (1 - fade(T, C.Extras - 0.2, 0.4));
  const sf = fade(T, C.CTA - 0.2, 0.4);
  const rot = 0.7 * Math.sin(T * 2.1), dy = 5 * Math.sin(T * 2.9);
  const img = (src, op) => <img src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', opacity: op }} />;
  return (
    <div style={abs(x, y + (1 - e) * 80, { width: w, opacity: o, transform: `scale(${0.82 + 0.18 * e})`, transformOrigin: 'bottom center' })}>
      <div style={{ position: 'relative', width: w, height: h, WebkitMaskImage: 'radial-gradient(ellipse 46% 52% at 50% 46%, #000 62%, transparent 100%)', maskImage: 'radial-gradient(ellipse 46% 52% at 50% 46%, #000 62%, transparent 100%)', transform: `perspective(1400px) translateY(${dy}px) rotateY(${4 * Math.sin(T * 0.9)}deg) rotateX(${1.5 * Math.sin(T * 1.3)}deg) rotate(${rot}deg)` }}>
        {img(IMG.portrait, 1)}{img(IMG.point, pt)}{img(IMG.selfie, sf)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 999, padding: '12px 24px', border: `1px solid ${LINE}` }}>
          <div style={{ font: `800 24px ${HEAD}`, color: INK }}>Marka</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 26 }}>
            {[0, 1, 2, 3, 4].map(i => <div key={i} style={{ width: 4, borderRadius: 2, background: INK, height: 6 + 18 * Math.abs(Math.sin(T * 7 + i * 1.3)) * (0.6 + 0.4 * Math.sin(T * 3 + i)) }}></div>)}
          </div>
        </div>
      </div>
    </div>);
}

/* ---------- composition ---------- */
function useRobotVoice(caps, T, playing, on) {
  let idx = -1;
  for (let i = 0; i < caps.length; i++) if (T >= caps[i].at) idx = i;
  const last = React.useRef(-1);
  React.useEffect(() => {
    const ss = window.speechSynthesis;
    if (!ss) return;
    if (!on || !playing) { ss.cancel(); last.current = -1; return; }
    if (idx === last.current) return;
    last.current = idx;
    if (idx < 0) return;
    ss.cancel();
    const u = new SpeechSynthesisUtterance(caps[idx].text);
    u.lang = 'en-US'; u.rate = 1.12; u.pitch = 1.25;
    const v = ss.getVoices().find(v => /en-US/i.test(v.lang) && /female|samantha|zira|google us/i.test(v.name)) || ss.getVoices().find(v => /^en/i.test(v.lang));
    if (v) u.voice = v;
    ss.speak(u);
  }, [idx, playing, on]);
  React.useEffect(() => () => window.speechSynthesis && window.speechSynthesis.cancel(), []);
}

const OLD = [0, 5, 12, 19, 26, 30];
function warp(T, C, end) {
  const N = [C.Hook, C.Meet, C.Create, C.Extras, C.CTA, end];
  for (let i = 0; i < 5; i++) if (T < N[i + 1] || i === 4) return OLD[i] + (T - N[i]) * (OLD[i + 1] - OLD[i]) / (N[i + 1] - N[i]);
}
const OLD_CUES = { Hook: 0, Meet: 5, Create: 12, Extras: 19, CTA: 26 };

function VoiceTrack({ time, playing, src = 'assets/voiceover.mp3', end = 31.79, channel = 'marka-voice' }) {
  const ref = React.useRef(null);
  const id = React.useRef(Math.random().toString(36).slice(2));
  const muted = React.useRef(false);
  React.useEffect(() => {
    let alive = true;
    const a = new Audio(); a.preload = 'auto'; ref.current = a;
    fetch(src).then(r => r.blob()).then(b => { if (alive) a.src = URL.createObjectURL(b); });
    let bc; try { bc = new BroadcastChannel(channel); } catch (e) {}
    if (bc) { bc.onmessage = e => { if (e.data !== id.current) { muted.current = true; a.pause(); } }; a.__bc = bc; }
    const vis = () => { if (document.hidden) a.pause(); };
    document.addEventListener('visibilitychange', vis);
    return () => { alive = false; a.pause(); bc && bc.close(); document.removeEventListener('visibilitychange', vis); };
  }, []);
  React.useEffect(() => {
    const el = ref.current; if (!el || !el.src) return;
    if (playing && !document.hidden && window.__markaSound) {
      if (time >= end) { if (!el.paused) el.pause(); return; }
      if (Math.abs(el.currentTime - time) > 0.25) el.currentTime = time;
      if (el.paused && !muted.current) { el.__bc && el.__bc.postMessage(id.current); el.play().catch(() => {}); }
    } else { muted.current = false; if (!el.paused) el.pause(); if (Math.abs(el.currentTime - time) > 0.05) el.currentTime = time; }
  }, [time, playing]);
  return <video src={src} preload="none" playsInline data-om-exportable-video-play-start="0" data-om-exportable-video-play-end={String(end)} data-om-exportable-video-play-speed="1" style={{ position: 'absolute', left: 0, top: 0, width: 2, height: 2, opacity: 0, pointerEvents: 'none' }}></video>;
}

function Backdrop({ T }) {
  const blobs = [[300, 200, 900, '#c9d3ff'], [1500, 300, 1000, '#e2d4ff'], [1000, 950, 900, '#f6dcef'], [200, 900, 700, '#d8e4ff']];
  const dots = Array.from({ length: 26 }, (_, i) => { const r = Math.sin(i * 91.7) * 43758.5; const f = r - Math.floor(r); const g = Math.sin(i * 12.9) * 9631.3; const h = g - Math.floor(g); return { x: f * 1920, y: h * 1080, s: 6 + (i % 4) * 2, c: ['#5b7bff', '#9a6bff', '#f5a524', '#f06b9b'][i % 4], sp: 0.3 + (i % 5) * 0.12, ph: i }; });
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {blobs.map(([x, y, d, c], i) => <div key={i} style={{ position: 'absolute', left: x - d / 2 + 60 * Math.sin(T * 0.25 + i * 1.7), top: y - d / 2 + 40 * Math.cos(T * 0.21 + i), width: d, height: d, borderRadius: '50%', background: `radial-gradient(circle, ${c} 0%, ${c}00 68%)`, opacity: 0.9 }}></div>)}
      {dots.map((d, i) => <div key={i} style={{ position: 'absolute', left: d.x + 14 * Math.sin(T * d.sp + d.ph), top: d.y - ((T * 12 * d.sp) % 60) + 10 * Math.cos(T * d.sp * 1.3 + d.ph), width: d.s, height: d.s, borderRadius: '50%', background: d.c, opacity: 0.35 + 0.35 * Math.abs(Math.sin(T * 0.8 + d.ph)) }}></div>)}
    </div>);
}

function Piece({ accent: acc, subtitles }) {
  const pal = Array.isArray(acc) ? acc : [acc || '#3d6bff', acc || '#8b5cf6'];
  GRAD = `linear-gradient(100deg, ${pal[0]}, ${pal[1]})`;
  const accent = pal[1];
  const comp = useComposition();
  const { CUES: NC, time, playing } = comp;
  const end = comp.authoredTotal || 32.3;
  const C = OLD_CUES;
  const T = warp(comp.T, NC, end);
  const RT = comp.T;
  const all = kf(T, [[0, 0], [0.45, 1], [29.6, 1], [30, 0]], MOTION.enter);
  const cam = 1 + 0.012 * Math.sin(T * 0.45);
  const logo = 1 - fade(T, C.CTA - 0.3, 0.4);
  const caps = [
    { at: 0.05, text: 'Your website already knows your brand.' },
    { at: 1.7, text: 'Now it can make your posts.' },
    { at: 3.3, text: 'Hi, I’m Marka!' },
    { at: 5.0, text: 'Just paste your website, and I’ll learn everything:' },
    { at: 7.6, text: 'your product, your audience, your colors, your voice.' },
    { at: 10.65, text: 'Then I create on-brand posts, carousels, images and videos' },
    { at: 14.95, text: 'for Instagram, TikTok, Facebook, X and more.' },
    { at: 18.75, text: 'Want ideas? Clone the structure of top-performing ads.' },
    { at: 21.25, text: 'On Reddit? I’ll draft helpful replies in your brand’s voice.' },
    { at: 24.6, text: 'And nothing goes live without your approval.' },
    { at: 27.0, text: 'Paste your website. Get your content.' },
    { at: 29.2, until: 31.7, text: 'Start your 3-day trial at marka.social.' },
  ];
  return (
    <div data-screen-label={`t=${Math.floor(RT)}s`} style={{ position: 'absolute', inset: 0, background: BG, overflow: 'hidden', fontFamily: BODY, color: INK }}>
      <Backdrop T={T} />
      <div style={{ position: 'absolute', inset: 0, opacity: all, transform: `scale(${cam})` }}>
        <div style={abs(48, 36, { opacity: logo, display: 'flex', alignItems: 'baseline', padding: '14px 28px', borderRadius: 999, background: 'rgba(255,255,255,0.8)', border: '1px solid #fff', boxShadow: '0 20px 40px -24px rgba(90,70,200,0.35)', font: `800 30px ${HEAD}`, letterSpacing: '-0.03em', color: INK })}>marka<span style={{ font: `italic 400 32px ${SERIF}`, letterSpacing: 0, color: accent }}>.social</span></div>
        <Website T={T} C={C} accent={accent} />
        <Formats T={T} C={C} accent={accent} />
        <Workspace T={T} C={C} accent={accent} />
        <Closing T={T} C={C} accent={accent} />
        <Cat T={T} C={C} />
        <Cursor T={T} C={C} />
      </div>
      <VoiceTrack time={time} playing={playing} />
      <VoiceTrack time={time} playing={playing} src="assets/music-bed.wav" end={32.3} channel="marka-music" />
      {subtitles && <Captions items={caps} style={{ left: 0, right: 0, bottom: 46, width: 'fit-content', maxWidth: 1600, margin: '0 auto', background: INK, color: '#fff', font: `500 32px ${BODY}`, padding: '16px 32px', borderRadius: 999, textShadow: 'none' }} />}
    </div>
  );
}

function SoundButton() {
  const [on, setOn] = React.useState(!!window.__markaSound);
  React.useEffect(() => {
    const unlock = e => { if (e.target.closest && e.target.closest('[data-marka-sound]')) return; if (!window.__markaSound) { window.__markaSound = true; setOn(true); } };
    document.addEventListener('pointerdown', unlock, true);
    document.addEventListener('keydown', unlock, true);
    return () => { document.removeEventListener('pointerdown', unlock, true); document.removeEventListener('keydown', unlock, true); };
  }, []);
  const toggle = () => { window.__markaSound = !on; setOn(!on); if (on) window.__markaStop && window.__markaStop(); };
  return <button data-marka-sound="1" onClick={toggle} style={{ position: 'fixed', top: 16, right: 16, zIndex: 2147483000, font: `600 15px ${BODY}`, padding: '10px 18px', borderRadius: 999, border: 'none', cursor: 'pointer', background: on ? '#fff' : '#6d4ce6', color: on ? INK : '#fff' }}>{on ? 'Sound on · mute' : 'Turn sound on'}</button>;
}

function MarkaVideo() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return (
    <React.Fragment>
      <CompositionStage width={1920} height={1080} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={BG}>
        <Piece accent={t.accent} subtitles={t.subtitles} />
      </CompositionStage>
      <SoundButton />
      <TweaksPanel>
        <TweakSection label="Video" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={v => setTweak('motionEditor', v)} />
        <TweakToggle label="Subtitles" value={t.subtitles} onChange={v => setTweak('subtitles', v)} />
        <TweakColor label="Marka accent" value={t.accent} options={[['#3d6bff', '#8b5cf6'], ['#2f6fe0', '#22b8cf'], ['#8b5cf6', '#e0447a'], ['#f06b3c', '#e0447a']]} onChange={v => setTweak('accent', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}
window.MarkaVideo = MarkaVideo;
