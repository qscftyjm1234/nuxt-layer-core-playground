import fs from 'node:fs'
import path from 'node:path'

/**
 * 自動檢查環境變數範本 (.env.example)
 *
 * 邏輯：
 * 1. 確保在專案根目錄執行 (檢查 package.json)
 * 2. 掃描 apps/* 資料夾下的所有子專案
 * 3. 如果某個專案內沒有 .env.example，就產出一份包含基底包常數的範本
 */

const projectRoot = process.cwd()

// 防呆：確保在專案根目錄執行
if (
  !fs.existsSync(path.join(projectRoot, 'package.json')) ||
  !fs.existsSync(path.join(projectRoot, 'apps'))
) {
  console.error('[Setup] ❌ 錯誤：請在專案根目錄執行此腳本。')
  process.exit(1)
}

/**
 * 【開發者注意】
 * 如果有增加新的環境變數常數，請務必修改下方的 defaultContent，
 * 這樣腳本在執行時才會強制同步給所有組員的 .env.example。
 */
const defaultContent = `# Nuxt Core 基底包環境變數範本

# 核心載入設定 (configs/ 下的 JSON 檔名)
PRODUCT_CONFIG=default

# API 連線設定 (環境變數優先於 JSON)
# 【開發建議】一般來說開發時保持註解或預設即可，優先使用 default.json 的 proxy 機制來開發
# VITE_API_BASE_URL=https://api.dev.softleader.com.tw
# VITE_API_TIMEOUT=30000
# VITE_API_RETRY_COUNT=0

# 應用程式識別
NUXT_PUBLIC_APP_UA_IDENTIFIER=SoftleaderApp

# 安全與驗證
NUXT_API_SECRET_KEY=yoursecretkey123_change_me
NUXT_PUBLIC_ENABLE_SECURITY_MODE=false
`

// 掃描 apps 下的所有目錄
const appsDir = path.join(projectRoot, 'apps')
const appFolders = fs
  .readdirSync(appsDir)
  .filter((f) => fs.statSync(path.join(appsDir, f)).isDirectory())

const targets = [...appFolders.map((f) => `apps/${f}`)]

console.log('[Setup] 正在強制同步環境變數範本 (.env.example)...')

targets.forEach((target) => {
  const examplePath = path.resolve(projectRoot, target, '.env.example')

  try {
    fs.writeFileSync(examplePath, defaultContent)
    console.log(`[Env] ✅ ${target || 'Root'}/.env.example 已同步完成`)
  } catch (err) {
    console.error(`[Env] ❌ 同步 ${target}/.env.example 失敗:`, err.message)
  }
})

console.log('[Setup] 所有範本檢查完成。')
