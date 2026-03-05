<script setup lang="ts">
/**
 * ICard - UI 介面層卡片
 *
 * 用途：統一的 Card 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 */

interface Props {
  title?: string
  subtitle?: string
  elevation?: number
  color?: string
  variant?: 'elevated' | 'flat' | 'outlined'
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  elevation: 1,
  color: 'white',
  variant: 'elevated'
})

const cardClass = computed(() => ({
  [`variant-${props.variant}`]: true
}))

const cardStyle = computed(() => ({
  backgroundColor: props.color,
  boxShadow:
    props.variant === 'elevated' && props.elevation > 0
      ? `0 ${props.elevation}px ${props.elevation * 2}px rgba(0, 0, 0, 0.1)`
      : 'none'
}))
const shouldUseFramework = true

const vuetifyBindings = computed(() => ({
  title: props.title,
  subtitle: props.subtitle,
  elevation: props.variant === 'elevated' ? props.elevation : 0,
  variant:
    props.variant === 'outlined' ? 'outlined' : props.variant === 'flat' ? 'flat' : 'elevated',
  color: props.color === 'white' ? undefined : props.color,
  class: 'ui-card'
}))
</script>

<template>
  <v-card
    v-if="shouldUseFramework"
    v-bind="vuetifyBindings"
  >
    <template
      v-if="$slots.header"
      #title
    >
      <slot name="header" />
    </template>

    <!-- Vuetify v-card-text provides consistent padding -->
    <v-card-text class="card-content">
      <slot />
    </v-card-text>

    <template v-if="$slots.actions">
      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </template>
  </v-card>

  <!-- 目前使用原生 HTML -->
  <div
    v-else
    class="ui-card"
    :class="cardClass"
    :style="cardStyle"
  >
    <div
      v-if="title || subtitle || $slots.header"
      class="card-header"
    >
      <slot name="header">
        <h3
          v-if="title"
          class="card-title"
        >
          {{ title }}
        </h3>
        <p
          v-if="subtitle"
          class="card-subtitle"
        >
          {{ subtitle }}
        </p>
      </slot>
    </div>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Common Card Styles */
.ui-card {
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Vuetify Overrides for Corporate Trust */
:deep(.v-card) {
  border-radius: 12px !important;
  border-color: var(--color-gray-200, #e2e8f0);
}

:deep(.v-card--variant-elevated) {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03) !important;
}

:deep(.v-card--variant-outlined) {
  border: 1px solid var(--color-gray-200, #e2e8f0) !important;
}

:deep(.v-card-item) {
  padding: 1.25rem 1.5rem !important;
  border-bottom: 1px solid var(--color-gray-100, #f1f5f9);
}

:deep(.v-card-title) {
  font-family: var(--font-family-base, 'Inter') !important;
  font-weight: 600 !important;
  color: var(--color-gray-800, #1e293b) !important;
  font-size: 1.125rem !important;
  letter-spacing: -0.01em !important;
  padding: 0 !important;
}

:deep(.v-card-subtitle) {
  font-family: var(--font-family-base, 'Inter') !important;
  color: var(--color-gray-500, #64748b) !important;
  padding: 0 !important;
  margin-top: 0.25rem !important;
}

:deep(.v-card-text) {
  padding: 1.5rem !important;
  color: var(--color-gray-700, #334155) !important;
}

/* Native Styles (Preserved) */
.ui-card.native-impl {
  border-radius: 12px;
  overflow: hidden;
  background: white;
  border: 1px solid var(--color-gray-200, #e2e8f0);
}

.variant-elevated {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border: 1px solid transparent;
}

.ui-card.variant-outlined {
  border: 1px solid var(--color-gray-200, #e2e8f0);
  box-shadow: none !important;
}

.ui-card.variant-flat {
  box-shadow: none !important;
  border: none;
  background: transparent;
}

.card-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-gray-100, #f1f5f9);
  background: white;
}

.card-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-gray-800, #1e293b);
  letter-spacing: -0.01em;
}

.card-subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: var(--color-gray-500, #64748b);
}

.card-content {
  padding: 1.5rem;
}
</style>
