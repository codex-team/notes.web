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
import Button from '@/presentation/components/button/Button.vue';
import useNoteSettings from '@/application/services/useNoteSettings';
import Checkbox from '@/presentation/components/checkbox/Checkbox.vue';
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import Team from '@/presentation/components/team/Team.vue';

const { t } = useI18n();

const props = defineProps<{
  /**
   * Id of the current note
   */
  id: NoteId;
}>();

const { noteSettings, load: loadSettings, update: updateSettings, revokeHash } = useNoteSettings();

const invitationLink = computed(
  () => `${import.meta.env.VITE_PRODUCTION_HOSTNAME}/join/${noteSettings.value?.invitationHash}`
);

loadSettings(props.id);

/**
 * Regenerate invitation hash
 */
async function regenerateHash() {
  revokeHash(props.id);
}

/**
 * Change isPublic property
 */
async function changeAccess() {
  updateSettings(props.id, {
    isPublic: noteSettings.value?.isPublic,
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
