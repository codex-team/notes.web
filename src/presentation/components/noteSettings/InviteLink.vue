<template>
  <Row :title="invitationLink">
    <template #right>
      <div class="buttons">
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
          Copy
        </Button>
      </div>
    </template>
  </Row>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { computed, defineProps } from 'vue';
import useNoteSettings from '@/application/services/useNoteSettings';
import type { NoteId } from '@/domain/entities/Note';
import { useI18n } from 'vue-i18n';
import { Button, Row } from 'codex-ui/vue';

const { t } = useI18n();

const props = defineProps<{
  id: NoteId;
}>();

const { noteSettings, revokeHash } = useNoteSettings();
const { copy } = useClipboard();

const invitationLink = computed(
  () => `${import.meta.env.VITE_PRODUCTION_HOSTNAME}/join/${noteSettings.value?.invitationHash}`
);

/**
 * Regenerate invitation hash
 */
async function regenerateHash() {
  revokeHash(props.id);
}

</script>

<style scoped lang="postcss">
buttons{
  display: flex;
  flex-direction: row;
  gap: var(--h-padding);
}
</style>
