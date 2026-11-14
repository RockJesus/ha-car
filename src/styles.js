// 仪表台语汇：车机背光青 + 深蓝黑漆面 + 单一强调色。
// 色板是推导值，不是框架默认色：车身钢板 #101B29 / 深夜座舱 #0A1119 / 仪表背光 #37D6E8。
export const STYLES = `
:host { display: block; --hc-accent: #37d6e8; --hc-ink: #e9eff7; --hc-dim: #8496ad;
  --hc-ok: #6fe0a8; --hc-warn: #ffc46b; --hc-bad: #ff9182; --hc-holdms: 700ms; }
ha-card { display: block; overflow: hidden;
  border: 1px solid rgba(55,214,232,.14);
  border-radius: var(--ha-card-border-radius, 24px);
  color: var(--hc-ink);
  background:
    radial-gradient(92% 56% at 50% 0%, rgba(55,214,232,.11), transparent 64%),
    radial-gradient(72% 42% at 50% 102%, rgba(55,214,232,.06), transparent 72%),
    linear-gradient(170deg, #101b29 0%, #0a1119 56%, #070c13 100%);
  box-shadow: 0 26px 52px -28px rgba(2,6,12,.95), 0 0 44px -22px rgba(55,214,232,.4),
    inset 0 1px 0 rgba(255,255,255,.07);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Microsoft YaHei", "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.plate, .gn b, .tc b, .stat b { font-variant-numeric: tabular-nums; }
.plate { font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace; }
.wrap { padding: 18px 16px 14px; display: flex; flex-direction: column; gap: 14px; }
.ic { width: 20px; height: 20px; fill: currentColor; display: block; flex: none; }

/* 头部：大标题 + 右上状态胶囊（参考图同构） */
.head { display: flex; align-items: flex-start; gap: 12px; }
.ttl { flex: 1; min-width: 0; }
h1 { margin: 0; font-size: 25px; line-height: 1.12; font-weight: 650; letter-spacing: .01em;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.plate { margin-top: 7px; font-size: 11px; font-weight: 600; letter-spacing: .12em; color: var(--hc-dim); }
.status { flex: none; display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 12px;
  border-radius: 999px; font-size: 11.5px; font-weight: 650; letter-spacing: .02em;
  color: var(--hc-dim); background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.12); white-space: nowrap; }
.status .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex: none;
  box-shadow: 0 0 8px currentColor; }
.status.ok { color: #7ef0b4; background: rgba(111,224,168,.11); border-color: rgba(111,224,168,.34); }
.status.bad { color: #ff9d8e; background: rgba(255,145,130,.11); border-color: rgba(255,145,130,.34); }

/* 主视觉：车图 + 双同心轨道 + 四枚发光节点（参考图同构） */
.hero { position: relative; height: 224px; display: flex; align-items: center; justify-content: center;
  overflow: hidden; --r: 92px; }
.halo { position: absolute; inset: -14% -8% -6%; pointer-events: none;
  background: radial-gradient(44% 50% at 50% 50%, rgba(55,214,232,.18), transparent 70%); }
.orbit, .orbit.o2 { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  border-radius: 50%; pointer-events: none; width: calc(var(--r) * 2); height: calc(var(--r) * 2); }
.orbit { border: 1px solid rgba(55,214,232,.18);
  box-shadow: inset 0 0 26px -12px rgba(55,214,232,.4); }
.orbit.o2 { width: calc(var(--r) * 2.42); height: calc(var(--r) * 2.42);
  border: 1px solid rgba(55,214,232,.07); }
.node { position: absolute; left: 50%; top: 50%; width: 6px; height: 6px; margin: -3px 0 0 -3px;
  border-radius: 50%; background: var(--hc-accent);
  box-shadow: 0 0 10px 2px rgba(55,214,232,.55); animation: hc-node 3.2s ease-in-out infinite; }
.node.n1 { transform: translateY(calc(var(--r) * -1)); }
.node.n2 { transform: translateX(var(--r)); animation-delay: .8s; }
.node.n3 { transform: translateY(var(--r)); animation-delay: 1.6s; }
.node.n4 { transform: translateX(calc(var(--r) * -1)); animation-delay: 2.4s; }
.carimg { position: relative; max-width: 64%; max-height: 78%; object-fit: contain;
  filter: drop-shadow(0 26px 26px rgba(2,6,12,.75)); }
.carph { position: relative; width: 96px; height: 96px; display: grid; place-items: center; border-radius: 999px;
  border: 1px solid rgba(255,255,255,.1); color: var(--hc-dim); background: rgba(255,255,255,.03); }
.carph .ic { width: 44px; height: 44px; opacity: .55; }
.ground { position: absolute; left: 50%; bottom: 14px; width: 44%; height: 12px; transform: translateX(-50%);
  border-radius: 50%; background: radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,.62), transparent 72%);
  filter: blur(4px); }

.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { display: inline-flex; align-items: center; gap: 5px; height: 24px; padding: 0 9px; border-radius: 999px;
  font-size: 11px; font-weight: 600; letter-spacing: .02em; color: var(--hc-dim);
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); }
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
.orb { position: relative; width: 56px; height: 56px; display: grid; place-items: center; border-radius: 50%;
  border: 1px solid rgba(255,255,255,.13);
  background: radial-gradient(120% 120% at 50% 6%, rgba(255,255,255,.11), rgba(255,255,255,.02) 62%), #0d1622;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.09), 0 10px 20px -14px rgba(0,0,0,.95);
  transition: transform .16s, border-color .18s, box-shadow .18s; }
.tile .ic { width: 21px; height: 21px; }
.tile .lbl { max-width: 100%; font-size: 11.5px; font-weight: 600; letter-spacing: .02em; color: var(--hc-dim);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tile:hover .orb { border-color: rgba(255,255,255,.24); }
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
.energy { display: grid; grid-template-columns: 1fr 26px 1fr; align-items: center; gap: 4px; padding: 2px 2px 0; }
.gauge { position: relative; width: 100%; max-width: 118px; aspect-ratio: 1; margin: 0 auto; }
.gauge > svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.gt { fill: none; stroke: rgba(255,255,255,.085); stroke-width: 5; }
.gp { fill: none; stroke: var(--hc-accent); stroke-width: 5; stroke-linecap: round;
  filter: drop-shadow(0 0 6px rgba(55,214,232,.5)); }
.gv { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; }
.gl { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 650; letter-spacing: .06em;
  color: var(--hc-dim); }
.gl .ic { width: 11px; height: 11px; opacity: .8; }
.gn { display: flex; align-items: baseline; gap: 2px; line-height: 1; }
.gn b { font-size: 31px; font-weight: 620; letter-spacing: -.01em; }
.gn i { font-size: 11px; font-style: normal; font-weight: 600; color: var(--hc-dim); letter-spacing: .04em; }
.egmid { display: grid; place-items: center; color: var(--hc-dim); opacity: .6; }
.egmid .ic { width: 15px; height: 15px; }
.substats { display: flex; justify-content: center; flex-wrap: wrap; gap: 16px; margin-top: 2px;
  font-size: 10.5px; color: var(--hc-dim); }
.substats .sstat { display: inline-flex; align-items: baseline; gap: 4px; letter-spacing: .04em; }
.substats .sstat i { font-style: normal; font-size: 9.5px; letter-spacing: .1em; text-transform: uppercase; opacity: .85; }
.substats .sstat b { font-size: 11.5px; font-weight: 650; color: var(--hc-ink); }

/* 底座条：四轮胎压 + 同步时间（参考图同构） */
.baseline { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 16px;
  border: 1px solid rgba(255,255,255,.07);
  background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.016));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05); min-width: 0; }
.baseline.solo { justify-content: center; padding: 8px 12px; }
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

.alert { display: flex; gap: 9px; padding: 10px 12px; border-radius: 14px; font-size: 12px; line-height: 1.45;
  color: #ffd3c9; background: rgba(255,145,130,.1); border: 1px solid rgba(255,145,130,.28); }
.alert .ic { width: 16px; height: 16px; flex: none; color: var(--hc-bad); margin-top: 1px; }
.alert b { display: block; font-size: 10px; letter-spacing: .12em; text-transform: uppercase;
  color: var(--hc-bad); margin-bottom: 3px; font-weight: 700; }

.svc { border-radius: 16px; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.022);
  overflow: hidden; }
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
@media (min-width: 860px) {
  :host { max-width: 820px; margin: 0 auto; }
  .wrap { padding: 22px 20px 18px; }
  .hero { height: 252px; }
  .head { align-items: center; }
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
`;
