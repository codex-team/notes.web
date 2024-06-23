<template>
  <h1>Team</h1>
  <Section>
    {{ message }}
  </Section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Section } from 'codex-ui/vue';
import useNoteSettings from '@/application/services/useNoteSettings.ts';
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const route = useRoute();
const { t } = useI18n();

const message = ref(null);

async function checkJoinEligibility() {
  useNoteSettings().joinNote(route.params.id)
    .then(() => {})
    .catch(err => message.value = err.message);
}

checkJoinEligibility();

useHead({
  title: t('join.title'),
});
</script>
