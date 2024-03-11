<template>
  <li class="member">
    <div class="member-name">
      {{ props.teamMember.user.name }}
    </div>
  </li>
</template>

<script setup lang="ts">
import { TeamMember } from '@/domain/entities/Team.ts';

/**
 * TeamMember props
 */
const props = defineProps<{
  /**
   * Team member data
   */
  teamMember: TeamMember;
}>();
</script>

<style scoped lang="postcss" module>
@import '@/presentation/styles/typography.pcss';
.member {
  display: flex;
  align-items: center;
  gap: var(--spacing-very-x);
}
.member-name {
  display: flex;
  align-items: center;
  gap: var(--spacing-very-x);
}
</style>
