<template>
  <div class="home-container">
    <!-- Atmospheric Background Elements -->
    <div class="absolute top-0 inset-x-0 h-[800px] overflow-hidden pointer-events-none z-0">
      <div class="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
      <!-- Hero Section -->
      <div class="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
        <!-- Hero Content -->
        <div class="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold text-sm mb-8 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-default">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            v1.0.0 正式發佈
          </div>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            <span class="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">SoftLeader UI</span>
            <br />
            打造企業級應用
          </h1>
          
          <p class="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            為現代企業量身打造的標準化、安全且專業的前端架構。讓您的 Nuxt 應用程式自信擴展。
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <NuxtLink to="/showcase/components/IButton" class="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30">
              開始使用
              <IIcon icon="mdi-arrow-right" class="ml-2 transition-transform group-hover:translate-x-1" />
            </NuxtLink>
            
            <NuxtLink to="/showcase/tokens" class="group inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <IIcon icon="mdi-palette" class="mr-2 text-indigo-500" />
              設計系統
            </NuxtLink>
          </div>
        </div>

        <!-- Hero Visualization (Isometric) -->
        <div class="lg:col-span-6 relative perspective-2000">
          <div class="relative transform rotate-y-[-12deg] rotate-x-[5deg] hover:rotate-y-[-8deg] hover:rotate-x-[2deg] transition-transform duration-500 preserve-3d">
            <!-- Main Card -->
            <div class="relative bg-white rounded-2xl shadow-2xl shadow-indigo-500/10 border border-slate-100 p-8 z-20">
              <div class="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                <img src="/images/softleader_logo.png" alt="SoftLeader" class="h-12 w-auto object-contain rounded-xl" />
                <div>
                  <div class="font-bold text-slate-900">SoftLeader Core</div>
                  <div class="text-sm text-slate-500">企業版 (Enterprise Edition)</div>
                </div>
                <div class="ml-auto flex gap-2">
                  <div class="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div class="w-3 h-3 rounded-full bg-slate-200"></div>
                </div>
              </div>
              
              <div class="space-y-4">
                <div class="h-8 bg-slate-50 rounded-lg w-3/4"></div>
                <div class="h-4 bg-slate-50 rounded w-full"></div>
                <div class="h-4 bg-slate-50 rounded w-5/6"></div>
                <div class="grid grid-cols-2 gap-4 mt-6">
                  <div class="h-24 bg-indigo-50 rounded-xl border border-indigo-100 p-4">
                    <div class="w-8 h-8 rounded-lg bg-indigo-100 mb-2 text-indigo-600 flex items-center justify-center">
                      <IIcon icon="mdi-shield-check" size="20" />
                    </div>
                  </div>
                  <div class="h-24 bg-violet-50 rounded-xl border border-violet-100 p-4">
                     <div class="w-8 h-8 rounded-lg bg-violet-100 mb-2 text-violet-600 flex items-center justify-center">
                      <IIcon icon="mdi-rocket-launch" size="20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Elements -->
            <div class="absolute -top-12 -right-12 bg-white p-4 rounded-xl shadow-xl shadow-indigo-500/20 z-30 animate-float">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <IIcon icon="mdi-check" />
                </div>
                <div>
                  <div class="text-xs text-slate-500 font-semibold uppercase tracking-wider">狀態</div>
                  <div class="font-bold text-slate-900">系統穩定</div>
                </div>
              </div>
            </div>

            <div class="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl shadow-violet-500/20 z-30 animate-float delay-1000">
              <div class="flex items-center gap-3">
                 <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <IIcon icon="mdi-lightning-bolt" />
                </div>
                <div>
                  <div class="text-xs text-slate-500 font-semibold uppercase tracking-wider">效能</div>
                  <div class="font-bold text-slate-900">98/100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <!-- Features Grid -->
      <div class="mt-32">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">為什麼選擇 Core Layer?</h2>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">不僅僅是組件庫，更是一套完整的企業級開發思維與規範。</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ICard
            v-for="feature in features"
            :key="feature.title"
            class="group h-full bg-white border border-slate-200 hover:border-indigo-100 hover:shadow-[0_10px_40px_-10px_rgba(79,70,229,0.1)] transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden"
            :no-padding="true"
          >
            <div class="p-8">
              <div class="w-14 h-14 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <!-- Use text/emoji as icon fallback or actual icon component -->
                <span class="text-2xl">{{ feature.icon }}</span>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{{ feature.title }}</h3>
              <p class="text-slate-600 leading-relaxed">{{ feature.description }}</p>
            </div>
            <div class="h-1 w-full bg-gradient-to-r from-indigo-500 to-violet-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </ICard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    title: '介面層解耦',
    description: '底層 UI 框架可隨時切換 (Vuetify/AntD/Tailwind)，頁面代碼完全不需要變動，實現真正的技術債隔離。',
    icon: '🧩'
  },
  {
    title: '智慧業務組件',
    description: '內建自動化數據處理邏輯，將 API 呼叫、驗證、錯誤處理完美封裝於組件內，大幅減少重複代碼。',
    icon: '⚡'
  },
  {
    title: '極致型別安全',
    description: '全專案採用 Rigid TypeScript 撰寫，提供完美的自動補全與編譯時檢查，讓錯誤在開發階段就無所遁形。',
    icon: '🛡️'
  },
  {
    title: '多系統支持',
    description: '專為 Monorepo 與 Nuxt Layers 架構設計，一套核心同時支援無限個產品應用，維護成本降至最低。',
    icon: '🚀'
  },
  {
    title: '企業級安全性',
    description: '內建資安掃描與防護機制，符合企業資安規範，讓您的應用程式從第一天起就安全無虞。',
    icon: '🔒'
  },
  {
    title: '自動化文檔',
    description: '組件文檔與與範例自動生成，保持文檔與代碼永遠同步，降低溝通成本。',
    icon: '📚'
  }
]


definePageMeta({
  layout: 'home'
})
</script>

<style scoped>
.perspective-2000 {
  perspective: 2000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes float-slow {
  0%, 100% { 
    transform: translate(0, 0) scale(1);
  }
  33% { 
    transform: translate(30px, -30px) scale(1.1);
  }
  66% { 
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-float-slow {
  animation: float-slow 20s ease-in-out infinite;
}

.animate-float-slow-delayed {
  animation: float-slow 25s ease-in-out infinite;
  animation-delay: -5s;
}

@keyframes pulse-gentle {
  0%, 100% { 
    opacity: 0.15;
    transform: scale(1);
  }
  50% { 
    opacity: 0.25;
    transform: scale(1.05);
  }
}

.animate-pulse-gentle {
  animation: pulse-gentle 8s ease-in-out infinite;
}

.home-container {
  min-height: 100vh;
  background-color: #F8FAFC; /* Slate 50 */
  font-family: 'Inter', sans-serif; /* Fallback until Plus Jakarta Sans is loaded */
}
</style>
