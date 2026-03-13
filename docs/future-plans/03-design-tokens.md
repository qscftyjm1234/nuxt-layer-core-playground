[回到首頁](../../README.md) | [返回上一頁 (未來可擴充性)](../guide/02-future-scalability.md)

# 擴充藍圖：設計系統 Token 化

本專案現有的樣式系統已達到了統整的效果，但為了因應未來松凌可能跨足更多不同的前端框架（如 React、Vue 原生或是行動裝置 APP），我們計畫導入 **Design Tokens（設計語彙）** 的架構。

## 1. 概念與價值

目前專案的顏色、間距、字體大小可能是以 CSS Variables 或 SCSS Variables 的形式寫死在樣式表中。
Design Tokens 的精神在於，將「設計決策」抽離成**與技術框架無關的資料格式（通常是 JSON）**。

這保證了：即便未來改用其他語言開發專案，只要讀取同一份 JSON，就能渲染出一模一樣的「松凌標準色與間距」。

## 2. 實作架構規劃

1. **創建獨立子套件**：
   - 在 `packages/` 下建立一個沒有任何 Vue 或 Nuxt 依賴的純樣式層。
   - 維護一套核心的 JSON 檔案，例如：
     ```json
     {
       "colors": {
         "primary": {
           "base": "#1A56DB",
           "hover": "#1E40AF"
         }
       },
       "spacing": {
         "small": "4px",
         "medium": "8px"
       }
     }
     ```

2. **樣式轉換引擎**：
   - 整合 `style-dictionary` 或類似工具，將 JSON 在編譯時轉換為各種平台需要的格式：
     - **Web (本專案)**：轉換為 CSS Variables 或 Tailwind 設定檔。
     - **iOS / Android**：轉換為 Swift 的 Struct 或 Android 的 XML 資源檔。

3. **客製化與佈景主題**：
   - 透過 Design Tokens，未來實作「深色模式」或「多品牌主題（為不同客戶客製不同主色）」時，只需要切換 Token 檔案即可全站套用，不需更動任何組件內的 CSS。

## 3. 未來影響

這套機制的導入，能有效打破各團隊間（設計師、Web 開發、App 開發）的溝通隔閡。設計師在 Figma 調整參數，開發端便能透過 Token 的同步自動更新所有平台的樣式。
