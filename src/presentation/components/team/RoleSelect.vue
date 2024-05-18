<template>
  <div v-if="teamMember.user.id != user?.id">
    <select
      v-model="selectedRole"
      @change="updateMemberRole"
    >
      <option
        v-for="(role, index) in roleOptions"
        :key="index"
        :value="role"
      >
        {{ t(`noteSettings.team.roles.${role}`) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { MemberRole, TeamMember } from '@/domain/entities/Team.ts';
import { NoteId } from '@/domain/entities/Note.ts';
import { computed, ref } from 'vue';
import useNoteSettings from '@/application/services/useNoteSettings.ts';
import { useAppState } from '@/application/services/useAppState';
import { useI18n } from 'vue-i18n';

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
  noteId: NoteId;
}>();

const selectedRole = ref(MemberRole[props.teamMember.role]);

const roleOptions = computed(() => Object.values(MemberRole).filter(value => typeof value === 'string'));

const { changeRole } = useNoteSettings();

const { user } = useAppState();

const { t } = useI18n();

/**
 * Updates the user role if it has been changed
 */
async function updateMemberRole() {
  changeRole(props.noteId, props.teamMember.user.id, MemberRole[selectedRole.value as keyof typeof MemberRole]);
}
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
