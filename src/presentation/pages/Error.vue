<template>
  <div :class="$style.error">
    <div :class="$style.code">
      {{ code }}
    </div>
    <div :class="$style.text">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from 'unhead';
import { useRoute } from 'vue-router';
import useNavbar from '@/application/services/useNavbar';

const route = useRoute();
const { patchOpenedPageByUrl } = useNavbar();

const { t, te } = useI18n();

const props = withDefaults(
  defineProps<{
    /**
     * Visible error code
     */
    code?: number;

    /**
     * Error message to override default one got by code
     */
    customMessage?: string;
  }>(),
  {
    code: 500,
    customMessage: '',
  }
);

const message = computed(() => {
  if (props.customMessage) {
    return props.customMessage;
  }

  if (te(`errors.${props.code}`)) {
    return t(`errors.${props.code}`);
  }

  return t('errors.default');
});

useHead({
  title: t(`pages.error`),
});

const openPageInfo = {
  title: te(`error.${props.code}`) ? t(`error.${props.code}`) : t(`pages.error`),
  url: route.path,
};

patchOpenedPageByUrl(route.path, openPageInfo);
</script>

<style lang="postcss" module>
.error {
  display: grid;
  grid-template-columns: auto 1fr;
  margin: auto;
  align-items: stretch;
}

.code {
  border-right: 1px solid var(--base--border);
  padding-right: var(--spacing-ms);
  margin-right: var(--spacing-ms);
  line-height: 110%;
}
</style>
