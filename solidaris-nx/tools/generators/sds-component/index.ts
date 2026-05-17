import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
} from '@nx/devkit';

interface Schema {
  name: string;
  category: 'atoms' | 'molecules' | 'organisms' | 'templates';
  type: 'interactive' | 'display' | 'container' | 'input' | 'navigation' | 'feedback';
  primeNg?: string;
}

export default async function sdsComponentGenerator(tree: Tree, schema: Schema) {
  const { name, category, type, primeNg } = schema;
  const n = names(name); // { name, className, propertyName, constantName, fileName }
  const componentDir = joinPathFragments('libs/ui/src/lib', n.fileName);
  const scssDir = 'libs/styles/src/06-components';
  const storyDir = 'storybook/src/stories';

  const today = new Date().toISOString().split('T')[0];

  // --- Component TS ---
  const componentTs = `import { Component } from '@angular/core';

@Component({
  selector: 'sds-${n.fileName}',
  standalone: true,
  templateUrl: './${n.fileName}.component.html',
  styleUrl: './${n.fileName}.component.scss',
})
export class ${n.className}Component {}
`;

  // --- Component HTML ---
  const componentHtml = `<div class="c-${n.fileName}">
  <!-- ${n.className} component -->
  <ng-content></ng-content>
</div>
`;

  // --- Component SCSS (minimal, imports from styles lib) ---
  const componentScss = `// Styles live in libs/styles/src/06-components/_${n.fileName}.scss
// This file is intentionally minimal — only component-specific overrides here.
`;

  // --- Component Spec ---
  const componentSpec = `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${n.className}Component } from './${n.fileName}.component';

describe('${n.className}Component', () => {
  let component: ${n.className}Component;
  let fixture: ComponentFixture<${n.className}Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [${n.className}Component],
    }).compileComponents();

    fixture = TestBed.createComponent(${n.className}Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
`;

  // --- Metadata Contract ---
  const metadataTs = `import { ComponentMetadata } from '@solidaris/contracts';

export const ${n.className}Metadata: ComponentMetadata = {
  component: {
    name: '${n.className}',
    category: '${category}',
    description: 'TODO: Describe ${n.className}',
    type: '${type}',
    path: 'libs/ui/src/lib/${n.fileName}/${n.fileName}.component.ts',
    ${primeNg ? `primeNgComponent: '${primeNg}',` : `primeNgComponent: undefined,`}
    bemBlock: 'c-${n.fileName}',
    itcssLayer: '06-components',
    scssPath: 'libs/styles/src/06-components/_${n.fileName}.scss',
    created: '${today}',
    modified: '${today}',
  },
  usage: {
    useCases: [
      // TODO: Add use cases
    ],
    commonPatterns: [
      // TODO: Add common patterns
    ],
    antiPatterns: [
      // TODO: Add anti-patterns
    ],
  },
  accessibility: {
    wcagLevel: 'AA',
    // TODO: Add ARIA attributes, keyboard support
  },
  tokens: {
    consumed: [
      // TODO: List --sds-* tokens this component uses
    ],
  },
  aiHints: {
    priority: 'medium',
    context: 'TODO: When should an agent use this component?',
    selectionCriteria: {
      // TODO: Add criteria
    },
    keywords: ['${n.fileName}'],
  },
  examples: [
    {
      name: 'default',
      description: 'Default ${n.className}',
      code: \`<sds-${n.fileName}></sds-${n.fileName}>\`,
    },
  ],
};
`;

  // --- BEM SCSS in styles lib ---
  const bemScss = `@use '../01-settings/prefix' as *;

// =============================================================================
// 06-components/_${n.fileName}.scss
// BEM block: c-${n.fileName}
// =============================================================================

.c-${n.fileName} {
  // TODO: Add styles using --#{$sds-prefix}-* tokens

  // &__element {}
  // &--modifier {}
}
`;

  // --- Storybook Story ---
  const storyTs = `import type { Meta, StoryObj } from '@storybook/angular';
import { ${n.className}Component } from '../../../libs/ui/src/lib/${n.fileName}/${n.fileName}.component';

const meta: Meta<${n.className}Component> = {
  title: '${category}/${n.className}',
  component: ${n.className}Component,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<${n.className}Component>;

export const Default: Story = {};

// TODO: Add stories for all states
// export const Hover: Story = {};
// export const Disabled: Story = {};
// export const Loading: Story = {};
// export const Error: Story = {};
// export const Empty: Story = {};
`;

  // Write all files
  tree.write(joinPathFragments(componentDir, `${n.fileName}.component.ts`), componentTs);
  tree.write(joinPathFragments(componentDir, `${n.fileName}.component.html`), componentHtml);
  tree.write(joinPathFragments(componentDir, `${n.fileName}.component.scss`), componentScss);
  tree.write(joinPathFragments(componentDir, `${n.fileName}.component.spec.ts`), componentSpec);
  tree.write(joinPathFragments(componentDir, `${n.fileName}.metadata.ts`), metadataTs);
  tree.write(joinPathFragments(scssDir, `_${n.fileName}.scss`), bemScss);
  tree.write(joinPathFragments(storyDir, `${n.fileName}.stories.ts`), storyTs);

  // Update barrel export
  const indexPath = 'libs/ui/src/index.ts';
  const currentIndex = tree.read(indexPath, 'utf-8') || '';
  const exportLine = `export { ${n.className}Component } from './lib/${n.fileName}/${n.fileName}.component';\n`;
  if (!currentIndex.includes(exportLine)) {
    tree.write(indexPath, currentIndex + exportLine);
  }

  await formatFiles(tree);

  console.log(`
✅ Component scaffolded: ${n.className}

Files created:
  libs/ui/src/lib/${n.fileName}/${n.fileName}.component.ts
  libs/ui/src/lib/${n.fileName}/${n.fileName}.component.html
  libs/ui/src/lib/${n.fileName}/${n.fileName}.component.scss
  libs/ui/src/lib/${n.fileName}/${n.fileName}.component.spec.ts
  libs/ui/src/lib/${n.fileName}/${n.fileName}.metadata.ts        ← CONTRACT
  libs/styles/src/06-components/_${n.fileName}.scss              ← BEM STYLES
  storybook/src/stories/${n.fileName}.stories.ts                 ← STORYBOOK

Next steps:
  1. Fill in the .metadata.ts TODOs
  2. Add BEM styles in the SCSS file
  3. Complete all Storybook story states
  4. Run: npx ts-node tools/scripts/generate-index.ts
  `);
}
