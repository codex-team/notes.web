<template>
  <MessageCard
    :title="title"
    :text="message"
  >
    <template #picture>
      <div :class="$style.code">
        {{ code }}
      </div>
    </template>
    <Button @click="router.push('/')">
      {{ t('errors.goHome') }}
    </Button>
  </MessageCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Button } from '@codexteam/ui/vue';
import MessageCard from '@/presentation/components/message-card/MessageCard.vue';
import usePageTitle from '@/application/services/usePageTitle';

const router = useRouter();
const { t, te } = useI18n();

const props = withDefaults(
  defineProps<{
    /**
     * Visible error code
     */
    code?: number | string;
  }>(),
  {
    code: 500,
  }
);

const title = computed(() => (te(`error.${props.code}`) ? t(`error.${props.code}`) : t('pages.error')));

const message = computed(() => (te(`errors.${props.code}`) ? t(`errors.${props.code}`) : t('errors.default')));

usePageTitle(title);
</script>

<style lang="postcss" module>
.code {
  font-size: 4rem;
  font-weight: 700;
  line-height: 100%;
  color: var(--base--border);
}
</style>
