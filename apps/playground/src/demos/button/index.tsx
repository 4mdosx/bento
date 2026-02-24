'use client'

import { ButtonVariantsDemo } from './variants'
import { ButtonSizesDemo } from './sizes'

export function ButtonDemo() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Button</h2>
        <div className="space-y-8">
          <ButtonVariantsDemo />
          <ButtonSizesDemo />
        </div>
      </div>
    </div>
  )
}

export { ButtonVariantsDemo } from './variants'
export { ButtonSizesDemo } from './sizes'
