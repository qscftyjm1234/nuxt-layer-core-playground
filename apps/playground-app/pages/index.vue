<script setup lang="ts">
// 1. 引入必要的 Composable 模組 (遵循開發規範)
const { usePagination } = useModules()
const options = useOptions()

// 2. 定義資料與分頁
const { currentPage, pageSize, total, setTotal } = usePagination()
const loading = ref(false)
const items = ref([
  { id: 1, name: '富邦保險 - 超級意外險', type: 'accident', status: 'active', date: '2024-03-01' },
  { id: 2, name: '國泰人壽 - 終身醫療', type: 'health', status: 'pending', date: '2024-03-05' },
  { id: 3, name: '新光產物 - 汽車強制險', type: 'motor', status: 'expired', date: '2024-02-20' },
])

// 3. 定義 DataTable 欄位 (Pure Data Definition)
const columns = [
  { title: '保單名稱', dataIndex: 'name', key: 'name' },
  { title: '保險類型', dataIndex: 'type', key: 'type' },
  { title: '狀態', dataIndex: 'status', key: 'status' },
  { title: '生效日期', dataIndex: 'date', key: 'date' },
  { title: '操作', dataIndex: 'action', key: 'action' }
]

// 4. 資料獲取邏輯
const fetchData = async () => {
  loading.value = true
  // 模擬 API 請求延遲
  await new Promise(resolve => setTimeout(resolve, 800))
  setTotal(items.value.length)
  loading.value = false
}

const handleAction = (item: any) => {
  console.log('Action on:', item)
}

onMounted(fetchData)

const { formatDateTime } = useDateTime()
const now = formatDateTime(new Date())
// 輸出: 2024-03-13 10:20:00
</script>

<template>
  <IApp>
    <div class="pa-10">
      now:{{ now }}
      <div class="d-flex align-center justify-space-between mb-8">
        <div>
          <h1 class="text-h4 font-weight-bold text-indigo-darken-4 mb-2">專案測試場 (Playground)</h1>
          <p class="text-subtitle-1 text-medium-emphasis">展示 Nuxt Core Layer 的 基礎介面 (Interface) 與 業務邏輯 (Business) 元件。</p>
        </div>
        <IButton variant="primary" prepend-icon="mdi-plus" size="large">新增保單</IButton>
      </div>

      <IStack vertical gap="32">
        <!-- 核心功能展示：自動掃描選項 (useOptions) -->
        <ICard>
          <template #header>
            <div class="d-flex align-center ga-2">
              <IIcon icon="mdi-magnify-scan" color="primary" />
              <span class="text-h6 font-weight-bold">自動掃描選項測試</span>
            </div>
          </template>
          
          <div class="d-flex ga-4 flex-wrap">
            <div class="flex-grow-1" style="min-width: 250px;">
              <div class="text-caption mb-1">保險類型 (insuranceType)</div>
              <ISelect 
                v-model="items[0].type" 
                :items="options.insuranceType.value" 
                label="選擇保險類型"
              />
            </div>
            <div class="flex-grow-1" style="min-width: 250px;">
              <div class="text-caption mb-1">理賠狀態 (claimStatus)</div>
              <IChipGroup>
                <IChip 
                  v-for="item in options.claimStatus.value" 
                  :key="String(item.value)"
                  :color="item.color"
                >
                  {{ item.label }}
                </IChip>
              </IChipGroup>
            </div>
          </div>
        </ICard>

        <!-- 核心組件展示：IDataTable -->
        <ICard>
          <template #header>
            <div class="d-flex align-center ga-2">
              <IIcon icon="mdi-table" color="primary" />
              <span class="text-h6 font-weight-bold">標準資料表格 (IDataTable)</span>
            </div>
          </template>

          <IDataTable
            :columns="columns"
            :data-source="items"
            :loading="loading"
            :pagination="{ current: currentPage, total: total }"
            @change="fetchData"
          >
            <template #body-cell-status="{ value }">
              <IChip :color="value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'error'">
                {{ value.toUpperCase() }}
              </IChip>
            </template>
            <template #body-cell-action="{ record }">
              <IButton variant="text" size="small" @click="handleAction(record)">查看詳情</IButton>
            </template>
          </IDataTable>
        </ICard>

        <IAlert type="success" variant="tonal" class="mt-4">
          💡 此 Playground 已全面升級，不再直接使用 <code>v-btn</code> 或 <code>v-card</code>。
          目前所有元件皆透過 <code>nuxt-core</code> 封裝層呼叫，符合開發規範。
        </IAlert>
      </IStack>
    </div>
  </IApp>
</template>
