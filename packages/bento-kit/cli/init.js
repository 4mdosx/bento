const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const { add } = require('./registry')
const { kitPackage, packageRoot, templatesRoot } = require('./paths')

const PACKAGE_NAME = 'bento-kit'
const BASE_ITEMS = ['button', 'form', 'dashboard-shell', 'list']
const configName = 'bento.json'

function configFor() {
  return {
    $schema: 'https://bento-kit.dev/schema.json',
    sourceDir: 'components/bento',
    styleFile: 'app/globals.css',
    importAlias: '@/',
  }
}

function npmName(projectName) {
  return projectName.trim().toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^[-._]+|[-._]+$/g, '') || 'bento-app'
}

function ignoredEntry(name) {
  return name === '.git' || name === '.DS_Store'
}

function isEmptyProject(cwd) {
  if (!fs.existsSync(cwd)) return true
  return fs.readdirSync(cwd).every(ignoredEntry)
}

function hasPackageJson(cwd) {
  return fs.existsSync(path.join(cwd, 'package.json'))
}

function writeFile(target, contents) {
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, contents)
}

function writeJson(target, value) {
  writeFile(target, `${JSON.stringify(value, null, 2)}\n`)
}

function copyTemplateTree(from, to) {
  const created = []
  if (!fs.existsSync(from)) return created
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name)
    const targetName = entry.name === '_gitignore' ? '.gitignore' : entry.name
    const target = path.join(to, targetName)
    if (entry.isDirectory()) {
      created.push(...copyTemplateTree(source, target))
      continue
    }
    if (fs.existsSync(target)) continue
    writeFile(target, fs.readFileSync(source, 'utf8'))
    created.push(target)
  }
  return created
}

function kitSpec(version, options = {}) {
  if (options.local) return `file:${packageRoot()}`
  return `^${version}`
}

function appManifest(projectName, version, options = {}) {
  return {
    name: npmName(projectName),
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'eslint',
      typecheck: 'tsc --noEmit',
    },
    dependencies: {
      [PACKAGE_NAME]: kitSpec(version, options),
      next: '16.1.6',
      react: '19.2.4',
      'react-dom': '19.2.4',
    },
    devDependencies: {
      '@tailwindcss/postcss': '^4',
      '@types/node': '^20',
      '@types/react': '^19',
      '@types/react-dom': '^19',
      eslint: '^9',
      'eslint-config-next': '16.1.6',
      tailwindcss: '^4',
      typescript: '^5',
    },
  }
}

function mergeDependencies(cwd, version, options = {}) {
  const packagePath = path.join(cwd, 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
  const required = appManifest(packageJson.name || 'bento-app', version, options)
  let changed = false
  for (const field of ['dependencies', 'devDependencies']) {
    packageJson[field] ||= {}
    for (const [name, range] of Object.entries(required[field])) {
      if (!packageJson[field][name] && !(field === 'devDependencies' && packageJson.dependencies?.[name])) {
        packageJson[field][name] = range
        changed = true
      }
    }
  }
  packageJson.scripts ||= {}
  for (const [name, command] of Object.entries(required.scripts)) {
    if (!packageJson.scripts[name]) {
      packageJson.scripts[name] = command
      changed = true
    }
  }
  if (changed) writeJson(packagePath, packageJson)
  return changed
}

function writeConfigAndTheme(cwd) {
  const config = configFor()
  const configPath = path.join(cwd, configName)
  if (!fs.existsSync(configPath)) writeJson(configPath, config)
  const resolved = JSON.parse(fs.readFileSync(configPath, 'utf8'))
  const themePath = path.join(cwd, resolved.sourceDir, 'theme.css')
  if (!fs.existsSync(themePath)) {
    writeFile(themePath, `@import "${PACKAGE_NAME}/theme.css";\n\n/* Override semantic tokens for this application below. */\n`)
  }
  return { configPath, themePath }
}

function gitInit(cwd) {
  try {
    execFileSync('git', ['init'], { cwd, stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

function npmInstall(cwd) {
  execFileSync('npm', ['install', '--legacy-peer-deps'], { cwd, stdio: 'inherit', env: process.env })
}

function copyBaseUi(cwd) {
  const copied = []
  for (const name of BASE_ITEMS) {
    const result = add(name, { cwd })
    if (result.operations.some((operation) => operation.action === 'create' || operation.action === 'update')) {
      copied.push(name)
    }
  }
  return copied
}

function init(projectName, options = {}) {
  const cwd = path.resolve(options.cwd || process.cwd(), projectName || '.')
  const version = kitPackage().version
  const scaffold = isEmptyProject(cwd)
  const merge = !scaffold && hasPackageJson(cwd)

  if (!scaffold && !merge) {
    const error = new Error(`${cwd} is not empty. Use an empty directory or an existing Next.js project.`)
    if (!options.dryRun) throw error
    return { action: 'blocked', path: cwd, error: error.message }
  }

  if (options.dryRun) {
    return {
      action: scaffold ? 'scaffold' : 'merge',
      path: cwd,
      git: Boolean(scaffold && !options.skipGit),
      install: !options.skipInstall,
      registryItems: BASE_ITEMS,
    }
  }

  fs.mkdirSync(cwd, { recursive: true })

  if (scaffold) {
    writeJson(path.join(cwd, 'package.json'), appManifest(path.basename(cwd), version, options))
    copyTemplateTree(templatesRoot(), cwd)
  } else {
    mergeDependencies(cwd, version, options)
    copyTemplateTree(templatesRoot(), cwd)
  }

  writeConfigAndTheme(cwd)

  const git = scaffold && !options.skipGit && !fs.existsSync(path.join(cwd, '.git'))
    ? gitInit(cwd)
    : false

  let installed = false
  if (!options.skipInstall) {
    npmInstall(cwd)
    installed = true
  }

  const registryItems = copyBaseUi(cwd)

  return {
    action: 'ready',
    path: cwd,
    git,
    installed,
    registryItems,
  }
}

module.exports = init
