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
          <Button
            icon="Copy"
            @click="copy(invitationLink)"
          >
            {{ t('noteSettings.copyInviteLink') }}
          </Button>
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
import { Button, Row, Section } from 'codex-ui/vue';
import NoteSettings from '@/domain/entities/NoteSettings';

const { t } = useI18n();

const props = defineProps<{
  id: NoteId;
  noteSettings: NoteSettings;
}>();

const { revokeHash } = useNoteSettings();
const { copy } = useClipboard();

const invitationLink = computed(
  () => `${import.meta.env.VITE_PRODUCTION_HOSTNAME}/join/${invintationHash.value}`
);

const invintationHash = ref(props.noteSettings.invitationHash);

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
</style>
