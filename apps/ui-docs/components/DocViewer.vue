<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  importPath: { type: String, default: '' },
  summary: { type: String, default: '' },
  apiProps: { type: Array, default: () => [] },
  apiEmits: { type: Array, default: () => [] },
  apiMethods: { type: Array, default: () => [] },
  apiSlots: { type: Array, default: () => [] },
  codeExample: { type: String, default: '' }
})
</script>

<template>
  <div class="doc-container fade-in">
    <!-- 背景裝飾 -->
    <div class="bg-decoration-1"></div>
    <div class="bg-decoration-2"></div>

    <div class="content-wrapper">
      <!-- 🚀 標題區域 -->
      <header class="page-header">
        <div class="badge-wrapper">
          <span class="version-badge">v1.1.5</span>
          <span class="category-badge">元件文檔</span>
        </div>
        <h1 class="component-title">{{ name }}</h1>
        <p class="component-description">{{ description }}</p>
        
        <div class="import-card" v-if="importPath">
          <div class="import-label">安裝與引入</div>
          <div class="import-code-wrapper">
            <code>{{ importPath }}</code>
            <button class="copy-action">
              <IIcon icon="mdi-content-copy" size="18" />
            </button>
          </div>
        </div>
      </header>

      <!-- 📘 組件簡述 (Revised Section: Minimalist) -->
      <section class="section" v-if="summary">
        <div class="section-title-box">
          <h2 class="section-title">組件簡述</h2>
        </div>
        <div class="summary-box">
          {{ summary }}
        </div>
      </section>

      <!-- 🎨 預覽區域 -->
      <section class="section">
        <div class="section-title-box">
          <h2 class="section-title">即時預覽</h2>
        </div>
        <div class="preview-stage glass-effect">
          <slot name="demo">
             <div class="preview-placeholder">載入中...</div>
          </slot>
        </div>
      </section>

      <!-- ⚙️ API 參考 -->
      <section class="section">
        <div class="section-title-box">
          <h2 class="section-title">API 參考文件</h2>
        </div>

        <div class="api-panels">
          <!-- 屬性 Props -->
          <div class="api-panel" v-if="apiProps.length > 0">
            <h3 class="panel-heading"><IIcon icon="mdi-tune" class="mr-2" /> 屬性 (Properties)</h3>
            <div class="table-frame">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>屬性名稱</th>
                    <th>型別</th>
                    <th>預設值</th>
                    <th>說明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="prop in apiProps" :key="prop.name">
                    <td class="cell-name">{{ prop.name }}</td>
                    <td class="cell-type"><span class="type-pill">{{ prop.type }}</span></td>
                    <td class="cell-default"><code>{{ prop.default || '-' }}</code></td>
                    <td class="cell-desc">{{ prop.desc || '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 方法 Methods -->
          <div class="api-panel" v-if="apiMethods && apiMethods.length > 0">
            <h3 class="panel-heading"><IIcon icon="mdi-function-variant" class="mr-2" /> 公開方法 (Methods)</h3>
            <div class="table-frame">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>方法名稱</th>
                    <th>參數</th>
                    <th>說明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="method in apiMethods" :key="method.name">
                    <td class="cell-name method-name">{{ method.name }}()</td>
                    <td class="cell-params"><code>{{ method.params }}</code></td>
                    <td class="cell-desc">{{ method.desc }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 事件 Emits -->
            <div class="api-panel" v-if="apiEmits.length > 0">
              <h3 class="panel-heading"><IIcon icon="mdi-lightning-bolt" class="mr-2" /> 事件 (Events)</h3>
              <div class="table-frame">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>事件名稱</th>
                      <th>說明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="emit in apiEmits" :key="emit.name">
                      <td class="cell-name">{{ emit.name }}</td>
                      <td class="cell-desc">{{ emit.desc || '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 插槽 Slots -->
            <div class="api-panel" v-if="apiSlots.length > 0">
              <h3 class="panel-heading"><IIcon icon="mdi-view-quilt" class="mr-2" /> 插槽 (Slots)</h3>
              <div class="table-frame">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>插槽名稱</th>
                      <th>說明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="slot in apiSlots" :key="slot.name">
                      <td class="cell-name">#{{ slot.name }}</td>
                      <td class="cell-desc">{{ slot.desc }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.doc-container {
  position: relative;
  min-height: 100vh;
  background-color: #f8fafc;
  color: #334155;
  font-family: 'Inter', 'Noto Sans TC', sans-serif;
  overflow-x: hidden;
  padding: 1.5rem 1.5rem;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1100px;
  margin: 0 auto;
}

/* Updated Summary Style */
.summary-box {
  font-size: 1rem;
  color: #475569;
  line-height: 1.6;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 1px solid #eef2f6;
  box-shadow: 0 2px 4px rgba(0,0,0,0.01);
}

/* Layout */
.section { margin-bottom: 2.5rem; }
.section-title-box { margin-bottom: 0.75rem; }
.section-title { font-size: 1.25rem; font-weight: 800; color: #1e293b; }

.page-header { margin-bottom: 2rem; }
.badge-wrapper { display: flex; gap: 0.6rem; margin-bottom: 0.75rem; }
.version-badge { background: #eff6ff; color: #2563eb; padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.7rem; font-weight: 700; }
.category-badge { background: #f1f5f9; color: #64748b; padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.7rem; font-weight: 600; }
.component-title { font-size: 3rem; font-weight: 800; letter-spacing: -0.03em; color: #0f172a; line-height: 1; margin-bottom: 0.75rem; }
.component-description { font-size: 1.1rem; color: #64748b; margin-bottom: 1.5rem; }
.import-card { background: white; border-radius: 8px; padding: 0.75rem 1.25rem; border: 1px solid #e2e8f0; max-width: 500px; }
.import-label { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 0.25rem; }
.import-code-wrapper { display: flex; justify-content: space-between; align-items: center; }
.import-code-wrapper code { color: #6366f1; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; }
.copy-action { color: #cbd5e1; cursor: pointer; }

.preview-stage { min-height: 200px; border-radius: 16px; display: flex; justify-content: center; align-items: center; padding: 1.5rem; background: white; border: 1px solid #eef2f6; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
.glass-effect { background: rgba(255, 255, 255, 0.7); }

.api-panels { display: flex; flex-direction: column; gap: 2rem; }
.api-panel { background: white; border-radius: 12px; padding: 1.5rem; border: 1px solid #eef2f6; }
.panel-heading { font-size: 1rem; font-weight: 700; margin-bottom: 1rem; display: flex; align-items: center; color: #475569; }
.table-frame { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { text-align: left; padding: 0.75rem; font-size: 0.7rem; text-transform: uppercase; color: #94a3b8; border-bottom: 1px solid #f1f5f9; }
.data-table td { padding: 1rem 0.75rem; font-size: 0.85rem; border-bottom: 1px solid #f8fafc; }
.cell-name { font-weight: 700; color: #1e293b; }
.method-name { color: #6366f1; }
.type-pill { background: #f1f5f9; color: #475569; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.75rem; }
.cell-default code { color: #ef4444; background: #fff1f2; padding: 0.1rem 0.3rem; border-radius: 4px; }
.cell-desc { color: #64748b; }

.bg-decoration-1 { position: absolute; top: -5%; right: -5%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, transparent 70%); filter: blur(40px); }
.bg-decoration-2 { position: absolute; bottom: 0; left: -5%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(14, 165, 233, 0.02) 0%, transparent 70%); filter: blur(50px); }
.fade-in { animation: fadeIn 0.5s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
