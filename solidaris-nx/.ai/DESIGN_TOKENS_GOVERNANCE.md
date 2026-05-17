# Plectrum / Solidaris — Design Tokens Governance

**Version 2.0** · Hybrid workflow for Figma, PrimeNG, SCSS, ITCSS, BEM and Storybook

> **Core principle:** Figma is the shared design reference. The repository is the controlled implementation layer. Storybook validates the result. No token change should reach production without review.

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Core Principle](#2-core-principle)
3. [Source Responsibilities](#3-source-responsibilities)
4. [Recommended Workflow](#4-recommended-workflow)
5. [Token Layers](#5-token-layers)
6. [Naming Rules](#6-naming-rules)
7. [CSS Variable Strategy](#7-css-variable-strategy)
8. [PrimeNG / Plectrum Rules](#8-primeng--plectrum-rules)
9. [TypeScript Preset Rules](#9-typescript-preset-rules)
10. [SCSS, ITCSS and BEM Rules](#10-scss-itcss-and-bem-rules)
11. [Accessibility Rules](#11-accessibility-rules)
12. [Change Risk Levels](#12-change-risk-levels)
13. [Deprecation Rules](#13-deprecation-rules)
14. [Review Checklist](#14-review-checklist)
15. [Decision Rule](#15-decision-rule)
16. [Repository Structure (Living Reference)](#16-repository-structure-living-reference)
17. [Summary](#17-summary)
18. [Appendix A — AI Prompt: Reviewing Token Changes](#appendix-a--ai-prompt-reviewing-token-changes)
19. [Appendix B — AI Prompt: Translating Figma Decisions into Tokens](#appendix-b--ai-prompt-translating-figma-decisions-into-tokens)
20. [Appendix C — Copilot / Cursor Rule Prompt](#appendix-c--copilot--cursor-rule-prompt)

---

## 1. Purpose

This document defines how design tokens are created, reviewed, implemented and maintained for the Plectrum design system used at Solidaris.

The goal is a safe, auditable bridge between designers working in Figma and the technical reality of PrimeNG, SCSS, ITCSS, BEM and a shared Angular component library.

- **Figma** remains the shared visual and design reference.
- **The repository** remains the implementation, validation and version-control layer.
- **PrimeNG** remains the vendor component system.
- **Plectrum/Solidaris** owns the design layer and governance decisions.
- **Storybook** is used for documentation, validation and team alignment.

---

## 2. Core Principle

| Layer | Role |
|---|---|
| **Figma** | Shared design reference |
| **Repository** | Controlled implementation |
| **Storybook** | Validation and documentation |
| **Review process** | Governance source of truth |

Figma should be easy for designers to understand and use. Code should be reliable, maintainable and reusable. The bridge between both must be reviewed and documented.

---

## 3. Source Responsibilities

### 3.1 Figma

- Token proposals and visual exploration
- Component variants and states
- Usage examples and design intent
- Visual validation of colors, typography, spacing, radius and elevation
- Shared understanding for designers who do not work directly in code

> Figma is the **design** source of truth. It must not automatically overwrite production tokens without review.

### 3.2 Repository

- CSS custom properties (`--sds-*`)
- SCSS `@use`, interpolation and token generation
- ITCSS organization and cascade control
- BEM naming for custom components and wrappers
- PrimeNG variable mappings (`--p-*`)
- Theme configuration (`providePlectrum()`)
- Accessibility checks
- Storybook documentation
- Pull requests and code review

> The repository is the **implementation** source of truth.

### 3.3 Storybook

- Token documentation
- Component state validation
- Visual review
- Regression checks
- Designer/developer handoff

Every meaningful token change must be visible and testable in Storybook.

---

## 4. Recommended Workflow

```
Figma proposal
  → token review
  → token export / sync
  → pull request
  → CSS / SCSS / PrimeNG mapping update
  → Storybook validation
  → merge
  → team communication
```

1. A designer proposes or updates a token in Figma.
2. The change is reviewed by the design-system owner or a technical reviewer.
3. The token is exported or synchronized into a reviewed settings file.
4. A pull request updates the implementation layer.
5. `--sds-*` custom properties and PrimeNG mappings are updated where needed.
6. Storybook is checked visually and functionally.
7. The change is merged and communicated.

---

## 5. Token Layers

### 5.1 Primitive Tokens

Raw values — describe **what** the value is, not how it is used. Never used directly in components.

```
--sds-color-green-500
--sds-color-gray-100
--sds-space-4
--sds-radius-md
--sds-font-size-md
```

### 5.2 Semantic Tokens

Describe design intent. These are what components should reference.

```
--sds-color-text-default
--sds-color-text-muted
--sds-color-surface-page
--sds-color-surface-default
--sds-color-brand
--sds-color-danger
--sds-color-border-focus
```

### 5.3 Component Tokens

Component-specific decisions. Should reference semantic tokens where possible.

```
--sds-text-body-md-size
--sds-text-heading-lg-family
--sds-space-form-x
--sds-space-form-y
--sds-focus-ring-color
```

---

## 6. Naming Rules

- Use lowercase names.
- Use stable, descriptive, intent-based names — not appearance-only names.
- Use `kebab-case` for CSS custom properties.
- Prefix all Solidaris/Plectrum tokens with `--sds-*`.
- Use dot notation in Figma; transform to `kebab-case` in CSS.
- Do not name tokens after a temporary screen, page or experiment.

**Good examples**
```
--sds-color-text-default
--sds-color-surface-page
--sds-color-action-primary-bg
--sds-space-form-x
--sds-radius-md
```

**Avoid**
```
--green-button
--nice-blue
--new-color
--color-for-dashboard-card
--rectangle-fill
```

---

## 7. CSS Variable Strategy

All Solidaris/Plectrum-owned variables use the `--sds-*` prefix. PrimeNG variables keep the `--p-*` prefix.

### Prefix configuration

The prefix is controlled by a single SCSS variable in `01-settings/_prefix.scss`:

```scss
// libs/styles/src/01-settings/_prefix.scss
$sds-prefix: 'sds' !default;
```

All settings files `@use 'prefix' as *` and emit tokens via SCSS interpolation:

```scss
@use 'prefix' as *;

:root {
  --#{$sds-prefix}-color-brand: var(--#{$sds-prefix}-color-primary-500);
}
```

To rename the prefix across the entire token system — change `$sds-prefix` in one place.

### Bridge pattern

```css
/* Solidaris primitive → Solidaris semantic → PrimeNG component */

:root {
  /* primitive */
  --sds-color-primary-500: #527191;

  /* semantic */
  --sds-color-brand: var(--sds-color-primary-500);

  /* PrimeNG mapping */
  --p-button-primary-background: var(--sds-color-brand);
}
```

**Prefer** mapping `--sds-*` to `--p-*`. **Avoid** overriding `.p-button` with hardcoded values or `!important`.

---

## 8. PrimeNG / Plectrum Rules

- Do not fight PrimeNG with unnecessary CSS overrides.
- Prefer token and CSS-variable mapping over hardcoded class overrides.
- Avoid `!important` except for exceptional, documented cases.
- Use the PrimeNG preset as an integration mechanism, not as the place where every design decision is manually authored.
- Keep the TypeScript preset small. Treat it as an adapter.

**Preferred**

```scss
.sds-form-field {
  --p-inputtext-border-color: var(--sds-color-border-default);
}

.sds-form-field--invalid {
  --p-inputtext-border-color: var(--sds-color-border-danger);
}
```

**Avoid**

```scss
.p-inputtext {
  border-color: #f1382b !important;
}
```

---

## 9. TypeScript Preset Rules

The PrimeNG TypeScript preset is an **adapter** — not the main design-token authoring layer.

- Use TypeScript to register the PrimeNG theme via `providePlectrum()`.
- Use TypeScript where PrimeNG requires runtime configuration.
- Avoid manually maintaining a large TS object of design decisions.
- Prefer SCSS/CSS for Solidaris visual design implementation.
- If a large preset file is generated, mark it as generated and do not manually edit it.

```
TS            = PrimeNG integration adapter
SCSS / CSS    = Solidaris visual design implementation
Figma         = shared design reference
```

---

## 10. SCSS, ITCSS and BEM Rules

### 10.1 ITCSS Layering

```
01-settings   design constants, SCSS variables, CSS custom properties
02-tools      mixins, functions, token generators — no CSS output
03-generic    reset, normalize, base box sizing
04-elements   native HTML element defaults
05-objects    layout patterns and structural objects     (prefix: o-)
06-components custom BEM components and PrimeNG wrappers (prefix: c-)
07-utilities  low-specificity utility classes            (prefix: u-)
```

Token definitions live in `01-settings`. PrimeNG mappings live in `06-components` or a dedicated theme layer.

### 10.2 BEM Rules

- Use BEM for all custom Plectrum components and wrappers.
- Use stable block names, clear elements and explicit modifiers.
- Do not mirror the full PrimeNG DOM with fragile selectors.
- Avoid deeply nested selectors.
- Keep specificity low.

```scss
.sds-card {}
.sds-card__header {}
.sds-card__body {}
.sds-card--highlighted {}

.sds-shell {}
.sds-shell__sidebar {}
.sds-shell__content {}
.sds-shell--collapsed {}
```

### 10.3 PrimeNG Selector Rules

- Prefer overriding PrimeNG variables instead of styling internal nested selectors.
- If a wrapper is needed, create a BEM block around the PrimeNG component.
- Avoid selectors that depend on unstable internal PrimeNG DOM.

---

## 11. Accessibility Rules

- Normal text must meet WCAG AA contrast (4.5:1).
- Interactive states must remain visible and distinguishable.
- Focus states must be clearly visible — `--sds-focus-ring-*` tokens must never be removed.
- Color must not be the only way to communicate state.
- Disabled states must remain recognizable.

Any change to the following token groups requires accessibility review:

```
--sds-color-text-*
--sds-color-surface-*
--sds-color-border-*
--sds-focus-ring-*
--sds-color-danger
--sds-color-success
--sds-color-warning
```

---

## 12. Change Risk Levels

| Risk | Examples | Required review |
|---|---|---|
| **Low** | Adding a new primitive token; adding documentation; adding unused aliases | Normal review |
| **Medium** | Changing semantic colors; spacing used by multiple components; component tokens; typography tokens | Design + technical review |
| **High** | Changing primary scale; global surfaces; text colors; focus rings; token naming structure; removing tokens; changing PrimeNG mappings across apps | Design review + technical review + Storybook validation + migration notes |

---

## 13. Deprecation Rules

Tokens must not be deleted immediately if used in production.

1. Mark the token as deprecated with a comment.
2. Provide a replacement token.
3. Update usages progressively.
4. Validate in Storybook.
5. Remove in a later release.

```scss
// DEPRECATED — use --sds-color-brand instead
// --sds-color-primary-default: var(--sds-color-primary-500);
```

---

## 14. Review Checklist

- [ ] Is the token name clear and intent-based?
- [ ] Is it primitive, semantic or component-level?
- [ ] Does it duplicate an existing token?
- [ ] Is the value accessible?
- [ ] Does it affect existing components?
- [ ] Has the PrimeNG `--p-*` mapping been updated if needed?
- [ ] Has Storybook been checked?
- [ ] Is the change documented?
- [ ] Is there a migration note if tokens are renamed or removed?
- [ ] Does the implementation respect ITCSS layer order?
- [ ] Does custom CSS follow BEM naming?
- [ ] Does the implementation avoid unnecessary specificity and `!important`?

---

## 15. Decision Rule

- **Figma** decides the visual intent.
- **The repository** decides the implementation.
- **Storybook** validates the result.
- **The design-system owner** resolves conflicts.
- No token should change in production only because it was changed visually in Figma.
- No token should change in code without checking the design impact in Figma or Storybook.

---

## 16. Repository Structure (Living Reference)

This section reflects the **actual current state** of `libs/styles/src/`. Keep it updated when files are added, renamed or removed.

### `01-settings/` — Design tokens (CSS custom properties)

All files `@use '01-settings/prefix' as *` and emit tokens as `--#{$sds-prefix}-*`.

```
01-settings/
├── _prefix.scss                  $sds-prefix: 'sds'  — single prefix config
│
├── _primitive-colors.scss        --sds-color-{palette}-{shade}
│                                 Palettes: primary, red, orange, yellow, green,
│                                           teal, blue, purple, gray, slate, stone,
│                                           white, black, transparent-black/white
│
├── _semantic-colors.scss         --sds-color-{role}
│                                 Groups: brand, success, warning, danger, info,
│                                         surface, text, border, field, nav, emutnav
│
├── _primitive-typography.scss    --sds-font-{family|size|weight}
│                                 --sds-line-height-*
│                                 --sds-letter-spacing-*
│
├── _semantic-typography.scss     --sds-text-{display|heading|body|label}-{size}-{property}
│                                 e.g. --sds-text-body-md-size, --sds-text-heading-lg-family
│
├── _spacing.scss                 --sds-space-{scale}         (0 → 24, Figma: 12 stops)
│                                 --sds-space-form-{x|y}      (semantic form padding)
│                                 --sds-space-list-{x|y}
│                                 --sds-space-nav-{x|y}
│                                 --sds-space-overlay-{x|y}
│                                 --sds-space-emutnav-*
│
├── _radius.scss                  --sds-radius-{none|xs|sm|md|lg|xl|2xl|pill}
│                                 (Figma: 8 stops)
│
├── _shadows.scss                 --sds-shadow-overlay-{modal|select|popover|navigation}
│                                 --sds-shadow-form-field{|-dark}
│
├── _transitions.scss             --sds-transition-duration{|-mask}
│
├── _focus.scss                   --sds-focus-ring-{color|style|width|offset|shadow}
│
└── _globals.scss                 --sds-disabled-opacity
                                  --sds-icon-size
                                  --sds-anchor-gutter
```

### `02-tools/` — Mixins and functions (no CSS output)

```
02-tools/
├── _mixins.scss
└── _functions.scss
```

### `03-generic/` — Reset

```
03-generic/
└── _reset.scss
```

### `04-elements/` — Bare HTML element defaults

```
04-elements/
├── _typography.scss    Uses --sds-text-* and --sds-color-text-* tokens
└── _links.scss
```

### `05-objects/` — Layout patterns (`o-` prefix)

```
05-objects/
└── _layout.scss
```

### `06-components/` — BEM components + PrimeNG wrappers (`c-` prefix)

```
06-components/
├── _primeng-map.scss   Maps --sds-* → --p-* for global PrimeNG overrides
├── _button.scss
├── _datatable.scss
├── _form-field.scss
└── ...
```

### `07-utilities/` — Single-purpose helpers (`u-` prefix)

```
07-utilities/
└── _utilities.scss
```

### `main.scss` — Entry point

```scss
// 01-settings
@use '01-settings/prefix';
@use '01-settings/primitive-colors';
@use '01-settings/primitive-typography';
@use '01-settings/spacing';
@use '01-settings/radius';
@use '01-settings/semantic-colors';
@use '01-settings/semantic-typography';
@use '01-settings/shadows';
@use '01-settings/transitions';
@use '01-settings/focus';
@use '01-settings/globals';

// 02-tools → 03-generic → 04-elements → 05-objects → 06-components → 07-utilities
```

### Figma sources mapped to files

| Figma collection | Vars | Settings file(s) |
|---|---|---|
| Color — basic, transparent | 50 | `_primitive-colors.scss` |
| Color — functional, brand, accent, background | 71 | `_semantic-colors.scss` |
| Typography | 29 | `_primitive-typography.scss` + `_semantic-typography.scss` |
| Spacing | 12 | `_spacing.scss` (scale section) |
| Radius | 8 | `_radius.scss` |

### Token usage pattern in components

```scss
// 06-components/_form-field.scss
@use '../01-settings/prefix' as *;

.sds-form-field {
  padding: var(--#{$sds-prefix}-space-form-y) var(--#{$sds-prefix}-space-form-x);
  border-radius: var(--#{$sds-prefix}-radius-md);
  background: var(--#{$sds-prefix}-color-field-bg);
  border: 1px solid var(--#{$sds-prefix}-color-field-border);

  // Map to PrimeNG
  --p-inputtext-border-color: var(--#{$sds-prefix}-color-field-border);
  --p-inputtext-focus-border-color: var(--#{$sds-prefix}-color-field-border-focus);

  &--invalid {
    --p-inputtext-border-color: var(--#{$sds-prefix}-color-field-border-invalid);
  }
}
```

---

## 17. Summary

| Layer | Role |
|---|---|
| **Figma** | Shared design reference — visual decisions and token proposals |
| **`$sds-prefix`** | Single SCSS variable controlling the `--sds-*` prefix |
| **`01-settings/`** | All CSS custom properties — split into primitive and semantic per category |
| **SCSS / CSS** | Solidaris visual design implementation |
| **ITCSS** | Cascade and architecture structure |
| **BEM** | Custom component naming strategy (`sds-` block prefix) |
| **PrimeNG TS preset** | Integration adapter only — `providePlectrum()` |
| **`--p-*` mappings** | Bridge from `--sds-*` to PrimeNG component tokens |
| **Storybook** | Documentation and validation layer |
| **Review process** | Governance source of truth |

---

## 18. Contract-Driven Development (CDD)

This governance document is complemented by a machine-readable contract system in `.ai/contracts/`. See `.ai/contracts/README.md` for full details.

| Artifact | Purpose |
|---|---|
| `.ai/contracts/schema/component.metadata.ts` | TypeScript interface for component metadata |
| `.ai/contracts/schema/token.contract.ts` | TypeScript interface for token governance |
| `.ai/contracts/index.json` | Codebase map for AI agent navigation |
| `.ai/contracts/protocols/query-protocol.md` | How agents navigate the system |
| `.ai/contracts/protocols/component-creation.md` | How to create components correctly |
| `.ai/contracts/protocols/token-audit.md` | How to validate token health |

Every component in `libs/ui` must have a colocated `.metadata.ts` file conforming to the schema. This is the machine-readable equivalent of this governance document — same rules, queryable format.

---

## Appendix A — AI Prompt: Reviewing Token Changes

```
You are helping review a design-token change for the Plectrum/Solidaris design system.

Context:
- Figma is the shared design reference for designers.
- The repository is the controlled implementation layer.
- PrimeNG is the component library.
- Plectrum/Solidaris owns the custom design layer.
- All Solidaris CSS variables use the --sds-* prefix, controlled by $sds-prefix in 01-settings/_prefix.scss.
- PrimeNG variables keep --p-* prefix.
- The PrimeNG TypeScript preset is a small adapter — not the main design authoring layer.
- SCSS/CSS owns most Solidaris design implementation.
- The codebase uses ITCSS. All tokens live in 01-settings/ split into primitive and semantic files per category.
- Custom components and wrappers use BEM naming with the sds- block prefix.
- Storybook is used for documentation and validation.

Please review the following token change.

Check for:
1. Token naming quality — is it intent-based, lowercase, kebab-case?
2. Whether the token is primitive, semantic or component-level
3. Whether it duplicates an existing token
4. Whether it should be in _primitive-* or _semantic-* file
5. Whether the value is accessible (contrast, focus visibility)
6. Whether it maps to a PrimeNG --p-* variable
7. Whether the change affects multiple components
8. Whether Storybook should be updated
9. Risk level (Low / Medium / High)
10. Whether a migration or deprecation note is needed
11. Whether the ITCSS layer is correct
12. Whether custom component CSS follows BEM conventions

Response format:

## Summary
## Token Classification  (Primitive | Semantic | Component | Deprecated | Unclear)
## Review Findings
## PrimeNG / Plectrum Impact
## ITCSS / BEM Impact
## Risk Level
## Required Validation
## Recommendation  (Accept | Accept with small changes | Revise before merge | Reject)
## Suggested Improvements

Token change to review:
[PASTE HERE]
```

---

## Appendix B — AI Prompt: Translating Figma Decisions into Tokens

```
You are helping translate a Figma design decision into a clean design-token structure for Plectrum/Solidaris.

Context:
- Figma is the shared design reference.
- All Solidaris tokens use the --sds-* prefix via $sds-prefix in 01-settings/_prefix.scss.
- Tokens are split: primitive values in _primitive-*.scss, semantic roles in _semantic-*.scss.
- PrimeNG variables use --p-* prefix.
- The PrimeNG TypeScript preset is a minimal adapter.
- SCSS/CSS owns most Solidaris implementation.
- The codebase uses ITCSS — suggest the correct layer and file.
- Custom components use BEM naming with the sds- block prefix.
- 1rem = 14px (Plectrum base).

Given the following Figma decision, propose:
1. Primitive tokens (if new raw values are needed)
2. Semantic tokens
3. Component tokens (if component-specific)
4. CSS custom properties using --sds-* with $sds-prefix interpolation
5. PrimeNG --p-* mappings (if relevant)
6. SCSS implementation snippet
7. ITCSS file location
8. BEM naming (if a wrapper or custom component is needed)
9. Figma naming recommendation
10. Storybook validation checklist
11. Accessibility checks
12. Risk level
13. Migration notes (if replacing existing tokens)

Figma decision:
[PASTE HERE]
```

---

## Appendix C — Copilot / Cursor Rule Prompt

```
Use these rules when working on the Plectrum/Solidaris design system.

Architecture:
- Figma = shared design reference
- Repository = controlled implementation layer
- Storybook = documentation and validation
- PrimeNG = vendor component system
- Plectrum/Solidaris = design layer owner
- ITCSS = cascade organization (01-settings → 07-utilities)
- BEM = custom component naming (sds- block prefix)

Preferred flow:
Figma proposal → reviewed token export → 01-settings file update → Storybook validation → production

CSS variable naming:
- All Solidaris/Plectrum tokens: --sds-* (controlled by $sds-prefix in 01-settings/_prefix.scss)
- PrimeNG tokens: --p-* (never rename)
- Always @use '01-settings/prefix' as * in files that emit tokens
- Emit tokens as: --#{$sds-prefix}-token-name

Token layers:
1. Primitive  — raw values, _primitive-*.scss files
2. Semantic   — design intent, _semantic-*.scss files
3. Component  — component decisions, 06-components/ files

01-settings/ file map:
- _prefix.scss                — $sds-prefix config
- _primitive-colors.scss      — --sds-color-{palette}-{shade}
- _semantic-colors.scss       — --sds-color-{role}
- _primitive-typography.scss  — --sds-font-*, --sds-line-height-*, --sds-letter-spacing-*
- _semantic-typography.scss   — --sds-text-{category}-{size}-{property}
- _spacing.scss               — --sds-space-*
- _radius.scss                — --sds-radius-*
- _shadows.scss               — --sds-shadow-*
- _transitions.scss           — --sds-transition-*
- _focus.scss                 — --sds-focus-ring-*
- _globals.scss               — --sds-disabled-opacity, --sds-icon-size, --sds-anchor-gutter

ITCSS rules:
- settings   → token constants (CSS custom properties)
- tools      → mixins, functions (no CSS output)
- generic    → reset
- elements   → bare HTML defaults
- objects    → layout (o- prefix)
- components → BEM blocks + PrimeNG wrappers (c- / sds- prefix)
- utilities  → single-purpose helpers (u- prefix)

BEM rules:
- sds- or c- block prefix
- Stable block names, clear elements, explicit modifiers
- No deep nesting, no high specificity
- No fragile internal PrimeNG DOM selectors

Bridge pattern (preferred):
:root {
  --sds-color-brand: var(--sds-color-primary-500);
  --p-button-primary-background: var(--sds-color-brand);
}

Never:
.p-button { background: #527191 !important; }

Before modifying tokens, check:
- Primitive or semantic?
- Duplicate of an existing token?
- Intent-based name?
- Affects PrimeNG mappings?
- Needs Storybook validation?
- Needs migration note?
- Correct ITCSS layer?
- BEM
```