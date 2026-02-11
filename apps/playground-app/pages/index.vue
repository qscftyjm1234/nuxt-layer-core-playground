<template>
  <div class="home-page">
    <h1 class="title">歡迎來到 Playground App</h1>
    <p class="subtitle">這是一個最小可執行的 Nuxt 3 系統，用於驗證 Core Layer 功能</p>

    <div class="demo-section mt-xl">
      <h2 class="section-title mb-md">元件展示</h2>

      <div class="button-demo mb-lg">
        <h3 class="mb-md">Button 元件</h3>
        <div class="button-group">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>

        <div class="button-group mt-md">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>

        <div class="button-group mt-md">
          <Button disabled>Disabled Button</Button>
        </div>
      </div>

      <div class="card-demo">
        <h3 class="mb-md">Card 元件</h3>

        <div class="card-grid">
          <Card variant="default">
            <template #header>Default Card</template>
            <p>這是一個預設樣式的卡片元件</p>
            <template #footer>Footer Content</template>
          </Card>

          <Card variant="bordered">
            <template #header>Bordered Card</template>
            <p>這是一個帶邊框的卡片元件</p>
          </Card>

          <Card variant="elevated">
            <template #header>Elevated Card</template>
            <p>這是一個帶陰影的卡片元件</p>
          </Card>
        </div>
      </div>
    </div>

    <div class="info-section mt-xl">
      <Card variant="elevated" padding="lg">
        <h3 class="mb-md">系統資訊</h3>
        <ul class="info-list">
          <li><strong>應用名稱:</strong> {{ appName }}</li>
          <li><strong>應用類型:</strong> {{ appType }}</li>
          <li><strong>當前時間:</strong> {{ currentTime }}</li>
        </ul>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const appName = config.public.appName
const appType = config.public.appType

const { formatDate } = useFormatDate()
const currentTime = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: var(--color-primary-600);
  margin-bottom: var(--spacing-md);
}

.subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-2xl);
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-gray-800);
}

.button-demo h3,
.card-demo h3 {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-gray-700);
}

.button-group {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.info-list {
  list-style: none;
  padding: 0;
}

.info-list li {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-gray-200);
}

.info-list li:last-child {
  border-bottom: none;
}

.info-list strong {
  color: var(--color-gray-700);
  margin-right: var(--spacing-sm);
}
</style>
