import { defineStore } from "pinia";

export const useGlobalStore = defineStore("globalStore", {
  state: () => {
    return {
      modal: false,
      index: '',
      type: '',
      input: '',
    };
  },
});
