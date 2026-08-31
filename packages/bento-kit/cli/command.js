#! /usr/bin/env node
const path = require('node:path')
const { Command } = require('commander')
const init = require('./init')
const { add, diff, manifest } = require('./registry')
const doctor = require('./doctor')

const program = new Command()
program.name('bento').description('Deliver Bento application UI source').version('0.1.0-preview.1')

program.command('init')
  .description('Create a Next.js App Router project with Bento Kit')
  .argument('[project-name]', 'project directory', '.')
  .option('--dry-run', 'show the planned change')
  .option('--local', 'depend on this checkout of bento-kit via file:')
  .option('--skip-install', 'skip npm install')
  .option('--skip-git', 'skip git init')
  .action((name, options) => {
    const result = init(name, options)
    if (options.dryRun) {
      console.log(JSON.stringify(result, null, 2))
      return
    }
    const relative = path.relative(process.cwd(), result.path) || '.'
    console.log(`ready     ${relative}`)
    if (result.git) console.log('created   .git')
    if (result.installed) console.log('installed dependencies')
    for (const item of result.registryItems) console.log(`copied    ${item}`)
    console.log(`next      cd ${relative} && npm run dev`)
  })

program.command('add')
  .description('Add a primitive or view from the registry')
  .argument('<name>', 'registry item name')
  .option('--dry-run', 'show file operations without writing')
  .option('--overwrite', 'replace locally modified generated files')
  .action((name, options) => {
    const result = add(name, options)
    for (const operation of result.operations) {
      console.log(`${operation.action.padEnd(9)} ${operation.target}`)
    }
    const dependencies = Object.keys(result.item.dependencies)
    if (dependencies.length) {
      console.log(`dependencies: ${dependencies.join(', ')}`)
    }
  })

program.command('list')
  .description('List available registry items')
  .action(() => manifest.items.forEach((item) => console.log(`${item.name}\t${item.type}\t${item.version}`)))

program.command('diff')
  .description('Compare generated files with the registry')
  .argument('<name>', 'registry item name')
  .action((name) => diff(name).forEach((entry) => console.log(`${entry.action.padEnd(9)} ${entry.target}`)))

program.command('doctor')
  .description('Check whether the project is ready for Bento')
  .action(() => {
    const result = doctor()
    result.checks.forEach((entry) => console.log(`${entry.ok ? 'ok' : 'missing'}\t${entry.name}\t${entry.detail}`))
    if (!result.ok) process.exitCode = 1
  })

program.parseAsync().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
