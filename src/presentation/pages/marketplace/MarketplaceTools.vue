<template>
  <div class="marketplace">
    <PageHeading>
      {{ t('marketplace.title') }}
      <template #description>
        {{ t('marketplace.subtitle') }}
      </template>
      <template #actions>
        <Button
          secondary
          icon="Plus"
          @click="router.push('/marketplace/add')"
        >
          {{ t('marketplace.addTool') }}
        </Button>
      </template>
    </PageHeading>
    <Container>
      <EditorToolElement
        v-for="(tool, index) in tools"
        :key="tool.id"
        :tool="tool"
        :has-delimiter="index !== tools.length - 1"
      />
      <template v-if="tools.length === 0">
        <div
          v-for="index in 4"
          :key="index"
          class="skeleton"
        />
      </template>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Button, Container } from '@codexteam/ui/vue';
import useMarketplace from '@/application/services/useMarketplace';
import usePageTitle from '@/application/services/usePageTitle';
import EditorToolElement from '@/presentation/components/marketplace/EditorToolElement.vue';
import PageHeading from '@/presentation/components/pageHeading/PageHeading.vue';

const { t } = useI18n();
const router = useRouter();
const { tools } = useMarketplace();

usePageTitle(() => t('marketplace.title'));
</script>

<style scoped lang="postcss">
.marketplace {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.skeleton {
  height: 60px;
  margin: 0 var(--h-padding);
  border-bottom: 1px solid var(--base--border);
  background: linear-gradient(90deg, color-mix(in srgb, var(--base--text-secondary) 10%, transparent) 50%, transparent 50%) no-repeat center / 100% 12px;
  animation: pulse 1.4s ease-in-out infinite;

  &:last-child {
    border-bottom: 0;
  }
}

@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
</style>
