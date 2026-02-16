<template>
  <button
    ref="triggerButton"
    :title="t('noteSettings.team.contextMenu.title')"
    class="more-actions-button"
    @click="handleButtonClick"
  >
    <Icon
      name="EtcVertical"
    />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon, ContextMenu, usePopover, useConfirm, type ContextMenuItem } from '@codexteam/ui/vue';
import { type TeamMember } from '@/domain/entities/Team';
import { useI18n } from 'vue-i18n';
import { NoteId } from '@/domain/entities/Note';
import useNoteSettings from '@/application/services/useNoteSettings';

const { removeMemberByUserId } = useNoteSettings();

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

const { t } = useI18n();
const { showPopover, hide } = usePopover();
const { confirm } = useConfirm();

const triggerButton = ref<HTMLButtonElement>();

const menuItems: ContextMenuItem[] = [
  {
    title: t('noteSettings.team.contextMenu.remove'),
    onActivate: async () => {
      hide();
      await handleRemove(props.teamMember);
    },
  },
];

const emit = defineEmits<{
  teamMemberRemoved: [userId: TeamMember['user']['id']];
}>();

const handleButtonClick = (): void => {
  if (triggerButton.value) {
    showPopover({
      targetEl: triggerButton.value,
      with: {
        component: ContextMenu,
        props: {
          items: menuItems,
        },
      },
      align: {
        vertically: 'below',
        horizontally: 'right',
      },
      width: 'auto',
    });
  }
};

/**
 * Remove team member by user id
 *
 * @param member - team member to remove
 */
const handleRemove = async (member: TeamMember): Promise<void> => {
  const shouldRemove = await confirm(
    t('noteSettings.team.removeMemberConfirmationTitle'),
    t('noteSettings.team.removeMemberConfirmationBody', { username: member.user.name })
  );

  if (shouldRemove) {
    const isDeleted = await removeMemberByUserId(props.noteId, member.user.id);

    if (isDeleted) {
      emit('teamMemberRemoved', member.user.id);
    }
  }
};
</script>

<style scoped>
.more-actions-button {
  color: var(--ct-text-color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
}
</style>
