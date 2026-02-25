<script setup lang="ts">
/**
 * 應用程式頁首 - 使用三層架構
 * 業務層：整合 Store、子元件
 * UI 層：使用 IAppBar (可替換 UI 框架)
 */
import IAppBar from '../uiInterface/layout/IAppBar.vue'
import { useAppStore } from '../../stores/app'
import HeaderBreadcrumbs from './header/HeaderBreadcrumbs.vue'
import HeaderSearch from './header/HeaderSearch.vue'
import HeaderNotifications from './header/HeaderNotifications.vue'
import HeaderUserMenu from './header/HeaderUserMenu.vue'
import HeaderActions from './header/HeaderActions.vue'

const appStore = useAppStore()
</script>

<template>
  <IAppBar
    v-if="appStore.config.header.visible"
    :fixed="true"
    :elevation="2"
    color="white"
  >
    <!-- 手機版選單切換 -->
    <button
      class="header-nav-toggle"
      aria-label="Toggle navigation"
      @click="appStore.toggleDrawer"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <line
          x1="3"
          y1="12"
          x2="21"
          y2="12"
        />
        <line
          x1="3"
          y1="6"
          x2="21"
          y2="6"
        />
        <line
          x1="3"
          y1="18"
          x2="21"
          y2="18"
        />
      </svg>
    </button>

    <div class="header-content">
      <!-- 麵包屑導航 -->
      <HeaderBreadcrumbs />

      <div class="header-spacer" />

      <!-- 全域搜尋 -->
      <HeaderSearch />

      <!-- 通用頁首動作 -->
      <HeaderActions />

      <!-- 通知中心 -->
      <HeaderNotifications />

      <!-- 使用者選單 -->
      <HeaderUserMenu />
    </div>
  </IAppBar>
</template>

<style scoped>
.header-nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #333;
  transition: color 0.2s;
}

.header-nav-toggle:hover {
  color: #3498db;
}

@media (max-width: 1023px) {
  .header-nav-toggle {
    display: block;
  }
}

.header-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-spacer {
  flex: 1;
}
</style>
