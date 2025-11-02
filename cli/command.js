#! /usr/bin/env node
const { Command } = require('commander')
const program = new Command()
const init = require('./init')

program
  .name('bento')
  .description('CLI to create web applications')
  .version('0.0.1')

program
  .command('init')
  .description('Initialize a new application')
  .argument('[project-name]', 'name of the application')
  .action((str, options) => {
    init(str, options)
  })

program.command('add')
  .description('Add a new component')
  .argument('[component-name]', 'name of the component')
  .action((str, options) => {
    console.log(str, options)
  })

program.command('page')
.description('Create a new page')
.argument('[page-name]', 'name of the page')
.action((str, options) => {
})

program.parse()
