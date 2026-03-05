# Nuxt Core 開發手冊 (Team Guide)

本手冊引導小組員如何在子專案中正確使用與擴充 `nuxt-core` 核心架構。

## 一、基礎設定

### 1. 繼承核心層 (Extends)

在子專案的 `nuxt.config.ts` 中引入核心層。

```typescript
export default defineNuxtConfig({
  extends: ['softleader-nuxt-core'] // 繼承 npm 套件
  // 或本地路徑
  // extends: ['../packages/nuxt-core'],
})
```

### 2. 配置產品參數 (Configs)

在專案根目錄建立 `configs/default.json`。核心層會自動讀取此檔案並應用於全域。

- **Branding**: 設定專案名稱、Logo、UA 標記。
- **Network**: API 基礎路徑、Timeout、Retry。
- **Features**: 開關浮水印、驗證系統、Mock API。

---

## 二、進階配置與自定義 (appConfig)

我們提供了強型別的配置系統。你可以直接在 `app.config.ts` 中覆蓋核心預設值：

1. 在子專案根目錄建立 `app.config.ts`。
2. 輸入 `core` 即可享有完美的 IDE 自動補全（由核心層的 `nuxt.schema.ts` 提供）。

```typescript
export default defineAppConfig({
  core: {
    branding: {
      name: '我的子專案名稱'
    },
    layout: {
      menuStyle: 'topbar' // 這裡會有自動提示可用選項
    }
  }
})
```

---

## 三、配置分類與最佳實踐 (Config Integration)

為了讓開發更直覺，我們將配置分為「系統連線」與「視覺顯示」兩大類。底層會自動從 `default.json` 讀取並分發。

### 1. 配置分類建議表

| 類別         | 設定項目                         | 推薦存放處(JSON)   | 存取方式 (Composable)            |
| :----------- | :------------------------------- | :----------------- | :------------------------------- |
| **品牌識別** | 專案名稱、Logo、Favicon、UA 標記 | `branding`, `meta` | `useAppConfig().core.branding`   |
| **版面控制** | 選單樣式、寬度、Footer 開關      | `layout`           | `useAppConfig().core.layout`     |
| **功能開關** | 浮水印、Auth、Mock API           | `features`         | `useAppConfig().core.features`   |
| **連線參數** | API Base URL、Timeout、Retry     | `network`          | `useRuntimeConfig().public.api`  |
| **身分安全** | Token Key、Max Age               | `auth`             | `useRuntimeConfig().public.auth` |

### 2. 開發者使用指南 (組員必讀)

- **情境 A：我要改網頁標題或主題顏色**
  - **優先改**：`app.config.ts` (因為 IDE 會自動提示你有哪些選項)。
  - **想要全域生效**：改 `configs/default.json`。
- **情境 B：我要改 API 連線路徑或超時時間**
  - **改**：`configs/default.json`。
  - **環境區分**：改 `.env` 並在 `nuxt.config.ts` 中映射至 `runtimeConfig`。
- **情境 C：我要動態判斷某功能是否開放**
  - **代碼**：`const { mockApi } = useAppConfig().core.features`。

---

## 3. 在 `nuxt.config.ts` 定義 `runtimeConfig`

只有寫在 `runtimeConfig` 裡的變數才能安全地在伺服器端存取，且不會洩漏給前端（除非放進 `public` 區塊）。

### 4. 維護規範 (重要)

- **新增環境變數**：若基底包新增了環境變數，請務必更新 [scripts/setup-env.mjs](file:///c:/Users/gino.huang/Desktop/nuxt-layer-core-playground/scripts/setup-env.mjs) 中的 `defaultContent`。這會確保所有組員在執行 `npm install` 時都能強制收到最新的範本。
- **網路變數建議**：`.env` 中的 `VITE_API_BASE_URL` 等網路變數，在開發階段建議保持「註解」或「預設即可」。我們優先推崇透過 `default.json` 的 `proxy` 機制來處理連線，以避免跨域問題。

---

## 四、配置存取與使用指南 (Config Usage)

針對 `runtimeConfig` 與 `appConfig` 的使用時機，請遵循以下原則：

| 特性         | `runtimeConfig` (系統設備)           | `appConfig` (裝潢風格)                   |
| :----------- | :----------------------------------- | :--------------------------------------- |
| **存放內容** | API 網址、連線超時、伺服器金鑰。     | 品牌標題、Logo 路徑、UI 功能開關。       |
| **安全性**   | **高**。支援私有變數 (Server-only)。 | **低**。完全公開給瀏覽器，嚴禁放金鑰。   |
| **IDE 支援** | **無提示**。手打容易寫錯 Key。       | **超強提示**。配合 `core.` 有完美補全。  |
| **響應式**   | 低。啟動後通常不建議動態修改。       | **高**。修改後畫面上所有元件會立刻連動。 |

---

## 五、環境變數與資安規範 (Security & ENV)

針對敏感資料與環境切換，請遵守以下規則：

### 1. 嚴禁將敏感資料放進 `appConfig`

`app.config.ts` 與 `configs/default.json` 中的內容會被打包進前端 JS，所有人都能看見。**API Key、金鑰、資料庫密碼** 等嚴禁寫在這些地方。

### 2. 使用 `.env` 管理環境變數

請在子專案根目錄建立 `.env` 檔案：

```bash
# .env
NUXT_API_SECRET_KEY=yoursecretkey123
VITE_API_BASE_URL=https://api.example.com
```

---

## 六、儲存庫開發 (Repositories)

核心具備 **自動掃描 (Auto-scanner)** 功能，你只需專注於定義請求邏輯。

1. 在 `repositories/` 資料夾下建立 `.ts` 檔案（例如 `user.ts`）。
2. 使用 `useClient` 建立具備路徑前綴的客戶端。

```typescript
// repositories/user.ts
const api = useClient('/users')

const userRepository = {
  getUsers(params = {}) {
    return api.get<UserListResponse>('/', { query: params })
  }
}

export default userRepository
```

---

## 七、下拉選單與選項管理 (Options)

禁止在頁面中寫死選單資料。請利用 `useOptions` 系統：

1. 在頁面或組件中註冊本地選項：

```typescript
const options = useOptions()
options.registerLocalOptions({
  status: [
    { label: '啟用', value: 'Y' },
    { label: '停用', value: 'N' }
  ]
})
```

---

## 八、UI 組件使用規範

**嚴禁直接使用底層 UI 框架元件**（如 `a-button`, `v-btn`）。必須使用 `components/uiInterface/` 下的封裝組件。

| 核心組件             | 說明                                              |
| :------------------- | :------------------------------------------------ |
| `IButton`            | 標準按鈕，支援 `variant="primary"` 等語意化參數。 |
| `IDataTable`         | 資料表格，支援 `columns` 配置與自動 Loading。     |
| `IInput` / `ISelect` | 表單控制項，自動整合設計系統樣式。                |

---

## 九、疑難排解 (Troubleshooting)

1. **語法錯誤**：IDE 是否有紅字提示？
2. **配置路徑**：`configs/default.json` 的路徑是否正確？
3. **自動提示失效**：請嘗試重新執行 `npx nuxi prepare` 以刷新類型宣告。
