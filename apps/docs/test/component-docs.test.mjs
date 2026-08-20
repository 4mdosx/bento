import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const definitions = readFileSync('src/component-docs/definitions.tsx', 'utf8')
const workbench = readFileSync('src/component-docs/ExecutableComponentDoc.tsx', 'utf8')
const tokenOverview = readFileSync('src/component-docs/DesignTokenOverview.tsx', 'utf8')

test('existing component scenarios are represented in executable docs', () => {
  for (const slug of ['button', 'list', 'detail']) assert.match(definitions, new RegExp(`slug: '${slug}'`))
  assert.match(workbench, /activeDefinition|definition\.fromCode/)
  assert.match(workbench, /definition\.toCode/)
  assert.match(workbench, /MonacoCodeEditor/)
})

test('overview provides a dedicated page for all relevant design tokens', () => {
  assert.match(definitions, /tokens: buttonTokens/)
  assert.match(tokenOverview, /Design tokens/)
  assert.match(tokenOverview, /TokenSample/)
  assert.match(tokenOverview, /designTokens\.filter/)
})

test('component contribution workflow is published by docs', () => {
  const workflow = 'content/docs/contributing/component-development.md'
  assert.ok(existsSync(workflow))
  assert.match(readFileSync(workflow, 'utf8'), /spec → code and code → spec/)
})

test('overview is the unified component and markdown entry', () => {
  const overview = readFileSync('app/overview/[[...slug]]/page.tsx', 'utf8')
  assert.match(overview, /ExecutableComponentDoc/)
  assert.match(overview, /ReactMarkdown/)
  assert.match(overview, /overview-nav/)
  assert.match(overview, /\/overview\/tokens/)
  assert.match(overview, /DesignTokenOverview/)
})

test('Monaco virtual types provide the React JSX runtime', () => {
  const editor = readFileSync('src/component-docs/MonacoCodeEditor.tsx', 'utf8')
  assert.match(editor, /declare module 'react\/jsx-runtime'/)
  assert.match(editor, /interface IntrinsicElements/)
})

test('Monaco overlays remain visible in constrained windows', () => {
  const editor = readFileSync('src/component-docs/MonacoCodeEditor.tsx', 'utf8')
  assert.match(editor, /fixedOverflowWidgets: true/)
  assert.match(editor, /height="clamp\(440px, 65vh, 640px\)"/)
  assert.match(editor, /hover: \{ above: false, sticky: true \}/)
})
