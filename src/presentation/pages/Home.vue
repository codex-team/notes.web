<template>
  <div :class="$style.page">
    <h1>{{ $t('home.title') }}</h1>
    <div v-if="user">


      <Heading
        :level="2"
      >
        CodeX UI showcase
      </Heading>
      <Button text="Button text" />
      <Input text="Input text" />

      <div v-if="noteList?.items.length">
        <div
          v-for="note in noteList.items"
          :key="note.id"
        >
          <NoteView
            :title="note.content.blocks[0]?.data?.text"
            :subtitle="note.content.blocks[1]?.data.text || ''"
            :created-at="note.createdAt"
            @click="router.push('/note/'+note.id)"
          />
        </div>
      </div>

      <div v-else>
        <p>{{ $t('home.noNoteList') }}</p>
      </div>
    </div>

    <div v-else>
      <p>{{ $t('home.authText') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppState } from '@/application/services/useAppState';
import useNoteList from '@/application/services/useNoteList';
import NoteView from '@/presentation/components/note/NoteView.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { user } = useAppState();


const { noteList } = useNoteList();


import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { Button, Input, Heading } from 'codex-ui/vue';

const { t } = useI18n();

/**
 * Changing the title in the browser
 */
useHead({
  title: t('home.title'),
});
</script>

<style lang="postcss" module>
@import '@/presentation/styles/typography.pcss';

.page {
  //background-color: var(--ui-color);
}

h2 {
  @apply --text-heading-2;
}

p {
  @apply --text-body;
}

</style>
