# ADR-0006: Privacy & Telemetry

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

Privacy is a core non-functional requirement for `@plasius/ui-foundry`. UI component libraries can unintentionally introduce privacy risks if telemetry, analytics, or tracking is included by default. Since this library will be consumed in privacy-sensitive applications, it must guarantee that no personal data or tracking is ever collected without explicit opt-in from the consumer.

## Decision

We will adopt a **privacy-first, no-default-telemetry** stance for `@plasius/ui-foundry`, which includes:

- **Zero PII collection**: Components must not gather or transmit any personally identifiable information (PII).
- **No default telemetry**: The library itself will not send usage metrics, analytics, or network requests.
- **Opt-in demo-only telemetry**: Any metrics (e.g., component usage in Ladle or demo apps) must be explicitly opt-in, anonymized, and isolated from production code.
- **Documentation clarity**: If example/demo code includes telemetry, it must be clearly documented as optional and off by default.
- **Consumer responsibility**: Applications that consume `@plasius/ui-foundry` are responsible for their own telemetry or analytics policies.

## Consequences

- **Positive:**

  - Guarantees privacy compliance across all projects using this library.
  - Reduces legal and regulatory risks (GDPR, CCPA, etc.).
  - Builds trust with developers and end-users by ensuring no hidden tracking.

- **Negative:**
  - No built-in metrics about library usage in production.
  - Consumers must implement their own telemetry if needed.

## Alternatives considered

- **Default opt-out telemetry**: Rejected, as it introduces hidden data flows and regulatory risk.
- **Bundled analytics SDKs**: Rejected, as they increase bundle size and privacy concerns.
- **Allow HTML attributes for tracking (e.g., data-track)**: Rejected, as this could encourage poor privacy practices.

## References

- [GDPR Overview](https://gdpr-info.eu/)
- [CCPA Summary](https://oag.ca.gov/privacy/ccpa)
- [Privacy by Design Principles](https://www.ipc.on.ca/privacy/privacy-by-design/)
