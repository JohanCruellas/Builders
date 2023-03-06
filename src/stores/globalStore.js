import { defineStore } from "pinia";

export const useGlobalStore = defineStore("globalStore", {
  state: () => {
    return {
      lang: 'frFR',
      modal: false,
      index: '',
      type: '',
      input: '',
    };
  },
});
