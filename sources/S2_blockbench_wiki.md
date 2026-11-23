# S2 · Blockbench 官方文件（Wiki）

- URL: https://www.blockbench.net/wiki/ （索引頁，用來找頁面）
- 使用的頁面:
  - https://www.blockbench.net/wiki/guides/bedrock-modeling （Bedrock 建模與動畫）
  - https://www.blockbench.net/wiki/guides/blockbench-overview-tips （總覽與技巧）
  - https://www.blockbench.net/wiki/guides/export-formats （匯出格式）
  - https://www.blockbench.net/wiki/docs/bbmodel （.bbmodel 格式）
- 抓取日期: 2026-11-23
- 類型: 軟體官方文件（公開頁面）
- 抓取狀態: 以上四頁皆 HTTP 200。https://www.blockbench.net/quickstart 回傳 200 但正文只有導覽列，沒有內容，未採用。

## 摘要（作者改寫，非原文）

- Pivot（樞軸）是骨骼的旋轉中心。文件建議放在部件與關節相接之處，而不是幾何中心或隨意位置。
- 可用 Pivot 工具（快捷鍵 P）或元素面板的 Pivot Point 欄位調整；有一個按鈕可以把樞軸置中到所選項目。
- 在 Bedrock 工作流程中，group 與 bone 實際上差不多；可旋轉的 group 就是 bone。子骨骼跟隨父骨骼，根骨骼可讓整個模型一起動。
- Animate 分頁的 Keyframe 面板有時間碼、插值下拉選單，以及旋轉、位移、縮放的逐軸數值。
- 時間軸提供 Keyframe View 與 Graph Editor，線性關鍵格顯示為菱形，平滑關鍵格顯示為圓形。
- Bedrock 匯出：選擇 Bedrock Model 格式，幾何名稱與骨骼名稱使用 snake_case；動畫 JSON 存到資源包的 animations 資料夾，實體檔再引用它。
- 一般 3D 匯出：OBJ 與 STL 沒有階層與動畫；glTF 與 DAE 兩者都支援。
- 未確認：文件讀到的頁面沒有列出完整的插值選項清單。

## 與本專案的對應

- [02 骨骼與 Pivot](../wiki/02_bone_hierarchy_and_pivots.md)：Pivot 放在關節。
- [05 訓練法](../wiki/05_academy_training_methodology.md)：Animate 面板與 Bedrock 匯出流程。
