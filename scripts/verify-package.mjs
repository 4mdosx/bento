import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

execFileSync('npm', ['run', 'build', '-w', 'bento-kit'], { stdio: 'inherit' })
for (const file of [
  'packages/bento-kit/dist/index.js',
  'packages/bento-kit/dist/index.d.ts',
  'packages/bento-kit/dist/hosts/list/index.js',
  'packages/bento-kit/dist/hosts/list/index.d.ts',
  'packages/bento-kit/dist/theme.css',
]) assert.ok(existsSync(file), `missing package artifact: ${file}`)

const pack = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json'], {
  cwd: 'packages/bento-kit', encoding: 'utf8',
  env: { ...process.env, npm_config_cache: join(tmpdir(), 'bento-npm-cache') },
}))
const files = new Set(pack[0].files.map((file) => file.path))
assert.ok(files.has('dist/index.js'))
assert.ok(files.has('dist/index.d.ts'))
assert.ok(files.has('cli/command.js'))
assert.ok(files.has('cli/package.json'))
assert.ok(files.has('templates/next-app/app/page.tsx'))
assert.ok(files.has('registry/registry.json'))
assert.ok(files.has('registry/list/ListView.tsx'))
assert.equal([...files].some((file) => file.startsWith('src/')), false)
console.log(`verified ${files.size} publishable files`)
