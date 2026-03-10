import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = 'c:/Users/gino.huang/Desktop/nuxt-layer-core-playground'
const corePath = path.join(projectRoot, 'packages/nuxt-core/components')
const outPath = path.join(projectRoot, 'apps/ui-docs/utils/doc-data.ts')

// 全組件 summary 資料庫 (Interface + Business + Layout)
const summaryMap = {
  // Interface Layer
  'IAlert': '向用戶顯示簡短且重要的通知訊息，支援多種語意狀態。',
  'IApp': '應用程式根容器，提供全局的佈局與主題注入。',
  'IAvatar': '顯示用戶頭像或項目縮圖的圓形容器元件。',
  'IBreadcrumbs': '顯示當前頁面在站點層級結構中的位置導航路徑。',
  'IButton': '觸發動作的可點擊元件，支援多種視覺變體、載入動畫與圖示。',
  'ICard': '彈性內容容器，適合組織與展示卡片式視覺資訊。',
  'ICheckbox': '允許用戶從一組選項中選取一個或多個項目。',
  'IChip': '代表一個標籤或屬性，通常包含簡短文字與可選的關閉按鈕。',
  'IChipGroup': '管理一組 IChip 選取狀態的容器，支援多選與單選。',
  'ICodeBlock': '顯示語法高亮程式碼片段的展示元件。',
  'IDataTable': '展示與操作大量結構化數據，支援分頁、排序與自定義欄位。',
  'IDatePicker': '用於選擇日期或日期範圍的日期選取器。',
  'IDivider': '水平或垂直分隔線，用於區隔頁面內容的視覺元素。',
  'IIcon': '基於 Material Design Icons 的圖示元件，支援尺寸與顏色控制。',
  'IInput': '基礎文本輸入元件，支援校驗狀態、清除按鈕與圖示配置。',
  'ILoadingButton': '內建載入狀態的按鈕，點擊後自動切換為 Loading 模式。',
  'ILoadingSpinner': '全屏或局部的載入旋轉動畫，用於非同步等待場景。',
  'IModal': '全屏蓋板式對話視窗，用於重要確認或輕量級表單收集。',
  'IRadio': '允許用戶從一組互斥選項中選取單一項目。',
  'ISelect': '提供預定義選項的下拉選單，支援物件格式數據綁定。',
  'ISheet': '基礎的內容展示容器，類似 Card 但更為輕量。',
  'ISnackbar': '顯示在頁面底部的短暫通知訊息，操作後自動消失。',
  'IStack': '提供水平或垂直堆疊佈局的 Flex 容器輔助元件。',
  'ISwitch': '在開啟與關閉兩個互斥狀態之間進行切換的開關。',
  'ITabs': '在多個相關內容區域之間進行水平切換的頁籤元件。',
  'ITextField': '整合 label 的完整文字輸入框，常用於表單場景。',
  'ITextarea': '用於輸入多行長文本內容，支援自動高度調整。',
  // UI Interface / layout subfolder
  'IAppBar': '頂部應用欄，提供標題、導航與操作按鈕的固定頂欄。',
  'IBadge': '附著於元件上方的微小狀態指示器，顯示數量或通知點。',
  'IDrawer': '可滑出的側邊欄導航面板，適用於主要導航結構。',
  'IMenuItem': '側邊欄或選單中的單一選項，支援圖示與啟用狀態。',
  // Business Layer
  'ApiLoadingButton': '整合 API 請求的按鈕，自動管理請求期間的載入狀態。',
  'BDataTable': '企業級數據表格，封裝了分頁、搜尋、API 請求等完整業務邏輯。',
  'CitySelect': '封裝了城市數據的選擇器，自動從後端載入城市列表。',
  'CountrySelect': '封裝了國家數據的選擇器，提供國際化的國家代碼列表。',
  'DateRangePicker': '封裝了日期範圍選取邏輯的複合元件，包含開始與結束日期。',
  'EmailInput': '整合了 Email 格式驗證的輸入框，提供即時格式檢查。',
  'GenderRadio': '封裝了性別選取邏輯的單選組，提供標準化的性別選項。',
  'GlobalLoading': '全局的載入遮罩元件，用於覆蓋整個頁面的等待狀態。',
  'GlobalModal': '全局的彈窗服務，透過 useModal 組合式 API 程式化呼叫。',
  'GlobalSnackbar': '全局的訊息列服務，透過 useSnackbar 組合式 API 呼叫。',
  'OptionSelect': '從後端動態取得選項的下拉選單，封裝了數據載入邏輯。',
  'PasswordInput': '整合了密碼顯示切換與強度驗證的密碼輸入框。',
  'PhoneInput': '整合了國際電話格式的輸入框，包含區號選擇。',
  'PolicyForm': '封裝了政策相關條款閱讀與確認邏輯的表單區塊。',
  'SmartCard': '整合了載入狀態、標題與操作按鈕的智慧卡片容器。',
  'SmartComplexWidget': '多功能的複合型業務組件，封裝了複雜的業務數據展示邏輯。',
  'SmartTable': '整合了完整業務邏輯的智慧表格，包含 API 請求、分頁與篩選。',
  // Layout Layer
  'AppFooter': '應用程式的底部頁腳，顯示版權與附加導航連結。',
  'AppHeader': '應用程式的頂部標題欄，包含品牌標誌與導航入口。',
  'AppSidebar': '應用程式的主要側邊欄導航，管理路由選單與展開收合狀態。',
  'AppSidebarItem': '側邊欄中的單一導航項，支援圖示、文字與啟用高亮狀態。',
  'PortalHeader': '面向外部用戶的入口式頂部標頭，支援登入狀態與多語切換。',
}

// 通用屬性說明字典
const propDescDict = {
  label: '顯示在元件上的文字標籤',
  title: '標題文字',
  subtitle: '副標題文字',
  text: '顯示的主要文字內容',
  icon: '圖示名稱 (如: mdi-home)',
  description: '說明文字',
  href: '連結目標 URL，設置後元件將渲染為 <a> 標籤',
  target: '連結開啟方式 (_blank, _self)',
  placeholder: '輸入框的提示佔位文字',
  disabled: '是否禁用，禁用後不可點擊',
  loading: '是否顯示載入中狀態',
  readonly: '是否唯讀，可看到但不可編輯',
  clearable: '是否顯示清除按鈕',
  closable: '是否顯示關閉按鈕',
  error: '是否顯示錯誤狀態',
  errorMessage: '輸入驗證失敗時顯示的錯誤訊息',
  errorMessages: '輸入驗證失敗時顯示的錯誤訊息（支援多行）',
  block: '是否為全寬區塊按鈕',
  variant: '元件的視覺變體 (如 filled, outlined, tonal, flat)',
  size: '元件的尺寸 (small, medium, large)',
  color: '元件的主題顏色',
  elevation: '陰影高度層次，數值越大陰影越深',
  rounded: '圓角程度設定',
  density: '元件的密度樣式 (compact / comfortable / default)',
  modelValue: '雙向綁定的值 (v-model)',
  value: '元件的值（多選模式的選項識別鍵）',
  options: '選項列表，格式為 { label, value } 的陣列',
  items: '數據陣列',
  columns: '表格欄位定義陣列',
  dataSource: '表格的數據源陣列',
  total: '數據總筆數（分頁用）',
  currentPage: '當前頁碼（分頁用）',
  pageSize: '每頁顯示的筆數',
  type: '元件的 HTML 類型屬性（text / password / number）',
  autocomplete: '瀏覽器自動完成行為 (on / off)',
  maxlength: '輸入框最大字元數限制',
  prependIcon: '前置圖示名稱，顯示在元件左側',
  appendIcon: '後置圖示名稱，顯示在元件右側',
  multiple: '是否允許多選',
  inset: '是否使用內嵌樣式（適用於 Switch）',
  hideDetails: '是否隱藏詳細訊息（如錯誤訊息或提示文字）',
  indeterminate: '是否為半選狀態（適用於 Checkbox）',
  trueValue: '開關開啟時的綁定值',
  falseValue: '開關關閉時的綁定值',
  modelValue: '雙向綁定的值 (v-model)',
  maxWidth: '元件的最大寬度',
  persistent: '是否強制顯示，不允許點擊遮罩關閉',
  closeOnMask: '是否允許點擊背景遮罩來關閉',
  showCancel: '是否顯示取消按鈕',
  confirmText: '確認按鈕的文字',
  cancelText: '取消按鈕的文字',
  content: '對話框的主體內容文字',
}

let content = `import type { ComponentApiDoc } from './doc-types'\n\nexport const componentDocs: Record<string, ComponentApiDoc> = {\n`

function getPropsDesc(name, type) {
  if (name === 'type') {
    if (type.includes('info') || type.includes('success') || type.includes('warning') || type.includes('error')) {
      return '語意類型：決定元件的視覺色彩 (info / success / warning / error)'
    }
    return '元件的 HTML 類型屬性 (text / password / number / email 等)'
  }
  if (propDescDict[name]) return propDescDict[name]
  if (name.endsWith('Icon')) return '圖示名稱 (MDI 格式，如 mdi-home)'
  if (name.startsWith('is')) return `是否啟用 ${name.slice(2)} 狀態`
  if (name.endsWith('Messages')) return '相關的提示或錯誤訊息'
  return ''
}

function extractProps(fileContent) {
  const props = []
  const propsMatch = fileContent.match(/interface Props \{([\s\S]*?)\}/)
  if (propsMatch) {
    const lines = propsMatch[1].split('\n')
    let currentDesc = ''
    lines.forEach(line => {
      const trimmed = line.trim()
      if (trimmed.startsWith('//')) {
        currentDesc = trimmed.replace(/^\/\/ ?/, '').trim()
      } else if (trimmed.startsWith('/**') || trimmed.startsWith('*')) {
        const cleaned = trimmed.replace(/\/\*\*|\*\/|\*/g, '').replace(/@\w+.*/, '').trim()
        if (cleaned) currentDesc = cleaned
      } else if (trimmed.includes(':')) {
        const parts = trimmed.split(':')
        const namePart = parts[0].replace('?', '').trim()
        const typePart = parts.slice(1).join(':').replace(',', '').replace(';', '').trim()
        if (namePart && !namePart.startsWith('//')) {
          const desc = currentDesc || getPropsDesc(namePart, typePart)
          props.push({ name: namePart, type: typePart, desc, default: '' })
          currentDesc = ''
        }
      }
    })
  }
  const defaultMatch = fileContent.match(/withDefaults\(defineProps<Props>\(\), \{([\s\S]*?)\}\)/)
  if (defaultMatch) {
    const defaultLines = defaultMatch[1].split('\n')
    defaultLines.forEach(line => {
      if (line.includes(':')) {
        const parts = line.split(':')
        const name = parts[0].trim()
        const val = parts.slice(1).join(':').trim().replace(/,$/, '')
        const p = props.find(x => x.name === name)
        if (p) p.default = val
      }
    })
  }
  return props
}

function extractEmits(fileContent) {
  const emits = []
  const emitMatch = fileContent.match(/defineEmits<\{([\s\S]*?)\}>/)
  if (emitMatch) {
    const lines = emitMatch[1].split('\n')
    lines.forEach(line => {
      const m = line.match(/\(e: '(.+?)',?\s*(.*?)\): void/)
      if (m) emits.push({ name: m[1], payload: m[2] || '-', desc: '' })
    })
  }
  return emits
}

function extractMethods(fileContent) {
  const methods = []
  const exposeMatch = fileContent.match(/defineExpose\(\{([\s\S]*?)\}\)/)
  if (exposeMatch) {
    const lines = exposeMatch[1].split('\n')
    lines.forEach(line => {
      if (line.includes(':')) {
        const name = line.split(':')[0].trim()
        if (name) methods.push({ name, params: '-', desc: '元件公開方法' })
      }
    })
  }
  return methods
}

function extractSlots(fileContent) {
  const slots = []
  const slotMatches = [...fileContent.matchAll(/<slot name="(.+?)"/g)]
  slotMatches.forEach(match => {
    if (!slots.find(s => s.name === match[1])) {
      slots.push({ name: match[1], desc: `具名插槽: ${match[1]}` })
    }
  })
  if (fileContent.includes('<slot') && !fileContent.includes('<slot name=')) {
    slots.push({ name: 'default', desc: '預設插槽內容' })
  }
  return slots
}

function scanDir(dirPath) {
  if (!fs.existsSync(dirPath)) return
  const items = fs.readdirSync(dirPath)
  items.forEach(item => {
    const fullPath = path.join(dirPath, item)
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath)
    } else if (item.endsWith('.vue')) {
      const fileContent = fs.readFileSync(fullPath, 'utf-8')
      const name = item.replace('.vue', '')
      const descMatch = fileContent.match(/\* (.+) - UI/) || fileContent.match(/用途：(.+)/)
      const description = descMatch ? descMatch[1].trim() : `${name} 元件`
      
      const props = extractProps(fileContent)
      const emits = extractEmits(fileContent)
      const methods = extractMethods(fileContent)
      const slots = extractSlots(fileContent)
      
      const summary = summaryMap[name] || `${description}，提供標準的介面交互。`

      content += `  '${name}': {
    name: '${name}',
    description: '${description}',
    importPath: "import { ${name} } from 'softleader-nuxt-core'",
    summary: '${summary}',
    props: ${JSON.stringify(props, null, 6)},
    emits: ${JSON.stringify(emits, null, 6)},
    methods: ${JSON.stringify(methods, null, 6)},
    slots: ${JSON.stringify(slots, null, 6)},
    codeExample: \`<${name}\\n  v-bind="props"\\n/>\`
  },\n`
    }
  })
}

const dirs = ['uiInterface', 'uiBusiness', 'layout', 'auth', 'templates']
dirs.forEach(dir => scanDir(path.join(corePath, dir)))

content += `};\n\nexport function getComponentDoc(name: string) {\n  return componentDocs[name] || null\n}\n`
fs.writeFileSync(outPath, content)
console.log('✅ doc-data.ts fully updated with ALL components!')
