<template>
  <Heading :level="1">
    {{ message }}
  </Heading>
</template>

<script setup lang="ts">
import { Heading } from 'codex-ui/vue';
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
  /**
   * Check if user is authorized
   */
  if (user.value !== null) {
    teamMember.value = await joinNoteTeamByHash(props.invitationHash);
    /**
     * Check if we got id of the note to redirect
     */
    if (teamMember.value?.noteId) {
      router.push(`/note/${teamMember.value?.noteId}`);
    } else {
      /**
       * Join made teamMember null
       * Means that join link is expired
       */
      message.value = t('join.linkExpired');
    }
  } else {
    /**
     * Authorize if not authorized yet
     */
    showGoogleAuthPopup();
  }
};

/**
 * Watching authorization of the user
 */
watch(user, async () => {
  await handleJoin();
}, { immediate: true });

</script>

<style></style>
