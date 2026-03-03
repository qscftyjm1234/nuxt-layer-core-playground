---
description: 自動化錯誤檢查與疑難排解 (Automated Error Check and Troubleshooting)
---

此工作流指導 AI Agent 或開發者在建置、Commit 或開發伺服器失敗時進行一系列檢查。

### 步驟

1. **檢查環境衝突**
   // turbo
   執行診斷腳本檢查父目錄衝突：

```powershell
node scripts/check-conflicts.mjs
```

2. **諮詢知識庫**
   如果腳本失敗或遇到已知錯誤（如 "builder" 未定義），請查看 `troubleshooting_log.md`：

```powershell
cat .agent/knowledge/troubleshooting_log.md
```

3. **驗證本地端 Node Modules**
   確保目前專案的依賴項已正確安裝。
   檢查 `.nuxt` 目錄是否存在，若不存在請執行：

```powershell
npm run postinstall
```

4. **清理並重新安裝（最後手段）**
   如果問題持續存在，執行專案的清理指令：

```powershell
npm run reinstall
```

5. **回寫與更新知識庫**
   解決問題後，務必將過程記錄回 `.agent/knowledge/troubleshooting_log.md`。

```powershell
# 範例：將新問題記錄至 log
# 編輯 .agent/knowledge/troubleshooting_log.md 並提交
```

### 目的

此工作流確保常見的環境問題能被及早發現，並重複使用先前的解決方案，形成自動化修復循環。
