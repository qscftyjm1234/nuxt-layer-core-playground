import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const targetDir = path.resolve(process.cwd(), 'apps/demo-app')

console.log(`[1/3] 清理舊的示範專案: ${targetDir}`)
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true })
}

console.log('[2/3] 打包並準備核心層...')
const corePkgDir = path.resolve(process.cwd(), 'packages/nuxt-core')
execSync('npm pack', { cwd: corePkgDir, stdio: 'inherit' })

// 找到剛剛打包的檔案 (e.g., softleader-nuxt-core-1.2.0.tgz)
const files = fs.readdirSync(corePkgDir)
const tgzFile = files.find(f => f.startsWith('softleader-nuxt-core-') && f.endsWith('.tgz'))

if (!tgzFile) {
  console.error('錯誤: 找不到打包後的 .tgz 檔案')
  process.exit(1)
}

const tgzPath = path.join(corePkgDir, tgzFile)

console.log('[3/3] 執行初始化指令...')
// 直接呼叫 bin/init.mjs init
const initScript = path.resolve(corePkgDir, 'bin/init.mjs')
execSync(`node ${initScript} init apps/demo-app`, { stdio: 'inherit' })

// 清理 tgz
fs.unlinkSync(tgzPath)

console.log('\n[成功] 示範專案已建立於 apps/demo-app')
console.log('您可以執行: npm install (在根目錄) 然後 npm run dev -w demo-app')
