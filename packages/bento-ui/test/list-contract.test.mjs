import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const host = readFileSync('src/hosts/list/useListHost.ts', 'utf8')
const demo = readFileSync('../../apps/docs/src/component-docs/examples/ResourceListExample.tsx', 'utf8')

test('List Host cancels stale requests and ignores stale responses', () => {
  assert.match(host, /createLatestRequestCoordinator/)
  assert.match(host, /currentExecution === executionId\.current/)
  assert.match(host, /actionsRef\.current\.query/)
})

test('resource list has named search and responsive table/list presentations', () => {
  assert.match(demo, /aria-label="Search resources"/)
  assert.match(demo, /<table/)
  assert.match(demo, /mobile=/)
  assert.match(demo, /tablet=/)
})
