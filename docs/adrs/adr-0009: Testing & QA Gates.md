# ADR-0009: Testing & QA Gates

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

Testing and quality assurance are critical non-functional requirements for `@plasius/ui-foundry`. Without a strong testing and QA strategy, UI components risk regressions in functionality, accessibility, and performance. To ensure reliability and maintainability, we must define testing requirements and quality gates that all components must meet before release.

## Decision

We will adopt a **multi-layer testing strategy with CI-enforced QA gates**:

- **Unit tests**: All components must include unit tests (Vitest) for core logic, props, and rendering.
- **Accessibility tests**: Automated checks (e.g., Axe) must validate accessibility rules; interactive components must have keyboard and screen reader tests.
- **Visual regression tests**: Use Playwright for snapshot/visual diff testing of Ladle-rendered components (replacing Storybook).
- **Integration tests**: For complex flows, test composed components in context to ensure interop.
- **Coverage thresholds**: Critical-path code must maintain ≥95% coverage; overall project must maintain ≥85%.
- **CI gates**: PRs must pass linting, type-checks, tests, accessibility, and bundle-size checks before merge.

## Consequences

- **Positive:**

  - Increases reliability and confidence in the component library.
  - Prevents regressions in accessibility, performance, and appearance.
  - Ensures consistent quality across contributions.

- **Negative:**
  - Slower feedback loop due to multiple test layers.
  - Higher upfront effort for contributors to meet coverage thresholds.

## Alternatives considered

- **Unit tests only**: Rejected, as it would miss visual and accessibility regressions.
- **Visual/manual QA only**: Rejected, as it is too error-prone and inconsistent.
- **Lower coverage thresholds**: Rejected, as they reduce reliability of quality gates.

## References

- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Axe for Accessibility](https://www.deque.com/axe/)
- [Playwright](https://playwright.dev/)
