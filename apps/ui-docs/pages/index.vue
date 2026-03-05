<script setup lang="ts">
const router = useRouter()

// 首頁使用標準 Vue 頁面開發
// 具體指向 index 路徑，避免模糊匹配
const { data: home } = await useAsyncData('home-content', () => queryContent('/index').findOne())

useHead({
  title: 'Softleader Nuxt Core - 開發者中心'
})

function navigateToComponents() {
   router.push('/components/button')
}
</script>

<template>
  <div class="home-page">
    <div
      v-if="home"
      class="prose"
    >
      <ContentRenderer :value="home" />
    </div>

    <ClientOnly>
      <div class="cta-section mt-10">
        <IButton
          variant="primary"
          size="large"
          @click="navigateToComponents"
        >
          開始瀏覽組件庫
        </IButton>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.home-page {
  animation: fadeIn 0.5s ease-out;
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
</style>
