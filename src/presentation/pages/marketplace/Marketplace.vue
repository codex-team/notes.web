<template>
  <div class="marketplace">
    <Heading
      :level="1"
    >
      {{ $t('marketplace.title') }}
    </Heading>
    <Heading
      :level="2"
      class="marketplace__subheader"
    >
      {{ $t('marketplace.listOfTools') }}
    </Heading>
    <div class="toolCards">
      <template
        v-for="tool in tools"
        :key="tool.id"
      >
        <EditorToolElement :tool="tool" />
      </template>
    </div>
    <Button
      link="/marketplace/add"
      :text="$t('marketplace.addTool')"
    />
  </div>
</template>

<script setup lang="ts">
import useMarketplace from '@/application/services/useMarketplace';
import EditorToolElement from '@/presentation/components/marketplace/EditorToolElement.vue';
import Button from '@/presentation/components/button/Button.vue';
import { Heading } from 'codex-ui/vue';

const { tools } = useMarketplace();
</script>

<style setup lang="postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
  @apply --text-heading-1;
}

.marketplace {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  width: var(--layout-content-width);

  &__subheader {
    margin-bottom: var(--spacing-l);
  }
}

.toolCards {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: var(--spacing-s);
}
</style>
