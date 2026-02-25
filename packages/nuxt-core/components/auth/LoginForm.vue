<script setup lang="ts">
import IButton from '../uiInterface/IButton.vue'
import ICheckbox from '../uiInterface/ICheckbox.vue'
import EmailInput from '../uiBusiness/EmailInput.vue'
import PasswordInput from '../uiBusiness/PasswordInput.vue'

const { $api } = useNuxtApp()
const router = useRouter()

defineProps<{
  title?: string
  subtitle?: string
}>()

const form = reactive({
  username: '',
  password: '',
  rememberMe: false
})

const loading = ref(false)
const errorMsg = ref('')

/**
 * 處理登入請求
 */
async function handleLogin() {
  loading.value = true
  errorMsg.value = ''

  try {
    const { data, error } = await $api.auth.login({
      username: form.username,
      password: form.password
    })

    if (error.value) {
      throw new Error(error.value.message || '登入失敗')
    }

    const config = useRuntimeConfig()
    const token = useCookie(config.public.auth.tokenKey as string, {
      maxAge: Number(config.public.auth.maxAge)
    })
    token.value = (data.value as any)?.accessToken

    router.push('/')
  } catch (err: any) {
    errorMsg.value = err.message || '發生未知錯誤'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="glass-card">
      <div class="login-header">
        <h2 class="login-title">
          {{ title || '歡迎回來' }}
        </h2>
        <p class="login-subtitle">
          {{ subtitle || '請輸入您的帳號密碼以登入系統' }}
        </p>
      </div>

      <form
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <div class="input-stack">
          <label class="input-label">帳號 / Email</label>
          <EmailInput
            v-model="form.username"
            placeholder="請輸入電子郵件"
            :disabled="loading"
            required
          />

          <label class="input-label">密碼</label>
          <PasswordInput
            v-model="form.password"
            placeholder="••••••••"
            :disabled="loading"
            required
            :show-strength="false"
          />
        </div>

        <div class="form-extras">
          <ICheckbox
            v-model="form.rememberMe"
            label="記住我 30 天"
          />
          <a
            href="#"
            class="forgot-link"
          >
            忘記密碼？
          </a>
        </div>

        <div
          v-if="errorMsg"
          class="error-message"
        >
          <span class="error-icon">⚠️</span>
          {{ errorMsg }}
        </div>

        <IButton
          type="submit"
          block
          color="white"
          size="large"
          :loading="loading"
          class="submit-btn"
        >
          登入
        </IButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  width: 100%;
  max-width: 640px;
  perspective: 1000px;
}

/* 
  Refined Glass Card 
  Subtle, Premium, Minimalist
*/
.glass-card {
  background: rgba(30, 41, 59, 0.4); /* Very subtle dark slate */
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0 24px 48px -12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.glass-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 32px 64px -12px rgba(0, 0, 0, 0.3);
}

.login-header {
  margin-bottom: 2.5rem;
  text-align: center;
}

.login-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.025em;
}

.login-subtitle {
  color: #94a3b8;
  font-size: 1rem;
  line-height: 1.5;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-stack {
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* Slightly more space for card layout */
}

.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600; /* Bolder label for card */
  color: #cbd5e1;
  margin-bottom: -0.5rem;
  margin-left: 0.25rem; /* Align with input curve */
}

.form-extras {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  padding: 0 0.25rem;
}

/* Checkbox text color override */
/* Checkbox text color override */
:deep(.i-checkbox__label) {
  color: #94a3b8 !important;
  font-size: 0.875rem !important;
  font-weight: 500;
}

.forgot-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}

.forgot-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.error-message {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  color: #fca5a5;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

:deep(.submit-btn) {
  font-weight: 700 !important;
  font-size: 1.05rem !important;
  height: 52px !important;
  border-radius: 12px !important;
  border: none !important;
  margin-top: 0.5rem;
  transition: all 0.2s !important;
  /* Removed fixed background/color to let props control it, or default to primary if needed */
}

:deep(.submit-btn:hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
}
</style>
