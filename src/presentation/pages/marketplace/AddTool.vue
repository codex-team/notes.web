<template>
  <div class="container">
    <h1>{{ $t('marketplace.addTool') }}</h1>
    <Section
      :title="$t('marketplace.newTool.name.label')"
      :caption="$t('marketplace.newTool.name.caption')"
    >
      <Input
        v-model:model-value="toolName"
        :placeholder="$t('marketplace.newTool.name.placeholder')"
      />
    </Section>
    <Section
      :title="$t('marketplace.newTool.cdn.label')"
      :caption="$t('marketplace.newTool.cdn.caption')"
    >
      <Input
        v-model:model-value="toolCdn"
        name="toolCdn"
        :placeholder="$t('marketplace.newTool.cdn.placeholder')"
      />
    </Section>
    <Section
      :title="$t('marketplace.newTool.title.label')"
      :caption="$t('marketplace.newTool.title.caption')"
    >
      <Input
        v-model:model-value="toolTitle"
        name="toolTitle"
        :placeholder="$t('marketplace.newTool.title.placeholder')"
      />
    </Section>
    <Section
      :title="$t('marketplace.newTool.exportName.label')"
      :caption="$t('marketplace.newTool.exportName.caption')"
    >
      <Input
        v-model:model-value="toolExport"
        name="toolExport"
        :placeholder="$t('marketplace.newTool.exportName.placeholder')"
      />
    </Section>
    <Button
      type="primary"
      class="add-tool-button"
      @click.passive="onClick"
    >
      {{ $t('marketplace.newTool.add') }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import useMarketplace from '@/application/services/useMarketplace';
import { Section, Input, Button } from 'codex-ui/vue';
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

<style setup lang="postcss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxl);
}

.add-tool-button {
  width: max-content;
}
</style>
