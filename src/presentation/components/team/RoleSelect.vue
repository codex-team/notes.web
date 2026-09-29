<template>
  <Select
    v-model="selectedRole"
    :align="{ vertically: 'below', horizontally: 'right' }"
    :is-disabled="disabled === true"
    :items="roleItems"
  />
</template>

<script setup lang="ts">
import { MemberRole, type TeamMember } from '@/domain/entities/Team.ts';
import type { NoteId } from '@/domain/entities/Note.ts';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import useNoteSettings from '@/application/services/useNoteSettings.ts';
import { type DefaultItem, Select } from '@codexteam/ui/vue';

const props = defineProps<{
  /**
   * Team member data
   */
  teamMember: TeamMember;

  /**
   * Id of the current note
   */
  noteId: NoteId;

  /**
   * Role can not be changed, e.g. for the current user
   */
  disabled?: boolean;
}>();

const { t } = useI18n();
const { changeRole } = useNoteSettings();

const roles = [MemberRole.Read, MemberRole.Write];

const roleItems: DefaultItem[] = roles.map(role => ({
  title: t(`noteSettings.team.roles.${MemberRole[role]}`),
  onActivate: () => {},
}));

const selectedRole = ref<DefaultItem>(roleItems[roles.indexOf(props.teamMember.role)]);

watch(selectedRole, async (newItem, oldItem) => {
  try {
    await changeRole(props.noteId, props.teamMember.user.id, roles[roleItems.indexOf(newItem)]);
  } catch (error) {
    selectedRole.value = oldItem;
    throw error;
  }
});
</script>
