# ADR-0001: UI Foundry

## Status

- Proposed -> Accepted
- Date: 2025-09-12
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

Plasius projects require a consistent, reusable, and strongly typed set of UI components and utilities for React and TypeScript. Existing third‑party component libraries either lack the strict typing guarantees, design‑system flexibility, or the non‑functional requirement (NFR) alignment (e.g., accessibility, testability, performance) that our platform needs.

## Decision

We will create `@plasius/ui-foundry`, a React/TypeScript component and utilities library, to serve as the foundation for UI across Plasius projects. This library will provide:

- Reusable, accessible React components (buttons, forms, layout primitives, etc.),
- Utility hooks and helpers to simplify common UI patterns,
- Strong typing to ensure safe composition and predictable theming,
- Design-system integration to guarantee consistency across applications,
- A focus on NFRs including accessibility, testability, scalability, and performance.

## Consequences

- **Positive:**

  - Establishes a single source of truth for UI components, reducing duplication.
  - Improves developer velocity and confidence via strong typing and consistent APIs.
  - Enhances user experience with accessible, tested, and performant components.

- **Negative:**
  - Initial investment to design, build, and maintain the library.
  - Risk of slower feature delivery while core components are stabilised.

## Alternatives considered

- **Use an existing UI library (e.g., MUI, Chakra, Radix):** Rejected due to limitations in typing guarantees, heavy styling opinions, or reduced control over NFR compliance.
- **Project‑specific components per app:** Rejected as it increases duplication, divergence, and long‑term maintenance burden.

## References

- [Architectural Decision Records (ADR) standard](https://adr.github.io/)
