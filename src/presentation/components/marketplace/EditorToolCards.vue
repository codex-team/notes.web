<template>
  <div class="editor-tools">
    Editor tools
  </div>
  <div class="cards">
    <div
      v-for="tool in editorTools"
      :key="tool.id"
      class="card"
    >
      <div class="image">
        {{ tool.name[0] }}
      </div>
      <div class="name">
        {{ tool.name }}
      </div>
      <div class="description">
        {{ tool.description }}
      </div>
      <Button
        :icon="IconPlus"
        type="primary"
        text="Install tool"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { IconPlus } from '@codexteam/icons';
import Button from '../button/Button.vue';
import useEditorTools from '@/application/services/useEditorTools';

const { editorTools, load } = useEditorTools();

onMounted(() => {
  load();
});
</script>

<style lang="postcss" scoped>
@import '@/presentation/styles/typography.pcss';

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-l);
  flex-direction: row;
  padding: var(--spacing-l) 0;
}

.editor-tools {
  margin-top: var(--spacing-l);
  @apply --text-heading-2;
}

.card {
  display: flex;
  padding: var(--spacing-l);
  min-width: 250px;
  max-width: 400px;
  border: 2px solid var(--color-gray-contrast);
  flex-direction: column;
  gap: var(--spacing-s);
  border-radius: var(--radius-l);

  .name {
    @apply --text-heading-3;
  }
}

.image {
  cursor: default;
  display: flex;
  user-select: none;
  justify-content: center;
  align-items: center;
  font-size: 200px;
  border-radius: var(--radius-m);
  background: var(--color-bg-header);
  line-height: 1em;
  font-weight: 800;
  width: 100%;
  min-height: 150px;
}
</style>
