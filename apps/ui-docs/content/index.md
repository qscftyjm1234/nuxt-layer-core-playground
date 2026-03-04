---
title: Softleader Nuxt Core 核心文件
navigation: true
---

<div class="hero">
  <h1>🚀 開發者中心</h1>
  <p style="font-size: 1.25rem; color: #6b7280; max-width: 600px; margin: 0 auto;">
    企業級 Nuxt 3 核心架構文件。這裡紀錄了所有基礎設施、UI 組件以及開發範例。
  </p>
</div>

## 核心亮點

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem;">
  <div class="glass-card">
    <h3>⚡ 零配置自動掃描</h3>
    <p>Repository 與 Options 自動生成型別，省去手動定義的煩惱。</p>
  </div>
  <div class="glass-card">
    <h3>💎 強型別配置</h3>
    <p>結合 JSON Schema 與 appConfig，提供極佳的 IDE 自動補全。</p>
  </div>
  <div class="glass-card">
    <h3>🧩 標準 UI 介面</h3>
    <p>統一封裝 Vuetify/AntDV，確保全專案風格一致且易於維護。</p>
  </div>
  <div class="glass-card">
    <h3>🛠️ 高效開發流</h3>
    <p>Monorepo 架構支援免推版即時測試，開發體驗極速前進。</p>
  </div>
</div>

---

## 快速開始

1. **繼承核心層**：在 `nuxt.config.ts` 中設定 `extends: ['softleader-nuxt-core']`。
2. **配置環境**：在 `configs/default.json` 設定您的專案參數。
3. **即刻使用**：直接調用 `IButton` 與 `useApi`，享受自動補全。

[查閱組件文檔](/components/buttons)
