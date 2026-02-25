<script setup lang="ts">
/**
 * Header 麵包屑導航 - 框架無關
 * 框架無關的麵包屑導航
 */
import { useAppStore } from '../../../stores/app'
import { useRoute } from 'vue-router'

const appStore = useAppStore()
const route = useRoute()

const breadcrumbs = computed(() => {
  const path = route.path
  const parts = path.split('/').filter((p) => p)
  return parts.map((part, index) => ({
    title: part.charAt(0).toUpperCase() + part.slice(1),
    disabled: index === parts.length - 1,
    href: `/${parts.slice(0, index + 1).join('/')}`
  }))
})
</script>

<template>
  <nav
    v-if="appStore.config.header.breadcrumbs"
    class="breadcrumbs hidden-mobile"
    aria-label="breadcrumb"
  >
    <ol class="breadcrumbs">
      <li class="breadcrumb-item">
        <NuxtLink to="/">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        </NuxtLink>
      </li>
      <template
        v-for="(item, index) in breadcrumbs"
        :key="index"
      >
        <li class="breadcrumb-divider">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </li>
        <li
          class="breadcrumb-item"
          :class="{ 'is-active': item.disabled }"
        >
          <NuxtLink
            v-if="!item.disabled"
            :to="item.href"
          >
            {{ item.title }}
          </NuxtLink>
          <span v-else>{{ item.title }}</span>
        </li>
      </template>
    </ol>
  </nav>
</template>
