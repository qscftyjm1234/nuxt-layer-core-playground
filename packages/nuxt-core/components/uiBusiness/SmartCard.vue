<script setup lang="ts">
/**
 * 業務元件 - 智慧卡片元件
 *
 * 用途：封裝卡片的業務邏輯與標準樣式
 * 特點：
 * - 整合標題、圖標與內容的標準排版
 * - 支援透過 props 設定樣式與海拔高度
 * - Slot 透傳，支援自定義內容
 */
import ICard from '../uiInterface/ICard.vue'
import IIcon from '../uiInterface/IIcon.vue'

interface Props {
  title?: string
  subtitle?: string
  text?: string
  icon?: string
  color?: string
  elevation?: number
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  text: '',
  icon: '',
  color: 'white',
  elevation: 1
})

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <ICard
    v-bind="$attrs"
    :title="title"
    :subtitle="subtitle"
    :color="color"
    :elevation="elevation"
    class="smart-card"
  >
    <!-- 圖標標題 -->
    <div
      v-if="icon"
      class="smart-card__icon"
    >
      <IIcon
        :icon="icon"
        :size="24"
      />
    </div>

    <!-- 文字內容 -->
    <p
      v-if="text"
      class="smart-card__text"
    >
      {{ text }}
    </p>

    <!-- 支援子元件渲染 -->
    <div
      v-if="$slots.default"
      class="smart-card__content"
    >
      <slot />
    </div>
  </ICard>
</template>

<style scoped>
.smart-card {
  max-width: 600px;
  margin: 0 auto;
}

.smart-card__icon {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #38bdf8; /* Sky Blue highlight */
}

.smart-card__text {
  margin: 0;
  color: #94a3b8; /* Slate 400 */
  line-height: 1.6;
}

.smart-card__content {
  margin-top: 1rem;
}
</style>
