[回到首頁](../../README.md) | [上一篇：狀態管理設計](12-state-storage.md)

# 從零開始發布 npm 套件指南

本指南專為**接手此核心庫**或**需要將此核心庫發布到不同儲存庫 (Registry)** 的組員所準備。若您尚未具備 npm 發布經驗，或團隊內部變更了 npm 伺服器 (如自建 Verdaccio、私有 Nexus 等)，請依照此文件的步驟「從零開始」設定與發布。

---

## 1. 環境與帳號準備

### 1.1 確認 Node.js 與 npm 版本
請確保您的開發環境已安裝合適的 Node.js (建議 `>= 18.0.0`) 與 npm。
```bash
node -v
npm -v
```

### 1.2 準備 npm 帳號
如果您要發布到公開的 [npmjs.com](https://www.npmjs.com/)，請先至官網註冊帳號。
如果是團隊私有的 npm 儲存庫（如 Verdaccio），請向管理員索取帳號密碼。

---

## 2. 登入 npm 儲存庫 (Registry)

在發布之前，您的終端機必須取得發布權限。

### 2.1 預設官方 Registry (npmjs.com)
若發布到官方 npm，請直接輸入以下指令登入：
```bash
npm login
```
*系統會提示您輸入 Username, Password 以及 Email。*

### 2.2 私有 Registry (自建儲存庫)
若團隊未來將套件發布到私有伺服器 (例如：`https://npm.your-company.com/`)，請在登入時指定 `registry`：
```bash
npm login --registry=https://npm.your-company.com/
```
接著，建議您在專案根目錄建立 `.npmrc` 檔案，固定專案的發布位置與權限配置：
```ini
# .npmrc
registry=https://npm.your-company.com/
```

---

## 3. 確認與修改 package.json

發布前，請務必進入核心包目錄檢查設定：
```bash
cd packages/nuxt-core
```
打開此目錄下的 `package.json`，對齊以下關鍵欄位：

1. **`name` (套件名稱)**
   若換了儲存庫或是要改名發布，請確保該名稱尚未被佔用。
   *若為組織套件 (Scoped Package)，格式為 `@您的組織/套件名稱`。*

2. **`version` (版本號)**
   全新發布通常從 `1.0.0` 或 `0.1.0` 開始。若該版本號已在遠端存在，將無法重複發布，必須修改此數字。

3. **`private` (私有標記)**
   如果要將套件發布出去，此檔案 **不可** 包含 `"private": true`。請確認 `packages/nuxt-core/package.json` 中沒有此欄位，或是設為 `false`。

4. **`publishConfig` (發布設定 - 可選)**
   若您使用的是組織套件 (如 `@softleader/nuxt-core`) 但要在公開 npm 發布，需要加上以下設定：
   ```json
   "publishConfig": {
     "access": "public",
     "registry": "https://registry.npmjs.org/"
   }
   ```

---

## 4. 執行發布

設定完成後，您可以透過以下兩種方式進行發布：

### 方法一：使用現成腳本 (推薦)
我們在 `packages/nuxt-core` 內有提供自動化腳本。若不打算手動改版號，可直接執行：
```bash
npm run release
```
該腳本會自動協助您推出版號並執行 `npm publish`。

### 方法二：純手動發布
如果您想完全手動控制：
```bash
# 確保您在 packages/nuxt-core 目錄下
npm publish
```

### 常見錯誤排解
- **`403 Forbidden`**: 通常是因為您沒有該套件名稱的權限、名稱被他人佔用、或您尚未進行 `npm login`。若是發布 `@org/package`，請確認您已加入該 npm 組織或有配置 `publishConfig`。
- **`404 Not Found` (指向 registry)**: 可能是 registry 網址錯誤，請檢查 `.npmrc` 或是登入時的 `--registry` 參數。
- **`Duplicate version`**: 您嘗試發布的版本號已經存在，不能覆蓋舊版本。請使用 `npm version patch` (或 minor/major) 提升版本號後再次發布。

---

## 5. 驗證發布成功

發布完成後，您可以在任何空白目錄嘗試安裝，確認組員能否順利取得您發布的最新套件：
```bash
npm install 您的套件名稱@latest
```
恭喜！您已成功完成從零開始的 npm 套件發布與設定。
