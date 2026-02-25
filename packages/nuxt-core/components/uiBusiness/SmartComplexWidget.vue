<script setup lang="ts">
/**
 * 業務元件 - 複雜智慧元件
 *
 * 用途：封裝複雜的業務邏輯與介面互動
 * 特點：
 * - 整合多個介面層元件 (ICard, ISheet, IAvatar...)
 * - 內部管理狀態 (State) 與操作歷史
 * - 展示複雜業務場景下的邏輯封裝範例
 */
import ICard from '../uiInterface/ICard.vue'
import ISheet from '../uiInterface/ISheet.vue'
import IButton from '../uiInterface/IButton.vue'
import IAvatar from '../uiInterface/IAvatar.vue'
import IChip from '../uiInterface/IChip.vue'

// 狀態管理
const count = ref(0)
const history = ref<string[]>([])

const increment = () => {
  count.value++
  history.value.unshift(`數值增加至 ${count.value} 於 ${new Date().toLocaleTimeString()}`)
}

const reset = () => {
  count.value = 0
  history.value = []
}

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <ICard
    v-bind="$attrs"
    :elevation="0"
    class="complex-widget"
  >
    <!-- 標題區 -->
    <div class="widget-header">
      <div class="widget-header__info">
        <div class="widget-overline">智慧元件</div>
        <h2 class="widget-title">複雜元件範例</h2>
        <p class="widget-subtitle">展示內部狀態管理與互動邏輯</p>
      </div>
      <IAvatar
        :size="48"
        color="rgba(56, 189, 248, 0.1)"
        rounded="8px"
      >
        <IIcon
          icon="mdi-cube-scan"
          class="text-[#38bdf8]"
        />
      </IAvatar>
    </div>

    <!-- 主要內容區 -->
    <ISheet
      color="rgba(255, 255, 255, 0.05)"
      rounded="12px"
      padding="1.5rem"
      class="widget-content"
    >
      <div class="content-display">
        <div>
          <div class="content-label">目前數值</div>
          <div class="content-value">{{ count }}</div>
        </div>

        <div class="content-actions">
          <IButton
            variant="primary"
            size="large"
            @click="increment"
          >
            增加數值
          </IButton>
          <IButton
            variant="text"
            size="small"
            color="#94a3b8"
            @click="reset"
          >
            重置狀態
          </IButton>
        </div>
      </div>
    </ISheet>

    <!-- 歷史紀錄區 -->
    <div class="widget-history">
      <div class="history-header">
        <span class="history-title">操作紀錄</span>
        <IChip
          size="small"
          color="#475569"
          text-color="white"
        >
          {{ history.length }}
        </IChip>
      </div>

      <div class="history-list">
        <TransitionGroup name="slide-fade">
          <div
            v-for="log in history"
            :key="log"
            class="history-item"
          >
            <span class="history-text">{{ log }}</span>
          </div>
        </TransitionGroup>

        <div
          v-if="history.length === 0"
          class="history-empty"
        >
          <div class="history-empty__text">尚無任何操作紀錄</div>
        </div>
      </div>
    </div>
  </ICard>
</template>

<style scoped>
.complex-widget {
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background: rgba(30, 41, 59, 0.4);
}

/* Header */
.widget-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 0;
}

.widget-header__info {
  flex: 1;
}

.widget-overline {
  font-size: 0.75rem;
  font-weight: bold;
  color: #38bdf8;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.widget-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #f8fafc;
  margin: 0;
}

.widget-subtitle {
  font-size: 0.875rem;
  color: #94a3b8;
  margin: 0.25rem 0 0;
}

/* Content */
.widget-content {
  margin: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.content-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.content-label {
  font-size: 0.75rem;
  font-weight: bold;
  color: #94a3b8;
  margin-bottom: 0.25rem;
}

.content-value {
  font-size: 3rem;
  font-weight: 900;
  color: #38bdf8;
}

.content-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* History */
.widget-history {
  padding: 0 1.5rem 1.5rem;
}

.history-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.history-title {
  font-size: 0.875rem;
  font-weight: bold;
  color: #ecc;
  color: #e2e8f0;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.history-text {
  font-size: 0.875rem;
  color: #cbd5e1;
}

.history-empty {
  text-align: center;
  padding: 2rem;
  border: 2px dashed rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.history-empty__text {
  font-size: 0.875rem;
  color: #64748b;
}

/* Transitions */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
