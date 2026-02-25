<script setup lang="ts">
/**
 * @功能 資安防護展示頁面
 * @description 展示所有前端資安防護機制與設定,包含資料遮蔽與安全標頭
 */
import { ref, computed } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'


import { securityOptions, securityHeaders as realSecurityHeaders } from '@/core/config/security'

// 從 runtime config 讀取資安設定
const config = useRuntimeConfig()
const isSecurityEnabled = computed(
  () => config.public.enableSecurityMode === true || config.public.enableSecurityMode === 'true'
)

// 資料遮蔽測試資料
const idCardInput = ref('A123456789')
const phoneInput = ref('0912345678')
const emailInput = ref('user@example.com')
const nameInput = ref('王小明')
const addressInput = ref('台北市信義區信義路五段7號')
const creditCardInput = ref('1234567890123456')
const bankAccountInput = ref('8221234567890123')
const taxIdInput = ref('12345678')
const passportInput = ref('AB1234567')

// 資安功能分類介面
interface SecurityFeature {
  id: string
  name: string
  description: string
  enabled: boolean
  level: 'high' | 'medium' | 'low'
  category: string
  implementation: string
  impact: string
}

// 所有資安功能清單 (連結至實際設定)
const securityFeatures = computed<SecurityFeature[]>(() => [
  // 基礎防護
  {
    id: 'contextMenu',
    name: '禁用右鍵選單',
    description: '防止使用者透過右鍵選單檢視原始碼或複製內容',
    enabled: securityOptions.disableContextMenu,
    level: 'medium',
    category: '基礎防護',
    implementation: 'contextmenu event',
    impact: '阻止右鍵選單彈出'
  },
  {
    id: 'devTools',
    name: '禁用開發者工具快捷鍵',
    description: '阻止 F12、Ctrl+Shift+I、Ctrl+U 等',
    enabled: securityOptions.disableDevTools,
    level: 'high',
    category: '基礎防護',
    implementation: 'keydown event intercept',
    impact: '無法使用快捷鍵開啟 DevTools'
  },
  {
    id: 'dragDrop',
    name: '禁用拖曳',
    description: '防止拖曳圖片或連結到其他應用程式',
    enabled: securityOptions.disableDragDrop,
    level: 'medium',
    category: '基礎防護',
    implementation: 'dragstart prevention',
    impact: '無法拖曳元素'
  },
  {
    id: 'console',
    name: '生產環境移除 Console',
    description: '在正式環境中禁用所有 console 輸出',
    enabled: securityOptions.disableConsole,
    level: 'medium',
    category: '基礎防護',
    implementation: 'console override',
    impact: '正式環境無 console 輸出'
  },

  // 截圖防護
  {
    id: 'printScreen',
    name: 'Print Screen 偵測',
    description: '偵測 PrintScreen 按鍵並立即模糊畫面',
    enabled: securityOptions.disablePrintScreen,
    level: 'high',
    category: '截圖防護',
    implementation: 'keyup event + blur',
    impact: '按下截圖鍵時畫面模糊'
  },
  {
    id: 'screenshotTools',
    name: '系統截圖工具偵測',
    description: '偵測 Win+Shift+S / Cmd+Shift+3',
    enabled: securityOptions.detectScreenCapture,
    level: 'high',
    category: '截圖防護',
    implementation: 'Key combination detect',
    impact: '截圖工具啟動前模糊'
  },
  {
    id: 'visibilityBlur',
    name: '視窗失焦模糊',
    description: '切換視窗或分頁時自動模糊畫面',
    enabled: securityOptions.blurOnVisibilityChange,
    level: 'high',
    category: '截圖防護',
    implementation: 'visibilitychange event',
    impact: '離開頁面時模糊'
  },

  // 進階防護
  {
    id: 'idleTimeout',
    name: '閒置超時鎖定',
    description: `閒置 ${securityOptions.idleTimeoutDuration / 60000} 分鐘後自動模糊並鎖定畫面`,
    enabled: securityOptions.idleTimeoutBlur,
    level: 'high',
    category: '進階防護',
    implementation: 'Activity montior',
    impact: '閒置後自動鎖定'
  },
  {
    id: 'watermark',
    name: '數位浮水印',
    description: '在背景顯示使用者資訊浮水印 (可選)',
    enabled: false, // 目前尚未實作此選項
    level: 'low',
    category: '進階防護',
    implementation: 'CSS overlay',
    impact: '畫面顯示浮水印'
  }
])

// HTTP 安全標頭 (從 realSecurityHeaders 轉換)
const securityHeaders = computed(() =>
  Object.entries(realSecurityHeaders.headers).map(([key, value]) => {
    // 簡單的描述映射
    const descriptions: Record<string, string> = {
      'X-Frame-Options': '防止 Clickjacking 攻擊',
      'X-Content-Type-Options': '防止 MIME Type Sniffing',
      'X-XSS-Protection': 'XSS 過濾器',
      'Strict-Transport-Security': '強制 HTTPS 連線 (HSTS)',
      'Content-Security-Policy': '限制資源來源,防止注入攻擊',
      'Referrer-Policy': '控制 Referrer 資訊傳遞'
    }

    return {
      name: key,
      value: String(value),
      description: descriptions[key] || '安全配置項目'
    }
  })
)

// 統計資料
const stats = computed(() => {
  const total = securityFeatures.value.length
  const enabled = securityFeatures.value.filter((f) => f.enabled).length
  const highLevel = securityFeatures.value.filter((f) => f.level === 'high' && f.enabled).length

  return {
    total,
    enabled,
    disabled: total - enabled,
    highLevel,
    coverage: Math.round((enabled / total) * 100)
  }
})

// 按分類分組
const categorizedFeatures = computed(() => {
  const categories = ['基礎防護', '截圖防護', '進階防護']
  return categories.map((category) => ({
    name: category,
    features: securityFeatures.value.filter((f) => f.category === category)
  }))
})

// 測試功能
const testScreenshotProtection = () => {
  alert('請嘗試按下 PrintScreen 或 Win+Shift+S 來測試截圖防護')
}

const testIdleTimeout = () => {
  alert('請暫停操作 3 分鐘以測試閒置鎖定')
}

definePageMeta({
  title: '資安防護',
  icon: 'mdi-shield-lock',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="前端資安防護模組"
    description="前端安全防護機制 - 整合資料遮蔽、防截圖、防竊取與 HTTP 安全標頭配置。"
  >
    <!-- 核心特色 -->
    <ShowcaseSection title="核心特色">
      <ShowcaseCard
        title="全方位防護機制"
        description="多層次的安全防護網"
      >
        <ul class="benefit-list">
          <li>
            <strong>資料遮蔽:</strong>
            自動識別並遮蔽敏感個資 (身分證、手機、Email、信用卡),前端顯示更加安全。
          </li>
          <li>
            <strong>防截圖機制:</strong>
            智能偵測 PrintScreen 與系統截圖快捷鍵,自動模糊畫面保護敏感資訊。
          </li>
          <li>
            <strong>操作行為管控:</strong>
            禁用右鍵、選取複製、F12 開發者工具,降低資料外洩風險。
          </li>
          <li>
            <strong>環境安全監控:</strong>
            閒置自動鎖定、視窗失焦模糊、浮水印機制,確保操作環境安全。
          </li>
        </ul>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 敏感資料遮蔽 -->
    <ShowcaseSection title="敏感資料遮蔽">
      <div class="stack-grid">
        <ShowcaseCard
          title="個資遮蔽即時演示"
          description="在左側輸入框輸入資料,右側即時顯示遮蔽結果"
          full-width
        >
          <div class="demo-grid demo-area">
            <!-- 身分證字號 -->
            <div class="mask-demo-item">
              <label class="mask-label">身分證字號</label>
              <div class="mask-row">
                <IInput
                  v-model="idCardInput"
                  placeholder="例: A123456789"
                />
                <div class="masked-output">
                  {{ maskIdCard(idCardInput) }}
                </div>
              </div>
            </div>

            <!-- 手機號碼 -->
            <div class="mask-demo-item">
              <label class="mask-label">手機號碼</label>
              <div class="mask-row">
                <IInput
                  v-model="phoneInput"
                  placeholder="例: 0912345678"
                />
                <div class="masked-output">
                  {{ maskPhone(phoneInput) }}
                </div>
              </div>
            </div>

            <!-- Email -->
            <div class="mask-demo-item">
              <label class="mask-label">電子郵件</label>
              <div class="mask-row">
                <IInput
                  v-model="emailInput"
                  placeholder="例: user@example.com"
                />
                <div class="masked-output">
                  {{ maskEmail(emailInput) }}
                </div>
              </div>
            </div>

            <!-- 姓名 -->
            <div class="mask-demo-item">
              <label class="mask-label">姓名</label>
              <div class="mask-row">
                <IInput
                  v-model="nameInput"
                  placeholder="例: 王小明"
                />
                <div class="masked-output">
                  {{ maskName(nameInput) }}
                </div>
              </div>
            </div>

            <!-- 信用卡號 -->
            <div class="mask-demo-item">
              <label class="mask-label">信用卡號</label>
              <div class="mask-row">
                <IInput
                  v-model="creditCardInput"
                  placeholder="例: 1234567890123456"
                />
                <div class="masked-output">
                  {{ maskCreditCard(creditCardInput) }}
                </div>
              </div>
            </div>

            <!-- 銀行帳號 -->
            <div class="mask-demo-item">
              <label class="mask-label">銀行帳號</label>
              <div class="mask-row">
                <IInput
                  v-model="bankAccountInput"
                  placeholder="例: 8221234567890123"
                />
                <div class="masked-output">
                  {{ maskBankAccount(bankAccountInput) }}
                </div>
              </div>
            </div>

            <!-- 統一編號 -->
            <div class="mask-demo-item">
              <label class="mask-label">統一編號</label>
              <div class="mask-row">
                <IInput
                  v-model="taxIdInput"
                  placeholder="例: 12345678"
                />
                <div class="masked-output">
                  {{ maskTaxId(taxIdInput) }}
                </div>
              </div>
            </div>

            <!-- 護照號碼 -->
            <div class="mask-demo-item">
              <label class="mask-label">護照號碼</label>
              <div class="mask-row">
                <IInput
                  v-model="passportInput"
                  placeholder="例: AB1234567"
                />
                <div class="masked-output">
                  {{ maskPassport(passportInput) }}
                </div>
              </div>
            </div>

            <!-- 地址 -->
            <div class="mask-demo-item md:col-span-2">
              <label class="mask-label">地址</label>
              <div class="mask-row">
                <IInput
                  v-model="addressInput"
                  placeholder="例: 台北市信義區信義路五段7號"
                  class="flex-1"
                />
                <div class="masked-output flex-1">
                  {{ maskAddress(addressInput) }}
                </div>
              </div>
            </div>
          </div>

          <template #footer>
            <ShowcaseCodeBlock
              code="// 1. 引入遮蔽函式


// 2. 使用範例
const userIdCard = 'A123456789'
const maskedId = maskIdCard(userIdCard)  // 結果: A123****89

const userPhone = '0912345678'
const maskedPhone = maskPhone(userPhone) // 結果: 0912***678

const userEmail = 'user@example.com'
const maskedEmail = maskEmail(userEmail) // 結果: u***r@example.com"
              label="如何使用 - 基本範例"
            />
          </template>
        </ShowcaseCard>

        <!-- 進階用法 -->
        <ShowcaseCard
          title="進階用法:在 API 回應中自動遮蔽"
          description="實際專案中的應用場景"
          full-width
        >
          <ShowcaseCodeBlock
            code="// composables/useUserData.ts


export function useUserData() {
  const fetchUserProfile = async (userId: string) => {
    const { data } = await useApi(`/users/${userId}`)
    
    // 在顯示前自動遮蔽敏感資料
    return {
      ...data,
      idCard: maskIdCard(data.idCard),
      phone: maskPhone(data.phone),
      email: maskEmail(data.email)
    }
  }
  
  return { fetchUserProfile }
}"
            label="Composable 整合範例"
          />
        </ShowcaseCard>

        <!-- Vue 模板用法 -->
        <ShowcaseCard
          title="在 Vue 模板中使用"
          description="直接在畫面上顯示遮蔽資料"
          full-width
        >
          <ShowcaseCodeBlock
            code="<script setup>


const user = ref({
  name: '王小明',
  idCard: 'A123456789',
  phone: '0912345678'
})
</script>

<template>
  <div class='user-info'>
    <p>姓名: {{ user.name }}</p>
    <p>身分證: {{ maskIdCard(user.idCard) }}</p>
    <p>電話: {{ maskPhone(user.phone) }}</p>
  </div>
</template>"
            label="Vue 模板範例"
          />
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 資安儀表板 -->
    <ShowcaseSection title="資安狀態">
      <div class="stack-grid">
        <!-- 系統防護設定說明 -->
        <ShowcaseCard
          title="系統防護設定對照 (options.ts)"
          description="core/config/security/options.ts 中的各項開關與功能說明"
        >
          <div class="config-desc-container px-2">
            <div class="space-y-6">
              <div class="config-cat">
                <h4 class="text-blue-400 font-bold mb-2 flex items-center gap-2">
                  <i class="mdi mdi-shield-check"></i>
                  基礎防護
                </h4>
                <ul class="text-sm space-y-2 text-slate-300">
                  <li>
                    <code class="text-blue-300">disableContextMenu</code>
                    : 禁用右鍵選單,防止查看源碼或存圖。
                  </li>
                  <li>
                    <code class="text-blue-300">disableDevTools</code>
                    : 禁用開發者工具快捷鍵 (F12, Ctrl+Shift+I)。
                  </li>
                  <li>
                    <code class="text-blue-300">disableTextSelection</code>
                    : 是否禁用文字選用 (預設允許)。
                  </li>
                  <li>
                    <code class="text-blue-300">disableDragDrop</code>
                    : 禁用拖曳功能,防止內容被拖出。
                  </li>
                </ul>
              </div>
              <div class="config-cat">
                <h4 class="text-green-400 font-bold mb-2 flex items-center gap-2">
                  <i class="mdi mdi-camera-off"></i>
                  截圖防護
                </h4>
                <ul class="text-sm space-y-2 text-slate-300">
                  <li>
                    <code class="text-green-300">disablePrintScreen</code>
                    : 偵測並攔截 Print Screen 按鍵。
                  </li>
                  <li>
                    <code class="text-green-300">blurOnVisibilityChange</code>
                    : 切換分頁或縮小視窗時自動模糊。
                  </li>
                  <li>
                    <code class="text-green-300">detectScreenCapture</code>
                    : 偵測瀏覽器錄影或擷取 API。
                  </li>
                </ul>
              </div>
              <div class="config-cat">
                <h4 class="text-purple-400 font-bold mb-2 flex items-center gap-2">
                  <i class="mdi mdi-timer-lock"></i>
                  進階與導航
                </h4>
                <ul class="text-sm space-y-2 text-slate-300">
                  <li>
                    <code class="text-purple-300">idleTimeoutBlur</code>
                    : 長時間無操作時自動鎖定畫面。
                  </li>
                  <li>
                    <code class="text-purple-300">idleTimeoutDuration</code>
                    : 閒置鎖定判斷時間 (預設 3 分鐘)。
                  </li>
                  <li>
                    <code class="text-purple-300">disableNavigation</code>
                    : 禁用瀏覽器歷史導航快捷鍵。
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ShowcaseCard>
        <!-- 狀態卡片 -->
        <ShowcaseCard
          title="防護模式狀態"
          :description="isSecurityEnabled ? '已啟用防護模式' : '防護模式未啟用'"
        >
          <div class="flex items-center justify-center p-6 bg-slate-800/30 rounded-lg">
            <div class="flex flex-col items-center gap-2">
              <div
                class="text-5xl mb-2"
                :class="isSecurityEnabled ? 'text-green-400' : 'text-slate-500'"
              >
                {{ isSecurityEnabled ? '🛡️' : '⚠️' }}
              </div>
              <div
                class="text-xl font-bold"
                :class="isSecurityEnabled ? 'text-white' : 'text-slate-400'"
              >
                {{ isSecurityEnabled ? '系統已防護' : '防護已停用' }}
              </div>
            </div>
          </div>

          <template #footer>
            <ShowcaseCodeBlock
              code="// 如何取得防護模式狀態
const config = useRuntimeConfig()

const isSecurityEnabled = computed(() => 
  config.public.enableSecurityMode === true
)

// 使用範例
if (isSecurityEnabled.value) {
  console.log('系統已防護')
} else {
  console.log('防護已停用')
}"
              label="狀態檢查程式碼"
            />
          </template>
        </ShowcaseCard>

        <!-- 統計數據 -->
        <ShowcaseCard
          title="防護覆蓋率"
          description="目前的資安功能啟用統計"
        >
          <div class="stat-grid">
            <div class="stat-box">
              <div class="value text-white">{{ stats.total }}</div>
              <div class="label">總功能數</div>
              <div class="stat-hint">所有資安功能總數</div>
            </div>
            <div class="stat-box">
              <div class="value text-green-400">{{ stats.enabled }}</div>
              <div class="label">已啟用</div>
              <div class="stat-hint">目前啟用的功能數</div>
            </div>

            <div class="stat-box">
              <div class="value text-blue-400">{{ stats.coverage }}%</div>
              <div class="label">防護覆蓋率</div>
              <div class="stat-hint">已啟用 ÷ 總數 × 100</div>
            </div>
          </div>

          <template #footer>
            <ShowcaseCodeBlock
              code="// 如何計算統計數據
// 註: securityFeatures 是定義在本頁面的 ref 變數
const stats = computed(() => {
  const total = securityFeatures.value.length
  const enabled = securityFeatures.value.filter(f => f.enabled).length
  const highLevel = securityFeatures.value.filter(
    f => f.level === 'high' && f.enabled
  ).length

  return {
    total,
    enabled,
    disabled: total - enabled,
    highLevel,
    coverage: Math.round((enabled / total) * 100)
  }
})"
              label="統計計算邏輯 (本頁面實作範例)"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 如何引入與使用 -->
    <ShowcaseSection
      title="如何引入與使用"
      icon="📖"
    >
      <div class="stack-grid">
        <ShowcaseCard
          title="引入資安設定"
          description="在元件或 Composable 中使用"
        >
          <ShowcaseCodeBlock
            code="// 引入資安設定
import { securityOptions, securityMessages } from '@/core/config/security'

// 使用範例
console.log('閒置時間:', securityOptions.idleTimeoutDuration)
console.log('截圖提示:', securityMessages.screenshot.title)

// 檢查功能是否啟用
if (securityOptions.disablePrintScreen) {
  console.log('截圖防護已啟用')
}"
            label="直接引入設定"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="檢查資安模式狀態"
          description="透過 Runtime Config 檢查"
        >
          <ShowcaseCodeBlock
            code="<script setup>
const config = useRuntimeConfig()

// 檢查資安模式是否啟用
const isSecurityEnabled = computed(() => 
  config.public.enableSecurityMode === true
)
</script>

<template>
  <div v-if='isSecurityEnabled'>
    資安模式已啟用
  </div>
</template>"
            label="Runtime Config"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="建立 Composable (建議)"
          description="封裝成可重用的函式"
        >
          <ShowcaseCodeBlock
            code="// composables/useSecurity.ts
import { securityOptions, securityMessages } from '@/core/config/security'

export function useSecurity() {
  const config = useRuntimeConfig()
  
  return {
    isEnabled: computed(() => config.public.enableSecurityMode),
    options: securityOptions,
    messages: securityMessages
  }
}

// === 使用 ===
<script setup>
const { isEnabled, options } = useSecurity()
</script>"
            label="Composable 封裝"
          />
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 詳細功能 -->
    <div class="section-grid mb-12">
      <ShowcaseSection
        v-for="category in categorizedFeatures"
        :key="category.name"
        :title="category.name"
        icon="🔒"
        class="compact-section"
      >
        <div class="feature-stack">
          <ShowcaseCard
            v-for="feature in category.features"
            :key="feature.id"
            :title="feature.name"
            :description="feature.description"
          >
            <div class="flex items-center gap-2 mb-4">
              <span
                class="status-badge"
                :class="feature.enabled ? 'enabled' : 'disabled'"
              >
                {{ feature.enabled ? '啟用中' : '停用中' }}
              </span>
              <span
                class="level-badge"
                :class="feature.level"
              >
                {{ feature.level === 'high' ? '高' : feature.level === 'medium' ? '中' : '低' }}
              </span>
            </div>

            <div class="tech-details">
              <div class="detail-row">
                <span class="label">對應設定:</span>
                <code class="code text-blue-400">
                  {{
                    feature.id === 'contextMenu'
                      ? 'disableContextMenu'
                      : feature.id === 'devTools'
                        ? 'disableDevTools'
                        : feature.id === 'dragDrop'
                          ? 'disableDragDrop'
                          : feature.id === 'console'
                            ? 'disableConsole'
                            : feature.id === 'printScreen'
                              ? 'disablePrintScreen'
                              : feature.id === 'screenshotTools'
                                ? 'detectScreenCapture'
                                : feature.id === 'visibilityBlur'
                                  ? 'blurOnVisibilityChange'
                                  : feature.id === 'idleTimeout'
                                    ? 'idleTimeoutBlur'
                                    : 'N/A'
                  }}
                </code>
              </div>
              <div class="detail-row">
                <span class="label">實作方式:</span>
                <code class="code">{{ feature.implementation }}</code>
              </div>
              <div class="detail-row">
                <span class="label">影響範圍:</span>
                <span class="value">{{ feature.impact }}</span>
              </div>
            </div>
          </ShowcaseCard>
        </div>
      </ShowcaseSection>
    </div>

    <!-- 功能測試區 -->
    <ShowcaseSection
      v-if="isSecurityEnabled"
      title="功能測試區"
      icon="🧪"
    >
      <ShowcaseCard
        title="互動測試"
        description="點擊按鈕測試相關防護反應"
        full-width
      >
        <div class="flex gap-4 mb-4">
          <IButton @click="testScreenshotProtection">
            <i class="mdi mdi-monitor-screenshot mr-2"></i>
            測試截圖防護
          </IButton>
          <IButton
            variant="secondary"
            @click="testIdleTimeout"
          >
            <i class="mdi mdi-timer-off mr-2"></i>
            測試閒置鎖定
          </IButton>
        </div>
        <div class="text-sm text-slate-400 bg-slate-800/50 p-4 rounded border border-slate-700/50">
          <p>
            💡 提示：您可以嘗試按下
            <strong>PrintScreen</strong>
            鍵,或是切換視窗,觀察畫面是否會自動模糊。
          </p>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 設定說明 -->
    <ShowcaseSection
      title="如何啟用資安模式"
      icon="⚙️"
    >
      <div class="stack-grid">
        >
        <ShowcaseCard
          title="環境變數設定"
          description="在 .env 檔案中啟用"
        >
          <ShowcaseCodeBlock
            code="# .env
NUXT_PUBLIC_ENABLE_SECURITY_MODE=true"
            language="bash"
            label=".env 設定"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="功能開關調整"
          description="在 core/config/security/options.ts 調整個別功能"
        >
          <ShowcaseCodeBlock
            code="// core/config/security/options.ts
export const defaultSecurityOptions: SecurityOptions = {
  disableContextMenu: true,        // 禁用右鍵
  disableDevTools: true,            // 禁用 F12
  disableTextSelection: false,      // 允許選取文字
  disablePrintScreen: true,         // 偵測並攔截 Print Screen
  blurOnVisibilityChange: true,     // 失焦模糊
  idleTimeoutBlur: true             // 閒置鎖定
}"
            label="功能開關設定 (options.ts)"
          />
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 檔案結構與設定說明 -->
    <ShowcaseSection
      title="檔案結構與設定"
      icon="📁"
    >
      <ShowcaseCard
        title="資安設定檔案位置"
        description="所有資安相關檔案的集中管理位置"
        full-width
      >
        <div class="file-structure">
          <div class="file-group">
            <h4 class="group-title">📂 資安設定中心</h4>
            <div class="file-item">
              <code>core/config/security/options.ts</code>
              <span class="file-desc">功能開關設定</span>
            </div>
            <div class="file-item">
              <code>core/config/security/messages.ts</code>
              <span class="file-desc">UI 提示訊息</span>
            </div>
            <div class="file-item">
              <code>core/config/security/headers.ts</code>
              <span class="file-desc">HTTP 安全標頭</span>
            </div>
            <div class="file-item">
              <code>core/config/security/index.ts</code>
              <span class="file-desc">統一匯出入口</span>
            </div>
          </div>

          <div class="file-group">
            <h4 class="group-title">🛠️ 工具函式</h4>
            <div class="file-item">
              <code>utils/security/mask.ts</code>
              <span class="file-desc">資料遮蔽工具</span>
            </div>
            <div class="file-item">
              <code>utils/security/blur.ts</code>
              <span class="file-desc">模糊層工具</span>
            </div>
          </div>

          <div class="file-group">
            <h4 class="group-title">⚡ 執行層</h4>
            <div class="file-item">
              <code>plugins/security.client.ts</code>
              <span class="file-desc">前端防護執行邏輯</span>
            </div>
          </div>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 使用範例 -->
    <ShowcaseSection
      title="使用範例"
      icon="💡"
    >
      <div class="stack-grid">
        <ShowcaseCard
          title="場景 1: API 回應自動遮蔽"
          description="在 Composable 中自動處理敏感資料"
          full-width
        >
          <ShowcaseCodeBlock
            code="// composables/useUserData.ts


export function useUserData() {
  const fetchUserProfile = async (userId: string) => {
    const { data } = await useApi(`/users/${userId}`)
    
    // 在顯示前自動遮蔽敏感資料
    return {
      ...data,
      idCard: maskIdCard(data.idCard),
      phone: maskPhone(data.phone),
      email: maskEmail(data.email)
    }
  }
  
  return { fetchUserProfile }
}"
            label="Composable 整合"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="場景 2: Vue 模板直接使用"
          description="在畫面上顯示遮蔽後的資料"
          full-width
        >
          <ShowcaseCodeBlock
            code="<script setup>


const user = ref({
  name: '王小明',
  idCard: 'A123456789',
  phone: '0912345678'
})
</script>

<template>
  <div class='user-info'>
    <p>姓名: {{ user.name }}</p>
    <p>身分證: {{ maskIdCard(user.idCard) }}</p>
    <p>電話: {{ maskPhone(user.phone) }}</p>
  </div>
</template>"
            label="Vue 模板使用"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="場景 3: 調整功能開關"
          description="修改資安設定檔"
          full-width
        >
          <ShowcaseCodeBlock
            code="// core/config/security/options.ts
export const defaultSecurityOptions: SecurityOptions = {
  // 基礎防護
  disableContextMenu: true,        // 禁用右鍵
  disableDevTools: true,            // 禁用 F12
  disableTextSelection: false,      // 允許選取文字
  
  // 截圖防護
  disablePrintScreen: true,         // 偵測截圖
  blurOnVisibilityChange: true,     // 失焦模糊
  
  // 進階防護
  idleTimeoutBlur: true,            // 閒置鎖定
  idleTimeoutDuration: 5 * 60 * 1000 // 改成 5 分鐘
}"
            label="設定檔修改"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="場景 4: 自訂警告訊息"
          description="修改 UI 提示文字"
          full-width
        >
          <ShowcaseCodeBlock
            code="// core/config/security/messages.ts
export const securityMessages = {
  screenshot: {
    icon: '⚠️',
    title: '你的公司名稱',
    message: '自訂的警告訊息',
    action: '點擊繼續'
  },
  idle: {
    icon: '🔒',
    title: '畫面已鎖定',
    message: '閒置過久,請重新驗證',
    action: '點擊解鎖'
  }
}"
            label="訊息自訂"
          />
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 常見問題 -->
    <ShowcaseSection title="常見問題">
      <div class="stack-grid">
        <ShowcaseCard
          title="Q: 如何啟用資安模式?"
          description="環境變數設定"
        >
          <ShowcaseCodeBlock
            code="# .env
NUXT_PUBLIC_ENABLE_SECURITY_MODE=true"
            language="bash"
            label="設定方式"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Q: 如何關閉特定功能?"
          description="修改 options.ts"
        >
          <ShowcaseCodeBlock
            code="// core/config/security/options.ts
export const defaultSecurityOptions = {
  disableTextSelection: false,  // 允許選取
  disableNavigation: false,     // 允許導航
  enableKioskMode: false        // 不啟用 Kiosk
}"
            label="功能開關"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Q: 如何允許特定區域選取文字?"
          description="加上 selectable class"
        >
          <ShowcaseCodeBlock
            code="<!-- 這段文字可以選取 -->
<div class='selectable'>
  使用者可以選取這段文字
</div>"
            label="HTML 標記"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Q: 如何允許特定 Canvas 截圖?"
          description="加上 data 屬性"
        >
          <ShowcaseCodeBlock
            code="<!-- 這個 Canvas 允許截圖 -->
<canvas data-allow-capture='true'></canvas>"
            label="Canvas 設定"
          />
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.stat-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
}

@media (min-width: 768px) {
  .stat-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .component-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.stack-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2rem;
}

@media (min-width: 1024px) {
  .section-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.feature-stack {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.compact-section {
  margin-bottom: 2rem !important;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .demo-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.benefit-list {
  padding-left: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin: 0;
}

.benefit-list li {
  background: rgba(30, 41, 59, 0.4);
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.1);
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.6;
}

.benefit-list li strong {
  display: block;
  color: #38bdf8;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.mask-demo-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.mask-label {
  font-size: 0.875rem;
  color: #94a3b8;
  font-weight: 500;
}

.mask-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.masked-output {
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%);
  border: 2px solid transparent;
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6)),
    linear-gradient(135deg, rgba(56, 189, 248, 0.3), rgba(129, 140, 248, 0.3));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 8px;
  color: #38bdf8;
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  min-width: 180px;
  font-weight: 600;
  height: 44px;
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.1);
  transition: all 0.3s ease;
}

.masked-output:hover {
  box-shadow: 0 6px 20px rgba(56, 189, 248, 0.25);
  transform: translateY(-1px);
}

.stat-box {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%);
  padding: 1.75rem;
  border-radius: 16px;
  text-align: center;
  border: 1px solid rgba(148, 163, 184, 0.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.stat-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #38bdf8, #818cf8, #c084fc);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.3);
}

.stat-box:hover::before {
  opacity: 1;
}

.stat-box .value {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  line-height: 1;
  background: linear-gradient(135deg, currentColor, currentColor);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.stat-box .label {
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.stat-box .stat-hint {
  color: #64748b;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  font-weight: 400;
  font-style: italic;
}

.status-badge {
  padding: 0.375rem 1rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.status-badge:hover {
  transform: scale(1.05);
}

.status-badge.enabled {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3));
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.4);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.status-badge.disabled {
  background: linear-gradient(135deg, rgba(100, 116, 139, 0.15), rgba(71, 85, 105, 0.2));
  color: #94a3b8;
  border: 1px solid rgba(100, 116, 139, 0.3);
}

.level-badge {
  padding: 0.375rem 1rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.level-badge:hover {
  transform: scale(1.05);
}

.level-badge.high {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.25));
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.level-badge.medium {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.25));
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.3);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.level-badge.low {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.25));
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.tech-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: rgba(15, 23, 42, 0.3);
  border-radius: 4px;
}

.detail-row .label {
  color: #64748b;
  font-size: 0.75rem;
}

.detail-row .code {
  color: #f472b6;
  font-family: monospace;
}

.detail-row .value {
  color: #cbd5e1;
}

.file-structure {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.file-group {
  background: rgba(15, 23, 42, 0.3);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.group-title {
  color: #38bdf8;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: rgba(30, 41, 59, 0.4);
  border-radius: 6px;
  border: 1px solid rgba(148, 163, 184, 0.05);
}

.file-item:last-child {
  margin-bottom: 0;
}

.file-item code {
  color: #f472b6;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
}

.file-desc {
  color: #94a3b8;
  font-size: 0.875rem;
}
</style>
