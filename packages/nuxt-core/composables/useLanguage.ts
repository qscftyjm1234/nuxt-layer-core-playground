/**
 * 語系管理 Composable
 *
 * 封裝 @nuxtjs/i18n 的常用功能，提供更方便的 API
 * @returns 包含語系狀態與操作方法的物件
 * - `locale`: 目前的語系代碼 (Ref)
 * - `locales`: 所有可用的語系清單 (Ref)
 * - `currentLocale`: 目前的語系詳細設定 (Computed)
 * - `availableLocales`: 其他可切換的語系 (Computed)
 * - `setLocale`: 切換語系的函式
 *
 * @example
 * ```ts
 * const { currentLocale, availableLocales, setLocale } = useLanguage()
 *
 * // currentLocale 資料結構範例：
 * // {
 * //   code: 'zh',
 * //   name: '中文',
 * //   iso: 'zh-TW',
 * //   file: 'zh-TW.json'
 * // }
 *
 * // 切換語系
 * setLocale('en')
 * ```
 */
export const useLanguage = () => {
  // 嘗試取得 i18n 實例，如果沒裝模組就給預設值
  let i18n: any
  try {
    // @ts-ignore
    i18n = useI18n()
  } catch {
    // 沒裝模組時的後備 (Fallback)
    i18n = {
      locale: ref('zh'),
      locales: ref([{ code: 'zh', name: '中文' }]),
      setLocale: () => console.warn('[I18n] 模組未安裝，無法切換語系')
    }
  }

  const { locale, locales, setLocale } = i18n

  /**
   * 目前的語系設定物件
   */
  const currentLocale = computed(() => {
    const list = unref(locales) as any[]
    return list.find((l) => l.code === unref(locale)) || list[0]
  })

  /**
   * 其他可用的語系清單 (排除目前語系)
   * 用於語言切換選單
   */
  const availableLocales = computed(() => {
    const list = unref(locales) as any[]
    return list.filter((l) => l.code !== unref(locale))
  })

  return {
    locale,
    locales,
    currentLocale,
    availableLocales,
    setLocale
  }
}
