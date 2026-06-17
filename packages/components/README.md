# @plasius/ui-foundry-components

[![npm version](https://img.shields.io/npm/v/@plasius/ui-foundry-components.svg)](https://www.npmjs.com/package/@plasius/ui-foundry-components)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Plasius-LTD/ui-foundry/ci.yml?branch=main&label=build&style=flat)](https://github.com/Plasius-LTD/ui-foundry/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/Plasius-LTD/ui-foundry)](../../LICENSE.md)
[![Changelog](https://img.shields.io/badge/changelog-md-blue.svg)](./CHANGELOG.md)

Component primitives for UI Foundry.

Apache-2.0. ESM + CJS builds. TypeScript types included.

---

## Installation

```bash
npm install @plasius/ui-foundry-components
```

---

## Usage

```ts
import { /* ... */ } from "@plasius/ui-foundry-components";
```

## Player System primitives

The components package now exports reusable Player System primitives suitable for
focused 3D panes and flat validation surfaces:

- `FoundryPane`
- `FoundryLedger`
- `FoundryLog`
- `FoundryMissionSummary`
- `FoundryMccPanel`

These primitives keep accessibility labels explicit and use responsive
single-column layouts so hosts can embed them in world-space shells or browser
demo viewers without rewriting the content model.

---

## Build Outputs

`npm run build` emits `dist/index.js`, `dist/index.cjs`, and `dist/index.d.ts`.

## Testing

`npm test -w @plasius/ui-foundry-components` runs the package-local rendering,
interaction, and accessibility checks for `FoundryStack`, `FoundryButton`, and
the Player System pane primitives.

---

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md).
