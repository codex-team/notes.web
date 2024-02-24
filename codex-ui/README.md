# CodeX Design

- [x] Components import/export
- [x] Styles import/export
- [x] Create Vue and Style sub-packages
- [x] Setup TypeScript support for Vue components
- [x] Allow to use CSS mixins internally
- [x] Separate styles form components and base styles
- [x] Prepare props/event example
- [ ] Make tree-shaking work
- [ ] Prepare hooks/composables example
- [ ] Fix Eslint
- [x] Improve DX for components debug
- [ ] Test Web/React/Native implementations
- [ ] Think about i18n

## Project structure

Subject to change

```
src/
  styles/
    mixins/
      typography.pcss
    index.pcss
    colors.pcss
  vue/
    button/
      Button.vue
  react/
  web/
  js/
```

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

## Access CSS variables

1. Import `codex-ui/styles` somewhere in App
2. Use variable in CSS, e.g `var(--ui-color)`
