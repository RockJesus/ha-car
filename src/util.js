export function esc(value) {
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

export function isBad(state) {
  return !state || state.state === "unavailable" || state.state === "unknown";
}

export function num(state) {
  if (isBad(state)) return null;
  const v = parseFloat(String(state.state).replace(",", "."));
  return Number.isFinite(v) ? v : null;
}

export function text(state) {
  return isBad(state) ? "" : String(state.state);
}

export function attrs(state, key) {
  return state && state.attributes ? state.attributes[key] : undefined;
}

export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

export function fmtNum(v, digits = 0) {
  if (v == null || !Number.isFinite(v)) return "—";
  const opts = { maximumFractionDigits: digits, minimumFractionDigits: 0 };
  try {
    return new Intl.NumberFormat("zh-Hans-CN", opts).format(v);
  } catch {
    return String(Math.round(v * 10 ** digits) / 10 ** digits);
  }
}

export function relTime(iso, lang) {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";
  const diff = Math.max(0, Date.now() - then) / 1000;
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

// 集成默认按界面语言翻译状态值，卡片不能硬编码中文。
export function normLock(state) {
  const s = String(text(state)).toLowerCase();
  if (!s) return "unknown";
  if (s.includes("解锁") || s.includes("unlock")) return "unlocked";
  if (s.includes("锁定") || s.includes("lock") || s.includes("secured")) return "locked";
  return "unknown";
}

export function normOpen(state) {
  const s = String(text(state)).toLowerCase();
  if (!s) return "unknown";
  if (s.includes("开启") || s.includes("打开") || s.includes("open")) return "open";
  if (s.includes("关闭") || s.includes("关好") || s.includes("closed")) return "closed";
  return "unknown";
}

export function normTire(state) {
  const s = String(text(state)).toLowerCase();
  if (!s) return "ok";
  if (s.includes("fault") || s.includes("warn") || s.includes("故障") || s.includes("低") || s.includes("异常")) return "warn";
  return "ok";
}

export function chargingNow(state) {
  if (isBad(state)) return false;
  const attr = state.attributes && state.attributes.evcc_charge_state;
  if (attr === 2 || attr === "2") return true;
  const s = String(state.state).toLowerCase();
  return s.includes("充电中") || s.includes("charging");
}
