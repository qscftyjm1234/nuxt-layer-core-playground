export default {
  '*.{js,jsx,ts,tsx,mjs,cjs}': ['eslint --fix', 'prettier --write'],
  '*.vue': ['eslint --fix', 'prettier --write'],
  '*.{json,yaml,yml,md}': ['prettier --write'],
  '*.{css,scss,sass}': ['prettier --write']
}
