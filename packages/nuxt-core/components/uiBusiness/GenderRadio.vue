<script setup lang="ts">
/**
 * GenderRadio - 性別選擇（業務元件）
 *
 * 用途：封裝性別選擇的業務邏輯
 * 特點：
 * - 使用 Radio 元件
 * - 自動從 useOptions 載入性別選項
 * - 支援橫向/縱向排列
 */

import IRadio from '../uiInterface/IRadio.vue'
import { useOptions } from '../../composables/useOptions'

interface Props {
  modelValue: string
  disabled?: boolean
  layout?: 'horizontal' | 'vertical'
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  layout: 'horizontal',
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

// 業務邏輯：從 useOptions 取得性別選項
const options = useOptions()
const genderOptions = computed(() => options.gender.get())

// 驗證
const isValid = computed(() => {
  if (!props.required) return true
  return !!props.modelValue
})

const errorMessage = computed(() => {
  if (!isValid.value) {
    return '請選擇性別'
  }
  return ''
})

// 業務邏輯：選擇處理
const handleChange = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)
  emit('change', value)
}

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div
    class="gender-radio"
    v-bind="$attrs"
  >
    <div
      class="radio-group"
      :class="`radio-group--${layout}`"
    >
      <IRadio
        v-for="option in genderOptions"
        :key="option.value as any"
        :model-value="modelValue"
        :value="option.value"
        :label="option.label"
        :disabled="disabled"
        name="gender"
        @update:model-value="handleChange"
      />
    </div>

    <!-- 錯誤訊息 -->
    <div
      v-if="!isValid && errorMessage"
      class="error-message"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.gender-radio {
  width: 100%;
}

.radio-group {
  display: flex;
  gap: 1rem;
}

.radio-group--horizontal {
  flex-direction: row;
}

.radio-group--vertical {
  flex-direction: column;
}

.error-message {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #e74c3c;
}
</style>
