<script setup lang="ts">
import { markRaw, ref, watchEffect } from 'vue';
import { APP_LIST } from '../constant';
import App from './App/App.vue';
import Demo from './Demo/App.vue'


const currentApp = ref(markRaw(App))

const appName = ref('App')

watchEffect(() => {
  if (appName.value === APP_LIST[0].value) {
    currentApp.value = markRaw(App)
  }

  if (appName.value === APP_LIST[1].value) {
    currentApp.value = markRaw(Demo)
  }
})

</script>

<template>
  <div class="h-full">
    <main class="h-full">
      <component :is="currentApp" />
    </main>
    <div class="pos-absolute bottom-10 right-10">
      <select name="appName" v-model="appName">
        <option :value="item.value" v-for="item in APP_LIST" :key="item.value">{{ item.name }}</option>
      </select>
    </div>
  </div>
</template>

<style scoped></style>
