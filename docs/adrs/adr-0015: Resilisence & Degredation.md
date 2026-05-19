# ADR-0015: Resilience & Degradation

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

Users may interact with `@plasius/ui-foundry` components in environments with reduced capabilities, such as limited network, disabled CSS/JS features, reduced-motion preferences, or high-contrast requirements. Without resilience strategies, components could break or become unusable in these conditions. Ensuring graceful degradation and progressive enhancement is a core non-functional requirement.

## Decision

We will design components with **resilience and graceful degradation** as core principles:

- **Progressive enhancement**: Components must work with baseline HTML/ARIA semantics even if advanced styling or scripting fails.
- **Reduced motion support**: Respect the `prefers-reduced-motion` media query, disabling non-essential animations and transitions.
- **High contrast support**: Ensure token-driven colors adapt correctly to high contrast mode; test with OS/browser settings enabled.
- **Network resilience**: Components must handle slow or offline states gracefully (e.g., loading spinners, retry affordances).
- **Optional API resilience**: Guard use of optional browser APIs (e.g., IntersectionObserver) to avoid crashes if unsupported.
- **Font and asset fallbacks**: Use system fonts and default UI assets if custom fonts/assets fail to load.
- **Accessibility resilience**: Always ensure fallback labels, roles, and text equivalents are present.

## Consequences

- **Positive:**

  - Improves inclusivity for users with different needs and devices.
  - Increases robustness across varying environments and network conditions.
  - Reduces risk of total failure when advanced features are unavailable.

- **Negative:**
  - Adds extra testing and maintenance overhead (must validate multiple modes, preferences, and failure states).
  - Requires discipline in avoiding fragile assumptions about environment capabilities.

## Alternatives considered

- **Focus only on “happy path” modern environments:** Rejected, as it excludes users with accessibility needs or degraded conditions.
- **Polyfill everything for legacy support:** Rejected, as it increases bundle size and complexity; prefer feature detection and progressive enhancement.

## References

- [Progressive Enhancement Principles](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
- [Prefers Reduced Motion (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [High Contrast Mode in Windows](https://learn.microsoft.com/en-us/windows/apps/design/accessibility/high-contrast-themes)
- [Resilient Web Design (by Jeremy Keith)](https://resilientwebdesign.com/)
