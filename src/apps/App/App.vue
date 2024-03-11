<script setup lang="ts">
import Content from './Components/Content.vue';
import Conf from './Components/Conf.vue';
import Editor from './Components/Editor.vue';

</script>

<template>
  <div class="flex justify-between p-4 h-full">
    <nav class="p-0 m-0 flex-4 flex flex-col">
      <Conf class="flex-4" />
      <Editor class="flex-8" />
    </nav>
    <Content class="flex-8" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
