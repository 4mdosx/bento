export type MaybePromise<T> = T | Promise<T>

export interface BentoError {
  code: string
  message: string
  cause?: unknown
  retryable?: boolean
}

export interface ActionContext {
  signal: AbortSignal
}

export type BentoAction<Input, Output> = (
  input: Input,
  context: ActionContext,
) => MaybePromise<Output>

export interface ControlledState<Value> {
  value: Value
  onChange: (value: Value) => void
}

export interface UncontrolledState<Value> {
  defaultValue?: Value
  onChange?: (value: Value) => void
}

export type ControllableState<Value> =
  | ControlledState<Value>
  | UncontrolledState<Value>
