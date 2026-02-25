<script setup lang="ts">
/**
 * 應用程式側邊欄項目 - 框架無關
 * 框架無關的側邊欄項目 (支援遞迴巢狀選單)
 */
import type { SidebarItem } from '../../core/sidebar/buildSidebar'
import AppSidebarItem from './AppSidebarItem.vue'

defineOptions({
  name: 'AppSidebarItem'
})

const props = defineProps<{
  item: SidebarItem
}>()

const route = useRoute()
const isExpanded = ref(false)

// 判斷是否為目前活動項目
const isActive = computed(() => {
  if (!props.item.to) return false
  return route.path === props.item.to
})

// 如果有子選單,切換展開狀態
const toggleExpand = () => {
  if (props.item.children && props.item.children.length > 0) {
    isExpanded.value = !isExpanded.value
  }
}

// 處理點擊事件
const handleClick = () => {
  if (props.item.to) {
    navigateTo(props.item.to)
  } else {
    toggleExpand()
  }
}
</script>

<template>
  <!-- 如果有子選單 -->
  <div v-if="item.children && item.children.length > 0">
    <div
      class="sidebar-nav-item"
      :class="{ 'is-disabled': item.disabled }"
      @click="handleClick"
    >
      <svg
        v-if="item.icon"
        class="sidebar-nav-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <!-- 簡化的圖標,實際應用中可以根據 item.icon 動態渲染 -->
        <circle
          cx="12"
          cy="12"
          r="10"
        />
      </svg>
      <span style="flex: 1">{{ item.label }}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        :style="{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s'
        }"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>

    <!-- 子選單 (遞迴) -->
    <div
      v-show="isExpanded"
      style="padding-left: 1rem"
    >
      <AppSidebarItem
        v-for="child in item.children"
        :key="child.label"
        :item="child"
      />
    </div>
  </div>

  <!-- 如果沒有子選單 -->
  <NuxtLink
    v-else
    :to="item.to || '#'"
    class="sidebar-nav-item"
    :class="{ 'is-active': isActive, 'is-disabled': item.disabled }"
    @click.prevent="handleClick"
  >
    <svg
      v-if="item.icon"
      class="sidebar-nav-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <!-- 簡化的圖標,實際應用中可以根據 item.icon 動態渲染 -->
      <circle
        cx="12"
        cy="12"
        r="10"
      />
    </svg>
    <span>{{ item.label }}</span>
  </NuxtLink>
</template>
