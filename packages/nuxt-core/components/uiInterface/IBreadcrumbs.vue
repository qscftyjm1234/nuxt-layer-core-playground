<script setup lang="ts">
interface BreadcrumbItem {
  title: string
  to?: string
  disabled?: boolean
}

interface Props {
  items: BreadcrumbItem[]
  separator?: string
}

withDefaults(defineProps<Props>(), {
  separator: '/'
})
</script>

<template>
  <nav
    class="i-breadcrumbs"
    aria-label="Breadcrumb"
  >
    <ol>
      <li
        v-for="(item, index) in items"
        :key="index"
      >
        <span
          v-if="index > 0"
          class="separator"
        >
          {{ separator }}
        </span>
        <NuxtLink
          v-if="!item.disabled && item.to"
          :to="item.to"
          class="crumb-link"
        >
          {{ item.title }}
        </NuxtLink>
        <span
          v-else
          class="crumb-current"
          :class="{ disabled: item.disabled }"
        >
          {{ item.title }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.i-breadcrumbs ol {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  color: #94a3b8;
}

.crumb-link {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;
}

.crumb-link:hover {
  color: #38bdf8;
}

.crumb-current {
  color: #f1f5f9;
  font-weight: 500;
}

.crumb-current.disabled {
  cursor: default;
}

.separator {
  color: #475569;
  font-size: 0.8rem;
}
</style>
