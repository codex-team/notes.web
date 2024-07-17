<template>
  <PageHeader>
    Alert
    <template #description>
      Light and beautiful notex alert
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
import { useAlert, AlertContainer, POSITION, AlertType } from '../../../src/vue/components/alert';

const toast = useAlert();

const getRandom = <T>(list: T[]) => list[Math.floor((Math.random() * 10) % list.length)];

const randomType = () => getRandom(Object.values(AlertType));

const randomPosition = () => getRandom(Object.values(POSITION));

const randomMessage = () =>
  getRandom(['Hello', 'codex']);

const showToast = () => {
  toast.success({ content: randomMessage(),
    position: randomPosition(),
    timeout: 10000,
    status: randomType() });
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
