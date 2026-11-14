// 福特派 / 林肯之道集成的实体 ID 形如 sensor.<sha256(VIN) 前 16 位>_<slot>。
// unique_id 用哈希前缀而非 VIN，所以卡片只能靠「设备 → 哈希」或「单一车辆自动识别」来绑定实体。
const HASH_RE = /^[0-9a-f]{16}$/;

export function parseEntityId(id) {
  const dot = id.indexOf(".");
  if (dot < 0) return null;
  const name = id.slice(dot + 1);
  if (name.length <= 17 || name[16] !== "_") return null;
  const head = name.slice(0, 16);
  if (!HASH_RE.test(head)) return null;
  return { hash: head, key: name.slice(17) };
}

export const SLOTS = {
  nickname: ["vehicle_nickname"],
  plate: ["license_plate"],
  image_overlook: ["vehicle_overlook_image"],
  image_3d: ["vehicle_3d_image"],
  image_side: ["vehicle_image"],
  lock: ["lock_status"],
  online: ["onlinernr"],
  ignition: ["ignition"],
  fuel: ["fuel_level"],
  battery: ["battery_fill_level"],
  range: ["distance_to_empty", "prognostic_range"],
  ev_range: ["ev_dte"],
  odo: ["odometer"],
  volt: ["battery_voltage"],
  oil: ["prognostic", "oil_health"],
  tp_lf: ["lf_tire"],
  tp_rf: ["rf_tire"],
  tp_lr: ["lr_tire"],
  tp_rr: ["rr_tire"],
  tps_lf: ["lf_tire_status"],
  tps_rf: ["rf_tire_status"],
  tps_lr: ["lr_tire_status"],
  tps_rr: ["rr_tire_status"],
  tp_rec_f: ["recommended_front_pressure"],
  tp_rec_r: ["recommended_rear_pressure"],
  door_fl: ["driver_door"],
  door_fr: ["passenger_door"],
  door_rl: ["left_rear_door"],
  door_rr: ["right_rear_door"],
  tailgate: ["tailgate"],
  hood: ["hood"],
  win_fl: ["driver_window"],
  win_fr: ["passenger_window"],
  win_rl: ["left_rear_window"],
  win_rr: ["right_rear_window"],
  btn_lock: ["lock_door"],
  btn_unlock: ["unlock_door"],
  btn_trunk: ["trunk_unlock"],
  btn_refresh: ["manual_refresh"],
  sw_engine: ["engine"],
  sw_honk: ["honk"],
  sw_va: ["va_switch"],
  sw_light: ["light_find"],
  chg_status: ["charging_status"],
  chg_start: ["start_charge", "charge_start", "wallbox_charge"],
  chg_stop: ["stop_charge", "charge_stop"],
  wallbox: ["wallbox_charge"],
  gun_lock: ["evss_lock"],
  gun_unlock: ["evss_unlock"],
  departure: ["departure_toggle"],
  departure_plan: ["cevs_departure"],
  last_soc: ["last_charge_soc"],
  alerts: ["vehicle_alerts", "active_alert_list"],
  maint: ["maintenance_plan"],
  recall: ["recall"],
  messages: ["messages"],
  sync: ["sync_health"],
  data_time: ["vehicle_data_time"],
  fw: ["firmware_update"],
  support: ["contact_number", "after_sales_number", "rsa_number"],
  tracker: ["tracker"],
  addr: ["location"],
  temp: ["remote_temp"],
  auto_off: ["auto_off_remaining"],
  alert_event: ["vehicle_alert_event"],
  door_event: ["door_event"],
};

// 车辆识别优先级：显式 hash > 显式 prefix > device_id（读注册表）> 全库唯一一辆车。
export function detectVehicles(hass) {
  const st = (hass && hass.states) || {};
  const seen = new Map();
  for (const id of Object.keys(st)) {
    const p = parseEntityId(id);
    if (!p) continue;
    if (p.key !== "lock_status" && p.key !== "vehicle_nickname" && p.key !== "odometer") continue;
    const rec = seen.get(p.hash) || { hash: p.hash, ids: {} };
    rec.ids[p.key] = id;
    seen.set(p.hash, rec);
  }
  return [...seen.values()];
}

function hashFromDevice(hass, deviceId) {
  if (!deviceId || !hass) return null;
  const entities = hass.entities || {};
  for (const id of Object.keys(entities)) {
    const entry = entities[id];
    if (!entry || entry.device_id !== deviceId) continue;
    const p = parseEntityId(id);
    if (p) return p.hash;
  }
  return null;
}

export function resolve(hass, config) {
  const st = (hass && hass.states) || {};
  let hash = null;
  if (config && config.hash && HASH_RE.test(String(config.hash))) hash = String(config.hash);
  if (!hash && config && config.prefix) {
    const raw = String(config.prefix).replace(/^[a-z_]+\./, "");
    if (HASH_RE.test(raw)) hash = raw;
    else if (HASH_RE.test(raw.slice(0, 16))) hash = raw.slice(0, 16);
  }
  if (!hash && config) hash = hashFromDevice(hass, config.device);
  if (!hash) {
    const found = detectVehicles(hass);
    if (found.length === 1) hash = found[0].hash;
  }

  const index = new Map();
  if (hash) {
    for (const id of Object.keys(st)) {
      const p = parseEntityId(id);
      if (p && p.hash === hash) index.set(p.key, id);
    }
  }

  const overrides = (config && config.entities) || {};
  const idOf = (slot) => {
    const forced = overrides[slot];
    if (forced) return forced;
    const keys = SLOTS[slot] || [];
    for (const key of keys) {
      if (index.has(key)) return index.get(key);
    }
    return null;
  };

  const get = (slot) => {
    const id = idOf(slot);
    return id && st[id] ? st[id] : null;
  };

  return {
    hash,
    id: idOf,
    get,
    has: (slot) => Boolean(idOf(slot)),
    states: st,
  };
}
