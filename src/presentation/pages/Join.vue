<template>
  <MessageCard
    :title="title"
    :text="text"
  >
    <Button
      v-if="status !== 'joining'"
      secondary
      @click="router.push('/')"
    >
      {{ t('errors.goHome') }}
    </Button>
  </MessageCard>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Button } from '@codexteam/ui/vue';
import useTeam from '@/application/services/useTeam';
import usePageTitle from '@/application/services/usePageTitle';
import type { InvitationHash } from '@/domain/entities/NoteSettings';
import MessageCard from '@/presentation/components/message-card/MessageCard.vue';

const { t } = useI18n();
const { joinNoteTeamByHash } = useTeam();
const router = useRouter();

const props = defineProps<{
  invitationHash: InvitationHash;
}>();

const status = ref<'joining' | 'expired' | 'invalid' | 'failed'>('joining');

const title = computed(() => t(`join.${status.value}.title`));

const text = computed(() => t(`join.${status.value}.text`));

usePageTitle(() => t('pages.joinTeam'));

/**
 * The route requires authorization, so the user is logged in here
 */
onMounted(async () => {
  try {
    const teamMember = await joinNoteTeamByHash(props.invitationHash);

    if (teamMember?.noteId) {
      void router.replace(`/note/${teamMember.noteId}`);

      return;
    }

    status.value = 'failed';
  } catch (error) {
    const message = error instanceof Error ? error.message : '';

    if (message === 'Wrong invitation') {
      status.value = 'expired';
    } else if (message === 'FST_ERR_VALIDATION') {
      status.value = 'invalid';
    } else {
      status.value = 'failed';
    }
  }
});
</script>
