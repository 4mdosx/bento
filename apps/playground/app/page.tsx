import { ButtonDemo } from '@/demos/button'

export default function Page() {
  return (
    <div className="min-h-screen p-10">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-neutral-900">Bento Playground</h1>
        <p className="mt-1 text-neutral-500">design-system → demos → playground</p>
      </header>
      <main>
        <ButtonDemo />
      </main>
    </div>
  )
}
