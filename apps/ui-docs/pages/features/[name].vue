<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const featureName = computed(() => route.params.name as string)
</script>

<template>
  <div class="feature-page fade-in">
    <div class="doc-header">
      <h1 class="doc-title">{{ featureName }}</h1>
      <p class="doc-desc">SoftLeader Core 核心組合式函數 (Composable)</p>
      
      <div class="import-snippet mt-4">
        <code>import { {{ featureName }} } from "#imports"</code>
      </div>
    </div>

    <div class="glass-panel p-8 mt-8 text-center text-slate-500">
      <div class="icon-pulse mb-4">🛠️</div>
      <h3 class="text-xl font-bold text-slate-700 mb-2">文件建置中</h3>
      <p>開發團隊正在為 {{ featureName }} 撰寫詳細的使用教學與 API 參考。</p>
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

.doc-header {
  margin-bottom: 3rem;
}
.doc-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.5rem;
}
.doc-desc {
  font-size: 1.125rem;
  color: #64748b;
}
.import-snippet {
  display: inline-flex;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.75rem 1rem;
}
.import-snippet code {
  color: #c026d3;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
}
.glass-panel {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}
.p-8 { padding: 2rem; }
.mt-8 { margin-top: 2rem; }
.mt-4 { margin-top: 1rem; }
.text-center { text-align: center; }
.text-slate-500 { color: #64748b; }
.text-slate-700 { color: #334155; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.text-xl { font-size: 1.25rem; }
.font-bold { font-weight: 700; }
.icon-pulse {
  font-size: 3rem;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
