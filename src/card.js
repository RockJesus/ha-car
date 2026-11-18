import { icon, ICON_NAMES } from "./icons.js";
import { artForSlot } from "./button-art.js";
import { resolve, detectVehicles, SLOTS } from "./resolve.js";
import { STYLES } from "./styles.js";
import { dict, isEn } from "./strings.js";
import { attrs, chargingNow, clamp, esc, fmtNum, isBad, maskAddr, maskPlate, maskText, normLock, normOpen, normTire, num, relTime, text } from "./util.js";

const BG_RE = /^(?:https?:\/\/|\/\/|\/|data:image\/)/i;
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
  theme: "midnight",
  show_plate: true,
  privacy: false,
  image: "auto",
  image_url: "",
  bg_image: "",
  entities: {},
  find: { phone: "", car: "", device: "" },
  floor: {
    pressure: "",
    base: "sensor.ha_car_floor_base",
    car: "sensor.ha_car_floor",
    base_topic: "ha-car/floor/base",
    base_floor: 1,
    height: 3,
  },
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
    cfg.floor = Object.assign({}, DEFAULTS.floor, cfg.floor && typeof cfg.floor === "object" ? cfg.floor : {});
    for (const k of ["pressure", "base", "car", "base_topic"]) {
      cfg.floor[k] = typeof cfg.floor[k] === "string" ? cfg.floor[k].trim() : DEFAULTS.floor[k];
    }
    cfg.floor.base_floor = clamp(Number(cfg.floor.base_floor) || DEFAULTS.floor.base_floor, -5, 20);
    cfg.floor.height = clamp(Number(cfg.floor.height) || DEFAULTS.floor.height, 2, 6);
    cfg.bg_image = typeof cfg.bg_image === "string" ? cfg.bg_image.trim() : "";
    if (cfg.bg_image && !bgUrl(cfg.bg_image) && !isMediaSource(cfg.bg_image)) cfg.bg_image = "";
    cfg.hold_ms = clamp(Number(cfg.hold_ms) || DEFAULTS.hold_ms, 300, 3000);
    cfg.blocks = normBlocks(cfg);
    cfg.confirm = normalizeConfirm(config, cfg);
    this._config = cfg;
    this._sig = "";
    this._toast = null;
    this._render(true);
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
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

  getCardSize() {
    return this._config && this._config.layout === "compact" ? 4 : 7;
  }

  getGridOptions() {
    const rows = this.getCardSize();
    // 允许把格子拉得更高：行数上限放宽到 24（编辑面板里的竖向滑块跟着变长），最小 4 行保证不挤成一团
    return { columns: 12, rows, min_columns: 6, min_rows: 4, max_rows: 24 };
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
    const editorPv = this._inCardEditor();
    const sw = window.innerWidth || 0;
    const sh = window.innerHeight || 0;
    const wide = editorPv ? sw >= sh * 1.02 : w / h >= 1.15;
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
      loc: en ? "Sample City, Yunshan Rd 8" : "示例市 云杉路 8 号",
      sync: en ? "just now" : "刚刚",
      tire: ["245", "248", "243", "226"],
      odo: "12,345",
      batt: "12.4",
      oil: "78",
      fuel: "62",
      range: "486",
    };
    const acts = [
      { ic: "unlock", lb: t.unlock || "开锁", on: true },
      { ic: "trunk", lb: en ? "Trunk" : "后备箱" },
      { ic: "power", lb: t.engine || "远程启动" },
      { ic: "megaphone", lb: t.honk || "鸣笛寻车" },
    ];
    const tires = ["L", "R", "L", "R"]
      .map((_, i) => `<span class="pv-tvec${i === 3 ? " warn" : ""}">${icon("tire")}<b>${esc(fake.tire[i])}</b><em>kPa</em></span>`)
      .join("");
    return `<div class="pv-top"><h1>${esc(en ? "My car" : "我的座驾")}</h1>
        <span class="status ok"><span class="dot"></span>${esc(t.locked)}</span></div>
      <div class="pv-plate">${esc(fake.plate)}</div>
      <div class="pv-hero">
        <span class="pv-ring"><i class="pv-nd n1"></i><i class="pv-nd n2"></i><i class="pv-nd n3"></i><i class="pv-nd n4"></i></span>
        <img class="pv-carimg" src="${PREVIEW_CAR}" alt="" />
      </div>
      <div class="pv-gauges">
        ${this._gauge({ pct: 62, label: t.fuel, value: fake.fuel, unit: "%", ic: "fuel" })}
        <span class="pv-gsep">${icon("tire")}</span>
        ${this._gauge({ pct: 81, label: t.range, value: fake.range, unit: "km", ic: "gauge" })}
      </div>
      <div class="pv-chips">
        <span><i>${esc(t.odo || "总里程")}</i><b>${esc(fake.odo)}</b><em>km</em></span>
        <span><i>${esc(en ? "Battery" : "蓄电池")}</i><b>${esc(fake.batt)}</b><em>V</em></span>
        <span><i>${esc(en ? "Oil" : "机油寿命")}</i><b>${esc(fake.oil)}</b><em>%</em></span>
      </div>
      <div class="pv-acts">
        ${acts.map((a) => `<span class="pv-act${a.on ? " on" : ""}"><b>${icon(a.ic)}</b><em>${esc(a.lb)}</em></span>`).join("")}
      </div>
      <div class="pv-seek">
        <span>${icon("speaker")}${esc(en ? "Sound & light" : "声光寻车")}</span>
        <span>${icon("bulb")}${esc(en ? "Light horn" : "灯光寻车")}</span>
      </div>
      <div class="pv-closed">${icon("car")}${esc(en ? "Doors & windows closed" : "车门车窗已关闭")}</div>
      <div class="pv-svc">${icon("wrench")}${esc(en ? "Service info" : "服务信息")}${icon("chevron")}</div>
      <div class="pv-loc">${icon("pin")}${esc(fake.loc)}</div>
      <div class="pv-tires">${tires}<span class="pv-sync">${icon("refresh")}${esc(fake.sync)}</span></div>`;
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
          // 楼层只在找车面板里展示，卡片正面不出现楼层胶囊
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
    return `<div class="hero${running ? " run" : ""}"><div class="halo"></div>
      <span class="orbit${running ? " run" : ""}"><svg class="hring2" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="49"/></svg><i class="node n1"></i><i class="node n2"></i><i class="node n3"></i><i class="node n4"></i></span>
      <span class="orbit o2"></span>
      ${
        imgUrl
          ? `<img class="carimg" src="${esc(imgUrl)}"${fbUrl ? ` data-fb="${esc(fbUrl)}"` : ""} alt="">`
          : `<div class="carph">${icon("car")}</div>`
      }
      <div class="ground"></div><div class="covl">${inner}</div>${edge ? `<div class="cedge">${edge}</div>` : ""}</div>`;
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
    return { lat, lon };
  }

  _pressureHpa(st) {
    if (!st) return null;
    const v = num(st);
    if (!Number.isFinite(v) || v <= 0) return null;
    const u = String(attrs(st, "unit_of_measurement") || "").toLowerCase();
    if (u === "kpa") return v * 10;
    if (u === "pa") return v / 100;
    return v;
  }

  _floorLabel(n) {
    const x = Math.round(Number(n));
    if (!Number.isFinite(x)) return "";
    if (x >= 1) return `F${x}`;
    if (x === 0) return "B1";
    return `B${1 - x}`;
  }

  _normFloor(v) {
    const s = String(v == null ? "" : v).trim().toUpperCase();
    if (!s || s === "UNKNOWN" || s === "UNAVAILABLE" || s === "NONE" || s === "NULL") return "";
    if (/^-?\d+(\.\d+)?$/.test(s)) return this._floorLabel(Number(s));
    if (/^F\d+$/.test(s)) return s;
    if (/^\d+F$/.test(s)) return `F${Number(s.slice(0, -1))}`;
    if (/^B\d+$/.test(s)) return s;
    return s.slice(0, 5);
  }

  _floorData(_data) {
    const f = (this._config && this._config.floor) || DEFAULTS.floor;
    const pSt = f.pressure && this._hass ? this._hass.states[f.pressure] : null;
    const bSt = f.base && this._hass ? this._hass.states[f.base] : null;
    const cSt = f.car && this._hass ? this._hass.states[f.car] : null;
    const p = this._pressureHpa(pSt);
    const base = this._pressureHpa(bSt);
    const height = clamp(Number(f.height) || 3, 2, 6);
    const baseFloor = clamp(Number(f.base_floor) || 1, -5, 20);
    let phone = null;
    if (p != null && base != null) {
      const h = 44330 * (1 - Math.pow(p / base, 1 / 5.255));
      phone = baseFloor + h / height;
    }
    const car = cSt ? this._normFloor(cSt.state) : "";
    return {
      p,
      base,
      height,
      baseFloor,
      phone,
      phoneText: phone == null ? "" : this._floorLabel(phone),
      carText: car,
      show: !!(p != null || car),
      calibrated: p != null && base != null,
    };
  }

  _floorStrip(data) {
    const fd = this._floorData(data);
    if (!fd.show) return "";
    const en = isEn(this._hass);
    const phone = fd.phoneText || (en ? "not set" : "未校准");
    const car = fd.carText || (en ? "not recorded" : "未记录");
    const same = !!(fd.phoneText && fd.carText && fd.phoneText === fd.carText);
    let tip = "";
    if (!fd.phoneText) tip = en ? "Floor not calibrated" : "未校准";
    else if (!fd.carText) tip = en ? "Car floor not recorded" : "车楼层未记录";
    else if (same) tip = en ? "Floors match" : "同层";
    else tip = en ? "You and the car are on different floors" : "你和车不在同一层";
    return `<div class="ffloor${same ? " same" : ""}" data-floorstrip>
      <span class="fwho"><b>${esc(phone)}</b><i>${en ? "you" : "你"}</i></span>
      <span class="fsep">→</span>
      <span class="fwho"><b>${esc(car)}</b><i>${en ? "car" : "车"}</i></span>
      <span class="fex">${esc(tip)}</span>
      <button class="fcal" data-floorcal type="button">${esc(en ? `Set ${this._floorLabel(fd.baseFloor)}` : `校准为 ${this._floorLabel(fd.baseFloor)}`)}</button>
    </div>`;
  }

  _calibrateFloor() {
    const f = (this._config && this._config.floor) || DEFAULTS.floor;
    const st = f.pressure && this._hass ? this._hass.states[f.pressure] : null;
    const p = this._pressureHpa(st);
    if (p == null) {
      this._showToast(isEn(this._hass) ? "No phone pressure reading" : "没有读到手机气压", "err");
      return;
    }
    if (!this._hass || !this._hass.services || !this._hass.services.mqtt || !this._hass.services.mqtt.publish) {
      this._showToast(isEn(this._hass) ? "MQTT is not available" : "未找到 MQTT 服务", "err");
      return;
    }
    const topic = f.base_topic || "ha-car/floor/base";
    const done = this._hass.callService("mqtt", "publish", { topic, payload: p.toFixed(2), retain: true });
    if (done && typeof done.catch === "function") {
      done.catch((err) => this._showToast((isEn(this._hass) ? "Calibration failed: " : "校准失败：") + (err && err.message ? err.message : err), "err"));
      return;
    }
    this._showToast(isEn(this._hass) ? `Calibrated ${this._floorLabel(f.base_floor)}` : `已校准为 ${this._floorLabel(f.base_floor)}`, "ok");
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
          this._netLoc = { lat, lon };
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
    const floorH = this._floorStrip(data);
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
          <div class="fhead">${icon("pin")}${esc(title)}</div>${this._findMapPane()}
          <div class="fnote">${esc(note)}</div>${floorH}</div>`;
      }
      return `<div class="findmodal" role="dialog" aria-label="${esc(title)}">${close}
        <div class="fhead">${icon("pin")}${esc(title)}</div>
        <div class="fnote">${note}</div>${floorH}</div>`;
    }
    return `<div class="findmodal" role="dialog" aria-label="${esc(title)}">${close}
      <div class="fhead">${icon("pin")}${esc(title)}</div>
      <div class="fdist"><b data-fdist>${esc(this._distText(d))}</b><span>${en ? "away" : "距离"}</span></div>
      ${this._findMapPane()}
      <div class="fview fcompview">
        <div class="fcomp"><i class="fring"></i><i class="farrow" data-farrow>${icon("nav")}</i><span class="fdot"></span></div>
        <div class="fdir" data-fdir>${esc(this._dirText(bearing, null))}</div>
      </div>
      ${floorH}
      <div class="ffoot"><button class="fperm" data-findperm type="button">${icon("gauge")}${en ? "Calibrate compass" : "校准指南针"}</button>
        <span class="facc" data-fstat>${esc(en ? "GPS bearing · compass" : "车辆方位 · 手机指南针")} · ${esc(this._findSourceText(loc.source))}</span></div>
      <div class="fnote" data-fhint>${esc(this._findHint(loc.source))}</div></div>`;
  }

  _findHint(src) {
    const en = isEn(this._hass);
    if (src === "phone") {
      return en
        ? "Map tiles from AutoNavi, loaded only while this panel is open; the line is straight-line distance. Hold the phone flat so the compass arrow follows it."
        : "地图瓦片来自高德，只在打开时加载，连线是直线距离；罗盘箭头跟随手机朝向，手机尽量水平。";
    }
    return en
      ? "Map tiles from AutoNavi, loaded only while this panel is open; the line is straight-line distance. Compass shows the car's absolute bearing on this device."
      : "地图瓦片来自高德，只在打开时加载，连线是直线距离；当前用本机/网络定位，箭头显示车辆绝对方位。";
  }

  _findMapPane() {
    return `<div class="fview fmapview">
      <div class="fmap" data-fmap>
        <div class="ftiles" data-ftiles></div>
        <svg class="flink" data-flink aria-hidden="true"><line data-fline x1="0" y1="0" x2="0" y2="0"></line></svg>
        <span class="fpin you" data-fyou hidden></span>
        <span class="fpin car" data-fcar hidden>${icon("car")}</span>
        <span class="fattr">© 高德地图</span>
      </div>
      <div class="fmapnote" data-fmapnote></div>
    </div>`;
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
    const en = isEn(this._hass);
    const proj = (lat, lng, z) => {
      const n = 256 * Math.pow(2, z);
      const x = ((lng + 180) / 360) * n;
      const s = Math.min(Math.max(Math.sin((lat * Math.PI) / 180), -0.9999), 0.9999);
      const y = (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * n;
      return { x, y };
    };
    let z = 16;
    if (me && car) {
      const pad = Math.min(w, h) * 0.22;
      for (z = 18; z >= 3; z--) {
        const a = proj(me.lat, me.lon, z);
        const b = proj(car.lat, car.lon, z);
        if (Math.abs(a.x - b.x) <= Math.max(30, w - 2 * pad) && Math.abs(a.y - b.y) <= Math.max(30, h - 2 * pad)) break;
      }
      z = Math.max(3, Math.min(18, z));
    }
    const c0 = me && car ? { lat: (me.lat + car.lat) / 2, lon: (me.lon + car.lon) / 2 } : (car || me);
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
    }
    const at = (pt) => {
      const q = proj(pt.lat, pt.lon, z);
      return { x: q.x - tl.x, y: q.y - tl.y };
    };
    let youP = me ? at(me) : null;
    const carP = car ? at(car) : null;
    if (youP && carP && Math.abs(youP.x - carP.x) < 26 && Math.abs(youP.y - carP.y) < 26) {
      youP = { x: youP.x - 16, y: youP.y - 12 };
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
      if (me && car) txt = `<span class="lgd">${esc((en ? "Straight line " : "直线 ") + this._distText(this._distanceM(me, car)))}</span>`;
      else if (car) txt = `<span class="lgd">${esc(en ? "Car only — no device location" : "仅车辆定位，本机没有可用定位")}</span>`;
      else txt = `<span class="lgd">${esc(en ? "Device only — car coords missing" : "仅本机定位，车辆坐标缺失")}</span>`;
      note.innerHTML = (me ? you : "") + (car ? carLg : "") + txt;
    }
  }

  _dirText(bearing, heading) {
    const en = isEn(this._hass);
    if (heading == null) {
      const abs = [
        ["正北", "North"], ["东北", "North-east"], ["正东", "East"], ["东南", "South-east"],
        ["正南", "South"], ["西南", "South-west"], ["正西", "West"], ["西北", "North-west"],
      ];
      const ai = Math.round(bearing / 45) % 8;
      return `${abs[ai][en ? 1 : 0]} · ${en ? "car at " : "车在 "}${Math.round(bearing)}°`;
    }
    const rel = (bearing - heading + 360) % 360;
    const dirs = [
      ["前方", "Ahead"], ["右前方", "Front right"], ["右侧", "Right"], ["右后方", "Back right"],
      ["后方", "Behind"], ["左后方", "Back left"], ["左侧", "Left"], ["左前方", "Front left"],
    ];
    const idx = Math.round(rel / 45) % 8;
    const name = dirs[idx][en ? 1 : 0];
    const delta = Math.round(((rel + 180) % 360) - 180);
    return `${name} · ${en ? "offset " : "偏 "}${Math.abs(delta)}°`;
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
    const dir = q("[data-fdir]");
    const stat = q("[data-fstat]");
    if (distEl) distEl.textContent = this._distText(d);
    const rel = this._heading == null ? bearing : (bearing - this._heading + 360) % 360;
    if (arrow) arrow.style.transform = `rotate(${rel}deg)`;
    if (dir) dir.textContent = this._dirText(bearing, this._heading);
    if (stat) {
      const en = isEn(this._hass);
      const src = this._findSourceText(loc.source);
      const base = this._heading == null
        ? (en ? "Compass not active" : "指南针未启用")
        : this._headingSrc === "gps"
          ? (en ? `GPS heading ${Math.round(this._heading)}°` : `移动方向 ${Math.round(this._heading)}°`)
          : (en ? `Compass ${Math.round(this._heading)}°` : `指南针 ${Math.round(this._heading)}°`);
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
    const floorCal = ev.target.closest && ev.target.closest("[data-floorcal]");
    if (floorCal) {
      this._calibrateFloor();
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
