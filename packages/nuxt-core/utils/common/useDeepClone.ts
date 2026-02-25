import cloneDeep from 'lodash.clonedeep'

/**
 * 深拷貝一個物件或陣列，避免引用錯亂
 * @param source 原始物件或陣列
 * @returns 完整拷貝的新物件
 */
export function useDeepClone(source: any) {
  return cloneDeep(source)
}
