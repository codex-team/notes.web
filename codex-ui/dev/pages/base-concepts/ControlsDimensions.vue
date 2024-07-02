<template>
  <PageHeader>
    Controls Dimensions
    <template #description>
      Elements size customization using variety vertical and horizontal paddings and border radius.
    </template>
  </PageHeader>
  All you need to know is a <code>v-padding</code>, <code>h-padding</code> and <code>radius-field</code> variables.

  <p>
    All of them can be used in these modes: <code>small</code>, <code>medium</code>, <code>large</code>
  </p>

  <p>
    You can change them by adding the <code>data-dimensions</code> attribute to the element. All its children will be affected.
  </p>

  <Heading :level="2">
    Example
  </Heading>

  <template
    v-for="mode in ['small', 'medium', 'large']"
    :key="mode"
  >
    <Heading :level="3">
      {{ mode }}
    </Heading>
    Adding the <code>[data-dimensions="{{ mode }}"]</code> attriubute
    <br>
    <br>
    <Field
      :title="`Field in the ${mode} mode`"
      caption="Watch paddings and radius"
      placeholder="Type something"
      :data-dimensions="mode"
    />
    <br>
    <br>
  </template>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Heading, Field } from '../../../src/vue';

</script>

<style module>

</style>
