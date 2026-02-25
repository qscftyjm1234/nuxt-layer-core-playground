<template>
  <div class="showcase-page">
    <header class="showcase-header">
      <h1 class="text-4xl font-bold text-primary mb-2">Nuxt Core Layer 展示中心</h1>
      <p class="text-gray-600">這裡展示了所有從 Core Layer 提供的介面層 (uiInterface) 與業務層 (uiBusiness) 元件。</p>
    </header>

    <nav class="showcase-nav">
      <a href="#basic">基礎元件</a>
      <a href="#form">表單元件</a>
      <a href="#feedback">反饋與遮罩</a>
      <a href="#layout">佈局與展示</a>
      <a href="#business">業務核心</a>
      <a href="#complex">複雜業務邏輯</a>
    </nav>

    <!-- 1. Interface Basic -->
    <section id="basic" class="showcase-section">
      <h2 class="section-title">1. 基礎元件 (Interface Basic)</h2>
      <div class="component-group">
        <h3 class="group-title">IButton & ILoadingButton</h3>
        <div class="flex gap-4 flex-wrap items-center">
          <IButton variant="primary">Primary</IButton>
          <IButton variant="secondary">Secondary</IButton>
          <IButton variant="danger">Danger</IButton>
          <IButton variant="warning">Warning</IButton>
          <IButton variant="success">Success</IButton>
          <IButton variant="outlined">Outlined</IButton>
          <IButton variant="text">Text</IButton>
          <IButton disabled>Disabled</IButton>
          <ILoadingButton :loading="true">Loading</ILoadingButton>
          <IButton size="small">Small</IButton>
          <IButton size="large">Large</IButton>
        </div>
      </div>

      <div class="component-group mt-8">
        <h3 class="group-title">IAvatar, IChip & IBadge</h3>
        <div class="flex gap-6 flex-wrap items-center">
          <IAvatar src="https://avatars.githubusercontent.com/u/1?v=4" size="48" />
          <IAvatar color="primary" size="48">SL</IAvatar>
          <IChip color="primary">Active</IChip>
          <IChip color="success" variant="filled">Completed</IChip>
          <IChip closable @close="console.log('close')">Closable</IChip>
          <IChipGroup v-model="selectedChip" :items="['Apple', 'Banana', 'Cherry']" />
        </div>
      </div>

      <div class="component-group mt-8">
        <h3 class="group-title">IIcon & ILoadingSpinner</h3>
        <div class="flex gap-8 flex-wrap items-center text-2xl">
          <IIcon icon="mdi-home" />
          <IIcon icon="mdi-account" color="primary" />
          <IIcon icon="mdi-check-circle" color="success" />
          <IIcon icon="mdi-alert" color="warning" />
          <ILoadingSpinner />
          <ILoadingSpinner color="primary" size="32" />
        </div>
      </div>
    </section>

    <!-- 2. Interface Form -->
    <section id="form" class="showcase-section">
      <h2 class="section-title">2. 表單元件 (Interface Form)</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="component-group">
          <h3 class="group-title">Input & TextField</h3>
          <IStack gap="4">
            <IInput v-model="formData.name" label="標準輸入框架 (IInput)" placeholder="請輸入姓名" />
            <ITextField v-model="formData.email" label="文本輸入 (ITextField)" placeholder="example@softleader.com.tw" prepend-icon="mdi-email" />
            <ITextarea v-model="formData.bio" label="多行文本 (ITextarea)" placeholder="請輸入自我介紹..." :rows="3" />
          </IStack>
        </div>

        <div class="component-group">
          <h3 class="group-title">Selection Components</h3>
          <IStack gap="4">
            <ISelect
              v-model="formData.role"
              :items="[
                { label: 'Admin', value: 'Admin' },
                { label: 'User', value: 'User' },
                { label: 'Guest', value: 'Guest' }
              ]"
              label="下拉選單 (ISelect)"
            />
            <div class="flex gap-8">
              <IStack gap="1">
                <label class="text-sm font-bold text-gray-700">核取方塊 (ICheckbox)</label>
                <div class="flex gap-4">
                  <ICheckbox v-model="formData.agree" label="同意條款" />
                  <ICheckbox v-model="formData.subscribe" label="訂閱電子報" />
                </div>
              </IStack>
              <IStack gap="1">
                <label class="text-sm font-bold text-gray-700">單選按鈕 (IRadio)</label>
                <div class="flex gap-4">
                  <IRadio v-model="formData.gender" value="M" label="男" />
                  <IRadio v-model="formData.gender" value="F" label="女" />
                </div>
              </IStack>
            </div>
            <ISwitch v-model="formData.notifications" label="開啟通知 (ISwitch)" />
          </IStack>
        </div>
      </div>
    </section>

    <!-- 3. Interface Feedback -->
    <section id="feedback" class="showcase-section">
      <h2 class="section-title">3. 反饋與遮罩 (Interface Feedback)</h2>
      <div class="component-group">
        <h3 class="group-title">IAlert</h3>
        <IStack gap="4">
          <IAlert type="info" title="提示訊息" text="這是一個一般的提示訊息內容。" />
          <IAlert type="success" title="成功訊息" variant="tonal" text="您的操作已成功完成！" />
          <IAlert type="warning" title="警告訊息" variant="outlined" text="請注意，此操作可能影響系統穩定性。" />
          <IAlert type="error" title="錯誤訊息" text="發生未知錯誤，請稍後再試。" />
        </IStack>
      </div>

      <div class="component-group mt-8">
        <h3 class="group-title">Modals & Overlays</h3>
        <div class="flex gap-4">
          <IButton variant="outlined" @click="showModal = true">開啟模組視窗 (IModal)</IButton>
          <IButton variant="outlined" @click="showSnackbar = true">觸發提示條 (ISnackbar)</IButton>
        </div>
        <IModal v-model="showModal" title="範例模組視窗">
          <p>這是 IModal 的內容區域，你可以放任何元件在這裡。</p>
          <template #footer>
            <IButton variant="text" @click="showModal = false">取消</IButton>
            <IButton variant="primary" @click="showModal = false">確定</IButton>
          </template>
        </IModal>
        <ISnackbar v-model="showSnackbar" message="這是一條短暫的提示訊息" type="success" />
      </div>
    </section>

    <!-- 4. Interface Layout -->
    <section id="layout" class="showcase-section">
      <h2 class="section-title">4. 佈局與展示 (Interface Layout)</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ICard title="ICard 範例" subtitle="這是一個帶有標題與副標題的卡片" :elevation="2">
          <p class="mb-4">卡片內容區域，支援各種 Slot 與樣式配置。</p>
          <template #footer>
            <div class="flex justify-end gap-2">
              <IButton size="small" variant="text">了解更多</IButton>
              <IButton size="small">分享</IButton>
            </div>
          </template>
        </ICard>

        <ISheet color="primary" variant="tonal" rounded="lg" padding="1.5rem">
          <h3 class="font-bold mb-2">ISheet 範例</h3>
          <p>底層樣式容器，常用於建立自定義區域背景。支援不同的顏色深度與圓角設定。</p>
          <IDivider class="my-4" />
          <p class="text-sm">分隔線 (IDivider) 可以幫助區分內容。</p>
        </ISheet>
      </div>

      <div class="component-group mt-8">
        <h3 class="group-title">IDataTable</h3>
        <IDataTable 
          :columns="[
            { key: 'id', label: 'ID' },
            { key: 'name', label: '姓名' },
            { key: 'role', label: '權限' },
            { key: 'status', label: '狀態' }
          ]"
          :items="[
            { id: 1, name: 'Gino Huang', role: 'Admin', status: 'Active' },
            { id: 2, name: 'SoftLeader', role: 'Editor', status: 'Pending' }
          ]"
        />
      </div>
    </section>

    <!-- 5. Business Core -->
    <section id="business" class="showcase-section">
      <h2 class="section-title">5. 業務核心 (Business Core)</h2>
      <ICard padding="lg" variant="elevated">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CountrySelect v-model="businessData.country" label="國家選擇 (CountrySelect)" />
          <CitySelect v-model="businessData.city" :country="businessData.country" label="城市選擇 (CitySelect)" />
          <GenderRadio v-model="businessData.gender" label="性別選擇 (GenderRadio)" />
          <PhoneInput v-model="businessData.phone" label="電話輸入 (PhoneInput)" />
          <EmailInput v-model="businessData.email" label="電子郵件 (EmailInput)" />
          <PasswordInput v-model="businessData.password" label="密碼輸入 (PasswordInput)" />
          <OptionSelect v-model="businessData.option" code="job" label="通用選項 (OptionSelect)" />
        </div>
      </ICard>
    </section>

    <!-- 6. Business Logic -->
    <section id="complex" class="showcase-section">
      <h2 class="section-title">6. 複雜業務邏輯 (Business Logic)</h2>
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <SmartComplexWidget />
        
        <IStack gap="6">
          <SmartCard title="業務資料卡片 (SmartCard)" icon="mdi-database">
            <template #content>
              <p>自動整合了數據展示與標籤樣式。</p>
            </template>
          </SmartCard>

          <ICard title="API 互動測試" padding="md">
            <div class="flex gap-4 flex-wrap">
              <ApiLoadingButton label="測試全域 Loading" url="/mock-delay/2000" />
              <ApiLoadingButton label="測試成功提示" url="/mock-delay/1000" variant="success" />
              <ApiLoadingButton label="測試錯誤處理" url="/mock-error" variant="danger" />
            </div>
          </ICard>

          <DateRangePicker v-model="businessData.dateRange" label="日期範圍選擇 (DateRangePicker)" />
        </IStack>
      </div>

      <div class="mt-8">
        <SmartTable 
          title="智慧表格 (SmartTable)"
          :columns="[
            { label: '編號', field: 'id' },
            { label: '使用者', field: 'name' },
            { label: '角色', field: 'role', type: 'tag' },
            { label: '註冊日期', field: 'createdAt' }
          ]"
          :data="[
            { id: '001', name: 'James Clear', role: 'Admin', createdAt: '2024-01-01' },
            { id: '002', name: 'Marie Kondo', role: 'Editor', createdAt: '2024-02-15' },
            { id: '003', name: 'Simon Sinek', role: 'User', createdAt: '2024-03-10' }
          ]"
        />
      </div>
    </section>

    <footer class="showcase-footer mt-20 pb-10 text-center text-gray-400">
      <p>&copy; 2026 SoftLeader Nuxt Core Layer. All rights reserved.</p>
    </footer>

    <!-- Global Components (Invisible by default) -->
    <GlobalLoading />
    <GlobalModal />
    <GlobalSnackbar />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// --- State ---
const selectedChip = ref('Apple')
const showModal = ref(false)
const showSnackbar = ref(false)

const formData = reactive({
  name: '',
  email: '',
  bio: '',
  role: 'User',
  agree: false,
  subscribe: true,
  gender: 'M',
  notifications: true
})

const businessData = reactive({
  country: 'TW',
  city: '',
  gender: 'M',
  phone: '',
  email: '',
  password: '',
  option: '',
  dateRange: { start: null, end: null }
})
</script>

<style scoped>
.showcase-page {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  color: #334155;
}

.showcase-header {
  text-align: center;
  margin-bottom: 3rem;
}

.showcase-nav {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 4rem;
  position: sticky;
  top: 1rem;
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  padding: 1rem;
  border-radius: 9999px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.showcase-nav a {
  text-decoration: none;
  font-weight: 600;
  color: #64748b;
  transition: color 0.2s;
  font-size: 0.9rem;
}

.showcase-nav a:hover {
  color: var(--color-primary);
}

.showcase-section {
  margin-bottom: 6rem;
  scroll-margin-top: 6rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
  color: #1e293b;
}

.component-group {
  margin-bottom: 1.5rem;
}

.group-title {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  margin-bottom: 1rem;
}

.text-primary {
  color: var(--color-primary);
}

/* Helper for Tailwind-like classes used in template but maybe missing in layout.css */
.flex-wrap { flex-wrap: wrap; }
.font-bold { font-weight: 700; }
.text-4xl { font-size: 2.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-sm { font-size: 0.875rem; }
.text-gray-600 { color: #4b5563; }
.text-gray-400 { color: #9ca3af; }
.text-gray-700 { color: #374151; }
.mt-8 { margin-top: 2rem; }
.mt-20 { margin-top: 5rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.my-4 { margin: 1rem 0; }
.pb-10 { padding-bottom: 2.5rem; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }

@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (min-width: 1280px) {
  .xl\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
