<script setup lang="ts">
import { ref, computed } from 'vue'

import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const { captureError, showError, retry, errors, clearErrors } = useErrorHandler()

// Demo state
const errorMessage = ref('測試錯誤訊息')
const retryCount = ref(3)
const retryDelay = ref(1000)
const isRetrying = ref(false)
const retryResult = ref('')

// Computed
const recentErrors = computed(() => errors.value.slice(-5))

const formatData = (data: any) => {
  try {
    return JSON.stringify(data, null, 2)
  } catch {
    return String(data)
  }
}

const handleCaptureError = () => {
  const error = new Error(errorMessage.value)
  captureError(error, { source: 'showcase-demo', timestamp: new Date() })
}

const handleShowError = () => {
  showError(errorMessage.value)
}

const handleRetrySuccess = async () => {
  isRetrying.value = true
  retryResult.value = ''

  try {
    let attemptCount = 0
    const result = await retry(
      async () => {
        attemptCount++
        if (attemptCount < 2) {
          throw new Error('模擬失敗')
        }
        return '成功！'
      },
      {
        maxRetries: retryCount.value,
        delay: retryDelay.value
      }
    )
    retryResult.value = `重試成功：${result}`
  } catch (error) {
    retryResult.value = `重試失敗：${(error as Error).message}`
  } finally {
    isRetrying.value = false
  }
}

const handleRetryFail = async () => {
  isRetrying.value = true
  retryResult.value = ''

  try {
    await retry(
      async () => {
        throw new Error('永遠失敗')
      },
      {
        maxRetries: retryCount.value,
        delay: retryDelay.value
      }
    )
  } catch (error) {
    retryResult.value = `所有重試都失敗：${(error as Error).message}`
  } finally {
    isRetrying.value = false
  }
}

definePageMeta({
  title: '錯誤處理 (Error Handler)',
  icon: 'mdi-alert-circle',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="錯誤處理系統 (Error Handler System)"
    description="完整的錯誤處理模組，提供錯誤捕捉、分類、記錄和重試機制。"
  >
    <!-- 基礎用法 -->
    <!-- 基礎用法 -->
    <ShowcaseSection title="核心概念 (Core Concepts)">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Capture -->
        <div class="space-y-2">
          <div class="border-l-4 border-orange-500 pl-4">
            <h3 class="text-xl font-bold text-orange-400">1. 隱形忍者 (自動捕捉)</h3>
            <p class="text-xs text-orange-300/70 uppercase tracking-wider font-bold mb-2">
              Auto Capture
            </p>
            <p class="text-slate-200 text-sm font-medium leading-relaxed">
              像忍者一樣躲在暗處，只要程式一發生錯誤
              (Crash)，馬上把它抓起來紀錄，不會讓讓使用者看到一堆亂碼。
            </p>
          </div>
        </div>

        <!-- Retry -->
        <div class="space-y-2">
          <div class="border-l-4 border-sky-500 pl-4">
            <h3 class="text-xl font-bold text-sky-400">2. 不死鳥 (自動重試)</h3>
            <p class="text-xs text-sky-300/70 uppercase tracking-wider font-bold mb-2">
              Auto Retry
            </p>
            <p class="text-slate-200 text-sm font-medium leading-relaxed">
              API 失敗了？沒關係！它會自動休息一下再試一次 (Exponential
              Backoff)，直到成功為止，網路不穩也不怕。
            </p>
          </div>
        </div>

        <!-- Notify -->
        <div class="space-y-2">
          <div class="border-l-4 border-pink-500 pl-4">
            <h3 class="text-xl font-bold text-pink-400">3. 廣播系統 (統一通知)</h3>
            <p class="text-xs text-pink-300/70 uppercase tracking-wider font-bold mb-2">
              Notification
            </p>
            <p class="text-slate-200 text-sm font-medium leading-relaxed">
              錯誤發生時，與其讓介面壞掉，不如優雅地彈出一個「廣播」(Toast)，告訴使用者「出錯了，但別擔心」。
            </p>
          </div>
        </div>

        <!-- Log -->
        <div class="space-y-2">
          <div class="border-l-4 border-emerald-500 pl-4">
            <h3 class="text-xl font-bold text-emerald-400">4. 黑盒子 (完整紀錄)</h3>
            <p class="text-xs text-emerald-300/70 uppercase tracking-wider font-bold mb-2">
              Error Log
            </p>
            <p class="text-slate-200 text-sm font-medium leading-relaxed">
              就像飛機的黑盒子，詳細記錄錯誤發生的時間、地點、原因，讓開發者事後可以像偵探一樣還原現場。
            </p>
          </div>
        </div>
      </div>

      <ShowcaseCard
        title="Composable Usage"
        full-width
      >
        <template #footer>
          <ShowcaseCodeBlock
            code="const { captureError, showError, retry, errors, clearErrors } = useErrorHandler()"
            label="Initialization"
          />
        </template>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- API 參考 -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <ShowcaseCard
        title="API 詳細說明"
        description="useErrorHandler() 回傳方法列表"
        full-width
      >
        <div class="mb-4 text-slate-400 text-sm leading-relaxed">
          提供錯誤捕捉、重試機制與統一通知介面。自動整合全域錯誤處理器 (Global Error Handler)。
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
                  captureError(error, ctx)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  手動捕捉錯誤，並記錄到錯誤系統 (Log + Notify)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  retry(fn, options)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  執行自動重試 (Exponential Backoff)。options: { maxRetries, delay }。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  showError(msg, type)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  顯示錯誤通知 (Toast)。type: 'error' | 'warning'。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  errors
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                  Ref&lt;Array&gt;
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  所有已捕捉的錯誤列表 (Read-only)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-rose-300 font-medium">
                  clearErrors()
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  清除所有錯誤紀錄。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- Interactive Playground -->
    <ShowcaseSection
      title="實戰演練 (Interactive Test)"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- 1. Capture -->
        <ShowcaseCard
          title="1. 錯誤捕捉測試"
          description="假裝程式壞掉，看系統怎麼抓它。"
        >
          <div class="demo-area">
            <IInput
              v-model="errorMessage"
              label="模擬錯誤訊息"
              class="mb-4"
            />
            <div class="flex gap-2">
              <IButton @click="handleCaptureError">手動觸發錯誤</IButton>
              <IButton
                variant="secondary"
                @click="handleShowError"
              >
                僅顯示通知
              </IButton>
            </div>
          </div>
        </ShowcaseCard>

        <!-- 2. Retry -->
        <ShowcaseCard
          title="2. 不死鳥測試 (Retry)"
          description="模擬 API 失敗兩次後，第三次成功。"
        >
          <div class="demo-area">
            <div class="flex gap-4 mb-4">
              <IInput
                v-model.number="retryCount"
                type="number"
                label="最多試幾次"
                style="width: 100px"
              />
              <IInput
                v-model.number="retryDelay"
                type="number"
                label="每次等多久 (ms)"
                style="width: 120px"
              />
            </div>

            <div class="flex gap-2 mb-4">
              <IButton
                :disabled="isRetrying"
                @click="handleRetrySuccess"
              >
                {{ isRetrying ? '努力嘗試中...' : '測試自動重試 (會成功)' }}
              </IButton>
              <IButton
                variant="danger"
                :disabled="isRetrying"
                @click="handleRetryFail"
              >
                {{ isRetrying ? '努力嘗試中...' : '測試永遠失敗' }}
              </IButton>
            </div>

            <div
              v-if="retryResult"
              class="result-text"
            >
              <span class="value">{{ retryResult }}</span>
            </div>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="await retry(() => api.call(), { maxRetries: 3 })"
              label="Code"
            />
          </template>
        </ShowcaseCard>

        <!-- 3. History -->
        <ShowcaseCard
          title="3. 黑盒子紀錄"
          description="所有抓到的錯誤都在這。"
          full-width
        >
          <div class="demo-area">
            <div class="flex justify-between items-center mb-4">
              <span class="text-slate-400 text-sm">
                目前紀錄筆數:
                <strong class="text-sky-400">{{ errors.length }}</strong>
              </span>
              <IButton
                variant="danger"
                size="small"
                @click="clearErrors"
              >
                銷毀紀錄
              </IButton>
            </div>

            <ShowcaseCodeBlock
              :code="formatData(recentErrors)"
              language="json"
              label="最近發生的 5 個錯誤"
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
</style>
