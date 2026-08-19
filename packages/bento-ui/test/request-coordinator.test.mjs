import assert from 'node:assert/strict'
import test from 'node:test'
import { createLatestRequestCoordinator } from '../src/hosts/list/requestCoordinator.ts'

const deferred = () => {
  let resolve
  const promise = new Promise((done) => { resolve = done })
  return { promise, resolve }
}

test('latest request wins and the previous signal is aborted', async () => {
  const coordinator = createLatestRequestCoordinator()
  const first = deferred()
  let firstSignal
  const firstRun = coordinator.run((signal) => {
    firstSignal = signal
    return first.promise
  })
  const secondRun = coordinator.run(async () => 'second')
  first.resolve('first')
  assert.equal(await firstRun, undefined)
  assert.equal(await secondRun, 'second')
  assert.equal(firstSignal.aborted, true)
})

test('abort suppresses a pending result', async () => {
  const coordinator = createLatestRequestCoordinator()
  const pending = deferred()
  const run = coordinator.run(() => pending.promise)
  coordinator.abort()
  pending.resolve('late')
  assert.equal(await run, undefined)
})
