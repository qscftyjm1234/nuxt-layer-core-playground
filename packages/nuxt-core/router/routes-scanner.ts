import path from 'path'
import fs from 'fs'
import type { NuxtPage } from 'nuxt/schema'

/**
 * 掃描模組頁面並自動產生路由
 * @param pages Nuxt 的 pages 陣列
 * @param enabledModules 啟用的模組列表
 * @param rootDir 專案根目錄
 */
export function scanModulePages(pages: NuxtPage[], enabledModules: string[], rootDir: string) {
  const modulesDir = path.resolve(rootDir, 'modules')

  if (fs.existsSync(modulesDir)) {
    for (const moduleName of enabledModules) {
      const pagesDir = path.join(modulesDir, moduleName, 'pages')
      if (fs.existsSync(pagesDir)) {
        // 遞迴掃描函式：找出該模組 pages 資料夾下所有的 .vue 檔案
        const scanFiles = (dir: string, baseDir: string) => {
          const files = fs.readdirSync(dir)
          for (const file of files) {
            const filePath = path.join(dir, file)
            const stat = fs.statSync(filePath)
            if (stat.isDirectory()) {
              scanFiles(filePath, baseDir)
            } else if (file.endsWith('.vue')) {
              // 計算相對路徑，用來決定路由網址
              // 例如檔案是: modules/auth/pages/user/list.vue
              // baseDir 是: modules/auth/pages
              // relativePath 就是: user/list.vue
              const relativePath = path.relative(baseDir, filePath)

              // 初步處理路徑：
              // 1. 把 Windows 的反斜線 \ 換成 /
              // 2. 去掉 .vue 副檔名
              // 結果: /user/list
              let routePath = `/${relativePath.replace(/\\/g, '/').replace(/\.vue$/, '')}`

              // 如果是 index 結尾，移除 /index (這是 Nuxt 的慣例，index 代表根路徑)
              if (routePath.endsWith('/index')) {
                routePath = routePath.slice(0, -6)
              }

              // 【關鍵邏輯】自動加上模組名稱前綴
              // 為了避免不同模組的頁面網址衝突，我們強制加上模組名稱
              // 例如 auth 模組的 user/list 頁面，網址應該是 /auth/user/list

              // 特殊例外：登入頁面放在根目錄 /login
              if (moduleName === 'auth' && relativePath === 'login.vue') {
                routePath = '/login'
              } else if (!routePath.startsWith(`/${moduleName}`)) {
                if (routePath === '/') {
                  routePath = `/${moduleName}`
                } else {
                  routePath = `/${moduleName}${routePath}`
                }
              }

              // 產生唯一的路由名稱 (name)，例如: auth-user-list
              const name = relativePath
                .replace(/\\/g, '-')
                .replace(/\//g, '-')
                .replace(/\.vue$/, '')

              // 將這個頁面加入 Nuxt 的路由表
              pages.push({
                name: `${moduleName}-${name}`, // 加上 module prefix 避免衝突
                path: routePath,
                file: filePath
              })
            }
          }
        }

        scanFiles(pagesDir, pagesDir)
      }
    }
  }
}
