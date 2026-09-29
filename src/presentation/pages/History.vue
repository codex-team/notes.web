<template>
  <PageBlock data-dimensions="large">
    <div :class="$style['history']">
      <PageHeading>
        {{ t('history.title') }}
        <template #description>
          <RouterLink :to="`/note/${noteId}`">
            {{ noteTitle }}
          </RouterLink>
        </template>
      </PageHeading>

      <Container v-if="noteHistory === null">
        <div
          v-for="index in 4"
          :key="index"
          :class="$style['skeleton']"
        />
      </Container>

      <div
        v-else-if="noteHistory.length === 0"
        :class="[$style['empty'], 'text-ui-base']"
      >
        {{ t('history.empty') }}
      </div>

      <Container v-else>
        <RouterLink
          v-for="(historyRecord, index) in noteHistory"
          :key="historyRecord.id"
          :to="`/note/${noteId}/history/${historyRecord.id}`"
          :class="$style['history__item']"
        >
          <Row
            :title="historyRecord.user.name"
            :subtitle="`${parseDate(new Date(historyRecord.createdAt))} · ${getTimeFromNow(historyRecord.createdAt)}`"
            :has-delimiter="index !== noteHistory.length - 1"
          >
            <template #left>
              <Avatar
                :src="historyRecord.user.photo"
                :username="historyRecord.user.name"
              />
            </template>
            <template #right>
              <span
                v-if="index === 0"
                :class="[$style['tag'], 'text-ui-small']"
              >
                {{ t('history.latest') }}
              </span>
              <Icon
                name="ChevronRight"
                :class="$style['chevron']"
              />
            </template>
          </Row>
        </RouterLink>
      </Container>
    </div>
  </PageBlock>
</template>

<script setup lang="ts">
import { Container, Row, Avatar, Icon, PageBlock } from '@codexteam/ui/vue';
import useNoteHistory from '@/application/services/useNoteHistory';
import useNote from '@/application/services/useNote';
import usePageTitle from '@/application/services/usePageTitle';
import PageHeading from '@/presentation/components/pageHeading/PageHeading.vue';
import { getTimeFromNow, parseDate } from '@/infrastructure/utils/date';
import { useI18n } from 'vue-i18n';
import type { NoteId } from '@/domain/entities/Note';

const props = defineProps<{
  /**
   * Id of the note
   */
  noteId: NoteId;
}>();

const { t } = useI18n();
const { noteHistory } = useNoteHistory({ noteId: props.noteId });

const { noteTitle } = useNote({ id: props.noteId });

usePageTitle(() => `${t('history.title')} · ${noteTitle.value}`);
</script>

<style lang="postcss" module>
.history {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);

  &__item {
    display: block;
    color: var(--base--text);

    &:first-child {
      border-radius: var(--radius-field) var(--radius-field) 0 0;
    }

    &:last-child {
      border-radius: 0 0 var(--radius-field) var(--radius-field);
    }

    &:hover {
      background-color: var(--base--bg-secondary-hover);
    }
  }
}

.tag {
  padding: var(--spacing-xxs) var(--spacing-s);
  border-radius: var(--radius-s);
  background-color: var(--accent--solid);
  color: var(--accent--text-solid-foreground);
}

.chevron {
  color: var(--base--text-secondary);
}

.skeleton {
  height: 54px;
  margin: 0 var(--h-padding);
  border-bottom: 1px solid var(--base--border);
  animation: pulse 1.4s ease-in-out infinite;
  background: linear-gradient(90deg, color-mix(in srgb, var(--base--text-secondary) 10%, transparent) 40%, transparent 40%) no-repeat center / 100% 12px;

  &:last-child {
    border-bottom: 0;
  }
}

@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}

.empty {
  padding: 0 var(--h-padding);
  color: var(--base--text-secondary);
}
</style>
