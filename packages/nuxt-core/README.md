# Nuxt Core 核心開發包 (`softleader-nuxt-core`)

一個基於 Nuxt 3 的企業級 Layer 開發框架，提供可重用的基礎架構、元件與工具。

## 快速開始

### 1. 安裝相依套件

在你的 Nuxt 3 專案中執行：

```bash
npm install softleader-nuxt-core
```

### 2. 層級繼承 (Setup Layer)

在你的 `nuxt.config.ts` 中擴寫核心層：

```typescript
export default defineNuxtConfig({
  extends: ['softleader-nuxt-core']
  // ... 其他專案設定
})
```

### 3. 配置產品參數 (Configuration)

在專案根目錄建立 `configs/default.json`。核心層會自動讀取此檔案並應用於全域。詳細配置請參考 **[環境與產品配置指南](#)**。

---

## 核心教學課程 (Core Learning Path)

專為開發人員設計，為了讓學習曲線更平滑，請依照以下 **五個階段** 掌握核心開發：

### 階段一：核心架構與基礎 (Core Architecture & Basics)

了解層級設計理念、如何透過繼承快速啟動，以及配置系統。

- **[第一課：Nuxt Core 導論與介面理念 (README_TEAM.md)](./README_TEAM.md)**
- **[第二課：核心配置系統 (nuxt.schema.ts)](./nuxt.schema.ts)**
- **[第三課：開發環境與 Playground 聯動 (README.md)](../../README.md)**

### 階段二：UI 與組件規範 (UI & Component Standards)

學習如何使用介面層組件，確保 UI 一致性與可替換性。

- **[第四課：UI Interface 封裝理念 (IButton.vue)](./components/uiInterface/IButton.vue)**
- **[第五課：設計系統與 Tokens (styles/)](./styles/)**
- **[第六課：透傳屬性 ($attrs) 與彈性設計 (IDataTable.vue)](./components/uiInterface/IDataTable.vue)**

### 階段三：資料映射與業務邏輯 (Data Mapping & Logic)

掌握自動化的資料層掃描與全域選項系統。

- **[第七課：Smart Client 與 API 請求 (useApi.ts)](./composables/useApi.ts)**
- **[第八課：自動化儲存庫掃描 (repositories-scanner.ts)](./modules/repositories-scanner.ts)**
- **[第九課：全域與本地選項管理 (useOptions.ts)](./composables/useOptions.ts)**

### 階段四：架構進階應用 (Advanced Layer Usage)

深入了解路由擴充、Mock Server 以及攔截器機制。

- **[第十課：動態路由掃描 (routes-scanner.ts)](./router/routes-scanner.ts)**
- **[第十一課：API 請求與回應攔截器 (interceptors/)](./utils/api/interceptors/)**
- **[第十二課：純前端 Mock 機制實作 (useApi.ts)](./composables/useApi.ts)**

### 階段五：發布與維運 (Publish & Maintenance)

了解如何維護核心包、發布至私有 Registry 以及版本管理。

- **[第十三課：NPM 套件打包與發布流程 (package.json)](./package.json)**
- **[第十四課：Git 工作流與 Commit 規範 (README.md)](../../README.md)**
- **[第十五課：疑難排解與除錯指南 (error.ts)](./utils/api/error.ts)**
- **[第十六課：CLI 工具設計原理 - 為何 `init` 不放在 scripts？ (bin/init.mjs)](./bin/init.mjs)**
  - **全域執行能力**：放到 `bin` 欄位，才能讓使用者在「沒有專案的空目錄」下，直接透過 `npx softleader-nuxt-core init` 從無到有建立專案。如果是 `scripts`，就必須先有專案且安裝了套件才能跑，這會有雞生蛋的問題。
  - **系統整合**：`bin` 腳本（搭配 `#!/usr/bin/env node`）會被 npm 註冊為命令列工具，自動建立符號連結並賦予執行權限。
  - **職責分離**：`scripts` 是給「當下這個專案」的開發者用的任務；而 `bin` 則是提供給「套件的使用者」在終端機呼叫的工具。

---

## 文件索引

### 1. 核心手冊 (必讀)

- **[團隊開發指南 (README_TEAM.md)](./README_TEAM.md)**: 小組員如何快速上手與配置。
- **[核心配置系統 (nuxt.schema.ts)](./nuxt.schema.ts)**: 配置項架構定義。
- **[核心入口 (nuxt.config.ts)](./nuxt.config.ts)**: Layer 的主配置入口。

### 2. 結構參考

- **[產品配置腳本 (scripts/product-loader.ts)](./scripts/product-loader.ts)**: 處理 JSON 配置的載入核心。
- **[自動掃描器 (modules/)](./modules/)**: Repositories 與 Options 的掃描實作。

### 3. 元件與 Composable

- **[介面層組件範例 (IButton)](./components/uiInterface/IButton.vue)**: 標準化組件實作。
- **[核心 Composable (useApi)](./composables/useApi.ts)**: 統一的 API 連線封裝。
- **[選項管理 (useOptions)](./composables/useOptions.ts)**: 全域選項代理實作。

### 4. 資料串接

- **[API 錯誤處理](./utils/api/error.ts)**: 統一的報錯處理機制。
- **[認證攔截器](./utils/api/interceptors/request.ts)**: 處理 Header 注入邏輯。

### 5. 疑難排解

- **[Repository 型別修正範例 (repositories/user.ts)](../../apps/playground-app/repositories/user.ts)**: 解決 TS 推導問題的示範。
