# 專案作業成果報告：用 LLM Wiki 製作教學 HTML 簡報

> **專案名稱**：ANTI Academy // Minecraft 3D 體素建模大師班  
> **核心案例**：【沙漠哨兵・狐獴 (Suricata suricatta)】從設計幾何、UV、動畫到職業變體  
> **交付形態**：純前端靜態教學簡報（HTML / CSS / JS）+ LLM Wiki 知識庫（Markdown）  
> **開源安全策略**：完全開源教學網頁與知識庫；**不公開私有 SKILL 提示詞與內部原始 `.bbmodel` 檔案**。  
> **工程規範文件**：附帶 [`AGENT.md`](./AGENT.md)（代理人工程指南）與 [`DESIGN.md`](./DESIGN.md)（UI/UX 設計系統）。

---

## 繳交內容目錄

1. [LLM Wiki 主題與簡短介紹](#一llm-wiki-主題與簡短介紹)
2. [LLM Wiki 成果清單與章節連結](#二llm-wiki-成果清單與章節連結)
3. [教學 HTML 簡報展示與操作說明](#三教學-html-簡報展示與操作說明)
4. [視覺升級：去背動態 GIF 與大空間排版](#四視覺升級去背動態-gif-與大空間排版)
5. [Loop / Graph 流程圖與架構設計](#五loop--graph-流程圖與架構設計)
6. [實際執行結果與檢查紀錄 (Execution & QA Logs)](#六實際執行結果與檢查紀錄-execution--qa-logs)
7. [反思：節點錯誤、檢查左移與 Workflow 演進](#七反思節點錯誤檢查左移與-workflow-演進)

---

## 一、LLM Wiki 主題與簡短介紹

### 1. 主題定調
* **主題名稱**：`Minecraft 3D 體素建模工藝：從設計草圖到生動實體 (以沙漠狐獴為例)`
* **主題簡介**：  
  在 Minecraft 體素建模（Blockbench）領域中，初學者常面臨「比例失真、貼圖髒亂似雜訊、骨骼旋轉斷裂、動畫僵硬如機器人」等四大通病。  
  本專案建立了一個專門針對體素建模與動畫調校的 **LLM Wiki 知識庫**，以生物【沙漠哨兵・狐獴】為核心貫穿案例，深入探討：
  - **16px 空間尺度** 與梨形雙姿態解剖學。
  - **骨骼樹狀拓撲** 與 Pivot 樞軸吸附定律（防斷骨）。
  - **反髒貼圖法（Anti-Dirty-Texture Law）**、1:1 像素簇工藝與四階色相偏移色板。
  - **生物動力學**：重心預備動作、非同步微表情與尾部阻尼物理。
  - **ANTI 學院訓練法**：讀檔預算鐵律（File-Read Budget）與四大職業變體演化（劍客、薩滿、爆破手、守衛）。

---

## 二、LLM Wiki 成果清單與章節連結

知識庫採用「**先討論架構、後精煉生成**」的原則建構，共包含 5 篇高密度、無冗餘的核心技術文檔（位於 `wiki/` 目錄）：

| 序號 | 文件名稱 | 核心知識模組 | 案例展示重點 |
| :---: | :--- | :--- | :--- |
| **01** | [01_scale_and_voxel_anatomy.md](./wiki/01_scale_and_voxel_anatomy.md) | **空間尺度與體素解剖學** | 16px/Block 原生度量衡、狐獴 14~16u 身高、梨形雙軀幹配重、直立/奔馳雙姿態相容 |
| **02** | [02_bone_hierarchy_and_pivots.md](./wiki/02_bone_hierarchy_and_pivots.md) | **骨骼拓撲與 Pivot 樞軸定律** | 骨盆中心樹狀結構、樞軸點吸附網格整數律、0.2u 關節交疊防穿模工藝 |
| **03** | [03_anti_dirty_texture_and_hue_shift.md](./wiki/03_anti_dirty_texture_and_hue_shift.md) | **反髒貼圖法與四階色相偏移** | 拒絕隨機噪點與 AI 烘焙、PPU=1.0 絕對統一、冷暗影與暖高光、結構化點陣背紋 |
| **04** | [04_animation_physics_and_organic_timing.md](./wiki/04_animation_physics_and_organic_timing.md) | **關鍵格動力學與生物律動** | 預備動作（Anticipation）、眼動甩頭非同步、阻尼物理公式、8 大生態行為庫 |
| **05** | [05_academy_training_methodology.md](./wiki/05_academy_training_methodology.md) | **ANTI 學院訓練法與變體演化** | 檔案讀取預算鐵律（禁翻舊代碼）、五階能力考核、拔刀劍客/荒漠薩滿等 4 大 RPG 變體 |

* 完整的 Wiki 導覽與知識索引請參見 [wiki/index.md](./wiki/index.md)。

---

## 三、教學 HTML 簡報展示與操作說明

### 1. 簡報成果概覽
* **進入點**：[`index.html`](./index.html)
* **設計風格**：**經典 Minecraft GUI 浮雕 + 原版 16px 官方紋理 + 沉浸式沙漠微光展台**。
* **特色控制組**：
  * **頂部 MC HUD**：10 顆原版像素紅心、動態綠色經驗值條（XP Bar）與 `Lv. 1 ~ Lv. 10` 等級指示、10 個像素雞腿。
  * **底部 10 槽位 Hotbar**：10 頁投影片對應 10 個經典 MC 物品（望遠鏡、盔甲架、骨頭、毛刷、金蘿蔔、鑽石劍、時鐘、繫繩、不死圖騰、書本），具備白色選取光框。
  * **彈出式作業報告視窗**：點擊頂部「作業報告 / Graph」或按鍵盤 <kbd>R</kbd>，可直接在簡報內檢閱完整繳交成果。

### 2. 互動控制與快速鍵
* <kbd>→</kbd> / <kbd>Space</kbd> / <kbd>PageDown</kbd>：前進下一頁
* <kbd>←</kbd> / <kbd>PageUp</kbd>：返回上一頁
* <kbd>1</kbd> ~ <kbd>9</kbd>, <kbd>0</kbd>：數字鍵瞬間跳轉對應 1~10 槽位
* <kbd>F</kbd>：切換全螢幕沉浸教學模式
* <kbd>O</kbd>：開啟 / 關閉「投影片章節導覽抽屜」
* <kbd>P</kbd>：切換背景沙漠像素粒子開關
* <kbd>R</kbd>：開啟 / 關閉完整作業報告彈出窗
* 支援手機 / 平板觸控滑動（Swipe Left / Swipe Right）。

---

## 四、視覺升級：去背動態 GIF 與大空間排版

依據反饋，本專案完成了三項重磅升級：

### 1. 3D 動畫全量去背處理 (Alpha Transparency)
- 原始 GIF 帶有硬編碼的黑灰底色（`RGB(23, 23, 29)`），置入淺色面板時產生嚴重黑框瑕疵。
- 我們利用 Python Pillow/NumPy 的 BFS 邊界泛洪填充演算法，逐幀精確分離背景色，保留模型完整的毛皮與爪子邊緣，並以 `transparency=255, disposal=2` 重新打包。
- 模型現已無縫懸浮於 `.canvas-showcase-box` 徑向微光環境中，立體質感大幅提升。

### 2. 大空間排版與字型放大 (Generous Spatiality)
- 畫布最大寬度擴充至 `1560px`，徹底解決小框縮成一團的問題。
- **全面摒棄微型小字**：正文放大至 `1.05rem ~ 1.18rem`，大標題 `2.85rem ~ 3.4rem`，行高設定為 `1.65 ~ 1.75`，保證遠距演示清晰易讀。

### 3. 語法修正與零亂碼保證 (Zero-Garble)
- 徹底清除未解析的原始反斜線與公式字符。
- 全面改用標準語意化 HTML 標籤（`<span class="unit-box">16u &times; 16u</span>`）與實體符號（`&times;`、`&rarr;`、`&check;`、`<sup>`、`<i>`），呈現乾淨、無亂碼的專業網頁排版。

---

## 五、Loop / Graph 流程圖與架構設計

為確保由 LLM Wiki 轉譯為教學簡報時，內容不會發生概念漂移（Concept Drift）或版面破版，本專案設計了 **「雙迴圈驗證架構（Dual-Loop Verification Graph）」**：

```mermaid
flowchart TD
    Start([任務啟動: 製作體素建模教學簡報]) --> Step1[步驟 1: 讀取 LLM Wiki 5 篇規範]
    Step1 --> Step2[步驟 2: 知識點萃取與章節大綱切分]
    
    %% 迴圈一：專業領域約束檢查 (Shift-Left Gate)
    subgraph Loop1 [迴圈一：領域專業約束門禁 (Domain Constraint Gate)]
        Step2 --> Check1{專業規則檢查<br/>- 是否混入 Blender 多邊形/平滑著色術語?<br/>- Pivot 座標與尺度是否符合 16px 鐵律?<br/>- 4 階色板 RGB 是否精確?}
        Check1 -- 發現術語混淆 / 尺度超出 --x Step2
        Check1 -- 驗證通過 (合格率 100%) --> Step3[步驟 3: 初稿撰寫 HTML/CSS/JS]
    end

    %% 迴圈二：教學體驗與程式碼驗證 (Code & Pedagogy QA)
    subgraph Loop2 [迴圈二：教學體驗與版面渲染門禁 (Code & Pedagogy Gate)]
        Step3 --> Check2{前端渲染與教學可用性檢查<br/>- 動圖與路徑是否 404?<br/>- 是否有微小字體或未解析 LaTeX 亂碼?<br/>- 翻頁鍵盤監聽是否衝突?<br/>- 排版是否在 1560px 舞台中平衡?}
        Check2 -- 內容溢出 / 語法錯誤 --x Step3
        Check2 -- 零錯誤通過 --> Step4[步驟 4: 輸出成品與發布準備]
    end

    Step4 --> End([部署於 GitHub Pages / 本地瀏覽])
```

### 1. 哪些步驟會重複執行？（The Loops）
1. **Loop 1（知識萃取門禁）**：在文字生成前，將大綱與 Wiki 中的「白名單規則（16px 尺度、PPU=1.0、4-step 色階）」與「黑名單違禁詞（Subdivision, Smooth Shading, Normal Maps）」進行比對。若命中違禁詞，立即打回重新檢索 Wiki。
2. **Loop 2（版面與代碼門禁）**：在輸出 HTML 後，檢驗投影片卡片高度、字數比例與圖片路徑。若某頁文字過長導致畫面垂直滾動失效，自動重新排版拆分。

### 2. 哪些地方需要檢查或重新生成？
* **Pivot 與階層依賴檢查**：檢查 Slide 3 中的骨骼樹是否正確反映 `mk_pelvis` 作為根運動節點，避免生成「胸部帶動大腿」的荒謬骨骼。
* **色彩值精確度檢查**：檢查 Slide 5 色卡中的 Hex 與 RGB 是否與 Wiki 第 03 篇色板 100% 一致。
* **靜態資源相對路徑檢查**：確認所有 `<img src="./assets/...">` 均為相對路徑，經實測驗證 **0 Broken Links**。

### 3. 為什麼這樣設計？
* **解耦（Decoupling）原則**：將「專業知識的正確性」與「網頁排版/JavaScript 動效」完全拆開。如果直接把 Wiki 丟進去一次性生成 HTML，一旦專業知識有偏差，就得整頁重寫程式碼，造成極大的 Token 損耗與不穩定性。

---

## 六、實際執行結果與檢查紀錄 (Execution & QA Logs)

在本次實際執行產出簡報的過程中，我們記錄了以下關鍵檢查點與攔截紀錄：

| 測試階段 | 檢查節點 | 攔截到的問題現象 | 觸發動作 | 修正後結果 |
| :---: | :--- | :--- | :---: | :--- |
| **Pass 1** | **Domain Constraint Gate** (迴圈一) | LLM 在撰寫 Slide 4 (貼圖) 時，嘗試建議初學者「使用隨機噪點增加毛皮真實度，並在材質球中加入法線貼圖（Normal Map）」。 | **❌ 攔截拒絕**<br/>(命中黑名單) | 強制校正回 Wiki 第 03 篇：Minecraft 體素嚴禁高頻隨機噪點，全面改為「1:1 像素簇（Pixel Clusters）」與「四階色相偏移色板」。 |
| **Pass 2** | **Domain Constraint Gate** (迴圈一) | LLM 在描述狐獴直立高度時，寫成「身高約 24~28px（接近 2 格高）」。 | **❌ 攔截拒絕**<br/>(違反 16px 鐵律) | 校正回 Wiki 第 01 篇：狐獴屬於小型敏捷生物，直立高度嚴格限制在 14u ~ 16u（1 格高），四足伏地 7u ~ 8u。 |
| **Pass 3** | **Code & Pedagogy Gate** (迴圈二) | 生成 HTML 初版時，Slide 6 同時塞入 4 種動畫，導致卡片排版嚴重被壓縮，動圖縮小至無法看清。 | **⚠️ 體驗警報**<br/>(資訊密度超載) | 將動畫展示拆分為 Slide 6（高張力：警戒眺望 + 毒蠍撲擊）與 Slide 7（生活日常：刨土掘洞 + 日光浴放鬆），視覺節奏瞬間舒緩。 |
| **Pass 4** | **Syntax & Spatial QA** (迴圈二) | HTML 出現未解析的公式標記導致字體微小且顯示原始反斜線。 | **❌ 語法與視覺攔截** | 全面替換為語意化標籤（`<span class="unit-box">16u &times; 16u</span>`），正文字體全量提升至 1.05rem~1.18rem，舞台擴展至 1560px。 |
| **Pass 5** | **Asset Alpha QA** (迴圈二) | 模型 GIF 帶有黑底，在面板上呈現突兀矩形。 | **❌ 視覺質感攔截** | 透過 Python 批次泛洪填充分離 Alpha 通道，全面升級為透明去背動圖。 |

* 本專案的自動化驗證腳本為 [tools/check_project.py](./tools/check_project.py)，歷史檢查報告均保存於 [logs/](./logs/) 目錄中。

---

## 七、反思：節點錯誤、檢查左移與 Workflow 演進

### 1. 哪一個節點最常出錯？
* **最常出錯的節點是「跨領域知識映射（Cross-domain Concept Hallucination）」與「未解析語法渲染」**。
* LLM 的預訓練語料中充滿了大量通用的次世代 3D 建模教學（Blender、PBR 材質、法線貼圖）以及論文級格式。當要求它生成「Minecraft 體素教學網頁」時，LLM 極度容易不由自主地調用通用 3D 詞彙，或習慣性吐出未編譯的公式標記，直接破壞網頁視覺。

### 2. 你發現問題後，把檢查往前移到了哪一個步驟？（Shift-Left Strategy）
* **原本的舊流程**：
  `讀 Wiki ➔ 直接寫 HTML 簡報代碼 ➔ 預覽發現專業名詞錯誤與語法亂碼 ➔ 整篇重寫 HTML/CSS`
  * *代價*：修改一次要耗費 4000+ tokens，且往往在修名詞時又弄壞了 HTML 標籤配對。
* **優化後的左移流程（Shift-Left）**：
  **將檢查大幅往前推移至「知識點萃取（Spec Extraction）」階段**。
  在動手寫任何一行 HTML/CSS 代碼之前，先設立 `Domain Constraint Gate`，依據 Wiki 規格建立 **強制術語過濾清單與語法輸出白名單**。只有當大綱中的術語與參數（16px 尺度、Pivot 座標、4 階色相、純 HTML 實體）100% 通過驗收後，才准許放行進入 HTML 編碼階段。

### 3. 你有沒有因此修改 workflow / graph？為什麼？
* **有的，我們將單一線性流水線演進為「雙迴圈解耦架構」，並追加了獨立的設計與代理人規範（AGENT.md / DESIGN.md）**：
  1. **為什麼修改？** 因為「教學內容的專業真實性」與「網頁前端的互動體驗」是兩種完全不同維度的目標。
  2. **演進效果**：迴圈一專注抓「領域概念錯誤與幻覺」，迴圈二專注調「CSS 佈局、大字體、去背動圖、鍵盤無障礙與視覺節奏」。解耦後，兩道關卡各自具備極高的收斂速度，不再互相干擾，保證了最終產出的簡報既具備專業深度，又具備極致的前端質感。
