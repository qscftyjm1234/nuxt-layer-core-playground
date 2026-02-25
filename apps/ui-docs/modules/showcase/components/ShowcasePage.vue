<script setup lang="ts">
/**
 * ShowcasePage
 * 業務邏輯層元件 (Business Layer)
 * 頁面標準佈局 - Dark Mode / Glassmorphism Style
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface Props {
  title: string
  description?: string
  backTo?: string
  backText?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  backTo: '/showcase',
  backText: '返回列表'
})

const route = useRoute()

// 自動生成麵包屑
const breadcrumbs = computed(() => {
  const parts = route.path.split('/').filter((p) => p)

  const items = parts.map((part, index) => {
    const isLast = index === parts.length - 1
    const path = `/${parts.slice(0, index + 1).join('/')}`

    // 簡單的標題映射 (可擴充)
    let title = part.charAt(0).toUpperCase() + part.slice(1)
    if (part === 'showcase') title = '模組'

    // 如果是當前頁面，使用 props title
    if (isLast && props.title) {
      // 嘗試移除括號內的英文，只保留中文 (如果有)
      const match = props.title.match(/(.*)\s\(/)
      title = match ? match[1] : props.title
    }

    return {
      title,
      path,
      disabled: isLast
    }
  })

  // 確保首頁在最前
  return [{ title: '首頁', path: '/', disabled: false }, ...items]
})
</script>

<template>
  <div class="showcase-page-dark">
    <!-- Background Decoration -->
    <div class="bg-decoration"></div>

    <div class="page-container">
      <!-- Header Section -->
      <header class="page-header">
        <!-- Breadcrumbs -->
        <!-- Breadcrumbs -->
        <IBreadcrumbs
          :items="breadcrumbs"
          class="mb-6"
        />

        <div class="header-content">
          <div class="title-group">
            <h1 class="page-title">{{ title }}</h1>
            <p
              v-if="description"
              class="page-desc"
            >
              {{ description }}
            </p>
          </div>

          <div class="header-actions">
            <slot name="header-extra" />
            <NuxtLink
              v-slot="{ navigate }"
              :to="backTo"
              custom
            >
              <IButton
                variant="outlined"
                prepend-icon="mdi-arrow-left"
                class="back-btn"
                @click="navigate"
              >
                {{ backText }}
              </IButton>
            </NuxtLink>
          </div>
        </div>
      </header>

      <!-- Content Section -->
      <main class="page-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.showcase-page-dark {
  min-height: 100vh;
  background: #0f172a;
  color: #e2e8f0;
  position: relative;
  font-family: 'Inter', system-ui, sans-serif;
}

.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background: radial-gradient(circle at 50% -20%, rgba(56, 189, 248, 0.15), transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.page-container {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Breadcrumbs styles removed - using IBreadcrumbs */

/* Header */
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 2rem;
}

.title-group {
  flex: 1;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
  background: linear-gradient(to right, #ffffff, #94a3b8);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-desc {
  font-size: 1.1rem;
  color: #94a3b8;
  line-height: 1.6;
  max-width: 800px;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.back-btn {
  color: #94a3b8 !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.05) !important;
  color: white !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}

/* Page Content usually contains stacked sections */
.page-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
