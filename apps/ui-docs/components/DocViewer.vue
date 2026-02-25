<template>
  <div class="doc-viewer">
    <header class="doc-viewer-header">
      <h1 class="doc-title">{{ title }}</h1>
      <p class="doc-description">{{ description }}</p>
    </header>

    <div class="doc-section">
      <h2 class="doc-section-title">程式碼範例</h2>
      <div class="demo-card">
        <div class="doc-demo">
          <slot name="demo" />
        </div>
      </div>

      <div class="doc-card">
        <div class="doc-code-toolbar">
          <div class="window-controls">
            <span class="window-dot red"></span>
            <span class="window-dot yellow"></span>
            <span class="window-dot green"></span>
          </div>
          <button class="copy-btn" @click="copyCode">
            <IIcon icon="mdi-content-copy" size="14" class="mr-1 inline-block" />
            <span v-if="!copied">複製</span>
            <span v-else>已複製</span>
          </button>
        </div>
        <pre class="doc-code"><code>{{ code }}</code></pre>
      </div>
    </div>

    <div class="doc-section">
      <h2 class="doc-section-title">屬性與事件 (API)</h2>
      <slot name="api" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  title: string
  description: string
  code: string
}>()

const copied = ref(false)

const copyCode = () => {
  navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<style scoped>
.doc-viewer {
  max-width: 900px;
}

.doc-viewer-header {
  margin-bottom: 3rem;
}

.doc-title {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin-bottom: 1rem;
  color: var(--color-gray-900, #0f172a);
}

.doc-description {
  font-size: 1.125rem;
  color: var(--color-gray-500, #64748b);
  line-height: 1.6;
}

.doc-section {
  margin-bottom: 4rem;
}

.doc-section-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 2.5rem; /* Increased spacing */
  color: var(--color-gray-800, #1e293b);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.doc-section-title::before {
  content: '';
  display: block;
  width: 4px;
  height: 20px;
  background: linear-gradient(to bottom, #4F46E5, #7C3AED);
  border-radius: 4px;
}

/* Demo Container (Light Theme) */
.demo-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); /* Softer shadow */
}

.doc-demo {
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
}

/* Code Block Container (Dark Mac-style Theme) */
.doc-card {
  border: 1px solid #334155;
  border-radius: 12px;
  overflow: hidden;
  background-color: #0f172a; /* Slate 900 */
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5); /* Deep shadow */
  margin-top: 1.5rem; /* Space between Demo and Code */
}

/* Mac-style Toolbar */
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
}

.copy-btn:hover {
  background: rgba(255,255,255,0.1);
  color: white;
  border-color: rgba(255,255,255,0.2);
}

/* Code Content */
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
