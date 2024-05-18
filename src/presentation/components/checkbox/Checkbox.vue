<template>
  <div>
    <input
      :id="id"
      :checked="checked"
      type="checkbox"
      :disabled="disabled"
      class="checkbox"
      @input="onClick"
    >
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  /**
   * Checkbox label
   */
  label: string;

  /**
   * Checkbox id
   */
  id?: string;

  /**
   * Is checkbox disabled
   */
  disabled?: boolean;

  /**
   * Is checkbox checked
   */
  checked: boolean;

  /**
   * Placeholder value
   */
  placeholder?: string;
}>();

const emit = defineEmits(['update:checked']);

const onClick = () => {
  emit('update:checked', !props.checked);
};
</script>

<style lang="postcss">
@import '@/presentation/styles/typography.pcss';
.checkbox {
  width: 20px;
  height: 20px;
  appearance: auto;
}
</style>
