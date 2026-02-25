/**
 * useOptions Composable
 * =============================================================================
 *
 * [架構說明]
 * 本檔案分為三個主要部分，請依需求修改對應區塊：
 *
 * 1. EXTENSIONS (擴充功能) - 若要新增 .withAll, .label 等方法，請改這裡。
 * 2. DATA LOADER (資料載入) - 若要修改 API 呼叫或快取邏輯，請改這裡。
 * 3. PROXY FACTORY (核心代理) - 這是黑盒子，通常不需要修改。
 *
 * =============================================================================
 */

import { reactive, isRef } from 'vue'
import type { OptionItem, OptionArray, OptionDefinition } from '../core/options/types'
import { optionsRegistry, type OptionKey, type Options } from '../core/options/registry'

// #region 1. EXTENSIONS (擴充功能定義)
// =============================================================================
/**
 * 這裡定義所有 options.xxx 能夠使用的擴充屬性與方法
 * 參數 ctx 包含：{ data: 當前資料, state: 載入狀態, args: 呼叫參數, definition: 原始定義 }
 */
type ExtensionContext = {
  data: OptionItem[]
  state: { isLoading: boolean; isLoaded: boolean }
  args: unknown[]
  definition: OptionDefinition
  registryKey: string
  refresh: () => Promise<OptionItem[]>
}

const ExtensionHandlers: Record<string, (ctx: ExtensionContext) => any> = {
  /**
   * 取得載入狀態
   * @param ctx - 擴充上下文
   * @returns 是否正在載入
   */
  isLoading: (ctx) => ctx.state.isLoading,

  /**
   * 取得是否載入完成
   * @param ctx - 擴充上下文
   * @returns 是否載入完成標記
   */
  isLoaded: (ctx) => ctx.state.isLoaded,

  /**
   * 取得含「全部」的選項
   * @param ctx - 擴充上下文
   * @returns 選項陣列（首項為「全部」）
   */
  withAll: (ctx) => [{ label: '全部', value: '' }, ...ctx.data],

  /**
   * 取得含「其他」的選項
   * @param ctx - 擴充上下文
   * @returns 選項陣列（末項為「其他」）
   */
  other: (ctx) => [...ctx.data, { label: '其他', value: 'other' }],

  /**
   * 根據 value 取得 label
   * @param ctx - 擴充上下文
   * @returns 轉換函數 (value -> label)
   */
  label: (ctx) => (value: unknown) => {
    const found = ctx.data.find((o) => o.value === value)
    return found?.label || String(value)
  },

  /**
   * 根據 value 取得完整物件
   * @param ctx - 擴充上下文
   * @returns 查找函數
   */
  findByValue: (ctx) => (value: unknown) => ctx.data.find((o) => o.value === value),

  /**
   * 排除特定選項
   * @param ctx - 擴充上下文
   * @returns 過濾函數 (排除)
   */
  exclude: (ctx) => (values: unknown[]) => ctx.data.filter((o) => !values.includes(o.value)),

  /**
   * 只保留特定選項
   * @param ctx - 擴充上下文
   * @returns 過濾函數 (保留)
   */
  only: (ctx) => (values: unknown[]) => ctx.data.filter((o) => values.includes(o.value)),

  /**
   * 取得原始資料（用於 debug）
   * @param ctx - 擴充上下文
   * @returns 原始陣列資料（純陣列）
   */
  value: (ctx) => [...ctx.data],

  /**
   * 取得原始資料（別名）
   * @param ctx - 擴充上下文
   * @returns 原始陣列資料（純陣列）
   */
  get: (ctx) => () => [...ctx.data],

  /**
   * 強制重新載入
   * @param ctx - 擴充上下文
   * @returns 重新載入函數
   */
  reload: (ctx) => async () => await ctx.refresh()
}
// =============================================================================
// #endregion

// #region 2. DATA LOADER (資料載入載與狀態管理)
// =============================================================================

// 全域快取 (Global Cache)
const globalCache = new Map<string, { data: OptionItem[]; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 分鐘

/**
 * 負責處理資料的取得、快取與狀態更新
 * @param registryKey - 選項鍵值
 * @param definition - 選項定義
 * @returns 資料載入器物件 (getState, loadData, refreshData)
 */
function useOptionDataLoader(registryKey: string, definition: OptionDefinition) {
  // 參數 -> 狀態對應表 (Map<JSON_Args, State>)
  const stateMap = new Map<string, { data: OptionItem[]; isLoading: boolean; isLoaded: boolean }>()

  // 取得或建立狀態
  const getState = (args: unknown[]) => {
    const key = args.length ? JSON.stringify(args) : 'default'
    if (!stateMap.has(key)) {
      stateMap.set(key, reactive({ data: [], isLoading: false, isLoaded: false }))
    }

    return stateMap.get(key)!
  }

  // 執行資料載入
  const loadData = (args: unknown[]): OptionItem[] => {
    const state = getState(args)

    // A. 記憶體快取 (Memory Cache)
    if (state.data.length > 0) return state.data

    // B. 全域快取 (Global Cache) - 僅無參數時
    if (args.length === 0 && !state.isLoaded) {
      const gCached = globalCache.get(registryKey)
      if (gCached && Date.now() - gCached.timestamp < CACHE_TTL) {
        state.data.push(...gCached.data)
        state.isLoaded = true
        return state.data
      }
    }

    // C. 根據定義類型載入
    parseDefinition(definition, args, state, registryKey)

    return state.data
  }

  // 強制重新整理
  const refreshData = async (args: unknown[]): Promise<OptionItem[]> => {
    const state = getState(args)

    if (typeof definition === 'function') {
      // 重置狀態以觸發重新請求
      state.isLoading = false
      state.isLoaded = false

      const result = definition(...args)
      if (result instanceof Promise) {
        state.isLoading = true
        try {
          const data = await result
          state.data.splice(0, state.data.length, ...data)
          state.isLoaded = true
          if (args.length === 0) globalCache.set(registryKey, { data, timestamp: Date.now() })
          return data
        } finally {
          state.isLoading = false
        }
      }

      // Sync function handling within refresh
      parseDefinition(definition, args, state, registryKey)
    }
    return state.data
  }

  return { getState, loadData, refreshData }
}

// 輔助：解析定義檔內容並更新狀態
/**
 * 解析定義並載入資料
 * @param def - 選項定義
 * @param args - 參數
 * @param state - 目標狀態
 * @param state.data - 選項資料陣列
 * @param state.isLoading - 是否正在載入
 * @param state.isLoaded - 是否已載入完成
 * @param key - 鍵值
 * @returns void
 */
function parseDefinition(
  def: OptionDefinition,
  args: unknown[],
  state: { data: OptionItem[]; isLoading: boolean; isLoaded: boolean },
  key: string
) {
  // 1. Static Array
  if (Array.isArray(def)) {
    if (!state.isLoaded) {
      state.data.push(...def)
      state.isLoaded = true
    }
    return
  }

  // 2. Ref
  if (isRef(def)) {
    if (!state.isLoaded) {
      state.data.push(...(def.value as OptionItem[]))
      state.isLoaded = true
    }
    return
  }

  // 3. Function / Promise
  if (typeof def === 'function') {
    const result = def(...args)

    if (result instanceof Promise) {
      if (!state.isLoading && !state.isLoaded) {
        state.isLoading = true
        result
          .then((data) => {
            state.data.splice(0, state.data.length, ...data)
            state.isLoaded = true
            if (args.length === 0) {
              globalCache.set(key, { data, timestamp: Date.now() })
            }
          })
          .catch((err) => console.error(`[Options] Load error (${key}):`, err))
          .finally(() => (state.isLoading = false))
      }
    } else if (!state.isLoaded) {
      // Sync function
      state.data.push(...(result as OptionItem[]))
      state.isLoaded = true
    } else if (Array.isArray(result)) {
      // 如果結果是陣列 (legacy support or other case)
      // 保留此分支以防萬一，但目前邏輯似乎不需要
    }
  }
}
// =============================================================================
// #endregion

// #region 3. PROXY FACTORY (核心代理邏輯)
// =============================================================================

/**
 * 建立增強型選項代理 (Enhanced Option Proxy)
 * @param registryKey - Registry Key
 * @param definition - 選項定義
 * @returns 選項陣列代理
 */
function createOptionProxy(registryKey: string, definition: OptionDefinition): OptionArray {
  // 取得該選項的資料載入器
  const loader = useOptionDataLoader(registryKey, definition)

  // 內層：建立陣列代理
  const createArrayWithExtensions = (args: unknown[]): OptionArray => {
    // 1. 準備資料
    const data = loader.loadData(args)

    // 2. 建立 Proxy 攔截屬性讀取
    // 2. 建立 Proxy 攔截屬性讀取
    const proxyHandler: ProxyHandler<object> = {
      get(target, prop) {
        // 0. 支援 Iterator (讓 v-for 可用)
        if (prop === Symbol.iterator) {
          return data[Symbol.iterator].bind(data)
        }

        // D. 讓 JSON.stringify 正常運作 (攔截 toJSON)
        if (prop === 'toJSON') {
          return () => data
        }

        // S. 安全轉換字串
        if (prop === 'toString') {
          return () => JSON.stringify(data, null, 2)
        }

        // I. 改善 console.log 輸出 (Node.js inspect)
        if (prop === 'inspect' || prop === Symbol.for('nodejs.util.inspect.custom')) {
          return () => data
        }

        // C. 改善瀏覽器 console.log 輸出
        if (prop === Symbol.toStringTag) {
          return 'OptionArray'
        }

        // V. 瀏覽器 DevTools 自訂格式化（Chrome/Edge）
        if (prop === 'constructor') {
          return Array
        }

        // A. 優先檢查是否為「擴充功能」
        if (typeof prop === 'string' && prop in ExtensionHandlers) {
          const context: ExtensionContext = {
            data: loader.loadData(args), // 永遠取得最新資料
            state: loader.getState(args),
            args,
            definition,
            registryKey,
            refresh: () => loader.refreshData(args)
          }

          return ExtensionHandlers[prop](context)
        }

        // B. 否則視為一般陣列操作，轉發給 data
        const value = Reflect.get(data, prop)
        if (typeof value === 'function') {
          return value.bind(data)
        }
        return value
      },

      // C. 支援遞迴呼叫: options.xxx(...args)
      apply(target, thisArg, callArgs) {
        return createArrayWithExtensions(callArgs)
      },

      getPrototypeOf: () => Array.prototype
    }

    // 目標：若沒參數(root)，要是可呼叫的 function；若有參數，也維持可呼叫(雖然目前邏輯不支援巢狀參數，但保持一致性)
    const target = () => loader.loadData(args)
    return new Proxy(target, proxyHandler) as OptionArray
  }

  // 回傳初始代理 (無參數)
  return createArrayWithExtensions([])
}

// =============================================================================
// #endregion

// #region Public Exports (公開 API)
// =============================================================================

let singletonOptions: Options | null = null

/**
 * [Composable] 取得全域選項物件
 * @returns 全域選項物件代理，包含所有定義在 registry 的選項
 */
export function useOptions(): Options {
  if (!singletonOptions) {
    const proxies: Record<string, OptionArray> = {}
    for (const key of Object.keys(optionsRegistry) as OptionKey[]) {
      proxies[key] = createOptionProxy(key, optionsRegistry[key] as any)
    }

    // 定義根物件的 toJSON，確保 {{ options }} 能顯示內容
    Object.defineProperty(proxies, 'toJSON', {
      value: () => {
        const result: Record<string, any> = {}
        for (const key in proxies) {
          result[key] = (proxies[key] as any).toJSON ? (proxies[key] as any).toJSON() : proxies[key]
        }
        return result
      },
      enumerable: false
    })

    singletonOptions = proxies as Options
  }
  return singletonOptions
}

// --- Standalone Helpers ---

/**
 * 非同步取得選項資料
 * @param key - 選項 Key
 * @returns 選項資料 Promise
 */
export async function fetchOption(key: OptionKey): Promise<OptionItem[]> {
  const def = optionsRegistry[key]
  if (typeof def === 'function') {
    const res = def()
    if (res instanceof Promise) return await res
    return res
  }
  if (Array.isArray(def)) return def
  if (isRef(def)) return def.value as OptionItem[]
  return []
}

/**
 * 同步取得選項 (僅限靜態資料)
 * @param key - 選項 Key
 * @returns 選項資料陣列
 */
export function getOptionSync(key: OptionKey): OptionItem[] {
  const def = optionsRegistry[key]
  if (Array.isArray(def)) return def
  return []
}

/**
 * 取得 Label 輔助函式
 * @param key - 選項 Key
 * @param value - 選項值
 * @returns 對應的 Label
 */
export function getOptionLabel(key: OptionKey, value: unknown): string {
  const options = getOptionSync(key)
  const found = options.find((o) => o.value === value)
  return found?.label || String(value)
}
// =============================================================================
// #endregion
