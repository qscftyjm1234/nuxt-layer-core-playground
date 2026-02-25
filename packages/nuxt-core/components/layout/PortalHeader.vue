<script setup lang="ts">
import IButton from '../uiInterface/IButton.vue'
import HeaderUserMenu from './header/HeaderUserMenu.vue'

const config = useRuntimeConfig()
const appName = config.public.app.productConfig?.meta?.title || 'Frontend Kit'

// 簡單導航
const navItems = [
  { label: '首頁', to: '/' },
  { label: '開發指南', to: '/showcase/development' },
  { label: '模組', to: '/showcase' }
]
</script>

<template>
  <header class="portal-header">
    <div class="header-container">
      <!-- Logo / 品牌 -->
      <NuxtLink
        to="/"
        class="brand-link"
      >
        <IIcon
          size="64"
          color="primary"
          icon="mdi-domain"
        />
        <span class="brand-text">{{ appName }}</span>
      </NuxtLink>

      <!-- 導航 -->
      <nav class="header-nav">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="header-spacer" />

      <!-- 右側操作區 -->
      <div class="header-actions">
        <div class="action-item">
          <IButton
            variant="text"
            icon="mdi-github"
            color="white"
            size="large"
            href="https://github.com/example/repo"
            target="_blank"
          />
        </div>

        <!-- 使用者選單 -->
        <div class="action-item">
          <HeaderUserMenu />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.portal-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  z-index: 100;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  gap: 2rem;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
  transition: opacity 0.2s;
}

.brand-link:hover {
  opacity: 0.8;
}

.brand-logo {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
}

.brand-text {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.header-nav {
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  text-decoration: none;
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active,
.nav-link.router-link-exact-active {
  color: white;
  background: rgba(56, 189, 248, 0.15); /* 天藍色淡彩 */
  box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.2);
}

.header-spacer {
  flex: 1;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
}

.action-item {
  display: flex;
  align-items: center;
}

/* Deep selector 用於覆蓋子元件樣式 (若暗色模式需要) */
:deep(.v-btn) {
  color: #e2e8f0 !important;
}
</style>
