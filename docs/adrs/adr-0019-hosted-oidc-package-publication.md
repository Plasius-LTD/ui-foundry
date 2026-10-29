# ADR-0019: Hosted OIDC Package Publication

- Status: Accepted
- Date: 2026-08-11

## Context

`@plasius/ui-foundry` must publish without a long-lived npm write token and without
accepting CI evidence for another source snapshot.

## Decision

Publication is phase-isolated: dependency installation, package validation, SBOM generation, and immutable tarball packing run in `validate_and_pack` without the `production` environment or OIDC permission. The final hosted `publish` job downloads only that sealed artifact, explicitly installs npm 11.6.2, runs no repository dependency code, and publishes the tarball with lifecycle scripts disabled. It re-fetches current `main` immediately before the first release mutation and again immediately before npm publication. `.npmrc` contains no registry-auth placeholder, and release preparation returns the reviewed current `main` HEAD rather than package-file history.

Publish only from the GitHub-hosted `production` job using npm trusted
publishing. Prove the prepared SHA is still the exact remote `main` head and
that push-triggered `ci.yml` succeeded for it. Require Node 24 and npm 11.5.1 or
newer, request provenance, and prohibit npm write-token fallbacks. Reviewed CI
uses explicit `[self-hosted, Linux, X64]` runners only for trusted `main`
pushes, with package-manager caching and persisted checkout credentials disabled.
PR events, reusable calls, manual dispatches and caller-controlled runner
selection are excluded; both jobs also check the event and exact main ref.
Jobs have bounded timeouts. Hosted CI is not a fallback. This reconciles the
runner boundary with recovery Task #29 and Story #1626; hosted publication
remains unchanged.

## Workspace build order

Within `validate_and_pack`, the existing root build script builds Core before its
workspace consumers. Clean npm installs link local workspaces, so a selected
consumer cannot assume Core declarations already exist. Run that dependency
order before selected-package tests and package checks whenever builds are
enabled. A failed workspace build stops validation before artifact creation;
the OIDC publication job continues to run no repository dependency code.

## Consequences

Missing trust configuration, moved `main`, absent CI, unsupported runtime, or
missing OIDC identity fails closed before publication.

## Test implications

Workflow tests enforce source, CI, runtime, identity, runner, and token rules.
The regression first fails against hosted CI. Both CI jobs must keep explicit
labels and main-push guards. Rollback disables the affected workflow/channel
without restoring the prohibited path. Feature1597 inherits
`platform.public-artifact-integrity.enabled`; mandatory checks cannot be bypassed.

## Alternatives

Hosted CI contradicts the recovery acceptance criteria. Same-repository PR
execution and arbitrary manual refs widen access to persistent runner capacity,
so CI admits only main pushes. Local validation and PR review precede merge;
exact-main CI must succeed before publication. No runtime API or package
dependency changes are needed.
