<template>
  <li class="member">
    <div class="member-name">
      {{ teamMember.user.name || teamMember.user.email }}
    </div>
  </li>
</template>

<script setup lang="ts">
import { TeamMember } from '@/domain/entities/Team.ts';

/**
 * TeamMember props
 */
defineProps<{
  /**
   * Team member data
   */
  teamMember: TeamMember;
}>();
</script>

<style scoped>
.member {
  margin-top: var(--spacing-l);
}
.member-name {
  display: flex;
  align-items: center;
  gap: var(--spacing-very-x);
}
</style>
