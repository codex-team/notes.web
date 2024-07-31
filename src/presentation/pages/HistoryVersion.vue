<template>
  <div>
    <NoteHeader>
      <template #left>
        {{
          historyMeta && 'createdAt' in historyMeta && historyMeta.createdAt
            ? t('note.lastEdit') + ' ' + getTimeFromNow(historyMeta.createdAt)
            : t('note.lastEdit') + ' ' + 'a few seconds ago'
        }}
      </template>
      <template #right>
        <Button
          @click="useThisVersion"
        >
          {{
            t('history.useVersion')
          }}
        </Button>
        <!-- @todo add icon history to the button, it will be availible since codex icons 2.0 -->
        <Button
          secondary
          @click="router.push(`/note/${noteId}/history`)"
        >
          👁️
        </Button>
      </template>
    </NoteHeader>
    <Editor
      v-if="isEditorReady"
      ref="editor"
      v-bind="editorConfig"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRef, watch } from 'vue';
import { Editor, Button } from 'codex-ui/vue';
import NoteHeader from '@/presentation/components/note-header/NoteHeader.vue';
import useHistory from '@/application/services/useNoteHistory';
import { useNoteEditor } from '@/application/services/useNoteEditor';
import { getTimeFromNow, parseDate } from '@/infrastructure/utils/date';
import useNote from '@/application/services/useNote';
import { useI18n } from 'vue-i18n';
import useHeader from '@/application/services/useHeader';
import { useRoute, useRouter } from 'vue-router';
import { makeElementScreenshot } from '@/infrastructure/utils/screenshot';
import useNoteSettings from '@/application/services/useNoteSettings';

const props = defineProps<{
  noteId: string;
  historyId: number;
}>();

const route = useRoute();
const router = useRouter();

const noteId = toRef(props, 'noteId');
const historyId = toRef(props, 'historyId');

const { updateCover } = useNoteSettings();
const { t } = useI18n();
const { patchOpenedPageByUrl } = useHeader();
const { historyContent, historyTools, historyMeta } = useHistory({
  noteId: noteId,
  historyId: historyId,
});
const { noteTitle, save } = useNote({
  id: noteId,
});

const canEdit = ref(false);

const { isEditorReady, editorConfig } = useNoteEditor({
  noteTools: historyTools,
  isDraftResolver: () => false,
  noteContentResolver: () => historyContent.value,
  canEdit,
});

/**
 * Editor component reference
 */
const editor = ref<typeof Editor | undefined>(undefined);

async function useThisVersion() {
  if (window.confirm(t('noteSettings.revokeHashConfirmation'))) {
    let updatedNoteCover: Blob | null = null;

    /**
     * Get html element with note
     */
    const editorElement = editor.value ? editor.value.element : null;

    if (historyContent.value !== undefined) {
      await save(historyContent.value, undefined);
      /**
       * In case if we do not have note id, we can change its cover, and we need successful data for cover
       * We need to do it after saving in case of note creation
       */
      if (editorElement !== null) {
        updatedNoteCover = await makeElementScreenshot(editorElement, {
          background: 'var(--base--bg-primary)',
          color: 'var(--base--text)',
          display: 'flex',
          justifyContent: 'center',
          width: '1200px',
          height: '900px',
          paddingTop: '100px',
        });
      }
      if (updatedNoteCover !== null && props.noteId !== null) {
        updateCover(props.noteId, updatedNoteCover);
      }

      router.push(`/note/${noteId.value}`);
    }
  }
}

watch(noteTitle, (currentNoteTitle) => {
  if (historyMeta.value?.createdAt) {
    patchOpenedPageByUrl(
      route.path,
      {
        title: `Version ${parseDate(new Date(historyMeta.value?.createdAt))} (${currentNoteTitle})`,
        url: route.path,
      });
  }
});

</script>

<style scoped>
</style>