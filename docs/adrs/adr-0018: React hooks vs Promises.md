# ADR-0018: React Hooks vs Promises

**Status:** Proposed  
**Date:** 2025-10-08  
**Owners:** Frontend Architecture (Plasius LTD)  
**Context:** React (function components), TypeScript, React Scoped Store pattern, Vite builds. We frequently consume async services (HTTP, device APIs, speech engines) and must balance correctness, testability, and performance.

---

## 1. Problem

We routinely call async work (HTTP calls, device APIs) from React UIs. React gives us hooks (<code>useEffect</code>, <code>useState</code>, <code>useMemo</code>, etc.) while the platform gives us Promises / async</code>–<code>await</code>. Misuse leads to race conditions, “setState on unmounted component,” stale closures, or unreadable code.

We need a clear stance on:

- Where Promises live
- How UI observes async state
- How to cancel/avoid races
- How to test

---

## 2. Decision (TL;DR)

1. Business/data fetching belongs to Promises in the **service layer** (pure functions returning <code>Promise&lt;T&gt;</code> with explicit types).
2. UI uses hooks to orchestrate those Promises and expose declarative status: <code>{ data, error, loading }</code>.
3. Never kick off Promises directly during render; only in effects/events or via custom hooks.
4. Always implement cancellation or obsolescence guards for in-flight Promises (use <code>AbortController</code> or request tokens).
5. Prefer a **custom hook wrapper** pattern to bridge Promises ↔ React lifecycle.
6. Event handlers may freely use <code>await</code> (they are one-shot).
7. For background/ongoing queries, prefer a hook that subscribes to a store/cache (React Scoped Store).

---

## 3. Options Considered

**Option A – Hook wraps Promise lifecycle (default)**  
Custom hook calls a service Promise in an effect, manages <code>{ data, loading, error }</code>, and handles cancellation.  
✅ Simple, testable, avoids late updates. ⚠️ You own caching/dedup.

**Option B – Service Promises + React Scoped Store (central cache)**  
Services write to a store; hooks subscribe to state.  
✅ Ideal for shared data, caching, and analytics integration. ⚠️ Requires cache invalidation.

**Option C – Event-only Promises**  
Promises used only inside handlers (<code>onClick</code>, <code>onSubmit</code>).  
✅ Simple for one-shot actions. ⚠️ Not for background tasks.

**Option D – Suspense resources (advanced/opt-in)**  
Promises wrapped in Suspense boundaries.  
✅ Declarative loading UX. ⚠️ Requires app-level coordination and SSR awareness.

**Recommendation:** Default to Option A, scale to B for shared data, use C for isolated actions, adopt D selectively.

---

## 4. Rationale

Hooks handle lifecycle and state; Promises perform async work.  
Separating these concerns yields cleaner tests, predictable cleanup, and simpler refactors.  
Store-backed solutions unify analytics, NFR tracking, and caching.

---

## 5. Guidelines & Patterns

**Service layer (Promise API, pure)**  
Example: <code>fetchUsers(params: { query: string; signal?: AbortSignal }): Promise&lt;User[]&gt;</code> → performs a typed fetch and throws on HTTP error.

**Hook wrapper (Option A)**  
<code>useUsers(query)</code> calls <code>fetchUsers</code> inside <code>useEffect</code>, tracks <code>loading/error</code>, and cancels via <code>AbortController</code> and an <code>alive</code> flag.

**Event handler (Option C)**  
<code>const onClick = async () =&gt; { setSaving(true); try { await saveUser(id); } finally { setSaving(false); } }</code>

**Store bridge (Option B)**  
A <code>createStore</code> reducer manages <code>{ cache, loadingKeys, errors }</code>; the hook dispatches <code>REQ</code>, <code>OK</code>, or <code>ERR</code> actions and subscribes via <code>useSelector</code>.

**Anti-patterns:**  
❌ Creating Promises during render.  
❌ Ignoring cancellation.  
❌ Returning Promises from render paths.  
❌ Mixing business logic into UI.

---

## 6. Cancellation & Race-Safety Checklist

- Always use <code>AbortController</code> for cancellable APIs.
- Track an <code>alive</code> flag or <code>requestId</code>.
- Compare <code>version</code> tokens in store dispatches.
- Clean up effects properly.

---

## 7. Testing Strategy

| Layer   | Type        | Focus                                                    |
| ------- | ----------- | -------------------------------------------------------- |
| Service | Unit        | Mock <code>fetch</code>; verify Promise resolves/rejects |
| Hook    | Integration | RTL + fake timers; lifecycle behaviour                   |
| Store   | Unit        | Reducer correctness; distinct-until-changed              |
| Edge    | Lifecycle   | Abort mid-flight; prop change; unmount                   |

---

## 8. NFR & Analytics

Track async phases with <code>track("feature:fetch", { phase, query })</code>.  
Measure durations with <code>performance.now()</code> deltas.  
Integrate with <code>@plasius/nfr</code>.

---

## 9. Consequences

**Pros:** Predictable, testable, race-safe, scalable.  
**Cons:** Some boilerplate; requires cleanup discipline.

---

## 10. Migration

- Wrap existing <code>useEffect + fetch</code> patterns into custom hooks.
- Move shared fetches to stores.
- Gate Suspense adoption behind a boundary.

---

## 11. Rules of Thumb

1. Render → no Promises.
2. Effect → call Promises, cancel safely.
3. Events → <code>await</code> freely.
4. Shared state → store-backed hooks.
5. Polished UX → Suspense.

---

## 12. FAQ

**Can I await inside useEffect?**  
No; wrap in an async IIFE.

**When avoid hooks?**  
For pure domain logic — keep Promises outside React.

**How to prevent setState on unmounted?**  
Abort or guard every async operation.

---

## 13. Sensible Solutions

1. Simple screen → Option A.
2. Shared data → Option B.
3. One-shot action → Option C.
4. Advanced UX → Option D.

---

## 14. CHANGELOG

- 2025-10-08 — Initial ADR established (Hooks orchestrate Promises; cancellation mandatory; stores for shared state).

---
