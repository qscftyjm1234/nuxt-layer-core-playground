<script setup lang="ts">
/**
 * ShowcaseSection
 * 業務邏輯層元件 (Business Layer)
 * 使用 ICard 封裝展示區塊
 */

interface Props {
  title?: string
  icon?: string
}

defineProps<Props>()
</script>

<template>
  <div class="showcase-section-wrapper">
    <div class="section-header">
      <h2 class="section-title">
        <IIcon
          v-if="icon"
          :icon="icon"
          class="title-icon"
        />
        <span class="title-text">{{ title }}</span>
      </h2>
      <div class="title-decoration"></div>
    </div>
    <div class="section-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.showcase-section-wrapper {
  margin-bottom: 5rem;
  position: relative;
}

.section-header {
  margin-bottom: 2rem;
  position: relative;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #f8fafc;
  margin: 0 0 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  letter-spacing: -0.02em;
}

.title-icon {
  color: #38bdf8;
  font-size: 2rem;
}

.section-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.title-decoration {
  height: 1px;
  background: linear-gradient(90deg, #38bdf8 0%, rgba(56, 189, 248, 0) 100%);
  width: 100%;
  max-width: 300px;
  position: relative;
}

.title-decoration::after {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 32px;
  height: 3px;
  background: #38bdf8;
  border-radius: 2px;
}
</style>
