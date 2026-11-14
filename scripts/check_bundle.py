#!/usr/bin/env python3
"""发布前对单文件产物做确定性断言：无 BOM、纯 ESM、注册串齐全、版本号三处一致。"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BUNDLE = ROOT / "ha-car.js"
CARD = "ha-car"
EDITOR = "ha-car-editor"
COMMON_JS = [r"\brequire\s*\(", r"module\.exports", r"__esModule"]


def main() -> int:
    if not BUNDLE.exists():
        print("FAIL: 缺少产物 ha-car.js，请先 npm run build")
        return 1

    pkg = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
    version = pkg["version"]
    raw = BUNDLE.read_bytes()
    failures = []

    if raw[:3] == b"\xef\xbb\xbf":
        failures.append("产物含 UTF-8 BOM")

    text = raw.decode("utf-8")
    for pat in COMMON_JS:
        if re.search(pat, text):
            failures.append(f"CommonJS 残留：{pat}")
    if not re.search(rf"customElements\.define\(\s*['\"]{CARD}['\"]", text):
        failures.append(f'missing customElements.define("{CARD}")')
    if not re.search(rf"customElements\.define\(\s*['\"]{EDITOR}['\"]", text):
        failures.append(f'missing customElements.define("{EDITOR}")')
    if "customCards" not in text:
        failures.append("missing window.customCards entry")
    if version not in text:
        failures.append(f"版本串 {version} 不在产物里（src/main.js 的 VERSION 未同步？）")

    print(f"checked {BUNDLE.name} ({len(raw)} B), version {version}")
    if failures:
        print("FAIL:")
        for item in failures:
            print(f"  - {item}")
        return 1
    print("PASS: 无 BOM、纯 ESM、注册齐全、版本一致")
    return 0


if __name__ == "__main__":
    sys.exit(main())
