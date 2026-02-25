<script setup lang="ts">
/**
 * Icon Module Showcase
 * 展示 Icon 模組的使用方式，包含 MDI、SVG 與嵌套用法。
 * 風格對齊 component-showcase.vue
 */

import { ref } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseTabs from '../components/ShowcaseTabs.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'
import ShowcaseAlert from '../components/ShowcaseAlert.vue'

import { iconCategories } from '../data/mdi-icons'

// Tab 狀態管理
const activeTab = ref('concept') // concept, usage, playground
const tabOptions = [
  { label: '設計概念', value: 'concept' },
  { label: '使用範例', value: 'usage' },
  { label: '互動測試', value: 'playground' }
]

// MDI 速查表與搜尋
const searchQuery = ref('')
const totalIcons = computed(() =>
  Object.values(iconCategories).reduce((acc, curr) => acc + curr.length, 0)
)

const filteredCategories = computed(() => {
  if (!searchQuery.value) return iconCategories

  const query = searchQuery.value.toLowerCase()
  const result: Record<string, string[]> = {}

  for (const [category, icons] of Object.entries(iconCategories)) {
    const matched = icons.filter((icon) => icon.includes(query))
    if (matched.length > 0) {
      result[category] = matched
    }
  }
  return result
})

const copiedIcon = ref<string>('')
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  copiedIcon.value = text
  setTimeout(() => (copiedIcon.value = ''), 2000)
}

// Playground
const pSize = ref<string | number>('large')
const pColor = ref('#1976d2')
const pIcon = ref('mdi-rocket-launch')
const sizeOptions = ['x-small', 'small', 'default', 'large', 'x-large', 32, 48, 64]
const colorOptions = ['#1976d2', '#9e9e9e', '#4caf50', '#ff9800', '#f44336', '#E91E63']

// SVG Path 範例
const svgPath = 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'

definePageMeta({
  title: 'Icon 模組',
  icon: 'mdi-svg',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="Icon 模組"
    description="統一的圖示容器，支援 MDI 字體圖示、SVG Path 以及自定義 SVG 內容嵌套。"
  >
    <!-- Tab 導航 -->
    <ShowcaseTabs
      v-model="activeTab"
      :options="tabOptions"
      class="mb-6"
    />

    <!-- 1. 設計概念 -->
    <ShowcaseSection
      v-show="activeTab === 'concept'"
      title="設計概念"
    >
      <ShowcaseAlert
        title="設計理念"
        type="info"
        class="mb-6"
      >
        <ul class="benefit-list">
          <li>
            <strong class="text-sky-400">統一容器</strong>
            -
            <code>IIcon</code>
            就是個殼，負責處理大小和顏色，裡面放什麼都行。
          </li>
          <li>
            <strong class="text-sky-400">雙模支援</strong>
            - 完整支援內建 **MDI (Material Design Icons)** 與 **自定義 SVG**，滿足所有情境。
          </li>
          <li>
            <strong class="text-sky-400">想放啥放啥</strong>
            - 透過 Slot 可以塞自己的 SVG、圖片，甚至其他元件。
          </li>
        </ul>
      </ShowcaseAlert>

      <div class="component-grid">
        <ShowcaseCard title="架構示意">
          <div class="architecture-demo">
            <div class="layer layer-interface">
              <div class="layer-label">介面層</div>
              <div class="layer-content">
                <div class="icon-box">統一尺寸</div>
                <div class="icon-box">統一顏色</div>
              </div>
            </div>
            <div class="arrow">↓ 包含</div>
            <div class="layer layer-implementation">
              <div class="layer-label">實作層</div>
              <div class="layer-content">
                <div class="impl-box">MDI 字串</div>
                <div class="impl-box">SVG 路徑</div>
                <div class="impl-box">行內 SVG</div>
              </div>
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 2. 使用範例 -->
    <ShowcaseSection
      v-show="activeTab === 'usage'"
      title="使用範例"
    >
      <div class="component-grid">
        <!-- MDI -->
        <ShowcaseCard
          title="Material Design Icons (MDI)"
          description="使用 mdi- 前綴字串"
        >
          <div class="demo-area d-flex align-center gap-4">
            <IIcon
              icon="mdi-home"
              size="large"
              color="primary"
            />
            <IIcon
              icon="mdi-account"
              size="large"
              color="secondary"
            />
            <IIcon
              icon="mdi-bell"
              size="large"
              color="warning"
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<IIcon icon="mdi-home" color="primary" />'
              label="使用方式"
            />
          </template>
        </ShowcaseCard>

        <!-- SVG Path -->
        <ShowcaseCard
          title="SVG Path 字串"
          description="直接傳入 SVG Path Data"
        >
          <div class="demo-area">
            <IIcon
              :icon="svgPath"
              size="large"
              color="success"
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<!-- 直接傳入 path 資料 -->
<IIcon icon="M12,2A10,10 0 0,0 2,12..." />

<!-- 或是綁定變數 -->
<IIcon :icon="svgPathString" />'
              label="使用方式"
            />
          </template>
        </ShowcaseCard>

        <!-- Inline SVG (Slot) -->
        <ShowcaseCard
          title="行內 SVG (Slot)"
          description="使用 Slot 傳入自定義 SVG，自動繼承顏色"
        >
          <div class="demo-area">
            <IIcon
              size="large"
              color="#E91E63"
            >
              <svg viewBox="0 0 24 24">
                <path
                  d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                />
              </svg>
            </IIcon>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<IIcon color="error"><svg>...</svg></IIcon>'
              label="使用方式"
            />
          </template>
        </ShowcaseCard>

        <!-- Custom Icon (Placeholder) -->
        <ShowcaseCard
          title="自定義 SVG (Custom Icons)"
          description="使用 assets/icons 中的 SVG 檔案，必須使用 `svg-` 前綴 (例如: svg-example)"
        >
          <div class="demo-area">
            <div class="text-slate-400">
              目前無自定義圖示。請將 .svg 檔案放入 assets/icons/ 以自動載入。
            </div>
          </div>
        </ShowcaseCard>

        <!-- Nesting / Integration -->
        <ShowcaseCard
          title="整合範例"
          description="在按鈕或輸入框中使用"
        >
          <div class="demo-area d-flex flex-column gap-4">
            <div class="d-flex gap-2">
              <IButton
                prepend-icon="mdi-check"
                color="success"
              >
                Save
              </IButton>
              <IButton
                prepend-icon="mdi-delete"
                variant="text"
                color="error"
              />
            </div>
            <IInput
              prepend-icon="mdi-email"
              placeholder="Email Address"
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<!-- 按鈕整合 -->
<IButton prepend-icon="mdi-check" color="success">Save</IButton>
<IButton prepend-icon="mdi-delete" variant="text" color="error" />

<!-- 輸入框整合 -->
<IInput prepend-icon="mdi-email" placeholder="Email Address" />'
              label="使用方式"
            />
          </template>
        </ShowcaseCard>
      </div>

      <!-- MDI Cheatsheet -->
      <div
        id="cheatsheet"
        class="d-flex align-center justify-space-between mt-8 mb-4"
      >
        <h3 class="text-h6 text-slate-300">常用圖示速查 ({{ totalIcons }}+)</h3>
        <div style="width: 250px">
          <IInput
            v-model="searchQuery"
            prepend-icon="mdi-magnify"
            placeholder="搜尋圖示..."
            clearable
          />
        </div>
      </div>

      <ShowcaseCard full-width>
        <div
          v-if="Object.keys(filteredCategories).length === 0"
          class="pa-8 text-center text-slate-400"
        >
          <IIcon
            icon="mdi-emoticon-sad-outline"
            size="48"
            class="mb-2"
          />
          <div>找不到符合 "{{ searchQuery }}" 的圖示</div>
        </div>

        <div
          v-for="(icons, category) in filteredCategories"
          :key="category"
          class="mb-6"
        >
          <div class="text-subtitle-2 text-slate-400 mb-3 ml-1">{{ category }}</div>
          <div class="d-flex flex-wrap gap-4 pa-2">
            <v-tooltip
              v-for="icon in icons"
              :key="icon"
              location="top"
              :text="icon"
            >
              <template #activator="{ props }">
                <div
                  v-bind="props"
                  class="icon-item d-flex flex-column align-center justify-center pa-4 rounded cursor-pointer"
                  @click="copyToClipboard(icon)"
                >
                  <IIcon
                    :icon="icon"
                    size="large"
                    class="mb-2"
                  />
                  <div
                    class="text-caption text-truncate"
                    style="max-width: 80px"
                  >
                    {{ icon.replace('mdi-', '') }}
                  </div>
                </div>
              </template>
            </v-tooltip>
          </div>
        </div>

        <div
          v-if="copiedIcon"
          class="copy-toast"
        >
          <IIcon
            icon="mdi-check-circle"
            class="mr-2"
          />
          已複製代碼: {{ copiedIcon }}
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 3. Playground -->
    <ShowcaseSection
      v-show="activeTab === 'playground'"
      title="互動測試"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="設定您的 Icon"
          full-width
        >
          <div class="d-flex flex-wrap gap-8">
            <!-- Controls -->
            <div class="controls flex-1 min-w-[300px] d-flex flex-column gap-6">
              <div class="control-group">
                <label class="d-block mb-2 text-caption text-slate-400">圖示名稱</label>
                <IInput v-model="pIcon" />
              </div>

              <div class="control-group">
                <label class="d-block mb-2 text-caption text-slate-400">大小</label>
                <div class="d-flex flex-wrap gap-2">
                  <IButton
                    v-for="s in sizeOptions"
                    :key="String(s)"
                    size="small"
                    :variant="pSize === s ? 'primary' : 'outlined'"
                    @click="pSize = s"
                  >
                    {{ s }}
                  </IButton>
                </div>
              </div>

              <div class="control-group">
                <label class="d-block mb-2 text-caption text-slate-400">顏色</label>
                <div class="d-flex flex-wrap gap-2">
                  <div
                    v-for="c in colorOptions"
                    :key="c"
                    class="color-dot cursor-pointer"
                    :style="{
                      background: c,
                      border: pColor === c ? '2px solid white' : 'none'
                    }"
                    @click="pColor = c"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Preview -->
            <div
              class="preview flex-1 min-w-[300px] d-flex align-center justify-center bg-slate-800 rounded-lg pa-8"
            >
              <IIcon
                :icon="pIcon"
                :size="pSize"
                :color="pColor"
              />
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
}

.architecture-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.layer {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  width: 100%;
  text-align: center;
}

.layer-interface {
  background: rgba(56, 189, 248, 0.1);
  border-color: rgba(56, 189, 248, 0.3);
}

.layer-implementation {
  background: rgba(16, 185, 129, 0.05);
  border-color: rgba(16, 185, 129, 0.2);
}

.layer-content {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.icon-box,
.impl-box {
  background: rgba(15, 23, 42, 0.6);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.arrow {
  color: #94a3b8;
  font-size: 0.9rem;
}

.icon-item {
  border: 1px solid transparent;
  width: 100px;
  transition: all 0.2s;
}

.icon-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.1);
  border-color: rgba(var(--v-theme-primary), 0.3);
  color: rgb(var(--v-theme-primary));
}

.color-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.copy-toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(16, 185, 129, 0.9);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  animation: slide-up 0.3s ease-out;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
</style>
