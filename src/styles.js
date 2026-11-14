// 仪表台语汇：车机背光青 + 深蓝黑漆面 + 单一强调色。
// 色板是推导值，不是框架默认色：车身钢板 #101B29 / 深夜座舱 #0A1119 / 仪表背光 #37D6E8。
export const STYLES = `
:host { display: block; --hc-accent: #37d6e8; --hc-ink: #e9eff7; --hc-dim: #8496ad;
  --hc-ok: #6fe0a8; --hc-warn: #ffc46b; --hc-bad: #ff9182; --hc-holdms: 2000ms; }
ha-card { display: block; overflow: hidden; position: relative;
  border: 1px solid rgba(120,190,215,.16);
  border-radius: var(--ha-card-border-radius, 28px);
  color: var(--hc-ink);
  background-image:
    radial-gradient(120% 80% at 50% -10%, rgba(55,214,232,.14), transparent 58%),
    radial-gradient(70% 50% at 15% 105%, rgba(40,120,180,.10), transparent 70%),
    linear-gradient(168deg, #111d2c 0%, #0b1521 52%, #060b12 100%);
  background-size: auto, auto, auto;
  background-repeat: no-repeat;
  box-shadow: 0 30px 60px -30px rgba(2,6,12,.98), 0 0 56px -26px rgba(55,214,232,.45),
    inset 0 1px 0 rgba(255,255,255,.08), inset 0 -1px 0 rgba(0,0,0,.5);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Microsoft YaHei", "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  isolation: isolate;
}
ha-card::before { content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 0;
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
.wrap { padding: 18px 16px 14px; display: flex; flex-direction: column; gap: 14px; }
.duo { display: flex; flex-direction: column; gap: 14px; }
.dleft, .dright { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
/* 模块栈：顺序由配置决定，手机单列、宽屏双栏（车图固定左栏） */
.blocks { display: flex; flex-direction: column; gap: 14px; flex: 1 1 auto; min-height: 0; }
.b-hero-col, .b-side { display: contents; }
.blk + .blk { margin-top: 0; }
.blk { min-width: 0; }
.b-hero { display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0; }
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

/* 头部：大标题 + 右上状态胶囊（参考图同构） */
.head { display: flex; align-items: flex-start; gap: 12px; }
.ttl { flex: 1; min-width: 0; }
h1 { margin: 0; font-size: 26px; line-height: 1.1; font-weight: 700; letter-spacing: -.01em;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.plate { margin-top: 8px; font-size: 10.5px; font-weight: 600; letter-spacing: .18em; color: rgba(150,172,196,.72); }
.status { flex: none; display: inline-flex; align-items: center; gap: 7px; height: 30px; padding: 0 14px;
  border-radius: 999px; font-size: 11.5px; font-weight: 650; letter-spacing: .03em;
  color: var(--hc-dim); background: rgba(255,255,255,.045);
  border: 1px solid rgba(255,255,255,.11); white-space: nowrap;
  backdrop-filter: blur(6px); }
.brand { display: inline-flex; align-items: center; margin-right: 7px; vertical-align: -1px; }
.brand svg { width: 46px; height: 21px; display: block; }
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
  background: radial-gradient(46% 52% at 50% 50%, rgba(55,214,232,.20), rgba(55,214,232,.06) 46%, transparent 72%);
  filter: blur(2px); }
.orbit, .orbit.o2 { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  border-radius: 50%; pointer-events: none; height: 94%; aspect-ratio: 1; width: auto; }
.orbit { border: 1px solid rgba(70,220,240,.22);
  box-shadow: inset 0 0 34px -14px rgba(55,214,232,.55), 0 0 24px -16px rgba(55,214,232,.5); }
.orbit.o2 { height: 97%;
  border: 1px solid rgba(55,214,232,.08); }
.node { position: absolute; left: 50%; top: 50%; width: 7px; height: 7px; margin: -3.5px 0 0 -3.5px;
  transform: translate(-50%, -50%);
  border-radius: 50%; background: #9ef4ff;
  box-shadow: 0 0 6px 1px rgba(55,214,232,.9), 0 0 16px 5px rgba(55,214,232,.35);
  animation: hc-node 3.2s ease-in-out infinite; }
.node.n1 { top: 0; animation-delay: 0s; }
.node.n2 { top: 50%; left: 100%; animation-delay: .8s; }
.node.n3 { top: 100%; animation-delay: 1.6s; }
.node.n4 { top: 50%; left: 0; animation-delay: 2.4s; }
.carimg { position: relative; max-width: 64%; max-height: 78%; object-fit: contain;
  filter: brightness(1.06) saturate(1.04) drop-shadow(0 30px 30px rgba(2,6,12,.8)) drop-shadow(0 0 18px rgba(55,214,232,.08)); }
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
.chip.info { color: var(--hc-accent); background: rgba(55,214,232,.09); border-color: rgba(55,214,232,.24); }

/* 操作：圆形玻璃钮 + 标签，长按沿圆环走一圈（参考图同构） */
.acts { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 2px; }
.tile { position: relative; display: flex; flex-direction: column; align-items: center; gap: 9px; padding: 0;
  background: none; border: none; cursor: pointer; color: var(--hc-ink); font: inherit; text-align: center;
  -webkit-tap-highlight-color: transparent; -webkit-touch-callout: none; user-select: none;
  touch-action: manipulation; }
.orb { position: relative; width: 58px; height: 58px; display: grid; place-items: center; border-radius: 50%;
  border: 1px solid rgba(190,225,245,.14);
  background: radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,.14), rgba(255,255,255,.02) 58%), #0c1622;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.12), inset 0 -8px 16px -10px rgba(0,0,0,.9),
    0 12px 24px -16px rgba(0,0,0,.95), 0 0 20px -14px rgba(55,214,232,.4);
  transition: transform .16s, border-color .18s, box-shadow .18s, background .18s; }
.tile .ic { width: 21px; height: 21px; }
.tile .lbl { max-width: 100%; font-size: 11.5px; font-weight: 600; letter-spacing: .04em; color: rgba(150,172,196,.9);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tile:hover .orb { border-color: rgba(190,240,255,.3);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 0 26px -10px rgba(55,214,232,.55); }
.tile:active .orb, .tile.pressing .orb { transform: scale(.94); }
.tile.hot .orb { color: #eafdff; border-color: rgba(55,214,232,.45);
  box-shadow: 0 0 0 1px rgba(55,214,232,.16) inset, 0 0 24px -6px rgba(55,214,232,.6); }
.tile.hot .lbl { color: #cdf6ff; }
.tile.on .orb { color: var(--hc-ok); border-color: rgba(111,224,168,.42);
  box-shadow: 0 0 22px -8px rgba(111,224,168,.6); }
.tile.off .orb { opacity: .4; }
.tile.off .lbl { opacity: .4; }
.hring { position: absolute; inset: -8%; width: 116%; height: 116%; opacity: 0; pointer-events: none; }
.hring circle { fill: none; stroke: var(--hc-accent); stroke-width: 3.2; stroke-linecap: round;
  stroke-dasharray: 295.2; stroke-dashoffset: 295.2; }
.tile.pressing .hring, .tile.armed .hring { opacity: 1; }
.tile.pressing .hring circle { stroke-dashoffset: 0; transition: stroke-dashoffset var(--hc-holdms) linear; }
.tile.armed .hring circle { stroke-dashoffset: 0; }
.tile.armed .orb { border-color: rgba(55,214,232,.7);
  box-shadow: 0 0 26px -4px rgba(55,214,232,.85), inset 0 0 18px -6px rgba(55,214,232,.6); }
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
.pill.pressing { color: var(--hc-accent); border-color: rgba(55,214,232,.5); }
.pill.armed { color: var(--hc-accent); border-color: rgba(55,214,232,.7); background: rgba(55,214,232,.14); }
.pill .holdbar { position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; background: var(--hc-accent);
  transform: scaleX(0); transform-origin: left; opacity: 0; }
.pill.pressing .holdbar { opacity: 1; transform: scaleX(1); transition: opacity .12s, transform var(--hc-holdms) linear; }
.pill.pending::after { content: ""; position: absolute; top: 6px; right: 8px; width: 5px; height: 5px;
  border-radius: 50%; background: var(--hc-accent); animation: hc-pulse 1.4s ease-in-out infinite; }

/* 能耗：双环形仪表 + 中间量纲图标（参考图同构） */
.energy { display: grid; grid-template-columns: 1fr 1px 1fr; align-items: center; column-gap: 14px; padding: 2px 2px 0; }
.gauge { position: relative; width: 100%; max-width: 132px; aspect-ratio: 1; margin: 0 auto; }
.gauge > svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.gt { fill: none; stroke: rgba(255,255,255,.07); stroke-width: 6; }
.gp { fill: none; stroke: var(--hc-accent); stroke-width: 6; stroke-linecap: round;
  filter: drop-shadow(0 0 8px rgba(55,214,232,.65)); }
.gv { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 3px; padding: 0 10px; box-sizing: border-box; }
.gl { display: inline-flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 650; letter-spacing: .1em;
  color: rgba(160,182,206,.85); text-transform: uppercase; }
.gl .ic { width: 12px; height: 12px; opacity: .85; }
.gn { display: flex; flex-direction: column; align-items: center; gap: 1px; line-height: 1; max-width: 100%; }
.gn b { font-size: 29px; font-weight: 680; letter-spacing: -.02em; color: #f3f8ff; white-space: nowrap;
  text-shadow: 0 0 22px rgba(55,214,232,.16); }
.gn i { font-size: 9.5px; font-style: normal; font-weight: 600; color: rgba(150,172,196,.9); letter-spacing: .06em; }
.egdiv { width: 1px; height: 78px; align-self: center;
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
  font: 650 11px/1 inherit; cursor: pointer; border: 1px solid rgba(55,214,232,.3);
  background: rgba(55,214,232,.1); color: var(--hc-accent); }
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

.toast { display: flex; align-items: flex-start; gap: 8px; padding: 9px 11px; border-radius: 12px;
  font-size: 11.5px; line-height: 1.4; background: rgba(55,214,232,.1);
  border: 1px solid rgba(55,214,232,.26); color: #d5f8ff; }
.toast.err { background: rgba(255,145,130,.1); border-color: rgba(255,145,130,.3); color: #ffd3c9; }
.toast .ic { width: 14px; height: 14px; flex: none; margin-top: 1px; }

.empty { padding: 26px 16px 30px; text-align: center; color: var(--hc-dim); font-size: 12px; line-height: 1.6; }
.empty .ic { width: 34px; height: 34px; margin: 0 auto 10px; opacity: .45; }

/* 紧凑：主视觉与仪表收一档，保留操作与同步 */
.compact .wrap { padding: 15px 14px 12px; gap: 11px; }
.compact h1 { font-size: 20px; }
.compact .hero { height: 152px; --r: 60px; }
.compact .carimg { max-height: 70%; max-width: 58%; }
.compact .orbit.o2 { display: none; }
.compact .orb { width: 48px; height: 48px; }
.compact .tile .ic { width: 19px; height: 19px; }
.compact .tile { gap: 7px; }
.compact .gauge { max-width: 96px; }
.compact .gn b { font-size: 25px; }
.compact .gl { font-size: 9.5px; }

@keyframes hc-spin { to { transform: rotate(360deg); } }
@keyframes hc-pulse { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
@keyframes hc-node { 0%, 100% { opacity: .5; } 50% { opacity: 1; } }

/* 宽屏（面板视图 / 桌面仪表盘）：手机尺寸的内容居中收窄，避免拉成一条横贯全屏的卡片 */


/* 俯视图状态层：贴在车图上，位置由 JS 量出车图矩形 */
.covl { position: absolute; pointer-events: none; }
.cedge { position: absolute; inset: 0; pointer-events: none; }
.cst { position: absolute; transform: translate(-50%, -50%); width: 44px; height: 44px; border-radius: 13px;
  background: linear-gradient(180deg, rgba(22,34,48,.78), rgba(9,15,23,.72));
  border: 1px solid rgba(160,205,230,.16);
  box-shadow: 0 4px 14px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.1);
  backdrop-filter: blur(8px);
  transition: background .25s ease, border-color .25s ease, box-shadow .25s ease; }
.cst .glyph { position: absolute; inset: 5px 5px 12px; opacity: .34; color: #cfe6f5; }
.cst .glyph .ic { width: 100%; height: 100%; display: block; }
.cst .tx { position: absolute; left: 0; right: 0; top: 19px; text-align: center; font-size: 9px; font-weight: 650;
  line-height: 1; color: #c5d3e4; letter-spacing: .02em; }
.cst .tag { position: absolute; left: 0; right: 0; bottom: 4px; text-align: center; font-style: normal;
  font-size: 7px; line-height: 1; color: #7f92a9; letter-spacing: .02em; }
.cst.open { background: rgba(52,34,10,.8); border-color: rgba(255,196,107,.5);
  box-shadow: 0 2px 10px rgba(0,0,0,.45), 0 0 12px rgba(255,196,107,.25); }
.cst.open .tx { color: #ffcf90; }
.cst.open .tag { color: #c9a273; }
.cst.bad { background: rgba(56,16,16,.8); border-color: rgba(255,145,130,.45); }
.cst.bad .tx { color: #ffc8c2; }
.cst.hood { left: 50%; top: 4%; }
.cst.trunk { left: 50%; top: 82%; }
.cst.dfl { left: 3%; top: 30%; }
.cst.wfl { left: 3%; top: 44%; }
.cst.drl { left: 3%; top: 58%; }
.cst.wrl { left: 3%; top: 72%; }
.cst.dfr { left: 97%; top: 30%; }
.cst.wfr { left: 97%; top: 44%; }
.cst.drr { left: 97%; top: 58%; }
.cst.wrr { left: 97%; top: 72%; }
.ctire { position: absolute; transform: translate(-50%, -50%); width: 52px; height: 52px; border-radius: 50%;
  background: radial-gradient(120% 120% at 50% 0%, rgba(30,46,64,.82), rgba(8,14,21,.78));
  border: 1px solid rgba(160,205,230,.18);
  box-shadow: 0 4px 16px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.12);
  font-variant-numeric: tabular-nums; backdrop-filter: blur(8px); }
.ctire .glyph { position: absolute; inset: 4px; opacity: .24; }
.ctire .glyph .ic { width: 100%; height: 100%; display: block; }
.ctire .tv { position: absolute; left: 0; right: 0; top: 12px; text-align: center; font-size: 13px; font-weight: 700;
  line-height: 1; color: #dbe7f5; text-shadow: 0 1px 3px rgba(0,0,0,.6); }
.ctire .tu { position: absolute; left: 0; right: 0; top: 30px; text-align: center; font-size: 7px; line-height: 1;
  color: #8496ad; letter-spacing: .04em; }
.ctire.warn { color: var(--hc-warn); border-color: rgba(255,196,107,.5); box-shadow: 0 2px 10px rgba(0,0,0,.45), 0 0 12px rgba(255,196,107,.22); }
.ctire.warn .tv { color: var(--hc-warn); }
.ctire.tlf { left: 12%; top: 18%; }
.ctire.trf { left: 88%; top: 18%; }
.ctire.tlr { left: 12%; top: 84%; }
.ctire.trr { left: 88%; top: 84%; }

/* ---- 面板模式：1440×900 设计稿等比缩放，整页装下不滚动 ---- */

/* 窄面板（手机 / 小屏全屏视图）：缩纵向节奏，目标一屏放下全部信息 */
ha-card.panel:not(.fit) .wrap { padding: 10px 12px 8px; gap: 6px; }
ha-card.panel:not(.fit) .head { gap: 2px; }
ha-card.panel:not(.fit) .title { font-size: 21px; }
ha-card.panel:not(.fit) .sub { font-size: 10px; }
ha-card.panel:not(.fit) .hero { height: 100%; min-height: 178px; --r: 96px; }
ha-card.panel:not(.fit) .carimg { max-height: 82%; max-width: 66%; }
ha-card.panel:not(.fit) .gauge { max-width: 86px; }
/* 窄面板：车图变小，门窗/胎压图标挂到车图左右外侧，靠像素偏移避开车身 */
ha-card.panel:not(.fit) .cst { width: 30px; height: 30px; border-radius: 8px; }
ha-card.panel:not(.fit) .cst .glyph { inset: 3px 3px 8px; }
ha-card.panel:not(.fit) .cst .tx { top: 12px; font-size: 7.5px; }
ha-card.panel:not(.fit) .cst .tag { bottom: 2px; font-size: 6px; }
ha-card.panel:not(.fit) .ctire { width: 34px; height: 34px; }
ha-card.panel:not(.fit) .ctire .glyph { inset: 2px; }
ha-card.panel:not(.fit) .ctire .tv { top: 8px; font-size: 10px; }
ha-card.panel:not(.fit) .ctire .tu { top: 21px; font-size: 5.5px; }
ha-card.panel:not(.fit) .cst.dfl,
ha-card.panel:not(.fit) .cst.wfl,
ha-card.panel:not(.fit) .cst.drl,
ha-card.panel:not(.fit) .cst.wrl { left: calc(50% - 84px); }
ha-card.panel:not(.fit) .cst.dfr,
ha-card.panel:not(.fit) .cst.wfr,
ha-card.panel:not(.fit) .cst.drr,
ha-card.panel:not(.fit) .cst.wrr { left: calc(50% + 84px); }
ha-card.panel:not(.fit) .cst.dfl { top: 22%; }
ha-card.panel:not(.fit) .cst.wfl { top: 44%; }
ha-card.panel:not(.fit) .cst.drl { top: 66%; }
ha-card.panel:not(.fit) .cst.wrl { top: 88%; }
ha-card.panel:not(.fit) .cst.dfr { top: 22%; }
ha-card.panel:not(.fit) .cst.wfr { top: 44%; }
ha-card.panel:not(.fit) .cst.drr { top: 66%; }
ha-card.panel:not(.fit) .cst.wrr { top: 88%; }
ha-card.panel:not(.fit) .cst.hood { top: 9.5%; left: 50%; }
ha-card.panel:not(.fit) .cst.trunk { top: 90%; left: 50%; }
ha-card.panel:not(.fit) .ctire.tlf { left: calc(50% - 116px); top: 7%; }
ha-card.panel:not(.fit) .ctire.trf { left: calc(50% + 116px); top: 7%; }
ha-card.panel:not(.fit) .ctire.tlr { left: calc(50% - 116px); top: 93%; }
ha-card.panel:not(.fit) .ctire.trr { left: calc(50% + 116px); top: 93%; }
ha-card.panel:not(.fit) .hero { --r: 72px; }
ha-card.panel:not(.fit) .energy { column-gap: 6px; }
ha-card.panel:not(.fit) .orb { width: 44px; height: 44px; }
ha-card.panel:not(.fit) .tile .ic { width: 17px; height: 17px; }
ha-card.panel:not(.fit) .tile { gap: 6px; }
ha-card.panel:not(.fit) .tile .lbl { font-size: 10px; }
ha-card.panel:not(.fit) .pills { margin-top: 2px; gap: 6px; }
ha-card.panel:not(.fit) .pill { height: 26px; font-size: 10.5px; }
ha-card.panel:not(.fit) .substats { margin-top: 4px; gap: 6px; }
ha-card.panel:not(.fit) .substats .sstat { padding: 4px 4px 3px; }
ha-card.panel:not(.fit) .substats .sstat b { font-size: 12px; }
ha-card.panel:not(.fit) .alert { padding: 7px 9px; font-size: 11px; }
ha-card.panel:not(.fit) .svc, ha-card.panel:not(.fit) .loc { font-size: 11px; }
ha-card.panel:not(.fit) .svc summary { padding: 7px 9px; }
ha-card.panel:not(.fit) .baseline.solo { padding: 3px 8px; font-size: 10px; }

:host(.panel) { position: relative; overflow: hidden;
  background: radial-gradient(90% 60% at 50% 0%, rgba(55,214,232,.10), transparent 62%),
    linear-gradient(170deg, #101b29 0%, #0a1119 60%, #070c13 100%); }
ha-card.panel { box-sizing: border-box; width: 100%; height: 100%; margin: 0; }
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
  justify-content: center; gap: 16px; }
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
.blkrow.off { opacity: .55; }
.blkrow .nm { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.blkrow .btn.sq { min-width: 26px; padding: 4px 6px; font-size: 12px; line-height: 1; }
.blkrow .btn.sq.del { color: #ff8a8a; border-color: rgba(255,110,110,.28); }
.blkrow select.tf, .blkrow input.tf { padding: 5px 7px; font-size: 11.5px; }
.blkrow .sw { flex: none; }

`;
