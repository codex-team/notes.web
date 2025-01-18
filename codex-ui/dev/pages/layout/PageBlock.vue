<template>
  <div class="page-block-wrapper">
    <PageBlock :stretched="true">
      <!-- Левый сайдбар -->
      <template #left>
        <div class="sidebar-content-left text-ui-base">
          Left Sidebar Content
        </div>
      </template>

      <!-- Основной контент -->
      <div
        class="main-content text-ui-base"
      >
        Main Content Goes Here
      </div>

      <!-- Правый сайдбар -->
      <template #right>
        <div class="sidebar-content-right text-ui-base">
          Right Sidebar Content
        </div>
      </template>
    </PageBlock>
  </div>
</template>

<script setup lang="ts">
import { PageBlock } from '../../../src/vue/';
</script>

<style scoped>
.page-block-wrapper {
  width: 1600px;
  height: 500px;
  display: flex;
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
  background-color: lightgreen;
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
