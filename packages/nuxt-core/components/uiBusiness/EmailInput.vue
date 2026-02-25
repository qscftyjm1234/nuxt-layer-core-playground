<script setup lang="ts">
/**
 * EmailInput - Email 輸入框（業務元件）
 *
 * 用途：封裝 Email 輸入的業務邏輯
 * 特點：
 * - 自動驗證 Email 格式
 * - 自動轉小寫
 * - 提供清除按鈕
 */

import IInput from '../uiInterface/IInput.vue'

interface Props {
  modelValue: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  // 1. 基本業務開關：是否為嚴格模式 (例如只能用公司信箱)
  corporateOnly?: boolean
  // 2. 進階彈性：允許傳入特定的網域清單
  allowedDomains?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '請輸入 Email',
  disabled: false,
  required: false,
  corporateOnly: false,
  allowedDomains: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

// 業務邏輯：Email 驗證
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isValid = computed(() => {
  if (!props.modelValue) return !props.required
  return emailRegex.test(props.modelValue)
})

const errorMessage = computed(() => {
  if (!props.modelValue) {
    return props.required ? 'Email 必填' : ''
  }
  if (!isValid.value) {
    return 'Email 格式錯誤'
  }

  // 特殊業務邏輯：限制網域 (公司信箱)
  if (props.corporateOnly) {
    if (!props.modelValue.endsWith('@mycompany.com')) {
      return '請使用公司信箱 (@mycompany.com)'
    }
  }

  // 特殊業務邏輯：自訂網域清單
  if (props.allowedDomains.length > 0) {
    const domain = props.modelValue.split('@')[1]
    if (domain && !props.allowedDomains.includes(domain)) {
      return `只允許以下信箱: ${props.allowedDomains.join(', ')}`
    }
  }

  return ''
})

// 業務邏輯：自動轉小寫
const handleChange = (value: string | number) => {
  const email = String(value).toLowerCase()
  emit('update:modelValue', email)
  emit('change', email)
  emit('change', email)
}

// 避免屬性直接貼在根元素 (如果有的話)，而是精準傳給 IInput
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <IInput
    v-bind="$attrs"
    :model-value="modelValue"
    type="email"
    :placeholder="placeholder"
    :disabled="disabled"
    :error="!isValid"
    :error-message="errorMessage"
    clearable
    prepend-icon="📧"
    autocomplete="email"
    @update:model-value="handleChange"
  />
</template>
