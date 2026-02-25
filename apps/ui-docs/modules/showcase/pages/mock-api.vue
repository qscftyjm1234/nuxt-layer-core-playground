<script setup lang="ts">
import { ref } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

// CRUD Simulation
const crudLoading = ref(false)
const newUser = ref('')
const userList = ref([
  { id: 101, name: 'Alice Johnson' },
  { id: 102, name: 'Bob Smith' },
  { id: 103, name: 'Charlie Brown' }
])

// Report
const reportType = ref('monthly')
const reportLoading = ref(false)
const reportResult = ref<any>(null)

// Logs
const apiLogs = ref<any[]>([])

const addLog = (method: string, url: string, status: string, data?: any) => {
  apiLogs.value.unshift({
    time: new Date().toLocaleTimeString('zh-TW'),
    method,
    url,
    status,
    data
  })
}

// CRUD Handlers
const handleAddUser = async () => {
  if (!newUser.value) return
  crudLoading.value = true
  addLog('POST', '/api/users', '處理中...')

  // Simulate API Delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  const id = Math.floor(Math.random() * 1000) + 200
  userList.value.push({ id, name: newUser.value })
  addLog('POST', '/api/users', '201 Created')

  newUser.value = ''
  crudLoading.value = false
}

const handleDeleteUser = async (id: number) => {
  if (!confirm('確認刪除此使用者?')) return
  addLog('DELETE', `/api/users/${id}`, '處理中...')

  // Simulate API Delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  userList.value = userList.value.filter((u) => u.id !== id)
  addLog('DELETE', `/api/users/${id}`, '200 OK')
}

// Status Simulator
const simulateStatus = async (status: number) => {
  const isError = status >= 400
  addLog('GET', `/api/test/${status}`, '處理中...')

  if (isError) {
    let msg = 'Unknown Error'
    if (status === 400) msg = 'Bad Request - 參數錯誤'
    if (status === 401) msg = 'Unauthorized - 請重新登入'
    if (status === 403) msg = 'Forbidden - 權限不足'
    if (status === 404) msg = 'Not Found - 找不到資源'
    if (status === 500) msg = 'Internal Server Error - 伺服器錯誤'

    addLog('GET', `/api/test/${status}`, `${status} Error - ${msg}`)
    // In real app: useErrorHandler().showError({ ... })
  } else {
    setTimeout(() => {
      addLog('GET', `/api/test/${status}`, '200 OK')
    }, 500)
  }
}

// Report Handler
const handleGenerateReport = async () => {
  reportLoading.value = true
  reportResult.value = null

  try {
    const { data: response, error } = await useApi('/api/reports/generate', {
      method: 'POST',
      body: {
        type: reportType.value,
        startDate: '2024-01-01',
        endDate: '2024-12-31'
      }
    })

    if (error.value) throw error.value

    reportResult.value = response.value
    addLog('POST', '/api/reports/generate', '成功', response.value)
  } catch (error: any) {
    addLog('POST', '/api/reports/generate', '錯誤', error.message)
  } finally {
    reportLoading.value = false
  }
}

const clearLogs = () => {
  apiLogs.value = []
}

definePageMeta({
  title: 'Mock API 管理',
  icon: 'mdi-web',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="Mock API 模擬系統"
    description="在前端直接模擬 API 回應，不需等待後端開發，實現獨立開發與測試。"
  >
    <!-- 1. Intro -->
    <ShowcaseSection title="系統特色">
      <div class="grid grid-cols-3 gap-6">
        <ShowcaseCard no-padding>
          <div class="flex items-start gap-4 p-6 h-full">
            <i class="mdi mdi-server-off text-4xl text-pink-400 shrink-0 mt-1"></i>
            <div>
              <h3 class="text-lg font-bold text-slate-200 mb-2">純前端運作</h3>
              <p class="text-sm text-slate-400 leading-relaxed">
                不依賴任何後端伺服器，直接在瀏覽器攔截請求，確保開發環境穩定且獨立。
              </p>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard no-padding>
          <div class="flex items-start gap-4 p-6 h-full">
            <i class="mdi mdi-cog text-4xl text-cyan-400 shrink-0 mt-1"></i>
            <div>
              <h3 class="text-lg font-bold text-slate-200 mb-2">設定簡單</h3>
              <p class="text-sm text-slate-400 leading-relaxed">
                透過設定檔統一管理路由，無需編寫複雜的攔截邏輯，快速建立模擬 API。
              </p>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard no-padding>
          <div class="flex items-start gap-4 p-6 h-full">
            <i class="mdi mdi-flash text-4xl text-amber-400 shrink-0 mt-1"></i>
            <div>
              <h3 class="text-lg font-bold text-slate-200 mb-2">擬真模擬</h3>
              <p class="text-sm text-slate-400 leading-relaxed">
                支援模擬網路延遲與錯誤狀態，讓開發者能測試 Loading 與 Error Handling 介面。
              </p>
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="核心檔案說明"
      icon="📂"
    >
      <div class="grid grid-cols-3 gap-6">
        <ShowcaseCard no-padding>
          <div class="flex items-start gap-4 p-6 h-full">
            <i class="mdi mdi-file-document-edit text-4xl text-sky-400 shrink-0 mt-1"></i>
            <div>
              <h3 class="text-lg font-bold text-slate-200 mb-1">設定檔 (Config)</h3>
              <div class="flex items-center gap-2 mb-3">
                <span
                  class="text-[10px] font-bold tracking-wider text-slate-500 uppercase border border-slate-700 px-1.5 py-0.5 rounded"
                >
                  PATH
                </span>
                <code class="text-xs font-mono text-sky-400">mock/routes.ts</code>
              </div>
              <p class="text-sm text-slate-400 leading-relaxed">
                所有模擬 API 的路由規則都定義於此。若要新增一個 API，請直接在此檔案中加入設定。
              </p>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard no-padding>
          <div class="flex items-start gap-4 p-6 h-full">
            <i class="mdi mdi-code-braces text-4xl text-purple-400 shrink-0 mt-1"></i>
            <div>
              <h3 class="text-lg font-bold text-slate-200 mb-1">型別定義 (Types)</h3>
              <div class="flex items-center gap-2 mb-3">
                <span
                  class="text-[10px] font-bold tracking-wider text-slate-500 uppercase border border-slate-700 px-1.5 py-0.5 rounded"
                >
                  PATH
                </span>
                <code class="text-xs font-mono text-purple-400">mock/types/*</code>
              </div>
              <p class="text-sm text-slate-400 leading-relaxed">
                在此定義 API 回傳資料的 TypeScript 型別，確保模擬資料符合介面規範。
              </p>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard no-padding>
          <div class="flex items-start gap-4 p-6 h-full">
            <i class="mdi mdi-engine text-4xl text-slate-400 shrink-0 mt-1"></i>
            <div>
              <h3 class="text-lg font-bold text-slate-200 mb-1">核心邏輯 (Core)</h3>
              <div class="flex items-center gap-2 mb-3">
                <span
                  class="text-[10px] font-bold tracking-wider text-slate-500 uppercase border border-slate-700 px-1.5 py-0.5 rounded"
                >
                  PATH
                </span>
                <code class="text-xs font-mono text-slate-400">mock/core.ts</code>
              </div>
              <p class="text-sm text-slate-400 leading-relaxed">
                系統攔截器核心，負責比對路由、解析參數並回傳模擬資料 (通常無需修改)。
              </p>
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 3. How to Use -->
    <ShowcaseSection
      title="如何新增模擬 API"
      icon="🚀"
    >
      <ShowcaseCard
        title="快速上手三步驟"
        description="依序執行以下步驟即可建立新的 Mock API"
        full-width
      >
        <div class="grid grid-cols-1 gap-8">
          <!-- Step 1 -->
          <div>
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold"
              >
                1
              </div>
              <h3 class="text-lg font-bold text-slate-200">開啟設定檔</h3>
            </div>
            <p class="text-sm text-slate-400 ml-11 mb-2">
              前往
              <code>mock/routes.ts</code>
              檔案。
            </p>
          </div>

          <!-- Step 2 -->
          <div>
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold"
              >
                2
              </div>
              <h3 class="text-lg font-bold text-slate-200">加入路由設定</h3>
            </div>
            <div class="ml-11">
              <ShowcaseCodeBlock
                code="{
  url: '/api/example',         // API 路徑
  method: 'GET',               // HTTP 方法
  response: {                  // 回傳資料
    data: {
      message: '這是一筆模擬資料',
      items: [1, 2, 3]
    }
  }
},"
                language="typescript"
                label="mock/routes.ts"
              />
            </div>
          </div>

          <!-- Step 3 -->
          <div>
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold"
              >
                3
              </div>
              <h3 class="text-lg font-bold text-slate-200">在頁面呼叫</h3>
            </div>
            <p class="text-sm text-slate-400 ml-11 mb-2">
              直接使用
              <code>useApi</code>
              發送請求，系統即會自動攔截並回傳上述定義的資料：
            </p>
            <div class="ml-11">
              <ShowcaseCodeBlock
                code="const { data } = await useApi('/api/example')"
                language="typescript"
                label="Vue Component"
              />
            </div>
          </div>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 4. Interactive Demos -->
    <ShowcaseSection
      title="功能展示範例"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- User Management CRUD -->
        <ShowcaseCard
          title="CRUD 資料操作模擬"
          description="模擬完整的 User Management 流程 (GET, POST, PUT, DELETE)"
          class="md:col-span-2"
        >
          <div class="flex flex-col gap-4">
            <!-- Controls -->
            <div class="flex gap-3">
              <input
                v-model="newUser"
                type="text"
                placeholder="輸入使用者名稱..."
                class="glass-input flex-1"
                @keyup.enter="handleAddUser"
              />
              <button
                class="glass-btn primary whitespace-nowrap"
                :disabled="crudLoading || !newUser"
                @click="handleAddUser"
              >
                <i class="mdi mdi-plus"></i>
                新增
              </button>
            </div>

            <!-- Simple Table -->
            <div class="bg-slate-900/30 rounded-lg border border-slate-700/30 overflow-hidden">
              <table class="simple-table">
                <thead>
                  <tr>
                    <th width="80">ID</th>
                    <th>Name</th>
                    <th width="100">Status</th>
                    <th
                      width="80"
                      class="text-right"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="user in userList"
                    :key="user.id"
                  >
                    <td class="font-mono text-slate-500">#{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>
                      <span class="status-pill">Active</span>
                    </td>
                    <td class="text-right">
                      <button
                        class="delete-btn"
                        @click="handleDeleteUser(user.id)"
                      >
                        <i class="mdi mdi-delete"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="userList.length === 0">
                    <td
                      colspan="4"
                      class="text-center py-6 text-slate-500"
                    >
                      暫無資料
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="text-xs text-slate-500 font-mono mt-1">
              // 模擬 API 呼叫： await useApi('/users', ...)
            </div>
          </div>
        </ShowcaseCard>

        <!-- Status Code Simulator -->
        <ShowcaseCard
          title="HTTP 狀態碼模擬"
          description="測試系統對於不同錯誤代碼的全域處理反應"
        >
          <div class="flex flex-col gap-4">
            <div class="text-xs text-slate-400">點擊下方按鈕以觸發對應的 Mock Response。</div>

            <div class="grid grid-cols-2 gap-3">
              <button
                class="glass-btn success"
                @click="simulateStatus(200)"
              >
                200 OK
              </button>
              <button
                class="glass-btn warning"
                @click="simulateStatus(400)"
              >
                400 Bad
              </button>
              <button
                class="glass-btn warning"
                @click="simulateStatus(401)"
              >
                401 Auth
              </button>
              <button
                class="glass-btn warning"
                @click="simulateStatus(403)"
              >
                403 Forbidden
              </button>
              <button
                class="glass-btn warning"
                @click="simulateStatus(404)"
              >
                404 Not Found
              </button>
              <button
                class="glass-btn danger"
                @click="simulateStatus(500)"
              >
                500 Error
              </button>
            </div>
          </div>
        </ShowcaseCard>

        <!-- Report Test -->
        <ShowcaseCard
          title="動態報表模擬"
          description="POST /api/reports/generate"
        >
          <div class="flex flex-col gap-4">
            <div
              class="p-3 bg-slate-800/50 rounded border border-slate-700 text-xs text-slate-400 mb-2"
            >
              此範例模擬接收參數並動態回傳資料。系統依據選擇的區間
              (日/週/月)，回傳對應的模擬報表數據。
            </div>
            <select
              v-model="reportType"
              class="glass-input"
            >
              <option value="daily">每日報表</option>
              <option value="weekly">每週報表</option>
              <option value="monthly">每月報表</option>
            </select>
            <button
              class="glass-btn primary w-full"
              :disabled="reportLoading"
              @click="handleGenerateReport"
            >
              {{ reportLoading ? '模擬運算中...' : '產生報表' }}
            </button>
            <div v-if="reportResult">
              <ShowcaseCodeBlock
                :code="JSON.stringify(reportResult, null, 2)"
                language="json"
                label="回傳結果"
              />
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- API Logs -->
    <ShowcaseSection
      title="即時請求紀錄"
      icon="📝"
    >
      <div class="bg-slate-900/50 rounded-lg border border-slate-700/50 overflow-hidden">
        <div
          class="p-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/50"
        >
          <span class="text-sm font-semibold text-slate-300">請求歷史</span>
          <button
            class="glass-btn text-xs py-1 px-3"
            @click="clearLogs"
          >
            清除記錄
          </button>
        </div>

        <div class="logs-container max-h-[400px] overflow-y-auto p-4 space-y-3">
          <div
            v-if="apiLogs.length === 0"
            class="text-center text-slate-500 py-8"
          >
            尚無 API 呼叫記錄
          </div>
          <div
            v-for="(log, index) in apiLogs"
            :key="index"
            class="log-item p-3 rounded bg-slate-800/30 border border-slate-700/30 text-sm"
          >
            <div class="flex items-center gap-3 mb-2">
              <span class="text-slate-500 font-mono text-xs">{{ log.time }}</span>
              <span
                class="font-bold px-1.5 py-0.5 rounded text-xs"
                :class="
                  log.method === 'GET'
                    ? 'bg-blue-900/30 text-blue-400'
                    : 'bg-green-900/30 text-green-400'
                "
              >
                {{ log.method }}
              </span>
              <span class="font-mono text-slate-300 break-all">{{ log.url }}</span>
              <span
                class="ml-auto font-bold"
                :class="log.status === '成功' ? 'text-green-400' : 'text-red-400'"
              >
                {{ log.status }}
              </span>
            </div>
            <div
              v-if="log.data"
              class="mt-2 bg-slate-950/50 p-2 rounded overflow-x-auto"
            >
              <pre class="text-xs text-slate-400 font-mono">{{
                JSON.stringify(log.data, null, 2)
              }}</pre>
            </div>
          </div>
        </div>
      </div>
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
  width: 100%;
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

.glass-btn.primary:hover:not(:disabled) {
  background: rgba(56, 189, 248, 0.3);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
}

.glass-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Custom Scrollbar for logs */
.logs-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.3) rgba(15, 23, 42, 0.4);
}
</style>
