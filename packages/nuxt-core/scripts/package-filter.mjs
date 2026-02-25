import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline'

const MASTER_JSON_PATH = path.resolve('package.master.json')
const PACKAGE_JSON_PATH = path.resolve('package.json')
const POLICY_PATH = path.resolve('package-clients.json')

/**
 * 處理互動式詢問
 * @param {string} query - 詢問內容
 * @returns {Promise<string>} 回傳使用者輸入
 */
async function handleQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close()
      resolve(ans)
    })
  )
}

/**
 * 執行專案 Package 篩選流程
 * @returns {Promise<void>}
 */
async function run() {
  // 檢查必備檔案
  if (!fs.existsSync(MASTER_JSON_PATH)) {
    console.error(`錯誤：找不到 Master 檔案 ${MASTER_JSON_PATH}`)
    process.exit(1)
  }
  if (!fs.existsSync(POLICY_PATH)) {
    console.error(`錯誤：找不到政策檔案 ${POLICY_PATH}`)
    process.exit(1)
  }

  const policies = JSON.parse(fs.readFileSync(POLICY_PATH, 'utf-8'))
  const availableClients = Object.keys(policies)

  // 取得目標 Client ID (先看指令參數，再看環境變數)
  let clientId = process.argv[2] || process.env.CLIENT_ID

  // 如果都沒有，就進入互動模式
  if (!clientId) {
    console.log('\n[Package Filter] 套件篩選工具')
    console.log('------------------------------------------')
    console.log('目前可用的甲方公司清單：')
    availableClients.forEach((name, index) => {
      console.log(`${index + 1}. ${name} (${policies[name].description})`)
    })
    console.log('------------------------------------------')

    const choice = await handleQuestion('請輸入序號或公司名稱 (直接按 Enter 取消): ')
    if (!choice) {
      console.log('操作已取消。')
      return
    }

    const index = parseInt(choice) - 1
    if (!isNaN(index) && availableClients[index]) {
      clientId = availableClients[index]
    } else if (policies[choice.trim()]) {
      clientId = choice.trim()
    } else {
      console.error('無效的選擇，請重新執行。')
      return
    }
  }

  const policy = policies[clientId]
  if (!policy) {
    console.error(`錯誤：找不到客戶 [${clientId}] 的政策設定。`)
    console.log(`可用選項：${availableClients.join(', ')}`)
    return
  }

  console.log(`\n正在為 [${clientId}] 進行 Package 篩選...`)

  // 從 Master 讀取
  const packageData = JSON.parse(fs.readFileSync(MASTER_JSON_PATH, 'utf-8'))

  /**
   * 根據政策過濾依賴項
   * @param {Object} deps - 原始依賴項物件
   * @returns {Object} 過濾後的依賴項物件
   */
  const filterDependencies = (deps) => {
    if (!deps) return deps
    const newDeps = { ...deps }

    // 處理黑名單 (Exclude)
    if (policy.exclude) {
      policy.exclude.forEach((pkgName) => {
        if (newDeps[pkgName]) {
          console.log(`   [-] 移除: ${pkgName}`)
          delete newDeps[pkgName]
        }
      })
    }

    // 處理白名單 (Include)
    if (policy.include) {
      Object.keys(newDeps).forEach((pkgName) => {
        if (!policy.include.includes(pkgName)) {
          console.log(`   [-] 移除: ${pkgName} (不在白名單內)`)
          delete newDeps[pkgName]
        }
      })
    }

    return newDeps
  }

  // 修改 Metadata 品牌化
  const originalName = packageData.name || 'nuxt-app'
  packageData.name = `${originalName}-${clientId.toLowerCase()}`
  packageData.description = policy.description || packageData.description

  // 篩選套件
  console.log('   [~] 正在根據政策修剪 Package 依賴項...')
  packageData.dependencies = filterDependencies(packageData.dependencies)
  // packageData.devDependencies = filterDependencies(packageData.devDependencies);

  // 寫回 package.json
  fs.writeFileSync(PACKAGE_JSON_PATH, `${JSON.stringify(packageData, null, 2)}\n`)

  console.log(`\nPackage 篩選完成！`)
  console.log(`   - 專案名稱: ${packageData.name}`)
  console.log(`   - 適用公司: ${clientId}`)
  console.log(`\n請執行 npm install 以套用變更。\n`)
}

run().catch((err) => {
  console.error('篩選過程發生意外：', err)
  process.exit(1)
})
