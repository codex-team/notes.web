<template>
  <Card
    :title="tool.title"
    :subtitle="tool.description"
    orientation="horizontal"
    :src="`http://localhost:9001/api/v1/buckets/editor-tool-covers/objects/download?preview=true&prefix=${tool.cover}&version_id=null`"
  >
    <div class="buttons">
      <Button
        v-if="
          canBeUninstalled"
        :disabled="tool.isDefault"
        :icon="isLoading ? 'Loader' : undefined"
        @click="onRemoveTool(tool.id)"
      >
        {{ t('marketplace.uninstallTool') }}
      </Button>
      <Button
        v-if="canBeInstalled"
        type="transparent"
        :icon="isLoading ? 'Loader' : undefined"
        @click="onAddTool(tool.id)"
      >
        {{ t('marketplace.installTool') }}
      </Button>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { EditorToolWithUserBinding } from '@/domain/entities/EditorTool';
import { useUserSettings } from '@/application/services/useUserSettings';
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';
import { Button, Card } from 'codex-ui/vue';

const { addTool, removeTool } = useUserSettings();

const isLoading = ref(false);

const onRemoveTool = async (toolId: string) => {
  isLoading.value = true;

  await removeTool(toolId);

  isLoading.value = false;
};

const onAddTool = async (toolId: string) => {
  isLoading.value = true;

  await addTool(toolId);

  isLoading.value = false;
};

const { t } = useI18n();

const props = defineProps<{
  tool: EditorToolWithUserBinding;
}>();

const canBeUninstalled = computed(() => !props.tool.isDefault && props.tool.isInstalled);
const canBeInstalled = computed(() => !props.tool.isDefault && !props.tool.isInstalled);
</script>

<style scoped lang="postcss">
.buttons {
  min-width: 100px;
  display: flex;
  justify-content: flex-end;
}
</style>
