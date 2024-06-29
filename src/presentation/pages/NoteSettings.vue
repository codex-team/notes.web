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
    >
      {{ t('noteSettings.revokeHash') }}
    </Button>
    <Field
      v-model="parentURL"
      :title="t('noteSettings.parentNote')"
      size="medium"
      :caption="t('noteSettings.parentNoteCaption')"
    />
    <Button
      type="primary"
      @click="setParentButton"
    >
      {{ t('noteSettings.setParent') }}
    </Button>
    <Team
      :note-id="id"
      :team="noteSettings.team"
    />
    <br>
    <Button
      type="destructive"
      @click="deleteNote"
    >
      {{ t('noteSettings.deleteNote') }}
    </Button>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script lang="ts" setup>
import type { NoteId } from '@/domain/entities/Note';
// import TextEdit from '@/presentation/components/form/TextEdit.vue';
import useNoteSettings from '@/application/services/useNoteSettings';
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { computed, ref, onMounted } from 'vue';
import Team from '@/presentation/components/team/Team.vue';
import { Section, Row, Switch, Button, Field } from 'codex-ui/vue';

const { t } = useI18n();

const props = defineProps<{
  /**
   * Id of the current note
   */
  id: NoteId;
}>();

const { noteSettings, parentNote, load: loadSettings, updateIsPublic, revokeHash, deleteNoteById, setParent } = useNoteSettings();

const invitationLink = computed(
  () => `${import.meta.env.VITE_PRODUCTION_HOSTNAME}/join/${noteSettings.value?.invitationHash}`
);

/**
 * URL of the parent note. Used to set and display the parent note
 */
const parentURL = ref<string>('');

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
  const isConfirmed = window.confirm(t('noteSettings.noteDeleteConfirmation'));

  if (isConfirmed) {
    deleteNoteById(props.id);
  }
}

/**
 * Update parent button click handler
 */
async function setParentButton() {
  await setParent(props.id, parentURL.value);
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
 * Construct the parent note URL. If the parent note is not set, return an empty string
 *
 * @param id - id of the  note
 * @returns {string} URL of the parent note
 */
function getParentURL(id: NoteId | undefined): string {
  if (parentNote.value === undefined) {
    return '';
  }
  const websiteHostname = import.meta.env.VITE_PRODUCTION_HOSTNAME;

  return `${websiteHostname}/note/${id}`;
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
