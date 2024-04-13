<template>
  <h1>Note settings</h1>
  <div v-if="noteSettings">
    <!-- Hidden for now -->
    <!-- <TextEdit
      v-model:value="noteSettings.customHostname"
      name="customHostname"
      :title="t('noteSettings.customHostname')"
      :placeholder="t('noteSettings.hostnamePlaceholder')"
    /> -->
    <Checkbox
      v-model:checked="noteSettings.isPublic"
      :label="t('noteSettings.isPublic')"
      @update:checked="changeAccess"
    />
    {{ invitationLink }}
    <Button
      :text="t('noteSettings.revokeHash')"
      type="primary"
      @click="regenerateHash"
    />
    <FormField
      v-model="parentURL"
      :title="t('noteSettings.parentNote')"
      size="medium"
      :caption="t('noteSettings.parentNoteCaption')"
    />
    <Button
      :text="t('noteSettings.setParent')"
      type="primary"
      @click="updateParentButton"
    />
    <Team
      :note-id="id"
      :team="noteSettings.team"
    />
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts" setup>
import type { NoteId } from '@/domain/entities/Note';
// import TextEdit from '@/presentation/components/form/TextEdit.vue';
import { Field as FormField } from 'codex-ui/vue';
import Button from '@/presentation/components/button/Button.vue';
import useNoteSettings from '@/application/services/useNoteSettings';
import Checkbox from '@/presentation/components/checkbox/Checkbox.vue';
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { computed, onMounted, ref } from 'vue';
import Team from '@/presentation/components/team/Team.vue';

const { t } = useI18n();

const props = defineProps<{
  /**
   * Id of the current note
   */
  id: NoteId;
}>();

const { noteSettings, load: loadSettings, updateIsPublic, revokeHash, parentNote, updateParent } = useNoteSettings();

const invitationLink = computed(
  () => `${import.meta.env.VITE_PRODUCTION_HOSTNAME}/join/${noteSettings.value?.invitationHash}`
);

/**
 * URL of the parent note. Used to set and display the parent note
 */
const parentURL = ref<string>('');

/**
 * Construct the parent note URL. If the parent note is not set, return an empty string
 *
 * @param id - id of the  note
 */
function getParentURL(id: NoteId | undefined): string {
  if (parentNote.value === undefined) {
    return '';
  }
  const websiteHostname = import.meta.env.VITE_PRODUCTION_HOSTNAME;

  return `${websiteHostname}/note/${id}`;
}

/**
 * Regenerate invitation hash
 */
async function regenerateHash() {
  await revokeHash(props.id);
}

/**
 * Update parent button click handler
 */
async function updateParentButton() {
  await updateParent(props.id, parentURL.value);
}

/**
 * Change isPublic property
 */
async function changeAccess() {
  updateIsPublic(props.id, noteSettings.value!.isPublic);
}

/**
 * Changing the title in the browser
 */
useHead({
  title: t('noteSettings.title'),
});

onMounted(async () => {
  await loadSettings(props.id);
  parentURL.value = getParentURL(parentNote.value?.id);
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
