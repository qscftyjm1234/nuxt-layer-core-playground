<script setup lang="ts">
/**
 * IMenuItem - UI 介面層選單項目
 *
 * 用途：統一的 MenuItem 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 *
 * 設計原則：
 * - 提供標準化的 props 介面
 * - 支援路由導航
 * - 支援圖示和啟用狀態
 */

interface Props {
  to?: string // 路由路徑
  href?: string // 外部連結
  icon?: string // 圖示 (可以是 emoji 或 icon class)
  label: string // 文字
  active?: boolean // 是否啟用
  disabled?: boolean // 是否禁用
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// 計算樣式
const menuItemClass = computed(() => ({
  'is-active': props.active,
  'is-disabled': props.disabled
}))

// 點擊處理
const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <!-- 目前使用原生 HTML + NuxtLink -->
  <!-- 未來可以換成 Vuetify/Element UI -->

  <!-- 路由連結 -->
  <NuxtLink
    v-if="to"
    :to="to"
    class="ui-menu-item"
    :class="menuItemClass"
    @click="handleClick"
  >
    <span
      v-if="icon"
      class="menu-item-icon"
    >
      {{ icon }}
    </span>
    <span class="menu-item-label">{{ label }}</span>
  </NuxtLink>

  <!-- 外部連結 -->
  <a
    v-else-if="href"
    :href="href"
    class="ui-menu-item"
    :class="menuItemClass"
    target="_blank"
    rel="noopener noreferrer"
    @click="handleClick"
  >
    <span
      v-if="icon"
      class="menu-item-icon"
    >
      {{ icon }}
    </span>
    <span class="menu-item-label">{{ label }}</span>
  </a>

  <!-- 按鈕 -->
  <button
    v-else
    class="ui-menu-item"
    :class="menuItemClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <span
      v-if="icon"
      class="menu-item-icon"
    >
      {{ icon }}
    </span>
    <span class="menu-item-label">{{ label }}</span>
  </button>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VListItem
    :to="to"
    :href="href"
    :active="active"
    :disabled="disabled"
    @click="handleClick"
  >
    <template #prepend>
      <VIcon v-if="icon">{{ icon }}</VIcon>
    </template>
    <VListItemTitle>{{ label }}</VListItemTitle>
  </VListItem>
  -->

  <!-- 未來換成 Element UI 的範例 -->
  <!--
  <ElMenuItem
    :index="to || href"
    :disabled="disabled"
    @click="handleClick"
  >
    <ElIcon v-if="icon"><component :is="icon" /></ElIcon>
    <span>{{ label }}</span>
  </ElMenuItem>
  -->
</template>

<style scoped>
.ui-menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;
  font-size: 0.95rem;
}

.ui-menu-item:hover:not(.is-disabled) {
  background: #f5f5f5;
  color: #3498db;
}

.ui-menu-item.is-active {
  background: #e3f2fd;
  color: #2196f3;
  font-weight: 500;
}

.ui-menu-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.menu-item-icon {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
}

.menu-item-label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* NuxtLink active class */
.ui-menu-item.router-link-active {
  background: #e3f2fd;
  color: #2196f3;
  font-weight: 500;
}
</style>
