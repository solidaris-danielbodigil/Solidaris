## Component Naming Conventions

When developing components within the iSHARE and iCRM applications, adhere to the following naming conventions to ensure consistency and clarity:

### General Guidelines
- Use **BEMIT** (Block__Element--Modifier) naming convention for all component classes.
- Component names should be descriptive and reflect their purpose or functionality.
- Use lowercase letters and hyphens for file names, while using PascalCase for component class names.

### BEMIT Structure
- **Block**: Represents the higher-level component (e.g., `Button`, `Card`).
- **Element**: Represents a part of the block that has no standalone meaning (e.g., `Button__icon`, `Card__title`).
- **Modifier**: Represents a different state or variation of a block or element (e.g., `Button--primary`, `Card--featured`).

### Examples
- For a button component:
  - File name: `button.component.ts`
  - Class name: `ButtonComponent`
  - Template class: `button`, `button__icon`, `button--primary`

- For a card component:
  - File name: `card.component.ts`
  - Class name: `CardComponent`
  - Template class: `card`, `card__title`, `card--featured`

### Additional Considerations
- Ensure that component names are unique within their respective applications to avoid conflicts.
- Use prefixes for components that are specific to a certain application (e.g., `iShareButton`, `iCRMCard`).
- Document any exceptions to these conventions in the project guidelines.