---
description: 核心架構同步開發流 (Architectural Core Sync Flow)
---

此工作流用於在修改 `packages/nuxt-core` 底層架構時，確保 `apps/playground-app` 同步引用並通過驗證。

## 步驟

1.  **需求分析與設計**
    - 根據架構需求，規劃 `packages/nuxt-core` 需要變動的檔案（如 Repository, Composable, Registry 等）。
    - 規劃如何在 `apps/playground-app` 中使用該新功能。

2.  **實作核心層 (Core Implementation)**
    - 修改 `packages/nuxt-core` 中的對應程式碼。
    - 若涉及型別或配置，確保 `nuxt.config.ts` 或相關 Module 已更新。

3.  **準備驗證環境 (Prepare Verification)**
    // turbo
    - 執行 `nuxi prepare` 以更新 `.nuxt` 型別宣告：

    ```powershell
    npx nuxi prepare apps/playground-app
    ```

4.  **同步應用層 (App Integration & Verification)**
    - 修改 `apps/playground-app` 的頁面、配置或代碼來引用 `nuxt-core` 的變動。
    - 啟動開發伺服器或執行建置：

    ```powershell
    npm run dev:playground
    ```

5.  **錯誤偵測與自動修復 (Error Loop)**
    - 若發生 **Exit code: 1** 或終端機出現 **ERROR**：
      - 優先跳轉執行 `/.error_checker` 工作流。
      - 根據 `troubleshooting_log.md` 修復環境或程式碼問題。
      - 修復後回到 **步驟 3** 重新驗證。

6.  **完工確認**
    - 確認 `playground-app` 運行正常且符合原始需求。
    - 更新 `walkthrough.md` 記錄變動。

## 核心準則

- **核心優先**：永遠從 `nuxt-core` 開始改動。
- **自動化修復**：遇到報錯時，在詢問使用者前必須先嘗試過 `error_checker` 中的步驟。
- **循環驗證**：任何改動後必須在 `playground-app` 看到效果才算完成。
