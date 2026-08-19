const fs = require('node:fs')
const path = require('node:path')

const configName = 'bento.json'

function init(projectName, options = {}) {
  const cwd = path.resolve(options.cwd || process.cwd(), projectName || '.')
  const configPath = path.join(cwd, configName)
  const config = {
    $schema: 'https://bento-ui.dev/schema.json',
    sourceDir: 'components/bento',
    styleFile: 'app/globals.css',
    importAlias: '@/',
  }
  if (options.dryRun) {
    return { action: fs.existsSync(configPath) ? 'unchanged' : 'create', path: configPath }
  }
  fs.mkdirSync(cwd, { recursive: true })
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`)
  }
  const themePath = path.join(cwd, config.sourceDir, 'theme.css')
  if (!fs.existsSync(themePath)) {
    fs.mkdirSync(path.dirname(themePath), { recursive: true })
    fs.writeFileSync(themePath, ':root { --bento-radius: 0.5rem; --bento-border: #e5e7eb; }\n')
  }
  return { action: fs.existsSync(configPath) ? 'ready' : 'create', path: configPath }
}

module.exports = init
