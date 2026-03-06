<script setup lang="ts">
import { useDisplay } from 'vuetify'
import type { PropType } from 'vue'
import { tableActionBtnsConfig } from '../../utils/config/table-action-btns'
// 引用專案內的 uiInterface 組件
import IDataTable from '../uiInterface/IDataTable.vue'
import IButton from '../uiInterface/IButton.vue'
import { sCommon } from '../../stores/common'

const common = sCommon()
const formatter = useFormatter()

/** 透過外部插件注入的數據 */
const { mdAndUp } = useDisplay()

defineOptions({
  inheritAttrs: false
})

const emit = defineEmits({
  'update:conditions': (value) => typeof value === 'object',
  'update:serverItems': (value) => Array.isArray(value),
  'update:searchConditions': (value) => typeof value === 'object',
  'update:clearConditions': (value) => typeof value === 'object'
})

const props = defineProps({
  conditions: {
    type: Object,
    default: () => ({})
  },
  defaultParams: {
    type: Object,
    default: () => ({})
  },
  noClearParams: {
    type: Array,
    default: () => []
  },
  btns: {
    type: Array,
    default: () => []
  },
  sListApi: {
    type: [String, Function],
    default: ''
  },
  pathParams: {
    type: Object,
    default: () => ({})
  },
  isPaged: {
    type: Boolean,
    default: true
  },
  isFilter: {
    type: Boolean,
    default: true
  },
  items: {
    type: [Array, Boolean],
    default: false
  },
  isSingleSelect: {
    type: Boolean,
    default: false
  },
  autoSearch: {
    type: Boolean,
    default: true
  },
  waitSearch: {
    type: Boolean,
    default: false
  },
  clearFunction: {
    type: Function
  },
  sortBy: {},
  groupBy: {},
  flatMap: String,
  fixedFirstHeader: {
    type: Boolean,
    default: true
  },
  headers: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  showSelect: {
    type: Boolean,
    default: false
  },
  itemExport: {
    type: Function
  },
  density: {
    type: String,
    default: 'default'
  },
  chipFormatters: {
    type: Object,
    default: () => ({})
  },
  searchLabels: {
    type: Object,
    default: () => ({})
  }
})

// 表格數據管理
const loading = ref(false)
const serverItems = ref<any[]>([])
const totalItems = ref(0)
const selectedItems = ref<any[]>([])
const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: []
})

const initConditions = ref(null)
const searchBtnConditions = ref(null)
const clickSearch = ref(false)
const firstLoadDone = ref(false)
const isExpanded = ref(false) // 篩選展開狀態
const currentDensity = ref(props.density) // 從 prop 初始化
const visibleHeaders = ref<string[]>([])

watch(
  () => props.density,
  (val) => {
    if (val) currentDensity.value = val
  }
)

watchEffect(() => {
  if (props.headers && props.headers.length > 0 && visibleHeaders.value.length === 0) {
    visibleHeaders.value = props.headers.map((h: any) => h.key)
  }
})

// 初始化
watch(
  props.conditions,
  (newValue) => {
    if (!initConditions.value) {
      nextTick(() => {
        if (newValue) {
          initConditions.value = JSON.parse(JSON.stringify(newValue))
          searchBtnConditions.value = JSON.parse(JSON.stringify(newValue))
        }
      })
    }
  },
  { deep: true, immediate: true }
)

const isMdAndUp = computed(() => mdAndUp.value)

const actionBtnsList = computed(() => {
  const { btns } = props
  if (!btns.length) return []
  return btns
    .map((item: any) => {
      const foundBtn = tableActionBtnsConfig.find(({ type }) => type === item.type)
      if (foundBtn) {
        return {
          ...foundBtn,
          path: item.path || foundBtn.path,
          desc: item.desc || foundBtn.desc,
          color: item.color || foundBtn.color,
          icon: item.icon || foundBtn.icon,
          handle: item.handle || foundBtn.handle,
          updateStatus:
            item.type === 'status' || item.type === 'del'
              ? item.updateStatus || foundBtn.updateStatus
              : undefined
        }
      }
      return null
    })
    .filter(Boolean) as any[]
})

const tableColumns = computed(() =>
  props.headers
    .filter((h: any) => visibleHeaders.value.includes(h.key))
    .map((h: any) => ({
      ...h,
      key: h.key,
      label: h.title || '',
      sortable: h.sortable
    }))
)

const doFetch = async (type?: string) => {
  try {
    if (!firstLoadDone.value) {
      if (!props.autoSearch && !type) return
      firstLoadDone.value = true
    }

    if (props.waitSearch && !props.conditions.productGroupTypes) return

    const { page, itemsPerPage, sortBy } = options.value

    const conditions =
      type !== 'page'
        ? JSON.parse(JSON.stringify(props.conditions))
        : searchBtnConditions.value || JSON.parse(JSON.stringify(props.conditions))

    const params = Object.fromEntries(
      Object.entries({
        ...conditions,
        page: page - 1,
        size: props.conditions.size || itemsPerPage,
        sort:
          sortBy?.map((item: any) => `${item.key},${item.order}`).join(',') ||
          (props.sortBy as any)?.map((item: any) => `${item.key},${item.order}`).join(',')
      }).filter(([_, value]) => value !== null && value !== undefined && value !== '')
    )

    loading.value = true

    let response
    if (typeof props.sListApi === 'function') {
      response = await props.sListApi(params)
    }

    loading.value = false

    if (Array.isArray(response)) {
      serverItems.value = response
    } else if (response?.data && Array.isArray(response.data)) {
      serverItems.value = response.data
    } else if (response?.data?.content && Array.isArray(response.data.content)) {
      serverItems.value = props.flatMap
        ? response.data.content.flatMap((item: any) => item[props.flatMap!])
        : response.data.content
    }

    emit('update:serverItems', serverItems.value)
    totalItems.value = response?.data?.totalElements || 0
    clickSearch.value = false
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}

const doClear = (isClose = false) => {
  options.value.page = 1
  if (props.clearFunction) {
    props.clearFunction()
    searchBtn('clear')
  } else {
    if (props.conditions) {
      const cleared = JSON.parse(JSON.stringify(initConditions.value || {}))
      // 直接修改屬性以支援舊有 Reactive Object 傳遞模式
      Object.keys(props.conditions).forEach((key) => {
        props.conditions[key] = cleared[key]
      })
      emit('update:conditions', { ...props.conditions })
    }
    emit('update:clearConditions', initConditions.value)
    if (!isClose) {
      nextTick(() => {
        searchBtn('clear')
      })
    }
  }
}

const searchBtn = async (type = 'btn') => {
  options.value.page = 1
  await doFetch(type)
  searchBtnConditions.value = JSON.parse(JSON.stringify(props.conditions))
  emit('update:searchConditions', searchBtnConditions.value)
}

const onUpdateOptions = (newOptions: any) => {
  options.value = { ...options.value, ...newOptions }
  doFetch('page')
}

const onUpdateItemsPerPage = () => {
  options.value.page = 1
  doFetch('page')
}

const activeFilters = computed(() => {
  if (!props.conditions) return []
  return Object.entries(props.conditions)
    .filter(([key, value]) => {
      // 過濾掉空值/null/undefined
      if (
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0) ||
        value === ''
      )
        return false
      return true
    })
    .map(([key, value]) => {
      // 嘗試優先從 searchLabels 尋找標籤，再從 headers 尋找
      const labelFromMap = props.searchLabels && props.searchLabels[key]

      let header: any = null
      if (!labelFromMap) {
        header =
          props.headers.find((h: any) => h.key === key) ||
          props.headers.find(
            (h: any) => key.endsWith('In') && h.key === key.substring(0, key.length - 2)
          )

        // 處理 Start / End 結尾的欄位對應到原 Header
        if (!header && (key.endsWith('Start') || key.endsWith('End'))) {
          const baseKey = key.replace(/Start$|End$/, '')
          const foundHeader: any = props.headers.find((h: any) => h.key === baseKey)
          if (foundHeader) {
            header = Object.assign({}, foundHeader, {
              title: `${foundHeader.title || ''}(${key.endsWith('Start') ? '起' : '迄'})`
            })
          }
        }
      }

      const label = labelFromMap || (header ? (header as any).title : key)

      // 格式化數值
      let displayValue = value
      const isProductGroupKey = key.toLowerCase().includes('productgroup')

      if (value instanceof Date) {
        displayValue = formatter.formatToMinguoDate(value)
      } else if (Array.isArray(value)) {
        if (isProductGroupKey && value.length >= 2) {
          displayValue = '全部'
        } else {
          displayValue = value.map((v) => common.getProductGroupText(v) || v).join(', ')
        }
      } else if (isProductGroupKey) {
        displayValue = common.getProductGroupText(value) || value
      } else if (key === 'status') {
        displayValue = common.statusText(value) || value
        if (value === 'Y') displayValue = '是'
        else if (value === 'N') displayValue = '否'
      }

      // 支援外部注入的 chip 格式化器
      let hideValue = false
      if (props.chipFormatters && props.chipFormatters[key]) {
        const formatter = props.chipFormatters[key]
        if (typeof formatter === 'function') {
          const result = formatter(value)
          if (typeof result === 'object' && result !== null) {
            if (result.text !== undefined) displayValue = result.text
            if (result.hideValue !== undefined) hideValue = result.hideValue
          } else {
            displayValue = result
          }
        } else if (typeof formatter === 'object') {
          // Map logic
          if (formatter[value]) displayValue = formatter[value]
        } else if (formatter === 'label-only') {
          hideValue = true
        }
      }

      const closable = !props.noClearParams.includes(key)

      return { key, label, value: displayValue, closable, hideValue }
    })
})

const removeFilter = (key: string) => {
  if (props.noClearParams.includes(key)) return

  if (props.conditions && props.conditions[key] !== undefined) {
    // 直接修改屬性以確保同步
    if (Array.isArray(props.conditions[key])) {
      props.conditions[key] = []
    } else {
      props.conditions[key] = ''
    }
    emit('update:conditions', { ...props.conditions })
    nextTick(() => {
      searchBtn('btn')
    })
  }
}

const headerHeight = computed(() => {
  let height = 56
  if (activeFilters.value.length > 0) {
    height += 48
  }
  return height
})
</script>

<template>
  <div
    class="s-data-table-new"
    :class="$attrs.class"
    :style="$attrs.style"
  >
    <!-- 統一專業儀表板卡片 -->
    <div class="unified-card">
      <!-- 佈局變革：雙行策略（針對側邊欄進行簡化） -->
      <div class="ui-data-table-header">
        <!-- 第一行：指令面板（全域操作與篩選觸發） -->
        <div
          class="d-flex align-center justify-space-between px-4 py-2 bg-white"
          style="border-bottom: 1px solid var(--color-gray-100, #f1f5f9); min-height: 56px"
        >
          <!-- 篩選切換按鈕 -->
          <IButton
            variant="text"
            :color="isExpanded ? 'primary' : 'grey-darken-1'"
            class="px-3"
            height="40"
            rounded="lg"
            @click="isExpanded = !isExpanded"
          >
            <v-icon
              start
              icon="mdi-filter-variant"
              size="20"
            ></v-icon>
            <span class="text-button font-weight-bold">篩選</span>
            <v-badge
              v-if="activeFilters.length > 0"
              :content="activeFilters.length"
              color="error"
              floating
              offset-x="-2"
              offset-y="-2"
            ></v-badge>
          </IButton>

          <!-- 全域操作（右側對齊） -->
          <div
            class="d-flex align-center"
            style="gap: 8px"
          >
            <!-- 功能：重新整理 -->
            <v-tooltip
              text="重新整理"
              location="bottom"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-refresh"
                  variant="text"
                  density="comfortable"
                  color="grey-darken-1"
                  @click="doFetch('btn')"
                ></v-btn>
              </template>
            </v-tooltip>

            <!-- 功能：顯示設定 -->
            <v-menu
              :close-on-content-click="false"
              location="bottom end"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-cog-outline"
                  variant="text"
                  density="comfortable"
                  color="grey-darken-1"
                ></v-btn>
              </template>
              <v-card
                min-width="240"
                class="pa-2 rounded-lg border"
              >
                <v-list-item
                  title="檢視設定"
                  subtitle="自訂您的表格顯示"
                ></v-list-item>
                <v-divider class="mb-2"></v-divider>

                <div class="px-3 pb-2 text-caption text-grey-darken-1 font-weight-bold">
                  排列密度
                </div>
                <v-btn-toggle
                  v-model="currentDensity"
                  mandatory
                  density="compact"
                  color="primary"
                  variant="outlined"
                  class="d-flex mx-2 mb-3"
                  divide
                >
                  <v-btn
                    value="default"
                    class="flex-grow-1"
                  >
                    舒適
                  </v-btn>
                  <v-btn
                    value="compact"
                    class="flex-grow-1"
                  >
                    緊湊
                  </v-btn>
                </v-btn-toggle>

                <v-divider class="mb-2"></v-divider>
                <div class="px-3 pb-2 text-caption text-grey-darken-1 font-weight-bold">
                  顯示欄位
                </div>
                <div style="max-height: 200px; overflow-y: auto">
                  <v-list-item
                    v-for="h in headers"
                    :key="h.key"
                    density="compact"
                    class="pa-0 px-2"
                  >
                    <v-checkbox
                      v-model="visibleHeaders"
                      :label="h.title"
                      :value="h.key"
                      hide-details
                      density="compact"
                    ></v-checkbox>
                  </v-list-item>
                </div>
              </v-card>
            </v-menu>

            <div
              v-if="$slots.actionButton"
              class="d-flex align-center"
              style="gap: 8px"
            >
              <slot name="actionButton"></slot>
            </div>
          </div>
        </div>

        <!-- 第二行：已套用的篩選條件（僅在存在篩選條件時顯示） -->
        <div
          v-if="activeFilters.length > 0"
          class="d-flex align-center flex-wrap px-4 py-2 border-b"
          style="gap: 8px; min-height: 48px; background-color: var(--color-gray-50, #f8fafc)"
        >
          <span class="text-caption font-weight-bold text-grey-darken-1 mr-2">
            已套用 {{ activeFilters.length }} 個篩選：
          </span>
          <v-chip
            v-for="filter in activeFilters"
            :key="filter.key"
            :closable="filter.closable"
            size="small"
            variant="outlined"
            color="grey-darken-1"
            class="font-weight-medium bg-white"
            style="border-color: var(--color-gray-300, #cbd5e1)"
            @click:close="removeFilter(filter.key)"
          >
            <span class="text-grey-darken-1 mr-1">
              {{ filter.label }}
              <span v-if="!filter.hideValue">:</span>
            </span>
            <span
              v-if="!filter.hideValue"
              class="text-grey-darken-4 font-weight-bold"
            >
              {{ filter.value }}
            </span>
          </v-chip>

          <v-btn
            variant="text"
            size="x-small"
            color="grey-darken-1"
            class="ml-auto"
            @click="doClear()"
          >
            清除全部
          </v-btn>
        </div>
      </div>

      <!-- 表格區域（貼齊） -->
      <div
        class="card-table-wrapper"
        :style="{ top: `${headerHeight}px` }"
      >
        <IDataTable
          v-bind="$attrs"
          v-model="selectedItems"
          :show-select="showSelect"
          :columns="tableColumns"
          :items="serverItems"
          :loading="loading"
          :server-side="true"
          :items-length="totalItems"
          hide-default-footer
          :density="currentDensity"
          fixed-header
          hover
          class="enterprise-table"
          @update:options="
            (newOptions) => {
              options = { ...options, ...newOptions }
              doFetch('options')
            }
          "
        >
          <!-- 將所有插槽轉發至 IDataTable -->
          <template
            v-for="(_, slot) in $slots"
            #[slot]="scope"
          >
            <slot
              :name="slot"
              v-bind="scope"
            ></slot>
          </template>

          <template #item.actions="{ item }">
            <div class="d-flex">
              <template
                v-for="(actionItem, actionIndex) in actionBtnsList"
                :key="actionIndex"
              >
                <IButton
                  size="small"
                  :color="actionItem.color"
                  variant="tonal"
                  class="ma-1"
                  rounded="lg"
                  @click="actionItem.handle(item, actionItem.updateStatus, doFetch)"
                >
                  <v-icon size="small">{{ actionItem.icon }}</v-icon>
                  <span
                    v-if="actionItem.type === 'customize'"
                    class="ml-1 font-weight-bold"
                  >
                    {{ actionItem.desc }}
                  </span>
                </IButton>
              </template>
            </div>
          </template>
        </IDataTable>
      </div>

      <!-- 浮動批次操作列 -->
      <transition name="slide-y-reverse-transition">
        <div
          v-if="selectedItems && selectedItems.length > 0"
          class="position-fixed d-flex align-center px-4 py-2 rounded-lg elevation-3 bg-grey-darken-4 text-white"
          style="
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            min-width: 300px;
            gap: 16px;
          "
        >
          <div class="d-flex align-center font-weight-bold">
            <v-icon
              start
              icon="mdi-checkbox-marked-circle-outline"
              color="blue-lighten-2"
            ></v-icon>
            已選取 {{ selectedItems.length }} 筆
          </div>

          <div
            class="vr bg-grey-darken-2 mx-2"
            style="height: 20px; width: 1px"
          ></div>

          <!-- 批次操作插槽或預設按鈕 -->
          <slot
            name="batchActions"
            :selected="selectedItems"
          >
            <v-btn
              size="small"
              variant="text"
              color="white"
            >
              批次核准
            </v-btn>
            <v-btn
              size="small"
              variant="text"
              color="red-lighten-2"
            >
              刪除
            </v-btn>
          </slot>

          <v-spacer></v-spacer>

          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            color="grey"
            @click="selectedItems = []"
          ></v-btn>
        </div>
      </transition>

      <!-- 頁尾區域（貼齊） -->
      <div
        v-if="props.isPaged && totalItems > 0"
        class="card-footer px-6 py-4 d-flex flex-wrap justify-space-between align-center border-t"
      >
        <!-- 左側：每頁筆數 -->
        <div class="d-flex align-center text-body-2 text-grey-darken-1">
          <span class="mr-2">每頁筆數：</span>
          <div style="width: 80px">
            <v-select
              v-model="options.itemsPerPage"
              :items="[10, 20, 50, 100]"
              density="compact"
              variant="outlined"
              hide-details
              class="pagination-select"
              @update:model-value="onUpdateItemsPerPage"
            ></v-select>
          </div>
        </div>

        <!-- 右側：分頁控制 -->
        <div class="d-flex align-center">
          <span class="text-caption text-grey-darken-1 mr-4">
            顯示 {{ (options.page - 1) * options.itemsPerPage + 1 }} -
            {{ Math.min(options.page * options.itemsPerPage, totalItems) }}
            筆，共 {{ totalItems }} 筆
          </span>
          <v-pagination
            v-model="options.page"
            :length="Math.ceil(totalItems / options.itemsPerPage)"
            density="compact"
            total-visible="5"
            active-color="primary"
            variant="flat"
            class="enterprise-pagination"
            @update:model-value="doFetch('page')"
          />
        </div>
      </div>
    </div>

    <!-- 抽屜式篩選側邊欄 -->
    <v-navigation-drawer
      v-model="isExpanded"
      location="right"
      temporary
      :scrim="false"
      fixed
      width="400"
      scroll-strategy="none"
      class="elevation-10"
    >
      <!-- 側邊欄標題 -->
      <div
        class="d-flex align-center justify-space-between px-4 py-3 bg-white border-b"
        style="position: sticky; top: 0; z-index: 10"
      >
        <span class="text-subtitle-1 font-weight-bold text-grey-darken-3">篩選條件</span>
        <IButton
          icon
          variant="text"
          density="comfortable"
          @click="isExpanded = false"
        >
          <v-icon icon="mdi-close"></v-icon>
        </IButton>
      </div>

      <!-- 側邊欄內容（可捲動） -->
      <div class="px-4 py-4 bg-white">
        <v-form
          ref="form"
          class="d-flex flex-column"
          style="gap: 16px"
          @submit.prevent="(searchBtn('btn'), (clickSearch = true), (isExpanded = false))"
        >
          <slot
            name="conditions"
            :conditions="conditions"
          ></slot>
        </v-form>
      </div>

      <!-- 側邊欄頁尾（貼底） -->
      <template #append>
        <div class="pa-4 bg-white border-t d-flex justify-space-between">
          <IButton
            variant="outlined"
            color="grey-darken-1"
            height="40"
            class="flex-grow-1 mr-2"
            rounded="lg"
            @click="doClear()"
          >
            <span class="text-body-2 font-weight-medium">重置</span>
          </IButton>

          <IButton
            color="info"
            variant="flat"
            class="flex-grow-1 ml-2 text-white"
            height="40"
            rounded="lg"
            elevation="0"
            @click="(searchBtn('btn'), (clickSearch = true), (isExpanded = false))"
          >
            <span class="text-body-2 font-weight-bold">篩選</span>
          </IButton>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<style scoped lang="scss">
.s-data-table-new {
  // 客製化樣式
  height: 100% !important;
  width: 100%;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;

  .border-t {
    border-top: 1px solid var(--color-gray-200, #e2e8f0);
  }

  // 統一卡片策略 -> 應用面板策略
  .unified-card {
    background-color: #ffffff;
    border-radius: 0; // 貼齊螢幕
    box-shadow: none !important; // 扁平化，面板樣式
    border: none; // 無邊框，佈局的一部分

    // 使用相對定位作為容器
    height: 100% !important;
    position: relative !important;
    overflow: hidden !important;

    // 入場動畫
    animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    animation-fill-mode: both;

    // 標題分離（工具列） - 固定在頂部
    .ui-data-table-header {
      border-bottom: 1px solid var(--color-gray-200, #e2e8f0);
      background-color: #ffffff;
      z-index: 10;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
    }

    // 可捲動表格區域 - 填充中間空間
    .card-table-wrapper {
      position: absolute !important;
      // top 由 Vue 動態綁定
      left: 0 !important;
      right: 0 !important;
      bottom: 64px !important; // Footer 高度
      overflow: hidden !important;
    }

    .card-footer {
      border-top: 1px solid var(--color-gray-200, #e2e8f0);
      background-color: var(--color-gray-50, #f8fafc);
      z-index: 20;
      position: absolute !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 64px !important; // 固定 footer 高度
      box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.01); // 極輕微的陰影
    }
  }

  // 如果衝突，移除 IDataTable 自有的視覺容器屬性

  // 浮動操作列 (Premium Styling)
  .position-fixed {
    background: var(--color-gray-900, #0f172a) !important; // Slate 900
    border: 1px solid var(--color-gray-700, #334155);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(8px);

    // 讓其懸浮感更重
    bottom: 32px !important;
  }

  // 優化分頁選擇器
  :deep(.pagination-select .v-field__outline) {
    --v-field-border-opacity: 0.15; // 較柔和的邊框
  }

  :deep(.pagination-select .v-field__input) {
    min-height: 32px;
    padding-top: 0;
    padding-bottom: 0;
    font-size: 0.875rem;
    font-weight: 500;
    color: #475569;
  }

  :deep(.pagination-select .v-field__append-inner) {
    padding-top: 4px;
    color: #64748b;
  }

  // 優化分頁按鈕（幽靈樣式）
  :deep(.enterprise-pagination .v-pagination__list) {
    justify-content: flex-end;
  }

  :deep(.enterprise-pagination .v-btn) {
    border-radius: 8px; // 稍微更圓
    font-size: 0.875rem;
    height: 36px;
    width: 36px;
    margin: 0 2px;
    transition: all 0.2s ease;

    // 預設狀態：幽靈 / 極簡
    background-color: transparent !important;
    color: #64748b !important;
    box-shadow: none !important;

    &:hover {
      background-color: #f1f5f9 !important;
      color: #334155 !important;
    }

    &--active {
      background: linear-gradient(135deg, #005ab5 0%, #004494 100%) !important;
      color: #ffffff !important;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(0, 90, 181, 0.35) !important;
      transform: scale(1.05);
    }
    &--disabled {
      opacity: 0.4;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
