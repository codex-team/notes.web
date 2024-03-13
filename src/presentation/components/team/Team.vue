<template>
  <h1>{{ $t('noteSettings.team.title') }}</h1>
  <ul
    v-for="member in team"
    :key="member.id"
  >
    <Member :team-member="member" />
  </ul>
</template>

<script setup lang="ts">
import { Team } from '@/domain/entities/Team';
import Member from './Member.vue';

defineProps<{
  /**
   * Team of the current note
   */
  team: Team;
}>();
</script>

<style scoped></style>

