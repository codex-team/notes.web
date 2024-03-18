<template>
  <div :class="$style['pageList']">
    <div
    v-for="pageItem in pageList"
    >
      <PageListItem
        :title="pageItem.content.blocks[0].data.text ? pageItem.content.blocks[0].data.text : 'Untitled'"
        :updatedAt="new Date(pageItem.updatedAt).toLocaleDateString()"
        @click="navigateToPage(pageItem.id)"
    />

  </div>
  </div>
</template>

<script setup lang="ts">
import { OutputData } from '@editorjs/editorjs';
import PageListItem from './PageListItem.vue';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
/**
 * PageList props, receive PageList
 */
const props = defineProps<{
  pageList:PageListItem[]
}>();

/**
 * Custom interface for the item to be displayed in the list
 */
interface PageListItem {
  id: string;
  content: OutputData;
  createdAt: string;
  updatedAt: string;
}

/**
 * Navigate to the page
 * @param pageId - The id of an item in the list
 */
const navigateToPage = (pageId: string) => {
  window.location.href = '/note/' + pageId;
}
</script>

<style module>
  .pageList {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
