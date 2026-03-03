#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { parseArgs } from 'node:util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const options = {
  help: {
    type: 'boolean',
    short: 'h'
  }
}

const { values, positionals } = parseArgs({ options, allowPositionals: true })

if (values.help) {
  console.log(`
用法 (Usage): npx softleader-nuxt-core init [project-name]

參數 (Arguments):
  [project-name]  要建立的專案資料夾名稱 (預設: my-nuxt-app)

選項 (Options):
  -h, --help      顯示此幫助訊息
`)
  process.exit(0)
}

// 取得專案名稱，預設為 my-nuxt-app
const projectName = positionals[0] || 'my-nuxt-app'
// 解析出目標資料夾的絕對路徑
const targetDir = path.resolve(process.cwd(), projectName)
// 產生合法的 npm package name (轉小寫並移除非英數字元)
const packageName = path.basename(targetDir).toLowerCase().replace(/[^a-z0-9-]/g, '') || 'my-nuxt-app'

// 檢查資料夾是否已存在
if (fs.existsSync(targetDir)) {
  console.error(`錯誤 (Error): 目錄 "${projectName}" 已經存在。`)
  process.exit(1)
}

console.log(`開始在 ${targetDir} 建立 Nuxt 3 專案...`)

// 1. 建立目標資料夾
fs.mkdirSync(targetDir, { recursive: true })

// 2. 建立 package.json
const packageJson = {
  name: packageName,
  version: "1.0.0",
  private: true,
  type: "module",
  scripts: {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  dependencies: {
    "softleader-nuxt-core": "latest"
  },
  devDependencies: {
    "nuxt": "^3.15.4",
    "vue": "latest",
    "vue-router": "latest"
  }
}

fs.writeFileSync(
  path.join(targetDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
)

// 3. 建立 nuxt.config.ts (預設繼承 softleader-nuxt-core Layer)
const nuxtConfigTs = `// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['softleader-nuxt-core'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
`
fs.writeFileSync(path.join(targetDir, 'nuxt.config.ts'), nuxtConfigTs)

// 4. 建立基礎的 app.vue
const appVue = `<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
`
fs.writeFileSync(path.join(targetDir, 'app.vue'), appVue)

// 5. 建立範例頁面 pages/index.vue
const pagesDir = path.join(targetDir, 'pages')
fs.mkdirSync(pagesDir)
const indexVue = `<template>
  <Welcome />
</template>
`
fs.writeFileSync(path.join(pagesDir, 'index.vue'), indexVue)

// 6. 建立設定檔目錄 (configs) & 預設常數檔案
const configsDir = path.join(targetDir, 'configs')
fs.mkdirSync(configsDir)

const defaultConfigContent = `{
  "//": "Softleader Nuxt Core 專案常數設定檔",
  "meta": {
    "title": "${projectName}",
    "description": "企業級 Nuxt 3 前端專案"
  },
  "layout": {
    "branding": {
      "title": "Softleader Enterprise",
      "logoIcon": "mdi-rocket-launch"
    },
    "footer": {
      "content": "Copyright © 2026 Softleader. All rights reserved."
    }
  },
  "theme": {
    "primaryColor": "#1677ff"
  },
  "api": {
    "baseUrl": "https://api.example.com"
  }
}`
fs.writeFileSync(path.join(configsDir, 'default.json'), defaultConfigContent)

// 7. 建立 app.config.ts (Nuxt 原生常數導出)
const appConfigTs = `export default defineAppConfig({
  // 透過這個檔案，組員可以在 Vue 中使用 useAppConfig() 獲取核心設定
  // 這裡預設將 productConfig 內容導出
  title: '${projectName}',
  theme: {
    primaryColor: '#1677ff'
  }
})
`
fs.writeFileSync(path.join(targetDir, 'app.config.ts'), appConfigTs)

// 8. 建立 tsconfig.json 以支援 TypeScript 型別檢查
const tsconfig = `{
  "extends": "./.nuxt/tsconfig.json"
}
`
fs.writeFileSync(path.join(targetDir, 'tsconfig.json'), tsconfig)

// 9. 建立 .gitignore
const gitignore = `.nuxt
.output
.env
.env.*
!.env.example
.nitro

# Node
node_modules
*.log*
.DS_Store

# Build
dist
.cache

# IDE
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea

# TypeScript
*.tsbuildinfo

# Misc
.turbo
coverage
.npmrc
`
fs.writeFileSync(path.join(targetDir, '.gitignore'), gitignore)

// 10. 建立 .npmrc (確保依賴載入與本地行為一致的基礎最佳實踐)
const npmrc = `shamefully-hoist=true
strict-peer-dependencies=false
`
fs.writeFileSync(path.join(targetDir, '.npmrc'), npmrc)

// 11. 初始化 Git 儲存庫並安裝 npm 依賴
try {
  console.log('正在安裝依賴，這可能需要一點時間 (Installing dependencies)...')
  execSync('npm install', { cwd: targetDir, stdio: 'inherit' })
  
  console.log('正在初始化 Git 儲存庫 (Initializing git repository)...')
  execSync('git init', { cwd: targetDir, stdio: 'ignore' })
} catch (error) {
  console.log('警告 (Warning): 自動安裝指令執行失敗。您可能需要手動進入資料夾執行 npm install。')
}

console.log(\`
專案 "${projectName}" 已準備就緒！

下一步 (Next steps):
  cd ${projectName}
  npm run dev
\`)
