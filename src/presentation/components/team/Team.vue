<template>
  <div v-if="team?.length">
    <div
      v-for="member in team"
      :key="member.id"
    >
      <Members :team-member="member" />
    </div>
  </div>

  <div v-else>
    <p>'No team members'</p>
  </div>
</template>

<script setup lang="ts">
import useTeam from '@/application/services/useTeam';
import Members from './Members.vue';

const { team } = useTeam();
</script>

<style scoped lang="postcss"></style>
