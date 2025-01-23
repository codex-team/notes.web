<template>
  <div class="container">
    <div class="navbar-wrapper">
      <Navbar>
        Left
        <template #right>
          Right
        </template>
      </Navbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Navbar } from '../../../src/vue';
</script>

<style scoped>
.container {
  height: 400px;
  overflow-y: scroll;
}

.navbar-wrapper {
  height: 800px;
  position: relative;
  background-color: var(--base--bg-secondary);
  border-radius: var(--radius-m);
  border: 1px solid var(--base--border);

  .navbar {
      border-radius: var(--radius-m) var(--radius-m) 0 0;
  }
}
</style>
