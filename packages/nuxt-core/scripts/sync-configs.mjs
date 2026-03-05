import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * 核心配置同步腳本 (Core Configuration Sync Script)
 * 
 * 用途：讓外部專案 (如 nuxt3-test) 可以同步來自 softleader-nuxt-core 核心的最新開發配置。
 */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 假設在 node_modules/softleader-nuxt-core/scripts/sync-configs.mjs 執行
// 目標路徑為執行指令的根目錄
const targetDir = process.cwd()
const corePkgDir = path.resolve(__dirname, '..')

console.log(`[Sync] 正在從核心層同步配置至: ${targetDir}`)

const syncMap = [
  {
    src: 'core/templates/vscode',
    dest: '.vscode',
    isDir: true
  },
  {
    src: 'core/templates/husky',
    dest: '.husky',
    isDir: true
  }
]

syncMap.forEach(({ src, dest, isDir }) => {
  const srcPath = path.resolve(corePkgDir, src)
  const destPath = path.resolve(targetDir, dest)

  if (!fs.existsSync(srcPath)) return

  console.log(`[Sync] 正在更新 ${dest}...`)

  if (isDir) {
    if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true })
    const files = fs.readdirSync(srcPath)
    files.forEach((file) => {
      fs.copyFileSync(path.join(srcPath, file), path.join(destPath, file))
    })
  } else {
    fs.copyFileSync(srcPath, destPath)
  }
})

console.log('[Sync] ✅ 配置同步完成！請重啟 VS Code 以套用最新設定。')
