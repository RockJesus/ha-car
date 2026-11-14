import { icon } from "./icons.js";
import { resolve, detectVehicles, SLOTS } from "./resolve.js";
import { STYLES } from "./styles.js";
import { dict, isEn } from "./strings.js";
import { attrs, chargingNow, clamp, esc, fmtNum, isBad, maskAddr, maskPlate, maskText, normLock, normOpen, normTire, num, relTime, text } from "./util.js";

const MODULES = ["status", "actions", "energy", "tires", "doors", "charging", "alerts", "service"];
const CONFIRMABLE = [
  "btn_unlock",
  "btn_lock",
  "btn_trunk",
  "sw_engine",
  "sw_honk",
  "sw_va",
  "sw_light",
];
const PREVIEW_TAGS = new Set([
  "hui-card-picker",
  "hui-dialog-add-card",
  "hui-dialog-edit-card",
  "hui-card-editor",
  "ha-editor",
]);

const DEFAULTS = {
  title: "",
  layout: "full",
  modules: MODULES,
  confirm: ["btn_unlock", "btn_lock", "btn_trunk", "sw_engine", "sw_honk"],
  hold_ms: 700,
  accent: "#37d6e8",
  show_plate: true,
  privacy: false,
  image: "auto",
  image_url: "",
  entities: {},
};

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
      : MODULES.slice();
    cfg.confirm = Array.isArray(cfg.confirm)
      ? cfg.confirm.filter((k) => CONFIRMABLE.includes(k))
      : DEFAULTS.confirm.slice();
    cfg.entities = cfg.entities && typeof cfg.entities === "object" ? cfg.entities : {};
    cfg.hold_ms = clamp(Number(cfg.hold_ms) || 700, 300, 3000);
    this._config = cfg;
    this._sig = "";
    this._toast = null;
    this._render(true);
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
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

  _isPreview() {
    if (this._preview) return true;
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
    if (this._isPreview()) {
      this._wrap.className = "wrap";
      this.shadowRoot.querySelector("ha-card").classList.add("compact");
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
    this._card.classList.toggle("compact", cfg.layout === "compact");
    this._wrap.className = "wrap";
    if (cfg.accent) this._card.style.setProperty("--hc-accent", cfg.accent);
    this._prunePending(data);
    this._wrap.innerHTML = this._body(data);
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

  _body(data) {
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

    const parts = [];

    // 顶部：车型名 + 锁态胶囊
    parts.push(`<div class="head"><div class="ttl"><h1>${esc(title)}</h1>
      ${cfg.show_plate && plate ? `<p class="plate">${esc(cfg.privacy ? maskPlate(plate) : plate)}</p>` : ""}
      </div><span class="status ${status.cls}"><span class="dot"></span>${esc(status.label)}</span></div>`);

    // 主视觉 + 右侧数据区：窄屏上下叠放，宽屏（桌面/面板视图）左右分栏
    const side = [];
    if (mods.includes("status") && chips.length) {
      side.push(`<div class="chips">${chips
        .slice(0, 3)
        .map((c) => `<span class="chip ${c.cls}">${esc(c.label)}</span>`)
        .join("")}</div>`);
    }
    if (mods.includes("energy")) {
      const energy = this._energy(data, t);
      if (energy) side.push(energy);
    }
    const heroHtml = this._hero(this._imageUrl(data));
    parts.push(
      side.length
        ? `<div class="duo"><div class="dleft">${heroHtml}</div><div class="dright">${side.join("")}</div></div>`
        : heroHtml,
    );

    if (mods.includes("actions")) {
      parts.push(this._actions(data, t, running, offline, compact));
    }

    if (mods.includes("alerts")) {
      const alert = this._alert(data, t);
      if (alert) parts.push(alert);
    }

    if (!compact && mods.includes("tires")) {
      this._tread = this._tires(data, t);
    }

    if (!compact && mods.includes("doors")) {
      const doors = this._doors(data, t);
      if (doors) parts.push(doors);
    }

    if (!compact && mods.includes("charging")) {
      const chg = this._charging(data, t, chgNow);
      if (chg) parts.push(chg);
    }

    if (!compact && mods.includes("service")) {
      const svc = this._service(data, t);
      if (svc) parts.push(svc);
    }

    if (!compact) {
      const loc = this._location(data, t);
      if (loc) parts.push(loc);
    }

    // 底部：胎压 + 同步时间合成一条底座
    parts.push(this._baseline(data, t));

    if (this._toast) parts.push(this._toastHtml());

    return parts.join("");
  }

  // 车图 + 同心轨道 + 四枚发光节点（无图时落回圆形占位）
  _hero(imgUrl) {
    return `<div class="hero"><div class="halo"></div>
      <span class="orbit"></span><span class="orbit o2"></span>
      <i class="node n1"></i><i class="node n2"></i><i class="node n3"></i><i class="node n4"></i>
      ${imgUrl ? `<img class="carimg" src="${esc(imgUrl)}" alt="">` : `<div class="carph">${icon("car")}</div>`}
      <div class="ground"></div></div>`;
  }

  // 底座条：四轮胎压 + 同步（同步入口就是刷新按钮）
  _baseline(data, t) {
    const tread = this._tread || "";
    this._tread = "";
    const sync = this._syncChip(data, t);
    if (!tread && !sync) return "";
    return `<div class="baseline${tread ? "" : " solo"}">${tread}${tread && sync ? '<span class="bdiv"></span>' : ""}${sync}</div>`;
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
    const cfg = this._config;
    // 集成同时给了 image_url（车辆官方 CDN 图）和 entity_picture（HA 代理），CDN 直链更稳
    const pic = (slot) => {
      const st = data.get(slot);
      if (!st) return null;
      const direct = attrs(st, "image_url");
      const proxy = attrs(st, "entity_picture") || null;
      const okDirect = direct && /^https?:\/\//.test(String(direct));
      // 脱敏模式优先走 HA 代理图，浏览器不直连第三方 CDN
      if (cfg.privacy) return proxy || (okDirect ? direct : null);
      return okDirect ? direct : proxy;
    };
    if (cfg.image === "custom" && cfg.image_url) return cfg.image_url;
    if (cfg.image && cfg.image !== "auto") {
      if (/^https?:\/\//.test(cfg.image)) return cfg.image;
      if (data.states[cfg.image]) {
        const st = data.states[cfg.image];
        const direct = attrs(st, "image_url");
        return (direct && /^https?:\/\//.test(String(direct))) ? direct : attrs(st, "entity_picture");
      }
      if (cfg.image === "overlook") return pic("image_overlook");
      if (cfg.image === "3d") return pic("image_3d");
      if (cfg.image === "side") return pic("image_side");
    }
    return pic("image_overlook") || pic("image_3d") || pic("image_side");
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

    if (data.id("btn_unlock") || data.id("btn_lock")) {
      const key = lockNorm === "unlocked" ? "btn_lock" : "btn_unlock";
      const ent = data.id(key);
      if (ent) {
        const label = lockNorm === "unlocked" ? t.lockUp : t.unlock;
        const ic = lockNorm === "unlocked" ? "lock" : "unlock";
        tiles.push(this._tile({
          key,
          ent,
          cls: lockNorm === "locked" ? "on" : "hot",
          ic,
          label,
          dom: "button",
          svc: "press",
          hold,
          offline,
        }));
      }
    }
    if (data.id("btn_trunk")) {
      tiles.push(this._tile({
        key: "btn_trunk", ent: data.id("btn_trunk"), ic: "trunk", label: t.trunk,
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
      if (data.id("sw_va")) {
        pills.push(this._pill({ key: "sw_va", ent: data.id("sw_va"), ic: "speaker", label: t.soundLight, dom: "homeassistant", svc: "toggle", hold, offline }));
      }
      if (data.id("sw_light")) {
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

  _pill(o) {
    const pending = this._pending.has(o.ent);
    return `<button class="pill${o.offline ? " off" : ""}${pending ? " pending" : ""}"
      data-act="${esc(o.key)}" data-ent="${esc(o.ent)}" data-dom="${esc(o.dom)}" data-svc="${esc(o.svc)}"
      data-label="${esc(o.label)}"${o.hold(o.key)} role="button" tabindex="0">
      ${icon(o.ic)}<span>${esc(o.label)}</span></button>`;
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
    if (!open.length) {
      return `<div class="doors"><span class="door">${icon("carProfile")}${esc(t.doorsClosed)}</span></div>`;
    }
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
      <div><b>${esc(t.alert)}</b>${esc(raw)}</div></div>`;
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

  _location(data, _t) {
    const addr = text(data.get("addr"));
    const shown = addr && this._config.privacy ? maskAddr(addr) : addr;
    const tracker = data.id("tracker");
    if (!addr && !tracker) return "";
    const label = shown || (isEn(this._hass) ? "Open map" : "查看地图");
    return `<div class="doors"><span class="door" data-more="${esc(tracker || data.id("addr"))}">
      ${icon("pin")}<span class="addr">${esc(label)}</span></span></div>`;
  }

  _toastHtml() {
    const kind = this._toast.kind === "err" ? " err" : "";
    return `<div class="toast${kind}" role="status">${icon(this._toast.kind === "err" ? "warning" : "bolt")}<span>${esc(this._toast.msg)}</span></div>`;
  }

  // ---------- 交互 ----------

  _bind() {
    const w = this._wrap;
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
    return clamp(Number(this._config && this._config.hold_ms) || 700, 300, 3000);
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
    el.style.setProperty("--hc-holdms", ms + "ms");
    el.classList.add("pressing");
    this._hold = { el, armed: false };
    try {
      if (pointerId != null) el.setPointerCapture(pointerId);
    } catch {
      /* 忽略：部分 WebView 不支持指针捕获 */
    }
    this._holdTimer = setTimeout(() => {
      if (!this._hold) return;
      this._hold.armed = true;
      el.classList.add("armed");
      const lbl = el.querySelector(".lbl");
      if (lbl) lbl.textContent = dict(this._hass).armed;
      if (navigator.vibrate) navigator.vibrate(14);
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
    clearTimeout(this._holdTimer);
    h.el.classList.remove("pressing", "armed");
    const lbl = h.el.querySelector(".lbl");
    if (lbl && armed) lbl.textContent = h.el.dataset.label || "";
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

  _cancelHold() {
    if (!this._hold) return;
    clearTimeout(this._holdTimer);
    this._hold.el.classList.remove("pressing", "armed");
    const lbl = this._hold.el.querySelector(".lbl");
    if (lbl) lbl.textContent = this._hold.el.dataset.label || "";
    this._hold = null;
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
