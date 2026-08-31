# New component development workflow

## 1. Intake and classification

Write the supported Use Case and explicit non-goals. Answer:

- What product intent does it serve?
- Is it a Composition, Interaction or Adaptation Pattern?
- Does it own state or side effects?
- Is it a Primitive, Part, View or Layout?
- Is it delivered as versioned package behavior or editable Registry source?

Reject additions that only increase component count without completing a Use Case.

## 2. Contract first

For package APIs, define Model, Actions, State/View Model, Slots, controlled/uncontrolled rules, cancellation, normalized errors and escape hatches. Cross-responsibility imports must use public entry points.

For source-delivered UI, define props and semantic slots without copying Host state or request coordination.

## 3. Minimum implementation slice

Implement one representative happy path plus loading, empty, error, disabled or cancellation states relevant to the capability. Add the Registry item before polishing optional variants.

## 4. Interactive validation

Add an entry to `apps/docs/src/component-docs/catalog.ts`, a mapping in `definitions.tsx`, and an executable route under `/overview/components/[slug]`. The page must provide:

- representative content rather than placeholders;
- spec → code and code → spec mappings with a live preview;
- Monaco TypeScript/JSX completion and a stable virtual file path;
- mobile, tablet, desktop and fluid preview support;
- canvas, muted and inverse surface checks when meaningful;
- an explicit keyboard, accessibility and failure-state checklist;
- deterministic behavior that a contributor can reproduce.

## 5. Automated gates

At minimum, add a public type assertion and a responsibility-boundary test. Stateful or async behavior also requires interaction and race tests. Visual capabilities must be added to `quality/visual-scenarios.json`; accessible names, status and focus behavior need automated checks.

## 6. Documentation and delivery

Update `registry/registry.json`, `packages/bento-kit/manifest.json`, the relevant Use Case, Agent recipe (`docs/agent`) and customer-facing docs in `apps/docs`. Registry execution must remain repeatable and protect local modifications. Owner runbooks stay in `docs/`, not the documentation site.

## 7. Review and release

Run `npm run verify`. Include the docs component route, mapped spec fields, tested states, public API change and delivery mode in the pull request. Breaking frozen architecture requires a new ADR under `docs/adr` and Preview version change. Publishing follows `docs/operations.md`.
