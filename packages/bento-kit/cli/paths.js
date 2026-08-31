const fs = require('node:fs')
const path = require('node:path')

function packageRoot() {
  return path.resolve(__dirname, '..')
}

function kitPackage() {
  return JSON.parse(fs.readFileSync(path.join(packageRoot(), 'package.json'), 'utf8'))
}

function registryRoot() {
  const nested = path.join(packageRoot(), 'registry')
  if (fs.existsSync(path.join(nested, 'registry.json'))) return nested
  const monorepo = path.resolve(packageRoot(), '../../registry')
  if (fs.existsSync(path.join(monorepo, 'registry.json'))) return monorepo
  throw new Error('Bento registry not found')
}

function templatesRoot() {
  return path.join(packageRoot(), 'templates', 'next-app')
}

module.exports = { packageRoot, kitPackage, registryRoot, templatesRoot }
