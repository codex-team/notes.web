# CodeX UI

The Design System forged in the fires of open-source development

- [ ] Make tree-shaking work
- [ ] Test Web/React/Native implementations
- [ ] Think about i18n

## Access Vue components

```ts
import { Button, Input, Heading } from 'codex-ui/vue';
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
      "codex-ui/vue": ["../codex-ui/dist/types/vue/index.d.ts"],
    }
  },
}

```

## Build Design System
Build the design system to be able to use the codex-ui/styles import

```
yarn build
```

## Access CSS variables

1. Import `codex-ui/styles` somewhere in App
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
