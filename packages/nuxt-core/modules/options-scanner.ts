import fs from 'node:fs'
import { join, relative } from 'node:path'
import { defineNuxtModule, addPluginTemplate, addTemplate, createResolver } from '@nuxt/kit'

/**
 * 零配置選項自動掃描模組 (Zero-Config Options Scanner)
 * 
 * 任務：
 * 1. 偵測專案目錄 (Host App) 下是否有 'options' 資料夾。
 * 2. 如果有，掃描裡面所有的 .ts 檔案。
 * 3. 自動生成一個虛擬 Plugin，將這些檔案的所有具名導出 (Named Exports) 註冊進 useOptions。
 */
export default defineNuxtModule({
  meta: {
    name: 'softleader-options-scanner',
    configKey: 'optionsScanner'
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const projectRootDir = nuxt.options.rootDir
    const optionsDir = join(projectRootDir, 'options')

    // 1. 檢查專案是否有 options 目錄
    if (!fs.existsSync(optionsDir)) {
      return
    }

    // 2. 獲取所有 .ts 或 .js 檔案 (排除 index.ts 如果有的話，避免循環)
    const files = fs.readdirSync(optionsDir)
      .filter(f => (f.endsWith('.ts') || f.endsWith('.js')) && !f.startsWith('index'))
      .map(f => f.replace(/\.(ts|js)$/, ''))

    if (files.length === 0) {
      return
    }

    // 3. 生成編譯時期的虛擬 Plugin
    // 這個 Plugin 會被注入到專案中，並在執行時自動註冊選項
    addPluginTemplate({
      filename: 'softleader-auto-options.mjs',
      getContents: () => {
        const imports = files.map((file, i) => `import * as opt${i} from '~/options/${file}'`).join('\n')
        const registries = files.map((_, i) => `...opt${i}`).join(',\n      ')

        return `
import { defineNuxtPlugin } from '#app'
import { useOptions } from '#imports'
${imports}

export default defineNuxtPlugin((nuxtApp) => {
  const options = useOptions()
  
  // 自動將偵測到的檔案內容註冊進去
  options.registerLocalOptions({
    ${registries}
  })
  
  console.log('[Options Scanner] 已自動註冊專案私有選項: ${files.join(', ')}')
})
        `
      }
    })

    // 4. 生成型別宣告檔 (IDE 智慧提示)
    // 透過 Module Augmentation 擴充 CustomOptions 介面
    nuxt.hook('prepare:types', ({ references }) => {
      const template = addTemplate({
        filename: 'softleader-options.d.ts',
        getContents: () => {
          const imports = files.map((file, i) => `import * as opt${i} from '~/options/${file}'`).join('\n')
          const keys = files.map((file, i) => {
             // 這裡假設檔案導出的變數名稱就是 Option Key
             // 我們透過 typeof 取得型別
             return `    [K in keyof typeof opt${i}]: any`
          }).join('\n')

          return `
import { CustomOptions } from 'softleader-nuxt-core/core/options/registry'
${imports}

declare module 'softleader-nuxt-core/core/options/registry' {
  interface CustomOptions {
${files.map((file, i) => `    // 來自 options/${file}\n    [K in keyof typeof opt${i}]: any`).join('\n')}
  }
}

export {}
          `
        }
      })
      
      // 將產生的型別檔加入 Nuxt 的型別參考中
      references.push({ path: resolve(nuxt.options.buildDir, template.filename) })
    })
  }
})
