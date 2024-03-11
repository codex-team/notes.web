<template>
  <h1>{{ $t('team.title') }}</h1>
  <div v-if="props.team">
    <ul
      v-for="member in props.team"
      :key="member.id"
    >
      <li :class="$style.team">
        {{ member.user.name }}
      </li>
      <!-- <Member :team-member="member" /> -->
    </ul>
  </div>

  <div v-else>
    <p>'No team members'</p>
  </div>
</template>

<script setup lang="ts">
import { Team } from '@/domain/entities/Team';

const props = defineProps<{
  /**
   * Team of the current note
   */
  team: Team;
}>();
</script>

<style scoped lang="postcss" module>
@import '@/presentation/styles/typography.pcss';
.team {
  display: flex;
  align-items: center;
  gap: var(--spacing-very-x);
}
</style>

