<template>
  <div>
    <Select
      v-model="selectedRole"
      :align="{ vertically: 'below', horizontally: 'right' }"
      :is-disabled="teamMember.user.id == user?.id || (note !== null && (note as Note).creatorId === teamMember.id)"
      :items="roleItems"
    />
  </div>
</template>

<script setup lang="ts">
import { MemberRole, TeamMember } from '@/domain/entities/Team.ts';
import { Note, NoteId } from '@/domain/entities/Note.ts';
import { computed, ref, watch } from 'vue';
import useNoteSettings from '@/application/services/useNoteSettings.ts';
import { useAppState } from '@/application/services/useAppState';
import { ContextMenuItem, DefaultItem, Select } from 'codex-ui/vue';
import useNote from '@/application/services/useNote.ts';

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

const selectedRole = ref<DefaultItem>({
  title: MemberRole[props.teamMember.role],
  onActivate: () => {},
});

const roleOptions = computed(() => Object.values(MemberRole).filter(value => typeof value === 'string'));
const roleItems: ContextMenuItem[] = [];

roleOptions.value.forEach((role) => {
  roleItems.push({
    title: role.toString(),
    onActivate: () => {},
  });
});

const { changeRole } = useNoteSettings();
const { note } = useNote({ id: props.noteId });
const { user } = useAppState();

/* Watch role's update */
watch(selectedRole, (newRole) => {
  updateMemberRole(newRole.title);
});
/**
 * Updates the user role if it has been changed
 *
 * @param updatedRole - new role needed to set
 */
async function updateMemberRole(updatedRole: string | any) {
  changeRole(props.noteId, props.teamMember.user.id, MemberRole[updatedRole as keyof typeof MemberRole]);
}
</script>

<style scoped>
</style>
