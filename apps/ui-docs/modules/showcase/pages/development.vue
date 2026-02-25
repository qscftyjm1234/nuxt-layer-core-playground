<script setup lang="ts">
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

definePageMeta({
  title: '開發指南',
  icon: 'mdi-book-open-page-variant',
  layout: 'portal'
})

const router = useRouter()

const navigateToShowcase = () => {
  router.push('/showcase')
}

const navigateToRules = () => {
  router.push('/showcase/rules')
}
</script>

<template>
  <ShowcasePage
    title="開發指南 (Development Guide)"
    description="這裡記錄了專案的架構、規矩、用了哪些工具，以及如何把專案跑起來。"
    class="fade-in-up"
  >
    <!-- Quick Navigation (Bento Style) -->
    <div class="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        class="bento-card bento-card-blue group"
        @click="navigateToShowcase"
      >
        <div class="bento-bg-icon">
          <IIcon
            size="120"
            class="text-white"
            icon="mdi-view-grid-outline"
          />
        </div>
        <div class="bento-content text-left">
          <div class="bento-icon">
            <IIcon
              class="text-blue-400"
              size="28"
              icon="mdi-view-grid-outline"
            />
          </div>
          <div class="bento-title text-blue-100">瀏覽所有範例頁面</div>
          <div class="bento-desc">查看 26 個功能展示頁面，包含各類元件與應用場景。</div>
          <div class="bento-action text-blue-300 mt-auto pt-4">
            Explore Showcase
            <IIcon
              size="14"
              icon="mdi-arrow-right"
            />
          </div>
        </div>
      </div>

      <div
        class="bento-card bento-card-orange group"
        @click="navigateToRules"
      >
        <div class="bento-bg-icon">
          <IIcon
            size="120"
            class="text-white"
            icon="mdi-ruler-square"
          />
        </div>
        <div class="bento-content text-left">
          <div class="bento-icon">
            <IIcon
              class="text-orange-400"
              size="28"
              icon="mdi-ruler-square"
            />
          </div>
          <div class="bento-title text-orange-100">查看開發規矩</div>
          <div class="bento-desc">完整的開發規範、命名約定與團隊最佳實踐指南。</div>
          <div class="bento-action text-orange-300 mt-auto pt-4">
            View Rules
            <IIcon
              size="14"
              icon="mdi-arrow-right"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 1. Environment Requirements -->
    <ShowcaseSection
      title="環境需求"
      icon="mdi-cog-outline"
      class="stagger-2"
    >
      <!-- Runtime Environment -->
      <ShowcaseCard
        title="基礎環境 (Runtime)"
        description="專案運行所需的 Node.js 與 NPM 版本要求"
        full-width
      >
        <div class="packages-grid">
          <!-- Node.js -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">Node.js</div>
              <div class="package-version">v18.18.0+</div>
            </div>
            <div class="package-desc">JavaScript 執行環境 (Runtime)</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="node --version"
                language="bash"
              />
              <a
                href="https://nodejs.org/"
                target="_blank"
                class="download-link"
              >
                <IIcon
                  size="14"
                  class="mr-1"
                  icon="mdi-download"
                />
                Download Node.js
              </a>
            </div>
          </div>

          <!-- NPM -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">NPM</div>
              <div class="package-version">v9.0.0+</div>
            </div>
            <div class="package-desc">Node Package Manager</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm --version"
                language="bash"
              />
            </div>
          </div>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 2. System Dependencies -->
    <ShowcaseSection
      title="系統套件"
      icon="mdi-package-variant-closed"
      class="stagger-3"
    >
      <!-- Framework & UI -->
      <div class="package-category">
        <div class="category-header">
          <div class="category-icon category-icon-emerald">
            <IIcon
              size="20"
              class="text-emerald-400"
              icon="mdi-vuejs"
            />
          </div>
          <h3 class="category-title">核心與介面 (Framework & UI)</h3>
        </div>
        <div class="packages-grid">
          <!-- Nuxt -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">nuxt</div>
              <div class="package-version">^3.14.0</div>
            </div>
            <div class="package-desc">專案核心框架 (SSR, Route)</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install nuxt@3.14.0"
                language="bash"
              />
            </div>
          </div>

          <!-- Vuetify -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">vuetify</div>
              <div class="package-version">^3.9.3</div>
            </div>
            <div class="package-desc">UI 元件庫 (Button, Input...)</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install vuetify@3.9.3"
                language="bash"
              />
            </div>
          </div>

          <!-- MDI Font -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">@mdi/font</div>
              <div class="package-version">^7.4.47</div>
            </div>
            <div class="package-desc">Material Design 圖示集</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install @mdi/font@7.4.47"
                language="bash"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Logic & State -->
      <div class="package-category">
        <div class="category-header">
          <div class="category-icon category-icon-blue">
            <IIcon
              size="20"
              class="text-blue-400"
              icon="mdi-state-machine"
            />
          </div>
          <h3 class="category-title">邏輯與狀態 (Logic & State)</h3>
        </div>
        <div class="packages-grid">
          <!-- Pinia -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">@pinia/nuxt</div>
              <div class="package-version">^0.11.2</div>
            </div>
            <div class="package-desc">全域狀態管理 (Store)</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install @pinia/nuxt@0.11.2"
                language="bash"
              />
            </div>
          </div>

          <!-- VueUse -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">@vueuse/nuxt</div>
              <div class="package-version">^13.6.0</div>
            </div>
            <div class="package-desc">Vue 實用工具庫 (Hooks)</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install @vueuse/nuxt@13.6.0"
                language="bash"
              />
            </div>
          </div>

          <!-- i18n -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">@nuxtjs/i18n</div>
              <div class="package-version">^10.0.3</div>
            </div>
            <div class="package-desc">多國語系支援</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install @nuxtjs/i18n@10.0.3"
                language="bash"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Utilities -->
      <div class="package-category">
        <div class="category-header">
          <div class="category-icon category-icon-orange">
            <IIcon
              size="20"
              class="text-orange-400"
              icon="mdi-toolbox-outline"
            />
          </div>
          <h3 class="category-title">工具函式 (Utilities)</h3>
        </div>
        <div class="packages-grid">
          <!-- DayJS -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">dayjs</div>
              <div class="package-version">^1.11.13</div>
            </div>
            <div class="package-desc">輕量級日期格式化工具</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install dayjs@1.11.13"
                language="bash"
              />
            </div>
          </div>

          <!-- Lodash CloneDeep -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">lodash.clonedeep</div>
              <div class="package-version">^4.5.0</div>
            </div>
            <div class="package-desc">深層複製 (Deep Clone) 工具</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install lodash.clonedeep@4.5.0"
                language="bash"
              />
            </div>
          </div>

          <!-- Nuxt Device -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">@nuxtjs/device</div>
              <div class="package-version">^3.2.4</div>
            </div>
            <div class="package-desc">裝置偵測 (手機/電腦)</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install @nuxtjs/device@3.2.4"
                language="bash"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Code Quality -->
      <div class="package-category">
        <div class="category-header">
          <div class="category-icon category-icon-purple">
            <IIcon
              size="20"
              class="text-purple-400"
              icon="mdi-shield-check"
            />
          </div>
          <h3 class="category-title">品質確保 (Code Quality)</h3>
        </div>
        <div class="packages-grid">
          <!-- TypeScript -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">typescript</div>
              <div class="package-version">^5.9.3</div>
            </div>
            <div class="package-desc">強型別語言支援</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install -D typescript@5.9.3"
                language="bash"
              />
            </div>
          </div>

          <!-- ESLint -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">eslint</div>
              <div class="package-version">^9.39.2</div>
            </div>
            <div class="package-desc">程式碼檢查與規範</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install -D eslint@9.39.2"
                language="bash"
              />
            </div>
          </div>

          <!-- Prettier -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">prettier</div>
              <div class="package-version">^3.6.2</div>
            </div>
            <div class="package-desc">程式碼自動排版工具</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install -D prettier@3.6.2"
                language="bash"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Git Workflow -->
      <div class="package-category">
        <div class="category-header">
          <div class="category-icon category-icon-red">
            <IIcon
              size="20"
              class="text-red-400"
              icon="mdi-git"
            />
          </div>
          <h3 class="category-title">Git 工作流 (Workflow)</h3>
        </div>
        <div class="packages-grid">
          <!-- Husky -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">husky</div>
              <div class="package-version">^9.1.7</div>
            </div>
            <div class="package-desc">Git Hooks (Commit 前檢查)</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install -D husky@9.1.7"
                language="bash"
              />
            </div>
          </div>

          <!-- Commitizen -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">commitizen</div>
              <div class="package-version">^4.3.1</div>
            </div>
            <div class="package-desc">協助撰寫標準 Commit 訊息</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install -D commitizen@4.3.1"
                language="bash"
              />
            </div>
          </div>

          <!-- Lint Staged -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">lint-staged</div>
              <div class="package-version">^16.2.7</div>
            </div>
            <div class="package-desc">只對暫存區檔案執行檢查</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install -D lint-staged@16.2.7"
                language="bash"
              />
            </div>
          </div>

          <!-- Standard Version -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">standard-version</div>
              <div class="package-version">^9.5.0</div>
            </div>
            <div class="package-desc">自動產生版號與 Changelog</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install -D standard-version@9.5.0"
                language="bash"
              />
            </div>
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <!-- 3. Initialization -->
    <ShowcaseSection
      title="把專案跑起來 (Init)"
      icon="mdi-rocket-launch"
      class="stagger-4"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ShowcaseCard
          title="安裝步驟"
          full-width
        >
          <div class="steps-list">
            <div class="step-item">
              <div class="step-badge">1</div>
              <div class="step-content">
                <strong>裝套件</strong>
                <ShowcaseCodeBlock
                  code="npm install"
                  language="bash"
                  class="mt-2"
                />
              </div>
            </div>
            <div class="step-item">
              <div class="step-badge">2</div>
              <div class="step-content">
                <strong>設定環境變數</strong>
                <p class="text-slate-400 text-sm mt-1 mb-2">從範例檔複製一份，填入你的設定</p>
                <ShowcaseCodeBlock
                  code="cp .env.example .env"
                  language="bash"
                />
              </div>
            </div>
            <div class="step-item">
              <div class="step-badge">3</div>
              <div class="step-content">
                <strong>啟動！</strong>
                <ShowcaseCodeBlock
                  code="npm run dev"
                  language="bash"
                  class="mt-2"
                />
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          title="常用指令"
          full-width
        >
          <div class="space-y-4">
            <div>
              <div class="text-sm font-bold text-slate-200 mb-1">產生靜態檔案 (上線用)</div>
              <ShowcaseCodeBlock
                code="npm run generate"
                language="bash"
              />
            </div>
            <div>
              <div class="text-sm font-bold text-slate-200 mb-1">檢查程式碼</div>
              <ShowcaseCodeBlock
                code="npm run lint"
                language="bash"
              />
            </div>
            <div>
              <div class="text-sm font-bold text-slate-200 mb-1">檢查型別</div>
              <ShowcaseCodeBlock
                code="npx nuxi typecheck"
                language="bash"
              />
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 4. Naming Rules -->
    <ShowcaseSection
      title="命名規範"
      icon="mdi-format-letter-case"
      class="stagger-5"
    >
      <ShowcaseCard
        title="命名慣例 (Naming Convention)"
        description="為了確保程式碼的可讀性與一致性，我們將命名規則嚴格區分為元件、函式與常數三大類。明確的命名慣例就像是程式碼的「語法高亮」，能幫助團隊成員在閱讀時瞬間理解變數的用途與生命週期。"
        full-width
      >
        <div class="grid grid-cols-3 gap-4 w-full">
          <!-- Component -->
          <div class="rule-card rule-card-emerald min-w-0">
            <div class="rule-card-header">
              <span class="rule-badge">COMPONENT</span>
              <IIcon
                class="text-emerald-400"
                size="20"
                icon="mdi-cube-outline"
              />
            </div>
            <div class="rule-card-body">
              <div class="rule-title">PascalCase</div>
              <div class="rule-desc">建立 Vue 元件時使用</div>
              <ShowcaseCodeBlock
                code="UserCard.vue
NavBar.vue"
                filename="Example"
                class="mt-auto"
              >
                <div class="leading-relaxed">
                  <span class="text-emerald-300">UserCard</span>
                  .vue
                  <br />
                  <span class="text-emerald-300">NavBar</span>
                  .vue
                </div>
              </ShowcaseCodeBlock>
            </div>
          </div>

          <!-- Function -->
          <div class="rule-card rule-card-sky">
            <div class="rule-card-header">
              <span class="rule-badge">FUNCTION</span>
              <IIcon
                class="text-sky-400"
                size="20"
                icon="mdi-function"
              />
            </div>
            <div class="rule-card-body">
              <div class="rule-title">camelCase</div>
              <div class="rule-desc">一般函式與變數命名</div>
              <ShowcaseCodeBlock
                code="const getUser = () => {}
let isLoading = true"
                filename="Example"
                class="mt-auto"
              >
                <div class="leading-relaxed">
                  const
                  <span class="text-sky-300">getUser</span>
                  = () => {}
                  <br />
                  let
                  <span class="text-sky-300">isLoading</span>
                  = true
                </div>
              </ShowcaseCodeBlock>
            </div>
          </div>

          <!-- Constant -->
          <div class="rule-card rule-card-purple">
            <div class="rule-card-header">
              <span class="rule-badge">CONSTANT</span>
              <IIcon
                class="text-purple-400"
                size="20"
                icon="mdi-lock-outline"
              />
            </div>
            <div class="rule-card-body">
              <div class="rule-title">UPPER_CASE</div>
              <div class="rule-desc">固定不變的常數值</div>
              <ShowcaseCodeBlock
                code="const MAX_COUNT = 10
const API_URL = '...'"
                filename="Example"
                class="mt-auto"
              >
                <div class="leading-relaxed">
                  const
                  <span class="text-purple-300">MAX_COUNT</span>
                  = 10
                  <br />
                  const
                  <span class="text-purple-300">API_URL</span>
                  = '...'
                </div>
              </ShowcaseCodeBlock>
            </div>
          </div>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 5. Project Structure -->
    <ShowcaseSection
      title="專案結構"
      icon="mdi-folder-tree"
      class="stagger-6"
    >
      <div class="structure-grid">
        <!-- Backend Layer -->
        <div class="structure-group">
          <div class="structure-label">Logic Layer</div>
          <div class="structure-item">
            <IIcon
              class="text-indigo-400"
              size="20"
              icon="mdi-api"
            />
            <div class="structure-info">
              <div class="structure-name">api/</div>
              <div class="structure-desc">API Repository 服務層</div>
            </div>
          </div>
          <div class="structure-item">
            <IIcon
              class="text-indigo-400"
              size="20"
              icon="mdi-bottle-tonic-plus"
            />
            <div class="structure-info">
              <div class="structure-name">composables/</div>
              <div class="structure-desc">商業邏輯封裝 (Hooks)</div>
            </div>
          </div>
          <div class="structure-item">
            <IIcon
              class="text-indigo-400"
              size="20"
              icon="mdi-database"
            />
            <div class="structure-info">
              <div class="structure-name">stores/</div>
              <div class="structure-desc">Pinia 全域狀態管理</div>
            </div>
          </div>
        </div>

        <!-- Frontend Layer -->
        <div class="structure-group">
          <div class="structure-label">View Layer</div>
          <div class="structure-item">
            <IIcon
              class="text-pink-400"
              size="20"
              icon="mdi-view-dashboard-outline"
            />
            <div class="structure-info">
              <div class="structure-name">pages/</div>
              <div class="structure-desc">頁面路由 (File-based Routing)</div>
            </div>
          </div>
          <div class="structure-item">
            <IIcon
              class="text-pink-400"
              size="20"
              icon="mdi-view-module"
            />
            <div class="structure-info">
              <div class="structure-name">components/</div>
              <div class="structure-desc">Vue 共用與業務元件</div>
            </div>
          </div>
          <div class="structure-item">
            <IIcon
              class="text-pink-400"
              size="20"
              icon="mdi-page-layout-header"
            />
            <div class="structure-info">
              <div class="structure-name">layouts/</div>
              <div class="structure-desc">頁面佈局模板</div>
            </div>
          </div>
        </div>

        <!-- Config Layer -->
        <div class="structure-group">
          <div class="structure-label">Config Layer</div>
          <div class="structure-item">
            <IIcon
              class="text-amber-400"
              size="20"
              icon="mdi-file-cog"
            />
            <div class="structure-info">
              <div class="structure-name">nuxt.config.ts</div>
              <div class="structure-desc">Nuxt 核心設定檔</div>
            </div>
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <!-- 6. Core Tools Index -->
    <ShowcaseSection
      title="核心工具索引"
      title-badge="PORTAL"
      icon="mdi-tools"
      class="stagger-7"
    >
      <div class="tool-bento-grid">
        <!-- API -->
        <div
          class="bento-card bento-card-sky"
          @click="router.push('/showcase/api-demo')"
        >
          <div class="bento-bg-icon">
            <IIcon icon="mdi-api" />
          </div>
          <div class="bento-content">
            <div class="bento-icon">
              <IIcon
                class="text-sky-400"
                size="24"
                icon="mdi-api"
              />
            </div>
            <div class="bento-title text-sky-400">API Request</div>
            <div class="bento-desc">標準化 API 請求層，整合 Repository 模式與攔截器。</div>
            <div class="bento-action text-sky-400">
              Explore API Values
              <IIcon
                size="14"
                icon="mdi-arrow-right"
              />
            </div>
          </div>
        </div>

        <!-- Validation -->
        <div
          class="bento-card bento-card-rose"
          @click="router.push('/showcase/validation')"
        >
          <div class="bento-bg-icon">
            <IIcon icon="mdi-check-all" />
          </div>
          <div class="bento-content">
            <div class="bento-icon">
              <IIcon
                class="text-rose-400"
                size="24"
                icon="mdi-check-all"
              />
            </div>
            <div class="bento-title text-rose-400">Form Validation</div>
            <div class="bento-desc">Schema-based 驗證系統，支援 TW 身分證與手機號碼。</div>
            <div class="bento-action text-rose-400">
              View Patterns
              <IIcon
                size="14"
                icon="mdi-arrow-right"
              />
            </div>
          </div>
        </div>

        <!-- Formatting -->
        <div
          class="bento-card bento-card-amber"
          @click="router.push('/showcase/formatter')"
        >
          <div class="bento-bg-icon">
            <IIcon icon="mdi-format-text" />
          </div>
          <div class="bento-content">
            <div class="bento-icon">
              <IIcon
                class="text-amber-400"
                size="24"
                icon="mdi-format-text"
              />
            </div>
            <div class="bento-title text-amber-400">Data Formatting</div>
            <div class="bento-desc">金額、日期、隱碼處理，統一全站顯示邏輯。</div>
            <div class="bento-action text-amber-400">
              See Examples
              <IIcon
                size="14"
                icon="mdi-arrow-right"
              />
            </div>
          </div>
        </div>

        <!-- Icons -->
        <div
          class="bento-card bento-card-purple"
          @click="router.push('/showcase/icon')"
        >
          <div class="bento-bg-icon">
            <IIcon icon="mdi-vector-square" />
          </div>
          <div class="bento-content">
            <div class="bento-icon">
              <IIcon
                class="text-purple-400"
                size="24"
                icon="mdi-vector-square"
              />
            </div>
            <div class="bento-title text-purple-400">Icon System</div>
            <div class="bento-desc">使用 IIcon 統一管理 SVG 與 MDI Icons，支援自動對齊。</div>
            <div class="bento-action text-purple-400">
              Browse Icons
              <IIcon
                size="14"
                icon="mdi-arrow-right"
              />
            </div>
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <!-- 0. Quick Start -->
    <ShowcaseSection title="如何用此開發包開始實作?">
      <div class="packages-grid">
        <!-- 1. Replace Homepage -->
        <div class="package-card">
          <div class="package-header">
            <div class="package-name">1. 替換首頁</div>
            <div class="package-version">Step 01</div>
          </div>
          <div class="package-desc">
            修改專案入口 (pages/index.vue) 與全站佈局 (layouts/portal.vue)
          </div>
          <div class="package-install">
            <ShowcaseCodeBlock
              code='<template>
  <div class="home">
    <MyHero />
    <MyFeatures />
  </div>
</template>'
              language="html"
            />
          </div>
        </div>

        <!-- 2. Clean Up -->
        <div class="package-card">
          <div class="package-header">
            <div class="package-name">2. 移除範例</div>
            <div class="package-version">Step 02</div>
          </div>
          <div class="package-desc">從設定檔中移除 showcase 模組以隱藏此開發指南</div>
          <div class="package-install">
            <ShowcaseCodeBlock
              code="# configs/default.yaml
modules: [] # <--- 移除 showcase"
              language="yaml"
            />
          </div>
        </div>

        <!-- 3. Create Pages -->
        <div class="package-card">
          <div class="package-header">
            <div class="package-name">3. 建立功能</div>
            <div class="package-version">Step 03</div>
          </div>
          <div class="package-desc">建議的 Nuxt 3 專案目錄結構</div>
          <div class="package-install">
            <div
              class="bg-slate-950 rounded border border-slate-800 p-3 font-mono text-xs leading-loose text-slate-400"
            >
              <div class="text-slate-600">pages/</div>
              <div class="pl-4">
                ├── index.vue
                <br />
                ├──
                <span class="text-blue-400 font-bold">orders.vue</span>
                <br />
                └──
                <span class="text-blue-400 font-bold">users/</span>
                <br />
                <span class="pl-4">└── index.vue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <!-- UI Architecture Section -->
    <ShowcaseSection
      title="UI 框架更改"
      sub-title="CHANGE FRAMEWORK"
      class="stagger-2"
    >
      <div class="packages-grid">
        <!-- 1. Uninstall -->
        <div class="package-card">
          <div class="package-header">
            <div class="package-name">1. 移除舊框架</div>
            <div class="package-version">Step 01</div>
          </div>
          <div class="package-desc">完全移除 Vuetify 與相關全域設定</div>
          <div class="package-install">
            <!-- Enterprise Checklist v3 (Vercel Style Diff) -->
            <div class="flex flex-col gap-8 mt-6">
              <ShowcaseCodeBlock
                code="rm plugins/vuetify.ts"
                language="bash"
                filename="Terminal"
              />

              <ShowcaseCodeBlock
                code="// core/config/build.ts
export default defineNuxtConfig({
   build: {
-    transpile: ['vuetify']
   }
 })"
                language="diff"
              />

              <ShowcaseCodeBlock
                code="// core/config/css.ts
export const cssConfig = [
-  'vuetify/styles'
 ]"
                language="diff"
              />
            </div>
          </div>
        </div>

        <!-- 2. Install New -->
        <div class="package-card">
          <div class="package-header">
            <div class="package-name">2. 下載與全域設定</div>
            <div class="package-version">Step 02</div>
          </div>
          <div class="package-desc">安裝套件並註冊至 Core Config</div>
          <!-- Vercel Style Diff -->
          <div class="flex flex-col gap-8 mt-6">
            <ShowcaseCodeBlock
              code="npx nuxi@latest module add tailwindcss"
              language="bash"
              filename="Terminal"
            />

            <ShowcaseCodeBlock
              code="// core/config/modules.ts
export const modulesConfig = [
+  '@nuxtjs/tailwindcss'
 ]"
              language="diff"
            />

            <ShowcaseCodeBlock
              code="// core/config/css.ts
export const cssConfig = [
+  '~/assets/css/main.css'
 ]"
              language="diff"
            />
          </div>
        </div>

        <!-- 3. Update Interface -->
        <div class="package-card">
          <div class="package-header">
            <div class="package-name">3. 更新介面層</div>
            <div class="package-version">Step 03</div>
          </div>
          <div class="package-desc">關鍵步驟：重構 UI Interface</div>
          <div class="package-install">
            <div
              class="bg-slate-950 rounded-lg border border-slate-800 p-4 font-mono text-xs leading-loose text-slate-400 shadow-inner"
            >
              <div class="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
                <div class="text-emerald-400 font-bold">components/uiInterface/</div>
              </div>

              <div class="pl-2 border-l-2 border-slate-800 space-y-2">
                <div class="flex items-center gap-2 group cursor-default">
                  <span class="text-slate-600 group-hover:text-emerald-500 transition-colors">
                    ├──
                  </span>
                  <span class="text-slate-300 group-hover:text-white transition-colors">
                    ICard.vue
                  </span>
                  <span class="text-[10px] text-slate-600 ml-auto">Card Component</span>
                </div>
                <div class="flex items-center gap-2 group cursor-default">
                  <span class="text-slate-600 group-hover:text-emerald-500 transition-colors">
                    ├──
                  </span>
                  <span class="text-slate-300 group-hover:text-white transition-colors">
                    IButton.vue
                  </span>
                  <span class="text-[10px] text-slate-600 ml-auto">Button Component</span>
                </div>
                <div class="flex items-center gap-2 group cursor-default">
                  <span class="text-slate-600 group-hover:text-emerald-500 transition-colors">
                    └──
                  </span>
                  <span class="text-slate-500">...</span>
                </div>
              </div>

              <div class="mt-4 pt-3 border-t border-slate-800/50">
                <div class="flex gap-2 text-[11px] text-slate-400 bg-slate-900/50 p-2 rounded">
                  <span class="text-emerald-400">💡</span>
                  <span>只需重寫此目錄下的元件，即可完成全站 UI 切換。</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
/* Animations */
.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.stagger-1 {
  animation-delay: 0.1s;
}
.stagger-2 {
  animation-delay: 0.2s;
}
.stagger-3 {
  animation-delay: 0.3s;
}
.stagger-4 {
  animation-delay: 0.4s;
}
.stagger-5 {
  animation-delay: 0.5s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Rule Cards (Syntax Highlighting UI) */
.rule-card {
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.rule-card:hover {
  background: rgba(30, 41, 59, 0.6);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px -4px rgba(0, 0, 0, 0.4);
}

.rule-card-header {
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(0, 0, 0, 0.2);
}

.rule-badge {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
}

.rule-card-body {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.rule-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.rule-desc {
  font-size: 0.85rem;
  color: #94a3b8;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

/* Structure Grid */
.structure-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.structure-group {
  background: rgba(30, 41, 59, 0.3);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
}

.structure-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  font-weight: 700;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.structure-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
}

.structure-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.structure-item:hover {
  background: rgba(255, 255, 255, 0.03);
}

.structure-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.25rem;
}

.structure-desc {
  font-size: 0.8rem;
  color: #94a3b8;
}

/* Tool Bento Grid */
.tool-bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.bento-card {
  position: relative;
  height: 240px;
  padding: 2rem;
  border-radius: 1.5rem;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
}

.bento-card:hover {
  transform: translateY(-4px);
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 40px -4px rgba(0, 0, 0, 0.4);
}

.bento-bg-icon {
  position: absolute;
  right: -20px;
  bottom: -40px;
  opacity: 0.05;
  transform: rotate(-15deg) scale(4);
  pointer-events: none;
  transition: transform 0.5s ease;
}

.bento-card:hover .bento-bg-icon {
  transform: rotate(0deg) scale(4.5);
  opacity: 0.08;
}

.bento-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.bento-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
}

.bento-card-sky .bento-icon {
  border: 1px solid rgba(56, 189, 248, 0.2);
  background: rgba(56, 189, 248, 0.1);
}
.bento-card-rose .bento-icon {
  border: 1px solid rgba(251, 113, 133, 0.2);
  background: rgba(251, 113, 133, 0.1);
}
.bento-card-amber .bento-icon {
  border: 1px solid rgba(251, 191, 36, 0.2);
  background: rgba(251, 191, 36, 0.1);
}
.bento-card-purple .bento-icon {
  border: 1px solid rgba(192, 132, 252, 0.2);
  background: rgba(192, 132, 252, 0.1);
}
.bento-card-blue .bento-icon {
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: rgba(59, 130, 246, 0.1);
}
.bento-card-orange .bento-icon {
  border: 1px solid rgba(249, 115, 22, 0.2);
  background: rgba(249, 115, 22, 0.1);
}

.bento-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.bento-desc {
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: auto;
}

.bento-action {
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.bento-card:hover .bento-action {
  opacity: 1;
  transform: translateX(0);
}

/* Initialization Steps (Restored) */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step-item {
  display: flex;
  gap: 1rem;
}

.step-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.step-content {
  flex: 1;
}

/* IDE Ecosystem */
.ide-ecosystem {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.ide-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s;
}

.ide-card:hover {
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(30, 41, 59, 0.8);
}

.ide-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ide-info {
  flex: 1;
}

.ide-name {
  font-weight: 700;
  color: #e2e8f0;
  font-size: 0.95rem;
  margin-bottom: 0.1rem;
}

.ide-meta {
  font-size: 0.75rem;
  color: #64748b;
}

.ide-status {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 4px;
}

/* Package Categories */
.package-category {
  margin-bottom: 3rem;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.category-icon {
  width: 40px;
  height: 40px;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.category-icon-emerald {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.category-icon-blue {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.category-icon-orange {
  background: rgba(251, 146, 60, 0.15);
  border: 1px solid rgba(251, 146, 60, 0.3);
}

.category-icon-purple {
  background: rgba(168, 85, 247, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.category-icon-red {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.category-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #e2e8f0;
  margin: 0;
  letter-spacing: -0.01em;
}

/* Packages Grid */
.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.package-card {
  position: relative;
  padding: 1.5rem;
  border-radius: 0.875rem;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.package-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5));
  opacity: 0;
  transition: opacity 0.3s;
}

.package-card:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}

.package-card:hover::before {
  opacity: 1;
}

.package-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.package-name {
  font-size: 1rem;
  font-weight: 700;
  color: #e2e8f0;
  font-family: 'JetBrains Mono', monospace;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.package-version {
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.25);
  color: #93c5fd;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap;
  flex-shrink: 0;
}

.package-desc {
  font-size: 0.875rem;
  color: #94a3b8;
  line-height: 1.5;
  min-height: 2.625rem;
}

.package-install {
  margin-top: auto;
}

/* Directory List */
.dir-list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #cbd5e1;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
}

.dir-list > li {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.dir-list > li:last-child {
  border-bottom: none;
}

.dir-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.25rem;
}

.dir-desc {
  padding-left: 1.75rem;
  font-size: 0.85rem;
  color: #64748b;
  font-family: sans-serif;
}

.sub-list {
  list-style: none;
  padding-left: 1.75rem;
  margin-top: 0.5rem;
}

.sub-list li {
  position: relative;
  padding-left: 1rem;
  color: #94a3b8;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.sub-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 6px;
  height: 1px;
  background: #475569;
}

/* Git Flow Simple */
.flow-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0.5rem;
  overflow-x: auto;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.step-num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(30, 41, 59, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 0.8rem;
  font-weight: bold;
}

.success .step-num {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
  color: #10b981;
}

.step-title {
  font-size: 0.8rem;
  color: #cbd5e1;
  font-weight: 600;
}

.flow-connector {
  flex: 1;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 1rem;
  margin-bottom: 1.5rem;
}

/* Response */
@media (max-width: 768px) {
  .naming-rules .rule-item {
    flex-direction: column;
  }
  .naming-rules .rule-meta {
    width: 100%;
    flex-direction: row;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
}

.download-link {
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  color: #38bdf8;
  margin-top: 0.5rem;
  text-decoration: none;
  transition: color 0.2s;
}

.download-link:hover {
  color: #7dd3fc;
  text-decoration: underline;
}
</style>
