import user from './modules/user'
import auth from './modules/auth'


/**
 * Repository Index (資料層)
 *
 * 職責：
 * 1. 自動掃描 modules 資料夾下的所有檔案
 * 2. 將它們打包成一個大物件匯出
 * 3. 不依賴 Nuxt，純粹的資料定義
 */

const repositories = {
  user,
  auth,

}

export default repositories
