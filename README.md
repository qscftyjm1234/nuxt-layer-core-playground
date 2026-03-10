# Nuxt Layer Core Monorepo 開發指南 (`nuxt-layer-core-playground`)

這是一套基於 **Nuxt 3 Layer** 架構打造的企業級前端開發總部。
本專案採用 **Monorepo (NPM Workspaces)** 架構，完美分離了「核心 NPM 套件」與「本地模擬測試環境」，讓您能在享受高效率 Layer 開發體驗的同時，無須頻繁發布 NPM 即刻驗證成果。

---

## 第一部分：核心架構解析 (`packages/nuxt-core`)

`packages/nuxt-core` 是整套架構的**心臟**，所有會被打包上傳至 NPM 的核心邏輯、UI 組件與企業級系統配置皆放置於此。它是未來所有子專案的基底 (Base Layer)。

### 目錄結構與職責說明

| 目錄名稱           | 核心職責與使用情境                                                                                                                                                | 範例與位置                                                                                 |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| **`components/`**  | **共用 UI 組件庫**<br>分為 `uiInterface` (底層介面封裝) 與 `uiBusiness` (跨專案共用業務組件)。<br>_開發規範：禁止元件直接依賴特定專案的 API，需透過 Props 傳入。_ | `components/uiInterface/IButton.vue`<br>`components/uiInterface/IDataTable.vue`            |
| **`composables/`** | **核心共用邏輯 (Hooks)**<br>存放所有跨元件共用的狀態機制或工具。<br>_如 API 請求封裝、全域錯誤處理、選項取得等。_                                                 | `composables/useApi.ts`<br>`composables/useErrorHandler.ts`<br>`composables/useOptions.ts` |
| **`core/`**        | **分類後的核心設定檔**<br>將原本龐大的 `nuxt.config.ts` 依照功能拆解成多個獨立設定檔 (例如 Build, i18n, Security, Theme 等)，讓主設定檔保持乾淨好維護。           | `core/config/security.ts`<br>`core/options/registry.ts` (選項註冊表)                       |
| **`plugins/`**     | **Nuxt 插件**<br>在 Vue App 實體化時執行的全域擴充套件，如權限攔截、日誌追蹤等。                                                                                  | `plugins/security.client.ts`                                                               |
| **`modules/`**     | **自定義 Nuxt 內部模組**<br>編譯時期的擴充機制。<br>_如 `options-scanner`，負責在編譯時自動抓取子專案 `options/` 資料夾並生成型別。_                              | `modules/options-scanner.ts`                                                               |
| **`router/`**      | **路由與導航攔截**<br>包含共用的路由掃描器 (`routes-scanner.ts`) 與守衛機制。                                                                                     | `router/routes-scanner.ts`                                                                 |
| **`configs/`**     | **預設設定檔**<br>存放如 `product.json` 等預設配置，供後續深層合併參考。                                                                                          | `configs/product.json`                                                                     |
| **`utils/`**       | **純函數工具庫**<br>不依賴 Vue/Nuxt context 的輔助函式，如日期格式轉換、字串處理。                                                                                | `utils/formatters.ts`                                                                      |
| **`types/`**       | **TypeScript 型別定義**<br>核心層的全域共用 Interface 與 Type 定義。                                                                                              | `types/common.d.ts`                                                                        |

---

## 第二部分：本地模擬與應用層 (`apps/`)

`apps/` 目錄提供給開發者在「不發布至 NPM」的情況下，於本地端直接模擬、測試與撰寫文件。這些專案透過 `nuxt.config.ts` 中的 `extends: ["../../packages/nuxt-core"]` 直接繼承核心能力。

### 1. `apps/playground-app` (業務模擬沙盒)

**定位**：用於模擬真實業務專案，隨改隨測核心包邏輯與版面。

- **如何使用**：當你在 `nuxt-core` 中新增了一個組件（例如 `<IDataTable>`），請切換到此專案的 `pages/index.vue` 中將其引入並測試邊界條件。
- **擴充示範 (`options/`)**：你可以在此專案內建立 `options/taskStatus.ts`，然後在頁面中呼叫 `useOptions().taskStatus`，藉此測試核心包強大的「零配置選項合併機制」。
- **覆寫示範 (`app.config.ts`)**：在此專案的 `app.config.ts` 中修改 API 網址，測試核心包的深層覆寫 (Deep Merge) 是否正常運作。

### 2. `apps/ui-docs` (組件使用說明庫)

**定位**：專門用來展示 UI 組件與撰寫使用方式 Document 的站台。

- **如何使用**：這是一個基於 `@nuxt/content` 與核心代碼的說明手冊。當核心組件開發完畢，你應該在此專案下建立 Markdown 文件或展示範例 (Showcase)。
- **架構特點**：它不處理任何業務邏輯，是一個純淨的展示空間，確保其他團隊成員或未來子專案的開發者能快速複製貼上你的 UI 程式碼。

---

## 第三部分：標準開發流程 (Step-by-Step)

請依照以下條列式步驟，體驗從核心修改到 UI 展示的完整開發流：

### 步驟一：初始化專案環境

1. 開啟終端機，確保路徑位於專案根目錄 (`nuxt-layer-core-playground`)。
2. 執行依賴安裝指令，這會自動連結 `packages` 與 `apps` 下的所有 Workspace：
   ```bash
   npm install
   ```

### 步驟二：在本地開發與測試 (Playground)

情境：新增一個共用按鈕或修改一段底層邏輯

1. 在 `packages/nuxt-core/` 建立或修改檔案（如 `components/uiInterface/IButton.vue`）。
2. 在 `apps/playground-app/pages/index.vue` 中測試引入該檔案。
3. 啟動測試沙盒：
   ```bash
   npm run dev:playground
   ```
4. **驗證結果**：得益於 Nuxt Layer 繼承機制，你在 `nuxt-core` 的任何修改都會**熱更新 (HMR)** 到瀏覽器，**無須打包或發布 NPM**。

### 步驟三：撰寫使用手冊 (UI Docs)

情境：組件開發完成，需補上使用文件供團隊參考

1. 啟動文件展示系統：
   ```bash
   npm run dev:ui-docs
   ```
2. 進入 `apps/ui-docs/` 編寫文件與 Showcase 範例。
3. 確保團隊成員日後可以一目了然地知道元件具備哪些 Props 與 Events。

### 步驟四：發布前檢查與打包

情境：準備將核心包推上 npm registry

1. **型別檢查**：確保 TypeScript 沒有報錯。
   ```bash
   npm run typecheck
   ```
2. **風格掃描**：確保符合團隊 ESLint/Prettier 規範。
   ```bash
   npm run lint
   ```
3. **編譯打包 (`nuxt-core`)**：
   ```bash
   npm run build:core
   ```

---

## 延伸閱讀與進階指南

為了讓團隊無縫接軌這套強大架構，請參閱以下深入探討的架構決策與擴充文件：

1. **[團隊協作規則與標準 (.agent/knowledge)](.agent/knowledge/development_standards.md)**：開發組件與邏輯強制遵守的命名與結構規範。
2. **子專案獨立新增 vs 繼承擴充比較 (知識庫指南)**：判斷何時該寫新元件、何時該用 Wrapper 擴充核心元件的架構決策樹。(見 `addition_vs_extension_guide.md`)
3. **[疑難排解與常見問題 (.agent/knowledge/troubleshooting_log.md)](.agent/knowledge/troubleshooting_log.md)**：包含 TypeScript 配置、環境變數與套件衝突的解法。
