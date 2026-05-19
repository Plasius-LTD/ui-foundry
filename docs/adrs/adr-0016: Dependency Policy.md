# ADR-0016: Dependency Policy

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

Dependencies can significantly affect the performance, security, and maintainability of `@plasius/ui-foundry`. Without a clear dependency policy, the library risks becoming bloated, introducing vulnerabilities, or locking into poorly maintained external libraries. Establishing rules for dependency usage ensures long-term stability and alignment with Plasius’ standards for performance, accessibility, and resilience.

## Decision

We will adopt a **minimal, carefully vetted dependency policy**:

- **Minimize runtime dependencies**: Prefer native browser APIs and utilities over external libraries.
- **Allow-list approach**: New dependencies must be explicitly approved and justified (performance, accessibility, or DX benefits).
- **Size budgets**: Any new dependency must stay within bundle size budgets defined in ADR-0003.
- **Security audits**: Dependencies must pass automated vulnerability scanning (GHAS/Snyk).
- **Maintenance criteria**: Dependencies must be actively maintained, compatible with modern React and TypeScript, and have good ecosystem adoption.
- **Styling dependencies**: No runtime CSS-in-JS libraries (e.g., styled-components, emotion). Styling must rely on design tokens and CSS variables (ADR-0008).
- **Transitive dependencies**: Must be monitored; avoid dependencies that pull in large or unstable trees.
- **Tooling dependencies**: Dev/test/build tooling allowed but must be replaceable and not impact runtime bundle.

## Consequences

- **Positive:**

  - Keeps the library lightweight, secure, and maintainable.
  - Prevents dependency sprawl and ensures alignment with NFRs.
  - Reduces risk of security vulnerabilities and abandoned packages.

- **Negative:**
  - May require writing small utilities in-house instead of relying on popular libraries.
  - Slows adoption of new dependencies due to vetting and approval process.

## Alternatives considered

- **Open dependency policy (allow anything):** Rejected, as it increases bundle size, risks security issues, and reduces maintainability.
- **Ban all external dependencies:** Rejected, as some external libraries (e.g., testing frameworks, a11y helpers) provide significant value.
- **Ad hoc decisions without a policy:** Rejected, as it creates inconsistency and increases risk over time.

## References

- [ADR-0003: Performance & Bundle Policy](./adr-0003:%20Performance%20&%20Bundle%20Policy.md)
- [ADR-0008: Theming & Design System](./adr-0008:%20Theming%20&%20Design%20System.md)
- [OWASP Dependency Management](https://owasp.org/www-project-dependency-check/)
- [Snyk](https://snyk.io/)
