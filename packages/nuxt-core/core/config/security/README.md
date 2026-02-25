# 資安系統使用指南

## 📁 檔案結構總覽

```
core/config/security/          # 資安設定中心 (集中管理)
├── index.ts                   # 統一匯出入口
├── options.ts                 # 功能開關設定
├── messages.ts                # UI 提示訊息
└── headers.ts                 # HTTP 安全標頭

plugins/
└── security.client.ts         # 前端防護執行邏輯

utils/security/                # 資安工具函式
├── index.ts                   # 工具匯出
├── mask.ts                    # 資料遮蔽工具
└── blur.ts                    # 模糊層工具

core/config/
└── runtime.ts                 # 資安模式總開關
```

---

## 🚀 快速開始

### 1. 啟用資安模式

在專案根目錄的 `.env` 檔案中設定:

```bash
# .env
NUXT_PUBLIC_ENABLE_SECURITY_MODE=true
```

### 2. 重啟開發伺服器

```bash
npm run dev
```

---

## ⚙️ 設定檔案說明

### 📄 `core/config/security/options.ts`

**功能**: 所有資安功能的開關設定

```typescript
export const defaultSecurityOptions: SecurityOptions = {
  // === 基礎防護 ===
  disableContextMenu: true, // 禁用右鍵選單
  disableDevTools: true, // 禁用 F12 開發者工具
  disableTextSelection: false, // 禁用文字選取
  disableDragDrop: true, // 禁用拖曳
  disableConsole: true, // 生產環境移除 console

  // === 截圖防護 ===
  disablePrintScreen: true, // 偵測 PrintScreen
  blurOnVisibilityChange: true, // 視窗失焦模糊
  blurOnPrintScreen: true, // 截圖時模糊
  detectScreenCapture: true, // 偵測螢幕錄影
  preventMediaCapture: true, // 阻止 Canvas 截圖

  // === 進階防護 ===
  enableKioskMode: false, // Kiosk 全螢幕模式
  disableNavigation: true, // 禁用導航鍵
  preventBackNavigation: true, // 防止返回上一頁
  idleTimeoutBlur: true, // 閒置自動鎖定
  idleTimeoutDuration: 3 * 60 * 1000 // 閒置時間 (3分鐘)
}
```

**如何修改**:

```typescript
// 只需修改這個檔案即可!
export const defaultSecurityOptions: SecurityOptions = {
  disableContextMenu: false, // 改成 false 就允許右鍵
  idleTimeoutDuration: 5 * 60 * 1000 // 改成 5 分鐘
}
```

---

### 📄 `core/config/security/messages.ts`

**功能**: 自訂資安提示訊息

```typescript
export const securityMessages = {
  screenshot: {
    icon: '⚠️',
    title: '富邦人壽資訊安全提醒',
    message: '為保護客戶資料安全,畫面擷取功能已被限制',
    action: '點擊任意處繼續'
  },
  idle: {
    icon: '🔒',
    title: '畫面已鎖定',
    message: '因閒置過久,畫面已自動鎖定以保護資料安全',
    action: '點擊任意處或按任意鍵解除鎖定'
  }
}
```

**如何修改**:

```typescript
// 改成你公司的名稱和訊息
export const securityMessages = {
  screenshot: {
    title: '你的公司名稱',
    message: '自訂的警告訊息'
  }
}
```

---

### 📄 `core/config/security/headers.ts`

**功能**: HTTP 安全標頭設定

```typescript
export const securityConfig: NuxtConfig['routeRules'] = {
  '/**': {
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Strict-Transport-Security': 'max-age=31536000'
      // ... 更多標頭
    }
  }
}
```

**說明**:

- `X-Frame-Options`: 防止 Clickjacking 攻擊
- `X-Content-Type-Options`: 防止 MIME Type Sniffing
- `Strict-Transport-Security`: 強制 HTTPS (HSTS)

---

## 🛠️ 工具函式使用

### 資料遮蔽 (`utils/security/mask.ts`)

```typescript
// 1. 引入遮蔽函式
import { maskIdCard, maskPhone, maskEmail } from '~/utils/security/mask'

// 2. 使用範例
const userIdCard = 'A123456789'
const masked = maskIdCard(userIdCard) // 結果: A123****89

const userPhone = '0912345678'
const maskedPhone = maskPhone(userPhone) // 結果: 0912***678
```

**可用函式**:

- `maskIdCard(idCard)` - 身分證遮蔽
- `maskPhone(phone)` - 手機號碼遮蔽
- `maskEmail(email)` - Email 遮蔽
- `maskName(name)` - 姓名遮蔽
- `maskAddress(address)` - 地址遮蔽
- `maskCreditCard(cardNumber)` - 信用卡遮蔽
- `maskBankAccount(accountNumber)` - 銀行帳號遮蔽
- `maskTaxId(taxId)` - 統一編號遮蔽
- `maskPassport(passport)` - 護照遮蔽

### 模糊層工具 (`utils/security/blur.ts`)

```typescript
// 1. 引入工具
import { createBlurOverlay } from '~/utils/security/blur'

// 2. 建立自訂模糊層
const myBlur = createBlurOverlay({
  id: 'my-blur',
  title: '警告',
  message: '請勿截圖',
  clickToDismiss: true
})

// 3. 顯示/隱藏
myBlur.show()
myBlur.hide()
```

---

## 📋 常見使用場景

### 場景 1: 在 API 回應中自動遮蔽個資

```typescript
// composables/useUserData.ts
import { maskIdCard, maskPhone, maskEmail } from '~/utils/security/mask'

export function useUserData() {
  const fetchUserProfile = async (userId: string) => {
    const { data } = await useApi(`/users/${userId}`)

    // 自動遮蔽敏感資料
    return {
      ...data,
      idCard: maskIdCard(data.idCard),
      phone: maskPhone(data.phone),
      email: maskEmail(data.email)
    }
  }

  return { fetchUserProfile }
}
```

### 場景 2: 在 Vue 模板中顯示遮蔽資料

```vue
<script setup>
import { maskIdCard, maskPhone } from '~/utils/security/mask'

const user = ref({
  name: '王小明',
  idCard: 'A123456789',
  phone: '0912345678'
})
</script>

<template>
  <div>
    <p>姓名: {{ user.name }}</p>
    <p>身分證: {{ maskIdCard(user.idCard) }}</p>
    <p>電話: {{ maskPhone(user.phone) }}</p>
  </div>
</template>
```

### 場景 3: 調整閒置鎖定時間

```typescript
// core/config/security/options.ts
export const defaultSecurityOptions: SecurityOptions = {
  idleTimeoutBlur: true,
  idleTimeoutDuration: 10 * 60 * 1000 // 改成 10 分鐘
}
```

### 場景 4: 關閉特定防護功能

```typescript
// core/config/security/options.ts
export const defaultSecurityOptions: SecurityOptions = {
  disableTextSelection: false, // 允許使用者選取文字
  disableNavigation: false, // 允許使用瀏覽器導航
  enableKioskMode: false // 不啟用 Kiosk 模式
}
```

---

## 🧪 測試資安功能

### 方式 1: 透過 Showcase 頁面

訪問 `/showcase/security` 可以:

- 查看所有資安功能狀態
- 即時測試資料遮蔽
- 互動測試截圖防護

### 方式 2: 手動測試

1. **測試右鍵禁用**: 在頁面上按右鍵
2. **測試 F12 禁用**: 按 F12 鍵
3. **測試截圖防護**: 按 PrintScreen 或 Win+Shift+S
4. **測試閒置鎖定**: 停止操作 3 分鐘

---

## ⚠️ 注意事項

### 開發環境 vs 正式環境

某些功能只在正式環境啟用:

```typescript
// plugins/security.client.ts
const isProduction = config.public.app.env === 'production'

if (isProduction) {
  // 只在正式環境執行的防護
  // 例如: 開發者工具偵測
}
```

### 允許特定元素選取

如果需要某些區域允許選取文字:

```html
<!-- 加上 selectable class -->
<div class="selectable">這段文字可以選取</div>
```

### 允許特定 Canvas 截圖

```html
<!-- 加上 data-allow-capture 屬性 -->
<canvas data-allow-capture="true"></canvas>
```

---

## 🔧 進階設定

### 建立 Composable 方便使用

```typescript
// composables/useSecurity.ts
import { securityOptions, securityMessages } from '@/core/config/security'

export function useSecurity() {
  const config = useRuntimeConfig()

  return {
    isEnabled: computed(() => config.public.enableSecurityMode),
    options: securityOptions,
    messages: securityMessages
  }
}
```

使用:

```vue
<script setup>
const { isEnabled, options } = useSecurity()
</script>

<template>
  <div v-if="isEnabled">資安模式已啟用</div>
</template>
```

---

## 📞 疑難排解

### Q: 資安模式沒有啟用?

**A**: 檢查 `.env` 檔案是否正確設定 `NUXT_PUBLIC_ENABLE_SECURITY_MODE=true`

### Q: 想要暫時關閉某個功能?

**A**: 修改 `core/config/security/options.ts`,將對應選項改為 `false`

### Q: 如何自訂警告訊息?

**A**: 修改 `core/config/security/messages.ts`

### Q: 資料遮蔽函式在哪裡?

**A**: `utils/security/mask.ts`,直接 import 使用即可

---

## 相關文件

- [資安架構分析](./security_architecture_analysis.md)
- [Token 安全管理](../../docs/TOKEN_SECURITY.md)
- [Showcase 展示頁面](/showcase/security)

---

**最後更新**: 2026-01-08
