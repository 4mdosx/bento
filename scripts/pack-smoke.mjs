import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const packDir = mkdtempSync(join(tmpdir(), 'bento-pack-'))
const tarballName = execFileSync('npm', ['pack', '--pack-destination', packDir], {
  cwd: join(root, 'packages/bento-kit'),
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'inherit'],
}).trim().split('\n').filter(Boolean).at(-1)
const tarball = join(packDir, tarballName)
assert.ok(existsSync(tarball), `missing tarball: ${tarball}`)

const appDir = join(packDir, 'demo-app')
execFileSync('npx', ['--yes', `--package=${tarball}`, 'bento', 'init', appDir, '--skip-install'], {
  cwd: packDir,
  stdio: 'inherit',
  env: process.env,
})

const packagePath = join(appDir, 'package.json')
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'))
packageJson.dependencies['bento-kit'] = tarball
writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`)

execFileSync('npm', ['install', '--legacy-peer-deps'], {
  cwd: appDir,
  stdio: 'inherit',
  env: process.env,
})

const require = createRequire(import.meta.url)
const doctor = require('../packages/bento-kit/cli/doctor.js')
const health = doctor({ cwd: appDir })
assert.equal(health.ok, true, JSON.stringify(health.checks, null, 2))

for (const file of [
  '.git',
  'app/page.tsx',
  'app/layout.tsx',
  'bento.json',
  'components/bento/theme.css',
  'components/bento/views/ListView.tsx',
  'components/bento/primitives/Button.tsx',
  'node_modules/bento-kit/dist/theme.css',
  'node_modules/bento-kit/registry/registry.json',
]) {
  assert.ok(existsSync(join(appDir, file)), `missing ${file}`)
}

console.log(`pack smoke ok\ntarball ${tarball}\napp     ${appDir}`)
