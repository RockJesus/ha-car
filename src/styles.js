// 仪表台语汇：车机背光青 + 深蓝黑漆面 + 单一强调色。
// 色板是推导值，不是框架默认色：车身钢板 #141D2B / 深夜座舱 #0B1220 / 仪表背光 #37D6E8。
export const STYLES = `
:host { display: block; --hc-accent: #37d6e8; --hc-ink: #e9eff7; --hc-dim: #8496ad;
  --hc-ok: #6fe0a8; --hc-warn: #ffc46b; --hc-bad: #ff9182; --hc-holdms: 700ms; }
ha-card { display: block; overflow: hidden; border: none;
  border-radius: var(--ha-card-border-radius, 22px);
  color: var(--hc-ink);
  background:
    radial-gradient(120% 72% at 50% -8%, rgba(55,214,232,.10), transparent 62%),
    linear-gradient(168deg, #141d2b 0%, #0b1220 58%, #080d16 100%);
  box-shadow: 0 1px 2px rgba(3,7,14,.5), 0 18px 44px -20px rgba(3,7,14,.9),
    inset 0 1px 0 rgba(255,255,255,.06);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Microsoft YaHei", "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.num, .big, .tire .v, .plate { font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace;
  font-variant-numeric: tabular-nums; }
.wrap { padding: 16px 16px 12px; display: flex; flex-direction: column; gap: 14px; }
.head { display: flex; align-items: flex-start; gap: 10px; }
.ttl { flex: 1; min-width: 0; }
.kicker { margin: 0 0 5px; font-size: 10px; font-weight: 700; letter-spacing: .14em;
  text-transform: uppercase; color: var(--hc-dim); }
h1 { margin: 0; font-size: 21px; line-height: 1.15; font-weight: 650; letter-spacing: .01em;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.plate { margin-top: 6px; font-size: 11px; font-weight: 600; letter-spacing: .1em; color: var(--hc-dim); }
.iconbtn { flex: none; width: 34px; height: 34px; display: grid; place-items: center; cursor: pointer;
  border-radius: 999px; border: 1px solid rgba(255,255,255,.09); background: rgba(255,255,255,.045);
  color: var(--hc-ink); transition: background .18s, border-color .18s, transform .18s; }
.iconbtn:hover { background: rgba(255,255,255,.09); border-color: rgba(255,255,255,.16); }
.iconbtn:active { transform: scale(.94); }
.iconbtn.spin .ic { animation: hc-spin .9s linear infinite; }
.ic { width: 20px; height: 20px; fill: currentColor; display: block; }

.stage { position: relative; height: 156px; display: flex; align-items: center; justify-content: center;
  margin: -2px 0 0; }
.stage .glow { position: absolute; inset: -10% -6% 0; pointer-events: none;
  background: radial-gradient(46% 58% at 50% 50%, rgba(55,214,232,.17), transparent 70%); }
.stage .ground { position: absolute; left: 50%; bottom: 8px; width: 46%; height: 12px; transform: translateX(-50%);
  border-radius: 50%; background: radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,.6), transparent 72%); filter: blur(3px); }
.carimg { position: relative; max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 16px;
  background: transparent; }
.carph { position: relative; width: 88px; height: 88px; display: grid; place-items: center; border-radius: 999px;
  border: 1px solid rgba(255,255,255,.1); color: var(--hc-dim); background: rgba(255,255,255,.03); }
.carph .ic { width: 40px; height: 40px; opacity: .55; }

.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { display: inline-flex; align-items: center; gap: 5px; height: 24px; padding: 0 9px; border-radius: 999px;
  font-size: 11px; font-weight: 600; letter-spacing: .02em; color: var(--hc-dim);
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); }
.chip .dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex: none; }
.chip.ok { color: var(--hc-ok); background: rgba(111,224,168,.1); border-color: rgba(111,224,168,.26); }
.chip.warn { color: var(--hc-warn); background: rgba(255,196,107,.1); border-color: rgba(255,196,107,.26); }
.chip.bad { color: var(--hc-bad); background: rgba(255,145,130,.1); border-color: rgba(255,145,130,.26); }
.chip.info { color: var(--hc-accent); background: rgba(55,214,232,.09); border-color: rgba(55,214,232,.24); }

.acts { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.tile { position: relative; height: 72px; display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 7px; padding: 0; border-radius: 16px; cursor: pointer; overflow: hidden;
  border: 1px solid rgba(255,255,255,.07);
  background: linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.018));
  color: var(--hc-ink); font-size: 11px; font-weight: 600; letter-spacing: .01em; text-align: center;
  -webkit-tap-highlight-color: transparent; -webkit-touch-callout: none; user-select: none;
  touch-action: manipulation; transition: transform .16s, background .18s, border-color .18s; }
.tile:hover { border-color: rgba(255,255,255,.14); }
.tile:active, .tile.pressing { transform: scale(.972); }
.tile .ic { width: 22px; height: 22px; opacity: .92; }
.tile .lbl { max-width: 100%; padding: 0 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tile.on { border-color: rgba(111,224,168,.3); background: linear-gradient(180deg, rgba(111,224,168,.12), rgba(111,224,168,.03)); }
.tile.hot { border-color: rgba(55,214,232,.34); background: linear-gradient(180deg, rgba(55,214,232,.14), rgba(55,214,232,.04)); color: #d9fbff; }
.tile.off { opacity: .45; }
.tile .holdbar { position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--hc-accent);
  transform: scaleX(0); transform-origin: left; opacity: 0; transition: opacity .12s; }
.tile.pressing .holdbar { opacity: 1; transform: scaleX(1);
  transition: opacity .12s, transform var(--hc-holdms) linear; }
.tile.armed { border-color: rgba(55,214,232,.55); background: rgba(55,214,232,.16); }
.tile.pending::after { content: ""; position: absolute; top: 8px; right: 8px; width: 5px; height: 5px;
  border-radius: 50%; background: var(--hc-accent); animation: hc-pulse 1.4s ease-in-out infinite; }
.pills { display: flex; gap: 6px; }
.pill { flex: 1; height: 31px; display: inline-flex; align-items: center; justify-content: center; gap: 5px;
  border-radius: 10px; cursor: pointer; border: 1px solid rgba(255,255,255,.07);
  background: rgba(255,255,255,.028); color: var(--hc-dim); font-size: 11px; font-weight: 600;
  -webkit-tap-highlight-color: transparent; user-select: none; transition: color .18s, background .18s; }
.pill .ic { width: 14px; height: 14px; }
.pill:hover { color: var(--hc-ink); background: rgba(255,255,255,.06); }
.pill.on { color: var(--hc-ok); border-color: rgba(111,224,168,.26); }

.energy { display: flex; align-items: center; gap: 16px; }
.ring { position: relative; flex: none; width: 66px; height: 66px; border-radius: 50%;
  background: conic-gradient(var(--hc-accent) calc(var(--v, 0) * 1%), rgba(255,255,255,.075) 0); }
.ring::after { content: ""; position: absolute; inset: 5px; border-radius: 50%; background: #0c1421;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05); }
.ring .rv { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center;
  justify-content: center; z-index: 1; }
.ring .rv b { font: 600 17px/1 ui-monospace, "SF Mono", Menlo, monospace; font-variant-numeric: tabular-nums; }
.ring .rv i { font-size: 9px; font-style: normal; letter-spacing: .1em; text-transform: uppercase;
  color: var(--hc-dim); margin-top: 3px; }
.energy .main { flex: 1; min-width: 0; }
.big { display: flex; align-items: baseline; gap: 4px; font-size: 38px; font-weight: 600; line-height: 1; }
.big small { font-size: 12px; font-weight: 600; color: var(--hc-dim); letter-spacing: .06em; }
.subrow { display: flex; gap: 14px; margin-top: 8px; flex-wrap: wrap; }
.stat { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.stat .k { font-size: 9px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--hc-dim); }
.stat .v { font-size: 12px; font-weight: 600; }
.stat .v b { font: 600 12px/1 ui-monospace, "SF Mono", Menlo, monospace; }

/* 四轮胎压：单行四格，读作仪表横条，不占两行高度 */
.tires { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; }
.tire { display: flex; flex-direction: column; align-items: flex-start; gap: 3px; padding: 8px 9px;
  border-radius: 12px; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.032); }
.tire .p { font-size: 9px; font-weight: 700; letter-spacing: .1em; color: var(--hc-dim); }
.tire .v { font-size: 13px; font-weight: 600; line-height: 1.1; white-space: nowrap; }
.tire .v small { font-size: 9px; color: var(--hc-dim); margin-left: 2px; font-weight: 500; }
.tire.warn { border-color: rgba(255,196,107,.34); background: rgba(255,196,107,.08); }
.tire.warn .v { color: var(--hc-warn); }

.doors { display: flex; flex-wrap: wrap; gap: 6px; }
.door { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border-radius: 10px;
  border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.03);
  font-size: 11px; font-weight: 600; color: var(--hc-dim); }
.door .ic { width: 15px; height: 15px; opacity: .8; }
.door.open { color: var(--hc-warn); border-color: rgba(255,196,107,.3); background: rgba(255,196,107,.08); }
.door .addr { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-weight: 500; letter-spacing: 0; }

.panel { border-radius: 14px; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.022);
  padding: 10px 12px; }
.panel .ph { display: flex; align-items: center; gap: 7px; font-size: 10px; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase; color: var(--hc-dim); margin-bottom: 8px; }
.panel .ph .ic { width: 13px; height: 13px; }
.chgrow { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.chgrow .st { font-size: 13px; font-weight: 650; }
.chgrow .meta { font-size: 10px; color: var(--hc-dim); letter-spacing: .06em; margin-top: 3px; }
.mini { display: inline-flex; align-items: center; gap: 5px; height: 28px; padding: 0 10px; border-radius: 999px;
  font-size: 11px; font-weight: 650; cursor: pointer; border: 1px solid rgba(55,214,232,.3);
  background: rgba(55,214,232,.1); color: var(--hc-accent); }
.mini.dim { border-color: rgba(255,255,255,.1); background: rgba(255,255,255,.04); color: var(--hc-dim); }
.mini:active { transform: scale(.97); }

.alert { display: flex; gap: 9px; padding: 10px 12px; border-radius: 14px; font-size: 12px; line-height: 1.45;
  color: #ffd3c9; background: rgba(255,145,130,.1); border: 1px solid rgba(255,145,130,.28); }
.alert .ic { width: 16px; height: 16px; flex: none; color: var(--hc-bad); margin-top: 1px; }
.alert b { display: block; font-size: 10px; letter-spacing: .12em; text-transform: uppercase;
  color: var(--hc-bad); margin-bottom: 3px; font-weight: 700; }

.svc { border-radius: 14px; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.022);
  overflow: hidden; }
.svc summary { list-style: none; display: flex; align-items: center; gap: 8px;
  padding: 10px 12px; cursor: pointer; font-size: 10px; font-weight: 700; letter-spacing: .12em;
  text-transform: uppercase; color: var(--hc-dim); }
.svc summary::-webkit-details-marker { display: none; }
.svc summary .sum { display: inline-flex; align-items: center; gap: 7px; flex: 1; }
.svc summary .ic { width: 13px; height: 13px; transition: transform .2s; }
.svc[open] summary .sum .ic:first-child { opacity: .7; }
.svc[open] summary > .ic { transform: rotate(180deg); }
.svc .row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
  padding: 8px 12px; font-size: 12px; border-top: 1px solid rgba(255,255,255,.05); }
.svc .row .k { color: var(--hc-dim); flex: none; font-size: 11px; }
.svc .row .val { text-align: right; color: var(--hc-ink); word-break: break-word; max-width: 66%; }

.foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 10px;
  letter-spacing: .06em; color: var(--hc-dim); }
.foot .left { display: inline-flex; align-items: center; gap: 12px; }
.foot .syncwrap { display: inline-flex; align-items: center; gap: 6px; }
.foot .sdot { width: 5px; height: 5px; border-radius: 50%; background: var(--hc-ok); }
.foot .sdot.bad { background: var(--hc-bad); }

.toast { display: flex; align-items: flex-start; gap: 8px; padding: 9px 11px; border-radius: 12px;
  font-size: 11.5px; line-height: 1.4; background: rgba(55,214,232,.1);
  border: 1px solid rgba(55,214,232,.26); color: #d5f8ff; }
.toast.err { background: rgba(255,145,130,.1); border-color: rgba(255,145,130,.3); color: #ffd3c9; }
.toast .ic { width: 14px; height: 14px; flex: none; margin-top: 1px; }

.empty { padding: 26px 16px 30px; text-align: center; color: var(--hc-dim); font-size: 12px; line-height: 1.6; }
.empty .ic { width: 34px; height: 34px; margin: 0 auto 10px; opacity: .45; }

.compact .wrap { padding: 13px 14px 11px; gap: 10px; }
.compact .stage { height: 104px; }
.compact h1 { font-size: 18px; }
.compact .tile { height: 62px; border-radius: 14px; }
.compact .big { font-size: 30px; }
.compact .ring { width: 54px; height: 54px; }
.compact .ring .rv b { font-size: 15px; }

@keyframes hc-spin { to { transform: rotate(360deg); } }
@keyframes hc-pulse { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  .tile, .pill, .iconbtn { transition: none; }
  .tile.pressing .holdbar { transition: none; }
  .iconbtn.spin .ic, .tile.pending::after { animation: none; }
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
