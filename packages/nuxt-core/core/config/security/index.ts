/**
 * 資安設定統一匯出入口
 * @description 提供單一入口存取所有資安相關設定
 */

// 匯出所有設定模組
export * from './options'
export * from './messages'
export * from './headers'

// 提供快速存取別名
export { defaultSecurityOptions as securityOptions } from './options'
export { securityMessages } from './messages'
export { securityConfig as securityHeaders } from './headers'
