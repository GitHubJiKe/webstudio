import { defineStore } from "pinia";

export const usePrettierStore = defineStore("Prettier", {
  state: () => {
    return {
      code: `
    const a = 1;
    function hello(name) {
        console.log("Hello",name);
    }
    `,
      currentTheme: "vitesse-dark",
      currentLang: "javascript",
    };
  },
});
