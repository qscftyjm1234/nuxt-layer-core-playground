<template>
  <div class="welcome-container">
    <!-- 1. Background Engine: Grid + Floating Orbs (Motion) -->
    <div class="background-engine">
      <div class="grid-overlay"></div>
      <div class="ambient-glow glow-1 animate-float-slow"></div>
      <div class="ambient-glow glow-2 animate-float-delayed"></div>
      <div class="ambient-glow glow-3 animate-float-fast"></div>
    </div>

    <!-- 2. Main Content Layout (Density & Structure) -->
    <main class="content-layout">
      <!-- Left: Messaging & Branding -->
      <section class="branding-area">
        <div class="branding-content animate-reveal">
          <h1 class="main-title">
            打造未來軟體
            <br />
            <span class="gradient-text">引領極致效能</span>
          </h1>

          <p class="hero-desc">
            您的專案
            <span class="highlight">{{ projectName }}</span>
            已順利啟動。
            <br />
            讓前端團隊能穩定且一致性的開發。
          </p>

          <div class="action-zone animate-reveal-delayed-2">
            <IButton
              size="large"
              class="prime-cta shadow-blue-500/25"
              @click="handleStart"
            >
              立即開始
              <IIcon
                icon="mdi-arrow-right"
                size="18"
                class="ml-2"
              />
            </IButton>

            <div class="meta-links">
              <a
                href="https://github.com"
                target="_blank"
                class="github-link"
              >
                <IIcon
                  icon="mdi-github"
                  size="20"
                  class="mr-2"
                />
                SOURCE
              </a>
              <span class="separator"></span>
              <div class="status-badge">
                <span class="dot pulse"></span>
                CORE v2.0
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Right: Showcase Area (Stronger Visuals) -->
      <section class="visual-area animate-reveal-delayed">
        <div class="showcase-stack">
          <!-- Glass Card: Architecture (Floating) -->
          <div class="showcase-card architecture-card hover-lift">
            <div class="card-icon blue">
              <IIcon
                icon="mdi-layers-triple-outline"
                size="24"
              />
            </div>
            <div class="card-details">
              <h4>Layered Engine</h4>
              <p>Multidimensional scaling</p>
            </div>
          </div>

          <!-- Glass Card: Performance (Floating) -->
          <div class="showcase-card performance-card hover-lift">
            <div class="card-icon emerald">
              <IIcon
                icon="mdi-lightning-bolt"
                size="24"
              />
            </div>
            <div class="card-details">
              <h4>Turbo Mode</h4>
              <p>Optimized bundle delivery</p>
            </div>
          </div>

          <!-- Main Visual: Code Window with Scanning (Motion/Density) -->
          <div class="code-window-card">
            <div class="window-header">
              <div class="window-dots">
                <span class="dot-red"></span>
                <span class="dot-amber"></span>
                <span class="dot-green"></span>
              </div>
              <span class="file-tab">nuxt.config.ts</span>
            </div>
            <div class="window-content">
              <div class="scan-line"></div>
              <div class="code-line">
                <span class="k">export</span>
                <span class="k">default</span>
                <span class="f">defineNuxtConfig</span>
                ({
              </div>
              <div class="code-line indent">
                <span class="p">extends</span>
                : [
                <span class="s">'@softleader/nuxt-core'</span>
                ],
              </div>
              <div class="code-line indent">
                <span class="p">modules</span>
                : [
                <span class="s">'@nuxtjs/tailwindcss'</span>
                ],
              </div>
              <div class="code-line indent">
                <span class="p">core</span>
                : {
              </div>
              <div class="code-line indent-2">
                <span class="p">mode</span>
                :
                <span class="s">'enterprise'</span>
                ,
              </div>
              <div class="code-line indent-2">
                <span class="p">autoOptimization</span>
                :
                <span class="v">true</span>
              </div>
              <div class="code-line indent">}</div>
              <div class="code-line">})</div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 4. Scroll Indicator (Motion) -->
    <div class="scroll-indicator animate-bounce-slow">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <span class="scroll-text">SCROLL TO EXPLORE</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IIcon from '../uiInterface/IIcon.vue'
import IButton from '../uiInterface/IButton.vue'

const runtimeConfig = useRuntimeConfig()
const productConfig = runtimeConfig.public.app.productConfig as any

const projectName = computed(() => productConfig?.meta?.title || 'Softleader Project')
const handleStart = () => {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
}
</script>

<style scoped>
.welcome-container {
  min-height: 100vh;
  background-color: #f8fafc;
  color: #0f172a;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
}

/* Background Visuals */
.background-engine {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, #e2e8f0 1px, transparent 1px),
    linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(circle at 50% 50%, white, transparent 90%);
  opacity: 0.15;
}

.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.35;
}

.glow-1 {
  top: -15%;
  right: -5%;
  width: 50vw;
  height: 50vw;
  background: rgba(59, 130, 246, 0.1);
}
.glow-2 {
  bottom: -10%;
  left: -5%;
  width: 45vw;
  height: 45vw;
  background: rgba(124, 58, 237, 0.08);
}
.glow-3 {
  top: 30%;
  left: 50%;
  width: 30vw;
  height: 30vw;
  background: rgba(14, 165, 233, 0.05);
}

/* Layout Structure */
.content-layout {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1240px;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 80px;
}

.branding-area {
  text-align: left;
}

/* Micro Labels & Headings */
.micro-label {
  font-size: 10px;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.5em;
  color: #94a3b8;
  margin-bottom: 1.25rem;
  display: inline-block;
}

.main-title {
  font-size: clamp(3.5rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.06em;
  margin-bottom: 1rem;
  color: #0f172a;
}

.gradient-text {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 1.25rem;
  color: #64748b;
  line-height: 1.8;
  max-width: 600px;
  margin-bottom: 2.5rem;
}

.highlight {
  color: #0f172a;
  font-weight: 700;
}

/* 3. Density: Stats Bar */
.stats-bar {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 2.5rem;
  padding: 12px 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 9px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #94a3b8;
}

.stat-divider {
  width: 1px;
  height: 24px;
  background: #e2e8f0;
}

/* Interaction Area */
.action-zone {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.prime-cta {
  background: #2563eb !important;
  color: white !important;
  width: fit-content !important;
  height: 68px !important;
  padding: 0 4rem !important;
  border-radius: 1.25rem !important;
  font-weight: 900 !important;
  font-size: 1.25rem !important;
  box-shadow: 0 25px 50px -12px rgba(37, 99, 235, 0.4) !important;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
}

.prime-cta:hover {
  transform: translateY(-4px) scale(1.04) !important;
  box-shadow: 0 35px 60px -15px rgba(37, 99, 235, 0.5) !important;
}
.prime-cta:active {
  transform: scale(0.96) !important;
}

.meta-links {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 12px;
  font-weight: 900;
  color: #94a3b8;
}

.github-link {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s;
}
.github-link:hover {
  color: #0f172a;
}

.separator {
  width: 1px;
  height: 16px;
  background: #e2e8f0;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 100px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.03);
}

/* Showcase Area */
.visual-area {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.showcase-stack {
  position: relative;
  width: 100%;
  max-width: 540px;
  height: 440px;
}

.showcase-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  padding: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 5;
  transition: all 0.6s ease;
}

.architecture-card {
  top: 5%;
  left: -5%;
  transform: rotate(-4deg);
}
.performance-card {
  top: 30%;
  left: 20%;
  transform: rotate(3deg);
}

.hover-lift:hover {
  z-index: 30;
  transform: translateY(-10px) rotate(0deg) scale(1.05);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-icon.blue {
  background: #eff6ff;
  color: #2563eb;
}
.card-icon.emerald {
  background: #ecfdf5;
  color: #10b981;
}

.card-details h4 {
  font-size: 15px;
  font-weight: 900;
  margin-bottom: 2px;
}
.card-details p {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
}

/* Code Window Component (Motion: Scan Line) */
.code-window-card {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 95%;
  background: #0f172a;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 45px 100px rgba(0, 0, 0, 0.25);
  z-index: 10;
  border: 1px solid #334155;
}

.scan-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.5), transparent);
  top: 0;
  animation: scan 3s linear infinite;
  z-index: 20;
}

@keyframes scan {
  from {
    top: 0;
  }
  to {
    top: 100%;
  }
}

.window-header {
  background: #1e293b;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #334155;
}
.window-dots {
  display: flex;
  gap: 8px;
}
.window-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot-red {
  background: #ff5f56;
}
.dot-amber {
  background: #ffbd2e;
}
.dot-green {
  background: #27c93f;
}
.file-tab {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #94a3b8;
  font-weight: 700;
}

.window-content {
  padding: 32px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  line-height: 1.7;
  text-align: left;
  position: relative;
}
.code-line {
  white-space: pre;
}
.indent {
  padding-left: 24px;
}
.indent-2 {
  padding-left: 48px;
}
.k {
  color: #f472b6;
}
.f {
  color: #fbbf24;
}
.p {
  color: #38bdf8;
}
.s {
  color: #4ade80;
}
.v {
  color: #818cf8;
}

/* Scroll Indicator (Motion) */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  opacity: 0.4;
  z-index: 15;
}

.mouse {
  width: 22px;
  height: 36px;
  border: 2px solid #0f172a;
  border-radius: 12px;
  position: relative;
}
.wheel {
  width: 2px;
  height: 6px;
  background: #0f172a;
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
  animation: scroll-wheel 2s infinite;
}
.scroll-text {
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: #0f172a;
}

@keyframes scroll-wheel {
  0% {
    opacity: 1;
    top: 6px;
  }
  100% {
    opacity: 0;
    top: 20px;
  }
}

/* Animations */
.animate-reveal {
  animation: reveal 1.2s cubic-bezier(0.23, 1, 0.32, 1) backwards;
}
.animate-reveal-delayed {
  animation: reveal 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.5s backwards;
}
.animate-reveal-delayed-2 {
  animation: reveal 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.8s backwards;
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float-slow {
  animation: float 10s ease-in-out infinite alternate;
}
.animate-float-delayed {
  animation: float 12s ease-in-out infinite alternate-reverse;
  animation-delay: 2s;
}
.animate-float-fast {
  animation: float 8s ease-in-out infinite alternate;
  animation-delay: 1s;
}

@keyframes float {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(40px, 40px) scale(1.1);
  }
}

.animate-bounce-slow {
  animation: bounce 3s ease-in-out infinite;
}
@keyframes bounce {
  0%,
  100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, 10px);
  }
}

.pulse {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

@media (max-width: 1024px) {
  .content-layout {
    grid-template-columns: 1fr;
    gap: 80px;
    text-align: center;
  }
  .branding-area {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .action-zone {
    align-items: center;
  }
  .stats-bar {
    justify-content: center;
  }
  .visual-area {
    padding-bottom: 100px;
  }
  .showcase-stack {
    transform: scale(0.9);
    height: 400px;
  }
}
</style>
