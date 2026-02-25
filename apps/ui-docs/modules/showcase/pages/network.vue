<script setup lang="ts">
import { computed } from 'vue'

import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const { isOnline, effectiveType, downlink, rtt, offlineAt } = useNetwork()
const { formatDateTime } = useDateTime()

// Computed
const networkStatus = computed(() => ({
  isOnline: isOnline.value,
  effectiveType: effectiveType.value || '未知',
  downlink: downlink.value ? `${downlink.value} Mbps` : '未知',
  rtt: rtt.value ? `${rtt.value} ms` : '未知',
  offlineAt: offlineAt.value ? formatDateTime(offlineAt.value) : '無紀錄'
}))

const networkQuality = computed(() => {
  if (!isOnline.value) return '離線'
  if (!effectiveType.value) return '未知'

  switch (effectiveType.value) {
    case '4g':
      return '優秀'
    case '3g':
      return '良好'
    case '2g':
      return '較差'
    case 'slow-2g':
      return '很差'
    default:
      return '未知'
  }
})
const qualityClass = computed(() => {
  if (!effectiveType.value) return 'text-slate-400'
  switch (effectiveType.value) {
    case '4g':
      return 'text-emerald-400'
    case '3g':
      return 'text-amber-400'
    case '2g':
    case 'slow-2g':
      return 'text-rose-400'
    default:
      return 'text-slate-400'
  }
})

definePageMeta({
  title: '網路狀態 (Network)',
  icon: 'mdi-wifi',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="網路狀態 (Network)"
    description="完整的網路狀態監控模組，提供線上/離線狀態、網路類型和速度偵測。核心特色：即時監控、網路類型、下載速度、省流量模式。"
  >
    <!-- 基礎用法 -->
    <!-- 核心概念 -->
    <!-- Core Concepts -->
    <ShowcaseSection title="核心概念">
      <ShowcaseCard
        title="網路狀態屬性"
        description="網路狀態屬性說明"
        full-width
      >
        <ul class="benefit-list mb-6">
          <li>
            <strong>1. 連線狀態</strong>
            <div class="mt-2 text-2xl font-bold text-slate-100">布林值 (Boolean)</div>
            <div class="text-slate-400 text-sm mt-1 leading-relaxed">
              最基礎的連線檢查，確認裝置是否連接至網際網路。可用於顯示離線提示或停用表單提交。
            </div>
          </li>
          <li>
            <strong>2. 網路類型</strong>
            <div class="mt-2 text-2xl font-bold text-slate-100">字串 (String)</div>
            <div class="text-slate-400 text-sm mt-1 leading-relaxed">
              識別當前連線技術 (如 4G, 3G, WiFi)。當網路類型較差時 (如
              2G)，建議降級體驗以維持流暢度。
            </div>
          </li>
          <li>
            <strong>3. 預估頻寬 (Mbps)</strong>
            <div class="mt-2 text-2xl font-bold text-slate-100">數值 (Number)</div>
            <div class="text-slate-400 text-sm mt-1 leading-relaxed">
              當前預估的下行速度。可用於精準評估是否適合載入高畫質影片或大型資源。
            </div>
          </li>
          <li>
            <strong>4. 最後斷線時間 (Black Box)</strong>
            <div class="mt-2 text-2xl font-bold text-slate-100">時間戳記 (Timestamp)</div>
            <div class="text-slate-400 text-sm mt-1 leading-relaxed">
              記錄最近一次的斷線時間點。即使後來恢復連線，此紀錄仍可用於追蹤連線穩定度。
            </div>
          </li>
        </ul>

        <template #footer>
          <ShowcaseCodeBlock
            code="const {
  isOnline,       // (Boolean) 連線狀態
  effectiveType,  // (String)  網路類型
  downlink,       // (Number)  下載頻寬
  rtt,            // (Number)  延遲時間
  offlineAt       // (Date)    最後斷線時間 (這就是你要的黑盒子！)
} = useNetwork()

// 範例：顯示最後斷線時間 (需搭配 useDateTime)
if (offlineAt.value) {
  console.log(`最後斷線於：${offlineAt.value}`)
}"
            label="初始化設定"
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
        description="useNetwork() 回傳欄位"
        full-width
      >
        <div class="mb-4 text-slate-400 text-sm leading-relaxed">
          提供即時的網路狀態監控屬性，皆為響應式 (Ref) 物件。
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
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  isOnline
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                  Ref&lt;Boolean&gt;
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  當前連線狀態 (True = 連線中)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  effectiveType
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                  Ref&lt;String&gt;
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  網路類型 (
                  <code class="text-sky-300">'4g'</code>
                  |
                  <code class="text-sky-300">'3g'</code>
                  |
                  <code class="text-sky-300">'2g'</code>
                  |
                  <code class="text-sky-300">'slow-2g'</code>
                  )。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  downlink
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                  Ref&lt;Number&gt;
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  預估下載頻寬 (Mbps)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  rtt
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                  Ref&lt;Number&gt;
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  延遲時間 (Round Trip Time, ms)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-rose-300 font-medium">
                  offlineAt
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                  Ref&lt;Date&gt;
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  最後一次斷線的時間點 (若無則為 null)。
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
        <!-- 1. Online Status -->
        <ShowcaseCard
          title="1. 線上/離線狀態"
          description="即時偵測網路連線"
        >
          <div
            class="p-6 rounded-xl border flex items-center justify-between transition-all duration-300"
            :class="
              isOnline
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-rose-500/10 border-rose-500/30'
            "
          >
            <div class="flex flex-col">
              <span
                class="text-xs uppercase tracking-wider font-bold mb-1"
                :class="isOnline ? 'text-emerald-400' : 'text-rose-400'"
              >
                目前連線狀態
              </span>
              <span class="text-2xl font-bold text-white">
                {{ isOnline ? '連線中 (ONLINE)' : '已斷線 (OFFLINE)' }}
              </span>
            </div>
            <div
              class="px-4 py-1 rounded text-sm font-medium"
              :class="
                isOnline ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              "
            >
              {{ isOnline ? '連線中' : '已斷線' }}
            </div>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='&lt;!-- 使用情境：全站斷線提示 --&gt;
&lt;div v-if="!isOnline" class="global-banner error"&gt;
  ⚠️ 網路連線已中斷，請檢查您的網路設定
&lt;/div&gt;

&lt;!-- 使用情境：表單防呆 --&gt;
&lt;button :disabled="!isOnline"&gt;
  {{ isOnline ? &apos;送出表單&apos; : &apos;等待連線...&apos; }}
&lt;/button&gt;

&lt;script setup&gt;
const { isOnline } = useNetwork()
&lt;/script&gt;'
              label="實戰應用 (Usage)"
            />
          </template>
        </ShowcaseCard>

        <!-- 2. Connection Info -->
        <ShowcaseCard
          title="2. 詳細連線數據"
          description="詳細網路數據偵測"
          full-width
        >
          <ul class="benefit-list">
            <li>
              <strong>有效網路類型</strong>
              <div class="mt-2 text-2xl font-bold text-slate-100">
                {{ effectiveType || '未知' }}
              </div>
              <div
                :class="qualityClass"
                class="text-sm font-medium mt-1 opacity-80"
              >
                連線品質: {{ networkQuality }}
              </div>
            </li>
            <li>
              <strong>下載頻寬 (Mbps)</strong>
              <div class="mt-2 text-2xl font-bold text-slate-100 tracking-tight">
                {{ downlink ? downlink : '0' }}
                <span class="text-sm text-slate-400 font-normal">Mbps</span>
              </div>
              <div class="text-slate-400 text-sm mt-1">預估下載頻寬</div>
            </li>
            <li>
              <strong>網路延遲 (RTT)</strong>
              <div class="mt-2 text-2xl font-bold text-slate-100 tracking-tight">
                {{ rtt ? rtt : '0' }}
                <span class="text-sm text-slate-400 font-normal">ms</span>
              </div>
              <div class="text-slate-400 text-sm mt-1">網路反應速度 (Ping 值)</div>
            </li>
            <li>
              <strong>最後斷線時間</strong>
              <div class="mt-2 text-xl font-bold text-rose-300">
                {{ offlineAt ? formatDateTime(offlineAt) : '無 (Stable)' }}
              </div>
              <div class="text-slate-400 text-sm mt-1">最後斷線時間 (Black Box)</div>
            </li>
          </ul>
        </ShowcaseCard>

        <!-- 3. Full State -->
        <ShowcaseCard
          title="3. 完整狀態監控"
          description="響應式狀態物件"
          full-width
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              :code="JSON.stringify(networkStatus, null, 2)"
              language="json"
              label="當前網路狀態快照"
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
