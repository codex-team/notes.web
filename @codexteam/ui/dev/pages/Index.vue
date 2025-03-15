<template>
  <div :class="$style.landing">
    <h1 :class="$style['landing__logo']">
      CodeX UI
    </h1>
    <div :class="$style['landing__caption']">
      The Design System forged in the fires of open-source development
    </div>
  </div>
</template>

<script setup lang=ts>

</script>

<style module>
.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;

  &__logo {
    font-size: 120px;
    margin-bottom: 1rem;
    font-weight: 800;
    margin: 0;
  }

  &__caption {
    font-size: 1.5rem;
    color: var(--color-text-subtle);
    max-width: 400px;
    text-align: center;
    line-height: 1.5;
    margin-top: 1.5em;
  }
}

</style>
