# Contributing to Bento

Bento accepts capabilities, not isolated component inventory. Start with a documented Use Case and read `packages/bento-ui/docs/agent/index.md` plus `docs/component-development.md`.

## Required flow

1. Classify the capability by product meaning, Pattern, runtime responsibility, View granularity and delivery mode.
2. Propose or extend the public contract before implementation.
3. Keep Host/Core/Integration/UI Runtime behavior in the package. Put editable Primitive/Part/View/Layout code in the Registry.
4. Add the capability to `apps/playground/src/catalog.ts` and create an interactive workbench route with representative states.
5. Add public type, interaction, accessibility and dependency-boundary checks in proportion to the change.
6. Update the manifest, customer documentation and Agent recipe together.
7. Run `npm run verify` at repository root.

Pull requests must complete `.github/pull_request_template.md`. A component is not complete when it merely renders; it is complete when its contract, failure states, responsive behavior, accessibility and delivery path can be reviewed.
