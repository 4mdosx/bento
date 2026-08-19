import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

execFileSync('npm', ['run', 'build', '-w', 'bento-ui'], { stdio: 'inherit' })
for (const file of [
  'packages/bento-ui/dist/index.js',
  'packages/bento-ui/dist/index.d.ts',
  'packages/bento-ui/dist/hosts/list/index.js',
  'packages/bento-ui/dist/hosts/list/index.d.ts',
  'packages/bento-ui/dist/theme.css',
]) assert.ok(existsSync(file), `missing package artifact: ${file}`)

const pack = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json'], {
  cwd: 'packages/bento-ui', encoding: 'utf8',
  env: { ...process.env, npm_config_cache: join(tmpdir(), 'bento-npm-cache') },
}))
const files = new Set(pack[0].files.map((file) => file.path))
assert.ok(files.has('dist/index.js'))
assert.ok(files.has('dist/index.d.ts'))
assert.equal([...files].some((file) => file.startsWith('src/')), false)
console.log(`verified ${files.size} publishable files`)
