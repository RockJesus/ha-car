import { EDITOR_STYLES } from "./styles.js";
import { detectVehicles, resolve } from "./resolve.js";
import { CONFIRMABLE, DEFAULTS, normBlocks } from "./card.js";

const BLOCK_LABELS = {
  meta: "定位/同步", hero: "车图", energy: "能耗仪表", alerts: "车辆告警",
  doors: "门窗", charging: "充电", service: "服务信息", actions: "控制按钮", custom: "自定义实体",
};
import { esc } from "./util.js";

const ACTION_LABELS = {
  btn_unlock: "开锁",
  btn_lock: "上锁",
  btn_trunk: "后备箱",
  sw_engine: "远程启动/熄火",
  sw_honk: "鸣笛寻车",
  sw_va: "声光寻车",
  sw_light: "灯光寻车",
};
const OVERRIDES = [
  ["lock", "门锁状态"],
  ["door_fl", "主驾车门"],
  ["door_fr", "副驾车门"],
  ["door_rl", "左后车门"],
  ["door_rr", "右后车门"],
  ["win_fl", "主驾车窗"],
  ["win_fr", "副驾车窗"],
  ["win_rl", "左后车窗"],
  ["win_rr", "右后车窗"],
  ["hood", "引擎盖"],
  ["tailgate", "后备箱（尾门）"],
  ["inner_tailgate", "内尾门"],
  ["fuel", "燃油量"],
  ["battery", "动力电池电量"],
  ["range", "续航里程"],
  ["odo", "总里程"],
  ["tp_lf", "左前轮胎压"],
  ["tp_rf", "右前轮胎压"],
  ["tracker", "车辆定位"],
  ["chg_status", "充电状态"],
  ["alerts", "异常警示"],
  ["btn_refresh", "手动刷新按钮"],
];
const ACCENTS = ["#37d6e8", "#6ea8ff", "#7ee2a8", "#ffb347", "#ff7ab0"];

const L = {
  vehicle: "车辆",
  vehicleHint: "选择要显示的车辆；卡片按实体前缀自动绑定，不需要手填实体。",
  autoDetect: "自动识别",
  noVehicle: "没有检测到福特派互联的车辆实体，请先在集成里完成登录。",
  title: "卡片标题",
  showPlate: "显示车牌",
  privacy: "脱敏显示",
  privacyHint: "分享截图时把车牌、地址、电话与 VIN 打码，数据本身不变",
  layout: "布局",
  layoutFull: DEFAULTS.layout === "full" ? "完整" : "完整",
  layoutCompact: "紧凑",

  guard: "防误触",
  guardHint: "开启后，下列动作需要按住不放才执行；松手太早只提示、不动作。适合后备箱、远程启动这类有实际后果的指令。",
  guardOn: "启用长按确认",
  holdMs: "长按时长",
  confirmWhich: "需要长按的动作",
  look: "外观",
  imageMode: "车辆图片",
  imageUrl: "图片地址",
  accent: "强调色",
  advanced: "高级：实体绑定",
  advancedHint: "留空即自动识别。只有实体被改名或一台车挂多个集成时才需要填。",
  autofill: "自动适配集成实体",
  autofillDone: "已把集成里识别到的实体填入下列位置",
};
const IMG_MODES = [
  ["auto", "自动（俯视 → 3D → 侧视）"],
  ["overlook", "俯视车型图"],
  ["3d", "3D 车型图"],
  ["side", "侧视车型图"],
  ["custom", "自定义图片地址"],
];

class HaCarEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._built = false;
  }

  setConfig(config) {
    this._config = Object.assign({}, DEFAULTS, config || {});
    this._config.entities = Object.assign({}, this._config.entities || {});
    if (!Array.isArray(this._config.modules)) this._config.modules = DEFAULTS.modules.slice();
    if (!Array.isArray(this._config.confirm)) this._config.confirm = DEFAULTS.confirm.slice();
    this._config.blocks = normBlocks(this._config);
    if (!this._built) this._build();
    this._sync();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._built) this._syncVehicles();
  }

  _build() {
    const root = this.shadowRoot;
    root.innerHTML = `<style>${EDITOR_STYLES}</style>
    <div class="ed">
      <div class="sec">
        <h3>${L.vehicle}</h3>
        <p class="hint">${L.vehicleHint}</p>
        <select class="tf" id="veh"></select>
        <p class="hint" id="vehhint" style="margin-top:6px"></p>
        <label class="f" for="title">${L.title}</label>
        <input class="tf" id="title" type="text" placeholder="我的座驾">
        <div class="row"><span class="rl">${L.showPlate}</span>
          <button class="sw" id="plate" role="switch" aria-checked="true"></button></div>
        <div class="row"><span class="rl">${L.privacy}</span>
          <button class="sw" id="privacy" role="switch" aria-checked="false"></button></div>
        <p class="hint">${L.privacyHint}</p>
        <label class="f">${L.layout}</label>
        <div class="chips2" id="layouts">
          <button class="tg" type="button" data-layout="full">完整（含胎压/门窗/服务）</button>
          <button class="tg" type="button" data-layout="compact">紧凑</button>
        </div>
      </div>

      <div class="sec">
        <h3>模块布局</h3>
        <p class="hint">上下箭头调整顺序，开关控制显示，✕ 删除。车图是固定锚点（首个模块 / 宽屏左栏），其余模块严格按此顺序排列：手机从上到下，宽屏排右栏。</p>
        <div id="blk" class="blklist"></div>
        <label class="f">添加模块</label>
        <div style="display:flex;gap:6px">
          <select class="tf" id="blkadd">
            <option value="custom">自定义实体</option>
            <option value="meta">定位/同步</option>
            <option value="hero">车图</option>
            <option value="energy">能耗仪表</option>
            <option value="alerts">车辆告警</option>
            <option value="doors">门窗</option>
            <option value="charging">充电</option>
            <option value="service">服务信息</option>
            <option value="actions">控制按钮</option>
          </select>
          <button class="btn" id="blkaddbtn" type="button" style="min-width:64px">添加</button>
        </div>
      </div>

      <div class="sec">
        <h3>${L.guard}</h3>
        <p class="hint">${L.guardHint}</p>
        <div class="row"><span class="rl">${L.guardOn}</span>
          <button class="sw" id="guard" role="switch" aria-checked="true"></button></div>
        <label class="f">${L.holdMs}</label>
        <div class="ranged"><input type="range" id="hold" min="300" max="2000" step="100">
          <span id="holdv" style="font-size:12px;min-width:64px">2000 ms</span></div>
        <label class="f">${L.confirmWhich}</label>
        <div class="chips2" id="confirms"></div>
      </div>

      <div class="sec">
        <h3>${L.look}</h3>
        <label class="f" for="imgmode">${L.imageMode}</label>
        <select class="tf" id="imgmode">
          ${IMG_MODES.map(([v, n]) => `<option value="${v}">${n}</option>`).join("")}
        </select>
        <input class="tf" id="imgurl" type="text" placeholder="https://…" style="margin-top:6px;display:none">
        <label class="f">${L.accent}</label>
        <div class="swatches" id="swatches">
          ${ACCENTS.map((c) => `<span class="swatch" data-color="${c}" style="background:${c}"></span>`).join("")}
          <input type="color" id="color" style="width:30px;height:28px;border:none;background:none;cursor:pointer">
        </div>
      </div>

      <details class="sec adv">
        <summary style="cursor:pointer;font-size:13px;font-weight:600">${L.advanced}</summary>
        <p class="hint" style="margin-top:8px">${L.advancedHint}</p>
        <button class="btn" id="autofill" type="button" style="margin:8px 0 4px">${L.autofill}</button>
        <p class="hint" id="autofillhint" style="margin-bottom:8px"></p>
        <div class="grid2">
          ${OVERRIDES.map(
            ([slot, label]) => `<label class="f">${label}</label>
            <input class="tf" data-ov="${slot}" type="text" placeholder="sensor.xxx_${slot}">`,
          ).join("")}
        </div>
      </details>
    </div>`;

    this._built = true;
    this._wire();
    this._renderChips();
  }

  _wire() {
    const q = (id) => this.shadowRoot.getElementById(id);

    q("autofill").addEventListener("click", () => {
      if (!this._hass) return;
      const d = resolve(this._hass, this._config);
      const cfg = Object.assign({}, this._config, { entities: Object.assign({}, this._config.entities || {}) });
      let n = 0;
      for (const [slot] of OVERRIDES) {
        const id = d.id(slot);
        if (id) { cfg.entities[slot] = id; n += 1; }
      }
      this._config = cfg;
      this._sync();
      const hint = this.shadowRoot.getElementById("autofillhint");
      if (hint) hint.textContent = `${L.autofillDone} ${n} 项`;
      this._emit();
    });

    q("veh").addEventListener("change", (e) => {
      const v = e.target.value;
      if (v) this._config.hash = v;
      else delete this._config.hash;
      this._syncVehicles();
      this._emit();
    });

    q("title").addEventListener("input", (e) => {
      this._config.title = e.target.value.trim();
      this._emit();
    });

    q("privacy").addEventListener("click", () => {
      this._config.privacy = !this._config.privacy;
      q("privacy").setAttribute("aria-checked", String(Boolean(this._config.privacy)));
      this._emit();
    });

    q("plate").addEventListener("click", () => {
      this._config.show_plate = !this._config.show_plate;
      this._sync();
      this._emit();
    });

    this.shadowRoot.getElementById("layouts").addEventListener("click", (e) => {
      const b = e.target.closest("[data-layout]");
      if (!b) return;
      this._config.layout = b.dataset.layout;
      this._sync();
      this._emit();
    });

    q("guard").addEventListener("click", () => {
      this._config.confirm = this._config.confirm.length ? [] : DEFAULTS.confirm.slice();
      this._sync();
      this._emit();
    });

    q("hold").addEventListener("input", (e) => {
      this._config.hold_ms = Number(e.target.value);
      this.shadowRoot.getElementById("holdv").textContent = `${this._config.hold_ms} ms`;
      this._emit();
    });

    this.shadowRoot.getElementById("confirms").addEventListener("click", (e) => {
      const b = e.target.closest("[data-confirm]");
      if (!b) return;
      const key = b.dataset.confirm;
      const list = this._config.confirm || [];
      this._config.confirm = list.includes(key) ? list.filter((k) => k !== key) : [...list, key];
      this._sync();
      this._emit();
    });

    q("imgmode").addEventListener("change", (e) => {
      this._config.image = e.target.value;
      this._sync();
      this._emit();
    });

    q("imgurl").addEventListener("input", (e) => {
      this._config.image_url = e.target.value.trim();
      this._emit();
    });

    this.shadowRoot.getElementById("swatches").addEventListener("click", (e) => {
      const s = e.target.closest("[data-color]");
      if (!s) return;
      this._config.accent = s.dataset.color;
      this._sync();
      this._emit();
    });

    q("color").addEventListener("input", (e) => {
      this._config.accent = e.target.value;
      this._sync();
      this._emit();
    });

    this.shadowRoot.querySelectorAll("[data-ov]").forEach((input) => {
      input.addEventListener("input", (e) => {
        const slot = e.target.dataset.ov;
        const val = e.target.value.trim();
        this._config.entities = this._config.entities || {};
        if (val) this._config.entities[slot] = val;
        else delete this._config.entities[slot];
        this._emit();
      });
    });

    q("blkaddbtn").addEventListener("click", () => {
      const type = this.shadowRoot.getElementById("blkadd").value;
      const blocks = (this._config.blocks || []).slice();
      blocks.push({ type, on: true, entity: "", label: type === "custom" ? "自定义" : "", unit: "", icon: "" });
      this._config.blocks = blocks;
      this._renderBlocks();
      this._emit();
    });

    this.shadowRoot.getElementById("blk").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-bk]");
      if (!btn) return;
      const i = Number(btn.dataset.i);
      const act = btn.dataset.bk;
      const blocks = (this._config.blocks || []).slice();
      if (!blocks[i]) return;
      if (act === "up" && i > 0) [blocks[i - 1], blocks[i]] = [blocks[i], blocks[i - 1]];
      else if (act === "dn" && i < blocks.length - 1) [blocks[i + 1], blocks[i]] = [blocks[i], blocks[i + 1]];
      else if (act === "on") blocks[i] = Object.assign({}, blocks[i], { on: blocks[i].on === false });
      else if (act === "del") blocks.splice(i, 1);
      this._config.blocks = blocks;
      this._renderBlocks();
      this._emit();
    });

    this.shadowRoot.getElementById("blk").addEventListener("input", (e) => {
      const tEl = e.target.closest("[data-bf]");
      if (!tEl) return;
      const i = Number(tEl.dataset.i);
      const blocks = (this._config.blocks || []).slice();
      if (!blocks[i]) return;
      const f = tEl.dataset.bf;
      blocks[i] = Object.assign({}, blocks[i], { [f]: tEl.value.trim() });
      this._config.blocks = blocks;
      this._emit();
    });
  }

  _renderChips() {

    const confirms = this.shadowRoot.getElementById("confirms");
    confirms.innerHTML = CONFIRMABLE.map(
      (k) => `<button class="tg" type="button" data-confirm="${k}">${ACTION_LABELS[k] || k}</button>`,
    ).join("");
  }

  _renderBlocks() {
    const host = this.shadowRoot.getElementById("blk");
    if (!host) return;
    const blocks = this._config.blocks || [];
    const ents = [];
    if (this._hass && this._hass.states) {
      for (const id of Object.keys(this._hass.states)) {
        if (/^(sensor|binary_sensor|switch|number|input_|device_tracker|image|light|update)\./.test(id)) ents.push(id);
      }
      ents.sort();
    }
    const rows = blocks.map((b, i) => {
      const nm = `${BLOCK_LABELS[b.type] || b.type}${b.entity ? " · " + b.entity : ""}`;
      const off = b.on === false ? " off" : "";
      const pinned = b.type === "hero";
      const entSel = b.type === "custom"
        ? `<select class="tf ent" data-bf="entity" data-i="${i}">
            <option value="">选择实体…</option>
            ${ents.map((id) => `<option value="${esc(id)}"${id === b.entity ? " selected" : ""}>${esc(id)}</option>`).join("")}
          </select>
          <input class="tf" data-bf="label" data-i="${i}" value="${esc(b.label || "")}" placeholder="显示名称" style="flex:1 1 90px">
          <input class="tf" data-bf="unit" data-i="${i}" value="${esc(b.unit || "")}" placeholder="单位" style="flex:0 0 62px">`
        : "";
      return `<div class="blkrow${off}">
        <div class="bk-top">
          <button class="btn sq" data-bk="up" data-i="${i}" type="button"${pinned ? " disabled" : ""}>↑</button>
          <button class="btn sq" data-bk="dn" data-i="${i}" type="button"${pinned ? " disabled" : ""}>↓</button>
          <span class="nm">${esc(nm)}</span>
          <button class="sw" data-bk="on" data-i="${i}" role="switch" aria-checked="${b.on !== false}"></button>
          <button class="btn sq del" data-bk="del" data-i="${i}" type="button">✕</button>
        </div>
        ${entSel ? `<div class="bk-sub">${entSel}</div>` : ""}
      </div>`;
    });
    host.innerHTML = rows.join("") || `<p class="hint">还没有模块，从下面添加。</p>`;
  }

  _syncVehicles() {
    const sel = this.shadowRoot.getElementById("veh");
    if (!sel) return;
    const cars = this._hass ? detectVehicles(this._hass) : [];
    const opts = [`<option value="">${L.autoDetect}</option>`];
    for (const car of cars) {
      const nickHit = car.slots && car.slots.get("nickname");
      const nick = nickHit ? this._hass.states[nickHit.id] : null;
      const label = car.name || (nick && nick.state) || car.hash;
      opts.push(`<option value="${esc(car.hash)}">${esc(label)}</option>`);
    }
    sel.innerHTML = opts.join("");
    sel.value = (this._config && this._config.hash) || "";
    const hint = this.shadowRoot.getElementById("vehhint");
    if (hint) hint.textContent = cars.length ? "" : L.noVehicle;
  }

  _sync() {
    if (!this._built) return;
    const q = (id) => this.shadowRoot.getElementById(id);
    this._syncVehicles();
    q("title").value = this._config.title || "";
    q("plate").setAttribute("aria-checked", String(Boolean(this._config.show_plate)));
    q("privacy").setAttribute("aria-checked", String(Boolean(this._config.privacy)));
    this.shadowRoot.querySelectorAll("[data-layout]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.layout === (this._config.layout || "full")));
    });
    this._renderBlocks();
    q("guard").setAttribute("aria-checked", String((this._config.confirm || []).length > 0));
    const hold = Number(this._config.hold_ms) || 2000;
    q("hold").value = String(hold);
    q("holdv").textContent = `${hold} ms`;
    this.shadowRoot.querySelectorAll("[data-confirm]").forEach((b) => {
      b.setAttribute("aria-pressed", String((this._config.confirm || []).includes(b.dataset.confirm)));
    });
    q("imgmode").value = this._config.image || "auto";
    q("imgurl").style.display = this._config.image === "custom" ? "block" : "none";
    q("imgurl").value = this._config.image_url || "";
    q("color").value = /^#[0-9a-f]{6}$/i.test(this._config.accent || "") ? this._config.accent : "#37d6e8";
    this.shadowRoot.querySelectorAll(".swatch").forEach((s) => {
      s.classList.toggle("sel", s.dataset.color.toLowerCase() === String(this._config.accent || "").toLowerCase());
    });
    this.shadowRoot.querySelectorAll("[data-ov]").forEach((input) => {
      input.value = (this._config.entities && this._config.entities[input.dataset.ov]) || "";
    });
  }

  _emit() {
    const cfg = Object.assign({}, this._config);
    cfg.entities = Object.assign({}, cfg.entities || {});
    for (const [k, v] of Object.entries(cfg.entities)) {
      if (!v) delete cfg.entities[k];
    }
    if (!Object.keys(cfg.entities).length) delete cfg.entities;
    if (!cfg.title) delete cfg.title;
    if (!cfg.image_url) delete cfg.image_url;
    if (cfg.image === "custom" && !cfg.image_url) delete cfg.image;
    if (cfg.hold_ms === DEFAULTS.hold_ms) delete cfg.hold_ms;
    if (cfg.accent === DEFAULTS.accent) delete cfg.accent;
    if (cfg.image === "auto") delete cfg.image;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: cfg },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

customElements.define("ha-car-editor", HaCarEditor);

export { HaCarEditor };
