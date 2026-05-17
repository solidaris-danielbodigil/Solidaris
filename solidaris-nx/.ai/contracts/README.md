# Contract-Driven Development (CDD) — Solidaris D- **ind- [x] NX generator to scaffold `.metadata.ts` with component (`npm run sds:component`)
- [x] Script to regenerate `index.json` (`npm run generate-index`)
- [ ] CI hook: regenerate index on component changes + fail if stale
- [ ] Drift detection: compare `.metadata.ts` against actual component API
- [ ] Token audit runner in CI (prefix compliance, semantic coverage, contrast)
- [ ] Storybook plugin to render metadata alongside storieson** — Regenerate via `npm run generate-index` after adding/removing componentssign System

## Architecture

Based on the "Agentic Design Systems" series by Cristian Morales Achiardi, adapted for Angular + NX + PrimeNG + Plectrum.

```
.ai/contracts/
├── schema/                    Type definitions (the "shape" of contracts)
│   ├── component.metadata.ts  Component metadata interface
│   └── token.contract.ts      Token governance interface
│
├── protocols/                 Agent instructions (the "how" of navigation)
│   ├── query-protocol.md      How to navigate the codebase
│   ├── component-creation.md  How to create new components
│   └── token-audit.md         How to validate token health
│
├── index.json                 Codebase map (the "where" of everything)
│
└── README.md                  This file
```

## Three Layers (RAG Pipeline for Design Systems)

| Layer | Purpose | File(s) |
|---|---|---|
| **Index (WHAT/WHERE)** | Component inventory, relationships, paths | `index.json` |
| **Metadata (HOW/WHY)** | Per-component usage, anti-patterns, selection logic | `*.metadata.ts` (colocated) |
| **Protocols (RULES)** | Decision trees, validation checklists, audit rules | `protocols/*.md` |

## How Agents Use This

1. **Start of conversation** → Load `index.json` (~4K tokens) for full map
2. **Component question** → Check index → read specific `.metadata.ts`
3. **Token question** → Follow query-protocol decision tree
4. **Creating something** → Follow component-creation protocol
5. **Reviewing changes** → Follow token-audit protocol

## Key Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Schema format | TypeScript | Type-safe, importable, real code snippets |
| Index format | JSON | Native to TS/NX ecosystem, importable, schema-validatable |
| Protocol format | Markdown | Readable by both humans and agents |
| Metadata location | Colocated with component | Single responsibility, easy to find |

## Maintenance

- **index.yaml** — Regenerate after adding/removing components (future: CI script)
- **\*.metadata.ts** — Create with every new component, update on API changes
- **protocols/** — Update when architectural decisions change
- **schema/** — Update when metadata structure needs new fields

## Future Automation

- [ ] NX generator to scaffold `.metadata.ts` with component
- [ ] CI script to regenerate `index.yaml` on component changes
- [ ] Drift detection: compare `.metadata.ts` against actual component API
- [ ] Token audit runner in CI (prefix compliance, semantic coverage, contrast)
- [ ] Storybook plugin to render metadata alongside stories
