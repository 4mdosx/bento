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
  const recipe = readFileSync('../../docs/agent/recipes/filterable-resource-list.md', 'utf8')
  assert.match(recipe, /不要复制 `useListHost`/)
  assert.match(recipe, /npm run verify/)
  assert.match(recipe, /窄\/宽断点/)
})

test('package runtime remains free of Tailwind and source View imports', () => {
  const host = readFileSync('src/hosts/list/useListHost.ts', 'utf8')
  assert.doesNotMatch(host, /className|tailwind|\/views\//i)
})

test('typography exposes a small semantic surface and a complete prose recipe', () => {
  const theme = readFileSync('src/theme.css', 'utf8')
  for (const role of ['typography-page-title', 'typography-heading', 'typography-body']) {
    assert.match(theme, new RegExp(`\\.${role} \\{`))
  }
  for (const selector of ['h1', 'h2', 'h3', 'p', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'strong', 'hr', 'table', 'th', 'td', 'img', 'del']) {
    assert.match(theme, new RegExp(`\\.prose[^\\{]*${selector}`), `prose missing ${selector}`)
  }
  assert.match(theme, /\.typography-page-title[^}]*var\(--font-size-display-lg\)/s)
  assert.match(theme, /\.prose h1[^}]*var\(--font-size-display-lg\)/s)
  assert.match(theme, /\.prose h2[^}]*var\(--font-size-heading-lg\)/s)
  assert.match(theme, /\.prose h3,[^}]*\.prose h6[^}]*var\(--font-size-heading-md\)/s)
})

test('Tailwind theme variables are not consumed as runtime CSS variables', () => {
  const theme = readFileSync('src/theme.css', 'utf8')
  const themeDeclaration = theme.match(/@theme inline\s*\{[\s\S]*?\n\}/)?.[0]
  assert.ok(themeDeclaration)

  const themeVariables = Array.from(themeDeclaration.matchAll(/^\s*(--[\w-]+):/gm), (match) => match[1])
  const rootDeclaration = theme.match(/:root\s*\{[\s\S]*?\n\}/)?.[0] ?? ''
  const runtimeAliases = new Set(Array.from(rootDeclaration.matchAll(/^\s*(--[\w-]+):/gm), (match) => match[1]))
  const runtimeCss = [
    theme.replace(themeDeclaration, ''),
    readFileSync('../../apps/docs/app/globals.css', 'utf8'),
  ].join('\n')

  for (const variable of themeVariables) {
    if (runtimeAliases.has(variable)) continue
    assert.doesNotMatch(runtimeCss, new RegExp(`var\\(${variable.replaceAll('-', '\\-')}(?:[,\\)])`), `${variable} is build-time only`)
  }
})

test('radius and duration tokens are runtime values mapped into the Tailwind theme', () => {
  const theme = readFileSync('src/theme.css', 'utf8')
  const themeDeclaration = theme.match(/@theme inline\s*\{[\s\S]*?\n\}/)?.[0]
  assert.ok(themeDeclaration)

  for (const variable of ['--radius-sm', '--radius-md', '--radius-lg', '--radius-pill', '--duration-fast', '--duration-default', '--duration-overlay']) {
    assert.match(theme, new RegExp(`${variable.replaceAll('-', '\\-')}:`))
  }
  assert.match(themeDeclaration, /--radius-sm:\s*var\(--radius-sm\)/)
  assert.match(themeDeclaration, /--radius-md:\s*var\(--radius-md\)/)
  assert.match(themeDeclaration, /--radius-lg:\s*var\(--radius-lg\)/)
  assert.match(themeDeclaration, /--radius-full:\s*var\(--radius-pill\)/)
  assert.match(themeDeclaration, /--duration-fast:\s*var\(--duration-fast\)/)
  assert.match(themeDeclaration, /--duration-default:\s*var\(--duration-default\)/)
  assert.match(themeDeclaration, /--duration-overlay:\s*var\(--duration-overlay\)/)
  assert.match(themeDeclaration, /--default-transition-duration:\s*var\(--duration-fast\)/)
  assert.match(themeDeclaration, /--default-animation-duration:\s*var\(--duration-overlay\)/)
})
