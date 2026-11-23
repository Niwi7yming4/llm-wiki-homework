# 02. 骨骼樹狀拓撲與 Pivot 樞軸定律 (Bone Hierarchy & Pivots)

> **所屬知識庫**：ANTI Academy // Blockbench 3D 體素工坊  
> **核心案例**：沙漠哨兵・狐獴 (Suricata suricatta)  
> **關鍵概念**：父子階層繼承、樞軸點（Pivot Point）吸附律、防斷關節原則

---

## 1. 骨骼樹狀結構（Hierarchical Rigging）

在 Blockbench 中，每個幾何體積（Cube）都不應隨意散落在根目錄，而必須掛載在具備物理關節意義的骨骼群組（Group / Bone）下。子骨骼會完全繼承父骨骼的空間旋轉與位移。

狐獴的完整骨骼樹狀拓撲如下：

```
mk_root (原點: 0.0, 0.0, 0.0)
 ├── mk_leg_L (樞軸: 1.6, 4.4, 0.0)
 │    ├── mk_thigh_L
 │    ├── mk_hindfoot_L
 │    └── mk_hclaw_L1, mk_hclaw_L2
 ├── mk_leg_R (樞軸: -1.6, 4.4, 0.0)
 │    ├── mk_thigh_R
 │    ├── mk_hindfoot_R
 │    └── mk_hclaw_R1, mk_hclaw_R2
 ├── mk_tail_01 (樞軸: 0.0, 4.2, -1.8)
 │    └── mk_tail_02 (樞軸: 0.0, 3.8, -4.8)
 │         └── mk_tail_03 (樞軸: 0.0, 3.2, -7.6)
 └── mk_pelvis (樞軸: 0.0, 4.4, 0.0) [核心重心骨]
      ├── mk_pelvis_box
      └── mk_chest (樞軸: 0.0, 8.4, 0.0)
           ├── mk_chest_box
           ├── mk_arm_L (樞軸: 2.1, 12.0, 0.6)
           │    ├── mk_forearm_L
           │    └── mk_claws_L
           ├── mk_arm_R (樞軸: -2.1, 12.0, 0.6)
           │    ├── mk_forearm_R
           │    └── mk_claws_R
           └── mk_neck (樞軸: 0.0, 13.0, 0.2)
                └── mk_head (樞軸: 0.0, 13.8, 0.2)
                     ├── mk_head_box, mk_snout, mk_nose
                     ├── mk_jaw (樞軸: 0.0, 13.6, 1.4)
                     ├── mk_ear_L (樞軸: 2.1, 16.0, -0.6)
                     └── mk_ear_R (樞軸: -2.1, 16.0, -0.6)
```

---

## 2. Pivot 樞軸吸附定律（The Pivot Point Law）

### (1) 為什麼 Pivot 是動畫的靈魂？
樞軸點（Pivot Point）是骨骼旋轉的絕對中心。若樞軸點放錯：
- 狐獴轉頭時，腦袋會脫離脖子漂浮在空中（「斷頭」）。
- 尾巴擺動時，尾巴基部會切穿背脊（「破皮」）。
- 雙腳旋轉時，大腿會脫臼脫離腹腔（「脫骹」）。

### (2) 狐獴各關節 Pivot 的絕對座標定位法則
- **骨盆樞軸（Pelvis Pivot）**：必須精確放置於骨盆頂點與大腿上球節的交匯線（`Y = 4.4, Z = 0.0`）。當狐獴直立躬身或四足趴下時，以骨盆為圓心向前傾斜，後腿才能穩定紮地。
- **胸腔樞軸（Chest Pivot）**：設在 `Y = 8.4`，即腹部與胸部的自然肋下折疊線。胸腔旋轉允許微小的呼吸胸腔起伏（Breathing Squash & Stretch）。
- **頸部與頭部樞軸（Neck/Head Pivot）**：頭部樞軸設在 `Y = 13.8, Z = 0.2`（枕骨大孔位置），模擬脊柱頂端。這使狐獴在做「哨兵抬頭環視」時，頭部能以極小位移完成 60° 的仰角與 90° 的左右甩頭。
- **耳部微樞軸（Ear Pivots）**：耳朵骨骼獨立於頭部骨骼，Pivot 定位在耳朵耳根基底（`Y = 16.0, Z = -0.6`），使得狐獴警戒吠叫時耳朵能往後縮（Airplane ears）。
- **尾巴分段樞軸（Tail Pivots）**：每段尾骨的 Pivot 嚴格設在前一段尾骨的末端幾何接合面，形成連鎖蛇形運動學（FK Chain）。

---

## 3. 防斷關節的幾何容積交疊（Overlap Craft）

在方塊建模中，轉動骨骼時邊緣極易露出空隙。ANTI 體素工坊要求嚴格遵守 **0.2u ~ 0.4u 的交疊容限（Overlap Tolerance）**：
- 例如胸腔底部為 Y=8.2，骨盆頂部為 Y=8.6，兩者在高度上有 0.4u 的體積重疊。
- 當胸腔向前彎曲 15° 時，重疊區域會遮蓋內部空隙，在遊戲引擎中視覺呈現為天衣無縫的連續表皮。

## 來源

- [S2] Blockbench：Pivot 應放在部件與關節相接之處，是骨骼的旋轉中心。
- [S3] Microsoft Learn：動畫依骨骼名稱對應；目標幾何中沒有的骨骼會被忽略。
- [S1] Minecraft Wiki：rotation 的 origin 即旋轉中心。
- 本頁的 Pivot 座標（例如 y = 4.4）是作者模型的實際數值。
