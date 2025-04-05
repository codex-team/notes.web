<template>
  <div :class="$style['message']">
    {{ t('authorize.message') }}
    <Button
      @click="showGoogleAuthPopup"
    >
      {{ t('auth.login') }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useAppState } from '@/application/services/useAppState';
import useAuth from '@/application/services/useAuth';
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { Button } from '@codexteam/ui/vue';

const { user } = useAppState();
const { showGoogleAuthPopup } = useAuth();
const { t } = useI18n();
const router = useRouter();

const props = defineProps<{
  /**
   * Link to auth guarded page
   * If user would authorized he will be redirected via this link
   */
  redirect: string;
}>();

/**
 * Checks status of user authorization
 * If user had been authorized, then redirects to page that he wanted to visit
 */
watch(user, () => {
  if (user.value !== null && user.value !== undefined) {
    router.push(props.redirect);
  }
});
</script>

<style lang="postcss" module>
.message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  gap: var(--spacing-l)
}
</style>
