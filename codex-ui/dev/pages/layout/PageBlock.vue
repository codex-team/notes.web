<template>
  <PageHeader>
    PageBlock
    <template #description>
      PageBlock is a page unit with three slots: left, right, and center content. By default, the content has a fixed width of 700px. When stretched is true, the content adapts to the screen size.
    </template>
  </PageHeader>
  <div class="page-block-wrapper">
    <Heading :level="2">
      Examples
    </Heading>
    <Heading :level="3">
      Default
    </Heading>
    <svg
      width="700px"
      viewBox="0 0 1830 457"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="1830"
        height="457"
        fill="var(--base--bg-secondary)"
      />
      <rect
        x="233"
        y="50"
        width="300"
        height="357"
        fill="var(--base--bg-primary)"
      />
      <rect
        x="1297"
        y="50"
        width="300"
        height="357"
        fill="var(--base--bg-primary)"
      />
      <rect
        x="565"
        y="50"
        width="700"
        height="357"
        fill="var(--base--bg-primary)"
      />
    </svg>
    <br>
    <br>
    <br>
    <br>
    <Heading :level="3">
      Stretched
    </Heading>
    <svg
      width="700px"
      viewBox="0 0 1830 457"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="1830"
        height="457"
        fill="var(--base--bg-secondary)"
      />
      <rect
        x="16"
        y="50"
        width="316.82"
        height="357"
        fill="var(--base--bg-primary)"
      />
      <rect
        x="364.82"
        y="50"
        width="1100.36"
        height="357"
        fill="var(--base--bg-primary)"
      />
      <rect
        x="1497.18"
        y="50"
        width="316.82"
        height="357"
        fill="var(--base--bg-primary)"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Heading } from '../../../src/vue/';
</script>
