<template>
  <div class="center-container">
    <slot />
  </div>
</template>

<script>

export default {
  name: "AppLayout",
}
</script>

<style scoped>
    .center-container {
        display: flex;
        justify-content: center;
    }
</style>