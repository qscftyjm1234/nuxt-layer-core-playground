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

_請使用相同格式在下方新增項目。_
