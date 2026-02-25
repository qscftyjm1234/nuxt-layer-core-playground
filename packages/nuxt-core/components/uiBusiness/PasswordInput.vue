<script setup lang="ts">
/**
 * PasswordInput - 密碼輸入（業務元件）
 *
 * 用途：封裝密碼輸入的業務邏輯
 * 特點：
 * - 密碼強度檢測
 * - 顯示/隱藏密碼切換
 * - 密碼規則驗證
 */

import IInput from '../uiInterface/IInput.vue'

interface Props {
  modelValue: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  showStrength?: boolean // 顯示密碼強度
  minLength?: number
  requireSpecialChar?: boolean // 需要特殊字元
  requireNumber?: boolean // 需要數字
  requireUppercase?: boolean // 需要大寫字母
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '請輸入密碼',
  disabled: false,
  required: false,
  showStrength: true,
  minLength: 8,
  requireSpecialChar: true,
  requireNumber: true,
  requireUppercase: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

// 顯示/隱藏密碼
const showPassword = ref(false)
const inputType = computed(() => (showPassword.value ? 'text' : 'password'))

// 業務邏輯：密碼驗證規則
const validations = computed(() => ({
  length: props.modelValue.length >= props.minLength,
  hasNumber: !props.requireNumber || /\d/.test(props.modelValue),
  hasUppercase: !props.requireUppercase || /[A-Z]/.test(props.modelValue),
  hasSpecialChar: !props.requireSpecialChar || /[!@#$%^&*(),.?":{}|<>]/.test(props.modelValue)
}))

const isValid = computed(() => {
  if (!props.modelValue) return !props.required
  return Object.values(validations.value).every((v) => v)
})

// 密碼強度計算 (0-4)
const passwordStrength = computed(() => {
  if (!props.modelValue) return 0

  let strength = 0
  if (props.modelValue.length >= props.minLength) strength++
  if (/[a-z]/.test(props.modelValue)) strength++
  if (/[A-Z]/.test(props.modelValue)) strength++
  if (/\d/.test(props.modelValue)) strength++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(props.modelValue)) strength++

  return Math.min(strength, 4)
})

const strengthLabel = computed(() => {
  const labels = ['', '弱', '普通', '良好', '強']
  return labels[passwordStrength.value]
})

const strengthColor = computed(() => {
  const colors = ['', '#e74c3c', '#f39c12', '#3498db', '#2ecc71']
  return colors[passwordStrength.value]
})

const errorMessage = computed(() => {
  if (!props.modelValue && props.required) {
    return '密碼必填'
  }
  if (props.modelValue && !validations.value.length) {
    return `密碼長度至少 ${props.minLength} 個字元`
  }
  if (props.modelValue && !validations.value.hasNumber) {
    return '密碼必須包含數字'
  }
  if (props.modelValue && !validations.value.hasUppercase) {
    return '密碼必須包含大寫字母'
  }
  if (props.modelValue && !validations.value.hasSpecialChar) {
    return '密碼必須包含特殊字元'
  }
  return ''
})

const handleChange = (value: string | number) => {
  const password = String(value)
  emit('update:modelValue', password)
  emit('change', password)
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div
    class="password-input"
    v-bind="$attrs"
  >
    <IInput
      :model-value="modelValue"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :error="!isValid"
      :error-message="errorMessage"
      prefix-icon="🔒"
      autocomplete="new-password"
      @update:model-value="handleChange"
    >
      <template #suffix>
        <button
          type="button"
          class="toggle-password"
          @click="togglePasswordVisibility"
        >
          {{ showPassword ? '👁️' : '👁️‍🗨️' }}
        </button>
      </template>
    </IInput>

    <!-- 密碼強度指示器 -->
    <div
      v-if="showStrength && modelValue"
      class="password-strength"
    >
      <div class="strength-bar">
        <div
          class="strength-fill"
          :style="{
            width: `${(passwordStrength / 4) * 100}%`,
            background: strengthColor
          }"
        />
      </div>
      <span
        class="strength-label"
        :style="{ color: strengthColor }"
      >
        {{ strengthLabel }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.password-input {
  width: 100%;
}

.toggle-password {
  padding: 0 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.2rem;
}

.password-strength {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.strength-bar {
  flex: 1;
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s;
}

.strength-label {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
