const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')

const root = path.resolve(__dirname, '../registry')
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'registry.json'), 'utf8'))

const hash = (content) => crypto.createHash('sha256').update(content).digest('hex')

function readConfig(cwd) {
  const configPath = path.join(cwd, 'bento.json')
  if (!fs.existsSync(configPath)) throw new Error('Run `bento init` first.')
  return JSON.parse(fs.readFileSync(configPath, 'utf8'))
}

function add(name, options = {}) {
  const cwd = path.resolve(options.cwd || process.cwd())
  const config = readConfig(cwd)
  const item = manifest.items.find((candidate) => candidate.name === name)
  if (!item) throw new Error(`Unknown registry item: ${name}`)
  const statePath = path.join(cwd, '.bento', 'registry-state.json')
  const state = fs.existsSync(statePath)
    ? JSON.parse(fs.readFileSync(statePath, 'utf8'))
    : { version: 1, files: {} }
  const operations = item.files.map((file) => {
    const source = fs.readFileSync(path.join(root, file.source), 'utf8')
    const target = path.join(cwd, config.sourceDir, file.target)
    const existing = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null
    const previousHash = state.files[path.relative(cwd, target)]
    const modified = existing !== null && previousHash && hash(existing) !== previousHash
    if (modified && !options.overwrite) return { action: 'conflict', target, source }
    if (existing === source) return { action: 'unchanged', target, source }
    return { action: existing === null ? 'create' : 'update', target, source }
  })
  if (options.dryRun) return { item, operations }
  const conflict = operations.find((operation) => operation.action === 'conflict')
  if (conflict) {
    throw new Error(`Local changes detected in ${conflict.target}; rerun with --overwrite after reviewing the diff.`)
  }
  for (const operation of operations) {
    if (operation.action === 'unchanged') continue
    fs.mkdirSync(path.dirname(operation.target), { recursive: true })
    fs.writeFileSync(operation.target, operation.source)
    state.files[path.relative(cwd, operation.target)] = hash(operation.source)
  }
  const packagePath = path.join(cwd, 'package.json')
  if (fs.existsSync(packagePath) && item.dependencies.length) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
    packageJson.dependencies ||= {}
    for (const dependency of item.dependencies) {
      packageJson.dependencies[dependency] ||= dependency === 'bento-ui' ? '^0.0.1' : 'latest'
    }
    fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`)
  }
  fs.mkdirSync(path.dirname(statePath), { recursive: true })
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`)
  return { item, operations }
}

module.exports = { add, manifest }
