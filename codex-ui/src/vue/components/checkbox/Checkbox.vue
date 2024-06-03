<template>
  <div
    :class="[$style.checkbox, disabled ? $style[`checkbox--disabled`] : '', checkboxValue ? $style[`checkbox--on`] : '']"
    v-on="disabled === false ? { click: changeValue } : {}"
  >
    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5.99998 9.5L8.8823 12.6705C8.96165 12.7578 9.09892 12.7578 9.17828 12.6705L14.3333 7" stroke="#F5F5F5" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /**
     * Value of the checkbox ('enable' or 'disable')
     */
    value?: boolean;

    /**
     * State of interaction with the component
     */
    disabled?: boolean;
  }>(),
  { value: false, disabled: false }
);

const checkboxValue = defineModel({ default: true });

checkboxValue.value = props.value;

/**
 * Function for changing value of the checkbox on click
 */
function changeValue() {
  checkboxValue.value = !checkboxValue.value;
}
</script>

<style module lang="postcss">
.checkbox path {
  display: none;
}

.checkbox {
  --bg-color: var(--base--bg-secondary);

  cursor: pointer;
  height: 20px;
  width: 20px;
  border-radius: var(--radius-m);
  background: var(--bg-color);
  transition: background-color 0.2s;

  &:not(.checkbox--disabled):hover {
    --bg-color: var(--accent--bg-secondary-hover);
    path {
      stroke: var(--base--text-secondary);
      display: block;
    }
  }

  &--on {
    --bg-color: var(--base--solid);
    path {
      display: block;
    }

    &:not(.checkbox--disabled):hover {
      --bg-color: var(--base--solid-hover);
      path {
        stroke: var(--base--text-solid-foreground);
        display: block;
      }
    }
  }

  &--disabled {
    --bg-color: var(--base--bg-secondary);
    cursor: not-allowed;
    path {
      stroke: var(--base--text-secondary);
    }
  }
}
</style>

