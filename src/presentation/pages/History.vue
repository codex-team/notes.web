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
          >
            <template #left>
              <Avatar
                :src="historyRecord.user.photo"
                :username="historyRecord.user.name"
              />
            </template>
            <template #right>
              <Button
                secondary
                icon="Search"
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
import useNoteHistory from '@/application/services/useNoteHistory';
import { parseDate } from '@/infrastructure/utils/parseDate';

const props = defineProps({
  noteId: Note['id'],
});

const { noteHistory } = useNoteHistory({ noteId: props.noteId });

import { useI18n } from 'vue-i18n';
import Note from './Note.vue';

const { t } = useI18n();

const noteTitle = 'HELLO WORLD HISTORY';

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