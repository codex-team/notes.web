<template>
  <RouterLink
    to="/settings"
    class="header-user"
  >
    <!-- referrerpolicy allows us to get images from other sites while on localhost -->
    <img
      :src="user.photo"
      alt="User avatar"
      referrerpolicy="no-referrer"
    >
  </RouterLink>
</template>

<script setup lang="ts">
import type { User } from '@/domain/entities/User';

defineProps<{
  user: User;
}>();

</script>

<style>
.header-user {
  display: flex;
  width: var(--layout-header-avatar);
  height: var(--layout-header-avatar);
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(20%);
  }
}
</style>
