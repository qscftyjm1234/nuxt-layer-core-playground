---
description: 只要核心文件 (README, technical docs) 有更動，必須同步更新 ui-docs 專案
---

# 核心文件同步流程 (Sync UI Docs Flow)

當 `packages/nuxt-core` 或專案根目錄的文件發生變更時，必須確保 `apps/ui-docs` 的內容也同步更新，以維持文件的一致性與專業度。

## 執行步驟 (Execution Steps)

1. **偵測變動 (Detection)**:
   - 檢查 `packages/nuxt-core/README.md` 或其他技術文件是否有更動。
   - 檢查系統規範 (`rule.md`, `development_standards.md`) 是否有更新。

2. **內容轉移 (Content Migration)**:
   - 將變更的核心概念同步更新至 `apps/ui-docs/content/` 下對應的 Markdown 檔案。
   - 若新增了 UI 組件規範，請在 `apps/ui-docs/content/components/` 建立對應的展示頁面。

3. **範例驗證 (Verification)**:
   - 確保在 `ui-docs` 中的 MDC (Markdown Components) 範例代碼是可以運行的。
   - 執行 `npm run dev -w ui-docs` 並開啟瀏覽器確認渲染效果。

4. **型別同步 (Type Sync)**:
   - 若更動涉及 API 或 Options 的結構，請確保在 `ui-docs` 中執行 `npx nuxi prepare` 以更新型別提示。

// turbo 5. **快速啟動 (Quick Start)**:

- 執行 `npm run dev:ui-docs` 以進入即時預覽模式。
