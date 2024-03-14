<script setup lang="ts">
import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { Diagnostic, lintKeymap } from '@codemirror/lint';
import { onMounted } from 'vue';
import * as sql from '@codemirror/lang-sql';
import { oneDark } from '@codemirror/theme-one-dark';
import hljs from 'highlight.js';
import SQL from 'highlight.js/lib/languages/sql';
// @ts-ignore
import CodeEditor from "simple-code-editor";
// Load any languages you need
hljs.registerLanguage('sql', SQL);
import {
  keymap,
} from '@codemirror/view'
import { ref } from 'vue';
import javascript from 'highlight.js/lib/languages/javascript';

// Then register the languages you need
hljs.registerLanguage('javascript', javascript);
async function sqlLinter(view: EditorView) {
  let diagnostics: Diagnostic[] = []
  // @ts-ignore
  const text = view.state.doc.text[0]
  console.log(view.state, text);
  // @ts-ignore
  const parser = new window.NodeSQLParser.Parser();
  try {
    const ast = parser.astify(text);
    console.log("ast::", ast);
    const sql = parser.sqlify(ast);
    console.log("sql::", sql);
  } catch (error) {
    console.error("error::", error)
    // @ts-ignore
    diagnostics.push({
      // @ts-ignore
      from: error.location.start.offset,
      // @ts-ignore
      to: error.location.end.offset,
      severity: "error",
      // @ts-ignore
      message: error.message,
    });
  }
  return diagnostics


}

// Set up the CodeMirror editor with linting
const state = EditorState.create({
  doc: `select * from user wher name="小明"`,
  extensions: [oneDark,
    basicSetup,
    // @ts-ignore
    // linter(sqlLinter),
    // lintGutter(),
    sql.sql(),
    // ... other extensions like language support
    keymap.of([
      ...lintKeymap
    ])
  ]
});

onMounted(() => {
  const view = new EditorView({
    state,
    parent: document.body.querySelector('#sql')!
  });

})



const highLight = (code: string) => {
  return hljs.highlight(
    code,
    { language: 'sql' }
  ).value
}
const codeVal = ref(`select * from User where name='小明'`)
</script>

<template>
  <div class="m-1 bg-white">
    <h1 class="p-0 m-0">
      Demo
    </h1>
    <div id="sql">

    </div>
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
