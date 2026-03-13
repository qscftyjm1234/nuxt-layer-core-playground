import { execSync } from 'child_process'

/**
 * 自動化發布腳本
 * 用法:
 *   npm run release         (預設 patch: 1.1.0 -> 1.1.1)
 *   npm run release minor   (1.1.0 -> 1.2.0)
 *   npm run release major   (1.1.0 -> 2.0.0)
 */

const type = process.argv[2] || 'patch'

try {
  console.log(`\n\x1b[36m[Release] Step 1: Bumping version (${type})...\x1b[0m`)
  execSync(`npm version ${type} --no-git-tag-version`, { stdio: 'inherit' })

  console.log(`\n\x1b[36m[Release] Step 2: Publishing to npm...\x1b[0m`)
  execSync('npm publish', { stdio: 'inherit' })

  console.log('\n\x1b[32m[Release] Successfully published! 🎉\x1b[0m\n')
} catch (error) {
  console.error('\n\x1b[31m[Release] Failed to publish:\x1b[0m', error.message)
  process.exit(1)
}
