<script setup lang="ts">
import { ref } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

// --- EmailInput Demo State ---
const email = ref('')
const emailCorporate = ref(false)
const emailRequired = ref(false)
const emailDisabled = ref(false)
const emailDomains = ref<string[]>([])

const toggleDomains = (checked: boolean) => {
  emailDomains.value = checked ? ['gmail.com', 'outlook.com'] : []
}

definePageMeta({
  title: '業務表單元件 (Business Form)',
  icon: 'mdi-form-textbox',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="業務表單元件 (Business Form)"
    description="封裝常用業務邏輯的表單元件，內建驗證、格式化與錯誤處理，大幅減少重複程式碼。"
  >
    <!-- EmailInput Section -->
    <ShowcaseSection title="Email 輸入框 (EmailInput)">
      <!-- 1. 功能總覽 -->
      <ShowcaseCard
        title="元件特色"
        description="專為 Email 輸入設計的業務元件"
        full-width
      >
        <div class="demo-area">
          <ul class="benefit-list">
            <li>
              <strong>自動驗證 (Auto Validation):</strong>
              內建 Regex 格式檢查，無需手寫規則
            </li>
            <li>
              <strong>格式統一 (Auto Formatting):</strong>
              輸入後自動轉為小寫，保持資料一致性
            </li>
            <li>
              <strong>業務規則 (Business Rules):</strong>
              支援公司信箱限制 (@mycompany.com) 與白名單過濾
            </li>
            <li>
              <strong>防呆機制 (Error Handling):</strong>
              自動顯示錯誤訊息，並支援必填檢查
            </li>
          </ul>
        </div>
      </ShowcaseCard>

      <!-- 2. 互動範例 -->
      <ShowcaseCard
        title="互動演示 (Live Demo)"
        description="嘗試調整參數以查看不同驗證效果"
        full-width
        class="mt-6"
      >
        <div class="demo-area">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Left: Component -->
            <div class="component-view p-4 border border-slate-700 rounded-lg bg-slate-900/50">
              <EmailInput
                v-model="email"
                :corporate-only="emailCorporate"
                :required="emailRequired"
                :disabled="emailDisabled"
                :allowed-domains="emailDomains"
              />
              <div class="mt-4 text-sm text-slate-400">
                當前值:
                <span class="text-emerald-400 font-mono">{{ email || '(Empty)' }}</span>
              </div>
            </div>

            <!-- Right: Controls -->
            <div class="controls-view">
              <div class="text-xs font-bold text-slate-500 uppercase mb-3">元件設定 (Props)</div>
              <div class="flex flex-col gap-3">
                <ICheckbox
                  v-model="emailRequired"
                  label="必填 (required)"
                />
                <ICheckbox
                  v-model="emailDisabled"
                  label="禁用 (disabled)"
                />
                <div class="h-px bg-slate-700/50 my-1"></div>
                <ICheckbox
                  v-model="emailCorporate"
                  label="限制公司信箱 (corporate-only)"
                  :disabled="emailDomains.length > 0"
                />
                <ICheckbox
                  :model-value="emailDomains.length > 0"
                  label="限制特定網域 (gmail, outlook)"
                  :disabled="emailCorporate"
                  @update:model-value="toggleDomains"
                />
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <ShowcaseCodeBlock
            language="html"
            :code="`<EmailInput
  v-model=&quot;email&quot;
  ${emailRequired ? 'required' : ''}
  ${emailDisabled ? 'disabled' : ''}
  ${emailCorporate ? 'corporate-only' : ''}
  ${emailDomains.length ? ':allowed-domains=&quot;[\'gmail.com\', \'outlook.com\']&quot;' : ''}
/>`"
            label="程式碼範例"
          />
        </template>
      </ShowcaseCard>

      <!-- 3. API 參考 -->
      <ShowcaseCard
        title="屬性說明 (Props)"
        description="元件可用的參數設定"
        full-width
        class="mt-6"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse border border-slate-700">
            <thead>
              <tr>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  屬性名稱 (Name)
                </th>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  類型 (Type)
                </th>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  預設值 (Default)
                </th>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm w-full"
                >
                  說明 (Description)
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50">
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  modelValue
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">String</td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">-</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  綁定值 (v-model)
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  placeholder
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">String</td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                  '請輸入 Email'
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  輸入框提示文字
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  required
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Boolean</td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">false</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  是否為必填欄位 (空值時顯示錯誤)
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  corporateOnly
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Boolean</td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">false</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  <span
                    class="inline-block px-1.5 py-0.5 rounded text-xs font-semibold mr-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  >
                    業務邏輯
                  </span>
                  僅允許公司信箱 (@mycompany.com)
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  allowedDomains
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                  Array&lt;String&gt;
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">[]</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  <span
                    class="inline-block px-1.5 py-0.5 rounded text-xs font-semibold mr-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  >
                    業務邏輯
                  </span>
                  僅允許特定網域清單 (如 ['gmail.com'])
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

/* API Table */
.api-table-container {
  overflow-x: auto;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  color: #cbd5e1;
}

.api-table th {
  text-align: left;
  padding: 1rem;
  background: rgba(30, 41, 59, 0.5);
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  color: #f1f5f9;
  font-weight: 600;
}

.api-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  vertical-align: top;
}

.api-table code {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.85em;
}

.tag {
  display: inline-block;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75em;
  font-weight: 600;
  margin-right: 0.5rem;
}

.tag.business {
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.2);
}
</style>
