<script setup lang="ts">
/**
 * IDrawer - UI 介面層側邊抽屜
 *
 * 用途：統一的 Drawer 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 *
 * 設計原則：
 * - 提供標準化的 props 介面
 * - 支援響應式開關
 * - 內部適配不同 UI 框架的差異
 */

interface Props {
  modelValue: boolean // 開關狀態
  permanent?: boolean // 是否永久顯示 (桌面版)
  width?: string // 寬度
  position?: 'left' | 'right' // 位置
}

const props = withDefaults(defineProps<Props>(), {
  permanent: false,
  width: '256px',
  position: 'left'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// 內部值管理
const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// 計算樣式
const drawerClass = computed(() => ({
  'is-open': isOpen.value,
  'is-permanent': props.permanent,
  'is-right': props.position === 'right'
}))

const drawerStyle = computed(() => ({
  width: props.width,
  [props.position]: isOpen.value || props.permanent ? '0' : `-${props.width}`
}))
</script>

<template>
  <!-- 目前使用原生 HTML -->
  <!-- 未來可以換成 Vuetify/Element UI -->

  <aside
    class="ui-drawer"
    :class="drawerClass"
    :style="drawerStyle"
  >
    <div class="drawer-content">
      <slot />
    </div>
  </aside>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VNavigationDrawer
    v-model="isOpen"
    :permanent="permanent"
    :width="width"
    :location="position"
  >
    <slot />
  </VNavigationDrawer>
  -->

  <!-- 未來換成 Element UI 的範例 -->
  <!--
  <ElDrawer
    v-model="isOpen"
    :size="width"
    :direction="position === 'left' ? 'ltr' : 'rtl'"
    :modal="!permanent"
  >
    <slot />
  </ElDrawer>
  -->
</template>

<style scoped>
.ui-drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  background: white;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  overflow-y: auto;
}

.ui-drawer.is-right {
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
}

/* 桌面版永久顯示 */
@media (min-width: 1024px) {
  .ui-drawer.is-permanent {
    position: relative;
    left: 0 !important;
    right: auto !important;
  }
}

/* 手機版隱藏 */
@media (max-width: 1023px) {
  .ui-drawer:not(.is-open) {
    transform: translateX(-100%);
  }

  .ui-drawer.is-right:not(.is-open) {
    transform: translateX(100%);
  }
}

.drawer-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Scrollbar 樣式 */
.ui-drawer::-webkit-scrollbar {
  width: 6px;
}

.ui-drawer::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.ui-drawer::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.ui-drawer::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
