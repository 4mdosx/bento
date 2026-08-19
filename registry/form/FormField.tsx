import * as React from 'react'

export function FormField({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const id = React.useId()
  return <label htmlFor={id}>{label}<input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />{error && <span id={`${id}-error`}>{error}</span>}</label>
}
