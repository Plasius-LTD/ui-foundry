# ADR-0014: Error Handling & Contracts

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

Without clear error handling and contracts, `@plasius/ui-foundry` components may behave inconsistently, fail silently, or produce confusing errors. Developers consuming the library need predictable, meaningful feedback when misusing APIs, while end-users should never encounter broken interfaces. A well-defined error handling and contract policy ensures both developer experience (DX) and user experience (UX) remain robust.

## Decision

We will enforce a **fail-fast in development, graceful in production** policy for error handling and contracts:

- **TypeScript as the first contract**: Use strict TypeScript types to catch incorrect prop usage at compile time.
- **Runtime validation (dev mode)**: Validate critical props and state invariants in development builds, throwing clear error messages if violated.
- **No runtime prop-types in production**: Remove dev-only checks from production bundles for performance.
- **Meaningful error messages**: Provide clear, actionable errors in development (e.g., “Button requires either `label` or `aria-label`”).
- **Graceful degradation in production**: In production, invalid props or state should fall back to safe defaults where possible, without crashing.
- **Contract tests**: Write automated tests to enforce component contracts (e.g., required props, event callbacks).

## Consequences

- **Positive:**

  - Developers get immediate feedback during development, reducing bugs early.
  - End-users are protected from broken UIs in production.
  - Consistent contract enforcement improves reliability across the library.

- **Negative:**
  - Slight increase in bundle size in development due to validation checks.
  - Contributors must maintain meaningful error messages alongside types.

## Alternatives considered

- **PropTypes runtime validation in all environments:** Rejected, as it increases bundle size and duplicates TypeScript’s role.
- **No runtime validation (types only):** Rejected, as some contract violations only surface at runtime (e.g., null refs, invalid combinations).
- **Always fail hard in production:** Rejected, as it risks breaking end-user experiences unnecessarily.

## References

- [React Error Handling](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Design by Contract](https://en.wikipedia.org/wiki/Design_by_contract)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
