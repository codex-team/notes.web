<template>
  <h1>{{ $t('team.title') }}</h1>
  <div v-if="team">
    <div
      v-for="member in team"
      :key="member.id"
    >
      <Member :team-member="member" />
    </div>
  </div>

  <div v-else>
    <p>'No team members'</p>
  </div>
</template>

<script setup lang="ts">
import useTeam from '@/application/services/useTeam';
import Member from './Member.vue';
import { NoteId } from '@/domain/entities/Note';

const { team, loadTeam } = useTeam();

const props = defineProps<{
  /**
   * Id of the current note
   */
  id: NoteId;
}>();

loadTeam(props.id);
</script>

<style scoped lang="postcss"></style>
