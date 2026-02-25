<script setup lang="ts">
/**
 * IBreadcrumbs - UI 介面層麵包屑
 *
 * 用途：統一的 Breadcrumbs 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 */

interface BreadcrumbItem {
  label: string
  to?: string
  disabled?: boolean
}

interface Props {
  items: BreadcrumbItem[]
  separator?: string
}

const props = withDefaults(defineProps<Props>(), {
  separator: '/'
})
</script>

<template>
  <!-- 目前使用原生 HTML -->
  <nav
    class="ui-breadcrumbs"
    aria-label="breadcrumb"
  >
    <ol class="breadcrumbs-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb-item"
        :class="{ 'is-disabled': item.disabled }"
      >
        <NuxtLink
          v-if="item.to && !item.disabled"
          :to="item.to"
          class="breadcrumb-link"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-else
          class="breadcrumb-text"
        >
          {{ item.label }}
        </span>
        <span
          v-if="index < items.length - 1"
          class="breadcrumb-separator"
        >
          {{ separator }}
        </span>
      </li>
    </ol>
  </nav>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VBreadcrumbs
    :items="items"
    :divider="separator"
  />
  -->
</template>

<style scoped>
.ui-breadcrumbs {
  padding: 0.5rem 0;
}

.breadcrumbs-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.breadcrumb-link {
  color: #3498db;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: #2980b9;
  text-decoration: underline;
}

.breadcrumb-text {
  color: #666;
}

.breadcrumb-item:last-child .breadcrumb-text {
  color: #333;
  font-weight: 500;
}

.breadcrumb-item.is-disabled {
  opacity: 0.5;
}

.breadcrumb-separator {
  color: #999;
  user-select: none;
}
</style>
