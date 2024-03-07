<template>
  <div class="team">
    <div class="team-header">
      <h1 class="team-title">
        {{ teamTitle }}
      </h1>
    </div>
    <p class="team-sub">
      {{ teamSubTitle }}
    </p>
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
 */
const teamTitle = computed(() => {
  const firstNoteBlock = props.teamMember.noteId;

  if (!firstNoteBlock) {
    return 'Loading...';
  } else {
    return firstNoteBlock;
  }
});

/**
 * Get the member subtitle
 */
const teamSubTitle = computed(() => {
  const secondNoteBlock = props.teamMember.userId;

  if (!secondNoteBlock) {
    return 'Loading...';
  } else {
    return 'User id is ' + secondNoteBlock;
  }
});
</script>

<style>
.note {
  margin: 20px 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #4b4b4b;
  cursor: pointer;
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.note-title {
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin: 0;
}

.note-sub {
  margin-top: 4px;
  font-size: 16px;
  color: white;
  opacity: 0.5;
}
</style>
