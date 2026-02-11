<template>
  <button :class="buttonClasses" :disabled="disabled" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false
})

const buttonClasses = computed(() => {
  return [
    'btn',
    `btn--${props.variant}`,
    `btn--${props.size}`,
    { 'btn--disabled': props.disabled }
  ]
})
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: inherit;
  white-space: nowrap;
}

.btn:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Sizes */
.btn--sm {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
}

.btn--md {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-base);
}

.btn--lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-lg);
}

/* Variants */
.btn--primary {
  background-color: var(--color-primary-600);
  color: white;
}

.btn--primary:hover:not(.btn--disabled) {
  background-color: var(--color-primary-700);
}

.btn--secondary {
  background-color: var(--color-gray-600);
  color: white;
}

.btn--secondary:hover:not(.btn--disabled) {
  background-color: var(--color-gray-700);
}

.btn--outline {
  background-color: transparent;
  color: var(--color-primary-600);
  border: 2px solid var(--color-primary-600);
}

.btn--outline:hover:not(.btn--disabled) {
  background-color: var(--color-primary-50);
}

.btn--ghost {
  background-color: transparent;
  color: var(--color-gray-700);
}

.btn--ghost:hover:not(.btn--disabled) {
  background-color: var(--color-gray-100);
}

/* Disabled */
.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
