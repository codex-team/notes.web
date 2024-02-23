<template>
  <div>
    <h1>{{ $t('marketplace.title') }}</h1>
    <h2>{{ $t('marketplace.listOfTools') }}</h2>
    <ul
      v-for="tool in tools"
      :key="tool.id"
    >
      <li>
        <div class="marketplace__tool">
          {{ tool.title }}
          <Button
            v-if="tool.isUserIncluded && !tool.isDefault"
            :disabled="tool.isDefault"
            :text="t('marketplace.removeTool')"
            @click="removeTool(tool.id)"
          />
          <Button
            v-if="!tool.isDefault && !tool.isUserIncluded"
            :text="t('marketplace.addTool')"
            type="transparent"
            @click="addTool(tool.id)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useAppState } from '@/application/services/useAppState';
import useMarketplace  from '@/application/services/useMarketplace';
import Button from '../components/button/Button.vue';
import { useUserSettings } from '@/application/services/useUserSettings';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const { addTool, removeTool } = useUserSettings();

const { userEditorTools } = useAppState();

const { tools } = useMarketplace(userEditorTools);


</script>

<style setup lang = "postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
    @apply --text-heading-1;
}

.marketplace__tool {
    display: flex;
    align-items: center;
    gap: var(--spacing-very-x);
}
</style>

