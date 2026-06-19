# @plasius/ui-foundry

[![Build Status](https://img.shields.io/github/actions/workflow/status/Plasius-LTD/ui-foundry/ci.yml?branch=main&label=build&style=flat)](https://github.com/plasius/translations/actions/workflows/ci.yml)
[![coverage](https://img.shields.io/codecov/c/github/Plasius-LTD/ui-foundry)](https://codecov.io/gh/Plasius-LTD/ui-foundry)
[![License](https://img.shields.io/github/license/Plasius-LTD/ui-foundry)](./LICENSE)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-yes-blue.svg)](./CODE_OF_CONDUCT.md)
[![Security Policy](https://img.shields.io/badge/security%20policy-yes-orange.svg)](./SECURITY.md)
[![Changelog](https://img.shields.io/badge/changelog-md-blue.svg)](./CHANGELOG.md)

Apache-2.0. ESM + CJS builds. TypeScript types included.

---

## Overview

`ui-foundry` is the source repository for the public UI Foundry packages:

- `@plasius/ui-foundry-core`
- `@plasius/ui-foundry-components`
- `@plasius/ui-foundry-analytics-appinsights`
- `@plasius/ui-foundry-cli`

---

## Installation

```bash
npm install @plasius/ui-foundry-core @plasius/ui-foundry-components
```

---

## Usage Example

```tsx
import React from "react";
import {
  AnalyticsProvider,
  type AnalyticsAdapter,
} from "@plasius/ui-foundry-core";
import {
  FoundryButton,
  FoundryStack,
} from "@plasius/ui-foundry-components";

const analytics: AnalyticsAdapter = {
  track(event) {
    console.log(event.name, event.properties);
  },
};

export function ExamplePanel() {
  return (
    <AnalyticsProvider adapter={analytics}>
      <FoundryStack gap={16}>
        <FoundryButton
          label="Launch runbook"
          tone="primary"
          onClick={() =>
            analytics.track({
              name: "ui_foundry_launch_runbook_clicked",
              properties: { surface: "example-panel" },
            })
          }
        />
      </FoundryStack>
    </AnalyticsProvider>
  );
}
```

---

## QA Contract

ADR-0009 is enforced at a practical package baseline for the currently shipped surfaces:

- `packages/core`
- `packages/components`
- `packages/integrations/analytics-appinsights`

The repository QA gate now requires:

- package-local Vitest coverage for exported behavior;
- automated accessibility checks for interactive component surfaces;
- root CI execution of lint, build, package metadata validation, and combined coverage reporting.

Useful commands:

```bash
npm test
npm run test:coverage
npm run pack:check
```

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributor License Agreement](./legal/CLA.md)

---

## License

This project is licensed under the terms of the [Apache 2.0 license](./LICENSE).
