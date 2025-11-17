# CodeX UI

The Design System forged in the fires of open-source development

Demo: https://codex-ui.vercel.app/

- [ ] Make tree-shaking work
- [ ] Test Web/React/Native implementations
- [ ] Think about i18n

## Access Vue components

```ts
import { Button, Input, Heading } from '@codexteam/ui/vue';
```

```vue
<Heading :level="2">
  CodeX UI showcase
</Heading>
<Button text="Button text" />
<Input text="Input text" />
```

## Types for Vue Components

Add the following "path" to the "tsconfig.json"

```
{
  "compilerOptions": {
    "paths": {
      "@codexteam/ui/vue": ["../@codexteam/ui/dist/types/vue/index.d.ts"],
    }
  },
}

```

## Build Design System
Build the design system to be able to use the @codexteam/ui/styles import

```
yarn build
```

## Access CSS variables

1. Import `@codexteam/ui/styles` somewhere in App
2. Use variable in CSS, e.g `var(--ui-color)`

## Using Typography

Just add corresponded classes listed in the [typography.pcss](./src/styles/typography.pcss).

Example:

```html
<div class="text-ui-base">Title</div>
<div class="text-ui-subtle">Description</div>
```

Inside this package you can also use PostCSS `@apply`:

```
<style>
@import url('@/styles/typography.pcss');

.label {
  @apply --text-ui-base-bold;
}
```
