<template>
  <h1>{{ t('settings.title') }}</h1>
  <ThemeButton />
  <Button
    :text="t('auth.logout')"
    type="primary"
    :icon="IconUnlink"
    @click="logout"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import ThemeButton from '../components/theme/ThemeButton.vue';
import Button from '../components/button/Button.vue';
import { IconUnlink } from '@codexteam/icons';
import { useRouter } from 'vue-router';
import useAuth from '@/application/services/useAuth';

const { t } = useI18n();
const router = useRouter();
const { logoutTheUser } = useAuth();

/**
 * Function to logout the user by deleting the refresh  token from the local storage and redirecting to the main page
 */
async function logout() {
  await logoutTheUser().then(() => {
    router.push({ path: '/' });
  });
}
</script>
<style scoped>
</style>
