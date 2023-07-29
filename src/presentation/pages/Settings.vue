<template>
  <h1>Note settings</h1>
  <TextEdit
      :name="'customHostname'"
      :title="'Custom Hostname'"
      :placeholder="'example: landing.codex.so'"
    />
  <div class="control__button">
    <Button
    class="header__plus"
    text="Save"
    type="primary"
    :icon="IconSave"
    @click.passive="onClick"
  />
  </div>
  
</template>

<script lang="ts" setup>
import TextEdit from '@/presentation/components/form/TextEdit.vue';
import Button from '@/presentation/components/button/Button.vue';
import { IconSave } from '@codexteam/icons';
import useNote from '@/application/services/useNote';
const { loadSettings } = useNote();

const props = defineProps<{
  /**
   * Id of the current note
   */
  id: number | null;
}>();

const emit = defineEmits<{
  click: [event: MouseEvent],
}>();

/**
 * Button click handler
 *
 * @param event - click event
 */
function onClick(event: MouseEvent) {
  emit('click', event);
  loadSettings(props.id);
  console.log("11");
}
</script>

<style scoped>
.control__button {
  padding: var(--spacing-xxs) var(--spacing-ms);
  align-items: center;
  display: flex;
  justify-content: flex-start;
  gap: var(--spacing-very-x);
  cursor: pointer;
  user-select: none;
}
</style>
