<template>
  <div class="center-container">
    <div class="block-left">
      <slot
        name="left-col"
      />
    </div>
    <div class="main-content">
      <slot />
    </div>
    <div class="block-right">
      <slot
        name="right-col"
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
  padding: 0 var(--spacing-ml);
  box-sizing: content-box;
}

.block-left, .block-right{
  width: var(--layout-sidebar-width);
  padding: 0 var(--spacing-ml);
}
</style>
