<script setup lang="ts">
import { ref } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const { debounce, throttle, useDebouncedRef, useThrottledRef } = useDebounce()

// Demo counters
const debounceCount = ref(0)
const throttleCount = ref(0)
const normalCount = ref(0)

// Debounced/Throttled refs
const { immediate: immediateInput, debounced: debouncedInput } = useDebouncedRef('', 500)
const { immediate: immediateScroll, throttled: throttledScroll } = useThrottledRef(0, 1000)

// Debounced function
const debouncedFn = debounce(() => {
  debounceCount.value++
}, 500)

// Throttled function
const throttledFn = throttle(() => {
  throttleCount.value++
}, 500)

const handleNormalClick = () => {
  normalCount.value++
}

const handleDebounceClick = () => {
  debouncedFn()
}

const handleThrottleClick = () => {
  throttledFn()
}

const rawScrollEvents = ref(0)
const throttledEvents = ref(0)

const handleScroll = (e: Event) => {
  immediateScroll.value = (e.target as HTMLElement).scrollTop
  rawScrollEvents.value++
}

watch(throttledScroll, () => {
  throttledEvents.value++
})

// Search Simulator Logic
interface SearchLog {
  id: number
  query: string
  time: string
  status: 'pending' | 'success'
}

const searchLogs = ref<SearchLog[]>([])
const isSearching = ref(false)

watch(debouncedInput, async (val) => {
  if (!val) return

  const logId = Date.now()
  const time = new Date().toLocaleTimeString()

  // Add new log
  searchLogs.value.unshift({
    id: logId,
    query: val,
    time,
    status: 'pending'
  })

  // Keep only last 5 logs
  if (searchLogs.value.length > 5) {
    searchLogs.value.pop()
  }

  isSearching.value = true
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  isSearching.value = false

  // Mark as success
  const log = searchLogs.value.find((l) => l.id === logId)
  if (log) {
    log.status = 'success'
  }
})

definePageMeta({
  title: '防抖/節流 (Debounce)',
  icon: 'mdi-timer',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="防抖/節流系統"
    description="效能最佳化工具，提供防抖 (Debounce) 與節流 (Throttle) 機制，減少高頻事件觸發頻率。"
  >
    <!-- Core Concepts -->
    <ShowcaseSection title="核心概念 (Core Concepts)">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Debounce -->
        <div class="space-y-2">
          <div class="border-l-4 border-sky-500 pl-4">
            <h3 class="text-xl font-bold text-sky-400">1. 防抖 (Debounce)</h3>
            <p class="text-xs text-sky-300/70 uppercase tracking-wider font-bold mb-2">
              Lazy Execution
            </p>
            <p class="text-slate-200 text-sm font-medium leading-relaxed">
              就像
              <strong>公車司機</strong>
              。看到有人在跑就不關門，直到「完全沒人上車」過了一段時間，才真正發車。
              <span class="block mt-1 text-slate-400">適用：搜尋框輸入、視窗調整結束。</span>
            </p>
          </div>
        </div>

        <!-- Throttle -->
        <div class="space-y-2">
          <div class="border-l-4 border-pink-500 pl-4">
            <h3 class="text-xl font-bold text-pink-400">2. 節流 (Throttle)</h3>
            <p class="text-xs text-pink-300/70 uppercase tracking-wider font-bold mb-2">
              Rate Limit
            </p>
            <p class="text-slate-200 text-sm font-medium leading-relaxed">
              就像
              <strong>技能冷卻 (CD)</strong>
              。招式放出去後，冷卻時間內不管你按多少次都沒用，時間到才能再放。
              <span class="block mt-1 text-slate-400">適用：滾動監聽 (Scroll)、按鈕連點防止。</span>
            </p>
          </div>
        </div>

        <!-- Reactive Ref -->
        <div class="space-y-2">
          <div class="border-l-4 border-emerald-500 pl-4">
            <h3 class="text-xl font-bold text-emerald-400">3. 響應式變數 (Reactive Ref)</h3>
            <p class="text-xs text-emerald-300/70 uppercase tracking-wider font-bold mb-2">
              useDebouncedRef
            </p>
            <p class="text-slate-200 text-sm font-medium leading-relaxed">
              為了 Vue 設計的貼心功能。自動幫你把 Ref
              包裝好，你只要改值，它自動幫你延遲更新，不用自己寫 Watch。
            </p>
          </div>
        </div>

        <!-- Performance -->
        <div class="space-y-2">
          <div class="border-l-4 border-amber-500 pl-4">
            <h3 class="text-xl font-bold text-amber-400">4. 為什麼需要？ (Why)</h3>
            <p class="text-xs text-amber-300/70 uppercase tracking-wider font-bold mb-2">
              Performance
            </p>
            <p class="text-slate-200 text-sm font-medium leading-relaxed">
              也是為了
              <strong>幫伺服器止血</strong>
              。不要使用者打一個字你就發一次 API，伺服器會被玩壞的。
            </p>
          </div>
        </div>
      </div>

      <ShowcaseCard
        title="Composable Setup"
        full-width
      >
        <template #footer>
          <ShowcaseCodeBlock
            code="const { debounce, throttle } = useDebounce()

// 範例：搜尋框防抖
const handleSearch = debounce((query) => {
  api.search(query) // 只有停止輸入 500ms 後才會執行這裡
}, 500)"
            label="Initialization"
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
        <!-- Button Demo -->
        <ShowcaseCard
          title="Click Handlers"
          description="快速點擊按鈕，觀察計數器差異"
          full-width
        >
          <div class="flex flex-col gap-3">
            <!-- Normal -->
            <div
              class="flex items-center p-4 bg-slate-800/40 rounded-lg border border-slate-700/50 transition-colors hover:border-slate-600/50"
            >
              <button
                class="glass-btn w-32 h-10 flex items-center justify-center shrink-0"
                @click="handleNormalClick"
              >
                Normal
              </button>

              <div
                class="mx-6 flex-1 border-l border-slate-700/50 pl-6 h-full flex flex-col justify-center"
              >
                <div class="text-slate-300 font-medium text-sm">立即執行</div>
                <div class="text-slate-500 text-xs mt-1">點擊後不等待，直接觸發更新</div>
              </div>

              <div
                class="bg-slate-900/60 px-5 py-2 rounded border border-slate-700/50 min-w-[100px] text-right"
              >
                <div
                  class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5"
                >
                  Count
                </div>
                <div class="text-2xl font-bold text-white font-mono leading-none">
                  {{ normalCount }}
                </div>
              </div>
            </div>

            <!-- Debounce -->
            <div
              class="flex items-center p-4 bg-slate-800/40 rounded-lg border border-slate-700/50 transition-colors hover:border-sky-500/30"
            >
              <button
                class="glass-btn primary w-32 h-10 flex items-center justify-center shrink-0"
                @click="handleDebounceClick"
              >
                Debounced
              </button>

              <div
                class="mx-6 flex-1 border-l border-slate-700/50 pl-6 h-full flex flex-col justify-center"
              >
                <div class="text-sky-300 font-medium text-sm">防抖模式 (500ms)</div>
                <div class="text-slate-500 text-xs mt-1">
                  公車等人：
                  <span class="text-slate-400">停止操作後</span>
                  才執行一次
                </div>
              </div>

              <div
                class="bg-slate-900/60 px-5 py-2 rounded border border-slate-700/50 min-w-[100px] text-right group-hover:border-sky-500/30"
              >
                <div
                  class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5"
                >
                  Count
                </div>
                <div class="text-2xl font-bold text-sky-400 font-mono leading-none">
                  {{ debounceCount }}
                </div>
              </div>
            </div>

            <!-- Throttle -->
            <div
              class="flex items-center p-4 bg-slate-800/40 rounded-lg border border-slate-700/50 transition-colors hover:border-pink-500/30"
            >
              <button
                class="glass-btn primary w-32 h-10 flex items-center justify-center shrink-0"
                @click="handleThrottleClick"
              >
                Throttled
              </button>

              <div
                class="mx-6 flex-1 border-l border-slate-700/50 pl-6 h-full flex flex-col justify-center"
              >
                <div class="text-pink-300 font-medium text-sm">節流模式 (500ms)</div>
                <div class="text-slate-500 text-xs mt-1">
                  技能冷卻：
                  <span class="text-slate-400">冷卻時間內</span>
                  不會重複觸發
                </div>
              </div>

              <div
                class="bg-slate-900/60 px-5 py-2 rounded border border-slate-700/50 min-w-[100px] text-right group-hover:border-pink-500/30"
              >
                <div
                  class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5"
                >
                  Count
                </div>
                <div class="text-2xl font-bold text-pink-400 font-mono leading-none">
                  {{ throttleCount }}
                </div>
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <!-- Input Demo -->
        <ShowcaseCard
          title="實戰演練：搜尋 API 優化"
          description="防抖實戰皆在 input 停止輸入後才發送請求，大幅減少 API 呼叫次數。"
        >
          <div class="mb-4">
            <input
              v-model="immediateInput"
              placeholder="試著快速輸入文字 (觀察下方 Log)..."
              class="glass-input w-full mb-3"
            />

            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="bg-slate-800/50 p-2 rounded border border-slate-700/50">
                <span class="text-xs text-slate-500 block mb-0.5">search.immediate (UI)</span>
                <span class="text-slate-300 font-mono">{{ immediateInput || '(empty)' }}</span>
              </div>
              <div class="bg-slate-800/50 p-2 rounded border border-slate-700/50">
                <span class="text-xs text-slate-500 block mb-0.5">search.debounced (API)</span>
                <span class="text-sky-400 font-mono">{{ debouncedInput || '(empty)' }}</span>
              </div>
            </div>
          </div>

          <!-- Activity Log -->
          <div class="rounded-lg bg-slate-900/80 border border-slate-700/50 p-4 min-h-[200px]">
            <div class="flex items-center justify-between mb-3 border-b border-slate-700/50 pb-2">
              <span class="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                API Request Log (Simulated)
              </span>
              <span
                v-if="isSearching"
                class="text-xs text-sky-400 flex items-center gap-1.5"
              >
                <div class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></div>
                Sending Request...
              </span>
              <span
                v-else
                class="text-xs text-slate-500"
              >
                Idle
              </span>
            </div>

            <div class="space-y-1">
              <transition-group name="list">
                <div
                  v-for="log in searchLogs"
                  :key="log.id"
                  class="flex items-center justify-between text-sm py-2 px-3 rounded hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700/30"
                >
                  <div class="flex items-center gap-3">
                    <span class="text-slate-500 font-mono text-xs">{{ log.time }}</span>
                    <span class="text-slate-200">
                      Search:
                      <span class="text-sky-300 font-medium">"{{ log.query }}"</span>
                    </span>
                  </div>
                  <div>
                    <span
                      v-if="log.status === 'pending'"
                      class="text-xs text-slate-400 flex items-center gap-1"
                    >
                      <div
                        class="w-2 h-2 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"
                      ></div>
                      Pending
                    </span>
                    <span
                      v-else
                      class="text-xs text-emerald-400 font-medium flex items-center gap-1"
                    >
                      <span>✓</span>
                      200 OK
                    </span>
                  </div>
                </div>
              </transition-group>

              <div
                v-if="searchLogs.length === 0"
                class="text-center text-slate-600 py-10 text-sm italic"
              >
                請在上方輸入框輸入文字...
                <br />
                (注意：只有停止輸入 500ms 後才會產生 Log)
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <!-- Scroll Demo -->
        <ShowcaseCard
          title="實戰演練：滾動監聽優化"
          description="節流實戰確保高頻視窗事件 (Scroll/Resize) 不會癱瘓您的應用程式。"
        >
          <div
            class="h-[200px] overflow-y-auto rounded-md bg-slate-900/40 border border-slate-700/10 mb-4 text-center"
            @scroll="handleScroll"
          >
            <div class="p-10">
              <span class="text-slate-500 text-sm">請在此區域快速滾動...</span>
              <div class="h-[800px]"></div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <!-- Raw Events -->
            <div
              class="bg-indigo-500/10 rounded-lg p-3 border border-indigo-500/20 text-center relative overflow-hidden"
            >
              <div class="text-xs text-indigo-300 mb-1">原始事件觸發 (Raw Events)</div>
              <div class="text-2xl font-bold text-indigo-400 font-mono">{{ rawScrollEvents }}</div>
              <div class="text-[10px] text-indigo-500/60 mt-1">@scroll 監聽</div>
            </div>
            <!-- Throttled -->
            <div
              class="bg-pink-500/10 rounded-lg p-3 border border-pink-500/20 text-center relative overflow-hidden"
            >
              <div class="text-xs text-pink-300 mb-1">實際運算次數 (Executed)</div>
              <div class="text-2xl font-bold text-pink-400 font-mono">{{ throttledEvents }}</div>
              <div class="text-[10px] text-pink-500/60 mt-1">useThrottledRef 觸發</div>
            </div>
          </div>

          <div
            class="flex items-center justify-between text-xs bg-slate-800/50 rounded px-3 py-2 border border-slate-700/50"
          >
            <span class="text-slate-400">效能優化率 (Optimization Rate):</span>
            <span class="text-emerald-400 font-bold font-mono">
              {{
                rawScrollEvents > 0
                  ? Math.round(((rawScrollEvents - throttledEvents) / rawScrollEvents) * 100)
                  : 0
              }}% 節省 (Saved)
            </span>
          </div>

          <div class="space-y-4 mt-6 pt-4 border-t border-slate-800">
            <!-- Progress Bars Comparison -->
            <div>
              <div class="flex justify-between text-xs text-slate-400 mb-1">
                <span>即時滾動 (Immediate)</span>
                <span class="text-white font-mono">{{ immediateScroll }}px</span>
              </div>
              <div class="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  class="h-full bg-slate-400 transition-all duration-75"
                  :style="{ width: `${(immediateScroll / 600) * 100}%` }"
                ></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs text-pink-300 mb-1">
                <span>節流更新 (Throttled)</span>
                <span class="text-pink-400 font-mono font-bold">{{ throttledScroll }}px</span>
              </div>
              <div class="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  class="h-full bg-pink-500"
                  :style="{ width: `${(throttledScroll / 600) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>

          <template #footer>
            <ShowcaseCodeBlock
              code='const scroll = useThrottledRef(0, 1000)

// 1. 綁定事件 (即時更新)
// @scroll="scroll.immediate = $event.target.scrollTop"

// 2. 監聽節流值 (降頻處理重繪)
watch(scroll.throttled, (val) => {
  // 這裡只會每 1秒 執行一次，大幅節省效能！
  updateParallax(val)
})'
              label="實戰範例"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <ShowcaseCard
        title="核心 API 說明"
        description="提供防抖與節流的函數及 Composable 工具"
        full-width
      >
        <div class="mb-4 text-slate-400 text-sm leading-relaxed">
          提供一組完整的效能優化工具，包含純函數版本與 Vue Composable 版本，適用於不同場景。
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
                  debounce(fn, delay)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  建立一個防抖函數。該函數會在停止呼叫後的
                  <code class="text-sky-300">delay</code>
                  毫秒後才執行。
                  <div class="mt-1 text-slate-500 text-xs">
                    適用：搜尋框輸入、視窗調整結束偵測。
                  </div>
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  throttle(fn, interval)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  建立一個節流函數。該函數在
                  <code class="text-pink-300">interval</code>
                  毫秒內最多只執行一次。
                  <div class="mt-1 text-slate-500 text-xs">
                    適用：滾動事件 (Scroll)、按鈕連點防止。
                  </div>
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-emerald-300 font-medium">
                  useDebouncedRef(value, delay)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Composable</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  建立防抖 Ref。回傳物件包含
                  <code class="text-emerald-300">immediate</code>
                  (v-model綁定用) 與
                  <code class="text-emerald-300">debounced</code>
                  (監聽用) 屬性。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  useThrottledRef(value, interval)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Composable</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  建立節流 Ref。回傳物件包含
                  <code class="text-indigo-300">immediate</code>
                  (原始值) 與
                  <code class="text-indigo-300">throttled</code>
                  (節流更新值) 屬性。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.glass-input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #f1f5f9;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.95rem;
}

.glass-input:focus {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
}

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  font-weight: 600;
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

/* Method Description */
.method-desc {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0;
}
</style>
