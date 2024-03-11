<template>
  <h1>{{ $t('team.title') }}</h1>
  <ul
    v-for="member in props.team"
    :key="member.id"
  >
    <Member :team-member="member" />
  </ul>
</template>

<script setup lang="ts">
import { Team } from '@/domain/entities/Team';
import Member from './Member.vue';

const props = defineProps<{
  /**
   * Team of the current note
   */
  team: Team;
}>();
</script>

<style scoped lang="postcss" module></style>

