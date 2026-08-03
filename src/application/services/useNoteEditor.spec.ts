import { defineComponent, nextTick, ref } from 'vue';
import { mount, flushPromises } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useNoteEditor } from './useNoteEditor';
import type EditorTool from '@/domain/entities/EditorTool';
import type { EditorToolLoaded } from '@/domain/entities/EditorTool';
import { editorToolsService } from '@/domain';
import { useAppState } from './useAppState';
import i18n from '@/application/i18n';

vi.mock('@/domain', () => ({
  editorToolsService: {
    getToolsLoaded: vi.fn(),
  },
}));

vi.mock('./useAppState', () => ({
  useAppState: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useAppState).mockReturnValue({
    user: ref(null),
    userEditorTools: ref([]),
  });
});

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
type Options = Parameters<typeof useNoteEditor>[0];

function makeTool(name: string): EditorTool {
  return {
    id: name,
    name,
    title: name,
    exportName: name,
    userId: null,
    source: {
      cdn: `https://cdn.example.com/${name}.js`,
    },
  };
}

function makeLoadedTool(name: string): EditorToolLoaded {
  return {
    class: {} as EditorToolLoaded['class'],
    tool: makeTool(name),
  };
}

interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
}

function createDeferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve,
    reject,
  };
}

/**
 * `wrapper.vm` auto-unwraps the refs returned from `setup()`, so this mirrors
 * useNoteEditor's return shape with plain values instead of Ref<...>.
 */
interface NoteEditorState {
  isEditorReady: boolean;
  editorConfig: Record<string, unknown>;
}

interface EditorConfigShape {
  tools?: Record<string, unknown>;
  readOnly?: boolean;
}

function mountNoteEditor(options: Options, onError?: (error: unknown) => void): ReturnType<typeof mount> {
  const TestComponent = defineComponent({
    setup() {
      return useNoteEditor(options);
    },
    render: () => null,
  });

  return mount(TestComponent, {
    global: {
      plugins: [i18n],
      config: {
        // A watcher's own component has no ancestor to catch its errors via
        // onErrorCaptured, so we hook the app-level handler instead.
        errorHandler: onError,
      },
    },
  });
}

function getState(wrapper: ReturnType<typeof mount>): NoteEditorState {
  return wrapper.vm as unknown as NoteEditorState;
}

function getEditorConfig(wrapper: ReturnType<typeof mount>): EditorConfigShape {
  return getState(wrapper).editorConfig as EditorConfigShape;
}

describe('useNoteEditor', () => {
  it('should discard a tools-load result that resolves after a newer one has already superseded it', async () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const getToolsLoaded = vi.mocked(editorToolsService.getToolsLoaded);
    const deferredA = createDeferred<EditorToolLoaded[]>();
    const deferredB = createDeferred<EditorToolLoaded[]>();

    getToolsLoaded
      .mockImplementationOnce(() => deferredA.promise)
      .mockImplementationOnce(() => deferredB.promise);

    const noteTools = ref<EditorTool[] | undefined>([makeTool('toolA')]);
    const wrapper = mountNoteEditor({
      noteTools,
      noteContentResolver: () => undefined,
      isDraftResolver: () => false,
      canEdit: ref(true),
    });

    await flushPromises();

    noteTools.value = [makeTool('toolB')];
    await flushPromises();

    expect(getToolsLoaded).toHaveBeenCalledTimes(2);

    // Resolve the newer (B) request first, then the stale (A) one — simulates
    // rapid note switching where an earlier download finishes last.
    deferredB.resolve([makeLoadedTool('toolB')]);
    await flushPromises();

    deferredA.resolve([makeLoadedTool('toolA')]);
    await flushPromises();

    const tools = getEditorConfig(wrapper).tools;

    expect(tools).toHaveProperty('toolB');
    expect(tools).not.toHaveProperty('toolA');
    expect(getState(wrapper).isEditorReady).toBe(true);
  });

  it('should mark the editor ready with default tools when loading tools fails', async () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const getToolsLoaded = vi.mocked(editorToolsService.getToolsLoaded);

    getToolsLoaded.mockRejectedValueOnce(new Error('network down'));

    const capturedErrors: unknown[] = [];
    const noteTools = ref<EditorTool[] | undefined>([makeTool('toolA')]);
    const wrapper = mountNoteEditor({
      noteTools,
      noteContentResolver: () => undefined,
      isDraftResolver: () => false,
      canEdit: ref(true),
    }, error => capturedErrors.push(error));

    await flushPromises();

    expect(capturedErrors).toHaveLength(1);
    expect(getState(wrapper).isEditorReady).toBe(true);
    expect(getEditorConfig(wrapper).tools).toBeUndefined();
  });

  it('should ignore note tools and use only user tools when the note is a draft', async () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const getToolsLoaded = vi.mocked(editorToolsService.getToolsLoaded);

    getToolsLoaded.mockResolvedValueOnce([makeLoadedTool('userOnly')]);
    vi.mocked(useAppState).mockReturnValue({
      user: ref(null),
      userEditorTools: ref([makeTool('userOnly')]),
    });

    const wrapper = mountNoteEditor({
      noteTools: ref([makeTool('noteOnly')]),
      noteContentResolver: () => undefined,
      isDraftResolver: () => true,
      canEdit: ref(true),
    });

    await flushPromises();

    expect(getToolsLoaded).toHaveBeenCalledWith([makeTool('userOnly')]);
    expect(getEditorConfig(wrapper).tools).toHaveProperty('userOnly');
  });

  it('should let a user tool override a note tool with the same name', async () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const getToolsLoaded = vi.mocked(editorToolsService.getToolsLoaded);

    getToolsLoaded.mockResolvedValueOnce([]);

    const noteVersion = makeTool('shared');
    const userVersion = {
      ...makeTool('shared'),
      id: 'shared-user',
    };

    vi.mocked(useAppState).mockReturnValue({
      user: ref(null),
      userEditorTools: ref([userVersion]),
    });

    mountNoteEditor({
      noteTools: ref([noteVersion]),
      noteContentResolver: () => undefined,
      isDraftResolver: () => false,
      canEdit: ref(true),
    });

    await flushPromises();

    expect(getToolsLoaded).toHaveBeenCalledWith([userVersion]);
  });

  it('should not start loading tools while note tools are not yet resolved', async () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const getToolsLoaded = vi.mocked(editorToolsService.getToolsLoaded);

    const wrapper = mountNoteEditor({
      noteTools: ref<EditorTool[] | undefined>(undefined),
      noteContentResolver: () => undefined,
      isDraftResolver: () => false,
      canEdit: ref(true),
    });

    await flushPromises();

    expect(getToolsLoaded).not.toHaveBeenCalled();
    expect(getState(wrapper).isEditorReady).toBe(false);
  });

  it('should reflect canEdit changes in editorConfig.readOnly', async () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const getToolsLoaded = vi.mocked(editorToolsService.getToolsLoaded);

    getToolsLoaded.mockResolvedValueOnce([]);

    const canEdit = ref(true);
    const wrapper = mountNoteEditor({
      noteTools: ref([]),
      noteContentResolver: () => undefined,
      isDraftResolver: () => false,
      canEdit,
    });

    await flushPromises();
    expect(getEditorConfig(wrapper).readOnly).toBe(false);

    canEdit.value = false;
    await nextTick();
    expect(getEditorConfig(wrapper).readOnly).toBe(true);
  });
});
