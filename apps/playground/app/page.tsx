export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-heading-lg font-semibold text-foreground mb-4">Welcome to Bento Playground</h1>
      <p className="text-body-md text-muted">
        Select a component from the sidebar to view its interactive demos and documentation.
      </p>
    </div>
  )
}
