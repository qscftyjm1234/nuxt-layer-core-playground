[返回指南總覽](../../README.md)

# 發布與套件引用指南

本指南分為兩個階段：第一部分將教導核心維護者如何將更新後的核心套件「**發布**」到 npm；第二部分將教導業務專案的同仁如何「**下載並使用**」這包模組。

---

## 階段一：發布核心套件到 npm

當您在本地端完成了 `nuxt-core` 的功能開發，並通過了 `ui-docs` 的視覺驗證後，我們需要將新版本打包上傳，讓其他專案能抓取到最新版。

### 1. 執行發布 (自動化)

專案現已提供自動化發布腳本，建議優先使用此方式：

- 進入核心包目錄：`cd packages/nuxt-core`
- 執行發布指令：
  ```bash
  # 預設跳 patch (1.1.0 -> 1.1.1) 並發布
  npm run release

  # 若是大版本變動
  npm run release minor  # (1.1.0 -> 1.2.0)
  npm run release major  # (1.1.0 -> 2.0.0)
  ```
- **腳本行為**：該腳本會自動完成 `npm version` 版號提升並接著執行 `npm publish`。

### 2. 執行發布 (手動 - 若有特殊需求)

若不想使用自動化腳本，仍可維持手動流程：

1. **更新版號**
   - 進入核心包目錄：`cd packages/nuxt-core`
   - 手動修改 `package.json` 中的 `"version"` 或執行 `npm version <type>`。

2. **執行發布**
   - 確保已執行 `npm login`：
     ```bash
     npm publish
     ```


---

## 階段二：同仁如何下載與使用這包模組

當套件順利發布後，其他業務端的同仁可以依照他們目前的專案狀態，選擇以下兩種方式來下載並繼承本核心架構。

### 情境 A：建立全新專案並繼承

若業務團隊需要開啟全新的專案，並直接套用本核心架構，只需在終端機執行本模組提供的初始化指令：

```bash
npx softleader-nuxt-core init my-new-project
```

執行後，系統會自動建立 `my-new-project` 資料夾，並包含完整的目錄藍圖（如 `configs/default.json`, ESLint / Prettier 等設定檔）與 Nuxt 3 核心整合設定。

接著，進入專案並安裝網路依賴（不需要手動新增 `extends`，CLI 已經幫您設定好了）：

```bash
cd my-new-project
npm install
npm run dev
```

如果業務同仁的專案已經開發到一半，他們依然可以無痛引入這包核心層，直接享受核心層帶來的共用組件與邏輯。

1. **安裝核心依賴**：
   在他們現有專案的根目錄下，安裝這包模組：

   ```bash
   npm install softleader-nuxt-core
   ```

2. **設定繼承 (Nuxt Extends 架構)**：
   打開該專案的 `nuxt.config.ts`，在最外層加上 `extends` 屬性。這行設定代表著「**繼承核心層的一切**」：

   ```typescript
   export default defineNuxtConfig({
     // 告訴 Nuxt：我要繼承 softleader-nuxt-core 的所有預設設定、組件與工具！
     extends: ['softleader-nuxt-core']

     // 下面保留專案原本的客製化設定...
   })
   ```

3. **搞定！享受開發**
   此時重新執行 `npm run dev`，該專案就會自動獲得核心包裡面的所有 UI 組件（如 `<IButton>`）、Composables（如 `useApi`）以及所有預設的擴充工具了！
