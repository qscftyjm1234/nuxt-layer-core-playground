<script setup lang="ts">
import { ref, computed } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const {
  required,
  email,
  phone,
  url,
  taiwanId,
  number,
  minLength,
  maxLength,
  range,
  sameAs,
  validateFields,
  isAllValid
} = useValidation()

// Demo form data
const formData = ref({
  username: '',
  email: '',
  phone: '',
  taiwanId: '',
  age: '',
  password: '',
  confirmPassword: '',
  website: ''
})

// Validation results
const validationResults = ref<Record<string, any>>({})

// Individual validation demos
const emailResult = computed(() => email(formData.value.email))
const phoneResult = computed(() => phone(formData.value.phone))
const taiwanIdResult = computed(() => taiwanId(formData.value.taiwanId))
const urlResult = computed(() => url(formData.value.website))

// Validation Rules
const rules = computed(() => ({
  username: [required, minLength(3), maxLength(20)],
  email: [required, email],
  phone: [phone],
  taiwanId: [taiwanId],
  age: [number, range(18, 100)],
  password: [required, minLength(6)],
  confirmPassword: [required, sameAs(formData.value.password, '密碼不一致')],
  website: [url]
}))

// Batch validation
const handleValidateForm = () => {
  validationResults.value = validateFields(formData.value, rules.value)
}

// List Validation (Per-Item)
const listTags = ref(['Vue', 'Nuxt', ''])
const listResults = ref<ValidationResult[]>([])

const addTag = () => listTags.value.push('')

const removeTag = (index: number) => {
  listTags.value.splice(index, 1)
  listResults.value.splice(index, 1)
}

const checkTag = (index: number) => {
  const value = listTags.value[index]
  // 单項獨立驗證
  listResults.value[index] = validate(value, [required, minLength(2)])
}

// Blur validation
const handleBlur = (field: string) => {
  const fieldRules = rules.value[field as keyof typeof rules.value]
  if (fieldRules) {
    const value = formData.value[field as keyof typeof formData.value]
    const result = validate(value, fieldRules)

    // Update only the specific field result
    validationResults.value = {
      ...validationResults.value,
      [field]: result
    }
  }
}

const isFormValid = computed(
  () => Object.keys(validationResults.value).length > 0 && isAllValid(validationResults.value)
)

definePageMeta({
  title: '資料驗證 (Validation)',
  icon: 'mdi-check-all',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="表單驗證系統 (Validation System)"
    description="完整的表單驗證模組，提供常用驗證規則與自訂驗證功能。核心特色包含台灣本地化驗證、批次驗證、自訂規則。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <ShowcaseCard
        title="核心功能"
        description="表單驗證系統的核心特色"
        full-width
      >
        <div class="demo-area">
          <p
            class="method-desc"
            style="margin-bottom: 1.5rem"
          >
            <strong>可用方法：</strong>
          </p>
          <ShowcaseCodeBlock
            code="// 來源: composables/useValidation.ts (Nuxt 自動引入)
const {
  // 基本驗證
  required,     // 必填
  email,        // Email 格式
  phone,        // 手機號碼 (台灣)
  url,          // URL 格式
  taiwanId,     // 身分證字號 (台灣)
  number,       // 數字
  integer,      // 整數
  positive,     // 正數

  // 長度與範圍
  minLength,    // 最小長度
  maxLength,    // 最大長度
  range,        // 數值範圍

  // 進階
  pattern,      // 正則表達式
  sameAs,       // 相同值 (確認密碼)

  // 批次處理
  validate,       // 單一值多規則驗證
  validateFields, // 多欄位驗證
  validateArray,  // 陣列驗證 (詳細)
  validateList,   // 列表驗證 (簡易)
  isAllValid      // 檢查結果
} = useValidation()"
            label="useValidation() 提供的方法"
          />

          <p
            class="method-desc"
            style="margin-top: 1.5rem; margin-bottom: 1rem"
          >
            <strong>核心特色：</strong>
          </p>
          <ul class="benefit-list">
            <li>
              <strong>台灣本地化:</strong>
              內建台灣手機號碼與身分證字號驗證
            </li>
            <li>
              <strong>高階函數:</strong>
              長度與範圍驗證採用高階函數設計，使用更彈性
            </li>
            <li>
              <strong>批次驗證:</strong>
              輕鬆處理整份表單的驗證邏輯
            </li>
            <li>
              <strong>TypeScript:</strong>
              完整的型別定義，開發更有保障
            </li>
          </ul>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- Interactive Form Demo -->
    <ShowcaseSection
      title="互動測試"
      icon="🚀"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="Validation Form"
          description="填寫表單以測試驗證規則"
          full-width
        >
          <div class="max-w-2xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- Username -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">
                  使用者名稱
                  <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="formData.username"
                  type="text"
                  class="glass-input w-full"
                  :class="{
                    error: validationResults.username && !validationResults.username.valid
                  }"
                  placeholder="3-20 個字元"
                />
                <div
                  v-if="validationResults.username && !validationResults.username.valid"
                  class="mt-2"
                >
                  <ShowcaseCodeBlock
                    :code="JSON.stringify(validationResults.username, null, 2)"
                    language="json"
                    label="Validation Result"
                  />
                </div>
              </div>

              <!-- Email -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">
                  Email
                  <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="formData.email"
                  type="email"
                  class="glass-input w-full"
                  :class="{ error: validationResults.email && !validationResults.email.valid }"
                  placeholder="example@email.com"
                  @blur="handleBlur('email')"
                />
                <div class="flex justify-between items-start mt-1">
                  <div
                    v-if="validationResults.email && !validationResults.email.valid"
                    class="w-full mr-2"
                  >
                    <ShowcaseCodeBlock
                      :code="JSON.stringify(validationResults.email, null, 2)"
                      language="json"
                      label="Validation Result"
                    />
                  </div>
                  <span
                    v-else
                    class="text-xs ml-auto"
                    :class="emailResult.valid ? 'text-green-400' : 'text-slate-500'"
                  >
                    即時: {{ emailResult.valid ? '✓ 有效' : 'Checking...' }}
                  </span>
                </div>
              </div>

              <!-- Phone -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">手機號碼</label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  class="glass-input w-full"
                  :class="{ error: validationResults.phone && !validationResults.phone.valid }"
                  placeholder="0912-345678"
                  @blur="handleBlur('phone')"
                />
                <div
                  v-if="validationResults.phone && !validationResults.phone.valid"
                  class="mt-2"
                >
                  <ShowcaseCodeBlock
                    :code="JSON.stringify(validationResults.phone, null, 2)"
                    language="json"
                    label="Validation Result"
                  />
                </div>
                <span
                  class="text-xs block mt-1 text-right"
                  :class="phoneResult.valid ? 'text-green-400' : 'text-slate-500'"
                >
                  即時: {{ phoneResult.valid ? '✓ 有效' : phoneResult.message || '格式檢查中' }}
                </span>
              </div>

              <!-- Taiwan ID -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">身分證字號</label>
                <input
                  v-model="formData.taiwanId"
                  type="text"
                  class="glass-input w-full"
                  :class="{
                    error: validationResults.taiwanId && !validationResults.taiwanId.valid
                  }"
                  placeholder="A123456789"
                  @blur="handleBlur('taiwanId')"
                />
                <div
                  v-if="validationResults.taiwanId && !validationResults.taiwanId.valid"
                  class="mt-2"
                >
                  <ShowcaseCodeBlock
                    :code="JSON.stringify(validationResults.taiwanId, null, 2)"
                    language="json"
                    label="Validation Result"
                  />
                </div>
                <span
                  class="text-xs block mt-1 text-right"
                  :class="taiwanIdResult.valid ? 'text-green-400' : 'text-slate-500'"
                >
                  即時:
                  {{ taiwanIdResult.valid ? '✓ 有效' : taiwanIdResult.message || '格式檢查中' }}
                </span>
              </div>

              <!-- Age -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">年齡</label>
                <input
                  v-model="formData.age"
                  type="number"
                  class="glass-input w-full"
                  :class="{ error: validationResults.age && !validationResults.age.valid }"
                  placeholder="18-100"
                  @blur="handleBlur('age')"
                />
                <div
                  v-if="validationResults.age && !validationResults.age.valid"
                  class="mt-2"
                >
                  <ShowcaseCodeBlock
                    :code="JSON.stringify(validationResults.age, null, 2)"
                    language="json"
                    label="Validation Result"
                  />
                </div>
              </div>

              <!-- Website -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">網站</label>
                <input
                  v-model="formData.website"
                  type="url"
                  class="glass-input w-full"
                  :class="{ error: validationResults.website && !validationResults.website.valid }"
                  placeholder="https://example.com"
                  @blur="handleBlur('website')"
                />
                <div
                  v-if="validationResults.website && !validationResults.website.valid"
                  class="mt-2"
                >
                  <ShowcaseCodeBlock
                    :code="JSON.stringify(validationResults.website, null, 2)"
                    language="json"
                    label="Validation Result"
                  />
                </div>
                <span
                  class="text-xs block mt-1 text-right"
                  :class="urlResult.valid ? 'text-green-400' : 'text-slate-500'"
                >
                  即時: {{ urlResult.valid ? '✓ 有效' : urlResult.message || '格式檢查中' }}
                </span>
              </div>

              <!-- Password -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">
                  密碼
                  <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="formData.password"
                  type="password"
                  class="glass-input w-full"
                  :class="{
                    error: validationResults.password && !validationResults.password.valid
                  }"
                  placeholder="至少 6 個字元"
                  @blur="handleBlur('password')"
                />
                <div
                  v-if="validationResults.password && !validationResults.password.valid"
                  class="mt-2"
                >
                  <ShowcaseCodeBlock
                    :code="JSON.stringify(validationResults.password, null, 2)"
                    language="json"
                    label="Validation Result"
                  />
                </div>
              </div>

              <!-- Confirm Password -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">
                  確認密碼
                  <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="formData.confirmPassword"
                  type="password"
                  class="glass-input w-full"
                  :class="{
                    error:
                      validationResults.confirmPassword && !validationResults.confirmPassword.valid
                  }"
                  @blur="handleBlur('confirmPassword')"
                />
                <div
                  v-if="
                    validationResults.confirmPassword && !validationResults.confirmPassword.valid
                  "
                  class="mt-2"
                >
                  <ShowcaseCodeBlock
                    :code="JSON.stringify(validationResults.confirmPassword, null, 2)"
                    language="json"
                    label="Validation Result"
                  />
                </div>
              </div>
            </div>

            <div class="flex items-center gap-4 mb-6">
              <button
                class="glass-btn primary"
                @click="handleValidateForm"
              >
                驗證表單
              </button>
              <div
                v-if="Object.keys(validationResults).length > 0"
                class="px-4 py-2 rounded font-medium text-sm transition-colors"
                :class="
                  isFormValid
                    ? 'bg-green-900/40 text-green-400 border border-green-800'
                    : 'bg-red-900/40 text-red-400 border border-red-800'
                "
              >
                {{ isFormValid ? '✓ 表單驗證通過' : '✗ 表單驗證失敗' }}
              </div>
            </div>

            <div v-if="Object.keys(validationResults).length > 0">
              <ShowcaseCodeBlock
                :code="JSON.stringify(validationResults, null, 2)"
                language="json"
                label="Validation Results"
              />
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- API Reference -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <ShowcaseCard
        title="API 詳細說明"
        description="useValidation() 回傳方法列表"
        full-width
      >
        <div class="mb-4 text-slate-400 text-sm leading-relaxed">
          提供常用的表單驗證規則，支援單一欄位與批次驗證。
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse border border-slate-700">
            <thead>
              <tr>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  方法名稱 (Name)
                </th>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  型別 (Type)
                </th>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm w-full"
                >
                  說明 (Description)
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50">
              <!-- Basic Rules -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  required(val, msg?)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  必填欄位驗證 (不允許 null, undefined, 空字串)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  email(val, msg?)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  Email 格式驗證。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  url(val, msg?)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  URL 網址格式驗證。
                </td>
              </tr>

              <!-- Number Rules -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  number(val, msg?)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  數字格式驗證 (允許整數與浮點數)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  integer(val, msg?)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  整數格式驗證。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  positive(val, msg?)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  正數驗證 (> 0)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  range(min, max)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  數值範圍驗證 [min, max]。
                </td>
              </tr>

              <!-- String Rules -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  minLength(len)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  最小長度驗證。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  maxLength(len)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  最大長度驗證。
                </td>
              </tr>

              <!-- Localized Rules -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-rose-300 font-medium">
                  phone(val, msg?)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  台灣手機號碼格式驗證 (09開頭)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-rose-300 font-medium">
                  taiwanId(val, msg?)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  台灣身分證字號驗證 (檢查碼)。
                </td>
              </tr>

              <!-- Advanced Rules -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-emerald-300 font-medium">
                  pattern(regex, msg?)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  自訂正則表達式驗證。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-emerald-300 font-medium">
                  sameAs(val, msg?)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  欄位值一致性驗證 (如：確認密碼)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-emerald-300 font-medium">
                  validate(val, rules)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  執行單一欄位的多重驗證規則，回傳驗證結果。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-emerald-300 font-medium">
                  validateFields(schema)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  批次驗證整個表單物件，回傳所有錯誤訊息。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.glass-input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #f1f5f9;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.glass-input:focus {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
}

.glass-input.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 1px #ef4444;
}

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #e2e8f0;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  font-weight: 600;
}

.glass-btn:hover {
  background: rgba(51, 65, 85, 0.8);
  border-color: #94a3b8;
}

.glass-btn.primary {
  background: rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.5);
  color: #38bdf8;
}

.glass-btn.primary:hover {
  background: rgba(56, 189, 248, 0.3);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
}

/* Benefit List */
.benefit-list {
  padding-left: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 0;
}

.benefit-list li {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.15);
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.7;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.benefit-list li::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, #38bdf8 0%, #6366f1 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.benefit-list li:hover {
  border-color: rgba(56, 189, 248, 0.3);
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.15);
}

.benefit-list li:hover::before {
  opacity: 1;
}

.benefit-list li strong {
  color: #38bdf8;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.05em;
  font-weight: 600;
  letter-spacing: 0.3px;
}

/* Method Description */
.method-desc {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0;
}
</style>
