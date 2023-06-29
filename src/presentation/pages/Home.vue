<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <p>This is the home page content.</p>
    <editor></editor>
  </div>
</template>

<script lang="ts">
import Editor from '../components/editorjs/Editor.vue';

export default {
  name: 'Home',
  components: { Editor },
};
</script>

<style>

</style>
