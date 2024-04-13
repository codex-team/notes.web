<template>
  <Section
    title="Collaborators"
    caption="Who can access the Note even if it’s not published"
  >
    <Row
      v-for="(member, memberIndex) in team"
      :key="member.id"
      :title="member.user.name || member.user.email"
      :has-delimiter="memberIndex !== team.length - 1"
    >
      <template #right>
        <RoleSelect
          :note-id="noteId"
          :team-member="member"
        >
        </RoleSelect>
      </template>
    </Row>
  </Section>
</template>

<script setup lang="ts">
import { Team } from '@/domain/entities/Team';
import { NoteId } from '@/domain/entities/Note';
import { Section, Row } from 'codex-ui/vue';
import RoleSelect from './RoleSelect.vue';

defineProps<{
  /**
   * Team of the current note
   */
  team: Team;
  /**
   * Id of the current note
   */
  noteId: NoteId;
}>();
</script>

<style scoped></style>

