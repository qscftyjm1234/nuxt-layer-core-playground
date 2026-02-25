<template>
  <div class="component-page-wrapper">
    <!-- Back Button -->
    <div class="fixed top-6 left-6 z-50">
      <NuxtLink to="/showcase/component-showcase" class="back-btn group">
        <IIcon icon="mdi-arrow-left" size="20" />
        <span class="back-text">返回總覽</span>
      </NuxtLink>
    </div>

    <!-- Floating Background Orbs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-indigo-300/15 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-violet-300/15 rounded-full blur-3xl animate-float-slow-delayed"></div>
      <div class="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-3xl animate-pulse-gentle"></div>
    </div>

    <div class="component-doc relative z-10">
      <DocViewer
        :title="componentName"
        :description="componentDescription"
        :code="generatedCode"
      >
        <template #demo>
          <div class="demo-container">
            <!-- Preview Area -->
            <div class="demo-viewport">
              <component
                :is="componentName"
                v-bind="playgroundProps"
              >
                <template v-if="playgroundSlots.text" #default>
                  {{ playgroundSlots.text }}
                </template>
              </component>
            </div>

            <!-- Controls Area -->
            <div v-if="playgroundConfig.length" class="demo-controls">
              <h3 class="controls-title">Interactive Playground</h3>
              <div class="controls-grid">
                <div
                  v-for="config in playgroundConfig"
                  :key="config.name"
                  class="control-item"
                >
                  <label class="control-label">{{ config.label }}</label>
                  
                  <!-- Select Control -->
                  <select
                    v-if="config.type === 'select'"
                    v-model="playgroundState[config.name]"
                    class="control-input control-select"
                  >
                    <option v-for="opt in config.options" :key="opt" :value="opt">
                      {{ opt || 'Default' }}
                    </option>
                  </select>
                  
                  <!-- Boolean Switch -->
                  <label v-else-if="config.type === 'boolean'" class="control-switch">
                    <input
                      type="checkbox"
                      v-model="playgroundState[config.name]"
                    />
                    <span class="slider"></span>
                  </label>
                  
                  <!-- Text/Input Control -->
                  <input
                    v-else
                    type="text"
                    v-model="playgroundState[config.name]"
                    class="control-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #api>
          <div class="api-tables">
            <section v-if="componentProps.length" class="api-section">
              <h3 class="section-subtitle">屬性 (Props)</h3>
              <div class="table-container">
                <table class="api-table">
                  <thead>
                    <tr>
                      <th>屬性</th>
                      <th>說明</th>
                      <th>類型</th>
                      <th>預設值</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="prop in componentProps" :key="prop.name">
                      <td class="prop-name">{{ prop.name }}</td>
                      <td>{{ prop.description }}</td>
                      <td class="prop-type"><code>{{ prop.type }}</code></td>
                      <td class="prop-default">{{ prop.default }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </template>
      </DocViewer>

      <!-- Static Examples Section -->
      <div v-if="exampleCode" class="static-examples mt-12">
        <h3 class="section-subtitle">更多範例</h3>
        <div class="example-card p-6 bg-slate-50/80 rounded-2xl shadow-sm backdrop-blur-sm">
          <ClientOnly>
            <div v-html="renderStaticExample(componentName)" class="static-preview"></div>
          </ClientOnly>
          <div class="doc-card mt-6">
            <div class="doc-code-toolbar">
              <div class="window-controls">
                <span class="window-dot red"></span>
                <span class="window-dot yellow"></span>
                <span class="window-dot green"></span>
              </div>
              <button class="copy-btn" @click="copyStaticCode">
                <IIcon icon="mdi-content-copy" size="14" class="mr-1 inline-block" />
                <span v-if="!staticCopied">複製</span>
                <span v-else>已複製</span>
              </button>
            </div>
            <pre class="doc-code"><code>{{ exampleCode }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { getComponentExample, getComponentProps, getPlaygroundConfig } from '~/utils/doc-data'

const route = useRoute()
const componentName = computed(() => (route.params.name as string) || '')

const componentDescription = computed(() => {
  const descriptions: Record<string, string> = {
    IButton: '按鈕元件是使用者介面中最基礎的互動元素，用於提交表單、確認操作或導航。',
    IAlert: '警告元件用於向使用者顯示重要訊息或反饋，支援多種狀態提示。',
    ICard: '卡片元件是一個通用的容器，用於將相關資訊分組展示，支援標題、副標題與頁尾。',
    ITextField: '文字輸入框元件，支援多種狀態與裝飾。',
    ICheckbox: '核取方塊元件，支援單選與多選模式。',
    SmartTable: '智慧表格是一個高級業務組件，內建了搜尋、分頁、排序與自定義單元格渲染的功能。',
    SmartComplexWidget: '複雜智慧元件展示了如何將多個基礎組件與業務邏輯封裝在一起。'
  }
  return descriptions[componentName.value] || `這是 ${componentName.value} 組件的詳細技術文件與預覽。`
})

// Static Data
const exampleCode = computed(() => getComponentExample(componentName.value))
const componentProps = computed(() => getComponentProps(componentName.value))

// Playground Logic
const playgroundConfig = computed(() => getPlaygroundConfig(componentName.value))
const playgroundState = ref<Record<string, any>>({})

// Initialize state based on config
watch(playgroundConfig, (config) => {
  const initialState: Record<string, any> = {}
  config.forEach(item => {
    initialState[item.name] = item.default
  })
  playgroundState.value = initialState
}, { immediate: true })

const playgroundProps = computed(() => {
  const props: Record<string, any> = {}
  if (!playgroundConfig.value) return {}
  
  playgroundConfig.value.forEach(config => {
    if (config.type !== 'slot') {
      const value = playgroundState.value[config.name]
      if (value !== '' && value !== false && value !== undefined) {
        props[config.name] = value
      }
    }
  })
  return props
})

const playgroundSlots = computed(() => {
  const slots: Record<string, any> = {}
  if (!playgroundConfig.value) return {}

  playgroundConfig.value.forEach(config => {
    if (config.type === 'slot') {
      slots[config.name] = playgroundState.value[config.name]
    }
  })
  return slots
})

const generatedCode = computed(() => {
  const props = playgroundProps.value
  const slots = playgroundSlots.value
  const propStrings = Object.entries(props).map(([key, value]) => {
    if (value === true) return key
    if (typeof value === 'string') return `${key}="${value}"`
    return `:${key}="${value}"`
  })

  const openTag = `<${componentName.value}${propStrings.length ? ' ' + propStrings.join(' ') : ''}>`
  
  if (slots.text) {
    return `${openTag}${slots.text}</${componentName.value}>`
  }
  
  return `${openTag.replace(/>$/, ' />')}`
})

const renderStaticExample = (name: string) => {
  return `<div class="text-sm text-slate-500 italic">Static examples are shown in code block below. Use the Playground above for interaction.</div>`
}

const staticCopied = ref(false)
const copyStaticCode = () => {
  if (!exampleCode.value) return
  navigator.clipboard.writeText(exampleCode.value)
  staticCopied.value = true
  setTimeout(() => {
    staticCopied.value = false
  }, 2000)
}
</script>

<style scoped>
.component-page-wrapper {
  position: relative;
  min-height: 100vh;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 99px;
  color: #64748b;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.back-btn:hover {
  background: white;
  color: #4f46e5;
  transform: translateX(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);

}

.back-text {
  opacity: 0;
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.back-btn:hover .back-text {
  opacity: 1;
  max-width: 150px;
  margin-left: 0.25rem;
}

.component-doc {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
.animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
.animate-float-slow-delayed { animation: float-slow 25s ease-in-out infinite; animation-delay: -5s; }
.animate-pulse-gentle { animation: pulse-gentle 8s ease-in-out infinite; }
@keyframes pulse-gentle {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(1.05); }
}

.section-subtitle {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 2.5rem; /* Increased spacing */
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-subtitle::before {
  content: '';
  width: 4px;
  height: 1.25rem;
  background-color: #3b82f6;
  border-radius: 99px;
}

.table-container {
  /* Borderless */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  background: white;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.875rem;
}

.api-table th {
  background-color: #f8fafc;
  padding: 1rem 1.5rem;
  font-weight: 600;
  color: #64748b;
  /* Removed border */
}

.api-table td {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f8fafc; /* Very subtle separator */
  color: #334155;
}

.prop-name {
  color: #2563eb;
  font-weight: 600;
  font-family: 'Fira Code', monospace;
}

.prop-type code {
  background-color: #f1f5f9;
  color: #e11d48;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}

.prop-default {
  color: #64748b;
}

/* Playground Styles */
.demo-container {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02);
  /* Removed border */
}

.demo-viewport {
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
  background-size: 20px 20px;
  min-height: 200px;
}

.demo-controls {
  padding: 1.5rem;
  background-color: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(8px);
}

.controls-title {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.control-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #475569;
}

.control-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid transparent; /* Transparent border, show only on focus/hover */
  background: white;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #334155;
  outline: none;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.control-input:hover {
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.control-input:focus {
  background: white;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

.control-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.control-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.control-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

input:checked + .slider {
  background-color: #4f46e5;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

input:focus + .slider {
  box-shadow: 0 0 1px #4f46e5;
}

.static-examples {
  margin-top: 3rem;
  padding-top: 3rem;
}

/* Code Block Styles (Mac-style Dark Theme) */
.doc-card {
  border: 1px solid #334155;
  border-radius: 12px;
  overflow: hidden;
  background-color: #0f172a; /* Slate 900 */
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

.doc-code-toolbar {
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e293b; /* Slate 800 */
  border-bottom: 1px solid #334155;
}

.window-controls {
  display: flex;
  gap: 0.5rem;
}

.window-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.red { background-color: #ef4444; }
.yellow { background-color: #f59e0b; }
.green { background-color: #22c55e; }

.copy-btn {
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}

.copy-btn:hover {
  background: rgba(255,255,255,0.1);
  color: white;
  border-color: rgba(255,255,255,0.2);
}

.doc-code {
  margin: 0;
  padding: 1.5rem;
  background-color: #0f172a; /* Slate 900 */
  color: #e2e8f0; /* Slate 200 */
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.7;
  overflow-x: auto;
}
</style>
