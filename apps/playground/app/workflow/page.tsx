const stages = [
  ['1', 'Classify', 'Choose the Use Case, layer and delivery mode before writing code.'],
  ['2', 'Contract', 'Define public types, states, actions, defaults and escape hatches.'],
  ['3', 'Implement', 'Keep behavior in the package and editable presentation in Registry source.'],
  ['4', 'Exercise', 'Add a catalog entry and validate viewport, state, keyboard and failure scenarios here.'],
  ['5', 'Automate', 'Add type, interaction, accessibility and boundary tests.'],
  ['6', 'Contribute', 'Update docs and manifest, run verify, then submit the checklist with the change.'],
] as const

export default function WorkflowPage() {
  return <div className="mx-auto w-full max-w-5xl space-y-8">
    <header><p className="text-body-sm font-medium text-muted">Frozen contribution path</p><h1 className="text-heading-lg font-semibold">Develop a component</h1><p className="mt-2 max-w-2xl text-body-md text-muted">Every capability follows the same path from Use Case to public contract, interactive validation and review.</p></header>
    <ol className="grid gap-4 md:grid-cols-2">{stages.map(([number, title, description]) => <li key={number} className="rounded-xl border border-border p-5"><span className="text-body-sm font-semibold text-muted">{number.padStart(2, '0')}</span><h2 className="mt-2 text-heading-md font-semibold">{title}</h2><p className="mt-2 text-body-sm text-muted">{description}</p></li>)}</ol>
    <section className="rounded-xl border border-border bg-muted/20 p-5"><h2 className="text-heading-md font-semibold">Definition of done</h2><ul className="mt-3 grid list-disc gap-2 pl-5 text-body-sm md:grid-cols-2"><li>Public API has a responsibility-based entry point.</li><li>Playground route covers representative states.</li><li>Keyboard and screen-reader semantics are checked.</li><li>Registry files are repeatable and conflict-safe.</li><li>Manifest and customer/AI docs are updated.</li><li><code>npm run verify</code> passes from the root.</li></ul></section>
  </div>
}
