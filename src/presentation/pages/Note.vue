<template>
  <div>
    <NoteHeader>
      <template #left>
        <BreadCrumbs
          v-if="id !== null"
          :note-parents="noteParents"
        />
        <span
          v-else
          class="text-ui-base"
        >
          {{ t('note.new') }}
        </span>
      </template>
      <template #right>
        <Button
          v-if="saveStatus === 'error'"
          secondary
          icon="Warning"
          @click="flushSave"
        >
          {{ t('note.status.error') }}
        </Button>
        <span
          v-else-if="statusText"
          class="status text-ui-base"
        >
          {{ statusText }}
        </span>
        <span
          v-if="note && !canEdit"
          class="badge text-ui-small"
        >
          {{ t('note.readOnly') }}
        </span>
        <template v-if="id !== null && canEdit && note">
          <Button
            secondary
            icon="Plus"
            :title="t('note.createChildNote')"
            :aria-label="t('note.createChildNote')"
            @click="router.push(`/note/${id}/new`)"
          />
          <Button
            secondary
            @click="router.push(`/note/${id}/history`)"
          >
            {{ t('history.button') }}
          </Button>
          <Button
            secondary
            icon="EtcHorisontal"
            :title="t('noteSettings.title')"
            :aria-label="t('noteSettings.title')"
            @click="router.push(`/note/${id}/settings`)"
          />
        </template>
      </template>
    </NoteHeader>
    <PageBlock>
      <template #left>
        <VerticalMenu
          v-if="hasRelatedNotes"
          class="menu"
          :items="[verticalMenuItems]"
        />
      </template>
      <template #default>
        <div
          v-if="note === null || !isEditorReady"
          class="skeleton"
          aria-busy="true"
        >
          <div class="skeleton__line skeleton__line--title" />
          <div class="skeleton__line" />
          <div class="skeleton__line" />
          <div class="skeleton__line skeleton__line--short" />
        </div>
        <Editor
          v-else
          ref="editor"
          v-bind="editorConfig"
          @change="noteChanged"
          @input="hasUnreportedInput = true"
        />
      </template>
    </PageBlock>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, ref, toRef } from 'vue';
import { Button, Editor, PageBlock, VerticalMenu, type VerticalMenuItem } from '@codexteam/ui/vue';
import { useEventListener } from '@vueuse/core';
import useNote from '@/application/services/useNote';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import type { NoteContent } from '@/domain/entities/Note';
import { useI18n } from 'vue-i18n';
import { makeElementScreenshot } from '@/infrastructure/utils/screenshot';
import useNoteSettings from '@/application/services/useNoteSettings';
import { useNoteEditor } from '@/application/services/useNoteEditor';
import usePageTitle from '@/application/services/usePageTitle';
import NoteHeader from '@/presentation/components/note-header/NoteHeader.vue';
import BreadCrumbs from '@/presentation/components/breadcrumbs/BreadCrumbs.vue';
import type { NoteHierarchy } from '@/domain/entities/NoteHierarchy';
import { getTimeFromNow } from '@/infrastructure/utils/date.ts';

/**
 * Cover is re-rendered after the note stays unchanged for this long, html2canvas is too heavy to run on each save
 */
const COVER_DELAY = 5000;

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

const { note, noteTools, scheduleSave, flushSave, saveStatus, noteTitle, canEdit, noteParents, noteHierarchy } = useNote({
  id: noteId,
  withHierarchy: true,
});

const { updateCover } = useNoteSettings();

const { isEditorReady, editorConfig } = useNoteEditor({
  noteTools,
  noteContentResolver: () => note.value?.content,
  canEdit,
  autofocus: () => note.value !== null && !('id' in note.value),
});

/**
 * Editor component reference
 */
const editor = ref<typeof Editor | undefined>(undefined);

const statusText = computed(() => {
  switch (saveStatus.value) {
    case 'pending':
    case 'saving':
      return t('note.status.saving');
    case 'saved':
      return t('note.status.saved');
    default:
      return note.value && 'updatedAt' in note.value && note.value.updatedAt
        ? t('note.status.edited', { time: getTimeFromNow(note.value.updatedAt) })
        : '';
  }
});

let coverTimer: ReturnType<typeof setTimeout> | undefined;

let isCoverOutdated = false;

/**
 * Renders the note to a picture used as its cover in the notes list
 */
async function refreshCover(): Promise<void> {
  clearTimeout(coverTimer);

  const element = editor.value?.element as HTMLElement | null | undefined;
  const id = props.id;

  if (!isCoverOutdated || !element || id === null) {
    return;
  }

  isCoverOutdated = false;

  try {
    const cover = await makeElementScreenshot(element, {
      background: 'var(--base--bg-primary)',
      color: 'var(--base--text)',
      display: 'flex',
      justifyContent: 'center',
      width: '1200px',
      height: '900px',
      paddingTop: '100px',
    });

    if (cover !== null) {
      await flushSave();
      await updateCover(id, cover);
    }
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error('Failed to update the note cover', error);
  }
}

/**
 * Callback for editor change. Saves the note
 *
 * @param data - editor data
 */
function noteChanged(data: NoteContent): void {
  /**
   * Do not create a note until something is written
   */
  if (props.id === null && editor.value?.isEmpty() === true) {
    return;
  }

  scheduleSave(data, props.parentId);

  isCoverOutdated = true;
  clearTimeout(coverTimer);
  coverTimer = setTimeout(() => void refreshCover(), COVER_DELAY);
}

/**
 * Editor reports changes with a delay, so the latest input may not be reported yet
 */
let hasUnreportedInput = false;

/**
 * Takes the latest content from the editor and schedules its saving
 */
async function captureEditorContent(): Promise<void> {
  if (!hasUnreportedInput || !canEdit.value) {
    return;
  }

  hasUnreportedInput = false;

  const data: NoteContent | undefined = await editor.value?.save();

  if (data !== undefined) {
    noteChanged(data);
  }
}

/**
 * The editor still shows the note being left: save its latest content and render its cover
 */
async function beforeNoteLeave(): Promise<void> {
  await captureEditorContent();
  void refreshCover();
}

onBeforeRouteUpdate(beforeNoteLeave);
onBeforeRouteLeave(beforeNoteLeave);
onBeforeUnmount(() => clearTimeout(coverTimer));

/**
 * Ctrl/Cmd+S saves immediately instead of opening the browser "Save page" dialog
 */
useEventListener(document, 'keydown', (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault();
    void captureEditorContent().then(flushSave);
  }
});

/**
 * Recursively transform the note hierarchy into a VerticalMenuItem
 *
 * @param noteHierarchyObj - note hierarchy data
 * @returns {VerticalMenuItem} menu item
 */
function transformNoteHierarchy(noteHierarchyObj: NoteHierarchy): VerticalMenuItem {
  return {
    title: noteHierarchyObj.noteTitle || t('note.untitled'),
    isActive: route.path === `/note/${noteHierarchyObj.noteId}`,
    items: noteHierarchyObj.childNotes?.map(child => transformNoteHierarchy(child)),
    onActivate: () => {
      void router.push(`/note/${noteHierarchyObj.noteId}`);
    },
  };
}

/**
 * Sidebar is shown only when the note has a parent or children
 */
const hasRelatedNotes = computed(() => props.id !== null && (noteHierarchy.value?.childNotes?.length ?? 0) > 0);

const verticalMenuItems = computed<VerticalMenuItem>(() => transformNoteHierarchy(noteHierarchy.value!));

usePageTitle(() => (props.id === null ? t('note.new') : noteTitle.value));
</script>

<style scoped lang="postcss">
.menu {
  position: sticky;
  top: calc(var(--layout-navbar-height) + 52px + var(--spacing-l));
  height: fit-content;
  width: auto;
  max-width: 100%;
  max-height: calc(100vh - var(--layout-navbar-height) - 52px - var(--spacing-xxl));
  overflow-y: auto;
  box-sizing: border-box;
}

.status {
  color: var(--base--text-secondary);
  white-space: nowrap;
  margin-right: var(--spacing-xs);
}

.badge {
  padding: var(--spacing-xxs) var(--spacing-s);
  border-radius: var(--radius-s);
  background-color: var(--base--bg-secondary);
  color: var(--base--text-secondary);
}

.skeleton {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  padding-top: var(--spacing-xs);

  &__line {
    height: 14px;
    border-radius: var(--radius-s);
    background-color: color-mix(in srgb, var(--base--text-secondary) 12%, transparent);
    animation: pulse 1.4s ease-in-out infinite;

    &--title {
      height: 36px;
      width: 70%;
      margin-bottom: var(--spacing-l);
    }

    &--short {
      width: 40%;
    }
  }
}

@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
</style>
