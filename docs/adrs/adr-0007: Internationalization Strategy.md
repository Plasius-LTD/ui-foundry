# ADR-0007: Internationalization (i18n) Strategy

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

Plasius applications must support international audiences, including different languages, locales, and text directions (LTR/RTL). UI component libraries can become brittle or exclusionary if they hardcode strings or assume one directionality. To ensure `@plasius/ui-foundry` components remain globally usable, we need a consistent internationalization strategy aligned with `@plasius/translations`.

## Decision

We will make all `@plasius/ui-foundry` components **i18n-ready by default**. This includes:

- **No hardcoded strings**: Components will not contain user-facing strings directly. Labels, placeholders, and messages must be passed in via props or slots.
- **Integration with `@plasius/translations`**: Consumers can connect components to the shared i18n system using the `t()` function and React context (`I18nProvider`, `useI18n`).
- **Direction awareness**: Components must respect `dir` attributes (e.g., `dir="rtl"`) and adjust layout/alignments accordingly.
- **Placeholders & formatting**: Support dynamic values in translations (e.g., `{count}`, `{name}`) without assuming grammar or order.
- **Accessibility alignment**: Ensure translated text still meets accessibility requirements (contrast, ARIA labels, screen reader support).

## Consequences

- **Positive:**

  - Components are globally usable across multiple locales without modification.
  - Ensures consistent integration with Plasius’ translation ecosystem.
  - Reduces risk of inaccessible or incorrect rendering for RTL languages.

- **Negative:**
  - Slightly more boilerplate for consumers to provide text props.
  - Increased testing scope (multiple languages and directions).

## Alternatives considered

- **Hardcoded English strings**: Rejected, as it excludes non-English users and creates duplication.
- **Independent per-component i18n logic**: Rejected, as it leads to fragmentation and inconsistent translation handling.
- **Require consumers to wrap every component**: Rejected, as it increases complexity and reduces usability.

## References

- [@plasius/translations](../../translations)
- [W3C Internationalization Techniques](https://www.w3.org/International/techniques/developing-specs)
- [MDN: dir attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
