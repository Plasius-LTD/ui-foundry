# ADR-0004: Scalability & Composition

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

For `@plasius/ui-foundry` to remain sustainable as it grows, we must ensure that components scale in complexity, usage, and composition without creating brittle or unmaintainable code. Traditional UI libraries often become hard to extend when components are too rigid or monolithic. To support diverse use cases across Plasius projects, we need a flexible, composable design approach.

## Decision

We will adopt a **headless and composable architecture** for components, which includes:

- Provide **headless primitives** (logic only) with presentational wrappers where necessary.
- Favor **composition over inheritance** — smaller building blocks combined to form larger components.
- Support **slots/render-props** to allow consumers to extend components safely.
- Keep component APIs **minimal and predictable**, avoiding prop explosion.
- Enforce **no cross-package cycles** to maintain scalability across the monorepo.

## Consequences

- **Positive:**

  - Components remain flexible and reusable across diverse projects.
  - Encourages user-driven customization without forking components.
  - Reduces maintenance overhead by preventing rigid or bloated APIs.

- **Negative:**
  - Higher upfront design effort to define primitives and composition patterns.
  - Requires careful documentation to ensure consumers understand composition.

## Alternatives considered

- **Monolithic styled components:** Rejected, as they are harder to customize and maintain at scale.
- **Deep inheritance hierarchies:** Rejected, as they lead to brittle APIs and poor extensibility.
- **Hooks-only API:** Considered, but lacks structure for visual primitives and increases boilerplate for consumers.

## References

- [Headless UI](https://headlessui.com/)
- [Render Props Pattern](https://reactjs.org/docs/render-props.html)
- [Composition vs Inheritance](https://react.dev/learn/passing-props-to-a-component#composition-vs-inheritance)
