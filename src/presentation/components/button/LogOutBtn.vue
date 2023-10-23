<template>
    <Button 
  text="Log out"
  :icon="IconUnlink"
  type="primary"
  @click="logOut"
  />
</template>

<script setup lang="ts">
import { IconUnlink } from '@codexteam/icons';
import Button from './Button.vue';
import { authService } from '@/domain/index';
import { useRouter } from 'vue-router';

const router = useRouter();

/**
 * Function to logout the user by deleting the refresh 
 * token from the local storage
 */

 async function logOut() {
    
    await authService.logout().then(() => {
    router.push({ path: "/" }).then(() => {
      window.location.reload();
    });
  });

      
      
  }
 

</script>