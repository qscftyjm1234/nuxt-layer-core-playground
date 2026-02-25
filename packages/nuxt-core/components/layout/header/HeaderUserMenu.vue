<script setup lang="ts">
/**
 * Header 使用者選單 - 框架無關
 * 框架無關的使用者選單
 */
import { useAppStore } from '../../../stores/app'
import IIcon from '../../uiInterface/IIcon.vue'

const appStore = useAppStore()
const isOpen = ref(false)

const handleAction = async (item: any) => {
  isOpen.value = false

  if (item.to) {
    navigateTo(item.to)
  } else if (item.action) {
    console.log('Triggered action:', item.action)
    if (item.action === 'logout') {
      const { $api } = useNuxtApp()

      try {
        // 1. 呼叫登出 API
        await $api.auth.logout()
      } catch (e) {
        console.error('Logout failed', e)
      } finally {
        // 2. 清除 Cookie
        const config = useRuntimeConfig()
        const token = useCookie(config.public.tokenKey as string)
        token.value = null

        // 3. 導回登入頁
        navigateTo('/login')
      }
    }
  }
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

// 點擊外部關閉
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.dropdown')) {
      isOpen.value = false
    }
  })
})
</script>

<template>
  <div
    v-if="appStore.config.header.userMenu.visible"
    class="dropdown"
    :class="{ 'is-open': isOpen }"
  >
    <button
      class="dropdown-toggle btn-icon"
      @click.stop="toggleMenu"
    >
      <div class="user-avatar">
        <IIcon
          icon="mdi-account-circle"
          size="32"
          color="#cbd5e1"
        />
      </div>
    </button>

    <div class="dropdown-menu">
      <!-- 使用者資訊 -->
      <div class="user-info">
        <div class="info-avatar">
          <IIcon
            icon="mdi-account"
            size="24"
            color="#fff"
          />
        </div>
        <div class="info-text">
          <div class="user-name">Admin User</div>
          <div class="user-email">admin@example.com</div>
        </div>
      </div>

      <!-- 選單項目 -->
      <div class="menu-items">
        <template
          v-for="(item, i) in appStore.config.header.userMenu.items"
          :key="i"
        >
          <div
            v-if="item.divider"
            class="menu-divider"
          />
          <button
            v-else
            class="menu-item"
            @click="handleAction(item)"
          >
            <IIcon
              v-if="item.icon"
              :icon="item.icon"
              size="18"
              class="item-icon"
            />
            {{ item.title }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 9999px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  width: 240px;
  background: #1e293b; /* Dark slate matching portal theme */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 10px 15px -3px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 1000;
  overflow: hidden;
}

.dropdown.is-open .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.info-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #5a5a5a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-text {
  flex: 1;
  overflow: hidden;
}

.user-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: #f8fafc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 0.75rem;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu-items {
  padding: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  text-align: left;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #cbd5e1;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.menu-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
  margin: 0.5rem 0;
}

.item-icon {
  opacity: 0.7;
}

.menu-item:hover .item-icon {
  opacity: 1;
}
</style>
