<template>
  <div class="layout-default">
    <!-- Header: 頂部導覽列 -->
    <header v-if="layout?.header?.visible" class="header" :style="{ height: `${layout?.header?.height || 64}px` }">
      <div class="container d-flex align-center justify-space-between h-100">
        <div class="branding d-flex align-center gap-2">
          <IIcon v-if="layout?.branding?.logo?.icon && !layout?.branding?.logo?.image" :name="layout.branding.logo.icon" size="28" color="primary" />
          <img v-if="layout?.branding?.logo?.image" :src="layout.branding.logo.image" class="logo-img" alt="logo" />
          <div class="branding-text">
            <h1 class="logo-title">{{ layout?.branding?.title }}</h1>
            <p v-if="layout?.branding?.subtitle" class="logo-subtitle">{{ layout.branding.subtitle }}</p>
          </div>
        </div>

        <div class="actions d-flex align-center gap-4">
          <!-- 搜尋框 -->
          <div v-if="layout?.header?.search" class="search-bar">
            <input type="text" :placeholder="layout?.header?.searchPlaceholder" />
          </div>

          <slot name="header-actions" />

          <!-- 使用者選單按鈕 (示意) -->
          <div v-if="layout?.header?.userMenu?.visible" class="user-action">
            <IIcon name="mdi-account-circle" size="32" class="cursor-pointer" />
          </div>
        </div>
      </div>
    </header>

    <main class="main" :class="{ 'has-header': layout?.header?.visible }">
      <div class="container py-10">
        <slot />
      </div>
    </main>

    <!-- Footer: 頁尾 -->
    <footer v-if="layout?.footer?.visible" class="footer">
      <div class="container">
        <div class="footer-content" v-html="layout?.footer?.content"></div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { themeConfig } from '../core/config/theme-tokens'

/**
 * 核心層預設佈局
 * 完全由 configs/default.json (Blueprint) 驅動
 */
const { core } = useAppConfig()
const layout = computed(() => core.layout)

// 動態注入設計令牌 (Design Tokens) 為 CSS 變數
useHead({
  style: [
    {
      innerHTML: computed(() => `
        :root {
          /* 基礎語意色彩 */
          --color-primary: ${layout.value?.theme?.primaryColor || core.theme?.primaryColor || themeConfig.colors.primary};
          --color-primary-alpha: ${layout.value?.theme?.primaryColor || core.theme?.primaryColor || themeConfig.colors.primary}40;
          --color-success: ${core.theme?.successColor || themeConfig.colors.success};
          --color-warning: ${core.theme?.warningColor || themeConfig.colors.warning};
          --color-error: ${core.theme?.errorColor || themeConfig.colors.error};
          --color-info: ${core.theme?.infoColor || themeConfig.colors.info};
          
          /* 覆寫 main.css 中的特定變數以達成 100% 連動 */
          --color-primary-600: ${layout.value?.theme?.primaryColor || core.theme?.primaryColor || themeConfig.colors.primary};
          --color-primary-500: ${layout.value?.theme?.primaryColor || core.theme?.primaryColor || themeConfig.colors.primary}e6; /* 加入透明度模擬 */
          
          /* 基礎圓角 */
          --radius-md: ${core.theme?.borderRadius || themeConfig.shape.borderRadius}px;
          --radius-lg: ${(core.theme?.borderRadius || themeConfig.shape.borderRadius) + 4}px;
        }
      `)
    }
  ]
})
</script>

<style scoped>
.layout-default {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc; /* Slate 50 */
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e2e8f0;
  z-index: 1000;
  padding: 0 1.5rem;
}

.logo-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1.2;
}

.logo-subtitle {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}

.logo-img {
  height: 32px;
  object-fit: contain;
}

.search-bar input {
  background: #f1f5f9;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  width: 240px;
  transition: all 0.2s;
}

.search-bar input:focus {
  outline: 2px solid var(--v-primary-base);
  background: white;
}

.main {
  flex: 1;
}

.main.has-header {
  padding-top: 64px; /* Default height */
}

.footer {
  background-color: white;
  border-top: 1px solid #e2e8f0;
  padding: 2rem 0;
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
}

.branding-text {
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>
