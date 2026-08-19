const fs = require('node:fs')
const path = require('node:path')

module.exports = function doctor(options = {}) {
  const cwd = path.resolve(options.cwd || process.cwd())
  const checks = []
  const check = (name, ok, detail) => checks.push({ name, ok, detail })
  const packagePath = path.join(cwd, 'package.json')
  check('package.json', fs.existsSync(packagePath), packagePath)
  const packageJson = fs.existsSync(packagePath) ? JSON.parse(fs.readFileSync(packagePath, 'utf8')) : {}
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies }
  check('Next.js App Router', Boolean(deps.next), deps.next || 'next is not installed')
  const configPath = path.join(cwd, 'bento.json')
  check('Bento config', fs.existsSync(configPath), configPath)
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    check('Bento theme', fs.existsSync(path.join(cwd, config.sourceDir, 'theme.css')), config.sourceDir)
  }
  return { ok: checks.every((entry) => entry.ok), checks }
}
