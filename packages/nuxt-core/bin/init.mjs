#!/usr/bin/env node

/**
 * softleader-nuxt-core CLI
 * ?舀?誘:
 *   init <project-name>  : 撱箇??冽撠?
 *   sync [path]          : ?郊?暹?撠??嗆???蝵? */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { parseArgs } from 'node:util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 閫???
const options = {
  help: { type: 'boolean', short: 'h' }
}

const { values, positionals } = parseArgs({ options, allowPositionals: true })

if (values.help || positionals.length === 0) {
  console.log(`
?冽? (Usage): 
  npx softleader-nuxt-core init [project-name]  撱箇??冽撠?
  npx softleader-nuxt-core sync [path]          ?郊?暹?撠??嗆? (銝?撖急平?誨蝣?

? (Arguments):
  [project-name] / [path]  ?格?鞈?憭曇楝敺?(?身: ?嗅??桅?)

?賊? (Options):
  -h, --help               憿舐內?誘撟怠閮
`)
  process.exit(0)
}

const command = positionals[0]
const isInit = command === 'init'
const isSync = command === 'sync'

if (!isInit && !isSync) {
  console.error(`?航炊: 銝?渡??誘 "${command}"??雿輻 init ??sync?)
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
    log.info(`  [撱箇?] ?桅?: ${dirPath}`)
  } else {
    log.info(`  [?仿?] ?桅?撌脣??? ${dirPath}`)
  }
}

const writeFile = (filePath, content, overwrite = true) => {
  const fullPath = path.join(targetDir, filePath)
  const dir = path.dirname(fullPath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  if (fs.existsSync(fullPath) && !overwrite) {
    log.info(`  [?仿?] 瑼?撌脣??? ${filePath}`)
    return
  }

  fs.writeFileSync(fullPath, content)
  log.info(`  [?Ｙ?] 瑼?: ${filePath}`)
}

// --- Main Execution ---

if (isInit) {
  if (fs.existsSync(targetDir) && fs.existsSync(path.join(targetDir, 'package.json'))) {
    log.error(`?航炊: ?桅? "${targetPath}" 撌脩?摮銝???package.json??憪?憭望??)
    process.exit(1)
  }
  log.step('Initializing New Project...')
} else {
  log.step('Syncing Project Architecture...')
  if (!fs.existsSync(path.join(targetDir, 'package.json'))) {
    log.error('?航炊: ?曆???package.json???典?獢?桅??瑁? sync ?誘??)
    process.exit(1)
  }
}

// 1. ?箸?桅?
const standardDirs = ['pages', 'composables', 'repositories', 'utils', 'assets/images', 'plugins', 'constants', 'configs']
standardDirs.forEach(ensureDir)

// 2. ?箇?閮剖?瑼?(sync ?撌脣??其??批捆?蝜潭隤?嚗??仿????湔 schema)
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
extConfigs.forEach(conf => writeFile(conf.name, conf.content, isInit)) // Init 璅∪?閬神, Sync 璅∪?靽?

// 3. Nuxt ?蔭 (? Init ??獢?摮???
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

// 4. 擐? (Init 璅∪????
if (isInit) {
  const indexVue = `<template>
  <Welcome />
</template>
`
  writeFile('pages/index.vue', indexVue, false)
}

// 5. 蝭?瑼? (?乩?摮??朣?
const useAppInfoTs = `export const useAppInfo = () => {
  const config = useAppConfig()
  return { getProjectTitle: () => config.title || '?芸??獢? }
}
`
writeFile('composables/useAppInfo.ts', useAppInfoTs, false)

const exampleRepoTs = `/**
 * 蝷箇?嚗epository 璅∪???useApi ??? */
const exampleRepository = {
  /** ?脣?雿輻??銵?*/
  getUsers: () => useApi().get('/users'),
  /** 撱箇?雿輻??*/
  createUser: (data: any) => useApi().post('/users', data)
}

export default exampleRepository
`
writeFile('repositories/exampleRepository.ts', exampleRepoTs, true)

// 6. Config Blueprint
const defaultConfig = `{
  "$schema": "./schema.json",
  "//": "Softleader Nuxt Core 撠?閮剖?瑼?,
  "branding": { "name": "${projectName}", "shortName": "${packageName.toUpperCase()}" },
  "meta": { "title": "${projectName}", "description": "隡平蝝?Nuxt 3 ?詨??嗆?", "lang": "zh-TW" },
  "layout": { "menuStyle": "sidebar", "sidebar": { "width": 260, "title": "蝞∠?蝟餌絞" } },
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
  log.info('  [?湔] Config Schema ??')
}

// 8. package.json (? Init ??獢?摮???
if (isInit) {
  // 霈???core ????  let coreVersion = 'latest'
  try {
    const corePkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'))
    coreVersion = corePkg.version
  } catch (e) {}

  const packageJson = {
    name: packageName,
    private: true,
    type: 'module',
    scripts: {
      dev: 'nuxt dev',
      build: 'nuxt build',
      generate: 'nuxt generate',
      preview: 'nuxt preview',
      postinstall: 'nuxt prepare',
      typecheck: 'nuxi typecheck'
    },
    dependencies: {
      'softleader-nuxt-core': `^${coreVersion}`,
      'nuxt': '^3.15.4'
    },
    devDependencies: {
      'vue-tsc': '^2.0.0',
      'typescript': '^5.0.0'
    }
  }
  writeFile('package.json', JSON.stringify(packageJson, null, 2), false)
}

// 9. README (? Init ??獢?摮???
const readmeMd = `# ${projectName}\n\n?箸 \`softleader-nuxt-core\` ?詨??嗆??n\n## ?? 敹恍?憪n1. \`npm install\`\n2. \`npm run dev\`\n`
writeFile('README.md', readmeMd, false)

// 9. Git & Husky (Init 璅∪??撩隞嗆?鋆?)
if (isInit) {
  try {
    execSync('git init', { cwd: targetDir, stdio: 'ignore' })
    log.info('  [Git] ???摮澈')
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
  log.info('  [Husky] 鋆? Git Hooks 閮剖?')
}

log.success(`\n[摰?] ${isInit ? '撠?撱箇???' : '?嗆??郊??'}!`)
if (isInit) {
  console.log(`\n隢銵誑銝?隞日?憪???\n  cd ${targetPath}\n  npm install\n  npm run dev\n`)
}
