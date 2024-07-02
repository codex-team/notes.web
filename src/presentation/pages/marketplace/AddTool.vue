<template>
  <div class="container">
    <h1>{{ $t("marketplace.addTool") }}</h1>
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
      :title="$t('marketplace.newTool.name.label')"
      :caption="$t('marketplace.newTool.name.caption')"
    >
      <Card
        title="ABOBA"
        subtitle="
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus odio non lectus maximus suscipit. Morbi vehicula neque eget augue mollis porta. Sed cursus auctor nisi a iaculis."
        orientation="horizontal"
        :icon="isLoading ? 'Loader' : undefined"
        :src="localCover"
      >
        <input
          id="marketplace-new-tool-cover"
          type="file"
          hidden
          accept="image/*"
          enctype="multipart/form-data"
          @change="setCover($event)"
        >
        <label
          for="marketplace-new-tool-cover"
          class="add-cover-label"
        >
          <Button class="add-cover-button"> Select file </Button>
        </label>
      </Card>
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
      :title="$t('marketplace.description.cdn.label')"
      :caption="$t('marketplace.description.cdn.caption')"
    >
      <Input
        v-model:model-value="description"
        name="description"
        :placeholder="$t('marketplace.description.cdn.placeholder')"
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
      {{ $t("marketplace.newTool.add") }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import useMarketplace from '@/application/services/useMarketplace';
import { Section, Input, Button, Card } from 'codex-ui/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { addTool } = useMarketplace();
const router = useRouter();

const toolName = ref('');
const toolCdn = ref('');
const toolTitle = ref('');
const toolExport = ref('');
const description = ref('');
const cover = ref<File | undefined>(undefined);
const localCover = ref<string | undefined>(undefined);

const isLoading = ref(false);

/**
 * Button click handler
 */
function onClick() {
  addTool({
    name: toolName.value,
    title: toolTitle.value,
    description: description.value,
    exportName: toolExport.value,
    cover: cover.value,
    source: {
      cdn: toolCdn.value,
    },
  }).then(() => {
    router.push({ path: '/marketplace' });
  });
}

async function setCover(event: Event) {
  cover.value = (event.target as HTMLInputElement).files?.[0];

  function arrayBufferToBase64(buffer: ArrayBuffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;

    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  }

  if (cover.value) {
    const buffer = await cover.value?.arrayBuffer();
    const src = `data:image/png;base64,${arrayBufferToBase64(buffer)}`;

    localCover.value = src;
  }
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

.add-cover-label {
  cursor: pointer;
}

.add-cover-button {
  width: max-content;
  pointer-events: none;
}
</style>
