<script setup lang="ts">
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

definePageMeta({
  title: '多語系',
  icon: 'mdi-translate',
  layout: 'portal'
})

// 使用 useLanguage
const { locale, setLocale, currentLocale, availableLocales } = useLanguage()

// 格式化顯示用
const formatJson = (data: any) => JSON.stringify(data, null, 2)
</script>

<template>
  <ShowcasePage
    title="多語系 (Language)"
    description="系統語系管理與切換，基於 @nuxtjs/i18n 的封裝。"
  >
    <!-- 1. Core Concept -->
    <ShowcaseSection title="核心概念 (Core Concepts)">
      <ul class="benefit-list">
        <li>
          <strong>集中管理</strong>
          透過 useLanguage 統一管理語系狀態，不需重複引入 useI18n。
        </li>
        <li>
          <strong>自動偵測</strong>
          currentLocale 會自動根據當前語系代碼，回傳完整的語系設定物件。
        </li>
        <li>
          <strong>清單過濾</strong>
          availableLocales 自動排除當前語系，方便製作切換選單。
        </li>
      </ul>
    </ShowcaseSection>

    <!-- 2. Interactive Demo -->
    <ShowcaseSection title="互動範例 (Interactive Demo)">
      <ShowcaseCard
        title="語系切換器"
        description="點擊按鈕切換全站語系，觀察下方狀態變化。"
        full-width
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Control -->
          <div class="flex flex-col gap-4">
            <div class="text-sm font-bold text-slate-300">切換語系 (Switch)</div>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="lang in availableLocales"
                :key="lang.code"
                class="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors flex items-center gap-2 border border-slate-600"
                @click="setLocale(lang.code)"
              >
                <span>{{ lang.name }}</span>
                <span class="text-xs opacity-50">({{ lang.code }})</span>
              </button>
            </div>

            <div class="mt-4 p-4 rounded bg-slate-800/50 border border-slate-700/50">
              <div class="text-xs text-slate-400 mb-1">當前語系 (Current)</div>
              <div class="text-2xl font-bold text-primary-400 flex items-center gap-2">
                <IIcon icon="mdi-translate" />
                {{ currentLocale?.name }}
                <span class="text-lg opacity-50 font-mono">{{ locale }}</span>
              </div>
            </div>
          </div>

          <!-- State View -->
          <div class="flex flex-col gap-2">
            <div class="text-sm font-bold text-slate-300">狀態與設定 (State)</div>
            <ShowcaseCodeBlock
              :code="formatJson(currentLocale)"
              language="json"
              label="currentLocale"
            />
          </div>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 3. API Reference -->
    <ShowcaseSection title="API 參考 (Reference)">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr>
              <th
                class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
              >
                名稱
              </th>
              <th
                class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
              >
                類型
              </th>
              <th
                class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm w-full"
              >
                說明
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- State -->
            <tr>
              <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                locale
              </td>
              <td class="p-4 border border-slate-700/50 text-slate-400 text-xs">
                Ref&lt;string&gt;
              </td>
              <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                目前的語系代碼 (例如: 'zh-TW')。
              </td>
            </tr>
            <tr>
              <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                currentLocale
              </td>
              <td class="p-4 border border-slate-700/50 text-slate-400 text-xs">
                Computed&lt;LocaleObject&gt;
              </td>
              <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                目前的語系完整設定物件。
              </td>
            </tr>
            <tr>
              <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                availableLocales
              </td>
              <td class="p-4 border border-slate-700/50 text-slate-400 text-xs">
                Computed&lt;LocaleObject[]&gt;
              </td>
              <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                除了目前語系以外，其他可用的語系清單。
              </td>
            </tr>

            <!-- Methods -->
            <tr>
              <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                setLocale(code)
              </td>
              <td class="p-4 border border-slate-700/50 text-slate-400 text-xs">Function</td>
              <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                切換語系。
                <div class="mt-1 text-xs text-slate-500">Params: code (string)</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.benefit-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 0;
  list-style: none;
}

.benefit-list li {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.6;
}

.benefit-list li strong {
  display: block;
  color: #f8fafc;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
</style>
