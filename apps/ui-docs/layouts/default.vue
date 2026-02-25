<template>
  <div class="docs-layout">
    <!-- Header -->
    <header class="docs-header">
      <div class="header-container">
        <div class="brand">
          <img src="/images/softleader_logo.png" alt="SoftLeader Logo" class="logo" />
          <span class="brand-name">SoftLeader Nuxt Core</span>
        </div>
        <div class="header-actions">
          <div class="search-box">
            <input type="text" placeholder="搜尋組件..." />
          </div>
          <a href="https://github.com" target="_blank" class="github-link">GitHub</a>
        </div>
      </div>
    </header>

    <div class="main-container">
      <!-- Sidebar -->
      <aside class="docs-sidebar">
        <nav class="sidebar-nav">
          <div class="nav-section">
            <h4 class="section-title">開發指南</h4>
            <ul class="nav-list">
              <li><NuxtLink to="/" class="nav-link">快速開始</NuxtLink></li>
              <li><NuxtLink to="/showcase/component-showcase" class="nav-link">元件庫總覽</NuxtLink></li>
              <li><NuxtLink to="/showcase/development" class="nav-link">開發指南</NuxtLink></li>
              <li><NuxtLink to="/showcase/tokens" class="nav-link">設計規範 (Tokens)</NuxtLink></li>
            </ul>
          </div>

          <div class="nav-section">
            <h4 class="section-title">基礎元件 (Interface)</h4>
            <ul class="nav-list">
              <li v-for="comp in interfaceComponents" :key="comp">
                <NuxtLink :to="`/showcase/components/${comp}`" class="nav-link">{{ comp }}</NuxtLink>
              </li>
            </ul>
          </div>

          <div class="nav-section">
            <h4 class="section-title">業務元件 (Business)</h4>
            <ul class="nav-list">
              <li v-for="comp in businessComponents" :key="comp">
                <NuxtLink :to="`/showcase/components/${comp}`" class="nav-link">{{ comp }}</NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <!-- Content -->
      <main class="docs-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const interfaceComponents = [
  'IButton', 'IInput', 'ISelect', 'ICheckbox', 'IRadio', 'ISwitch', 
  'IAlert', 'IModal', 'ISnackbar', 'ICard', 'ITextField', 'ITextarea',
  'IAvatar', 'IChip', 'IDataTable', 'IDatePicker', 'IIcon'
].sort()

const businessComponents = [
  'CitySelect', 'CountrySelect', 'DateRangePicker', 'PhoneInput', 
  'EmailInput', 'PasswordInput', 'SmartTable', 'SmartComplexWidget'
].sort()
</script>

<style scoped>
.docs-layout {
  min-height: 100vh;
  background-color: #f8fafc;
  color: #1e293b;
  font-family: 'Inter', -apple-system, sans-serif;
}

.docs-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e2e8f0;
  height: 64px;
}

.header-container {
  max-width: 1440px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.brand-name {
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: -0.025em;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.search-box {
  position: relative;
  width: 240px;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 0.875rem;
}

.search-box input {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.25rem;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  background-color: #f1f5f9;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.search-box input:focus {
  outline: none;
  background-color: white;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.github-link {
  color: #64748b;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.github-link:hover {
  color: #1e293b;
}

.main-container {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
}

.docs-sidebar {
  width: 280px;
  height: calc(100vh - 64px);
  position: sticky;
  top: 64px;
  border-right: 1px solid #e2e8f0;
  padding: 2rem;
  overflow-y: auto;
  background-color: white;
}

.nav-section {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #94a3b8;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: block;
  padding: 0.5rem 0;
  color: #475569;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-link:hover {
  color: #3b82f6;
}

.nav-link.router-link-active {
  color: #2563eb;
  font-weight: 600;
}

.docs-content {
  flex: 1;
  padding: 3rem 4rem;
  background-color: white;
}
</style>
