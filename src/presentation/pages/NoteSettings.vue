<template>
  <div
    v-if="noteSettings"
    class="note-settings"
  >
    <div
      class="note-settings__page-header"
    >
      <Heading
        :level="1"
      >
        {{ $t('noteSettings.title') }}
      </Heading>
      <Heading
        :level="2"
        class="note-settings__subheading"
      >
        {{ noteTitle }}
      </Heading>
    </div>
    <div class="form">
      <Field
        v-model="parentURL"
        :title="t('noteSettings.parentNote')"
        size="large"
        :caption="t('noteSettings.parentNoteCaption')"
        :disabled="parentNote !== undefined"
        :placeholder="t('noteSettings.parentNotePlaceholder')"
        @input="setParentDebounced"
      />
      <Section
        :title="t('noteSettings.availabilityTitle')"
        :caption="t('noteSettings.availabilityCaption')"
      >
        <Row :title="t('noteSettings.availabilityRowTitle')">
          <template #right>
            <Switch
              v-model="isPublic"
              @click="changeAccess"
            />
          </template>
        </Row>
      </Section>
      <div>
        <Team
          :note-id="id"
          :team="noteSettings.team"
        />
        <Section
          :title="t('noteSettings.inviteCollaboratorTitle')"
          :caption="t('noteSettings.inviteCollaboratorCaption')"
        >
          <Row :title="invitationLink">
            <template #right>
              <Button
                :size="'small'"
                :style="'secondary'"
                @click="regenerateHash"
              >
                {{ t('noteSettings.revokeHashButton') }}
              </Button>
            </template>
          </Row>
        </Section>
        <br>
        <Button
          :style="'destructive'"
          @click="deleteNote"
        >
          {{ t('noteSettings.deleteNote') }}
        </Button>
      </div>
      <br>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script lang="ts" setup>
import type { NoteId } from '@/domain/entities/Note';
// import TextEdit from '@/presentation/components/form/TextEdit.vue';
import useNoteSettings from '@/application/services/useNoteSettings';
import useNote from '@/application/services/useNote';
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { computed, ref, onMounted } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import Team from '@/presentation/components/team/Team.vue';
import { Section, Row, Switch, Button, Field, Heading } from 'codex-ui/vue';

const { t } = useI18n();

const props = defineProps<{
  /**
   * Id of the current note
   */
  id: NoteId;
}>();

const { noteSettings, parentNote, load: loadSettings, updateIsPublic, revokeHash, deleteNoteById, setParent } = useNoteSettings();
const { noteTitle } = useNote({
  id: props.id,
});

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
 * Set parent note with debounce
 */
const setParentDebounced = useDebounceFn(async () => {
  if (parentURL.value !== '') {
    await setParent(props.id, parentURL.value);
  }
}, 1000);

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
  if (parentNote.value !== undefined) {
    const websiteHostname = import.meta.env.VITE_PRODUCTION_HOSTNAME;

    return `${websiteHostname}/note/${id}`;
  }

  return '';
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

<style setup lang="postcss" scoped>
@import '@/presentation/styles/typography.pcss';

.note-settings{
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
  margin: var(--spacing-xxl) var(--spacing-ml);

  &__page-header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);
    padding-left: var(--h-padding);
    padding-right: var(--h-padding);
  }

  &__subheading {
    color: var(--text-secondary);
  }
}

.form{
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxl);
  margin: var(--spacing-xxl) 0;
}
</style>
