import repositories from '../repositories'

/**
 * API Plugin (整合層)
 *
 * 職責：
 * 1. 將 repositories (資料層) 掛載到 Nuxt App 實體
 * 2. 提供全域唯一的存取點 $api
 *
 * 使用範例：
 * ```ts
 * const { $api } = useNuxtApp()
 *
 * // 呼叫 User 模組
 * const { data: users } = await $api.user.getUsers()
 *
 * // 呼叫 Order 模組
 * const { data: order } = await $api.order.getOrderById(1)
 * ```
 */
export default defineNuxtPlugin(() => {
  return {
    provide: {
      api: repositories
    }
  }
})
