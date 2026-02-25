<script setup lang="ts">
/**
 * IDataTable - Wraps Vuetify's v-data-table
 */
import { VDataTable, VDataTableServer } from 'vuetify/components/VDataTable'
import { VSkeletonLoader } from 'vuetify/components/VSkeletonLoader'
import { VIcon } from 'vuetify/components/VIcon'
import { useAttrs, useSlots } from 'vue'

const slots = useSlots()
// Filter out slots we explicitly handle to avoid "Duplicate slot names" warning
const forwardedSlots = computed(() => {
  const excluded = ['item', 'headers', 'loading', 'no-data']
  return Object.keys(slots).filter((key) => !excluded.includes(key))
})

interface Column {
  key: string
  label: string
  sortable?: boolean
}

// Ensure Props interface allows flexibility but defines core structure
interface Props {
  columns: Column[]
  items: any[]
  loading?: boolean
  hover?: boolean
  serverSide?: boolean
  itemsLength?: number
  itemsPerPage?: number
  page?: number
  sortBy?: any[]
  density?: string
  showSelect?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  hover: true,
  serverSide: false,
  itemsLength: 0,
  itemsPerPage: 10,
  page: 1,
  sortBy: () => [],
  density: 'default',
  showSelect: false
})

// Emit events for server-side pagination
const emit = defineEmits(['update:options', 'update:page', 'update:itemsPerPage', 'update:sortBy'])

const onUpdateOptions = (options: any) => {
  emit('update:options', options)
}

// Helper to safely access nested object values
const getValue = (obj: any, path: string, fallback: string = '-') => {
  if (!obj || !path) return fallback
  const value = path.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), obj)
  return value === null || value === undefined || value === '' ? fallback : value
}

const getCellValue = (item: any, col: any) => {
  // If col.value is a function (our custom definition), use it
  if (typeof col.value === 'function') {
    return col.value(item)
  }
  // Fallback: Safe nested check using getValue
  return getValue(item, col.key)
}

// Map columns (label) to headers (title) for VDataTable
const mappedHeaders = computed(() => {
  return props.columns.map((col: any) => ({
    ...col,
    key: col.key,
    title: col.label || '',
    sortable: col.sortable !== false,
    value: (item: any) => getValue(item, col.key),
    // Preserve width if set, or default
    width: col.width
  }))
})

// === Column Resizing Logic ===
const resizingColumn = ref<any>(null)
const startX = ref(0)
const startWidth = ref(0)

const startResize = (event: MouseEvent, column: any) => {
  resizingColumn.value = column
  startX.value = event.pageX
  // Ensure we have a starting width (dom or data)
  const th = (event.target as HTMLElement).closest('th')
  startWidth.value = th ? th.offsetWidth : 100

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

const onMouseMove = (event: MouseEvent) => {
  if (!resizingColumn.value) return
  const diff = event.pageX - startX.value
  const newWidth = Math.max(50, startWidth.value + diff) // Min 50px

  // Directly Mutate the column object in mappedHeaders (Reactive)
  // Note: mappedHeaders is computed, so we might need a local state copy for persistence
  // But for now, let's see if we can update the source columns prop or if we need a local wrapper.
  // Actually, modifying computed usually fails or warns.
  // Ideally, we should have a local 'displayColumns' state.

  // Update: We'll update the 'width' property on the reactive column object provided by VDataTable's slot
  // But 'column' in the slot comes from our mappedHeaders.
  // Let's modify our mappedHeaders logic to return reactive objects we can mutate,
  // OR better: use a Ref map for widths.

  setColumnWidth(resizingColumn.value.key, newWidth)
}

const onMouseUp = () => {
  resizingColumn.value = null
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

const columnWidths = ref<Record<string, number>>({})
const setColumnWidth = (key: string, width: number) => {
  columnWidths.value[key] = width
}

const attrs = useAttrs()

// Wrap mappedHeaders to include dynamic width and sticky offsets
const displayHeaders = computed(() => {
  const headers = mappedHeaders.value.map((h: any) => ({
    ...h,
    width: columnWidths.value[h.key] || h.width || undefined
  }))

  let leftOffset = 0
  // Checkbox width (approx 48px if show-select is on)
  if (props.showSelect || attrs['show-select'] !== undefined) {
    leftOffset = 48
  }

  // Calculate Left Sticky
  for (const h of headers) {
    if (h.fixed === true || h.fixed === 'left') {
      h.stickyLeft = leftOffset
      // Use current width or default (approx 100?) for offset calculation
      const w = parseInt(String(h.width || 100))
      leftOffset += w
    }
  }

  // Calculate Right Sticky (Reverse)
  let rightOffset = 0
  for (let i = headers.length - 1; i >= 0; i--) {
    const h = headers[i]
    if (h.fixed === 'right') {
      h.stickyRight = rightOffset
      const w = parseInt(String(h.width || 100))
      rightOffset += w
    }
  }

  return headers
})

const getStickyStyle = (col: any, isHeader = false) => {
  const style: any = {
    width: col.width ? col.width + 'px' : undefined,
    minWidth: col.width ? col.width + 'px' : undefined,
    maxWidth: col.width ? col.width + 'px' : undefined
  }

  if (col.fixed === true || col.fixed === 'left') {
    style.position = 'sticky'
    style.left = (col.stickyLeft || 0) + 'px'
    style.zIndex = isHeader ? 4 : 2
    style.backgroundColor = isHeader ? '#f8fafc' : '#ffffff' // Ensure generic bg prevents transparency
  } else if (col.fixed === 'right') {
    style.position = 'sticky'
    style.right = (col.stickyRight || 0) + 'px'
    style.zIndex = isHeader ? 4 : 2
    style.backgroundColor = isHeader ? '#f8fafc' : '#ffffff'
  } else {
    // Relative for resizing
    if (isHeader) style.position = 'relative'
  }

  return style
}
</script>

<template>
  <div class="ui-data-table">
    <component
      :is="serverSide ? VDataTableServer : VDataTable"
      v-bind="$attrs"
      :headers="displayHeaders"
      :items="items"
      :loading="loading"
      :items-length="itemsLength"
      :items-per-page="itemsPerPage"
      :page="page"
      :sort-by="sortBy"
      :hover="hover"
      :density="density"
      class="elevation-1 rounded-lg"
      @update:options="onUpdateOptions"
    >
      <!-- Loading Slot override for Skeleton -->
      <template #loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>

      <!-- 0. Custom Resizable Headers -->
      <template
        #headers="{
          columns,
          isSorted,
          getSortIcon,
          toggleSort,
          selectAll,
          someSelected,
          allSelected
        }"
      >
        <tr class="v-data-table__tr">
          <th
            v-if="$attrs['show-select'] !== undefined"
            class="v-data-table__th v-data-table__th--sortable"
            style="
              width: 48px;
              min-width: 48px;
              position: sticky;
              left: 0;
              z-index: 4;
              background-color: #f8fafc;
            "
          >
            <div class="v-data-table-header__content">
              <v-checkbox-btn
                :model-value="allSelected"
                :indeterminate="someSelected && !allSelected"
                @update:model-value="selectAll(!allSelected)"
              ></v-checkbox-btn>
            </div>
          </th>
          <th
            v-for="column in columns.filter((c) => c.key !== 'data-table-select')"
            :key="column.key as any"
            class="v-data-table__th"
            :class="{
              'v-data-table__th--sortable': column.sortable,
              'shadow-right': column.fixed === true || column.fixed === 'left',
              'shadow-left': column.fixed === 'right'
            }"
            :style="getStickyStyle(column, true)"
            @click="column.sortable && toggleSort(column)"
          >
            <div class="v-data-table-header__content">
              <span>{{ column.title }}</span>
              <v-icon
                v-if="isSorted(column)"
                :icon="getSortIcon(column)"
                class="v-data-table-header__sort-icon"
              ></v-icon>
            </div>

            <!-- Resize Handle -->
            <div
              class="resize-handle"
              @click.stop
              @mousedown.stop="startResize($event, column)"
            ></div>
          </th>
        </tr>
      </template>

      <!-- 1. Custom Body Row for Sticky Columns -->
      <template #item="{ item, columns, internalItem, isSelected, toggleSelect }">
        <tr
          class="v-data-table__tr"
          :class="{ 'v-data-table__tr--selected': isSelected(internalItem) }"
          @click="$attrs['onClick:row'] && ($attrs['onClick:row'] as any)(item)"
          @dblclick="$attrs['onDblclick:row'] && ($attrs['onDblclick:row'] as any)(item)"
        >
          <!-- Checkbox Column -->
          <td
            v-if="$attrs['show-select'] !== undefined"
            class="v-data-table__td"
            style="
              width: 48px;
              min-width: 48px;
              position: sticky;
              left: 0;
              z-index: 2;
              background-color: #ffffff;
            "
          >
            <v-checkbox-btn
              :model-value="isSelected(internalItem)"
              @update:model-value="toggleSelect(internalItem)"
            ></v-checkbox-btn>
          </td>

          <!-- Data Columns -->
          <td
            v-for="col in columns.filter((c) => c.key !== 'data-table-select')"
            :key="col.key"
            class="v-data-table__td"
            :class="{
              'shadow-right': col.fixed === true || col.fixed === 'left',
              'shadow-left': col.fixed === 'right',
              'compact-cell': density === 'compact'
            }"
            :style="getStickyStyle(col, false)"
          >
            <!-- Slot Injection -->
            <slot
              :name="`item.${col.key}`"
              :item="item"
              :value="getCellValue(item, col)"
              :index="internalItem.index"
            >
              <!-- Default Rendering -->
              {{ getCellValue(item, col) }}
            </slot>
          </td>
        </tr>
      </template>

      <!-- Unified Slot Pass-through & Overrides -->
      <template v-for="slotName in ['loading', ...forwardedSlots]" #[slotName]="scope">
        <!-- Loading Override -->
        <div v-if="slotName === 'loading'" class="pa-4 bg-white border-b">
          <v-skeleton-loader type="table-row@5" elevation="0"></v-skeleton-loader>
        </div>

        <!-- Pass-through others -->
        <slot v-else :name="slotName" v-bind="scope" />
      </template>

      <!-- 4. Empty State (Polished) -->
      <template #no-data>
        <div class="d-flex flex-column align-center justify-center pa-8 text-grey-lighten-1">
          <v-icon size="48" color="grey-lighten-3" class="mb-2">mdi-inbox-outline</v-icon>
          <div class="text-body-2 font-weight-medium">無符合資料</div>
        </div>
      </template>
    </component>
  </div>
</template>

<style lang="scss" scoped>
// ... existing styles ...

.resize-handle {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 8px; /* Hit area */
  cursor: col-resize;
  z-index: 10;
  transition: background-color 0.2s;

  &:hover,
  &:active {
    background-color: rgba(59, 130, 246, 0.5); /* Modern Blue Highlight */
  }
}

/* Modern Sticky Shadows (No Borders) */
.shadow-right {
  box-shadow: 12px 0 15px -4px rgba(0, 0, 0, 0.05); /* Soft shadow */
  clip-path: inset(0px -20px 0px 0px);
  border-right: none;
}
.shadow-left {
  box-shadow: -12px 0 15px -4px rgba(0, 0, 0, 0.05);
  clip-path: inset(0px 0px 0px -20px);
  border-left: none;
}
</style>

<style scoped lang="scss">
.ui-data-table {
  width: 100%;
  height: 100%; // Fill wrapper
  min-height: 0; // Allow flex shrinking

  // Premium SaaS Styling
  :deep(.v-data-table) {
    height: 100% !important; // Fill container with force
    display: flex !important; // Ensure internal structure flexes
    flex-direction: column !important;
    overflow: hidden !important; // Prevent double scroll

    // CRITICAL: Force the scrollable wrapper to fill remaining space
    .v-data-table__wrapper {
      flex: 1 1 auto !important; // 允許增長和收縮
      min-height: 0 !important; // CRITICAL: Allows flex child to shrink below content size
      overflow-y: auto !important;
      overflow-x: auto !important;
      position: relative !important;
      z-index: 1 !important; // 確保在 thead 下方
    }

    background-color: #ffffff !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    border: none !important;

    // Enterprise Grid Header
    thead {
      background-color: var(--color-gray-50, #f8fafc) !important; // Slate-50: Distinct Header
      position: sticky;
      top: 0;
      z-index: 100 !important; // 提高 z-index 確保在最上層
      flex-shrink: 0 !important; // 防止被壓縮

      th {
        border-bottom: 1px solid var(--color-gray-200, #cbd5e1) !important; // Slate-300: Stronger Separator
        height: 48px !important; // Compact Pro Standard
        min-height: 48px !important; // 確保最小高度
        background-color: var(--color-gray-50, #f8fafc) !important;
        color: var(--color-gray-600, #475569) !important;
        font-weight: 700 !important;
        font-size: 0.8125rem !important; // 13px: Data dense
        letter-spacing: 0.01em !important;
        text-transform: none !important;
        white-space: nowrap;
        transition: color 0.2s;

        // Vertical Divider for Enterprise Feel
        &:not(:last-child) {
          border-right: 1px solid var(--color-gray-100, #f1f5f9);
        }

        &:hover {
          color: var(--color-gray-900, #0f172a) !important;
          background-color: var(--color-gray-100, #f1f5f9) !important;
        }
      }
    }

    .v-data-table-header__content {
      font-family: var(--font-family-base, 'Inter', -apple-system, sans-serif) !important;
    }
  }

  // Row & Cell Styling
  :deep(tbody) {
    tr {
      transition: background-color 0.1s ease;

      // Zebra Striping (Enterprise Standard)
      &:nth-of-type(even) {
        background-color: #fcfcfc !important; // Very subtle gray
      }

      // Pro Hover
      &:hover {
        background-color: var(--color-gray-100, #f1f5f9) !important; // Slate-100
        td {
          background-color: var(--color-gray-100, #f1f5f9) !important;
          color: var(--color-gray-800, #1e293b) !important;
        }
      }

      // Solid Grid Lines
      td {
        border-bottom: 1px solid var(--color-gray-200, #e2e8f0) !important; // Solid is more pro than dashed
        // Vertical Borders (Optional, subtle)
        &:not(:last-child) {
          border-right: 1px solid var(--color-gray-50, #f8fafc);
        }
      }
    }

    td {
      font-family: var(--font-family-base, 'Inter', -apple-system, sans-serif) !important;
      font-size: 0.875rem !important;
      color: var(--color-gray-700, #334155) !important;

      padding-top: 8px !important;
      padding-bottom: 8px !important;
      height: 48px !important;
    }
  }

  // Pagination Styling Integration
  :deep(.v-data-table-footer) {
    border-top: 1px solid var(--color-gray-200, #e2e8f0) !important;
    background-color: var(--color-gray-50, #f8fafc); // Match header
    padding: 12px 16px;
  }

  // Density: Compact Override
  :deep(.compact-cell) {
    padding-top: 2px !important;
    padding-bottom: 2px !important;
    height: 32px !important;
    font-size: 0.75rem !important;
  }
}
</style>
