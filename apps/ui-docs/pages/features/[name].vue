<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { getFeatureDoc } from '~/utils/doc-data'

const route = useRoute()
const featureName = computed(() => route.params.name as string)

const docData = computed(() => {
  return getFeatureDoc(featureName.value) || {
    name: featureName.value,
    description: `核心組合式函數 (Composable)`,
    importPath: `import { ${featureName.value} } from '#imports'`,
    summary: '這是一個自動引入的核心功能。',
    methods: [],
    examples: []
  }
})
</script>

<template>
  <div class="feature-page fade-in">
    <div class="doc-header">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
          <IIcon icon="mdi-xml" size="24" />
        </div>
        <div>
          <h1 class="doc-title">{{ docData.name }}</h1>
          <p class="doc-desc">{{ docData.description }}</p>
        </div>
      </div>
      
      <div class="import-snippet mt-6">
        <code class="text-pink-600">{{ docData.importPath }}</code>
      </div>
    </div>

    <div class="doc-section mt-10">
      <h2 class="section-title">功能總覽</h2>
      <p class="text-slate-600 leading-relaxed">{{ docData.summary }}</p>
    </div>

    <!-- API Methods -->
    <div class="doc-section mt-12" v-if="docData.methods && docData.methods.length > 0">
      <h2 class="section-title">API 參考 (Methods)</h2>
      <div class="overflow-x-auto border border-gray-100 rounded-xl bg-white shadow-sm">
        <table class="api-table w-full text-left">
          <thead>
            <tr>
              <th class="px-6 py-4 font-bold text-gray-900 bg-gray-50/50">方法名稱</th>
              <th class="px-6 py-4 font-bold text-gray-900 bg-gray-50/50">參數</th>
              <th class="px-6 py-4 font-bold text-gray-900 bg-gray-50/50">回傳值</th>
              <th class="px-6 py-4 font-bold text-gray-900 bg-gray-50/50">描述</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="method in docData.methods" :key="method.name">
              <td class="px-6 py-4 font-mono text-blue-600 font-bold text-sm">{{ method.name }}</td>
              <td class="px-6 py-4 font-mono text-gray-500 text-xs">{{ method.params }}</td>
              <td class="px-6 py-4 font-mono text-purple-600 text-xs">{{ method.returnType }}</td>
              <td class="px-6 py-4 text-gray-600 text-sm">{{ method.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Examples -->
    <div class="doc-section mt-12" v-if="docData.examples && docData.examples.length > 0">
      <h2 class="section-title">使用範例</h2>
      <div class="space-y-6">
        <div v-for="ex in docData.examples" :key="ex.title" class="example-card">
          <h3 class="example-title">{{ ex.title }}</h3>
          <div class="code-block-wrapper">
            <pre class="bg-slate-900 text-slate-100 p-6 rounded-xl overflow-x-auto text-[13px] font-mono leading-relaxed"><code>{{ ex.code }}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!docData.methods.length && !docData.examples.length" class="glass-panel p-12 mt-8 text-center text-slate-500 border-dashed border-2">
      <div class="icon-pulse mb-4">🛠️</div>
      <h3 class="text-xl font-bold text-slate-700 mb-2">文件補強中</h3>
      <p>開發團隊正在為 {{ featureName }} 撰寫更詳細的使用教學。</p>
    </div>
  </div>
</template>

<style scoped>
.fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.doc-header { margin-bottom: 2rem; }
.doc-title { font-size: 2.25rem; font-weight: 900; color: #0f172a; letter-spacing: -0.025em; }
.doc-desc { font-size: 1.125rem; color: #64748b; font-weight: 500; }

.section-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title::before {
  content: '';
  width: 4px;
  height: 1.25rem;
  background: #3b82f6;
  border-radius: 2px;
}

.import-snippet {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  display: inline-block;
}
.import-snippet code { font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; font-weight: 600; }

.api-table th { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; }
.example-card { background: white; border: 1px solid #f1f5f9; border-radius: 16px; padding: 1.5rem; }
.example-title { font-size: 0.95rem; font-weight: 700; color: #334155; margin-bottom: 1rem; }

.glass-panel {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid #e2e8f0;
  border-radius: 16px;
}
.icon-pulse { font-size: 3rem; animation: pulse 2s infinite; }
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
