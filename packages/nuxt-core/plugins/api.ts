import { useApiRegistry } from '../composables/useApiRegistry'
import repositories from '../core/repositories'

/**
 * API Plugin (整合層 - Registry 模式)
 *
 * 職責：
 * 1. 初始化 API Registry
 * 2. 預註冊 Core 層提供的基礎 Repositories
 * 3. 提供全域唯一的存取點 $api
 */
export default defineNuxtPlugin(() => {
  const registry = useApiRegistry()

  // 1. 預註冊 Core 層的 Repositories
  if (repositories) {
    Object.entries(repositories).forEach(([name, repo]) => {
      registry.register(name, repo)
    })
  }

  // 2. 建立一個 Proxy 物件，讓 $api 可以動態存取註冊進來的內容
  // 這解決了「App 層註冊的內容，在 Core 層也能透過 $api 存取」的問題
  const apiProxy = new Proxy({}, {
    get(target, prop: string) {
      return registry.getExports()[prop]
    }
  })

  return {
    provide: {
      api: apiProxy
    }
  }
})
