# Nuxt Core Layer (`softleader-nuxt-core`)

這是 Nuxt 3 Core Layer，提供可重用的基礎架構、元件和工具，協助開發團隊快速建立一致且高品質的 Nuxt 3 應用。

## 包含內容

- 設計系統元件
- 基礎 Layout 與路由設定
- 全域樣式與設計 Tokens
- 共用 Composables 與 Utils
- 統一的開發工具配置（搭配 Nuxt 3 Eslint 等）

## 使用情境一：在既有專案中使用 (Layer 繼承)

如果你已經有一個 Nuxt 3 專案，你可以直接將此 Layer 擴展進你的專案中，藉此享有所有組件、功能和設定。

1. **安裝依賴**

   ```bash
   npm install softleader-nuxt-core
   ```

2. **配置 `nuxt.config.ts`**

   ```typescript
   export default defineNuxtConfig({
     extends: ["softleader-nuxt-core"],
     // ... 其他你的專案設定
   });
   ```

3. **啟用 ESLint / Prettier (選用)**
   由於此專案依賴 `@nuxt/eslint-config`，建議你的專案也在根目錄設定對應的 Eslint 配置：
   ```bash
   npm i -D @nuxt/eslint-config eslint
   ```
   並在你的 `eslint.config.mjs` 中繼承 Nuxt 預設配置。

---

## 使用情境二：快速建立全新專案 (Scaffolding CLI)

如果你想在一個新的（或空的）資料夾內建立完整包含 `softleader-nuxt-core` 的專案，我們提供了一個內建的命令列工具。

1. **透過 npx 執行初始化腳本**
   你可以直接使用 `npx` 搭配套件名稱，並指定你的專案名稱（例如 `my-new-app`）：

   ```bash
   npx softleader-nuxt-core init my-new-app
   ```

2. **進入專案並啟動**
   指令執行完成後，請進入生成的專案資料夾並啟動開發伺服器：
   ```bash
   cd my-new-app
   npm install # 若 CLI 尚未安裝完畢
   npm run dev
   ```
   這會自動生成 `package.json`、`app.vue`、`nuxt.config.ts` 等必要檔案，並且已經預先設定好 `extends: ['softleader-nuxt-core']`。

---

## 開發 Core Layer 說明

若你是 `softleader-nuxt-core` 的開發者：

```bash
# 安裝依賴 (含所有 workspaces)
npm install

# 啟動 Playground 進行聯動開發與熱更新預覽
npm run dev:playground

# Lint
npm run lint

# 型別檢查
npm run typecheck
```

### 關於本地開發與 `apps/playground-app`

本專案基於 **NPM Workspaces**。如果你在 `packages/nuxt-core` 中修改了元件或 Composables，**不需要發布至 npm**，只需要啟動 `npm run dev:playground`。
`playground-app` 的 `nuxt.config.ts` 已配置了相對路徑繼承 (`extends: ['../../packages/nuxt-core']`)，因此你的所有變更都會即時熱更新 (HMR) 顯示在畫面上！

### 發布至 npm

為了讓其他開發者能透過 `npx` 使用此腳本或載入此 Layer，您必須將本專案發布到 npm registry。

1. **更新版本號**：確保 `package.json` 中的 `version` 已更新。
2. **登入 npm** (若尚未登入)：
   ```bash
   npm login
   ```
3. **發布套件**：
   ```bash
   npm publish
   ```
   _(若是發布到公司私有 registry，請確認 `.npmrc` 中有設定正確的 registry url)_
