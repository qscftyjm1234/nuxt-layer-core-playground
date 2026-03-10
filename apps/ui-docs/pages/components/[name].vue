<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, reactive, watch, ref } from 'vue'
import { getComponentDoc } from '~/utils/doc-data'
import DocViewer from '~/components/DocViewer.vue'

const route = useRoute()
const componentName = computed(() => route.params.name as string)

const docData = computed(() => {
  return getComponentDoc(componentName.value) || {
    name: componentName.value,
    description: `這是一個自動引入的組件。`,
    importPath: `import { ${componentName.value} } from 'softleader-nuxt-core'`,
    summary: '',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: ''
  }
})

// ===== Playground State =====
const playgroundProps = reactive<Record<string, any>>({})
// 額外的插槽文字控制 (用於有插槽但無 label prop 的組件)
const slotText = reactive<Record<string, string>>({})

// 初始化：所有 Props 無論有無預設值都加入控制面板
watch(
  docData,
  (newDoc) => {
    // 清空舊狀態
    for (const key in playgroundProps) delete playgroundProps[key]
    for (const key in slotText) delete slotText[key]

    newDoc.props.forEach((prop: any) => {
      const rawDefault = prop.default
      let parsedVal: any = undefined

      if (rawDefault === 'false') parsedVal = false
      else if (rawDefault === 'true') parsedVal = true
      else if (!isNaN(Number(rawDefault)) && rawDefault !== '' && rawDefault !== 'undefined' && rawDefault !== null) {
        parsedVal = Number(rawDefault)
      } else if (typeof rawDefault === 'string' && rawDefault.startsWith("'") && rawDefault.endsWith("'")) {
        parsedVal = rawDefault.slice(1, -1)
      } else if (typeof rawDefault === 'string' && rawDefault.startsWith('"') && rawDefault.endsWith('"')) {
        parsedVal = rawDefault.slice(1, -1)
      }

      // 保證所有 Prop 都有初始值 (讓控制面板能顯示控制項)
      if (parsedVal !== undefined) {
        playgroundProps[prop.name] = parsedVal
      } else if (prop.type.includes('boolean')) {
        playgroundProps[prop.name] = false
      } else if (prop.type.includes('number') || prop.type.includes('Number')) {
        playgroundProps[prop.name] = 0
      } else {
        // string / 其他型別 → 初始化為空字串，讓 input 出現
        playgroundProps[prop.name] = ''
      }
    })

    // 特定組件初始化 Mock 預設值
    const mockDefaults: Record<string, Record<string, any>> = {
      'IAlert':     { title: '操作成功', text: '您的變更已成功套用至系統。', type: 'success' },
      'IChip':      { label: '狀態標籤', color: '#6366f1' },
      'IButton':    { variant: 'primary', size: 'medium', elevation: 2 },
      'ICard':      { title: '卡片標題', subtitle: '副標題說明', elevation: 2 },
      'IInput':     { label: '欄位名稱', placeholder: '請輸入內容...' },
      'IModal':     { title: '確認操作', content: '您確定要執行此操作嗎？', modelValue: false },
      'ISwitch':    { label: '啟用功能' },
      'ICheckbox':  { label: '同意服務條款' },
      'IRadio':     { label: '選項 A' },
      'ISelect':    { label: '請選擇' },
      'ITextField': { label: '欄位名稱', placeholder: '請輸入...' },
      'ITextarea':  { label: '備註', placeholder: '請輸入備註...' },
      'ApiLoadingButton': { label: '送出' },
      'ILoadingButton':   { label: '提交資料' },
    }
    const defaults = mockDefaults[componentName.value]
    if (defaults) {
      Object.entries(defaults).forEach(([key, val]) => {
        playgroundProps[key] = val
      })
    }

    // 插槽文字初始化 (for 以插槽為主要內容的組件)
    const slotDefaults: Record<string, Record<string, string>> = {
      'IButton': { default: '點擊我', prepend: '', append: '' },
      'ICard':   { header: '卡片自訂標題', default: '這是卡片內容，可以放任何內容。', actions: '' },
      'ISheet':  { default: '這是 Sheet 的預設內容。' },
      'IBadge':  { default: '按鈕', badge: '' },
    }
    const slotInit = slotDefaults[componentName.value]
    if (slotInit) {
      Object.entries(slotInit).forEach(([key, val]) => {
        slotText[key] = val
      })
    }
  },
  { immediate: true }
)

// Mock Data for Table/Select
const mockColumns = [
  { title: '名稱', dataIndex: 'name', key: 'name' },
  { title: '狀態', dataIndex: 'status', key: 'status' },
  { title: '更新時間', dataIndex: 'date', key: 'date' },
]
const mockDataSource = [
  { key: '1', name: '項目 A', status: '進行中', date: '2024-01-01' },
  { key: '2', name: '項目 B', status: '已完成', date: '2024-02-15' },
  { key: '3', name: '項目 C', status: '待處理', date: '2024-03-10' },
]
const mockOptions = [
  { label: '選項 A', value: 'a' },
  { label: '選項 B', value: 'b' },
  { label: '選項 C', value: 'c' },
]

const computedPlaygroundProps = computed(() => {
  const props: Record<string, any> = {}
  // 只傳入非空值的 prop (保留 false/0)
  Object.entries(playgroundProps).forEach(([key, val]) => {
    if (val !== '' && val !== undefined && val !== null) {
      props[key] = val
    }
  })
  const name = componentName.value
  if (name.includes('DataTable') || name.includes('Table') || name === 'SmartTable') {
    props.columns = props.columns ?? mockColumns
    props.dataSource = props.dataSource ?? mockDataSource
    props.items = props.items ?? mockDataSource
  }
  if (name.includes('Select') || name.includes('Options')) {
    props.options = props.options ?? mockOptions
    props.items = props.items ?? mockOptions
  }
  return props
})

// 是否有插槽文字配置
const hasSlotConfig = computed(() => Object.keys(slotText).length > 0)

// 需要跳過的複雜屬性
const skipProps = new Set(['columns', 'dataSource', 'options', 'items'])

// 即時程式碼生成
const isCopied = ref(false)

function isDefaultValue(prop: any, val: any): boolean {
  const rawDefault = prop.default
  if (rawDefault === 'false' && val === false) return true
  if (rawDefault === 'true' && val === true) return true
  if (typeof rawDefault === 'string' && rawDefault.startsWith("'") && rawDefault.endsWith("'")) {
    return val === rawDefault.slice(1, -1)
  }
  if (val === '' || val === 0) return true
  return false
}

const generatedCode = computed(() => {
  const name = componentName.value
  const props = playgroundProps
  const docProps = docData.value.props || []
  const lines: string[] = []

  Object.entries(props).forEach(([key, val]) => {
    if (skipProps.has(key)) return
    if (val === undefined || val === null || val === '') return
    if (Array.isArray(val) || typeof val === 'object') return
    const propDef = docProps.find((p: any) => p.name === key)
    if (propDef && isDefaultValue(propDef, val)) return

    if (typeof val === 'boolean') {
      if (val) lines.push(`  ${key}`)
    } else if (typeof val === 'number') {
      lines.push(`  :${key}="${val}"`)
    } else {
      lines.push(`  ${key}="${val}"`)
    }
  })

  // 插槽文字
  const defaultSlot = slotText['default']
  if (defaultSlot) {
    if (lines.length === 0) return `<${name}>\n  ${defaultSlot}\n</${name}>`
    return `<${name}\n${lines.join('\n')}\n>\n  ${defaultSlot}\n</${name}>`
  }

  return lines.length === 0 ? `<${name} />` : `<${name}\n${lines.join('\n')}\n/>`
})

async function copyCode() {
  try {
    await navigator.clipboard.writeText(generatedCode.value)
    isCopied.value = true
    setTimeout(() => { isCopied.value = false }, 2000)
  } catch {}
}
</script>

<template>
  <div class="component-page">
    <DocViewer
      :name="docData.name"
      :description="docData.description"
      :import-path="docData.importPath"
      :summary="docData.summary"
      :api-props="docData.props || []"
      :api-emits="docData.emits || []"
      :api-methods="docData.methods || []"
      :api-slots="docData.slots || []"
    >
      <template #demo>
        <div class="demo-playground-wrapper">

          <!-- Preview Area -->
          <div class="preview-host">
            <component :is="componentName" v-bind="computedPlaygroundProps">
              <template #default v-if="slotText.default !== undefined || ['ICard','ISheet','IModal'].includes(componentName)">
                {{ slotText.default || '插槽內容' }}
              </template>
              <template #header v-if="slotText.header !== undefined && slotText.header">
                {{ slotText.header }}
              </template>
              <template #actions v-if="['ICard','IModal'].includes(componentName)">
                <div class="flex gap-2">
                  <IButton size="small" variant="outlined">取消</IButton>
                  <IButton size="small" variant="primary">確認</IButton>
                </div>
              </template>
              <template #badge v-if="slotText.badge !== undefined">
                {{ slotText.badge || '3' }}
              </template>
            </component>
          </div>

          <!-- Plugin Controls (for slot-based content) -->
          <div class="slot-editor" v-if="hasSlotConfig">
            <h4 class="editor-header">
              <span class="editor-icon">📝</span> 插槽內容控制
            </h4>
            <div class="editor-grid">
              <div v-for="(val, key) in slotText" :key="key" class="prop-control">
                <div class="prop-info">
                  <span class="prop-name">#{{ key }}</span>
                  <span class="prop-type-tag">Slot</span>
                </div>
                <input
                  type="text"
                  v-model="slotText[key]"
                  class="ui-input"
                  :placeholder="`插槽 #${key} 內容...`"
                />
              </div>
            </div>
          </div>

          <!-- Prop Controls -->
          <div class="playground-editor" v-if="docData.props && docData.props.length > 0">
            <h4 class="editor-header">
              <span class="editor-icon">🎛️</span> 屬性控制面板
            </h4>
            <div class="editor-grid">
              <div v-for="prop in docData.props" :key="prop.name" class="prop-control">
                <div class="prop-info">
                  <span class="prop-name">{{ prop.name }}</span>
                  <span class="prop-type-tag">{{ prop.type.replace(/'/g, '').substring(0, 30) }}</span>
                </div>
                <div class="input-host">
                  <!-- Boolean Toggle -->
                  <div v-if="prop.type.includes('boolean')" class="switch-container">
                    <input type="checkbox" v-model="playgroundProps[prop.name]" class="ui-toggle" />
                    <span class="toggle-status">{{ playgroundProps[prop.name] ? 'ON' : 'OFF' }}</span>
                  </div>
                  <!-- Enum Select -->
                  <select
                    v-else-if="prop.type.includes('|') && prop.type.includes('\'')"
                    v-model="playgroundProps[prop.name]"
                    class="ui-select"
                  >
                    <option value="">(預設)</option>
                    <option
                      v-for="opt in prop.type.split('|').map((o: string) => o.trim().replace(/'/g, '')).filter((o: string) => o)"
                      :key="opt"
                      :value="opt"
                    >{{ opt }}</option>
                  </select>
                  <!-- Number -->
                  <input
                    v-else-if="prop.type.includes('number') || prop.type.includes('Number')"
                    type="number"
                    v-model.number="playgroundProps[prop.name]"
                    class="ui-input"
                  />
                  <!-- Text -->
                  <input
                    v-else
                    type="text"
                    v-model="playgroundProps[prop.name]"
                    class="ui-input"
                    :placeholder="`輸入 ${prop.name}...`"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Live Code Block -->
          <div class="code-preview-block">
            <div class="code-preview-header">
              <div class="code-dots">
                <span></span><span></span><span></span>
              </div>
              <span class="code-lang-badge">Vue Template</span>
              <button class="copy-btn" :class="{ copied: isCopied }" @click="copyCode">
                {{ isCopied ? '已複製！' : '複製程式碼' }}
              </button>
            </div>
            <pre class="code-body"><code>{{ generatedCode }}</code></pre>
          </div>
        </div>
      </template>
    </DocViewer>
  </div>
</template>

<style scoped>
.demo-playground-wrapper { width: 100%; }
.preview-host { padding: 1.5rem; width: 100%; display: flex; justify-content: center; align-items: center; min-height: 180px; }

.playground-editor, .slot-editor {
  margin-top: 1.5rem; background: #fff;
  border: 1px solid #eef2f6; border-radius: 12px;
  overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.03);
}
.editor-header {
  background: #f8fafc; padding: 0.75rem 1.25rem;
  border-bottom: 1px solid #f1f5f9; font-size: 0.82rem;
  font-weight: 800; display: flex; align-items: center;
  gap: 0.5rem; color: #475569;
}
.editor-grid {
  padding: 1.25rem;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
.prop-control { display: flex; flex-direction: column; gap: 0.35rem; }
.prop-info { display: flex; justify-content: space-between; align-items: center; }
.prop-name { font-size: 0.78rem; font-weight: 700; color: #334155; font-family: 'JetBrains Mono', monospace; }
.prop-type-tag { font-size: 0.62rem; background: #f1f5f9; color: #64748b; padding: 0.1rem 0.3rem; border-radius: 4px; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ui-input, .ui-select {
  width: 100%; padding: 0.45rem 0.7rem;
  border: 1px solid #e2e8f0; border-radius: 6px;
  font-size: 0.8rem; background-color: white; color: #1e293b;
  transition: border-color 0.2s;
}
.ui-input:focus, .ui-select:focus { outline: none; border-color: #6366f1; }
.switch-container { display: flex; align-items: center; gap: 0.5rem; }
.ui-toggle { appearance: none; width: 32px; height: 16px; background: #cbd5e1; border-radius: 16px; position: relative; cursor: pointer; transition: background 0.2s; }
.ui-toggle:checked { background: #6366f1; }
.ui-toggle::before { content: ''; position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; background: white; border-radius: 50%; transition: transform 0.2s; }
.ui-toggle:checked::before { transform: translateX(16px); }
.toggle-status { font-size: 0.7rem; font-weight: 700; color: #64748b; }

/* Code Block */
.code-preview-block { margin-top: 1.5rem; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b; }
.code-preview-header { background: #1e293b; padding: 0.65rem 1rem; display: flex; align-items: center; gap: 0.75rem; }
.code-dots { display: flex; gap: 5px; }
.code-dots span { width: 10px; height: 10px; border-radius: 50%; }
.code-dots span:nth-child(1) { background: #ef4444; }
.code-dots span:nth-child(2) { background: #f59e0b; }
.code-dots span:nth-child(3) { background: #22c55e; }
.code-lang-badge { font-size: 0.7rem; color: #64748b; font-weight: 600; flex: 1; font-family: 'JetBrains Mono', monospace; }
.copy-btn { font-size: 0.72rem; font-weight: 700; padding: 0.25rem 0.65rem; background: rgba(99,102,241,0.15); color: #a5b4fc; border: 1px solid rgba(99,102,241,0.3); border-radius: 6px; cursor: pointer; transition: all 0.2s; }
.copy-btn:hover { background: rgba(99,102,241,0.3); }
.copy-btn.copied { background: rgba(34,197,94,0.15); color: #86efac; border-color: rgba(34,197,94,0.3); }
.code-body { background: #0f172a; padding: 1.25rem 1.5rem; margin: 0; overflow-x: auto; font-size: 0.85rem; line-height: 1.7; }
.code-body code { color: #e2e8f0; font-family: 'JetBrains Mono', 'Fira Code', monospace; white-space: pre; }
</style>
