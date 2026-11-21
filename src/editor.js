import { EDITOR_STYLES } from "./styles.js";
import { detectVehicles, resolve } from "./resolve.js";
import { actionKeys, DEFAULTS, ITEM_DEFS, THEMES, defaultItems, isMediaSource, normBlocks, normalizeConfirm } from "./card.js";

const BLOCK_LABELS = {
  meta: "定位/同步", hero: "车图", energy: "能耗仪表", alerts: "车辆告警",
  doors: "门窗胎压引擎", charging: "充电", service: "服务信息", actions: "控制按钮", custom: "自定义实体",
};
import { esc } from "./util.js";

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
  ["ev_range", "纯电续航"],
  ["odo", "总里程"],
  ["volt", "蓄电池电压"],
  ["oil", "机油寿命"],
  ["adblue", "尿素余量（AdBlue）"],
  ["h2", "氢罐余量"],
  ["dpf", "DPF 状态"],
  ["coolant", "冷却液温度"],
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
  vehicleHint: "选择要显示的车辆；福特派/林肯之道会按实体前缀自动绑定，其他品牌/集成可在下方手动指定实体。",
  autoDetect: "自动识别",
  noVehicle: "没有自动识别到整车实体。其他品牌/集成可先在下方按槽位或模块项手动指定实体（车标也会自动切换为通用文字标）。",
  title: "卡片标题",
  showPlate: "显示车牌",
  privacy: "脱敏显示",
  privacyHint: "分享截图时把车牌、地址、电话与 VIN 打码，数据本身不变",
  layout: "布局",
  layoutFull: DEFAULTS.layout === "full" ? "完整" : "完整",
  layoutCompact: "紧凑",

  guard: "防误触",
  guardHint: "开启后，所有动作按钮（含动作模块里自定义添加的实体按钮）都需要按住不放才执行；松手太早只提示、不动作。下拉选择不参与。",
  guardOn: "启用长按确认",
  holdMs: "长按时长",
  look: "外观",
  imageMode: "车辆图片",
  imageUrl: "图片地址",
  accent: "强调色",
  bgLabel: "卡片背景图",
  bgHint: "从 HA 媒体库选择或上传图片；留空使用主题背景。已有 https://、/local/… 或 data:image/… 地址会继续生效。",
  bgPlaceholder: "https://… 或 /local/…",
  theme: "主题",
  themeHint: "换一套漆面与背光配色，版式不变；下面的强调色会覆盖主题色。",
  bgStyle: "传感器背景",
  bgStyleHint: "换车图周围的环与光效，车图、状态卡与按钮不变。",
  chipStyle: "状态卡样式",
  chipStyleHint: "换四个车门与前后盖状态卡的外形，内容与尺寸不变。",
  items: "实体",
  addEntity: "添加实体",
  advanced: "高级：实体绑定",
  advancedHint: "留空即自动识别。只有实体被改名或一台车挂多个集成时才需要填。",
  autofill: "自动适配集成实体",
  autofillDone: "已把集成里识别到的实体填入下列位置",
  gaugeFull: "仪表量程",
  gaugeFullHint: "每台车的满油/满电续航不一样，填上你这台车的上限，环形进度才准。留空用车型默认值。",
  rangeFull: "满续航（km）",
  evRangeFull: "满电续航（km）",
  fixedSize: "固定尺寸",
  fixedSizeHint: "留空＝随格子自适应（默认）。填了宽度后卡片按该尺寸排版、居中，不再随窗口或列宽缩放；宽度或高度留空时，该项仍取容器尺寸。",
  fixedW: "固定宽度（px）",
  fixedH: "固定高度（px）",
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
    this._openBk = new Set();
    this._bgMeta = new Map();
    this._bgMetaLoading = new Set();
  }

  setConfig(config) {
    this._config = Object.assign({}, DEFAULTS, config || {});
    this._config.entities = Object.assign({}, this._config.entities || {});
    this._config.find = Object.assign({ phone: "", car: "" }, this._config.find && typeof this._config.find === "object" ? this._config.find : {});
    this._config.bg_image = typeof this._config.bg_image === "string" ? this._config.bg_image.trim() : "";
    for (const k of ["range_full", "ev_range_full"]) {
      const n = Math.round(Number(this._config[k]) || 0);
      this._config[k] = n > 0 ? Math.min(2000, n) : 0;
    }
    if (!Array.isArray(this._config.modules)) this._config.modules = DEFAULTS.modules.slice();
    this._config.blocks = normBlocks(this._config);
    this._config.confirm = normalizeConfirm(config, this._config);
    if (!this._built) this._build();
    this._sync();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._built) return;
    this._syncVehicles();
    this._syncPickerHass();
    this._syncBackground();
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
        <label class="f">品牌标识</label>
        <select class="tf" id="brand">
          <option value="auto">自动识别（按设备厂商）</option>
          <option value="ford">福特 Ford</option>
          <option value="lincoln">林肯 Lincoln</option>
          <option value="generic">其他品牌（通用）</option>
        </select>
        <div id="genrow" style="display:none">
          <label class="f">品牌名（通用模式显示）</label>
          <input class="tf" id="brandname" type="text" maxlength="8" placeholder="特斯拉 / BMW">
          <label class="f">自定义车标图片 URL（可选）</label>
          <input class="tf" id="logourl" type="text" placeholder="/local/xxx/logo.png 或 https://…">
          <p class="hint" style="margin-top:4px">不填图就用上面的文字标；图片建议透明底、高 40–80px。</p>
        </div>
        <div class="row"><span class="rl">${L.showPlate}</span>
          <button class="sw" id="plate" role="switch" aria-checked="true"></button></div>
        <div class="row"><span class="rl">${L.privacy}</span>
          <button class="sw" id="privacy" role="switch" aria-checked="false"></button></div>
        <p class="hint">${L.privacyHint}</p>
        <label class="f">${L.layout}</label>
        <div class="chips2" id="layouts">
          <button class="tg" type="button" data-layout="full">完整</button>
          <button class="tg" type="button" data-layout="compact">紧凑</button>
        </div>
      </div>

      <div class="sec">
        <h3>找车引导</h3>
        <p class="hint">选择手机、登录设备与车辆的定位实体。手机定位需带 latitude / longitude；未取得手机坐标时会尝试浏览器网络定位，再退回登录设备定位。手机指南针在打开找车面板时会自动申请一次授权，若被拒绝可点“校准指南针”重新授权。</p>
        <label class="f">手机定位</label>
        <div class="pick" id="findphone"></div>
        <label class="f" style="margin-top:6px">登录设备定位（兜底）</label>
        <div class="pick" id="finddevice"></div>
        <label class="f" style="margin-top:6px">车辆定位</label>
        <div class="pick" id="findcar"></div>
        <p class="hint" id="findhint"></p>
      </div>

      <div class="sec">
        <h3>模块布局</h3>
        <p class="hint">上下箭头调整顺序，开关控制显示，✕ 删除。手机从上到下排列；宽屏时车图固定在左栏，其余模块按此顺序排右栏。所有模块和模块内实体都能增删与排序。</p>
        <div id="blk" class="blklist"></div>
        <label class="f">添加模块</label>
        <div style="display:flex;gap:6px">
          <select class="tf" id="blkadd">
            <option value="custom">自定义实体</option>
            <option value="meta">定位/同步</option>
            <option value="hero">车图</option>
            <option value="energy">能耗仪表</option>
            <option value="alerts">车辆告警</option>
            <option value="doors">门窗胎压引擎</option>
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
      </div>

      <div class="sec">
        <h3>${L.look}</h3>
        <label class="f" for="imgmode">${L.imageMode}</label>
        <select class="tf" id="imgmode">
          ${IMG_MODES.map(([v, n]) => `<option value="${v}">${n}</option>`).join("")}
        </select>
        <input class="tf" id="imgurl" type="text" placeholder="https://…" style="margin-top:6px;display:none">
        <label class="f" for="theme">${L.theme}</label>
        <select class="tf" id="theme">
          ${Object.entries(THEMES).map(([v, t]) => `<option value="${v}">${t.name}</option>`).join("")}
        </select>
        <p class="hint" style="margin-top:4px">${L.themeHint}</p>
        <label class="f" for="bgstyle">${L.bgStyle}</label>
        <select class="tf" id="bgstyle">
          <option value="radar">雷达同心环</option>
          <option value="grid">点阵网格 HUD</option>
          <option value="glass">液态玻璃</option>
          <option value="cyber">赛博脉冲</option>
          <option value="minimal">极简深空</option>
        </select>
        <p class="hint" style="margin-top:4px">${L.bgStyleHint}</p>
        <label class="f" for="chipstyle">${L.chipStyle}</label>
        <select class="tf" id="chipstyle">
          <option value="glass">玻璃（默认）</option>
          <option value="pill">全胶囊</option>
          <option value="bar">侧光条</option>
          <option value="liquid">液态玻璃</option>
          <option value="line">线框极简</option>
          <option value="cyber">赛博切角</option>
        </select>
        <p class="hint" style="margin-top:4px">${L.chipStyleHint}</p>
        <label class="f">${L.accent}</label>
        <div class="swatches" id="swatches">
          ${ACCENTS.map((c) => `<span class="swatch" data-color="${c}" style="background:${c}"></span>`).join("")}
          <label class="cwheel" id="colorwheel" title="自定义强调色" aria-label="自定义强调色">
            <input type="color" id="color" aria-label="自定义强调色">
            <span class="cface" aria-hidden="true"></span><span class="cdot" aria-hidden="true"></span>
          </label>
        </div>
        <div class="row"><span class="rl">${L.bgLabel}</span>
          <button class="btn sq clr" id="bgclr" type="button" title="清除背景图" aria-label="清除背景图">✕</button></div>
        <div class="pick" id="bgimage"></div>
        <p class="hint" style="margin-top:4px">${L.bgHint}</p>
        <label class="f">${L.gaugeFull}</label>
        <p class="hint" style="margin-top:-2px">${L.gaugeFullHint}</p>
        <div class="grid2">
          <label class="f">${L.rangeFull}</label>
          <input class="tf" id="rangefull" type="number" min="0" max="2000" step="10" placeholder="620">
          <label class="f">${L.evRangeFull}</label>
          <input class="tf" id="evrangefull" type="number" min="0" max="2000" step="10" placeholder="500">
        </div>
        <label class="f">${L.fixedSize}</label>
        <p class="hint" style="margin-top:-2px">${L.fixedSizeHint}</p>
        <div class="grid2">
          <label class="f">${L.fixedW}</label>
          <input class="tf" id="fixedw" type="number" min="0" max="2000" step="10" placeholder="430">
          <label class="f">${L.fixedH}</label>
          <input class="tf" id="fixedh" type="number" min="0" max="3000" step="10" placeholder="留空">
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
            <div class="pickrow"><div class="pick" data-ov="${slot}"></div>
              <button class="btn sq clr" data-clr="${slot}" type="button" title="清空" aria-label="清空">✕</button></div>`,
          ).join("")}
        </div>
      </details>
    </div>`;

    this._built = true;
    this._wire();
    this._mountBgPicker();
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

    q("brand").addEventListener("change", (e) => {
      this._config.brand = e.target.value;
      this._syncGenRow();
      this._emit();
    });

    q("brandname").addEventListener("input", (e) => {
      this._config.brand_name = e.target.value.trim().slice(0, 8);
      this._emit();
    });

    q("logourl").addEventListener("change", (e) => {
      const v = e.target.value.trim();
      this._config.logo_url = /^(https?:\/\/|data:image\/|\/local\/)/i.test(v) ? v : "";
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
      this._config.confirm = this._config.confirm.length ? [] : actionKeys(this._config);
      this._syncGuard();
      this._emit();
    });

    q("hold").addEventListener("input", (e) => {
      this._config.hold_ms = Number(e.target.value);
      this.shadowRoot.getElementById("holdv").textContent = `${this._config.hold_ms} ms`;
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

    q("chipstyle").addEventListener("change", (e) => {
      this._config.chip_style = e.target.value;
      this._emit();
    });

    q("bgstyle").addEventListener("change", (e) => {
      this._config.bg_style = e.target.value;
      this._emit();
    });

    q("theme").addEventListener("change", (e) => {
      this._config.theme = e.target.value;
      this._emit();
    });

    for (const [id, key, max] of [["fixedw", "fixed_width", 2000], ["fixedh", "fixed_height", 3000]]) {
      q(id).addEventListener("change", (e) => {
        const n = Math.round(Number(e.target.value) || 0);
        this._config[key] = n > 0 ? Math.max(320, Math.min(max, n)) : 0;
        this._sync();
        this._emit();
      });
    }

    for (const [id, key] of [["rangefull", "range_full"], ["evrangefull", "ev_range_full"]]) {
      q(id).addEventListener("change", (e) => {
        const n = Math.round(Number(e.target.value) || 0);
        this._config[key] = n > 0 ? Math.min(2000, n) : 0;
        this._sync();
        this._emit();
      });
    }

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

    q("bgclr").addEventListener("click", () => {
      this._config.bg_image = "";
      this._syncBackground();
      this._emit();
    });



    this.shadowRoot.getElementById("blk").addEventListener("click", (e) => {
      const c = e.target.closest("[data-bkclr]");
      if (!c) return;
      this._setBlockField(Number(c.dataset.bkclr), "entity", "");
    });
    this.shadowRoot.querySelector(".adv").addEventListener("click", (e) => {
      const c = e.target.closest("[data-clr]");
      if (!c) return;
      this._config.entities = this._config.entities || {};
      delete this._config.entities[c.dataset.clr];
      this._syncPickers();
      this._emit();
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
      const add = e.target.closest("[data-biadd]");
      if (add) {
        const i = Number(add.dataset.biadd);
        const blocks = (this._config.blocks || []).slice();
        const b = blocks[i];
        if (!b) return;
        const items = this._blockItems(b).map((x) => Object.assign({}, x));
        items.push({ slot: "", entity: "", label: "", unit: "", icon: "" });
        blocks[i] = Object.assign({}, b, { items });
        this._config.blocks = blocks;
        this._openBk.add(String(i));
        this._renderBlocks();
        this._emit();
        return;
      }
      const mv = e.target.closest("[data-bimv]");
      if (mv) {
        const i = Number(mv.dataset.bi);
        const j = Number(mv.dataset.bj);
        const blocks = (this._config.blocks || []).slice();
        const b = blocks[i];
        if (!b) return;
        const items = this._blockItems(b).map((x) => Object.assign({}, x));
        const act = mv.dataset.bimv;
        if (act === "up" && j > 0) [items[j - 1], items[j]] = [items[j], items[j - 1]];
        else if (act === "dn" && j < items.length - 1) [items[j + 1], items[j]] = [items[j], items[j + 1]];
        blocks[i] = Object.assign({}, b, { items });
        this._config.blocks = blocks;
        this._renderBlocks();
        this._emit();
        return;
      }
      const clr = e.target.closest("[data-bicl]");
      if (clr) {
        const i = Number(clr.dataset.bicl);
        const j = Number(clr.dataset.bj);
        const blocks = (this._config.blocks || []).slice();
        const b = blocks[i];
        if (!b) return;
        const items = this._blockItems(b).map((x) => Object.assign({}, x));
        items.splice(j, 1);
        blocks[i] = Object.assign({}, b, { items });
        this._config.blocks = blocks;
        this._renderBlocks();
        this._emit();
        return;
      }
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

    this.shadowRoot.getElementById("blk").addEventListener("change", (e) => {
      const lab = e.target.closest("[data-bilab]");
      if (lab) {
        const [i, j] = lab.dataset.bilab.split(":").map(Number);
        const blocks = (this._config.blocks || []).slice();
        const b = blocks[i];
        if (!b) return;
        const items = this._blockItems(b).map((x) => Object.assign({}, x));
        if (!items[j]) return;
        items[j] = Object.assign({}, items[j], { label: lab.value.trim() });
        blocks[i] = Object.assign({}, b, { items });
        this._config.blocks = blocks;
        this._emit();
        return;
      }
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

  _syncGuard() {
    const guard = this.shadowRoot.getElementById("guard");
    if (guard) guard.setAttribute("aria-checked", String((this._config.confirm || []).length > 0));
  }

  _blockItems(b) {
    if (Array.isArray(b.items)) return b.items;
    if (b.type === "custom" && (b.entity || b.label || b.icon)) {
      return [{ slot: "", entity: b.entity, label: b.label, unit: b.unit, icon: b.icon }];
    }
    return defaultItems(b.type);
  }

  _itemLabel(it) {
    if (it.label) return it.label;
    if (it.slot && ITEM_DEFS[it.slot]) return ITEM_DEFS[it.slot].zh;
    const ent = it.entity || "";
    const st = ent && this._hass && this._hass.states[ent];
    const fn = st && st.attributes && st.attributes.friendly_name;
    if (fn) return String(fn);
    return "实体";
  }

  _mountBgPicker() {
    const host = this.shadowRoot.getElementById("bgimage");
    if (!host) return;
    if (!customElements.get("ha-selector")) {
      const inp = document.createElement("input");
      inp.className = "tf";
      inp.id = "bgimageinput";
      inp.placeholder = this._config.bg_image || "https://… 或 /local/…";
      inp.addEventListener("input", () => {
        this._config.bg_image = inp.value.trim();
        this._emit();
      });
      host.appendChild(inp);
      return;
    }
    const p = document.createElement("ha-selector");
    p.selector = { media: { accept: ["image/jpeg", "image/png", "image/gif"], image_upload: true, multiple: false } };
    p.required = false;
    p.hass = this._hass;
    p.addEventListener("value-changed", (e) => {
      const v = e.detail && e.detail.value;
      const id = typeof v === "string" ? v : (v && v.media_content_id) || "";
      this._config.bg_image = String(id || "").trim();
      if (id && v && v.metadata) this._bgMeta.set(id, v.metadata);
      this._emit();
      this._syncBackground();
    });
    host.appendChild(p);
    this._syncBackground();
  }

  _syncBackground() {
    const host = this.shadowRoot.getElementById("bgimage");
    if (!host) return;
    const raw = this._config.bg_image || "";
    const p = host.querySelector("ha-selector");
    if (p) {
      p.hass = this._hass;
      const meta = this._bgMeta.get(raw);
      const next = isMediaSource(raw)
        ? { media_content_id: raw, media_content_type: "image", ...(meta ? { metadata: meta } : {}) }
        : undefined;
      const cur = p.value && p.value.media_content_id;
      const needsMeta = isMediaSource(raw) && !(p.value && p.value.metadata && p.value.metadata.thumbnail);
      if ((cur || "") !== (next ? next.media_content_id : "") || (next && needsMeta)) p.value = next;
      if (isMediaSource(raw) && !meta) this._hydrateBgMeta(raw);
      return;
    }
    const inp = host.querySelector("input");
    if (inp) inp.value = raw;
  }

  _hydrateBgMeta(raw) {
    if (this._bgMeta.has(raw) || this._bgMetaLoading.has(raw) || !this._hass || !this._hass.callWS) return;
    this._bgMetaLoading.add(raw);
    this._hass.callWS({ type: "media_source/resolve_media", media_content_id: raw })
      .then((res) => {
        if (!res || !res.url) return;
        const name = raw.split("/").filter(Boolean).pop() || raw;
        this._bgMeta.set(raw, { title: name, thumbnail: res.url, media_class: "image" });
        if (this._config.bg_image === raw) this._syncBackground();
      })
      .catch(() => {})
      .finally(() => this._bgMetaLoading.delete(raw));
  }

  _renderBlocks() {
    const host = this.shadowRoot.getElementById("blk");
    if (!host) return;
    const blocks = this._config.blocks || [];
    const rows = blocks.map((b, i) => {
      const nm = BLOCK_LABELS[b.type] || b.type;
      const off = b.on === false ? " off" : "";
      const its = this._blockItems(b);
      const itemRows = its
        .map((it, j) => {
          const label = this._itemLabel(it);
          const free = !it.slot;
          return `<div class="birow">
            <div class="bih">
              ${free
                ? `<input class="tf bil" data-bilab="${i}:${j}" value="${esc(it.label || "")}" placeholder="${esc(this._itemLabel(it))}">`
                : `<span class="bil">${esc(label)}</span>`}
              <button class="btn sq" data-bimv="up" data-bi="${i}" data-bj="${j}" type="button">↑</button>
              <button class="btn sq" data-bimv="dn" data-bi="${i}" data-bj="${j}" type="button">↓</button>
              <button class="btn sq clr" data-bicl="${i}" data-bj="${j}" type="button" title="移除实体" aria-label="移除实体">✕</button>
            </div>
            <div class="bipickrow">
              <div class="pick" data-bipick="${i}:${j}"></div>
            </div>
          </div>`;
        })
        .join("");
      return `<div class="blkrow${off}">
        <div class="bk-top">
          <button class="btn sq" data-bk="up" data-i="${i}" type="button">↑</button>
          <button class="btn sq" data-bk="dn" data-i="${i}" type="button">↓</button>
          <span class="nm">${esc(nm)}</span>
          <button class="sw" data-bk="on" data-i="${i}" role="switch" aria-checked="${b.on !== false}"></button>
          <button class="btn sq del" data-bk="del" data-i="${i}" type="button">✕</button>
        </div>
        <details class="bk-items" data-bdet="${i}"${this._openBk.has(String(i)) ? " open" : ""}>
          <summary>${L.items} · ${its.length}</summary>
          <div class="bitems">${itemRows}
            <button class="btn addbi" data-biadd="${i}" type="button">+ ${L.addEntity}</button>
          </div>
        </details>
      </div>`;
    });
    host.innerHTML = rows.join("") || `<p class="hint">还没有模块，从下面添加。</p>`;
    blocks.forEach((b, i) => {
      this._blockItems(b).forEach((it, j) => {
        const h = host.querySelector(`[data-bipick="${i}:${j}"]`);
        if (!h) return;
        const val = it.entity || (it.slot ? (this._config.entities || {})[it.slot] : "") || "";
        this._mountPicker(h, val, (v) => this._setBlockItem(i, j, v), it.slot ? "自动识别" : "");
      });
    });
    host.querySelectorAll("details.bk-items").forEach((d) => {
      d.addEventListener("toggle", () => {
        const k = d.dataset.bdet;
        if (d.open) this._openBk.add(k);
        else this._openBk.delete(k);
      });
    });
  }

  _setBlockItem(i, j, value) {
    const blocks = (this._config.blocks || []).slice();
    const b = blocks[i];
    if (!b) return;
    const items = this._blockItems(b).map((x) => Object.assign({}, x));
    if (!items[j]) return;
    items[j] = Object.assign({}, items[j], { entity: value });
    blocks[i] = Object.assign({}, b, { items });
    this._config.blocks = blocks;
    // 防误触已开启时，新选的自定义动作按钮默认也纳入长按
    if (b.type === "actions" && value) {
      const key = items[j].slot || value;
      if ((this._config.confirm || []).length && !this._config.confirm.includes(key)) {
        this._config.confirm = [...this._config.confirm, key];
      }
    }
    this._emit();
  }

  _mountPicker(host, value, onPick, placeholder, domain) {
    let p = host.querySelector("ha-selector");
    if (!customElements.get("ha-selector")) {
      let inp = host.querySelector("input");
      if (!inp) {
        inp = document.createElement("input");
        inp.className = "tf";
        inp.placeholder = placeholder || "entity_id";
        inp.addEventListener("input", () => onPick(inp.value.trim()));
        host.appendChild(inp);
      }
      inp.value = value || "";
      return;
    }
    if (!p) {
      p = document.createElement("ha-selector");
      p.style.display = "block";
      p.addEventListener("value-changed", (e) => {
        const v = e.detail && e.detail.value;
        onPick(typeof v === "string" ? v.trim() : "");
      });
      host.appendChild(p);
    }
    p.hass = this._hass;
    p.selector = domain ? { entity: { domain } } : { entity: {} };
    p.required = false; // 找车三项都是可选项，留空走兜底，不能因为它拦保存
    if (placeholder) p.placeholder = placeholder;
    if (p.value !== (value || undefined)) p.value = value || undefined;
  }

  _setBlockField(i, field, value) {
    const blocks = (this._config.blocks || []).slice();
    if (!blocks[i]) return;
    blocks[i] = Object.assign({}, blocks[i], { [field]: value });
    this._config.blocks = blocks;
    this._renderBlocks();
    this._emit();
  }

  _syncPickerHass() {
    this.shadowRoot.querySelectorAll("ha-selector").forEach((p) => {
      p.hass = this._hass;
    });
  }

  _syncPickers() {
    this.shadowRoot.querySelectorAll(".pick[data-ov]").forEach((h) => {
      const slot = h.dataset.ov;
      const val = (this._config.entities && this._config.entities[slot]) || "";
      this._mountPicker(h, val, (v) => {
        this._config.entities = this._config.entities || {};
        if (v) this._config.entities[slot] = v;
        else delete this._config.entities[slot];
        this._emit();
      });
    });
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

  _syncGenRow() {
    const row = this.shadowRoot && this.shadowRoot.getElementById("genrow");
    if (row) row.style.display = this._config.brand === "generic" ? "block" : "none";
  }

  _sync() {
    if (!this._built) return;
    const q = (id) => this.shadowRoot.getElementById(id);
    this._syncVehicles();
    q("title").value = this._config.title || "";
    q("brand").value = ["auto", "ford", "lincoln", "generic"].includes(this._config.brand) ? this._config.brand : "auto";
    q("brandname").value = this._config.brand_name || "";
    q("logourl").value = this._config.logo_url || "";
    this._syncGenRow();
    q("plate").setAttribute("aria-checked", String(Boolean(this._config.show_plate)));
    q("privacy").setAttribute("aria-checked", String(Boolean(this._config.privacy)));
    this.shadowRoot.querySelectorAll("[data-layout]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.layout === (this._config.layout || "full")));
    });
    this._renderBlocks();
    this._syncGuard();
    const hold = Number(this._config.hold_ms) || 2000;
    q("hold").value = String(hold);
    q("holdv").textContent = `${hold} ms`;
    q("imgmode").value = this._config.image || "auto";
    q("imgurl").style.display = this._config.image === "custom" ? "block" : "none";
    q("imgurl").value = this._config.image_url || "";
    q("theme").value = this._config.theme || DEFAULTS.theme;
    q("bgstyle").value = this._config.bg_style || "radar";
    q("chipstyle").value = this._config.chip_style || "glass";
    q("rangefull").value = this._config.range_full ? String(this._config.range_full) : "";
    q("evrangefull").value = this._config.ev_range_full ? String(this._config.ev_range_full) : "";
    q("fixedw").value = this._config.fixed_width ? String(this._config.fixed_width) : "";
    q("fixedh").value = this._config.fixed_height ? String(this._config.fixed_height) : "";
    this._syncBackground();
    const picked = /^#[0-9a-f]{6}$/i.test(this._config.accent || "") ? this._config.accent : (THEMES[this._config.theme] || THEMES.midnight).accent;
    q("color").value = picked;
    const wheel = this.shadowRoot.getElementById("colorwheel");
    if (wheel) wheel.style.setProperty("--pick", picked);
    this.shadowRoot.querySelectorAll(".swatch").forEach((s) => {
      s.classList.toggle("sel", s.dataset.color.toLowerCase() === String(this._config.accent || "").toLowerCase());
    });
    this._syncPickers();
    this._syncFind();
  }

  _syncFind() {
    if (!this._built) return;
    const f = this._config.find || { phone: "", car: "", device: "" };
    const hp = this.shadowRoot.getElementById("findphone");
    const hd = this.shadowRoot.getElementById("finddevice");
    const hc = this.shadowRoot.getElementById("findcar");
    if (!hp || !hd || !hc) return;
    this._mountPicker(hp, f.phone || "", (v) => {
      this._config.find = Object.assign({ phone: "", car: "", device: "" }, this._config.find || {}, { phone: v });
      this._emit();
      this._syncFind();
    }, "选择手机定位实体", "device_tracker");
    this._mountPicker(hd, f.device || "", (v) => {
      this._config.find = Object.assign({ phone: "", car: "", device: "" }, this._config.find || {}, { device: v });
      this._emit();
      this._syncFind();
    }, "选择登录设备定位实体（兜底）", "device_tracker");
    this._mountPicker(hc, f.car || "", (v) => {
      this._config.find = Object.assign({ phone: "", car: "", device: "" }, this._config.find || {}, { car: v });
      this._emit();
      this._syncFind();
    }, "留空自动使用车辆定位", "device_tracker");
    const hint = this.shadowRoot.getElementById("findhint");
    if (hint) hint.textContent = f.phone ? "已启用：定位行会显示“找车”胶囊，点它打开找车罗盘。" : (f.device ? "未选择手机定位，将使用登录设备或浏览器网络定位兜底。" : "未选择手机定位，将尝试浏览器网络定位兜底。");
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
    if (!cfg.bg_image) delete cfg.bg_image;
    if (cfg.image === "custom" && !cfg.image_url) delete cfg.image;
    if (cfg.hold_ms === DEFAULTS.hold_ms) delete cfg.hold_ms;
    if (cfg.accent === DEFAULTS.accent) delete cfg.accent;
    if (cfg.theme === DEFAULTS.theme) delete cfg.theme;
    if (cfg.image === "auto") delete cfg.image;
    if (cfg.find && !cfg.find.phone && !cfg.find.car) delete cfg.find;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: cfg },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

if (!customElements.get("ha-car-editor")) {
  customElements.define("ha-car-editor", HaCarEditor);
}

export { HaCarEditor };
