<template>
  <Button
    class="header__login"
    :text="t('auth.login')"
    :icon="IconUser"
    @click="showLoginPopup"
  />
</template>

<script setup lang="ts">
import { IconUser } from '@codexteam/icons';
import { useI18n } from 'vue-i18n';
import Button from '@/presentation/components/button/Button.vue';
import useAuth from '@/application/services/useAuth';

const { t } = useI18n();
const { showGoogleAuthPopup } = useAuth();

/**
 * Shows Google Authentication in a popup
 */
function showLoginPopup() {
  showGoogleAuthPopup();
}
</script>

<style scoped></style>
