<template>
  <div>
    <h1>{{ $t('marketplace.addTool') }}</h1>
    <TextEdit
      v-model:value="toolName"
      name="toolName"
      :title="$t('marketplace.newTool.name.label')"
      :placeholder="$t('marketplace.newTool.name.placeholder')"
    />
    <TextEdit
      v-model:value="toolCdn"
      name="toolCdn"
      :title="$t('marketplace.newTool.cdn.label')"
      :placeholder="$t('marketplace.newTool.cdn.placeholder')"
    />
    <TextEdit
      v-model:value="toolTitle"
      name="toolTitle"
      :title="$t('marketplace.newTool.title.label')"
      :placeholder="$t('marketplace.newTool.title.placeholder')"
    />
    <TextEdit
      v-model:value="toolExport"
      name="toolExport"
      :title="$t('marketplace.newTool.exportName.label')"
      :placeholder="$t('marketplace.newTool.exportName.placeholder')"
    />
    <Button
      :text="$t('marketplace.newTool.add')"
      type="primary"
      :icon="IconPlus"
      @click.passive="onClick"
    />
  </div>
</template>

<script setup lang="ts">
import { IconPlus } from '@codexteam/icons';
import useMarketplace from '@/application/services/useMarketplace';
import TextEdit from '@/presentation/components/form/TextEdit.vue';
import Button from '@/presentation/components/button/Button.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { addTool } = useMarketplace();
const router = useRouter();

const toolName = ref('');
const toolCdn = ref('');
const toolTitle = ref('');
const toolExport = ref('');

/**
 * Button click handler
 */
function onClick() {
  addTool({
    name: toolName.value,
    title: toolTitle.value,
    exportName: toolExport.value,
    source: {
      cdn: toolCdn.value,
    },
  }).then(() => {
    router.push({ path: '/marketplace' });
  });
}
</script>

<style setup lang="postcss" scoped></style>
