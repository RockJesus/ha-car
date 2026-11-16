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
ha-card > .skin { position: absolute; inset: 0; z-index: 0; pointer-events: none; border-radius: inherit;
  background-image: var(--hc-bg,
    radial-gradient(120% 80% at 50% -10%, rgba(55,214,232,.14), transparent 58%),
    radial-gradient(70% 50% at 15% 105%, rgba(40,120,180,.10), transparent 70%),
    linear-gradient(168deg, #111d2c 0%, #0b1521 52%, #060b12 100%));
  background-size: auto, auto, auto; background-repeat: no-repeat; }
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
.wrap { position: relative; z-index: 2; padding: 18px 16px 14px; display: flex; flex-direction: column; gap: 14px;
  background-image: var(--hc-bg,
    radial-gradient(120% 80% at 50% -10%, rgba(var(--hc-a,55,214,232),.14), transparent 58%),
    radial-gradient(70% 50% at 15% 105%, rgba(40,120,180,.10), transparent 70%),
    linear-gradient(168deg, #111d2c 0%, #0b1521 52%, #060b12 100%));
  background-size: auto, auto, auto; background-repeat: no-repeat; }
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
.hero { position: relative; height: 224px; display: flex; align-items: center; justify-content: center;
  overflow: hidden; --r: 92px; }
.halo { position: absolute; inset: -20% -12% -10%; pointer-events: none;
  background: radial-gradient(46% 52% at 50% 50%, rgba(var(--hc-a,55,214,232),.20), rgba(var(--hc-a,55,214,232),.06) 46%, transparent 72%);
  filter: blur(2px); }
.orbit, .orbit.o2 { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  border-radius: 50%; pointer-events: none; height: 94%; aspect-ratio: 1; width: auto; }
.orbit { border: 1px solid rgba(70,220,240,.22);
  box-shadow: inset 0 0 34px -14px rgba(var(--hc-a,55,214,232),.55), 0 0 24px -16px rgba(var(--hc-a,55,214,232),.5); }
.orbit.o2 { height: 97%;
  border: 1px solid rgba(var(--hc-a,55,214,232),.08); }
.node { position: absolute; left: 50%; top: 50%; width: 7px; height: 7px; margin: -3.5px 0 0 -3.5px;
  transform: translate(-50%, -50%);
  border-radius: 50%; background: #9ef4ff;
  box-shadow: 0 0 6px 1px rgba(var(--hc-a,55,214,232),.9), 0 0 16px 5px rgba(var(--hc-a,55,214,232),.35);
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
.tile .lbl { max-width: 100%; font-size: 13.5px; font-weight: 620; letter-spacing: .06em;
  color: rgba(206,229,244,.88); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
@keyframes hc-ring-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
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
  background: linear-gradient(180deg, transparent, rgba(120,190,215,.28) 26%, rgba(120,190,215,.28) 74%, transparent); }
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
.panel { border-radius: 16px; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.022);
  padding: 11px 12px; }
.panel .ph { display: flex; align-items: center; gap: 7px; font-size: 10px; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase; color: var(--hc-dim); margin-bottom: 8px; }
.panel .ph .ic { width: 13px; height: 13px; }
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
.loc { width: auto; min-width: 38cqw; transform: translate(-50%, -50%); padding: 2.4cqw 2.8cqw; border-radius: 7cqw;
  gap: 1.1cqw; }
.loc.lf, .loc.lr { left: calc(7.5% - 23.5cqw); }
.loc.rf, .loc.rr { left: calc(92.5% + 23.5cqw); }
.loc.lf, .loc.rf { top: 27%; }
.loc.lr, .loc.rr { top: 73%; }
.loc .lh { display: flex; align-items: center; justify-content: space-between; }
.loc .lh span { font-size: 4.5cqw; line-height: 1; color: #93a8bd; letter-spacing: .09em; }
.loc .lh .lk { font-style: normal; width: 5.2cqw; height: 5.2cqw; color: #6d8298; opacity: .85; }
.loc .lh .lk .ic { width: 100%; height: 100%; display: block; }
.loc .lh .lk.on { color: #7ee0b3; opacity: 1; }
.loc .lrs { display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; gap: .7cqw;
  width: fit-content; max-width: 100%; margin: 0 auto; }
.loc .lr { flex: 0 0 auto; display: flex; flex-direction: row; align-items: center;
  justify-content: flex-start; gap: 1.3cqw; line-height: 1; }
.loc .lr .ri { flex: 0 0 auto; width: 5.2cqw; height: 5.2cqw; display: grid; place-items: center; color: #8fd6ea; }
.loc .lr .ri .ic { width: 100%; height: 100%; display: block; }
.loc .lr b { font-size: 4.8cqw; font-weight: 620; color: #dbe7f5; letter-spacing: .01em; white-space: nowrap; }
.loc .lr.tire b { font-size: 5.0cqw; }
.loc .lr.tire b s { text-decoration: none; font-size: 3.8cqw; font-weight: 500; color: #7d90a6; margin-left: .6cqw; }
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
/* 前后盖小卡：车头/车尾正上方与正下方，仍落在圆环内侧 */
.cap { left: 50%; width: auto; max-width: 46cqw; flex-direction: row; align-items: center; justify-content: flex-start;
  gap: 1.6cqw; padding: 1.9cqw 2.6cqw 1.9cqw 3cqw; border-radius: 5.2cqw; }
.cap.hood, .cap.trunk { transform: translate(-50%, 0); }
.cap .cx { display: flex; flex-direction: column; align-items: center; gap: .6cqw; min-width: 0; text-align: center;
  padding: 0 4.8cqw 0 0; }
.cap .ri { flex: 0 0 5.4cqw; height: 5.4cqw; display: grid; place-items: center; color: #86c9de; }
.cap .ri .ic { width: 100%; height: 100%; display: block; }
.cap b { font-size: 4.2cqw; font-weight: 500; color: #8fa5bb; line-height: 1; white-space: nowrap; letter-spacing: .05em; }
.cap i { font-style: normal; font-size: 5.4cqw; font-weight: 620; color: #dbe7f5; line-height: 1; white-space: nowrap; }
.cap .lk { position: absolute; right: 2.2cqw; top: 50%; transform: translateY(-50%); width: 4.4cqw; height: 4.4cqw; color: #6d8298; opacity: .85; }
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
/* 选择器缩略卡：照真机卡整体版式缩小（竖版小卡），车牌/位置/数值全是假数据 */
ha-card.preview { height: 660px; overflow: hidden; }
ha-card.preview .wrap {
  padding: 13px 14px 11px; height: 100%; box-sizing: border-box;
  display: flex; flex-direction: column; gap: 9px;
  container-type: inline-size; pointer-events: none;
}
.pv-top { display: flex; align-items: center; gap: 8px; }
.pv-top h1 { margin: 0; font-size: 17px; font-weight: 700; letter-spacing: .01em; }
.pv-top .status { margin-left: auto; flex: 0 0 auto; height: auto; padding: 3px 9px; font-size: 9.5px; gap: 4px; line-height: 1.5; }
.pv-top .status .dot { width: 5px; height: 5px; }
.pv-plate { font-size: 9.5px; letter-spacing: .10em; color: rgba(206, 228, 242, .62); margin-top: -3px; }
.pv-hero { position: relative; flex: 1 1 auto; min-height: 168px; display: flex; align-items: center; justify-content: center; }
.pv-ring {
  position: absolute; width: 172px; height: 172px; border-radius: 50%;
  border: 1px solid rgba(64, 224, 255, .16);
  box-shadow: inset 0 0 26px -10px rgba(64, 224, 255, .38), 0 0 20px -9px rgba(64, 224, 255, .26);
}
.pv-nd { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: rgba(96, 236, 255, .85); box-shadow: 0 0 6px rgba(96, 236, 255, .8); }
.pv-nd.n1 { left: 50%; top: -2px; transform: translateX(-50%); }
.pv-nd.n2 { left: 50%; bottom: -2px; transform: translateX(-50%); }
.pv-nd.n3 { left: -2px; top: 50%; transform: translateY(-50%); }
.pv-nd.n4 { right: -2px; top: 50%; transform: translateY(-50%); }
.pv-carimg { position: relative; z-index: 1; width: 128px; height: 150px; object-fit: contain; }
.pv-gauges { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-evenly; gap: 4px; }
.pv-gsep { flex: 0 0 auto; display: inline-flex; color: rgba(150, 196, 220, .38); }
.pv-gsep svg { width: 15px; height: 15px; }
ha-card.preview .gauge { max-width: 92px; }
ha-card.preview .gn b { font-size: 21px; }
ha-card.preview .gl { font-size: 9px; }
.pv-chips { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 4px; }
.pv-chips span { display: inline-flex; align-items: baseline; gap: 3px; font-size: 8.5px; color: rgba(206, 228, 242, .42); white-space: nowrap; }
.pv-chips span + span { padding-left: 2px; }
.pv-chips span b { font-size: 10.5px; color: rgba(226, 240, 250, .82); }
.pv-chips span em { font-style: normal; font-size: 8px; opacity: .6; }
.pv-acts { flex: 0 0 auto; display: flex; justify-content: space-between; gap: 4px; }
.pv-act { flex: 1 1 0; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.pv-act b {
  display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%;
  background: radial-gradient(120% 120% at 50% 0%, rgba(255, 255, 255, .10), rgba(255, 255, 255, .03));
  border: 1px solid rgba(255, 255, 255, .10); color: rgba(214, 234, 246, .82);
}
.pv-act b svg { width: 14px; height: 14px; }
.pv-act em { font-style: normal; font-size: 8.5px; color: rgba(206, 228, 242, .5); white-space: nowrap; }
.pv-act.on b { color: #5ef0b8; border-color: rgba(94, 240, 184, .55); box-shadow: 0 0 12px -4px rgba(94, 240, 184, .55), inset 0 0 14px -8px rgba(94, 240, 184, .8); }
.pv-seek { flex: 0 0 auto; display: flex; gap: 6px; }
.pv-seek span {
  flex: 1 1 0; display: inline-flex; align-items: center; justify-content: center; gap: 5px; white-space: nowrap;
  padding: 6px 8px; border-radius: 9px; font-size: 9px; color: rgba(214, 234, 246, .62);
  background: rgba(255, 255, 255, .035); border: 1px solid rgba(255, 255, 255, .07);
}
.pv-seek svg { width: 12px; height: 12px; opacity: .75; }
.pv-closed, .pv-svc, .pv-loc {
  flex: 0 0 auto; display: inline-flex; align-items: center; gap: 6px; padding: 5px 9px; border-radius: 9px;
  font-size: 9px; color: rgba(206, 228, 242, .5); white-space: nowrap;
  background: rgba(255, 255, 255, .028); border: 1px solid rgba(255, 255, 255, .06);
}
.pv-closed, .pv-loc { align-self: flex-start; }
.pv-svc { justify-content: space-between; }
.pv-closed svg, .pv-svc svg, .pv-loc svg { width: 12px; height: 12px; opacity: .7; }
.pv-svc svg:last-child { opacity: .5; }
.pv-tires {
  flex: 0 0 auto; margin-top: auto; display: flex; align-items: center; gap: 5px; padding: 7px 8px; border-radius: 9px;
  background: rgba(255, 255, 255, .03); border: 1px solid rgba(255, 255, 255, .06);
}
.pv-tvec { display: inline-flex; align-items: baseline; gap: 1px; font-size: 7.5px; color: rgba(206, 228, 242, .45); flex: 0 0 auto; }
.pv-tvec svg { width: 11px; height: 11px; opacity: .7; align-self: center; margin-right: 1px; }
.pv-tvec b { font-size: 10px; color: rgba(226, 240, 250, .8); }
.pv-tvec.warn b { color: #ffd479; }
.pv-tvec.warn svg { color: #ffd479; opacity: .9; }
.pv-sync { display: inline-flex; align-items: center; gap: 3px; flex: 0 0 auto; font-size: 8.5px; color: rgba(206, 228, 242, .45); white-space: nowrap; }
.pv-sync svg { width: 11px; height: 11px; opacity: .65; }
.pv-tires .pv-sync { margin-left: auto; }
/* 超窄格子（<285px）去掉每格的 kPa 后缀，保证底部条一行装下 */
@container (max-width: 285px) {
  .pv-tvec em { display: none; }
  .pv-tvec b { font-size: 9.5px; }
  .pv-tires { gap: 4px; }
}

/* sections 视图小卡片：整卡缩进栅格单元，不溢出、不压住编辑按钮 */
:host(.gridcard) { position: relative; overflow: hidden; max-width: none; margin: 0; }
ha-card.gfit {
  position: absolute; left: 0; top: 0; box-sizing: border-box;
  transform: scale(var(--gscale, 1)); transform-origin: 0 0;
}
ha-card.gfit .wrap { height: 100%; box-sizing: border-box; overflow: hidden; }

/* 宽格子里的双栏版式（与面板同一套左右分栏） */
ha-card.gfit.gtwo .blocks { display: flex; flex-direction: row; align-items: stretch; gap: 26px; }
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
ha-card.panel.fit .orbit { height: 78%; }
ha-card.panel.fit .orbit.o2 { height: 86%; }
ha-card.panel.fit .hmeta { grid-column: 1 / -1; }
ha-card.panel.fit .acts { width: 100%; max-width: none; }
ha-card.panel.fit .pills { width: 100%; max-width: none; }

@media (min-width: 860px) {
  :host { max-width: 860px; margin: 0 auto; }
  .wrap { padding: 24px 22px 18px; gap: 16px; }
  .hero { height: 268px; --r: 104px; }
  .head { align-items: center; }
  /* 桌面/面板视图：车图在左，仪表与副指标在右 */

  .dright { gap: 14px; }
  .gauge { max-width: 152px; }
  .acts { max-width: 540px; margin: 2px auto 0; width: 100%; }
  .pills { max-width: 540px; margin: 10px auto 0; width: 100%; }
  /* 面板模式：容器多宽就排多宽，车图列跟着面板高度走 */
  :host(.panel) { max-width: none; margin: 0; }
  ha-card.panel .wrap { padding: 22px 26px 16px; gap: 12px; }
  ha-card.panel .b-hero .hero { height: 100%; min-height: 250px; --r: 106px; }
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
  display: flex; flex-direction: column; gap: 3px; padding: 6px 13px 7px 10px; border-radius: 13px;
  background: rgba(9,18,26,.84); border: 1px solid rgba(140,170,190,.22); color: #a9b6bf;
  letter-spacing: .08em; white-space: nowrap; backdrop-filter: blur(8px);
  box-shadow: 0 4px 14px rgba(0,0,0,.35); pointer-events: none; }
.enp .row { display: flex; align-items: center; gap: 6px; }
.enp span { font-size: 10px; opacity: .7; letter-spacing: .14em; }
.enp b { font-size: 13px; font-weight: 600; color: #cfd9e0; letter-spacing: .04em; line-height: 1.1; }
.enp .ed { width: 6px; height: 6px; border-radius: 50%; background: #6b7a84; flex: 0 0 auto; }
.enp.on { border-color: rgba(76,255,178,.6); box-shadow: 0 0 16px rgba(40,255,160,.28), inset 0 0 12px rgba(40,255,160,.12); }
.enp.on b { color: #8affcb; }
.enp.on .ed { background: #3dffa2; box-shadow: 0 0 8px 2px rgba(61,255,162,.8); animation: hc-engpulse 1.6s ease-in-out infinite; }
@keyframes hc-engpulse { 0%, 100% { opacity: .55; transform: scale(.9); } 50% { opacity: 1; transform: scale(1.15); } }
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
