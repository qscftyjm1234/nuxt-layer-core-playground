<template>
  <div class="docs-home">
    <div class="hero">
      <h1 class="hero__title">Nuxt Core UI 文件</h1>
      <p class="hero__subtitle">完整的設計系統與元件文件</p>
    </div>

    <div class="nav-cards">
      <NuxtLink to="/components" class="nav-card">
        <Card variant="elevated" padding="lg">
          <h2 class="nav-card__title">元件展示</h2>
          <p class="nav-card__description">瀏覽所有可用的 UI 元件與使用範例</p>
        </Card>
      </NuxtLink>

      <NuxtLink to="/layouts" class="nav-card">
        <Card variant="elevated" padding="lg">
          <h2 class="nav-card__title">Layout 範例</h2>
          <p class="nav-card__description">查看不同的頁面佈局選項</p>
        </Card>
      </NuxtLink>

      <NuxtLink to="/tokens" class="nav-card">
        <Card variant="elevated" padding="lg">
          <h2 class="nav-card__title">設計 Tokens</h2>
          <p class="nav-card__description">色彩、間距、字型等設計規範</p>
        </Card>
      </NuxtLink>
    </div>

    <div class="quick-start mt-xl">
      <Card variant="bordered" padding="lg">
        <h2 class="mb-md">快速開始</h2>
        <p class="mb-md">在你的 Nuxt 專案中使用 Core Layer：</p>
        <pre class="code-block"><code>// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@org/nuxt-core']
})</code></pre>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.docs-home {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: var(--spacing-3xl) 0;
  margin-bottom: var(--spacing-2xl);
}

.hero__title {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: var(--color-primary-600);
  margin-bottom: var(--spacing-md);
}

.hero__subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-gray-600);
}

.nav-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.nav-card {
  text-decoration: none;
  color: inherit;
  transition: transform var(--transition-base);
}

.nav-card:hover {
  transform: translateY(-4px);
}

.nav-card__title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-gray-800);
  margin-bottom: var(--spacing-sm);
}

.nav-card__description {
  color: var(--color-gray-600);
  line-height: 1.6;
}

.code-block {
  background-color: var(--color-gray-800);
  color: var(--color-gray-100);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
}
</style>
