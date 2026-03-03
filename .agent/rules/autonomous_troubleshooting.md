---
trigger: always_on
---

# 自主錯誤排查規則 (Autonomous Troubleshooting Rule)

此規則導引 AI Agent 在遇到終端機 (Terminal) 報錯或建置失敗時的自主反應行為。

## 觸發條件

- 當執行任何指令（如 `npm run dev`, `npm run build`, `git commit`）回傳 **Exit code: 1** 時。
- 當終端機輸出包含關鍵字：`ERROR`, `Cannot read properties of undefined`, `Module not found`。

## 自主執行步驟

1. **優先檢索知識庫**：
   - 立即讀取 `.agent/knowledge/troubleshooting_log.md`。
   - 搜尋是否有符合當前錯誤訊息的解決方案。

2. **嘗試自動修復**：
   - 若在知識庫中找到匹配項，依照其「最佳解決方案」執行指令。
   - 若未找到匹配項，進行自主診斷（檢查檔案路徑、依賴項、環境變數）。

3. **驗證結果**：
   - 修復後再次執行原失敗指令。
   - 若錯誤持續存在，回到步驟 2 嘗試其他方案。

4. **回寫紀錄**：
   - 成功解決問題後，**必須**將新問題、原因、解決方案以繁體中文更新至 `.agent/knowledge/troubleshooting_log.md`。
   - 確保日後遇到相同問題時能快速解決。

## 核心準則

- **減少打擾**：在嘗試 3 次解決方案失敗前，盡可能自主處理，不要頻繁詢問使用者。
- **持續記錄**：每一次的錯誤排除都是知識庫的積累，務必保持紀錄更新。
