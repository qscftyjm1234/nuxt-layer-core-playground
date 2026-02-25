<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  noPadding?: boolean
}

defineProps<Props>()
</script>

<template>
  <ICard
    class="showcase-card-dark"
    :class="{ 'no-padding': noPadding }"
  >
    <div
      v-if="title || $slots.header"
      class="card-header"
    >
      <div
        v-if="title"
        class="header-content"
      >
        <h3 class="card-title">{{ title }}</h3>
        <p
          v-if="description"
          class="card-desc"
        >
          {{ description }}
        </p>
      </div>
      <div
        v-if="$slots.header"
        class="header-slot"
      >
        <slot name="header" />
      </div>
    </div>

    <div class="card-body">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="card-footer"
    >
      <slot name="footer" />
    </div>
  </ICard>
</template>

<style scoped>
/* Premium Glass Box */
.showcase-card-dark {
  background: rgba(15, 23, 42, 0.6) !important; /* Deep Slate Background */
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  border-radius: 24px !important; /* Modern large radius */
  backdrop-filter: blur(16px);
  color: #e2e8f0;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.02),
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 24px 32px -12px rgba(0, 0, 0, 0.2); /* Deep shadow */
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: visible !important; /* Allow glow to spill if needed, but usually hidden is safer for ICard */
  position: relative;
  z-index: 1;
}

/* Hover Effect - The "Lift" */
.showcase-card-dark:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.2) !important; /* Sky blue hint */
  box-shadow:
    0 0 0 1px rgba(56, 189, 248, 0.1),
    0 20px 25px -5px rgba(0, 0, 0, 0.2),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  background: rgba(15, 23, 42, 0.8) !important;
}

/* Header */
.card-header {
  padding: 1.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column; /* 改為垂直排列 */
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem; /* 標題與副標題的間距 */
}

.header-content {
  flex: 1;
}

.card-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #f8fafc;
  line-height: 1.3;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-desc {
  margin: 0.5rem 0 0 0;
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.6;
  font-weight: 400;
}

/* Body */
.card-body {
  padding: 1.75rem;
  background: rgba(0, 0, 0, 0.1); /* Subtle inner contrast */
}

.no-padding .card-body {
  padding: 0;
}

/* Footer */
.card-footer {
  padding: 1.25rem 1.75rem;
  background: rgba(15, 23, 42, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

/* Typography Reset */
:deep(p) {
  margin-bottom: 1rem;
  line-height: 1.6;
}

:deep(p:last-child) {
  margin-bottom: 0;
}

/* Scrollbar refinement for any internal overflow */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>
