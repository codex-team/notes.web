<template>
  <Heading :level="1">
    You are joining
  </Heading>
</template>

<script setup lang="ts">
import { Heading } from 'codex-ui/vue';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import useTeam from '@/application/services/useTeam';
import type { TeamMember } from '@/domain/entities/Team';
import { InvitationHash } from '@/domain/entities/NoteSettings';

const props = defineProps<{
  invitationHash: InvitationHash;
}>();

const { joinNoteTeamByHash } = useTeam();

const router = useRouter();

onMounted(async () => {
  const teamMember = ref<TeamMember | null | undefined>(undefined);

  teamMember.value = await joinNoteTeamByHash(props.invitationHash);

  console.log('member', teamMember.value);

  if (teamMember.value?.noteId) {
    router.push(`/note/${teamMember.value?.noteId}`);
  };
});
</script>

<style></style>
