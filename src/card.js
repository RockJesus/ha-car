import { icon, ICON_NAMES } from "./icons.js";
import { artForSlot, BUTTON_ART } from "./button-art.js";
import { resolve, detectVehicles, SLOTS } from "./resolve.js";
import { STYLES } from "./styles.js";
import { dict, isEn } from "./strings.js";
import { attrs, chargingNow, clamp, esc, fmtNum, isBad, maskAddr, maskPlate, maskText, normLock, normOpen, normTire, num, relTime, text } from "./util.js";

const BG_RE = /^(?:https?:\/\/|\/\/|\/|data:image\/)/i;
const BG_STYLES = ["radar", "grid", "glass", "cyber", "minimal"];
const CHIP_STYLES = ["glass", "pill", "bar", "liquid", "line", "cyber"];

const MEDIA_RE = /^media-source:\/\//i;
export function isMediaSource(v) {
  return MEDIA_RE.test(String(v || "").trim());
}
function bgUrl(v) {
  const s = String(v || "").trim();
  if (!BG_RE.test(s)) return "";
  return s.replace(/["\\\r\n]/g, "");
}

const FORD_LOGO = `<span class="brand" aria-hidden="true"><svg viewBox="0 0 44 20" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="22" cy="10" rx="21" ry="9" fill="#0b3f92" stroke="#eef4ff" stroke-width="1.6"/>
<ellipse cx="22" cy="10" rx="17.6" ry="6.6" fill="none" stroke="#eef4ff" stroke-width=".9" opacity=".85"/>
<text x="22" y="13.4" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-style="italic"
 font-weight="700" font-size="9.4" fill="#f4f8ff" letter-spacing=".4">Ford</text></svg></span>`;

const MODULES = ["status", "actions", "energy", "tires", "doors", "charging", "alerts", "service"];
// 可自由排序/增删的模块类型（blocks）
const BLOCK_TYPES = ["meta", "hero", "energy", "alerts", "doors", "charging", "service", "actions", "custom"];

// 模块内实体项：slot 表示内置语义槽位（自动绑定），entity 表示手动指定。
// 每个模块的 items 可在编辑器里增删与排序，卡片按 items 顺序渲染。
export const ITEM_DEFS = {
  addr: { zh: "定位地址", en: "Location", icon: "pin", kind: "location" },
  place: { zh: "在家/外出", en: "Home / away", icon: "home", kind: "place" },
  sync: { zh: "云端同步", en: "Cloud sync", icon: "refresh", kind: "sync" },
  image: { zh: "车辆图片", en: "Vehicle image", icon: "car", kind: "image" },
  fuel: { zh: "燃油", en: "Fuel", icon: "fuel", kind: "pct", full: 620 },
  battery: { zh: "电量", en: "Battery", icon: "bolt", kind: "pct", full: 100 },
  range: { zh: "续航", en: "Range", icon: "gauge", kind: "range", full: 620 },
  ev_range: { zh: "纯电续航", en: "EV range", icon: "gauge", kind: "range", full: 500 },
  odo: { zh: "总里程", en: "Odometer", icon: "gauge", kind: "odo" },
  volt: { zh: "蓄电池", en: "12V battery", icon: "bolt", kind: "stat" },
  oil: { zh: "机油寿命", en: "Oil life", icon: "wrench", kind: "stat" },
  alerts: { zh: "车辆告警", en: "Alerts", icon: "warning", kind: "alert" },
  door_fl: { zh: "主驾门", en: "Driver door", icon: "cardoor", kind: "door" },
  door_fr: { zh: "副驾门", en: "Front door", icon: "cardoor", kind: "door" },
  door_rl: { zh: "左后门", en: "Rear L door", icon: "cardoor", kind: "door" },
  door_rr: { zh: "右后门", en: "Rear R door", icon: "cardoor", kind: "door" },
  win_fl: { zh: "主驾车窗", en: "Driver window", icon: "carwin", kind: "door" },
  win_fr: { zh: "副驾车窗", en: "Front window", icon: "carwin", kind: "door" },
  win_rl: { zh: "左后车窗", en: "Rear L window", icon: "carwin", kind: "door" },
  win_rr: { zh: "右后车窗", en: "Rear R window", icon: "carwin", kind: "door" },
  ignition: { zh: "引擎", en: "Engine", icon: "engine", kind: "stat" },
  hood: { zh: "引擎盖", en: "Hood", icon: "engine", kind: "cap" },
  tailgate: { zh: "尾门", en: "Tailgate", icon: "trunk", kind: "cap" },
  tp_lf: { zh: "左前胎压", en: "LF tire", icon: "tire", kind: "tire" },
  tp_rf: { zh: "右前胎压", en: "RF tire", icon: "tire", kind: "tire" },
  tp_lr: { zh: "左后胎压", en: "LR tire", icon: "tire", kind: "tire" },
  tp_rr: { zh: "右后胎压", en: "RR tire", icon: "tire", kind: "tire" },
  chg_status: { zh: "充电状态", en: "Charge status", icon: "bolt", kind: "text" },
  last_soc: { zh: "上次电量", en: "Last SOC", icon: "bolt", kind: "stat" },
  chg_start: { zh: "开始充电", en: "Start charge", icon: "bolt", kind: "action" },
  chg_stop: { zh: "停止充电", en: "Stop charge", icon: "bolt", kind: "action" },
  wallbox: { zh: "家充桩", en: "Wallbox", icon: "bolt", kind: "action" },
  maint: { zh: "保养计划", en: "Maintenance", icon: "wrench", kind: "service" },
  recall: { zh: "召回信息", en: "Recall", icon: "bell", kind: "service" },
  messages: { zh: "未读消息", en: "Messages", icon: "bell", kind: "service" },
  fw: { zh: "固件升级", en: "Firmware", icon: "refresh", kind: "service" },
  support: { zh: "客服电话", en: "Support", icon: "bell", kind: "service" },
  btn_unlock: { zh: "开锁", en: "Unlock", icon: "unlock", kind: "action" },
  btn_lock: { zh: "上锁", en: "Lock", icon: "lock", kind: "action" },
  sw_engine: { zh: "远程启动/熄火", en: "Engine", icon: "power", kind: "action" },
  sw_honk: { zh: "鸣笛寻车", en: "Honk", icon: "megaphone", kind: "action" },
  sw_va: { zh: "声光寻车", en: "Sound & light", icon: "speaker", kind: "action" },
  sw_light: { zh: "灯光寻车", en: "Light find", icon: "bulb", kind: "action" },
  honk_duration: { zh: "寻车时长", en: "Honk duration", icon: "bell", kind: "select" },
  chirp_type: { zh: "寻车类型", en: "Honk type", icon: "speaker", kind: "select" },
};

export const DEFAULT_ITEMS = {
  meta: [{ slot: "addr" }, { slot: "place" }, { slot: "sync" }],
  hero: [{ slot: "image" }],
  energy: ["fuel", "battery", "range", "odo", "volt", "oil"],
  alerts: ["alerts"],
  doors: [
    "ignition", "door_fl", "door_fr", "door_rl", "door_rr",
    "win_fl", "win_fr", "win_rl", "win_rr",
    "hood", "tailgate", "tp_lf", "tp_rf", "tp_lr", "tp_rr",
  ],
  charging: ["chg_status", "battery", "last_soc", "chg_start", "chg_stop", "wallbox"],
  service: ["maint", "recall", "messages", "fw", "support"],
  actions: ["btn_unlock", "btn_lock", "sw_engine", "sw_honk", "honk_duration", "chirp_type"],
  custom: [],
};

// 静态默认项（编辑器用）：energy 同时列出燃油/电量，实际渲染时缺失的会自动跳过
export function defaultItems(type) {
  return (DEFAULT_ITEMS[type] || []).map((x) => (typeof x === "string" ? { slot: x } : Object.assign({}, x)));
}
const CONFIRMABLE = [
  "btn_unlock",
  "btn_lock",
  "sw_engine",
  "sw_honk",
  "sw_va",
  "sw_light",
];
const PREVIEW_CAR =
  "data:image/webp;base64,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";

const PREVIEW_TAGS = new Set([
  "hui-card-picker",
  "ha-card-picker",
  "hui-dialog-add-card",
  "hui-dialog-edit-card",
  "hui-card-editor",
  "hui-edit-card-dialog",
  "ha-editor",
]);

const PANEL_TAGS = new Set(["hui-panel-view", "hui-grid-view"]);
// sections 仪表盘里的卡片格子：高度由栅格行决定，卡片必须缩进格子内
const GRID_TAGS = new Set(["hui-grid-section", "hui-sections-view", "hui-masonry-view"]);

// 仪表盘「编辑」态的卡片包装层：HA 会在这里给卡片设 preview=true，
// 但它不是选择器缩略卡，不能按 186px 缩略版式画
const EDIT_WRAP_TAGS = new Set([
  "hui-card-options",
  "hui-card-edit-mode",
  "hui-edit-view",
  "hui-edit-dashboard-view",
  "hui-dialog-edit-card",
]);


// 主题：只换强调色、漆面渐变与光晕色，版式完全一致，用户可在编辑器里直接选
export const THEMES = {
  midnight: { name: "深海（默认）", accent: "#37d6e8", glow: "55,214,232", top: "#111d2c", mid: "#0b1521", low: "#060b12" },
  aurora: { name: "极光", accent: "#5cf2c0", glow: "92,242,192", top: "#0d2420", mid: "#081713", low: "#040b08" },
  cyber: { name: "赛博紫", accent: "#b98bff", glow: "185,139,255", top: "#1b1230", mid: "#110a1e", low: "#07040e" },
  ember: { name: "熔岩橙", accent: "#ffab5e", glow: "255,171,94", top: "#2a170b", mid: "#180d05", low: "#0a0502" },
  graphite: { name: "石墨灰", accent: "#9fb3c8", glow: "159,179,200", top: "#1d2126", mid: "#12161a", low: "#080a0c" },
  rose: { name: "玫瑰", accent: "#ff8fb6", glow: "255,143,182", top: "#2a1020", mid: "#190812", low: "#0b0408" },
  glass: { name: "液态玻璃（iOS）", accent: "#b8c2ce", glow: "188,198,210", top: "#26304e", mid: "#151b2e", low: "#080b14", glass: true },
};

function themeBg(t) {
  const th = THEMES[t] || THEMES.midnight;
  return `radial-gradient(120% 80% at 50% -10%, rgba(${th.glow},.14), transparent 58%),` +
    `radial-gradient(70% 50% at 15% 105%, rgba(${th.glow},.10), transparent 70%),` +
    `linear-gradient(168deg, ${th.top} 0%, ${th.mid} 52%, ${th.low} 100%)`;
}

function accentHsl(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || "").trim());
  if (!m) return { h: 210, s: 0.6 };
  const n = parseInt(m[1], 16);
  const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  const l = (mx + mn) / 2;
  let h = 210;
  if (d) {
    if (mx === r) h = ((g - b) / d) % 6;
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  return { h, s: Math.min(1, s) };
}

function hexRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || "").trim());
  if (!m) return "55,214,232";
  const n = parseInt(m[1], 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

const DEFAULTS = {
  title: "",
  layout: "full",
  // 默认不渲染「服务信息」，可在编辑器里手动勾选
  modules: MODULES.filter((m) => m !== "service"),
  // 模块顺序：null 时按 modules 兼容推导（老配置无需迁移）
  blocks: null,
  confirm: CONFIRMABLE.slice(),
  hold_ms: 2000,
  accent: "#37d6e8",
  theme: "cyber",
  bg_style: "glass",
  chip_style: "liquid",
  show_plate: true,
  privacy: false,
  image: "auto",
  image_url: "",
  bg_image: "",
  entities: {},
  find: { phone: "", car: "", device: "" },
};

// blocks 归一化：老配置没有 blocks 时按 modules 推导等价顺序
export function normBlocks(cfg) {
  const raw = Array.isArray(cfg.blocks) ? cfg.blocks : null;
  if (raw) {
    const list = raw
      .filter((b) => b && typeof b === "object" && BLOCK_TYPES.includes(b.type))
      .map((b) => ({
        type: b.type,
        on: b.on !== false,
        entity: typeof b.entity === "string" ? b.entity : "",
        label: typeof b.label === "string" ? b.label : "",
        unit: typeof b.unit === "string" ? b.unit : "",
        icon: typeof b.icon === "string" ? b.icon : "",
        ...(Array.isArray(b.items)
          ? {
              items: b.items
                .filter((it) => it && typeof it === "object")
                .map((it) => ({
                  slot: typeof it.slot === "string" ? it.slot : "",
                  entity: typeof it.entity === "string" ? it.entity : "",
                  label: typeof it.label === "string" ? it.label : "",
                  unit: typeof it.unit === "string" ? it.unit : "",
                  icon: typeof it.icon === "string" ? it.icon : "",
                })),
            }
          : {}),
      }));
    return list;
  }
  const mods = Array.isArray(cfg.modules) ? cfg.modules : MODULES;
  const list = [{ type: "meta", on: true }, { type: "hero", on: true }];
  if (mods.includes("energy")) list.push({ type: "energy", on: true });
  if (mods.includes("doors")) list.push({ type: "doors", on: true });
  if (mods.includes("charging")) list.push({ type: "charging", on: true });
  if (mods.includes("alerts")) list.push({ type: "alerts", on: true });
  if (mods.includes("service")) list.push({ type: "service", on: true });
  if (mods.includes("actions")) list.push({ type: "actions", on: true });
  return list;
}

// 卡片里所有可长按的按钮键：内置动作 + 动作模块里的自定义按钮
export function actionKeys(cfg) {
  const keys = CONFIRMABLE.slice();
  for (const b of normBlocks(cfg || {})) {
    if (b.type !== "actions") continue;
    const items = Array.isArray(b.items) ? b.items : defaultItems("actions");
    for (const it of items) {
      const key = String(it.slot || it.entity || "").trim();
      if (!key) continue;
      // 下拉选择胶囊（寻车时长/类型等）不是按钮，不参与长按
      const def = it.slot ? ITEM_DEFS[it.slot] : null;
      const kind = def ? def.kind : key.split(".")[0];
      if (kind === "select") continue;
      keys.push(key);
    }
  }
  return Array.from(new Set(keys));
}

// 防误触只有「开」和「关」：非空 confirm 统一覆盖全部动作按钮，[] 表示关闭
export function normalizeConfirm(config, cfg) {
  const has = config && Object.prototype.hasOwnProperty.call(config, "confirm");
  const raw = has ? config.confirm : null;
  if (!Array.isArray(raw)) return actionKeys(cfg);
  const list = raw.filter((k) => typeof k === "string" && k.trim());
  return list.length ? actionKeys(cfg) : [];
}

const SLOT_KEYS = Object.keys(SLOTS);

class HaCarCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._built = false;
    this._sig = "";
    this._pending = new Map();
    this._toast = null;
    this._hold = null;
    this._holdTimer = 0;
    this._pendingRender = false;
    this._justArmed = false;
    this._preview = false;
  }

  static getStubConfig(hass) {
    const cars = hass ? detectVehicles(hass) : [];
    return cars.length ? { hash: cars[0].hash } : {};
  }

  static async getConfigElement() {
    return document.createElement("ha-car-editor");
  }

  setConfig(config) {
    if (config != null && typeof config !== "object") {
      throw new Error("ha-car：配置必须是一个对象");
    }
    const cfg = Object.assign({}, DEFAULTS, config || {});
    cfg.modules = Array.isArray(cfg.modules)
      ? cfg.modules.filter((m) => MODULES.includes(m))
      : DEFAULTS.modules.slice();
    cfg.entities = cfg.entities && typeof cfg.entities === "object" ? cfg.entities : {};
    cfg.find = Object.assign({ phone: "", car: "", device: "" }, cfg.find && typeof cfg.find === "object" ? cfg.find : {});
    cfg.find.phone = typeof cfg.find.phone === "string" ? cfg.find.phone : "";
    cfg.find.car = typeof cfg.find.car === "string" ? cfg.find.car : "";
    cfg.find.device = typeof cfg.find.device === "string" ? cfg.find.device : "";
    cfg.bg_image = typeof cfg.bg_image === "string" ? cfg.bg_image.trim() : "";
    cfg.bg_style = BG_STYLES.indexOf(cfg.bg_style) >= 0 ? cfg.bg_style : DEFAULTS.bg_style;
    cfg.chip_style = CHIP_STYLES.indexOf(cfg.chip_style) >= 0 ? cfg.chip_style : DEFAULTS.chip_style;
    if (cfg.bg_image && !bgUrl(cfg.bg_image) && !isMediaSource(cfg.bg_image)) cfg.bg_image = "";
    cfg.hold_ms = clamp(Number(cfg.hold_ms) || DEFAULTS.hold_ms, 300, 3000);
    delete cfg.floor; // 楼层功能已下线，清掉旧配置残留，避免读取不存在的实体导致整卡报错
    cfg.blocks = normBlocks(cfg);
    cfg.confirm = normalizeConfirm(config, cfg);
    this._config = cfg;
    this._sig = "";
    this._toast = null;
    this._safeRender(true);
  }

  set hass(hass) {
    this._hass = hass;
    this._safeRender();
  }

  _safeRender(force) {
    try {
      this._render(force);
    } catch (e) {
      console.error("[ha-car] render failed:", e);
      if (this._wrap) {
        this._wrap.innerHTML =
          '<div style="padding:18px;font:13px/1.6 system-ui,sans-serif;color:#ff8c8c">ha-car 渲染出错：' +
          String((e && e.message) || e).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])) +
          "</div>";
      }
    }
  }

  // 挂载后再判定一次上下文：选择器缩略卡/面板都依赖祖先链或 HA 的 preview 标记，
  // 而 setConfig/set hass 往往发生在元素挂进 DOM 之前。
  connectedCallback() {
    if (this._mountSync) return;
    this._mountSync = true;
    requestAnimationFrame(() => {
      if (!this._config) return;
      this._syncPanel();
      this._render(true);
    });
  }

  // 瀑布流用 50px 为单位估算高度；实测整卡 full≈844-876px、compact≈580px
  getCardSize() {
    return this._config && this._config.layout === "compact" ? 12 : 17;
  }

  // 分区视图里高度交给内容（rows: "auto"），避免固定行数比内容矮导致下半截被裁
  getGridOptions() {
    // rows 不能用 "auto"：分区视图会把它当成 0 行，卡片容器高度为 0、内容全被裁掉（v3.0.0 实测）
    const rows = this._config && this._config.layout === "compact" ? 9 : 12;
    return { columns: 12, min_columns: 6, rows };
  }

  getLayoutOptions() {
    const g = this.getGridOptions();
    return {
      grid_columns: g.columns,
      grid_rows: g.rows,
      grid_min_columns: g.min_columns,
      grid_min_rows: g.min_rows,
    };
  }

  // ---------- 上下文 ----------

  // 面板视图（path: hacar 那种 panel）→ 卡片撑满整个面板
  _isPanel() {
    let node = this.parentElement;
    let depth = 0;
    while (node && depth < 10) {
      const n = (node.localName || "").toLowerCase();
      if (PANEL_TAGS.has(n)) return true;
      node = node.parentElement || (node.parentNode && node.parentNode.host) || null;
      depth += 1;
    }
    return false;
  }

  _syncPanel() {
    // 编辑态（hui-card-options 包装层）也要按面板铺满：包装层只是叠了一层编辑 UI，尺寸仍是面板尺寸
    const panel = this._isPanel() && !this._isPreview();
    if (!panel && !this._panelTried) {
      this._panelTried = true;
      setTimeout(() => this._syncPanel(), 250);
      setTimeout(() => this._syncPanel(), 900);
    }
    if (panel === this._panel) {
      if (panel) {
      this._pinHostSize();
      this._fitPanel();
      // HA 的容器尺寸常在首帧之后才收敛（面板 padding、工具栏高度…），补几次强制重算
      for (const ms of [260, 700, 1400]) {
        setTimeout(() => {
          this._fitKey = null;
          this._refitSoon();
        }, ms);
      }
    }
      return;
    }
    this._panel = panel;
    this._watchEditContext();
    this.classList.toggle("panel", panel);
    this._card.classList.toggle("panel", panel);
    if (panel) this._card.classList.remove("preview");
    // :host 的 860px 上限只对普通卡片有意义；面板模式交给容器决定尺寸
    this.style.maxWidth = panel ? "none" : "";
    this.style.margin = panel ? "0" : "";
    this.style.height = panel ? "100%" : "";
    this.style.width = panel ? "100%" : "";
    if (!panel) {
      // 退出面板/进编辑态要把面板版式残留的类名和画布尺寸清掉，
      // 否则卡片会带着 1440×900 的画布塞进编辑容器
      this._fitKey = null;
      this._fitState = undefined;
      if (this._card) {
        this._card.classList.remove("fit", "pfit");
        this._card.style.width = "";
        this._card.style.height = "";
        this._card.style.removeProperty("--fit");
        this._card.style.removeProperty("--pscale");
      }
    }
    // 面板容器尺寸会在 HA 布局完成后才落定（首次 fit 可能量到中间值），
    // 所以面板模式下持续观察宿主尺寸，变化就按新容器重算画布，避免内容只占面板一部分
    if (panel && typeof ResizeObserver !== "undefined" && !this._hostRO) {
      this._hostRO = new ResizeObserver(() => this._refitSoon());
      this._hostRO.observe(this);
    }
    if (panel && !this._winHook) {
      this._winHook = true;
      window.addEventListener("resize", () => this._refitSoon());
    }
    if (panel) {
      this._pinHostSize();
      this._fitPanel();
      // HA 的容器尺寸常在首帧之后才收敛（面板 padding、工具栏高度…），补几次强制重算
      for (const ms of [260, 700, 1400]) {
        setTimeout(() => {
          this._fitKey = null;
          this._refitSoon();
        }, ms);
      }
    }
  }

  // 尺寸变化用一个 rAF 合并，避免连续触发时反复重排
  // 仪表盘进出编辑态时 HA 会在祖先层插/拔 hui-card-options，且不一定重载页面。
  // 盯着最近的视图层 shadowRoot，结构一变就重判上下文。
  _watchEditContext() {
    if (this._ctxMO) return;
    let node = this.parentElement;
    let depth = 0;
    let view = null;
    while (node && depth < 10) {
      const n = (node.localName || "").toLowerCase();
      if (PANEL_TAGS.has(n) || EDIT_WRAP_TAGS.has(n)) {
        view = node;
        break;
      }
      node = node.parentElement || (node.parentNode && node.parentNode.host) || null;
      depth += 1;
    }
    if (!view) return;
    const root = view.shadowRoot || view;
    this._ctxMO = new MutationObserver(() => {
      if (this._ctxRaf) return;
      this._ctxRaf = requestAnimationFrame(() => {
        this._ctxRaf = 0;
        this._syncPanel();
      });
    });
    this._ctxMO.observe(root, { childList: true, subtree: true });
  }

  _refitSoon() {
    if (this._rafFit) return;
    this._rafFit = requestAnimationFrame(() => {
      this._rafFit = 0;
      this._pinHostSize();
      this._fitPanel();
    });
  }

  // 面板模式下把宿主钉成「视口减去左侧栏/顶栏」的确切像素尺寸。
  // 不钉死的话，宿主高度会跟着里面的绝对定位画布一起长，量到的容器越来越大 → 画布越来越大（自激）。
  // sections 视图的卡片格子：宽度固定、高度由栅格行固定，卡片整体缩放到格子内，避免溢出压住「添加卡片」按钮
  _inGrid() {
    let node = this.parentElement;
    for (let d = 0; node && d < 10; d += 1) {
      if (GRID_TAGS.has((node.localName || "").toLowerCase())) return true;
      node = node.parentElement || (node.parentNode && node.parentNode.host) || null;
    }
    return false;
  }

  _syncGrid() {
    const grid = !this._panel && this._inGrid() && !this._isPreview();
    if (grid === this._grid) {
      if (grid) this._fitGrid();
      return;
    }
    this._grid = grid;
    this.classList.toggle("gridcard", grid);
    this._card.classList.toggle("gfit", grid);
    if (grid) {
      this._card.classList.remove("preview");
      // 布局编辑里拖动行数滑块会直接改格子高度，宿主尺寸不变，必须盯着格子盒
      if (typeof ResizeObserver !== "undefined" && !this._boxRO) {
        this._boxRO = new ResizeObserver(() => this._fitGrid());
        const box = this._gridBox();
        if (box) this._boxRO.observe(box);
      }
      this._fitGrid();
    } else {
      this._card.classList.remove("gfit", "gtwo", "fit");
      if (this._panel) this._card.classList.add("panel");
      else this._card.classList.remove("panel");
      this._card.style.removeProperty("--gscale");
      this._card.style.removeProperty("--fit");
      this._card.style.borderRadius = "";
      this._card.style.width = "";
      this._card.style.height = "";
      this.style.width = "";
      this.style.height = "";
      this._pinW = null;
      this._pinH = null;
      if (this._boxRO) {
        this._boxRO.disconnect();
        this._boxRO = null;
      }
    }
  }

  _gridBox() {
    return this.parentElement && this.parentElement.parentElement ? this.parentElement.parentElement : null;
  }

  _fitGrid() {
    if (this._panel || !this._grid || !this._card) return;
    // 格子盒 = 卡片元素外侧的栅格单元（编辑态是 hui-card-edit-mode，普通态是栅格 div）
    const boxEl = this._gridBox();
    if (!boxEl) return;
    const r = boxEl.getBoundingClientRect();
    if (r.width < 40 || r.height < 40) return;
    const bw = Math.round(r.width);
    const bh = Math.round(r.height);
    if (this.style.width !== `${bw}px` || this.style.height !== `${bh}px`) {
      this._pinW = bw;
      this._pinH = bh;
      this.style.width = `${bw}px`;
      this.style.height = `${bh}px`;
    }
    // 卡片自身被父级限制得更小时（配置弹窗预览），按实际可见尺寸缩放，避免右侧/底部被 overflow 裁掉
    const visW = this.clientWidth;
    const visH = this.clientHeight;
    const w = visW && visW < bw ? visW : bw;
    const h = visH && visH < bh ? visH : bh;
    // 宽格子直接复用面板的 1440×900 双栏设计稿（同一套左右分栏与字号），窄格子走单栏缩放
    // 配置弹窗里的预览：横屏编辑给横版预览、竖屏编辑给竖版预览（按屏幕方向而不是预览小框比例）
    // 方向按“预览框自身”的宽高比决定：编辑弹窗里竖长的一列要用竖版，否则会被缩成很小一块
    const wide = w / h >= 1.15;
    const wideChanged = wide !== this._wide;
    this._wide = wide;
    if (wide) {
      const k = Math.max(0.12, Math.min(1, w / 1440, h / 900));
      this._card.classList.add("panel", "fit");
      this._card.classList.remove("gfit", "gtwo");
      this._card.style.width = "";
      this._card.style.height = "";
      this._card.style.left = "";
      this._card.style.top = "";
      this._card.style.removeProperty("--gscale");
      this._card.style.setProperty("--fit", String(Math.round(k * 1000) / 1000));
      this._setRadius(k);
      if (wideChanged && this._hass) this._render(true);
      return;
    }
    this._card.classList.remove("panel", "fit", "gtwo");
    this._card.classList.add("gfit");
    this._card.style.removeProperty("--fit");
    const k = Math.max(0.12, Math.min(1, w / 390, h / 840));
    this._card.style.setProperty("--gscale", String(Math.round(k * 1000) / 1000));
    this._setRadius(k);
    // 单栏画布宽度收在 960 内：再宽的话英雄区会被拉得过大、比例失衡
    const cw = Math.min(960, Math.max(390, Math.round(w / k)));
    const ch = Math.max(840, Math.round(h / k));
    const left = Math.max(0, Math.round((w - cw * k) / 2));
    const top = Math.max(0, Math.round((h - ch * k) / 2));
    this._card.style.width = `${cw}px`;
    this._card.style.height = `${ch}px`;
    this._card.style.left = `${left}px`;
    this._card.style.top = `${top}px`;
    if (wideChanged && this._hass) this._render(true);
  }

  _pinHostSize() {
    if (!this._panel) return;
    const r = this.getBoundingClientRect();
    const vw = (document.documentElement && document.documentElement.clientWidth) || window.innerWidth || 0;
    const vh = (document.documentElement && document.documentElement.clientHeight) || window.innerHeight || 0;
    if (!vw || !vh) return;
    const w = Math.max(320, Math.round(vw - r.left));
    // 编辑态：卡片下方还有一条 HA 的卡片操作条（编辑/删除菜单），
    // 直接量那条工具条的高度并从可用高度里扣掉，避免它把整页顶出一条滚动条。
    let extra = 0;
    let opts = this.parentElement;
    while (opts && (opts.localName || "").toLowerCase() !== "hui-card-options") {
      opts = opts.parentElement || (opts.parentNode && opts.parentNode.host) || null;
    }
    if (opts && opts.shadowRoot) {
      const top = r.top;
      for (const ch of opts.shadowRoot.children) {
        const cr = ch.getBoundingClientRect();
        if (cr.height > 20 && cr.height < 200 && cr.top >= top + 40) {
          // 工具条自身高度 + 它与卡片之间的 12px 间距，一起扣掉
          extra = Math.max(extra, Math.round(cr.height) + 12);
        }
      }
    }
    const h = Math.max(320, Math.round(vh - r.top - extra));
    if (w !== this._pinW) {
      this.style.width = `${w}px`;
      this._pinW = w;
    }
    if (h !== this._pinH) {
      this.style.height = `${h}px`;
      this._pinH = h;
    }
    // HA 编辑态的包装层固定比面板高 6px，会把整页顶出一条细滚动条；
    // 面板编辑时把它的高度收回到视口余量，退出编辑再还原。
    if (opts) {
      const oh = Math.max(320, Math.round(vh - opts.getBoundingClientRect().top));
      if (opts.style.height !== `${oh}px`) {
        opts.style.height = `${oh}px`;
        opts.style.marginBottom = "0px";
      }
    }
  }

  // 面板里按 1440×900 设计稿等比缩放：整页装下，不出现滚动条
  // 圆角跟着缩放走：画布被 scale(k) 缩小时半径也会缩，按 24px 的视觉半径反算画布半径
  _setRadius(k) {
    if (!this._card || !k) return;
    this._card.style.borderRadius = `${Math.round(24 / k)}px`;
  }

  _fitPanel() {
    if (!this._panel || !this._card) return;
    const w = this.clientWidth;
    // 容器高度偶发大于视口（HA 布局未收敛时会把自己撑大），量视口高度封顶，
    // 否则「画布随容器长→容器又随画布长」会自激。纵向比视口更高的情况由 overflow 裁掉。
    const vh = (document.documentElement && document.documentElement.clientHeight) || window.innerHeight || 0;
    const h = vh ? Math.min(this.clientHeight, vh) : this.clientHeight;
    if (!w || !h) return;
    // 尺寸没变就不重排，避免 ResizeObserver 自触发死循环
    const key = `${w}x${h}`;
    if (key === this._fitKey) return;
    this._fitKey = key;
    // 双栏 fit 版式只在「宽不小于高」的容器里用；竖屏平板走单列 pfit，
    // 否则 1440×N 的横版画布被拉成竖条，中间会空出一大片
    // 横版双栏的门槛：至少 900px 可用宽度且宽高比 ≥1.02。
    // 4:3 平板横屏扣掉侧栏只剩 768px，硬塞 1440 画布字会缩得过小、元件互相压住，
    // 这类窄横屏走单列 pfit 保证可读性；16:10/16:9 平板横屏与桌面宽屏一律双栏。
    const fit = w >= 900 && h >= 460 && w >= h * 1.02;
    const wasFit = this._fitState;
    this._fitState = fit;
    this._card.classList.toggle("fit", fit);
    // 双栏 / 单列是两套 DOM 结构：面板尺寸跨过阈值时重排一次
    if (wasFit !== undefined && wasFit !== fit && this._wrap && this._wrap.firstChild) {
      this._render(true);
    }
    // 小屏（手机面板）按 390×840 的版式等比缩放，保证一屏铺满、绝不出滚动条
    const pfit = !fit && w > 0 && h > 0;
    this._card.classList.toggle("pfit", pfit);
    if (pfit) {
      // 版式画布按容器等比反算（canvas = 容器 / 缩放），内容随画布重新排布，
      // 所以两边都能占满：先满足高就把画布排宽，先满足宽就把画布排高。
      const k = Math.max(0.42, Math.min(2.2, Math.min(w / 390, h / 840)));
      this._card.style.setProperty("--pscale", String(Math.round(k * 1000) / 1000));
      this._card.style.width = `${Math.round(w / k)}px`;
      this._card.style.height = `${Math.round(h / k)}px`;
      this._setRadius(k);
      return;
    }
    if (!fit) return;
    const k = Math.min(w / 1440, h / 900);
    this._card.style.setProperty("--fit", String(Math.round(k * 1000) / 1000));
    this._setRadius(k);
    // 画布按等比缩放后的容器尺寸反算：宽/高两侧都补到容器边界，
    // 避免高受限时固定画布只占满高度、左右留下大片空白。
    const designW = Math.max(1440, Math.round(w / k));
    const designH = Math.max(900, Math.round(h / k));
    this._card.style.width = `${designW}px`;
    this._card.style.height = `${designH}px`;
  }

  // HA 进入编辑仪表盘时会直接给元素赋 preview=true；用 setter 捕获，立刻重判上下文
  get preview() {
    return !!this._previewFlag;
  }

  set preview(v) {
    const next = v === true || v === "true";
    if (next === this._previewFlag) return;
    this._previewFlag = next;
    // 进出编辑态会换掉祖先链，必须重判面板/预览上下文
    if (this._config && this.isConnected) this._syncPanel();
  }

  // 祖先链里出现编辑态包装层 → 这是仪表盘编辑，不是选择器缩略卡
  // 卡片配置弹窗里的预览卡也挂在模拟的 hui-grid-section 下；
  // 这里要按「屏幕方向」而不是预览框比例决定横版/竖版，保证横屏编辑看到横版卡。
  _inCardEditor() {
    let node = this.parentElement;
    let depth = 0;
    while (node && depth < 14) {
      const n = (node.localName || "").toLowerCase();
      if (n === "hui-dialog-edit-card" || n === "hui-card-editor" || n === "hui-dialog-add-card" || n === "hui-card-preview") return true;
      node = node.parentElement || (node.parentNode && node.parentNode.host) || null;
      depth += 1;
    }
    return false;
  }

  _inEditWrap() {
    let node = this.parentElement;
    let depth = 0;
    while (node && depth < 10) {
      const n = (node.localName || "").toLowerCase();
      if (EDIT_WRAP_TAGS.has(n)) return true;
      node = node.parentElement || (node.parentNode && node.parentNode.host) || null;
      depth += 1;
    }
    return false;
  }

  _isPreview() {
    if (this._preview) return true;
    if (this._inEditWrap()) return false;
    // 仪表盘（sections/grid/masonry）里 HA 也会临时设 preview，这里不能当缩略卡
    let dn = this.parentElement;
    for (let d = 0; dn && d < 10; d += 1) {
      if (GRID_TAGS.has((dn.localName || "").toLowerCase())) return false;
      dn = dn.parentElement || (dn.parentNode && dn.parentNode.host) || null;
    }
    // HA 的卡选择器给预览卡设的是公开属性 preview（不是私有字段）
    if (this.preview === true || this.preview === "true" || this.hasAttribute("preview")) return true;
    let node = this.parentElement;
    let depth = 0;
    while (node && depth < 10) {
      const n = (node.localName || "").toLowerCase();
      if (PREVIEW_TAGS.has(n)) return true;
      node = node.parentElement || (node.parentNode && node.parentNode.host) || null;
      depth += 1;
    }
    return false;
  }

  // ---------- 渲染 ----------

  _render(force) {
    if (!this._hass && !force) return;
    if (!this._config) this._config = Object.assign({}, DEFAULTS, { entities: {} });
    if (this._hold) {
      this._pendingRender = true;
      return;
    }
    if (!this._built) this._build();
    if (!this._hass) {
      if (force) this._wrap.innerHTML = this._empty(dict(null));
      return;
    }
    if (!this._built) this._build();
    this._syncPanel();
    if (this._isPreview()) {
      const card = this.shadowRoot.querySelector("ha-card");
      this._wrap.className = "wrap";
      card.classList.add("compact", "preview");
      this._wrap.innerHTML = this._previewBody();
      return;
    }

    const data = resolve(this._hass, this._config);
    const sig = this._signature(data);
    if (!force && sig === this._sig) return;
    this._sig = sig;
    this._paint(data);
  }

  _build() {
    const root = this.shadowRoot;
    root.innerHTML = `<style>${STYLES}</style><ha-card><div class="skin"></div><div class="wrap"></div></ha-card>`;
    this._wrap = root.querySelector(".wrap");
    this._card = root.querySelector("ha-card");

    this._built = true;
    this._bind();
    this._bindOrientation();
    this._panelRO = new ResizeObserver(() => {
      this._fitPanel();
      this._fitGrid();
    });
    this._panelRO.observe(this);
    this._ro = new ResizeObserver(() => this._placeOverlay());
    this._ro.observe(this._wrap);
  }

  _signature(data) {
    const parts = [];
    for (const slot of SLOT_KEYS) {
      const s = data.get(slot);
      parts.push(slot + "=" + (s ? s.state + "@" + (s.last_changed || "") : "-"));
    }
    parts.push(String(this._pending.size));
    parts.push(this._toast ? this._toast.ts + this._toast.msg : "");
    const fp = this._config.find && this._config.find.phone;
    const fcar = (this._config.find && this._config.find.car) || (data && data.id ? data.id("tracker") : "");
    const fst = fp && this._hass && this._hass.states[fp];
    const cst = fcar && this._hass && this._hass.states[fcar];
    parts.push("find=" + (fst ? fst.state + "@" + (fst.last_changed || "") : "-"));
    parts.push("findcar=" + (cst ? cst.state + "@" + (cst.last_changed || "") : "-"));
    parts.push(JSON.stringify([this._config.modules, this._config.confirm, this._config.layout, this._config.title, this._config.find, this._config.bg_image]));
    return parts.join("|");
  }

  _applyBg() {
    const card = this._card;
    if (!card) return;
    const raw = String((this._config && this._config.bg_image) || "").trim();
    if (!raw) {
      this._bgToken = (this._bgToken || 0) + 1;
      this._bgSrc = "";
      this._bgResolved = "";
      this._clearBg();
      return;
    }
    if (raw === this._bgSrc) {
      if (isMediaSource(raw)) {
        if (this._bgResolved) this._setBgUrl(this._bgResolved, raw);
      } else {
        this._setBgUrl(bgUrl(raw), raw);
      }
      return;
    }
    this._bgToken = (this._bgToken || 0) + 1;
    this._bgSrc = raw;
    this._bgResolved = "";
    if (isMediaSource(raw)) this._resolveBg(raw, this._bgToken);
    else this._setBgUrl(bgUrl(raw), raw);
  }

  _resolveBg(raw, token) {
    const hass = this._hass;
    if (!hass || !hass.callWS) return;
    hass.callWS({ type: "media_source/resolve_media", media_content_id: raw })
      .then((res) => {
        if (token !== this._bgToken || this._bgSrc !== raw) return;
        this._bgResolved = (res && res.url) || "";
        if (this._bgResolved) this._setBgUrl(this._bgResolved, raw);
        else {
          this._bgSrc = "";
          this._clearBg();
        }
      })
      .catch(() => {
        if (token === this._bgToken && this._bgSrc === raw) {
          this._bgSrc = "";
          this._clearBg();
        }
      });
  }

  _clearBg() {
    const card = this._card;
    if (!card) return;
    card.classList.remove("has-photo");
    card.style.removeProperty("--hc-photo");
    this._bgLoaded = "";
  }

  _setBgUrl(url, raw) {
    const card = this._card;
    if (!card) return;
    if (!url) {
      this._clearBg();
      return;
    }
    card.style.setProperty("--hc-photo", `url("${url}")`);
    card.classList.add("has-photo");
    if (this._bgLoaded === url) return;
    this._bgLoaded = url;
    const probe = new Image();
    probe.onload = () => {
      if (this._bgSrc === raw) card.classList.add("has-photo");
    };
    probe.onerror = () => {
      if (this._bgSrc === raw) {
        this._bgResolved = "";
        this._bgSrc = "";
        card.classList.remove("has-photo");
      }
    };
    probe.src = url;
  }

  _paint(data) {
    const cfg = this._config;
    this._syncPanel();
    this._syncGrid();
    this._card.classList.toggle("compact", cfg.layout === "compact");
    const th = THEMES[cfg.theme] || THEMES.midnight;
    this._card.classList.toggle("theme-glass", !!th.glass);
    this.classList.toggle("gskin", !!th.glass);
    this._wrap.className = "wrap";
    const accent = cfg.accent && cfg.accent !== DEFAULTS.accent ? cfg.accent : th.accent;
    this._card.style.setProperty("--hc-accent", accent);
    this._card.style.setProperty("--hc-a", hexRgb(accent));
    // 控制按钮艺术图跟随主题强调色（原图基调约 210° 钢蓝）
    const ah = accentHsl(accent);
    this._card.style.setProperty("--hc-btnhue", `${Math.round(ah.h - 210)}deg`);
    this._card.style.setProperty("--hc-btnsat", String(Math.round((0.55 + ah.s * 0.75) * 100) / 100));
    this._card.style.setProperty("--hc-bg", themeBg(cfg.theme));
    this._applyBg();
    this._prunePending(data);
    const twoCol = this._card.classList.contains("fit") || this._card.classList.contains("gtwo");
    this._wrap.innerHTML = this._body(data, twoCol);
    if (this._findOpen) {
      // 每次 hass 更新都会重绘，先清掉旧蒙层，否则会叠出多层只更新最底层
      this._card.querySelectorAll(".findmodal").forEach((m) => m.remove());
      this._card.insertAdjacentHTML("beforeend", this._findModal(data));
    }
    this._findData = data;
    this._updateFind();
    // 蒙层每次都是新 DOM，瓦片要重画；尺寸由容器决定，等一帧布局落定再画
    if (this._findOpen) {
      cancelAnimationFrame(this._mapRaf);
      this._mapRaf = requestAnimationFrame(() => this._paintFindMap(true));
    }

    this._placeToast();
    // 面板缩放/字体度量落定后几何还会变一次，补两轮重算，避免首帧用旧尺寸定位
    cancelAnimationFrame(this._pt1);
    this._pt1 = requestAnimationFrame(() => {
      this._placeOverlay();
      this._placeToast();
      this._pt2 = requestAnimationFrame(() => {
        this._placeOverlay();
        this._placeToast();
        this._paintFindMap(false);
      });
    });
    clearTimeout(this._pt3);
    this._pt3 = setTimeout(() => {
      this._placeOverlay();
      this._placeToast();
    }, 420);
    const img = this._wrap.querySelector("img.carimg");
    if (img) img.addEventListener("load", () => this._placeOverlay(), { once: true });
    if (img && img.dataset.fb) {
      img.addEventListener("error", () => {
        const fb = img.dataset.fb;
        delete img.dataset.fb;
        img.src = fb;
      }, { once: true });
    }
  }

  _prunePending(data) {
    const now = Date.now();
    for (const [ent, ts] of this._pending) {
      const st = data.states[ent];
      const changed = st && new Date(st.last_changed).getTime() >= ts;
      if (changed || now - ts > 180000) this._pending.delete(ent);
    }
  }

  _empty(msg) {
    return `<div class="empty">${icon("car")}<div>${esc(msg)}</div></div>`;
  }

  // 选择器缩略卡：照真机卡片的竖版小卡 1:1 缩小；隐私字段（车牌/地址/数值）全部用随机假数据
  _previewBody() {
    const t = dict(this._hass);
    const en = isEn(this._hass);
    const fake = {
      plate: en ? "XYZ-1234" : "京A·12345",
      tire: ["222", "227"],
      odo: "12,345",
      fuel: "62",
      range: "486",
    };
    const acts = [
      { art: BUTTON_ART.unlock, lb: t.unlock || "开锁" },
      { art: BUTTON_ART.lock, lb: t.lock || "上锁" },
      { art: BUTTON_ART.start, lb: en ? "Start" : "远程启动" },
      { art: BUTTON_ART.horn, lb: en ? "Honk" : "鸣笛寻车" },
    ];
    const chip = (cls, label, tire) => `<span class="pv-loc-chip ${cls}"><i>${esc(label)}</i><b>${esc(en ? "Closed" : "已关闭")}</b><u>${esc(tire)}<s>kPa</s></u></span>`;
    return `<div class="pv-top"><h1>${esc(en ? "My car" : "我的座驾")}</h1>
        <span class="pv-eng"><span class="dot"></span>${esc(en ? "Engine" : "引擎")} · ${esc(en ? "Off" : "已熄火")}</span>
        <span class="status ok"><span class="dot"></span>${esc(t.locked)}</span></div>
      <div class="pv-plate">${esc(fake.plate)}</div>
      <div class="pv-hero">
        <span class="pv-halo"></span>
        <span class="pv-orbit"></span><i class="pv-node n1"></i><i class="pv-node n2"></i><i class="pv-node n3"></i><i class="pv-node n4"></i>
        <span class="pv-cap pt">${esc(en ? "Hood" : "引擎盖")} · ${esc(en ? "Closed" : "已关闭")}</span>
        <span class="pv-cap pb">${esc(en ? "Trunk" : "尾门")} · ${esc(en ? "Closed" : "已关闭")}</span>
        ${chip("lf a", en ? "Driver" : "主驾", fake.tire[0])}
        ${chip("lf b", en ? "Rear L" : "左后", "239")}
        ${chip("rf a", en ? "Pass." : "副驾", fake.tire[1])}
        ${chip("rf b", en ? "Rear R" : "右后", "247")}
        <img class="pv-carimg" src="${PREVIEW_CAR}" alt="" />
      </div>
      <div class="pv-stats">
        <span>${esc(t.fuel || "燃油")}<b>${esc(fake.fuel)}</b>%</span>
        <span>${esc(t.range || "续航")}<b>${esc(fake.range)}</b>km</span>
        <span>${esc(t.odo || "总里程")}<b>${esc(fake.odo)}</b>km</span>
      </div>
      <div class="pv-acts">
        ${acts.map((a) => `<span class="pv-act"><img class="pv-art" src="${a.art}" alt=""><em>${esc(a.lb)}</em></span>`).join("")}
      </div>`;
  }

  // ---------- 卡片主体 ----------

  // ---------- 模块内实体项 ----------
  _items(b) {
    if (!b) return [];
    if (Array.isArray(b.items)) return b.items;
    if (b.type === "custom" && (b.entity || b.label || b.icon)) {
      return [{ slot: "", entity: b.entity, label: b.label, unit: b.unit, icon: b.icon }];
    }
    return defaultItems(b.type);
  }

  _itemEnt(it, data) {
    if (it.entity) return it.entity;
    return it.slot ? data.id(it.slot) : "";
  }

  _itemState(it, data) {
    const ent = this._itemEnt(it, data);
    return ent && this._hass && this._hass.states[ent] ? this._hass.states[ent] : null;
  }

  _itemDef(it) {
    return it.slot ? ITEM_DEFS[it.slot] || null : null;
  }

  _itemLabel(it, def, t) {
    if (it.label) return it.label;
    if (def) return isEn(this._hass) ? def.en : def.zh;
    const ent = it.entity || "";
    const st = ent && this._hass && this._hass.states[ent];
    const fn = st && st.attributes && st.attributes.friendly_name;
    if (fn) return String(fn);
    return ent ? ent.split(".").slice(-1)[0].replace(/_/g, " ") : (t.custom || (isEn(this._hass) ? "Entity" : "实体"));
  }

  _itemShowLabel() {
    return true;
  }

  _itemIcon(it, def) {
    if (def && ICON_NAMES.includes(def.icon)) return def.icon;
    const ent = it.entity || "";
    const st = ent && this._hass && this._hass.states[ent];
    const ic = st && st.attributes && st.attributes.icon;
    if (ic && /^mdi:[a-z0-9-]+$/i.test(ic)) return ic;
    return "bolt";
  }

  _itemText(it, data, t) {
    const def = this._itemDef(it);
    const st = this._itemState(it, data);
    const label = this._itemLabel(it, def, t);
    if (!st) return { label, value: null, unit: "", st: null, def, labelText: label };
    if (isBad(st)) return { label, value: "—", unit: "", st, def, labelText: label };
    let raw = String(st.state);
    const unit = it.unit || attrs(st, "unit_of_measurement") || "";
    if (def && def.kind === "tire") {
      const n = num(st);
      return { label, value: n == null ? "—" : fmtNum(n), unit: unit || "kPa", st, def, labelText: label };
    }
    if (/^on|off$/i.test(raw)) {
      raw = raw.toLowerCase() === "on" ? (isEn(this._hass) ? "On" : "开") : (isEn(this._hass) ? "Off" : "关");
    }
    if (def && def.kind === "pct") {
      const n = num(st);
      if (n != null) return { label, value: String(Math.round(n)), unit: unit || "%", st, def, labelText: label };
    }
    return { label, value: raw, unit, st, def, labelText: label };
  }

  // 用户对「门窗」模块显式增删过实体时，俯视状态层同步隐藏被删的门/窗/盖/胎压
  _slotAllowed(slot) {
    const db = (this._config.blocks || []).find((b) => b.type === "doors" && b.on !== false);
    if (!db || !Array.isArray(db.items)) return true;
    return db.items.some((it) => it.slot === slot);
  }

  _extraChips(b, data, t, skipKinds) {
    if (!b) return "";
    const items = this._items(b).filter((it) => {
      const def = this._itemDef(it);
      const kind = def ? def.kind : "custom";
      return !(skipKinds || []).includes(kind);
    });
    const chips = [];
    for (const it of items) {
      const v = this._itemText(it, data, t);
      if (!v.st) continue;
      const def = v.def;
      const lab = this._itemShowLabel(it) ? `${esc(v.label)} · ` : "";
      chips.push(`<span class="door" data-more="${esc(this._itemEnt(it, data))}">${icon(this._itemIcon(it, def))}` +
        `<span class="addr">${lab}${esc(v.value)}${v.unit ? " " + esc(v.unit) : ""}</span></span>`);
    }
    return chips.length ? `<div class="doors">${chips.join("")}</div>` : "";
  }

  _body(data, twoCol) {
    const cfg = this._config;
    const t = dict(this._hass);
    if (!data.group && !Object.keys(cfg.entities || {}).length) {
      return this._empty(isEn(this._hass)
        ? "No vehicle entity found. Check that FordPass integration is loaded, or pick a vehicle in the card editor."
        : "没找到车辆实体。确认福特派互联集成已加载，或在卡片编辑器里选择车辆。");
    }
    const compact = cfg.layout === "compact";
    const list = cfg.blocks || normBlocks(cfg);
    const s = (slot) => data.get(slot);

    const lockNorm = normLock(s("lock"));
    const chgNow = chargingNow(s("chg_status"));
    const onlineRaw = text(s("online")).toLowerCase();
    const offline = onlineRaw ? /offline|离线|not[ _-]?online|不可用/.test(onlineRaw) : false;
    const running = (() => {
      const rs = text(s("remote_start")).toLowerCase();
      if (rs && !rs.includes("未") && !rs.includes("not")) {
        if (rs.includes("已") || rs.includes("启动中") || rs.includes("running") || rs.includes("started")) return true;
      }
      const st = s("sw_engine") || s("ignition");
      if (isBad(st)) return false;
      const v = String(st.state).toLowerCase();
      return v === "on" || v.includes("已启动") || v.includes("running") || v.includes("启动中");
    })();

    const title = cfg.title || data.name || text(s("nickname")) || (isEn(this._hass) ? "My car" : "我的座驾");
    const plate = text(s("plate"));

    const status = offline
      ? { cls: "bad", label: t.offline }
      : lockNorm === "unlocked"
        ? { cls: "bad", label: t.unlocked }
        : lockNorm === "locked"
          ? { cls: "ok", label: t.locked }
          : { cls: "", label: t.locking };

    const chips = [];
    if (chgNow) chips.push({ cls: "info", label: t.charging });
    if (running) chips.push({ cls: "warn", label: t.running });

    const blocks = [];
    const plateTxt = cfg.show_plate && plate ? (cfg.privacy ? maskPlate(plate) : plate) : "";
    const head = `<div class="head"><div class="ttl"><h1>${FORD_LOGO}${esc(title)}</h1>` +
      (plateTxt ? `<span class="plate">${esc(plateTxt)}</span>` : "") +
      `</div><span class="status ${status.cls}"><span class="dot"></span>${esc(status.label)}</span></div>`;

    const hero = this._imagePair(data);
    for (const b of list) {
      if (b.on === false) continue;
      let html = "";
      switch (b.type) {
        case "meta": {
          const locH = compact ? "" : this._metaLocation(b, data, t);
          const syncH = this._baseline(data, t, b);
          const placeH = compact ? "" : this._placeChip(b, data);
          const findH = compact ? "" : this._findChip(data);
          const extra = this._extraChips(b, data, t, ["location", "place", "sync"]);
          if (locH || syncH || placeH || findH || extra) html = `<div class="b-meta"><div class="hmeta">${locH}${placeH}${findH}${syncH}</div>${extra}</div>`;
          break;
        }
        case "hero": {
          const doorsB = list.find((x) => x.type === "doors");
          const dx = this._extraChips(doorsB, data, t, ["door", "stat", "cap", "tire"]);
          html = `<div class="blk b-hero">${this._hero(
            this._imgFrom(this._heroImageEnt(b, data), hero.src),
            hero.fb,
            this._carOverlay(data, t, doorsB, running),
            running,
          )}${this._extraChips(b, data, t, ["image"])}${dx ? `<div class="xchips">${dx}</div>` : ""}</div>`;
          break;
        }
        case "energy": {
          const en = this._energy(data, t, b);
          if (en) html = `<div class="blk b-energy">${en}</div>`;
          break;
        }
        case "alerts": {
          const al = this._alerts(data, t, b);
          if (al) html = `<div class="blk b-alerts">${al}</div>`;
          break;
        }
        case "doors":
          // 门窗模块不再渲染独立列表，只驱动车图状态层
          break;
        case "charging": {
          if (!compact) {
            const ch = this._charging(data, t, chgNow, b);
            if (ch) html = `<div class="blk b-charging">${ch}</div>`;
          }
          break;
        }
        case "service": {
          if (!compact) {
            const sv = this._service(data, t, b);
            if (sv) html = `<div class="blk b-service">${sv}</div>`;
          }
          break;
        }
        case "actions": {
          const ac = this._actions(data, t, running, offline, compact, b);
          if (ac) html = `<div class="blk b-actions">${ac}</div>`;
          break;
        }
        case "custom": {
          const cu = this._customBlock(b, t, data);
          if (cu) html = `<div class="blk b-custom">${cu}</div>`;
          break;
        }
        default:
          break;
      }
      if (html) blocks.push({ html, hero: b.type === "hero", type: b.type });
    }

    // 「车辆告警」固定排在「总里程」所在的能源块之后（不受旧配置里的块顺序影响）
    const ai = blocks.findIndex((x) => x.type === "alerts");
    const ei = blocks.findIndex((x) => x.type === "energy");
    if (ai > -1 && ei > -1 && ai !== ei + 1) {
      const [alerts] = blocks.splice(ai, 1);
      const target = blocks.findIndex((x) => x.type === "energy");
      blocks.splice(target + 1, 0, alerts);
    }
    // 吸附：把告警块并进能源块内部，紧贴「总里程」三列，不再被右栏 flex 分配推到底部
    const enIdx = blocks.findIndex((x) => x.type === "energy");
    if (enIdx > -1 && blocks[enIdx + 1] && blocks[enIdx + 1].type === "alerts") {
      const eh = blocks[enIdx].html;
      const ah = blocks[enIdx + 1].html;
      if (eh.endsWith("</div>")) {
        blocks[enIdx].html = eh.slice(0, -6) + ah + "</div>";
        blocks.splice(enIdx + 1, 1);
      }
    }

    let inner;
    if (twoCol) {
      const left = blocks.filter((b) => b.hero).map((b) => b.html).join("");
      const right = blocks.filter((b) => !b.hero).map((b) => b.html).join("");
      inner = `<div class="b-hero-col">${left}</div><div class="b-side">${right}</div>`;
    } else {
      inner = blocks.map((b) => b.html).join("");
    }
    return `${head}<div class="blocks">${inner}</div>${this._toast ? this._toastHtml() : ""}`;
  }

  // 车图 + 同心轨道 + 四枚发光节点（无图时落回圆形占位）
  _hero(imgUrl, fbUrl, overlay, running) {
    const inner = typeof overlay === "string" ? overlay : (overlay && overlay.inner) || "";
    const edge = (overlay && overlay.edge) || "";
    const bg = (this._config && this._config.bg_style) || "radar";
    return `<div class="hero bs-${esc(bg)}${running ? " run" : ""}"><div class="halo"></div>
      <span class="orbit${running ? " run" : ""}"><svg class="hring2" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="49"/></svg><i class="node n1"></i><i class="node n2"></i><i class="node n3"></i><i class="node n4"></i></span>
      <span class="orbit o2"></span>
      ${
        imgUrl
          ? `<img class="carimg" src="${esc(imgUrl)}"${fbUrl ? ` data-fb="${esc(fbUrl)}"` : ""} alt="">`
          : `<div class="carph">${icon("car")}</div>`
      }
      <div class="ground"></div><div class="covl cs-${esc((this._config && this._config.chip_style) || "glass")}">${inner}</div>${edge ? `<div class="cedge">${edge}</div>` : ""}</div>`;
  }

  // 俯视图状态层：每个车门一张聚合卡（门 + 窗 + 该轮位胎压），前后盖各一张小卡，全部落在圆环内侧
  _carOverlay(data, t, b, running) {
    const zh = !isEn(this._hass);
    const doors = !!b && b.on !== false;
    const items = b ? this._items(b) : [];
    const itemFor = (slot) => items.find((x) => x.slot === slot) || null;
    const entFor = (slot) => {
      const it = itemFor(slot);
      return it ? this._itemEnt(it, data) : data.id(slot);
    };
    const stateFor = (slot) => {
      const it = itemFor(slot);
      return it ? this._itemState(it, data) : data.get(slot);
    };
    const lockedRaw = text(data.get("lock") || {});
    const locked = /锁|lock/i.test(lockedRaw) && !/未|解|unlock/i.test(lockedRaw);
    const tireLine = (slot, sslot, unitFallback) => {
      if (!doors || !itemFor(slot)) return null;
      const st = stateFor(slot);
      if (!st) return null;
      const v = num(st);
      const flag = normTire(stateFor(sslot)) === "warn";
      const outOfRange = v != null && (v < 190 || v > 300);
      const warn = outOfRange || (flag && v == null);
      const unit = attrs(st, "unit_of_measurement") || unitFallback;
      const txt = v == null ? "—" : fmtNum(v);
      const html = `<div class="lr tire${warn ? " warn" : ""}" data-more="${esc(entFor(slot))}">` +
        `<span class="ri">${icon("tireo")}</span><b>${txt}<s>${esc(unit)}</s></b></div>`;
      return { slot, html, warn };
    };
    const out = [];
    if (running) {
      out.push(`<i class="beam lb"></i><i class="beam rb"></i><i class="gpool"></i><i class="tailbar"></i><i class="tailglow"></i>`);
    }
    const engItem = itemFor("ignition");
    const engSt = doors ? (engItem ? this._itemState(engItem, data) : (data.get("sw_engine") || data.get("remote_start"))) : null;
    if (engSt) {
      const engEnt = engItem ? this._itemEnt(engItem, data) : (data.id("sw_engine") || data.id("remote_start") || data.id("ignition"));
      const engTxt = engItem ? String(engSt.state) : (running ? (zh ? "已启动" : "Running") : (zh ? "已熄火" : "Off"));
      out.push(`<div class="enp${running ? " on" : ""}"${engEnt ? ` data-more="${esc(engEnt)}"` : ""}><div class="row"><i class="ed"></i>` +
        `<span>${zh ? "引擎" : "ENGINE"}</span></div>` +
        `<b>${esc(engTxt)}</b></div>`);
    }
    if (!doors) return { inner: out.join(""), edge: "" };
    const quads = [
      ["lf", zh ? "主驾" : "Driver", ["door_fl", "win_fl"], "tp_lf", "tps_lf"],
      ["rf", zh ? "副驾" : "Front", ["door_fr", "win_fr"], "tp_rf", "tps_rf"],
      ["lr", zh ? "左后" : "Rear L", ["door_rl", "win_rl"], "tp_lr", "tps_lr"],
      ["rr", zh ? "右后" : "Rear R", ["door_rr", "win_rr"], "tp_rr", "tps_rr"],
    ];
    for (const [cls, label, dSlots, tSlot, tsSlot] of quads) {
      const lines = [];
      let bad = false;
      for (const [ic, slot] of [["carwin", dSlots[1]], ["cardoor", dSlots[0]]]) {
        const it = itemFor(slot);
        if (!it) continue;
        const st = stateFor(slot);
        if (!st) continue;
        const bBad = isBad(st);
        if (bBad) bad = true;
        const open = !bBad && normOpen(st) === "open";
        const dent = this._itemEnt(it, data);
        lines.push(
          `<div class="lr${bBad ? " bad" : open ? " open" : ""}" data-more="${esc(dent)}" title="${esc(dent)}">` +
            `<span class="ri">${icon(ic)}</span>` +
            `<b>${bBad ? (zh ? "不可用" : "N/A") : open ? (zh ? "已打开" : "Open") : zh ? "已关闭" : "Closed"}</b></div>`,
        );
      }
      const tire = tireLine(tSlot, tsSlot, "kPa");
      if (!lines.length && !tire) continue;
      const headerEnt = (itemFor(dSlots[0]) && entFor(dSlots[0])) || (itemFor(dSlots[1]) && entFor(dSlots[1])) || "";
      const itemsHtml = lines.join("") + (tire ? tire.html : "");
      out.push(
        `<div class="loc ${cls}${bad ? " bad" : ""}"${headerEnt ? ` data-more="${esc(headerEnt)}"` : ""}>` +
          `<div class="lh"><span>${esc(label)}</span><i class="lk${locked ? " on" : ""}">${icon(locked ? "lock" : "unlock")}</i></div>` +
          `<div class="lrs">${itemsHtml}</div>` +
          `</div>`,
      );
    }
    const cap = (cls, label, slot, ic) => {
      if (!itemFor(slot)) return;
      const st = stateFor(slot);
      if (!st) return;
      const bBad = isBad(st);
      const open = !bBad && normOpen(st) === "open";
      const ent = entFor(slot);
      out.push(
        `<div class="cap ${cls}${bBad ? " bad" : open ? " open" : ""}" data-more="${esc(ent)}" title="${esc(label)}">` +
          `<span class="ri">${icon(ic)}</span><span class="cx">` +
          `<b>${esc(label)}</b>` +
          `<i>${bBad ? (zh ? "不可用" : "N/A") : open ? (zh ? "已打开" : "Open") : zh ? "已关闭" : "Closed"}</i></span>` +
          `<em class="lk${locked ? " on" : ""}">${icon(locked ? "lock" : "unlock")}</em></div>`,
      );
    };
    cap("hood", zh ? "引擎盖" : "Hood", "hood", "engine");
    cap("trunk", zh ? "尾门" : "Tailgate", "tailgate", "trunk");
    return { inner: out.join(""), edge: "" };
  }

  // 状态层贴合真实车图矩形（图片 contain 后尺寸未知，渲染完再量）
  _placeOverlay() {
    const img = this._wrap && this._wrap.querySelector("img.carimg");
    const ovl = this._wrap && this._wrap.querySelector(".covl");
    if (!img || !ovl) return;
    if (!img._hcHooked) {
      img._hcHooked = true;
      img.addEventListener("load", () => this._placeOverlay());
      requestAnimationFrame(() => this._placeOverlay());
      if (typeof ResizeObserver !== "undefined") {
        this._ro = new ResizeObserver(() => this._placeOverlay());
        this._ro.observe(img);
        const hv = this._wrap && this._wrap.querySelector(".hero");
        if (hv) this._ro.observe(hv);
      }
    }
    // 用 offset 尺寸而不是 getBoundingClientRect：面板缩放后 rect 是屏幕坐标，会把状态层推歪
    if (!img.offsetWidth) return;
    const hero = this._wrap.querySelector(".hero");
    const orb = this._wrap.querySelector(".orbit:not(.o2)");
    const orb2 = this._wrap.querySelector(".orbit.o2");
    let ratio = 1;
    let ringBotHero = 0;
    if (hero && orb) {
      // 圆环直径 = 以 hero 中心为圆心、到「hero / wrap / ha-card 三者交集」的最短半径，
      // 这样无论面板缩放、祖先容器裁切，圆环都不会被切掉弧线
      const heroR = hero.getBoundingClientRect();
      const wrapR = this._wrap.getBoundingClientRect();
      const cardEl = this._wrap.closest && this._wrap.closest("ha-card");
      const cardR = (cardEl || this._wrap).getBoundingClientRect();
      const visL = Math.max(heroR.left, wrapR.left, cardR.left);
      const visR = Math.min(heroR.right, wrapR.right, cardR.right);
      const visT = Math.max(heroR.top, wrapR.top, cardR.top);
      const visB = Math.min(heroR.bottom, wrapR.bottom, cardR.bottom);
      const cx0 = (heroR.left + heroR.right) / 2;
      const cy0 = (heroR.top + heroR.bottom) / 2;
      const zk = heroR.width ? hero.clientWidth / heroR.width : 1;
      const halfScreen = Math.min(cx0 - visL, visR - cx0, cy0 - visT, visB - cy0);
      const d = Math.max(40, halfScreen * 2 * 0.965 * zk - 2);
      if (d > 0) {
        orb.style.width = orb.style.height = `${d}px`;
        if (orb2) orb2.style.width = orb2.style.height = `${d * 1.035}px`;
      }
      const orbR = orb.getBoundingClientRect();
      ratio = orbR.width ? orb.clientWidth / orbR.width : 1;
      ringBotHero = (orbR.bottom - heroR.top) * ratio;
    }
    // 车图上留白小、下留白大（车身视觉重心偏上），整体下移一点让车身居中在圆环里
    const ih = img.offsetHeight;
    const wantShift = Math.round(ih * 0.043);
    const room = ringBotHero ? ringBotHero - 2 - (img.offsetTop + ih) : wantShift;
    const shift = Math.max(0, Math.min(wantShift, Math.floor(room)));
    img.style.transform = shift ? `translateY(${shift}px)` : "";
    ovl.style.left = `${img.offsetLeft}px`;
    ovl.style.top = `${img.offsetTop + shift}px`;
    ovl.style.width = `${img.offsetWidth}px`;
    ovl.style.height = `${ih}px`;
    // 前灯切光：高度正好顶到 hero 上沿，保证光锥不被裁掉、远端的切光线可见
    const beams = ovl.querySelectorAll(".beam");
    if (beams.length) {
      const lineY = img.offsetTop + shift + ih * 0.106;
      const bh = Math.max(10, Math.min(lineY - 2, ih * 0.30));
      for (const bEl of beams) bEl.style.height = `${bh}px`;
      // 光锥打在地面上的落点：跟着光锥顶端走
      ovl.style.setProperty("--beamh", `${bh}px`);
    }
    if (hero && orb) {
      // 引擎盖/尾门胶囊 + 四张位置卡：统一按「车身轮廓 / 圆环边界」自适应落位
      // 空间太窄时先把圆环收一点，给前后盖胶囊腾出位置（胶囊优先保持可读尺寸）
      const capH0 = this._wrap.querySelector(".cap.hood");
      const capT0 = this._wrap.querySelector(".cap.trunk");
      if (capH0 && capT0 && orb2) {
        const heroR0 = hero.getBoundingClientRect();
        const r0 = orb.getBoundingClientRect();
        const kk0 = r0.width ? orb.clientWidth / r0.width : 1;
        const ih0 = img.offsetHeight;
        const nw0 = img.naturalWidth, nh0 = img.naturalHeight;
        let pad0 = 0, shown0 = ih0;
        if (nw0 && nh0) {
          const sc0 = Math.min(img.clientWidth / nw0, ih0 / nh0);
          shown0 = nh0 * sc0;
          pad0 = (ih0 - shown0) / 2;
        }
        const bT = img.offsetTop + shift + pad0 + shown0 * 0.058;
        const bB = img.offsetTop + shift + pad0 + shown0 * 0.855;
        const rT = (r0.top - heroR0.top) * kk0;
        const rB = (r0.bottom - heroR0.top) * kk0;
        const gap0 = Math.max(10, Math.round(shown0 * 0.042));
        const need = Math.max(capH0.offsetHeight + gap0 + 2 - (bT - rT), 0, capT0.offsetHeight + 8 - (rB - bB));
        if (need > 1) {
          const d0 = Math.min(hero.clientWidth, hero.clientHeight) * 0.965;
          const d2 = Math.max(d0 * 0.72, d0 - need * 2);
          orb.style.width = orb.style.height = `${d2}px`;
          orb2.style.width = orb2.style.height = `${d2 * 1.035}px`;
        }
      }
      const ovlR = ovl.getBoundingClientRect();
      const orbR3 = orb.getBoundingClientRect();
      const iw = img.offsetWidth;
      const nw = img.naturalWidth, nh = img.naturalHeight;
      let topPad = 0, shownH = ih;
      if (nw && nh) {
        const sc = Math.min(img.clientWidth / nw, ih / nh);
        shownH = nh * sc;
        topPad = (ih - shownH) / 2;
      }
      const k3 = ovlR.width ? ovl.clientWidth / ovlR.width : 1;
      const ringL = (orbR3.left - ovlR.left) * k3;
      const ringR = (orbR3.right - ovlR.left) * k3;
      const ringT = (orbR3.top - ovlR.top) * k3;
      const ringB = (orbR3.bottom - ovlR.top) * k3;
      // 车身轮廓：横向约占图宽 10%–90%，纵向约占图片内容高 5.8%–85.5%
      const bodyL = iw * 0.1;
      const bodyR = iw * 0.9;
      const bodyT = topPad + shownH * 0.058;
      const bodyB = topPad + shownH * 0.855;

      const capH = this._wrap.querySelector(".cap.hood");
      const capT = this._wrap.querySelector(".cap.trunk");
      if (capH && capT) {
        const fit = (el, corridor) => {
          let h = el.offsetHeight;
          const kk = Math.max(0.78, Math.min(1, corridor / (h + 6)));
          if (kk < 0.995) {
            el.style.transform = `translate(-50%, 0) scale(${kk.toFixed(3)})`;
            el.style.transformOrigin = "50% 0";
            h *= kk;
          } else if (el.style.transform) {
            el.style.transform = "translate(-50%, 0)";
          }
          return h;
        };
        const gapHood = Math.max(10, Math.round(shownH * 0.042));
        const hH = fit(capH, bodyT - ringT - gapHood + 8);
        const tH = fit(capT, ringB - bodyB);
        let hTop = bodyT - gapHood - hH;
        if (hTop < ringT + 3) hTop = ringT + 3;
        let tTop = bodyB + 4;
        if (tTop + tH > ringB - 3) tTop = ringB - 3 - tH;
        capH.style.top = `${Math.round(hTop)}px`;
        capT.style.top = `${Math.round(tTop)}px`;
      }

      const midY = (bodyT + bodyB) / 2;
      const vGap = Math.max(6, Math.round(shownH * 0.012));
      this._wrap.querySelectorAll(".loc").forEach((card) => {
        const leftSide = card.classList.contains("lf") || card.classList.contains("lr");
        const front = card.classList.contains("lf") || card.classList.contains("rf");
        let w = card.offsetWidth;
        const corridor = leftSide ? bodyL - 4 - (ringL + 6) : ringR - 6 - (bodyR + 4);
        const kk = Math.max(0.6, Math.min(1, corridor / (w + 6)));
        if (kk < 0.995) {
          card.style.transform = `translate(-50%, -50%) scale(${kk.toFixed(3)})`;
          w *= kk;
        } else if (card.style.transform) {
          card.style.transform = "translate(-50%, -50%)";
        }
        let cx = leftSide ? bodyL - 4 - w / 2 : bodyR + 4 + w / 2;
        cx = leftSide ? Math.max(ringL + 6 + w / 2, cx) : Math.min(ringR - 6 - w / 2, cx);
        card.style.left = `${Math.round(cx)}px`;
        // 竖向对齐车门行：前排偏车头、后排偏车尾；卡片变高时自动让位，避免前后两张压在一起
        const h = card.offsetHeight * kk;
        let cy = bodyT + (bodyB - bodyT) * (front ? 0.34 : 0.66);
        if (front) cy = Math.min(cy, midY - vGap / 2 - h / 2);
        else cy = Math.max(cy, midY + vGap / 2 + h / 2);
        card.style.top = `${Math.round(cy)}px`;
      });

      // 引擎状态胶囊：贴在圆环左上角的圈外，跟着圆圈一起自适应
      const enp = this._wrap.querySelector(".enp");
      if (enp) {
        const cx0 = (ringL + ringR) / 2;
        const cy0 = (ringT + ringB) / 2;
        const rr = (ringR - ringL) / 2;
        // 胶囊尺寸跟着圆环大小缩放（窄屏收、宽屏略放大）
        const kp = Math.max(0.82, Math.min(1.1, rr / 190));
        enp.style.transform = `translate(-50%, -50%) scale(${kp.toFixed(3)})`;
        const w = enp.offsetWidth * kp, h = enp.offsetHeight * kp;
        let ex = cx0 - rr * 0.78;
        let ey = cy0 - rr * 0.78;
        // 两行胶囊整套落在圆环外：右下角到圆心距离 ≥ 半径 + 8
        for (let pass = 0; pass < 3; pass++) {
          const dx = ex + w / 2 - cx0;
          const dy = ey + h / 2 - cy0;
          const dd = Math.hypot(dx, dy) || 1;
          const target = rr + 8;
          if (dd < target) {
            const lam = target / dd;
            ex = cx0 + dx * lam - w / 2;
            ey = cy0 + dy * lam - h / 2;
          }
        }
        // 不超出 hero（否则会被裁切）
        ex = Math.max(6 - img.offsetLeft + w / 2, Math.min(hero.clientWidth - 6 - w / 2 - img.offsetLeft, ex));
        ey = Math.max(6 - (img.offsetTop + shift) + h / 2, ey);
        enp.style.left = `${Math.round(ex)}px`;
        enp.style.top = `${Math.round(ey)}px`;
        // 别压到主驾卡片
        const first = this._wrap.querySelector(".loc.lf");
        if (first) {
          const fb = first.getBoundingClientRect();
          const eb = enp.getBoundingClientRect();
          if (eb.bottom > fb.top - 4 && eb.left < fb.right + 6) {
            enp.style.top = `${Math.round(ey - (eb.bottom - fb.top + 8))}px`;
          }
        }
      }
    }
  }

  // 底座条：四轮胎压 + 同步（同步入口就是刷新按钮）
  _baseline(data, t, b) {
    const show = !b || this._items(b).some((it) => it.slot === "sync");
    if (!show) return "";
    const sync = this._syncChip(data, t);
    return sync ? `<div class="baseline solo">${sync}</div>` : "";
  }

  _syncChip(data, t) {
    const ent = data.id("btn_refresh");
    const pending = ent && this._pending.has(ent);
    const syncText = text(data.get("sync"));
    const bad = syncText ? /异常|error|失败/.test(syncText.toLowerCase()) : false;
    const when = relTime(
      attrs(data.get("data_time"), "when") || (data.get("data_time") ? data.get("data_time").state : ""),
      (this._hass.locale || {}).language,
    );
    const label = when ? when : syncText ? (bad ? t.syncBad : t.syncOk) : t.never;
    const inner = `${icon("refresh")}<span class="sdot${bad ? " bad" : ""}"></span><span class="stx">${esc(label)}</span>`;
    if (!ent) return `<span class="sync">${inner}</span>`;
    return `<button class="sync${pending ? " spin" : ""}" data-act="btn_refresh" data-ent="${esc(ent)}"
      data-dom="button" data-svc="press" data-label="${esc(t.refresh)}"
      title="${esc(t.syncTime + label)}">${inner}</button>`;
  }

  _imageUrl(data) {
    return this._imagePair(data).src;
  }

  _imagePair(data) {
    const cfg = this._config;
    // 集成同时给了 image_url（车辆官方 CDN 图）和 entity_picture（HA 代理），CDN 直链更稳
    const pic = (slot) => {
      const st = data.get(slot);
      if (!st) return null;
      const direct = attrs(st, "image_url");
      const proxy = attrs(st, "entity_picture") || null;
      const okDirect = direct && /^https?:\/\//.test(String(direct));
      // 脱敏模式优先走 HA 代理图，浏览器不直连第三方 CDN
      if (cfg.privacy) {
        // 代理图优先；万一代理失效，页面侧再回退直链，避免空白
        return { src: proxy || (okDirect ? direct : null), fb: proxy && okDirect ? direct : null };
      }
      return { src: okDirect ? direct : proxy, fb: okDirect && proxy ? proxy : null };
    };
    if (cfg.image === "custom" && cfg.image_url) return { src: cfg.image_url, fb: null };
    if (cfg.image && cfg.image !== "auto") {
      if (/^https?:\/\//.test(cfg.image)) return { src: cfg.image, fb: null };
      if (data.states[cfg.image]) {
        const st = data.states[cfg.image];
        const direct = attrs(st, "image_url");
        const proxy = attrs(st, "entity_picture") || null;
        const okDirect = direct && /^https?:\/\//.test(String(direct));
        if (cfg.privacy) return { src: proxy || (okDirect ? direct : null), fb: proxy && okDirect ? direct : null };
        return { src: okDirect ? direct : proxy, fb: okDirect && proxy ? proxy : null };
      }
      if (cfg.image === "overlook") return pic("image_overlook") || { src: null, fb: null };
      if (cfg.image === "3d") return pic("image_3d") || { src: null, fb: null };
      if (cfg.image === "side") return pic("image_side") || { src: null, fb: null };
    }
    return pic("image_overlook") || pic("image_3d") || pic("image_side") || { src: null, fb: null };
  }

  // ---------- 人车距离 / 手机指南针找车 ----------
  _ll(st) {
    if (!st || !st.attributes) return null;
    const lat = Number(st.attributes.latitude);
    const lon = Number(st.attributes.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    const raw = Number(st.attributes.gps_accuracy != null ? st.attributes.gps_accuracy : st.attributes.accuracy);
    const acc = Number.isFinite(raw) && raw > 0 && raw < 5000 ? raw : null;
    return { lat, lon, acc };
  }

  _findPoints(data) {
    const f = (this._config && this._config.find) || {};
    const phoneSt = f.phone && this._hass ? this._hass.states[f.phone] : null;
    const devSt = f.device && this._hass ? this._hass.states[f.device] : null;
    const carEnt = f.car || (data && data.id ? data.id("tracker") : "");
    const carSt = carEnt && this._hass ? this._hass.states[carEnt] : null;
    return {
      phone: this._ll(phoneSt),
      device: this._ll(devSt),
      car: this._ll(carSt),
      phoneSt,
      deviceSt: devSt,
      carSt,
      carEnt,
    };
  }

  _isPhoneView() {
    const ua = navigator.userAgent || "";
    if (/Android|iPhone|iPad|iPod|Mobile|HarmonyOS/i.test(ua)) return true;
    // iPadOS 13+ 默认伪装成 Macintosh，用触点数区分
    return /Macintosh/i.test(ua) && Number(navigator.maxTouchPoints) > 1;
  }

  _loginPoint() {
    const user = this._hass && this._hass.user;
    if (!user || !this._hass.states) return null;
    for (const st of Object.values(this._hass.states)) {
      if (!st || !String(st.entity_id || "").startsWith("person.")) continue;
      if (st.attributes && st.attributes.user_id === user.id) return this._ll(st);
    }
    return null;
  }

  _findLocation(p) {
    // 桌面端优先使用浏览器网络定位；手机端优先使用手机定位实体。
    if (!this._isPhoneView() && this._netLoc) return { coords: this._netLoc, source: "network" };
    if (p.phone) return { coords: p.phone, source: "phone" };
    if (this._netLoc) return { coords: this._netLoc, source: "network" };
    if (p.device) return { coords: p.device, source: "device" };
    const person = this._loginPoint();
    if (person) return { coords: person, source: "person" };
    return { coords: null, source: "" };
  }

  _findSourceText(source) {
    const en = isEn(this._hass);
    if (source === "phone") return en ? "phone location" : "手机定位";
    if (source === "network") return en ? "network location" : "网络定位";
    if (source === "device") return en ? "logged-in device" : "登录设备";
    if (source === "person") return en ? "logged-in user" : "登录用户";
    return "";
  }

  _requestNetworkLocation() {
    if (this._netLoc || this._netPending || !navigator.geolocation) return;
    this._netPending = true;
    this._netFailed = false;
    try {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this._netPending = false;
          const lat = Number(pos && pos.coords && pos.coords.latitude);
          const lon = Number(pos && pos.coords && pos.coords.longitude);
          if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
            this._netFailed = true;
            if (this._findOpen) this._refreshFind();
            return;
          }
          const acc = Number(pos && pos.coords && pos.coords.accuracy);
          this._netLoc = { lat, lon, acc: Number.isFinite(acc) && acc > 0 ? acc : null };
          if (this._findOpen) this._refreshFind();
          else this._render(true);
        },
        () => {
          this._netPending = false;
          this._netFailed = true;
          if (this._findOpen) this._refreshFind();
        },
        { enableHighAccuracy: false, timeout: 12000, maximumAge: 120000 },
      );
    } catch { /* ignore */ }
  }

  _refreshFind() {
    if (this._findOpen && this._hass) {
      this._paint(resolve(this._hass, this._config));
      this._updateFind();
    }
  }

  _distanceM(a, b) {
    if (!a || !b) return null;
    const R = 6371008.8;
    const rad = (d) => (d * Math.PI) / 180;
    const dLat = rad(b.lat - a.lat);
    const dLon = rad(b.lon - a.lon);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  _bearing(a, b) {
    if (!a || !b) return null;
    const rad = (d) => (d * Math.PI) / 180;
    const deg = (r) => (r * 180) / Math.PI;
    const y = Math.sin(rad(b.lon - a.lon)) * Math.cos(rad(b.lat));
    const x = Math.cos(rad(a.lat)) * Math.sin(rad(b.lat)) - Math.sin(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(rad(b.lon - a.lon));
    return (deg(Math.atan2(y, x)) + 360) % 360;
  }

  _distText(m) {
    if (m == null) return "—";
    if (m < 1000) return m < 10 ? "就在附近" : `${Math.round(m)} m`;
    return `${(m / 1000).toFixed(m < 10000 ? 1 : 0)} km`;
  }

  _placeChip(b, data) {
    const it = this._items(b).find((x) => {
      const def = this._itemDef(x);
      return def && def.kind === "place";
    });
    if (!it) return "";
    const p = this._findPoints(data);
    let atHome = null;
    const zone = this._hass && this._hass.states ? this._hass.states["zone.home"] : null;
    const c = zone && this._ll(zone);
    if (c) {
      const r = Number(zone.attributes && zone.attributes.radius);
      atHome = p.car ? this._distanceM(p.car, c) <= (Number.isFinite(r) && r > 0 ? r : 100) : null;
    }
    if (atHome == null && p.carSt) {
      const st = String(p.carSt.state || "").toLowerCase();
      if (st === "home") atHome = true;
      else if (st === "not_home" || st === "away") atHome = false;
    }
    if (atHome == null) return "";
    const label = isEn(this._hass) ? (atHome ? "Home" : "Away") : (atHome ? "在家" : "外出");
    return `<span class="door pchip ${atHome ? "home" : "away"}" data-place title="${esc(isEn(this._hass) ? "Based on zone.home and vehicle location" : "根据家庭区域与车辆定位计算")}">${icon(atHome ? "home" : "car")}<span class="addr">${label}</span></span>`;
  }

  _findChip(data) {
    if (!data) return "";
    const p = this._findPoints(data);
    const loc = this._findLocation(p);
    const d = this._distanceM(loc.coords, p.car);
    const label = isEn(this._hass) ? "Find car" : "找车";
    const dist = d == null ? "" : ` ${esc(this._distText(d))}`;
    const src = this._findSourceText(loc.source);
    const hint = isEn(this._hass) ? "Open find-car panel" : "打开找车面板";
    const tip = src ? `${hint} · ${src}` : hint;
    return `<span class="door fchip" data-find role="button" tabindex="0" title="${esc(tip)}">${icon("pin")}<span class="addr">${label}${dist}</span></span>`;
  }

  _findModal(data) {
    const p = this._findPoints(data);
    const loc = this._findLocation(p);
    const d = this._distanceM(loc.coords, p.car);
    const bearing = this._bearing(loc.coords, p.car);
    const ok = d != null && bearing != null;
    const title = isEn(this._hass) ? "Find my car" : "找车";
    const en = isEn(this._hass);
    const close = `<button class="fx" data-findclose type="button" aria-label="${esc(en ? "Close" : "关闭")}">✕</button>`;
    if (!ok) {
      let note = en ? "Unable to get a location for this device or the car." : "未取得可用于定位的坐标。";
      if (!p.car) note = en ? "The car location entity has no latitude / longitude." : "车辆定位实体没有 latitude / longitude 属性。";
      else if (!loc.coords && this._netPending) note = en ? "Getting network location…" : "正在获取网络位置…";
      else note = en ? "Phone, network and logged-in-device locations are unavailable. Check the find-car entities." : "手机、网络和登录设备定位均不可用，请检查找车定位实体。";
      if (p.car) {
        // 有车坐标时仍给一张只标车的图，比纯文字更好定位
        return `<div class="findmodal" role="dialog" aria-label="${esc(title)}">${close}
          <div class="fmapview">${this._findMapPane()}</div>
          <div class="finfo"><div class="fhead">${icon("pin")}${esc(title)}</div>
            <div class="fnote">${esc(note)}</div></div></div>`;
      }
      return `<div class="findmodal" role="dialog" aria-label="${esc(title)}">${close}
        <div class="fhead">${icon("pin")}${esc(title)}</div>
        <div class="fnote">${note}</div></div>`;
    }
    return `<div class="findmodal" role="dialog" aria-label="${esc(title)}">${close}
      <div class="fmapview">${this._findMapPane()}</div>
      <div class="finfo">
        <div class="fhead">${icon("pin")}${esc(title)}</div>
        <div class="fdist"><b data-fdist>${esc(this._distText(d))}</b><span>${en ? "away" : "距离"}</span></div>
        <div class="fcomp"><i class="frose" data-frose><i class="fring"></i><span class="fn" data-fn>N</span></i><i class="farrow" data-farrow>${icon("nav")}</i><span class="fcarpin" data-fcarpin hidden>${icon("car")}</span><span class="fdot"></span></div>
        <div class="ffoot"><button class="fperm" data-findperm type="button">${icon("gauge")}${en ? "Calibrate compass" : "校准指南针"}</button>
          <span class="facc" data-fstat>${esc(en ? "Compass" : "指南针")} · ${esc(this._findSourceText(loc.source))}</span></div>
        <div class="fnote" data-fhint>${esc(this._findHint(loc.source))}</div>
      </div></div>`;
  }

  _findHint(src) {
    const en = isEn(this._hass);
    if (src === "phone") {
      return en
        ? "Map tiles from AutoNavi, loaded only while this panel is open; the line is straight-line distance. The ring turns with the phone so N always points north."
        : "地图瓦片来自高德，只在打开时加载，连线是直线距离；罗盘环随手机转动，N 始终指向正北。";
    }
    return en
      ? "Map tiles from AutoNavi, loaded only while this panel is open; the line is straight-line distance. North is up; the arrow points at the car."
      : "地图瓦片来自高德，只在打开时加载，连线是直线距离；北向朝上，箭头指向车辆。";
  }

  _findMapPane() {
    return `<div class="fmap" data-fmap>
        <div class="ftiles" data-ftiles></div>
        <svg class="flink" data-flink aria-hidden="true"><line data-fline x1="0" y1="0" x2="0" y2="0"></line></svg>
        <span class="faccring" data-faccring hidden></span>
        <span class="fpin you" data-fyou hidden></span>
        <span class="fpin car" data-fcar hidden>${icon("car")}</span>
        <span class="fattr">© 高德地图</span>
        <div class="fmapnote" data-fmapnote></div>
      </div>`;
  }

  // 高德瓦片是 GCJ-02（火星坐标），HA 上报的是 WGS-84；直接叠会偏几百米，所以地图上统一先纠偏
  _wgs2gcj(lat, lon) {
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return { lat, lon };
    // 境外（含台港澳部分区域）不偏移，直接返回
    if (lon < 72.004 || lon > 137.8347 || lat < 0.8293 || lat > 55.8271) return { lat, lon };
    const a = 6378245.0;
    const ee = 0.00669342162296594323;
    const dLat = (x, y) => {
      let r = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
      r += ((20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2) / 3;
      r += ((20 * Math.sin(y * Math.PI) + 40 * Math.sin((y / 3) * Math.PI)) * 2) / 3;
      r += ((160 * Math.sin((y / 12) * Math.PI) + 320 * Math.sin((y * Math.PI) / 30)) * 2) / 3;
      return r;
    };
    const dLon = (x, y) => {
      let r = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
      r += ((20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2) / 3;
      r += ((20 * Math.sin(x * Math.PI) + 40 * Math.sin((x / 3) * Math.PI)) * 2) / 3;
      r += ((150 * Math.sin((x / 12) * Math.PI) + 300 * Math.sin((x / 30) * Math.PI)) * 2) / 3;
      return r;
    };
    const rad = (d) => (d * Math.PI) / 180;
    let dlat = dLat(lon - 105, lat - 35);
    let dlon = dLon(lon - 105, lat - 35);
    const srad = Math.sin(rad(lat));
    const magic = 1 - ee * srad * srad;
    const sq = Math.sqrt(magic);
    dlat = (dlat * 180) / (((a * (1 - ee)) / (magic * sq)) * Math.PI);
    dlon = (dlon * 180) / ((a / sq) * Math.cos(rad(lat)) * Math.PI);
    return { lat: lat + dlat, lon: lon + dlon };
  }

  // 高德栅格瓦片（webrd 子域，无需 Key），只按两点取景静态绘制，交互仍交给卡片本身
  _paintFindMap(force) {
    if (!this._findOpen || !this._findData) return;
    const modal = this._card ? this._card.querySelector(".findmodal") : null;
    if (!modal) return;
    const box = modal.querySelector("[data-fmap]");
    const tiles = box ? box.querySelector("[data-ftiles]") : null;
    if (!box || !tiles) return;
    const w = Math.round(box.clientWidth);
    const h = Math.round(box.clientHeight);
    if (w < 60 || h < 60) return;
    const p = this._findPoints(this._findData);
    const loc = this._findLocation(p);
    const me = loc.coords;
    const car = p.car;
    if (!me && !car) return;
    const meG = me ? this._wgs2gcj(me.lat, me.lon) : null;
    const carG = car ? this._wgs2gcj(car.lat, car.lon) : null;
    const en = isEn(this._hass);
    const proj = (lat, lng, z) => {
      const n = 256 * Math.pow(2, z);
      const x = ((lng + 180) / 360) * n;
      const s = Math.min(Math.max(Math.sin((lat * Math.PI) / 180), -0.9999), 0.9999);
      const y = (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * n;
      return { x, y };
    };
    let z = 18;
    if (meG && carG) {
      // 上半屏整块都是地图，留边收窄并把层级顶到 z18，能看清门牌/楼栋
      const pad = Math.min(w, h) * 0.13;
      for (z = 18; z >= 3; z--) {
        const a = proj(meG.lat, meG.lon, z);
        const b = proj(carG.lat, carG.lon, z);
        if (Math.abs(a.x - b.x) <= Math.max(40, w - 2 * pad) && Math.abs(a.y - b.y) <= Math.max(40, h - 2 * pad)) break;
      }
      z = Math.max(3, Math.min(18, z));
    }
    const c0 = meG && carG ? { lat: (meG.lat + carG.lat) / 2, lon: (meG.lon + carG.lon) / 2 } : (carG || meG);
    const ctr = proj(c0.lat, c0.lon, z);
    const tl = { x: ctr.x - w / 2, y: ctr.y - h / 2 };
    const sig = [w, h, z, tl.x.toFixed(1), tl.y.toFixed(1)].join("|");
    const n = Math.pow(2, z);
    if (force || sig !== this._mapSig) {
      this._mapSig = sig;
      const parts = [];
      const tx0 = Math.floor(tl.x / 256);
      const tx1 = Math.floor((tl.x + w - 1) / 256);
      const ty0 = Math.floor(tl.y / 256);
      const ty1 = Math.floor((tl.y + h - 1) / 256);
      for (let ty = ty0; ty <= ty1; ty++) {
        if (ty < 0 || ty >= n) continue;
        for (let tx = tx0; tx <= tx1; tx++) {
          const wx = ((tx % n) + n) % n;
          const url = `https://webrd0${(wx % 4) + 1}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=${wx}&y=${ty}&z=${z}`;
          parts.push(`<img src="${url}" alt="" draggable="false" loading="eager" style="left:${Math.round(tx * 256 - tl.x)}px;top:${Math.round(ty * 256 - tl.y)}px">`);
        }
      }
      tiles.innerHTML = parts.join("");
      // 瓦片子域偶尔抽风会整块空白：失败时换子域重试两次，避免地图缺角
      tiles.querySelectorAll("img").forEach((img) => {
        img.addEventListener("error", function retry() {
          const n = Number(this.dataset.retry || 0);
          if (n >= 2) return;
          this.dataset.retry = String(n + 1);
          const rnd = 1 + Math.floor(Math.random() * 4);
          this.src = this.src.replace(/webrd0[1-4]/, "webrd0" + rnd);
        });
      });
    }
    const at = (pt) => {
      const q = proj(pt.lat, pt.lon, z);
      return { x: q.x - tl.x, y: q.y - tl.y };
    };
    let youP = meG ? at(meG) : null;
    const youP0 = youP;
    const carP = carG ? at(carG) : null;
    if (youP && carP && Math.abs(youP.x - carP.x) < 26 && Math.abs(youP.y - carP.y) < 26) {
      youP = { x: youP.x - 16, y: youP.y - 12 };
    }
    // GPS 精度圈：按米换算成当前层级的像素半径，直观看「大概在这一圈内」
    const ringEl = box.querySelector("[data-faccring]");
    if (ringEl) {
      const acc = me && me.acc ? me.acc : null;
      if (me && acc && acc < 400) {
        const pxPerM = (256 * Math.pow(2, z)) / (40075016.686 * Math.cos((me.lat * Math.PI) / 180));
        const r = Math.max(9, Math.min(90, acc * pxPerM));
        ringEl.hidden = false;
        ringEl.style.left = Math.round(youP0.x) + "px";
        ringEl.style.top = Math.round(youP0.y) + "px";
        ringEl.style.width = ringEl.style.height = Math.round(r * 2) + "px";
      } else {
        ringEl.hidden = true;
      }
    }
    const youEl = box.querySelector("[data-fyou]");
    const carEl = box.querySelector("[data-fcar]");
    const lineEl = box.querySelector("[data-fline]");
    const linkEl = box.querySelector("[data-flink]");
    const place = (el, pt) => {
      if (!el) return;
      el.hidden = !pt;
      if (pt) {
        el.style.left = Math.round(pt.x) + "px";
        el.style.top = Math.round(pt.y) + "px";
      }
    };
    place(youEl, youP);
    place(carEl, carP);
    if (lineEl && linkEl) {
      const show = !!(youP && carP);
      linkEl.style.display = show ? "" : "none";
      if (show) {
        lineEl.setAttribute("x1", Math.round(youP.x));
        lineEl.setAttribute("y1", Math.round(youP.y));
        lineEl.setAttribute("x2", Math.round(carP.x));
        lineEl.setAttribute("y2", Math.round(carP.y));
      }
    }
    const note = modal.querySelector("[data-fmapnote]");
    if (note) {
      const you = `<span class="lg you"><i></i>${esc(en ? "You" : "你")}</span>`;
      const carLg = `<span class="lg car">${icon("car")}${esc(en ? "Car" : "车")}</span>`;
      let txt = "";
      const accTxt = me && me.acc && me.acc < 400 ? (en ? ` · ±${Math.round(me.acc)} m` : ` · 精度 ±${Math.round(me.acc)} m`) : "";
      if (me && car) txt = `<span class="lgd">${esc((en ? "Straight line " : "直线 ") + this._distText(this._distanceM(me, car)) + accTxt)}</span>`;
      else if (car) txt = `<span class="lgd">${esc(en ? "Car only — no device location" : "仅车辆定位，本机没有可用定位")}</span>`;
      else txt = `<span class="lgd">${esc(en ? "Device only — car coords missing" : "仅本机定位，车辆坐标缺失")}</span>`;
      note.innerHTML = (me ? you : "") + (car ? carLg : "") + txt;
    }
  }

  _bindOrientation(force) {
    if (this._orientBound && !force) return;
    if (this._orientHandler) {
      window.removeEventListener("deviceorientationabsolute", this._orientHandler, true);
      window.removeEventListener("deviceorientation", this._orientHandler, true);
      window.removeEventListener("deviceorientation", this._orientHandler, false);
    }
    this._orientHandler = this._orientHandler || ((ev) => this._onDeviceOrient(ev));
    // 部分 iOS WebView 只认 ondeviceorientation 属性，监听与属性同时挂上更稳
    try { if (!window.ondeviceorientation) window.ondeviceorientation = this._orientHandler; } catch { /* ignore */ }
    window.addEventListener("deviceorientationabsolute", this._orientHandler, true);
    window.addEventListener("deviceorientation", this._orientHandler, true);
    window.addEventListener("deviceorientation", this._orientHandler, false);
    this._orientBound = true;
  }

  _startGpsHeading() {
    if (this._gpsWatch != null || !navigator.geolocation) return;
    try {
      this._gpsWatch = navigator.geolocation.watchPosition((pos) => {
        const h = pos && pos.coords && pos.coords.heading;
        if (!Number.isFinite(h) || h < 0) return;
        if (this._headingSrc === "compass") return;
        this._heading = h;
        this._headingSrc = "gps";
        if (this._findOpen) this._updateFind();
      }, () => {}, { enableHighAccuracy: true, maximumAge: 1000, timeout: 15000 });
    } catch { /* ignore */ }
  }

  _stopGpsHeading() {
    if (this._gpsWatch != null && navigator.geolocation) {
      try { navigator.geolocation.clearWatch(this._gpsWatch); } catch { /* ignore */ }
    }
    this._gpsWatch = null;
  }

  _updateFind() {
    if (!this._findOpen || !this._findData) return;
    const p = this._findPoints(this._findData);
    const loc = this._findLocation(p);
    const d = this._distanceM(loc.coords, p.car);
    const bearing = this._bearing(loc.coords, p.car);
    if (d == null || bearing == null) return;
    const root = this._card;
    const modals = root ? root.querySelectorAll(".findmodal") : [];
    const modal = modals.length ? modals[modals.length - 1] : null;
    const q = (sel) => (modal ? modal.querySelector(sel) : root && root.querySelector(sel));
    const distEl = q("[data-fdist]");
    const arrow = q("[data-farrow]");
    const rose = q("[data-frose]");
    const fn = q("[data-fn]");
    const stat = q("[data-fstat]");
    if (distEl) distEl.textContent = this._distText(d);
    const h = this._heading == null ? 0 : this._heading;
    const rel = this._heading == null ? bearing : (bearing - this._heading + 360) % 360;
    if (arrow) arrow.style.transform = `rotate(${rel}deg)`;
    // 车标贴在罗盘环上、落在箭头指向的位置，图标本身保持正立
    const carpin = q("[data-fcarpin]");
    if (carpin) {
      const ring = q(".fcomp");
      const radius = ring ? Math.max(20, ring.clientWidth / 2 - 13) : 0;
      const rad = (rel * Math.PI) / 180;
      carpin.hidden = false;
      carpin.style.left = `calc(50% + ${(Math.sin(rad) * radius).toFixed(1)}px)`;
      carpin.style.top = `calc(50% - ${(Math.cos(rad) * radius).toFixed(1)}px)`;
    }
    // 罗盘环整体反转手机朝向，让 N 实时停在正北；N 字再反向抵消，保持正立
    if (rose) rose.style.transform = `rotate(${-h}deg)`;
    if (fn) fn.style.transform = `translateX(-50%) rotate(${h}deg)`;
    if (stat) {
      const en = isEn(this._hass);
      const src = this._findSourceText(loc.source);
      const base = this._heading == null
        ? (en ? "Compass off" : "指南针未启用")
        : this._headingSrc === "gps"
          ? (en ? "Moving direction" : "移动方向")
          : (en ? "Compass" : "指南针");
      stat.textContent = src ? `${base} · ${src}` : base;
    }
  }

  _smoothCompass(raw) {
    const norm = (v) => ((v % 360) + 360) % 360;
    const shortest = (v) => ((v + 540) % 360) - 180;
    raw = norm(raw);
    if (this._heading == null || this._headingSrc !== "compass") {
      this._heading = raw;
      this._headingSrc = "compass";
      this._headingSamples = [raw];
      this._headingSpike = 0;
      return this._heading;
    }
    const ref = this._heading;
    const deltaRaw = shortest(raw - ref);
    // 单帧超过 40° 的大跳先当噪点，连续两帧才认作真实转向
    if (Math.abs(deltaRaw) > 40) {
      this._headingSpike = (this._headingSpike || 0) + 1;
      if (this._headingSpike < 2) return ref;
    } else {
      this._headingSpike = 0;
    }
    const buf = (this._headingSamples || []).concat(raw);
    while (buf.length > 5) buf.shift();
    this._headingSamples = buf;
    // 按时间顺序解缠，再取中位数，过滤 ±20° 级别的指南针噪声
    let prev = ref;
    const vals = buf.map((a) => {
      prev += shortest(a - prev);
      return prev;
    });
    vals.sort((a, b) => a - b);
    const med = vals[Math.floor(vals.length / 2)];
    const delta = med - ref;
    if (Math.abs(delta) < 0.5) return ref;
    // 小抖动慢跟、大转向快跟
    const k = Math.abs(delta) > 18 ? 0.38 : 0.05;
    this._heading = norm(ref + delta * k);
    return this._heading;
  }

  _onDeviceOrient(ev) {
    if (!ev || ev === this._lastOrientEv) return;
    this._lastOrientEv = ev;
    const fin = (v) => {
      if (v === null || v === undefined || v === "") return null;
      const n = typeof v === "number" ? v : Number(v);
      return Number.isFinite(n) ? n : null;
    };
    let h = null;
    const compass = fin(ev.webkitCompassHeading);
    if (compass != null) {
      h = compass;
    } else {
      const alpha = fin(ev.alpha);
      if (alpha == null) return;
      // alpha 是设备绕 z 轴的绝对/相对转角，屏幕顶部朝向 = 360 - alpha
      h = (360 - alpha + 360) % 360;
    }
    // 横屏时把「设备顶部」换算成「屏幕顶部」
    let screenAngle = 0;
    try {
      if (screen.orientation && Number.isFinite(screen.orientation.angle)) screenAngle = screen.orientation.angle;
      else if (Number.isFinite(window.orientation)) screenAngle = window.orientation;
    } catch {
      screenAngle = 0;
    }
    h = (h + screenAngle + 360) % 360;
    h = ((h % 360) + 360) % 360;
    this._compassGot = true;
    clearTimeout(this._compassTimer);
    this._stopGpsHeading();
    this._smoothCompass(h);
    // iOS WKWebView 的 rAF 在个别场景会被节流，方向事件里直接刷新
    if (this._findOpen) this._updateFind();
  }

  _openFind() {
    this._findOpen = true;
    this._heading = null;
    this._headingSrc = null;
    this._headingSamples = [];
    this._headingSpike = 0;
    this._compassGot = false;
    this._lastOrientEv = null;
    this._sig = "";
    const pts = this._findData ? this._findPoints(this._findData) : { phone: null };
    if (!this._isPhoneView() || !pts.phone) this._requestNetworkLocation();
    if (this._hass) this._paint(resolve(this._hass, this._config));
    else this._render(true);
  }

  _closeFind() {
    this._findOpen = false;
    this._stopGpsHeading();
    cancelAnimationFrame(this._headingRaf);
    this._sig = "";
    const m = this._card && this._card.querySelector(".findmodal");
    if (m) m.remove();
    this._render(true);
  }

  async _askCompass() {
    try {
      if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
        const r = await DeviceOrientationEvent.requestPermission();
        if (r !== "granted") {
          this._showToast(isEn(this._hass) ? "Motion permission denied" : "未获得指南针权限", "err");
          return false;
        }
      }
      // iOS 授权后再绑定一次，旧监听在授权前注册时可能收不到事件
      this._bindOrientation(true);
      this._compassGot = false;
      this._heading = null;
      this._headingSrc = null;
      this._headingSamples = [];
      this._headingSpike = 0;
      this._lastOrientEv = null;
      if (this._findOpen) this._updateFind();
      this._showToast(isEn(this._hass) ? "Compass on — turn your phone" : "指南针已开启，缓慢转动手机", "ok");
      clearTimeout(this._compassTimer);
      this._compassTimer = setTimeout(() => {
        if (this._findOpen && !this._compassGot) {
          this._startGpsHeading();
          this._showToast(isEn(this._hass) ? "No compass data — trying GPS heading" : "未收到指南针，已尝试用移动方向", "err");
          if (this._findOpen) this._updateFind();
        }
      }, 1800);
      return true;
    } catch {
      this._showToast(isEn(this._hass) ? "Compass unavailable" : "此设备不支持指南针", "err");
      return false;
    }
  }

  _metaLocation(b, data, t) {
    const it = this._items(b).find((x) => {
      const def = this._itemDef(x);
      return def && def.kind === "location";
    });
    if (!it) return "";
    return this._location(data, t, it.entity || "");
  }

  _heroImageEnt(b, _data) {
    const it = this._items(b).find((x) => {
      const def = this._itemDef(x);
      return def && def.kind === "image";
    });
    return it ? it.entity || "" : "";
  }

  _energy(data, t, b) {
    const items = this._items(b);
    const gauges = [];
    const stats = [];
    for (const it of items) {
      const def = this._itemDef(it);
      const st = this._itemState(it, data);
      if (!st) continue;
      const label = this._itemLabel(it, def, t);
      const ent = this._itemEnt(it, data);
      const unit = attrs(st, "unit_of_measurement") || it.unit || "";
      const numv = num(st);
      const kind = def ? def.kind : "stat";
      if ((kind === "pct" || kind === "range" || kind === "odo") && gauges.length < 2 && numv != null) {
        const full = def && def.full ? def.full : 1000;
        const pct = kind === "pct" ? clamp(numv, 2, 100) : clamp((numv / full) * 100, 2, 100);
        gauges.push(
          this._gauge({
            pct,
            label: this._itemShowLabel(it) ? label : "",
            value: kind === "pct" ? Math.round(numv) : fmtNum(numv),
            unit: kind === "pct" ? "%" : unit || "km",
            ic: this._itemIcon(it, def),
          }),
        );
        continue;
      }
      if (numv == null && kind !== "stat") continue;
      stats.push(
        `<span class="sstat" data-more="${esc(ent)}">${this._itemShowLabel(it) ? `<i>${esc(label)}</i>` : ""}` +
          `<b>${numv == null ? esc(String(st.state)) : fmtNum(numv)}</b><span>${esc(unit)}</span></span>`,
      );
    }
    if (!gauges.length && !stats.length) return "";
    return `${gauges.length ? `<div class="energy">${gauges.join(`<span class="egdiv"></span>`)}</div>` : ""}
      ${stats.length ? `<div class="substats">${stats.join("")}</div>` : ""}`;
  }

  // 环形仪表：SVG 描边弧，从 12 点起顺时针
  _gauge(o) {
    const C = 2 * Math.PI * 44;
    const pct = clamp(Number(o.pct) || 0, 0, 100);
    const arc = (C * pct) / 100;
    return `<div class="gauge">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle class="gt" cx="50" cy="50" r="44"/>
        <circle class="gp" cx="50" cy="50" r="44"
          stroke-dasharray="${arc.toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 50 50)"/>
      </svg>
      <div class="gv"><span class="gl">${icon(o.ic)}${esc(o.label)}</span>
        <span class="gn"><b>${esc(String(o.value))}</b>${o.unit ? `<i>${esc(o.unit)}</i>` : ""}</span></div>
    </div>`;
  }

  _actions(data, t, running, offline, compact, b) {
    const cfg = this._config;
    const tiles = [];
    const pills = [];
    const hold = (key) => (cfg.confirm.includes(key) ? ' data-hold="1"' : "");
    const lockNorm = normLock(data.get("lock"));

    for (const it of this._items(b)) {
      const def = this._itemDef(it);
      const ent = this._itemEnt(it, data);
      const st = this._itemState(it, data);
      if (!ent || !st) continue;
      const kind = def ? def.kind : ent.split(".")[0];
      if (kind === "select") {
        if (!compact) pills.push(this._selectPill({ key: it.slot || ent, ent, label: this._itemLabel(it, def, t) }));
        continue;
      }
      const slot = it.slot || "";
      if (slot === "sw_va" || slot === "sw_light") {
        if (!compact) {
          pills.push(this._pill({
            key: slot, ent, ic: this._itemIcon(it, def), label: this._itemLabel(it, def, t),
            dom: "homeassistant", svc: "toggle", hold, offline,
          }));
        }
        continue;
      }
      let label = this._itemLabel(it, def, t);
      let ic = this._itemIcon(it, def);
      let cls = "";
      let dom = "homeassistant";
      let svc = "toggle";
      let art = null;
      let wide = false;
      if (slot === "btn_unlock") {
        label = it.label || t.unlock;
        ic = "unlock";
        dom = "button";
        svc = "press";
        cls = lockNorm === "unlocked" ? "hot" : "";
      } else if (slot === "btn_lock") {
        label = it.label || t.lockDown;
        ic = "lock";
        dom = "button";
        svc = "press";
        cls = lockNorm === "locked" ? "on" : "";
      } else if (slot === "sw_engine") {
        label = it.label || (running ? t.engineStop : t.engine);
        ic = "power";
        cls = running ? "on" : "";
      } else if (slot === "sw_honk") {
        label = it.label || t.honk;
        ic = "megaphone";
      } else if (!def) {
        const dom0 = ent.split(".")[0];
        if (dom0 === "button" || dom0 === "input_button") {
          dom = "button";
          svc = "press";
        } else if (dom0 === "scene" || dom0 === "script") {
          dom = dom0;
          svc = "turn_on";
        } else if (dom0 === "select") {
          if (compact) continue;
          pills.push(this._selectPill({ key: ent, ent, label }));
          continue;
        }
      }
      const artSpec = artForSlot(slot);
      if (artSpec) {
        art = artSpec.src;
        wide = artSpec.wide;
      }
      tiles.push(this._tile({
        key: slot || ent, ent, ic, label, cls, dom, svc, hold, offline, art, wide,
      }));
    }

    if (!tiles.length && !pills.length) return "";
    return `${tiles.length ? `<div class="acts">${tiles.join("")}</div>` : ""}
      ${pills.length ? `<div class="pills">${pills.join("")}</div>` : ""}`;
  }

  _tile(o) {
    const t = dict(this._hass);
    const pending = this._pending.has(o.ent);
    const disabled = o.offline ? " off" : "";
    return `<button class="tile${o.cls ? " " + o.cls : ""}${disabled}${pending ? " pending" : ""}"
      data-act="${esc(o.key)}" data-ent="${esc(o.ent)}" data-dom="${esc(o.dom)}" data-svc="${esc(o.svc)}"
      data-label="${esc(o.label)}"${o.hold(o.key)} role="button" tabindex="0"
      aria-label="${esc(o.label + "，" + t.holdHint)}">
      <span class="orb${o.art ? " art" : ""}"><svg class="hring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47"/></svg>${o.art
        ? `<img class="glyph${o.wide ? " wide" : ""}" src="${o.art}" alt="" aria-hidden="true" draggable="false" />`
        : icon(o.ic)}</span>
      <span class="lbl">${esc(o.label)}</span></button>`;
  }

  // 下拉型胶囊：本体是一条 pill，原生 select 透明铺满，点开即系统选择器
  _selectPill(o) {
    const st = this._hass && this._hass.states[o.ent] ? this._hass.states[o.ent] : null;
    const opts = (st && st.attributes && st.attributes.options) || [];
    const cur = st ? String(st.state) : "";
    return `<label class="pill selpill" data-ent="${esc(o.ent)}">
      <span class="sl">${esc(o.label)}</span><b>${esc(cur)}</b><i class="caret">▾</i>
      <select data-sel="${esc(o.ent)}" aria-label="${esc(o.label)}">
        ${opts.map((v) => `<option value="${esc(v)}"${v === cur ? " selected" : ""}>${esc(v)}</option>`).join("")}
      </select></label>`;
  }

  _pill(o) {
    const pending = this._pending.has(o.ent);
    return `<button class="pill${o.offline ? " off" : ""}${pending ? " pending" : ""}"
      data-act="${esc(o.key)}" data-ent="${esc(o.ent)}" data-dom="${esc(o.dom)}" data-svc="${esc(o.svc)}"
      data-label="${esc(o.label)}"${o.hold(o.key)} role="button" tabindex="0">
      ${icon(o.ic)}<span>${esc(o.label)}</span></button>`;
  }

  _imgFrom(ent, fallback) {
    if (!ent || !this._hass || !this._hass.states[ent]) return fallback;
    const st = String(this._hass.states[ent].state || "");
    return /^https?:/i.test(st) ? st : fallback;
  }

  // 自定义实体模块：任意实体按顺序排进版式
  _customBlock(b, t, data) {
    const rows = [];
    for (const it of this._items(b)) {
      const ent = this._itemEnt(it, data);
      if (!ent) continue;
      const def = this._itemDef(it);
      const v = this._itemText(it, data, t);
      if (!v.st) continue;
      const label = this._itemShowLabel(it) ? v.labelText : "";
      const ic = this._itemIcon(it, def);
      rows.push(`<div class="cblock" data-more="${esc(ent)}">${icon(ic)}${label ? `<span class="cl">${esc(label)}</span>` : ""}
        <b>${esc(v.value)}</b>${v.unit ? `<i>${esc(v.unit)}</i>` : ""}</div>`);
    }
    return rows.join("");
  }

  _tires(data, _t) {
    const defs = [
      { slot: "tp_lf", sslot: "tps_lf", label: isEn(this._hass) ? "LF" : "左前" },
      { slot: "tp_rf", sslot: "tps_rf", label: isEn(this._hass) ? "RF" : "右前" },
      { slot: "tp_lr", sslot: "tps_lr", label: isEn(this._hass) ? "LR" : "左后" },
      { slot: "tp_rr", sslot: "tps_rr", label: isEn(this._hass) ? "RR" : "右后" },
    ];
    const cells = [];
    for (const d of defs) {
      const st = data.get(d.slot);
      if (isBad(st)) continue;
      const v = num(st);
      const unit = attrs(st, "unit_of_measurement") || "kPa";
      const warn = normTire(data.get(d.sslot)) === "warn";
      cells.push(`<span class="tc${warn ? " warn" : ""}" data-more="${esc(data.id(d.slot))}">
        ${icon("tire")}<b>${v == null ? "—" : fmtNum(v)}</b><small>${esc(unit)}</small></span>`);
    }
    if (!cells.length) return "";
    return `<div class="tread">${cells.join("")}</div>`;
  }

  _doors(data, t, b) {
    const chips = [];
    for (const it of this._items(b)) {
      const def = this._itemDef(it);
      const st = this._itemState(it, data);
      if (!st) continue;
      const label = this._itemLabel(it, def, t);
      const kind = def ? def.kind : "custom";
      if (kind === "door" || kind === "cap") {
        if (isBad(st)) continue;
        if (normOpen(st) !== "open") continue;
        chips.push(`<span class="door open" data-more="${esc(this._itemEnt(it, data))}">${icon(this._itemIcon(it, def))}${esc(label)} · ${esc(t.open)}</span>`);
      } else if (kind === "tire") {
        const v = num(st);
        if (v == null) continue;
        const warn = v < 190 || v > 300;
        chips.push(`<span class="door${warn ? " open" : ""}" data-more="${esc(this._itemEnt(it, data))}">${icon(this._itemIcon(it, def))}${esc(label)} · ${fmtNum(v)} ${esc(attrs(st, "unit_of_measurement") || "kPa")}</span>`);
      } else {
        const v = this._itemText(it, data, t);
        if (!v.value) continue;
        const lab = this._itemShowLabel(it) ? `${esc(label)} · ` : "";
        chips.push(`<span class="door" data-more="${esc(this._itemEnt(it, data))}">${icon(this._itemIcon(it, def))}${lab}${esc(v.value)}${v.unit ? " " + esc(v.unit) : ""}</span>`);
      }
    }
    return chips.length ? `<div class="doors">${chips.join("")}</div>` : "";
  }

  _alerts(data, t, b) {
    const rows = [];
    for (const it of this._items(b)) {
      const def = this._itemDef(it);
      const st = this._itemState(it, data);
      if (!st) continue;
      const label = this._itemLabel(it, def, t);
      const raw = String(st.state || "").trim();
      const empty =
        !raw || raw === "0" || /^(none|no|无|正常|no alerts)$/i.test(raw);
      if (empty) continue;
      if (def && def.kind === "alert") {
        rows.push(`<div class="alert" data-more="${esc(this._itemEnt(it, data))}">${icon("warning")}
          <b>${esc(label)}</b><span class="amsg">${esc(raw)}</span></div>`);
      } else {
        rows.push(`<div class="alert" data-more="${esc(this._itemEnt(it, data))}">${icon(this._itemIcon(it, def))}
          <b>${esc(label)}</b><span class="amsg">${esc(raw)}</span></div>`);
      }
    }
    return rows.join("");
  }

  _charging(data, t, chgNow, b) {
    const items = this._items(b);
    const statusItem = items.find((it) => {
      const def = this._itemDef(it);
      return def && def.kind === "text";
    });
    const statusText = statusItem
      ? (this._itemState(statusItem, data) ? String(this._itemState(statusItem, data).state) : "")
      : (chgNow ? t.charging : "");
    const meta = [];
    const btns = [];
    for (const it of items) {
      const def = this._itemDef(it);
      const st = this._itemState(it, data);
      if (!st || it === statusItem) continue;
      const label = this._itemLabel(it, def, t);
      const ent = this._itemEnt(it, data);
      const kind = def ? def.kind : "custom";
      if (kind === "action") {
        if (it.slot === "chg_start") {
          btns.push(`<button class="mini" data-act="chg_start" data-ent="${esc(ent)}"
            data-dom="homeassistant" data-svc="turn_on" data-label="${esc(label)}">${esc(label)}</button>`);
        } else if (it.slot === "chg_stop") {
          btns.push(`<button class="mini dim" data-act="chg_stop" data-ent="${esc(ent)}"
            data-dom="homeassistant" data-svc="turn_off" data-label="${esc(label)}">${esc(label)}</button>`);
        } else if (it.slot === "wallbox") {
          const on = String(st.state).toLowerCase() === "on";
          btns.push(`<button class="mini${on ? "" : " dim"}" data-act="wallbox" data-ent="${esc(ent)}"
            data-dom="homeassistant" data-svc="toggle" data-label="${esc(label)}">${esc(label)}</button>`);
        } else {
          const dom = ent.split(".")[0];
          const svc = dom === "button" || dom === "input_button" ? "press" : dom === "scene" || dom === "script" ? "turn_on" : "toggle";
          btns.push(`<button class="mini" data-act="${esc(ent)}" data-ent="${esc(ent)}"
            data-dom="${esc(dom === "button" || dom === "input_button" ? "button" : dom === "scene" || dom === "script" ? dom : "homeassistant")}"
            data-svc="${esc(svc)}" data-label="${esc(label)}">${esc(label)}</button>`);
        }
      } else {
        const v = this._itemText(it, data, t);
        if (!v.value) continue;
        meta.push(`${label} ${v.value}${v.unit ? " " + v.unit : ""}`);
      }
    }
    if (!statusText && !meta.length && !btns.length) return "";
    return `<div class="panel"><div class="ph">${icon("bolt")}${esc(t.chargingTitle)}</div>
      <div class="chgrow"><div><div class="st">${esc(statusText || t.notCharging)}</div>
      ${meta.length ? `<div class="meta">${esc(meta.join(" · "))}</div>` : ""}</div>
      ${btns.length ? `<div style="display:flex;gap:6px;flex-wrap:wrap">${btns.join("")}</div>` : ""}</div></div>`;
  }

  _service(data, t, b) {
    const rows = [];
    const mask = Boolean(this._config.privacy);
    for (const it of this._items(b)) {
      const def = this._itemDef(it);
      const st = this._itemState(it, data);
      if (!st) continue;
      const label = this._itemLabel(it, def, t);
      const raw = isBad(st) ? "—" : String(st.state);
      const v = mask ? maskText(raw) : raw;
      if (!v) continue;
      rows.push({ label: this._itemShowLabel(it) ? label : "", value: v, ent: this._itemEnt(it, data) });
    }
    if (!rows.length) return "";
    return `<details class="svc"><summary><span class="sum">${icon("wrench")}${esc(t.service)}</span>${icon("chevron")}</summary>
      ${rows
        .map((r) => `<div class="row" data-more="${esc(r.ent)}">${r.label ? `<span class="k">${esc(r.label)}</span>` : ""}<span class="val">${esc(r.value)}</span></div>`)
        .join("")}</details>`;
  }

  _location(data, _t, override) {
    const ovr = override && this._hass && this._hass.states[override] ? this._hass.states[override] : null;
    const addr = ovr ? String(ovr.state) : text(data.get("addr"));
    const shown = addr && this._config.privacy ? maskAddr(addr) : addr;
    const tracker = ovr ? override : data.id("tracker");
    if (!addr && !tracker) return "";
    const label = shown || (isEn(this._hass) ? "Open map" : "查看地图");
    return `<div class="doors"><span class="door" data-more="${esc(tracker || data.id("addr"))}">
      ${icon("pin")}<span class="addr">${esc(label)}</span></span></div>`;
  }

  _toastHtml() {
    const kind = this._toast.kind === "err" ? " err" : "";
    return `<div class="toast${kind}" role="status" data-toast-anchor="${esc(this._toast.anchor || "")}">${icon(this._toast.kind === "err" ? "warning" : "bolt")}<span>${esc(this._toast.msg)}</span></div>`;
  }

  // 提示气泡跟随来源控件：普通按钮浮在按钮上方，刷新按钮落在按钮下方
  _placeToast() {
    const box = this._toastNode();
    if (!box) return;
    const wrap = this._wrap;
    const anchorKey = this._toast && this._toast.anchor;
    const anchor = anchorKey ? wrap.querySelector(`[data-act="${anchorKey}"]`) : null;
    const fallback = wrap.querySelector(".b-actions");
    if (!anchor && !fallback) return;
    const ar = (anchor || fallback).getBoundingClientRect();
    const wr = wrap.getBoundingClientRect();
    const tw = box.offsetWidth;
    const th = box.offsetHeight;
    // 卡片在面板/栅格里带 scale(k)，rect 是缩放后的视觉像素，内联 left/top 是布局像素
    const k = tw ? box.getBoundingClientRect().width / tw : 1;
    if (!k || !isFinite(k)) return;
    const wLocal = wr.width / k;
    const aTop = (ar.top - wr.top) / k;
    const aBottom = (ar.bottom - wr.top) / k;
    const center = (ar.left - wr.left) / k + ar.width / k / 2;
    box.style.left = `${Math.round(clamp(center - tw / 2, 4, Math.max(4, wLocal - tw - 4)))}px`;
    let top = anchorKey === "btn_refresh" ? aBottom + 8 : aTop - th - 8;
    if (top < 2) top = aBottom + 8;
    if (top + th > wr.height / k) top = Math.max(2, aTop - th - 8);
    box.style.top = `${Math.round(top)}px`;
  }

  _toastNode() {
    return this._wrap && this._wrap.querySelector(".toast");
  }

  // ---------- 交互 ----------

  _bind() {
    const w = this._card;
    w.addEventListener("change", (ev) => {
      const sel = ev.target.closest && ev.target.closest("select[data-sel]");
      if (!sel || !this._hass) return;
      this._hass.callService("select", "select_option", { entity_id: sel.dataset.sel, option: sel.value });
    });
    w.addEventListener("pointerdown", (ev) => this._onDown(ev));
    w.addEventListener("pointerup", (ev) => this._onUp(ev));
    w.addEventListener("pointercancel", () => this._cancelHold());
    w.addEventListener("pointerleave", (ev) => {
      const el = ev.target.closest && ev.target.closest("[data-act]");
      if (el && this._hold && this._hold.el === el) this._cancelHold();
    });
    w.addEventListener("click", (ev) => this._onClick(ev));
    w.addEventListener("keydown", (ev) => this._onKeyDown(ev));
    w.addEventListener("keyup", (ev) => this._onKeyUp(ev));
    w.addEventListener("contextmenu", (ev) => {
      if (ev.target.closest && ev.target.closest("[data-act]")) ev.preventDefault();
    });
  }

  _holdMs() {
    return clamp(Number(this._config && this._config.hold_ms) || DEFAULTS.hold_ms, 300, 3000);
  }

  _onDown(ev) {
    const el = ev.target.closest && ev.target.closest("[data-act]");
    if (!el || !el.dataset.hold) return;
    if (ev.pointerType === "mouse" && ev.button !== 0) return;
    ev.preventDefault();
    this._beginHold(el, ev.pointerId);
  }

  _beginHold(el, pointerId) {
    this._cancelHold();
    const ms = this._holdMs();
    const t = dict(this._hass);
    this._lastAct = el.dataset.act || "";
    el.style.setProperty("--hc-holdms", ms + "ms");
    el.classList.add("pressing");
    const lbl = el.querySelector(".lbl");
    const orig = lbl ? lbl.textContent : "";
    this._hold = { el, armed: false, lbl, orig, start: Date.now() };
    try {
      if (pointerId != null) el.setPointerCapture(pointerId);
    } catch {
      /* 忽略：部分 WebView 不支持指针捕获 */
    }

    // 车底轨道圈：按住时从 12 点方向顺时针转满一圈（用 rAF 逐帧推进，长度单位不受缩放影响）
    const ring = this.shadowRoot.querySelector(".orbit .hring2");
    const circle = ring ? ring.querySelector("circle") : null;
    if (ring && circle) {
      const C = 2 * Math.PI * 49;
      circle.setAttribute("stroke-dasharray", String(C));
      circle.setAttribute("stroke-dashoffset", String(C));
      if (ring.parentElement) ring.parentElement.classList.add("prog");
      const t0 = Date.now();
      const tickRing = () => {
        if (!this._hold) return;
        const p = Math.min(1, (Date.now() - t0) / ms);
        circle.setAttribute("stroke-dashoffset", String(C * (1 - p)));
        if (p < 1) this._holdRaf = requestAnimationFrame(tickRing);
      };
      this._holdRaf = requestAnimationFrame(tickRing);
    }

    const buzz = (pattern) => {
      if (navigator.vibrate) navigator.vibrate(pattern);
    };
    const stage = (frac, pattern) =>
      setTimeout(() => {
        if (this._hold) buzz(pattern);
      }, Math.round(ms * frac));

    this._holdStages = [stage(0.3, 15), stage(0.7, 20)];

    // 按钮标签换成倒计时，数字落在按钮外侧
    this._holdTick = setInterval(() => {
      if (!this._hold || !this._hold.lbl) return;
      const left = Math.max(0, (ms - (Date.now() - this._hold.start)) / 1000);
      this._hold.lbl.textContent = `${t.holdMore} ${left.toFixed(1)}s`;
    }, 100);

    this._holdTimer = setTimeout(() => {
      if (!this._hold) return;
      this._hold.armed = true;
      el.classList.add("armed");
      if (this._holdTick) clearInterval(this._holdTick);
      this._holdTick = null;
      const rg = this.shadowRoot.querySelector(".orbit .hring2");
      if (rg && rg.parentElement) { rg.parentElement.classList.remove("prog"); rg.parentElement.classList.add("armed"); }
      if (lbl) lbl.textContent = t.armed;
      buzz(40);
    }, ms);
  }

  _onUp(ev) {
    const el = ev.target.closest && ev.target.closest("[data-act]");
    if (!this._hold) return;
    if (!el || el !== this._hold.el) {
      this._cancelHold();
      return;
    }
    this._finishHold();
  }

  _finishHold() {
    const h = this._hold;
    if (!h) return;
    const armed = h.armed;
    this._hold = null;
    this._clearHoldTimers();
    h.el.classList.remove("pressing", "armed");
    if (h.lbl) h.lbl.textContent = armed ? h.el.dataset.label || h.orig : h.orig;
    this._resetHoldRing();
    if (armed) {
      this._justArmed = true;
      this._exec(h.el);
      setTimeout(() => {
        this._justArmed = false;
      }, 400);
    } else {
      this._hint();
    }
  }

  _clearHoldTimers() {
    clearTimeout(this._holdTimer);
    if (this._holdRaf) cancelAnimationFrame(this._holdRaf);
    this._holdRaf = null;
    (this._holdStages || []).forEach((id) => clearTimeout(id));
    this._holdStages = [];
    if (this._holdTick) clearInterval(this._holdTick);
    this._holdTick = null;
  }

  _resetHoldRing() {
    const ring = this.shadowRoot.querySelector(".orbit .hring2");
    const circle = ring ? ring.querySelector("circle") : null;
    if (!ring || !circle) return;
    if (ring.parentElement) ring.parentElement.classList.remove("prog", "armed");
    circle.setAttribute("stroke-dashoffset", String(2 * Math.PI * 49));
  }

  _cancelHold() {
    if (!this._hold) return;
    this._clearHoldTimers();
    this._hold.el.classList.remove("pressing", "armed");
    if (this._hold.lbl) this._hold.lbl.textContent = this._hold.orig;
    this._hold = null;
    this._resetHoldRing();
    if (this._pendingRender) {
      this._pendingRender = false;
      this._render(true);
    }
  }

  _onKeyDown(ev) {
    if (ev.key !== "Enter" && ev.key !== " ") return;
    const el = ev.target.closest && ev.target.closest("[data-act]");
    if (!el || !el.dataset.hold) return;
    ev.preventDefault();
    if (this._hold) return;
    this._beginHold(el, null);
  }

  _onKeyUp(ev) {
    if (ev.key !== "Enter" && ev.key !== " ") return;
    if (!this._hold) return;
    this._finishHold();
  }

  _onClick(ev) {
    const tile = ev.target.closest && ev.target.closest(".tile");
    if (tile) {
      tile.classList.add("spin");
      clearTimeout(this._spinTimer);
      this._spinTimer = setTimeout(() => tile.classList.remove("spin"), 800);
    }
    // 下拉胶囊里的原生 select：点开只走 change，不触发卡片动作
    if (ev.target.closest && ev.target.closest("select[data-sel]")) return;
    const act = ev.target.closest && ev.target.closest("[data-act]");
    if (act) {
      if (act.dataset.hold) {
        if (!this._justArmed) this._hint();
        return;
      }
      this._exec(act);
      return;
    }
    const findClose = ev.target.closest && ev.target.closest("[data-findclose]");
    if (findClose) {
      this._closeFind();
      return;
    }
    const findPerm = ev.target.closest && ev.target.closest("[data-findperm]");
    if (findPerm) {
      this._askCompass();
      return;
    }
    const findBtn = ev.target.closest && ev.target.closest("[data-find]");
    if (findBtn) {
      this._openFind();
      return;
    }
    const more = ev.target.closest && ev.target.closest("[data-more]");
    if (more && more.dataset.more) this._moreInfo(more.dataset.more);
  }

  _hint() {
    const t = dict(this._hass);
    this._showToast(t.holdHint, "ok", this._lastAct);
  }

  _moreInfo(entityId) {
    if (!entityId) return;
    if (this._hass && typeof this._hass.moreInfo === "function") {
      this._hass.moreInfo(entityId);
      return;
    }
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _exec(el) {
    if (!this._hass) return;
    const ent = el.dataset.ent;
    const dom = el.dataset.dom || "button";
    const svc = el.dataset.svc || "press";
    const label = el.dataset.label || "";
    const key = el.dataset.act || "";
    if (!ent) return;

    this._pending.set(ent, Date.now());
    let call;
    try {
      call = this._hass.callService(dom, svc, { entity_id: ent });
    } catch (err) {
      this._pending.delete(ent);
      this._showToast(dict(this._hass).failed + "：" + (err && err.message ? err.message : err), "err", key);
      return;
    }
    Promise.resolve(call)
      .then(() => {
        const t = dict(this._hass);
        this._showToast(key === "btn_refresh" ? t.refreshOk : t.sent + (label ? "：" + label : ""), "ok", key);
      })
      .catch((err) => {
        this._pending.delete(ent);
        const t = dict(this._hass);
        this._showToast(t.failed + "：" + (err && err.message ? err.message : err), "err", key);
      });
  }

  _showToast(msg, kind, anchor) {
    this._toast = { msg, kind, anchor: anchor || this._lastAct || "", ts: Date.now() };
    this._sig = "";
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      this._toast = null;
      this._sig = "";
      this._render(true);
    }, 4000);
    this._render(true);
    requestAnimationFrame(() => this._placeToast());
  }
}

customElements.define("ha-car", HaCarCard);

export { HaCarCard, MODULES, CONFIRMABLE, DEFAULTS };
