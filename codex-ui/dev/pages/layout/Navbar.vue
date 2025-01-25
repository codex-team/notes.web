<template>
  <div class="navbar-wrapper">
    <Navbar>
      Left
      <template #right>
        Right
      </template>
    </Navbar>
  </div>
</template>

<script setup lang="ts">
import { Navbar } from '../../../src/vue';
</script>

<style scoped>
.navbar-wrapper {
  height: 800px;
  position: relative;
  background-color: var(--base--bg-secondary);
  border-radius: var(--radius-m);
  border: 1px solid var(--base--border);

  .navbar {
    top: var(--layout-navbar-height);
    border-radius: var(--radius-m) var(--radius-m) 0 0;
  }
}
</style>
