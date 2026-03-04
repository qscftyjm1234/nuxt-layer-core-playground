import type { AsyncData } from 'nuxt/app'

/**
 * Repository 方法的通用快照類型，用於解決 TS 推導過深的問題
 */
export type RepoMethod<T = any> = (...args: any[]) => Promise<AsyncData<T, any>> | any

/**
 * 通用 Repository 介面
 */
export interface IRepository {
  [key: string]: RepoMethod
}
