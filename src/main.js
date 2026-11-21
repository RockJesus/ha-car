import "./card.js";
import "./editor.js";

const VERSION = "3.8.4";

window.customCards = window.customCards || [];
const _hasCard = window.customCards.some((c) => c && c.type === "ha-car");
if (!_hasCard) window.customCards.push({
  type: "ha-car",
  name: "爱车卡片",
  description: "福特派互联（FordPass CN）/ 林肯之道车辆卡片：车况、四轮胎压、门窗、充电与长按防误触控车。",
  preview: true,
  documentationURL: "https://github.com/RockJesus/ha-car#readme",
  });

// 版本串必须与 package.json / git tag 三处一致，check_bundle.py 会断言。
console.info(
  `%c HA-CAR %c v${VERSION} %c适配福特派互联 / 林肯之道`,
  "background:#37d6e8;color:#08121d;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px",
  "background:#141d2b;color:#e9eff7;padding:2px 6px",
  "background:#0b1220;color:#8496ad;padding:2px 6px;border-radius:0 4px 4px 0",
);
