<template>
  <div>
    <NoteHeader
      :style="{ '--opacity': id && note ? 1 : 0 }"
    >
      <template #left>
        <BreadCrumbs
          :note-parents="noteParents"
        />
      </template>
      <template #right>
        <div class="last_edit">
          {{
            note && 'updatedAt' in note && note.updatedAt
              ? t('note.lastEdit') + ' ' + getTimeFromNow(note.updatedAt)
              : t('note.lastEdit') + ' ' + 'a few seconds ago'
          }}
        </div>
        <!-- @todo when user clicks on + button to add new note the user should see the previous note heirarchy -->
        <Button
          v-if="canEdit"
          secondary
          icon="Plus"
          @click="createChildNote"
        />
        <!-- @todo add icon history to the button, it will be availible since codex icons 2.0 -->
        <Button
          v-if="canEdit"
          secondary
          @click="router.push(`/note/${noteId}/history`)"
        >
          History
        </Button>
        <Button
          v-if="canEdit"
          secondary
          icon="EtcHorisontal"
          @click="redirectToNoteSettings"
        />
      </template>
    </NoteHeader>
    <div v-if="note === null">
      Loading...
    </div>
    <div v-else>
      <PageBlock>
        <template #left>
          <VerticalMenu
            class="menu"
            :items="[verticalMenuItems]"
          />
        </template>
        <template #default>
          <Editor
            v-if="isEditorReady"
            ref="editor"
            v-bind="editorConfig"
            @change="noteChanged"
          />
        </template>
      </PageBlock>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRef, watch } from 'vue';
import { Button, Editor, PageBlock, VerticalMenu, type VerticalMenuItem } from '@codexteam/ui/vue';
import useNote from '@/application/services/useNote';
import { useRoute, useRouter } from 'vue-router';
import { NoteContent } from '@/domain/entities/Note';
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { makeElementScreenshot } from '@/infrastructure/utils/screenshot';
import useNoteSettings from '@/application/services/useNoteSettings';
import { useNoteEditor } from '@/application/services/useNoteEditor';
import NoteHeader from '@/presentation/components/note-header/NoteHeader.vue';
import BreadCrumbs from '@/presentation/components/breadcrumbs/BreadCrumbs.vue';
import { NoteHierarchy } from '@/domain/entities/NoteHierarchy';
import { getTimeFromNow } from '@/infrastructure/utils/date.ts';

const { t } = useI18n();

const router = useRouter();

const route = useRoute();

const props = defineProps<{
  /**
   * Null for new note, id for reading existing note
   */
  id: string | null;

  /**
   * Parent note id, undefined for root note
   */
  parentId?: string;
}>();

const noteId = toRef(props, 'id');

const { note, noteTools, save, noteTitle, canEdit, noteParents, noteHierarchy } = useNote({
  id: noteId,
});

/**
 * Create new child note
 */
function createChildNote(): void {
  if (props.id === null) {
    throw new Error('Note is Empty');
  }
  router.push(`/note/${props.id}/new`);
}

/**
 * Move to note settings
 */
function redirectToNoteSettings(): void {
  if (props.id === null) {
    throw new Error('Note is Empty');
  }
  router.push(`/note/${props.id}/settings`);
}

const { updateCover } = useNoteSettings();

const { isEditorReady, editorConfig } = useNoteEditor({
  noteTools,
  isDraftResolver: () => noteId.value === null,
  noteContentResolver: () => note.value?.content,
  canEdit,
});

/**
 * Editor component reference
 */
const editor = ref<typeof Editor | undefined>(undefined);

/**
 * Callback for editor change. Saves the note
 *
 * @param data - editor data
 */
async function noteChanged(data: NoteContent): Promise<void> {
  const isEmpty = editor.value?.isEmpty();

  let updatedNoteCover: Blob | null = null;

  /**
   * Get html element with note
   */
  const editorElement = editor.value ? editor.value.element : null;

  if (!isEmpty) {
    await save(data, props.parentId);
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
    if (updatedNoteCover !== null && props.id !== null) {
      await updateCover(props.id, updatedNoteCover);
    }
  }
}

/**
 * Recursively transform the note hierarchy into a VerticalMenuItem
 *
 * @param noteHierarchyObj - note hierarchy data
 * @param currentNoteTitle - actual title of note
 * @returns menuItem  - VerticalMenuItem
 */

function transformNoteHierarchy(noteHierarchyObj: NoteHierarchy | null, currentNoteTitle: string): VerticalMenuItem {
  if (!noteHierarchyObj) {
    return {
      title: 'Untitled',
      isActive: true,
      items: undefined,
    };
  }

  // Transform the current note into a VerticalMenuItem
  return {
    title: noteHierarchyObj?.noteTitle || 'Untitled',
    isActive: route.path === `/note/${noteHierarchyObj.noteId}`,
    items: noteHierarchyObj.childNotes ? noteHierarchyObj.childNotes.map(child => transformNoteHierarchy(child, currentNoteTitle)) : undefined,
    onActivate: () => {
      void router.push(`/note/${noteHierarchyObj.noteId}`);
    },
  };
}

const verticalMenuItems = computed<VerticalMenuItem>(() => {
  return transformNoteHierarchy(noteHierarchy.value, noteTitle.value);
});

watch(
  () => props.id,
  () => {
    /** If new child note is created, refresh editor with empty data */
    if (props.id === null) {
      useHead({
        title: t('note.new'),
      });
    }
  },
  { immediate: true }
);

watch(noteTitle, () => {
  if (props.id !== null) {
    useHead({
      title: noteTitle.value,
    });
  }
});

</script>

<style scoped>
.menu {
  flex-shrink: 0;
  height: fit-content;
  width: auto;
}

.last_edit {
  color: var(--base--text-secondary);
  padding-right: var(--h-padding);
}
</style>
