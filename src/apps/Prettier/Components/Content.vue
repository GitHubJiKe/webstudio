<script setup lang="ts">
import { codeToHtml } from 'shiki'
import { onMounted, ref } from 'vue';


const contentRef = ref<HTMLDivElement>()

onMounted(async () => {
    const code = `
    const a = 1;

    function hello(name) {
        console.log("Hello",name);
    }
    ` // input code
    const html = await codeToHtml(code, {
        lang: 'javascript',
        theme: 'vitesse-dark'
    })
    contentRef.value!.innerHTML = html
})
</script>

<template>
    <section ref="contentRef" class="p-4 bg-yellow text-lg">
    </section>
</template>