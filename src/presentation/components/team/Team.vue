<template>
  <Section
    :title="t('noteSettings.team.title')"
    :caption="t('noteSettings.team.caption')"
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
import { useI18n } from 'vue-i18n';

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

const { t } = useI18n();
</script>

<style scoped></style>

