<script setup lang="ts">
</script>

<template>
  <div class="tokens-page fade-in">
    <div class="doc-header">
      <h1 class="doc-title">Design Tokens (設計令牌)</h1>
      <p class="doc-desc">SoftLeader 企業級 SaaS 產品的基礎視覺規範，確保所有應用擁有一致且專業的高品質體驗。</p>
    </div>

    <div class="glass-panel p-8 mt-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div class="token-group">
          <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="color-dot bg-blue-600"></span>
            Brand Colors (品牌色)
          </h3>
          <p class="text-slate-500 mb-6">SoftLeader 標誌性的科技藍，傳達專業、穩健與創新的企業形象。</p>
          <div class="color-swatches">
            <div class="swatch-item">
              <div class="color-box" style="background-color: #e0f2fe;"></div>
              <div class="color-info"><span>Primary 50</span><code>#e0f2fe</code></div>
            </div>
            <div class="swatch-item">
              <div class="color-box" style="background-color: #3b82f6;"></div>
              <div class="color-info"><span>Primary 500</span><code>#3b82f6</code></div>
            </div>
            <div class="swatch-item">
              <div class="color-box" style="background-color: #2563eb;"></div>
              <div class="color-info"><span>Primary 600 (Main)</span><code>#2563eb</code></div>
            </div>
            <div class="swatch-item">
              <div class="color-box" style="background-color: #1d4ed8;"></div>
              <div class="color-info"><span>Primary 700</span><code>#1d4ed8</code></div>
            </div>
          </div>
        </div>

        <div class="token-group">
          <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="color-dot bg-slate-800"></span>
            Neutral Colors (中性色)
          </h3>
          <p class="text-slate-500 mb-6">用於文本、背景與邊框，提供極佳的對比度與層次感。</p>
          <div class="color-swatches">
            <div class="swatch-item">
              <div class="color-box" style="background-color: #f8fafc; border: 1px solid #e2e8f0;"></div>
              <div class="color-info"><span>Slate 50 (Bg)</span><code>#f8fafc</code></div>
            </div>
            <div class="swatch-item">
              <div class="color-box" style="background-color: #cbd5e1;"></div>
              <div class="color-info"><span>Slate 300 (Border)</span><code>#cbd5e1</code></div>
            </div>
            <div class="swatch-item">
              <div class="color-box" style="background-color: #64748b;"></div>
              <div class="color-info"><span>Slate 500 (Text Muted)</span><code>#64748b</code></div>
            </div>
            <div class="swatch-item">
              <div class="color-box" style="background-color: #0f172a;"></div>
              <div class="color-info"><span>Slate 900 (Text Main)</span><code>#0f172a</code></div>
            </div>
          </div>
        </div>

      </div>
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
.doc-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.5rem;
}
.doc-desc {
  font-size: 1.125rem;
  color: #64748b;
  max-width: 800px;
}
.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
.p-8 { padding: 2rem; }
.mt-8 { margin-top: 2rem; }
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
.gap-8 { gap: 2rem; }
.gap-2 { gap: 0.5rem; }
.flex { display: flex; }
.items-center { align-items: center; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.text-xl { font-size: 1.25rem; }
.font-bold { font-weight: 700; }
.text-slate-800 { color: #1e293b; }
.text-slate-500 { color: #64748b; }
.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}
.bg-blue-600 { background-color: #2563eb; }
.bg-slate-800 { background-color: #1e293b; }
.color-swatches {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.swatch-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
}
.color-box {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  flex-shrink: 0;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
}
.color-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.color-info span {
  font-weight: 600;
  color: #334155;
  font-size: 0.95rem;
}
.color-info code {
  color: #64748b;
  font-size: 0.85rem;
  font-family: monospace;
}
</style>
