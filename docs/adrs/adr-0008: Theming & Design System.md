# ADR-0008: Theming & Design System

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

Consistent theming and design system integration are critical to ensuring that `@plasius/ui-foundry` provides reusable, adaptable, and brand-aligned UI components. Without a clear theming strategy, components may become visually inconsistent, harder to maintain, and less accessible. We must balance flexibility (consumer customization) with consistency (shared design tokens and patterns).

## Decision

We will adopt a **design token and CSS variable–driven theming approach** for `@plasius/ui-foundry`. This includes:

- **Design tokens as the source of truth**: Define core values for color, typography, spacing, sizing, etc., in a platform-agnostic format (e.g., JSON).
- **CSS variables for runtime theming**: Tokens will be transformed into CSS custom properties, allowing dynamic theme switching (e.g., light/dark).
- **Scoped theming support**: Themes can be applied globally or at a subtree level (e.g., per-brand, per-module).
- **No runtime CSS-in-JS**: Avoid large styling engines. Use PostCSS, CSS Modules, or vanilla-extract for build-time generation.
- **Accessibility baked in**: Ensure token defaults (e.g., color contrast) meet WCAG 2.2 AA standards.
- **Dark mode and high contrast mode**: Supported out-of-the-box with system preference detection (`prefers-color-scheme`) and token overrides.

## Consequences

- **Positive:**

  - Ensures consistent look and feel across all Plasius projects.
  - Consumers can override themes without forking components.
  - Lightweight and performant (no runtime styling overhead).

- **Negative:**
  - Requires careful design and governance of the token system.
  - Additional upfront investment in tooling for token transformation.

## Alternatives considered

- **Runtime CSS-in-JS (e.g., styled-components, emotion):** Rejected due to runtime overhead and bundle size concerns.
- **Hardcoded styles in components:** Rejected, as it prevents theming and design-system flexibility.
- **Inline style props everywhere:** Rejected, as it clutters APIs and bypasses design tokens.

## References

- [Design Tokens W3C Draft](https://tr.designtokens.org/)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
