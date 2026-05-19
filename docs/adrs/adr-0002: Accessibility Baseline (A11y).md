
# ADR-0002: Accessibility Baseline (A11y)

## Status

- Proposed → Accepted
- Date: 2025-09-16
- Version: 1.0
- Supersedes: N/A
- Superseded by: N/A

## Context

Accessibility is a non-functional requirement critical to all Plasius projects. To ensure our UI components are usable by all users, including those with disabilities, we must adopt a clear accessibility baseline. Relying on manual reviews or leaving accessibility to downstream projects increases risk of inconsistent or non-compliant components.

## Decision

We will enforce **WCAG 2.2 AA compliance** as the accessibility baseline for `@plasius/ui-foundry`. This includes:

- All interactive components must support keyboard navigation, visible focus states, and ARIA roles/labels where necessary.  
- Preference for native HTML semantics over ARIA when possible.  
- Automated accessibility checks (e.g., Axe) integrated into CI.  
- Manual audits for complex interactions, supplemented with external audits as needed.  

## Consequences

- **Positive:**  
  - Ensures consistent accessibility across all UI components.  
  - Reduces downstream burden on individual projects.  
  - Increases trust and usability for all users.  

- **Negative:**  
  - Additional effort needed to build and test accessibility from the start.  
  - CI pipelines may block merges until accessibility issues are resolved.  

## Alternatives considered

- **Leave accessibility to downstream projects:** Rejected, as it risks inconsistent implementation and duplicated effort.  
- **Automated tests only (no manual audits):** Rejected, as some accessibility concerns cannot be caught automatically.  
- **External audits only:** Rejected, as they are too infrequent to guarantee ongoing compliance.  

## References

- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)  
- [Deque Axe](https://www.deque.com/axe/)  
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)  
