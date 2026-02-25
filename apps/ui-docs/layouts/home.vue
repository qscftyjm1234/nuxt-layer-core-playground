<template>
  <div class="home-layout">
    <!-- Header -->
    <header class="home-header">
      <div class="header-container">
        <div class="brand">
          <img src="/images/softleader_logo.png" alt="SoftLeader Logo" class="logo" />
          <span class="brand-name">SoftLeader Nuxt Core</span>
        </div>
        <div class="header-actions">
           <nav class="header-nav">
              <NuxtLink to="/showcase" class="nav-link">快速開始</NuxtLink>
              <NuxtLink to="/showcase/components/IButton" class="nav-link">組件庫</NuxtLink>
           </nav>
          <a href="https://github.com/softleader/nuxt-layer-core" target="_blank" class="github-link">GitHub</a>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="home-content">
      <slot />
    </main>

    <!-- Footer (Optional for home page) -->
    <footer class="home-footer">
      <div class="footer-container">
        <p>&copy; {{ new Date().getFullYear() }} SoftLeader. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.home-layout {
  min-height: 100vh;
  background-color: #f8fafc;
  color: #1e293b;
  font-family: 'Inter', -apple-system, sans-serif;
  display: flex;
  flex-direction: column;
}

.home-header {
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

.header-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #64748b;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #3b82f6;
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

.home-content {
  flex: 1;
  width: 100%;
}

.home-footer {
  margin-top: auto;
  border-top: 1px solid #e2e8f0;
  background-color: white;
  padding: 2rem 0;
}

.footer-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.875rem;
}
</style>
