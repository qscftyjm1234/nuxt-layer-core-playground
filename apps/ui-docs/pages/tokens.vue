<template>
  <div class="tokens-page">
    <h1 class="page-title">設計 Tokens</h1>
    <p class="page-description">色彩、間距、字型等設計規範</p>

    <!-- Colors -->
    <section class="token-section">
      <h2 class="section-title">色彩（Colors）</h2>

      <div class="subsection">
        <h3 class="subsection-title">主色（Primary）</h3>
        <div class="color-grid">
          <div v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]" :key="shade" class="color-item">
            <div class="color-swatch" :style="{ backgroundColor: `var(--color-primary-${shade})` }"></div>
            <div class="color-label">
              <div class="color-name">primary-{{ shade }}</div>
              <div class="color-var">--color-primary-{{ shade }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="subsection">
        <h3 class="subsection-title">中性色（Gray）</h3>
        <div class="color-grid">
          <div v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]" :key="shade" class="color-item">
            <div class="color-swatch" :style="{ backgroundColor: `var(--color-gray-${shade})` }"></div>
            <div class="color-label">
              <div class="color-name">gray-{{ shade }}</div>
              <div class="color-var">--color-gray-{{ shade }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="subsection">
        <h3 class="subsection-title">語意色（Semantic）</h3>
        <div class="color-grid">
          <div class="color-item">
            <div class="color-swatch" style="background-color: var(--color-success)"></div>
            <div class="color-label">
              <div class="color-name">Success</div>
              <div class="color-var">--color-success</div>
            </div>
          </div>
          <div class="color-item">
            <div class="color-swatch" style="background-color: var(--color-warning)"></div>
            <div class="color-label">
              <div class="color-name">Warning</div>
              <div class="color-var">--color-warning</div>
            </div>
          </div>
          <div class="color-item">
            <div class="color-swatch" style="background-color: var(--color-error)"></div>
            <div class="color-label">
              <div class="color-name">Error</div>
              <div class="color-var">--color-error</div>
            </div>
          </div>
          <div class="color-item">
            <div class="color-swatch" style="background-color: var(--color-info)"></div>
            <div class="color-label">
              <div class="color-name">Info</div>
              <div class="color-var">--color-info</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Spacing -->
    <section class="token-section">
      <h2 class="section-title">間距（Spacing）</h2>
      <div class="spacing-grid">
        <div v-for="size in ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']" :key="size" class="spacing-item">
          <div class="spacing-visual" :style="{ width: `var(--spacing-${size})` }"></div>
          <div class="spacing-label">
            <div class="spacing-name">{{ size }}</div>
            <div class="spacing-var">--spacing-{{ size }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Typography -->
    <section class="token-section">
      <h2 class="section-title">字型（Typography）</h2>
      <div class="typography-grid">
        <div v-for="size in ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl']" :key="size" class="typography-item">
          <div class="typography-sample" :style="{ fontSize: `var(--font-size-${size})` }">
            Aa
          </div>
          <div class="typography-label">
            <div class="typography-name">{{ size }}</div>
            <div class="typography-var">--font-size-{{ size }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Border Radius -->
    <section class="token-section">
      <h2 class="section-title">圓角（Border Radius）</h2>
      <div class="radius-grid">
        <div v-for="size in ['sm', 'md', 'lg', 'xl', 'full']" :key="size" class="radius-item">
          <div class="radius-visual" :style="{ borderRadius: `var(--radius-${size})` }"></div>
          <div class="radius-label">
            <div class="radius-name">{{ size }}</div>
            <div class="radius-var">--radius-{{ size }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Shadows -->
    <section class="token-section">
      <h2 class="section-title">陰影（Shadows）</h2>
      <div class="shadow-grid">
        <div v-for="size in ['sm', 'md', 'lg', 'xl']" :key="size" class="shadow-item">
          <div class="shadow-visual" :style="{ boxShadow: `var(--shadow-${size})` }"></div>
          <div class="shadow-label">
            <div class="shadow-name">{{ size }}</div>
            <div class="shadow-var">--shadow-{{ size }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.tokens-page {
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

.token-section {
  margin-bottom: var(--spacing-3xl);
  padding-bottom: var(--spacing-2xl);
  border-bottom: 2px solid var(--color-gray-200);
}

.token-section:last-child {
  border-bottom: none;
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-primary-600);
  margin-bottom: var(--spacing-lg);
}

.subsection {
  margin-bottom: var(--spacing-xl);
}

.subsection-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-md);
}

/* Colors */
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--spacing-md);
}

.color-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.color-swatch {
  height: 80px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-gray-200);
}

.color-label {
  font-size: var(--font-size-sm);
}

.color-name {
  font-weight: 600;
  color: var(--color-gray-800);
}

.color-var {
  color: var(--color-gray-500);
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
}

/* Spacing */
.spacing-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.spacing-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.spacing-visual {
  height: 40px;
  background-color: var(--color-primary-500);
  border-radius: var(--radius-sm);
}

.spacing-label {
  font-size: var(--font-size-sm);
}

.spacing-name {
  font-weight: 600;
  color: var(--color-gray-800);
}

.spacing-var {
  color: var(--color-gray-500);
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
}

/* Typography */
.typography-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--spacing-lg);
}

.typography-item {
  text-align: center;
  padding: var(--spacing-md);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
}

.typography-sample {
  font-weight: 600;
  color: var(--color-gray-800);
  margin-bottom: var(--spacing-sm);
}

.typography-label {
  font-size: var(--font-size-sm);
}

.typography-name {
  font-weight: 600;
  color: var(--color-gray-700);
}

.typography-var {
  color: var(--color-gray-500);
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
}

/* Border Radius */
.radius-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--spacing-lg);
}

.radius-item {
  text-align: center;
}

.radius-visual {
  width: 100px;
  height: 100px;
  margin: 0 auto var(--spacing-md);
  background-color: var(--color-primary-500);
  border: 2px solid var(--color-primary-600);
}

.radius-label {
  font-size: var(--font-size-sm);
}

.radius-name {
  font-weight: 600;
  color: var(--color-gray-800);
}

.radius-var {
  color: var(--color-gray-500);
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
}

/* Shadows */
.shadow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--spacing-xl);
}

.shadow-item {
  text-align: center;
}

.shadow-visual {
  width: 100px;
  height: 100px;
  margin: 0 auto var(--spacing-md);
  background-color: white;
  border-radius: var(--radius-md);
}

.shadow-label {
  font-size: var(--font-size-sm);
}

.shadow-name {
  font-weight: 600;
  color: var(--color-gray-800);
}

.shadow-var {
  color: var(--color-gray-500);
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
}
</style>
