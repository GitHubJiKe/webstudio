<script setup lang="ts">
import { markRaw, ref, watchEffect } from 'vue';
import { APP_LIST } from '../constant';
import Prettier from './Prettier/App.vue';
import Demo from './Demo/App.vue'
import TalkIsCheap from './TalkIsCheap/App.vue'


const currentApp = ref(markRaw(Prettier))

const appName = ref('TalkIsCheap')

watchEffect(() => {
  if (appName.value === APP_LIST[0].value) {
    currentApp.value = markRaw(Prettier)
  }

  if (appName.value === APP_LIST[1].value) {
    currentApp.value = markRaw(Demo)
  }
  if (appName.value === APP_LIST[2].value) {
    currentApp.value = markRaw(TalkIsCheap)
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
