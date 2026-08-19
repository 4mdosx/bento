#! /usr/bin/env node
const { Command } = require('commander')
const init = require('./init')
const { add } = require('./registry')

const program = new Command()
program.name('bento').description('Deliver Bento application UI source').version('0.0.1')

program.command('init')
  .description('Initialize Bento in a Next.js App Router project')
  .argument('[project-name]', 'project directory', '.')
  .option('--dry-run', 'show the planned change')
  .action((name, options) => console.log(init(name, options)))

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
    if (result.item.dependencies.length) {
      console.log(`dependencies: ${result.item.dependencies.join(', ')}`)
    }
  })

program.parseAsync().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
