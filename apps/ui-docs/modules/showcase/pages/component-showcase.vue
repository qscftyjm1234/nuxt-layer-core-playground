<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')

// Categorized Component Data
const categories = [
  {
    title: '基礎元件 (Foundation)',
    icon: 'mdi-puzzle-outline',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    items: [
      { name: 'Button (按鈕)', to: '/showcase/components/IButton' },
      { name: 'Icon (圖標)', to: '/showcase/icon' },
      { name: 'Typography (排版)', to: '/showcase/tokens' },
    ]
  },
  {
    title: '表單輸入 (Forms)',
    icon: 'mdi-form-select',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    items: [
      { name: 'Input (輸入框)', to: '/showcase/components/IInput' },
      { name: 'Select (下拉選單)', to: '/showcase/components/ISelect' },
      { name: 'Checkbox (多選框)', to: '/showcase/components/ICheckbox' },
      { name: 'Radio (單選框)', to: '/showcase/components/IRadio' },
      { name: 'Switch (開關)', to: '/showcase/components/ISwitch' },
      { name: 'Date Picker (日期)', to: '/showcase/components/IDatePicker' },
      { name: 'File Upload (上傳)', to: '/showcase/file-upload' },
      { name: 'Business Form (業務表單)', to: '/showcase/business-form' },
    ]
  },
  {
    title: '反饋互動 (Feedback)',
    icon: 'mdi-message-alert-outline',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    items: [
      { name: 'Modal (彈窗)', to: '/showcase/modal' },
      { name: 'Notify (通知)', to: '/showcase/notify' },
      { name: 'Loading (載入中)', to: '/showcase/loading' },
      { name: 'Progress (進度條)', to: '/showcase/components/IProgress' },
      { name: 'Chip (標籤)', to: '/showcase/components/IChip' },
    ]
  },
  {
    title: '資料展示 (Data Display)',
    icon: 'mdi-table-large',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    items: [
      { name: 'Data Table (表格)', to: '/showcase/components/IDataTable' },
      { name: 'Pagination (分頁)', to: '/showcase/pagination' },
      { name: 'Data Inspector (JSON)', to: '/showcase/data-inspector' },
    ]
  },
  {
    title: '導航佈局 (Navigation)',
    icon: 'mdi-compass-outline',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    items: [
      { name: 'Tabs (頁籤)', to: '/showcase/components/ITabs' },
      { name: 'Menu (選單)', to: '/showcase/components/IMenu' },
      { name: 'Breadcrumb (麵包屑)', to: '/showcase/components/IBreadcrumb' },
    ]
  }
]

// Search Logic
const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories

  const query = searchQuery.value.toLowerCase()
  return categories.map(category => {
    const filteredItems = category.items.filter(item => 
      item.name.toLowerCase().includes(query)
    )
    
    if (filteredItems.length > 0 || category.title.toLowerCase().includes(query)) {
      return {
        ...category,
        items: filteredItems.length > 0 ? filteredItems : category.items
      }
    }
    return null
  }).filter(Boolean) as typeof categories
})
</script>

<template>
  <div class="gallery-container">
    <!-- Background Animations (Consistent) -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-[5%] right-[10%] w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-3xl animate-float-slow-delayed"></div>
    </div>

    <div class="content-wrapper relative z-10">
      <!-- Header with Actions -->
      <div class="header-section">
        <div class="header-left">
          <h1 class="page-title">元件庫總覽</h1>
          <p class="page-subtitle">探索 {{ categories.reduce((acc, c) => acc + c.items.length, 0) }} 個 UI 元件</p>
        </div>
        
        <div class="header-actions">
          <!-- Search -->
          <div class="search-wrapper">
            <IIcon icon="mdi-magnify" class="search-icon" size="20" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="搜尋元件..." 
              class="search-input"
            >
          </div>
        </div>
      </div>

      <!-- Bento Grid Layout -->
      <div class="bento-grid">
        <transition-group name="fade-scale">
          <div 
            v-for="category in filteredCategories" 
            :key="category.title"
            class="bento-card"
          >
            <!-- Card Header -->
            <div class="card-header">
              <div class="category-icon" :class="[category.bg, category.color]">
                <IIcon :icon="category.icon" size="24" />
              </div>
              <h2 class="category-title">{{ category.title }}</h2>
            </div>

            <!-- Items Grid -->
            <div class="items-grid">
              <NuxtLink
                v-for="item in category.items"
                :key="item.name"
                :to="item.to"
                class="component-item group"
              >
                <div class="item-dot group-hover:bg-indigo-500"></div>
                <span class="item-name">{{ item.name }}</span>
                <IIcon icon="mdi-chevron-right" size="16" class="item-arrow opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </NuxtLink>
            </div>
          </div>
        </transition-group>

        <!-- No Results -->
        <div v-if="filteredCategories.length === 0" class="no-results">
          <div class="flex flex-col items-center">
             <IIcon icon="mdi-emoticon-sad-outline" size="48" class="text-slate-300 mb-4" />
             <p class="text-slate-500">找不到 "{{ searchQuery }}" 相關的元件</p>
             <button @click="searchQuery = ''" class="text-indigo-600 font-semibold hover:underline mt-2">清除搜尋</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-container {
  min-height: 100vh;
  background: #f8fafc;
  color: #1e293b;
  padding: 2rem;
  position: relative;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

/* Header */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #64748b;
  font-size: 1rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

/* Search */
.search-wrapper {
  position: relative;
  width: 250px;
}

.search-input {
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0);
  background: white;
  font-size: 0.9rem;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.search-input:focus {
  outline: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border-color: #e2e8f0;
}

.search-icon {
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
}

/* Action Buttons */
.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.action-btn.primary {
  background: #4f46e5;
  color: white;
  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);
}

.action-btn.primary:hover {
  background: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
}

.action-btn.secondary {
  background: white;
  color: #64748b;
}

.action-btn.secondary:hover {
  background: #f1f5f9;
  color: #0f172a;
}

/* Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.bento-card {
  background: #ffffff; /* Solid white for better visibility */
  border: 1px solid #e2e8f0; /* Clear border */
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.bento-card:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-4px);
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.category-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
}

/* Items Grid */
.items-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

.component-item {
  display: flex;
  align-items: center;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  text-decoration: none;
  color: #475569;
  transition: all 0.2s;
  background: rgba(255,255,255,0.5);
}

.component-item:hover {
  background: white;
  color: #4f46e5;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
}

.item-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #cbd5e1;
  margin-right: 0.75rem;
  transition: background 0.2s;
}

.item-name {
  font-size: 0.9rem;
  font-weight: 500;
  flex: 1;
}

.item-arrow {
  color: #4f46e5;
}

/* Animations */
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -20px) scale(1.05); }
}
.animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
.animate-float-slow-delayed { animation: float-slow 25s ease-in-out infinite; animation-delay: -5s; }

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.4s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Responsive */
@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
  
  .header-actions {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-wrapper, .search-input {
    width: 100%;
  }
  
  .action-btn {
    justify-content: center;
  }
}
</style>
