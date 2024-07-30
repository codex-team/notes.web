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
        <!-- @todo add icon history to the button, it will be availible since codex icons 2.0 -->
        <Button
          secondary
          @click="router.push(`/note/${noteId}/history`)"
        >
          history
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
import { until } from '@vueuse/core';
import { Editor, Button } from 'codex-ui/vue';
import NoteHeader from '@/presentation/components/note-header/NoteHeader.vue';
import useHistory from '@/application/services/useNoteHistory';
import { useNoteEditor } from '@/application/services/useNoteEditor';
import { getTimeFromNow, parseDate } from '@/infrastructure/utils/date';
import useNote from '@/application/services/useNote';
import { useI18n } from 'vue-i18n';
import useHeader from '@/application/services/useHeader';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{
  noteId: string;
  historyId: number;
}>();

const { t } = useI18n();
const { patchOpenedPageByUrl } = useHeader();

const route = useRoute();
const router = useRouter();

const noteId = toRef(props, 'noteId');
const historyId = toRef(props, 'historyId');

const { historyContent, historyTools, historyMeta } = useHistory({
  noteId: noteId,
  historyId: historyId,
});

const { noteTitle } = useNote({
  id: noteId,
});

const canEdit = ref(false);

watch(historyContent, async (c) => {
  console.log('new content', c);
  await until(c).not.toBe(undefined);
  console.log('new content awaited', c);
}, {
  immediate: true,
});

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

const { isEditorReady, editorConfig } = useNoteEditor({
  noteTools: historyTools,
  isDraftResolver: () => noteId.value === null,
  noteContentResolver: () => historyContent.value,
  canEdit,
});

console.log('editor used', historyContent.value);

</script>

<style scoped>
</style>
