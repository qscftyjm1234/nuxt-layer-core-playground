'use strict'
const { types, maxHeaderLength } = require('./commit-types.cjs')

module.exports = {
  types,
  scopes: [],
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'breaking', 'footer'],
  subjectLimit: maxHeaderLength,
  messages: {
    type: '請選擇提交類型 (Type):',
    scope: '請輸入影響模組 (Scope) [可跳過]:',
    customScope: '請輸入自訂模組範圍:',
    subject: '請輸入標題 [必填]:',
    body: '請輸入詳細描述 [可跳過]:\n',
    breaking: '列出任何破壞性變動 [可跳過]:\n',
    footer: '列出此變更關閉的 Issues [可跳過]:\n',
    confirmCommit: '確定要提交以上內容嗎?'
  }
}
