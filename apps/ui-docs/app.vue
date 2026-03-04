<template>
  <div class="app-container">
    <aside class="sidebar">
      <div class="logo">
        <h2 style="color: var(--docs-primary); margin-top: 0;">SL Core</h2>
      </div>
      
      <nav class="nav-links">
        <div class="nav-section">
          <p style="text-transform: uppercase; font-size: 0.75rem; font-weight: 700; color: #9ca3af; margin-bottom: 1rem; margin-top: 2rem;">Introduction</p>
          <NuxtLink to="/" class="nav-item">🚀 快速開始</NuxtLink>
        </div>
        
        <div class="nav-section">
          <p style="text-transform: uppercase; font-size: 0.75rem; font-weight: 700; color: #9ca3af; margin-bottom: 1rem; margin-top: 2rem;">UI Components</p>
          <NuxtLink to="/components/button" class="nav-item">按鈕 IButton</NuxtLink>
          <NuxtLink to="/components/table" class="nav-item">表格 IDataTable</NuxtLink>
        </div>
      </nav>
    </aside>
    <main class="main-content">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.nav-item {
  display: block;
  padding: 0.6rem 0.8rem;
  color: #4b5563;
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  margin-bottom: 0.25rem;
}

.nav-item:hover {
  background: var(--docs-primary-glow);
  color: var(--docs-primary);
}

.router-link-active {
  background: var(--docs-primary-glow);
  color: var(--docs-primary);
  font-weight: 600;
}
</style>
