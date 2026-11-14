import { icon, ICON_NAMES } from "./icons.js";
import { resolve, detectVehicles, SLOTS } from "./resolve.js";
import { STYLES } from "./styles.js";
import { dict, isEn } from "./strings.js";
import { attrs, chargingNow, clamp, esc, fmtNum, isBad, maskAddr, maskPlate, maskText, normLock, normOpen, normTire, num, relTime, text } from "./util.js";

const FORD_LOGO = `<span class="brand" aria-hidden="true"><svg viewBox="0 0 44 20" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="22" cy="10" rx="21" ry="9" fill="#0b3f92" stroke="#eef4ff" stroke-width="1.6"/>
<ellipse cx="22" cy="10" rx="17.6" ry="6.6" fill="none" stroke="#eef4ff" stroke-width=".9" opacity=".85"/>
<text x="22" y="13.4" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-style="italic"
 font-weight="700" font-size="9.4" fill="#f4f8ff" letter-spacing=".4">Ford</text></svg></span>`;

const MODULES = ["status", "actions", "energy", "tires", "doors", "charging", "alerts", "service"];
// 可自由排序/增删的模块类型（blocks）
const BLOCK_TYPES = ["meta", "hero", "energy", "alerts", "doors", "charging", "service", "actions", "custom"];
const CONFIRMABLE = [
  "btn_unlock",
  "btn_lock",
  "sw_engine",
  "sw_honk",
  "sw_va",
  "sw_light",
];
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

const DEFAULTS = {
  title: "",
  layout: "full",
  // 默认不渲染「服务信息」，可在编辑器里手动勾选
  modules: MODULES.filter((m) => m !== "service"),
  // 模块顺序：null 时按 modules 兼容推导（老配置无需迁移）
  blocks: null,
  confirm: ["btn_unlock", "btn_lock", "sw_engine", "sw_honk"],
  hold_ms: 2000,
  accent: "#37d6e8",
  show_plate: true,
  privacy: false,
  image: "auto",
  image_url: "",
  entities: {},
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
      }));
    if (list.length) return list;
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
    cfg.confirm = Array.isArray(cfg.confirm)
      ? cfg.confirm.filter((k) => CONFIRMABLE.includes(k))
      : DEFAULTS.confirm.slice();
    cfg.entities = cfg.entities && typeof cfg.entities === "object" ? cfg.entities : {};
    cfg.hold_ms = clamp(Number(cfg.hold_ms) || DEFAULTS.hold_ms, 300, 3000);
    cfg.blocks = normBlocks(cfg);
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
    return { columns: 12, rows, min_columns: 6, min_rows: 3, max_rows: 12 };
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
    const panel = this._isPanel() && !this._isPreview();
    if (!panel && !this._panelTried) {
      this._panelTried = true;
      setTimeout(() => this._syncPanel(), 250);
      setTimeout(() => this._syncPanel(), 900);
    }
    if (panel === this._panel) {
      if (panel) this._fitPanel();
      return;
    }
    this._panel = panel;
    this.classList.toggle("panel", panel);
    this._card.classList.toggle("panel", panel);
    // :host 的 860px 上限只对普通卡片有意义；面板模式交给容器决定尺寸
    this.style.maxWidth = panel ? "none" : "";
    this.style.margin = panel ? "0" : "";
    this.style.height = panel ? "100%" : "";
    this.style.width = panel ? "100%" : "";
    if (panel) this._fitPanel();
  }

  // 面板里按 1440×900 设计稿等比缩放：整页装下，不出现滚动条
  _fitPanel() {
    if (!this._panel || !this._card) return;
    const w = this.clientWidth;
    const h = this.clientHeight;
    if (!w || !h) return;
    const fit = w >= 900 && h >= 620;
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
      return;
    }
    if (!fit) return;
    const k = Math.min(w / 1440, h / 900);
    this._card.style.setProperty("--fit", String(Math.round(k * 1000) / 1000));
    // 宽先到顶时把画布按比例拉高（不是拉伸像素），让纸面把面板铺满
    const designH = Math.max(900, Math.round(h / k));
    this._card.style.width = "1440px";
    this._card.style.height = `${designH}px`;
  }

  _isPreview() {
    if (this._preview) return true;
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
    root.innerHTML = `<style>${STYLES}</style><ha-card><div class="wrap"></div></ha-card>`;
    this._wrap = root.querySelector(".wrap");
    this._card = root.querySelector("ha-card");

    this._built = true;
    this._bind();
    this._panelRO = new ResizeObserver(() => this._fitPanel());
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
    parts.push(JSON.stringify([this._config.modules, this._config.confirm, this._config.layout, this._config.title]));
    return parts.join("|");
  }

  _paint(data) {
    const cfg = this._config;
    this._syncPanel();
    this._card.classList.toggle("compact", cfg.layout === "compact");
    this._wrap.className = "wrap";
    if (cfg.accent) this._card.style.setProperty("--hc-accent", cfg.accent);
    this._prunePending(data);
    this._wrap.innerHTML = this._body(data, this._card.classList.contains("fit"));

    this._placeOverlay();
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

  _previewBody() {
    const t = dict(this._hass);
    const en = isEn(this._hass);
    return `<div class="head"><div class="ttl"><h1>${esc(en ? "My car" : "我的座驾")}</h1>
        <p class="plate">HA CAR</p></div>
        <span class="status ok"><span class="dot"></span>${esc(t.locked)}</span></div>
      ${this._hero(null)}
      <div class="energy">
        ${this._gauge({ pct: 62, label: t.fuel, value: 62, unit: "%", ic: "fuel" })}
        <span class="egmid">${icon("fuel")}</span>
        ${this._gauge({ pct: 81, label: t.range, value: 486, unit: "km", ic: "gauge" })}
      </div>`;
  }

  // ---------- 卡片主体 ----------

  _body(data, twoCol) {
    const cfg = this._config;
    const t = dict(this._hass);
    if (!data.group && !Object.keys(cfg.entities || {}).length) {
      return this._empty(isEn(this._hass)
        ? "No vehicle entity found. Check that FordPass integration is loaded, or pick a vehicle in the card editor."
        : "没找到车辆实体。确认福特派互联集成已加载，或在卡片编辑器里选择车辆。");
    }
    const compact = cfg.layout === "compact";
    const mods = cfg.modules || MODULES;
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
    let toastPlaced = false;
    const head = `<div class="head"><div class="ttl"><h1>${FORD_LOGO}${esc(title)}</h1>
      ${cfg.show_plate && plate ? `<p class="plate">${esc(cfg.privacy ? maskPlate(plate) : plate)}</p>` : ""}
      </div><span class="status ${status.cls}"><span class="dot"></span>${esc(status.label)}</span></div>`;

    const hero = this._imagePair(data);
    const list = cfg.blocks || normBlocks(cfg);
    for (const b of list) {
      if (b.on === false) continue;
      let html = "";
      switch (b.type) {
        case "meta": {
          const locH = compact ? "" : this._location(data, t, b.entity);
          const syncH = this._baseline(data, t);
          if (locH || syncH) html = `<div class="b-meta"><div class="hmeta">${locH}${syncH}</div></div>`;
          break;
        }
        case "hero":
          html = `<div class="blk b-hero">${this._hero(
            this._imgFrom(b.entity, hero.src),
            hero.fb,
            this._carOverlay(data, t, mods),
          )}</div>`;
          break;
        case "energy": {
          const en = this._energy(data, t);
          if (en) html = `<div class="blk b-energy">${en}</div>`;
          break;
        }
        case "alerts": {
          const al = this._alert(data, t);
          if (al) html = `<div class="blk b-alerts">${al}</div>`;
          break;
        }
        case "doors": {
          if (!compact) {
            const dr = this._doors(data, t);
            if (dr) html = `<div class="blk b-doors">${dr}</div>`;
          }
          break;
        }
        case "charging": {
          if (!compact) {
            const ch = this._charging(data, t, chgNow);
            if (ch) html = `<div class="blk b-charging">${ch}</div>`;
          }
          break;
        }
        case "service": {
          if (!compact) {
            const sv = this._service(data, t);
            if (sv) html = `<div class="blk b-service">${sv}</div>`;
          }
          break;
        }
        case "actions": {
          const ac = this._actions(data, t, running, offline, compact);
          if (ac) {
            const toast = this._toast ? this._toastHtml() : "";
            html = `<div class="blk b-actions">${toast}${ac}</div>`;
            toastPlaced = Boolean(toast);
          }
          break;
        }
        case "custom":
          html = this._customBlock(b, t);
          break;
        default:
          break;
      }
      if (html) blocks.push({ html, hero: b.type === "hero" });
    }

    if (!toastPlaced && this._toast) blocks.push({ html: this._toastHtml("free"), hero: false });

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
  _hero(imgUrl, fbUrl, overlay) {
    const inner = typeof overlay === "string" ? overlay : (overlay && overlay.inner) || "";
    const edge = (overlay && overlay.edge) || "";
    return `<div class="hero"><div class="halo"></div>
      <span class="orbit"><svg class="hring2" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="49"/></svg><i class="node n1"></i><i class="node n2"></i><i class="node n3"></i><i class="node n4"></i></span>
      <span class="orbit o2"></span>
      ${
        imgUrl
          ? `<img class="carimg" src="${esc(imgUrl)}"${fbUrl ? ` data-fb="${esc(fbUrl)}"` : ""} alt="">`
          : `<div class="carph">${icon("car")}</div>`
      }
      <div class="ground"></div><div class="covl">${inner}</div>${edge ? `<div class="cedge">${edge}</div>` : ""}</div>`;
  }

  // 俯视图状态层：车门/车窗/引擎盖/尾门按真实方位贴边，四轮胎压落在轮位
  _carOverlay(data, t, mods) {
    const zh = !isEn(this._hass);
    const out = [];
    const edge = [];
    const mark = (slot, cls, label, short, ic, isEdge) => {
      const st = data.get(slot);
      if (!st) return;
      const bad = isBad(st);
      const open = !bad && normOpen(st) === "open";
      const txt = bad ? (zh ? "不可用" : "N/A") : open ? (zh ? "打开" : "Open") : zh ? "关闭" : "Shut";
      (isEdge ? edge : out).push(
        `<span class="cst ico ${cls}${bad ? " bad" : open ? " open" : ""}" data-more="${esc(data.id(slot))}"
          title="${esc(label)} · ${esc(txt)}" aria-label="${esc(label)} ${esc(txt)}">
          <span class="glyph">${icon(ic)}</span><b class="tx">${esc(txt)}</b><i class="tag">${esc(short)}</i></span>`,
      );
    };
    if (mods.includes("doors")) {
      mark("hood", "hood", zh ? "引擎盖" : "Hood", zh ? "引擎盖" : "Hood", "engine", true);
      mark("tailgate", "trunk", zh ? "尾门" : "Tailgate", zh ? "尾门" : "Trunk", "trunk", true);
      mark("door_fl", "dfl", zh ? "主驾门" : "Driver door", zh ? "主驾门" : "FL door", "door");
      mark("door_fr", "dfr", zh ? "副驾门" : "Passenger door", zh ? "副驾门" : "FR door", "door");
      mark("door_rl", "drl", zh ? "左后门" : "Rear left door", zh ? "左后门" : "RL door", "door");
      mark("door_rr", "drr", zh ? "右后门" : "Rear right door", zh ? "右后门" : "RR door", "door");
      mark("win_fl", "wfl", zh ? "主驾车窗" : "Driver window", zh ? "主驾窗" : "FL win", "door");
      mark("win_fr", "wfr", zh ? "副驾车窗" : "Passenger window", zh ? "副驾窗" : "FR win", "door");
      mark("win_rl", "wrl", zh ? "左后车窗" : "Rear left window", zh ? "左后窗" : "RL win", "door");
      mark("win_rr", "wrr", zh ? "右后车窗" : "Rear right window", zh ? "右后窗" : "RR win", "door");
    }
    // 胎压属于车上信息，不受 modules 开关限制（旧配置里常没有 tires）
    {
      const tp = [
        ["tp_lf", "tps_lf", "tlf", zh ? "左前" : "LF"],
        ["tp_rf", "tps_rf", "trf", zh ? "右前" : "RF"],
        ["tp_lr", "tps_lr", "tlr", zh ? "左后" : "LR"],
        ["tp_rr", "tps_rr", "trr", zh ? "右后" : "RR"],
      ];
      for (const [slot, sslot, cls, label] of tp) {
        const st = data.get(slot);
        if (isBad(st)) continue;
        const v = num(st);
        // 只按压力区间判定：集成把四路轮状态都报「故障」时，压力正常就不逐轮泛黄
        const flag = normTire(data.get(sslot)) === "warn";
        const outOfRange = v != null && (v < 190 || v > 300);
        const warn = outOfRange || (flag && v == null);
        const unit = attrs(st, "unit_of_measurement") || "kPa";
        out.push(
          `<b class="ctire ico ${cls}${warn ? " warn" : ""}" data-more="${esc(data.id(slot))}"
            title="${esc(t.tireLabel + " · " + label)} ${v == null ? "—" : fmtNum(v)} ${esc(unit)}">
            <span class="glyph">${icon("tire")}</span><span class="tv">${v == null ? "—" : fmtNum(v)}</span><span class="tu">${esc(unit)}</span></b>`,
        );
      }
    }
    return { inner: out.join(""), edge: edge.join("") };
  }

  // 状态层贴合真实车图矩形（图片 contain 后尺寸未知，渲染完再量）
  _placeOverlay() {
    const img = this._wrap && this._wrap.querySelector("img.carimg");
    const ovl = this._wrap && this._wrap.querySelector(".covl");
    if (!img || !ovl) return;
    // 用 offset 尺寸而不是 getBoundingClientRect：面板缩放后 rect 是屏幕坐标，会把状态层推歪
    if (!img.offsetWidth) return;
    ovl.style.left = `${img.offsetLeft}px`;
    ovl.style.top = `${img.offsetTop}px`;
    ovl.style.width = `${img.offsetWidth}px`;
    ovl.style.height = `${img.offsetHeight}px`;
  }

  // 底座条：四轮胎压 + 同步（同步入口就是刷新按钮）
  _baseline(data, t) {
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

  _energy(data, t) {
    const fuel = num(data.get("fuel"));
    const batt = num(data.get("battery"));
    const pct = batt != null ? batt : fuel;
    const pctLabel = batt != null ? t.battery : t.fuel;
    const pctIc = batt != null ? "bolt" : "fuel";
    const range = num(data.get("range")) != null ? num(data.get("range")) : num(data.get("ev_range"));
    const rangeUnit = attrs(data.get("range"), "unit_of_measurement") || "km";
    const odo = num(data.get("odo"));
    const odoUnit = attrs(data.get("odo"), "unit_of_measurement") || "km";
    const volt = num(data.get("volt"));
    const oil = num(data.get("oil"));

    if (pct == null && range == null && odo == null) return "";

    // 续航环的满量程只是视觉参考（汽油 ~620km / 纯电 ~500km），不做任何数据推断
    const left =
      pct == null
        ? ""
        : this._gauge({ pct: clamp(pct, 2, 100), label: pctLabel, value: Math.round(pct), unit: "%", ic: pctIc });
    const right =
      range != null
        ? this._gauge({
            pct: clamp((range / (batt != null ? 500 : 620)) * 100, 2, 100),
            label: t.range,
            value: fmtNum(range),
            unit: rangeUnit,
            ic: "gauge",
          })
        : this._gauge({ pct: 100, label: t.odo, value: fmtNum(odo), unit: odoUnit, ic: "gauge" });

    const stats = [];
    if (odo != null && range != null) {
      stats.push(`<span class="sstat"><i>${esc(t.odo)}</i><b>${fmtNum(odo)}</b><span>${esc(odoUnit)}</span></span>`);
    }
    if (volt != null) {
      stats.push(`<span class="sstat"><i>${esc(t.volt)}</i><b>${fmtNum(volt, 1)}</b><span>V</span></span>`);
    }
    if (oil != null) {
      stats.push(`<span class="sstat"><i>${esc(t.oil)}</i><b>${Math.round(oil)}</b><span>%</span></span>`);
    }

    return `<div class="energy">${left}${left ? `<span class="egdiv"></span>` : ""}${right}</div>
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

  _actions(data, t, running, offline, compact) {
    const cfg = this._config;
    const tiles = [];
    const hold = (key) => (cfg.confirm.includes(key) ? ' data-hold="1"' : "");

    const lockNorm = normLock(data.get("lock"));

    // 开锁 / 关锁固定并列（不再按当前锁态切换，也不占用后备箱位）
    if (data.id("btn_unlock")) {
      tiles.push(this._tile({
        key: "btn_unlock", ent: data.id("btn_unlock"), ic: "unlock", label: t.unlock,
        cls: lockNorm === "unlocked" ? "hot" : "",
        dom: "button", svc: "press", hold, offline,
      }));
    }
    if (data.id("btn_lock")) {
      tiles.push(this._tile({
        key: "btn_lock", ent: data.id("btn_lock"), ic: "lock", label: t.lockDown,
        cls: lockNorm === "locked" ? "on" : "",
        dom: "button", svc: "press", hold, offline,
      }));
    }
    if (data.id("sw_engine")) {
      tiles.push(this._tile({
        key: "sw_engine", ent: data.id("sw_engine"), ic: "power",
        cls: running ? "on" : "",
        label: running ? t.engineStop : t.engine,
        dom: "homeassistant", svc: "toggle", hold, offline,
      }));
    }
    if (data.id("sw_honk")) {
      tiles.push(this._tile({
        key: "sw_honk", ent: data.id("sw_honk"), ic: "megaphone", label: t.honk,
        dom: "homeassistant", svc: "toggle", hold, offline,
      }));
    }

    const pills = [];
    if (!compact) {
      // 寻车时长 / 寻车类型：直接绑定集成的 select 实体，点了选值即生效
      const durEnt = data.id("honk_duration");
      const typeEnt = data.id("chirp_type");
      if (durEnt) pills.push(this._selectPill({ key: "honk_duration", ent: durEnt, label: t.soundDur }));
      else if (data.id("sw_va")) {
        pills.push(this._pill({ key: "sw_va", ent: data.id("sw_va"), ic: "speaker", label: t.soundLight, dom: "homeassistant", svc: "toggle", hold, offline }));
      }
      if (typeEnt) pills.push(this._selectPill({ key: "chirp_type", ent: typeEnt, label: t.soundType }));
      else if (data.id("sw_light")) {
        pills.push(this._pill({ key: "sw_light", ent: data.id("sw_light"), ic: "bulb", label: t.light, dom: "homeassistant", svc: "toggle", hold, offline }));
      }
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
      <span class="orb"><svg class="hring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47"/></svg>${icon(o.ic)}</span>
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
  _customBlock(b, t) {
    const ent = b.entity;
    if (!ent) return "";
    const label = b.label || (ent ? ent.split(".").slice(-1)[0].replace(/_/g, " ") : t.custom || "自定义");
    const st = ent && this._hass && this._hass.states[ent] ? this._hass.states[ent] : null;
    let value = "—";
    let unit = b.unit || "";
    if (st) {
      const raw = String(st.state);
      value = isBad(st) ? "—" : raw;
      if (!unit && st.attributes && st.attributes.unit_of_measurement) unit = st.attributes.unit_of_measurement;
      if (/^on|off$/i.test(raw)) value = raw.toLowerCase() === "on" ? (isEn(this._hass) ? "On" : "开") : (isEn(this._hass) ? "Off" : "关");
    }
    const ic = ICON_NAMES.includes(b.icon) ? b.icon : "bolt";
    return `<div class="blk b-custom"><div class="cblock">${icon(ic)}<span class="cl">${esc(label)}</span>
      <b>${esc(value)}</b>${unit ? `<i>${esc(unit)}</i>` : ""}</div></div>`;
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

  _doors(data, t) {
    const defs = [
      { slot: "door_fl", label: isEn(this._hass) ? "Front L" : "主驾门" },
      { slot: "door_fr", label: isEn(this._hass) ? "Front R" : "副驾门" },
      { slot: "door_rl", label: isEn(this._hass) ? "Rear L" : "左后门" },
      { slot: "door_rr", label: isEn(this._hass) ? "Rear R" : "右后门" },
      { slot: "tailgate", label: isEn(this._hass) ? "Trunk" : "尾门" },
      { slot: "hood", label: isEn(this._hass) ? "Hood" : "引擎盖" },
      { slot: "win_fl", label: isEn(this._hass) ? "Win L" : "主驾车窗" },
      { slot: "win_fr", label: isEn(this._hass) ? "Win R" : "副驾车窗" },
    ];
    const open = [];
    let known = 0;
    for (const d of defs) {
      const st = data.get(d.slot);
      if (!st) continue;
      known += 1;
      if (normOpen(st) === "open") open.push(d);
    }
    if (!known) return "";
    if (!open.length) return "";
    return `<div class="doors">${open
      .map((d) => `<span class="door open" data-more="${esc(data.id(d.slot))}">${icon("carProfile")}${esc(d.label)} · ${esc(t.open)}</span>`)
      .join("")}</div>`;
  }

  _alert(data, t) {
    const st = data.get("alerts");
    const raw = text(st);
    if (!raw) return "";
    if (String(raw).trim() === "0") return "";
    const low = raw.toLowerCase();
    if (low === "none" || low === "no" || low === "无" || low === "正常" || low === "no alerts") return "";
    return `<div class="alert" data-more="${esc(data.id("alerts"))}">${icon("warning")}
      <b>${esc(t.alert)}</b><span class="amsg">${esc(raw)}</span></div>`;
  }

  _charging(data, t, chgNow) {
    const st = data.get("chg_status");
    const wallbox = data.get("wallbox");
    if (!st && !data.id("chg_start")) return "";
    const statusText = text(st) || (chgNow ? t.charging : t.notCharging);
    const soc = num(data.get("battery"));
    const last = num(data.get("last_soc"));
    const meta = [];
    if (soc != null) meta.push(`${t.battery} ${Math.round(soc)}%`);
    if (last != null) meta.push(`${t.lastSoc} ${Math.round(last)}%`);

    const btns = [];
    if (data.id("chg_start")) {
      btns.push(`<button class="mini" data-act="chg_start" data-ent="${esc(data.id("chg_start"))}"
        data-dom="homeassistant" data-svc="turn_on" data-label="${esc(t.chargeNow)}">${esc(t.chargeNow)}</button>`);
    }
    if (data.id("chg_stop")) {
      btns.push(`<button class="mini dim" data-act="chg_stop" data-ent="${esc(data.id("chg_stop"))}"
        data-dom="homeassistant" data-svc="turn_off" data-label="${esc(t.stopCharge)}">${esc(t.stopCharge)}</button>`);
    }
    if (data.id("wallbox")) {
      const on = String(wallbox.state).toLowerCase() === "on";
      btns.push(`<button class="mini${on ? "" : " dim"}" data-act="wallbox"
        data-ent="${esc(data.id("wallbox"))}" data-dom="homeassistant" data-svc="toggle"
        data-label="${esc(t.chargeNow)}">${esc(on ? t.stopCharge : t.chargeNow)}</button>`);
    }

    return `<div class="panel"><div class="ph">${icon("bolt")}${esc(t.chargingTitle)}</div>
      <div class="chgrow"><div><div class="st">${esc(statusText)}</div>
      ${meta.length ? `<div class="meta">${esc(meta.join(" · "))}</div>` : ""}</div>
      ${btns.length ? `<div style="display:flex;gap:6px">${btns.join("")}</div>` : ""}</div></div>`;
  }

  _service(data, t) {
    const rows = [];
    const mask = Boolean(this._config.privacy);
    const push = (label, slot, suffix) => {
      const st = data.get(slot);
      const raw = text(st);
      if (!raw) return;
      const v = mask ? maskText(raw) : raw;
      rows.push({ label, value: suffix ? v + suffix : v, ent: data.id(slot) });
    };
    push(t.maintenance, "maint");
    push(t.recallInfo, "recall");
    push(t.messages, "messages", "");
    push(t.firmware, "fw");
    push(t.support, "support");

    if (!rows.length) return "";
    return `<details class="svc"><summary><span class="sum">${icon("wrench")}${esc(t.service)}</span>${icon("chevron")}</summary>
      ${rows
        .map((r) => `<div class="row" data-more="${esc(r.ent)}"><span class="k">${esc(r.label)}</span><span class="val">${esc(r.value)}</span></div>`)
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

  _toastHtml(variant) {
    const kind = this._toast.kind === "err" ? " err" : "";
    const free = variant === "free" ? " free" : "";
    return `<div class="toast${kind}${free}" role="status">${icon(this._toast.kind === "err" ? "warning" : "bolt")}<span>${esc(this._toast.msg)}</span></div>`;
  }

  // ---------- 交互 ----------

  _bind() {
    const w = this._wrap;
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
    const more = ev.target.closest && ev.target.closest("[data-more]");
    if (more && more.dataset.more) this._moreInfo(more.dataset.more);
  }

  _hint() {
    const t = dict(this._hass);
    this._showToast(t.holdHint, "ok");
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
      this._showToast(dict(this._hass).failed + "：" + (err && err.message ? err.message : err), "err");
      return;
    }
    Promise.resolve(call)
      .then(() => {
        const t = dict(this._hass);
        this._showToast(key === "btn_refresh" ? t.refreshOk : t.sent + (label ? "：" + label : ""), "ok");
      })
      .catch((err) => {
        this._pending.delete(ent);
        const t = dict(this._hass);
        this._showToast(t.failed + "：" + (err && err.message ? err.message : err), "err");
      });
  }

  _showToast(msg, kind) {
    this._toast = { msg, kind, ts: Date.now() };
    this._sig = "";
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      this._toast = null;
      this._sig = "";
      this._render(true);
    }, 4000);
    this._render(true);
  }
}

customElements.define("ha-car", HaCarCard);

export { HaCarCard, MODULES, CONFIRMABLE, DEFAULTS };
