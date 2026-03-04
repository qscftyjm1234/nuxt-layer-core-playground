import { reactive } from 'vue'
import coreRepositories from '../repositories'

/** 
 * 提供專案層級擴充的介面
 * 開發者可以透過 Declare Module 方式擴充此介面
 */
export interface CustomRepositories {
  // 由 scanner 自動產生或手動擴充
}

/** 
 * Repository 物件型別 (核心 + 自定義)
 */
export type Repositories = typeof coreRepositories & CustomRepositories

/**
 * 內部狀態，存放動態註冊的 Repository
 */
const localRepositories = reactive<Record<string, any>>({})

/**
 * [Composable] 取得全域 Repository 容器
 * 支援核心架構與專案自定義的 Repository
 */
export function useRepo(): Repositories {
  return new Proxy(coreRepositories as any, {
    get(target, prop: string) {
      // 1. 支援動態註冊方法
      if (prop === 'registerLocalRepositories') {
        return (repos: Record<string, any>) => {
          Object.assign(localRepositories, repos)
        }
      }

      // 2. 優先從核心取得
      if (prop in target) {
        return target[prop]
      }

      // 3. 其次從本地註冊表取得
      if (prop in localRepositories) {
        return localRepositories[prop]
      }

      return undefined
    }
  }) as any
}
