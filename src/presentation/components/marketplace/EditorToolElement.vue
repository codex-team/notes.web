<template>
  <li>
    <div class="marketplace__tool">
      {{ tool.title }}
      <Button
        v-if="canBeUninstalled"
        :disabled="tool.isDefault"
        :text="t('marketplace.uninstallTool')"
        @click="removeTool(tool.id)"
      />
      <Button
        v-if="canBeInstalled"
        :text="t('marketplace.installTool')"
        type="transparent"
        @click="addTool(tool.id)"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import { EditorToolWithUserBinding } from '@/domain/entities/EditorTool';
import useUserSettings from '@/application/services/useUserSettings';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import Button from '../button/Button.vue';
const { addTool, removeTool } = useUserSettings();

const { t } = useI18n();

const props = defineProps<{
  tool: EditorToolWithUserBinding;
}>();

const canBeUninstalled = computed(() => !props.tool.isDefault && props.tool.isInstalled);
const canBeInstalled = computed(() => !props.tool.isDefault && !props.tool.isInstalled);
</script>

<style scoped lang="postcss">
.marketplace__tool {
  display: flex;
  align-items: center;
  gap: var(--spacing-very-x);
}
</style>
