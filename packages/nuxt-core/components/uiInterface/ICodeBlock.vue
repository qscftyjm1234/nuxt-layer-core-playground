<script setup lang="ts">
import { ref } from 'vue'
import IIcon from './IIcon.vue'

interface Props {
  code: string
  language?: string
  label?: string
  filename?: string
  showWindowControls?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  language: 'text',
  label: '',
  filename: '',
  showWindowControls: true
})

const copied = ref(false)

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Copy failed:', err)
  }
}
</script>

<template>
  <div class="i-code-block">
    <!-- Window Header -->
    <div class="code-header">
      <div class="flex items-center gap-4">
        <div
          v-if="showWindowControls"
          class="window-controls"
        >
          <span class="control red"></span>
          <span class="control yellow"></span>
          <span class="control green"></span>
        </div>
        <div class="code-label font-mono text-xs tracking-wide">
          <span
            v-if="filename"
            class="text-slate-200"
          >
            {{ filename }}
          </span>
          <span v-else>{{ label || language }}</span>
        </div>
      </div>

      <div class="header-actions">
        <button
          class="copy-btn"
          :class="{ copied }"
          @click="copyCode"
        >
          <IIcon
            :icon="copied ? 'mdi-check' : 'mdi-content-copy'"
            :size="14"
          />
          <span>{{ copied ? 'Copied' : 'Copy' }}</span>
        </button>
      </div>
    </div>

    <!-- Code Content -->
    <div class="code-content">
      <pre><code><slot>{{ code }}</slot></code></pre>
    </div>
  </div>
</template>

<style scoped>
.i-code-block {
  background: #1e293b; /* Dark Slate 800 */
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Header */
.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: rgba(15, 23, 42, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.window-controls {
  display: flex;
  gap: 0.5rem;
}

.control {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.control.red {
  background-color: #ff5f56;
}
.control.yellow {
  background-color: #ffbd2e;
}
.control.green {
  background-color: #27c93f;
}

.code-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Copy Button */
.copy-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  border-color: rgba(255, 255, 255, 0.2);
}

.copy-btn.copied {
  color: #4ade80; /* Green 400 */
  border-color: rgba(74, 222, 128, 0.2);
  background: rgba(74, 222, 128, 0.1);
}

/* Code Content */
.code-content {
  padding: 1rem;
  overflow-x: auto;
}

pre {
  margin: 0;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #e2e8f0;
}

code {
  background: transparent;
  padding: 0;
}
</style>
