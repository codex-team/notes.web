<template>
  <PageHeader>
    Editor
    <template #description>
      Component for creating a rich text content using Editor.js
    </template>
  </PageHeader>

  <Tabbar
    :tabs="[{
      title: 'Empty',
      id: 'empty',
      isActive: editoMockType === 'empty',
    }, {
      title: 'With content',
      id: 'filled',
      isActive: editoMockType === 'filled',
    }]"
    @click="editoMockType = $event.id as 'empty' | 'filled'"
  />

  <br>
  <br>

  <Editor
    :tools="{
      header: {
        class: Header,
        config: {
          placeholder: 'Heading',
          inlineToolbar: true,
        },
      },
      list: {
        class: NestedList,
        inlineToolbar: true,
      },
    }"
    :data="editorData"
    placeholder="Write something or press / to select a tool"
    first-block-placeholder="Untitled"
    autofocus
  />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Editor, Tabbar } from '../../../src/vue';
import Header from '@editorjs/header';
// ts-expect-error
import NestedList from '@editorjs/nested-list';
import { ref, watch } from 'vue';
import { type OutputData } from '@editorjs/editorjs';

const emptyEditorData = {
  blocks: [
    {
      id: 'zcKCF1S7X8',
      type: 'header',
      data: {
        text: '',
        level: 1,
      },
    },
  ],
};

const filledEditorData = {
  blocks: [
    {
      id: 'zcKCF1S7X8',
      type: 'header',
      data: {
        text: 'Editor.js',
        level: 1,
      },
    },
    {
      id: 'b6ji-DvaKb',
      type: 'paragraph',
      data: {
        text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
      },
    },
    {
      type: 'header',
      id: '7ItVl5biRo',
      data: {
        text: 'Key features',
        level: 2,
      },
    },
    {
      type: 'list',
      id: 'SSBSguGvP7',
      data: {
        items: [
          {
            content: 'It is a block-styled editor',
            items: [],
          },
          {
            content: 'It returns clean data output in JSON',
            items: [],
          },
          {
            content: 'Designed to be extendable and pluggable with a simple API',
            items: [],
          },
        ],
        style: 'unordered',
      },
    },
    {
      type: 'header',
      id: 'QZFox1m_ul',
      data: {
        text: 'What does it mean «block-styled editor»',
        level: 2,
      },
    },
    {
      type: 'paragraph',
      id: 'bwnFX5LoX7',
      data: {
        text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
      },
    },
    {
      type: 'paragraph',
      id: 'mTrPOHAQTe',
      data: {
        text: `There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.`,
      },
    },
    {
      type: 'header',
      id: '1sYMhUrznu',
      data: {
        text: 'What does it mean clean data output',
        level: 2,
      },
    },
    {
      type: 'paragraph',
      id: 'jpd7WEXrJG',
      data: {
        text: 'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below',
      },
    },
    {
      type: 'paragraph',
      id: '0lOGNUKxqt',
      data: {
        text: `Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.`,
      },
    },
    {
      type: 'paragraph',
      id: 'WvX7kBjp0I',
      data: {
        text: 'Clean data is useful to sanitize, validate and process on the backend.',
      },
    },
    {
      type: 'delimiter',
      id: 'H9LWKQ3NYd',
      data: {},
    },
    {
      type: 'paragraph',
      id: 'h298akk2Ad',
      data: {
        text: 'We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make its core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏',
      },
    },
    {
      type: 'image',
      id: '9802bjaAA2',
      data: {
        url: '/assets/codex2x.png',
        caption: '',
        stretched: false,
        withBorder: true,
        withBackground: false,
      },
    },
  ],
};

const editoMockType = ref<'empty' | 'filled'>('empty');
const editorData = ref<OutputData>(emptyEditorData);

watch(() => editoMockType.value, () => {
  editorData.value = editoMockType.value === 'empty' ? emptyEditorData : filledEditorData;
});
</script>

<style module>
</style>
