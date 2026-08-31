import { cpSync, existsSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const source = join(packageRoot, '../../registry')
const destination = join(packageRoot, 'registry')

if (!existsSync(join(source, 'registry.json'))) {
  console.warn('skip registry copy; source not found')
  process.exit(0)
}

rmSync(destination, { recursive: true, force: true })
cpSync(source, destination, { recursive: true })
