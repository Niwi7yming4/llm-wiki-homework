# 用 LLM Wiki 製作教學 HTML 簡報

主題：Minecraft 3D 體素建模工藝——從設計草圖到生動實體（以沙漠狐獴為例）

## 1. LLM Wiki 主題與簡短介紹

本次以 Minecraft 的 Blockbench 體素建模為主題，建立一份讓初學者也能閱讀的 LLM Wiki，並以「沙漠哨兵・狐獴」作為貫穿案例。內容涵蓋模型比例、骨骼階層、Pivot 旋轉中心、像素貼圖與動畫原理，最後再把 Wiki 知識轉換成 HTML 教學簡報。

建立 Wiki 時採用「先討論、後生成」的方式，先規劃應教哪些內容，再蒐集、整理與檢查資料。本次共整理 5 份來源：Minecraft Wiki 模型教學、Blockbench 官方文件、Microsoft Learn 動畫文件、動畫十二原則，以及 Pixel Art 相關資料。來源網址、日期與引用對應均保留在專案中。

Wiki 分成五個章節：
（1）空間尺度與模型比例：理解 Minecraft 的單位與狐獴體型。
（2）骨骼階層與 Pivot：說明骨骼父子關係及旋轉中心。
（3）像素貼圖與色彩：介紹像素簇、色階和避免無意義雜訊的方法。
（4）動畫與自然律動：介紹預備動作、緩入緩出、尾巴與身體的動態。
（5）建模訓練與角色變體：整理製作順序與後續延伸方法。

## 2. LLM Wiki 連結或成果

Wiki 索引（含五篇知識頁面及五份資料來源）：
https://github.com/Niwi7yming4/llm-wiki-homework/blob/main/wiki/index.md

五份來源筆記：
https://github.com/Niwi7yming4/llm-wiki-homework/tree/main/sources

Wiki 建立與修改紀錄：
https://github.com/Niwi7yming4/llm-wiki-homework/blob/main/wiki/log.md

## 3. 教學 HTML 簡報連結

GitHub 專案（含 HTML 簡報與素材）：
https://github.com/Niwi7yming4/llm-wiki-homework

HTML 原始檔：
https://github.com/Niwi7yming4/llm-wiki-homework/blob/main/index.html

GitHub Pages 網址（需先確認已啟用部署）：
https://niwi7yming4.github.io/llm-wiki-homework/

簡報共設計 10 頁，將 Wiki 中的比例、骨骼、貼圖及動畫概念改寫成循序漸進的教學。介面採 Minecraft 風格，加入快捷列選頁、翻頁操作、模型示例與 GIF 動畫，讓初學者不只是看文字，也能透過實際畫面理解建模觀念。

## 4. Loop / Graph 流程設計

整體流程：
討論教學主題 → 蒐集並匯入五份資料 → 整理 Wiki 與來源引用 → 擷取知識重點、安排簡報大綱 → 檢查內容 → 產生 HTML 簡報 → 檢查介面與功能 → 完成成果。

這次採用兩個檢查循環：

Loop 1（知識檢查）：確認大綱、專有名詞、比例設定與貼圖觀念是否符合 Wiki，有疑問就返回資料整理與內容編寫的步驟，重新比對來源，不直接進入 HTML 製作。

Loop 2（網頁檢查）：完成 HTML 後，確認頁數、圖片、動圖、連結、字體與翻頁操作是否正常。若有內容擠在同一頁或圖片顯示異常，就回到簡報修改，不必重建整個 Wiki。

這樣設計是為了把「內容有沒有教對」與「網頁能不能正常使用」分開檢查，減少發現一個問題就要重新生成整份簡報的情況。

## 5. 一次實際執行結果與檢查紀錄

本次使用 Python 腳本檢查來源數量、Wiki 頁面引用、HTML 頁數、連結、GIF 透明度及字體等項目，並保存修正前後的紀錄。

第一次檢查（2026/11/23 23:57）：21 PASS、2 WARN、10 FAIL。主要問題是 Wiki 缺少索引與更新紀錄、五篇知識頁面缺少來源引用，以及部分數學標記格式不適合直接顯示。

第二次檢查（2026/11/23 23:58）：29 PASS、2 WARN、2 FAIL。補齊 Wiki 索引、更新紀錄和來源引用後，通過項目增加；但當時仍有語法及 README 連結檢查項目未通過，並非全部零錯誤。

另外，在簡報呈現方面，也發現過動畫展示過於集中、部分文字太小，以及 GIF 背景不適合面板的問題，因此重新分配頁面內容、調整文字與動圖顯示方式。

實際檢查紀錄：
https://github.com/Niwi7yming4/llm-wiki-homework/tree/main/logs

檢查程式：
https://github.com/Niwi7yming4/llm-wiki-homework/blob/main/tools/check_project.py

## 6. 反思與流程調整

最容易出錯的節點是「Wiki 整理與教學內容生成」之間。第一次檢查時，雖然已經有五篇 Wiki 內容，但有些知識點沒有明確標示引用來源，容易讓 AI 把自行設定的模型數值或一般 3D 建模觀念當成通用規則。

原本傾向在 HTML 完成後才檢查，後來把檢查提前到「Wiki 完成、產生簡報大綱」的階段，先確認來源引用與專業概念，再交給 AI 生成網頁。

因此也調整了 Workflow：原本是一條「讀資料 → 生成簡報 → 檢查」的直線流程，改為雙迴圈。內容出錯就返回 Wiki 和大綱，介面出錯才返回 HTML 修改。這樣比較能找到問題發生的位置，也讓整個製作流程更有效率。
