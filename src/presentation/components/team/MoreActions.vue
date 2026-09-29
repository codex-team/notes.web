<template>
  <button
    ref="triggerButton"
    :title="t('noteSettings.team.contextMenu.title')"
    :aria-label="t('noteSettings.team.contextMenu.title')"
    class="more-actions-button"
    @click="handleButtonClick"
  >
    <Icon name="EtcVertical" />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon, ContextMenu, usePopover, useConfirm, type ContextMenuItem } from '@codexteam/ui/vue';
import type { TeamMember } from '@/domain/entities/Team';
import { useI18n } from 'vue-i18n';
import type { NoteId } from '@/domain/entities/Note';
import useNoteSettings from '@/application/services/useNoteSettings';

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

const emit = defineEmits<{
  teamMemberRemoved: [userId: TeamMember['user']['id']];
}>();

const { removeMemberByUserId } = useNoteSettings();
const { t } = useI18n();
const { showPopover, hide } = usePopover();
const { confirm } = useConfirm();

const triggerButton = ref<HTMLButtonElement>();

/**
 * Asks for confirmation and removes the member from the team
 */
async function handleRemove(): Promise<void> {
  const member = props.teamMember;
  const shouldRemove = await confirm(
    t('noteSettings.team.removeMemberConfirmationTitle'),
    t('noteSettings.team.removeMemberConfirmationBody', { username: member.user.name || member.user.email }),
    {
      confirmText: t('noteSettings.team.contextMenu.remove'),
      cancelText: t('cancel'),
      destructive: true,
    }
  );

  if (shouldRemove && await removeMemberByUserId(props.noteId, member.user.id)) {
    emit('teamMemberRemoved', member.user.id);
  }
}

const menuItems: ContextMenuItem[] = [{
  title: t('noteSettings.team.contextMenu.remove'),
  icon: 'Trash',
  onActivate: () => {
    hide();
    void handleRemove();
  },
}];

function handleButtonClick(): void {
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
</script>

<style scoped>
.more-actions-button {
  color: var(--base--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xs);
  margin-left: var(--spacing-xxs);
  border-radius: var(--radius-m);
  cursor: pointer;

  &:hover {
    color: var(--base--text);
    background-color: var(--base--bg-secondary-hover);
  }
}
</style>
