# ADR-0011: Documentation & Examples

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

High-quality documentation is essential for adoption and long-term maintainability of `@plasius/ui-foundry`. Component APIs, accessibility behaviors, theming hooks, and performance characteristics must be easy to discover and verify. Ad-hoc READMEs and scattered examples lead to drift, duplication, and confusion. We need a single source of truth that is executable, reviewable in PRs, and continuously tested.

## Decision

Use **Ladle (Vite-based)** as the source of truth for documentation and examples, backed by CSF/MDX where appropriate and automated checks. Specifically:

- **CSF stories** (and MDX where needed) for every component covering: usage, props, events, a11y notes, keyboard interactions, theming tokens, RTL examples, performance tips, and do/don’t guidelines.
- **Interactive controls** (args) to demonstrate prop variations and encourage discoverability (Ladle supports controls/knobs).
- **A11y integration**: Run Axe checks against Ladle stories (either via the Ladle a11y addon or Playwright+aXe in CI); document keyboard and screen reader behaviors explicitly.
- **Visual regression testing** via Playwright on the Ladle static build to catch UI drift (baseline screenshots committed; CI compares deltas).
- **Examples as tests**: Prefer runnable stories over static snippets; Ladle stories must compile in CI.
- **Versioned docs**: Publish a Ladle static build per release so docs match the published package version.
- **Doc generation**: Generate prop tables from TypeScript (e.g., `react-docgen-typescript`); hand-write usage guidance and patterns.

## Consequences

- **Positive**:
  - One canonical place for usage, a11y, theming, and performance guidance.
  - Executable docs reduce drift and ensure examples remain valid.
  - Visual and a11y checks integrate naturally into the review process.
- **Negative**:
  - Additional initial setup and maintenance for Ladle/MDX and CI.
  - Contributors must learn CSF/MDX conventions for docs.

## Alternatives considered

- **Per-component READMEs only**: Rejected—hard to keep consistent, not executable, no visual/a11y checks.
- **Storybook**: Considered; powerful ecosystem, but we prefer a lighter, Vite-native stack (Ladle) that aligns with our build tooling and performance goals. Revisit if ecosystem needs shift.
- **External doc site (e.g., Docusaurus) only**: Rejected for now—great for marketing/reference, but Ladle better fits component-centric, runnable docs. Can be added later for higher-level guides.
- **Inline JSDoc only**: Useful for IDE hints, but insufficient for interactive examples and a11y/perf guidance.

## Acceptance Criteria (Enforcement)

- Every component PR must include or update:
  - At least one MDX story with examples and prop controls.
  - Accessibility notes and keyboard interactions where applicable.
  - Theming tokens demonstrated (light/dark, high contrast) where applicable.
- CI must:
  - Build Ladle (static export) without errors.
  - Run Axe a11y checks against key Ladle stories (addon or Playwright+aXe).
  - Run visual regression tests (Playwright) on changed stories in the Ladle build.
- Prop tables are generated from TypeScript types; breaking prop changes surface in PRs.

## References

- [Ladle](https://www.ladle.dev/)
- [Component Story Format (CSF)](https://storybook.js.org/docs/writing-stories/introduction) *(format reference)*
- [Testing Library](https://testing-library.com/)
- [Playwright](https://playwright.dev/)
- [Axe for Accessibility](https://www.deque.com/axe/)
- [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript)
