<template>
  <div
    class="container"
    data-dimensions="large"
  >
    <PageHeading>
      {{ $t("marketplace.addTool") }}
      <template #description>
        {{ $t('marketplace.subtitle') }}
      </template>
    </PageHeading>
    <Fieldset
      :title="$t('marketplace.userPerspective')"
    >
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
        :title="$t('marketplace.newTool.description.label')"
        :caption="$t('marketplace.newTool.description.caption')"
      >
        <Input
          v-model:model-value="description"
          name="description"
          :placeholder="$t('marketplace.newTool.description.placeholder')"
        />
      </Section>
      <Section :title="$t('marketplace.newTool.picture.label')">
        <Card
          :subtitle="$t('marketplace.newTool.picture.description')"
          orientation="horizontal"
          :icon="isLoading ? 'Loader' : undefined"
          :src="localCover"
        >
          <input
            ref="selectFileInput"
            type="file"
            hidden
            accept="image/*"
            enctype="multipart/form-data"
            @change="setCover($event)"
          >

          <Button
            secondary
            class="add-cover-button"
            @click="selectFileInput?.click()"
          >
            {{ $t('marketplace.selectFile') }}
          </Button>
        </Card>
      </Section>
    </Fieldset>
    <Fieldset
      :title="$t('marketplace.technicalDetails')"
    >
      <Section
        :title="$t('marketplace.newTool.name.label')"
        :caption="$t('marketplace.newTool.name.caption')"
      >
        <Input
          v-model:model-value="toolName"
          size="small"
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
        :title="$t('marketplace.newTool.exportName.label')"
        :caption="$t('marketplace.newTool.exportName.caption')"
      >
        <Input
          v-model:model-value="toolExport"
          name="toolExport"
          :placeholder="$t('marketplace.newTool.exportName.placeholder')"
        />
      </Section>
    </Fieldset>
    <Button
      type="submit"
      class="add-tool-button"
      @click.passive="onClick"
    >
      {{ $t("marketplace.newTool.add") }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import useMarketplace from '@/application/services/useMarketplace';
import { Section, Input, Button, Card, Fieldset } from 'codex-ui/vue';
import PageHeading from '@/presentation/components/pageHeading/PageHeading.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { arrayBufferToBase64 } from '@/infrastructure/utils/buffer';

const { addTool } = useMarketplace();
const router = useRouter();

const toolName = ref('');
const toolCdn = ref('');
const toolTitle = ref('');
const toolExport = ref('');
const description = ref('');
const cover = ref<File | undefined>(undefined);
const localCover = ref<string | undefined>(undefined);

const selectFileInput = ref<HTMLInputElement>();

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

/**
 * Set local cover image
 *
 * @param event - on change file event
 */
async function setCover(event: Event) {
  cover.value = (event.target as HTMLInputElement).files?.[0];

  if (cover.value) {
    const buffer = await cover.value?.arrayBuffer();

    // Works fine with jpeg too
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
  width: var(--layout-content-width);
}

.add-tool-button {
  width: max-content;
}

.add-cover-button {
  width: max-content;
}
</style>
