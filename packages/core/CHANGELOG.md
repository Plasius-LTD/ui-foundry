# Changelog

All notable changes to this project will be documented in this file.

The format is based on **[Keep a Changelog](https://keepachangelog.com/en/1.1.0/)**, and this project adheres to **[Semantic Versioning](https://semver.org/spec/v2.0.0.html)**.

---

## [Unreleased]

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [0.1.1] - 2026-06-22

- **Added**
  - Added package-local tests for `AnalyticsProvider` and `useAnalytics` behavior.

- **Changed**
  - Add `main`, `module`, and `types` fields alongside the export map for dual ESM/CJS support.
  - Raised the minimum `@plasius/schema` peer and development dependency to `^1.2.6`.

- **Fixed**
  - (placeholder)

- **Security**
  - Removed the unused production `vite` dependency so published packages no longer pull vulnerable dev tooling into consumer installs.

---

## Release process (maintainers)

1. Update `CHANGELOG.md` under **Unreleased** with user-visible changes.
2. Bump version in `package.json` following SemVer (major/minor/patch).
3. Move entries from **Unreleased** to a new version section with the current date.
4. Tag the release in Git (`vX.Y.Z`) and push tags.
5. Publish to npm (via CI/CD or `npm publish`).

> Tip: Use Conventional Commits in PR titles/bodies to make changelog updates easier.

---

[Unreleased]: https://github.com/Plasius-LTD/ui-foundry/compare/ui-foundry-core-v0.1.1...HEAD
[0.1.1]: https://github.com/Plasius-LTD/ui-foundry/releases/tag/ui-foundry-core-v0.1.1
