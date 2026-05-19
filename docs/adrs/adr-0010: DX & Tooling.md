# ADR-0010: Developer Experience (DX) & Tooling

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

A strong developer experience (DX) is critical for adoption and long-term maintainability of `@plasius/ui-foundry`. Without clear tooling, strict typing, and automation, contributors may struggle to build, test, and document components consistently. A poor DX increases onboarding time, introduces inconsistent patterns, and reduces productivity.

## Decision

We will adopt a **developer experience–first approach** supported by modern tooling and automation. This includes:

- **TypeScript strict mode**: Enforce strict typing across all code for safety and predictability.
- **Linting & formatting**: Use ESLint (with custom rules for React, a11y, and hooks) and Prettier for consistent formatting.
- **Ladle (Vite-based)**: Required for every component, with CSF (and MDX where needed) stories and interactive docs to serve as the source of truth for documentation.
- **Code generators**: Provide scaffolding tools (e.g., plop/generators) for creating new components with tests, stories, and docs.
- **Changesets**: Use Changesets to manage versioning, changelogs, and release automation.
- **CI pipelines**: Automated jobs for linting, type-checking, testing, bundle-size, and Ladle builds on every PR.

## Consequences

- **Positive:**

  - Consistent and efficient developer workflow across contributors.
  - Reduced onboarding friction via scaffolding and clear conventions.
  - Automated checks reduce human error and catch regressions early.

- **Negative:**
  - Increased setup and maintenance overhead for tooling.
  - CI pipelines may slow feedback slightly compared to minimal setups.

## Alternatives considered

- **Minimal tooling (manual reviews, no automation):** Rejected, as it creates inconsistency and slows down scaling.
- **Rely on external docs instead of Ladle:** Rejected, as Ladle provides immediate visual feedback and interactive testing while being Vite-native. Storybook was considered but is now deprecated, and its ecosystem is shifting; we prefer a forward-looking choice that aligns with our Vite-based stack. Storybook is deprecated due to its complexity and slower adaptation to modern frameworks, making it less suitable for our evolving needs.
- **Loose typing (disable strict mode):** Rejected, as it reduces safety and long-term maintainability.

## References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Ladle](https://www.ladle.dev/)
- [Changesets](https://github.com/changesets/changesets)
