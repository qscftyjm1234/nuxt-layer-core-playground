// API 相關常數
const HEADER_AUTH = 'Authorization'
const TOKEN_PREFIX = 'Bearer '
const HEADER_LANG = 'Accept-Language'
const HEADER_REQUEST_ID = 'X-Request-ID'
const HEADER_CSRF = 'X-XSRF-TOKEN'
const COOKIE_CSRF = 'XSRF-TOKEN'

/**
 * 設定身分驗證 Header
 * @param headers
 * @param config
 */
export function setAuthHeader(headers: Record<string, string>, config: any) {
  const token = useCookie(config.public.auth.tokenKey as string)
  if (token.value) {
    headers[HEADER_AUTH] = `${TOKEN_PREFIX}${token.value}`
  }
}

/**
 * 設定 CSRF Header (防止跨站請求偽造)
 * 讀取後端設定的 XSRF-TOKEN Cookie，並將其放入 Header
 * @param headers
 */
export function setCsrfHeader(headers: Record<string, string>) {
  const csrfToken = useCookie(COOKIE_CSRF)
  if (csrfToken.value) {
    headers[HEADER_CSRF] = csrfToken.value
  }
}

/**
 * 設定多語系 Header
 * @param headers
 */
export function setI18nHeader(headers: Record<string, string>) {
  try {
    // @ts-ignore
    const { locale } = useI18n()
    if (locale.value) {
      headers[HEADER_LANG] = locale.value
    }
  } catch {
    // 忽略錯誤 (可能沒裝 i18n 模組)
  }
}

/**
 * 設定請求追蹤 ID Header
 * @param headers
 */
export function setRequestIdHeader(headers: Record<string, string>) {
  const requestId = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString()
  headers[HEADER_REQUEST_ID] = requestId
}
