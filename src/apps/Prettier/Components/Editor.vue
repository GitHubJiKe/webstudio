<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { onMounted, ref, watchEffect } from 'vue';
import { getHighlighter } from 'shiki'
import { shikiToMonaco } from '@shikijs/monaco'
import { usePrettierStore } from '../store';
import { themes } from '../constant/themes';
import { grammars } from '../constant/langs';
const store = usePrettierStore()

const { currentTheme, currentLang, code } = store

let editor: monaco.editor.IStandaloneCodeEditor;
const highlighter = ref();

onMounted(async () => {
    // Create the highlighter, it can be reused
    highlighter.value = await getHighlighter({
        themes: [
            'vitesse-dark',
            'vitesse-light',
        ],
        langs: [
            'javascript',
            'typescript',
            'vue',
            'css',
            'less',
            'scss'
        ],
    })

    // Register the languageIds first. Only registered languages will be highlighted.


    grammars.forEach(item => {
        monaco.languages.register({ id: item.name })
    })

    // Register the themes from Shiki, and provide syntax highlighting for Monaco.
    shikiToMonaco(highlighter.value, monaco)

    editor = monaco.editor.create(document.getElementById('editor')!, {
        value: code,
        language: currentLang,
        theme: currentTheme,
    });

})

watchEffect(() => {
    if (editor) {
        const codeVal = editor.getValue();
        store.code = codeVal
    }
})

</script>

<template>
    <div class="flex flex-col">
        <div id="operator">
            <label for="theme">Theme:</label>
            <select name="theme" id="theme" v-model="currentTheme">
                <option v-for="item in themes" :value="item.name">{{ item.displayName }}</option>
            </select>
            <label for="lang">Language:</label>
            <select name="lang" id="lang" v-model="currentLang">
                <option v-for="item in grammars" :value="item.name">{{ item.displayName }}</option>
            </select>
        </div>
        <div id="editor" class="flex-1"></div>
    </div>
</template>

<style lang="less" scoped></style>