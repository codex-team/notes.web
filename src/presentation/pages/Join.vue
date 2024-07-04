<template>
  <div :class="$style['message']">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import useTeam from '@/application/services/useTeam';
import { useAppState } from '@/application/services/useAppState';
import useAuth from '@/application/services/useAuth';
import type { TeamMember } from '@/domain/entities/Team';
import { InvitationHash } from '@/domain/entities/NoteSettings';
import { useI18n } from 'vue-i18n';

const { user } = useAppState();
const { t } = useI18n();
const { showGoogleAuthPopup } = useAuth();
const { joinNoteTeamByHash } = useTeam();
const router = useRouter();

const props = defineProps<{
  invitationHash: InvitationHash;
}>();

/**
 * Message to be displayed as a heading of join page
 */
const message = ref(t('join.title'));

const teamMember = ref<TeamMember | null>(null);

async function handleJoin(): Promise<void> {
  try {
    teamMember.value = await joinNoteTeamByHash(props.invitationHash);
  } catch (error) {
    if (error instanceof Error) {
      /**
       * Handle errors which are related to wrong invitation hash specified
       */
      if (error.message === 'FST_ERR_VALIDATION') {
        message.value = t('join.messages.validationError');
      }

      /**
       * Handle error related to expired invitation link
       */
      if (error.message === 'Wrong invitation') {
        message.value = t('join.messages.linkExpired');
      }

      /**
       * Handle errors related to unauthorized state
       */
      if (error.message === 'You must be authenticated to access this resource') {
        message.value = t('join.messages.unauthorized');
        showGoogleAuthPopup();
      }
    }
  }

  /**
   * Check if we got id of the note to redirect
   */
  if (teamMember.value?.noteId) {
    router.push(`/note/${teamMember.value?.noteId}`);

    /**
     * @todo implement success alert
     */
  }
}

/**
 * Watching authorization of the user
 */
watch(user, async () => {
  await handleJoin();
}, { immediate: true });

</script>

<style lang="postcss" module>
.message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
