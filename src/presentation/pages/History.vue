<template>
  <ThreeColsLayout data-dimensions="large">
    <div :class="$style['history']">
      <div :class="$style['history__page-header']">
        <Heading
          :level="1"
          :class="$style['title']"
        >
          {{ noteTitle }}
        </Heading>
        <Heading
          :level="2"
          :class="$style['subtle']"
        >
          {{ t('history.title') }}
        </Heading>
      </div>

      <div :class="$style['history__container']">
        <Container
          :class="$style['history-items']"
        >
          <Row
            v-for="(historyRecord, index) in noteHistory"
            :key="historyRecord.id"
            :title="historyRecord.user.name"
            :subtitle="parseDate(new Date(historyRecord.createdAt))"
            :has-delimiter="noteHistory !== null && index !== noteHistory?.length - 1"
            :class="$style['history-items__row']"
            @click="router.push(`/note/${props.noteId}/history/${historyRecord.id}`)"
          >
            <template #left>
              <Avatar
                :src="historyRecord.user.photo"
                :username="historyRecord.user.name"
              />
            </template>
            <template #right>
              <!-- @todo Make button with icon Eye, it would be implemented in Codex icons 2.0 -->
              <Button
                secondary
              >
                {{ t('history.view') }}
              </Button>
            </template>
          </Row>
        </Container>
      </div>
    </div>
  </ThreeColsLayout>
</template>

<script setup lang="ts">
import { Heading, Container, Row, Avatar, Button } from 'codex-ui/vue';
import ThreeColsLayout from '../layouts/ThreeColsLayout.vue';
import useNoteHistory from '@/application/services/useAppNavbarstory';
import useHeader from '@/application/services/useHeader';
import useNote from '@/application/services/useNote';
import { parseDate } from '@/infrastructure/utils/date';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { NoteId } from '@/domain/entities/Note';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{
  /**
   * Id of the note
   */
  noteId: NoteId;

}>();

const { t } = useI18n();
const { noteHistory } = useNoteHistory({ noteId: props.noteId });
const { patchOpenedPageByUrl } = useHeader();

const route = useRoute();
const router = useRouter();

const { noteTitle } = useNote({ id: props.noteId });

watch(noteTitle, (currentNoteTitle) => {
  patchOpenedPageByUrl(
    route.path,
    {
      title: `Version history (${currentNoteTitle})`,
      url: route.path,
    });
});

</script>
<style lang="postcss" module>

.history {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__page-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: var(--spacing-s);
    align-self: stretch;
    padding: var(--spacing-xxl) var(--h-padding) 0;
  }

  &__container {
    display: flex;
    padding: var(--spacing-xxl) 0;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: var(--spacing-ml);
    align-self: stretch;
  }
}

.history-items {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;

  &__row {
    align-self: stretch;
    color: var(--text);
  }
}

.title {
  color: var(--base--text);
}

.subtle {
  color: var(--base--text-secondary);
}

</style>
