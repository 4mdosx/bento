import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'

const requiredEntries = [
  'src/hosts/index.ts',
  'src/core/index.ts',
  'src/integrations/next/index.ts',
  'src/ui-runtime/index.ts',
  'src/views/index.ts',
]

test('public responsibility boundaries have entry points', () => {
  for (const entry of requiredEntries) {
    assert.ok(existsSync(entry), `missing ${entry}`)
  }
})

test('ambiguous legacy source directories are absent', () => {
  const sourceFiles = readdirSync('src', { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => `${entry.parentPath}/${entry.name}`)

  assert.equal(sourceFiles.some((file) => file.includes('/design-system/')), false)
  assert.equal(sourceFiles.some((file) => file.includes('/infrastructure/')), false)
})

test('package exposes responsibility-based subpaths', () => {
  const manifest = JSON.parse(readFileSync('package.json', 'utf8'))
  for (const subpath of [
    './core',
    './hosts/list',
    './integrations/next',
    './ui-runtime/overlay',
    './views',
  ]) {
    assert.ok(manifest.exports[subpath], `missing export ${subpath}`)
  }
})

test('package layers do not import source-delivered views', () => {
  const packageLayers = ['src/core', 'src/hosts', 'src/integrations', 'src/ui-runtime']
  for (const layer of packageLayers) {
    const files = readdirSync(layer, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.[cm]?[jt]sx?$/.test(entry.name))
    for (const entry of files) {
      const source = readFileSync(`${entry.parentPath}/${entry.name}`, 'utf8')
      assert.doesNotMatch(source, /from ['"][^'"]*views(?:\/|['"])/)
    }
  }
})
