<template>
  <Section
    :title="t('noteSettings.team.title')"
    :caption="t('noteSettings.team.caption')"
  >
    <Row
      v-for="(member, memberIndex) in sortedTeam"
      :key="member.id"
      :title="member.user.name || member.user.email"
      :has-delimiter="memberIndex !== sortedTeam.length - 1"
      data-dimensions="medium"
    >
      <template #right>
        <RoleSelect
          :note-id="noteId"
          :team-member="member"
        />
      </template>

      <template #left>
        <Avatar
          v-if="member.user.photo !== ''"
          :src="member.user.photo"
          :username="member.user.name"
        />
        <div
          v-else
          class="mock"
        />
      </template>
    </Row>
  </Section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Team, MemberRole } from '@/domain/entities/Team';
import { Note, NoteId } from '@/domain/entities/Note';
import { Section, Row, Avatar } from '@codexteam/ui/vue';
import RoleSelect from './RoleSelect.vue';
import { useI18n } from 'vue-i18n';
import useNote from '@/application/services/useNote.ts';

const props = defineProps<{
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
const { note } = useNote({ id: props.noteId });

const sortedTeam = computed(() => {
  if (!note.value) {
    return props.team;
  }

  return [...props.team].sort((a, b) => {
    const isCreatorA = a.user.id === (note.value as Note).creatorId;
    const isCreatorB = b.user.id === (note.value as Note).creatorId;

    if (isCreatorA) {
      return -1;
    }
    if (isCreatorB) {
      return 1;
    }

    const roleOrder = {
      [MemberRole.Write]: 0,
      [MemberRole.Read]: 1,
    };

    return roleOrder[a.role] - roleOrder[b.role];
  });
});
</script>

<style scoped>
.mock {
  width: var(--size-avatar);
  height: var(--size-avatar);
  border-radius: var(--radius-m);
  background-color: var(--base--text-solid-foreground);
}
</style>
