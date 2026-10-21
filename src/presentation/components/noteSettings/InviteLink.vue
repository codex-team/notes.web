<template>
  <Section
    :title="t('noteSettings.inviteCollaboratorTitle')"
    :caption="t('noteSettings.inviteCollaboratorCaption')"
  >
    <Row :title="invitationLink">
      <template #right>
        <div
          class="buttons"
          data-dimensions="medium"
        >
          <Button
            icon="Replace"
            secondary
            @click="regenerateHash"
          >
            {{ t('noteSettings.revokeHashButton') }}
          </Button>
          <span class="copy-wrapper">
            <Button
              icon="Copy"
              @click="copy(invitationLink)"
            >
              {{ t('noteSettings.copyInviteLink') }}
            </Button>
            <span
              v-if="copied"
              class="copy-tooltip"
              role="status"
            >
              {{ t('noteSettings.inviteLinkCopied') }}
            </span>
          </span>
        </div>
      </template>
    </Row>
  </Section>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { computed, defineProps, ref } from 'vue';
import useNoteSettings from '@/application/services/useNoteSettings';
import type { NoteId } from '@/domain/entities/Note';
import { useI18n } from 'vue-i18n';
import { Button, Row, Section } from '@codexteam/ui/vue';

const { t } = useI18n();

const props = defineProps<{
  id: NoteId;
  invintationHash: string;
}>();

const { revokeHash } = useNoteSettings();
const { copy, copied } = useClipboard();

const invitationLink = computed(
  () => `https://${import.meta.env.VITE_PRODUCTION_HOSTNAME}/join/${invintationHash.value}`
);

const invintationHash = ref(props.invintationHash);

/**
 * Regenerate invitation hash
 */
async function regenerateHash() {
  const isConfirmed = window.confirm(t('noteSettings.revokeHashConfirmation'));

  if (isConfirmed) {
    invintationHash.value = await revokeHash(props.id);
  }
}

</script>

<style scoped lang="postcss">
.buttons {
  display: flex;
  flex-direction: row;
  gap: var(--h-padding);
}

.copy-wrapper {
  position: relative;
}

.copy-tooltip {
  position: absolute;
  bottom: calc(100% + var(--spacing-xs));
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  pointer-events: none;
  padding: var(--spacing-xxs) var(--spacing-xs);
  background-color: var(--base--bg-secondary);
  border: 1px solid var(--base--border);
  border-radius: var(--radius-field);
}
</style>
