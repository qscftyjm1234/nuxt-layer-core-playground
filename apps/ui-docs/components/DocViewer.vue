<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  importPath: { type: String, default: '' },
  apiProps: { type: Array, default: () => [] },
  apiEmits: { type: Array, default: () => [] },
  apiSlots: { type: Array, default: () => [] },
  codeExample: { type: String, default: '' }
})

const tableColumns = [
  { title: '屬性 (Property)', dataIndex: 'name', width: '20%' },
  { title: '型別 (Type)', dataIndex: 'type', width: '25%' },
  { title: '預設 (Default)', dataIndex: 'default', width: '15%' },
  { title: '說明 (Description)', dataIndex: 'desc', width: '40%' }
]

const emitsColumns = [
  { title: '事件名稱 (Event)', dataIndex: 'name', width: '25%' },
  { title: '回傳參數 (Payload)', dataIndex: 'payload', width: '25%' },
  { title: '說明 (Description)', dataIndex: 'desc', width: '50%' }
]
</script>

<template>
  <div class="doc-viewer fade-in">
    <!-- Header: Title & Description -->
    <div class="doc-header">
      <h1 class="doc-title">{{ name }}</h1>
      <p class="doc-desc">{{ description }}</p>
      
      <div v-if="importPath" class="import-snippet">
        <code>{{ importPath }}</code>
        <!-- Copy Button placeholder -->
        <button class="copy-btn" title="Copy to clipboard">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
        </button>
      </div>
    </div>

    <!-- Preview / Live Demo -->
    <div class="doc-section preview-section">
      <h2 class="section-heading">預覽 Demo</h2>
      <div class="preview-card">
        <!-- 這裡會動態插入實際組件 -->
        <slot name="demo">
          <div class="empty-state">No demo representation available.</div>
        </slot>
      </div>
    </div>

    <!-- Source Code -->
    <div class="doc-section code-section glass-panel" v-if="codeExample">
      <div class="code-header">
        <span class="file-tab">Example.vue</span>
      </div>
      <div class="code-content">
        <pre><code>{{ codeExample }}</code></pre>
      </div>
    </div>

    <!-- API Tables -->
    <div class="doc-section api-section">
      <h2 class="section-heading">API 參考</h2>
      
      <div class="api-block" v-if="apiProps.length > 0">
        <h3>Props</h3>
        <!-- 我們先使用原生 HTML table 來模擬高質感的 IDataTable -->
        <!-- 如果專案中的 IDataTable 已經可以直接用，會建議改為 IDataTable -->
        <div class="table-responsive glass-panel">
          <table class="premium-table">
            <thead>
              <tr>
                <th v-for="col in tableColumns" :key="col.dataIndex" :style="{ width: col.width }">
                  {{ col.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in apiProps" :key="idx">
                <td class="prop-name">{{ row.name }}</td>
                <td class="prop-type"><code>{{ row.type }}</code></td>
                <td class="prop-default"><code>{{ row.default }}</code></td>
                <td class="prop-desc">{{ row.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="api-block" v-if="apiEmits.length > 0">
        <h3 class="mt-8">Events / Emits</h3>
        <div class="table-responsive glass-panel">
          <table class="premium-table">
            <thead>
              <tr>
                <th v-for="col in emitsColumns" :key="col.dataIndex" :style="{ width: col.width }">
                  {{ col.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in apiEmits" :key="idx">
                <td class="prop-name">{{ row.name }}</td>
                <td class="prop-type"><code>{{ row.payload }}</code></td>
                <td class="prop-desc">{{ row.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Page Animations */
.fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Header */
.doc-header {
  margin-bottom: 3rem;
}
.doc-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}
.doc-desc {
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.6;
  max-width: 800px;
  margin-bottom: 1.5rem;
}
.import-snippet {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  min-width: 300px;
}
.import-snippet code {
  color: #c026d3;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.875rem;
}
.copy-btn {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;
}
.copy-btn:hover {
  color: #3b82f6;
}

/* Sections */
.doc-section {
  margin-bottom: 4rem;
}
.section-heading {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f1f5f9;
}

/* Preview Card */
.preview-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 3rem 2rem;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
.empty-state {
  color: #94a3b8;
  font-style: italic;
}

/* Glass Panel (Code & Tables) */
.glass-panel {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.03);
}

/* Code Section */
.code-header {
  background: #f8fafc;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}
.file-tab {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
  font-family: monospace;
}
.code-content {
  padding: 1.5rem;
  background: #0f172a;
  overflow-x: auto;
}
.code-content pre {
  margin: 0;
}
.code-content code {
  color: #e2e8f0;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.7;
}

/* API Tables */
.api-block h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 1rem;
}
.mt-8 {
  margin-top: 2rem;
}
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
.premium-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.premium-table th {
  background: #f8fafc;
  padding: 1rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-bottom: 1px solid #e2e8f0;
}
.premium-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.95rem;
  color: #334155;
  vertical-align: top;
}
.premium-table tr:last-child td {
  border-bottom: none;
}
.prop-name {
  font-weight: 600;
  color: #0f172a !important;
}
.prop-type code {
  color: #2563eb;
  background: #eff6ff;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.85rem;
}
.prop-default code {
  color: #d97706;
  background: #fef3c7;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.85rem;
}
.prop-desc {
  line-height: 1.5;
}
</style>
