<script setup lang="ts">


const modules = [
  {
    title: '開發指南',
    description: '專案開發指南，包含環境建置、程式碼規範 (ESLint)、Git 流程與架構設計說明。',
    icon: 'mdi-book-open-page-variant',
    to: '/showcase/development',
    gradient: 'from-orange-400 to-orange-600'
  },
  {
    title: '元件模組',
    description: '一覽所有元件、功能模組與範例程式碼，包含 UI 元件與業務邏輯展示。',
    icon: 'mdi-view-dashboard',
    to: '/showcase',
    gradient: 'from-cyan-400 to-blue-600'
  }
]

const features = [
  {
    title: '日期時間',
    subtitle: '日期時間處理',
    icon: 'mdi-calendar-clock',
    to: '/showcase/datetime',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10'
  },
  {
    title: '檔案處理',
    subtitle: '檔案操作整合',
    icon: 'mdi-file-sync',
    to: '/showcase/file-upload',
    color: 'text-sky-400',
    bgColor: 'bg-sky-400/10'
  },
  {
    title: '資料檢測器',
    subtitle: '資料開發工具',
    icon: 'mdi-bug',
    to: '/showcase/data-inspector',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10'
  },
  {
    title: '更多功能',
    subtitle: '通用工具函式',
    icon: 'mdi-tools',
    to: '/showcase',
    color: 'text-slate-400',
    bgColor: 'bg-slate-400/10'
  }
]
</script>

<template>
  <div
    class="min-h-screen relative flex flex-col items-center justify-center py-16 px-8 bg-[#0f172a] overflow-hidden text-white font-sans"
  >
    <!-- Background Decoration -->
    <div
      class="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.08),transparent_40%),radial-gradient(circle_at_85%_60%,rgba(139,92,246,0.08),transparent_40%)]"
    ></div>

    <IStack
      direction="column"
      :gap="4"
      align="center"
      class="relative z-10 w-full max-w-6xl px-4 animate-fadeInUp"
    >
      <!-- Hero Section -->
      <div
        class="text-center mb-20 max-w-3xl relative after:content-[''] after:absolute after:-bottom-10 after:left-1/2 after:-translate-x-1/2 after:w-14 after:h-1 after:bg-white/10 after:rounded-full"
      >
        <div
          class="inline-flex items-center gap-2 py-2 px-5 bg-white/10 border border-white/20 rounded-full text-sm font-semibold tracking-wider text-slate-200 mb-8 backdrop-blur-lg hover:bg-white/15 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all"
        >
          前端開發套件
        </div>
        <h1
          class="text-7xl font-extrabold leading-tight mb-8 tracking-tight text-white transition-all"
        >
          企業級前端
          <br />
          <span
            class="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent animate-gradientFlow bg-[length:200%_auto]"
          >
            標準化架構系統
          </span>
        </h1>
        <p class="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
          前端標準化開發套件，整合 UI 介面、業務邏輯與核心工具。
          <br />
          加速專案開發效率，確保程式碼品質與一致性。
        </p>

        <IStack
          :gap="1"
          justify="center"
          class="mt-12"
        >
          <NuxtLink
            v-slot="{ navigate }"
            to="/showcase"
            custom
          >
            <IButton
              size="large"
              class="!bg-white !text-slate-900 !font-bold rounded-full !px-8 shadow-lg shadow-white/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/40 transition-all"
              @click="navigate"
            >
              <template #icon>
                <IIcon icon="mdi-rocket-launch" />
              </template>
              開始使用
            </IButton>
          </NuxtLink>
          <NuxtLink
            v-slot="{ navigate }"
            to="https://github.com/example/repo"
            target="_blank"
            custom
          >
            <IButton
              variant="outlined"
              size="large"
              class="!border-white/30 !text-white backdrop-blur-sm !bg-white/5 rounded-full !px-8 hover:!bg-white/15 hover:!border-white/40 transition-all"
              @click="navigate"
            >
              <template #icon>
                <IIcon icon="mdi-github" />
              </template>
              專案原始碼
            </IButton>
          </NuxtLink>
        </IStack>
      </div>

      <!-- Main Modules -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-16">
        <NuxtLink
          v-for="mod in modules"
          :key="mod.title"
          :to="mod.to"
          class="no-underline group"
        >
          <ICard
            class="h-full bg-slate-800/70 border-white/15 backdrop-blur-xl p-10 rounded-2xl transition-all group-hover:-translate-y-2 group-hover:bg-slate-800/90 group-hover:border-sky-400/50 shadow-lg group-hover:shadow-2xl"
          >
            <template #header>
              <div class="flex items-center gap-6 mb-6">
                <div
                  :class="[
                    'w-16 h-16 rounded-2xl flex items-center justify-center bg-black/20 border border-white/10 bg-gradient-to-br',
                    mod.gradient
                  ]"
                >
                  <IIcon
                    :icon="mod.icon"
                    class="text-2xl text-white"
                  />
                </div>
                <h3 class="text-2xl font-bold text-white m-0 tracking-tight">{{ mod.title }}</h3>
              </div>
            </template>
            <p class="text-slate-300 leading-relaxed mb-8 text-[1.05rem]">{{ mod.description }}</p>
            <div
              class="inline-flex items-center gap-2 text-white font-semibold text-sm py-3 px-6 rounded-full bg-sky-500/80 group-hover:bg-sky-600 transition-all shadow-md group-hover:pr-7"
            >
              <span>查看詳情</span>
              <IIcon
                icon="mdi-arrow-right"
                class="text-base"
              />
            </div>
          </ICard>
        </NuxtLink>
      </div>

      <!-- Feature Badges -->
      <div class="w-full text-center mt-8 pt-16 border-t border-white/10">
        <h2 class="text-sm uppercase tracking-[0.15em] text-slate-400 mb-10 font-bold">核心模組</h2>
        <div class="flex justify-center flex-wrap gap-6">
          <NuxtLink
            v-for="feat in features"
            :key="feat.title"
            :to="feat.to"
            class="no-underline"
          >
            <div
              class="flex items-center gap-4 py-4 px-6 bg-slate-800/50 border border-white/10 rounded-xl hover:bg-slate-800/80 hover:-translate-y-0.5 hover:border-white/30 transition-all"
            >
              <div
                :class="[
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  feat.color,
                  feat.bgColor
                ]"
              >
                <IIcon
                  :icon="feat.icon"
                  class="text-lg"
                />
              </div>
              <div class="text-left">
                <div class="text-slate-100 font-semibold text-[0.95rem]">{{ feat.title }}</div>
                <div class="text-slate-400 text-xs mt-0.5">{{ feat.subtitle }}</div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </IStack>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradientFlow {
  animation: gradientFlow 5s linear infinite;
}
</style>
