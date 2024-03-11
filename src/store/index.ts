import { defineStore } from "pinia";

export const useAppStore = defineStore("apps", {
  state: () => {
    return { currentApp: "" };
  },
});
