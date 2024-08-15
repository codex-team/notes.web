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
        click success
      </Button>
    </div>

    <div class="flex">
      <span>Error</span>
      <Button
        @click="showErrorAlert"
      >
        click error
      </Button>
    </div>

    <div class="flex">
      <span>Warning</span>
      <Button
        @click="showWarningAlert"
      >
        click warning
      </Button>
    </div>

    <div class="flex">
      <span>Info</span>
      <Button
        @click="showInfoAlert"
      >
        click info
      </Button>
    </div>

    <div class="flex">
      <span>Default</span>
      <Button
        @click="showDefaultAlert"
      >
        click default
      </Button>
    </div>
  </div>

  <AlertContainer />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Button, useAlert, AlertContainer } from '../../../src/vue';

const { success, error, warning, info, defaultAlert } = useAlert();

const showSuccessAlert = () => {
  success({
    message: 'success',
    icon: 'Trash',
    timeout: 5000,
  });
};

const showErrorAlert = () => {
  error({
    message: 'error',
    icon: 'Trash',
    timeout: 5000,
  });
};

const showWarningAlert = () => {
  warning({
    message: 'warning',
    icon: 'Trash',
    timeout: 5000,
  });
};

const showInfoAlert = () => {
  info({
    message: 'info',
    icon: 'Trash',
    timeout: 5000,
  });
};

const showDefaultAlert = () => {
  defaultAlert({
    message: 'default',
    icon: 'Trash',
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
