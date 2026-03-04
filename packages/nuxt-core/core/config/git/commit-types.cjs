/**
 * Commit Types 共用設定
 */
module.exports = {
  types: [
    { value: 'feat', name: 'feat:     ✨  新功能 (feature)', description: '新增功能' },
    { value: 'fix', name: 'fix:      🐞  修補 Bug (bug fix)', description: '修復程式碼問題' },
    { value: 'docs', name: 'docs:     📚  文件修改 (documentation)', description: '只修改了文件' },
    { value: 'style', name: 'style:    💄  格式調整 (white-space, formatting)', description: '不影響程式碼運行的格式變動' },
    { value: 'refactor', name: 'refactor: ♻️   重構 (refactoring)', description: '既不是新增功能，也不是修補 bug 的程式碼變動' },
    { value: 'perf', name: 'perf:     ⚡️  效能改善 (performance)', description: '提升效能的改動' },
    { value: 'test', name: 'test:     ✅  測試相關 (testing)', description: '增加或修改測試' },
    { value: 'chore', name: 'chore:    🔧  雜務/工具 (chore)', description: '建置過程或輔助工具的變動 (不修改 src 或 test)' },
    { value: 'revert', name: 'revert:   ⏪  回退 (revert)', description: '回退先前的 commit' }
  ],
  maxHeaderLength: 72,
  maxLineLength: 100
}
