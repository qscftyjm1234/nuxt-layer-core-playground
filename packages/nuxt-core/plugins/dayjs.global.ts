/**
 * @目的　第三方套件初始化，註冊為全域變數（不需 import / setup )
 * @指令 `pnpm add dayjs`
 * @名詞 `defineNuxtPlugin`：註冊 plugin 的方法
 */

import dayjs from 'dayjs'
// import utc from 'dayjs/plugin/utc'
// import relativeTime from 'dayjs/plugin/relativeTime'

export default defineNuxtPlugin(() => {
  // 引入額外插件
  // 使用 extend 注入插件
  // dayjs.extend(utc)
  // dayjs.extend(relativeTime)
  ;(globalThis as any).dayjs = dayjs
})
