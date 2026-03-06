<script setup lang="ts">
</script>

<template>
  <div class="arch-page fade-in">
    <div class="doc-header">
      <h1 class="doc-title">系統架構 (Architecture)</h1>
      <p class="doc-desc">SoftLeader Core 如何透過 Nuxt 3 Layer 技術，為企業提供穩固、可擴展的前端基礎設施。</p>
    </div>

    <div class="glass-panel p-8 mt-8">
      <h3 class="text-xl font-bold text-slate-800 mb-4">SoftLeader Nuxt Core Layer</h3>
      <p class="text-slate-600 mb-6 leading-relaxed">
        本架構採用 Nuxt 3 原生的 <code>extends</code> 機制。我們將最底層的 UI 組件、Plugins、API 攔截器、以及通用的 Composables 全數封裝在 <code>packages/nuxt-core</code> 中。<br/><br/>
        各個業務端專案 (如 Playground, UI-Docs, 或是未來的 SaaS 客戶端) 只需要在 <code>nuxt.config.ts</code> 繼承此 Layer，即可獲得所有基礎設施，同時保持自身的乾淨與靈活。
      </p>

      <div class="arch-diagram mt-8">
        <div class="diagram-box layer-core">
          <h4>🗄️ packages/nuxt-core (Core Layer)</h4>
          <ul>
            <li>組件 (<code>/components</code>): Interface UI, Business Widgets</li>
            <li>功能 (<code>/composables</code>): useApi, useAuth, usePagination</li>
            <li>配置 (<code>/core/config</code>): 全域攔截器, Tailwind, I18n</li>
          </ul>
        </div>
        <div class="arrow">↓ (extends)</div>
        <div class="diagram-box layer-app">
          <h4>🚀 apps/ui-docs (您的應用)</h4>
          <ul>
            <li>業務邏輯 (<code>/pages</code>)</li>
            <li>狀態管理 (<code>/stores</code>)</li>
            <li>自訂樣式覆寫</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.doc-header { margin-bottom: 2rem; }
.doc-title { font-size: 2.5rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; }
.doc-desc { font-size: 1.125rem; color: #64748b; max-width: 800px; }
.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
.p-8 { padding: 2rem; }
.mt-8 { margin-top: 2rem; }
.text-xl { font-size: 1.25rem; }
.font-bold { font-weight: 700; }
.text-slate-800 { color: #1e293b; }
.text-slate-600 { color: #475569; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.leading-relaxed { line-height: 1.8; }

.arch-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
}
.diagram-box {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}
.layer-core { border-color: #3b82f6; border-top-width: 6px; }
.layer-app { border-color: #10b981; border-top-width: 6px; }
.diagram-box h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #0f172a;
}
.diagram-box ul {
  margin: 0;
  padding-left: 1.5rem;
  color: #64748b;
  line-height: 1.6;
}
.arrow {
  color: #94a3b8;
  font-weight: bold;
  font-size: 1.25rem;
}
</style>
