<template>
  <div class="layout-default">
    <header class="header">
      <div class="container">
        <h1 class="logo">{{ appName }}</h1>
        <nav class="nav">
          <slot name="nav" />
        </nav>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <slot />
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; {{ currentYear }} {{ appName }}. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const appName = config.public.appName

const currentYear = new Date().getFullYear()
</script>

<style scoped>
.layout-default {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: white;
  border-bottom: 1px solid var(--color-gray-200);
  padding: var(--spacing-md) 0;
  box-shadow: var(--shadow-sm);
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-primary-600);
  margin: 0;
}

.nav {
  display: flex;
  gap: var(--spacing-lg);
}

.main {
  flex: 1;
  padding: var(--spacing-2xl) 0;
}

.footer {
  background-color: var(--color-gray-800);
  color: var(--color-gray-200);
  padding: var(--spacing-lg) 0;
  text-align: center;
}

.footer p {
  margin: 0;
  font-size: var(--font-size-sm);
}
</style>
