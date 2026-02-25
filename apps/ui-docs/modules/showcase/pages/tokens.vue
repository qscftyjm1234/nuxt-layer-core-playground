<template>
  <div class="tokens-page-wrapper">
    <!-- Back Button -->
    <div class="fixed top-6 left-6 z-50">
      <NuxtLink to="/showcase/component-showcase" class="back-btn group">
        <IIcon icon="mdi-arrow-left" size="20" />
        <span class="back-text">返回總覽</span>
      </NuxtLink>
    </div>

    <!-- Background Orbs (Consistent with Showcase) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-[5%] right-[10%] w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-3xl animate-float-slow-delayed"></div>
    </div>

    <div class="content-container relative z-10">
      
      <!-- Hero Section -->
      <header class="page-header">
        <div class="header-content">
          <h1 class="page-title">設計規範</h1>
          <p class="page-desc">定義我們數位產品的視覺語言與基礎元素。</p>
        </div>
      </header>

      <!-- Main Grid Layout -->
      <div class="tokens-grid">
        
        <!-- Colors Section -->
        <section class="token-section">
          <div class="section-header">
            <h2 class="section-title">色彩系統 (Colors)</h2>
            <p class="section-desc">傳遞品牌識別與狀態的核心色彩。</p>
          </div>
          
          <div class="color-palette-grid">
            <!-- Primary -->
            <div class="palette-group">
              <h3 class="palette-title">主色調 (Primary)</h3>
              <div class="swatches">
                <div v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]" 
                     :key="shade" 
                     class="swatch group"
                     :style="{ backgroundColor: `var(--color-primary-${shade})` }">
                  <div class="swatch-tooltip">{{ shade }}</div>
                </div>
              </div>
            </div>
            
            <!-- Neutrals -->
            <div class="palette-group">
              <h3 class="palette-title">中性色 (Neutrals)</h3>
              <div class="swatches">
                <div v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]" 
                     :key="shade" 
                     class="swatch group"
                     :style="{ backgroundColor: `var(--color-gray-${shade})` }">
                  <div class="swatch-tooltip">{{ shade }}</div>     
                </div>
              </div>
            </div>

            <!-- Semantic -->
            <div class="palette-group">
              <h3 class="palette-title">語意色 (Semantic)</h3>
              <div class="flex gap-3">
                <div class="semantic-chip bg-emerald-500 text-white">Success</div>
                <div class="semantic-chip bg-amber-500 text-white">Warning</div>
                <div class="semantic-chip bg-rose-500 text-white">Danger</div>
                <div class="semantic-chip bg-sky-500 text-white">Info</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Typography Section -->
        <section class="token-section">
          <div class="section-header">
            <h2 class="section-title">字型排版 (Typography)</h2>
            <p class="section-desc">清晰、易讀且具有層次感的文字規範。</p>
          </div>
          
          <div class="type-scale-list">
            <div class="type-row">
              <span class="type-sample text-4xl font-bold">Display 4XL</span>
              <span class="type-meta">text-4xl / 700</span>
            </div>
            <div class="type-row">
              <span class="type-sample text-2xl font-bold">Heading 2XL</span>
              <span class="type-meta">text-2xl / 700</span>
            </div>
            <div class="type-row">
              <span class="type-sample text-xl font-semibold">Title XL</span>
              <span class="type-meta">text-xl / 600</span>
            </div>
            <div class="type-row">
              <span class="type-sample text-base">Body Base - The quick brown fox jumps over the lazy dog.</span>
              <span class="type-meta">text-base / 400</span>
            </div>
            <div class="type-row">
              <span class="type-sample text-sm text-slate-500">Caption Small - 輔助說明文字</span>
              <span class="type-meta">text-sm / 400</span>
            </div>
          </div>
        </section>

        <!-- Spacing & Radius -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section class="token-section">
            <div class="section-header">
              <h2 class="section-title">間距 (Spacing)</h2>
            </div>
            <div class="spacing-visuals">
              <div v-for="space in [4, 8, 16, 24, 32]" :key="space" class="spacing-block">
                <div class="spacing-box" :style="{ width: space + 'px', height: space + 'px' }"></div>
                <span class="spacing-label">{{ space }}px</span>
              </div>
            </div>
          </section>

          <section class="token-section">
            <div class="section-header">
              <h2 class="section-title">圓角 (Radius)</h2>
            </div>
            <div class="radius-visuals">
              <div class="radius-box rounded-sm">SM</div>
              <div class="radius-box rounded-md">MD</div>
              <div class="radius-box rounded-lg">LG</div>
              <div class="radius-box rounded-xl">XL</div>
              <div class="radius-box rounded-full">Full</div>
            </div>
          </section>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.tokens-page-wrapper {
  min-height: 100vh;
  background: #f8fafc; /* Matches Showcase */
  color: #1e293b;
  padding: 4rem 2rem;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.content-container {
  max-width: 1000px; /* Matches Showcase max-width */
  margin: 0 auto;
}

/* Header */
.page-header {
  margin-bottom: 4rem; /* Reduced from 12rem */
  text-align: left;
}

.page-title {
  font-size: 2.5rem; /* Matches Showcase H1 */
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.page-desc {
  font-size: 1.1rem;
  color: #64748b;
}

/* Back Button */
.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 99px;
  color: #64748b;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.back-btn:hover {
  background: white;
  color: #4f46e5;
  transform: translateX(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.back-text {
  /* Always visible now for better UX, or keep reveal if preferred */
  margin-left: 0.25rem;
}


/* Sections */
.token-section {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
  /* No border, soft shadow */
}

.section-header {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.section-desc {
  color: #64748b;
}

/* Color Palette */
.color-palette-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.palette-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.palette-title {
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #64748b;
  letter-spacing: 0.05em;
}

.swatches {
  display: flex;
  gap: 4px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
}

.swatch {
  flex: 1;
  position: relative;
  cursor: pointer;
  transition: flex 0.3s ease;
}

.swatch:hover {
  flex: 2;
}

.swatch-tooltip {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: white; /* Auto contrast needed ideally, simplified here */
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.swatch:hover .swatch-tooltip {
  opacity: 1;
}

.semantic-chip {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Typography */
.type-scale-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.type-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.type-row:last-child {
  border-bottom: none;
}

.type-meta {
  font-family: monospace;
  color: #94a3b8;
  font-size: 0.8rem;
}

/* Visuals */
.spacing-visuals {
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
}

.spacing-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.spacing-box {
  background: #6366f1;
  border-radius: 4px;
  opacity: 0.2;
}

.spacing-label {
  font-size: 0.75rem;
  color: #64748b;
  font-family: monospace;
}

.radius-visuals {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.radius-box {
  width: 60px;
  height: 60px;
  background: white;
  border: 2px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 600;
}

/* Animations */
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
.animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
.animate-float-slow-delayed { animation: float-slow 25s ease-in-out infinite; animation-delay: -5s; }

</style>
