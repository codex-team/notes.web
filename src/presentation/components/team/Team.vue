<template>
  <h1>{{ t('noteSettings.team.title') }}</h1>
  <ul
    v-for="member in team"
    :key="member.id"
  >
    <Member
      :id="id"
      :team-member="member"
    />
  </ul>
</template>

<script setup lang="ts">
import { Team } from '@/domain/entities/Team';
import Member from './Member.vue';
import { useI18n } from 'vue-i18n';
import { NoteId } from '@/domain/entities/Note';

defineProps<{
  /**
   * Team of the current note
   */
  team: Team;
  /**
   * Id of the current note
   */
  id: NoteId;
}>();

const { t } = useI18n();
</script>

<style scoped></style>

