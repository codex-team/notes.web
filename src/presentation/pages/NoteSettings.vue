<template>
  <h1>Note settings</h1>
  <div v-if="noteSettings">
    <TextEdit
      v-model:value="noteSettings.customHostname"
      :name="'customHostname'"
      :title="'Custom Hostname'"
      :placeholder="'example: landing.codex.so'"
    />
    <Checkbox
      :id="noteSettings.id.toString()"
      v-model:checked="noteSettings.isPublic"
      label="is note public"
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
  <div v-else>
    Loading...
  </div>
</template>

<script lang="ts" setup>
import type { NoteId } from '@/domain/entities/Note';
import TextEdit from '@/presentation/components/form/TextEdit.vue';
import Button from '@/presentation/components/button/Button.vue';
import { IconSave } from '@codexteam/icons';
import useNoteSettings from '@/application/services/useNoteSettings';
import Checkbox from '@/presentation/components/checkbox/Checkbox.vue';
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  /**
   * Id of the current note
   */
   id: NoteId;
}>();

const { load, noteSettings, update } = useNoteSettings();

load(props.id);

/**
 * Button click handler
 */
function onClick() {
  if (!noteSettings.value) {
    throw new Error('Note settings is not loaded');
  }
  update(props.id, {
    isPublic: noteSettings.value.isPublic,
    customHostname: noteSettings.value.customHostname,
  });
}

/**
 * Changing the title in the browser
 */
useHead({
  title: t('noteSettings.title'),
});
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
