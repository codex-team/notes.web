<template>
  <li class="member">
    <div class="member-name">
      {{ teamMember.user.name }}
    </div>
    <div v-if="teamMember.id != 1">
      <Checkbox
        :checked="teamMember.role === 1"
        :label="t('noteSettings.team.canEdit')"
        @update:checked="changeMemberRole"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import Checkbox from '@/presentation/components/checkbox/Checkbox.vue';
import { TeamMember } from '@/domain/entities/Team.ts';
import { useI18n } from 'vue-i18n';
import useNoteSettings from '@/application/services/useNoteSettings';
import { NoteId } from '@/domain/entities/Note';

/**
 * TeamMember props
 */
const props = defineProps<{
  /**
   * Team member data
   */
  teamMember: TeamMember;
  /**
   * Id of the current note
   */
  id: NoteId;
}>();

const { changeRole } = useNoteSettings();

/**
 * Change member role
 */
async function changeMemberRole() {
  changeRole(props.id, props.teamMember.user.id, props.teamMember.role);
}

const { t } = useI18n();
</script>

<style scoped>
.member {
  margin-top: var(--spacing-l);
}
.member-name {
  display: flex;
  align-items: center;
  gap: var(--spacing-very-x);
}
</style>
