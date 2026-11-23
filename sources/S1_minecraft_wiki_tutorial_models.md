# S1 · Minecraft Wiki：Tutorial:Models（方塊模型教學）

- URL: https://minecraft.wiki/w/Tutorial:Models
- 抓取日期: 2026-11-23
- 類型: 社群維護的玩家百科（公開頁面）
- 抓取狀態: HTTP 200。頁面未顯示最後編輯日期。前約 40,000 字為原文，後段由模型摘要；本筆記只採用原文段落。

## 摘要（作者改寫，非原文）

- 方塊模型以 JSON 描述，放在 `assets/<命名空間>/models/block` 之下，根欄位包含 parent、textures、elements 等。
- elements 只能是長方體（cuboid），from 與 to 為起點與終點座標，數值範圍 -16 到 32。
- 完整方塊的範例是從 [0,0,0] 到 [16,16,16]，UV 也以 16 為單位換算。
- rotation 有 origin（旋轉中心）、axis、angle（每次 22.5 度，範圍 -45 到 45）與 rescale。
- face 的 uv 可省略，省略時依元素位置自動產生；超出 0 到 16 範圍時行為不一致。
- 頁面指出 UV 以 16 為基準，所以把 16×16 貼圖放大到 32×32 或 64×64，不需要改模型檔。

## 與本專案的對應

- [01 尺度](../wiki/01_scale_and_voxel_anatomy.md)：16 單位格、長方體限制。
- [02 骨骼與 Pivot](../wiki/02_bone_hierarchy_and_pivots.md)：rotation origin 即旋轉中心。
- [03 貼圖](../wiki/03_anti_dirty_texture_and_hue_shift.md)：UV 以 16 為基準。
