/**
 * 示範：如何獲取核心層的 Blueprint 設定
 */
export const useAppInfo = () => {
  const config = useAppConfig()
  
  const getProjectTitle = () => config.title || '未命名專案'
  
  return {
    getProjectTitle
  }
}
