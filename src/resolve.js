// 绑定策略（真实安装验证过）：福特派集成的 entity_id 是中文名的 pinyin
// （如 sensor.<设备>_men_suo_zhuang_tai），部分实体还是历史英文名（button.<设备>_lock_doors），
// 老版本用 unique_id 哈希前缀，所以单靠 id 前缀会绑不到。这里同时用两条线索：
//   1. 实体 object_id 后缀（translation key / pinyin / 历史英文名）
//   2. 实体 friendly_name 后缀（集成当前语言下的中文名，随翻译变化但显示名稳定）
// 分组优先用实体注册表的 device_id，无注册表时退回「共同前缀」。
const DEFS = [
  { s: "nickname", d: ["sensor"], a: ["vehicle_nickname", "che_liang_ni_cheng"], n: ["车辆昵称"] },
  { s: "plate", d: ["sensor"], a: ["license_plate", "che_pai_hao"], n: ["车牌号"] },
  { s: "image_overlook", d: ["image"], a: ["vehicle_overlook_image", "fu_shi_che_xing_tu"], n: ["俯视车型图"] },
  { s: "image_3d", d: ["image"], a: ["vehicle_3d_image", "3d_che_xing_tu"], n: ["3D 车型图"] },
  { s: "image_side", d: ["image"], a: ["vehicle_image", "ce_shi_che_xing_tu"], n: ["侧视车型图"] },
  { s: "lock", d: ["sensor"], a: ["lock_status", "men_suo_zhuang_tai"], n: ["门锁状态"] },
  { s: "online", d: ["sensor"], a: ["onlinernr", "che_liang_zai_xian_zhuang_tai"], n: ["车辆在线状态"] },
  { s: "ignition", d: ["sensor"], a: ["ignition", "dian_huo_zhuang_tai"], n: ["点火状态"] },
  { s: "remote_start", d: ["sensor"], a: ["remote_start", "yuan_cheng_qi_dong_zhuang_tai"], n: ["远程启动状态"] },
  { s: "fuel", d: ["sensor"], a: ["fuel_level", "ran_you_liang"], n: ["燃油量"] },
  { s: "battery", d: [], a: ["battery_fill_level"], n: [] },
  { s: "range", d: ["sensor"], a: ["distance_to_empty", "xu_hang_li_cheng", "prognostic_range", "sheng_yu_ke_xing_shi_li_cheng"], n: ["续航里程", "剩余可行驶里程"] },
  { s: "ev_range", d: [], a: ["ev_dte"], n: [] },
  { s: "odo", d: ["sensor"], a: ["odometer", "zong_li_cheng"], n: ["总里程"] },
  { s: "volt", d: ["sensor"], a: ["battery_voltage", "xu_dian_chi_dian_ya"], n: ["蓄电池电压"] },
  { s: "oil", d: ["sensor"], a: ["prognostic", "ji_you_shou_ming", "oil_health", "ji_you_jian_kang_zhuang_tai"], n: ["机油寿命", "机油健康状态"] },
  { s: "tp_lf", d: ["sensor"], a: ["lf_tire", "zuo_qian_lun_tai_ya"], n: ["左前轮胎压"] },
  { s: "tp_rf", d: ["sensor"], a: ["rf_tire", "you_qian_lun_tai_ya"], n: ["右前轮胎压"] },
  { s: "tp_lr", d: ["sensor"], a: ["lr_tire", "zuo_hou_lun_tai_ya"], n: ["左后轮胎压"] },
  { s: "tp_rr", d: ["sensor"], a: ["rr_tire", "you_hou_lun_tai_ya"], n: ["右后轮胎压"] },
  { s: "tps_lf", d: ["sensor"], a: ["lf_tire_status", "zuo_qian_tai_zhuang_tai"], n: ["左前胎状态"] },
  { s: "tps_rf", d: ["sensor"], a: ["rf_tire_status", "you_qian_tai_zhuang_tai"], n: ["右前胎状态"] },
  { s: "tps_lr", d: ["sensor"], a: ["lr_tire_status", "zuo_hou_tai_zhuang_tai"], n: ["左后胎状态"] },
  { s: "tps_rr", d: ["sensor"], a: ["rr_tire_status", "you_hou_tai_zhuang_tai"], n: ["右后胎状态"] },
  { s: "tp_rec_f", d: ["sensor"], a: ["recommended_front_pressure", "tui_jian_qian_lun_tai_ya"], n: ["推荐前轮胎压"] },
  { s: "tp_rec_r", d: ["sensor"], a: ["recommended_rear_pressure", "tui_jian_hou_lun_tai_ya"], n: ["推荐后轮胎压"] },
  { s: "tpms", d: ["sensor"], a: ["tpms_system_status", "tai_ya_xi_tong_zhuang_tai"], n: ["胎压系统状态"] },
  { s: "door_fl", d: ["sensor"], a: ["driver_door", "zhu_jia_che_men"], n: ["主驾车门"] },
  { s: "door_fr", d: ["sensor"], a: ["passenger_door", "fu_jia_che_men"], n: ["副驾车门"] },
  { s: "door_rl", d: ["sensor"], a: ["left_rear_door", "zuo_hou_che_men"], n: ["左后车门"] },
  { s: "door_rr", d: ["sensor"], a: ["right_rear_door", "you_hou_che_men"], n: ["右后车门"] },
  { s: "tailgate", d: ["sensor"], a: ["tailgate", "wei_men"], n: ["尾门"] },
  { s: "inner_tailgate", d: ["sensor"], a: ["inner_tailgate", "nei_wei_men"], n: ["内尾门"] },
  { s: "hood", d: ["sensor"], a: ["hood", "yin_qing_gai"], n: ["引擎盖"] },
  { s: "win_fl", d: ["sensor"], a: ["driver_window", "zhu_jia_che_chuang"], n: ["主驾车窗"] },
  { s: "win_fr", d: ["sensor"], a: ["passenger_window", "fu_jia_che_chuang"], n: ["副驾车窗"] },
  { s: "win_rl", d: ["sensor"], a: ["left_rear_window", "zuo_hou_che_chuang"], n: ["左后车窗"] },
  { s: "win_rr", d: ["sensor"], a: ["right_rear_window", "you_hou_che_chuang"], n: ["右后车窗"] },
  { s: "btn_lock", d: ["button"], a: ["lock_door", "guan_suo", "lock_doors"], n: ["关锁"] },
  { s: "btn_unlock", d: ["button"], a: ["unlock_door", "kai_suo", "unlock_doors"], n: ["开锁"] },
  { s: "btn_trunk", d: ["button"], a: ["trunk_unlock", "hou_bei_xiang_jie_suo", "unlock_trunk"], n: ["后备箱解锁"] },
  { s: "btn_refresh", d: ["button"], a: ["manual_refresh", "shou_dong_shua_xin_che_liang_zhuang_tai"], n: ["手动刷新车辆状态"] },
  { s: "sw_engine", d: ["switch"], a: ["engine", "yuan_cheng_qi_dong"], n: ["远程启动"] },
  { s: "sw_honk", d: ["switch"], a: ["honk", "ming_di_xun_che"], n: ["鸣笛寻车"] },
  { s: "sw_va", d: ["switch"], a: ["va_switch", "sheng_guang_xun_che"], n: ["声光寻车"] },
  { s: "sw_light", d: ["switch"], a: ["light_find", "deng_guang_xun_che"], n: ["灯光寻车"] },
  { s: "chg_status", d: [], a: ["charging_status"], n: [] },
  { s: "chg_start", d: [], a: ["start_charge", "charge_start"], n: [] },
  { s: "chg_stop", d: [], a: ["stop_charge", "charge_stop"], n: [] },
  { s: "wallbox", d: ["switch"], a: ["wallbox_charge", "jia_chong_zhuang_chong_dian"], n: ["家充桩充电"] },
  { s: "gun_lock", d: ["button"], a: ["evss_lock", "chong_dian_qiang_suo_ding"], n: ["充电枪锁定"] },
  { s: "gun_unlock", d: ["button"], a: ["evss_unlock", "chong_dian_qiang_jie_suo"], n: ["充电枪解锁"] },
  { s: "departure", d: ["switch"], a: ["departure_toggle", "yu_yue_chong_dian"], n: ["预约充电"] },
  { s: "departure_plan", d: ["sensor"], a: ["cevs_departure", "yu_yue_chu_fa"], n: ["预约出发"] },
  { s: "last_soc", d: ["sensor"], a: ["last_charge_soc", "shang_ci_chong_dian_dian_liang"], n: ["上次充电电量"] },
  { s: "alerts", d: ["sensor"], a: ["vehicle_alerts", "yi_chang_jing_shi", "active_alert_list", "gao_jing_lie_biao"], n: ["异常警示", "告警列表"] },
  { s: "maint", d: ["sensor"], a: ["maintenance_plan", "bao_yang_ji_hua"], n: ["保养计划"] },
  { s: "recall", d: ["sensor"], a: ["recall", "zhao_hui_xin_xi"], n: ["召回信息"] },
  { s: "messages", d: ["sensor"], a: ["messages", "wei_du_xiao_xi"], n: ["未读消息"] },
  { s: "sync", d: ["sensor"], a: ["sync_health", "guan_wang_yun_duan_zhuang_tai"], n: ["官网云端状态"] },
  { s: "data_time", d: ["sensor"], a: ["vehicle_data_time", "che_ji_shu_ju_zui_hou_shua_xin_shi_jian"], n: ["车机数据最后刷新时间"] },
  { s: "fw", d: ["sensor", "update"], a: ["firmware_upgrade", "gu_jian_sheng_ji_zhong", "firmware_update", "che_ji_gu_jian"], n: ["固件升级中", "车机固件"] },
  { s: "support", d: ["sensor"], a: ["contact_number", "ke_fu_dian_hua", "after_sales_number", "shou_hou_dian_hua", "rsa_number", "jiu_yuan_dian_hua"], n: ["客服电话", "售后电话", "救援电话"] },
  { s: "tracker", d: ["device_tracker"], a: ["tracker", "wei_zhi"], n: ["位置"] },
  { s: "addr", d: ["sensor"], a: ["location", "ding_wei_di_zhi"], n: ["定位地址"] },
  { s: "temp", d: ["select"], a: ["remote_temp", "yuan_cheng_kong_diao_mu_biao_wen_du"], n: ["远程空调目标温度"] },
  { s: "auto_off", d: ["sensor"], a: ["auto_off_remaining", "ju_chi_zi_dong_xi_huo_shi_jian"], n: ["距离自动熄火时间"] },
  { s: "alert_event", d: ["event"], a: ["vehicle_alert_event", "gao_jing_shi_jian"], n: ["告警事件"] },
  { s: "door_event", d: ["event"], a: ["door_event", "che_men_kai_he_shi_jian"], n: ["车门开合事件"] },
  { s: "alarm", d: ["sensor"], a: ["alarm_status", "bao_jing_zhuang_tai"], n: ["报警状态"] },
  { s: "air_filter", d: ["sensor"], a: ["air_filter", "kong_diao_lu_xin"], n: ["空调滤芯"] },
  { s: "prog_msg", d: ["sensor"], a: ["prognostic_msg", "yu_ce_xing_zhen_duan"], n: ["预测性诊断"] },
  { s: "vin", d: ["sensor"], a: ["vehicle_vin", "che_liang_shi_bie_ma"], n: ["车辆识别码"] },
  { s: "crcc", d: ["sensor"], a: ["crcc_flag", "yuan_cheng_kong_che_gong_neng"], n: ["远程控车功能"] },
  { s: "out", d: ["sensor"], a: ["out_and_about", "chu_xing_zhuang_tai"], n: ["出行状态"] },
  { s: "deep_sleep", d: ["sensor"], a: ["deep_sleep", "shen_du_shui_mian_mo_shi"], n: ["深度睡眠模式"] },
  { s: "chirp_cloud", d: ["sensor"], a: ["chirp_cloud", "ming_di_xun_che_she_zhi_yun_duan_zhuang_tai"], n: ["鸣笛寻车设置云端状态"] },
  { s: "sim", d: ["sensor"], a: ["sim_info", "sim_qia"], n: ["SIM 卡"] },
  { s: "uservehicles", d: ["sensor"], a: ["uservehicles", "che_liang_qing_dan"], n: ["车辆清单"] },
  { s: "cloud_probe", d: ["sensor"], a: ["cloud_probe", "yun_duan_neng_li_tan_ce"], n: ["云端能力探测"] },
  { s: "honk_duration", d: ["select"], a: ["honk_duration", "ming_di_xun_che_chi_xu_shi_chang"], n: ["鸣笛寻车持续时长"] },
  { s: "chirp_type", d: ["select"], a: ["chirp_type", "ming_di_xun_che_lei_xing"], n: ["鸣笛寻车类型"] },
  { s: "video_manual", d: ["sensor"], a: ["video_manual", "shi_pin_shuo_ming_shu"], n: ["视频说明书"] },];

// object_id 别名索引：按别名最后一个词建索引，避免逐条比对全部别名
const BY_LAST = new Map();
const BY_TAIL = new Map(); // friendly_name 末字索引

for (const def of DEFS) {
  def.a.forEach((alias, pri) => {
    const words = alias.split("_");
    const last = words[words.length - 1];
    const list = BY_LAST.get(last) || [];
    list.push({ alias, slot: def.s, dom: def.d, pri });
    BY_LAST.set(last, list);
  });
  def.n.forEach((label) => {
    const tail = label.slice(-1);
    const list = BY_TAIL.get(tail) || [];
    list.push({ label, slot: def.s, dom: def.d });
    BY_TAIL.set(tail, list);
  });
}

export const SLOTS = {};
for (const def of DEFS) SLOTS[def.s] = def.a.slice();

function domOk(dom, list) {
  return !list || !list.length || list.indexOf(dom) >= 0;
}

// 单实体 → 槽位 + 分组前缀；id 命中优先于名称命中，名称命中取最长标签
function matchEntity(dom, obj, fn) {
  let best = null;
  const cut = obj.lastIndexOf("_");
  if (cut > 0) {
    const cands = BY_LAST.get(obj.slice(cut + 1));
    if (cands) {
      for (const c of cands) {
        if (!domOk(dom, c.dom)) continue;
        const suffix = "_" + c.alias;
        if (!obj.endsWith(suffix)) continue;
        if (best && best.pri <= c.pri) continue;
        best = { slot: c.slot, pri: c.pri, prefix: obj.slice(0, obj.length - suffix.length) };
      }
    }
  }
  if (fn) {
    const cands = BY_TAIL.get(fn.slice(-1));
    if (cands) {
      for (const c of cands) {
        if (!domOk(dom, c.dom)) continue;
        if (!fn.endsWith(c.label)) continue;
        const before = fn.slice(0, fn.length - c.label.length);
        if (before && !/[\s·:：]$/.test(before)) continue;
        const pri = 100 + (60 - Math.min(60, c.label.length));
        if (best && best.pri <= pri) continue;
        best = { slot: c.slot, pri, prefix: before.trim() };
      }
    }
  }
  return best;
}

// friendly_name 去掉末尾任意已知实体名，剩下的就是车辆显示前缀
function namePrefix(fn) {
  if (!fn) return "";
  const cands = BY_TAIL.get(fn.slice(-1));
  if (!cands) return "";
  let best = "";
  for (const c of cands) {
    if (!fn.endsWith(c.label)) continue;
    const before = fn.slice(0, fn.length - c.label.length);
    if (before && !/[\s·:：]$/.test(before)) continue;
    if (c.label.length > best.length) best = c.label;
  }
  if (!best) return "";
  return fn.slice(0, fn.length - best.length).trim();
}

function scanGroups(hass, ids) {
  const st = (hass && hass.states) || {};
  const reg = (hass && hass.entities) || null;
  const devs = (hass && hass.devices) || null;
  const groups = new Map();
  const list = ids || Object.keys(st);

  for (const id of list) {
    const dot = id.indexOf(".");
    if (dot < 0) continue;
    const dom = id.slice(0, dot);
    const obj = id.slice(dot + 1);
    if (!obj) continue;
    const stt = st[id];
    const fn = stt && stt.attributes ? String(stt.attributes.friendly_name || "") : "";
    const m = matchEntity(dom, obj, fn);
    if (!m) continue;

    const entry = reg ? reg[id] : null;
    const devId = entry && entry.device_id ? entry.device_id : "";
    const np = namePrefix(fn);
    const prefix = np || m.prefix || obj;
    const key = devId ? "dev:" + devId : "nm:" + prefix;

    let rec = groups.get(key);
    if (!rec) {
      let label = prefix;
      if (devId && devs && devs[devId]) label = devs[devId].name_by_user || devs[devId].name || label;
      rec = { key, label, prefixes: new Set(), slots: new Map(), score: 0 };
      groups.set(key, rec);
    }
    rec.prefixes.add(prefix);
    if (m.prefix) rec.prefixes.add(m.prefix);
    const prev = rec.slots.get(m.slot);
    if (!prev || m.pri < prev.pri) rec.slots.set(m.slot, { id, pri: m.pri });
  }

  for (const rec of groups.values()) {
    rec.score =
      rec.slots.size +
      (rec.slots.has("lock") ? 3 : 0) +
      (rec.slots.has("nickname") ? 2 : 0) +
      (rec.slots.has("odo") ? 2 : 0) +
      (rec.slots.has("btn_refresh") ? 1 : 0);
  }
  return groups;
}

function ranked(groups) {
  return [...groups.values()].sort((a, b) => b.score - a.score);
}

function keyOf(rec) {
  return rec.key.replace(/^(dev|pfx):/, "");
}

// 车辆选择：显式 hash（编辑器里存的设备名/前缀/device_id）> device > 槽位最全的一辆
function chooseGroup(groups, hass, config) {
  const list = ranked(groups);
  if (!list.length) return null;
  const want = config && config.hash != null && config.hash !== "" ? String(config.hash) : "";
  if (want) {
    const hit = list.find((r) => keyOf(r) === want || r.label === want || r.prefixes.has(want) || r.key === want);
    if (hit) return hit;
  }
  if (config && config.device && hass && hass.entities && hass.states) {
    const ids = Object.keys(hass.entities).filter((id) => hass.entities[id] && hass.entities[id].device_id === config.device);
    const sub = ranked(scanGroups(hass, ids));
    if (sub.length) return sub[0];
  }
  return list[0];
}

export function detectVehicles(hass) {
  return ranked(scanGroups(hass)).map((rec) => ({
    hash: rec.label || keyOf(rec),
    device: rec.key.startsWith("dev:") ? keyOf(rec) : "",
    label: rec.label,
    slots: rec.slots,
    count: rec.slots.size,
  }));
}

export function resolve(hass, config) {
  const st = (hass && hass.states) || {};
  const groups = scanGroups(hass);
  const rec = chooseGroup(groups, hass, config);
  const overrides = (config && config.entities) || {};

  const idOf = (slot) => {
    const forced = overrides[slot];
    if (forced) return forced;
    const hit = rec && rec.slots.get(slot);
    return hit ? hit.id : null;
  };

  const get = (slot) => {
    const id = idOf(slot);
    return id && st[id] ? st[id] : null;
  };

  return {
    group: rec ? (rec.label || keyOf(rec)) : null,
    name: rec ? rec.label : null,
    id: idOf,
    get,
    has: (slot) => Boolean(idOf(slot)),
    slots: rec ? rec.slots : new Map(),
    states: st,
  };
}
