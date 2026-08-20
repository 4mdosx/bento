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

function plan(name, options = {}) {
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
    const action = modified && !options.overwrite
      ? 'conflict'
      : existing === source ? 'unchanged' : existing === null ? 'create' : 'update'
    return { action, target, source, existing }
  })
  return { cwd, config, item, state, statePath, operations }
}

function add(name, options = {}) {
  const result = plan(name, options)
  if (options.dryRun) return result
  const conflict = result.operations.find((operation) => operation.action === 'conflict')
  if (conflict) throw new Error(`Local changes detected in ${conflict.target}; review with \`bento diff ${name}\` or use --overwrite.`)

  const packagePath = path.join(result.cwd, 'package.json')
  const packageBefore = fs.existsSync(packagePath) ? fs.readFileSync(packagePath, 'utf8') : null
  const written = []
  try {
    for (const operation of result.operations) {
      if (operation.action === 'unchanged') continue
      fs.mkdirSync(path.dirname(operation.target), { recursive: true })
      fs.writeFileSync(operation.target, operation.source)
      written.push(operation)
      result.state.files[path.relative(result.cwd, operation.target)] = hash(operation.source)
    }
    if (packageBefore !== null) {
      const packageJson = JSON.parse(packageBefore)
      packageJson.dependencies ||= {}
      let packageChanged = false
      for (const [dependency, version] of Object.entries(result.item.dependencies)) {
        if (!packageJson.dependencies[dependency]) {
          packageJson.dependencies[dependency] = version
          packageChanged = true
        }
      }
      if (packageChanged) fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`)
    }
    fs.mkdirSync(path.dirname(result.statePath), { recursive: true })
    fs.writeFileSync(result.statePath, `${JSON.stringify(result.state, null, 2)}\n`)
  } catch (error) {
    for (const operation of written.reverse()) {
      if (operation.existing === null) fs.rmSync(operation.target, { force: true })
      else fs.writeFileSync(operation.target, operation.existing)
    }
    if (packageBefore !== null) fs.writeFileSync(packagePath, packageBefore)
    throw error
  }
  return result
}

function diff(name, options = {}) {
  return plan(name, options).operations.map(({ action, target, existing, source }) => ({
    action,
    target,
    currentHash: existing === null ? null : hash(existing),
    registryHash: hash(source),
  }))
}

module.exports = { add, diff, manifest, plan }
