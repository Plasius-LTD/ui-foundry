# ADR-0003: Performance & Bundle Policy

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

Performance and bundle size are critical non-functional requirements for `@plasius/ui-foundry`. Large or unoptimized bundles negatively impact application load times and user experience. Without clear policies, components may introduce unnecessary overhead, reduce tree-shaking efficiency, or cause regressions in performance budgets.

## Decision

We will adopt a **performance-first bundle policy** for `@plasius/ui-foundry`, which includes:

- Ship **ESM-only builds** with `sideEffects: false` for maximum tree-shaking.
- Provide **per-component entry points** via the `exports` map for optimal consumer imports.
- Enforce **strict bundle size budgets** using CI tooling (e.g., `size-limit`).
- Avoid large runtime dependencies; prefer native APIs and lightweight utilities.
- Ensure **SSR-safety** by avoiding reliance on `window`/`document` at import time.

## Consequences

- **Positive:**

  - Consumers can import only what they need, reducing bundle size.
  - Better performance across Plasius projects through predictable size budgets.
  - Increased compatibility with modern build pipelines (Vite, Webpack, Rollup).

- **Negative:**
  - Increased maintenance overhead to ensure each component is tree-shakeable.
  - Need for automated bundle analysis and CI enforcement.

## Alternatives considered

- **Single monolithic bundle:** Rejected, as it prevents tree-shaking and increases size.
- **Dual ESM/CJS build:** Rejected for now, as Plasius projects are ESM-first. Could be reconsidered for external consumers if demand arises.
- **No size budgets:** Rejected, as this risks uncontrolled bundle growth.

## References

- [Webpack Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
- [size-limit](https://github.com/ai/size-limit)
- [Package Exports](https://nodejs.org/api/packages.html#exports)
