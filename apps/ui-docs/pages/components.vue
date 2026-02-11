<template>
  <div class="components-page">
    <h1 class="page-title">元件展示</h1>
    <p class="page-description">所有可用的 UI 元件與使用範例</p>

    <!-- Button Component -->
    <section class="component-section">
      <h2 class="component-title">Button 按鈕</h2>

      <div class="demo-block">
        <h3 class="demo-title">變體（Variants）</h3>
        <div class="demo-content">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <pre class="code-example"><code>&lt;Button variant="primary"&gt;Primary&lt;/Button&gt;
&lt;Button variant="secondary"&gt;Secondary&lt;/Button&gt;
&lt;Button variant="outline"&gt;Outline&lt;/Button&gt;
&lt;Button variant="ghost"&gt;Ghost&lt;/Button&gt;</code></pre>
      </div>

      <div class="demo-block">
        <h3 class="demo-title">尺寸（Sizes）</h3>
        <div class="demo-content">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <pre class="code-example"><code>&lt;Button size="sm"&gt;Small&lt;/Button&gt;
&lt;Button size="md"&gt;Medium&lt;/Button&gt;
&lt;Button size="lg"&gt;Large&lt;/Button&gt;</code></pre>
      </div>

      <div class="demo-block">
        <h3 class="demo-title">停用狀態（Disabled）</h3>
        <div class="demo-content">
          <Button disabled>Disabled Button</Button>
        </div>
        <pre class="code-example"><code>&lt;Button disabled&gt;Disabled Button&lt;/Button&gt;</code></pre>
      </div>
    </section>

    <!-- Card Component -->
    <section class="component-section">
      <h2 class="component-title">Card 卡片</h2>

      <div class="demo-block">
        <h3 class="demo-title">變體（Variants）</h3>
        <div class="demo-content card-grid">
          <Card variant="default">
            <template #header>Default Card</template>
            <p>預設樣式的卡片</p>
            <template #footer>Footer</template>
          </Card>

          <Card variant="bordered">
            <template #header>Bordered Card</template>
            <p>帶邊框的卡片</p>
          </Card>

          <Card variant="elevated">
            <template #header>Elevated Card</template>
            <p>帶陰影的卡片</p>
          </Card>
        </div>
        <pre class="code-example"><code>&lt;Card variant="default"&gt;
  &lt;template #header&gt;Default Card&lt;/template&gt;
  &lt;p&gt;預設樣式的卡片&lt;/p&gt;
  &lt;template #footer&gt;Footer&lt;/template&gt;
&lt;/Card&gt;</code></pre>
      </div>

      <div class="demo-block">
        <h3 class="demo-title">內距（Padding）</h3>
        <div class="demo-content card-grid">
          <Card padding="sm">
            <p>Small Padding</p>
          </Card>
          <Card padding="md">
            <p>Medium Padding</p>
          </Card>
          <Card padding="lg">
            <p>Large Padding</p>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.components-page {
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

.component-section {
  margin-bottom: var(--spacing-3xl);
  padding-bottom: var(--spacing-2xl);
  border-bottom: 2px solid var(--color-gray-200);
}

.component-section:last-child {
  border-bottom: none;
}

.component-title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-primary-600);
  margin-bottom: var(--spacing-lg);
}

.demo-block {
  margin-bottom: var(--spacing-xl);
}

.demo-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-md);
}

.demo-content {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  padding: var(--spacing-lg);
  background-color: white;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
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
