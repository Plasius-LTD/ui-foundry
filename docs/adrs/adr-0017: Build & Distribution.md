# ADR-0017: Build & Distribution

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

Reliable builds and predictable distribution are essential for `@plasius/ui-foundry`. Without a clear build and packaging strategy, the library risks shipping broken artifacts, unoptimized bundles, or incompatible module formats. Consumers expect modern ESM support, type definitions, and predictable entry points that integrate with bundlers and SSR environments. We must also ensure tree-shaking works correctly and CSS/theming is distributed consistently.

## Decision

We will adopt a **modern ESM-first build and distribution strategy**, with strict guarantees around package structure and artifacts:

- **Module format**: ESM-only (`"type": "module"` in package.json). No CJS builds.
- **Entry points**: Provide per-component entry points via the `exports` map in `package.json`. Example:

  ```json
  {
    "exports": {
      "./button": {
        "import": "./dist/button/index.js",
        "types": "./dist/button/index.d.ts"
      }
    }
  }
  ```

- **Side effects**: Mark package as `"sideEffects": false` in `package.json` to enable tree-shaking.
- **TypeScript declarations**: Emit `.d.ts` files for all public APIs.
- **CSS & tokens**: Distribute design tokens and CSS variables as separate artifacts (PostCSS pipeline). Components import tokens but remain style-agnostic.
- **Build tooling**: Use Vite/Rollup for bundling with PostCSS for tokens. Ensure builds are deterministic.
- **SSR safety**: No references to `window`/`document` at import time; builds validated in Node.js SSR tests.
- **Consumer guarantees**: Clear, versioned, stable entry points with no breaking path changes outside SemVer.

## Consequences

- **Positive:**

  - Consumers benefit from predictable imports, modern ESM support, and tree-shaking.
  - Type declarations improve developer experience and IDE integration.
  - Distribution of tokens and CSS variables supports theming consistency.

- **Negative:**
  - ESM-only may exclude legacy consumers still requiring CJS.
  - Requires tooling discipline to ensure exports remain stable and tested.

## Alternatives considered

- **Dual ESM + CJS builds**: Rejected for now, as Plasius projects are fully ESM-based. Could be revisited if external consumers demand CJS.
- **Single monolithic entry point**: Rejected, as it prevents tree-shaking and forces larger bundle sizes.
- **Inline styles only (no CSS/tokens)**: Rejected, as it blocks design system integration and theming flexibility.

## References

- [ADR-0003: Performance & Bundle Policy](./adr-0003:%20Performance%20&%20Bundle%20Policy.md)
- [Package Exports (Node.js)](https://nodejs.org/api/packages.html#exports)
- [Vite](https://vitejs.dev/)
- [Rollup](https://rollupjs.org/)
- [PostCSS](https://postcss.org/)
