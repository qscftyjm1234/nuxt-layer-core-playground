---
description: 安全更新或降級 npm 套件，失敗自動還原，成功自動更新文件
---

# 安全套件更新流程 (Safe Package Update)

此 Workflow 用於安全地更新或降級 npm 套件。它會執行安裝、驗證建置，並在失敗時自動還原，成功時更新文件。

## 1. 準備工作 (Pre-check)

在執行任何變更之前，請確保工作目錄是乾淨的，以免還原時遺失未透過 Git 追蹤的檔案。

1.  執行 `git status --porcelain`。
2.  如果輸出 **不為空**，請**停止執行**，並請使用者先 Commit 或 Stash 變工。
    - _原因_：為了確保 `git checkout .` 只會還原本次嘗試的變更，不會誤刪使用者的未存檔工作。

## 2. 執行安裝 (Action)

詢問使用者要更新哪個套件以及目標版本（例如：`npm install package@version`）。

1.  執行使用者指定的安裝指令。
    - 例如：`npm install <package_name>@<version>`
    - 或者：`npm install <package_name>` (安裝最新版)

## 3. 驗證變更 (Verification)

安裝完成後，必須驗證專案是否正常。

1.  執行 `npm run build`。
2.  觀察指令的 Exit Code。

## 4. 結果處理 (Result Handling)

### 🔴 如果 Build 失敗 (Exit Code != 0)

代表此版本與專案不相容。

1.  **執行還原**：
    ```bash
    git checkout package.json package-lock.json
    ```
2.  **通知使用者**：
    > "安裝 `<package_name>@<version>` 後導致建置失敗，已自動還原變更。請檢查錯誤訊息或嘗試其他版本。"

### 🟢 如果 Build 成功 (Exit Code == 0)

代表此版本相容，可以保留。

1.  **取得安裝的版本號**：
    - 讀取 `package.json` 確認該套件當前的版本。
2.  **更新文件**：
    - 讀取 `docs/guides/package-guide.md`。
    - 找到該套件在表格中的列。
    - 更新 **版本** 欄位為新的版本號。
    - (選擇性) 如果安裝指令改變（例如套件名稱變更），也請一併更新。
3.  **通知使用者**：
    > "成功安裝 `<package_name>@<version>` 並通過建置驗證。文件 `docs/guides/package-guide.md` 已更新。"
