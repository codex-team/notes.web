<template>
  <div class="center-container">
    <div class="block-left">
      <slot
        name="block-left"
      />
    </div>
    <div class="main-content">
      <slot class="default" />
    </div>
    <div class="block-right">
      <slot
        name="block-right"
      />
    </div>
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
  width: var(--layout-content-width);
}

.block-left, .block-right{
  max-width: var(--layout-block-width);
}

.default {
  padding: 0 var(--spacing-ml);
}
</style>
