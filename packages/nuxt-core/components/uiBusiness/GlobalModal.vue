<script setup lang="ts">
/**
 * GlobalModal.vue - 業務邏輯層
 * 負責渲染由 useModal 管理的所有彈窗，並介接至介面層 (IModal)
 */
import { ref } from 'vue'
import type { ModalInstance } from '../../composables/useModal'
import IModal from '../uiInterface/IModal.vue'

const { modals } = useModal()

// 儲存動態元件的實例引用 (Key: modal.id, Value: Component Instance)
const componentRefs = ref(new Map<string, any>())

const setComponentRef = (el: any, id: string) => {
  if (el) {
    componentRefs.value.set(id, el)
  } else {
    componentRefs.value.delete(id)
  }
}

// 監聽 Global State 變更
// 注意：這裡負責將 useModal 的狀態同步給 IModal
// 但 IModal 內部的操作 (Confirm/Cancel) 會反過來觸發這裡的 handleConfirm/Cancel

/**
 * 處理確認
 * 功能升級：支援元件攔截 (Interception)
 * @param modal
 */
const handleConfirm = async (modal: ModalInstance) => {
  // 1. 檢查該彈窗是否有掛載元件
  const componentInstance = componentRefs.value.get(modal.id)

  // 2. 如果元件有定義 onConfirm，先執行它
  if (componentInstance && typeof componentInstance.onConfirm === 'function') {
    try {
      // 呼叫元件內部的 onConfirm
      // 規則：回傳 false 代表「驗證失敗/阻止關閉」，回傳 true 或 undefined 代表「成功」
      const result = await componentInstance.onConfirm()
      if (result === false) {
        return // 阻止關閉
      }
    } catch (e) {
      console.error('Component onConfirm error:', e)
      return // 發生錯誤也阻止關閉
    }
  }

  // 3. 通過攔截，執行標準關閉流程
  modal.onConfirm?.()
}

const handleCancel = (modal: ModalInstance) => {
  modal.onCancel?.()
}

/**
 * 處理狀態同步
 * @param val - 是否顯示
 * @param modal - 彈窗實例
 */
const handleUpdate = (val: boolean, modal: ModalInstance) => {
  // 如果是關閉 (false)，且設定為不可持續 (可點遮罩關閉)，則視為取消
  if (!val && !modal.config.persistent && modal.onCancel) {
    modal.onCancel()
  }
}
</script>

<template>
  <div class="global-modal-container">
    <IModal
      v-for="modal in modals"
      :key="modal.id"
      :model-value="modal.isVisible"
      :title="modal.config.title"
      :content="modal.config.content"
      :confirm-text="modal.config.confirmText"
      :cancel-text="modal.config.cancelText"
      :show-cancel="modal.config.showCancel"
      :close-on-mask="modal.config.closeOnMask"
      @update:model-value="(val) => handleUpdate(val, modal)"
      @confirm="() => handleConfirm(modal)"
      @cancel="() => handleCancel(modal)"
    >
      <!-- 動態渲染自訂內容 (Slot) -->
      <component
        :is="modal.config.component"
        v-if="modal.config.component"
        :ref="(el: any) => setComponentRef(el, modal.id)"
        v-bind="modal.config.componentProps"
      />
    </IModal>
  </div>
</template>
