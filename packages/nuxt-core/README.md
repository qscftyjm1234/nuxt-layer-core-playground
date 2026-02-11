# Nuxt Core Layer

這是 Nuxt 3 Core Layer，提供可重用的基礎架構、元件和工具。

## 包含內容

- 設計系統元件（Button、Card）
- 基礎 Layout
- 全域樣式與設計 Tokens
- 共用 Composables
- 統一的開發工具配置（ESLint、Prettier、TypeScript）

## 使用方式

在你的 Nuxt 應用中擴展此 Layer：

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@softleader/nuxt-core']
})
```

## 開發與發布

### 開發指令

```bash
# 安裝依賴
npm install

# Lint
npm run lint

# 型別檢查
npm run typecheck
```

### 發布流程

如果你需要將變更更新至 NPM，詳細步驟請參考：
👉 [NPM 發布指南 (PUBLISH_GUIDE.md)](./PUBLISH_GUIDE.md)
