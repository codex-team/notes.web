<template>
  <div class="marketplace">
    <PageHeading>
      {{ $t('marketplace.title') }}
      <template #description>
        {{ $t('marketplace.listOfTools') }}
      </template>
    </PageHeading>
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
import PageHeading from '@/presentation/components/pageHeading/PageHeading.vue';

const { tools } = useMarketplace();
</script>

<style setup lang="postcss" scoped>
@import '@/presentation/styles/typography.pcss';

.headings {
  padding: 0 var(--h-padding);
}

.marketplace {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxl);
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
