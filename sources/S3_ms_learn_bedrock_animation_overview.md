# S3 · Microsoft Learn：Minecraft Bedrock 動畫概觀

- URL: https://learn.microsoft.com/en-us/minecraft/creator/documents/animations/animationsoverview
- 抓取日期: 2026-11-23
- 類型: 官方開發文件（公開頁面）
- 抓取狀態: HTTP 200，無轉址。頁面中繼資料 updated_at 為 2026-06-22，ms.date 為 2025-08-08。
- 備註: 原定的 `animationsreference` 頁面回傳 404，因此改用此頁。

## 摘要（作者改寫，非原文）

- 動畫檔保存的是原始關鍵格資料。階層為：animation（動畫名）→ bone（骨骼名）→ 通道（rotation、position、scale）→ 關鍵格（時間與數值）。
- 關鍵格時間的範例寫成 "0.0"、"0.5"、"1.0"，頁面將其當作秒數使用。
- 關鍵格之間為線性插值；不連續的變化可用 pre 與 post 兩個值表示，數值可以是 Molang 運算式。
- 目標幾何中沒有的骨骼會被忽略，不必每根骨骼都有動畫。
- 變換順序：先平移、再旋轉、最後縮放。旋轉預設以角度表示，依 X、Y、Z 順序套用。
- 每一影格，骨架會先重設為幾何的預設姿勢。
- 名稱必須以字母開頭，只能包含字母、數字、底線與句點，建議全小寫。
- 動畫只負責保存資料；動畫控制器是狀態機，在狀態之間依查詢式切換。
- 本頁沒有說明的部分：animation_length、loop 的實際意義、單位換算。這些不要寫成已確認的事實。

## 與本專案的對應

- [02 骨骼與 Pivot](../wiki/02_bone_hierarchy_and_pivots.md)：骨骼階層，缺少的骨骼會被忽略。
- [04 動畫物理](../wiki/04_animation_physics_and_organic_timing.md)：關鍵格之間的線性插值。
- [05 訓練法](../wiki/05_academy_training_methodology.md)：動畫資料與控制器的分工。
