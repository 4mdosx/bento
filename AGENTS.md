# Bento Agent Guide

Start with `packages/bento-ui/docs/agent/index.md`. Choose a documented Use Case before choosing files. Business state and effects belong in a Host; editable presentation belongs in Registry-delivered source.

Do not import View implementations into Core, Host, Integration, or UI Runtime. Do not duplicate request coordination, overlay behavior, responsive breakpoints, or base tokens in generated source. Run `npm run verify` before delivery.
