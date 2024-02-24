<template>
  <div :class="$style.playground">
    <Heading :level="1">
      Playground
    </Heading>
    <Heading :level="3">
      Button
    </Heading>
    <Button text="Click me" />
    <Heading :level="3">
      Input
    </Heading>
    <Input text="Enter email" />
  </div>
</template>

<script setup lang="ts">
import { Button, Heading, Input } from '../src/vue';

</script>

<style module>
.playground {
  background-color: var(--base--bg-primary);
  color: var(--base--text);
  min-height: 100%;
  padding: 20px;
  font-family: ;
}
</style>
