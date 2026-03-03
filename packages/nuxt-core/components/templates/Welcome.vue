<template>
  <div class="welcome-container">
    <!-- 1. Background Visual Engine -->
    <div class="background-engine">
      <div class="grid-overlay"></div>
      <div class="ambient-glow glow-1"></div>
      <div class="ambient-glow glow-2"></div>
    </div>

    <!-- 2. Main Content Layout (Asymmetric Structural Overhaul) -->
    <main class="content-layout">
      <!-- Left: Branding & Message Area -->
      <section class="branding-area">
        <div class="branding-content animate-reveal">
          <div class="micro-label">SOFTLEADER NUXT ARCHITECTURE</div>
          
          <h1 class="main-title">
            打造未來軟體<br />
            <span class="gradient-text">引領技術巔峰</span>
          </h1>
          
          <p class="hero-desc">
            您的專案 <span class="highlight">{{ projectName }}</span> 已順利啟動。<br />
            搭載原子化組件與動態常數系統，為企業級開發提供最專業的穩定守護。
          </p>

          <div class="action-zone">
            <IButton 
              size="large" 
              class="prime-cta shadow-blue-500/20"
              @click="handleStart"
            >
              立即開啟探索
              <IIcon icon="mdi-arrow-right" size="18" class="ml-2" />
            </IButton>
            
            <div class="meta-links">
              <a href="https://github.com" target="_blank" class="github-link">
                <IIcon icon="mdi-github" size="20" class="mr-2" />
                SOURCE CODE
              </a>
              <span class="separator"></span>
              <div class="status-badge">
                <span class="dot pulse"></span>
                CORE v2.0 READY
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Right: Showcase Area (Visual Center of Gravity) -->
      <section class="visual-area animate-reveal-delayed">
        <div class="showcase-stack">
          <!-- Glass Card: Architecture -->
          <div class="showcase-card architecture-card">
            <div class="card-icon blue"><IIcon icon="mdi-layers-outline" size="24" /></div>
            <div class="card-details">
              <h4>Layer Architecture</h4>
              <p>高度解耦、極速擴展</p>
            </div>
          </div>

          <!-- Glass Card: Performance -->
          <div class="showcase-card performance-card">
            <div class="card-icon emerald"><IIcon icon="mdi-lightning-bolt-outline" size="24" /></div>
            <div class="card-details">
              <h4>High Performance</h4>
              <p>原生極速開發體驗</p>
            </div>
          </div>

          <!-- Main Visual: Code/Config Block -->
          <div class="code-window-card">
            <div class="window-header">
              <div class="window-dots">
                <span class="dot-red"></span>
                <span class="dot-amber"></span>
                <span class="dot-green"></span>
              </div>
              <span class="file-tab">app.config.ts</span>
            </div>
            <div class="window-content">
              <div class="code-line"><span class="k">export</span> <span class="k">default</span> <span class="f">defineAppConfig</span>({</div>
              <div class="code-line indent"><span class="p">theme</span>: <span class="s">'slate'</span>,</div>
              <div class="code-line indent"><span class="p">premium</span>: <span class="v">true</span>,</div>
              <div class="code-line indent"><span class="p">layout</span>: <span class="s">'enterprise'</span></div>
              <div class="code-line">})</div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer Decorative -->
    <footer class="bottom-footer">
      <div class="legal-info">
        EST. 2026 &bull; DESIGNED FOR ENTERPRISE &bull; SOFTLEADER NUXT CORE
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IIcon from '../uiInterface/IIcon.vue'
import IButton from '../uiInterface/IButton.vue'

const runtimeConfig = useRuntimeConfig()
const productConfig = runtimeConfig.public.app.productConfig as any

const projectName = computed(() => productConfig?.meta?.title || 'Softleader Project')
const handleStart = () => { window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }) }
</script>

<style scoped>
/* 1. Color System - Slate 50 (Design System Prompt) */
.welcome-container {
  min-height: 100vh;
  background-color: #f8fafc;
  color: #0f172a;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
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
  background-image: radial-gradient(circle at 1px 1px, #e2e8f0 1.5px, transparent 0);
  background-size: 48px 48px;
  mask-image: radial-gradient(circle at 50% 50%, white, transparent 80%);
  opacity: 0.4;
}

.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.5;
}

.glow-1 { top: -10%; right: -5%; width: 45vw; height: 45vw; background: rgba(59, 130, 246, 0.08); }
.glow-2 { bottom: -10%; left: -5%; width: 40vw; height: 40vw; background: rgba(124, 58, 237, 0.05); }

/* Asymmetric Structural Overhaul (結構亮點) */
.content-layout {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1240px;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 60px;
}

/* Branding Area */
.branding-area {
  text-align: left;
}

.micro-label {
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: #94a3b8;
  margin-bottom: 2rem;
}

.main-title {
  font-size: clamp(3.2rem, 5.5vw, 4.8rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.05em;
  margin-bottom: 2.5rem;
  color: #0f172a;
}

.gradient-text {
  background: linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 1.25rem;
  color: #64748b;
  line-height: 1.8;
  max-width: 600px;
  margin-bottom: 3.5rem;
}

.highlight { color: #0f172a; font-weight: 700; }

.action-zone {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.prime-cta {
  background: #2563eb !important;
  color: white !important;
  width: fit-content !important;
  height: 64px !important;
  padding: 0 3.5rem !important;
  border-radius: 1rem !important;
  font-weight: 800 !important;
  font-size: 1.125rem !important;
  box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.4) !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}

.prime-cta:hover { transform: translateY(-3px) scale(1.03) !important; box-shadow: 0 25px 50px -12px rgba(37, 99, 235, 0.5) !important; }
.prime-cta:active { transform: scale(0.95) !important; }

.meta-links {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 13px;
  font-weight: 800;
  color: #94a3b8;
}

.github-link {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s;
}
.github-link:hover { color: #0f172a; }

.separator { width: 1px; height: 16px; background: #e2e8f0; }

.status-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 16px;
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 100px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.dot { width: 6px; height: 6px; background: #10b981; border-radius: 50%; }

/* Visual Area (Showcase Stack) */
.visual-area {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.showcase-stack {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 480px;
}

.showcase-card {
  position: absolute;
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 1.5rem;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 5;
  transition: all 0.5s ease;
}

.architecture-card {
  top: 10%;
  left: -10%;
  transform: rotate(-3deg);
}

.performance-card {
  top: 35%;
  left: 15%;
  transform: rotate(2deg);
}

.showcase-card:hover { z-index: 20; transform: translateY(-5px) rotate(0deg); }

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-icon.blue { background: #eff6ff; color: #2563eb; }
.card-icon.emerald { background: #ecfdf5; color: #10b981; }

.card-details h4 { font-size: 15px; font-weight: 800; margin-bottom: 2px; }
.card-details p { font-size: 12px; color: #94a3b8; }

/* Code Window Component */
.code-window-card {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 90%;
  background: #0f172a;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.2);
  z-index: 10;
  border: 1px solid #334155;
  transform: rotate(-1deg);
}

.window-header {
  background: #1e293b;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #334155;
}

.window-dots { display: flex; gap: 6px; }
.window-dots span { width: 8px; height: 8px; border-radius: 50%; }
.dot-red { background: #ff5f56; }
.dot-amber { background: #ffbd2e; }
.dot-green { background: #27c93f; }

.file-tab { font-family: monospace; font-size: 11px; color: #94a3b8; font-weight: 600; }

.window-content {
  padding: 24px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  text-align: left;
}

.code-line { white-space: pre; }
.indent { padding-left: 20px; }
.k { color: #f472b6; } .f { color: #fbbf24; } .p { color: #38bdf8; }
.s { color: #4ade80; } .v { color: #818cf8; }

/* Bottom Footer */
.bottom-footer {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}

.legal-info {
  font-size: 10px;
  font-weight: 900;
  color: #cbd5e1;
  letter-spacing: 0.2em;
}

/* Animations */
.animate-reveal { animation: reveal 1s cubic-bezier(0.23, 1, 0.32, 1) backwards; }
.animate-reveal-delayed { animation: reveal 1s cubic-bezier(0.23, 1, 0.32, 1) 0.4s backwards; }

@keyframes reveal {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.pulse { animation: pulse 2s infinite; }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }

/* Responsive */
@media (max-width: 1024px) {
  .content-layout { grid-template-columns: 1fr; gap: 60px; text-align: center; }
  .branding-area { display: flex; flex-direction: column; align-items: center; }
  .action-zone { align-items: center; }
  .visual-area { padding-bottom: 80px; }
  .showcase-stack { height: 420px; width: 100%; max-width: 400px; }
  .main-title { font-size: 3rem; }
}
</style>
