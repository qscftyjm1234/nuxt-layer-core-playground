<template>
  <div class="layouts-page">
    <h1 class="page-title">Layout 範例</h1>
    <p class="page-description">查看不同的頁面佈局選項</p>

    <section class="layout-section">
      <h2 class="section-title">Default Layout</h2>
      <p class="section-description">
        預設的頁面佈局，包含 header、main content 和 footer。所有頁面預設使用此 layout。
      </p>

      <Card variant="bordered" padding="lg">
        <h3 class="mb-md">使用方式</h3>
        <p class="mb-md">在頁面中不需要特別指定，預設就會使用 default layout：</p>
        <pre class="code-example"><code>&lt;template&gt;
  &lt;div&gt;
    &lt;!-- 你的頁面內容 --&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>

        <h3 class="mt-lg mb-md">Layout 結構</h3>
        <pre class="code-example"><code>&lt;div class="layout-default"&gt;
  &lt;header&gt;
    &lt;!-- Logo 和導航 --&gt;
  &lt;/header&gt;
  
  &lt;main&gt;
    &lt;!-- 頁面內容 --&gt;
  &lt;/main&gt;
  
  &lt;footer&gt;
    &lt;!-- 版權資訊 --&gt;
  &lt;/footer&gt;
&lt;/div&gt;</code></pre>

        <h3 class="mt-lg mb-md">自訂導航</h3>
        <p class="mb-md">可以透過 slot 自訂導航內容：</p>
        <pre class="code-example"><code>&lt;template&gt;
  &lt;NuxtLayout&gt;
    &lt;template #nav&gt;
      &lt;NuxtLink to="/"&gt;首頁&lt;/NuxtLink&gt;
      &lt;NuxtLink to="/about"&gt;關於&lt;/NuxtLink&gt;
    &lt;/template&gt;
    
    &lt;!-- 頁面內容 --&gt;
  &lt;/NuxtLayout&gt;
&lt;/template&gt;</code></pre>
      </Card>
    </section>

    <section class="layout-section">
      <h2 class="section-title">覆寫 Layout</h2>
      <p class="section-description">
        應用程式可以在自己的 `layouts/` 目錄中建立同名檔案來覆寫 Core Layer 的 layout。
      </p>

      <Card variant="bordered" padding="lg">
        <pre class="code-example"><code>// apps/your-app/layouts/default.vue
&lt;template&gt;
  &lt;div class="custom-layout"&gt;
    &lt;!-- 你的自訂 layout --&gt;
    &lt;slot /&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
      </Card>
    </section>
  </div>
</template>

<style scoped>
.layouts-page {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-gray-800);
  margin-bottom: var(--spacing-sm);
}

.page-description {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-2xl);
}

.layout-section {
  margin-bottom: var(--spacing-2xl);
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-primary-600);
  margin-bottom: var(--spacing-md);
}

.section-description {
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
}

.code-example {
  background-color: var(--color-gray-800);
  color: var(--color-gray-100);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  line-height: 1.6;
}

.code-example code {
  font-family: inherit;
}
</style>
