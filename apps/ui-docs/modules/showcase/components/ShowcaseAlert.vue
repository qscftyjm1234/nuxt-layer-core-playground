<script setup lang="ts">
/**
 * ShowcaseAlert
 * 業務邏輯層元件 (Business Layer)
 * 封裝 IAlert 用於特定展示用途
 */

interface Props {
  title?: string
  type?: 'info' | 'success' | 'warning' | 'error'
}

withDefaults(defineProps<Props>(), {
  title: '',
  type: 'info'
})
</script>

<template>
  <div
    class="showcase-alert"
    :class="type"
  >
    <div class="alert-icon">
      <template v-if="type === 'info'">ℹ️</template>
      <template v-else-if="type === 'success'">✅</template>
      <template v-else-if="type === 'warning'">⚠️</template>
      <template v-else-if="type === 'error'">❌</template>
    </div>
    <div class="alert-content">
      <h4
        v-if="title"
        class="alert-title"
      >
        {{ title }}
      </h4>
      <div class="alert-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.showcase-alert {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 1.5rem;
  backdrop-filter: blur(8px);
}

.alert-icon {
  font-size: 1.5rem;
  line-height: 1;
  padding-top: 0.25rem;
}

.alert-content {
  flex: 1;
}

.alert-title {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #f1f5f9;
}

.alert-body {
  color: #cad5e2; /* Slate-300 */
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Variants */
.showcase-alert.info {
  border-left: 4px solid #38bdf8;
  background: linear-gradient(90deg, rgba(56, 189, 248, 0.05) 0%, rgba(30, 41, 59, 0.4) 100%);
}

.showcase-alert.success {
  border-left: 4px solid #4ade80;
  background: linear-gradient(90deg, rgba(74, 222, 128, 0.05) 0%, rgba(30, 41, 59, 0.4) 100%);
}

.showcase-alert.warning {
  border-left: 4px solid #fbbf24;
  background: linear-gradient(90deg, rgba(251, 191, 36, 0.05) 0%, rgba(30, 41, 59, 0.4) 100%);
}

.showcase-alert.error {
  border-left: 4px solid #f87171;
  background: linear-gradient(90deg, rgba(248, 113, 113, 0.05) 0%, rgba(30, 41, 59, 0.4) 100%);
}

.alert-body :deep(ul) {
  margin: 0;
  padding-left: 1.25rem;
}

.alert-body :deep(li) {
  margin-bottom: 0.25rem;
}
</style>
