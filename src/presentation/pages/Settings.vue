<template>
  <h1>Note settings</h1>
  <div v-if="noteSettings">
    <TextEdit
      :name="'customHostname'"
      :title="'Custom Hostname'"
      :value="noteSettings.customHostname"
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
  </div>
  <div v-else-if="isLoading">
    Loading...
  </div>
</template>

<script lang="ts" setup>
import TextEdit from '@/presentation/components/form/TextEdit.vue';
import Button from '@/presentation/components/button/Button.vue';
import { IconSave } from '@codexteam/icons';
import useNote from '@/application/services/useNote';

const props = defineProps<{
  /**
   * Id of the current note
   */
   publicId: string | null;
}>();

const { loadSettings, noteSettings, isLoading } = useNote();

loadSettings(props.publicId);

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
  console.log('TODO: implement noteSettings update');
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
