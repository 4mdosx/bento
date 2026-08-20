import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const list = readFileSync('../../apps/docs/src/component-docs/examples/ResourceListExample.tsx', 'utf8')
const overlay = readFileSync('src/views/primitives/overlay/Modal.tsx', 'utf8')
const button = readFileSync('src/views/primitives/Button.tsx', 'utf8')

test('List MVP exposes names, status messages and table headers', () => {
  assert.match(list, /aria-label="Search resources"/)
  assert.match(list, /role="status"/)
  assert.match(list, /role="alert"/)
  assert.match(list, /<th>Name<\/th>/)
  assert.match(list, /aria-label="Resource (cards|table)"/)
})

test('modal delegates accessible dialog behavior to Radix', () => {
  assert.match(overlay, /Dialog\.Content/)
  assert.match(overlay, /Dialog\.Overlay/)
})

test('button exposes busy semantics and blocks activation while unavailable', () => {
  assert.match(button, /aria-busy=\{loading \|\| undefined\}/)
  assert.match(button, /interactionDisabled = disabled \|\| loading/)
  assert.match(button, /event\.preventDefault\(\)/)
  assert.match(button, /type \?\? 'button'/)
  assert.doesNotMatch(button, /variant|buttonVariants/)
})
