import type { NuxtConfig } from 'nuxt/schema'

/**
 * 建置設定
 *
 * 控制 Nuxt 如何編譯和打包你的應用程式
 *
 * @see https://nuxt.com/docs/api/nuxt-config#build
 */
export const buildConfig: NuxtConfig['build'] = {
  transpile: ['vuetify']
}
