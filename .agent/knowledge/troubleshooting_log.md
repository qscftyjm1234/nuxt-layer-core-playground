# 問題排查知識庫 (Troubleshooting Knowledge Base)

此檔案記錄重複發生的問題、根本原因以及最佳解決方案，幫助 AI Agent 和開發者更快地解決問題。

## 常見問題 (Recurring Issues)

### 1. Cannot read properties of undefined (reading 'builder')

- **發現日期**: 2026-02-26
- **症狀**: 執行 `npm run dev` 失敗，並顯示 "ERROR Cannot read properties of undefined (reading 'builder')"。
- **根本原因**: 環境衝突。Nuxt 偵測到父目錄（例如 `C:\Users\gino.huang\node_modules`）中存在 `node_modules` 或 `package.json`，並嘗試從該處載入依賴項，而非從專案本地載入。
- **最佳解決方案**:
  1. 刪除父目錄的 `node_modules` 資料夾：`Remove-Item -Recurse -Force C:\Users\gino.huang\node_modules` (PowerShell)。
  2. 如果不需要，刪除父目錄的 `package.json`：`Remove-Item C:\Users\gino.huang\package.json`。
  3. 在專案目錄執行 `npx nuxi clean`。
  4. 如有必要，重新執行 `npm install`。
- **預防措施**: 避免在使用者首目錄 (User Home) 執行 `npm install` 或 `npm init`。
- **最後更新狀態 (2026-03-03)**: 已手動清理 `C:\Users\gino.huang` 下殘留的 `node_modules` 與 `softleader-nuxt-core` 相關配置，徹底排除父目錄干擾。

---

### 10. Delete `␍` 與 ESLint 提交失敗 (CRLF & ESLint Type-Aware Error)

- **發現日期**: 2026-03-05
- **症狀**:
  1. ESLint 報錯 `Delete ␍ @[path/to/file:LX]`。
  2. Git Commit 時報錯 `Rule: "@typescript-eslint/naming-convention" requires type information`。
  3. 修改後報錯 `Parsing error: ... was not found by the project service`。
  4. Git Commit 在 Windows 下出現 `fatal: Needed a single revision`。
- **根本原因**:
  1. Windows 環境下使用了 CRLF (`\r\n`) 換行符號。
  2. ESLint v8+ 的 `projectService` 需要明確知道哪些檔案屬於哪些 `tsconfig`，對於不在專案內的設定檔會報錯。
  3. `lint-staged` 在 Windows 下執行備份 (stash) 時有機會失敗。
- **最佳解決方案**:
  1. **換行符號**：將受影響檔案轉換為 LF，並在根目錄建立 `.gitattributes` 設定 `* text=auto eol=lf`。
  2. **ESLint 配置**：在 `parserOptions.projectService` 中加入 `allowDefaultProject` 指定設定檔，例如：`allowDefaultProject: ['*.config.mjs']`。
  3. **Git 錯誤**：在 `.husky/pre-commit` 中對 `lint-staged` 加入 `--no-stash`。
- **預防措施**: 單一存儲庫 (Monorepo) 應統一處理 Hook 路徑與換行符號規範。

### 11. TypeScript Config 讀取失敗與 vue-tsc 報錯

- **發現日期**: 2026-03-05
- **症狀**:
  1. 終端機報錯 `failed to resolve "extends":"../../../tsconfig.base.json"`。
  2. `vue-tsc` 噴出大量 `PropertyKey | undefined` 或 `unknown` 型別錯誤。
- **根本原因**:
  1. 根目錄遺失 `tsconfig.base.json`。
  2. 部分 UI 元件 (如 `BDataTable`, `ITextarea`) 的事件或 Prop 型別宣告不夠嚴謹 (例如 `v-for` 的 `key` 使用了 `string | number | boolean` 作為 `PropertyKey`)。
- **最佳解決方案**:
  1. **補回設定**：在根目錄重新建立 `tsconfig.base.json`。
  2. **關閉背景檢查**：在 `nuxt.config.ts` 中暫時設定 `typescript: { typeCheck: false }` 以加速開發並減少噪音。
  3. **修正型別**：確保 `v-for` 的 `:key` 使用 `String()` 或 `Number()` 強制轉型，或在 Prop 中使用 `PropType`。
- **預防措施**: 確保專案層次的 `extends` 路徑正確，並在開發期間適度調整型別檢查強度。

### 2. Property 'xxx' does not exist on type 'Options'

- **發現日期**: 2026-03-04
- **症狀**: 在頁面中使用 `useOptions()` 取得自動掃描的專案選項時，TypeScript 報錯屬性不存在。
- **根本原因**: `options-scanner.ts` 生成的 `.d.ts` 語法錯誤。在 `interface CustomOptions` 中使用了不合法的 mapped type 語法 `[K in keyof typeof optX]: any`。
- **最佳解決方案**: 修改 `packages/nuxt-core/modules/options-scanner.ts`，將 `CustomOptions` 改為透過 `extends` 合併多個匯出的型別：`interface CustomOptions extends typeof opt0, typeof opt1 {}`。
- **預防措施**: 在生成型別定義時需遵守 TypeScript interface 語法限制，若需要合併多個型別，應優先使用 `extends` 或 `type` 交集。

---

### 12. ERR_MODULE_NOT_FOUND (client.manifest.mjs)

- **發現日期**: 2026-03-05
- **症狀**: 終端機報錯 `Cannot find module '.\.nuxt\dist\server\client.manifest.mjs'`。
- **根本原因**:
  1. `.nuxt` 資料夾中的快取或建置產物損壞。
  2. 多個 `npm run dev` 進程同時執行導致檔案鎖定或建置不完整。
- **最佳解決方案**:
  1. 強制結束所有執行中的 Node 進程：`Get-Process node | Where-Object { $_.CommandLine -like "*nuxt-layer-core-playground*" } | Stop-Process -Force`。
  2. 刪除 `.nuxt` 資料夾。
  3. 重新執行 `npx nuxi prepare` 以整合 Layer 元件型別。
  4. 重新啟動 `npm run dev`。
- **預防措施**: 避免手動中斷建置過程，並確保關閉舊的開發伺服器後再啟動新的。

### 13. Unable to load schema (defineNuxtSchema is not a function)

- **發現日期**: 2026-03-05
- **症狀**: 終端機報錯 `Unable to load schema from .../nuxt.schema.ts (0 , _schema.defineNuxtSchema) is not a function`。
- **根本原因**:
  1. 在 Nuxt 3 Layer 中，直接從 `@nuxt/schema` 導入 `defineNuxtSchema` 時，由於 `jiti` 配置或模組解析問題，可能導致導入的函式為 `undefined`。
- **最佳解決方案**:
  - 將導入來源從 `@nuxt/schema` 改為 `nuxt/schema`。
  - 修改 `nuxt.schema.ts` 頂部導入：`import { defineNuxtSchema } from 'nuxt/schema'`。
- **預防措施**: 確保在 Nuxt 3/4 環境中優先使用 `nuxt/schema` 進行架構定義，以保證與 `jiti` 的最佳相容性。

---
