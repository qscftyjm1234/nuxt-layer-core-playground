// 使用 import.meta.glob 動態引入所有 modules 下的 sidebar.ts
// eager: true 表示直接引入模組 (不需 await)
// import: 'default' 表示只取 default export
const modules = import.meta.glob('~/modules/*/sidebar.ts', { eager: true, import: 'default' })

export const sidebarRegistry = Object.values(modules)
