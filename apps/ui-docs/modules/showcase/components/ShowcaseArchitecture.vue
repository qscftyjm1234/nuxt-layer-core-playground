<script setup lang="ts">
/**
 * ShowcaseArchitecture
 * 業務邏輯層元件 (Business Layer)
 * 使用 ICard 展示架構圖 - Dark Mode Style
 */

</script>

<template>
  <div class="architecture-diagram">
    <!-- Page Layer -->
    <div class="layer-wrapper">
      <div class="layer-number page-num">3</div>
      <ICard
        class="layer-card page-layer"
        variant="outlined"
      >
        <div class="card-content">
          <h3>頁面層</h3>
          <ul class="responsibility-list">
            <li>負責排版與佈局</li>
            <li>不包含業務邏輯</li>
            <li>直接使用 Business 元件</li>
          </ul>
          <div class="code-preview">
            <code>&lt;EmailInput v-model="email" /&gt;</code>
          </div>
        </div>
      </ICard>
    </div>

    <div class="arrow-container">
      <div class="arrow-line" />
      <div class="arrow-label">使用</div>
      <IIcon
        icon="mdi-arrow-down"
        class="arrow-icon"
      />
    </div>

    <!-- Business Layer -->
    <div class="layer-wrapper">
      <div class="layer-number business-num">2</div>
      <ICard
        class="layer-card business-layer"
        variant="outlined"
      >
        <div class="card-content">
          <h3>業務邏輯層</h3>
          <ul class="responsibility-list">
            <li>封裝業務規則 (驗證/格式化)</li>
            <li>處理 API 互動與狀態</li>
            <li>跨頁面複用邏輯</li>
          </ul>
          <div class="principles-list">
            <span class="principles-title">開發原則：</span>
            <ul>
              <li>
                <IIcon
                  icon="mdi-star-four-points-small"
                  size="small"
                  class="text-amber-400"
                />
                <span>定義「業務語言」 (如 status)</span>
              </li>
              <li>
                <IIcon
                  icon="mdi-star-four-points-small"
                  size="small"
                  class="text-amber-400"
                />
                <span>屏蔽「實作細節」 (如 color)</span>
              </li>
              <li>
                <IIcon
                  icon="mdi-star-four-points-small"
                  size="small"
                  class="text-amber-400"
                />
                <span>自動轉換對應樣式</span>
              </li>
            </ul>
          </div>
          <div class="code-preview">
            <code>components/uiBusiness/EmailInput.vue</code>
          </div>
        </div>
      </ICard>
    </div>

    <div class="arrow-container">
      <div class="arrow-line" />
      <div class="arrow-label">呼叫</div>
      <IIcon
        icon="mdi-arrow-down"
        class="arrow-icon"
      />
    </div>

    <!-- Interface Layer -->
    <div class="layer-wrapper">
      <div class="layer-number interface-num">1</div>
      <ICard
        class="layer-card interface-layer"
        variant="outlined"
      >
        <div class="card-content">
          <h3>介面層</h3>
          <ul class="responsibility-list">
            <li>UI 框架設定入口</li>
            <li>隔離底層 UI 依賴</li>
            <li>提供統一 Props 定義</li>
          </ul>
          <div class="principles-list">
            <span class="principles-title">開發原則：</span>
            <ul>
              <li>
                <IIcon
                  icon="mdi-star-four-points-small"
                  size="small"
                  class="text-amber-400"
                />
                <span>只負責顯示畫面</span>
              </li>
              <li>
                <IIcon
                  icon="mdi-star-four-points-small"
                  size="small"
                  class="text-amber-400"
                />
                <span>名字要通用</span>
              </li>
              <li>
                <IIcon
                  icon="mdi-star-four-points-small"
                  size="small"
                  class="text-amber-400"
                />
                <span>多用 Slot 留彈性</span>
              </li>
            </ul>
          </div>
          <div class="code-preview">
            <code>components/uiInterface/IInput.vue</code>
          </div>
        </div>
      </ICard>
    </div>
  </div>
</template>

<style scoped>
.architecture-diagram {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 2rem;
  width: 100%;
}

.layer-wrapper {
  display: flex;
  align-items: stretch;
  gap: 1.5rem;
  position: relative;
  z-index: 2;
}

.layer-number {
  flex-shrink: 0;
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  border-radius: 16px;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.page-num {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.business-num {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.interface-num {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.layer-card {
  flex: 1;
  border-width: 1px !important;
  backdrop-filter: blur(12px);
  background: rgba(30, 41, 59, 0.4) !important;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.layer-card:hover {
  transform: translateY(-2px);
}

/* Specific Styles for Layers */
.page-layer {
  border-color: rgba(16, 185, 129, 0.3) !important;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.05);
}

.business-layer {
  border-color: rgba(59, 130, 246, 0.3) !important;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.05);
}

.interface-layer {
  border-color: rgba(245, 158, 11, 0.3) !important;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.05);
}

.card-content h3 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.responsibility-list {
  margin: 0 0 1rem 0;
  padding-left: 1.25rem;
  color: #cad5e1;
  font-size: 0.95rem;
  line-height: 1.6;
}

.responsibility-list li {
  margin-bottom: 0.25rem;
}

.code-preview {
  background: rgba(15, 23, 42, 0.6);
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: inline-block;
  width: 100%;
}

.code-preview code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.85rem;
  color: #7dd3fc;
}

/* Deep selector to ensure padding is right */
.layer-card :deep(.v-card-text),
.layer-card :deep(.icard-body) {
  padding: 1.5rem !important;
}

/* Arrow Flow Styling */
.arrow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 2.5rem; /* Space between cards */
  position: relative;
  width: 64px; /* Match layer-number width to align center */
  z-index: 1;
}

.arrow-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.1);
  left: 50%;
  transform: translateX(-50%);
}

.arrow-icon {
  color: rgba(255, 255, 255, 0.3);
  font-size: 1.25rem;
  background: #0f172a; /* Hide line behind icon */
  z-index: 2;
}

.arrow-label {
  position: absolute;
  left: 70px; /* Offset from the arrow center */
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  white-space: nowrap;
}

.principles-list {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
}

.principles-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #fbbf24; /* Amber-400 */
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.principles-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.principles-list li {
  font-size: 0.85rem;
  color: #94a3b8;
  padding-left: 0;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.principles-list li :deep(.i-icon) {
  opacity: 0.8;
}
</style>
