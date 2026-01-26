# CodeX UI

The Design System forged in the fires of open-source development

Demo: https://cdx-ui.vercel.app/

- [x] Make tree-shaking work
- [ ] Test Web/React/Native implementations
- [ ] Think about i18n

## Installation

```bash
npm install @codexteam/ui
# or
yarn add @codexteam/ui
```

## Quick Start

### 1. Import Base Styles (Required)

```typescript
// main.ts
import '@codexteam/ui/styles';
```

### 2. Import Fonts (Optional)

Fonts are **optional** and are **not** loaded by default. If you want to use the bundled **Inter** and **JetBrains Mono** fonts, import them explicitly:

```typescript
// main.ts
import '@codexteam/ui/styles/fonts';
```

If you don't import fonts, typography will fall back to system fonts.

### 3. Import Themes (Tree-shakeable)

Import only the themes you need - others will NOT be included in the bundle:

```typescript
import '@codexteam/ui/styles/themes/pure';
import '@codexteam/ui/styles/themes/grass';
```

**Available themes:** `graphite`, `crimson`, `red`, `violet`, `grass`, `amber`, `pure`, `sky`

### 4. Import Components (Tree-shakeable)

```typescript
import { Button, Avatar, Heading } from '@codexteam/ui/vue';
```

### 5. Apply Theme in Template

```vue
<template>
  <div color-scheme="light" theme-accent="pure" theme-base="grass">
    <Button>Click me</Button>
  </div>
</template>
```

## Complete Example

**main.ts:**
```typescript
import { createApp } from 'vue';
import App from './App.vue';

// Base styles (required)
import '@codexteam/ui/styles';

// Fonts (optional)
import '@codexteam/ui/styles/fonts';

// Themes (import only what you need)
import '@codexteam/ui/styles/themes/pure';
import '@codexteam/ui/styles/themes/grass';

createApp(App).mount('#app');
```

**App.vue:**
```vue
<script setup lang="ts">
import { Button, Heading, Input } from '@codexteam/ui/vue';
</script>

<template>
  <div color-scheme="light" theme-accent="pure" theme-base="grass">
    <Heading :level="2">CodeX UI showcase</Heading>
    <Button>Button text</Button>
    <Input placeholder="Input text" />
  </div>
</template>
```

## Types for Vue Components

Add the following "path" to the "tsconfig.json"

```json
{
  "compilerOptions": {
    "paths": {
      "@codexteam/ui/vue": ["../@codexteam/ui/dist/types/vue/index.d.ts"]
    }
  }
}
```

## Build Design System
Build the design system to be able to use the @codexteam/ui/styles import

```bash
yarn build
```

## Custom Theming

If you don't want to use built-in themes, define your own CSS variables:

```css
:root {
  /* Base colors */
  --base--bg-primary: #ffffff;
  --base--bg-secondary: #f5f5f5;
  --base--bg-secondary-hover: #eeeeee;
  --base--border: #e0e0e0;
  --base--text: #333333;
  --base--text-secondary: #666666;
  --base--solid: #000000;
  --base--text-solid-foreground: #ffffff;

  /* Accent colors */
  --accent--solid: #2196f3;
  --accent--solid-hover: #1976d2;
  --accent--bg-secondary: #e3f2fd;
  --accent--text-solid-foreground: #ffffff;
}
```

## Access CSS Variables

1. Import `@codexteam/ui/styles` in your app
2. Import themes you need (e.g., `@codexteam/ui/styles/themes/pure`)
3. Use variables in CSS: `var(--base--text)`, `var(--accent--solid)`

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
