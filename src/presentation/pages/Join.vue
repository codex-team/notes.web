<template>
  <h1>Team</h1>
  <Section />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Section } from 'codex-ui/vue';
import useNoteSettings from '@/application/services/useNoteSettings.ts';
import { useRoute } from 'vue-router';

const route = useRoute();

const message = ref<string>('');

/**
 * check join possibility
 */
function checkJoinEligibility() {
  useNoteSettings().joinNote(route.params.id as string)
    .then(() => {})
    .catch(err => message.value = err.message);
}

checkJoinEligibility();

</script>
