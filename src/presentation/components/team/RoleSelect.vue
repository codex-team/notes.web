<template>
  <div v-if="teamMember.user.id != user?.id">
    <Select
      :items="roleItems"
      :default-item="defaultRole"
      @value-update="(updatedRole) => updateMemberRole(updatedRole)"
    />
  </div>
</template>

<script setup lang="ts">
import { MemberRole, TeamMember } from '@/domain/entities/Team.ts';
import { NoteId } from '@/domain/entities/Note.ts';
import { computed, ref } from 'vue';
import useNoteSettings from '@/application/services/useNoteSettings.ts';
import { useAppState } from '@/application/services/useAppState';
import { useI18n } from 'vue-i18n';
import { ContextMenuItem, DefaultItem, Select } from 'codex-ui/vue';

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
const defaultRole: DefaultItem = {
  title: selectedRole.value,
  onActivate: () => {},
};

const roleOptions = computed(() => Object.values(MemberRole).filter(value => typeof value === 'string'));
const roleItems: ContextMenuItem[] = [];

roleOptions.value.forEach((role) => {
  roleItems.push({
    title: role.toString(),
    onActivate: () => {},
  });
});

const { changeRole } = useNoteSettings();

const { user } = useAppState();

const { t } = useI18n();

/**
 * Updates the user role if it has been changed
 */
async function updateMemberRole(updatedRole: DefaultItem | any) {
  changeRole(props.noteId, props.teamMember.user.id, MemberRole[updatedRole.title as keyof typeof MemberRole]);
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
