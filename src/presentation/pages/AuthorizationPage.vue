<template>
  <MessageCard
    :title="t('authorize.title')"
    :text="t('authorize.message')"
  >
    <template #picture>
      <Logo :class="$style.logo" />
    </template>
    <Button @click="showGoogleAuthPopup">
      {{ t('auth.continueWithGoogle') }}
    </Button>
  </MessageCard>
</template>

<script setup lang="ts">
import { useAppState } from '@/application/services/useAppState';
import useAuth from '@/application/services/useAuth';
import usePageTitle from '@/application/services/usePageTitle';
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { Button } from '@codexteam/ui/vue';
import { Logo } from '@/presentation/components/pictures';
import MessageCard from '@/presentation/components/message-card/MessageCard.vue';

const { user } = useAppState();
const { showGoogleAuthPopup } = useAuth();
const { t } = useI18n();
const router = useRouter();

const props = defineProps<{
  /**
   * Page the user wanted to visit, opened after authorization
   */
  redirect?: string;
}>();

usePageTitle(() => t('pages.authorization'));

watch(user, (value) => {
  if (value) {
    void router.replace(props.redirect?.startsWith('/') ? props.redirect : '/');
  }
}, { immediate: true });
</script>

<style lang="postcss" module>
.logo {
  width: 60px;
  height: 24px;
}
</style>
