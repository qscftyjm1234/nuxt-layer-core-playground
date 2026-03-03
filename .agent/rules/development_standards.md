---
trigger: always_on
---

# 開發規範與標準 (Development Standards)

本文件定義了 AI Agent 在生成程式碼與文件時必須遵守的行為準則。

## 一、文件與註解規範

### 1. 專業語氣

文件與註解應保持專業、精簡。

- **嚴禁使用表情符號**：不要使用任何 Emoji 符號 (如勾選、火箭、警告圖示等)。
- **避免非正式用語**：避免使用主觀形容詞。

### 2. 步驟性說明

教學或操作手冊必須採用條列式步驟，確保讀者能依序執行。

**範例：**

1. 建立頁面檔案。
2. 引入必要的工具函式。
3. 設定 UI 組件參數。
4. 測試執行結果。

---

## 二、UI 組件開發規範

本專案採用統一的組件包裝方式。

### 1. 必須使用 `uiInterface`

嚴禁在頁面或業務組件中直接使用 UI 框架的原生組件 (如 Ant Design 的 a-table, a-button)。
必須使用 `components/uiInterface/` 下的包裝組件。

**對照表：**

| 原生組件 (禁止直接使用) | 封裝組件 (必須使用) |
| ----------------------- | ------------------- |
| a-table                 | IDataTable          |
| a-button                | IButton             |
| a-input                 | IInput              |
| a-select                | ISelect             |
| a-modal                 | IModal              |

### 2. 範例比較

**錯誤 (直接依賴 Ant Design)：**

```vue
<template>
  <a-button
    type="primary"
    @click="submit"
  >
    提交
  </a-button>
</template>
```

**正確 (使用介面層)：**

```vue
<template>
  <IButton
    variant="primary"
    @click="submit"
  >
    提交
  </IButton>
</template>
```

---

## 三、模組使用規範

本專案已封裝常用邏輯模組，請勿重複造輪子。

### 1. 資料列表與分頁

必須使用 `usePagination` 搭配 `<IDataTable>`。

**步驟範例：**

1. 引入 `usePagination`。
2. 設定 `currentPage`, `pageSize` 與 `total`。
3. 將 `paginationConfig` 傳遞給 `IDataTable`。

### 2. 下拉選單資料

必須使用 `useOptions`。

- **禁止**：在頁面中寫死選項陣列。
- **禁止**：直接呼叫 API 取得選項。

### 3. API 請求

必須使用 `useApi`。

- **禁止**：直接使用 `fetch` 或 `axios`。

---

## 四、完整範例 (List Page)

以下展示一個符合所有規範的標準頁面：

```vue
<script setup lang="ts">
// 1. 引入必要模組
const { usePagination } = useModules()
const options = useOptions()

// 2. 定義資料與分頁
const { currentPage, pageSize, total, setTotal } = usePagination()
const data = ref([])
const loading = ref(false)

// 3. 定義欄位 (純資料定義)
const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '狀態', dataIndex: 'status' }
]

// 4. 資料獲取邏輯
const fetchData = async () => {
  loading.value = true
  // 使用封裝的 API 模組
  // const res = await api.getUsers({ page: currentPage.value })
  // setTotal(res.total)
  // data.value = res.items
  loading.value = false
}

onMounted(fetchData)
</script>

<template>
  <div class="page-container">
    <!-- 使用封裝組件 -->
    <IDataTable
      :columns="columns"
      :data-source="data"
      :loading="loading"
      :pagination="{ current: currentPage, total: total }"
      @change="fetchData"
    />
  </div>
</template>
```
