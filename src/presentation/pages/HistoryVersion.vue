<template>
  <div>
    <NoteHeader>
      <template #left>
        <Button
          secondary
          icon="ChevronLeft"
          @click="router.push(`/note/${noteId}/history`)"
        >
          {{ t('history.title') }}
        </Button>
        <div
          v-if="historyMeta"
          :class="[$style['head-meta'], 'text-ui-base']"
        >
          <Avatar
            :src="historyMeta.user.photo"
            :username="historyMeta.user.name"
            size="small"
          />
          <span :class="$style['head-meta__text']">
            {{ t('history.editedBy', { name: historyMeta.user.name, time: parseDate(new Date(historyMeta.createdAt)) }) }}
          </span>
        </div>
      </template>
      <template #right>
        <span
          v-if="saveStatus === 'error'"
          :class="[$style['error'], 'text-ui-base']"
        >
          {{ t('history.restoreError') }}
        </span>
        <Button
          icon="Undo"
          @click="restoreVersion"
        >
          {{ t('history.useVersion') }}
        </Button>
      </template>
    </NoteHeader>
    <PageBlock>
      <Editor
        v-if="isEditorReady"
        ref="editor"
        v-bind="editorConfig"
      />
    </PageBlock>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRef } from 'vue';
import { Editor, Button, Avatar, PageBlock, useConfirm } from '@codexteam/ui/vue';
import NoteHeader from '@/presentation/components/note-header/NoteHeader.vue';
import useHistory from '@/application/services/useNoteHistory';
import { useNoteEditor } from '@/application/services/useNoteEditor';
import { parseDate } from '@/infrastructure/utils/date';
import useNote from '@/application/services/useNote';
import usePageTitle from '@/application/services/usePageTitle';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { makeElementScreenshot } from '@/infrastructure/utils/screenshot';
import useNoteSettings from '@/application/services/useNoteSettings';

const props = defineProps<{
  noteId: string;
  historyId: number;
}>();

const router = useRouter();

const noteId = toRef(props, 'noteId');
const historyId = toRef(props, 'historyId');

const { updateCover } = useNoteSettings();
const { t } = useI18n();
const { confirm } = useConfirm();
const { historyContent, historyTools, historyMeta } = useHistory({
  noteId: noteId,
  historyId: historyId,
});
const { noteTitle, scheduleSave, flushSave, saveStatus } = useNote({
  id: noteId,
});

const { isEditorReady, editorConfig } = useNoteEditor({
  noteTools: historyTools,
  noteContentResolver: () => historyContent.value,
  canEdit: ref(false),
});

/**
 * Editor component reference
 */
const editor = ref<typeof Editor | undefined>(undefined);

/**
 * Replaces the note content with this version
 */
async function restoreVersion() {
  const isConfirmed = await confirm(t('history.useVersion'), t('history.confirmVersionRestore'), {
    confirmText: t('history.restore'),
    cancelText: t('cancel'),
  });

  if (!isConfirmed || historyContent.value === undefined) {
    return;
  }

  const editorElement = editor.value?.element as HTMLElement | null | undefined;
  const cover = editorElement
    ? makeElementScreenshot(editorElement, {
      background: 'var(--base--bg-primary)',
      color: 'var(--base--text)',
      display: 'flex',
      justifyContent: 'center',
      width: '1200px',
      height: '900px',
      paddingTop: '100px',
    })
    : null;

  scheduleSave(historyContent.value);
  await flushSave();

  if (saveStatus.value === 'error') {
    return;
  }

  /* eslint-disable-next-line no-console */
  void cover?.then(blob => blob && updateCover(props.noteId, blob)).catch(console.error);
  void router.push(`/note/${noteId.value}`);
}

usePageTitle(() => `${t('history.version')} · ${noteTitle.value}`);
</script>

<style module lang="postcss">
.head-meta {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: var(--spacing-s);
  padding: 0 var(--spacing-s);

  &__text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.error {
  color: var(--red--solid);
}
</style>
