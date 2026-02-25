<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const { setItem, getItem, removeItem, clear, keys, useStorageRef } = useStorage('local')

// Demo data
const demoKey = ref('demo_key')
const demoValue = ref('Hello Storage!')
const storedValue = ref<any>(null)
const allKeys = ref<string[]>([])

// Reactive storage demo
const reactiveData = useStorageRef('reactive_demo', { count: 0, name: 'Demo' })

const handleSet = () => {
  setItem(demoKey.value, demoValue.value, { expires: 60000 }) // 1 分鐘
  refreshKeys()
}

const handleGet = () => {
  storedValue.value = getItem(demoKey.value)
}

const handleRemove = () => {
  removeItem(demoKey.value)
  refreshKeys()
}

const handleClear = () => {
  clear()
  refreshKeys()
}

const refreshKeys = () => {
  allKeys.value = keys()
}

onMounted(() => {
  refreshKeys()
})

definePageMeta({
  title: '本地儲存 (Storage)',
  icon: 'mdi-database',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="本地儲存"
    description="LocalStorage 和 SessionStorage 的封裝，支援自動序列化、過期時間管理與響應式資料綁定。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <ShowcaseCard
        title="核心功能"
        description="儲存系統的核心特色"
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
  setItem,        // 儲存資料
  getItem,        // 取得資料
  removeItem,     // 移除資料
  clear,          // 清空所有
  keys,           // 取得所有 key
  useStorageRef   // 響應式儲存
} = useStorage('local')  // 'local' 或 'session'"
            label="useStorage() 提供的方法"
          />

          <p
            class="method-desc"
            style="margin-top: 1.5rem; margin-bottom: 1rem"
          >
            <strong>核心特色：</strong>
          </p>
          <ul class="benefit-list">
            <li>
              <strong>自動序列化:</strong>
              自動處理 JSON 序列化/反序列化
            </li>
            <li>
              <strong>過期管理:</strong>
              支援設定資料過期時間
            </li>
            <li>
              <strong>響應式綁定:</strong>
              useStorageRef 自動同步資料
            </li>
            <li>
              <strong>雙模式:</strong>
              支援 localStorage 和 sessionStorage
            </li>
          </ul>
        </div>
        <template #footer>
          <ShowcaseCodeBlock
            code="const { setItem, getItem } = useStorage('local')

// 儲存資料
setItem('user', { name: 'John' })

// 取得資料
const user = getItem('user')"
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
        <!-- Basic Operations -->
        <ShowcaseCard
          title="基本操作"
          description="CRUD 與過期時間設定"
        >
          <div class="flex flex-col gap-4">
            <div class="flex gap-4">
              <div class="flex-1">
                <label class="block text-xs text-slate-400 mb-1 uppercase tracking-wide">Key</label>
                <input
                  v-model="demoKey"
                  class="glass-input w-full"
                  placeholder="Key"
                />
              </div>
              <div class="flex-1">
                <label class="block text-xs text-slate-400 mb-1 uppercase tracking-wide">
                  Value
                </label>
                <input
                  v-model="demoValue"
                  class="glass-input w-full"
                  placeholder="Value"
                />
              </div>
            </div>

            <div class="flex gap-2 flex-wrap">
              <button
                class="glass-btn primary"
                @click="handleSet"
              >
                Set Item (1 min exp)
              </button>
              <button
                class="glass-btn"
                @click="handleGet"
              >
                Get Item
              </button>
              <button
                class="glass-btn danger"
                @click="handleRemove"
              >
                Remove Item
              </button>
              <button
                class="glass-btn danger"
                @click="handleClear"
              >
                Clear All
              </button>
            </div>

            <div
              v-if="storedValue !== null"
              class="result-box"
            >
              <div class="text-xs text-slate-400 mb-1 uppercase">RETRIEVED VALUE</div>
              <div class="text-sky-400 font-mono break-all">{{ storedValue }}</div>
            </div>
          </div>
        </ShowcaseCard>

        <!-- Reactive Storage -->
        <ShowcaseCard
          title="響應式儲存"
          description="useStorageRef 自動同步"
        >
          <div class="flex flex-col gap-4">
            <p class="text-sm text-slate-400">
              修改下方資料會自動同步至 LocalStorage (Key:
              <code class="text-sky-300">reactive_demo</code>
              )
            </p>
            <div class="flex gap-4">
              <div>
                <label class="block text-xs text-slate-400 mb-1 uppercase tracking-wide">
                  Count
                </label>
                <input
                  v-model.number="reactiveData.count"
                  type="number"
                  class="glass-input w-24"
                />
              </div>
              <div class="flex-1">
                <label class="block text-xs text-slate-400 mb-1 uppercase tracking-wide">
                  Name
                </label>
                <input
                  v-model="reactiveData.name"
                  class="glass-input w-full"
                />
              </div>
            </div>
            <ShowcaseCodeBlock
              :code="JSON.stringify(reactiveData, null, 2)"
              language="json"
              label="Current Data Object"
            />
          </div>
        </ShowcaseCard>

        <!-- Storage Inspector -->
        <ShowcaseCard
          title="儲存空間檢視"
          description="Keys Inspector"
          full-width
        >
          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center">
              <span class="text-slate-300 font-semibold">All Stored Keys</span>
              <button
                class="glass-btn text-xs py-1 px-3"
                @click="refreshKeys"
              >
                Refresh List
              </button>
            </div>
            <div class="p-4 bg-slate-900/40 rounded-lg border border-slate-700/30 min-h-[100px]">
              <div
                v-if="allKeys.length === 0"
                class="text-slate-500 italic text-center py-4"
              >
                Storage is empty
              </div>
              <div
                v-else
                class="flex flex-wrap gap-2"
              >
                <span
                  v-for="key in allKeys"
                  :key="key"
                  class="px-3 py-1 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700"
                >
                  {{ key }}
                </span>
              </div>
            </div>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { keys } = useStorage('local')

// 取得目前所有 Keys
const allKeys = keys()

// 重新整理列表
const refresh = () => {
  allKeys.value = keys()
}"
              label="實作範例"
            />
          </template>
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
        description="useStorage() 回傳方法列表"
        full-width
      >
        <div class="mb-4 text-slate-400 text-sm leading-relaxed">
          提供統一的 Storage 操作介面，自動處理資料序列化與過期時間。
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
                  setItem(key, val, opts)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  儲存資料。支援
                  <code class="text-sky-300">expires</code>
                  (毫秒) 設定。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  getItem(key)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得資料。若過期或不存在則回傳
                  <code class="text-sky-300">null</code>
                  。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  removeItem(key)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  移除指定 key 的資料。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  clear()
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  清空目前 Storage (Local or Session) 的所有資料。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  keys()
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得目前 Storage 中的所有 key 陣列。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-emerald-300 font-medium">
                  useStorageRef(key, init)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  建立與 Storage 同步的響應式 ref。
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
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #f1f5f9;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.glass-input:focus {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
}

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #94a3b8;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  font-weight: 500;
}

.glass-btn:hover {
  background: rgba(56, 189, 248, 0.1);
  border-color: #38bdf8;
  color: #38bdf8;
}

.glass-btn.primary {
  background: rgba(56, 189, 248, 0.2);
  border-color: #38bdf8;
  color: #38bdf8;
}

.glass-btn.primary:hover {
  background: rgba(56, 189, 248, 0.3);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
}

.glass-btn.danger {
  color: #ef4444;
}

.glass-btn.danger:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
  color: #ef4444;
}

.result-box {
  background: rgba(15, 23, 42, 0.4);
  border: 1px dashed rgba(148, 163, 184, 0.3);
  padding: 1rem;
  border-radius: 6px;
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
