import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import jsdoc from 'eslint-plugin-jsdoc'
import vueParser from 'vue-eslint-parser'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      jsdoc,
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      'vue/no-v-html': 'error',
      'vue/no-empty-alt': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/script-setup-uses-vars': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/valid-v-slot': 'off',
      'vue/html-self-closing': 'off',
      'vue/block-lang': ['warn', { script: { lang: 'ts' } }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/no-useless-v-bind': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/attributes-order': ['error', { alphabetical: false }],
      'vue/order-in-components': 'error',
      'vue/max-attributes-per-line': ['error', { singleline: 1, multiline: 1 }],
      'vue/max-len': ['error', { code: 120, template: 120, ignoreComments: true, ignoreUrls: true, ignoreStrings: true }],
      'eqeqeq': ['error', 'smart'],
      'no-var': 'error',
      'prefer-const': 'error',
      'curly': ['error', 'all'],
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'no-lonely-if': 'error',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false,
            FunctionExpression: false
          },
          contexts: [
            'ExportNamedDeclaration > FunctionDeclaration',
            'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ArrowFunctionExpression',
            'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > FunctionExpression',
            'ExportDefaultDeclaration > FunctionDeclaration',
            'ExportDefaultDeclaration > ArrowFunctionExpression',
            'ExportDefaultDeclaration > FunctionExpression'
          ]
        }
      ],
      'jsdoc/require-param': 'warn',
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-returns': 'warn',
      'jsdoc/require-returns-description': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'should', 'has', 'can', 'did', 'will']
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
          prefix: [
            'get', 'set', 'fetch', 'handle', 'click', 'submit', 'validate', 'create', 'update', 'delete', 'toggle', 'show', 'hide', 'open', 'close', 'add', 'remove', 'clear', 'reset',
            'initialize', 'init', 'process', 'execute', 'perform', 'complete', 'setup', 'run',
            'is', 'has', 'should', 'can', 'will', 'check', 'verify',
            'on', 'use', 'format', 'mask', 'parse', 'build', 'register', 'scan'
          ]
        },
        {
          selector: ['class', 'interface', 'typeAlias', 'enum'],
          format: ['PascalCase']
        }
      ]
    }
  },
  prettierConfig,
  {
    ignores: [
      'tests/', 'playwright/', 'node_modules/', 'dist/', '**/.nuxt/', '.output/', '.config/',
      'tsconfig.json', 'plugins/', 'generate/', 'public/js/hanlinks/', '**/*.cjs', '*.js',
      'scripts/', 'configs/', 'types/api.d.ts', '**/*-test.{js,ts,vue}', '**/*.test.{js,ts,vue}', '**/*.ignore.{js,ts,vue}'
    ]
  }
)
