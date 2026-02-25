/**
 * Commit Types 共用設定
 *
 * 這個檔案是專案 Git 規範的「單一真理來源 (Single Source of Truth)」。
 * 它同時被以下兩個工具共用：
 * 1. commitlint: 檢查 commit message 是否符合規定 (configs/git/commitlint.config.cjs)
 * 2. commitizen: 產生互動式選單 (configs/git/cz-config.cjs)
 *
 * 修改這裡會同時影響上述兩個工具的行為。
 */

module.exports = {
  // -------------------------------------------------------------------------
  // Commit 類型定義
  // -------------------------------------------------------------------------
  // value:       commit message 中實際出現的關鍵字 (例如 feat)
  // name:        互動選單中顯示的文字
  // description: 額外說明 (部分工具會用到)
  types: [
    {
      value: 'feat',
      name: 'feat:     ✨  新功能 (feature)',
      description: '新增功能'
    },
    {
      value: 'fix',
      name: 'fix:      🐞  修補 Bug (bug fix)',
      description: '修復程式碼問題'
    },
    {
      value: 'docs',
      name: 'docs:     📚  文件修改 (documentation)',
      description: '只修改了文件'
    },
    {
      value: 'style',
      name: 'style:    💄  格式調整 (white-space, formatting)',
      description: '不影響程式碼運行的格式變動'
    },
    {
      value: 'refactor',
      name: 'refactor: ♻️   重構 (refactoring)',
      description: '既不是新增功能，也不是修補 bug 的程式碼變動'
    },
    {
      value: 'perf',
      name: 'perf:     ⚡️  效能改善 (performance)',
      description: '提升效能的改動'
    },
    {
      value: 'test',
      name: 'test:     ✅  測試相關 (testing)',
      description: '增加或修改測試'
    },
    {
      value: 'chore',
      name: 'chore:    🔧  雜務/工具 (chore)',
      description: '建置過程或輔助工具的變動 (不修改 src 或 test)'
    },
    {
      value: 'revert',
      name: 'revert:   ⏪  回退 (revert)',
      description: '回退先前的 commit'
    }
  ],

  // -------------------------------------------------------------------------
  // 長度限制
  // -------------------------------------------------------------------------
  maxHeaderLength: 72, // 標題最大長度 (GitHub 建議 72)
  maxLineLength: 100 // 內文每行最大長度
}
