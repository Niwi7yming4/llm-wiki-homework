# ANTI ACADEMY // DESIGN.MD (設計系統與 UI/UX 視覺規範)

> **專案名稱**：Minecraft 3D 體素建模大師班（狐獴案例）  
> **設計哲學**：**體素本真性 (Voxel Authenticity) 遇上 教學清晰度 (Educational Clarity)**  
> **核心風格**：經典 Minecraft GUI 浮雕邊框 + 原版 16px 官方紋理 + 沉浸式沙漠微光舞台

---

## 一、設計哲學與視覺基因 (Design Philosophy)

1. **體素真實感（Voxel Authenticity）**：
   - 全介面啟用 `image-rendering: pixelated;` 與 `image-rendering: crisp-edges;`，拒絕任何模糊平滑著色。
   - 所有幾何按鈕與面板遵循 Minecraft 經典的 **4px 黑邊框 ＋ 內部 3D 倒角陰影/高光**。
2. **寬裕的大空間佈局（Generous Spatiality）**：
   - 徹底揮別微型小字。投影片是為了遠距演示與清晰閱讀而設計，必須具備大字型（正文 1.05rem~1.18rem，標題 2.1rem~3.4rem）與寬敞的佈局餘裕（最大寬度 1560px）。
3. **沉浸式生物展台（Transparent 3D Showcase）**：
   - 模型展示徹底「去背」，不再是黑框長方形，而是浮動在柔和的沙漠環境微光（`.canvas-showcase-box`）中，宛如活生生在沙地上奔馳與警戒。

---

## 二、色彩代幣系統 (Color Design Tokens)

### 1. 經典 Minecraft GUI 色彩代幣
| 代幣名稱 | 變數名稱 | 色值 | 用途與說明 |
| :--- | :--- | :--- | :--- |
| **Panel Base** | `--mc-panel-bg` | `#c6c6c6` | 主面板基底灰石色 |
| **Panel Border** | `--mc-panel-border` | `#000000` | 4px 像素黑色外框 |
| **Panel Highlight** | `--mc-panel-light` | `#ffffff` | 浮雕左上方 4px 亮白高光線 |
| **Panel Shadow** | `--mc-panel-dark` | `#555555` | 浮雕右下方 4px 深灰陰影線 |
| **Slot Surface** | `--mc-slot-bg` | `#8b8b8b` | 凹陷槽位內表面 |
| **Slot Shadow** | `--mc-slot-border-dark`| `#373737` | 槽位左上方凹陷深色邊 |
| **Slot Highlight**| `--mc-slot-border-light`| `#ffffff` | 槽位右下方凹陷反光邊 |
| **XP Green** | `--mc-xp-green` | `#80ff20` | 原版經驗值條與等級指示燈 |
| **Heart Red** | `--mc-red` | `#ff1a1a` | 生命值紅心核心 |
| **Hunger Brown** | `--mc-hunger` | `#b86f35` | 飽食度雞腿核心 |

### 2. 沙漠狐獴 1:1 像素簇專屬四階色相偏移色板
本專案嚴格貫徹 **「冷陰影 &rarr; 暖高光」** 的光影染色法則：
```
[Cream Palette 淺霜腹部色板]
  Step 0: #B69E7E  (乾草灰褐 - 冷暗影)
  Step 1: #DAC4A0  (暖沙米黃)
  Step 2: #EEDCBC  (沙漠淡乳酪 - 主色)
  Step 3: #F8EAD0  (烈日象牙白 - 暖高光)

[Tan Palette 沙棕毛皮色板]
  Step 0: #76583C  (深焦赭褐 - 冷陰影)
  Step 1: #9C7854  (陶土土黃)
  Step 2: #BA966E  (沙漠金褐 - 主色)
  Step 3: #D4B288  (陽光金褐 - 暖高光)

[Dark Palette 特徵暗斑色板]
  Step 0: #201816  (濃郁焦黑 - 瞳孔與爪尖)
  Step 1: #362A26  (炭焙黑褐 - 防眩光眼眶)
  Step 2: #4E3E36  (苦巧克力褐 - 背脊斑紋)
  Step 3: #685448  (柔和暗栗色 - 斑紋邊緣)
```

---

## 三、排版與空間階層規範 (Typography & Spacing Scale)

### 1. 空間尺寸與間距系統 (Spacing Scale)
- **容器最大寬度**：`1560px`（支援 1920&times;1080 與 2K/4K 滿版無黑邊）。
- **外圍頂底安全邊距**：頂部留出 `84px`（HUD 高度），底部留出 `76px`（Hotbar 高度）。
- **主舞台面板內距**：`30px 40px`。
- **卡片內距**：`20px 24px`。
- **網格間距 (Grid Gap)**：`28px`。

### 2. 字型階層規範 (Typography Scale)
```css
/* 大標題 */
.main-title       { font-size: 2.85rem; font-weight: 900; line-height: 1.18; }
.title-sub        { font-size: 1.35rem; font-weight: 900; letter-spacing: 0.05em; }

/* 模組單元標題 */
.slide-header h2  { font-size: 2.1rem;  font-weight: 900; line-height: 1.25; }
.section-desc     { font-size: 1.15rem; font-weight: 500; line-height: 1.5; color: #4a4a4a; }

/* 卡片與正文 */
.card-feature h3  { font-size: 1.25rem; font-weight: 800; line-height: 1.3; }
.body-p           { font-size: 1.1rem;  font-weight: 400; line-height: 1.7; color: #f1f5f9; }
.spec-list li     { font-size: 1.05rem; font-weight: 500; line-height: 1.6; color: #f1f5f9; }

/* 數值標籤與代碼 */
.unit-box         { font-size: 0.95rem; font-weight: 700; font-family: var(--font-mono); }
.val-tag          { font-size: 0.95rem; font-weight: 700; font-family: var(--font-mono); }
.code-pill code   { font-size: 0.95rem; font-weight: 700; font-family: var(--font-mono); }
```

---

## 四、核心元件架構 (Component Architecture)

### 1. 經典 HUD 頂部狀態列 (`.mc-hud-header`)
- **生命值紅心陣列**：左側展示 10 顆經典像素紅心，具備 1px 黑色陰影外輪廓與亮粉紅高光點。
- **經驗值刻度條**：以 `#1e1e1e` 為底槽，內嵌綠色進度條，具備 5 處垂直刻度線。中央疊加綠色黑邊的 `xp-level-badge`（顯示當前投影片頁碼）。
- **飽食度雞腿陣列**：右側展示 10 個經典像素雞腿。
- **快捷控制按鈕**：包含「作業報告/Graph」、「章節大綱」、「背景粒子開關」與「全螢幕」。

### 2. 經典 10 槽位快捷欄 (`.mc-hotbar`)
- **外觀特徵**：每個槽位為 `48px &times; 48px` 的 `.mc-slot`，內嵌原版官方物品 PNG。
- **選取狀態**：啟用頁面擁有原版白色外框 `outline: 4px solid #ffffff; outline-offset: -4px;`。
- **交互回饋**：滑鼠移入時槽位變亮（`#a0a0a0`），支援鍵盤數字鍵 <kbd>1</kbd> ~ <kbd>0</kbd> 瞬間換頁。

### 3. 3D 體素透視展台 (`.canvas-showcase-box`)
- 採用徑向漸變照明：
  ```css
  background: radial-gradient(circle at center, rgba(215, 192, 153, 0.18) 0%, rgba(18, 22, 30, 0.7) 80%);
  border: 2px solid #373737;
  border-radius: 4px;
  ```
- 模型經過 Alpha 掩模去背處理，無縫融入展台，徹底告別生硬的黑塊矩形。

### 4. 雙迴圈驗證彈窗 (`#report-modal`)
- 點擊頂部「作業報告 / Graph」時平滑彈出。
- 內部完整渲染 LLM Wiki 清單、ASCII/Mermaid 流程圖、QA 執行審查日誌與反思回答，支援 <kbd>Esc</kbd> 關閉。
