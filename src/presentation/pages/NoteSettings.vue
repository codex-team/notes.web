<template>
  <ThreeColsLayout>
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
        <Section
          :title="t('noteSettings.parentNote')"
          :caption="t('noteSettings.parentNoteCaption')"
          :with-background="false"
        >
          <div class="change-parent">
            <Input
              v-model="parentURL"
              data-dimensions="large"
              :disabled="parentNote !== undefined"
              :placeholder="t('noteSettings.parentNotePlaceholder')"
              @input="setParentDebounced"
            />
            <Card
              v-if="parentNote"
              :title="parentNoteTitle"
              :subtitle="formatShortDate(parentNote.createdAt!)"
              orientation="horizontal"
            >
              <Button
                secondary
                @click="handleUnlinkParentClick"
              >
                {{ t('note.unlink') }}
              </Button>
            </Card>
          </div>
        </Section>

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

        <Fieldset
          :title="t('noteSettings.teamFormFieldSetTitle')"
        >
          <div
            class="fieldset"
            data-dimensions="large"
          >
            <template v-if="inhereteRighs">
              <Section
                :title="t('noteSettings.team.title')"
                :caption="t('noteSettings.team.caption')"
              >
                <Row
                  :title="'TODO: add i18n'"
                  :subtitle="'inhereted from TODO: add i18n'"
                >
                  <template #right>
                    <Icon
                      v-if="inhereteRighs"
                      :name="'Check'"
                    />
                  </template>
                </Row>
                <Row
                  :title="'ovewrite TODO: add i18n'"
                  :subtitle="'something about overwrite TODO: add i18n'"
                  @click="turnOffInheritance"
                >
                  <template #right>
                    <Icon
                      v-if="!inhereteRighs"
                      :name="'Check'"
                    />
                  </template>
                </Row>
              </Section>
            </template>

            <template v-else>
              <Team
                :note-id="id"
                :team="noteSettings.team"
              />

              <InviteLink
                :id="props.id"
                :invintation-hash="noteSettings.invitationHash"
              />
            </template>

            <Button
              destructive
              class="delete-button"
              @click="deleteNote"
            >
              {{ t('noteSettings.deleteNote') }}
            </Button>
          </div>
        </Fieldset>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </ThreeColsLayout>
</template>

<script lang="ts" setup>
import type { NoteId } from '@/domain/entities/Note';
import useNoteSettings from '@/application/services/useNoteSettings';
import useNote from '@/application/services/useNote';
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { computed, ref, onMounted, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import Team from '@/presentation/components/team/Team.vue';
import { Section, Row, Switch, Button, Heading, Fieldset, Input, Card, Icon } from 'codex-ui/vue';
import { getTitle } from '@/infrastructure/utils/note';
import { formatShortDate } from '@/infrastructure/utils/date';
import InviteLink from '@/presentation/components/noteSettings/InviteLink.vue';
import ThreeColsLayout from '@/presentation/layouts/ThreeColsLayout.vue';

const { t } = useI18n();

const props = defineProps<{
  /**
   * Id of the current note
   */
  id: NoteId;
}>();

const { noteSettings, load: loadSettings, updateIsPublic, deleteNoteById, parentNote, setParent } = useNoteSettings();
const { noteTitle, unlinkParent } = useNote({
  id: props.id,
});

/**
 * URL of the parent note. Used to set and display the parent note
 */
const parentURL = ref<string>('');

/**
 * Inherete rights from the parent note
 */
const inhereteRighs = ref(true);

/**
 * We should hide the inheritance policy chooser if the parent note is not set
 */
watch(parentNote, (newVal) => {
  if (newVal === undefined) {
    inhereteRighs.value = false;
  }
});

/**
 * Turn off inheritance
 */
async function turnOffInheritance() {
  const confirm = window.confirm('Вы уверены, что хотите отключить наследование?');

  if (confirm) {
    inhereteRighs.value = false;
  }
}

/**
 * Check if the team is presented
 * By default, owner is always presented in the team, it is why we check if the team length is more than 1
 */
const isTeamPresented = computed(() => {
  return noteSettings.value!.team.length > 1;
});

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
 * Unlink parent note and clear the parentURL field
 */
async function handleUnlinkParentClick() {
  parentURL.value = '';
  parentNote.value = undefined;
  unlinkParent();
}

/**
 * Set parent note with debounce
 */
const setParentDebounced = useDebounceFn(async () => {
  if (parentURL.value !== '') {
    await setParent(props.id, parentURL.value);
  }
}, 1000);

const parentNoteTitle = computed(() => {
  if (parentNote.value === undefined) {
    return '';
  }

  return getTitle(parentNote.value.content);
});

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
  inhereteRighs.value = (parentNote.value !== undefined) && !isTeamPresented.value;
});

</script>

<style setup lang="postcss" scoped>
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

.change-parent{
  display: flex;
  flex-direction: column;
  gap: var(--v-padding);
}

.fieldset{
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.delete-button{
  width: auto;
  align-self: flex-start;
}
</style>
