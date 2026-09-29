<template>
  <PageBlock data-dimensions="large">
    <div
      v-if="noteSettings && note"
      class="note-settings"
    >
      <PageHeading>
        {{ t('noteSettings.title') }}
        <template #description>
          <RouterLink :to="`/note/${id}`">
            {{ noteTitle }}
          </RouterLink>
        </template>
      </PageHeading>

      <Section
        :title="t('noteSettings.parentNote')"
        :caption="t('noteSettings.parentNoteCaption')"
        :with-background="parentNote !== undefined"
      >
        <Row
          v-if="parentNote"
          :title="getTitle(parentNote.content)"
          :subtitle="parentNote.updatedAt ? t('home.updated') + ' ' + getTimeFromNow(parentNote.updatedAt) : undefined"
        >
          <template #right>
            <div class="buttons">
              <Button
                secondary
                @click="router.push(`/note/${parentNote.id}`)"
              >
                {{ t('note.open') }}
              </Button>
              <Button
                secondary
                icon="Unlink"
                :disabled="isParentUpdating"
                @click="handleUnlinkParentClick"
              >
                {{ t('note.unlink') }}
              </Button>
            </div>
          </template>
        </Row>
        <form
          v-else
          class="parent-form"
          @submit.prevent="handleSetParent"
        >
          <Input
            v-model="parentURL"
            icon="Link"
            :placeholder="t('noteSettings.parentNotePlaceholder')"
          />
          <Button
            secondary
            :disabled="parentURL.trim() === '' || isParentUpdating"
          >
            {{ t('noteSettings.setParent') }}
          </Button>
        </form>
      </Section>
      <div
        v-if="parentError"
        class="error text-ui-base"
      >
        {{ parentError }}
      </div>

      <Section
        :title="t('noteSettings.availabilityTitle')"
        :caption="t('noteSettings.availabilityCaption')"
      >
        <Row
          :title="t('noteSettings.availabilityRowTitle')"
          :subtitle="noteSettings.isPublic ? t('noteSettings.availabilityPublic') : t('noteSettings.availabilityPrivate')"
        >
          <template #right>
            <Switch
              v-model="isPublic"
              @click="changeAccess"
            />
          </template>
        </Row>
      </Section>

      <Team
        :note-id="id"
        :team="noteSettings.team"
        :creator-id="'creatorId' in note ? note.creatorId : undefined"
        @team-member-removed="handleTeamMemberRemoved"
      />

      <InviteLink
        :id="id"
        :invitation-hash="noteSettings.invitationHash"
      />

      <Section
        :title="t('noteSettings.dangerZone')"
        :caption="t('noteSettings.deleteNoteCaption')"
      >
        <Row :title="t('noteSettings.deleteNoteTitle')">
          <template #right>
            <Button
              destructive
              icon="Trash"
              @click="deleteNote"
            >
              {{ t('noteSettings.deleteNote') }}
            </Button>
          </template>
        </Row>
      </Section>
    </div>
    <div
      v-else
      class="skeleton"
      aria-busy="true"
    >
      <div class="skeleton__block skeleton__block--title" />
      <div class="skeleton__block" />
      <div class="skeleton__block" />
      <div class="skeleton__block skeleton__block--tall" />
    </div>
  </PageBlock>
</template>

<script lang="ts" setup>
import type { NoteId } from '@/domain/entities/Note';
import useNoteSettings from '@/application/services/useNoteSettings';
import useNote from '@/application/services/useNote';
import usePageTitle from '@/application/services/usePageTitle';
import { useI18n } from 'vue-i18n';
import { computed, ref, onMounted } from 'vue';
import Team from '@/presentation/components/team/Team.vue';
import PageHeading from '@/presentation/components/pageHeading/PageHeading.vue';
import { Section, Row, Switch, Button, Input, PageBlock, useConfirm } from '@codexteam/ui/vue';
import { getTitle } from '@/infrastructure/utils/note';
import { getTimeFromNow } from '@/infrastructure/utils/date';
import InviteLink from '@/presentation/components/noteSettings/InviteLink.vue';
import useNavbar from '@/application/services/useNavbar';
import { useRouter } from 'vue-router';
import type { TeamMember } from '@/domain/entities/Team';

const { t } = useI18n();

const props = defineProps<{
  /**
   * Id of the current note
   */
  id: NoteId;
}>();

const { deleteOpenedPagesByPrefix } = useNavbar();
const router = useRouter();
const { confirm } = useConfirm();
const { noteSettings, load: loadSettings, updateIsPublic, deleteNoteById, setParent } = useNoteSettings();
const { note, noteTitle, parentNote, unlinkParent } = useNote({
  id: props.id,
});

/**
 * URL of the note to be set as a parent
 */
const parentURL = ref<string>('');

const parentError = ref<string>('');

const isParentUpdating = ref(false);

/**
 * Deletes the note completely
 */
async function deleteNote() {
  const isConfirmed = await confirm(t('noteSettings.deleteNoteTitle'), t('noteSettings.noteDeleteConfirmation'), {
    confirmText: t('noteSettings.deleteNote'),
    cancelText: t('cancel'),
    destructive: true,
  });

  if (isConfirmed) {
    await deleteNoteById(props.id);
    deleteOpenedPagesByPrefix(`/note/${props.id}`);
    void router.push('/');
  }
}

/**
 * Unlink parent note
 */
async function handleUnlinkParentClick() {
  if (isParentUpdating.value) {
    return;
  }

  isParentUpdating.value = true;

  try {
    await unlinkParent();
  } finally {
    isParentUpdating.value = false;
  }
}

/**
 * Set parent note by the link from the input
 */
async function handleSetParent() {
  if (isParentUpdating.value || parentURL.value.trim() === '') {
    return;
  }

  parentError.value = '';
  isParentUpdating.value = true;

  try {
    parentNote.value = await setParent(props.id, parentURL.value.trim());
    parentURL.value = '';
  } catch (error) {
    parentError.value = error instanceof Error && error.message.startsWith('Invalid')
      ? t('noteSettings.parentNoteInvalidLink')
      : t('noteSettings.parentNoteError');
  } finally {
    isParentUpdating.value = false;
  }
}

/**
 * Switch emits its initial state on mount, so the value is changed only by the click handler
 */
const isPublic = computed({
  get: () => noteSettings.value?.isPublic ?? false,
  set: () => {},
});

/**
 * Change isPublic property
 */
async function changeAccess() {
  if (noteSettings.value !== null) {
    await updateIsPublic(props.id, !noteSettings.value.isPublic);
  }
}

usePageTitle(() => `${t('noteSettings.title')} · ${noteTitle.value}`);

onMounted(async () => {
  await loadSettings(props.id);
});

/**
 * Remove the member from the displayed team
 *
 * @param userId - user id of the removed member
 */
function handleTeamMemberRemoved(userId: TeamMember['user']['id']) {
  if (noteSettings.value !== null) {
    noteSettings.value = {
      ...noteSettings.value,
      team: noteSettings.value.team.filter(member => member.user.id !== userId),
    };
  }
}
</script>

<style lang="postcss" scoped>
.note-settings {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.buttons {
  display: flex;
  gap: var(--spacing-s);
}

.parent-form {
  display: flex;
  gap: var(--spacing-s);

  & > :first-child {
    flex: 1;
  }
}

.error {
  margin-top: calc(-1 * var(--spacing-l));
  padding: 0 var(--h-padding);
  color: var(--red--solid);
}

.skeleton {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);

  &__block {
    height: 64px;
    border-radius: var(--radius-field);
    background-color: color-mix(in srgb, var(--base--text-secondary) 10%, transparent);
    animation: pulse 1.4s ease-in-out infinite;

    &--title {
      height: 44px;
      width: 50%;
    }

    &--tall {
      height: 200px;
    }
  }
}

@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
</style>
