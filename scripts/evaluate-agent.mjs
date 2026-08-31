import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const init = require('../packages/bento-kit/cli/init.js')
const { add } = require('../packages/bento-kit/cli/registry.js')

const cwd = mkdtempSync(join(tmpdir(), 'bento-agent-eval-'))
init('.', { cwd, skipInstall: true, skipGit: true })
const result = add('list', { cwd })
const generated = readFileSync(result.operations[0].target, 'utf8')
assert.match(generated, /ListHostValue/)
assert.doesNotMatch(generated, /useListHost\s*\(/)
const report = {
  task: 'filterable-resource-list',
  success: true,
  generatedFiles: result.operations.filter((entry) => entry.action === 'create').length,
  extraDependencies: Object.keys(result.item.dependencies).filter((name) => name !== 'bento-kit').length,
  hostInternalsModified: false,
}
console.log(JSON.stringify(report))
