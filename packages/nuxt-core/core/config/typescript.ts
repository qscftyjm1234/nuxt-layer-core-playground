import type { NuxtConfig } from 'nuxt/schema'

export const typescriptConfig: NuxtConfig['typescript'] = {
  strict: false, // 開啟嚴格模式
  typeCheck: false, // 開發時檢查型別 (暫時關閉)
  shim: false, // 減少不必要的 shim 檔案
  tsConfig: {
    compilerOptions: {
      composite: true,
      emitDeclarationOnly: true,
      noEmit: false,
      skipLibCheck: true,
      moduleResolution: 'bundler'
    }
  }
}
