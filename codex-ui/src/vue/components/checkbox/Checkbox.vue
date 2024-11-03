<template>
  <div
    class="checkbox"
    :class="[
      isChecked && 'checkbox--checked',
      props.disabled && 'checkbox--disabled',
      isHover && !props.disabled && 'checkbox--hover',
    ]"
    @click="onClick"
    @mouseenter="setHover(true)"
    @mouseleave="setHover(false)"
  >
    <div v-if="isChecked || isHover" class="checkbox__icon">
      <Icon name="Check" :class="{ 'checkbox__icon--faded': isHover && !isChecked }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../icon/Icon.vue';
import { ref, computed, defineProps, defineEmits, withDefaults } from 'vue';

const props = withDefaults(
  defineProps<{
    label?: string;
    checked: boolean;
    hover?: boolean;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
    label: undefined,
    hover: false,
  }
);

const emit = defineEmits(['update:checked']);
const isChecked = ref(props.checked);
const internalHover = ref(false);

const isHover = computed(() => props.hover || internalHover.value);

const setHover = (value: boolean) => {
  if (!props.hover) {
    internalHover.value = value;
  }
};

const onClick = () => {
  if (!props.disabled) {
    isChecked.value = !isChecked.value;
    emit('update:checked', isChecked.value);
  }
};
</script>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border-radius: 8px;
  width: 20px;
  height: 20px;
  background-color: #282B31; /* Default + False */
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.checkbox__icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox__icon--faded {
  opacity: 0.5;
}

.checkbox__label {
  margin-left: 8px;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  white-space: nowrap;
}

.checkbox--checked {
  background-color: #54617B; /* Default + True */
}

.checkbox--hover {
  background-color: #343A47; /* Hover + True */
}

.checkbox--disabled {
  background-color: #282B31; /* Disabled + True */
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
