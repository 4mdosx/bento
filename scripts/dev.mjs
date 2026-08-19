import { spawn } from 'node:child_process'

const apps = [
  ['playground', process.env.PLAYGROUND_PORT || '3000'],
  ['docs', process.env.DOCS_PORT || '3001'],
]
const children = apps.map(([workspace, port]) => spawn(
  process.platform === 'win32' ? 'npm.cmd' : 'npm',
  ['run', 'dev', '-w', workspace, '--', '-p', port],
  { stdio: 'inherit', env: process.env },
))

let stopping = false
const stop = (signal = 'SIGTERM') => {
  if (stopping) return
  stopping = true
  for (const child of children) if (!child.killed) child.kill(signal)
}

for (const child of children) {
  child.on('exit', (code, signal) => {
    if (!stopping && code !== 0) {
      stop()
      process.exitCode = code ?? (signal ? 1 : 0)
    }
  })
}

process.on('SIGINT', () => stop('SIGINT'))
process.on('SIGTERM', () => stop('SIGTERM'))
