<template>
  <PageHeader>
    Counter
    <template #description>
      A component that animates value changes with a smooth slide transition effect.
    </template>
  </PageHeader>

  <div class="counters">
    <div class="counters__value">
      <Counter :value="animatedValue" />
    </div>
    <div class="counters__btn">
      <Button

        @click="animatedValue += 100"
      >
        +100
      </Button>
      <Button

        @click="animatedValue -= 100"
      >
        -100
      </Button>
      <Button
        secondary
        @click="animatedValue = 0"
      >
        Reset
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageHeader from '../../components/PageHeader.vue';
import { Counter, Button } from '../../../src/vue';

const animatedValue = ref(100);

</script>

<style scoped>
.counters {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: var(--spacing-xxl);
  align-items: center;
  &__value{
    width: 3rem;
  }
  &__btn{
    display: flex;
    gap: var(--spacing-m);
    align-items: center;
  }
}

</style>
