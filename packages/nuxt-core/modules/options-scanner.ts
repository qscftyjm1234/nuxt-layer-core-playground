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

    const getOptionsFiles = () => {
      if (!fs.existsSync(optionsDir)) return []
      return fs
        .readdirSync(optionsDir)
        .filter((f) => (f.endsWith('.ts') || f.endsWith('.js')) && !f.startsWith('index'))
        .map((f) => f.replace(/\.(ts|js)$/, ''))
    }

    // 3. 生成編譯時期的虛擬 Plugin
    const pluginTemplate = addPluginTemplate({
      filename: 'softleader-auto-options.mjs',
      getContents: () => {
        const files = getOptionsFiles()
        const imports = files
          .map((file, i) => `import * as opt${i} from '~/options/${file}'`)
          .join('\n')
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
    const typeTemplate = addTemplate({
      filename: 'softleader-options.d.ts',
      getContents: () => {
        const files = getOptionsFiles()
        const imports = files
          .map((file, i) => `import * as opt${i} from '~/options/${file}'`)
          .join('\n')
        const types = files.map((_, i) => `typeof opt${i}`).join(' & ')

        return `
import { CustomOptions } from 'softleader-nuxt-core/core/options/registry'
${imports}

declare module 'softleader-nuxt-core/core/options/registry' {
  interface CustomOptions extends AnyOptions {}
  type AnyOptions = {
    [K in keyof (${types || 'object'})]: any
  }
}

export {}
          `
      }
    })

    // 將產生的型別檔加入 Nuxt 的型別參考中，並確保路徑映射正確
    nuxt.hook('prepare:types', ({ references, tsConfig }) => {
      references.push({ path: resolve(nuxt.options.buildDir, typeTemplate.filename) })

      // [關鍵修復] 處理本地開發時 node_modules/softleader-nuxt-core 損壞或過舊的問題
      // 強制將型別指向本地核心層，確保 Module Augmentation 能生效
      if (tsConfig.compilerOptions) {
        tsConfig.compilerOptions.paths = tsConfig.compilerOptions.paths || {}
        const corePath = resolve('../') // 指向 packages/nuxt-core

        // 優先映射核心路徑
        tsConfig.compilerOptions.paths['softleader-nuxt-core'] = [corePath]
        tsConfig.compilerOptions.paths['softleader-nuxt-core/*'] = [`${corePath}/*`]
      }
    })

    // 5. 監聽目錄變動，實現 HMR (無需手動重啟)
    // 當 options 目錄下的檔案新增或刪除時，觸發 Template 重新產生
    nuxt.hook('builder:watch', async (event, path) => {
      if (path.startsWith(optionsDir)) {
        console.log(`[Options Scanner] 偵測到變動 (${event}): ${path}, 正在重新整理虛擬檔案...`)
        const { updateTemplates } = await import('@nuxt/kit')
        (t: any) =>
          t.filename === (pluginTemplate as any).filename ||
          t.filename === (typeTemplate as any).filename
      }
    })
  }
})
