[返回指南總覽](../../README.md)

# 如何開始使用本模組 (安裝與啟動)

要開始進行開發或查看現有功能，請直接使用系統最外層（Root 目錄）`package.json` 提供的整合指令。

## 1. 安裝依賴 (Monorepo 初始化)

在專案根目錄下達以下指令，這會自動完成所有子專案的安裝與 Husky 鉤子的綁定：

```bash
npm install
```

> **為什麼要在最外層安裝，而不是進到 `apps` 裡面？**  
> 本專案為 Monorepo 架構，最外層的 `package.json` 設定了 `"workspaces": ["packages/*", "apps/*"]`，扮演了「中央管理處」的角色。在最外層安裝有三大不可取代的原因：
>
> 1. **建立本地捷徑**：npm 會看見 `ui-docs` 依賴了 `nuxt-core`，並自動為它們建立捷徑。這代表您在 `nuxt-core` 改 Code，其他專案的畫面會「瞬間同步更新」，不需反覆編譯！
> 2. **一次安裝，三邊搞定**：指令會自動潛入所有子專案目錄，如果您進到三個資料夾分別下 npm install，會遺失最重要的本地連結。
> 3. **綁定開發防呆機制**：安裝完畢後，會自動觸發根目錄的 `prepare` 腳本，無痛綁定 Git Hooks 與程式碼掃描規則。

## 2. 啟動開發伺服器

根據您的開發目標，選擇對應的啟動情境：

- **`npm run dev:ui-docs`** (預設 `http://localhost:3080`)：
  - **行為**：預設啟動 `apps/ui-docs` (核心功能指南)。
  - **時機**：當您在開發新的共用組件、寫新的 Composables，或是要更新文件時，請開這個來預覽結果。
- **`npm run dev`**：
  - 效果同上 (`ui-docs` 的捷徑指令)。
- **`npm run dev:playground`** (預設 `http://localhost:8081`)：
  - **行為**：啟動 `apps/playground-app` (開發練習區)。
  - **時機**：當您需要測試一個極端情境、串接特定的外部 API，但不希望這些測試髒 code 被推上 UI 正式站時使用。

## 3. 全域掃描與編譯

- **`npm run lint`** / **`npm run format`**：一次掃描並格式化 `packages/` 與 `apps/` 底下的所有程式碼。
- **`npm run build`**：一次性編譯所有支援的子專案，通常於 CI/CD 流程中使用。
