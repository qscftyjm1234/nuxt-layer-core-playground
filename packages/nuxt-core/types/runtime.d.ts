import '@nuxt/schema'

interface AppRuntimeConfig {
  env: string
  debug: boolean
  isDev: boolean
  uaIdentifier: string
  productConfig: any
}

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    app: AppRuntimeConfig
  }
}

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    app: AppRuntimeConfig
  }
}

export {}
