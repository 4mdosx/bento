import { ButtonDemo } from '@/demos/button'
import { ListContainerDemo } from '@/demos/list-container'

export default function Page() {
  return (
    <div className="min-h-screen p-10">
      <header className="mb-10">
        <h1 className="text-heading-lg font-semibold text-foreground">Bento Playground</h1>
        <p className="mt-1 text-body-sm text-muted">design-system → demos → playground</p>
      </header>
      <main className="space-y-16">
        <ButtonDemo />
        <ListContainerDemo />
      </main>
    </div>
  )
}
