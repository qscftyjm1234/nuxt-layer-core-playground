import repositories from '../repositories'

/**
 * 提供存取所有 API Repository 的 Composable
 * 在元件中使用: const { user } = useRepository()
 * @returns 所有 API Repository
 */
export const useRepository = () => repositories
