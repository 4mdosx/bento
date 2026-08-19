import * as React from 'react'

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`rounded-md px-3 py-2 ${props.className ?? ''}`} />
}
