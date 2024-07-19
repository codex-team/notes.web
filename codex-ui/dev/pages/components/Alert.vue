<template>
  <PageHeader>
    Alert
    <template #description>
      Light and beautiful codex alert
      <code>click the button to see for yourself </code>
    </template>
  </PageHeader>

  <Button
    @click="showToast"
  >
    click alert
  </Button>

  <p>The following outlines options for alert to display </p>

  <div class="flex-content">
    <div>
      Content
    </div>

    <div>
      Position
    </div>

    <div>
      Status
    </div>

    <div>
      Timeout
    </div>
  </div>

  <AlertContainer />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Button } from '../../../src/vue';
import { useAlert, AlertContainer } from '../../../src/vue/components/alert';

const toast = useAlert;

const showToast = () => {
  toast('info', {
    message: 'codex',
    icon: 'Check',
    type: 'info',
    timeout: 5000,
  });
};

</script>

<style lang="postcss">
.flex-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-l);
  align-items: center;
}
</style>
