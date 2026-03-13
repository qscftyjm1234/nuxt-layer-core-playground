#!/usr/bin/env node

/**
 * softleader-nuxt-core CLI
 * 支援指令:
 *   init <project-name>  : 建立全新專案
 *   sync [path]          : 同步現有專案架構與配置
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { parseArgs } from 'node:util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 解析參數
const options = {
  help: { type: 'boolean', short: 'h' }
}

const { values, positionals } = parseArgs({ options, allowPositionals: true })

if (values.help || positionals.length === 0) {
  console.log(`
用法 (Usage): 
  npx softleader-nuxt-core init [project-name]  建立全新專案
  npx softleader-nuxt-core sync [path]          同步現有專案架構 (不覆寫業務代碼)

參數 (Arguments):
  [project-name] / [path]  目標資料夾路徑 (預設: 當前目錄)

選項 (Options):
  -h, --help               顯示指令幫助訊息
`)
  process.exit(0)
}

const command = positionals[0]
const isInit = command === 'init'
const isSync = command === 'sync'

if (!isInit && !isSync) {
  console.error(`錯誤: 不支援的指令 "${command}"。請使用 init 或 sync。`)
  process.exit(1)
}

const targetPath = positionals[1] || (isInit ? 'my-nuxt-app' : '.')
const targetDir = path.resolve(process.cwd(), targetPath)
const projectName = path.basename(targetDir)
const packageName = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '') || 'my-nuxt-app'

// --- Helpers ---
const log = {
  info: (msg) => console.log(`\x1b[36m${msg}\x1b[0m`),
  success: (msg) => console.log(`\x1b[32m${msg}\x1b[0m`),
  warn: (msg) => console.log(`\x1b[33m${msg}\x1b[0m`),
  error: (msg) => console.error(`\x1b[31m${msg}\x1b[0m`),
  step: (msg) => console.log(`\n\x1b[35m[${msg}]\x1b[0m`)
}

const ensureDir = (dirPath) => {
  const fullPath = path.join(targetDir, dirPath)
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true })
    log.info(`  [建立] 目錄: ${dirPath}`)
  } else {
    log.info(`  [略過] 目錄已存在: ${dirPath}`)
  }
}

const writeFile = (filePath, content, overwrite = true) => {
  const fullPath = path.join(targetDir, filePath)
  const dir = path.dirname(fullPath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  if (fs.existsSync(fullPath) && !overwrite) {
    log.info(`  [略過] 檔案已存在: ${filePath}`)
    return
  }

  fs.writeFileSync(fullPath, content)
  log.info(`  [產生] 檔案: ${filePath}`)
}

// --- Main Execution ---

if (isInit) {
  if (fs.existsSync(targetDir)) {
    log.error(`錯誤: 目錄 "${targetPath}" 已經存在。初始化必須使用新目錄。`)
    process.exit(1)
  }
  log.step('Initializing New Project...')
} else {
  log.step('Syncing Project Architecture...')
  if (!fs.existsSync(path.join(targetDir, 'package.json'))) {
    log.error('錯誤: 找不到 package.json。請在專案根目錄執行 sync 指令。')
    process.exit(1)
  }
}

// 1. 基本目錄
const standardDirs = ['pages', 'composables', 'repositories', 'utils', 'assets/images', 'plugins', 'constants', 'configs']
standardDirs.forEach(ensureDir)

// 2. 基礎設定檔 (sync 時若已存在且內容包含繼承語法，則略過或僅更新 schema)
const extConfigs = [
  {
    name: 'eslint.config.mjs',
    content: "import coreConfig from 'softleader-nuxt-core/core/config/eslint.config.mjs'\n\nexport default [\n  ...coreConfig\n]\n"
  },
  {
    name: '.prettierrc.cjs',
    content: "module.exports = {\n  ...require('softleader-nuxt-core/core/config/prettier.json')\n}\n"
  },
  {
    name: '.commitlintrc.cjs',
    content: "module.exports = require('softleader-nuxt-core/core/config/git/commitlint.config.cjs')\n"
  },
  {
    name: '.lintstagedrc.js',
    content: "export { default } from 'softleader-nuxt-core/core/config/git/lint-staged.config.js'\n"
  },
  {
    name: '.cz-config.cjs',
    content: "module.exports = require('softleader-nuxt-core/core/config/git/cz-config.cjs')\n"
  }
]
extConfigs.forEach(conf => writeFile(conf.name, conf.content, isInit)) // Init 模式覆寫, Sync 模式保留

// 3. Nuxt 配置 (僅在 Init 或檔案不存在時產生)
const nuxtConfigTs = `// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['softleader-nuxt-core'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
`
writeFile('nuxt.config.ts', nuxtConfigTs, false)

const appVue = `<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
`
writeFile('app.vue', appVue, false)

// 4. 首頁 (Init 模式才產生)
if (isInit) {
  const indexVue = `<script setup lang="ts">
const { formatDateTime } = useDateTime()
const notify = useNotify()
const now = ref(formatDateTime(new Date()))
const handleClick = () => notify.success('連動成功！')
</script>

<template>
  <div class="pa-10">
    <IAlert type="info" title="專案已就緒" text="這是繼承自 softleader-nuxt-core 的新專案。" class="mb-6" />
    <ICard title="功能示範">
      <div class="d-flex align-center gap-4">
        <div>時間: {{ now }}</div>
        <IButton variant="primary" @click="handleClick">測試通知</IButton>
      </div>
    </ICard>
  </div>
</template>
`
  writeFile('pages/index.vue', indexVue, false)
}

// 5. 範例檔案 (若不存在則補齊)
const useAppInfoTs = `export const useAppInfo = () => {
  const config = useAppConfig()
  return { getProjectTitle: () => config.title || '未命名專案' }
}
`
writeFile('composables/useAppInfo.ts', useAppInfoTs, false)

const exampleRepoTs = `export const exampleRepository = () => {
  const api = useApi()
  return {
    getUsers: () => api.get('/users'),
    createUser: (data: any) => api.post('/users', data)
  }
}
`
writeFile('repositories/exampleRepository.ts', exampleRepoTs, false)

// 6. Config Blueprint
const defaultConfig = `{
  "$schema": "./schema.json",
  "//": "Softleader Nuxt Core 專案設定檔",
  "branding": { "name": "${projectName}", "shortName": "${packageName.toUpperCase()}" },
  "meta": { "title": "${projectName}", "description": "企業級 Nuxt 3 核心架構", "lang": "zh-TW" },
  "layout": { "menuStyle": "sidebar", "sidebar": { "width": 260, "title": "管理系統" } },
  "theme": { "primaryColor": "#2563eb", "borderRadius": 12 },
  "network": { "apiBaseUrl": "/api/v1" },
  "features": { "enableAuth": true, "enableLog": true }
}`
writeFile('configs/default.json', defaultConfig, false)

// 7. VS Code & Schema
writeFile('.vscode/settings.json', JSON.stringify({ 'json.schemas': [{ fileMatch: ['/configs/*.json'], url: './configs/schema.json' }] }, null, 2), true)
const schemaPath = path.resolve(__dirname, '../schemas/config.schema.json')
if (fs.existsSync(schemaPath)) {
  fs.copyFileSync(schemaPath, path.join(targetDir, 'configs/schema.json'))
  log.info('  [更新] Config Schema 指引')
}

// 8. README (僅在 Init 或檔案不存在時產生)
const readmeMd = `# ${projectName}\n\n基於 \`softleader-nuxt-core\` 核心架構。\n\n## 🚀 快速開始\n1. \`npm install\`\n2. \`npm run dev\`\n`
writeFile('README.md', readmeMd, false)

// 9. Git & Husky (Init 模式或缺件時補齊)
if (isInit) {
  try {
    execSync('git init', { cwd: targetDir, stdio: 'ignore' })
    log.info('  [Git] 初始化儲存庫')
  } catch (e) {}
}

const huskyDir = path.join(targetDir, '.husky')
if (!fs.existsSync(huskyDir)) {
  fs.mkdirSync(huskyDir, { recursive: true })
  const templateHuskyDir = path.resolve(__dirname, '../core/templates/husky')
  const hooks = ['pre-commit', 'commit-msg']
  hooks.forEach(hook => {
    const templatePath = path.join(templateHuskyDir, hook)
    if (fs.existsSync(templatePath)) {
      fs.copyFileSync(templatePath, path.join(huskyDir, hook))
      try { fs.chmodSync(path.join(huskyDir, hook), '755') } catch (e) {}
    }
  })
  log.info('  [Husky] 補齊 Git Hooks 設定')
}

log.success(`\n[完成] ${isInit ? '專案建立成功' : '架構同步成功'}!`)
if (isInit) {
  console.log(`\n請執行以下指令開始開發:\n  cd ${targetPath}\n  npm install\n  npm run dev\n`)
}
