export interface LatestRequestCoordinator {
  run<Result>(operation: (signal: AbortSignal) => Promise<Result>): Promise<Result | undefined>
  abort(): void
}

export function createLatestRequestCoordinator(): LatestRequestCoordinator {
  let active: AbortController | null = null
  let requestId = 0

  return {
    async run<Result>(operation: (signal: AbortSignal) => Promise<Result>) {
      active?.abort()
      const controller = new AbortController()
      active = controller
      const currentId = ++requestId
      try {
        const result = await operation(controller.signal)
        return !controller.signal.aborted && currentId === requestId
          ? result
          : undefined
      } catch (error) {
        if (controller.signal.aborted || currentId !== requestId) return undefined
        throw error
      }
    },
    abort() {
      active?.abort()
      active = null
      requestId += 1
    },
  }
}
