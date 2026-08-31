import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const matrix = JSON.parse(readFileSync('../../quality/visual-scenarios.json', 'utf8'))
const widths = new Set(matrix.scenarios.filter((item) => item.path === '/list').map((item) => item.width))

test('critical List viewport matrix covers mobile, tablet and desktop', () => {
  assert.deepEqual([...widths].sort((a, b) => a - b), [390, 768, 1440])
  for (const scenario of matrix.scenarios) {
    assert.ok(scenario.expects.length > 0)
    assert.ok(scenario.height >= 800)
  }
})
