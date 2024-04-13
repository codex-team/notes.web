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

      <template #left>
          <Avatar v-if="member.user.photo !== ''"
            :src="member.user.photo"
            :username="member.user.name"
          />
        <div v-else>
          <div class="mock"></div>
        </div>
      </template>
    </Row>
  </Section>
</template>

<script setup lang="ts">
import { Team } from '@/domain/entities/Team';
import { NoteId } from '@/domain/entities/Note';
import { Section, Row, Avatar } from 'codex-ui/vue';
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

<style scoped>
.mock {
  width: var(--size-avatar);
  height: var(--size-avatar);
  border-radius: var(--radius-m);
  background-color: var(--base--text-solid-foreground);
}
</style>

