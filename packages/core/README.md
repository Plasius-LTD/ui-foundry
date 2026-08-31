# @plasius/ui-foundry-core

[![npm version](https://img.shields.io/npm/v/@plasius/ui-foundry-core.svg)](https://www.npmjs.com/package/@plasius/ui-foundry-core)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Plasius-LTD/ui-foundry/ci.yml?branch=main&label=build&style=flat)](https://github.com/Plasius-LTD/ui-foundry/actions/workflows/ci.yml)
[![coverage](https://img.shields.io/codecov/c/github/Plasius-LTD/ui-foundry)](https://codecov.io/gh/Plasius-LTD/ui-foundry)
[![License](https://img.shields.io/github/license/Plasius-LTD/ui-foundry)](../../LICENSE)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-yes-blue.svg)](../../CODE_OF_CONDUCT.md)
[![Security Policy](https://img.shields.io/badge/security%20policy-yes-orange.svg)](../../SECURITY.md)
[![Changelog](https://img.shields.io/badge/changelog-md-blue.svg)](./CHANGELOG.md)

Core runtime and utilities for UI Foundry packages.

Apache-2.0. ESM + CJS builds. TypeScript types included.

---

## Installation

```bash
npm install @plasius/ui-foundry-core
```

---

## Usage

```ts
import { /* ... */ } from "@plasius/ui-foundry-core";
```

---

## Build Outputs

`npm run build` emits `dist/index.js`, `dist/index.cjs`, and `dist/index.d.ts`.

## Testing

`npm test -w @plasius/ui-foundry-core` runs the package-local `AnalyticsProvider` and
`useAnalytics` behavior tests.

---

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md).
