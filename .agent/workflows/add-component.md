---
description: Add a new UI component to Core Layer and update Documentation
---

1. **Pre-requisites & Standards**
   - Read `.cursorrules` to strictly follow the "Corporate Trust" design system.
   - Ensure all UI text, comments, and documentation are in **Traditional Chinese (台灣繁體中文)**.
   - Use CSS variables defined in `packages/nuxt-core/assets/css/main.css` for consistency.

2. **Create/Update Component in Nuxt Core**
   - Location: `packages/nuxt-core/components/uiInterface` (Generic items like Buttons, Inputs) or `packages/nuxt-core/components/uiBusiness` (Business items like DataTables).
   - Style: Apply `Corporate Trust` tokens (colors, spacing, typography).
   - Tech: Use Vue 3 + TypeScript. Support Vuetify/AntD slots/props where appropriate but prioritize the unified look.

3. **Update UI Documentation (`apps/ui-docs`)**
   - **MANDATORY**: Every new component MUST have a documentation entry.
   - Edit `apps/ui-docs/utils/doc-data.ts`:
     - Add the component name to `getComponentExample` switch case.
     - Provide a rich, real-world example code snippet (using the component).
     - Update `getComponentProps` if the component has special props that need explanation.

4. **Verification**
   - Run `npm run dev` in `apps/ui-docs`.
   - Navigate to the Showcase page.
   - Verify the component renders correctly with the applied styles.
   - Verify the code example is accurate and copyable.
