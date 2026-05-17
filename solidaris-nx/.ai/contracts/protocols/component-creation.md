# Component Creation Protocol

## Pre-flight

1. Query **PrimeNG MCP** — does a component already exist?
2. Query **Figma MCP** — extract design specs from Plectrum UI Kit
3. Check **index.json** — does a similar component already exist in libs/ui?
4. If all clear → proceed with creation

## File Structure

```
libs/ui/src/lib/{component-name}/
├── {component-name}.component.ts
├── {component-name}.component.html
├── {component-name}.component.scss   → imports from libs/styles or is empty
├── {component-name}.component.spec.ts
└── {component-name}.metadata.ts       ← CONTRACT FILE
```

```
libs/styles/src/06-components/
└── _{component-name}.scss             ← BEM styles using --sds-* tokens
```

```
storybook/src/stories/
└── {component-name}.stories.ts        ← All states documented
```

## Metadata Contract Template

```typescript
import { ComponentMetadata } from '@solidaris/contracts';

export const {Name}Metadata: ComponentMetadata = {
  component: {
    name: '{Name}',
    category: '{atoms|molecules|organisms|templates}',
    description: '',
    type: '{interactive|display|container|input|navigation|feedback}',
    path: 'libs/ui/src/lib/{name}/{name}.component.ts',
    primeNgComponent: undefined, // or 'Button', 'DataTable', etc.
    bemBlock: 'c-{name}',
    itcssLayer: '06-components',
    scssPath: 'libs/styles/src/06-components/_{name}.scss',
    created: '{ISO date}',
    modified: '{ISO date}',
  },
  usage: {
    useCases: [],
    commonPatterns: [],
    antiPatterns: [],
  },
  accessibility: {
    wcagLevel: 'AA',
  },
  tokens: {
    consumed: [],
  },
  aiHints: {
    priority: 'medium',
    context: '',
    selectionCriteria: {},
    keywords: [],
  },
  examples: [],
};
```

## Post-creation Checklist

- [ ] Component exported from `libs/ui/src/index.ts`
- [ ] .metadata.ts conforms to schema
- [ ] SCSS uses #{$sds-prefix} interpolation
- [ ] Storybook story covers: default, hover, disabled, loading, error, empty
- [ ] index.yaml updated (manual or via script)
- [ ] No app-specific logic in libs/ui
