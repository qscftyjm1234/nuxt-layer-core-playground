#!/usr/bin/env node

// =========================================================
// 這是 `npx softleader-nuxt-core init <project-name>` 的核心腳本。
// 執行後會在當前目錄下建立一個完整的 Nuxt 3 專案骨架，
// 並自動整合 softleader-nuxt-core Layer 的所有設定。
// =========================================================

import fs from 'node:fs' // 檔案系統模組：用來建立資料夾、讀寫檔案 (fs.mkdirSync, fs.writeFileSync)
import path from 'node:path' // 路徑處理模組：用來組合、解析檔案路徑 (path.join, path.resolve)
import { fileURLToPath } from 'node:url' // URL 處理模組：用來將 file:// 格式的 URL 轉成絕對路徑字串
import { execSync } from 'node:child_process' // 子進程模組：用來在終端機「同步」執行指令 (如 npm install, git init)
import { parseArgs } from 'node:util' // CLI 參數解析模組：Node.js 內建的解析工具，用來處理 --help 等指令參數

// =========================================================
// 模擬 CommonJS 的 __dirname 與 __filename
// 因為此檔案宣告為 ES Module (MJS)，預設沒有這些變數，
// 必須透過 import.meta.url 與 fileURLToPath 自行解析出當前檔案的絕對路徑，
// 方便後續讀取同套件內的 templates 目錄。
// =========================================================
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// =========================================================
// 解析 CLI 參數
// 支援 --help / -h 旗標，顯示使用說明後結束程式
// =========================================================
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

// =========================================================
// 解析目標資料夾路徑與套件名稱
// 由於指令為 npx softleader-nuxt-core init [project-name]
// 我們判斷第一個參數是否為 'init'，若是則取第二個參數當專案名稱
// =========================================================
const args = positionals[0] === 'init' ? positionals.slice(1) : positionals
const projectName = args[0] || 'my-nuxt-app'
const targetDir = path.resolve(process.cwd(), projectName)
const packageName =
  path
    .basename(targetDir)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '') || 'my-nuxt-app'

// =========================================================
// 防呆：若目標資料夾已存在則中止，避免覆蓋現有專案
// =========================================================
if (fs.existsSync(targetDir)) {
  console.error(`錯誤 (Error): 目錄 "${projectName}" 已經存在。`)
  process.exit(1)
}

console.log(`開始在 ${targetDir} 建立 Nuxt 3 專案...`)

// =========================================================
// 步驟 1：建立專案根目錄
// =========================================================
fs.mkdirSync(targetDir, { recursive: true })

// =========================================================
// 步驟 2：產生 package.json
// 包含所有必要的 scripts（dev, build, lint, commit...）
// 並預設以 softleader-nuxt-core 作為唯一依賴
// =========================================================
const packageJson = {
  name: packageName,
  version: '1.0.0',
  private: true,
  type: 'module',
  scripts: {
    build: 'nuxt build',
    dev: 'nuxt dev',
    generate: 'nuxt generate',
    preview: 'nuxt preview',
    postinstall: 'nuxt prepare',
    lint: 'eslint .',
    'lint:fix': 'eslint . --fix',
    format: 'prettier --write .',
    'format:check': 'prettier --check .',
    commit: 'cz',
    prepare: 'husky'
  },
  config: {
    commitizen: { path: './node_modules/cz-customizable' },
    'cz-customizable': { config: '.cz-config.cjs' }
  },
  dependencies: {
    'softleader-nuxt-core': 'latest'
  },
  devDependencies: {
    nuxt: '^3.15.4',
    vue: 'latest',
    'vue-router': 'latest',
    husky: '^9.1.5',
    'lint-staged': '^15.2.10',
    '@commitlint/cli': '^19.5.0',
    commitizen: '^4.3.0',
    'cz-customizable': '^7.0.0',
    'cross-env': '^7.0.3'
  }
}

fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(packageJson, null, 2))

// =========================================================
// 步驟 2-1：產生共享工具配置檔案
// 這些配置檔案全部從 softleader-nuxt-core 繼承，
// 確保所有子專案的 ESLint、Prettier、Git 規範完全一致。
// =========================================================
const extConfigs = [
  {
    name: 'eslint.config.mjs',
    content:
      "import coreConfig from 'softleader-nuxt-core/core/config/eslint.config.mjs'\n\nexport default [\n  ...coreConfig\n]\n"
  },
  {
    name: '.prettierrc.cjs',
    content:
      "module.exports = {\n  ...require('softleader-nuxt-core/core/config/prettier.json')\n}\n"
  },
  {
    name: '.commitlintrc.cjs',
    content:
      "module.exports = require('softleader-nuxt-core/core/config/git/commitlint.config.cjs')\n"
  },
  {
    name: '.lintstagedrc.js',
    content:
      "export { default } from 'softleader-nuxt-core/core/config/git/lint-staged.config.js'\n"
  },
  {
    name: '.cz-config.cjs',
    content: "module.exports = require('softleader-nuxt-core/core/config/git/cz-config.cjs')\n"
  }
]
for (const conf of extConfigs) {
  fs.writeFileSync(path.join(targetDir, conf.name), conf.content)
}

// =========================================================
// 步驟 3：產生 nuxt.config.ts
// 關鍵：extends: ['softleader-nuxt-core'] 讓 Nuxt Layer 機制生效，
// 自動繼承核心層的所有組件、Composables、Plugins、Layouts。
// =========================================================
const nuxtConfigTs = `// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['softleader-nuxt-core'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
`
fs.writeFileSync(path.join(targetDir, 'nuxt.config.ts'), nuxtConfigTs)

// =========================================================
// 步驟 4：產生 app.vue
// 使用 NuxtLayout + NuxtPage 的標準結構，
// Layout 和頁面路由均由 Layer 自動提供。
// =========================================================
const appVue = `<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
`
fs.writeFileSync(path.join(targetDir, 'app.vue'), appVue)

// =========================================================
// 步驟 5：產生初始首頁 pages/index.vue
// 使用核心層內建的 <Welcome /> 歡迎組件，讓開發者啟動後立即看到畫面。
// =========================================================
const pagesDir = path.join(targetDir, 'pages')
fs.mkdirSync(pagesDir, { recursive: true })
const indexVue = `<template>
  <Welcome />
</template>
`
fs.writeFileSync(path.join(pagesDir, 'index.vue'), indexVue)

// =========================================================
// 步驟 6：產生 configs/default.json
// 這是專案級別的常數設定檔（Blueprint），
// 用於控制品牌、API 路徑、佈局、主題等業務層設定。
// 核心層會在啟動時自動讀取此檔案。
// =========================================================
const configsDir = path.join(targetDir, 'configs')
fs.mkdirSync(configsDir, { recursive: true })

const defaultConfigContent = `{
  "$schema": "./schema.json",
  "//": "Softleader Nuxt Core 專案常數設定檔 (Blueprint)",
  "branding": {
    "name": "${projectName}",
    "shortName": "${packageName.toUpperCase()}",
    "logo": "/images/logo.png",
    "icon": "/favicon.ico",
    "copyright": "© 2026 Softleader Technical Team. All rights reserved."
  },
  "meta": {
    "title": "${projectName}",
    "description": "企業級 Nuxt 3 核心架構",
    "author": "Softleader Team",
    "lang": "zh-TW"
  },
  "layout": {
    "menuStyle": "sidebar",
    "sidebar": {
      "width": 260,
      "title": "管理系統"
    },
    "header": {
      "fixed": true,
      "search": true,
      "searchPlaceholder": "搜尋組件..."
    }
  },
  "theme": {
    "primaryColor": "#2563eb",
    "borderRadius": 12,
    "animation": true,
    "customCss": []
  },
  "network": {
    "apiBaseUrl": "/api/v1",
    "proxy": {
      "/api/v1": {
        "target": "http://dev-api-server:8080",
        "changeOrigin": true,
        "rewrite": "^/api/v1"
      }
    }
  },
  "features": {
    "enableWatermark": false,
    "enableAuth": true,
    "enableLog": true
  },
  "build": {
    "compress": true,
    "optimizeDeps": []
  },
  "modules": {
    "@nuxtjs/i18n": true,
    "vuetify-nuxt-module": true
  }
}`
fs.writeFileSync(path.join(configsDir, 'default.json'), defaultConfigContent)

// =========================================================
// 步驟 6-1：設定 VS Code JSON Schema
// 讓 IDE 能對 configs/*.json 提供自動補全與型別提示。
// =========================================================
const vscodeDir = path.join(targetDir, '.vscode')
if (!fs.existsSync(vscodeDir)) fs.mkdirSync(vscodeDir, { recursive: true })

const vscodeSettings = {
  'json.schemas': [
    {
      fileMatch: ['/configs/*.json'],
      url: './configs/schema.json'
    }
  ]
}
fs.writeFileSync(path.join(vscodeDir, 'settings.json'), JSON.stringify(vscodeSettings, null, 2))

// 將核心層的 schema 檔案複製到新專案，以便本地 IDE 即時提示
const schemaPath = path.resolve(__dirname, '../schemas/config.schema.json')
if (fs.existsSync(schemaPath)) {
  const schemaContent = fs.readFileSync(schemaPath, 'utf8')
  fs.writeFileSync(path.join(configsDir, 'schema.json'), schemaContent)
}

// =========================================================
// 步驟 7：產生 app.config.ts
// 透過 Nuxt 原生 defineAppConfig，讓 Vue 組件可用 useAppConfig() 取得設定值。
// =========================================================
const appConfigTs = `export default defineAppConfig({
  // 透過這個檔案，組員可以在 Vue 中使用 useAppConfig() 獲取核心設定
  // 產品核心常數預設由 Layer 自動從 configs/default.json 載入
  title: '${projectName}'
})
`
fs.writeFileSync(path.join(targetDir, 'app.config.ts'), appConfigTs)

// =========================================================
// 步驟 8：產生 tsconfig.json
// 繼承 Nuxt 自動生成的 .nuxt/tsconfig.json，確保 TypeScript 型別完整。
// =========================================================
const tsconfig = `{
  "extends": "./.nuxt/tsconfig.json"
}
`
fs.writeFileSync(path.join(targetDir, 'tsconfig.json'), tsconfig)

// =========================================================
// 步驟 9：產生 .gitignore
// 優先從核心層的 templates/gitignore 讀取，若不存在則使用基本預設值。
// =========================================================
const gitignoreTemplatePath = path.resolve(__dirname, '../core/templates/gitignore')
let gitignoreContent = ''
if (fs.existsSync(gitignoreTemplatePath)) {
  gitignoreContent = fs.readFileSync(gitignoreTemplatePath, 'utf8')
} else {
  gitignoreContent = '.nuxt\n.output\nnode_modules\n.env\ndist\n'
}
fs.writeFileSync(path.join(targetDir, '.gitignore'), gitignoreContent)

// =========================================================
// 步驟 10：產生 .npmrc
// shamefully-hoist=true：讓巢狀依賴提升到根層，避免 Nuxt/Vite 找不到套件。
// strict-peer-dependencies=false：關閉嚴格 peerDeps 檢查，減少安裝錯誤。
// =========================================================
const npmrc = `shamefully-hoist=true
strict-peer-dependencies=false
`
fs.writeFileSync(path.join(targetDir, '.npmrc'), npmrc)

// =========================================================
// 步驟 11：執行環境初始化（自動執行，不需手動操作）
// - git init：初始化 Git 儲存庫
// - npm install：安裝所有依賴
// - 設定 Husky Git Hooks（pre-commit 執行 lint-staged，commit-msg 執行 commitlint）
// - 複製 VS Code 建議的工作區設定（extensions.json、settings.json）
// =========================================================
// 步驟 11：執行環境初始化
// - git init：初始化 Git 儲存庫
// - 預先配置 Husky Git Hooks 腳本（待使用者 npm install 後自動生效）
// - 複製 VS Code 建議的工作區設定（extensions.json、settings.json）
// =========================================================
try {
  console.log('正在環境初始化 Git 儲存庫 (Initializing git repository)...')
  execSync('git init', { cwd: targetDir, stdio: 'ignore' })

  console.log('正在預先設定 Git Hooks...')
  const huskyDir = path.join(targetDir, '.husky')
  fs.mkdirSync(huskyDir, { recursive: true })

  // 從核心層範本讀取 Husky Hook 腳本內容
  const templateHuskyDir = path.resolve(__dirname, '../core/templates/husky')
  const hooks = ['pre-commit', 'commit-msg']

  hooks.forEach((hook) => {
    const templatePath = path.join(templateHuskyDir, hook)
    const targetPath = path.join(huskyDir, hook)
    if (fs.existsSync(templatePath)) {
      fs.copyFileSync(templatePath, targetPath)
    } else {
      // 若範本不存在則使用基本預設腳本
      const content =
        hook === 'pre-commit' ? 'npx lint-staged\n' : 'npx --no -- commitlint --edit "${1}"\n'
      fs.writeFileSync(targetPath, content)
    }
    // 在 Linux/macOS 下賦予執行權限（Windows 忽略此步驟）
    try {
      fs.chmodSync(targetPath, '755')
    } catch (e) {}
  })

  console.log('正在配置 VS Code 建置環境 (Configuring VS Code environment)...')
  const vscodeTargetDir = path.join(targetDir, '.vscode')
  if (!fs.existsSync(vscodeTargetDir)) fs.mkdirSync(vscodeTargetDir, { recursive: true })

  const templateVscodeDir = path.resolve(__dirname, '../core/templates/vscode')
  if (fs.existsSync(templateVscodeDir)) {
    const files = fs.readdirSync(templateVscodeDir)
    files.forEach((file) => {
      fs.copyFileSync(path.join(templateVscodeDir, file), path.join(vscodeTargetDir, file))
    })
  }
} catch (error) {
  console.log('警告 (Warning): 環境初始化執行失敗。')
}

// =========================================================
// 完成！提示使用者下一步操作。
// =========================================================
console.log(
  '\n專案 "' +
    projectName +
    '" 已準備就緒！\n\n下一步 (Next steps):\n  cd ' +
    projectName +
    '\n  npm install\n  npm run dev\n'
)
