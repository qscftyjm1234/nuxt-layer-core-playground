<script setup lang="ts">
/**
 * 應用程式側邊欄 - 使用三層架構
 * 業務層：整合 Store、權限控制、導航邏輯
 * UI 層：使用 IDrawer + IMenuItem (可替換 UI 框架)
 */
import IDrawer from '../uiInterface/layout/IDrawer.vue'
import AppSidebarItem from './AppSidebarItem.vue'

const sidebarStore = useSidebarStore()
const userStore = useUserStore()
const appStore = useAppStore()

const props = defineProps<{
  modelValue?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const drawer = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// 確保 sidebar 已經生成,並傳入使用者權限
watch(
  () => userStore.permissions,
  (newPermissions) => {
    sidebarStore.generate(newPermissions)
  },
  { immediate: true }
)
</script>

<template>
  <IDrawer
    v-model="drawer"
    :permanent="true"
    width="256px"
  >
    <!-- 品牌 Logo 區塊 -->
    <div class="sidebar-brand">
      <div class="sidebar-brand-icon">
        <img
          v-if="appStore.config.branding.logo.image"
          :src="appStore.config.branding.logo.image"
          alt="Logo"
          style="width: 100%; height: 100%; object-fit: contain"
        />
        <svg
          v-else
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
      </div>
      <div class="sidebar-brand-text">
        <h1 class="sidebar-brand-title">
          {{ appStore.config.branding.title }}
        </h1>
        <p class="sidebar-brand-subtitle">
          {{ appStore.config.branding.subtitle }}
        </p>
      </div>
    </div>

    <!-- 導航選單 -->
    <nav class="sidebar-nav">
      <div class="sidebar-nav-title">
        {{ appStore.config.sidebar.mainMenuTitle }}
      </div>
      <AppSidebarItem
        v-for="item in sidebarStore.items"
        :key="item.label"
        :item="item"
      />
    </nav>
  </IDrawer>
</template>

<style scoped>
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.sidebar-brand-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  color: #3498db;
}

.sidebar-brand-text {
  flex: 1;
  min-width: 0;
}

.sidebar-brand-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-brand-subtitle {
  font-size: 0.75rem;
  color: #7f8c8d;
  margin: 0.25rem 0 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-nav {
  padding: 1rem 0;
}

.sidebar-nav-title {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #95a5a6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
