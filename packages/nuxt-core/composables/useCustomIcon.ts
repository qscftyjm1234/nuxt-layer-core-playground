/**
 * useCustomIcon Composable
 * 用於在 IIcon 中動態載入自訂圖示
 */

import { ref, watch } from 'vue'
import type { Ref } from 'vue'

// 圖示快取，避免重複載入
const iconCache: Record<string, string> = {}

/**
 * 使用自訂圖示
 * @param iconName - 圖示名稱 Ref
 * @returns 圖示相關狀態與內容
 */
export function useCustomIcon(iconName: Ref<string | undefined>) {
  const svgContent = ref<string>('')
  const isLoading = ref(false)
  const error = ref<string>('')

  // 載入圖示
  const loadIcon = async (name: string) => {
    // 檢查快取
    if (iconCache[name]) {
      svgContent.value = iconCache[name]
      return
    }

    isLoading.value = true
    error.value = ''

    try {
      // 動態導入圖示註冊表
      const { customIcons } = await import('../assets/icons')

      // 嘗試多種格式
      const icon =
        customIcons[name] ||
        customIcons[`${name}Icon`] ||
        customIcons[`${name.charAt(0).toUpperCase() + name.slice(1)}Icon`]

      if (icon) {
        iconCache[name] = icon
        svgContent.value = icon
      } else {
        error.value = `Custom icon "${name}" not found`
        console.warn(error.value)
      }
    } catch (err) {
      error.value = `Failed to load custom icon "${name}"`
      console.error(error.value, err)
    } finally {
      isLoading.value = false
    }
  }

  // 監聽圖示名稱變化
  watch(
    iconName,
    (newName) => {
      if (newName) {
        loadIcon(newName)
      } else {
        svgContent.value = ''
      }
    },
    { immediate: true }
  )

  return {
    svgContent,
    isLoading,
    error
  }
}
