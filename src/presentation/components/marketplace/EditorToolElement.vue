<template>
  <Row
    :title="tool.title"
    :subtitle="tool.description"
    :has-delimiter="hasDelimiter"
  >
    <template #left>
      <ToolIcon :title="tool.title" />
    </template>
    <template #right>
      <span
        v-if="tool.isDefault"
        class="tag text-ui-small"
      >
        {{ t('marketplace.default') }}
      </span>
      <Button
        v-else-if="tool.isInstalled"
        secondary
        :icon="isLoading ? 'Loader' : undefined"
        @click="toggle"
      >
        {{ t('marketplace.uninstallTool') }}
      </Button>
      <Button
        v-else
        :icon="isLoading ? 'Loader' : 'Plus'"
        @click="toggle"
      >
        {{ t('marketplace.installTool') }}
      </Button>
    </template>
  </Row>
</template>

<script setup lang="ts">
import type { EditorToolWithUserBinding } from '@/domain/entities/EditorTool';
import { useUserSettings } from '@/application/services/useUserSettings';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { Button, Row } from '@codexteam/ui/vue';
import ToolIcon from './ToolIcon.vue';

const props = defineProps<{
  tool: EditorToolWithUserBinding;
  hasDelimiter?: boolean;
}>();

const { t } = useI18n();
const { addTool, removeTool } = useUserSettings();

const isLoading = ref(false);

/**
 * Installs or uninstalls the tool
 */
async function toggle(): Promise<void> {
  if (isLoading.value) {
    return;
  }

  isLoading.value = true;

  try {
    await (props.tool.isInstalled ? removeTool(props.tool.id) : addTool(props.tool.id));
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.tag {
  padding: var(--spacing-xxs) var(--spacing-s);
  border-radius: var(--radius-s);
  background-color: var(--base--bg-secondary-hover);
  color: var(--base--text-secondary);
}
</style>
