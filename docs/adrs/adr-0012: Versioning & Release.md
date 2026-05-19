# ADR-0012: Versioning & Release

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

Consistent versioning and release management are critical for `@plasius/ui-foundry` to ensure predictability, stability, and smooth adoption across projects. Without a clear strategy, breaking changes may be introduced unexpectedly, consumers may face upgrade issues, and releases could become error-prone. We must align with modern practices for semantic versioning and automated releases.

## Decision

We will adopt a **semantic versioning (SemVer) and automated release** strategy, supported by Changesets and CI/CD pipelines. Specifically:

- **Semantic Versioning (SemVer)**:
  - MAJOR version → incompatible API changes.
  - MINOR version → backward-compatible feature additions.
  - PATCH version → backward-compatible bug fixes.
- **Changesets for versioning**: Contributors must include a changeset with every PR that modifies published code. Changesets will determine the release type and generate changelogs automatically.
- **Automated releases via CI/CD**: Merges to `main` with accumulated changesets will trigger automated publishing to npm, with GitHub releases and tags created.
- **Changelogs**: Generated from changesets; must be human-readable and highlight breaking changes, new features, and fixes.
- **Release cadence**: Continuous releases — no artificial batching; every merged, approved change with a changeset can be released once merged to `main`.

## Consequences

- **Positive:**

  - Predictable release cycle with clear communication of breaking changes.
  - Reduced manual overhead via automated publishing and changelog generation.
  - Encourages discipline in documenting the impact of changes.

- **Negative:**
  - Requires contributors to learn and use changesets workflow.
  - Automated cadence may feel “noisy” with frequent small releases.

## Alternatives considered

- **Manual versioning and release process:** Rejected, as it is error-prone and inconsistent.
- **Fixed interval release trains (e.g., weekly/monthly):** Rejected, as it slows down delivery and creates unnecessary batching.
- **Non-SemVer strategy:** Rejected, as it reduces clarity for consumers about upgrade risks.

## References

- [SemVer Specification](https://semver.org/)
- [Changesets](https://github.com/changesets/changesets)
- [npm Publishing Guide](https://docs.npmjs.com/getting-started/publishing-npm-packages)
