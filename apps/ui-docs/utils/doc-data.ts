export interface ComponentApiDoc {
  name: string
  description: string
  importPath: string
  props: Array<{ name: string, type: string, default: string, desc: string }>
  emits: Array<{ name: string, payload: string, desc: string }>
  slots: Array<{ name: string, desc: string }>
  codeExample: string
}

// 模擬資料庫
export const componentDocs: Record<string, ComponentApiDoc> = {
  IButton: {
    name: 'IButton',
    description: '核心按鈕元件，提供多種變化型、圖示與載入狀態支援。',
    importPath: 'import { IButton } from "#components"',
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'outlined' | 'text'", default: "'primary'", desc: '按鈕視覺樣式' },
      { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", desc: '按鈕尺寸' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '是否禁用按鈕' },
      { name: 'loading', type: 'boolean', default: 'false', desc: '是否顯示載入中狀態' },
      { name: 'icon', type: 'string', default: 'undefined', desc: '按鈕圖示的名稱' }
    ],
    emits: [
      { name: 'click', payload: 'MouseEvent', desc: '當點擊按鈕但未處於 disabled 或 loading 時觸發' }
    ],
    slots: [
      { name: 'default', desc: '按鈕的預設文字內容' },
      { name: 'prepend', desc: '在文字之前加入自訂內容（如圖示）' },
      { name: 'append', desc: '在文字之後加入自訂內容' }
    ],
    codeExample: `
<template>
  <div class="flex gap-4">
    <IButton variant="primary">提交</IButton>
    <IButton variant="outlined" icon="mdi:close">取消</IButton>
    <IButton loading>處理中...</IButton>
  </div>
</template>
    `.trim()
  },
  'IDataTable': {
    name: 'IDataTable',
    description: '強大的資料表格元件，內建分頁、排序與自訂欄位渲染功能。',
    importPath: 'import { IDataTable } from "#components"',
    props: [
      { name: 'columns', type: 'Array<TableColumn>', default: '[]', desc: '表格欄位設定' },
      { name: 'dataSource', type: 'Array<any>', default: '[]', desc: '要顯示的資料陣列' },
      { name: 'loading', type: 'boolean', default: 'false', desc: '是否為讀取中狀態' },
      { name: 'pagination', type: 'PaginationConfig | false', default: 'false', desc: '分頁設定物件。若為 false 則隱藏分頁' }
    ],
    emits: [
      { name: 'change', payload: '{ current, pageSize }', desc: '當分頁、排序改變時觸發' },
      { name: 'row-click', payload: 'record', desc: '當點擊資料列時觸發' }
    ],
    slots: [
      { name: 'bodyCell', desc: '自訂特定欄位的渲染內容' },
      { name: 'emptyText', desc: '當沒有資料時顯示的內容' }
    ],
    codeExample: `
<script setup lang="ts">
const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '狀態', dataIndex: 'status' }
]
const data = ref([{ name: '張三', status: '啟用' }])
</script>

<template>
  <IDataTable
    :columns="columns"
    :data-source="data"
    :pagination="{ current: 1, total: 50 }"
    @change="fetchData"
  >
    <template #bodyCell="{ column, record }">
      <span v-if="column.dataIndex === 'status'" class="text-blue-500">
        {{ record.status }}
      </span>
    </template>
  </IDataTable>
</template>
    `.trim()
  }
}

export function getComponentDoc(name: string): ComponentApiDoc | null {
  return componentDocs[name] || null
}
