import type { BentoError } from '../core'

export type HostStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error'

export interface HostState {
  status: HostStatus
  error: BentoError | null
}

export interface HostAction<Input = void, Output = void> {
  run: (input: Input) => Promise<Output>
  cancel: () => void
  pending: boolean
}

export interface HostContract<Model, Actions, ViewModel, Slots = object> {
  model: Model
  actions: Actions
  viewModel: ViewModel
  slots?: Slots
}
