<script setup lang="ts">
import { ref, computed } from 'vue'

import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const {
  formatDate,
  formatTime,
  formatDateTime,
  formatRelative,
  add,
  subtract,
  diff,
  isBefore,
  isAfter,
  isSameDay,
  isToday,
  isWeekend,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  today,
  yesterday,
  tomorrow,
  isValid,
  getDateRange,
  getTimezone,
  toISO,
  toTimestamp,
  DEFAULT_FORMATS
} = useDateTime()

const formatJSON = (data: any) => JSON.stringify(data, null, 2)

// Demo state
const demoDate = ref(new Date())
const demoDate2 = ref(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) // 7 days ago
const demoFormat = ref('YYYY-MM-DD HH:mm:ss')
const demoAmount = ref(7)
const demoUnit = ref<'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'>('day')
const demoDateString = ref('2024-12-25')

const unitOptions = [
  { label: '年', value: 'year' },
  { label: '月', value: 'month' },
  { label: '週', value: 'week' },
  { label: '天', value: 'day' },
  { label: '小時', value: 'hour' },
  { label: '分鐘', value: 'minute' },
  { label: '秒', value: 'second' }
]

// Computed examples
const formattedDate = computed(() => formatDate(demoDate.value, demoFormat.value))
const formattedTime = computed(() => formatTime(demoDate.value))
const formattedDateTime = computed(() => formatDateTime(demoDate.value))
const relativeTime = computed(() => formatRelative(demoDate2.value))

const addedDate = computed(() => add(demoDate.value, demoAmount.value, demoUnit.value))
const subtractedDate = computed(() => subtract(demoDate.value, demoAmount.value, demoUnit.value))
const dateDiff = computed(() => diff(demoDate.value, demoDate2.value, demoUnit.value))

const comparisonResults = computed(() => ({
  isBefore: isBefore(demoDate2.value, demoDate.value),
  isAfter: isAfter(demoDate.value, demoDate2.value),
  isSameDay: isSameDay(demoDate.value, demoDate2.value)
}))

const boundaryTimes = computed(() => ({
  startOfDay: formatDateTime(startOfDay(demoDate.value)),
  endOfDay: formatDateTime(endOfDay(demoDate.value)),
  startOfWeek: formatDateTime(startOfWeek(demoDate.value)),
  endOfWeek: formatDateTime(endOfWeek(demoDate.value)),
  startOfMonth: formatDateTime(startOfMonth(demoDate.value)),
  endOfMonth: formatDateTime(endOfMonth(demoDate.value))
}))

const shortcuts = computed(() => ({
  today: formatDate(today()),
  yesterday: formatDate(yesterday()),
  tomorrow: formatDate(tomorrow())
}))

const validationResult = computed(() => ({
  isValid: isValid(demoDateString.value),
  isToday: isToday(demoDate.value),
  isWeekend: isWeekend(demoDate.value)
}))

definePageMeta({
  title: '日期時間 (DateTime)',
  icon: 'mdi-calendar-clock',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="日期時間系統"
    description="完整的多語系日期時間處理模組，提供格式化、解析、計算與驗證功能。"
  >
    <!-- Core Concepts -->
    <ShowcaseSection title="核心概念 (Core Concepts)">
      <ul class="benefit-list">
        <li>
          <strong>1. 格式化 (Format)</strong>
          <div class="mt-2 text-lg font-bold text-sky-400">Style & Display</div>
          <div class="text-slate-400 text-sm mt-1 leading-relaxed">
            統一全站日期格式與顯示標準。
          </div>
        </li>
        <li>
          <strong>2. 計算 (Calculation)</strong>
          <div class="mt-2 text-lg font-bold text-pink-400">Add & Subtract</div>
          <div class="text-slate-400 text-sm mt-1 leading-relaxed">
            直覺的 API，輕鬆計算日期加減。
          </div>
        </li>
        <li>
          <strong>3. 相對時間 (Relative Time)</strong>
          <div class="mt-2 text-lg font-bold text-emerald-400">Human Friendly</div>
          <div class="text-slate-400 text-sm mt-1 leading-relaxed">
            將時間轉換為「剛剛」或「N 分鐘前」。
          </div>
        </li>
        <li>
          <strong>4. 邊界 (Boundary)</strong>
          <div class="mt-2 text-lg font-bold text-amber-400">Start & End</div>
          <div class="text-slate-400 text-sm mt-1 leading-relaxed">
            快速取得日/週/月之起始與結束時間。
          </div>
        </li>
      </ul>

      <ShowcaseCard
        title="Composable Setup"
        full-width
      >
        <template #footer>
          <ShowcaseCodeBlock
            code="// 來源: composables/useDateTime.ts (Nuxt 自動引入)
const { formatDate, add } = useDateTime()

const now = new Date()

// 1. 格式化
formatDate(now) // '2024-01-01'

// 2. 計算 (下週)
const nextWeek = add(now, 7, 'day')
formatDate(nextWeek) // '2024-01-08'"
            label="Initialization"
          />
        </template>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 格式化展示 -->
    <ShowcaseSection
      title="基礎格式化"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="常用格式 (DEFAULT_FORMATS)"
          description="專案統一的日期格式配置，確保全站顯示風格一致。"
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              label="預設格式設定 (唯讀)"
              :code="formatJSON(DEFAULT_FORMATS)"
              language="json"
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { DEFAULT_FORMATS, formatDate } = useDateTime()

// DEFAULT_FORMATS 是定義好的常數，包含專案中統一使用的格式
// 例如：所有日期都應該顯示為 YYYY-MM-DD

// 1. 取得預設格式設定
console.log(DEFAULT_FORMATS.date) // 'YYYY-MM-DD'

// 2. 使用預設格式 (預設即為 DEFAULT_FORMATS.date)
formatDate(new Date()) 

// 3. 自定義但保持一致性 (使用定義好的格式)
formatDate(new Date(), DEFAULT_FORMATS.dateLong) // '2024年01月01日'"
              label="使用方式"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Interactive Playground -->
    <ShowcaseSection
      title="互動測試"
      icon="🎮"
    >
      <!-- Control Panel -->
      <ShowcaseCard
        title="Control Panel"
        full-width
      >
        <div class="demo-area">
          <IStack
            gap="1"
            wrap="wrap"
          >
            <!-- Date Inputs -->
            <div style="flex: 1; min-width: 200px">
              <IInput
                v-model="demoDate"
                type="datetime-local"
                label="測試日期 1"
              />
            </div>
            <div style="flex: 1; min-width: 200px">
              <IInput
                v-model="demoDate2"
                type="datetime-local"
                label="測試日期 2"
              />
            </div>
            <div style="flex: 1; min-width: 200px">
              <IInput
                v-model="demoFormat"
                label="格式字串"
                placeholder="YYYY-MM-DD HH:mm:ss"
              />
            </div>
          </IStack>
        </div>
      </ShowcaseCard>

      <!-- Method Demos Grid -->
      <div class="component-grid mt-6">
        <!-- 1. Format Methods -->
        <ShowcaseCard
          title="1. 格式化方法"
          description="將日期轉換為指定格式的字串。"
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              label="Output Results"
              :code="
                formatJSON({
                  formatDate: formattedDate,
                  formatTime: formattedTime,
                  formatDateTime: formattedDateTime,
                  formatRelative: relativeTime
                })
              "
              language="json"
            />
          </div>
        </ShowcaseCard>

        <!-- 2. Calculation Methods -->
        <ShowcaseCard
          title="2. 計算方法"
          description="新增、減少時間或計算時間差。"
        >
          <div class="demo-area">
            <IStack
              gap="0.5"
              class="mb-4"
              align="flex-end"
            >
              <div style="flex: 1">
                <IInput
                  v-model.number="demoAmount"
                  type="number"
                  label="數量"
                />
              </div>
              <div style="flex: 1">
                <ISelect
                  v-model="demoUnit"
                  :options="unitOptions"
                  label="單位"
                />
              </div>
            </IStack>
            <ShowcaseCodeBlock
              label="Output Results"
              :code="
                formatJSON({
                  original: formatDateTime(demoDate),
                  added: formatDateTime(addedDate),
                  subtracted: formatDateTime(subtractedDate),
                  diff: `${dateDiff} ${demoUnit}`
                })
              "
              language="json"
            />
          </div>
        </ShowcaseCard>

        <!-- 3. Comparison Methods -->
        <ShowcaseCard
          title="3. 比較方法"
          description="比較兩個日期的先後關係。"
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              label="Comparison Results"
              :code="formatJSON(comparisonResults)"
              language="json"
            />
          </div>
        </ShowcaseCard>

        <!-- 4. Boundary Times -->
        <ShowcaseCard
          title="4. 邊界時間"
          description="取得一天、一週、一月的開始或結束時間。"
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              label="Boundary Times"
              :code="formatJSON(boundaryTimes)"
              language="json"
            />
          </div>
        </ShowcaseCard>

        <!-- 5. Shortcuts -->
        <ShowcaseCard
          title="5. 快捷方法"
          description="快速取得常用的日期。"
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              label="Shortcuts"
              :code="formatJSON(shortcuts)"
              language="json"
            />
          </div>
        </ShowcaseCard>

        <!-- 6. Validation -->
        <ShowcaseCard
          title="6. 驗證方法"
          description="驗證日期字串或判斷日期特性。"
        >
          <div class="demo-area">
            <IInput
              v-model="demoDateString"
              label="測試字串"
              placeholder="2024-12-25"
              class="mb-4"
            />
            <ShowcaseCodeBlock
              label="Validation Results"
              :code="formatJSON(validationResult)"
              language="json"
            />
          </div>
        </ShowcaseCard>

        <!-- 7. Utility Methods -->
        <ShowcaseCard
          title="7. 工具方法"
          description="其他實用的日期處理方法。"
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              label="Utility Results"
              :code="
                formatJSON({
                  timezone: getTimezone(),
                  iso: toISO(demoDate),
                  timestamp: toTimestamp(demoDate),
                  dateRange: getDateRange(yesterday(), tomorrow()).map((d) => formatDate(d))
                })
              "
              language="json"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 格式符號 -->
    <ShowcaseSection
      title="格式符號"
      icon="📋"
    >
      <ShowcaseCodeBlock
        label="格式化符號對照表 & 引入來源"
        code="const { formatDate } = useDateTime() // 方法引入來源

// 這些符號可用於自定義日期格式 (format string)
const formatTokens = {
  // 年份
  YYYY: '2024',      // 完整年份
  YY:   '24',        // 末兩位年份

  // 月份
  MM:   '01-12',     // 補零月份
  M:    '1-12',      // 不補零月份

  // 日期
  DD:   '01-31',     // 補零日期
  D:    '1-31',      // 不補零日期

  // 時間
  HH:   '00-23',     // 24小時制
  hh:   '01-12',     // 12小時制
  mm:   '00-59',     // 分鐘
  ss:   '00-59',     // 秒數

  // 其他
  A:    'AM/PM',     // 上下午 (大寫)
  a:    'am/pm',     // 上下午 (小寫)
  SSS:  '000-999'    // 毫秒
}

// 使用範例：自定義格式
formatDate(new Date(), 'YYYY年MM月DD日 HH:mm A')"
      />
    </ShowcaseSection>

    <!-- API 參考 -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <ShowcaseCard
        title="API 詳細說明"
        description="useDateTime() 回傳方法列表"
        full-width
      >
        <div class="mb-4 text-slate-400 text-sm leading-relaxed">
          提供完整的日期操作工具，包含格式化、計算、比較與邊界值查詢等功能。
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
              <!-- Formatting -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  formatDate
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  格式化日期。預設格式為
                  <code class="text-sky-300">YYYY-MM-DD</code>
                  。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  formatTime
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  格式化時間。預設格式為
                  <code class="text-sky-300">HH:mm:ss</code>
                  。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  formatDateTime
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  格式化日期時間。預設格式為
                  <code class="text-sky-300">YYYY-MM-DD HH:mm:ss</code>
                  。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  formatRelative
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得相對時間描述 (如：3 分鐘前、剛剛)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  toISO
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  轉換為 ISO 8601 字串。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  toTimestamp
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  轉換為時間戳 (毫秒)。
                </td>
              </tr>

              <!-- Parsing -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  parseISO
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  解析 ISO 字串為 Date 物件。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  parseTimestamp
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  解析時間戳為 Date 物件。
                </td>
              </tr>

              <!-- Calculation -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  add
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  增加指定時間 (年/月/日/時/分/秒)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  subtract
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  減少指定時間。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  diff
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  計算兩個時間的差異量。
                </td>
              </tr>

              <!-- Comparison -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  isBefore
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  判斷是否在指定日期之前。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  isAfter
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  判斷是否在指定日期之後。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  isSameDay
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  判斷是否為同一天 (忽略時間)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  isToday
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  判斷是否為今天。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  isWeekend
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  判斷是否為週末 (週六/週日)。
                </td>
              </tr>

              <!-- Utility -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  isValid
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  檢查日期物件是否有效。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  getDateRange
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得兩日期之間的所有日期陣列。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  getTimezone
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得使用者當前時區。
                </td>
              </tr>

              <!-- Boundary -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  startOfDay
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得當天的開始時間 (00:00:00)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  endOfDay
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得當天的結束時間 (23:59:59)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  startOfWeek
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得本週第一天 (週一)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  endOfWeek
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得本週最後一天 (週日)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  startOfMonth
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得本月第一天。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  endOfMonth
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得本月最後一天。
                </td>
              </tr>

              <!-- Shortcuts -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  today
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得今天的 Date 物件。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  yesterday
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得昨天的 Date 物件。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  tomorrow
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得明天的 Date 物件。
                </td>
              </tr>

              <!-- Config -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-amber-300 font-medium">
                  DEFAULT_FORMATS
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Object</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  預設格式設定物件 (唯讀)。
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

.label {
  color: #94a3b8;
  margin-right: 0.5rem;
}
.value {
  color: #f1f5f9;
  font-family: monospace;
}
</style>
