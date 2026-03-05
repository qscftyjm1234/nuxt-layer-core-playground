import type { App } from 'vue'

/**
 * API Registry (擴充運作模式)
 *
 * 讓外部專案可以動態註冊自己的 Repository 到 $api 中
 */
class ApiRegistry {
  private repositories: Record<string, any> = {}

  /**
   * 註冊 Repository
   * @param name 模組名稱 (例如 'order')
   * @param repository 實作物件
   */
  register(name: string, repository: any) {
    this.repositories[name] = repository
  }

  /**
   * 取得所有已註冊的 Repositories
   */
  getExports() {
    return this.repositories
  }
}

const registry = new ApiRegistry()

export const useApiRegistry = () => registry
