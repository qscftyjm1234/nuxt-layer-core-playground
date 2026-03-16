export const useAppInfo = () => {
  const config = useAppConfig()
  return { getProjectTitle: () => config.title || '未命名專案' }
}
