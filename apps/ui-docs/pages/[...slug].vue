<script setup lang="ts">
const route = useRoute()

// 手動查詢內容，這比 <ContentDoc /> 更靈活
const { data: page } = await useAsyncData(`content-${route.path}`, () => 
  queryContent(route.path).findOne()
)

// 如果找不到頁面，可以自定義錯誤處理
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// 動態設定 SEO 標題
useHead({
  title: page.value?.title ? `${page.value.title} - SL Core` : 'SL Core Docs'
})
</script>

<template>
  <div class="prose">
    <!-- 使用 ContentRenderer 渲染查詢到的資料 -->
    <ContentRenderer v-if="page" :value="page">
      <template #empty>
        <div class="text-center py-20">
          <p>此頁面尚無內容。</p>
        </div>
      </template>
    </ContentRenderer>
  </div>
</template>

<style scoped>
/* SAAS 風格的排版優化 */
.prose {
  max-width: 100%;
}

:deep(.prose) {
  --tw-prose-headings: var(--docs-primary);
}
</style>
