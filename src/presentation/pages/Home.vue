<template>
  <div>
    <h1>{{ $t('home.title') }}</h1>
    <p>This page will contain your Notes you recently worked with </p>
    <my-btn
      :type="buttonType"
      @click="toggleButtonType"
    >
      Toggle Type
    </my-btn>
  </div>
</template>

<script setup lang="ts">
import '../components/webComponents/button';
import { ref } from 'vue';

const buttonType = ref('primary');

const toggleButtonType = () => {
  if (buttonType.value === 'primary') {
    buttonType.value = 'secondary';
  } else if (buttonType.value === 'secondary') {
    buttonType.value = 'danger';
  } else {
    buttonType.value = 'primary';
  }
};
</script>

<style lang="postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
  @apply --text-heading-1;
}

p {
  @apply --text-body;
}

</style>
