<template>
  <PageHeader>
    Alert
    <template #description>
      Light and beautiful codex alert
      <code>click the button to see for yourself </code>
    </template>
  </PageHeader>



  <p>The following outlines options for alert to display </p>

  <div class="flex-content">
    <div>
      Message - message of the alert to be displayed (string)
    </div>

    <div>
      Position - position of alert (bottom-center)
    </div>

    <div>
      Type - alert type (success, error, warning, info and default)
    </div>

    <div>
      Timeout - Visibility duration in milliseconds, set timeout to keep toast visible
    </div>
  </div>

  <div class="flex-type">

    <div class="flex">
      <span>Success</span>
      <Button
      @click="showToast('success')"
    >
      click success
    </Button>
    </div>


    <div class="flex">
      <span>Error</span>
      <Button
      @click="showToast('error')"
    >
      click error
    </Button>
    </div>

    <div class="flex">
      <span>Warning</span>
      <Button
      @click="showToast('warning')"
    >
      click warning
    </Button>
    </div>

    <div class="flex">
      <span>Info</span>
      <Button
      @click="showToast('info')"
    >
      click info
    </Button>
    </div>

    <div class="flex">
      <span>Default</span>
      <Button
      @click="showToast('default')"
    >
      click default
    </Button>
    </div>
  </div>

  <AlertContainer />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Button } from '../../../src/vue';
import { useAlert, AlertContainer, AlertType } from '../../../src/vue/components/alert';

const toast = useAlert;

const showToast = (status: AlertType) => {
  toast(status, {
    message: 'codex',
    icon: 'Check',
    type: status,
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

.flex-type {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 2rem;

  .flex {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    gap: var(--spacing-l);
    align-items: center;
  }
}
</style>
