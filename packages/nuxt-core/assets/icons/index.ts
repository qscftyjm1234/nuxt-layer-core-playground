/**
 * Custom SVG Icons Registry
 * 集中管理自訂 SVG 圖示
 *
 * 使用方式：
 * import { customIcons } from '@/assets/icons'
 * <IIcon :icon="customIcons.SoftLeaderIcon" />
 *
 * 或直接用字串：
 * <IIcon icon="custom:softleader" />
 */

// 自動導入所有 SVG 檔案
const svgModules = import.meta.glob('./*.svg', {
  query: '?raw',
  eager: true,
  import: 'default'
})

// 建立圖示映射表
export const customIcons: Record<string, string> = {}

// 處理檔名並建立映射
Object.entries(svgModules).forEach(([path, content]) => {
  // 從路徑提取檔名：'./softleader.svg' -> 'softleader'
  const fileName = path.replace(/^\.\//, '').replace(/\.svg$/, '')

  // 轉換為 PascalCase：'softleader' -> 'SoftLeaderIcon'
  const iconName = `${fileName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')}Icon`

  customIcons[iconName] = content as string

  // 同時保留小寫版本方便使用
  customIcons[fileName] = content as string
})

// 導出個別圖示（方便 tree-shaking）
// export const ExampleIcon = customIcons.ExampleIcon

// 預設導出
export default customIcons
