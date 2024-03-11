<template>
  <div class="member">
    <div class="member-name">
      {{ teamTitle }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { TeamMember } from '@/domain/entities/Team.ts';
import { computed } from 'vue';

/**
 * TeamMember props
 */
const props = defineProps<{
  teamMember: TeamMember;
}>();

/**
 * Get the member title
 *
 * @todo add name of the user to the title
 */
const teamTitle = computed(() => {
  const name = props.teamMember;

  return name;
});
</script>

<style scoped lang="postcss" module>

</style>
