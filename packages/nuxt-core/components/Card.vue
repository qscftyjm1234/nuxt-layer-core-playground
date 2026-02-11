<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="card__header">
      <slot name="header" />
    </div>

    <div class="card__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md'
})

const cardClasses = computed(() => {
  return ['card', `card--${props.variant}`, `card--padding-${props.padding}`]
})
</script>

<style scoped>
.card {
  background-color: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

/* Variants */
.card--default {
  border: 1px solid var(--color-gray-200);
}

.card--bordered {
  border: 2px solid var(--color-gray-300);
}

.card--elevated {
  box-shadow: var(--shadow-lg);
  border: none;
}

/* Padding */
.card--padding-sm .card__body {
  padding: var(--spacing-md);
}

.card--padding-md .card__body {
  padding: var(--spacing-lg);
}

.card--padding-lg .card__body {
  padding: var(--spacing-xl);
}

/* Header */
.card__header {
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--color-gray-200);
  background-color: var(--color-gray-50);
  font-weight: 600;
}

/* Footer */
.card__footer {
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid var(--color-gray-200);
  background-color: var(--color-gray-50);
}
</style>
