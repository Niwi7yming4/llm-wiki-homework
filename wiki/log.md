# Wiki 更新紀錄

## 2026-11-23

- **生成前**：先列出五頁大綱，每頁一個主題（見 [index](index.md)）。這份紀錄是事後整理的，沒有另外逐條確認的存檔。
- **ingest S1–S5**：每份來源寫成一份筆記，放在 [sources](../sources/)。
  - S3 原定的 learn.microsoft.com 頁面（animationsreference）回 404，改用同一站的 Animations 概觀頁。
  - S5（Pixel art）只採用原文讀到的段落；模型摘要的段落（技法、抗鋸齒、抖色）未採用。
  - S4 的網址由 `12_basic_...` 轉址到 `Twelve_basic_...`，以轉址後的正式頁為準。
- **補上來源引用**：01–05 各頁加上「來源」段落，標明哪一句對應哪一份來源；作者模型的數值標明不是外部來源。
- **語法修正**：wiki 內的行內數學寫法改為純文字與 Unicode，方便直接以 `.md` 開啟時閱讀。
- **檢查**：`tools/check_project.py` 的執行紀錄存在 `logs/`。修改前為 `check_20261123_235702.txt`（21 PASS / 2 WARN / 10 FAIL）；修改後為 `check_20261123_235826.txt`（29 PASS / 2 WARN / 2 FAIL）。
