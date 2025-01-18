<template>
  <PageHeader>
    PageBlock
    <template #description>
      PageBlock is a page unit with three slots: left, right, and center content. By default, the content has a fixed width of 700px. When stretched is true, the content adapts to the screen size.
    </template>
  </PageHeader>
  <div class="page-block-wrapper">
    <Heading :level="2">
      Examplesz
    </Heading>
    <Heading :level="3">
      default
    </Heading>
    <PageBlock>
      <template #left>
        <div class="sidebar-content-left text-ui-base">
          Left Sidebar Content
        </div>
      </template>

      <div
        class="main-content text-ui-base"
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, voluptatum! Earum, aperiam inventore unde aliquid amet natus minima modi, tempora eos eum possimus deleniti. Ipsam voluptas eaque error in doloribus?
      </div>

      <template #right>
        <div class="sidebar-content-right text-ui-base">
          Right Sidebar Content
        </div>
      </template>
    </PageBlock>
    <br>
    <br>
    <br>
    <br>
    <Heading :level="3">
      stretched
    </Heading>
    <PageBlock
      :stretched="true"
    >
      <template #left>
        <div class="sidebar-content-left text-ui-base">
          Left Sidebar Content
        </div>
      </template>

      <div
        class="main-content text-ui-base"
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, voluptatum! Earum, aperiam inventore unde aliquid amet natus minima modi, tempora eos eum possimus deleniti. Ipsam voluptas eaque error in doloribus?
      </div>

      <template #right>
        <div class="sidebar-content-right text-ui-base">
          Right Sidebar Content
        </div>
      </template>
    </PageBlock>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { PageBlock, Heading } from '../../../src/vue/';
</script>

<style scoped>
.page-block-wrapper {
  width: 700px;
  border-radius: var(--radius-m);
}

.sidebar-content-left {
  height: 200px;
  padding: var(--spacing-s);
  text-align: center;
  border-radius: var(--radius-m);
  background-color: var(--base--bg-secondary);
}

.main-content {
  height: 100%;
  text-align: center;
  border-radius: var(--radius-m);
}

.sidebar-content-right {
  height: 100px;
  padding: var(--spacing-s);
  text-align: center;
  border-radius: var(--radius-m);
  background-color: var(--base--bg-secondary);
}
</style>
