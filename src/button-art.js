// 按钮艺术图标：随单文件 bundle 内联为 data URI，HACS 只安装 ha-car.js 也不会丢图。
import lockArt from "./assets/btn-lock.png";
import unlockArt from "./assets/btn-unlock.png";
import startArt from "./assets/btn-start.png";
import hornArt from "./assets/btn-horn.png";

export const BUTTON_ART = Object.freeze({
  lock: lockArt,
  unlock: unlockArt,
  start: startArt,
  horn: hornArt,
});

// 只替换有专属艺术图的四个内置动作，其他动作继续走线条图标 / 自定义 icon。
export function artForSlot(slot) {
  switch (slot) {
    case "btn_unlock":
      return { src: BUTTON_ART.unlock, wide: false };
    case "btn_lock":
      return { src: BUTTON_ART.lock, wide: false };
    case "sw_engine":
      return { src: BUTTON_ART.start, wide: false };
    case "sw_honk":
      return { src: BUTTON_ART.horn, wide: true };
    default:
      return null;
  }
}
