import fs from 'node:fs'
import { join } from 'node:path'
import { defineNuxtModule, addPluginTemplate, addTemplate, createResolver } from '@nuxt/kit'

/**
 * 零配置 Repository 自動掃描模組
 */
export default defineNuxtModule({
  meta: {
    name: 'softleader-repositories-scanner',
    configKey: 'repositoriesScanner'
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const projectRootDir = nuxt.options.rootDir
    const repoDir = join(projectRootDir, 'repositories')

    // 1. 檢查專案是否有 repositories 目錄
    if (!fs.existsSync(repoDir)) {
      return
    }

    // 2. 獲取所有檔案 (排除 index)
    const files = fs.readdirSync(repoDir)
      .filter(f => (f.endsWith('.ts') || f.endsWith('.js')) && !f.startsWith('index'))
      .map(f => f.replace(/\.(ts|js)$/, ''))

    if (files.length === 0) {
      return
    }

    // 3. 生成 Plugin 自動註冊
    addPluginTemplate({
      filename: 'softleader-auto-repositories.mjs',
      getContents: () => {
        const imports = files.map((file, i) => `import repo${i} from '~/repositories/${file}'`).join('\n')
        const registries = files.map((file, i) => `${file}: repo${i}`).join(',\n      ')

        return `
import { defineNuxtPlugin } from '#app'
import { useRepo } from '#imports'
${imports}

export default defineNuxtPlugin((nuxtApp) => {
  const { registerLocalRepositories } = useRepo()
  
  registerLocalRepositories({
    ${registries}
  })
  
  console.log('[Repo Scanner] 已自動註冊專案私有 Repository: ${files.join(', ')}')
})
        `
      }
    })

    // 4. 生成型別宣告檔
    nuxt.hook('prepare:types', ({ references }) => {
      const template = addTemplate({
        filename: 'softleader-repositories.d.ts',
        getContents: () => {
          const imports = files.map((file, i) => `import repo${i} from '~/repositories/${file}'`).join('\n')
          
          return `
import { CustomRepositories } from 'softleader-nuxt-core/composables/useRepo'
${imports}

declare module 'softleader-nuxt-core/composables/useRepo' {
  interface CustomRepositories {
${files.map((file, i) => `    /** 來自專案 repositories/${file} */\n    ${file}: typeof repo${i}`).join('\n')}
  }
}

export {}
          `
        }
      })
      
      references.push({ path: resolve(nuxt.options.buildDir, template.filename) })
    })
  }
})
