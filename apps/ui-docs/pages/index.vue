<script setup lang="ts">
const steps = [
  {
    num: 1,
    title: '情境 A：全新專案（空資料夾）',
    desc: '執行以下指令，自動建立完整的 Nuxt 3 專案結構，包含 nuxt.config.ts、app.vue、ESLint、Prettier、Git Hooks 等所有配置。',
    code: `# 建立新專案（my-app 可替換為你的專案名稱）\nnpx softleader-nuxt-core init my-app\n\ncd my-app\nnpm install\nnpm run dev`,
    lang: 'bash'
  },
  {
    num: 2,
    title: '情境 B：已有 Nuxt 3 專案',
    desc: '若專案已存在，只需安裝套件並在 nuxt.config.ts 加入一行 extends，重啟 dev server 後即可自動取得所有組件與 Composables，無需手動匯入。',
    code: `# 1. 安裝套件\nnpm install softleader-nuxt-core\n\n# 2. 修改 nuxt.config.ts\nexport default defineNuxtConfig({\n  extends: ['softleader-nuxt-core']\n})`,
    lang: 'bash'
  },
  {
    num: 3,
    title: '直接可用完整範例',
    desc: '複製以下程式碼，貼入任意 .vue 檔案的 <script setup> 區塊，重整頁面即可看到結果。',
    code: `onMounted(() => {\n  const notify = useNotify()\n  notify.success('歡迎回來')\n})`,
    lang: 'typescript'
  },
  {
    num: 4,
    title: '使用 Interface 基礎元件',
    desc: '嚴禁直接使用 Vuetify 原生元件。請一律使用封裝好的 Interface 元件，確保全產品線 UI 一致性。複製以下完整範例，貼入任意 .vue 頁面即可驗證套件是否正確引入。',
    code: `<script setup>\nconst notify = useNotify()\n\nconst handleSave = () => {\n  notify.success('IButton 運作正常，套件引入成功')\n}\n<\/script>\n\n<template>\n  <div style="padding: 24px">\n    <IButton variant="primary" @click="handleSave">\n      點我驗證套件\n    </IButton>\n  </div>\n</template>`,
    lang: 'html'
  },
  {
    num: 5,
    title: '使用 Business 業務元件',
    desc: '高頻業務場景已有現成元件，如密碼驗證輸入框，內建強度指示器與規則驗證。複製以下完整範例貼入任意 .vue 頁面即可使用。',
    code: `<script setup>\nconst password = ref('')\n<\/script>\n\n<template>\n  <div style="padding: 24px; max-width: 400px">\n    <PasswordInput v-model="password" />\n    <p style="margin-top: 8px; color: #666; font-size: 14px">\n      目前密碼：{{ password || '（尚未輸入）' }}\n    </p>\n  </div>\n</template>`,
    lang: 'html'
  }
]
</script>

<template>
  <div class="bg-[#f9fafb] min-h-screen pb-20 pt-8" style="font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased;">
    <div class="max-w-2xl mx-auto px-4 sm:px-6">
      <!-- Page Title -->
      <div class="mb-10">
        <h1 class="text-3xl font-black text-gray-900 tracking-tight">快速開始</h1>
        <p class="text-gray-500 text-sm mt-2">跟著下方步驟完成整合，全程約 5 分鐘。</p>
      </div>

      <!-- Steps -->
      <div class="space-y-4">
        <div
          v-for="step in steps"
          :key="step.num"
          class="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_2px_0_rgba(0,0,0,0.03),0_1px_6px_-1px_rgba(0,0,0,0.02)] p-6"
        >
          <!-- Step Header -->
          <div class="flex items-center gap-3 mb-3">
            <div class="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
              {{ step.num }}
            </div>
            <h2 class="text-base font-black text-gray-900 tracking-tight">{{ step.title }}</h2>
          </div>

          <!-- Description -->
          <p class="text-gray-500 text-sm leading-relaxed mb-4">{{ step.desc }}</p>

          <!-- Code Block -->
          <div class="relative">
            <div class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">{{ step.lang }}</div>
            <div class="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 font-mono text-xs text-slate-700 overflow-x-auto">
              <pre>{{ step.code }}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Done -->
      <div class="mt-8 flex items-center gap-3">
        <div class="flex-1 h-px bg-gray-200"></div>
        <div class="flex items-center gap-2 text-sm font-bold text-gray-400">
          <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
          整合完成，開始開發
        </div>
        <div class="flex-1 h-px bg-gray-200"></div>
      </div>

      <!-- Next steps -->
      <div class="mt-6 bg-white rounded-2xl border border-gray-100 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 class="text-sm font-black text-gray-900 mb-0.5">繼續深入？</h3>
          <p class="text-xs text-gray-500">查看完整組件文件或系統架構說明。</p>
        </div>
        <div class="flex gap-2 shrink-0">
          <NuxtLink to="/components/IButton" class="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">
            組件文件
          </NuxtLink>
          <NuxtLink to="/architecture" class="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors">
            架構說明
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
pre { margin: 0; white-space: pre-wrap; }
</style>
