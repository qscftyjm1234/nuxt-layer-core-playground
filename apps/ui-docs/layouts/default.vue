<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// 基礎組件 (Interface)
const interfaceComponents = [
  'IAlert', 'IAvatar', 'IButton', 'ICard', 'ICheckbox', 'IChip', 
  'IDataTable', 'IDatePicker', 'IIcon', 'IInput', 'IModal', 
  'IPagination', 'IRadio', 'ISelect', 'ISheet', 'ISnackbar', 
  'ISuspense', 'ISwitch', 'ITabs', 'ITextarea', 'ITextField'
].sort()

// 業務組件 (Business)
const businessComponents = [
  'CitySelect', 'CountrySelect', 'DateRangePicker', 'EmailInput', 
  'PasswordInput', 'PhoneInput', 'SmartComplexWidget', 'SmartTable'
].sort()

// 核心功能與組合函式 (Composables)
const composablesList = [
  'useApi', 'useAuth', 'useDebounce', 'useEncryption', 
  'useErrorHandler', 'useFileUpload', 'useOptions', 'usePagination', 
  'useValidation'
].sort()

// 判斷當前是否在使用特定的路由
const isCurrentComponent = (name: string) => route.path.includes(`/components/${name}`)
const isCurrentFeature = (name: string) => route.path.includes(`/features/${name}`)

</script>

<template>
  <div class="flex h-screen overflow-hidden bg-gray-50/50 font-inter text-slate-800">
    <!-- 側邊欄 (Sidebar) - Matches training platform Sider -->
    <aside class="w-[260px] flex-shrink-0 bg-white shadow-sm border-r border-gray-100 z-20 flex flex-col transition-all">
      <!-- Sidebar Header (Logo) -->
      <div class="h-16 flex items-center px-6 border-b border-gray-100 shrink-0">
        <NuxtLink to="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm text-white font-black text-xs">
            SLC
          </div>
          <span class="text-sm font-bold text-gray-800 tracking-tight leading-none">
            SoftLeader<br/><span class="text-blue-600">Core Docs</span>
          </span>
        </NuxtLink>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 overflow-y-auto px-3 pt-4 pb-6 flex flex-col gap-6 custom-scrollbar">
        <!-- Guide Section -->
        <div>
          <div class="px-3 mb-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">Guide</div>
          <div class="flex flex-col gap-1">
            <NuxtLink to="/" class="nav-item group" :class="{ 'active': route.path === '/' }">
              <svg class="w-4 h-4 mr-3 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              快速開始
            </NuxtLink>
            <NuxtLink to="/tokens" class="nav-item group" :class="{ 'active': route.path === '/tokens' }">
              <svg class="w-4 h-4 mr-3 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
              設計令牌
            </NuxtLink>
            <NuxtLink to="/architecture" class="nav-item group" :class="{ 'active': route.path === '/architecture' }">
              <svg class="w-4 h-4 mr-3 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              系統架構
            </NuxtLink>
          </div>
        </div>

        <!-- Composables Section -->
        <div>
          <div class="px-3 mb-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">核心功能 (Composables)</div>
          <div class="flex flex-col gap-1">
            <NuxtLink v-for="comp in composablesList" :key="comp" :to="`/features/${comp}`" class="nav-item font-mono text-[13px]" :class="{ 'active': isCurrentFeature(comp) }">
              <span class="w-1.5 h-1.5 rounded-full bg-gray-300 mr-3 marker-dot"></span>
              {{ comp }}
            </NuxtLink>
          </div>
        </div>

        <!-- Interface Section -->
        <div>
          <div class="px-3 mb-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">基礎元件 (Interface)</div>
          <div class="flex flex-col gap-1">
            <NuxtLink v-for="comp in interfaceComponents" :key="comp" :to="`/components/${comp}`" class="nav-item font-mono text-[13px]" :class="{ 'active': isCurrentComponent(comp) }">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-200 mr-3 marker-dot"></span>
              {{ comp }}
            </NuxtLink>
          </div>
        </div>

        <!-- Business Section -->
        <div>
          <div class="px-3 mb-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">業務元件 (Business)</div>
          <div class="flex flex-col gap-1">
            <NuxtLink v-for="comp in businessComponents" :key="comp" :to="`/components/${comp}`" class="nav-item font-mono text-[13px]" :class="{ 'active': isCurrentComponent(comp) }">
              <span class="w-1.5 h-1.5 rounded-full bg-indigo-200 mr-3 marker-dot"></span>
              {{ comp }}
            </NuxtLink>
          </div>
        </div>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50/50">
      
      <!-- 頂部導航 (Header) - Matches training platform Header -->
      <header class="bg-white/80 backdrop-blur-md px-6 border-b border-gray-100 flex justify-between items-center h-16 shrink-0 z-10 sticky top-0">
        <div class="flex items-center gap-4">
          <!-- Search Bar (Employee Training Platform Style) -->
          <div class="hidden md:flex items-center relative ml-4">
            <svg class="absolute left-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input
                type="text"
                placeholder="搜尋組件、功能 (Ctrl+K)..."
                class="pl-10 pr-12 py-2 bg-gray-50 border border-transparent rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white focus:border-blue-200 w-64 md:w-80 transition-all text-slate-700 font-medium"
            />
            <div class="absolute right-3 flex items-center justify-center px-1.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-400">⌘K</div>
          </div>
        </div>

        <div class="flex items-center gap-5">

          <!-- Theme / Github Links -->
          <a href="https://github.com" target="_blank" class="text-gray-500 hover:bg-gray-100 rounded-full p-1.5 transition-colors" title="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.417 22 12c0-5.523-4.477-10-10-10z"/></svg>
          </a>

          <!-- <div class="h-6 w-[1px] bg-gray-200"></div> -->

          <!-- User Dropdown Mockup (Platform Form Style) -->
          <!-- <div class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-full pr-4 transition-colors border border-transparent hover:border-gray-100">
            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
              SL
            </div>
            <div class="hidden md:flex flex-col items-start justify-center ml-1 leading-none">
                <div class="text-sm font-bold text-gray-700 mb-0.5">開發者</div>
                <div class="text-[10px] text-gray-500 font-medium tracking-wide uppercase">軟體工程師</div>
            </div>
          </div> -->
        </div>
      </header>

      <!-- 主要渲染區 (Main Content) - Matches training platform Content area -->
      <main class="flex-1 overflow-y-auto scroll-smooth" scroll-region>
        <!-- Inside content wrapper -->
        <div :class="route.path === '/' ? 'w-full' : 'p-6 md:p-8 lg:p-12 w-full max-w-7xl mx-auto'">
          <!-- Page Slot. On the landing page, it will be wrapped inside pages/index.vue. On documentation pages, they will align cleanly inside here. -->
          <slot />
        </div>
        
        <!-- 文件底吧 (Footer) -->
        <footer class="mt-auto py-8 text-center text-gray-400 text-sm border-t border-gray-100/50 mt-20">
          <p class="font-medium">Released under the MIT License.</p>
          <p class="mt-1">Copyright © 2026 SoftLeader Technical Team.</p>
        </footer>
      </main>

    </div>

    <!-- 全域通知 (需搭配 useNotify 使用) -->
    <GlobalSnackbar />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.font-inter {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* 導覽列項目樣式 - 參照 employee-training-platform Menu Style */
.nav-item {
  display: flex;
  align-items: center;
  padding: 0.6rem 0.75rem;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: #0f172a;
  background-color: #f8fafc;
}

.nav-item.active {
  color: #2563eb;
  background-color: #eff6ff; /* 藍色-50 */
}

.nav-item.active .marker-dot {
  background-color: #2563eb;
}

/* 自訂捲軸樣式 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 4px;
  transition: background-color 0.2s;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
}
</style>
