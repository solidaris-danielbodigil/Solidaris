## AI Agent Skills in UI Design

### Reference
- **Plectrum Design System**: https://plectrum.solidaris.be/5cba76f64/p/8028d1-plectrum-design-system
- **Figma UI Kit**: https://www.figma.com/design/YNZ1DlSjDNUXrvkxlSp10D/Plectrum-for-PrimeNG--Main-?node-id=6961-92390 (SSOT for all visual decisions)
- **Component Library**: `libs/ui` (SSOT for all shared components)
- **Styles**: `libs/styles` (SSOT for all SCSS/ITCSS tokens and utilities)

### MCP Servers
| Server | URL | Use for |
|---|---|---|
| Figma | `http://127.0.0.1:3845/mcp` | Inspect Plectrum UI Kit nodes, extract tokens, spacing, typography |
| PrimeNG | `https://primeng.org/mcp` | Query component API, props, slots, and usage examples |

### Plectrum Installation Docs
| Topic | URL |
|---|---|
| PrimeNG | https://plectrum.solidaris.be/5cba76f64/p/944759-installation/b/764648 |
| Tailwind | https://plectrum.solidaris.be/5cba76f64/p/944759-installation/b/069866 |
| Fonts | https://plectrum.solidaris.be/5cba76f64/p/944759-installation/b/414795 |
| Icons | https://plectrum.solidaris.be/5cba76f64/p/944759-installation/b/391c00 |
| Design tokens | https://plectrum.solidaris.be/5cba76f64/p/944759-installation/b/8143b5 |
| Plectrum theme | https://plectrum.solidaris.be/5cba76f64/p/7529b0-plectrum-theme |

---

### Responsibilities
- Collaborate with designers and developers to create user-friendly interfaces.
- Implement design systems, ensuring consistency across applications.
- Utilize Angular and PrimeNG components to build responsive layouts.
- Apply ITCSS methodology for scalable and maintainable styles.
- Follow BEMIT naming conventions for CSS classes to enhance readability and maintainability.

---

### Rules

#### Rule — Storybook First
Every component **must** be developed in isolation and validated in Storybook **before** integration into any app.

- Create a `.stories.ts` file alongside every component in `libs/ui`
- Cover all states: default, hover, disabled, loading, error, empty
- Stories are the living documentation — keep them up to date
- No component is considered "done" without a passing Storybook story

#### Rule — PrimeNG First
Always use an existing **PrimeNG** component before writing a custom one.

- Check PrimeNG docs before creating anything new
- Extend or wrap PrimeNG components with BEMIT classes when restyling is needed
- Never reimplement what PrimeNG already provides (modals, tables, dropdowns, etc.)

#### Rule — Custom Components: Semantic & Minimal
When a custom component is truly necessary (no PrimeNG equivalent exists):

- Be as **semantic** as possible (`<nav>`, `<article>`, `<section>`, `<button>`, etc.)
- Use ARIA roles and attributes for accessibility
- Keep it generic and reusable — no app-specific logic inside `libs/ui`
- Document the reason for the custom component in its Storybook story

#### Rule — SSOT for Components
- All shared components live in `libs/ui` — **never** duplicate in `apps/ishare` or `apps/icrm`
- All SCSS tokens and utilities live in `libs/styles` — never redefine variables in app-level SCSS
- All Plectrum design decisions trace back to https://plectrum.solidaris.be/5cba76f64/p/8028d1-plectrum-design-system
- If a design token is missing from `libs/styles`, add it there first before using it anywhere

#### Rule — No Direct Tailwind on HTML
Never use utility classes directly in HTML templates.

```scss
// ✅ Correct — semantic BEM class with @apply in ITCSS layer
// libs/styles/src/06-components/_card.scss
.c-card {
  @apply flex flex-col gap-4 p-6;

  &__header {
    @apply text-lg font-semibold;
  }

  &--highlighted {
    @apply border border-primary-500;
  }
}
```

```html
<!-- ✅ Correct -->
<div class="c-card c-card--highlighted">
  <div class="c-card__header">Title</div>
</div>

<!-- ❌ Wrong -->
<div class="flex flex-col gap-4 p-6 border border-primary-500">
```

---

### Skills
- Proficient in Angular framework and PrimeNG component library.
- Strong understanding of SCSS and ITCSS architecture.
- Familiarity with BEMIT naming conventions for CSS.
- Experience with the Plectrum design system and Figma UI Kit.
- Ability to create and manage Storybook stories for UI components.
- Knowledge of accessibility best practices and semantic HTML.
- Capable of conducting usability testing and gathering user feedback.

---

### Component Checklist
Before marking any component as complete, verify:

- [ ] Built using PrimeNG where possible
- [ ] Styled with BEMIT classes in `libs/styles/06-components/`
- [ ] Storybook story created and covers all states
- [ ] No app-specific logic inside `libs/ui`
- [ ] Tokens reference `libs/styles/01-settings/`
- [ ] Semantic HTML used throughout
- [ ] ARIA attributes applied where needed
- [ ] Exported