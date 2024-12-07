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
      Timeout - visibility duration in milliseconds, set timeout to keep alert visible
    </div>
  </div>

  <div class="flex-type">
    <div class="flex">
      <span>Success</span>
      <Button
        @click="showSuccessAlert"
      >
        Show success alert
      </Button>
    </div>

    <div class="flex">
      <span>Error</span>
      <Button
        @click="showErrorAlert"
      >
        Show error alert
      </Button>
    </div>

    <div class="flex">
      <span>Warning</span>
      <Button
        @click="showWarningAlert"
      >
        Show warning alert
      </Button>
    </div>

    <div class="flex">
      <span>Info</span>
      <Button
        @click="showInfoAlert"
      >
        Show info alert
      </Button>
    </div>

    <div class="flex">
      <span>Default</span>
      <Button
        @click="showDefaultAlert"
      >
        Show default alert
      </Button>
    </div>
  </div>

  <AlertContainer />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Button, useAlert, AlertContainer } from '../../../src/vue';

const { success, error, warning, info, alert } = useAlert();

const showSuccessAlert = () => {
  success({
    message: '1st alert',
    timeout: 5000,
  });
};

const showErrorAlert = () => {
  error({
    message: '2nd alert',
    timeout: 5000,
  });
};

const showWarningAlert = () => {
  warning({
    message: '3rd alert',
    timeout: 5000,
  });
};

const showInfoAlert = () => {
  info({
    message: '4th alert',
    timeout: 5000,
  });
};

const showDefaultAlert = () => {
  alert({
    message: '5th alert',
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
  display: grid;
  grid-template-columns: repeat(1, 2fr);
  gap: var(--spacing-l);
  align-items: center;
  margin-top: 2rem;

  .flex {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    gap: var(--spacing-l);

    button {
      display: grid;
      grid-column: span 1;
    }
  }
}
</style>
