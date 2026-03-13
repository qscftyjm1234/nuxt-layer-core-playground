[回到首頁](../../README.md)

# 資料與分頁處理實務

本專案已封裝常用邏輯模組，處理列表資料與表單選項時，請遵守規範以單一化資料流。

## 1. 資料列表與分頁

構建包含分頁功能的資料表格時，必須使用 `usePagination` 搭配 `<IDataTable>` 組件。

**操作步驟：**

1. 取用 `usePagination` 模組。
2. 解構取得 `currentPage`, `pageSize` 與 `total`，並提供更新函式。
3. 將分頁狀態與資料傳遞給 `IDataTable`，綁定事件以觸發資料更新。

**標準範例：**

```vue
<script setup lang="ts">
const { currentPage, pageSize, total, setTotal } = usePagination()
const data = ref
const loading = ref

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '狀態', dataIndex: 'status' }
]

const fetchData = async () => {
  loading.value = true
  // const res = await api.getUsers
  // setTotal
  // data.value = res.items
  loading.value = false
}

onMounted
</script>

<template>
  <div class="page-container">
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

## 2. 下拉選單資料處理

處理下拉選單 的選項資料時，必須使用統一選項模組如 `useOptions`。

- **禁止**：在頁面中寫死各種選項陣列。
- **禁止**：在元件內自行呼叫 API 並管理選項的 loading 狀態。
- **規範**：透過專屬 Composable 統一管理選項的獲取與轉換邏輯，保持頁面元件的純粹性。
