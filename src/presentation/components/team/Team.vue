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
import { TeamMember, MemberRole } from '@/domain/entities/Team';
import { NoteId } from '@/domain/entities/Note';
import { Section, Row, Avatar } from 'codex-ui/vue';
import RoleSelect from './RoleSelect.vue';
import { useI18n } from 'vue-i18n';
import { computed, defineProps } from 'vue';

const { t } = useI18n();

const props = defineProps<{
  /**
   * Team of the current note
   */
  team: TeamMember[];
  /**
   * Id of the current note
   */
  noteId: NoteId;
}>();

/**
 * Sorts the team members based on their role and whether they are the creator of the note.
 *
 * @param members - Array of TeamMember objects to be sorted.
 * @returns TeamMember - Sorted array of TeamMember objects.
 */
const sortMembers = (members: TeamMember[]): TeamMember[] => {
  return members.sort((a, b) => {
    const roleOrder = {
      [MemberRole.Write]: 0,
      [MemberRole.Read]: 1,
    };

    const isCreatorA = String(a.user.id) === props.noteId;
    const isCreatorB = String(b.user.id) === props.noteId;

    if (isCreatorA && !isCreatorB) {
      return -1;
    }
    if (!isCreatorA && isCreatorB) {
      return 1;
    }

    if (!roleOrder[a.role] && !roleOrder[b.role]) {
      return 0;
    }

    if (roleOrder[a.role] === roleOrder[b.role]) {
      return 0;
    }

    return roleOrder[a.role] < roleOrder[b.role] ? -1 : 1;
  });
};

const sortedTeam = computed(() => sortMembers(props.team));
</script>

<style scoped>
.mock {
  width: var(--size-avatar);
  height: var(--size-avatar);
  border-radius: var(--radius-m);
  background-color: var(--base--text-solid-foreground);
}
</style>
