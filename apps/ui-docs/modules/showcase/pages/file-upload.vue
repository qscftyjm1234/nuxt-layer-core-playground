<script setup lang="ts">
import { ref, computed } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const {
  uploadFile,
  uploadFiles,
  uploadFromInput,
  uploadFromBase64,
  uploadFromBlob,
  validate,
  validateMultiple,
  getSelectedFiles,
  formatFileSize
} = useFileUpload()

// 狀態
const selectedFiles = ref<File[]>([])
const isDragging = ref(false)
const isUploading = ref(false)
const uploadResults = ref<any[]>([])

// 示範驗證選項
const maxFileSize = ref(5 * 1024 * 1024) // 5MB
const acceptedTypes = ref<string[]>(['image/*', '.pdf'])
const maxFilesCount = ref(5)

const validationSummary = computed(() => {
  if (selectedFiles.value.length === 0) return null

  const result = validateMultiple(selectedFiles.value, {
    maxSize: maxFileSize.value,
    accept: acceptedTypes.value,
    maxFiles: maxFilesCount.value
  })

  return result
})

// 檔案圖示輔助函式
const getFileIcon = (file: File) => {
  if (file.type.startsWith('image/')) return '🖼️'
  if (file.type.startsWith('video/')) return '🎥'
  if (file.type.includes('pdf')) return '📄'
  if (file.type.includes('word')) return '📝'
  if (file.type.includes('excel') || file.type.includes('spreadsheet')) return '📊'
  if (file.type.startsWith('audio/')) return '🎵'
  return '📁'
}

// 事件處理
const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  const files = getSelectedFiles(e)
  selectedFiles.value = [...selectedFiles.value, ...files]
}

const handleFileSelect = (e: Event) => {
  const files = getSelectedFiles(e)
  selectedFiles.value = [...selectedFiles.value, ...files]
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

const clearAll = () => {
  selectedFiles.value = []
  uploadResults.value = []
}

// 上傳操作

const handleUploadMultiple = async () => {
  if (selectedFiles.value.length === 0) return

  // 過濾出符合規則的檔案
  const validFiles = selectedFiles.value.filter((file) => {
    const result = validate(file, {
      maxSize: maxFileSize.value,
      accept: acceptedTypes.value
    })
    return result.valid
  })

  // 檢查是否有符合規則的檔案
  if (validFiles.length === 0) {
    useNotify().error('沒有符合規則的檔案可上傳')
    return
  }

  // 如果有檔案被過濾掉，提醒使用者
  const filteredCount = selectedFiles.value.length - validFiles.length
  if (filteredCount > 0) {
    useNotify().warning(`已過濾 ${filteredCount} 個不符合規則的檔案`)
  }

  // 上傳符合規則的檔案
  const results = await uploadFiles(validFiles, {
    endpoint: '/api/upload/multiple',
    loadingRef: isUploading,
    autoSuccess: true,
    autoError: true,
    maxSize: maxFileSize.value,
    accept: acceptedTypes.value
  })

  uploadResults.value.push({
    files: validFiles.map((f) => f.name),
    results
  })
}

const handleValidateOnly = () => {
  const result = validateMultiple(selectedFiles.value, {
    maxSize: maxFileSize.value,
    accept: acceptedTypes.value,
    maxFiles: maxFilesCount.value
  })

  if (!result.valid) {
    useNotify().error(`驗證失敗：${result.error}`)
  } else {
    useNotify().success(`✓ 所有檔案驗證通過（共 ${selectedFiles.value.length} 個）`)
  }
}

definePageMeta({
  title: '檔案上傳 (File Upload)',
  icon: 'mdi-upload',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="檔案上傳系統"
    description="統一的檔案上傳處理模組，支援拖放上傳、檔案驗證與進度追蹤。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <ShowcaseCard
        title="核心功能"
        full-width
      >
        <div class="demo-area">
          <ul class="benefit-list">
            <li>
              <strong>快速上傳:</strong>
              綁定 input 元素，選完即上傳
            </li>
            <li>
              <strong>智慧過濾:</strong>
              自動過濾不符合規則的檔案，只上傳有效檔案
            </li>
            <li>
              <strong>完整驗證:</strong>
              大小、類型、數量批次驗證
            </li>
            <li>
              <strong>拖放支援:</strong>
              內建拖放上傳功能
            </li>
            <li>
              <strong>自動通知:</strong>
              成功、失敗、警告自動顯示訊息
            </li>
            <li>
              <strong>表單整合:</strong>
              自動封裝 FormData 與額外欄位
            </li>
          </ul>
        </div>
        <template #footer>
          <ShowcaseCodeBlock
            code="const { uploadFromInput } = useFileUpload()
// <input type='file' @change='e => uploadFromInput(e, options)' />"
            label="快速開始"
          />
        </template>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 互動測試 -->
    <ShowcaseSection title="互動測試">
      <ShowcaseCard
        title="測試"
        description="檔案上傳區塊"
        full-width
      >
        <div class="demo-area">
          <!-- 上傳區域 -->
          <div
            class="upload-dropzone"
            :class="{ 'is-dragging': isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
          >
            <input
              id="file-upload"
              type="file"
              multiple
              class="hidden"
              @change="handleFileSelect"
            />
            <label
              for="file-upload"
              class="dropzone-content"
            >
              <div class="icon-wrapper">☁️</div>
              <div class="text-main">點擊此處 或 將檔案拖曳至此</div>
              <div class="text-sub">支援各種格式圖片與文件</div>
            </label>
          </div>

          <!-- 設定 -->
          <div class="settings-bar">
            <div class="setting-group">
              <label>最大檔案:</label>
              <select
                v-model.number="maxFileSize"
                class="glass-input"
              >
                <option :value="1 * 1024 * 1024">1 MB</option>
                <option :value="5 * 1024 * 1024">5 MB</option>
                <option :value="10 * 1024 * 1024">10 MB</option>
              </select>
            </div>
            <div class="setting-group">
              <label>最大數量:</label>
              <input
                v-model.number="maxFilesCount"
                type="number"
                class="glass-input"
                min="1"
                max="10"
              />
            </div>
          </div>

          <!-- 檔案清單 -->
          <div
            v-if="selectedFiles.length > 0"
            class="file-list"
          >
            <div class="list-header">
              <h3>已選檔案 ({{ selectedFiles.length }})</h3>
              <div class="actions">
                <button
                  class="glass-btn small"
                  @click="handleValidateOnly"
                >
                  驗證
                </button>
                <button
                  class="glass-btn small primary"
                  :disabled="isUploading"
                  @click="handleUploadMultiple"
                >
                  {{ isUploading ? '上傳中...' : '全部上傳' }}
                </button>
                <button
                  class="glass-btn small danger"
                  @click="clearAll"
                >
                  清除
                </button>
              </div>
            </div>

            <!-- 驗證狀態 -->
            <div
              v-if="validationSummary"
              class="status-alert"
              :class="validationSummary.valid ? 'success' : 'error'"
            >
              <strong>
                {{ validationSummary.valid ? '✓ 準備上傳' : '⚠ 驗證失敗' }}
              </strong>
              <span
                v-if="!validationSummary.valid"
                class="ml-2"
              >
                {{ validationSummary.error }}
              </span>
            </div>

            <div class="files-grid">
              <div
                v-for="(file, index) in selectedFiles"
                :key="index"
                class="file-item"
              >
                <div class="file-icon">{{ getFileIcon(file) }}</div>
                <div class="file-details">
                  <div class="name">{{ file.name }}</div>
                  <div class="meta">{{ formatFileSize(file.size) }}</div>
                </div>
                <button
                  class="delete-btn"
                  @click="removeFile(index)"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <!-- 結果 -->
          <div
            v-if="uploadResults.length > 0"
            class="results-area"
          >
            <h3>上傳結果</h3>
            <ShowcaseCodeBlock
              :code="JSON.stringify(uploadResults, null, 2)"
              language="json"
              label="伺服器回應"
            />
          </div>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- API 參考 -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="API 詳細說明"
          description="useFileUpload() 回傳方法列表"
          full-width
        >
          <div class="mb-4 text-slate-400 text-sm leading-relaxed">
            提供檔案上傳、驗證與 Utils 功能。所有上傳方法皆支援進度追蹤與自動通知。
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
                <!-- Upload -->
                <tr class="hover:bg-slate-800/30 transition-colors">
                  <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                    uploadFile(file, opts)
                  </td>
                  <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                  <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                    上傳單一檔案。回傳 Promise。
                  </td>
                </tr>
                <tr class="hover:bg-slate-800/30 transition-colors">
                  <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                    uploadFiles(files, opts)
                  </td>
                  <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                  <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                    批次上傳多個檔案 (封裝至同一個 request 或序列上傳，視實作而定)。
                  </td>
                </tr>
                <tr class="hover:bg-slate-800/30 transition-colors">
                  <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                    uploadFromInput(e, opts)
                  </td>
                  <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                  <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                    監聽 Input Change 事件，自動提取檔案並上傳。
                  </td>
                </tr>
                <tr class="hover:bg-slate-800/30 transition-colors">
                  <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                    uploadFromBase64(str)
                  </td>
                  <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                  <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                    上傳 Base64 字串 (自動轉換為 File 上傳)。
                  </td>
                </tr>

                <!-- Validation -->
                <tr class="hover:bg-slate-800/30 transition-colors">
                  <td class="p-4 border border-slate-700/50 font-mono text-rose-300 font-medium">
                    validate(file, opts)
                  </td>
                  <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                  <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                    驗證單一檔案 (大小/類型檢查)，不執行上傳。
                  </td>
                </tr>
                <tr class="hover:bg-slate-800/30 transition-colors">
                  <td class="p-4 border border-slate-700/50 font-mono text-rose-300 font-medium">
                    validateMultiple(files)
                  </td>
                  <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                  <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                    驗證檔案陣列 (數量/大小/類型檢查)。
                  </td>
                </tr>

                <!-- Utils -->
                <tr class="hover:bg-slate-800/30 transition-colors">
                  <td class="p-4 border border-slate-700/50 font-mono text-emerald-300 font-medium">
                    getSelectedFiles(e)
                  </td>
                  <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                  <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                    從 Input Change 或 Drop Event 提取 File[]。
                  </td>
                </tr>
                <tr class="hover:bg-slate-800/30 transition-colors">
                  <td class="p-4 border border-slate-700/50 font-mono text-emerald-300 font-medium">
                    formatFileSize(bytes)
                  </td>
                  <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                  <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                    檔案大小格式化 (Bytes -> KB/MB)。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ShowcaseCard>

        <!-- uploadFromInput -->
        <ShowcaseCard
          title="3. uploadFromInput"
          description="從 Input 元素直接上傳"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              綁定到
              <code>&lt;input type="file"&gt;</code>
              ，選完即上傳。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { uploadFromInput } = useFileUpload()

// 在 template 中
<input 
  type='file' 
  @change='e => uploadFromInput(e, { 
    endpoint: '/api/upload',
    autoSuccess: true 
  })' 
/>"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.upload-dropzone {
  border: 2px dashed rgba(148, 163, 184, 0.4);
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  background-color: rgba(30, 41, 59, 0.3);
  cursor: pointer;
  margin-bottom: 1.5rem;
  position: relative;
}

.upload-dropzone:hover,
.upload-dropzone.is-dragging {
  border-color: #38bdf8;
  background-color: rgba(56, 189, 248, 0.1);
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
}

.dropzone-content {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-wrapper {
  font-size: 3rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
}

.text-main {
  font-size: 1.2rem;
  color: #f1f5f9;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.text-sub {
  color: #94a3b8;
  font-size: 0.9rem;
}

.hidden {
  display: none;
}

/* Settings Bar */
.settings-bar {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
  background: rgba(15, 23, 42, 0.4);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.setting-group {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.setting-group label {
  color: #cbd5e1;
  font-size: 0.9rem;
  font-weight: 500;
}

.glass-input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #f1f5f9;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.9rem;
}

.glass-input:focus {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
}

/* Glass Buttons */
.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
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

.glass-btn.danger {
  color: #f87171;
  border-color: rgba(248, 113, 113, 0.3);
  background: rgba(248, 113, 113, 0.1);
}

.glass-btn.danger:hover {
  background: rgba(248, 113, 113, 0.2);
}

.glass-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* File List */
.file-list {
  margin-top: 2rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.list-header h3 {
  color: #f1f5f9;
  font-size: 1.1rem;
  margin: 0;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.status-alert {
  padding: 0.8rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

.status-alert.success {
  background: rgba(22, 163, 74, 0.15);
  border: 1px solid rgba(22, 163, 74, 0.3);
  color: #4ade80;
}

.status-alert.error {
  background: rgba(220, 38, 38, 0.15);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #f87171;
}

.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.file-item {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.file-icon {
  font-size: 1.8rem;
}

.file-details {
  flex: 1;
  overflow: hidden;
}

.name {
  color: #e2e8f0;
  font-weight: 500;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta {
  color: #94a3b8;
  font-size: 0.8rem;
  margin-top: 0.2rem;
}

.delete-btn {
  background: none;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  background: #2563eb;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn.secondary {
  background: #64748b;
}

.action-btn.secondary:hover:not(:disabled) {
  background: #475569;
}

.action-btn.danger {
  background: #ef4444;
}

.action-btn.danger:hover:not(:disabled) {
  background: #dc2626;
}

/* Method Demos */
.method-demos {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.demo-card {
  padding: 1.5rem;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #eee;
}

.demo-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #2c3e50;
  font-family: 'Fira Code', monospace;
}

/* Animation */
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Benefit List - Consistent with other showcase pages */
.benefit-list {
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
}

.benefit-list li {
  background: rgba(255, 255, 255, 0.03);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  flex: 1;
  min-width: 200px;
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.6;
}

.benefit-list li strong {
  color: #38bdf8;
  display: block;
  margin-bottom: 0.25rem;
  font-size: 1.1em;
}

/* Method Description */
.method-desc {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.method-desc strong {
  color: #38bdf8;
  font-weight: 600;
}

.method-desc code {
  background: rgba(255, 255, 255, 0.05);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  color: #e2e8f0;
}

/* Parameter List */
.param-list {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.param-item {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  border-left: 2px solid #38bdf8;
  border-radius: 4px;
}

.param-item code {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 120px;
  flex-shrink: 0;
}

.param-item span {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>
