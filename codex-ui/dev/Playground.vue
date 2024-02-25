<template>
  <div :class="$style.playground">
    <Heading :level="1">Playground</Heading>
    <Heading :level="3">Buttons</Heading>
    <Button size="small">Button</Button><br />
    <Button>Button</Button><br />
    <Button size="large">Button</Button><br />
    <Heading :level="3"> Input </Heading>
    <Input text="Enter email" />
    <Heading :level="3"> Type Scale </Heading>
    <TypeScale />
  </div>
</template>

<script setup lang="ts">
import { Button, Heading, Input } from '../src/vue';
import TypeScale from './TypeScale.vue';
</script>

<style module>
.playground {
  background-color: var(--base--bg-primary);
  color: var(--base--text);
  min-height: 100%;
  padding: 20px;
}
</style>
