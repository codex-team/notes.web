<template>
  <div :class="$style.typescale">
    <div
      v-for="sample in samples"
      :class="$style['ts-row']"
      :key="sample.label"
    >
      <div :class="[$style.label]">
        {{ sample.label }}
      </div>
      <div :class="[$style.text, sample.class]">
        {{ sample.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const samples = [
  {
    label: 'H1',
    text: 'Editor.js provides maximum power for developers and products staying focused on the end-user experience',
    class: 'text-h1',
  },
  {
    label: 'H2',
    text: 'Editor.js provides maximum power for developers and products staying focused on the end-user experience',
    class: 'text-h2',
  },
  {
    label: 'H3',
    text: 'Editor.js provides maximum power for developers and products staying focused on the end-user experience',
    class: 'text-h3',
  },
  {
    label: 'P',
    text: "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.",
    class: 'text-p',
  },
  {
    label: 'Blockquote',
    text: "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.",
    class: 'text-blockquote',
  },
  {
    label: 'Monospaced',
    text: "const themeSecondaryBgColor = getCSSVariable('--tg-theme-secondary-bg-color')",
    class: 'text-monospaced',
  },
  {
    label: 'Large',
    text: 'Login attempt found. Is that you?',
    class: 'text-ui-large',
  },
  {
    label: 'Small',
    text: 'Submitting this form means accepting the rules',
    class: 'text-ui-small',
  },
  {
    label: 'Base',
    text: 'mail@example.com',
    class: 'text-ui-base',
  },
  {
    label: 'Base Medium',
    text: 'Button',
    class: 'text-ui-base-medium',
  },
  {
    label: 'Base Bold',
    text: 'Button',
    class: 'text-ui-base-bold',
  },
  {
    label: 'Subtle',
    text: 'Here you can manage your collaborators list',
    class: 'text-ui-subtle',
  },
  {
    label: 'Footnote',
    text: 'Invite a collaborator',
    class: 'text-ui-footnote',
  },
];
</script>

<style module>
@import url('@/styles/typography.pcss');

.typescale {
}

.ts-row {
  display: grid;
  gap: var(--spacing-xl);
  grid-template-columns: 120px 3fr;
  margin-bottom: var(--spacing-xl);
}

.label {
  grid-column: 1;
  @apply --text-ui-base-bold;
  align-items: center;
  display: flex;
}

.text {
  grid-column: 2;
  max-width: var(--layout-content-width);
}
</style>
