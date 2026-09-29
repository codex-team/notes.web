<template>
  <Section
    :title="t('noteSettings.team.title')"
    :caption="t('noteSettings.team.caption')"
  >
    <Row
      v-for="(member, memberIndex) in sortedTeam"
      :key="member.id"
      :title="member.user.name || member.user.email"
      :subtitle="member.user.name ? member.user.email : undefined"
      :has-delimiter="memberIndex !== sortedTeam.length - 1"
    >
      <template #left>
        <Avatar
          :src="member.user.photo"
          :username="member.user.name || member.user.email"
        />
      </template>

      <template #right>
        <span
          v-if="member.user.id === user?.id"
          class="tag text-ui-small"
        >
          {{ t('noteSettings.team.you') }}
        </span>
        <span
          v-if="member.user.id === creatorId"
          class="tag text-ui-small"
        >
          {{ t('noteSettings.team.owner') }}
        </span>
        <template v-else>
          <RoleSelect
            :note-id="noteId"
            :team-member="member"
            :disabled="member.user.id === user?.id"
          />
          <MoreActions
            v-if="member.user.id !== user?.id"
            :note-id="noteId"
            :team-member="member"
            @team-member-removed="emit('teamMemberRemoved', $event)"
          />
        </template>
      </template>
    </Row>
  </Section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type Team, MemberRole, type TeamMember } from '@/domain/entities/Team';
import type { NoteId } from '@/domain/entities/Note';
import type { UserId } from '@/domain/entities/User';
import { Section, Row, Avatar } from '@codexteam/ui/vue';
import RoleSelect from './RoleSelect.vue';
import MoreActions from './MoreActions.vue';
import { useI18n } from 'vue-i18n';
import { useAppState } from '@/application/services/useAppState';

const props = defineProps<{
  /**
   * Team of the current note
   */
  team: Team;

  /**
   * Id of the current note
   */
  noteId: NoteId;

  /**
   * Id of the user who created the note
   */
  creatorId?: UserId;
}>();

const emit = defineEmits<{
  teamMemberRemoved: [id: TeamMember['user']['id']];
}>();

const { t } = useI18n();
const { user } = useAppState();

const roleOrder = {
  [MemberRole.Write]: 0,
  [MemberRole.Read]: 1,
};

/**
 * Creator first, then writers, then readers
 */
const sortedTeam = computed(() => [...props.team].sort((a, b) => {
  if (a.user.id === props.creatorId) {
    return -1;
  }
  if (b.user.id === props.creatorId) {
    return 1;
  }

  return roleOrder[a.role] - roleOrder[b.role];
}));
</script>

<style scoped>
.tag {
  padding: var(--spacing-xxs) var(--spacing-s);
  border-radius: var(--radius-s);
  background-color: var(--base--bg-secondary-hover);
  color: var(--base--text-secondary);
  margin-left: var(--spacing-xs);
}
</style>
