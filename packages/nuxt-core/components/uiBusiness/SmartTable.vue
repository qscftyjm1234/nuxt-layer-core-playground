<script setup lang="ts">
/**
 * 業務元件 - 智慧表格元件
 *
 * 用途：封裝表格的業務邏輯、搜尋與分頁
 * 特點：
 * - 整合 ICard, IDataTable, ITextField 等元件
 * - 自動處理資料載入與分頁 (useTableData)
 * - 支援欄位定義與自定義渲染
 */
import ICard from '../uiInterface/ICard.vue'
import ITextField from '../uiInterface/ITextField.vue'
import IDivider from '../uiInterface/IDivider.vue'
import IChip from '../uiInterface/IChip.vue'

interface Column {
  label: string
  field: string
  sortable?: boolean
  type?: 'text' | 'tag' | 'action'
}

interface Props {
  title?: string
  columns: Column[]
  data?: any[]
  api?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  api: '',
  data: () => []
})

// 使用 composable 管理表格資料
const tableData = useTableData({
  api: props.api,
  staticData: props.data
})

// 轉換 columns 格式
const headers = computed(() =>
  props.columns.map((col) => ({
    key: col.field,
    label: col.label,
    sortable: col.sortable !== false
  }))
)

// 取得欄位顏色 (for tag type)
const getTagColor = (value: string): string => {
  if (value === 'Admin') return '#1976D2'
  if (value === 'Editor') return '#4CAF50'
  return '#9E9E9E'
}

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <ICard
    v-bind="$attrs"
    :elevation="0"
    class="smart-table"
  >
    <!-- 搜尋標題區 -->
    <div class="table-header">
      <h3 class="table-title">{{ title }}</h3>
      <ITextField
        v-model="tableData.search.value"
        placeholder="搜尋..."
        class="table-search"
      />
    </div>

    <IDivider />

    <!-- 載入狀態 -->
    <div
      v-if="tableData.loading.value"
      class="table-loading"
    >
      載入中...
    </div>

    <!-- 表格內容 -->
    <div
      v-else
      class="table-wrapper"
    >
      <table class="data-table">
        <thead>
          <tr>
            <th
              v-for="col in headers"
              :key="col.key"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in tableData.items.value"
            :key="index"
            class="table-row"
          >
            <td
              v-for="col in columns"
              :key="col.field"
            >
              <!-- 標籤類型 -->
              <IChip
                v-if="col.type === 'tag'"
                size="small"
                :color="getTagColor(item[col.field])"
              >
                {{ item[col.field] }}
              </IChip>

              <!-- 預設文字 -->
              <span v-else>
                {{ item[col.field] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 空狀態 -->
      <div
        v-if="tableData.items.value.length === 0"
        class="table-empty"
      >
        無資料
      </div>
    </div>

    <!-- 分頁資訊 -->
    <div
      v-if="api && tableData.totalItems.value > 0"
      class="table-footer"
    >
      <div class="pagination-info">
        共 {{ tableData.totalItems.value }} 筆資料 (第 {{ tableData.page.value }} 頁，每頁
        {{ tableData.itemsPerPage.value }} 筆)
      </div>
    </div>
  </ICard>
</template>

<style scoped>
.smart-table {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  background: rgba(30, 41, 59, 0.4);
}

/* Header */
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
}

.table-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
  color: #f1f5f9;
}

.table-search {
  max-width: 300px;
}

/* Table */
.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: rgba(15, 23, 42, 0.6);
}

.data-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: #94a3b8;
  font-size: 0.875rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.data-table td {
  padding: 0.75rem 1rem;
  color: #e2e8f0;
  font-size: 0.875rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.table-row:last-child td {
  border-bottom: none;
}

/* States */
.table-loading,
.table-empty {
  padding: 3rem;
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
}

/* Footer */
.table-footer {
  padding: 1rem 1.5rem;
  background: rgba(15, 23, 42, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.pagination-info {
  font-size: 0.875rem;
  color: #94a3b8;
}
</style>
