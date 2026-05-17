import { ComponentMetadata } from '@solidaris/contracts';

/**
 * Button — Reference metadata contract.
 *
 * This is a placeholder/example showing what a complete .metadata.ts looks like.
 * Replace with real data once the Button component is implemented.
 */
export const ButtonMetadata: ComponentMetadata = {
  component: {
    name: 'Button',
    category: 'atoms',
    description:
      'Interactive button for actions, form submissions, and navigation triggers. Wraps PrimeNG Button with Plectrum styling.',
    type: 'interactive',
    path: 'libs/ui/src/lib/button/button.component.ts',
    primeNgComponent: 'Button',
    bemBlock: 'c-button',
    itcssLayer: '06-components',
    scssPath: 'libs/styles/src/06-components/_button.scss',
    created: '2025-01-01',
    modified: '2025-01-01',
  },

  usage: {
    useCases: [
      'primary-call-to-action',
      'form-submission',
      'dialog-confirmation',
      'secondary-action',
      'destructive-action',
    ],
    commonPatterns: [
      {
        name: 'primary-cta',
        description: 'Main call-to-action on a page or section',
        composition: `<sds-button variant="primary">Save</sds-button>`,
      },
      {
        name: 'button-with-icon',
        description: 'Button with leading or trailing icon',
        composition: `<sds-button variant="primary" icon="pi pi-check">Confirm</sds-button>`,
      },
      {
        name: 'danger-action',
        description: 'Destructive action requiring user attention',
        composition: `<sds-button variant="danger">Delete</sds-button>`,
      },
    ],
    antiPatterns: [
      {
        scenario: 'Multiple primary buttons in the same section',
        reason: 'Creates visual hierarchy confusion — user cannot identify the main action',
        alternative: 'Use one primary button and secondary/ghost for other actions',
      },
      {
        scenario: 'Button for plain navigation without action',
        reason: 'Buttons indicate actions, not navigation',
        alternative: 'Use a Link component or anchor tag for navigation',
      },
      {
        scenario: 'Hardcoding styles on p-button directly',
        reason: 'Bypasses token system and creates drift',
        alternative: 'Override via --p-button-* CSS variables mapped from --sds-* tokens',
      },
    ],
  },

  variants: {
    variant: {
      options: ['primary', 'secondary', 'ghost', 'danger', 'link'],
      default: 'primary',
      purpose: {
        primary: 'Main call-to-action, high visual prominence',
        secondary: 'Alternative or cancel actions, medium prominence',
        ghost: 'Minimal visual weight, subtle/tertiary actions',
        danger: 'Destructive actions requiring user attention',
        link: 'Looks like a link but behaves as a button',
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      default: 'md',
      purpose: {
        sm: 'Compact contexts: tables, toolbars',
        md: 'Default for most use cases',
        lg: 'Hero sections, primary page actions',
      },
    },
  },

  composition: {
    slots: [
      {
        name: 'default',
        description: 'Button label text',
        allowedComponents: ['Icon'],
      },
    ],
    companions: ['Icon', 'Tooltip'],
    nestedComponents: [],
  },

  behavior: {
    states: ['default', 'hover', 'active', 'focus', 'disabled', 'loading'],
    interactions: ['click', 'keyboard-enter', 'keyboard-space'],
    responsive: ['Full-width on mobile (optional via modifier)'],
  },

  props: [
    { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger' | 'link'", required: false, default: "'primary'", description: 'Visual variant' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: 'Button size' },
    { name: 'disabled', type: 'boolean', required: false, default: 'false', description: 'Disables interaction' },
    { name: 'loading', type: 'boolean', required: false, default: 'false', description: 'Shows loading spinner, disables interaction' },
    { name: 'icon', type: 'string', required: false, description: 'PrimeNG icon class (e.g. pi pi-check)' },
    { name: 'iconPos', type: "'left' | 'right'", required: false, default: "'left'", description: 'Icon position' },
  ],

  accessibility: {
    role: 'button',
    ariaAttributes: ['aria-disabled', 'aria-busy', 'aria-label'],
    keyboardSupport: ['Enter triggers click', 'Space triggers click', 'Tab focuses'],
    wcagLevel: 'AA',
    contrastRequirements: [
      'Primary: white text on brand surface ≥ 4.5:1',
      'Focus ring must be visible on all backgrounds',
    ],
  },

  tokens: {
    consumed: [
      '--sds-color-brand',
      '--sds-color-danger',
      '--sds-color-text-default',
      '--sds-color-text-inverse',
      '--sds-color-surface-default',
      '--sds-radius-md',
      '--sds-space-form-x',
      '--sds-space-form-y',
      '--sds-focus-ring-color',
      '--sds-focus-ring-shadow',
      '--sds-transition-duration',
      '--sds-disabled-opacity',
    ],
    primeNgMappings: {
      '--p-button-primary-background': '--sds-color-brand',
      '--p-button-primary-border-color': '--sds-color-brand',
      '--p-button-primary-color': '--sds-color-text-inverse',
      '--p-button-border-radius': '--sds-radius-md',
      '--p-button-padding-x': '--sds-space-form-x',
      '--p-button-padding-y': '--sds-space-form-y',
      '--p-button-focus-ring-color': '--sds-focus-ring-color',
    },
  },

  aiHints: {
    priority: 'high',
    context:
      'Use for any user action or form submission. Choose variant based on action hierarchy. Never use for pure navigation — use Link instead.',
    selectionCriteria: {
      usePrimary: 'Main action user should take on the page/section',
      useSecondary: 'Alternative actions, cancel buttons, secondary CTAs',
      useGhost: 'Tertiary actions, toolbar buttons, minimal visual weight',
      useDanger: 'Delete, remove, destructive actions',
      useLink: 'Action that should look like a link but needs button semantics',
    },
    keywords: ['button', 'action', 'submit', 'cta', 'click', 'trigger'],
  },

  examples: [
    {
      name: 'primary',
      description: 'Standard primary button',
      code: `<sds-button variant="primary">Save Changes</sds-button>`,
    },
    {
      name: 'secondary-with-icon',
      description: 'Secondary button with icon',
      code: `<sds-button variant="secondary" icon="pi pi-times">Cancel</sds-button>`,
    },
    {
      name: 'danger-loading',
      description: 'Danger button in loading state',
      code: `<sds-button variant="danger" [loading]="true">Deleting...</sds-button>`,
    },
    {
      name: 'disabled',
      description: 'Disabled button',
      code: `<sds-button variant="primary" [disabled]="true">Submit</sds-button>`,
    },
  ],
};
