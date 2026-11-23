# LLM Wiki 索引：沙漠狐獴的 3D 體素建模

本 Wiki 以 Minecraft 體素建模（Blockbench）為主題，以「沙漠哨兵・狐獴」為貫穿案例。它是教學簡報的知識來源：簡報的每一頁都對應到這裡的某一篇。

## 收錄的來源（ingest）

| 編號 | 來源 | 網址 | 抓取日期 | 用於 |
|---|---|---|---|---|
| S1 | Minecraft Wiki：Tutorial:Models | https://minecraft.wiki/w/Tutorial:Models | 2026-11-23 | 01、02、03 |
| S2 | Blockbench 官方文件 | https://www.blockbench.net/wiki/ | 2026-11-23 | 02、05 |
| S3 | Microsoft Learn：Bedrock 動畫概觀 | https://learn.microsoft.com/en-us/minecraft/creator/documents/animations/animationsoverview | 2026-11-23 | 02、04、05 |
| S4 | Twelve basic principles of animation（Wikipedia） | https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation | 2026-11-23 | 04 |
| S5 | Pixel art（Wikipedia） | https://en.wikipedia.org/wiki/Pixel_art | 2026-11-23 | 03 |

每份來源的摘要與採用範圍，見 [sources](../sources/)。

## 頁面

- [01 空間尺度與體素解剖](01_scale_and_voxel_anatomy.md)：16 單位格、長方體限制、梨形體態與雙姿態。
- [02 骨骼階層與 Pivot](02_bone_hierarchy_and_pivots.md)：骨骼樹、旋轉中心、交疊容限。
- [03 反髒貼圖與色相偏移](03_anti_dirty_texture_and_hue_shift.md)：逐點放置、限制色數、四階色板。
- [04 關鍵格動力學](04_animation_physics_and_organic_timing.md)：預備動作、擠壓伸展、跟隨、慢入慢出。
- [05 訓練方法](05_academy_training_methodology.md)：工作流程與五階訓練路徑。

## 怎麼建立的

1. 先列出五頁的大綱，每頁一個主題。
2. 抓取並摘要 S1–S5（ingest），每份來源寫成一份筆記，標明網址與抓取日期。
3. 撰寫各頁，每頁至少引用一份來源；作者自己模型的數值會標明不是外部來源。
4. 用 `tools/check_project.py` 檢查引用、連結、語法與字級，結果存在 `logs/`。

更新紀錄見 [log](log.md)。
