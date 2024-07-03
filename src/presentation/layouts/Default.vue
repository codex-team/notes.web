<template>
  <div class="center-container">
    <slot
      name="block-left"
      class="block-left"
    />
    <div class="main-content">
      <slot class="default" />
    </div>
    <slot
      name="block-right"
      class="block-right"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.center-container {
  display: flex;
  flex-direction: row;
  padding: var(--spacing-xxl) var(--spacing-ml);
  gap: var(--spacing-ml);
  width: 100%;
  justify-content: center;
  margin: 0 auto;
}

.main-content {
  max-width: var(--layout-content-width);
}

.block-left, .block-right{
  max-width: var(--layout-block-width);
}

.default {
  padding: 0 var(--spacing-ml);
}
</style>
