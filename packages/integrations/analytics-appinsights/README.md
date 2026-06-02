# @plasius/ui-foundry-analytics-appinsights

[![npm version](https://img.shields.io/npm/v/@plasius/ui-foundry-analytics-appinsights)](https://www.npmjs.com/package/@plasius/ui-foundry-analytics-appinsights)
[![build status](https://github.com/Plasius-LTD/ui-foundry/actions/workflows/ci.yml/badge.svg)](https://github.com/Plasius-LTD/ui-foundry/actions)
[![coverage](https://img.shields.io/codecov/c/github/Plasius-LTD/ui-foundry)](https://codecov.io/gh/Plasius-LTD/ui-foundry)
[![license](https://img.shields.io/github/license/Plasius-LTD/ui-foundry)](../../LICENSE.md)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-yes-blue.svg)](./CODE_OF_CONDUCT.md)
[![Security Policy](https://img.shields.io/badge/security%20policy-yes-orange.svg)](./SECURITY.md)
[![Changelog](https://img.shields.io/badge/changelog-md-blue.svg)](./CHANGELOG.md)

> Lightweight adapter to connect **Azure Application Insights** with the `ui-foundry` analytics API.

Apache-2.0. ESM + CJS builds. TypeScript types included.

---

## ✨ What is this?

This package provides a **tiny adapter** between:

- The `AnalyticsAdapter` interface from [`@plasius/ui-foundry-core`](../ui-foundry-core)
- An **Application Insights client** from [`@microsoft/applicationinsights-web`](https://www.npmjs.com/package/@microsoft/applicationinsights-web)

The adapter lets you use `useAnalytics()` and `AnalyticsProvider` in your app without hard-coding the SDK.

**⚠️ Note:** This package does **not** install or configure Application Insights for you.  
The consuming application owns the SDK lifecycle (init, config, consent).  
This keeps `ui-foundry` bundles **lightweight and dependency-free**.

---

## 📦 Installation

```bash
# core + this adapter
npm install @plasius/ui-foundry-core @plasius/ui-foundry-analytics-appinsights

# plus Application Insights in your app
npm install @microsoft/applicationinsights-web
```

---

## 🚀 Usage

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { AnalyticsProvider } from "@plasius/ui-foundry-core/analytics/context";
import { createAppInsightsAdapter } from "@plasius/ui-foundry-analytics-appinsights";
import { App } from "./App";

// 1. Create and configure the App Insights client
const appInsights = new ApplicationInsights({
  config: {
    connectionString: import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING,
    enableAutoRouteTracking: true,
  },
});
appInsights.loadAppInsights();

// 2. Create the adapter
const adapter = createAppInsightsAdapter(appInsights);

// 3. Provide it at the root
ReactDOM.createRoot(document.getElementById("root")!).render(
  <AnalyticsProvider adapter={adapter}>
    <App />
  </AnalyticsProvider>
);
```

**Tracking in a component:**

```tsx
import { useAnalytics } from "@plasius/ui-foundry-core/analytics/context";

export function CheckoutButton() {
  const { track } = useAnalytics();
  return (
    <button
      onClick={() =>
        track({ name: "checkout_clicked", props: { source: "header" } })
      }
    >
      Checkout
    </button>
  );
}
```

---

## 🧪 Testing

This package ships with **Vitest tests** using a fake App Insights client.  
You don’t need the real SDK to test integrations.

Example from the test suite:

```ts
const fake = {
  trackEvent: vi.fn(),
  setAuthenticatedUserContext: vi.fn(),
};

const adapter = createAppInsightsAdapter(fake);

adapter.track({ name: "demo", props: { a: 1 } });
expect(fake.trackEvent).toHaveBeenCalledWith({ name: "demo" }, { a: 1 });
```

---

## ⚡️ Why this package?

- **Lightweight**: no runtime dependencies.
- **Flexible**: app controls when/how App Insights loads.
- **Testable**: adapter can be unit-tested with a fake client.
- **Consistent API**: works with `AnalyticsProvider` + `useAnalytics` from `@plasius/ui-foundry-core`.

---

## 📜 License

APACHE 2.0 © [Plasius LTD](https://github.com/Plasius-LTD)
