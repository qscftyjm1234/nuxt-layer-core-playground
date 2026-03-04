<script setup lang="ts">
// 組件說明頁面
const { data: page } = await useAsyncData('doc-button', () => 
  queryContent('/components/buttons').findOne()
)

useHead({
  title: 'IButton 按鈕組件 - SL Core'
})
</script>

<template>
  <div class="component-page">
    <header class="mb-10">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">IButton</h1>
      <p class="text-xl text-gray-500">標準化按鈕組件，支援多種樣式與自動 Loading。</p>
    </header>

    <section class="demo-section my-10">
      <h2 class="text-2xl font-semibold mb-4 text-primary">即時展示 (Live Demo)</h2>
      <div class="glass-card flex gap-4 justify-center items-center py-10">
        <ClientOnly>
          <IButton variant="primary">Primary</IButton>
          <IButton variant="outlined">Outlined</IButton>
          <IButton variant="primary" loading>Loading</IButton>
        </ClientOnly>
      </div>
    </section>

    <div v-if="page" class="prose-section mt-10">
      <h2 class="text-2xl font-semibold mb-4 text-primary border-b pb-2">詳細文件</h2>
      <div class="prose">
        <ContentRenderer :value="page" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.component-page {
  max-width: 900px;
}
.text-primary {
  color: var(--docs-primary);
}
</style>
