# Changelog

All notable changes to this project will be documented in this file.

The format is based on **[Keep a Changelog](https://keepachangelog.com/en/1.1.0/)**, and this project adheres to **[Semantic Versioning](https://semver.org/spec/v2.0.0.html)**.

---

## [Unreleased]

- **Added**
  - Enforced ADR-0009 package QA gates for core, components, and App Insights adapter tests with combined coverage in CI.

- **Changed**
  - Bound npm publication to the exact prepared `main` commit after successful push-triggered CI.
  - Ensure UI Foundry packages publish dual ESM/CJS outputs with consistent `main`/`module` metadata.
  - Added repository-level QA commands for package validation, accessibility coverage, and combined LCOV reporting.
  - Raised the minimum supported Node.js runtime for the workspace and published packages to Node.js 24.
  - Consume the RFC-remediated schema and translation releases and refresh patched Vitest/Vite tooling (task #26).

- **Fixed**
  - Made the root typecheck build the core workspace declarations before checking dependent integrations from a clean checkout.
  - Added fail-closed package validation for published tarballs, including dist artifact checks and source/test exclusion.
  - Restored workspace coverage for the CLI package and replaced the placeholder CLI publish metadata with a tested entrypoint.
  - Corrected public documentation to reference the published packages instead of the private repository root package.

- **Security**
  - Removed the npm write-token path, added a fail-closed npm 11.5.1-or-newer OIDC guard, and denied fork PR code access to self-hosted CI.
  - Added fail-closed source and npm-package admission for the administrative contributor registry and pinned the CI/CD runtime to Node.js 24.18.0 LTS.
  - Updated Vite/PostCSS/Picomatch dependency resolution to patched versions for the production audit baseline.

---

## Release process (maintainers)

1. Update `CHANGELOG.md` under **Unreleased** with user‑visible changes.
2. Bump version in `package.json` following SemVer (major/minor/patch).
3. Move entries from **Unreleased** to a new version section with the current date.
4. Tag the release in Git (`vX.Y.Z`) and push tags.
5. Publish to npm (via CI/CD or `npm publish`).

> Tip: Use Conventional Commits in PR titles/bodies to make changelog updates easier.

---

[Unreleased]: https://github.com/Plasius-LTD/ui-foundry/compare/v1.0.0...HEAD
