<script setup lang="ts">
/**
 * ILoadingButton - 介面層
 *
 * 用途：專門用於顯示 Loading 狀態的按鈕介面，
 * 這是一個簡化版的適配層，繼承 IButton 的外觀，
 * 但增加了更明確的 loading 屬性支援。
 */

import IButton from './IButton.vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'text'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  icon?: string
}

defineProps<Props>()
defineEmits(['click'])
</script>

<template>
  <IButton
    :variant="variant"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :block="block"
    :icon="icon"
    @click="$emit('click', $event)"
  >
    <slot />
  </IButton>
</template>
