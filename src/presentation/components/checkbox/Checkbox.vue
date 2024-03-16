<template>
  <div>
    <input
      :id="id"
      :checked="checked"
      type="checkbox"
      :disabled="disabled"
      :noteId="noteId"
      class="checkbox"
      @input="onClick"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import useNoteSettings from '@/application/services/useNoteSettings.ts';
import { NoteId } from '@/domain/entities/Note';

const props = defineProps<{
  /**
   * Checkbox label
   */
  label: string;

  /**
   * Checkbox id
   */
  id?: string;

  /**
   * Is checkbox disabled
   */
  disabled?: boolean;

  /**
   * Is checkbox checked
   */
  checked: boolean;

  /**
   * Placeholder value
   */
  placeholder?: string;

  /**
   * Note id
   */
  noteId: NoteId;
}>();

const { update: updateSettings } = useNoteSettings();

const emit = defineEmits(['update:checked']);

const onClick = () => {
  const newValue = !props.checked;

  emit('update:checked', newValue);
  updateSettings(props.noteId, {
    isPublic: newValue,
  });
};
</script>

<style lang="postcss">
@import '@/presentation/styles/typography.pcss';
.checkbox {
  width: 20px;
  height: 20px;
  appearance: auto;
}
</style>
