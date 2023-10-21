<template>
  <div>
    <input
      :id="id"
      :checked="checked"
      type="checkbox"
      :name="name"
      :disabled="disabled"
      @input="onClick"
    >
    <label>{{ label }}</label>
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
  id: string;

  /**
   * Is checkbox disabled
   */
  disabled: boolean;

  /**
   * Is checkbox checked
   */
  checked: boolean;

  /**
   * Variable Name
   */
  name: string;

  /**
   * Placeholder value
   */
  placeholder?: string;
}>();

const emit = defineEmits([ 'update:checked' ]);

const onClick = () => {
  emit('update:checked', !props.checked);
};

</script>

<style lang="postcss">
@import '@/presentation/styles/typography.pcss';
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  background: #369FFF;
  appearance: auto;
}
</style>
