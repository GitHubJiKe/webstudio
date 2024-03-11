import { createApp } from "vue";
import "./style.css";
import App from "./apps/App.vue";
import { createPinia } from "pinia";
// main.ts
import "virtual:uno.css";
const pinia = createPinia();
createApp(App).use(pinia).mount("#app");
