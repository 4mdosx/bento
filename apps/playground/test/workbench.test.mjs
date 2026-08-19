import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

for (const route of ['button', 'list', 'detail']) {
  test(`${route} uses the shared interactive workbench`, () => {
    const page = readFileSync(`app/${route}/page.tsx`, 'utf8')
    assert.match(page, /ComponentWorkbench/)
    assert.match(page, /componentCatalog/)
  })
}

test('contribution workflow is present and linked from navigation', () => {
  assert.ok(existsSync('../../CONTRIBUTING.md'))
  assert.ok(existsSync('../../docs/component-development.md'))
  assert.ok(existsSync('../../.github/pull_request_template.md'))
  assert.match(readFileSync('components/ShellLayout.tsx', 'utf8'), /\/workflow/)
})
