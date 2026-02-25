<script setup lang="ts">
import { ref } from 'vue'

const installCommand = 'npm install @softleader/nuxt-core'
const copied = ref(false)

const copyCommand = () => {
  navigator.clipboard.writeText(installCommand)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

const componentsList = [
  {
    title: '元件架構',
    desc: '三層架構設計與基礎元件總覽',
    icon: 'mdi-view-dashboard',
    to: '/showcase/component-showcase',
    color: '#2979FF'
  },
  {
    title: 'Icon',
    desc: 'MDI 圖示整合與自定義 SVG 支援',
    icon: 'mdi-emoticon-happy-outline',
    to: '/showcase/icon',
    color: '#F50057'
  },
  {
    title: '檔案上傳',
    desc: '拖曳上傳、預覽與驗證機制',
    icon: 'mdi-upload',
    to: '/showcase/file-upload',
    color: '#00B0FF'
  },
  {
    title: '檔案下載',
    desc: '多格式檔案下載與匯出',
    icon: 'mdi-download',
    to: '/showcase/file-download',
    color: '#00E5FF'
  },
  {
    title: '彈窗管理',
    desc: '統一的彈窗與對話框控制',
    icon: 'mdi-window-maximize',
    to: '/showcase/modal',
    color: '#AB47BC'
  },
  {
    title: '業務表單',
    desc: 'Email、手機與日期選擇等業務元件',
    icon: 'mdi-form-textbox',
    to: '/showcase/business-form',
    color: '#43a047'
  },
  {
    title: '載入狀態',
    desc: '全域 Loading Queue 管理',
    icon: 'mdi-progress-clock',
    to: '/showcase/loading',
    color: '#EC407A'
  },
  {
    title: '狀態檢視工具',
    desc: '狀態檢視工具',
    icon: 'mdi-eye-outline',
    to: '/showcase/data-inspector',
    color: '#7E57C2'
  },
  {
    title: '通知系統',
    desc: '全域 Snackbar 通知管理',
    icon: 'mdi-bell-ring-outline',
    to: '/showcase/notify',
    color: '#FF7043'
  },
  {
    title: '分頁管理',
    desc: '資料分頁邏輯與計算',
    icon: 'mdi-book-open-page-variant',
    to: '/showcase/pagination',
    color: '#5C6BC0'
  },
  {
    title: '表單驗證',
    desc: '常用規則與客製化驗證',
    icon: 'mdi-checkbox-marked-circle-outline',
    to: '/showcase/validation',
    color: '#9CCC65'
  }
]

const guidesList = [
  {
    title: '開發指南',
    desc: 'ESLint、Git Hooks 與系統設定說明',
    icon: 'mdi-book-open-page-variant',
    to: '/showcase/development',
    color: '#607D8B'
  },
  {
    title: '開發規矩',
    desc: '命名規則、程式碼風格與最佳實踐',
    icon: 'mdi-ruler-square',
    to: '/showcase/rules',
    color: '#FF6F00'
  }
]
</script>

<template>
  <div class="dashboard-container">
    <!-- Floating Background Orbs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-indigo-300/15 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-violet-300/15 rounded-full blur-3xl animate-float-slow-delayed"></div>
      <div class="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-3xl animate-pulse-gentle"></div>
    </div>

    <div class="content-wrapper relative z-10">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <div class="hero-badge">UI Library</div>
          <h1 class="page-title">
            快速開始
            <span class="subtitle">Quick Start</span>
          </h1>
          <p class="page-desc">
            探索 SoftLeader Nuxt Core 的強大 UI 組件，從基礎元件到進階業務功能，一應俱全。
          </p>
          
          <!-- Quick Install Card (Borderless) -->
          <div class="install-card">
            <div class="install-header">
              <span class="text-sm font-semibold text-slate-500">安裝套件</span>
            </div>
            <div class="install-body">
              <code class="install-code">$ {{ installCommand }}</code>
              <button 
                @click="copyCommand" 
                class="copy-btn"
                :class="{ 'copied': copied }"
              >
                <IIcon :icon="copied ? 'mdi-check' : 'mdi-content-copy'" size="18" />
                <span>{{ copied ? '已複製' : '複製' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Access Cards (Borderless) -->
      <div class="quick-access-grid">
        <NuxtLink to="/showcase/component-showcase" class="quick-card group">
            <div class="quick-icon bg-blue-100 text-blue-600">
                <IIcon icon="mdi-view-dashboard" size="32" />
            </div>
            <div class="quick-info">
                <h3>元件總覽</h3>
                <p>查看所有可用的 UI 元件與範例</p>
            </div>
            <IIcon icon="mdi-arrow-right" class="quick-arrow group-hover:translate-x-1" />
        </NuxtLink>

        <NuxtLink to="/showcase/development" class="quick-card group">
            <div class="quick-icon bg-slate-100 text-slate-600">
                <IIcon icon="mdi-book-open-page-variant" size="32" />
            </div>
            <div class="quick-info">
                <h3>開發指南</h3>
                <p>設定環境、ESLint 與 Git Hooks 規範</p>
            </div>
            <IIcon icon="mdi-arrow-right" class="quick-arrow group-hover:translate-x-1" />
        </NuxtLink>
      </div>

      <!-- Section: UI Components (Borderless) -->
      <section class="group-section">
        <div class="section-header">
          <h2 class="section-title">介面元件 <span class="count">{{ componentsList.length }}</span></h2>
          <div class="section-line"></div>
        </div>

        <div class="grid-layout">
          <NuxtLink
            v-for="item in componentsList"
            :key="item.to"
            :to="item.to"
            class="card-link"
          >
            <div class="feature-card group">
              <div class="card-icon" :style="{ color: item.color, backgroundColor: `${item.color}10` }">
                <IIcon :icon="item.icon" size="24" />
              </div>
              <div class="card-content">
                <h3 class="card-title group-hover:text-indigo-600 transition-colors">{{ item.title }}</h3>
                <p class="card-desc">{{ item.desc }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: #f8fafc; /* Light Slate */
  color: #1e293b;
  padding: 4rem 2rem;
  position: relative;
  overflow-x: hidden;
  font-family: 'Inter', system-ui, sans-serif;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Floating Animations */
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
.animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
.animate-float-slow-delayed { animation: float-slow 25s ease-in-out infinite; animation-delay: -5s; }
.animate-pulse-gentle { animation: pulse-gentle 8s ease-in-out infinite; }
@keyframes pulse-gentle {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(1.05); }
}

/* Hero Section */
.hero-section {
  text-align: center;
  margin-bottom: 4rem;
  display: flex;
  justify-content: center;
}

.hero-content {
  max-width: 700px;
  width: 100%;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
  background: rgba(79, 70, 229, 0.05);
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #4f46e5;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.page-title .subtitle {
  display: block;
  font-size: 1.25rem;
  color: #64748b;
  font-weight: 500;
  margin-top: 0.5rem;
  letter-spacing: 0.05em;
}

.page-desc {
  font-size: 1.125rem;
  color: #475569;
  margin-bottom: 2.5rem;
}

/* Install Card - Borderless */
.install-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08); /* Deep shadow */
  text-align: left;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(12px);
}

.install-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #4f46e5, #7c3aed);
}

.install-header {
  margin-bottom: 0.75rem;
}

.install-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  /* Removed border */
}

.install-code {
  font-family: 'JetBrains Mono', monospace;
  color: #334155;
  font-size: 0.95rem;
  font-weight: 500;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  /* Removed border */
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.copy-btn:hover {
  background: #f8fafc;
  color: #0f172a;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.copy-btn.copied {
  background: #dcfce7;
  color: #166534;
}

/* Quick Access Grid */
.quick-access-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 4rem;
}

/* Quick Card - Borderless */
.quick-card {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 24px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
    backdrop-filter: blur(12px);
    /* Removed border */
}

.quick-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.08); /* Enhanced hover shadow */
}

.quick-icon {
    width: 64px;
    height: 64px;
    border-radius: 20px; /* Softer */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.quick-info h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.25rem;
}

.quick-info p {
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.4;
}

.quick-arrow {
    margin-left: auto;
    color: #94a3b8;
    transition: transform 0.2s;
}

/* Section Styling */
.group-section {
  margin-bottom: 4rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.count {
    font-size: 0.9rem;
    background: #e2e8f0;
    color: #64748b;
    padding: 2px 8px;
    border-radius: 12px;
    font-weight: 600;
}

.section-line {
  height: 1px;
  background: #e2e8f0;
  width: 100%;
  opacity: 0.5;
}

/* Grid Layout */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.card-link {
  text-decoration: none;
  display: block;
}

/* Feature Card - Borderless */
.feature-card {
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  /* Removed border */
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-4px);
  box-shadow: 0 20px 30px -10px rgba(79, 70, 229, 0.1); /* Colorful soft shadow */
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.25rem;
}

.card-desc {
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 0 1rem;
  }
  
  .page-title {
    font-size: 2.25rem;
  }

  .install-card {
    padding: 1rem;
  }
  
  .install-body {
    flex-direction: column;
    gap: 1rem;
  }
  
  .copy-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
