import { createApp } from "vue";
import "./style.css";
import App from "./apps/App.vue";
import { createPinia } from "pinia";
import naive from "naive-ui";

// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";
// main.ts
import "virtual:uno.css";
const pinia = createPinia();
createApp(App).use(pinia).use(naive).mount("#app");
