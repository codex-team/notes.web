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
    <Section
      :title="t('noteSettings.availabilityTitle')"
      :caption="t('noteSettings.availabilityCaption')"
    >
      <Row :title="t('noteSettings.publish')">
        <template #right>
          <Switch
            v-model="isPublic"
            @click="changeAccess"
          />
        </template>
      </Row>
    </Section>
    {{ invitationLink }}
    <Button
      type="primary"
      @click="regenerateHash"
      >{{ t('noteSettings.revokeHash') }}</Button
    >
    <Team
      :note-id="id"
      :team="noteSettings.team"
    />
    <br />
    <Button
      type="destructive"
      @click="deleteNote"
      >{{ t('noteSettings.deleteNote') }}</Button
    >
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts" setup>
import type { NoteId } from '@/domain/entities/Note';
// import TextEdit from '@/presentation/components/form/TextEdit.vue';
import useNoteSettings from '@/application/services/useNoteSettings';
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import Team from '@/presentation/components/team/Team.vue';
import { Section, Row, Switch, Button } from 'codex-ui/vue';

const { t } = useI18n();

const props = defineProps<{
  /**
   * Id of the current note
   */
  id: NoteId;
}>();

const { noteSettings, load: loadSettings, updateIsPublic, revokeHash, deleteNoteById } = useNoteSettings();

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
 * Deletes the note complitely
 */
async function deleteNote() {
  const isConfirmed = window.confirm(t('noteSettings.noteDeleteConfirmation'))
  if (isConfirmed) {
    deleteNoteById(props.id);
  }
}

/**
 * Current value of isPublic field
 */
const isPublic = computed(() => {
  return noteSettings.value?.isPublic;
});

/**
 * Change isPublic property
 */
async function changeAccess() {
  updateIsPublic(props.id, !noteSettings.value!.isPublic);
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
