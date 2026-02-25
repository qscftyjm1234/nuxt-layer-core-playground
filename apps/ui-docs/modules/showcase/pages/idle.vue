<script setup lang="ts">
import { ref, computed } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const idleTimeout = ref(10000) // 10 seconds for demo
const { isIdle, lastActive, idleTime, reset, pause, resume } = useIdle({
  timeout: idleTimeout.value
})

const isPaused = ref(false)

// Computed
const idleStatus = computed(() => ({
  isIdle: isIdle.value,
  lastActive: lastActive.value.toLocaleTimeString(),
  idleTime: `${(idleTime.value / 1000).toFixed(1)} 秒`,
  timeout: `${(idleTimeout.value / 1000).toFixed(0)} 秒`
}))

const handlePause = () => {
  pause()
  isPaused.value = true
}

const handleResume = () => {
  resume()
  isPaused.value = false
}

const handleReset = () => {
  reset()
}

definePageMeta({
  title: '閒置偵測 (Idle)',
  icon: 'mdi-timer-sand',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="閒置偵測系統 (Idle Detection)"
    description="完整的閒置偵測模組，提供使用者活動監控和自動登出機制。核心特色：活動偵測、可設定時間、暫停/恢復、閒置警告。"
  >
    <!-- 基礎用法 -->
    <!-- Core Concepts -->
    <ShowcaseSection title="核心概念">
      <ShowcaseCard
        title="閒置狀態說明"
        full-width
      >
        <ul class="benefit-list mb-6">
          <li>
            <strong>1. 掛機偵測 (isIdle)</strong>
            <div class="mt-2 text-lg font-bold text-sky-400">布林值 (Boolean)</div>
            <div class="text-slate-400 text-sm mt-1 leading-relaxed">
              即時偵測使用者活動狀態。當超過設定的時間未進行操作 (滑鼠、鍵盤等)
              時，自動標記為閒置狀態。
            </div>
          </li>
          <li>
            <strong>2. 最後動靜 (lastActive)</strong>
            <div class="mt-2 text-lg font-bold text-sky-400">時間戳記 (Timestamp)</div>
            <div class="text-slate-400 text-sm mt-1 leading-relaxed">
              記錄使用者最後一次進行任何互動操作的精確時間點，用以計算閒置區間。
            </div>
          </li>
          <li>
            <strong>3. 發呆計時 (idleTime)</strong>
            <div class="mt-2 text-lg font-bold text-sky-400">數值 (Number)</div>
            <div class="text-slate-400 text-sm mt-1 leading-relaxed">
              計算自最後一次操作後，目前已累積的閒置時間 (毫秒)，可配合用來顯示倒數警告。
            </div>
          </li>
          <li>
            <strong>4. 耐心極限 (timeout)</strong>
            <div class="mt-2 text-lg font-bold text-sky-400">數值 (Number)</div>
            <div class="text-slate-400 text-sm mt-1 leading-relaxed">
              設定判定為閒置狀態的時間門檻 (毫秒)。超過此時間未操作，系統將觸發閒置事件。
            </div>
          </li>
        </ul>

        <template #footer>
          <ShowcaseCodeBlock
            code="const { isIdle, lastActive, reset } = useIdle({
  timeout: 5 * 60 * 1000 // 5 分鐘耐心極限
})

// 監聽閒置狀態
watch(isIdle, (idle) => {
  if (idle) {
    showWarningModal() // 顯示「你還在嗎？」
  }
})"
            label="初始化設定"
          />
        </template>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- API 參考 -->
    <ShowcaseSection title="API 參考">
      <ShowcaseCard
        title="詳細屬性與方法"
        description="useIdle() 回傳物件說明"
        full-width
      >
        <div class="mb-4 text-slate-400 text-sm leading-relaxed">
          以下列表詳細列出 useIdle hook 所提供的所有響應式狀態與操作方法，方便開發者快速查閱。
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse border border-slate-700">
            <thead>
              <tr>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  屬性名稱 (Name)
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
              <!-- State -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  isIdle
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Boolean</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  當前是否處於閒置狀態 (True = 閒置中)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  lastActive
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Date</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  最後一次偵測到使用者活動的時間戳記。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  idleTime
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Number</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  目前累積的閒置時間 (毫秒)。
                </td>
              </tr>

              <!-- Methods -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  reset()
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  重置計時器。將
                  <code class="text-sky-300">isIdle</code>
                  設為 false，並更新最後活動時間。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  pause()
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  暫停偵測。暫停期間不會計算閒置時間。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  resume()
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  恢復偵測。從暫停的時間點繼續運作。
                </td>
              </tr>

              <!-- Config -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-amber-300 font-medium">
                  timeout
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Number</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  <span class="text-amber-400 text-xs border border-amber-400/30 px-1 rounded mr-2">
                    Config
                  </span>
                  判定閒置的門檻值 (毫秒)。預設為 60000 (1分鐘)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-amber-300 font-medium">
                  events
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                  Array&lt;String&gt;
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  <span class="text-amber-400 text-xs border border-amber-400/30 px-1 rounded mr-2">
                    Config
                  </span>
                  指定要監聽的 DOM 事件列表 (如 mousemove, keydown)。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- Interactive Playground -->
    <ShowcaseSection
      title="實戰演練"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- 1. Status -->
        <ShowcaseCard
          title="1. 閒置狀態"
          description="即時偵測使用者是否掛機"
        >
          <div
            class="p-6 rounded-xl border flex items-center justify-between transition-all duration-300"
            :class="
              isIdle
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-emerald-500/10 border-emerald-500/30'
            "
          >
            <div class="flex flex-col">
              <span
                class="text-xs uppercase tracking-wider font-bold mb-1"
                :class="isIdle ? 'text-amber-400' : 'text-emerald-400'"
              >
                目前狀態
              </span>
              <span class="text-2xl font-bold text-white">
                {{ isIdle ? '閒置中 (IDLE)' : '活動中 (ACTIVE)' }}
              </span>
            </div>
            <div
              class="px-4 py-1 rounded text-sm font-medium"
              :class="
                isIdle ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
              "
            >
              {{ isIdle ? '已暫離' : '使用中' }}
            </div>
          </div>
          <div class="mt-4 flex justify-between items-center px-2">
            <span class="text-slate-400 text-sm">累積閒置時間</span>
            <span class="text-2xl font-bold text-sky-400 font-mono">
              {{ (idleTime / 1000).toFixed(1) }}
              <span class="text-sm text-sky-400/70">秒</span>
            </span>
          </div>
        </ShowcaseCard>

        <!-- 2. Last Active -->
        <ShowcaseCard
          title="2. 最後活動時間"
          description="記錄最後一次偵測到操作的時間"
        >
          <div class="demo-area">
            <div class="text-center py-4">
              <div class="text-sm text-slate-400 mb-1">Timestamp</div>
              <div class="text-3xl font-bold text-fuchsia-300 font-mono tracking-wider">
                {{ lastActive.toLocaleTimeString() }}
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <!-- 3. Controls -->
        <ShowcaseCard
          title="3. 控制面板"
          description="手動重置與暫停偵測"
        >
          <div class="demo-area">
            <div class="flex gap-2 flex-wrap mb-4">
              <button
                class="glass-btn primary"
                @click="handleReset"
              >
                重置計時 (Reset)
              </button>
              <button
                class="glass-btn"
                :class="{ active: isPaused }"
                :disabled="isPaused"
                @click="handlePause"
              >
                {{ isPaused ? '已暫停' : '暫停偵測 (Pause)' }}
              </button>
              <button
                class="glass-btn"
                :disabled="!isPaused"
                @click="handleResume"
              >
                恢復偵測 (Resume)
              </button>
            </div>
            <div
              v-if="isPaused"
              class="text-amber-400 text-sm text-center font-bold bg-amber-500/10 py-2 rounded border border-amber-500/30"
            >
              ⚠️ 偵測已暫停
            </div>
          </div>
        </ShowcaseCard>

        <!-- 4. Full State -->
        <ShowcaseCard
          title="4. 完整狀態"
          description="所有 Reactive 狀態檢視"
          full-width
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              :code="JSON.stringify(idleStatus, null, 2)"
              language="json"
              label="狀態物件快照"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
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

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  flex: 1;
}

.glass-btn:hover:not(:disabled) {
  background: rgba(51, 65, 85, 0.8);
  border-color: #94a3b8;
}

.glass-btn.primary {
  background: rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.5);
  color: #38bdf8;
}

.glass-btn.active {
  background: rgba(234, 179, 8, 0.2);
  border-color: rgba(234, 179, 8, 0.5);
  color: #fde047;
}

.glass-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.flex {
  display: flex;
}
.justify-between {
  justify-content: space-between;
}
.gap-2 {
  gap: 0.5rem;
}
.flex-wrap {
  flex-wrap: wrap;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mt-4 {
  margin-top: 1rem;
}
.text-center {
  text-align: center;
}
.text-2xl {
  font-size: 1.5rem;
  font-weight: 600;
}
.text-sm {
  font-size: 0.875rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.text-gray-400 {
  color: #94a3b8;
}
.text-sky-300 {
  color: #7dd3fc;
}
.text-fuchsia-300 {
  color: #f0abfc;
}
.text-amber-400 {
  color: #fbbf24;
}
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
</style>
