<template>
  <Section
    :title="t('noteSettings.inviteCollaboratorTitle')"
    :caption="t('noteSettings.inviteCollaboratorCaption')"
  >
    <div class="invite">
      <code
        class="invite__link text-ui-base"
        :title="invitationLink"
      >{{ invitationLink }}</code>
      <div class="invite__buttons">
        <Button
          icon="Replace"
          secondary
          @click="regenerateHash"
        >
          {{ t('noteSettings.revokeHashButton') }}
        </Button>
        <Button
          :icon="copied ? 'Check' : 'Copy'"
          @click="copy(invitationLink)"
        >
          {{ copied ? t('noteSettings.copied') : t('noteSettings.copyInviteLink') }}
        </Button>
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { computed, ref } from 'vue';
import useNoteSettings from '@/application/services/useNoteSettings';
import type { NoteId } from '@/domain/entities/Note';
import { useI18n } from 'vue-i18n';
import { Button, Section, useConfirm } from '@codexteam/ui/vue';

const props = defineProps<{
  id: NoteId;
  invitationHash: string;
}>();

const { t } = useI18n();
const { revokeHash } = useNoteSettings();
const { copy, copied } = useClipboard({ legacy: true });
const { confirm } = useConfirm();

const hash = ref(props.invitationHash);

const invitationLink = computed(
  () => `${location.origin}/join/${hash.value}`
);

/**
 * Regenerate invitation hash, the old link stops working
 */
async function regenerateHash() {
  const isConfirmed = await confirm(t('noteSettings.revokeHashTitle'), t('noteSettings.revokeHashConfirmation'), {
    confirmText: t('noteSettings.revokeHashButton'),
    cancelText: t('cancel'),
    destructive: true,
  });

  if (isConfirmed) {
    hash.value = await revokeHash(props.id);
  }
}
</script>

<style scoped lang="postcss">
.invite {
  display: flex;
  align-items: center;
  gap: var(--spacing-m);
  padding: var(--v-padding) var(--v-padding) var(--v-padding) var(--h-padding);

  &__link {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 0.866rem;
    color: var(--base--text);
  }

  &__buttons {
    display: flex;
    flex-shrink: 0;
    gap: var(--spacing-s);
  }
}
</style>
