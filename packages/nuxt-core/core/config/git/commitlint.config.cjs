const { types, maxHeaderLength, maxLineLength } = require('./commit-types.cjs')

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', types.map((t) => t.value)],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', maxHeaderLength],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', maxLineLength],
    'footer-leading-blank': [1, 'always']
  }
}
