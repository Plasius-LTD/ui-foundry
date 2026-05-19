# ADR-0013: Browser & Platform Support

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

Consumers of `@plasius/ui-foundry` will use the component library across a range of browsers and environments. Without clearly defined browser and platform support, we risk inconsistent behavior, compatibility issues, and unnecessary polyfills. Modern JavaScript frameworks and tooling allow us to target a specific baseline for optimal performance while still providing broad usability.

## Decision

We will define and enforce a **modern baseline for browser and platform support** as follows:

- **Browsers (evergreen)**:
  - Latest 2 major versions of Chrome, Edge, Firefox, and Safari.
  - iOS Safari (latest 2 major releases).
  - Android Chrome (latest 2 major releases).
- **Not supported**: Internet Explorer (all versions). Legacy browsers requiring ES5-only builds are out of scope.
- **JavaScript/TypeScript target**: `ES2022` as build output baseline; consumers expected to transpile further if needed.
- **SSR environments**: Must run safely in Node.js 18+ and 20+ LTS, with no reliance on `window`/`document` at import time.
- **Rendering environments**: Support for React 18+ (including concurrent features). React 19 support will be tracked and validated as it stabilises.
- **Testing environments**: Ensure tests run in JSDOM and Playwright across supported browsers.

## Consequences

- **Positive:**

  - Clear expectations for consumers about what environments are supported.
  - Reduced need for heavy polyfills or transpilation, improving performance.
  - Ensures compatibility with modern React and SSR setups.

- **Negative:**
  - Excludes older browsers (e.g., IE11, legacy Android WebView).
  - May require consumers in highly regulated environments to add their own polyfills.

## Alternatives considered

- **Support older browsers (e.g., IE11, ES5 builds):** Rejected, as it increases maintenance cost and reduces ability to use modern features.
- **No explicit policy (best effort):** Rejected, as it creates uncertainty and inconsistent compatibility.
- **Broader support matrix (e.g., all Chromium forks):** Rejected, as testing burden outweighs value; evergreen baseline covers major usage.

## References

- [Browserlist defaults](https://github.com/browserslist/browserslist#full-list)
- [React 18 docs](https://react.dev/blog/2022/03/29/react-v18)
- [Node.js LTS schedule](https://nodejs.org/en/about/previous-releases)
