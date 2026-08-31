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

test('button spec models behavior while className owns appearance', () => {
  assert.match(definitions, /key: 'loading'/)
  assert.match(definitions, /key: 'disabled'/)
  assert.match(definitions, /key: 'type'/)
  assert.match(definitions, /className="rounded-full"/)
  assert.doesNotMatch(definitions, /key: 'variant'|key: 'size'/)
  assert.match(definitions, /optionalBooleanAttribute\(code, 'loading'\)/)
  assert.match(definitions, /optionalBooleanAttribute\(code, 'disabled'\)/)
  assert.match(definitions, /optionalStringAttribute\(code, 'type', 'button'\)/)
})

test('component heading presents architecture dimensions, version and prioritized introduction', () => {
  assert.match(definitions, /dimensions: \['Primitive', 'Control', 'Source'\]/)
  assert.match(definitions, /version: '1\.1\.0'/)
  assert.match(definitions, /Safe async actions/)
  assert.match(workbench, /definition\.dimensions/)
  assert.match(workbench, /definition\.version/)
  assert.match(workbench, /definition\.highlights/)
  assert.doesNotMatch(workbench, /definition\.maturity|definition\.checks/)
})

test('overview provides a dedicated page for all relevant design tokens', () => {
  const tokens = readFileSync('src/component-docs/design-tokens.ts', 'utf8')
  assert.match(definitions, /tokens: buttonTokens/)
  assert.match(tokenOverview, /Design tokens/)
  assert.match(tokenOverview, /TokenSample/)
  assert.match(tokenOverview, /designTokens\.filter/)
  assert.match(tokenOverview, /duration: '动效时长'/)
  assert.match(tokenOverview, /radius: '圆角'/)
  assert.match(tokens, /--radius-sm/)
  assert.match(tokens, /--radius-md/)
  assert.match(tokens, /--radius-lg/)
  assert.match(tokens, /--radius-pill/)
  assert.match(tokens, /--duration-fast/)
  assert.match(tokens, /--duration-default/)
  assert.match(tokens, /--duration-overlay/)
  assert.match(tokens, /--text-display-lg/)
  assert.match(tokens, /--color-destructive/)
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
  assert.match(overview, /DocsSidebar/)
  assert.match(overview, /\/overview\/tokens/)
  assert.match(overview, /DesignTokenOverview/)
})

test('documentation site consumes default tokens and Registry-delivered source', () => {
  const styles = readFileSync('app/globals.css', 'utf8')
  const layout = readFileSync('app/layout.tsx', 'utf8')
  assert.match(styles, /@import "\.\.\/components\/bento\/theme\.css"/)
  assert.match(layout, /components\/bento\/views\/Documentation/)
  assert.ok(existsSync('components/bento/views/Documentation.tsx'))
})

test('documentation pages use runtime design tokens for visual primitives', () => {
  const styles = readFileSync('app/globals.css', 'utf8')
  assert.doesNotMatch(styles, /(?:font-size|line-height|font-family):\s*(?:[\d.]|clamp\(|ui-)/)
  assert.doesNotMatch(styles, /(?:color|background|border-radius):\s*(?:#[\da-f]+|white|black|[\d.]+(?:px|rem))/i)
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
