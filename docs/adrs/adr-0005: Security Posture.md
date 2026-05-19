# ADR-0005: Security Posture

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

`@plasius/ui-foundry` components are consumed across multiple applications with varying security requirements. UI libraries can inadvertently introduce security risks via unsafe DOM APIs, injection-prone patterns, insecure defaults, or vulnerable dependencies. We need a clear, enforceable security posture to prevent regressions and align with Plasius’ broader security standards (CSP, dependency hygiene, secret handling).

## Decision

Adopt a **CSP-friendly, dependency-hygienic, and least-privilege** security posture:

- **CSP-friendly by default**: No `eval`, `new Function`, or dynamic script construction; no inline `<script>` requirements. Avoid `dangerouslySetInnerHTML` unless strictly necessary and sanitized upstream.
- **No implicit HTML injection**: Components accept structured data/props — never raw HTML strings. If HTML is unavoidable, it must be explicitly marked and documented as unsafe, with consumer-provided sanitization.
- **Escape and encode**: All user-supplied content rendered as text nodes only. Attributes and URLs must be validated/encoded by consumers before passing to components.
- **Dependencies**: Minimize runtime deps. Run automated dependency scanning in CI (GHAS/Snyk) and fail on high/critical vulnerabilities. Pin versions with Renovate/Dependabot.
- **Secrets & config**: No secrets or tokens in repository or code paths. Build-time configuration only; no runtime secret fetching inside the UI library.
- **SSR safety**: Components must not access `window`/`document` at import time. Guard optional browser APIs behind runtime checks.
- **Event handling**: Never reflect untrusted data into event handler code paths (no `onClick={new Function(...)}`-style patterns). Use normal React event props only.
- **3rd-party content**: No automatic script injection (analytics, fonts, widgets). Consumers must explicitly integrate external scripts/styles.

## Acceptance Criteria (Enforcement)

- **CI checks**:
  - Dependency scanning (GHAS/Snyk) → fail on high/critical.
  - Lint rules: ban `eval`, `new Function`, and unsafe DOM APIs; forbid `dangerouslySetInnerHTML` usage in source except in whitelisted files with justification comments.
  - Type/lint for SSR: static import paths must be side-effect-free; SSR test renders components without `window`/`document`.
- **Review checklist** (PR template):
  - No raw HTML inputs; if present, documented and sanitized upstream.
  - No CSP violations; no inline scripts/styles requirements beyond CSS variables.
  - Browser API access guarded; works under SSR.
  - New dependencies evaluated for size, maintenance, and security posture.

## Consequences

- **Positive**:
  - Reduces XSS/CSP violations risk and improves security posture across consuming apps.
  - Predictable, auditable component behavior; easier compliance reviews.
- **Negative**:
  - Small DX overhead (lint rules, reviews) and occasional extra code to avoid unsafe shortcuts.
  - Potentially fewer convenience APIs that accept raw HTML.

## Alternatives Considered

- **Trusting consumers to sanitize**: Rejected — too error-prone and inconsistent across apps.
- **Permissive injection APIs** (e.g., HTML strings everywhere): Rejected — high XSS risk.
- **Heavy sandboxing/DOMPurify within library**: Rejected — pushes non-performant, opinionated sanitization into core. Better to require explicit, documented sanitization by consumers when necessary.

## References

- [Content Security Policy (CSP) Level 3](https://www.w3.org/TR/CSP3/)
- [OWASP XSS Prevention Cheat Sheet](https://owasp.org/www-community/xss-prevention)
- [React docs: dangerouslySetInnerHTML](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html)
- [Github Advanced Security](https://docs.github.com/en/code-security) / [Snyk](https://snyk.io/)
