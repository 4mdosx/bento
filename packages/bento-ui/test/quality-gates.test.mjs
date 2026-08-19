import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'))

test('agent manifest describes every capability with actionable metadata', () => {
  for (const capability of manifest.capabilities) {
    for (const field of ['layer', 'delivery', 'entry', 'dependencies', 'exports', 'propsSchema', 'examples', 'useCases']) {
      assert.ok(capability[field], `${capability.name} missing ${field}`)
    }
    for (const example of capability.examples) assert.ok(existsSync(`../../${example}`), `missing ${example}`)
  }
})

test('fixed agent recipe states safety and verification constraints', () => {
  const recipe = readFileSync('docs/agent/recipes/filterable-resource-list.md', 'utf8')
  assert.match(recipe, /不要复制 `useListHost`/)
  assert.match(recipe, /npm run verify/)
  assert.match(recipe, /窄\/宽断点/)
})

test('package runtime remains free of Tailwind and source View imports', () => {
  const host = readFileSync('src/hosts/list/useListHost.ts', 'utf8')
  assert.doesNotMatch(host, /className|tailwind|\/views\//i)
})
