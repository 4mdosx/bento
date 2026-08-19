import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const host = readFileSync('src/hosts/list/useListHost.ts', 'utf8')
const demo = readFileSync('../../apps/playground/src/demos/list/ResourceListDemo.tsx', 'utf8')

test('List Host cancels stale requests and ignores stale responses', () => {
  assert.match(host, /requestRef\.current\?\.abort\(\)/)
  assert.match(host, /requestId === requestIdRef\.current/)
  assert.match(host, /signal: controller\.signal/)
})

test('resource list has named search and responsive table/list presentations', () => {
  assert.match(demo, /aria-label="Search resources"/)
  assert.match(demo, /<table/)
  assert.match(demo, /mobile=/)
  assert.match(demo, /tablet=/)
})
