// 仪表台语汇：车机背光青 + 深蓝黑漆面 + 单一强调色。
// 色板是推导值，不是框架默认色：车身钢板 #101B29 / 深夜座舱 #0A1119 / 仪表背光 #37D6E8。
export const STYLES = `
:host { display: block; --hc-accent: #37d6e8; --hc-ink: #e9eff7; --hc-dim: #8496ad;
  --hc-ok: #6fe0a8; --hc-warn: #ffc46b; --hc-bad: #ff9182; --hc-holdms: 2000ms; }
ha-card.theme-glass { border-color: rgba(255,255,255,.26); border-radius: 28px;
  box-shadow: 0 30px 70px -34px rgba(0,0,0,.95), 0 0 58px -30px rgba(190,198,208,.42),
    inset 0 1px 0 rgba(255,255,255,.22); }
/* 液态玻璃：不铺实心底色，靠半透明玻璃层 + backdrop 模糊透出仪表盘背景 */
ha-card.theme-glass .wrap { background-image: none; }
ha-card.theme-glass .skin {
  border-radius: inherit;
  background:
    linear-gradient(138deg, rgba(255,255,255,.18) 0%, rgba(255,255,255,.06) 26%, transparent 52%),
    radial-gradient(70% 50% at 12% 0%, rgba(210,218,228,.14), transparent 62%),
    radial-gradient(64% 48% at 90% 12%, rgba(190,200,212,.10), transparent 64%),
    radial-gradient(110% 78% at 50% 116%, rgba(160,170,182,.12), transparent 68%),
    linear-gradient(168deg, rgba(72,74,80,.34) 0%, rgba(44,46,50,.30) 52%, rgba(20,21,24,.40) 100%);
  backdrop-filter: blur(34px) saturate(112%);
  -webkit-backdrop-filter: blur(30px) saturate(112%); }
ha-card { display: block; overflow: hidden; position: relative; padding: 0;
  border: 1px solid rgba(var(--hc-a,120,190,215),.16);
  border-radius: var(--ha-card-border-radius, 28px);
  color: var(--hc-ink);
  background-image: var(--hc-bg,
    radial-gradient(120% 80% at 50% -10%, rgba(var(--hc-a,55,214,232),.14), transparent 58%),
    radial-gradient(70% 50% at 15% 105%, rgba(40,120,180,.10), transparent 70%),
    linear-gradient(168deg, #111d2c 0%, #0b1521 52%, #060b12 100%));
  background-size: auto, auto, auto;
  background-repeat: no-repeat;
  box-shadow: 0 30px 60px -30px rgba(2,6,12,.98), 0 0 56px -26px rgba(var(--hc-a,55,214,232),.45),
    inset 0 1px 0 rgba(255,255,255,.08), inset 0 -1px 0 rgba(0,0,0,.5);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Microsoft YaHei", "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  isolation: isolate;
}
ha-card > .skin { position: absolute; inset: 0; z-index: 0; pointer-events: none;
  border-radius: var(--hc-radius, 28px); }
ha-card::before { content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 1;
  background-image:
    radial-gradient(60% 34% at 50% 0%, rgba(255,255,255,.06), transparent 72%),
    radial-gradient(rgba(150,205,230,.04) 1px, transparent 1.5px);
  background-size: auto, 26px 26px;
  background-repeat: no-repeat, repeat;
  -webkit-mask-image: radial-gradient(130% 96% at 50% 0%, #000 18%, rgba(0,0,0,.55) 56%, transparent 88%);
  mask-image: radial-gradient(130% 96% at 50% 0%, #000 18%, rgba(0,0,0,.55) 56%, transparent 88%);
  mix-blend-mode: screen; opacity: .6; }
ha-card::after { content: ""; position: absolute; left: 8%; right: 8%; top: 0; height: 1px; z-index: 1;
  background: linear-gradient(90deg, transparent, rgba(190,240,255,.5) 18%, rgba(190,240,255,.5) 82%, transparent);
  opacity: .55; }
.plate, .gn b, .tc b, .stat b { font-variant-numeric: tabular-nums; }
.plate { font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace; }
ha-card.has-photo .wrap { background-image:
  linear-gradient(180deg, rgba(5,10,18,.58) 0%, rgba(5,10,18,.78) 48%, rgba(4,8,14,.9) 100%),
  var(--hc-photo); background-size: cover; background-position: center; background-repeat: no-repeat; }
.wrap { position: relative; z-index: 2; padding: 18px 16px 14px; display: flex; flex-direction: column; gap: 14px;
  container-type: inline-size;
  border-radius: var(--hc-radius, 28px); overflow: hidden; }
.duo { display: flex; flex-direction: column; gap: 14px; }
.dleft, .dright { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
/* 模块栈：顺序由配置决定，手机单列、宽屏双栏（车图固定左栏） */
.blocks { position: relative; display: flex; flex-direction: column; gap: 14px; flex: 1 1 auto; min-height: 0; }
.b-hero-col, .b-side { display: contents; }
.blk + .blk { margin-top: 0; }
.blk { min-width: 0; }
.b-hero { display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0; }
.xchips { padding: 0 8px 6px; }
.xchips .doors { justify-content: center; }
.b-hero .hero { flex: 1 1 auto; }
.b-actions { display: flex; flex-direction: column; gap: 10px; }
.cblock { display: flex; align-items: center; gap: 8px; padding: 9px 12px; border-radius: 15px;
  border: 1px solid rgba(255,255,255,.07); background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.016));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06); font-size: 12px; color: var(--hc-dim); }
.cblock .ic { width: 15px; height: 15px; opacity: .8; color: var(--hc-accent); }
.cblock .cl { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-size: 11.5px; letter-spacing: .02em; }
.cblock b { font-size: 14px; font-weight: 680; color: #eef5fd; font-variant-numeric: tabular-nums; }
.cblock i { font-style: normal; font-size: 10px; color: rgba(150,172,196,.8); margin-left: 1px; }
.ic { width: 20px; height: 20px; fill: currentColor; display: block; flex: none; }
ha-icon.ic { --mdc-icon-size: 1em; }

/* 头部：大标题 + 右上状态胶囊（参考图同构） */
.head { display: flex; align-items: flex-start; gap: 12px; }
.ttl { flex: 1; min-width: 0; display: flex; align-items: baseline; gap: 10px; }
h1 { margin: 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 26px; line-height: 1.1;
  font-weight: 720; letter-spacing: .005em;
  background: linear-gradient(180deg, #ffffff 0%, #eef9ff 38%, #b8d6e6 72%, #8fb2c6 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,.55));
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.plate { flex: 0 0 auto; display: inline-block; font-size: 11px; font-weight: 620;
  letter-spacing: .2em; color: rgba(190,214,230,.82); vertical-align: .14em;
  text-shadow: 0 0 12px rgba(var(--hc-a,55,214,232),.22); }
.status { flex: none; display: inline-flex; align-items: center; gap: 7px; height: 30px; padding: 0 14px;
  border-radius: 999px; font-size: 11.5px; font-weight: 650; letter-spacing: .03em;
  color: var(--hc-dim); background: rgba(255,255,255,.045);
  border: 1px solid rgba(255,255,255,.11); white-space: nowrap;
  backdrop-filter: blur(6px); }
.brand { display: inline-flex; align-items: center; margin-right: 7px; vertical-align: -1px; }
.brand.lin svg { width: 60px; }
.brand svg { width: 46px; height: 21px; display: block;
  filter: drop-shadow(0 0 8px rgba(var(--hc-a,55,214,232),.35)) drop-shadow(0 2px 4px rgba(0,0,0,.5));
  transform: translateZ(0); }
.status .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex: none;
  box-shadow: 0 0 8px currentColor; }
.status.ok { color: #85f2b8; background: rgba(111,224,168,.12); border-color: rgba(111,224,168,.32);
  box-shadow: 0 0 18px -8px rgba(111,224,168,.65), inset 0 1px 0 rgba(255,255,255,.14); }
.status.bad { color: #ff9d8e; background: rgba(255,145,130,.11); border-color: rgba(255,145,130,.34); }

/* 锁态下面一行：定位 + 同步时间 */
.hmeta { display: flex; align-items: center; gap: 8px; margin-top: -6px; min-width: 0; }
.hmeta .doors { flex: 1 1 auto; min-width: 0; overflow: hidden; }
.hmeta .door { flex: 1 1 auto; min-width: 0; max-width: 100%; overflow: hidden; height: 26px;
  background: rgba(255,255,255,.024); border-color: rgba(255,255,255,.055); }
.hmeta .door .addr { flex: 1 1 auto; min-width: 0; }
.hmeta .door .ic { width: 14px; height: 14px; }
.hmeta .baseline.solo { flex: none; margin: 0 0 0 auto; padding: 4px 9px; background: rgba(255,255,255,.024);
  border-color: rgba(255,255,255,.055); }

/* 主视觉：车图 + 双同心轨道 + 四枚发光节点（参考图同构） */
.hero { position: relative; height: clamp(224px, 52cqw, 430px); display: flex; align-items: center; justify-content: center;
  overflow: clip; overflow-clip-margin: 60px; --r: 92px; container-type: size; }
.halo { position: absolute; inset: 0; border-radius: 50%; pointer-events: none;
  background: radial-gradient(46% 52% at 50% 50%, rgba(var(--hc-a,55,214,232),.20), rgba(var(--hc-a,55,214,232),.06) 46%, transparent 72%);
  filter: blur(2px); }
/* 传感器区背景样式：radar / grid / glass / cyber / minimal */
.hero.bs-grid::before, .hero.bs-glass::before, .hero.bs-cyber::before, .hero.bs-minimal::before
  { content: ""; position: absolute; pointer-events: none; }
.hero.bs-grid .halo, .hero.bs-glass .halo, .hero.bs-cyber .halo, .hero.bs-minimal .halo {
  inset: auto; left: 50%; top: 50%; width: min(92%, 92cqh); aspect-ratio: 1; border-radius: 50%;
  transform: translate(-50%, -50%); }
.hero.bs-grid .halo {
  background-image: radial-gradient(rgba(var(--hc-a,55,214,232),.60) 1.8px, transparent 1.8px);
  background-size: 19px 19px; filter: none;
  -webkit-mask-image: radial-gradient(closest-side, #000 0%, #000 66%, transparent 92%);
  mask-image: radial-gradient(closest-side, #000 0%, #000 66%, transparent 92%); }
.hero.bs-grid .orbit { border-color: rgba(var(--hc-a,55,214,232),.26); box-shadow: inset 0 0 26px -16px rgba(var(--hc-a,55,214,232),.4); }
.hero.bs-grid .orbit.o2 { border-style: dashed; }
.hero.bs-grid::before { left: 50%; top: 50%; width: min(92%, 92cqh); aspect-ratio: 1; border-radius: 50%; transform: translate(-50%, -50%); background:
  linear-gradient(90deg, transparent calc(50% - .5px), rgba(var(--hc-a,55,214,232),.20) calc(50% - .5px), rgba(var(--hc-a,55,214,232),.20) calc(50% + .5px), transparent calc(50% + .5px)),
  linear-gradient(0deg, transparent calc(50% - .5px), rgba(var(--hc-a,55,214,232),.20) calc(50% - .5px), rgba(var(--hc-a,55,214,232),.20) calc(50% + .5px), transparent calc(50% + .5px)); }

.hero.bs-glass .halo { width: min(88%, 90cqh);
  background:
    radial-gradient(60% 38% at 30% 16%, rgba(255,255,255,.14), transparent 62%),
    radial-gradient(120% 100% at 50% 30%, rgba(var(--hc-a,55,214,232),.10), rgba(6,16,26,.16) 68%, transparent 78%);
  border: 1px solid rgba(200,230,255,.16);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.16), inset 0 -26px 50px rgba(var(--hc-a,55,214,232),.10), 0 20px 46px rgba(0,0,0,.42);
  backdrop-filter: blur(10px); filter: none; }
.hero.bs-glass .orbit { border-color: rgba(var(--hc-a,55,214,232),.26); box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 0 34px -18px rgba(var(--hc-a,55,214,232),.6); }
.hero.bs-glass .orbit.o2 { border-color: rgba(var(--hc-a,55,214,232),.12); }
.hero.bs-glass::before { left: 50%; top: 50%; width: min(88%, 90cqh); aspect-ratio: 1; border-radius: 50%; transform: translate(-50%, -50%);
  background: conic-gradient(from 150deg, rgba(var(--hc-a,55,214,232),.16), transparent 28%, transparent 66%, rgba(255,255,255,.10)); }

.hero.bs-cyber .halo { width: min(96%, 96cqh);
  background: radial-gradient(52% 56% at 50% 50%, rgba(var(--hc-a,55,214,232),.28), transparent 70%); filter: blur(1px); }
.hero.bs-cyber .orbit { border-color: rgba(var(--hc-a,55,214,232),.55); border-width: 1.5px;
  box-shadow: 0 0 26px -8px rgba(var(--hc-a,55,214,232),.7), inset 0 0 30px -10px rgba(var(--hc-a,55,214,232),.45); }
.hero.bs-cyber .orbit.o2 { border-color: rgba(var(--hc-a,55,214,232),.18); transform: translate(-50%,-50%) rotate(18deg); }
.hero.bs-cyber::before { left: 50%; top: 50%; width: min(96%, 96cqh); aspect-ratio: 1; border-radius: 50%; transform: translate(-50%, -50%); background:
  conic-gradient(from 205deg, rgba(var(--hc-a,55,214,232),0) 0deg, rgba(var(--hc-a,55,214,232),.30) 18deg, rgba(var(--hc-a,55,214,232),0) 46deg,
    rgba(var(--hc-a,55,214,232),0) 180deg, rgba(var(--hc-a,55,214,232),.22) 200deg, rgba(var(--hc-a,55,214,232),0) 232deg);
  filter: blur(6px); }


.hero.bs-minimal .halo { width: min(74%, 80cqh);
  background: radial-gradient(44% 48% at 50% 50%, rgba(var(--hc-a,55,214,232),.16), transparent 66%); filter: blur(8px); }
.hero.bs-minimal .orbit { border-color: rgba(var(--hc-a,55,214,232),.10); box-shadow: none; }
.hero.bs-minimal .orbit.o2 { display: none; }
.hero.bs-minimal .node { opacity: .55; }
.hero.bs-minimal::before { left: 50%; top: 50%; width: min(74%, 80cqh); aspect-ratio: 1; border-radius: 50%; transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(6,14,22,.55), transparent 66%); }

.orbit, .orbit.o2 { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  border-radius: 50%; pointer-events: none; width: min(94%, 94cqh); height: auto; aspect-ratio: 1; }
.orbit { border: 1px solid rgba(var(--hc-a,55,214,232),.24);
  box-shadow: inset 0 0 34px -14px rgba(var(--hc-a,55,214,232),.55), 0 0 24px -16px rgba(var(--hc-a,55,214,232),.5); }
.orbit.o2 { width: min(97%, 97cqh);
  border: 1px solid rgba(var(--hc-a,55,214,232),.08); }
.node { position: absolute; left: 50%; top: 50%; width: 7px; height: 7px; margin: -3.5px 0 0 -3.5px;
  transform: translate(-50%, -50%);
  border-radius: 50%; background: var(--hc-accent);
  box-shadow: 0 0 4px 0 rgba(var(--hc-a,55,214,232),.75), 0 0 9px 2px rgba(var(--hc-a,55,214,232),.22);
  animation: hc-node 3.2s ease-in-out infinite; }
.node.n1 { top: 0; animation-delay: 0s; }
.node.n2 { top: 50%; left: 100%; animation-delay: .8s; }
.node.n3 { top: 100%; animation-delay: 1.6s; }
.node.n4 { top: 50%; left: 0; animation-delay: 2.4s; }
.carimg { position: relative; max-width: 64%; max-height: 78%; object-fit: contain;
  filter: brightness(1.06) saturate(1.04) drop-shadow(0 30px 30px rgba(2,6,12,.8)) drop-shadow(0 0 18px rgba(var(--hc-a,55,214,232),.08)); }
.carph { position: relative; width: 96px; height: 96px; display: grid; place-items: center; border-radius: 999px;
  border: 1px solid rgba(255,255,255,.1); color: var(--hc-dim); background: rgba(255,255,255,.03); }
.carph .ic { width: 44px; height: 44px; opacity: .55; }
.ground { position: absolute; left: 50%; bottom: 10px; width: 48%; height: 16px; transform: translateX(-50%);
  border-radius: 50%; background: radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,.72), transparent 74%);
  filter: blur(6px); }

.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 11px; border-radius: 999px;
  font-size: 10.5px; font-weight: 650; letter-spacing: .06em; color: var(--hc-dim); text-transform: uppercase;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); backdrop-filter: blur(6px); }
.chip .dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex: none; }
.chip.ok { color: var(--hc-ok); background: rgba(111,224,168,.1); border-color: rgba(111,224,168,.26); }
.chip.warn { color: var(--hc-warn); background: rgba(255,196,107,.1); border-color: rgba(255,196,107,.26); }
.chip.bad { color: var(--hc-bad); background: rgba(255,145,130,.1); border-color: rgba(255,145,130,.26); }
.chip.info { color: var(--hc-accent); background: rgba(var(--hc-a,55,214,232),.09); border-color: rgba(var(--hc-a,55,214,232),.24); }

/* 操作：圆形玻璃钮 + 标签，长按沿圆环走一圈（参考图同构） */
.acts { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 2px; }
.acts { gap: 4px; }
/* 按钮自成一套赛博配色：青 / 电紫 / 洋红，不跟主题强调色走，任何主题下都能从底色里跳出来 */
.tile { position: relative; display: flex; flex-direction: column; align-items: center; gap: 11px; padding: 0;
  background: none; border: none; cursor: pointer; color: var(--hc-ink); font: inherit; text-align: center;
  -webkit-tap-highlight-color: transparent; -webkit-touch-callout: none; user-select: none;
  touch-action: manipulation;
  --cy-a: 34,232,255; --cy-b: 168,86,255; --cy-c: 255,52,196; --cy-ok: 48,255,168; }
.orb { position: relative; width: 72px; height: 72px; display: grid; place-items: center; border-radius: 50%;
  border: 1px solid rgba(34,232,255,.22);
  background:
    radial-gradient(120% 92% at 34% 16%, rgba(255,255,255,.52) 0%, rgba(255,255,255,.10) 32%, rgba(255,255,255,0) 54%),
    radial-gradient(132% 130% at 50% 122%, rgba(var(--cy-a),.32), rgba(var(--cy-b),.10) 48%, transparent 70%),
    linear-gradient(168deg, #122634 0%, #0a1119 58%, #05090e 100%);
  box-shadow: inset 0 1px 2px rgba(255,255,255,.34), inset 0 -9px 18px -8px rgba(0,0,0,.95),
    0 14px 24px -16px rgba(0,0,0,.98), 0 0 30px -16px rgba(var(--cy-a),1);
  transition: transform .16s ease, border-color .2s, box-shadow .2s; }
/* 霓虹圈：青 → 白 → 洋红 → 电紫 → 青，1.8px */
.orb::before { content: ""; position: absolute; inset: -3px; border-radius: 50%; padding: 2px; pointer-events: none;
  background: conic-gradient(from 205deg, rgba(var(--cy-a),1), rgba(226,244,255,.26) 14%,
    rgba(var(--cy-c),.9) 44%, rgba(var(--cy-b),.95) 62%, rgba(var(--cy-a),1) 82%, rgba(226,244,255,.2) 94%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  opacity: .7; transition: opacity .2s, filter .2s; }
.orb::after { content: ""; position: absolute; left: 17%; top: 9%; width: 46%; height: 32%; border-radius: 50%;
  background: radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,.6), rgba(255,255,255,.08) 68%, transparent 78%);
  filter: blur(1px); pointer-events: none; opacity: .7; }
.tile .ic { width: 27px; height: 27px; color: #ddf8ff; filter: drop-shadow(0 1px 2px rgba(0,0,0,.7)); }
.tile .glyph { width: 62px; height: 62px; object-fit: contain; pointer-events: none;
  filter: hue-rotate(var(--hc-btnhue,0deg)) saturate(var(--hc-btnsat,1)) drop-shadow(0 2px 3px rgba(0,0,0,.72)); }
.tile .glyph.wide { width: 70px; height: 46px; }
/* 艺术按钮：去掉球体底和霓虹圈，让 3D logo 本身成为按钮 */
.orb.art { background: none; border-color: transparent; box-shadow: none; }
.orb.art::before, .orb.art::after { display: none; }
.tile.hot .orb.art, .tile.on .orb.art { background: none; border-color: transparent; box-shadow: none; animation: none; }
.tile.hot .orb.art .glyph { filter: hue-rotate(var(--hc-btnhue,0deg)) saturate(var(--hc-btnsat,1)) drop-shadow(0 0 8px rgba(var(--cy-c),.8)) drop-shadow(0 2px 3px rgba(0,0,0,.72)); }
.tile.on .orb.art .glyph { filter: hue-rotate(var(--hc-btnhue,0deg)) saturate(var(--hc-btnsat,1)) drop-shadow(0 0 8px rgba(var(--cy-ok),.7)) drop-shadow(0 2px 3px rgba(0,0,0,.72)); }
.tile:active .orb.art, .tile.pressing .orb.art { box-shadow: none; }
.tile .lbl { max-width: 100%; font-size: 13.5px; font-weight: 620; letter-spacing: .06em;
  color: rgba(206,229,244,.88); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
@keyframes hc-ring-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.tile.spin .orb.art::before, .tile:active .orb.art::before { display: block; }
.tile.spin .orb::before, .tile:active .orb::before {
  animation: hc-ring-spin .8s linear infinite;
  opacity: 1;
  filter: drop-shadow(0 0 9px rgba(var(--cy-a),.9)) drop-shadow(0 0 16px rgba(var(--cy-c),.55)); }
.tile:hover { transform: translateY(-2px); }
.tile:hover .orb::before { opacity: 1; filter: drop-shadow(0 0 7px rgba(var(--cy-c),.8)); }
.tile:hover .orb { border-color: rgba(var(--cy-c),.4);
  box-shadow: inset 0 1px 2px rgba(255,255,255,.4), inset 0 -9px 18px -8px rgba(0,0,0,.95),
    0 18px 26px -16px rgba(0,0,0,.98), 0 0 34px -12px rgba(var(--cy-c),.9); }
.tile:active, .tile.pressing { transform: scale(.94); }
.tile:active .orb, .tile.pressing .orb { box-shadow: inset 0 2px 8px rgba(0,0,0,.7), 0 0 28px -8px rgba(var(--cy-c),1); }
.tile:focus-visible { outline: 1px solid rgba(var(--cy-a),.9); outline-offset: 4px; border-radius: 10px; }
/* 当前状态/可执行：整颗球转洋红，霓虹圈全亮并呼吸 */
.tile.hot .orb { border-color: rgba(var(--cy-c),.55);
  background:
    radial-gradient(120% 92% at 34% 16%, rgba(255,255,255,.6) 0%, rgba(255,255,255,.12) 32%, rgba(255,255,255,0) 54%),
    radial-gradient(132% 130% at 50% 118%, rgba(var(--cy-c),.50), rgba(var(--cy-b),.18) 50%, transparent 72%),
    linear-gradient(168deg, #2a1230 0%, #140a1b 58%, #07040c 100%);
  box-shadow: inset 0 1px 3px rgba(255,255,255,.42), inset 0 -10px 20px -8px rgba(0,0,0,.9),
    0 0 36px -10px rgba(var(--cy-c),1), 0 14px 24px -16px rgba(0,0,0,.98);
  animation: hc-orb-breathe 3.4s ease-in-out infinite; }
.tile.hot .orb::before { opacity: 1;
  background: conic-gradient(from 205deg, rgba(var(--cy-c),1), rgba(255,214,244,.3) 14%,
    rgba(var(--cy-b),.95) 46%, rgba(var(--cy-c),1) 72%, rgba(var(--cy-a),.85) 88%, rgba(255,214,244,.24) 96%);
  filter: drop-shadow(0 0 8px rgba(var(--cy-c),.95)); }
.tile.hot .ic { color: #ffe6fa; }
.tile.hot .lbl { color: #ffd9f3; text-shadow: 0 0 10px rgba(var(--cy-c),.55); }
@keyframes hc-orb-breathe {
  0%, 100% { box-shadow: inset 0 1px 3px rgba(255,255,255,.4), inset 0 -10px 20px -8px rgba(0,0,0,.9),
    0 0 26px -12px rgba(var(--cy-c),.9), 0 14px 24px -16px rgba(0,0,0,.98); }
  50% { box-shadow: inset 0 1px 3px rgba(255,255,255,.46), inset 0 -10px 20px -8px rgba(0,0,0,.9),
    0 0 42px -8px rgba(var(--cy-c),1), 0 14px 24px -16px rgba(0,0,0,.98); }
}
/* 已锁定/已启动：霓虹绿（赛博三色里的第三色），和洋红区分开 */
.tile.on .orb { border-color: rgba(var(--cy-ok),.5);
  background:
    radial-gradient(120% 92% at 34% 16%, rgba(255,255,255,.55) 0%, rgba(255,255,255,.10) 32%, rgba(255,255,255,0) 54%),
    radial-gradient(132% 130% at 50% 118%, rgba(var(--cy-ok),.36), rgba(38,190,255,.10) 52%, transparent 72%),
    linear-gradient(168deg, #102a24 0%, #081712 58%, #040a07 100%);
  box-shadow: inset 0 1px 3px rgba(255,255,255,.4), inset 0 -10px 20px -8px rgba(0,0,0,.9),
    0 0 32px -12px rgba(var(--cy-ok),.95), 0 14px 24px -16px rgba(0,0,0,.98); }
.tile.on .orb::before { opacity: 1;
  background: conic-gradient(from 205deg, rgba(var(--cy-ok),1), rgba(226,255,244,.25) 16%,
    rgba(var(--cy-a),.8) 50%, rgba(var(--cy-ok),1) 78%, rgba(226,255,244,.2) 94%);
  filter: drop-shadow(0 0 6px rgba(var(--cy-ok),.8)); }
.tile.on .ic { color: #e9fff4; }
.tile.on .lbl { color: #c8ffe2; }
.tile.off { opacity: .42; }
.hring { position: absolute; inset: -8%; width: 116%; height: 116%; opacity: 0; pointer-events: none; }
.hring circle { fill: none; stroke: var(--hc-accent); stroke-width: 3.2; stroke-linecap: round;
  stroke-dasharray: 295.2; stroke-dashoffset: 295.2; }
.tile.pressing .hring, .tile.armed .hring { opacity: 1; }
.tile.pressing .hring circle { stroke-dashoffset: 0; transition: stroke-dashoffset var(--hc-holdms) linear; }
.tile.armed .hring circle { stroke-dashoffset: 0; }
.tile.armed .orb { border-color: rgba(var(--hc-a,55,214,232),.7);
  box-shadow: 0 0 26px -4px rgba(var(--hc-a,55,214,232),.85), inset 0 0 18px -6px rgba(var(--hc-a,55,214,232),.6); }
.tile.armed .lbl { color: var(--hc-accent); }
.tile.pending .orb.art::after { display: block; }
.tile.pending .orb::after { content: ""; position: absolute; top: 1px; right: 4px; width: 6px; height: 6px;
  border-radius: 50%; background: var(--hc-accent); animation: hc-pulse 1.4s ease-in-out infinite; }
.pills { display: flex; gap: 8px; margin-top: 10px; }
.pill { flex: 1; height: 32px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  border-radius: 999px; cursor: pointer; border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.03); color: var(--hc-dim); font: 600 11.5px/1 inherit;
  -webkit-tap-highlight-color: transparent; user-select: none;
  transition: color .18s, background .18s, border-color .18s; position: relative; overflow: hidden; }

.selpill { position: relative; justify-content: center; gap: 7px; }
.selpill .sl { font-size: 11px; letter-spacing: .06em; color: rgba(178,196,216,.86); }
.selpill b { font-size: 12.5px; font-weight: 680; color: #eef5fd; white-space: nowrap; }
.selpill .caret { font-style: normal; font-size: 9px; opacity: .55; margin-left: -2px; }
.selpill select { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer;
  border: none; appearance: none; }
.pill .ic { width: 15px; height: 15px; }
.pill:hover { color: var(--hc-ink); background: rgba(255,255,255,.06); }
.pill.on { color: var(--hc-ok); border-color: rgba(111,224,168,.26); }
.pill.off { opacity: .45; }
.pill.pressing { color: var(--hc-accent); border-color: rgba(var(--hc-a,55,214,232),.5); }
.pill.armed { color: var(--hc-accent); border-color: rgba(var(--hc-a,55,214,232),.7); background: rgba(var(--hc-a,55,214,232),.14); }
.pill .holdbar { position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; background: var(--hc-accent);
  transform: scaleX(0); transform-origin: left; opacity: 0; }
.pill.pressing .holdbar { opacity: 1; transform: scaleX(1); transition: opacity .12s, transform var(--hc-holdms) linear; }
.pill.pending::after { content: ""; position: absolute; top: 6px; right: 8px; width: 5px; height: 5px;
  border-radius: 50%; background: var(--hc-accent); animation: hc-pulse 1.4s ease-in-out infinite; }

/* 能耗：双环形仪表 + 中间量纲图标（参考图同构） */
.energy { display: grid; grid-template-columns: 1fr 1px 1fr; align-items: center; column-gap: 14px; padding: 2px 2px 0; }
.gauge { position: relative; width: 100%; max-width: 132px; aspect-ratio: 1; margin: 0 auto; overflow: visible;
  container-type: inline-size; }
.gauge > svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.gt { fill: none; stroke: rgba(255,255,255,.07); stroke-width: 6; }
.gp { fill: none; stroke: var(--hc-accent); stroke-width: 6; stroke-linecap: round;
  filter: drop-shadow(0 0 8px rgba(var(--hc-a,55,214,232),.65)); }
.gv { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 2.4cqw; padding: 0 6cqw; box-sizing: border-box; }
.gl { display: inline-flex; align-items: center; gap: 3.6cqw; font-size: clamp(9px, 8.4cqw, 15px); font-weight: 650; letter-spacing: .1em;
  color: rgba(160,182,206,.85); text-transform: uppercase; }
.gl .ic { width: clamp(11px, 9.6cqw, 17px); height: clamp(11px, 9.6cqw, 17px); opacity: .85; }
.gn { display: flex; flex-direction: column; align-items: center; gap: .8cqw; line-height: 1; max-width: 100%; }
.gn b { font-size: clamp(18px, 26cqw, 44px); font-weight: 680; letter-spacing: -.02em; color: #f3f8ff; white-space: nowrap;
  text-shadow: 0 0 22px rgba(var(--hc-a,55,214,232),.16); }
.gn i { font-size: clamp(9px, 8cqw, 14px); font-style: normal; font-weight: 600; color: rgba(150,172,196,.9); letter-spacing: .06em; }
.egdiv { width: 1px; height: 62%; align-self: center;
  background: linear-gradient(180deg, transparent, rgba(var(--hc-a,55,214,232),.26) 26%, rgba(var(--hc-a,55,214,232),.26) 74%, transparent); }
.substats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 12px;
  border-radius: 18px; border: 1px solid rgba(255,255,255,.07); overflow: hidden;
  background: linear-gradient(180deg, rgba(255,255,255,.052), rgba(255,255,255,.018));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06); }
.substats .sstat { display: flex; flex-direction: row; align-items: baseline; justify-content: center; gap: 5px; padding: 11px 6px;
  letter-spacing: .04em; text-align: center; min-width: 0; }
.substats .sstat + .sstat { border-left: 1px solid rgba(255,255,255,.055); }
.substats .sstat i { font-style: normal; font-size: 10px; letter-spacing: .06em;
  color: rgba(150,172,196,.8); }
.substats .sstat b { font-size: 15px; font-weight: 680; color: #eef5fd; line-height: 1; letter-spacing: -.01em; white-space: nowrap; }
.substats .sstat span { font-size: 9.5px; color: rgba(150,172,196,.72); }

/* 底座条：四轮胎压 + 同步时间（参考图同构） */
.baseline { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 16px;
  border: 1px solid rgba(255,255,255,.07);
  background: linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.014));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06); min-width: 0; }
.baseline.solo { align-self: flex-end; justify-content: flex-end; padding: 6px 10px; border-radius: 12px; }
.tread { flex: 1; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 2px; min-width: 0; }
.tc { display: inline-flex; align-items: center; gap: 3px; min-width: 0; font-size: 10px; color: var(--hc-dim);
  white-space: nowrap; }
.tc .ic { width: 13px; height: 13px; opacity: .5; color: #c9d8e8; }
.tc b { font-size: 11.5px; font-weight: 650; color: var(--hc-ink); }
.tc small { font-size: 8.5px; letter-spacing: 0; }
.tc.warn .ic, .tc.warn b { color: var(--hc-warn); opacity: 1; }
.bdiv { flex: none; width: 1px; height: 18px; background: rgba(255,255,255,.1); }
.sync { display: inline-flex; align-items: center; gap: 5px; flex: none; padding: 0; border: none;
  background: none; font: 600 10px/1 inherit; color: var(--hc-dim); cursor: pointer; letter-spacing: .02em; }
.sync .ic { width: 13px; height: 13px; opacity: .75; }
.sync .stx { white-space: nowrap; }
.sync:hover { color: var(--hc-ink); }
.sync.spin .ic { animation: hc-spin .9s linear infinite; }
.sync .sdot { width: 5px; height: 5px; border-radius: 50%; background: var(--hc-ok); flex: none; }
.sync .sdot.bad { background: var(--hc-bad); }

/* 门窗 / 位置 */
.doors { display: flex; flex-wrap: wrap; gap: 6px; }
.door { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border-radius: 10px;
  border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.03);
  font-size: 11px; font-weight: 600; color: var(--hc-dim); }
.door .ic { width: 15px; height: 15px; opacity: .8; }
.door.open { color: var(--hc-warn); border-color: rgba(255,196,107,.3); background: rgba(255,196,107,.08); }
.door .addr { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-weight: 500; letter-spacing: 0; }

/* 充电 / 服务 / 告警 */
.cpanel { border-radius: 16px; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.022);
  padding: 11px 12px; }
.cpanel .ph { display: flex; align-items: center; gap: 7px; font-size: 10px; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase; color: var(--hc-dim); margin-bottom: 8px; }
.cpanel .ph .ic { width: 13px; height: 13px; }
.chgrow { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.chgrow .st { font-size: 13px; font-weight: 650; }
.chgrow .meta { font-size: 10px; color: var(--hc-dim); letter-spacing: .06em; margin-top: 3px; }
.mini { display: inline-flex; align-items: center; gap: 5px; height: 28px; padding: 0 11px; border-radius: 999px;
  font: 650 11px/1 inherit; cursor: pointer; border: 1px solid rgba(var(--hc-a,55,214,232),.3);
  background: rgba(var(--hc-a,55,214,232),.1); color: var(--hc-accent); }
.mini.dim { border-color: rgba(255,255,255,.1); background: rgba(255,255,255,.04); color: var(--hc-dim); }
.mini:active { transform: scale(.97); }

.alert { position: relative; display: flex; align-items: center; gap: 9px; padding: 10px 13px 10px 16px; border-radius: 15px;
  font-size: 12px; line-height: 1.45; color: #ffd3c9;
  background: linear-gradient(180deg, rgba(255,145,130,.13), rgba(255,145,130,.07));
  border: 1px solid rgba(255,145,130,.24);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 8px 22px -16px rgba(255,145,130,.6); }
.alert::before { content: ""; position: absolute; left: 0; top: 12px; bottom: 12px; width: 2px; border-radius: 2px;
  background: linear-gradient(180deg, rgba(255,145,130,.9), rgba(255,145,130,.2)); }
.alert .ic { width: 15px; height: 15px; flex: none; color: var(--hc-bad); }
.alert b { flex: none; font-size: 11px; letter-spacing: .04em; white-space: nowrap;
  color: var(--hc-bad); font-weight: 700; }
.alert .amsg { flex: 1 1 auto; min-width: 0; font-size: 12.5px; color: var(--hc-text);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.svc { border-radius: 15px; border: 1px solid rgba(255,255,255,.06);
  background: linear-gradient(180deg, rgba(255,255,255,.042), rgba(255,255,255,.014));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05); overflow: hidden; }
.svc summary { list-style: none; display: flex; align-items: center; gap: 8px;
  padding: 11px 12px; cursor: pointer; font-size: 10px; font-weight: 700; letter-spacing: .12em;
  text-transform: uppercase; color: var(--hc-dim); }
.svc summary::-webkit-details-marker { display: none; }
.svc summary .sum { display: inline-flex; align-items: center; gap: 7px; flex: 1; }
.svc summary .ic { width: 13px; height: 13px; transition: transform .2s; }
.svc[open] summary > .ic { transform: rotate(180deg); }
.svc .row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
  padding: 8px 12px; font-size: 12px; border-top: 1px solid rgba(255,255,255,.05); }
.svc .row .k { color: var(--hc-dim); flex: none; font-size: 11px; }
.svc .row .val { text-align: right; color: var(--hc-ink); word-break: break-word; max-width: 66%; }

.b-actions { position: relative; }
.b-energy .b-alerts { margin-top: 10px; }
/* 长按进度：车底轨道圈顺时针转满一圈（起点 12 点方向） */
.orbit .hring2 { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.orbit .hring2 { transform: rotate(-90deg); }
.orbit .hring2 circle { fill: none; stroke: var(--hc-accent); stroke-width: .6; stroke-linecap: round;
  opacity: 0; transition: opacity .18s ease;
  filter: drop-shadow(0 0 3px rgba(var(--hc-a,55,214,232),.55)); }
.orbit.prog .hring2 circle, .orbit.armed .hring2 circle { opacity: 1; }
.orbit.armed .hring2 circle { stroke: #dffbff; filter: drop-shadow(0 0 7px rgba(var(--hc-a,55,214,232),.85)); }
.toast { position: absolute; left: 0; top: 0; right: auto; bottom: auto; z-index: 9;
  pointer-events: none; max-width: calc(100% - 8px);
  box-shadow: 0 14px 30px -16px rgba(0,0,0,.95);
  display: flex; align-items: center; gap: 7px; padding: 7px 13px; border-radius: 999px; white-space: nowrap;
  font-size: 11.5px; line-height: 1.4; color: #d5f8ff;
  background: linear-gradient(180deg, rgba(16,32,48,.97), rgba(9,20,32,.97));
  border: 1px solid rgba(var(--hc-a,55,214,232),.28);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
.toast.err { border-color: rgba(255,145,130,.34); color: #ffd3c9;
  background: linear-gradient(180deg, rgba(40,18,20,.97), rgba(24,12,14,.97)); }
.toast .ic { width: 13px; height: 13px; flex: none; }

.empty { padding: 26px 16px 30px; text-align: center; color: var(--hc-dim); font-size: 12px; line-height: 1.6; }
.empty .ic { width: 34px; height: 34px; margin: 0 auto 10px; opacity: .45; }

/* 紧凑：主视觉与仪表收一档，保留操作与同步 */
.compact .wrap { padding: 15px 14px 12px; gap: 11px; }
.compact h1 { font-size: 20px; }
.compact .hero { height: 152px; --r: 60px; }
.compact .carimg { max-height: 70%; max-width: 58%; }
.compact .orbit.o2 { display: none; }
.compact .orb { width: 58px; height: 58px; }
.compact .tile .ic { width: 22px; height: 22px; }
.compact .tile .glyph { width: 48px; height: 48px; }
.compact .tile .glyph.wide { width: 56px; height: 36px; }
.compact .tile { gap: 7px; }
.compact .gauge { max-width: 96px; }
.compact .gn b { font-size: 25px; }
.compact .gl { font-size: 9.5px; }

@keyframes hc-spin { to { transform: rotate(360deg); } }
@keyframes hc-pulse { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
@keyframes hc-node { 0%, 100% { opacity: .5; } 50% { opacity: 1; } }

/* 宽屏（面板视图 / 桌面仪表盘）：手机尺寸的内容居中收窄，避免拉成一条横贯全屏的卡片 */


/* 液态玻璃主题：所有承载信息的表面换成高光磨砂玻璃 */
ha-card.theme-glass .loc, ha-card.theme-glass .cap {
  background:
    linear-gradient(118deg, rgba(255,255,255,.26) 0%, rgba(255,255,255,.09) 26%, rgba(255,255,255,0) 46%),
    linear-gradient(158deg, rgba(255,255,255,.12) 0%, rgba(255,255,255,.04) 46%, rgba(255,255,255,.02) 100%);
  border-color: rgba(255,255,255,.42);
  box-shadow: 0 8cqw 20cqw -12cqw rgba(4,8,14,.5), inset 0 1cqw 0 rgba(255,255,255,.7),
    inset 0 -5cqw 12cqw -9cqw rgba(255,255,255,.10), 0 0 14cqw -9cqw rgba(190,200,212,.35);
  backdrop-filter: blur(15cqw) saturate(120%); }
ha-card.theme-glass .loc .lh span, ha-card.theme-glass .loc i, ha-card.theme-glass .cap i { color: rgba(226,240,252,.8); }
ha-card.theme-glass .loc .lr b, ha-card.theme-glass .cap b { color: #f4fbff; }
ha-card.theme-glass .status { background: rgba(255,255,255,.16); border-color: rgba(255,255,255,.36);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.5), 0 8px 18px -14px rgba(0,0,0,.8);
  backdrop-filter: blur(14px) saturate(160%); }
ha-card.theme-glass .status.ok { background: rgba(120,255,196,.16); border-color: rgba(140,255,206,.5); }
ha-card.theme-glass .chip, ha-card.theme-glass .stat, ha-card.theme-glass .substats,
ha-card.theme-glass .pills .pill, ha-card.theme-glass .svc, ha-card.theme-glass .baseline {
  background: linear-gradient(170deg, rgba(255,255,255,.15), rgba(255,255,255,.06));
  border-color: rgba(255,255,255,.30);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.45), 0 10px 22px -18px rgba(0,0,0,.7);
  backdrop-filter: blur(16px) saturate(150%); }
ha-card.theme-glass .alert { backdrop-filter: blur(16px) saturate(150%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 10px 24px -18px rgba(0,0,0,.7); }
ha-card.theme-glass .gauge { filter: drop-shadow(0 10px 22px rgba(0,0,0,.35)); }
/* 俯视图状态层：贴在车图上，位置由 JS 量出车图矩形 */
.covl { position: absolute; pointer-events: none; }
.cedge { position: absolute; inset: 0; pointer-events: none; }
/* 车况聚合卡：每个车门一张（门 + 窗 + 该轮位胎压），全部落在圆环内侧、避开车身。
   尺寸统一用容器查询单位 cqw（1cqw = 卡层宽度的 1%），随车图大小等比缩放。 */
.covl { container-type: size; }
.loc, .cap { position: absolute; box-sizing: border-box; display: flex; flex-direction: column;
  background: linear-gradient(180deg, rgba(24,38,55,.9), rgba(10,17,26,.94));
  border: 1px solid rgba(160,205,230,.16);
  box-shadow: 0 2cqw 5cqw rgba(2,7,12,.5), inset 0 1cqw 0 rgba(255,255,255,.07);
  backdrop-filter: blur(10cqw); font-variant-numeric: tabular-nums;
  transition: background .25s ease, border-color .25s ease, box-shadow .25s ease; }
.loc { width: max(72px, 22cqw); min-width: max(72px, 22cqw); transform: translate(-50%, -50%);
  padding: max(6px, 2cqw) max(5px, 1.8cqw); border-radius: max(12px, 6.4cqw); gap: max(3px, 1.1cqw);
  text-align: center; justify-content: center; min-height: max(78px, 24cqw); }
/* 竖窄框：门/窗/胎压按行竖排，图标在上、数值在下 */
/* 车图偏窄时要保证最小宽度，卡片中心随之再往外推，避免压到车身 */
.loc.lf, .loc.lr { left: calc(7.5% - 11cqw - max(0px, (70px - 22cqw) / 2)); }
.loc.rf, .loc.rr { left: calc(92.5% + 11cqw + max(0px, (70px - 22cqw) / 2)); }
.loc.lf, .loc.rf { top: 27%; }
.loc.lr, .loc.rr { top: 73%; }
.loc .lh { display: flex; align-items: center; justify-content: space-between; }
.loc .lh span { font-size: max(10px, 4.5cqw); line-height: 1; color: #93a8bd; letter-spacing: .09em; }
.loc .lh .lk { font-style: normal; width: max(11px, 5.2cqw); height: max(11px, 5.2cqw); color: #6d8298; opacity: .85; }
.loc .lh .lk .ic { width: 100%; height: 100%; display: block; }
.loc .lh .lk.on { color: #7ee0b3; opacity: 1; }
.loc .lrs { display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: max(3px, 1cqw);
  width: 100%; max-width: 100%; margin: 0 auto; }
/* 图标统一放在状态文字前面（图标在左、状态在右），三行等距，四张卡尺寸一致 */
.loc .lr { flex: 0 0 auto; display: flex; flex-direction: row; align-items: center;
  justify-content: center; gap: max(3px, 1.1cqw); line-height: 1; width: 100%; }
.loc .lr .ri { flex: 0 0 auto; width: max(11px, 5.2cqw); height: max(11px, 5.2cqw); display: grid; place-items: center; color: #8fd6ea; }
.loc .lr .ri .ic { width: 100%; height: 100%; display: block; }
.loc .lr b { font-size: max(12px, 4.8cqw); font-weight: 620; color: #dbe7f5; letter-spacing: .01em; white-space: nowrap; }
.loc .lr.tire b { font-size: max(12px, 5cqw); }
.loc .lr.tire b s { text-decoration: none; font-size: max(9px, 3.8cqw); font-weight: 500; color: #7d90a6; margin-left: .6cqw; }
.covl .enp[data-more] { cursor: pointer; }
.loc .lr[data-more] { cursor: pointer; border-radius: .9cqw; transition: background .15s ease; }
.loc .lr[data-more]:hover { background: rgba(120, 200, 230, .12); }
.loc .lr.open b { color: #ffcf90; }
.loc .lr.open .ri { color: #ffcf90; }
.loc .lr.warn b, .loc .lr.warn b s { color: var(--hc-warn); }
.loc .lr.warn .ri { color: var(--hc-warn); }
.loc .lr.bad b { color: #ffc8c2; }
.loc.open { border-color: rgba(255,196,107,.5); background: linear-gradient(180deg, rgba(56,32,10,.9), rgba(28,17,7,.94));
  box-shadow: 0 2cqw 5cqw rgba(2,7,12,.5), 0 0 4cqw rgba(255,196,107,.14); }
.loc.bad { border-color: rgba(255,145,130,.5); background: linear-gradient(180deg, rgba(58,18,18,.9), rgba(30,10,10,.94)); }
/* 门/盖状态卡外形式样：chip_style = glass | pill | bar | liquid | line | cyber */
.covl.cs-pill .loc, .covl.cs-pill .cap, .covl.cs-pill .enp { border-radius: 999px; }
.covl.cs-pill .enp { padding: 9px 18px; }
.covl.cs-pill .loc { padding: 3cqw 4.2cqw; }
.covl.cs-pill .cap { padding-left: 4cqw; padding-right: 3.4cqw; }
 .covl.cs-bar .enp { border-left: 3px solid rgba(var(--hc-a,55,214,232),.85); border-top-left-radius: 4px;
  border-bottom-left-radius: 4px; box-shadow: -8px 0 20px -10px rgba(var(--hc-a,55,214,232),.75); }
.covl.cs-bar .loc, .covl.cs-bar .cap { border-left: 1.7cqw solid rgba(var(--hc-a,55,214,232),.85);
  border-top-left-radius: 2.4cqw; border-bottom-left-radius: 2.4cqw;
  box-shadow: -2.2cqw 0 5cqw -2.6cqw rgba(var(--hc-a,55,214,232),.75); }
.covl.cs-liquid .enp { background: linear-gradient(180deg, rgba(255,255,255,.17), rgba(255,255,255,.05));
  border-color: rgba(255,255,255,.26); backdrop-filter: blur(12px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.34), 0 8px 18px rgba(0,0,0,.42); }
.covl.cs-liquid .loc, .covl.cs-liquid .cap {
  background: linear-gradient(180deg, rgba(255,255,255,.17), rgba(255,255,255,.05));
  border-color: rgba(255,255,255,.26); border-width: 1px; backdrop-filter: blur(12px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.34), inset 0 -9cqw 18cqw -10cqw rgba(var(--hc-a,55,214,232),.35), 0 2cqw 5cqw -2cqw rgba(0,0,0,.55); }
.covl.cs-line .enp { background: transparent; border: 1px solid rgba(170,205,232,.34); box-shadow: none; backdrop-filter: none; }
.covl.cs-line .loc, .covl.cs-line .cap { background: transparent; border: 1px solid rgba(170,205,232,.34); box-shadow: none; }
.covl.cs-cyber .enp { border-radius: 0; border-color: rgba(var(--hc-a,55,214,232),.5);
  box-shadow: 0 0 18px -8px rgba(var(--hc-a,55,214,232),.85);
  clip-path: polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px); }
.covl.cs-cyber .loc, .covl.cs-cyber .cap { border-radius: 0; border-color: rgba(var(--hc-a,55,214,232),.5);
  box-shadow: 0 0 6cqw -2.4cqw rgba(var(--hc-a,55,214,232),.85);
  clip-path: polygon(2.6cqw 0, calc(100% - 2.6cqw) 0, 100% 2.6cqw, 100% calc(100% - 2.6cqw), calc(100% - 2.6cqw) 100%, 2.6cqw 100%, 0 calc(100% - 2.6cqw), 0 2.6cqw); }
/* 各款状态卡独立配色（与 glass 默认的冷灰蓝区分） */
.covl.cs-pill .loc, .covl.cs-pill .cap, .covl.cs-pill .enp {
  background: linear-gradient(180deg, rgba(13,54,62,.94), rgba(7,26,34,.94));
  border-color: rgba(92,235,220,.38); box-shadow: 0 0 4cqw -1.6cqw rgba(92,235,220,.55); }
.covl.cs-pill .loc .lh span, .covl.cs-pill .cap b, .covl.cs-pill .enp span { color: #9fe9e1; }
.covl.cs-pill .loc .lr b, .covl.cs-pill .cap i, .covl.cs-pill .enp b { color: #e9fffb; }
.covl.cs-pill .loc .lr.tire b { color: #7ff0e2; }
.covl.cs-pill .loc .lr .ri, .covl.cs-pill .cap .ri { color: #63d9cf; }
.covl.cs-pill .loc .lh .lk.on, .covl.cs-pill .cap .lk.on { color: #b6ffe9; }

.covl.cs-bar .loc, .covl.cs-bar .cap, .covl.cs-bar .enp {
  background: linear-gradient(180deg, rgba(40,28,12,.94), rgba(20,14,7,.94));
  border-color: rgba(255,178,87,.26); border-left-color: #ffb257; }
.covl.cs-bar .loc .lh span, .covl.cs-bar .cap b, .covl.cs-bar .enp span { color: #f0c48d; }
.covl.cs-bar .loc .lr b, .covl.cs-bar .cap i, .covl.cs-bar .enp b { color: #fff3e2; }
.covl.cs-bar .loc .lr.tire b { color: #ffc978; }
.covl.cs-bar .loc .lr .ri, .covl.cs-bar .cap .ri { color: #e2955a; }
.covl.cs-bar .loc .lh .lk.on, .covl.cs-bar .cap .lk.on { color: #ffd9a6; }

.covl.cs-liquid .loc .lh span, .covl.cs-liquid .cap b, .covl.cs-liquid .enp span { color: #eaf2fb; }
.covl.cs-liquid .loc .lr b, .covl.cs-liquid .cap i, .covl.cs-liquid .enp b { color: #ffffff; }
.covl.cs-liquid .loc .lr.tire b { color: #f2f9ff; }
.covl.cs-liquid .loc .lr .ri, .covl.cs-liquid .cap .ri { color: #cfe3f7; }
.covl.cs-liquid .loc .lh .lk.on, .covl.cs-liquid .cap .lk.on { color: #d8ffe9; }

.covl.cs-line .loc, .covl.cs-line .cap, .covl.cs-line .enp { border-color: rgba(127,176,255,.46); }
.covl.cs-line .loc .lh span, .covl.cs-line .cap b, .covl.cs-line .enp span { color: #9dbde0; }
.covl.cs-line .loc .lr b, .covl.cs-line .cap i, .covl.cs-line .enp b { color: #d6e6ff; }
.covl.cs-line .loc .lr.tire b { color: #a9c8ff; }
.covl.cs-line .loc .lr .ri, .covl.cs-line .cap .ri { color: #7fb0ff; }

.covl.cs-cyber .loc, .covl.cs-cyber .cap, .covl.cs-cyber .enp {
  background: linear-gradient(180deg, rgba(6,22,32,.96), rgba(4,12,20,.96));
  border-color: rgba(var(--hc-a,55,214,232),.55); }
.covl.cs-cyber .loc .lh span, .covl.cs-cyber .cap b, .covl.cs-cyber .enp span { color: var(--hc-accent); }
.covl.cs-cyber .loc .lr b, .covl.cs-cyber .cap i, .covl.cs-cyber .enp b { color: #f2fdff; }
.covl.cs-cyber .loc .lr.tire b { color: #f4fbff; }
.covl.cs-cyber .loc .lr .ri, .covl.cs-cyber .cap .ri { color: var(--hc-accent); }
.covl.cs-cyber .loc .lh .lk.on, .covl.cs-cyber .cap .lk.on { color: #7dffd8; }
/* 引擎卡是一张仪表盘：各皮肤只换配色，不改形状与内边距 */
.covl.cs-pill .enp, .covl.cs-bar .enp, .covl.cs-liquid .enp, .covl.cs-line .enp, .covl.cs-cyber .enp {
  border-radius: 50%; padding: 0; border-left-width: 1px; }

/* 前后盖小卡：车头/车尾正上方与正下方，仍落在圆环内侧 */
.cap { left: 50%; width: auto; max-width: max(132px, 46cqw); flex-direction: column; align-items: center; justify-content: center;
  gap: max(2px, .9cqw); padding: max(5px, 1.9cqw) max(7px, 2.6cqw);
  border-radius: max(9px, 5.2cqw); }
.cap.hood, .cap.trunk { transform: translate(-50%, 0); }
/* 第一排：物件图标 + 名称 + 锁；第二排：只放状态文字 */
.cap .chd { display: flex; flex-direction: row; align-items: center; justify-content: center;
  gap: max(3px, 1.4cqw); min-width: 0; }
.cap .ri { flex: 0 0 max(12px, 5.4cqw); height: max(12px, 5.4cqw); display: grid; place-items: center; color: #86c9de; }
.cap .ri .ic { width: 100%; height: 100%; display: block; }
.cap b { font-size: max(9px, 4.2cqw); font-weight: 500; color: #8fa5bb; line-height: 1; white-space: nowrap; letter-spacing: .05em; }
.cap i { font-style: normal; font-size: max(12px, 5.4cqw); font-weight: 620; color: #dbe7f5; line-height: 1; white-space: nowrap; }
.cap .lk { flex: 0 0 max(10px, 4.4cqw); width: max(10px, 4.4cqw); height: max(10px, 4.4cqw); position: static;
  transform: none; color: #6d8298; opacity: .85; }
.cap .lk .ic { width: 100%; height: 100%; display: block; }
.cap .lk.on { color: #7ee0b3; opacity: 1; }
.cap.open { border-color: rgba(255,196,107,.5); background: linear-gradient(180deg, rgba(56,32,10,.9), rgba(28,17,7,.94)); }
.cap.open i, .cap.open .ri { color: #ffcf90; }
.cap.bad { border-color: rgba(255,145,130,.5); }

/* ---- 面板模式：1440×900 设计稿等比缩放，整页装下不滚动 ---- */

/* 窄面板（手机 / 小屏全屏视图）：缩纵向节奏，目标一屏放下全部信息 */
ha-card.panel:not(.fit) .wrap { padding: 10px 12px 8px; gap: 6px; }
ha-card.panel:not(.fit) .head { gap: 2px; }
ha-card.panel:not(.fit) .title { font-size: 21px; }
ha-card.panel:not(.fit) h1 { font-size: 21px; }
ha-card.panel:not(.fit) .plate { font-size: 10px; letter-spacing: .12em; }
ha-card.panel:not(.fit) .sub { font-size: 10px; }
ha-card.panel:not(.fit) .hero { height: 100%; min-height: 178px; --r: 96px; }
ha-card.panel:not(.fit) .carimg { max-height: 74%; max-width: 56%; }
ha-card.panel:not(.fit) .gauge { max-width: 86px; }
/* 窄面板：车图略收窄，保证左右两列聚合卡与圆环之间留白 */
ha-card.panel:not(.fit) .hero { --r: 72px; }
ha-card.panel:not(.fit) .energy { column-gap: 6px; }
ha-card.panel:not(.fit) .orb { width: 58px; height: 58px; }
ha-card.panel:not(.fit) .tile .ic { width: 22px; height: 22px; }
ha-card.panel:not(.fit) .tile .glyph { width: 48px; height: 48px; }
ha-card.panel:not(.fit) .tile .glyph.wide { width: 56px; height: 36px; }
ha-card.panel:not(.fit) .tile { gap: 7px; }
ha-card.panel:not(.fit) .tile .lbl { font-size: 11px; letter-spacing: .04em; }
ha-card.panel:not(.fit) .pills { margin-top: 2px; gap: 6px; }
ha-card.panel:not(.fit) .pill { height: 26px; font-size: 10.5px; }
ha-card.panel:not(.fit) .substats { margin-top: 4px; gap: 6px; }
ha-card.panel:not(.fit) .substats .sstat { padding: 4px 4px 3px; }
ha-card.panel:not(.fit) .substats .sstat b { font-size: 12px; }
ha-card.panel:not(.fit) .alert { padding: 7px 9px; font-size: 11px; }
ha-card.panel:not(.fit) .svc, ha-card.panel:not(.fit) .loc { font-size: 11px; }
ha-card.panel:not(.fit) .svc summary { padding: 7px 9px; }
ha-card.panel:not(.fit) .baseline.solo { padding: 3px 8px; font-size: 10px; }

:host(.panel.gskin) { background: transparent; }
:host(.panel) { position: relative; overflow: hidden;
  background: radial-gradient(90% 60% at 50% 0%, rgba(var(--hc-a,55,214,232),.10), transparent 62%),
    linear-gradient(170deg, #101b29 0%, #0a1119 60%, #070c13 100%); }
ha-card.panel { box-sizing: border-box; width: 100%; height: 100%; margin: 0; }
/* 选择器缩略卡：用当前默认外观（赛博紫 + 液态玻璃背景 + 液态玻璃状态卡）做紧凑海报，全部假数据 */
ha-card.preview { height: 300px; overflow: hidden; }
ha-card.preview .wrap {
  padding: 12px 14px 12px; height: 100%; box-sizing: border-box;
  display: flex; flex-direction: column; gap: 6px;
  container-type: inline-size; pointer-events: none;
}
.pv-top { display: flex; align-items: center; gap: 6px; }
.pv-top h1 { margin: 0; font-size: 15px; font-weight: 700; letter-spacing: .01em; }
.pv-top .status { flex: 0 0 auto; height: auto; padding: 3px 8px; font-size: 9px; gap: 4px; line-height: 1.5; }
.pv-eng { margin-left: auto; display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px;
  font-size: 8.5px; color: rgba(206, 228, 242, .72); background: rgba(255, 255, 255, .06);
  border: 1px solid rgba(255, 255, 255, .12); white-space: nowrap; }
.pv-eng .dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(150, 170, 190, .8); }
.pv-top .status .dot { width: 5px; height: 5px; }
.pv-plate { font-size: 9.5px; letter-spacing: .10em; color: rgba(206, 228, 242, .62); margin-top: -3px; }
.pv-hero { position: relative; flex: 0 0 128px; display: flex; align-items: center; justify-content: center; }
.pv-halo {
  position: absolute; left: 50%; top: 50%; width: 120px; height: 120px; transform: translate(-50%, -50%);
  border-radius: 50%; border: 1px solid rgba(200, 230, 255, .16);
  background:
    radial-gradient(60% 38% at 30% 16%, rgba(255, 255, 255, .14), transparent 62%),
    radial-gradient(120% 100% at 50% 30%, rgba(185, 139, 255, .12), rgba(8, 14, 22, .18) 68%, transparent 78%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .16), inset 0 -18px 34px rgba(185, 139, 255, .12), 0 16px 34px rgba(0, 0, 0, .45);
  backdrop-filter: blur(9px);
}
.pv-orbit { position: absolute; left: 50%; top: 50%; width: 104px; height: 104px; transform: translate(-50%, -50%);
  border-radius: 50%; border: 1px solid rgba(120, 220, 255, .16); }
.pv-node { position: absolute; z-index: 2; width: 4px; height: 4px; border-radius: 50%; background: #7fe6ff;
  box-shadow: 0 0 6px rgba(127, 230, 255, .9); }
.pv-node.n1 { left: 50%; top: 8px; transform: translateX(-50%); }
.pv-node.n2 { right: 8px; top: 50%; transform: translateY(-50%); }
.pv-node.n3 { left: 50%; bottom: 8px; transform: translateX(-50%); }
.pv-node.n4 { left: 8px; top: 50%; transform: translateY(-50%); }
.pv-carimg { position: relative; z-index: 1; width: 50px; height: 98px; object-fit: contain;
  filter: brightness(1.06) saturate(1.04) drop-shadow(0 14px 16px rgba(2, 6, 12, .8)); }
.pv-cap { position: absolute; left: 50%; transform: translateX(-50%); z-index: 2;
  padding: 2px 8px; border-radius: 999px; white-space: nowrap; font-size: 7.5px; letter-spacing: .02em;
  color: #cfe0ee; background: linear-gradient(180deg, rgba(255, 255, 255, .16), rgba(255, 255, 255, .05));
  border: 1px solid rgba(200, 230, 255, .22); backdrop-filter: blur(8px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .14), 0 6px 14px rgba(0, 0, 0, .4); }
.pv-cap.pt { top: 2px; }
.pv-cap.pb { bottom: 2px; }
.pv-loc-chip { position: absolute; z-index: 2;
  display: flex; flex-direction: column; align-items: flex-start; gap: 0;
  padding: 4px 6px 5px; border-radius: 9px; min-width: 54px;
  background: linear-gradient(180deg, rgba(34, 52, 72, .72), rgba(12, 20, 30, .82));
  border: 1px solid rgba(200, 230, 255, .24); backdrop-filter: blur(10px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .13), 0 6px 16px rgba(0, 0, 0, .42); }
.pv-loc-chip.lf { left: 0; }
.pv-loc-chip.rf { right: 0; }
.pv-loc-chip.a { top: 16px; }
.pv-loc-chip.b { bottom: 16px; }
.pv-loc-chip i { font-style: normal; font-size: 7.5px; letter-spacing: .06em; color: #e6f1fb; }
.pv-loc-chip b { font-size: 8.5px; font-weight: 600; color: #ffffff; line-height: 1.15; }
.pv-loc-chip u { text-decoration: none; display: inline-flex; align-items: baseline; gap: 2px;
  font-size: 9.5px; font-weight: 700; color: #ffffff; line-height: 1.1; }
.pv-loc-chip u s { text-decoration: none; font-size: 6.5px; font-weight: 500; color: rgba(230, 242, 252, .72); }
.pv-stats { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 6px;
  padding: 5px 9px; border-radius: 9px; font-size: 8px; color: rgba(206, 228, 242, .48);
  background: rgba(255, 255, 255, .035); border: 1px solid rgba(255, 255, 255, .07); }
.pv-stats b { font-size: 10.5px; color: rgba(236, 246, 253, .9); margin: 0 2px; }
.pv-acts { flex: 0 0 auto; display: flex; justify-content: space-between; gap: 6px; }
.pv-act { flex: 1 1 0; display: flex; flex-direction: column; align-items: center; gap: 1px; }
.pv-art { width: 38px; height: 38px; object-fit: contain;
  filter: hue-rotate(60deg) saturate(1.15) drop-shadow(0 0 7px rgba(185, 139, 255, .5))
    drop-shadow(0 2px 3px rgba(0, 0, 0, .7)); }
.pv-act em { font-style: normal; font-size: 8px; color: rgba(206, 228, 242, .55); white-space: nowrap; }
@media (max-width: 400px) {
  .loc { min-width: max(84px, 38cqw); }
  .loc .lh span { font-size: max(9px, 4.5cqw); }
  .loc .lr b { font-size: max(10.5px, 4.8cqw); }
  .loc .lr.tire b { font-size: max(10.5px, 5cqw); }
  .loc .lr.tire b s { font-size: max(8px, 3.8cqw); }
  .loc .lr .ri, .loc .lh .lk { width: max(9.5px, 5.2cqw); height: max(9.5px, 5.2cqw); }
  .loc { padding: max(5px, 2.4cqw) max(6px, 2.8cqw); }
  .cap { max-width: max(108px, 46cqw); }
  .cap b { font-size: max(8px, 4.2cqw); }
  .cap i { font-size: max(10.5px, 5.4cqw); }
  .cap .ri { flex-basis: max(10px, 5.4cqw); height: max(10px, 5.4cqw); }
}
/* 超窄格子（<285px）去掉每格的 kPa 后缀，保证底部条一行装下 */
@container (max-width: 285px) {
  .pv-tvec em { display: none; }
  .pv-tvec b { font-size: 9.5px; }
  .pv-tires { gap: 4px; }
}

/* sections 视图小卡片：整卡缩进栅格单元，不溢出、不压住编辑按钮 */
:host(.gridcard) { position: relative; overflow: hidden; max-width: none; margin: 0; }
/* 适配前先隐藏，避免整卡先以原尺寸画一帧、再被缩放/位移，视觉上「飞进来」 */
:host(.gridcard:not(.fitready)) ha-card,
:host(.panel:not(.fitready)) ha-card { visibility: hidden; }

ha-card.gfit {
  position: absolute; left: 0; top: 0; box-sizing: border-box;
  transform: scale(var(--gscale, 1)); transform-origin: 0 0;
}
ha-card.gfit .wrap { height: 100%; box-sizing: border-box; overflow: hidden; }

/* 宽格子里的双栏版式（与面板同一套左右分栏） */
ha-card.gfit.gtwo .blocks { display: flex; flex-direction: row; align-items: stretch; gap: 26px; }
/* 单列网格卡（默认卡片大小）：只收紧行间距与上下留白，把省下的留白全给英雄区，
   圆环随之变大，其它块（仪表/底座/按钮）尺寸一点不动 */
/* 小卡片（单列网格）再把燃油/续航双表收小，省出的高度继续给大圆环 */
ha-card.gfit:not(.gtwo) .gauge { max-width: 80px; }
ha-card.gfit:not(.gtwo) .wrap { row-gap: 8px; padding-top: 13px; padding-bottom: 11px; }
ha-card.gfit:not(.gtwo) .blocks { row-gap: 8px; }
ha-card.gfit.gtwo .b-hero-col { display: flex; flex: 1.02 1 0; min-width: 0; }
ha-card.gfit.gtwo .b-hero-col .b-hero { flex: 1 1 auto; justify-content: center; }
ha-card.gfit.gtwo .b-side { display: flex; flex-direction: column; flex: .98 1 0; min-width: 0; justify-content: flex-start; gap: 16px; }
ha-card.gfit.gtwo .b-side > .b-energy { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; justify-content: center; }
ha-card.gfit.gtwo .b-side > .b-energy > .energy { width: 100%; }
ha-card.gfit.gtwo .b-side > .b-meta,
ha-card.gfit.gtwo .b-side > .b-alerts,
ha-card.gfit.gtwo .b-side > .b-actions { flex: 0 0 auto; }
ha-card.gfit.gtwo .gauge { max-width: 132px; }

/* 面板模式：1440×900 设计稿居中并按 --fit 等比缩放 */
ha-card.panel.fit { box-sizing: border-box; position: absolute; left: 50%; top: 50%; width: 1440px; height: 900px;
  transform: translate(-50%, -50%) scale(var(--fit, 1)); transform-origin: center center; }
ha-card.panel .wrap { height: 100%; box-sizing: border-box; padding: 26px 30px 20px; overflow: hidden; }
ha-card.panel .blocks { flex: 1 1 auto; min-height: 0; }
ha-card.panel .b-hero { justify-content: center; min-height: 0; }
ha-card.panel .hero { flex: 1 1 auto; height: auto; min-height: 300px; }
ha-card.panel .carimg { max-height: min(62%, 460px); max-width: min(60%, 330px); }

/* 宽面板：车图占左栏满高，仪表/操作/告警等叠成右栏，避免中间大片留白 */
/* 手机面板：固定 390×840 版式，整体等比缩放到容器内，一屏铺满且不出滚动条 */
:host(.panel) { position: relative; overflow: hidden; }
ha-card.panel.pfit { position: absolute; left: 0; top: 0;
  transform: scale(var(--pscale, 1)); transform-origin: 0 0; }
ha-card.panel.pfit .wrap { height: 100%; }
ha-card.panel.fit .wrap { display: flex; flex-direction: column; gap: 14px; justify-content: center; }
ha-card.panel.fit .head { grid-column: 1 / -1; }
ha-card.panel.fit .blocks { grid-column: 1 / -1; display: flex; flex-direction: row; align-items: stretch;
  gap: 52px; min-height: 0; }
ha-card.panel:not(.fit) .blocks { flex-direction: column; }
ha-card.panel.fit .b-hero-col { display: flex; flex: 1.02 1 0; min-width: 0; }
ha-card.panel.fit .b-hero-col .b-hero { flex: 1 1 auto; justify-content: center; }
ha-card.panel.fit .b-side { display: flex; flex-direction: column; flex: .98 1 0; min-width: 0;
  justify-content: flex-start; gap: 16px; }
/* 右栏纵向铺满：仪表吃掉多余高度并居中，副指标/告警/按钮组自然下移贴底，底部不再留大片空白 */
ha-card.panel.fit .b-side > .b-energy { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; justify-content: center; }
ha-card.panel.fit .b-side > .b-energy > .energy { width: 100%; }
ha-card.panel.fit .b-side > .b-meta,
ha-card.panel.fit .b-side > .b-alerts,
ha-card.panel.fit .b-side > .b-actions { flex: 0 0 auto; }
ha-card.panel.fit .b-hero .hero { height: 100%; min-height: 600px; }
ha-card.panel.fit .orbit { width: min(78%, 96cqh); }
ha-card.panel.fit .orbit.o2 { width: min(86%, 98cqh); }
ha-card.panel.fit .hmeta { grid-column: 1 / -1; }
ha-card.panel.fit .acts { width: 100%; max-width: none; }
ha-card.panel.fit .pills { width: 100%; max-width: none; }

@media (min-width: 860px) {
  :host { max-width: 860px; margin: 0 auto; }
  .wrap { padding: 24px 22px 18px; gap: 16px; }
  .hero { height: clamp(268px, 52cqw, 430px); --r: 104px; }
  .head { align-items: center; }
  /* 桌面/面板视图：车图在左，仪表与副指标在右 */

  .dright { gap: 14px; }
  .gauge { max-width: 152px; }
  .acts { max-width: 540px; margin: 2px auto 0; width: 100%; }
  .pills { max-width: 540px; margin: 10px auto 0; width: 100%; }
  /* 面板模式：容器多宽就排多宽，车图列跟着面板高度走 */
  :host(.panel) { max-width: none; margin: 0; }
  ha-card.panel .wrap { padding: 22px 26px 16px; gap: 12px; }
  /* 宽面板里给主视觉足够高度，车图与状态卡才不会被压扁 */
  ha-card.panel .b-hero .hero { height: auto; min-height: clamp(300px, 40vh, 440px); --r: 106px; }
  ha-card.panel .carimg { max-height: min(74%, 520px); max-width: min(60%, 330px); }
  ha-card.panel .gauge { max-width: 196px; }
  ha-card.panel .acts { max-width: 600px; }
  ha-card.panel .pills { max-width: 600px; }
}

@media (prefers-reduced-motion: reduce) {
  .tile, .orb, .pill { transition: none; }
  .tile.pressing .hring circle, .pill.pressing .holdbar { transition: none; }
  .sync.spin .ic, .tile.pending .orb::after, .node { animation: none; }
}


/* 引擎启动后的灯光特效：前灯从车头灯位向前射出白色切光，光锥末端在地面铺一片落光；
   尾灯在车后铺一片红光。灯位依据官方车图实测：前灯 x 29.9%/70.2%、y 10.6%；尾灯带 x 23.6%-76.4%、y 70%-77% */
.beam { position: absolute; width: 27cqw; height: 34cqw; pointer-events: none; opacity: 0;
  transform: translate(-50%, -100%); mix-blend-mode: screen; filter: blur(2.4px);
  /* 顶边齐平 = 投影切光线，横向自然衰减 */
  clip-path: polygon(4% 100%, 96% 100%, 100% 0, 0 0);
  background: radial-gradient(58% 98% at 50% 100%, rgba(255,255,255,1) 0%,
    rgba(238,251,255,.66) 30%, rgba(210,241,255,.30) 58%, rgba(194,232,255,.10) 78%, transparent 92%); }
.beam::after { content: ""; position: absolute; left: 50%; bottom: 0; width: 60%; height: 88%;
  transform: translateX(-50%);
  background: radial-gradient(48% 92% at 50% 100%, rgba(255,255,255,1) 0%, rgba(250,255,255,.72) 30%,
    rgba(232,250,255,.28) 62%, transparent 88%); }
.beam.lb { left: 29.9%; top: 10.6%; transform: translate(-50%, -100%) rotate(-5deg); transform-origin: 50% 100%; }
.beam.rb { left: 70.2%; top: 10.6%; transform: translate(-50%, -100%) rotate(5deg); transform-origin: 50% 100%; }
/* 落在地面的光：椭圆的漫反射光斑，压在光锥末端 */
.gpool { position: absolute; left: 50%; top: calc(10.6% - var(--beamh, 0px) * 0.82); width: 112cqw; height: 26cqw;
  pointer-events: none; opacity: 0; transform: translate(-50%, -50%); mix-blend-mode: screen; filter: blur(6px);
  background: radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,1) 0%, rgba(236,250,255,.62) 38%,
    rgba(204,238,255,.26) 66%, transparent 86%); }
/* 尾灯在地面的红光 */
.tailbar { position: absolute; left: 50%; top: 73.4%; width: 55cqw; height: 3.6cqw; pointer-events: none;
  opacity: 0; transform: translate(-50%, -50%); mix-blend-mode: screen; border-radius: 999px;
  background: linear-gradient(90deg, rgba(255,64,44,.32), rgba(255,132,104,1) 18%, rgba(255,86,62,1) 50%,
    rgba(255,132,104,1) 82%, rgba(255,64,44,.32));
  box-shadow: 0 0 3.4cqw 1.2cqw rgba(255,74,50,.66), 0 0 11cqw 3cqw rgba(255,44,32,.34); }
.tailglow { position: absolute; left: 50%; top: 87%; width: 108cqw; height: 32cqw; pointer-events: none;
  opacity: 0; transform: translate(-50%, -50%); mix-blend-mode: screen; filter: blur(4px);
  background: radial-gradient(50% 50% at 50% 50%, rgba(255,74,52,.86), rgba(255,36,26,.42) 48%, transparent 78%); }
.hero.run .beam, .hero.run .gpool, .hero.run .tailbar, .hero.run .tailglow { animation: hc-lamp 2.6s ease-in-out infinite; }
.hero.run .beam.rb { animation-delay: .16s; }
@keyframes hc-lamp {
  0%, 100% { opacity: .5; }
  45% { opacity: 1; }
}
.hero.run .halo { background: radial-gradient(46% 52% at 50% 50%, rgba(45,255,170,.22), rgba(45,255,170,.07) 46%, transparent 72%); }
.orbit.run { border-color: rgba(76,255,178,.55); animation: hc-breathe 2.6s ease-in-out infinite; box-shadow: inset 0 0 30px -12px rgba(52,255,168,.45); }
.orbit.run.o2 { border-color: rgba(76,255,178,.26); animation-delay: .7s; }
.hero.run .ground { background: radial-gradient(50% 50% at 50% 50%, rgba(48,255,166,.42), rgba(48,255,166,.10) 55%, transparent 74%);
  animation: hc-ground 2.6s ease-in-out infinite; }
.covl.run::after { content: ""; position: absolute; left: 14%; right: 14%; bottom: 1%; height: 22%; border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 50%, rgba(48,255,166,.40), transparent 72%); filter: blur(8px);
  animation: hc-ground 2.6s ease-in-out infinite; pointer-events: none; }
@keyframes hc-breathe {
  0%, 100% { box-shadow: inset 0 0 26px -12px rgba(52,255,168,.35); border-color: rgba(76,255,178,.42); }
  50% { box-shadow: inset 0 0 64px -8px rgba(96,255,196,.95); border-color: rgba(150,255,214,.9); }
}
@keyframes hc-ground { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
.enp { position: absolute; left: 0; top: 0; transform: translate(-50%, -50%); z-index: 3;
  width: 82px; height: 82px; padding: 0; border-radius: 50%;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
  background: radial-gradient(72% 72% at 50% 44%, rgba(28,46,62,.96), rgba(7,13,19,.94));
  border: 1px solid rgba(150,185,205,.26); color: #a9b6bf;
  letter-spacing: .08em; white-space: nowrap; backdrop-filter: blur(8px);
  box-shadow: 0 4px 14px rgba(0,0,0,.35), inset 0 0 14px rgba(120,180,220,.10);
  pointer-events: none; isolation: isolate; overflow: hidden; }
/* 引擎卡 = 一张迷你汽车时速表：外圈刻度 + 起步亮弧 + 指针停在零位 */
.enp::before { content: ""; position: absolute; inset: 2px; border-radius: 50%; z-index: -1; pointer-events: none;
  background:
    conic-gradient(from 208deg,
      rgba(var(--hc-a,55,214,232),.72) 0deg 30deg,
      rgba(var(--hc-a,55,214,232),.18) 30deg 138deg,
      rgba(var(--hc-a,55,214,232),0) 138deg 360deg),
    repeating-conic-gradient(from 208deg,
      rgba(206,228,244,.44) 0 .55deg, rgba(206,228,244,0) .55deg 7.4deg),
    radial-gradient(closest-side, #0000 66%, rgba(190,220,240,.20) 67.2%, #0000 68.6%);
  -webkit-mask: radial-gradient(closest-side, #0000 84%, #000 87%);
          mask: radial-gradient(closest-side, #0000 84%, #000 87%); }
.enp::after { content: ""; position: absolute; left: 50%; top: 50%; width: 2px; height: 10px; border-radius: 2px;
  transform-origin: 50% 50%; transform: translate(-50%, -50%) rotate(206deg) translate(0, -27px);
  background: linear-gradient(180deg, rgba(var(--hc-a,55,214,232),.12), rgba(var(--hc-a,55,214,232),.95));
  box-shadow: 0 0 5px 1px rgba(var(--hc-a,55,214,232),.45); pointer-events: none; z-index: -1; }
.enp.on { border-color: rgba(96,255,196,.55); box-shadow: 0 0 18px rgba(40,255,160,.30), inset 0 0 16px rgba(40,255,160,.16); }
.enp.on::before { background:
    conic-gradient(from 208deg,
      rgba(96,255,196,.92) 0deg 104deg,
      rgba(96,255,196,.26) 104deg 150deg,
      rgba(96,255,196,0) 150deg 360deg),
    repeating-conic-gradient(from 208deg,
      rgba(206,244,230,.60) 0 .55deg, rgba(206,244,230,0) .55deg 7.4deg); }
.enp.on::after { transform: translate(-50%, -50%) rotate(312deg) translate(0, -30px);
  background: linear-gradient(180deg, rgba(228,255,246,.15), rgba(242,255,251,.96));
  box-shadow: 0 0 6px 1px rgba(160,255,220,.7);
  transition: transform .55s cubic-bezier(.3,1.4,.5,1); }
.enp .rsleft { display: block; margin-top: 1px; font-size: 10.5px; line-height: 1;
  font-variant-numeric: tabular-nums; letter-spacing: .4px; opacity: .92; color: currentColor; }
.enp .row { display: flex; align-items: center; gap: 4px; }
.enp span { font-size: 10.5px; opacity: .75; letter-spacing: .12em; }
.enp b { font-size: 14px; font-weight: 620; color: #cfd9e0; letter-spacing: .03em; line-height: 1.05; }
.enp .ed { width: 5.5px; height: 5.5px; border-radius: 50%; background: #6b7a84; flex: 0 0 auto; }
.enp.on { border-color: rgba(76,255,178,.6); box-shadow: 0 0 16px rgba(40,255,160,.28), inset 0 0 12px rgba(40,255,160,.12); }
.enp.on b { color: #8affcb; }
.enp.on .ed { background: #3dffa2; box-shadow: 0 0 8px 2px rgba(61,255,162,.8); animation: hc-engpulse 1.6s ease-in-out infinite; }
@keyframes hc-engpulse { 0%, 100% { opacity: .55; transform: scale(.9); } 50% { opacity: 1; transform: scale(1.15); } }
/* 人车距离 / 找车罗盘 */
.hmeta .door.fchip { flex: 0 0 auto; cursor: pointer; border-color: rgba(var(--hc-a,55,214,232),.35);
  background: rgba(var(--hc-a,55,214,232),.10); }
.hmeta .door.fchip:hover { background: rgba(var(--hc-a,55,214,232),.18); }
.hmeta .door.fchip .addr { flex: 0 0 auto; overflow: visible; }
.hmeta .door.pchip { flex: 0 0 auto; border-color: rgba(111,224,168,.28); background: rgba(111,224,168,.08); color: #8af0bd; }
.hmeta .door.pchip.away { border-color: rgba(var(--hc-a,55,214,232),.26); background: rgba(var(--hc-a,55,214,232),.08); color: var(--hc-accent); }
.hmeta .door.pchip .addr { flex: 0 0 auto; overflow: visible; }
.findmodal { position: absolute; inset: 0; z-index: 60; border-radius: var(--ha-card-border-radius, 28px); overflow: hidden; display: flex;
  flex-direction: column; align-items: stretch; justify-content: flex-start; gap: 0;
  padding: 0; container-type: size;
  background-image: var(--hc-bg, radial-gradient(120% 90% at 50% 0%, #233a54 0%, #0b1624 58%, #070e17 100%));
  color: #eaf6ff; }
.findmodal .fx { position: absolute; top: clamp(10px, 1.8cqmin, 22px); right: clamp(10px, 1.8cqmin, 22px);
  width: clamp(30px, 4cqmin, 48px); height: clamp(30px, 4cqmin, 48px); border-radius: 50%;
  border: 1px solid rgba(255,255,255,.2); background: rgba(6,16,26,.62); backdrop-filter: blur(8px);
  color: #dceaf5; font-size: clamp(13px, 1.6cqmin, 18px); cursor: pointer; z-index: 3; }
.findmodal .fhead { display: flex; align-items: center; gap: 6px; font-size: clamp(13px, 1.5cqmin, 19px);
  color: #9fb3c8; letter-spacing: .12em; text-transform: uppercase; }
.findmodal .fhead .ic { width: 1.15em; height: 1.15em; }
.findmodal .fzone.inline { margin: 0 0 0 4px; align-self: center; font-size: clamp(10px, 1.1cqmin, 13px);
  padding: 2px 8px; }
.findmodal .fdist { flex-wrap: wrap; justify-content: center; }
.findmodal .fzone { display: inline-flex; align-items: center; gap: 5px; margin: 0 0 8px;
  font-size: 11.5px; padding: 3px 9px; border-radius: 999px; border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.05); color: var(--secondary-text-color); }
.findmodal .fzone.in { border-color: rgba(var(--hc-a,55,214,232),.45); color: rgba(var(--hc-a,55,214,232),1); }
.findmodal .fzone svg { width: 13px; height: 13px; }

.findmodal .fdist { display: flex; align-items: baseline; gap: 8px; }
.findmodal .fdist b { font-size: clamp(32px, 7.2cqmin, 84px); line-height: 1; font-weight: 800; color: #fff;
  text-shadow: 0 0 24px rgba(var(--hc-a,55,214,232),.45); }
.findmodal .fdist span { font-size: clamp(12px, 1.35cqmin, 17px); color: #9fb3c8; }
/* 上半屏只放地图，下半屏放全部找车信息 */
.findmodal .fmapview { position: relative; flex: 0 0 auto; width: 100%; height: 47%; min-height: clamp(200px, 30cqmin, 320px);
  overflow: hidden; background: #0b1624; border-bottom: 1px solid rgba(120,160,200,.22); }
.findmodal .finfo { flex: 1 1 auto; min-height: 0; overflow: hidden auto; width: 100%;
  display: flex; flex-direction: column; align-items: center; justify-content: safe center; gap: clamp(6px, 1.2cqmin, 14px);
  padding: clamp(10px, 1.6cqmin, 20px) clamp(14px, 2cqmin, 26px) clamp(12px, 1.8cqmin, 22px); }
/* 找车地图：高德栅格瓦片静态取景，铺满上半屏，只标手机与车辆 */
.findmodal .fmap { position: absolute; inset: 0; width: 100%; height: 100%;
  overflow: hidden; background: #0b1624; }
.findmodal .fmap::before { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: linear-gradient(180deg, rgba(var(--hc-a,55,214,232),.42), rgba(var(--hc-a,55,214,232),.24) 55%, rgba(var(--hc-a,55,214,232),.10) 92%);
  mix-blend-mode: color; }
.findmodal .ftiles { position: absolute; inset: 0; }
.findmodal .fmap::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  box-shadow: inset 0 0 46px rgba(3,10,18,.72); }
.findmodal .ftiles img { position: absolute; width: 256px; height: 256px; opacity: 0;
  user-select: none; -webkit-user-drag: none; filter: brightness(.86) saturate(.95) contrast(1.05);
  animation: hc-mapfade .35s ease forwards; }
@keyframes hc-mapfade { to { opacity: 1; } }
.findmodal .flink { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.findmodal .flink line { stroke: rgba(var(--hc-a,55,214,232),.8); stroke-width: 2; stroke-dasharray: 7 7;
  filter: drop-shadow(0 0 4px rgba(var(--hc-a,55,214,232),.55)); }
.findmodal .faccring { position: absolute; transform: translate(-50%, -50%); border-radius: 50%; pointer-events: none;
  border: 1px solid rgba(var(--hc-a,55,214,232),.5); background: radial-gradient(circle, rgba(var(--hc-a,55,214,232),.16), rgba(var(--hc-a,55,214,232),.04) 70%, transparent 72%);
  box-shadow: 0 0 12px rgba(var(--hc-a,55,214,232),.25) inset; }
.findmodal .fpin { position: absolute; transform: translate(-50%, -50%); pointer-events: none; }
.findmodal .fpin.you { width: clamp(10px, 1.6cqmin, 16px); height: clamp(10px, 1.6cqmin, 16px); border-radius: 50%;
  background: var(--hc-accent); box-shadow: 0 0 0 3px rgba(var(--hc-a,55,214,232),.18), 0 0 12px rgba(var(--hc-a,55,214,232),.9); }
.findmodal .fpin.car { display: flex; align-items: center; justify-content: center;
  width: clamp(20px, 3.2cqmin, 30px); height: clamp(20px, 3.2cqmin, 30px); border-radius: 50%;
  background: rgba(8,20,32,.92); border: 1px solid rgba(var(--hc-a,55,214,232),.85); color: #eaf6ff;
  box-shadow: 0 0 0 3px rgba(var(--hc-a,55,214,232),.14), 0 0 14px rgba(var(--hc-a,55,214,232),.35); }
.findmodal .fpin.car .ic { width: 58%; height: 58%; }
.findmodal .fattr { position: absolute; right: 5px; bottom: 4px; padding: 0 5px; border-radius: 4px;
  font-size: 9px; color: rgba(210,230,245,.6); background: rgba(6,16,26,.6); }
.findmodal .fmapnote { position: absolute; left: 8px; bottom: 6px; display: flex; align-items: center;
  gap: clamp(8px, 1.2cqmin, 14px); flex-wrap: wrap; max-width: calc(100% - 90px);
  padding: clamp(4px, .7cqmin, 7px) clamp(7px, 1.1cqmin, 12px); border-radius: 9px;
  background: rgba(6,16,26,.88); border: 1px solid rgba(120,160,200,.22); backdrop-filter: blur(10px);
  font-size: clamp(10px, 1.2cqmin, 14px); color: #a9bfd4; }
.findmodal .fmapnote .lg { display: inline-flex; align-items: center; gap: 5px; }
.findmodal .fmapnote .lg.you i { width: 8px; height: 8px; border-radius: 50%; background: var(--hc-accent); box-shadow: 0 0 8px rgba(var(--hc-a,55,214,232),.8); }
.findmodal .fmapnote .lg.car .ic { width: 1.15em; height: 1.15em; color: #eaf6ff; }
.findmodal .fmapnote .lgd { color: #9fb3c8; }
.findmodal .ffoot[hidden] { display: none; }
.findmodal .fcomp { position: relative; width: min(48cqmin, 290px); aspect-ratio: 1; display: flex;
  align-items: center; justify-content: center; margin: 2px 0 0; }
.findmodal .frose { position: absolute; inset: 0; transform-origin: 50% 50%; will-change: transform; }
.findmodal .fring { position: absolute; inset: 0; border-radius: 50%;
  border: 1px dashed rgba(var(--hc-a,55,214,232),.38); box-shadow: 0 0 0 10px rgba(var(--hc-a,55,214,232),.04) inset, 0 0 30px rgba(var(--hc-a,55,214,232),.12); }
.findmodal .fring::before, .findmodal .fring::after { content: ""; position: absolute; left: 50%; top: -1px;
  width: 2px; height: 9px; background: rgba(var(--hc-a,55,214,232),.6); transform: translateX(-50%); }
.findmodal .fring::after { top: auto; bottom: -1px; }
.findmodal .frose::before, .findmodal .frose::after { content: ""; position: absolute; top: 50%; left: -1px;
  width: 9px; height: 2px; background: rgba(var(--hc-a,55,214,232),.45); transform: translateY(-50%); }
.findmodal .frose::after { left: auto; right: -1px; }
.findmodal .fn { position: absolute; left: 50%; top: -14px; transform: translateX(-50%);
  display: flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 5px;
  border-radius: 10px; background: rgba(6,16,26,.75); border: 1px solid rgba(111,224,168,.35);
  font-size: clamp(11px, 1.4cqmin, 16px); font-weight: 800; letter-spacing: .04em; color: #8bf5c0;
  text-shadow: 0 0 10px rgba(111,224,168,.7); }
.findmodal .farrow { position: relative; display: flex; align-items: center; justify-content: center;
  width: 66%; height: 66%; transform-origin: 50% 50%; transition: none; color: var(--hc-accent); will-change: transform;
  filter: drop-shadow(0 0 18px rgba(var(--hc-a,55,214,232),.65)); }
.findmodal .farrow .ic { width: 100%; height: 100%; }
.findmodal .fcarpin { position: absolute; transform: translate(-50%, -50%); display: flex; align-items: center;
  justify-content: center; width: clamp(18px, 2.9cqmin, 28px); height: clamp(18px, 2.9cqmin, 28px);
  border-radius: 50%; background: rgba(8,20,32,.95); border: 1px solid rgba(var(--hc-a,55,214,232),.9); color: #eaf6ff;
  box-shadow: 0 0 0 3px rgba(var(--hc-a,55,214,232),.16), 0 0 14px rgba(var(--hc-a,55,214,232),.45); pointer-events: none; }
.findmodal .fcarpin .ic { width: 62%; height: 62%; }
.findmodal .fdot { position: absolute; width: 7px; height: 7px; border-radius: 50%; background: rgba(var(--hc-a,55,214,232),.9);
  box-shadow: 0 0 10px rgba(var(--hc-a,55,214,232),.8); pointer-events: none; }
.findmodal .ffoot { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center; }
.findmodal .fperm { display: inline-flex; align-items: center; gap: 6px; height: clamp(30px, 3.8cqmin, 48px);
  padding: 0 clamp(12px, 2cqmin, 22px); border-radius: 999px; border: 1px solid rgba(var(--hc-a,55,214,232),.4);
  background: rgba(var(--hc-a,55,214,232),.12); color: #cfeff8; font-size: clamp(12px, 1.45cqmin, 18px); cursor: pointer; }
.findmodal .fperm .ic { width: 1.15em; height: 1.15em; }
.findmodal .facc { font-size: clamp(11px, 1.3cqmin, 16px); color: #7590a6; }
.findmodal .fnote { max-width: min(76%, 560px); text-align: center; font-size: clamp(11px, 1.35cqmin, 16px);
  line-height: 1.5; color: #7e93a8; }
`;

export const EDITOR_STYLES = `
:host { display: block; }
.ed { padding: 4px 0 8px; font-family: var(--ha-font-family-body, inherit); }
.sec { margin: 4px 0 14px; }
.sec h3 { margin: 0 0 8px; font-size: 13px; font-weight: 600; color: var(--primary-text-color); }
.hint { font-size: 11.5px; color: var(--secondary-text-color); line-height: 1.5; margin: 0 0 8px; }
label.f { display: block; font-size: 11px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase;
  color: var(--secondary-text-color); margin: 10px 0 4px; }
.tf { width: 100%; box-sizing: border-box; padding: 9px 11px; border-radius: 8px; font-size: 13px;
  color: var(--primary-text-color); background: var(--secondary-background-color, rgba(255,255,255,.06));
  border: 1px solid var(--divider-color, rgba(255,255,255,.14)); outline: none; }
.tf:focus { border-color: var(--primary-color); }
.row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 7px 0; }
.row .rl { font-size: 13px; color: var(--primary-text-color); }
.sw { position: relative; width: 40px; height: 22px; flex: none; border-radius: 999px; cursor: pointer;
  background: var(--divider-color, #bbb); transition: background .18s; border: none; }
.sw[aria-checked="true"] { background: var(--primary-color, #03a9f4); }
.sw::after { content: ""; position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%;
  background: #fff; transition: transform .18s; }
.sw[aria-checked="true"]::after { transform: translateX(18px); }
.chips2 { display: flex; flex-wrap: wrap; gap: 6px; }
.tg { padding: 6px 11px; border-radius: 999px; font-size: 12px; cursor: pointer;
  border: 1px solid var(--divider-color, rgba(255,255,255,.2)); background: transparent;
  color: var(--secondary-text-color); }
.tg[aria-pressed="true"] { border-color: var(--primary-color, #03a9f4); color: var(--primary-color, #03a9f4);
  background: rgba(3,169,244,.12); }
.swatches { display: flex; gap: 6px; align-items: center; }
.cwheel { position: relative; width: 30px; height: 30px; flex: 0 0 auto; border-radius: 999px; cursor: pointer;
  box-shadow: inset 0 0 0 1.5px rgba(255,255,255,.2); }
.cwheel input { position: absolute; inset: 0; z-index: 3; width: 100%; height: 100%; padding: 0; border: none;
  opacity: 0; cursor: pointer; }
.cface { position: absolute; inset: 0; border-radius: 999px;
  background: conic-gradient(from 0deg, #ff5252, #ffb74d, #8ef07a, #3ee6d1, #4d9cff, #b06bff, #ff4dd2, #ff5252); }
.cdot { position: absolute; inset: 8px; border-radius: 999px; background: var(--pick, #37d6e8);
  box-shadow: inset 0 0 0 1.5px rgba(0,0,0,.35); }
.swatch { width: 26px; height: 26px; border-radius: 999px; cursor: pointer; border: 2px solid transparent;
  box-shadow: 0 0 0 1px rgba(255,255,255,.16) inset; }
.swatch.sel { border-color: var(--primary-text-color); }
.adv { border-top: 1px solid var(--divider-color, rgba(255,255,255,.14)); margin-top: 6px; padding-top: 4px; }
.adv .grid2 { display: grid; grid-template-columns: 1fr; gap: 2px; }
.pickrow { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.pickrow .pick { flex: 1 1 auto; min-width: 0; }
.pickrow .btn.sq.clr { flex: 0 0 28px; padding: 4px 0; font-size: 11px; }
.bk-sub .pick { flex: 1 1 160px; min-width: 0; }
ha-selector { display: block; width: 100%; }
.ranged { display: flex; align-items: center; gap: 10px; }
input[type="range"] { flex: 1; accent-color: var(--primary-color, #03a9f4); }

/* 兜底：编辑器可能在任何主题下打开，HA 变量缺失时不能退化成不可见的控件 */
.sec { border-top: 1px solid var(--divider-color, rgba(140,160,185,.22)); padding-top: 12px; margin: 14px 0; }
.sec:first-child { border-top: none; padding-top: 0; margin-top: 4px; }
.sw { background: var(--divider-color, #4b5563); }
select.tf { font-size: 13px; padding: 8px 10px; }
.ed .hint, .ed label.f { color: var(--secondary-text-color, #98a0a8); }
.ed h3, .ed .row .rl, .ed summary { color: var(--primary-text-color, #e6e6e6); }
/* 编辑器：模块布局行 */
.blklist { display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px; }
.blkrow { display: flex; flex-direction: column; gap: 6px; padding: 7px 8px 8px; border-radius: 11px;
  background: rgba(255,255,255,.045); border: 1px solid rgba(255,255,255,.06); font-size: 12px; }
.bk-top { display: flex; align-items: center; gap: 6px; }
.bk-sub { display: flex; align-items: center; gap: 6px; }
.bk-sub .ent { flex: 1 1 auto; min-width: 0; }
.bk-sub .btn.sq.clr { flex: 0 0 26px; padding: 4px 0; font-size: 11px; }
.blkrow.off { opacity: .55; }
.blkrow .nm { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.blkrow .btn.sq { min-width: 26px; padding: 4px 6px; font-size: 12px; line-height: 1; }
.blkrow .btn.sq.del { color: #ff8a8a; border-color: rgba(255,110,110,.28); }
.blkrow select.tf, .blkrow input.tf { padding: 5px 7px; font-size: 11.5px; }
.blkrow .sw { flex: none; }
/* 模块内实体清单：展开后每个实体一行，可独立增删与排序 */
.bk-items { margin-top: 2px; border-top: 1px dashed rgba(255,255,255,.10); padding-top: 4px; }
.bk-items summary { cursor: pointer; font-size: 11.5px; color: var(--secondary-text-color, #98a0a8);
  padding: 3px 0; list-style: none; }
.bk-items summary::-webkit-details-marker { display: none; }
.bk-items summary::before { content: "▸ "; }
.bk-items[open] summary::before { content: "▾ "; }
.bitems { display: flex; flex-direction: column; gap: 6px; padding: 4px 0 2px; }
.birow { display: flex; flex-direction: column; gap: 3px; padding: 5px 6px 6px;
  border-radius: 8px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.05); }
.bih { display: flex; align-items: center; gap: 5px; }
.bil { flex: 1 1 auto; min-width: 0; font-size: 11.5px; color: var(--primary-text-color, #e6e6e6);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bil.tf { flex: 1 1 auto; min-width: 0; padding: 3px 6px; font-size: 11px; }
.birow .btn.sq { min-width: 24px; padding: 3px 5px; font-size: 11px; line-height: 1; }
.birow .btn.sq.clr { color: #ff8a8a; border-color: rgba(255,110,110,.28); }
.birow .pick { width: 100%; }
.addbi { align-self: flex-start; padding: 5px 9px; font-size: 11.5px; margin-top: 2px; }
.bipickrow { display: flex; align-items: flex-start; gap: 6px; }
.bipickrow .pick { flex: 1 1 auto; min-width: 0; }

ha-icon.ic { width: 1em; height: 1em; --mdc-icon-size: 1em; display: inline-flex; vertical-align: middle; }

`;
