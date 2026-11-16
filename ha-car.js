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
  wheel: "M128,16a112,112,0,0,1,0,224a112,112,0,0,1,0,-224ZM128,44a84,84,0,0,0,0,168a84,84,0,0,0,0,-168ZM128,102a26,26,0,0,1,0,52a26,26,0,0,1,0,-52Z",
  tire: "M149.26,159.26C155.09,173.82,163.5,176,168,176s12.91-2.18,18.74-16.74c3.39-8.48,5.26-19.58,5.26-31.26s-1.87-22.78-5.26-31.26C180.91,82.18,172.5,80,168,80s-12.91,2.18-18.74,16.74C145.87,105.22,144,116.32,144,128S145.87,150.78,149.26,159.26ZM168,96.2c2.62,2.06,8,13,8,31.8s-5.38,29.74-8,31.8c-2.62-2.06-8-13-8-31.8S165.38,98.26,168,96.2ZM232,216H196.41C213.12,197.73,224,165.47,224,128c0-58.32-26.35-104-60-104H92C58.35,24,32,69.68,32,128S58.35,232,92,232H232a8,8,0,0,0,0-16ZM48,128c0-2.5.07-5,.17-7.44L80,97.83l24.43,17.45c-.28,4.16-.43,8.41-.43,12.72a179.89,179.89,0,0,0,3.07,33.5l-22.42-16a8,8,0,0,0-9.3,0l-23.74,17A161,161,0,0,1,48,128Z",
  bolt: "M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z",
  fuel: "M241,69.66,221.66,50.34a8,8,0,0,0-11.32,11.32L229.66,81A8,8,0,0,1,232,86.63V168a8,8,0,0,1-16,0V128a24,24,0,0,0-24-24H176V56a24,24,0,0,0-24-24H72A24,24,0,0,0,48,56V208H32a8,8,0,0,0,0,16H192a8,8,0,0,0,0-16H176V120h16a8,8,0,0,1,8,8v40a24,24,0,0,0,48,0V86.63A23.85,23.85,0,0,0,241,69.66ZM64,208V56a8,8,0,0,1,8-8h80a8,8,0,0,1,8,8V208Zm80-96a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h48A8,8,0,0,1,144,112Z",
  gauge: "M207.06,72.67A111.24,111.24,0,0,0,128,40h-.4C66.07,40.21,16,91,16,153.13V176a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V152A111.25,111.25,0,0,0,207.06,72.67ZM224,176H119.71l54.76-75.3a8,8,0,0,0-12.94-9.42L99.92,176H32V153.13c0-3.08.15-6.12.43-9.13H56a8,8,0,0,0,0-16H35.27c10.32-38.86,44-68.24,84.73-71.66V80a8,8,0,0,0,16,0V56.33A96.14,96.14,0,0,1,221,128H200a8,8,0,0,0,0,16h23.67c.21,2.65.33,5.31.33,8Z",
  chevron: "M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z",
  caretRight: "M181.66,133.66l-80,80A8,8,0,0,1,88,208V48a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,181.66,133.66Z"
};
var ICON_NAMES = Object.keys(PATHS);
var STROKE_PATHS = {
  // 车门：门板轮廓 + 门把手
  cardoor: "M56,32 H200 V224 H56 Z M176,128 m-10,0 a10,10 0,1,0 20,0 a10,10 0,1,0 -20,0",
  // 车窗：窗框 + 中分线
  carwin: "M32,64 H224 V192 H32 Z M128,64 V192",
  // 胎压：轮胎外圈 + 内圈 + 胎面纹
  tireo: "M128,36 a92,92 0,1,0 0,184 a92,92 0,1,0 0,-184 M128,96 a32,32 0,1,0 0,64 a32,32 0,1,0 0,-64"
};
function icon(name, cls) {
  const s = STROKE_PATHS[name];
  if (s) {
    return `<svg class="ic${cls ? " " + cls : ""}" viewBox="0 0 256 256" aria-hidden="true" focusable="false"><path d="${s}" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
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
ha-card.theme-glass { border-color: rgba(255,255,255,.26); border-radius: 28px;
  box-shadow: 0 30px 70px -34px rgba(0,0,0,.95), 0 0 58px -30px rgba(190,198,208,.42),
    inset 0 1px 0 rgba(255,255,255,.22); }
/* 液态玻璃：不铺实心底色，靠半透明玻璃层 + backdrop 模糊透出仪表盘背景 */
ha-card.theme-glass .wrap { background-image: none; }
ha-card.theme-glass .skin {
  border-radius: inherit;
  background:
    linear-gradient(138deg, rgba(255,255,255,.18) 0%, rgba(255,255,255,.06) 26%, transparent 52%),
    radial-gradient(70% 50% at 12% 0%, rgba(210,218,228,.14), transparent 62%),
    radial-gradient(64% 48% at 90% 12%, rgba(190,200,212,.10), transparent 64%),
    radial-gradient(110% 78% at 50% 116%, rgba(160,170,182,.12), transparent 68%),
    linear-gradient(168deg, rgba(72,74,80,.34) 0%, rgba(44,46,50,.30) 52%, rgba(20,21,24,.40) 100%);
  backdrop-filter: blur(34px) saturate(112%);
  -webkit-backdrop-filter: blur(30px) saturate(112%); }
ha-card { display: block; overflow: hidden; position: relative; padding: 0;
  border: 1px solid rgba(var(--hc-a,120,190,215),.16);
  border-radius: var(--ha-card-border-radius, 28px);
  color: var(--hc-ink);
  background-image: var(--hc-bg,
    radial-gradient(120% 80% at 50% -10%, rgba(var(--hc-a,55,214,232),.14), transparent 58%),
    radial-gradient(70% 50% at 15% 105%, rgba(40,120,180,.10), transparent 70%),
    linear-gradient(168deg, #111d2c 0%, #0b1521 52%, #060b12 100%));
  background-size: auto, auto, auto;
  background-repeat: no-repeat;
  box-shadow: 0 30px 60px -30px rgba(2,6,12,.98), 0 0 56px -26px rgba(var(--hc-a,55,214,232),.45),
    inset 0 1px 0 rgba(255,255,255,.08), inset 0 -1px 0 rgba(0,0,0,.5);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Microsoft YaHei", "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  isolation: isolate;
}
ha-card > .skin { position: absolute; inset: 0; z-index: 0; pointer-events: none; border-radius: inherit;
  background-image: var(--hc-bg,
    radial-gradient(120% 80% at 50% -10%, rgba(55,214,232,.14), transparent 58%),
    radial-gradient(70% 50% at 15% 105%, rgba(40,120,180,.10), transparent 70%),
    linear-gradient(168deg, #111d2c 0%, #0b1521 52%, #060b12 100%));
  background-size: auto, auto, auto; background-repeat: no-repeat; }
ha-card::before { content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 1;
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
.wrap { position: relative; z-index: 2; padding: 18px 16px 14px; display: flex; flex-direction: column; gap: 14px;
  background-image: var(--hc-bg,
    radial-gradient(120% 80% at 50% -10%, rgba(var(--hc-a,55,214,232),.14), transparent 58%),
    radial-gradient(70% 50% at 15% 105%, rgba(40,120,180,.10), transparent 70%),
    linear-gradient(168deg, #111d2c 0%, #0b1521 52%, #060b12 100%));
  background-size: auto, auto, auto; background-repeat: no-repeat; }
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
.ttl { flex: 1; min-width: 0; display: flex; align-items: baseline; gap: 10px; }
h1 { margin: 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 26px; line-height: 1.1;
  font-weight: 720; letter-spacing: .005em;
  background: linear-gradient(180deg, #ffffff 0%, #eef9ff 38%, #b8d6e6 72%, #8fb2c6 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,.55));
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.plate { flex: 0 0 auto; display: inline-block; font-size: 11px; font-weight: 620;
  letter-spacing: .2em; color: rgba(190,214,230,.82); vertical-align: .14em;
  text-shadow: 0 0 12px rgba(var(--hc-a,55,214,232),.22); }
.status { flex: none; display: inline-flex; align-items: center; gap: 7px; height: 30px; padding: 0 14px;
  border-radius: 999px; font-size: 11.5px; font-weight: 650; letter-spacing: .03em;
  color: var(--hc-dim); background: rgba(255,255,255,.045);
  border: 1px solid rgba(255,255,255,.11); white-space: nowrap;
  backdrop-filter: blur(6px); }
.brand { display: inline-flex; align-items: center; margin-right: 7px; vertical-align: -1px; }
.brand svg { width: 46px; height: 21px; display: block;
  filter: drop-shadow(0 0 8px rgba(var(--hc-a,55,214,232),.35)) drop-shadow(0 2px 4px rgba(0,0,0,.5));
  transform: translateZ(0); }
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
  background: radial-gradient(46% 52% at 50% 50%, rgba(var(--hc-a,55,214,232),.20), rgba(var(--hc-a,55,214,232),.06) 46%, transparent 72%);
  filter: blur(2px); }
.orbit, .orbit.o2 { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  border-radius: 50%; pointer-events: none; height: 94%; aspect-ratio: 1; width: auto; }
.orbit { border: 1px solid rgba(70,220,240,.22);
  box-shadow: inset 0 0 34px -14px rgba(var(--hc-a,55,214,232),.55), 0 0 24px -16px rgba(var(--hc-a,55,214,232),.5); }
.orbit.o2 { height: 97%;
  border: 1px solid rgba(var(--hc-a,55,214,232),.08); }
.node { position: absolute; left: 50%; top: 50%; width: 7px; height: 7px; margin: -3.5px 0 0 -3.5px;
  transform: translate(-50%, -50%);
  border-radius: 50%; background: #9ef4ff;
  box-shadow: 0 0 6px 1px rgba(var(--hc-a,55,214,232),.9), 0 0 16px 5px rgba(var(--hc-a,55,214,232),.35);
  animation: hc-node 3.2s ease-in-out infinite; }
.node.n1 { top: 0; animation-delay: 0s; }
.node.n2 { top: 50%; left: 100%; animation-delay: .8s; }
.node.n3 { top: 100%; animation-delay: 1.6s; }
.node.n4 { top: 50%; left: 0; animation-delay: 2.4s; }
.carimg { position: relative; max-width: 64%; max-height: 78%; object-fit: contain;
  filter: brightness(1.06) saturate(1.04) drop-shadow(0 30px 30px rgba(2,6,12,.8)) drop-shadow(0 0 18px rgba(var(--hc-a,55,214,232),.08)); }
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
.chip.info { color: var(--hc-accent); background: rgba(var(--hc-a,55,214,232),.09); border-color: rgba(var(--hc-a,55,214,232),.24); }

/* 操作：圆形玻璃钮 + 标签，长按沿圆环走一圈（参考图同构） */
.acts { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 2px; }
.acts { gap: 4px; }
/* 按钮自成一套赛博配色：青 / 电紫 / 洋红，不跟主题强调色走，任何主题下都能从底色里跳出来 */
.tile { position: relative; display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 0;
  background: none; border: none; cursor: pointer; color: var(--hc-ink); font: inherit; text-align: center;
  -webkit-tap-highlight-color: transparent; -webkit-touch-callout: none; user-select: none;
  touch-action: manipulation;
  --cy-a: 34,232,255; --cy-b: 168,86,255; --cy-c: 255,52,196; --cy-ok: 48,255,168; }
.orb { position: relative; width: 62px; height: 62px; display: grid; place-items: center; border-radius: 50%;
  border: 1px solid rgba(34,232,255,.22);
  background:
    radial-gradient(120% 92% at 34% 16%, rgba(255,255,255,.52) 0%, rgba(255,255,255,.10) 32%, rgba(255,255,255,0) 54%),
    radial-gradient(132% 130% at 50% 122%, rgba(var(--cy-a),.32), rgba(var(--cy-b),.10) 48%, transparent 70%),
    linear-gradient(168deg, #122634 0%, #0a1119 58%, #05090e 100%);
  box-shadow: inset 0 1px 2px rgba(255,255,255,.34), inset 0 -9px 18px -8px rgba(0,0,0,.95),
    0 14px 24px -16px rgba(0,0,0,.98), 0 0 30px -16px rgba(var(--cy-a),1);
  transition: transform .16s ease, border-color .2s, box-shadow .2s; }
/* 霓虹圈：青 → 白 → 洋红 → 电紫 → 青，1.8px */
.orb::before { content: ""; position: absolute; inset: -3px; border-radius: 50%; padding: 2px; pointer-events: none;
  background: conic-gradient(from 205deg, rgba(var(--cy-a),1), rgba(226,244,255,.26) 14%,
    rgba(var(--cy-c),.9) 44%, rgba(var(--cy-b),.95) 62%, rgba(var(--cy-a),1) 82%, rgba(226,244,255,.2) 94%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  opacity: .7; transition: opacity .2s, filter .2s; }
.orb::after { content: ""; position: absolute; left: 17%; top: 9%; width: 46%; height: 32%; border-radius: 50%;
  background: radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,.6), rgba(255,255,255,.08) 68%, transparent 78%);
  filter: blur(1px); pointer-events: none; opacity: .7; }
.tile .ic { width: 24px; height: 24px; color: #ddf8ff; filter: drop-shadow(0 1px 2px rgba(0,0,0,.7)); }
.tile .lbl { max-width: 100%; font-size: 12.5px; font-weight: 620; letter-spacing: .06em;
  color: rgba(206,229,244,.88); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tile:hover { transform: translateY(-2px); }
.tile:hover .orb::before { opacity: 1; filter: drop-shadow(0 0 7px rgba(var(--cy-c),.8)); }
.tile:hover .orb { border-color: rgba(var(--cy-c),.4);
  box-shadow: inset 0 1px 2px rgba(255,255,255,.4), inset 0 -9px 18px -8px rgba(0,0,0,.95),
    0 18px 26px -16px rgba(0,0,0,.98), 0 0 34px -12px rgba(var(--cy-c),.9); }
.tile:active, .tile.pressing { transform: scale(.94); }
.tile:active .orb, .tile.pressing .orb { box-shadow: inset 0 2px 8px rgba(0,0,0,.7), 0 0 28px -8px rgba(var(--cy-c),1); }
.tile:focus-visible { outline: 1px solid rgba(var(--cy-a),.9); outline-offset: 4px; border-radius: 10px; }
/* 当前状态/可执行：整颗球转洋红，霓虹圈全亮并呼吸 */
.tile.hot .orb { border-color: rgba(var(--cy-c),.55);
  background:
    radial-gradient(120% 92% at 34% 16%, rgba(255,255,255,.6) 0%, rgba(255,255,255,.12) 32%, rgba(255,255,255,0) 54%),
    radial-gradient(132% 130% at 50% 118%, rgba(var(--cy-c),.50), rgba(var(--cy-b),.18) 50%, transparent 72%),
    linear-gradient(168deg, #2a1230 0%, #140a1b 58%, #07040c 100%);
  box-shadow: inset 0 1px 3px rgba(255,255,255,.42), inset 0 -10px 20px -8px rgba(0,0,0,.9),
    0 0 36px -10px rgba(var(--cy-c),1), 0 14px 24px -16px rgba(0,0,0,.98);
  animation: hc-orb-breathe 3.4s ease-in-out infinite; }
.tile.hot .orb::before { opacity: 1;
  background: conic-gradient(from 205deg, rgba(var(--cy-c),1), rgba(255,214,244,.3) 14%,
    rgba(var(--cy-b),.95) 46%, rgba(var(--cy-c),1) 72%, rgba(var(--cy-a),.85) 88%, rgba(255,214,244,.24) 96%);
  filter: drop-shadow(0 0 8px rgba(var(--cy-c),.95)); }
.tile.hot .ic { color: #ffe6fa; }
.tile.hot .lbl { color: #ffd9f3; text-shadow: 0 0 10px rgba(var(--cy-c),.55); }
@keyframes hc-orb-breathe {
  0%, 100% { box-shadow: inset 0 1px 3px rgba(255,255,255,.4), inset 0 -10px 20px -8px rgba(0,0,0,.9),
    0 0 26px -12px rgba(var(--cy-c),.9), 0 14px 24px -16px rgba(0,0,0,.98); }
  50% { box-shadow: inset 0 1px 3px rgba(255,255,255,.46), inset 0 -10px 20px -8px rgba(0,0,0,.9),
    0 0 42px -8px rgba(var(--cy-c),1), 0 14px 24px -16px rgba(0,0,0,.98); }
}
/* 已锁定/已启动：霓虹绿（赛博三色里的第三色），和洋红区分开 */
.tile.on .orb { border-color: rgba(var(--cy-ok),.5);
  background:
    radial-gradient(120% 92% at 34% 16%, rgba(255,255,255,.55) 0%, rgba(255,255,255,.10) 32%, rgba(255,255,255,0) 54%),
    radial-gradient(132% 130% at 50% 118%, rgba(var(--cy-ok),.36), rgba(38,190,255,.10) 52%, transparent 72%),
    linear-gradient(168deg, #102a24 0%, #081712 58%, #040a07 100%);
  box-shadow: inset 0 1px 3px rgba(255,255,255,.4), inset 0 -10px 20px -8px rgba(0,0,0,.9),
    0 0 32px -12px rgba(var(--cy-ok),.95), 0 14px 24px -16px rgba(0,0,0,.98); }
.tile.on .orb::before { opacity: 1;
  background: conic-gradient(from 205deg, rgba(var(--cy-ok),1), rgba(226,255,244,.25) 16%,
    rgba(var(--cy-a),.8) 50%, rgba(var(--cy-ok),1) 78%, rgba(226,255,244,.2) 94%);
  filter: drop-shadow(0 0 6px rgba(var(--cy-ok),.8)); }
.tile.on .ic { color: #e9fff4; }
.tile.on .lbl { color: #c8ffe2; }
.tile.off { opacity: .42; }
.hring { position: absolute; inset: -8%; width: 116%; height: 116%; opacity: 0; pointer-events: none; }
.hring circle { fill: none; stroke: var(--hc-accent); stroke-width: 3.2; stroke-linecap: round;
  stroke-dasharray: 295.2; stroke-dashoffset: 295.2; }
.tile.pressing .hring, .tile.armed .hring { opacity: 1; }
.tile.pressing .hring circle { stroke-dashoffset: 0; transition: stroke-dashoffset var(--hc-holdms) linear; }
.tile.armed .hring circle { stroke-dashoffset: 0; }
.tile.armed .orb { border-color: rgba(var(--hc-a,55,214,232),.7);
  box-shadow: 0 0 26px -4px rgba(var(--hc-a,55,214,232),.85), inset 0 0 18px -6px rgba(var(--hc-a,55,214,232),.6); }
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
.pill.pressing { color: var(--hc-accent); border-color: rgba(var(--hc-a,55,214,232),.5); }
.pill.armed { color: var(--hc-accent); border-color: rgba(var(--hc-a,55,214,232),.7); background: rgba(var(--hc-a,55,214,232),.14); }
.pill .holdbar { position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; background: var(--hc-accent);
  transform: scaleX(0); transform-origin: left; opacity: 0; }
.pill.pressing .holdbar { opacity: 1; transform: scaleX(1); transition: opacity .12s, transform var(--hc-holdms) linear; }
.pill.pending::after { content: ""; position: absolute; top: 6px; right: 8px; width: 5px; height: 5px;
  border-radius: 50%; background: var(--hc-accent); animation: hc-pulse 1.4s ease-in-out infinite; }

/* 能耗：双环形仪表 + 中间量纲图标（参考图同构） */
.energy { display: grid; grid-template-columns: 1fr 1px 1fr; align-items: center; column-gap: 14px; padding: 2px 2px 0; }
.gauge { position: relative; width: 100%; max-width: 132px; aspect-ratio: 1; margin: 0 auto; overflow: visible;
  container-type: inline-size; }
.gauge > svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.gt { fill: none; stroke: rgba(255,255,255,.07); stroke-width: 6; }
.gp { fill: none; stroke: var(--hc-accent); stroke-width: 6; stroke-linecap: round;
  filter: drop-shadow(0 0 8px rgba(var(--hc-a,55,214,232),.65)); }
.gv { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 2.4cqw; padding: 0 6cqw; box-sizing: border-box; }
.gl { display: inline-flex; align-items: center; gap: 3.6cqw; font-size: clamp(9px, 8.4cqw, 15px); font-weight: 650; letter-spacing: .1em;
  color: rgba(160,182,206,.85); text-transform: uppercase; }
.gl .ic { width: clamp(11px, 9.6cqw, 17px); height: clamp(11px, 9.6cqw, 17px); opacity: .85; }
.gn { display: flex; flex-direction: column; align-items: center; gap: .8cqw; line-height: 1; max-width: 100%; }
.gn b { font-size: clamp(18px, 26cqw, 44px); font-weight: 680; letter-spacing: -.02em; color: #f3f8ff; white-space: nowrap;
  text-shadow: 0 0 22px rgba(var(--hc-a,55,214,232),.16); }
.gn i { font-size: clamp(9px, 8cqw, 14px); font-style: normal; font-weight: 600; color: rgba(150,172,196,.9); letter-spacing: .06em; }
.egdiv { width: 1px; height: 62%; align-self: center;
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
  font: 650 11px/1 inherit; cursor: pointer; border: 1px solid rgba(var(--hc-a,55,214,232),.3);
  background: rgba(var(--hc-a,55,214,232),.1); color: var(--hc-accent); }
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
  filter: drop-shadow(0 0 3px rgba(var(--hc-a,55,214,232),.55)); }
.orbit.prog .hring2 circle, .orbit.armed .hring2 circle { opacity: 1; }
.orbit.armed .hring2 circle { stroke: #dffbff; filter: drop-shadow(0 0 7px rgba(var(--hc-a,55,214,232),.85)); }
.toast { position: absolute; right: 0; left: auto; bottom: calc(100% + 6px); z-index: 6;
  pointer-events: none; max-width: 100%;
  box-shadow: 0 14px 30px -16px rgba(0,0,0,.95);
  display: flex; align-items: center; gap: 7px; padding: 7px 13px; border-radius: 999px; white-space: nowrap;
  font-size: 11.5px; line-height: 1.4; color: #d5f8ff;
  background: linear-gradient(180deg, rgba(16,32,48,.97), rgba(9,20,32,.97));
  border: 1px solid rgba(var(--hc-a,55,214,232),.28);
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


/* 液态玻璃主题：所有承载信息的表面换成高光磨砂玻璃 */
ha-card.theme-glass .loc, ha-card.theme-glass .cap {
  background:
    linear-gradient(118deg, rgba(255,255,255,.26) 0%, rgba(255,255,255,.09) 26%, rgba(255,255,255,0) 46%),
    linear-gradient(158deg, rgba(255,255,255,.12) 0%, rgba(255,255,255,.04) 46%, rgba(255,255,255,.02) 100%);
  border-color: rgba(255,255,255,.42);
  box-shadow: 0 8cqw 20cqw -12cqw rgba(4,8,14,.5), inset 0 1cqw 0 rgba(255,255,255,.7),
    inset 0 -5cqw 12cqw -9cqw rgba(255,255,255,.10), 0 0 14cqw -9cqw rgba(190,200,212,.35);
  backdrop-filter: blur(15cqw) saturate(120%); }
ha-card.theme-glass .loc .lh span, ha-card.theme-glass .loc i, ha-card.theme-glass .cap i { color: rgba(226,240,252,.8); }
ha-card.theme-glass .loc .lr b, ha-card.theme-glass .cap b { color: #f4fbff; }
ha-card.theme-glass .status { background: rgba(255,255,255,.16); border-color: rgba(255,255,255,.36);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.5), 0 8px 18px -14px rgba(0,0,0,.8);
  backdrop-filter: blur(14px) saturate(160%); }
ha-card.theme-glass .status.ok { background: rgba(120,255,196,.16); border-color: rgba(140,255,206,.5); }
ha-card.theme-glass .chip, ha-card.theme-glass .stat, ha-card.theme-glass .substats,
ha-card.theme-glass .pills .pill, ha-card.theme-glass .svc, ha-card.theme-glass .baseline {
  background: linear-gradient(170deg, rgba(255,255,255,.15), rgba(255,255,255,.06));
  border-color: rgba(255,255,255,.30);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.45), 0 10px 22px -18px rgba(0,0,0,.7);
  backdrop-filter: blur(16px) saturate(150%); }
ha-card.theme-glass .alert { backdrop-filter: blur(16px) saturate(150%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 10px 24px -18px rgba(0,0,0,.7); }
ha-card.theme-glass .gauge { filter: drop-shadow(0 10px 22px rgba(0,0,0,.35)); }
/* 俯视图状态层：贴在车图上，位置由 JS 量出车图矩形 */
.covl { position: absolute; pointer-events: none; }
.cedge { position: absolute; inset: 0; pointer-events: none; }
/* 车况聚合卡：每个车门一张（门 + 窗 + 该轮位胎压），全部落在圆环内侧、避开车身。
   尺寸统一用容器查询单位 cqw（1cqw = 卡层宽度的 1%），随车图大小等比缩放。 */
.covl { container-type: size; }
.loc, .cap { position: absolute; box-sizing: border-box; display: flex; flex-direction: column;
  background: linear-gradient(180deg, rgba(24,38,55,.9), rgba(10,17,26,.94));
  border: 1px solid rgba(160,205,230,.16);
  box-shadow: 0 2cqw 5cqw rgba(2,7,12,.5), inset 0 1cqw 0 rgba(255,255,255,.07);
  backdrop-filter: blur(10cqw); font-variant-numeric: tabular-nums;
  transition: background .25s ease, border-color .25s ease, box-shadow .25s ease; }
.loc { width: 52cqw; transform: translate(-50%, -50%); padding: 4cqw 4.2cqw 4.2cqw; border-radius: 8.4cqw;
  gap: 2cqw; }
.loc.lf, .loc.lr { left: calc(7.5% - 26cqw); }
.loc.rf, .loc.rr { left: calc(92.5% + 26cqw); }
.loc.lf, .loc.rf { top: 37%; }
.loc.lr, .loc.rr { top: 63%; }
.loc .lh { display: flex; align-items: center; justify-content: space-between; }
.loc .lh span { font-size: 4.5cqw; line-height: 1; color: #93a8bd; letter-spacing: .09em; }
.loc .lh .lk { font-style: normal; width: 5.2cqw; height: 5.2cqw; color: #6d8298; opacity: .85; }
.loc .lh .lk .ic { width: 100%; height: 100%; display: block; }
.loc .lh .lk.on { color: #7ee0b3; opacity: 1; }
.loc .lr { display: flex; align-items: center; justify-content: center; gap: 2.4cqw; line-height: 1; }
.loc .lr .ri { flex: 0 0 7.4cqw; height: 7.4cqw; display: grid; place-items: center; color: #8fd6ea; }
.loc .lr .ri .ic { width: 100%; height: 100%; display: block; }
.loc .lr b { font-size: 5.9cqw; font-weight: 620; color: #dbe7f5; letter-spacing: .01em; white-space: nowrap; }
.loc .lr.tire b { font-size: 6.6cqw; }
.loc .lr.tire b s { text-decoration: none; font-size: 4.4cqw; font-weight: 500; color: #7d90a6; margin-left: 1.4cqw; }
.loc .lr.open b { color: #ffcf90; }
.loc .lr.open .ri { color: #ffcf90; }
.loc .lr.warn b, .loc .lr.warn b s { color: var(--hc-warn); }
.loc .lr.warn .ri { color: var(--hc-warn); }
.loc .lr.bad b { color: #ffc8c2; }
.loc.open { border-color: rgba(255,196,107,.5); background: linear-gradient(180deg, rgba(56,32,10,.9), rgba(28,17,7,.94));
  box-shadow: 0 2cqw 5cqw rgba(2,7,12,.5), 0 0 4cqw rgba(255,196,107,.14); }
.loc.bad { border-color: rgba(255,145,130,.5); background: linear-gradient(180deg, rgba(58,18,18,.9), rgba(30,10,10,.94)); }
/* 前后盖小卡：车头/车尾正上方与正下方，仍落在圆环内侧 */
.cap { left: 50%; width: 44cqw; flex-direction: row; align-items: center; justify-content: center;
  gap: 2.2cqw; padding: 2.4cqw 3.4cqw; border-radius: 5.6cqw; }
.cap.hood, .cap.trunk { transform: translate(-50%, 0); }
.cap .cx { display: flex; flex-direction: column; align-items: center; gap: 1cqw; min-width: 0; text-align: center; }
.cap .ri { flex: 0 0 5.4cqw; height: 5.4cqw; display: grid; place-items: center; color: #86c9de; }
.cap .ri .ic { width: 100%; height: 100%; display: block; }
.cap b { font-size: 5.3cqw; font-weight: 620; color: #dbe7f5; line-height: 1; white-space: nowrap; }
.cap i { font-style: normal; font-size: 4cqw; color: #7d90a6; line-height: 1; letter-spacing: .05em; }
.cap.open { border-color: rgba(255,196,107,.5); background: linear-gradient(180deg, rgba(56,32,10,.9), rgba(28,17,7,.94)); }
.cap.open b, .cap.open .ri { color: #ffcf90; }
.cap.bad { border-color: rgba(255,145,130,.5); }

/* ---- 面板模式：1440×900 设计稿等比缩放，整页装下不滚动 ---- */

/* 窄面板（手机 / 小屏全屏视图）：缩纵向节奏，目标一屏放下全部信息 */
ha-card.panel:not(.fit) .wrap { padding: 10px 12px 8px; gap: 6px; }
ha-card.panel:not(.fit) .head { gap: 2px; }
ha-card.panel:not(.fit) .title { font-size: 21px; }
ha-card.panel:not(.fit) h1 { font-size: 21px; }
ha-card.panel:not(.fit) .plate { font-size: 10px; letter-spacing: .12em; }
ha-card.panel:not(.fit) .sub { font-size: 10px; }
ha-card.panel:not(.fit) .hero { height: 100%; min-height: 178px; --r: 96px; }
ha-card.panel:not(.fit) .carimg { max-height: 74%; max-width: 56%; }
ha-card.panel:not(.fit) .gauge { max-width: 86px; }
/* 窄面板：车图略收窄，保证左右两列聚合卡与圆环之间留白 */
ha-card.panel:not(.fit) .hero { --r: 72px; }
ha-card.panel:not(.fit) .energy { column-gap: 6px; }
ha-card.panel:not(.fit) .orb { width: 48px; height: 48px; }
ha-card.panel:not(.fit) .tile .ic { width: 19px; height: 19px; }
ha-card.panel:not(.fit) .tile { gap: 7px; }
ha-card.panel:not(.fit) .tile .lbl { font-size: 10px; letter-spacing: .04em; }
ha-card.panel:not(.fit) .pills { margin-top: 2px; gap: 6px; }
ha-card.panel:not(.fit) .pill { height: 26px; font-size: 10.5px; }
ha-card.panel:not(.fit) .substats { margin-top: 4px; gap: 6px; }
ha-card.panel:not(.fit) .substats .sstat { padding: 4px 4px 3px; }
ha-card.panel:not(.fit) .substats .sstat b { font-size: 12px; }
ha-card.panel:not(.fit) .alert { padding: 7px 9px; font-size: 11px; }
ha-card.panel:not(.fit) .svc, ha-card.panel:not(.fit) .loc { font-size: 11px; }
ha-card.panel:not(.fit) .svc summary { padding: 7px 9px; }
ha-card.panel:not(.fit) .baseline.solo { padding: 3px 8px; font-size: 10px; }

:host(.panel.gskin) { background: transparent; }
:host(.panel) { position: relative; overflow: hidden;
  background: radial-gradient(90% 60% at 50% 0%, rgba(var(--hc-a,55,214,232),.10), transparent 62%),
    linear-gradient(170deg, #101b29 0%, #0a1119 60%, #070c13 100%); }
ha-card.panel { box-sizing: border-box; width: 100%; height: 100%; margin: 0; }
/* 选择器缩略卡：照真机卡整体版式缩小（竖版小卡），车牌/位置/数值全是假数据 */
ha-card.preview { height: 660px; overflow: hidden; }
ha-card.preview .wrap {
  padding: 13px 14px 11px; height: 100%; box-sizing: border-box;
  display: flex; flex-direction: column; gap: 9px;
  container-type: inline-size; pointer-events: none;
}
.pv-top { display: flex; align-items: center; gap: 8px; }
.pv-top h1 { margin: 0; font-size: 17px; font-weight: 700; letter-spacing: .01em; }
.pv-top .status { margin-left: auto; flex: 0 0 auto; height: auto; padding: 3px 9px; font-size: 9.5px; gap: 4px; line-height: 1.5; }
.pv-top .status .dot { width: 5px; height: 5px; }
.pv-plate { font-size: 9.5px; letter-spacing: .10em; color: rgba(206, 228, 242, .62); margin-top: -3px; }
.pv-hero { position: relative; flex: 1 1 auto; min-height: 168px; display: flex; align-items: center; justify-content: center; }
.pv-ring {
  position: absolute; width: 172px; height: 172px; border-radius: 50%;
  border: 1px solid rgba(64, 224, 255, .16);
  box-shadow: inset 0 0 26px -10px rgba(64, 224, 255, .38), 0 0 20px -9px rgba(64, 224, 255, .26);
}
.pv-nd { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: rgba(96, 236, 255, .85); box-shadow: 0 0 6px rgba(96, 236, 255, .8); }
.pv-nd.n1 { left: 50%; top: -2px; transform: translateX(-50%); }
.pv-nd.n2 { left: 50%; bottom: -2px; transform: translateX(-50%); }
.pv-nd.n3 { left: -2px; top: 50%; transform: translateY(-50%); }
.pv-nd.n4 { right: -2px; top: 50%; transform: translateY(-50%); }
.pv-carimg { position: relative; z-index: 1; width: 128px; height: 150px; object-fit: contain; }
.pv-gauges { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-evenly; gap: 4px; }
.pv-gsep { flex: 0 0 auto; display: inline-flex; color: rgba(150, 196, 220, .38); }
.pv-gsep svg { width: 15px; height: 15px; }
ha-card.preview .gauge { max-width: 92px; }
ha-card.preview .gn b { font-size: 21px; }
ha-card.preview .gl { font-size: 9px; }
.pv-chips { flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 4px; }
.pv-chips span { display: inline-flex; align-items: baseline; gap: 3px; font-size: 8.5px; color: rgba(206, 228, 242, .42); white-space: nowrap; }
.pv-chips span + span { padding-left: 2px; }
.pv-chips span b { font-size: 10.5px; color: rgba(226, 240, 250, .82); }
.pv-chips span em { font-style: normal; font-size: 8px; opacity: .6; }
.pv-acts { flex: 0 0 auto; display: flex; justify-content: space-between; gap: 4px; }
.pv-act { flex: 1 1 0; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.pv-act b {
  display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%;
  background: radial-gradient(120% 120% at 50% 0%, rgba(255, 255, 255, .10), rgba(255, 255, 255, .03));
  border: 1px solid rgba(255, 255, 255, .10); color: rgba(214, 234, 246, .82);
}
.pv-act b svg { width: 14px; height: 14px; }
.pv-act em { font-style: normal; font-size: 8.5px; color: rgba(206, 228, 242, .5); white-space: nowrap; }
.pv-act.on b { color: #5ef0b8; border-color: rgba(94, 240, 184, .55); box-shadow: 0 0 12px -4px rgba(94, 240, 184, .55), inset 0 0 14px -8px rgba(94, 240, 184, .8); }
.pv-seek { flex: 0 0 auto; display: flex; gap: 6px; }
.pv-seek span {
  flex: 1 1 0; display: inline-flex; align-items: center; justify-content: center; gap: 5px; white-space: nowrap;
  padding: 6px 8px; border-radius: 9px; font-size: 9px; color: rgba(214, 234, 246, .62);
  background: rgba(255, 255, 255, .035); border: 1px solid rgba(255, 255, 255, .07);
}
.pv-seek svg { width: 12px; height: 12px; opacity: .75; }
.pv-closed, .pv-svc, .pv-loc {
  flex: 0 0 auto; display: inline-flex; align-items: center; gap: 6px; padding: 5px 9px; border-radius: 9px;
  font-size: 9px; color: rgba(206, 228, 242, .5); white-space: nowrap;
  background: rgba(255, 255, 255, .028); border: 1px solid rgba(255, 255, 255, .06);
}
.pv-closed, .pv-loc { align-self: flex-start; }
.pv-svc { justify-content: space-between; }
.pv-closed svg, .pv-svc svg, .pv-loc svg { width: 12px; height: 12px; opacity: .7; }
.pv-svc svg:last-child { opacity: .5; }
.pv-tires {
  flex: 0 0 auto; margin-top: auto; display: flex; align-items: center; gap: 5px; padding: 7px 8px; border-radius: 9px;
  background: rgba(255, 255, 255, .03); border: 1px solid rgba(255, 255, 255, .06);
}
.pv-tvec { display: inline-flex; align-items: baseline; gap: 1px; font-size: 7.5px; color: rgba(206, 228, 242, .45); flex: 0 0 auto; }
.pv-tvec svg { width: 11px; height: 11px; opacity: .7; align-self: center; margin-right: 1px; }
.pv-tvec b { font-size: 10px; color: rgba(226, 240, 250, .8); }
.pv-tvec.warn b { color: #ffd479; }
.pv-tvec.warn svg { color: #ffd479; opacity: .9; }
.pv-sync { display: inline-flex; align-items: center; gap: 3px; flex: 0 0 auto; font-size: 8.5px; color: rgba(206, 228, 242, .45); white-space: nowrap; }
.pv-sync svg { width: 11px; height: 11px; opacity: .65; }
.pv-tires .pv-sync { margin-left: auto; }
/* 超窄格子（<285px）去掉每格的 kPa 后缀，保证底部条一行装下 */
@container (max-width: 285px) {
  .pv-tvec em { display: none; }
  .pv-tvec b { font-size: 9.5px; }
  .pv-tires { gap: 4px; }
}

/* sections 视图小卡片：整卡缩进栅格单元，不溢出、不压住编辑按钮 */
:host(.gridcard) { position: relative; overflow: hidden; max-width: none; margin: 0; }
ha-card.gfit {
  position: absolute; left: 0; top: 0; box-sizing: border-box;
  transform: scale(var(--gscale, 1)); transform-origin: 0 0;
}
ha-card.gfit .wrap { height: 100%; box-sizing: border-box; overflow: hidden; }

/* 宽格子里的双栏版式（与面板同一套左右分栏） */
ha-card.gfit.gtwo .blocks { display: flex; flex-direction: row; align-items: stretch; gap: 26px; }
ha-card.gfit.gtwo .b-hero-col { display: flex; flex: 1.02 1 0; min-width: 0; }
ha-card.gfit.gtwo .b-hero-col .b-hero { flex: 1 1 auto; justify-content: center; }
ha-card.gfit.gtwo .b-side { display: flex; flex-direction: column; flex: .98 1 0; min-width: 0; justify-content: flex-start; gap: 16px; }
ha-card.gfit.gtwo .b-side > .b-energy { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; justify-content: center; }
ha-card.gfit.gtwo .b-side > .b-energy > .energy { width: 100%; }
ha-card.gfit.gtwo .b-side > .b-meta,
ha-card.gfit.gtwo .b-side > .b-alerts,
ha-card.gfit.gtwo .b-side > .b-actions { flex: 0 0 auto; }
ha-card.gfit.gtwo .gauge { max-width: 132px; }

/* 面板模式：1440×900 设计稿居中并按 --fit 等比缩放 */
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
  justify-content: flex-start; gap: 16px; }
/* 右栏纵向铺满：仪表吃掉多余高度并居中，副指标/告警/按钮组自然下移贴底，底部不再留大片空白 */
ha-card.panel.fit .b-side > .b-energy { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; justify-content: center; }
ha-card.panel.fit .b-side > .b-energy > .energy { width: 100%; }
ha-card.panel.fit .b-side > .b-meta,
ha-card.panel.fit .b-side > .b-alerts,
ha-card.panel.fit .b-side > .b-actions { flex: 0 0 auto; }
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


/* 引擎启动后的灯光特效：前灯从车头灯位向前射出白色切光，光锥末端在地面铺一片落光；
   尾灯在车后铺一片红光。灯位依据官方车图实测：前灯 x 29.9%/70.2%、y 10.6%；尾灯带 x 23.6%-76.4%、y 70%-77% */
.beam { position: absolute; width: 27cqw; height: 34cqw; pointer-events: none; opacity: 0;
  transform: translate(-50%, -100%); mix-blend-mode: screen; filter: blur(2.4px);
  /* 顶边齐平 = 投影切光线，横向自然衰减 */
  clip-path: polygon(4% 100%, 96% 100%, 100% 0, 0 0);
  background: radial-gradient(58% 98% at 50% 100%, rgba(255,255,255,1) 0%,
    rgba(238,251,255,.66) 30%, rgba(210,241,255,.30) 58%, rgba(194,232,255,.10) 78%, transparent 92%); }
.beam::after { content: ""; position: absolute; left: 50%; bottom: 0; width: 60%; height: 88%;
  transform: translateX(-50%);
  background: radial-gradient(48% 92% at 50% 100%, rgba(255,255,255,1) 0%, rgba(250,255,255,.72) 30%,
    rgba(232,250,255,.28) 62%, transparent 88%); }
.beam.lb { left: 29.9%; top: 10.6%; transform: translate(-50%, -100%) rotate(-5deg); transform-origin: 50% 100%; }
.beam.rb { left: 70.2%; top: 10.6%; transform: translate(-50%, -100%) rotate(5deg); transform-origin: 50% 100%; }
/* 落在地面的光：椭圆的漫反射光斑，压在光锥末端 */
.gpool { position: absolute; left: 50%; top: calc(10.6% - var(--beamh, 0px) * 0.82); width: 112cqw; height: 26cqw;
  pointer-events: none; opacity: 0; transform: translate(-50%, -50%); mix-blend-mode: screen; filter: blur(6px);
  background: radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,1) 0%, rgba(236,250,255,.62) 38%,
    rgba(204,238,255,.26) 66%, transparent 86%); }
/* 尾灯在地面的红光 */
.tailbar { position: absolute; left: 50%; top: 73.4%; width: 55cqw; height: 3.6cqw; pointer-events: none;
  opacity: 0; transform: translate(-50%, -50%); mix-blend-mode: screen; border-radius: 999px;
  background: linear-gradient(90deg, rgba(255,64,44,.32), rgba(255,132,104,1) 18%, rgba(255,86,62,1) 50%,
    rgba(255,132,104,1) 82%, rgba(255,64,44,.32));
  box-shadow: 0 0 3.4cqw 1.2cqw rgba(255,74,50,.66), 0 0 11cqw 3cqw rgba(255,44,32,.34); }
.tailglow { position: absolute; left: 50%; top: 87%; width: 108cqw; height: 32cqw; pointer-events: none;
  opacity: 0; transform: translate(-50%, -50%); mix-blend-mode: screen; filter: blur(4px);
  background: radial-gradient(50% 50% at 50% 50%, rgba(255,74,52,.86), rgba(255,36,26,.42) 48%, transparent 78%); }
.hero.run .beam, .hero.run .gpool, .hero.run .tailbar, .hero.run .tailglow { animation: hc-lamp 2.6s ease-in-out infinite; }
.hero.run .beam.rb { animation-delay: .16s; }
@keyframes hc-lamp {
  0%, 100% { opacity: .5; }
  45% { opacity: 1; }
}
.hero.run .halo { background: radial-gradient(46% 52% at 50% 50%, rgba(45,255,170,.22), rgba(45,255,170,.07) 46%, transparent 72%); }
.orbit.run { border-color: rgba(76,255,178,.55); animation: hc-breathe 2.6s ease-in-out infinite; box-shadow: inset 0 0 30px -12px rgba(52,255,168,.45); }
.orbit.run.o2 { border-color: rgba(76,255,178,.26); animation-delay: .7s; }
.hero.run .ground { background: radial-gradient(50% 50% at 50% 50%, rgba(48,255,166,.42), rgba(48,255,166,.10) 55%, transparent 74%);
  animation: hc-ground 2.6s ease-in-out infinite; }
.covl.run::after { content: ""; position: absolute; left: 14%; right: 14%; bottom: 1%; height: 22%; border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 50%, rgba(48,255,166,.40), transparent 72%); filter: blur(8px);
  animation: hc-ground 2.6s ease-in-out infinite; pointer-events: none; }
@keyframes hc-breathe {
  0%, 100% { box-shadow: inset 0 0 26px -12px rgba(52,255,168,.35); border-color: rgba(76,255,178,.42); }
  50% { box-shadow: inset 0 0 64px -8px rgba(96,255,196,.95); border-color: rgba(150,255,214,.9); }
}
@keyframes hc-ground { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
.enp { position: absolute; left: 0; top: 0; transform: translate(-50%, -50%); z-index: 3;
  display: flex; flex-direction: column; gap: 3px; padding: 6px 13px 7px 10px; border-radius: 13px;
  background: rgba(9,18,26,.84); border: 1px solid rgba(140,170,190,.22); color: #a9b6bf;
  letter-spacing: .08em; white-space: nowrap; backdrop-filter: blur(8px);
  box-shadow: 0 4px 14px rgba(0,0,0,.35); pointer-events: none; }
.enp .row { display: flex; align-items: center; gap: 6px; }
.enp span { font-size: 10px; opacity: .7; letter-spacing: .14em; }
.enp b { font-size: 13px; font-weight: 600; color: #cfd9e0; letter-spacing: .04em; line-height: 1.1; }
.enp .ed { width: 6px; height: 6px; border-radius: 50%; background: #6b7a84; flex: 0 0 auto; }
.enp.on { border-color: rgba(76,255,178,.6); box-shadow: 0 0 16px rgba(40,255,160,.28), inset 0 0 12px rgba(40,255,160,.12); }
.enp.on b { color: #8affcb; }
.enp.on .ed { background: #3dffa2; box-shadow: 0 0 8px 2px rgba(61,255,162,.8); animation: hc-engpulse 1.6s ease-in-out infinite; }
@keyframes hc-engpulse { 0%, 100% { opacity: .55; transform: scale(.9); } 50% { opacity: 1; transform: scale(1.15); } }
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
var PREVIEW_CAR = "data:image/webp;base64,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";
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
var GRID_TAGS = /* @__PURE__ */ new Set(["hui-grid-section", "hui-sections-view", "hui-masonry-view"]);
var EDIT_WRAP_TAGS = /* @__PURE__ */ new Set([
  "hui-card-options",
  "hui-card-edit-mode",
  "hui-edit-view",
  "hui-edit-dashboard-view",
  "hui-dialog-edit-card"
]);
var THEMES = {
  midnight: { name: "深海（默认）", accent: "#37d6e8", glow: "55,214,232", top: "#111d2c", mid: "#0b1521", low: "#060b12" },
  aurora: { name: "极光", accent: "#5cf2c0", glow: "92,242,192", top: "#0d2420", mid: "#081713", low: "#040b08" },
  cyber: { name: "赛博紫", accent: "#b98bff", glow: "185,139,255", top: "#1b1230", mid: "#110a1e", low: "#07040e" },
  ember: { name: "熔岩橙", accent: "#ffab5e", glow: "255,171,94", top: "#2a170b", mid: "#180d05", low: "#0a0502" },
  graphite: { name: "石墨灰", accent: "#9fb3c8", glow: "159,179,200", top: "#1d2126", mid: "#12161a", low: "#080a0c" },
  rose: { name: "玫瑰", accent: "#ff8fb6", glow: "255,143,182", top: "#2a1020", mid: "#190812", low: "#0b0408" },
  glass: { name: "液态玻璃（iOS）", accent: "#b8c2ce", glow: "188,198,210", top: "#26304e", mid: "#151b2e", low: "#080b14", glass: true }
};
function themeBg(t) {
  const th = THEMES[t] || THEMES.midnight;
  return `radial-gradient(120% 80% at 50% -10%, rgba(${th.glow},.14), transparent 58%),radial-gradient(70% 50% at 15% 105%, rgba(${th.glow},.10), transparent 70%),linear-gradient(168deg, ${th.top} 0%, ${th.mid} 52%, ${th.low} 100%)`;
}
function hexRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || "").trim());
  if (!m) return "55,214,232";
  const n = parseInt(m[1], 16);
  return `${n >> 16 & 255},${n >> 8 & 255},${n & 255}`;
}
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
  theme: "midnight",
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
    return { columns: 12, rows, min_columns: 6, min_rows: 4, max_rows: 24 };
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
      if (panel) {
        this._pinHostSize();
        this._fitPanel();
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
    this.style.maxWidth = panel ? "none" : "";
    this.style.margin = panel ? "0" : "";
    this.style.height = panel ? "100%" : "";
    this.style.width = panel ? "100%" : "";
    if (!panel) {
      this._fitKey = null;
      this._fitState = void 0;
      if (this._card) {
        this._card.classList.remove("fit", "pfit");
        this._card.style.width = "";
        this._card.style.height = "";
        this._card.style.removeProperty("--fit");
        this._card.style.removeProperty("--pscale");
      }
    }
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
      node = node.parentElement || node.parentNode && node.parentNode.host || null;
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
      node = node.parentElement || node.parentNode && node.parentNode.host || null;
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
    const visW = this.clientWidth;
    const visH = this.clientHeight;
    const w = visW && visW < bw ? visW : bw;
    const h = visH && visH < bh ? visH : bh;
    const wide = w / h >= 1.15;
    const wideChanged = wide !== this._wide;
    this._wide = wide;
    if (wide) {
      const k2 = Math.max(0.12, Math.min(1, w / 1440, h / 900));
      this._card.classList.add("panel", "fit");
      this._card.classList.remove("gfit", "gtwo");
      this._card.style.width = "";
      this._card.style.height = "";
      this._card.style.left = "";
      this._card.style.top = "";
      this._card.style.removeProperty("--gscale");
      this._card.style.setProperty("--fit", String(Math.round(k2 * 1e3) / 1e3));
      this._setRadius(k2);
      if (wideChanged && this._hass) this._render(true);
      return;
    }
    this._card.classList.remove("panel", "fit", "gtwo");
    this._card.classList.add("gfit");
    this._card.style.removeProperty("--fit");
    const k = Math.max(0.12, Math.min(1, w / 390, h / 840));
    this._card.style.setProperty("--gscale", String(Math.round(k * 1e3) / 1e3));
    this._setRadius(k);
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
    const vw = document.documentElement && document.documentElement.clientWidth || window.innerWidth || 0;
    const vh = document.documentElement && document.documentElement.clientHeight || window.innerHeight || 0;
    if (!vw || !vh) return;
    const w = Math.max(320, Math.round(vw - r.left));
    let extra = 0;
    let opts = this.parentElement;
    while (opts && (opts.localName || "").toLowerCase() !== "hui-card-options") {
      opts = opts.parentElement || opts.parentNode && opts.parentNode.host || null;
    }
    if (opts && opts.shadowRoot) {
      const top = r.top;
      for (const ch of opts.shadowRoot.children) {
        const cr = ch.getBoundingClientRect();
        if (cr.height > 20 && cr.height < 200 && cr.top >= top + 40) {
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
    const vh = document.documentElement && document.documentElement.clientHeight || window.innerHeight || 0;
    const h = vh ? Math.min(this.clientHeight, vh) : this.clientHeight;
    if (!w || !h) return;
    const key = `${w}x${h}`;
    if (key === this._fitKey) return;
    this._fitKey = key;
    const fit = w >= 900 && h >= 460 && w >= h * 1.02;
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
      this._setRadius(k2);
      return;
    }
    if (!fit) return;
    const k = Math.min(w / 1440, h / 900);
    this._card.style.setProperty("--fit", String(Math.round(k * 1e3) / 1e3));
    this._setRadius(k);
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
    if (this._config && this.isConnected) this._syncPanel();
  }
  // 祖先链里出现编辑态包装层 → 这是仪表盘编辑，不是选择器缩略卡
  _inEditWrap() {
    let node = this.parentElement;
    let depth = 0;
    while (node && depth < 10) {
      const n = (node.localName || "").toLowerCase();
      if (EDIT_WRAP_TAGS.has(n)) return true;
      node = node.parentElement || node.parentNode && node.parentNode.host || null;
      depth += 1;
    }
    return false;
  }
  _isPreview() {
    if (this._preview) return true;
    if (this._inEditWrap()) return false;
    let dn = this.parentElement;
    for (let d = 0; dn && d < 10; d += 1) {
      if (GRID_TAGS.has((dn.localName || "").toLowerCase())) return false;
      dn = dn.parentElement || dn.parentNode && dn.parentNode.host || null;
    }
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
    root.innerHTML = `<style>${STYLES}</style><ha-card><div class="skin"></div><div class="wrap"></div></ha-card>`;
    this._wrap = root.querySelector(".wrap");
    this._card = root.querySelector("ha-card");
    this._built = true;
    this._bind();
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
    parts.push(JSON.stringify([this._config.modules, this._config.confirm, this._config.layout, this._config.title]));
    return parts.join("|");
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
    this._prunePending(data);
    const twoCol = this._card.classList.contains("fit") || this._card.classList.contains("gtwo");
    this._wrap.innerHTML = this._body(data, twoCol);
    this._placeOverlay();
    cancelAnimationFrame(this._pt1);
    this._pt1 = requestAnimationFrame(() => {
      this._placeOverlay();
      this._pt2 = requestAnimationFrame(() => this._placeOverlay());
    });
    clearTimeout(this._pt3);
    this._pt3 = setTimeout(() => this._placeOverlay(), 420);
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
      range: "486"
    };
    const acts = [
      { ic: "unlock", lb: t.unlock || "开锁", on: true },
      { ic: "trunk", lb: en ? "Trunk" : "后备箱" },
      { ic: "power", lb: t.engine || "远程启动" },
      { ic: "megaphone", lb: t.honk || "鸣笛寻车" }
    ];
    const tires = ["L", "R", "L", "R"].map((_, i) => `<span class="pv-tvec${i === 3 ? " warn" : ""}">${icon("tire")}<b>${esc(fake.tire[i])}</b><em>kPa</em></span>`).join("");
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
    const plateTxt = cfg.show_plate && plate ? cfg.privacy ? maskPlate(plate) : plate : "";
    const head = `<div class="head"><div class="ttl"><h1>${FORD_LOGO}${esc(title)}</h1>` + (plateTxt ? `<span class="plate">${esc(plateTxt)}</span>` : "") + `</div><span class="status ${status.cls}"><span class="dot"></span>${esc(status.label)}</span></div>`;
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
            this._carOverlay(data, t, mods, running),
            running
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
  _hero(imgUrl, fbUrl, overlay, running) {
    const inner = typeof overlay === "string" ? overlay : overlay && overlay.inner || "";
    const edge = overlay && overlay.edge || "";
    return `<div class="hero${running ? " run" : ""}"><div class="halo"></div>
      <span class="orbit${running ? " run" : ""}"><svg class="hring2" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="49"/></svg><i class="node n1"></i><i class="node n2"></i><i class="node n3"></i><i class="node n4"></i></span>
      <span class="orbit o2"></span>
      ${imgUrl ? `<img class="carimg" src="${esc(imgUrl)}"${fbUrl ? ` data-fb="${esc(fbUrl)}"` : ""} alt="">` : `<div class="carph">${icon("car")}</div>`}
      <div class="ground"></div><div class="covl">${inner}</div>${edge ? `<div class="cedge">${edge}</div>` : ""}</div>`;
  }
  // 俯视图状态层：每个车门一张聚合卡（门 + 窗 + 该轮位胎压），前后盖各一张小卡，全部落在圆环内侧
  _carOverlay(data, t, mods, running) {
    const zh = !isEn(this._hass);
    const doors = mods.includes("doors");
    const lockedRaw = text(data.get("lock") || {});
    const locked = /锁|lock/i.test(lockedRaw) && !/未|解|unlock/i.test(lockedRaw);
    const tireLine = (slot, sslot, unitFallback) => {
      const st = data.get(slot);
      if (!st) return null;
      const v = num(st);
      const flag = normTire(data.get(sslot)) === "warn";
      const outOfRange = v != null && (v < 190 || v > 300);
      const warn = outOfRange || flag && v == null;
      const unit = attrs(st, "unit_of_measurement") || unitFallback;
      const txt = v == null ? "—" : fmtNum(v);
      const html = `<div class="lr tire${warn ? " warn" : ""}"><span class="ri">${icon("tireo")}</span><b>${txt}<s>${esc(unit)}</s></b></div>`;
      return { slot, html, warn };
    };
    const out = [];
    if (running) {
      out.push(`<i class="beam lb"></i><i class="beam rb"></i><i class="gpool"></i><i class="tailbar"></i><i class="tailglow"></i>`);
    }
    if (data.get("sw_engine") || data.get("remote_start")) {
      out.push(`<div class="enp${running ? " on" : ""}"><div class="row"><i class="ed"></i><span>${zh ? "引擎" : "ENGINE"}</span></div><b>${running ? zh ? "已启动" : "Running" : zh ? "已熄火" : "Off"}</b></div>`);
    }
    const quads = [
      ["lf", zh ? "主驾" : "Driver", ["door_fl", "win_fl"], "tp_lf", "tps_lf"],
      ["rf", zh ? "副驾" : "Front", ["door_fr", "win_fr"], "tp_rf", "tps_rf"],
      ["lr", zh ? "左后" : "Rear L", ["door_rl", "win_rl"], "tp_lr", "tps_lr"],
      ["rr", zh ? "右后" : "Rear R", ["door_rr", "win_rr"], "tp_rr", "tps_rr"]
    ];
    for (const [cls, label, dSlots, tSlot, tsSlot] of quads) {
      const lines = [];
      let bad = false;
      if (doors) {
        for (const [ic, slot] of [["cardoor", dSlots[0]], ["carwin", dSlots[1]]]) {
          const st = data.get(slot);
          if (!st) continue;
          const b = isBad(st);
          if (b) bad = true;
          const open = !b && normOpen(st) === "open";
          lines.push(
            `<div class="lr${b ? " bad" : open ? " open" : ""}"><span class="ri">${icon(ic)}</span><b>${b ? zh ? "不可用" : "N/A" : open ? zh ? "已打开" : "Open" : zh ? "已关闭" : "Closed"}</b></div>`
          );
        }
      }
      const tire = tireLine(tSlot, tsSlot, "kPa");
      if (tire) lines.push(tire.html);
      if (!lines.length) continue;
      out.push(
        `<div class="loc ${cls}${bad ? " bad" : ""}" data-more="${esc(data.id(dSlots[0] === "door_fl" ? "door_fl" : dSlots[0]))}"><div class="lh"><span>${esc(label)}</span><i class="lk${locked ? " on" : ""}">${icon(locked ? "lock" : "unlock")}</i></div>` + lines.join("") + `</div>`
      );
    }
    const cap = (cls, label, slot, ic) => {
      const st = data.get(slot);
      if (!st) return;
      const b = isBad(st);
      const open = !b && normOpen(st) === "open";
      out.push(
        `<div class="cap ${cls}${b ? " bad" : open ? " open" : ""}" data-more="${esc(data.id(slot))}" title="${esc(label)}"><span class="ri">${icon(ic)}</span><span class="cx"><b>${b ? zh ? "不可用" : "N/A" : open ? zh ? "已打开" : "Open" : zh ? "已关闭" : "Closed"}</b><i>${esc(label)}</i></span></div>`
      );
    };
    if (doors) {
      cap("hood", zh ? "引擎盖" : "Hood", "hood", "engine");
      cap("trunk", zh ? "尾门" : "Tailgate", "tailgate", "trunk");
    }
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
    if (!img.offsetWidth) return;
    const hero = this._wrap.querySelector(".hero");
    const orb = this._wrap.querySelector(".orbit:not(.o2)");
    const orb2 = this._wrap.querySelector(".orbit.o2");
    let ratio = 1;
    let ringBotHero = 0;
    if (hero && orb) {
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
    const ih = img.offsetHeight;
    const wantShift = Math.round(ih * 0.043);
    const room = ringBotHero ? ringBotHero - 2 - (img.offsetTop + ih) : wantShift;
    const shift = Math.max(0, Math.min(wantShift, Math.floor(room)));
    img.style.transform = shift ? `translateY(${shift}px)` : "";
    ovl.style.left = `${img.offsetLeft}px`;
    ovl.style.top = `${img.offsetTop + shift}px`;
    ovl.style.width = `${img.offsetWidth}px`;
    ovl.style.height = `${ih}px`;
    const beams = ovl.querySelectorAll(".beam");
    if (beams.length) {
      const lineY = img.offsetTop + shift + ih * 0.106;
      const bh = Math.max(10, Math.min(lineY - 2, ih * 0.3));
      for (const bEl of beams) bEl.style.height = `${bh}px`;
      ovl.style.setProperty("--beamh", `${bh}px`);
    }
    if (hero && orb) {
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
        card.style.top = `${Math.round(bodyT + (bodyB - bodyT) * (front ? 0.34 : 0.66))}px`;
      });
      const enp = this._wrap.querySelector(".enp");
      if (enp) {
        const cx0 = (ringL + ringR) / 2;
        const cy0 = (ringT + ringB) / 2;
        const rr = (ringR - ringL) / 2;
        const kp = Math.max(0.82, Math.min(1.1, rr / 190));
        enp.style.transform = `translate(-50%, -50%) scale(${kp.toFixed(3)})`;
        const w = enp.offsetWidth * kp, h = enp.offsetHeight * kp;
        let ex = cx0 - rr * 0.78;
        let ey = cy0 - rr * 0.78;
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
        ex = Math.max(6 - img.offsetLeft + w / 2, Math.min(hero.clientWidth - 6 - w / 2 - img.offsetLeft, ex));
        ey = Math.max(6 - (img.offsetTop + shift) + h / 2, ey);
        enp.style.left = `${Math.round(ex)}px`;
        enp.style.top = `${Math.round(ey)}px`;
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
  theme: "主题",
  themeHint: "换一套漆面与背光配色，版式不变；下面的强调色会覆盖主题色。",
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
        <label class="f" for="theme">${L.theme}</label>
        <select class="tf" id="theme">
          ${Object.entries(THEMES).map(([v, t]) => `<option value="${v}">${t.name}</option>`).join("")}
        </select>
        <p class="hint" style="margin-top:4px">${L.themeHint}</p>
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
    q("theme").addEventListener("change", (e) => {
      this._config.theme = e.target.value;
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
    q("theme").value = this._config.theme || DEFAULTS.theme;
    q("color").value = /^#[0-9a-f]{6}$/i.test(this._config.accent || "") ? this._config.accent : (THEMES[this._config.theme] || THEMES.midnight).accent;
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
    if (cfg.theme === DEFAULTS.theme) delete cfg.theme;
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
var VERSION = "1.9.3";
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
