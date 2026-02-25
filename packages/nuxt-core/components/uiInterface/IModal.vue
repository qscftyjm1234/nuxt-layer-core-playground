<script setup lang="ts">
/**
 * IModal - 介面層
 *
 * 用途：統一的 Modal 介面
 * 設計原則：只負責顯示，不涉入 useModal 邏輯
 */

interface Props {
  /**
   * 是否顯示彈窗
   * @default false
   */
  modelValue: boolean

  /**
   * 彈窗標題
   */
  title?: string

  /**
   * 彈窗內容文字
   */
  content?: string

  /**
   * 確認按鈕文字
   * @default '確認'
   */
  confirmText?: string

  /**
   * 取消按鈕文字
   * @default '取消'
   */
  cancelText?: string

  /**
   * 是否顯示取消按鈕
   * @default true
   */
  showCancel?: boolean

  /**
   * 是否允許點擊遮罩關閉
   * @default true
   */
  closeOnMask?: boolean

  /**
   * 是否強制顯示 (不可點遮罩關閉，不顯示取消)
   * 若為 true，則忽略 closeOnMask
   * @default false
   */
  persistent?: boolean

  /**
   * 最大寬度
   * @default 500
   */
  maxWidth?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  content: '',
  confirmText: '確認',
  cancelText: '取消',
  showCancel: true,
  closeOnMask: true,
  persistent: false,
  maxWidth: 500
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean] // 代表 emit('update:modelValue', true)
  confirm: [] // 代表 emit('confirm') 不帶參數
  cancel: [] // 代表 emit('cancel') 不帶參數
}>()

// 內部狀態
const internalVisible = ref(props.modelValue)
const internalConfig = ref<Partial<Props>>({})
let resolvePromise: ((value: boolean) => void) | null = null

// 監聽外部 props 變更
watch(
  () => props.modelValue,
  (val) => {
    internalVisible.value = val
  }
)

// 處理顯示狀態變更
const handleUpdate = (val: boolean) => {
  internalVisible.value = val
  emit('update:modelValue', val)

  // 如果是關閉且有 pending promise，視為取消
  if (!val && resolvePromise) {
    resolvePromise(false)
    resolvePromise = null // Reset
  }
}

// 合併後的設定 (優先使用 open() 傳入的設定，否則使用 props)
const finalConfig = computed(() => ({
  title: internalConfig.value.title ?? props.title,
  content: internalConfig.value.content ?? props.content,
  confirmText: internalConfig.value.confirmText ?? props.confirmText,
  cancelText: internalConfig.value.cancelText ?? props.cancelText,
  showCancel: internalConfig.value.showCancel ?? props.showCancel,
  closeOnMask: internalConfig.value.closeOnMask ?? props.closeOnMask,
  persistent: internalConfig.value.persistent ?? props.persistent,
  maxWidth: internalConfig.value.maxWidth ?? props.maxWidth
}))

// 按鈕處理
const handleConfirm = () => {
  if (resolvePromise) {
    resolvePromise(true)
    resolvePromise = null
    internalVisible.value = false
  } else {
    emit('confirm')
  }
}

const handleCancel = () => {
  if (resolvePromise) {
    resolvePromise(false)
    resolvePromise = null
    internalVisible.value = false
  } else {
    emit('cancel')
  }
}

/**
 * 開啟彈窗 (Script 調用模式)
 * @param config 彈窗設定
 */
const open = (config?: Partial<Props>) => {
  internalConfig.value = config || {}
  internalVisible.value = true
  // Reset promise
  if (resolvePromise) resolvePromise(false)

  return new Promise<boolean>((resolve) => {
    resolvePromise = resolve
  })
}

/**
 * 確認對話框 (Script 調用模式 Helpers)
 * @param config
 */
const confirm = (config?: Partial<Props>) =>
  open({
    showCancel: true,
    confirmText: '確認',
    cancelText: '取消',
    ...config
  })

/**
 * 警告對話框 (Script 調用模式 Helpers)
 * @param config
 */
const alert = (config?: Partial<Props>) =>
  open({
    showCancel: false,
    confirmText: '確認',
    ...config
  }).then(() => {}) // alert 不回傳 boolean

defineExpose({
  open,
  confirm,
  alert
})
</script>

<template>
  <v-dialog
    :model-value="internalVisible"
    :persistent="finalConfig.persistent || !finalConfig.closeOnMask"
    :max-width="finalConfig.maxWidth"
    class="glass-dialog"
    @update:model-value="handleUpdate"
  >
    <v-card class="glass-card">
      <!-- 標題 -->
      <v-card-title
        v-if="finalConfig.title"
        class="text-h6 font-weight-bold pa-4"
      >
        {{ finalConfig.title }}
      </v-card-title>

      <!-- 內容 -->
      <v-card-text
        v-if="finalConfig.content"
        class="pa-4 pt-0 text-body-1"
      >
        {{ finalConfig.content }}
      </v-card-text>

      <!-- 插槽內容 (預設無 padding，若為純文字建議自行加 pa-4) -->
      <div
        v-if="$slots.default"
        class="i-modal-slot"
      >
        <slot />
      </div>

      <!-- 按鈕區 -->
      <v-card-actions class="pa-4 pt-0">
        <v-spacer />

        <!-- 取消按鈕 -->
        <v-btn
          v-if="finalConfig.showCancel"
          variant="text"
          color="grey-lighten-1"
          class="mr-2"
          @click="handleCancel"
        >
          {{ finalConfig.cancelText }}
        </v-btn>

        <!-- 確認按鈕 -->
        <v-btn
          color="primary"
          variant="flat"
          @click="handleConfirm"
        >
          {{ finalConfig.confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.glass-card {
  background: rgba(15, 23, 42, 0.9) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white !important;
}

:deep(.v-card-title) {
  color: #f1f5f9;
}

:deep(.v-card-text) {
  color: #cbd5e1;
}
</style>
