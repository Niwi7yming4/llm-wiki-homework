# ANTI ACADEMY // AGENT.MD (代理人工程規範與實作指南)

> **版本**：v2.0 (Minecraft Pixel Art & Voxel Mastery)  
> **適用專案**：`anti_academy_bbmodel_slides` (教學型 HTML 簡報與 LLM Wiki 實作)  
> **核心職責**：以 ANTI 學院嚴苛的體素工藝標準，引導 LLM Wiki 知識庫生成、雙迴圈驗證架構（Dual-Loop Verification Graph）以及無障礙前端簡報輸出。

---

## 一、空間設計與字型度量衡規範 (Spatial & Typography Mandate)

在過往的簡報實作中，最常發生的問題是「**版面擁擠、文字微小、缺乏空間呼吸感**」。本專案制定強制性空間規範：

### 1. 舞台畫布全螢幕利用原則 (Viewport Maximization)
- **畫布最大寬度**：嚴格擴展至 `min(1560px, calc(100vw - 32px))`，徹底打破傳統 1024px/1280px 窄版拘束。
- **邊距與留白**：主面板（`.stage-panel`）內距設定為 `30px 40px`，卡片內部內距 `20px 24px`，保證在大螢幕下具備寬廣大氣的教學講堂體感。
- **雙欄黃金分配**：
  - 左側教學解說欄佔比 `1.15fr`（約 55%~58%）。
  - 右側 3D 視覺展示欄佔比 `0.85fr`（約 42%~45%）。

### 2. 嚴格字型大小階層（嚴禁使用微型小字）
任何小於 `0.95rem` 的正文排版一律禁止，確保遠距瀏覽與投影清晰：
| 元素層級 | 標籤 / 類別 | 強制字型大小 | 行高 (Line-height) | 視覺權重 |
| :--- | :--- | :--- | :--- | :--- |
| **封面大標題** | `.main-title` | `2.85rem ~ 3.4rem` | `1.18` | `900 (Black)` |
| **章節模組標題** | `.slide-header h2` | `2.1rem ~ 2.4rem` | `1.25` | `900 (Black)` |
| **單元前言引導** | `.section-desc` | `1.15rem ~ 1.25rem` | `1.5` | `500 (Medium)` |
| **卡片主題標題** | `.card-feature h3` | `1.25rem ~ 1.35rem` | `1.3` | `800 (Bold)` |
| **核心教學正文** | `.body-p`, `.spec-list li` | `1.05rem ~ 1.18rem` | `1.65 ~ 1.75` | `400~500` |
| **數值與單位標籤** | `.unit-box`, `.val-tag` | `0.95rem ~ 1.05rem` | `1.2` | `700 (Mono Bold)` |
| **輔助註解與鍵盤提示**| `kbd`, `.keyboard-hints` | `0.82rem ~ 0.88rem` | `1.4` | `600 (Mono)` |

---

## 二、語法完整性與零亂碼鐵律 (Syntax & Zero-Garble Policy)

### 1. 杜絕未解析的原始 LaTeX / KaTeX 符號
- **禁止行為**：嚴禁在純 HTML 文本中輸出未經腳本渲染的 LaTeX 符號（例如 `$16\text{u} \times 16\text{u}$` 或 `$f(t) = A \cdot e^{-kt}$`）。這會導致網頁直接顯示醜陋的反斜線與代碼，被使用者判定為「語法用錯或亂碼」。
- **標準解法**：全面改用原生語意化 HTML 標籤與標準實體符號：
  - 乘號：使用 `&times;` 代替 `\times` 或 `*`。
  - 箭頭：使用 `&rarr;` 代替 `->`。
  - 勾選/叉叉：使用 `&check;`、`&times;`。
  - 次方與數學式：使用 `<sup>`、`<i>`（例如 `<i>f</i>(<i>t</i>) = <i>A</i> &middot; <i>e</i><sup>-<i>kt</i></sup> &middot; sin(&omega;<i>t</i>)`）。
  - 專屬度量衡容器：包裝於 `<span class="unit-box">16u &times; 16u &times; 16u</span>` 中，提供獨立像素深色底與亮金色文字。

### 2. 字元編碼與特殊符號安全
- 檔案一律採用 **UTF-8（無 BOM）** 儲存。
- 嚴禁使用作業系統特定編碼（如 Big5、CP950），避免在不同平台瀏覽器開啟時產生問號亂碼。

---

## 三、資產去背與展示管線紀律 (Asset Transparency & Pipeline)

### 1. 動態 GIF 與 PNG 去背原則
- 3D 生物模型是整個簡報的核心靈魂。若帶有未去除的實心黑色/深灰底色矩形邊框，會嚴重破壞 Minecraft GUI 面板的整體感。
- **自動化去背管線**：
  - 透過 Python Pillow/NumPy 演算法，從畫布四角採樣背景色（如 `RGB(23, 23, 29)`）。
  - 使用 BFS 洪水填充算法（Floodfill）將所有連續外圍背景之 Alpha 通道設為 0。
  - GIF 輸出時採用 `transparency=255, disposal=2`，確保逐幀播放時不會產生殘影疊加。
- **展示容器強化**：
  - 模型展示外框搭配 `.canvas-showcase-box`，採用柔和的徑向環境光暈（Radial Gradient: 沙漠米金色微光 &rarr; 半透明深色），賦予 3D 模型真實的景深感。

### 2. 嚴格智財隔離（IP Security）
- **絕對禁止公開私有技能檔**：私有技能檔（包括自定義 Prompt 框架）屬於內部核心資產，不得置於對外開放的簡報倉庫根目錄。
- **絕對禁止放原始 `.bbmodel` 檔案**：僅輸出展示級 GIF 與高解析 PNG。

---

## 四、雙迴圈驗證架構執行手冊 (Dual-Loop Verification Protocol)

在 Agent 執行「從 LLM Wiki 產生教學簡報」的任務時，必須強制走過兩道門禁：

```
[使用者需求 / Wiki 知識庫] 
           &darr;
[第一道門禁：領域約束檢驗 (Domain Gate)] &rarr; 失敗則回退檢索
           &darr; (合格)
[初稿代碼生成 (HTML / CSS / JS)]
           &darr;
[第二道門禁：體驗與渲染檢驗 (Pedagogy & UI Gate)] &rarr; 失敗則重構佈局
           &darr; (合格)
[GitHub Pages 發布]
```

### 1. 迴圈一檢查清單（領域知識）
- [ ] 是否誤用 Blender/Maya 專有名詞？（黑名單：Subdivision, Smooth Shading, Normal Maps）
- [ ] 尺度是否嚴格鎖定 Minecraft 16px/Block 規格？（狐獴直立 14~16u，伏地 7~8u）
- [ ] Pivot 樞軸點是否精確對齊網格點？（嚴禁浮點游離）
- [ ] 色板是否遵循四階色相偏移？（冷陰影 &rarr; 暖高光）

### 2. 迴圈二檢查清單（前端體驗）
- [ ] 是否存在任何 404 Broken Images？（驗證為 0 破圖）
- [ ] 是否有任何文字小於 `0.95rem`？
- [ ] 是否有未被渲染的 LaTeX 或錯誤實體符號？
- [ ] 快捷欄（Hotbar 1~10）與鍵盤切頁監聽是否 100% 順暢？
- [ ] 是否能在手機、平板與 4K 螢幕自適應排版？
