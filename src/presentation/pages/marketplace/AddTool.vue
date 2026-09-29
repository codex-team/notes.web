<template>
  <form
    class="add-tool"
    novalidate
    @submit.prevent="submit"
  >
    <PageHeading>
      {{ t('marketplace.addTool') }}
      <template #description>
        {{ t('marketplace.addToolCaption') }}
      </template>
    </PageHeading>

    <Fieldset :title="t('marketplace.userPerspective')">
      <Section
        v-for="field in userFields"
        :key="field"
        :title="t(`marketplace.newTool.${field}.label`)"
        :caption="errors[field] ?? t(`marketplace.newTool.${field}.caption`)"
        :class="{ 'has-error': errors[field] }"
      >
        <Input
          v-model="form[field]"
          :placeholder="t(`marketplace.newTool.${field}.placeholder`)"
        />
      </Section>
    </Fieldset>

    <Fieldset :title="t('marketplace.technicalDetails')">
      <Section
        v-for="field in technicalFields"
        :key="field"
        :title="t(`marketplace.newTool.${field}.label`)"
        :caption="errors[field] ?? t(`marketplace.newTool.${field}.caption`)"
        :class="{ 'has-error': errors[field] }"
      >
        <Input
          v-model="form[field]"
          :placeholder="t(`marketplace.newTool.${field}.placeholder`)"
        />
      </Section>
    </Fieldset>

    <div class="add-tool__footer">
      <Button :icon="isSubmitting ? 'Loader' : undefined">
        {{ t('marketplace.newTool.add') }}
      </Button>
      <span
        v-if="submitError"
        class="add-tool__error text-ui-base"
      >
        {{ submitError }}
      </span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Section, Input, Button, Fieldset } from '@codexteam/ui/vue';
import useMarketplace from '@/application/services/useMarketplace';
import usePageTitle from '@/application/services/usePageTitle';
import PageHeading from '@/presentation/components/pageHeading/PageHeading.vue';

const { t } = useI18n();
const { addTool } = useMarketplace();
const router = useRouter();

const userFields = ['title', 'description'] as const;
const technicalFields = ['name', 'cdn', 'exportName'] as const;

type Field = typeof userFields[number] | typeof technicalFields[number];

const form = reactive<Record<Field, string>>({
  title: '',
  description: '',
  name: '',
  cdn: '',
  exportName: '',
});

const isSubmitting = ref(false);

const isSubmitted = ref(false);

const submitError = ref('');

/**
 * Validation messages, shown after the first submit attempt
 */
const errors = computed<Partial<Record<Field, string>>>(() => {
  if (!isSubmitted.value) {
    return {};
  }

  const result: Partial<Record<Field, string>> = {};

  if (form.title.trim() === '') {
    result.title = t('marketplace.newTool.title.error');
  }
  if (!/^[a-zA-Z][\w-]*$/.test(form.name.trim())) {
    result.name = t('marketplace.newTool.name.error');
  }
  if (!/^https:\/\/\S+$/.test(form.cdn.trim())) {
    result.cdn = t('marketplace.newTool.cdn.error');
  }
  if (!/^[A-Za-z_$][\w$]*$/.test(form.exportName.trim())) {
    result.exportName = t('marketplace.newTool.exportName.error');
  }

  return result;
});

usePageTitle(() => t('marketplace.addTool'));

/**
 * Validates the form and adds the tool to the marketplace
 */
async function submit() {
  isSubmitted.value = true;
  submitError.value = '';

  if (Object.keys(errors.value).length > 0 || isSubmitting.value) {
    return;
  }

  isSubmitting.value = true;

  try {
    await addTool({
      name: form.name.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      exportName: form.exportName.trim(),
      source: {
        cdn: form.cdn.trim(),
      },
    });
    void router.push('/marketplace');
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : t('errors.default');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped lang="postcss">
.add-tool {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);

  &__footer {
    display: flex;
    align-items: center;
    gap: var(--spacing-m);
  }

  &__error {
    color: var(--red--solid);
  }
}

.has-error :deep(.text-ui-subtle) {
  color: var(--red--solid);
}
</style>
