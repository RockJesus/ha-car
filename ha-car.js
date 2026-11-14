// src/icons.js
var PATHS = {
  lock: "M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z",
  unlock: "M208,80H96V56a32,32,0,0,1,32-32c15.37,0,29.2,11,32.16,25.59a8,8,0,0,0,15.68-3.18C171.32,24.15,151.2,8,128,8A48.05,48.05,0,0,0,80,56V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm0,128H48V96H208V208Z",
  car: "M240,104H229.2L201.42,41.5A16,16,0,0,0,186.8,32H69.2a16,16,0,0,0-14.62,9.5L26.8,104H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V184h96v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V120h8a8,8,0,0,0,0-16ZM69.2,48H186.8l24.89,56H44.31ZM64,200H40V184H64Zm128,0V184h24v16Zm24-32H40V120H216ZM56,144a8,8,0,0,1,8-8H80a8,8,0,0,1,0,16H64A8,8,0,0,1,56,144Zm112,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,144Z",
  carProfile: "M240,112H211.31L168,68.69A15.86,15.86,0,0,0,156.69,64H44.28A16,16,0,0,0,31,71.12L1.34,115.56A8.07,8.07,0,0,0,0,120v48a16,16,0,0,0,16,16H33a32,32,0,0,0,62,0h66a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V128A16,16,0,0,0,240,112ZM44.28,80H156.69l32,32H23ZM64,192a16,16,0,1,1,16-16A16,16,0,0,1,64,192Zm128,0a16,16,0,1,1,16-16A16,16,0,0,1,192,192Zm48-24H223a32,32,0,0,0-62,0H95a32,32,0,0,0-62,0H16V128H240Z",
  power: "M120,128V48a8,8,0,0,1,16,0v80a8,8,0,0,1-16,0Zm60.37-78.7a8,8,0,0,0-8.74,13.4C194.74,77.77,208,101.57,208,128a80,80,0,0,1-160,0c0-26.43,13.26-50.23,36.37-65.3a8,8,0,0,0-8.74-13.4C47.9,67.38,32,96.06,32,128a96,96,0,0,0,192,0C224,96.06,208.1,67.38,180.37,49.3Z",
  trunk: "M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm64,24V200H96V72ZM40,72H80V200H40ZM216,200H176V72h40V200Z",
  megaphone: "M248,120a48.05,48.05,0,0,0-48-48H160.2c-2.91-.17-53.62-3.74-101.91-44.24A16,16,0,0,0,32,40V200a16,16,0,0,0,26.29,12.25c37.77-31.68,77-40.76,93.71-43.3v31.72A16,16,0,0,0,159.12,214l11,7.33A16,16,0,0,0,194.5,212l11.77-44.36A48.07,48.07,0,0,0,248,120ZM48,199.93V40h0c42.81,35.91,86.63,45,104,47.24v65.48C134.65,155,90.84,164.07,48,199.93Zm131,8,0,.11-11-7.33V168h21.6ZM200,152H168V88h32a32,32,0,1,1,0,64Z",
  speaker: "M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55Zm54-106.08a40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,0,1,12-10.58ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z",
  bulb: "M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z",
  refresh: "M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z",
  pin: "M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z",
  warning: "M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z",
  wrench: "M226.76,69a8,8,0,0,0-12.84-2.88l-40.3,37.19-17.23-3.7-3.7-17.23,37.19-40.3A8,8,0,0,0,187,29.24,72,72,0,0,0,88,96,72.34,72.34,0,0,0,94,124.94L33.79,177c-.15.12-.29.26-.43.39a32,32,0,0,0,45.26,45.26c.13-.13.27-.28.39-.42L131.06,162A72,72,0,0,0,232,96,71.56,71.56,0,0,0,226.76,69ZM160,152a56.14,56.14,0,0,1-27.07-7,8,8,0,0,0-9.92,1.77L67.11,211.51a16,16,0,0,1-22.62-22.62L109.18,133a8,8,0,0,0,1.77-9.93,56,56,0,0,1,58.36-82.31l-31.2,33.81a8,8,0,0,0-1.94,7.1L141.83,108a8,8,0,0,0,6.14,6.14l26.35,5.66a8,8,0,0,0,7.1-1.94l33.81-31.2A56.06,56.06,0,0,1,160,152Z",
  bell: "M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z",
  engine: "M96,80h48a8,8,0,0,1,8,8v8H208a8,8,0,0,1,8,8v72a8,8,0,0,1-8,8H184v8a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8v-8H48a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8h24V96a8,8,0,0,1,8-8V80ZM64,152h24v32H64Zm96-32H96v64h64Z",
  window: "M224,88v80a16,16,0,0,0,16,16H16a16,16,0,0,0-16-16V88a16,16,0,0,0,16-16H208A16,16,0,0,0,224,88ZM64,88V168H128V88Zm80,64V168h64V152Zm0,0V168h16V152Z",
  door: "M232,216H208V40a16,16,0,0,0-16-16H64A16,16,0,0,0,48,40V216H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16ZM64,40H192V216H64Zm104,92a12,12,0,1,1-12-12A12,12,0,0,1,168,132Z",
  tire: "M149.26,159.26C155.09,173.82,163.5,176,168,176s12.91-2.18,18.74-16.74c3.39-8.48,5.26-19.58,5.26-31.26s-1.87-22.78-5.26-31.26C180.91,82.18,172.5,80,168,80s-12.91,2.18-18.74,16.74C145.87,105.22,144,116.32,144,128S145.87,150.78,149.26,159.26ZM168,96.2c2.62,2.06,8,13,8,31.8s-5.38,29.74-8,31.8c-2.62-2.06-8-13-8-31.8S165.38,98.26,168,96.2ZM232,216H196.41C213.12,197.73,224,165.47,224,128c0-58.32-26.35-104-60-104H92C58.35,24,32,69.68,32,128S58.35,232,92,232H232a8,8,0,0,0,0-16ZM48,128c0-2.5.07-5,.17-7.44L80,97.83l24.43,17.45c-.28,4.16-.43,8.41-.43,12.72a179.89,179.89,0,0,0,3.07,33.5l-22.42-16a8,8,0,0,0-9.3,0l-23.74,17A161,161,0,0,1,48,128Z",
  bolt: "M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z",
  fuel: "M241,69.66,221.66,50.34a8,8,0,0,0-11.32,11.32L229.66,81A8,8,0,0,1,232,86.63V168a8,8,0,0,1-16,0V128a24,24,0,0,0-24-24H176V56a24,24,0,0,0-24-24H72A24,24,0,0,0,48,56V208H32a8,8,0,0,0,0,16H192a8,8,0,0,0,0-16H176V120h16a8,8,0,0,1,8,8v40a24,24,0,0,0,48,0V86.63A23.85,23.85,0,0,0,241,69.66ZM64,208V56a8,8,0,0,1,8-8h80a8,8,0,0,1,8,8V208Zm80-96a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h48A8,8,0,0,1,144,112Z",
  gauge: "M207.06,72.67A111.24,111.24,0,0,0,128,40h-.4C66.07,40.21,16,91,16,153.13V176a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V152A111.25,111.25,0,0,0,207.06,72.67ZM224,176H119.71l54.76-75.3a8,8,0,0,0-12.94-9.42L99.92,176H32V153.13c0-3.08.15-6.12.43-9.13H56a8,8,0,0,0,0-16H35.27c10.32-38.86,44-68.24,84.73-71.66V80a8,8,0,0,0,16,0V56.33A96.14,96.14,0,0,1,221,128H200a8,8,0,0,0,0,16h23.67c.21,2.65.33,5.31.33,8Z",
  chevron: "M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z",
  caretRight: "M181.66,133.66l-80,80A8,8,0,0,1,88,208V48a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,181.66,133.66Z"
};
var ICON_NAMES = Object.keys(PATHS);
function icon(name, cls) {
  const d = PATHS[name] || PATHS.car;
  return `<svg class="ic${cls ? " " + cls : ""}" viewBox="0 0 256 256" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;
}

// src/resolve.js
var DEFS = [
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
  { s: "video_manual", d: ["sensor"], a: ["video_manual", "shi_pin_shuo_ming_shu"], n: ["视频说明书"] }
];
var BY_LAST = /* @__PURE__ */ new Map();
var BY_TAIL = /* @__PURE__ */ new Map();
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
var SLOTS = {};
for (const def of DEFS) SLOTS[def.s] = def.a.slice();
function domOk(dom, list) {
  return !list || !list.length || list.indexOf(dom) >= 0;
}
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
  const st = hass && hass.states || {};
  const reg = hass && hass.entities || null;
  const devs = hass && hass.devices || null;
  const groups = /* @__PURE__ */ new Map();
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
      rec = { key, label, prefixes: /* @__PURE__ */ new Set(), slots: /* @__PURE__ */ new Map(), score: 0 };
      groups.set(key, rec);
    }
    rec.prefixes.add(prefix);
    if (m.prefix) rec.prefixes.add(m.prefix);
    const prev = rec.slots.get(m.slot);
    if (!prev || m.pri < prev.pri) rec.slots.set(m.slot, { id, pri: m.pri });
  }
  for (const rec of groups.values()) {
    rec.score = rec.slots.size + (rec.slots.has("lock") ? 3 : 0) + (rec.slots.has("nickname") ? 2 : 0) + (rec.slots.has("odo") ? 2 : 0) + (rec.slots.has("btn_refresh") ? 1 : 0);
  }
  return groups;
}
function isVehicle(rec) {
  return rec.slots.has("lock") || rec.slots.has("nickname") || rec.slots.has("odo") || rec.slots.has("plate") || rec.slots.has("btn_refresh");
}
function rankScore(r) {
  return (isVehicle(r) ? 1e3 : 0) + r.slots.size * 10 + r.score;
}
function ranked(groups) {
  return [...groups.values()].sort((a, b) => rankScore(b) - rankScore(a));
}
function keyOf(rec) {
  return rec.key.replace(/^(dev|pfx):/, "");
}
function nicknameOf(rec, hass) {
  const hit = rec.slots.get("nickname") || rec.slots.get("plate");
  const st = hit && hass && hass.states && hass.states[hit.id];
  return st && st.state ? String(st.state) : "";
}
function chooseGroup(groups, hass, config) {
  const list = ranked(groups);
  if (!list.length) return null;
  const want = config && config.hash != null && config.hash !== "" ? String(config.hash) : "";
  if (want) {
    const hit = list.find(
      (r) => keyOf(r) === want || r.label === want || r.prefixes.has(want) || r.key === want || nicknameOf(r, hass) === want
    );
    if (hit) return hit;
  }
  if (config && config.device && hass && hass.entities && hass.states) {
    const ids = Object.keys(hass.entities).filter((id) => hass.entities[id] && hass.entities[id].device_id === config.device);
    const sub = ranked(scanGroups(hass, ids));
    if (sub.length) return sub[0];
  }
  const veh = list.filter(isVehicle);
  if (veh.length) return veh[0];
  return list[0].slots.size >= 6 ? list[0] : null;
}
function detectVehicles(hass) {
  return ranked(scanGroups(hass)).filter((r) => isVehicle(r) || r.slots.size >= 8).map((rec) => ({
    hash: rec.label || keyOf(rec),
    device: rec.key.startsWith("dev:") ? keyOf(rec) : "",
    label: rec.label,
    slots: rec.slots,
    count: rec.slots.size
  }));
}
function resolve(hass, config) {
  const st = hass && hass.states || {};
  const groups = scanGroups(hass);
  const rec = chooseGroup(groups, hass, config);
  if (rec) {
    for (const g of groups.values()) {
      if (g === rec) continue;
      const shared = [...rec.prefixes].some((p) => g.prefixes.has(p));
      if (!shared) continue;
      for (const [slot, hit] of g.slots) if (!rec.slots.has(slot)) rec.slots.set(slot, hit);
    }
  }
  const overrides = config && config.entities || {};
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
    group: rec ? rec.label || keyOf(rec) : null,
    name: rec ? rec.label : null,
    id: idOf,
    get,
    has: (slot) => Boolean(idOf(slot)),
    slots: rec ? rec.slots : /* @__PURE__ */ new Map(),
    states: st
  };
}

// src/styles.js
var STYLES = `
:host { display: block; --hc-accent: #37d6e8; --hc-ink: #e9eff7; --hc-dim: #8496ad;
  --hc-ok: #6fe0a8; --hc-warn: #ffc46b; --hc-bad: #ff9182; --hc-holdms: 2000ms; }
ha-card { display: block; overflow: hidden; position: relative;
  border: 1px solid rgba(120,190,215,.16);
  border-radius: var(--ha-card-border-radius, 28px);
  color: var(--hc-ink);
  background-image:
    radial-gradient(120% 80% at 50% -10%, rgba(55,214,232,.14), transparent 58%),
    radial-gradient(70% 50% at 15% 105%, rgba(40,120,180,.10), transparent 70%),
    linear-gradient(168deg, #111d2c 0%, #0b1521 52%, #060b12 100%);
  background-size: auto, auto, auto;
  background-repeat: no-repeat;
  box-shadow: 0 30px 60px -30px rgba(2,6,12,.98), 0 0 56px -26px rgba(55,214,232,.45),
    inset 0 1px 0 rgba(255,255,255,.08), inset 0 -1px 0 rgba(0,0,0,.5);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Microsoft YaHei", "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  isolation: isolate;
}
ha-card::before { content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    radial-gradient(60% 34% at 50% 0%, rgba(255,255,255,.06), transparent 72%),
    radial-gradient(rgba(150,205,230,.04) 1px, transparent 1.5px);
  background-size: auto, 26px 26px;
  background-repeat: no-repeat, repeat;
  -webkit-mask-image: radial-gradient(130% 96% at 50% 0%, #000 18%, rgba(0,0,0,.55) 56%, transparent 88%);
  mask-image: radial-gradient(130% 96% at 50% 0%, #000 18%, rgba(0,0,0,.55) 56%, transparent 88%);
  mix-blend-mode: screen; opacity: .6; }
ha-card::after { content: ""; position: absolute; left: 8%; right: 8%; top: 0; height: 1px; z-index: 1;
  background: linear-gradient(90deg, transparent, rgba(190,240,255,.5) 18%, rgba(190,240,255,.5) 82%, transparent);
  opacity: .55; }
.plate, .gn b, .tc b, .stat b { font-variant-numeric: tabular-nums; }
.plate { font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace; }
.wrap { position: relative; padding: 18px 16px 14px; display: flex; flex-direction: column; gap: 14px; }
.duo { display: flex; flex-direction: column; gap: 14px; }
.dleft, .dright { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
/* 模块栈：顺序由配置决定，手机单列、宽屏双栏（车图固定左栏） */
.blocks { position: relative; display: flex; flex-direction: column; gap: 14px; flex: 1 1 auto; min-height: 0; }
.b-hero-col, .b-side { display: contents; }
.blk + .blk { margin-top: 0; }
.blk { min-width: 0; }
.b-hero { display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0; }
.b-hero .hero { flex: 1 1 auto; }
.b-actions { display: flex; flex-direction: column; gap: 10px; }
.cblock { display: flex; align-items: center; gap: 8px; padding: 9px 12px; border-radius: 15px;
  border: 1px solid rgba(255,255,255,.07); background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.016));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06); font-size: 12px; color: var(--hc-dim); }
.cblock .ic { width: 15px; height: 15px; opacity: .8; color: var(--hc-accent); }
.cblock .cl { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-size: 11.5px; letter-spacing: .02em; }
.cblock b { font-size: 14px; font-weight: 680; color: #eef5fd; font-variant-numeric: tabular-nums; }
.cblock i { font-style: normal; font-size: 10px; color: rgba(150,172,196,.8); margin-left: 1px; }
.ic { width: 20px; height: 20px; fill: currentColor; display: block; flex: none; }

/* 头部：大标题 + 右上状态胶囊（参考图同构） */
.head { display: flex; align-items: flex-start; gap: 12px; }
.ttl { flex: 1; min-width: 0; }
h1 { margin: 0; font-size: 26px; line-height: 1.1; font-weight: 700; letter-spacing: -.01em;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.plate { margin-top: 8px; font-size: 10.5px; font-weight: 600; letter-spacing: .18em; color: rgba(150,172,196,.72); }
.status { flex: none; display: inline-flex; align-items: center; gap: 7px; height: 30px; padding: 0 14px;
  border-radius: 999px; font-size: 11.5px; font-weight: 650; letter-spacing: .03em;
  color: var(--hc-dim); background: rgba(255,255,255,.045);
  border: 1px solid rgba(255,255,255,.11); white-space: nowrap;
  backdrop-filter: blur(6px); }
.brand { display: inline-flex; align-items: center; margin-right: 7px; vertical-align: -1px; }
.brand svg { width: 46px; height: 21px; display: block; }
.status .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex: none;
  box-shadow: 0 0 8px currentColor; }
.status.ok { color: #85f2b8; background: rgba(111,224,168,.12); border-color: rgba(111,224,168,.32);
  box-shadow: 0 0 18px -8px rgba(111,224,168,.65), inset 0 1px 0 rgba(255,255,255,.14); }
.status.bad { color: #ff9d8e; background: rgba(255,145,130,.11); border-color: rgba(255,145,130,.34); }

/* 锁态下面一行：定位 + 同步时间 */
.hmeta { display: flex; align-items: center; gap: 8px; margin-top: -6px; min-width: 0; }
.hmeta .doors { flex: 1 1 auto; min-width: 0; overflow: hidden; }
.hmeta .door { flex: 1 1 auto; min-width: 0; max-width: 100%; overflow: hidden; height: 26px;
  background: rgba(255,255,255,.024); border-color: rgba(255,255,255,.055); }
.hmeta .door .addr { flex: 1 1 auto; min-width: 0; }
.hmeta .door .ic { width: 14px; height: 14px; }
.hmeta .baseline.solo { flex: none; margin: 0 0 0 auto; padding: 4px 9px; background: rgba(255,255,255,.024);
  border-color: rgba(255,255,255,.055); }

/* 主视觉：车图 + 双同心轨道 + 四枚发光节点（参考图同构） */
.hero { position: relative; height: 224px; display: flex; align-items: center; justify-content: center;
  overflow: hidden; --r: 92px; }
.halo { position: absolute; inset: -20% -12% -10%; pointer-events: none;
  background: radial-gradient(46% 52% at 50% 50%, rgba(55,214,232,.20), rgba(55,214,232,.06) 46%, transparent 72%);
  filter: blur(2px); }
.orbit, .orbit.o2 { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  border-radius: 50%; pointer-events: none; height: 94%; aspect-ratio: 1; width: auto; }
.orbit { border: 1px solid rgba(70,220,240,.22);
  box-shadow: inset 0 0 34px -14px rgba(55,214,232,.55), 0 0 24px -16px rgba(55,214,232,.5); }
.orbit.o2 { height: 97%;
  border: 1px solid rgba(55,214,232,.08); }
.node { position: absolute; left: 50%; top: 50%; width: 7px; height: 7px; margin: -3.5px 0 0 -3.5px;
  transform: translate(-50%, -50%);
  border-radius: 50%; background: #9ef4ff;
  box-shadow: 0 0 6px 1px rgba(55,214,232,.9), 0 0 16px 5px rgba(55,214,232,.35);
  animation: hc-node 3.2s ease-in-out infinite; }
.node.n1 { top: 0; animation-delay: 0s; }
.node.n2 { top: 50%; left: 100%; animation-delay: .8s; }
.node.n3 { top: 100%; animation-delay: 1.6s; }
.node.n4 { top: 50%; left: 0; animation-delay: 2.4s; }
.carimg { position: relative; max-width: 64%; max-height: 78%; object-fit: contain;
  filter: brightness(1.06) saturate(1.04) drop-shadow(0 30px 30px rgba(2,6,12,.8)) drop-shadow(0 0 18px rgba(55,214,232,.08)); }
.carph { position: relative; width: 96px; height: 96px; display: grid; place-items: center; border-radius: 999px;
  border: 1px solid rgba(255,255,255,.1); color: var(--hc-dim); background: rgba(255,255,255,.03); }
.carph .ic { width: 44px; height: 44px; opacity: .55; }
.ground { position: absolute; left: 50%; bottom: 10px; width: 48%; height: 16px; transform: translateX(-50%);
  border-radius: 50%; background: radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,.72), transparent 74%);
  filter: blur(6px); }

.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 11px; border-radius: 999px;
  font-size: 10.5px; font-weight: 650; letter-spacing: .06em; color: var(--hc-dim); text-transform: uppercase;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); backdrop-filter: blur(6px); }
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
.orb { position: relative; width: 58px; height: 58px; display: grid; place-items: center; border-radius: 50%;
  border: 1px solid rgba(190,225,245,.14);
  background: radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,.14), rgba(255,255,255,.02) 58%), #0c1622;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.12), inset 0 -8px 16px -10px rgba(0,0,0,.9),
    0 12px 24px -16px rgba(0,0,0,.95), 0 0 20px -14px rgba(55,214,232,.4);
  transition: transform .16s, border-color .18s, box-shadow .18s, background .18s; }
.tile .ic { width: 21px; height: 21px; }
.tile .lbl { max-width: 100%; font-size: 11.5px; font-weight: 600; letter-spacing: .04em; color: rgba(150,172,196,.9);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tile:hover .orb { border-color: rgba(190,240,255,.3);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 0 26px -10px rgba(55,214,232,.55); }
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

.selpill { position: relative; justify-content: center; gap: 7px; }
.selpill .sl { font-size: 11px; letter-spacing: .06em; color: rgba(178,196,216,.86); }
.selpill b { font-size: 12.5px; font-weight: 680; color: #eef5fd; white-space: nowrap; }
.selpill .caret { font-style: normal; font-size: 9px; opacity: .55; margin-left: -2px; }
.selpill select { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer;
  border: none; appearance: none; }
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
.energy { display: grid; grid-template-columns: 1fr 1px 1fr; align-items: center; column-gap: 14px; padding: 2px 2px 0; }
.gauge { position: relative; width: 100%; max-width: 132px; aspect-ratio: 1; margin: 0 auto; }
.gauge > svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.gt { fill: none; stroke: rgba(255,255,255,.07); stroke-width: 6; }
.gp { fill: none; stroke: var(--hc-accent); stroke-width: 6; stroke-linecap: round;
  filter: drop-shadow(0 0 8px rgba(55,214,232,.65)); }
.gv { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 3px; padding: 0 10px; box-sizing: border-box; }
.gl { display: inline-flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 650; letter-spacing: .1em;
  color: rgba(160,182,206,.85); text-transform: uppercase; }
.gl .ic { width: 12px; height: 12px; opacity: .85; }
.gn { display: flex; flex-direction: column; align-items: center; gap: 1px; line-height: 1; max-width: 100%; }
.gn b { font-size: 29px; font-weight: 680; letter-spacing: -.02em; color: #f3f8ff; white-space: nowrap;
  text-shadow: 0 0 22px rgba(55,214,232,.16); }
.gn i { font-size: 9.5px; font-style: normal; font-weight: 600; color: rgba(150,172,196,.9); letter-spacing: .06em; }
.egdiv { width: 1px; height: 78px; align-self: center;
  background: linear-gradient(180deg, transparent, rgba(120,190,215,.28) 26%, rgba(120,190,215,.28) 74%, transparent); }
.substats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 12px;
  border-radius: 18px; border: 1px solid rgba(255,255,255,.07); overflow: hidden;
  background: linear-gradient(180deg, rgba(255,255,255,.052), rgba(255,255,255,.018));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06); }
.substats .sstat { display: flex; flex-direction: row; align-items: baseline; justify-content: center; gap: 5px; padding: 11px 6px;
  letter-spacing: .04em; text-align: center; min-width: 0; }
.substats .sstat + .sstat { border-left: 1px solid rgba(255,255,255,.055); }
.substats .sstat i { font-style: normal; font-size: 10px; letter-spacing: .06em;
  color: rgba(150,172,196,.8); }
.substats .sstat b { font-size: 15px; font-weight: 680; color: #eef5fd; line-height: 1; letter-spacing: -.01em; white-space: nowrap; }
.substats .sstat span { font-size: 9.5px; color: rgba(150,172,196,.72); }

/* 底座条：四轮胎压 + 同步时间（参考图同构） */
.baseline { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 16px;
  border: 1px solid rgba(255,255,255,.07);
  background: linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.014));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06); min-width: 0; }
.baseline.solo { align-self: flex-end; justify-content: flex-end; padding: 6px 10px; border-radius: 12px; }
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

.alert { position: relative; display: flex; align-items: center; gap: 9px; padding: 10px 13px 10px 16px; border-radius: 15px;
  font-size: 12px; line-height: 1.45; color: #ffd3c9;
  background: linear-gradient(180deg, rgba(255,145,130,.13), rgba(255,145,130,.07));
  border: 1px solid rgba(255,145,130,.24);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 8px 22px -16px rgba(255,145,130,.6); }
.alert::before { content: ""; position: absolute; left: 0; top: 12px; bottom: 12px; width: 2px; border-radius: 2px;
  background: linear-gradient(180deg, rgba(255,145,130,.9), rgba(255,145,130,.2)); }
.alert .ic { width: 15px; height: 15px; flex: none; color: var(--hc-bad); }
.alert b { flex: none; font-size: 11px; letter-spacing: .04em; white-space: nowrap;
  color: var(--hc-bad); font-weight: 700; }
.alert .amsg { flex: 1 1 auto; min-width: 0; font-size: 12.5px; color: var(--hc-text);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.svc { border-radius: 15px; border: 1px solid rgba(255,255,255,.06);
  background: linear-gradient(180deg, rgba(255,255,255,.042), rgba(255,255,255,.014));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05); overflow: hidden; }
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

.b-actions { position: relative; }
.toast.free { bottom: 64px; }
/* 长按进度：车底轨道圈顺时针转满一圈（起点 12 点方向） */
.orbit .hring2 { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.orbit .hring2 { transform: rotate(-90deg); }
.orbit .hring2 circle { fill: none; stroke: var(--hc-accent); stroke-width: .6; stroke-linecap: round;
  opacity: 0; transition: opacity .18s ease;
  filter: drop-shadow(0 0 3px rgba(55,214,232,.55)); }
.orbit.prog .hring2 circle, .orbit.armed .hring2 circle { opacity: 1; }
.orbit.armed .hring2 circle { stroke: #dffbff; filter: drop-shadow(0 0 7px rgba(55,214,232,.85)); }
.toast { position: absolute; right: 0; left: auto; bottom: calc(100% + 6px); z-index: 6;
  pointer-events: none; max-width: 100%;
  box-shadow: 0 14px 30px -16px rgba(0,0,0,.95);
  display: flex; align-items: center; gap: 7px; padding: 7px 13px; border-radius: 999px; white-space: nowrap;
  font-size: 11.5px; line-height: 1.4; color: #d5f8ff;
  background: linear-gradient(180deg, rgba(16,32,48,.97), rgba(9,20,32,.97));
  border: 1px solid rgba(55,214,232,.28);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
.toast.err { border-color: rgba(255,145,130,.34); color: #ffd3c9;
  background: linear-gradient(180deg, rgba(40,18,20,.97), rgba(24,12,14,.97)); }
.toast .ic { width: 13px; height: 13px; flex: none; }

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


/* 俯视图状态层：贴在车图上，位置由 JS 量出车图矩形 */
.covl { position: absolute; pointer-events: none; }
.cedge { position: absolute; inset: 0; pointer-events: none; }
.cst { position: absolute; transform: translate(-50%, -50%); width: 44px; height: 44px; border-radius: 13px;
  background: linear-gradient(180deg, rgba(22,34,48,.78), rgba(9,15,23,.72));
  border: 1px solid rgba(160,205,230,.16);
  box-shadow: 0 4px 14px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.1);
  backdrop-filter: blur(8px);
  transition: background .25s ease, border-color .25s ease, box-shadow .25s ease; }
.cst .glyph { position: absolute; inset: 5px 5px 12px; opacity: .34; color: #cfe6f5; }
.cst .glyph .ic { width: 100%; height: 100%; display: block; }
.cst .tx { position: absolute; left: 0; right: 0; top: 19px; text-align: center; font-size: 9px; font-weight: 650;
  line-height: 1; color: #c5d3e4; letter-spacing: .02em; }
.cst .tag { position: absolute; left: 0; right: 0; bottom: 4px; text-align: center; font-style: normal;
  font-size: 7px; line-height: 1; color: #7f92a9; letter-spacing: .02em; }
.cst.open { background: rgba(52,34,10,.8); border-color: rgba(255,196,107,.5);
  box-shadow: 0 2px 10px rgba(0,0,0,.45), 0 0 12px rgba(255,196,107,.25); }
.cst.open .tx { color: #ffcf90; }
.cst.open .tag { color: #c9a273; }
.cst.bad { background: rgba(56,16,16,.8); border-color: rgba(255,145,130,.45); }
.cst.bad .tx { color: #ffc8c2; }
.cst.hood { left: 50%; top: 4%; }
.cst.trunk { left: 50%; top: 82%; }
.cst.dfl { left: 3%; top: 30%; }
.cst.wfl { left: 3%; top: 44%; }
.cst.drl { left: 3%; top: 58%; }
.cst.wrl { left: 3%; top: 72%; }
.cst.dfr { left: 97%; top: 30%; }
.cst.wfr { left: 97%; top: 44%; }
.cst.drr { left: 97%; top: 58%; }
.cst.wrr { left: 97%; top: 72%; }
.ctire { position: absolute; transform: translate(-50%, -50%); width: 52px; height: 52px; border-radius: 50%;
  background: radial-gradient(120% 120% at 50% 0%, rgba(30,46,64,.82), rgba(8,14,21,.78));
  border: 1px solid rgba(160,205,230,.18);
  box-shadow: 0 4px 16px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.12);
  font-variant-numeric: tabular-nums; backdrop-filter: blur(8px); }
.ctire .glyph { position: absolute; inset: 4px; opacity: .24; }
.ctire .glyph .ic { width: 100%; height: 100%; display: block; }
.ctire .tv { position: absolute; left: 0; right: 0; top: 12px; text-align: center; font-size: 13px; font-weight: 700;
  line-height: 1; color: #dbe7f5; text-shadow: 0 1px 3px rgba(0,0,0,.6); }
.ctire .tu { position: absolute; left: 0; right: 0; top: 30px; text-align: center; font-size: 7px; line-height: 1;
  color: #8496ad; letter-spacing: .04em; }
.ctire.warn { color: var(--hc-warn); border-color: rgba(255,196,107,.5); box-shadow: 0 2px 10px rgba(0,0,0,.45), 0 0 12px rgba(255,196,107,.22); }
.ctire.warn .tv { color: var(--hc-warn); }
.ctire.tlf { left: 12%; top: 18%; }
.ctire.trf { left: 88%; top: 18%; }
.ctire.tlr { left: 12%; top: 84%; }
.ctire.trr { left: 88%; top: 84%; }

/* ---- 面板模式：1440×900 设计稿等比缩放，整页装下不滚动 ---- */

/* 窄面板（手机 / 小屏全屏视图）：缩纵向节奏，目标一屏放下全部信息 */
ha-card.panel:not(.fit) .wrap { padding: 10px 12px 8px; gap: 6px; }
ha-card.panel:not(.fit) .head { gap: 2px; }
ha-card.panel:not(.fit) .title { font-size: 21px; }
ha-card.panel:not(.fit) .sub { font-size: 10px; }
ha-card.panel:not(.fit) .hero { height: 100%; min-height: 178px; --r: 96px; }
ha-card.panel:not(.fit) .carimg { max-height: 82%; max-width: 66%; }
ha-card.panel:not(.fit) .gauge { max-width: 86px; }
/* 窄面板：车图变小，门窗/胎压图标挂到车图左右外侧，靠像素偏移避开车身 */
ha-card.panel:not(.fit) .cst { width: 30px; height: 30px; border-radius: 8px; }
ha-card.panel:not(.fit) .cst .glyph { inset: 3px 3px 8px; }
ha-card.panel:not(.fit) .cst .tx { top: 12px; font-size: 7.5px; }
ha-card.panel:not(.fit) .cst .tag { bottom: 2px; font-size: 6px; }
ha-card.panel:not(.fit) .ctire { width: 34px; height: 34px; }
ha-card.panel:not(.fit) .ctire .glyph { inset: 2px; }
ha-card.panel:not(.fit) .ctire .tv { top: 8px; font-size: 10px; }
ha-card.panel:not(.fit) .ctire .tu { top: 21px; font-size: 5.5px; }
ha-card.panel:not(.fit) .cst.dfl,
ha-card.panel:not(.fit) .cst.wfl,
ha-card.panel:not(.fit) .cst.drl,
ha-card.panel:not(.fit) .cst.wrl { left: calc(50% - 84px); }
ha-card.panel:not(.fit) .cst.dfr,
ha-card.panel:not(.fit) .cst.wfr,
ha-card.panel:not(.fit) .cst.drr,
ha-card.panel:not(.fit) .cst.wrr { left: calc(50% + 84px); }
ha-card.panel:not(.fit) .cst.dfl { top: 22%; }
ha-card.panel:not(.fit) .cst.wfl { top: 44%; }
ha-card.panel:not(.fit) .cst.drl { top: 66%; }
ha-card.panel:not(.fit) .cst.wrl { top: 88%; }
ha-card.panel:not(.fit) .cst.dfr { top: 22%; }
ha-card.panel:not(.fit) .cst.wfr { top: 44%; }
ha-card.panel:not(.fit) .cst.drr { top: 66%; }
ha-card.panel:not(.fit) .cst.wrr { top: 88%; }
ha-card.panel:not(.fit) .cst.hood { top: 9.5%; left: 50%; }
ha-card.panel:not(.fit) .cst.trunk { top: 90%; left: 50%; }
ha-card.panel:not(.fit) .ctire.tlf { left: calc(50% - 116px); top: 7%; }
ha-card.panel:not(.fit) .ctire.trf { left: calc(50% + 116px); top: 7%; }
ha-card.panel:not(.fit) .ctire.tlr { left: calc(50% - 116px); top: 93%; }
ha-card.panel:not(.fit) .ctire.trr { left: calc(50% + 116px); top: 93%; }
ha-card.panel:not(.fit) .hero { --r: 72px; }
ha-card.panel:not(.fit) .energy { column-gap: 6px; }
ha-card.panel:not(.fit) .orb { width: 44px; height: 44px; }
ha-card.panel:not(.fit) .tile .ic { width: 17px; height: 17px; }
ha-card.panel:not(.fit) .tile { gap: 6px; }
ha-card.panel:not(.fit) .tile .lbl { font-size: 10px; }
ha-card.panel:not(.fit) .pills { margin-top: 2px; gap: 6px; }
ha-card.panel:not(.fit) .pill { height: 26px; font-size: 10.5px; }
ha-card.panel:not(.fit) .substats { margin-top: 4px; gap: 6px; }
ha-card.panel:not(.fit) .substats .sstat { padding: 4px 4px 3px; }
ha-card.panel:not(.fit) .substats .sstat b { font-size: 12px; }
ha-card.panel:not(.fit) .alert { padding: 7px 9px; font-size: 11px; }
ha-card.panel:not(.fit) .svc, ha-card.panel:not(.fit) .loc { font-size: 11px; }
ha-card.panel:not(.fit) .svc summary { padding: 7px 9px; }
ha-card.panel:not(.fit) .baseline.solo { padding: 3px 8px; font-size: 10px; }

:host(.panel) { position: relative; overflow: hidden;
  background: radial-gradient(90% 60% at 50% 0%, rgba(55,214,232,.10), transparent 62%),
    linear-gradient(170deg, #101b29 0%, #0a1119 60%, #070c13 100%); }
ha-card.panel { box-sizing: border-box; width: 100%; height: 100%; margin: 0; }
/* 卡片选择器缩略图：固定高度，绝不把整张面板卡塞进小格子 */
ha-card.preview { height: 186px; overflow: hidden; }
ha-card.preview .wrap { padding: 10px 12px 8px; gap: 6px; height: 100%; justify-content: center; box-sizing: border-box; }
ha-card.preview .hero { height: 62px; --r: 40px; margin: 0; }
ha-card.preview h1 { font-size: 16px; }
ha-card.preview .energy { margin-top: 0; }
ha-card.preview .gauge { max-width: 74px; }
ha-card.preview .gn b { font-size: 19px; }
ha-card.preview .gl { font-size: 8.5px; }
ha-card.preview .egmid { transform: scale(.8); }

ha-card.panel.fit { box-sizing: border-box; position: absolute; left: 50%; top: 50%; width: 1440px; height: 900px;
  transform: translate(-50%, -50%) scale(var(--fit, 1)); transform-origin: center center; }
ha-card.panel .wrap { height: 100%; box-sizing: border-box; padding: 26px 30px 20px; overflow: hidden; }
ha-card.panel .blocks { flex: 1 1 auto; min-height: 0; }
ha-card.panel .b-hero { justify-content: center; min-height: 0; }

ha-card.panel .hero { flex: 1 1 auto; height: auto; min-height: 300px; }
ha-card.panel .carimg { max-height: min(62%, 460px); max-width: min(60%, 330px); }

/* 宽面板：车图占左栏满高，仪表/操作/告警等叠成右栏，避免中间大片留白 */
/* 手机面板：固定 390×840 版式，整体等比缩放到容器内，一屏铺满且不出滚动条 */
:host(.panel) { position: relative; overflow: hidden; }
ha-card.panel.pfit { position: absolute; left: 0; top: 0;
  transform: scale(var(--pscale, 1)); transform-origin: 0 0; }
ha-card.panel.pfit .wrap { height: 100%; }
ha-card.panel.fit .wrap { display: flex; flex-direction: column; gap: 14px; justify-content: center; }
ha-card.panel.fit .head { grid-column: 1 / -1; }
ha-card.panel.fit .blocks { grid-column: 1 / -1; display: flex; flex-direction: row; align-items: stretch;
  gap: 52px; min-height: 0; }
ha-card.panel:not(.fit) .blocks { flex-direction: column; }
ha-card.panel.fit .b-hero-col { display: flex; flex: 1.02 1 0; min-width: 0; }
ha-card.panel.fit .b-hero-col .b-hero { flex: 1 1 auto; justify-content: center; }
ha-card.panel.fit .b-side { display: flex; flex-direction: column; flex: .98 1 0; min-width: 0;
  justify-content: center; gap: 16px; }
ha-card.panel.fit .b-hero .hero { height: 100%; min-height: 600px; }
ha-card.panel.fit .orbit { height: 78%; }
ha-card.panel.fit .orbit.o2 { height: 86%; }
ha-card.panel.fit .hmeta { grid-column: 1 / -1; }
ha-card.panel.fit .acts { width: 100%; max-width: none; }
ha-card.panel.fit .pills { width: 100%; max-width: none; }

@media (min-width: 860px) {
  :host { max-width: 860px; margin: 0 auto; }
  .wrap { padding: 24px 22px 18px; gap: 16px; }
  .hero { height: 268px; --r: 104px; }
  .head { align-items: center; }
  /* 桌面/面板视图：车图在左，仪表与副指标在右 */

  .dright { gap: 14px; }
  .gauge { max-width: 152px; }
  .acts { max-width: 540px; margin: 2px auto 0; width: 100%; }
  .pills { max-width: 540px; margin: 10px auto 0; width: 100%; }
  /* 面板模式：容器多宽就排多宽，车图列跟着面板高度走 */
  :host(.panel) { max-width: none; margin: 0; }
  ha-card.panel .wrap { padding: 22px 26px 16px; gap: 12px; }
  ha-card.panel .b-hero .hero { height: 100%; min-height: 250px; --r: 106px; }
  ha-card.panel .carimg { max-height: min(74%, 520px); max-width: min(60%, 330px); }
  ha-card.panel .gauge { max-width: 196px; }
  ha-card.panel .acts { max-width: 600px; }
  ha-card.panel .pills { max-width: 600px; }
}

@media (prefers-reduced-motion: reduce) {
  .tile, .orb, .pill { transition: none; }
  .tile.pressing .hring circle, .pill.pressing .holdbar { transition: none; }
  .sync.spin .ic, .tile.pending .orb::after, .node { animation: none; }
}
`;
var EDITOR_STYLES = `
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
/* 编辑器：模块布局行 */
.blklist { display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px; }
.blkrow { display: flex; flex-direction: column; gap: 6px; padding: 7px 8px 8px; border-radius: 11px;
  background: rgba(255,255,255,.045); border: 1px solid rgba(255,255,255,.06); font-size: 12px; }
.bk-top { display: flex; align-items: center; gap: 6px; }
.bk-sub { display: flex; align-items: center; gap: 6px; }
.bk-sub .ent { flex: 1 1 auto; min-width: 0; }
.blkrow.off { opacity: .55; }
.blkrow .nm { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.blkrow .btn.sq { min-width: 26px; padding: 4px 6px; font-size: 12px; line-height: 1; }
.blkrow .btn.sq.del { color: #ff8a8a; border-color: rgba(255,110,110,.28); }
.blkrow select.tf, .blkrow input.tf { padding: 5px 7px; font-size: 11.5px; }
.blkrow .sw { flex: none; }

`;

// src/strings.js
var ZH = {
  locked: "已锁定",
  unlocked: "已解锁",
  locking: "车锁状态未知",
  online: "车辆在线",
  offline: "车辆离线",
  running: "已启动",
  charging: "充电中",
  chargingDone: "已充满",
  notCharging: "未充电",
  lock: "车锁",
  lockUp: "上锁",
  lockDown: "关锁",
  unlock: "开锁",
  unlockShort: "解锁",
  trunk: "后备箱",
  engine: "远程启动",
  engineStop: "远程熄火",
  honk: "鸣笛寻车",
  soundLight: "声光寻车",
  soundDur: "寻车时长",
  soundType: "寻车类型",
  light: "灯光寻车",
  refresh: "刷新",
  refreshOk: "已请求云端刷新，约 30–60 秒回传",
  holdMore: "继续按住",
  holdMore: "继续按住",
  holdHint: "长按确认后执行，防误触",
  armed: "松手执行",
  sent: "已发送指令，等待车辆响应",
  failed: "指令发送失败",
  offlineBlocked: "车辆离线，指令可能无法到达",
  fuel: "燃油",
  battery: "电量",
  range: "续航",
  odo: "总里程",
  volt: "蓄电池",
  oil: "机油寿命",
  evRange: "纯电续航",
  tireLabel: "胎压",
  tireRec: "推荐",
  doorsClosed: "车门车窗已关闭",
  doorsTitle: "车门与车窗",
  open: "开启",
  closed: "关闭",
  chargingTitle: "充电",
  chargeNow: "立即充电",
  stopCharge: "停止充电",
  gunLock: "锁枪",
  gunUnlock: "解锁枪",
  departure: "预约充电",
  lastSoc: "上次充电",
  service: "服务信息",
  maintenance: "保养计划",
  recallInfo: "召回信息",
  messages: "未读消息",
  firmware: "车机固件",
  support: "客服电话",
  syncOk: "云端同步正常",
  syncBad: "云端同步异常",
  syncTime: "同步",
  never: "尚无数据",
  pickVehicle: "未识别到车辆，请在卡片设置里选择",
  location: "位置",
  noAlert: "无异常告警",
  alert: "车辆告警",
  tapHint: "点击查看详情",
  holdMs: "长按时长",
  modules: "显示模块",
  accent: "强调色",
  vehicle: "车辆",
  titleLabel: "卡片标题",
  showPlate: "显示车牌",
  privacy: "脱敏显示",
  privacyHint: "分享截图时把车牌、地址、电话与 VIN 打码，数据本身不变",
  layoutLabel: "布局",
  layoutFull: "完整",
  layoutCompact: "紧凑",
  imageLabel: "车辆图片",
  imageAuto: "自动",
  imageOverlook: "俯视车型图",
  image3d: "3D 车型图",
  imageSide: "侧视车型图",
  imageCustom: "自定义地址",
  guardTitle: "防误触",
  guardHint: "下列动作需要长按才会执行",
  guardActions: "需长按的动作",
  advanced: "高级：实体绑定",
  advancedHint: "留空即按设备自动识别；也可为每个位置指定实体。",
  reset: "恢复默认",
  none: "不显示",
  detect: "自动识别",
  noVehicleFound: "没有检测到福特派互联的车辆实体",
  editVehicle: "更改",
  every: "全部"
};
var EN = {
  locked: "Locked",
  unlocked: "Unlocked",
  locking: "Lock unknown",
  online: "Online",
  offline: "Offline",
  running: "Running",
  charging: "Charging",
  chargingDone: "Charged",
  notCharging: "Idle",
  lock: "Lock",
  lockUp: "Lock",
  lockDown: "Lock",
  unlock: "Unlock",
  unlockShort: "Unlock",
  trunk: "Trunk",
  engine: "Remote start",
  engineStop: "Stop engine",
  honk: "Find by horn",
  soundLight: "Horn & lights",
  soundDur: "Chirp length",
  soundType: "Chirp sound",
  light: "Find by lights",
  refresh: "Refresh",
  refreshOk: "Cloud refresh requested, 30–60 s",
  holdMore: "继续按住",
  holdMore: "Keep holding",
  holdHint: "Hold to confirm and prevent mis-touch",
  armed: "Release to run",
  sent: "Command sent, waiting for the car",
  failed: "Command failed",
  offlineBlocked: "Car is offline; command may not arrive",
  fuel: "Fuel",
  battery: "Battery",
  range: "Range",
  odo: "Odometer",
  volt: "12 V",
  oil: "Oil life",
  evRange: "EV range",
  tireLabel: "Tyre",
  tireRec: "Rec",
  doorsClosed: "Doors and windows closed",
  doorsTitle: "Doors & windows",
  open: "Open",
  closed: "Closed",
  chargingTitle: "Charging",
  chargeNow: "Start charge",
  stopCharge: "Stop charge",
  gunLock: "Lock gun",
  gunUnlock: "Unlock gun",
  departure: "Scheduled",
  lastSoc: "Last charge",
  service: "Service",
  maintenance: "Maintenance",
  recallInfo: "Recall",
  messages: "Unread",
  firmware: "Firmware",
  support: "Hotline",
  syncOk: "Cloud sync OK",
  syncBad: "Cloud sync error",
  syncTime: "Sync",
  never: "No data",
  pickVehicle: "No vehicle found, pick one in the card editor",
  location: "Location",
  noAlert: "No active alert",
  alert: "Vehicle alert",
  tapHint: "Tap for details",
  holdMs: "Hold duration",
  modules: "Modules",
  accent: "Accent",
  vehicle: "Vehicle",
  titleLabel: "Title",
  showPlate: "Show plate",
  privacy: "Mask for sharing",
  privacyHint: "Blur plate, address, phone and VIN — data itself stays unchanged",
  layoutLabel: "Layout",
  layoutFull: "Full",
  layoutCompact: "Compact",
  imageLabel: "Vehicle image",
  imageAuto: "Auto",
  imageOverlook: "Top view",
  image3d: "3D image",
  imageSide: "Side view",
  imageCustom: "Custom URL",
  guardTitle: "Mis-touch guard",
  guardHint: "These actions only run after a long press",
  guardActions: "Actions requiring hold",
  advanced: "Advanced: entity binding",
  advancedHint: "Leave empty to auto-detect from the device.",
  reset: "Reset",
  none: "Hidden",
  detect: "Auto",
  noVehicleFound: "No FordPass vehicle entities detected",
  editVehicle: "Change",
  every: "All"
};
function dict(hass) {
  const lang = String(hass && hass.locale && hass.locale.language || "zh").toLowerCase();
  return lang.startsWith("en") ? EN : ZH;
}
function isEn(hass) {
  const lang = String(hass && hass.locale && hass.locale.language || "zh").toLowerCase();
  return lang.startsWith("en");
}

// src/util.js
function esc(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}
function isBad(state) {
  return !state || state.state === "unavailable" || state.state === "unknown";
}
function num(state) {
  if (isBad(state)) return null;
  const v = parseFloat(String(state.state).replace(",", "."));
  return Number.isFinite(v) ? v : null;
}
function text(state) {
  return isBad(state) ? "" : String(state.state);
}
function attrs(state, key) {
  return state && state.attributes ? state.attributes[key] : void 0;
}
function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}
function fmtNum(v, digits = 0) {
  if (v == null || !Number.isFinite(v)) return "—";
  const opts = { maximumFractionDigits: digits, minimumFractionDigits: 0 };
  try {
    return new Intl.NumberFormat("zh-Hans-CN", opts).format(v);
  } catch {
    return String(Math.round(v * 10 ** digits) / 10 ** digits);
  }
}
function relTime(iso, lang) {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";
  const diff = Math.max(0, Date.now() - then) / 1e3;
  const zh = !lang || !String(lang).startsWith("en");
  if (diff < 60) return zh ? "刚刚" : "just now";
  if (diff < 3600) {
    const m = Math.floor(diff / 60);
    return zh ? `${m} 分钟前` : `${m} min ago`;
  }
  if (diff < 86400) {
    const h = Math.floor(diff / 3600);
    return zh ? `${h} 小时前` : `${h} h ago`;
  }
  const d = Math.floor(diff / 86400);
  return zh ? `${d} 天前` : `${d} d ago`;
}
function normLock(state) {
  const s = String(text(state)).toLowerCase();
  if (!s) return "unknown";
  if (s.includes("解锁") || s.includes("unlock")) return "unlocked";
  if (s.includes("锁定") || s.includes("lock") || s.includes("secured")) return "locked";
  return "unknown";
}
function normOpen(state) {
  const s = String(text(state)).toLowerCase();
  if (!s) return "unknown";
  if (s.includes("开启") || s.includes("打开") || s.includes("open")) return "open";
  if (s.includes("关闭") || s.includes("关好") || s.includes("closed")) return "closed";
  return "unknown";
}
function normTire(state) {
  const s = String(text(state)).toLowerCase();
  if (!s) return "ok";
  if (s.includes("fault") || s.includes("warn") || s.includes("故障") || s.includes("低") || s.includes("异常")) return "warn";
  return "ok";
}
function chargingNow(state) {
  if (isBad(state)) return false;
  const attr = state.attributes && state.attributes.evcc_charge_state;
  if (attr === 2 || attr === "2") return true;
  const s = String(state.state).toLowerCase();
  return s.includes("充电中") || s.includes("charging");
}
var ADMIN = /[省市区的县旗盟州]/;
function maskAddr(a) {
  if (!a) return "";
  let count = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (ADMIN.test(a[i])) {
      count += 1;
      if (count >= 2) return `${a.slice(0, i + 1)}…`;
    }
  }
  return a.length > 3 ? `${a.slice(0, 2)}••` : "••";
}
function maskPlate(p) {
  if (!p) return "";
  const plain = p.replace(/[·\s]/g, "");
  return plain.length >= 2 ? `${plain.slice(0, 2)}${"•".repeat(Math.max(3, plain.length - 2))}` : "••••";
}
function maskText(s) {
  if (!s) return "";
  return String(s).replace(/\b[A-Z0-9]{12,}\b/g, (m) => m.match(/\d/) ? `${m.slice(0, 4)}${"•".repeat(Math.max(4, m.length - 4))}` : m).replace(/\d{7,}/g, (m) => `${m.slice(0, 3)}${"•".repeat(Math.max(4, m.length - 3))}`);
}

// src/card.js
var FORD_LOGO = `<span class="brand" aria-hidden="true"><svg viewBox="0 0 44 20" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="22" cy="10" rx="21" ry="9" fill="#0b3f92" stroke="#eef4ff" stroke-width="1.6"/>
<ellipse cx="22" cy="10" rx="17.6" ry="6.6" fill="none" stroke="#eef4ff" stroke-width=".9" opacity=".85"/>
<text x="22" y="13.4" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-style="italic"
 font-weight="700" font-size="9.4" fill="#f4f8ff" letter-spacing=".4">Ford</text></svg></span>`;
var MODULES = ["status", "actions", "energy", "tires", "doors", "charging", "alerts", "service"];
var BLOCK_TYPES = ["meta", "hero", "energy", "alerts", "doors", "charging", "service", "actions", "custom"];
var CONFIRMABLE = [
  "btn_unlock",
  "btn_lock",
  "sw_engine",
  "sw_honk",
  "sw_va",
  "sw_light"
];
var PREVIEW_TAGS = /* @__PURE__ */ new Set([
  "hui-card-picker",
  "ha-card-picker",
  "hui-dialog-add-card",
  "hui-dialog-edit-card",
  "hui-card-editor",
  "hui-edit-card-dialog",
  "ha-editor"
]);
var PANEL_TAGS = /* @__PURE__ */ new Set(["hui-panel-view", "hui-grid-view"]);
var DEFAULTS = {
  title: "",
  layout: "full",
  // 默认不渲染「服务信息」，可在编辑器里手动勾选
  modules: MODULES.filter((m) => m !== "service"),
  // 模块顺序：null 时按 modules 兼容推导（老配置无需迁移）
  blocks: null,
  confirm: ["btn_unlock", "btn_lock", "sw_engine", "sw_honk"],
  hold_ms: 2e3,
  accent: "#37d6e8",
  show_plate: true,
  privacy: false,
  image: "auto",
  image_url: "",
  entities: {}
};
function normBlocks(cfg) {
  const raw = Array.isArray(cfg.blocks) ? cfg.blocks : null;
  if (raw) {
    const list2 = raw.filter((b) => b && typeof b === "object" && BLOCK_TYPES.includes(b.type)).map((b) => ({
      type: b.type,
      on: b.on !== false,
      entity: typeof b.entity === "string" ? b.entity : "",
      label: typeof b.label === "string" ? b.label : "",
      unit: typeof b.unit === "string" ? b.unit : "",
      icon: typeof b.icon === "string" ? b.icon : ""
    }));
    if (list2.length) return list2;
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
var SLOT_KEYS = Object.keys(SLOTS);
var HaCarCard = class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._built = false;
    this._sig = "";
    this._pending = /* @__PURE__ */ new Map();
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
    cfg.modules = Array.isArray(cfg.modules) ? cfg.modules.filter((m) => MODULES.includes(m)) : DEFAULTS.modules.slice();
    cfg.confirm = Array.isArray(cfg.confirm) ? cfg.confirm.filter((k) => CONFIRMABLE.includes(k)) : DEFAULTS.confirm.slice();
    cfg.entities = cfg.entities && typeof cfg.entities === "object" ? cfg.entities : {};
    cfg.hold_ms = clamp(Number(cfg.hold_ms) || DEFAULTS.hold_ms, 300, 3e3);
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
      grid_min_rows: g.min_rows
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
      node = node.parentElement || node.parentNode && node.parentNode.host || null;
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
    if (wasFit !== void 0 && wasFit !== fit && this._wrap && this._wrap.firstChild) {
      this._render(true);
    }
    const pfit = !fit && w > 0 && h > 0;
    this._card.classList.toggle("pfit", pfit);
    if (pfit) {
      const k2 = Math.max(0.42, Math.min(2.2, Math.min(w / 390, h / 840)));
      this._card.style.setProperty("--pscale", String(Math.round(k2 * 1e3) / 1e3));
      this._card.style.width = `${Math.round(w / k2)}px`;
      this._card.style.height = `${Math.round(h / k2)}px`;
      return;
    }
    if (!fit) return;
    const k = Math.min(w / 1440, h / 900);
    this._card.style.setProperty("--fit", String(Math.round(k * 1e3) / 1e3));
    const designH = Math.max(900, Math.round(h / k));
    this._card.style.width = "1440px";
    this._card.style.height = `${designH}px`;
  }
  _isPreview() {
    if (this._preview) return true;
    if (this.preview === true || this.preview === "true" || this.hasAttribute("preview")) return true;
    let node = this.parentElement;
    let depth = 0;
    while (node && depth < 10) {
      const n = (node.localName || "").toLowerCase();
      if (PREVIEW_TAGS.has(n)) return true;
      node = node.parentElement || node.parentNode && node.parentNode.host || null;
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
      if (changed || now - ts > 18e4) this._pending.delete(ent);
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
      return this._empty(isEn(this._hass) ? "No vehicle entity found. Check that FordPass integration is loaded, or pick a vehicle in the card editor." : "没找到车辆实体。确认福特派互联集成已加载，或在卡片编辑器里选择车辆。");
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
    const status = offline ? { cls: "bad", label: t.offline } : lockNorm === "unlocked" ? { cls: "bad", label: t.unlocked } : lockNorm === "locked" ? { cls: "ok", label: t.locked } : { cls: "", label: t.locking };
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
            this._carOverlay(data, t, mods)
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
    const inner = typeof overlay === "string" ? overlay : overlay && overlay.inner || "";
    const edge = overlay && overlay.edge || "";
    return `<div class="hero"><div class="halo"></div>
      <span class="orbit"><svg class="hring2" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="49"/></svg><i class="node n1"></i><i class="node n2"></i><i class="node n3"></i><i class="node n4"></i></span>
      <span class="orbit o2"></span>
      ${imgUrl ? `<img class="carimg" src="${esc(imgUrl)}"${fbUrl ? ` data-fb="${esc(fbUrl)}"` : ""} alt="">` : `<div class="carph">${icon("car")}</div>`}
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
      const txt = bad ? zh ? "不可用" : "N/A" : open ? zh ? "打开" : "Open" : zh ? "关闭" : "Shut";
      (isEdge ? edge : out).push(
        `<span class="cst ico ${cls}${bad ? " bad" : open ? " open" : ""}" data-more="${esc(data.id(slot))}"
          title="${esc(label)} · ${esc(txt)}" aria-label="${esc(label)} ${esc(txt)}">
          <span class="glyph">${icon(ic)}</span><b class="tx">${esc(txt)}</b><i class="tag">${esc(short)}</i></span>`
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
    {
      const tp = [
        ["tp_lf", "tps_lf", "tlf", zh ? "左前" : "LF"],
        ["tp_rf", "tps_rf", "trf", zh ? "右前" : "RF"],
        ["tp_lr", "tps_lr", "tlr", zh ? "左后" : "LR"],
        ["tp_rr", "tps_rr", "trr", zh ? "右后" : "RR"]
      ];
      for (const [slot, sslot, cls, label] of tp) {
        const st = data.get(slot);
        if (isBad(st)) continue;
        const v = num(st);
        const flag = normTire(data.get(sslot)) === "warn";
        const outOfRange = v != null && (v < 190 || v > 300);
        const warn = outOfRange || flag && v == null;
        const unit = attrs(st, "unit_of_measurement") || "kPa";
        out.push(
          `<b class="ctire ico ${cls}${warn ? " warn" : ""}" data-more="${esc(data.id(slot))}"
            title="${esc(t.tireLabel + " · " + label)} ${v == null ? "—" : fmtNum(v)} ${esc(unit)}">
            <span class="glyph">${icon("tire")}</span><span class="tv">${v == null ? "—" : fmtNum(v)}</span><span class="tu">${esc(unit)}</span></b>`
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
      (this._hass.locale || {}).language
    );
    const label = when ? when : syncText ? bad ? t.syncBad : t.syncOk : t.never;
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
    const pic = (slot) => {
      const st = data.get(slot);
      if (!st) return null;
      const direct = attrs(st, "image_url");
      const proxy = attrs(st, "entity_picture") || null;
      const okDirect = direct && /^https?:\/\//.test(String(direct));
      if (cfg.privacy) {
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
    const left = pct == null ? "" : this._gauge({ pct: clamp(pct, 2, 100), label: pctLabel, value: Math.round(pct), unit: "%", ic: pctIc });
    const right = range != null ? this._gauge({
      pct: clamp(range / (batt != null ? 500 : 620) * 100, 2, 100),
      label: t.range,
      value: fmtNum(range),
      unit: rangeUnit,
      ic: "gauge"
    }) : this._gauge({ pct: 100, label: t.odo, value: fmtNum(odo), unit: odoUnit, ic: "gauge" });
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
    const arc = C * pct / 100;
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
    const hold = (key) => cfg.confirm.includes(key) ? ' data-hold="1"' : "";
    const lockNorm = normLock(data.get("lock"));
    if (data.id("btn_unlock")) {
      tiles.push(this._tile({
        key: "btn_unlock",
        ent: data.id("btn_unlock"),
        ic: "unlock",
        label: t.unlock,
        cls: lockNorm === "unlocked" ? "hot" : "",
        dom: "button",
        svc: "press",
        hold,
        offline
      }));
    }
    if (data.id("btn_lock")) {
      tiles.push(this._tile({
        key: "btn_lock",
        ent: data.id("btn_lock"),
        ic: "lock",
        label: t.lockDown,
        cls: lockNorm === "locked" ? "on" : "",
        dom: "button",
        svc: "press",
        hold,
        offline
      }));
    }
    if (data.id("sw_engine")) {
      tiles.push(this._tile({
        key: "sw_engine",
        ent: data.id("sw_engine"),
        ic: "power",
        cls: running ? "on" : "",
        label: running ? t.engineStop : t.engine,
        dom: "homeassistant",
        svc: "toggle",
        hold,
        offline
      }));
    }
    if (data.id("sw_honk")) {
      tiles.push(this._tile({
        key: "sw_honk",
        ent: data.id("sw_honk"),
        ic: "megaphone",
        label: t.honk,
        dom: "homeassistant",
        svc: "toggle",
        hold,
        offline
      }));
    }
    const pills = [];
    if (!compact) {
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
    const opts = st && st.attributes && st.attributes.options || [];
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
      if (/^on|off$/i.test(raw)) value = raw.toLowerCase() === "on" ? isEn(this._hass) ? "On" : "开" : isEn(this._hass) ? "Off" : "关";
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
      { slot: "tp_rr", sslot: "tps_rr", label: isEn(this._hass) ? "RR" : "右后" }
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
      { slot: "win_fr", label: isEn(this._hass) ? "Win R" : "副驾车窗" }
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
    return `<div class="doors">${open.map((d) => `<span class="door open" data-more="${esc(data.id(d.slot))}">${icon("carProfile")}${esc(d.label)} · ${esc(t.open)}</span>`).join("")}</div>`;
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
      ${rows.map((r) => `<div class="row" data-more="${esc(r.ent)}"><span class="k">${esc(r.label)}</span><span class="val">${esc(r.value)}</span></div>`).join("")}</details>`;
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
    return clamp(Number(this._config && this._config.hold_ms) || DEFAULTS.hold_ms, 300, 3e3);
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
    }
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
    const stage = (frac, pattern) => setTimeout(() => {
      if (this._hold) buzz(pattern);
    }, Math.round(ms * frac));
    this._holdStages = [stage(0.3, 15), stage(0.7, 20)];
    this._holdTick = setInterval(() => {
      if (!this._hold || !this._hold.lbl) return;
      const left = Math.max(0, (ms - (Date.now() - this._hold.start)) / 1e3);
      this._hold.lbl.textContent = `${t.holdMore} ${left.toFixed(1)}s`;
    }, 100);
    this._holdTimer = setTimeout(() => {
      if (!this._hold) return;
      this._hold.armed = true;
      el.classList.add("armed");
      if (this._holdTick) clearInterval(this._holdTick);
      this._holdTick = null;
      const rg = this.shadowRoot.querySelector(".orbit .hring2");
      if (rg && rg.parentElement) {
        rg.parentElement.classList.remove("prog");
        rg.parentElement.classList.add("armed");
      }
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
        composed: true
      })
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
    Promise.resolve(call).then(() => {
      const t = dict(this._hass);
      this._showToast(key === "btn_refresh" ? t.refreshOk : t.sent + (label ? "：" + label : ""), "ok");
    }).catch((err) => {
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
    }, 4e3);
    this._render(true);
  }
};
customElements.define("ha-car", HaCarCard);

// src/editor.js
var BLOCK_LABELS = {
  meta: "定位/同步",
  hero: "车图",
  energy: "能耗仪表",
  alerts: "车辆告警",
  doors: "门窗",
  charging: "充电",
  service: "服务信息",
  actions: "控制按钮",
  custom: "自定义实体"
};
var ACTION_LABELS = {
  btn_unlock: "开锁",
  btn_lock: "上锁",
  sw_engine: "远程启动/熄火",
  sw_honk: "鸣笛寻车",
  sw_va: "声光寻车",
  sw_light: "灯光寻车"
};
var OVERRIDES = [
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
  ["btn_refresh", "手动刷新按钮"]
];
var ACCENTS = ["#37d6e8", "#6ea8ff", "#7ee2a8", "#ffb347", "#ff7ab0"];
var L = {
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
  autofillDone: "已把集成里识别到的实体填入下列位置"
};
var IMG_MODES = [
  ["auto", "自动（俯视 → 3D → 侧视）"],
  ["overlook", "俯视车型图"],
  ["3d", "3D 车型图"],
  ["side", "侧视车型图"],
  ["custom", "自定义图片地址"]
];
var HaCarEditor = class extends HTMLElement {
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
            <input class="tf" data-ov="${slot}" type="text" placeholder="sensor.xxx_${slot}">`
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
        if (id) {
          cfg.entities[slot] = id;
          n += 1;
        }
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
      (k) => `<button class="tg" type="button" data-confirm="${k}">${ACTION_LABELS[k] || k}</button>`
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
      const entSel = b.type === "custom" ? `<select class="tf ent" data-bf="entity" data-i="${i}">
            <option value="">选择实体…</option>
            ${ents.map((id) => `<option value="${esc(id)}"${id === b.entity ? " selected" : ""}>${esc(id)}</option>`).join("")}
          </select>
          <input class="tf" data-bf="label" data-i="${i}" value="${esc(b.label || "")}" placeholder="显示名称" style="flex:1 1 90px">
          <input class="tf" data-bf="unit" data-i="${i}" value="${esc(b.unit || "")}" placeholder="单位" style="flex:0 0 62px">` : "";
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
      const label = car.name || nick && nick.state || car.hash;
      opts.push(`<option value="${esc(car.hash)}">${esc(label)}</option>`);
    }
    sel.innerHTML = opts.join("");
    sel.value = this._config && this._config.hash || "";
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
    const hold = Number(this._config.hold_ms) || 2e3;
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
      input.value = this._config.entities && this._config.entities[input.dataset.ov] || "";
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
        composed: true
      })
    );
  }
};
customElements.define("ha-car-editor", HaCarEditor);

// src/main.js
var VERSION = "1.4.6";
window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-car",
  name: "爱车卡片",
  description: "福特派互联（FordPass CN）/ 林肯之道车辆卡片：车况、四轮胎压、门窗、充电与长按防误触控车。",
  preview: true,
  documentationURL: "https://github.com/RockJesus/ha-car#readme"
});
console.info(
  `%c HA-CAR %c v${VERSION} %c适配福特派互联 / 林肯之道`,
  "background:#37d6e8;color:#08121d;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px",
  "background:#141d2b;color:#e9eff7;padding:2px 6px",
  "background:#0b1220;color:#8496ad;padding:2px 6px;border-radius:0 4px 4px 0"
);
