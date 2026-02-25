<script setup lang="ts">
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

definePageMeta({
  title: '載入狀態 (Loading State)',
  icon: 'mdi-progress-clock',
  layout: 'portal'
})

const loading = useLoading()

const { count } = loading

// 模擬資料筆數
const mockDataCount = ref(0)

const simulateDataChange = () => {
  // 模擬 Loading 後資料增加
  const increase = Math.floor(Math.random() * 5) + 1
  mockDataCount.value += increase
}

const handleStart = async () => {
  // 呼叫真實 Mock API: 取得儀表板統計
  // useApi 預設會開啟 globalLoading，所以這裡不需要 loading.start()
  await useApi('/dashboard/stats', {
    autoSuccess: true
  })

  // 模擬收到資料後的變化
  simulateDataChange()
}

// 模擬 useApi 的 loadingRef 行為
const localLoading = ref(false)
const handleLocalLoading = async () => {
  // 呼叫真實 Mock API: 取得訂單資料
  // 透過 loadingRef 自動綁定按鈕狀態
  await useApi('/orders', {
    loadingRef: localLoading,
    autoSuccess: true
  })

  simulateDataChange()
}

const handleSimulateStack = async () => {
  // 同時觸發 3 個請求，測試 Stack 疊加
  // 注意：不使用 await 讓它們同時發出
  const timestamp = Date.now()
  const p1 = useApi('/users', { query: { _t: timestamp } })
  const p2 = useApi('/dashboard/activities', { query: { _t: timestamp } })
  const p3 = useApi('/orders', { query: { _t: timestamp } })

  await Promise.all([p1, p2, p3])
  simulateDataChange()
}
</script>

<template>
  <ShowcasePage
    title="全域 Loading 系統"
    description="展示 useLoading Composable 的計數器機制。支援多重請求堆疊 (Stack/Queue)，確保 Loading 遮罩在所有請求完成後才消失，避免畫面閃爍。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection
      title="基礎用法"
      icon=""
    >
      <ShowcaseCard
        title="核心功能"
        description="Loading 系統的核心特色"
        full-width
      >
        <div class="demo-area">
          <p
            class="method-desc"
            style="margin-bottom: 1.5rem"
          >
            <strong>可用方法：</strong>
          </p>
          <ShowcaseCodeBlock
            code="const {
  start,      // 開始 Loading
  finish,     // 結束 Loading
  isLoading   // Loading 狀態
} = useLoading()"
            label="useLoading() 提供的方法"
          />

          <p
            class="method-desc"
            style="margin-top: 1.5rem; margin-bottom: 1rem"
          >
            <strong>核心特色：</strong>
          </p>
          <ul class="benefit-list">
            <li>
              <strong>計數器機制:</strong>
              支援多重請求堆疊，避免閃爍
            </li>
            <li>
              <strong>全域遮罩:</strong>
              整個畫面的 Loading 遮罩
            </li>
            <li>
              <strong>自動管理:</strong>
              自動追蹤請求數量
            </li>
          </ul>
        </div>
        <template #footer>
          <ShowcaseCodeBlock
            code="const loading = useLoading()

// 開始 Loading
loading.start()

// 結束 Loading
loading.finish()"
            label="快速開始"
          />
        </template>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 互動測試 -->
    <ShowcaseSection
      title="互動測試"
      icon="🎮"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="基本操作"
          description="手動觸發 Loading 狀態"
        >
          <div class="flex flex-wrap gap-4">
            <button
              class="glass-btn primary"
              @click="handleStart"
            >
              Start (Get Stats)
            </button>
          </div>
          <ShowcaseCodeBlock
            code="const handleStart = async () => {
  // 單一 API 請求
  // 系統自動 handle Loading start/finish
  await useApi('/dashboard/stats')
}"
            language="typescript"
            label="單一請求邏輯"
            :lines="false"
            class="mt-4"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="多重請求測試"
          description="同時發送多個請求以測試 Queue 機制"
          full-width
        >
          <div class="mb-6 flex justify-center">
            <button
              class="glass-btn primary w-full md:w-auto"
              @click="handleSimulateStack"
            >
              Simulate Stack (同時發送 3 個請求)
            </button>
          </div>
          <ShowcaseCodeBlock
            code="const handleSimulateStack = async () => {
  // 同時觸發 3 個請求，測試 Stack 疊加
  // 注意：不使用 await 讓它們同時發出
  const timestamp = Date.now()
  const p1 = useApi('/users', { query: { _t: timestamp } })
  const p2 = useApi('/dashboard/activities', { query: { _t: timestamp } })
  const p3 = useApi('/orders', { query: { _t: timestamp } })

  // Stack Count 瞬間 +3
  await Promise.all([p1, p2, p3])
  // 隨請求完成依序 -1
}"
            language="typescript"
            label="堆疊請求邏輯 (Stack Logic)"
            :lines="false"
            class="mt-4"
          />
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- API 整合 -->
    <ShowcaseSection
      title="API 模組整合"
      icon="🔗"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="全域 Loading 控制"
          description="useApi 預設會自動觸發全域 Loading"
        >
          <div class="flex flex-col gap-4">
            <div class="text-sm text-slate-400">
              <code>useApi</code>
              預設將
              <code>globalLoading</code>
              設為
              <code>true</code>
              。若該請求不需要阻擋畫面 (例如背景更新)，可將其關閉。
            </div>
            <ShowcaseCodeBlock
              code="// 關閉全域 Loading
const { data } = await useApi('/api/news', {
  globalLoading: false
})"
              language="typescript"
              label="Disable Global Loading"
              :lines="false"
            />
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          title="局部 Loading (loadingRef)"
          description="自動綁定 Loading 狀態至變數 (如按鈕狀態)"
        >
          <div class="flex flex-col gap-4">
            <div class="text-sm text-slate-400">
              透過
              <code>loadingRef</code>
              參數，
              <code>useApi</code>
              會在請求期間自動將傳入的 Ref 設為
              <code>true</code>
              ，結束後設為
              <code>false</code>
              。
            </div>

            <div
              class="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
            >
              <button
                class="glass-btn primary"
                :disabled="localLoading"
                @click="handleLocalLoading"
              >
                <i
                  v-if="localLoading"
                  class="mdi mdi-loading mdi-spin"
                ></i>
                <span v-else>送出表單</span>
                {{ localLoading ? '處理中...' : '' }}
              </button>
              <div class="text-xs text-slate-500 font-mono">loadingRef: {{ localLoading }}</div>
            </div>

            <ShowcaseCodeBlock
              code="const isSubmitting = ref(false)

// 自動處理 isSubmitting 的 true/false
await useApi('/api/submit', {
  method: 'POST',
  body: form,
  loadingRef: isSubmitting
})"
              language="typescript"
              label="Auto Loading Binding"
              :lines="false"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- API 參考 -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <ShowcaseCard
        title="API 詳細說明"
        description="useLoading() 回傳方法列表"
        full-width
      >
        <div class="mb-4 text-slate-400 text-sm leading-relaxed">
          提供全域 Loading 控制，採用計數器機制 (Stack) 避免閃爍。
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse border border-slate-700">
            <thead>
              <tr>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  方法名稱 (Name)
                </th>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  型別 (Type)
                </th>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm w-full"
                >
                  說明 (Description)
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50">
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  start()
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  開始 Loading，計數器 +1。全域遮罩顯示。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  finish()
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  結束 Loading，計數器 -1。當計數器歸零時，遮罩消失。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  isLoading
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                  Ref&lt;Boolean&gt;
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  目前是否處於 Loading 狀態。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  count
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                  Ref&lt;Number&gt;
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  目前 Loading 堆疊數量 (Stack Size)。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <div class="monitor-widget">
      <div class="monitor-item">
        <span class="label">堆疊層數</span>
        <span
          class="value"
          :class="{ active: count > 0 }"
        >
          {{ count }}
        </span>
      </div>
      <div class="monitor-divider"></div>
      <div class="monitor-item">
        <span class="label">資料筆數</span>
        <span class="value highlight">{{ mockDataCount }}</span>
      </div>
    </div>
  </ShowcasePage>
</template>

<style scoped>
.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #e2e8f0;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
}

.glass-btn:hover {
  background: rgba(51, 65, 85, 0.8);
  border-color: #94a3b8;
}

.glass-btn.primary {
  background: rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.5);
  color: #38bdf8;
}

.glass-btn.primary:hover {
  background: rgba(56, 189, 248, 0.3);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
}

.glass-btn.danger {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  color: #ef4444;
}

.glass-btn.danger:hover {
  background: rgba(239, 68, 68, 0.3);
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
}

/* Benefit List */
.benefit-list {
  padding-left: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 0;
}

.benefit-list li {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.15);
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.7;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.benefit-list li::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, #38bdf8 0%, #6366f1 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.benefit-list li:hover {
  border-color: rgba(56, 189, 248, 0.3);
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.15);
}

.benefit-list li:hover::before {
  opacity: 1;
}

.benefit-list li strong {
  color: #38bdf8;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.05em;
  font-weight: 600;
  letter-spacing: 0.3px;
}

/* Monitor Widget */
.monitor-widget {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
  font-family: 'JetBrains Mono', monospace;
  z-index: 10000;
  animation: slideIn 0.5s ease-out;
}

.monitor-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.monitor-divider {
  width: 1px;
  height: 24px;
  background: rgba(148, 163, 184, 0.2);
}

.monitor-widget .label {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.monitor-widget .value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e2e8f0;
  line-height: 1;
  transition: all 0.3s;
}

.monitor-widget .value.active {
  color: #38bdf8;
  text-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
}

.monitor-widget .value.highlight {
  color: #10b981;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
