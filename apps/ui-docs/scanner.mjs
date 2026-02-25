import path from 'path'
import fs from 'fs'

/**
 * 掃描模組頁面並自動產生路由
 * @param pages Nuxt 的 pages 陣列
 * @param enabledModules 啟用的模組列表
 * @param rootDir 專案根目錄
 */
export function scanModulePages(pages, enabledModules, rootDir) {
  const modulesDir = path.resolve(rootDir, 'modules')

  if (fs.existsSync(modulesDir)) {
    for (const moduleName of enabledModules) {
      const pagesDir = path.join(modulesDir, moduleName, 'pages')
      if (fs.existsSync(pagesDir)) {
        // 遞迴掃描函式：找出該模組 pages 資料夾下所有的 .vue 檔案
        const scanFiles = (dir, baseDir) => {
          const files = fs.readdirSync(dir)
          for (const file of files) {
            const filePath = path.join(dir, file)
            const stat = fs.statSync(filePath)
            if (stat.isDirectory()) {
              scanFiles(filePath, baseDir)
            } else if (file.endsWith('.vue')) {
              // 計算相對路徑，用來決定路由網址
              const relativePath = path.relative(baseDir, filePath)

              let routePath = `/${relativePath.replace(/\\/g, '/').replace(/\.vue$/, '')}`

              if (routePath.endsWith('/index')) {
                routePath = routePath.slice(0, -6)
              }

              if (!routePath.startsWith(`/${moduleName}`)) {
                if (routePath === '/') {
                  routePath = `/${moduleName}`
                } else {
                  routePath = `/${moduleName}${routePath}`
                }
              }

              const name = relativePath
                .replace(/\\/g, '-')
                .replace(/\//g, '-')
                .replace(/\.vue$/, '')

              // 將這個頁面加入 Nuxt 的路由表
              pages.push({
                name: `${moduleName}-${name}`,
                path: routePath,
                file: filePath
              })
            }
          }
        }

        scanFiles(pagesDir, pagesDir)
      } else {
        console.warn(
          `[Config] Module '${moduleName}' enabled in config but pages directory not found at ${pagesDir}`
        )
      }
    }
  }
}
