import { defineStore } from "pinia";

export const useTemplateStore = defineStore("templateStore", {
  state: () => {
    return {
      sourceDataTemplate: {
        categories: [],
      },
      indicatorsTemplate: {
        categories: [],
      },
      questionsTemplate: {
        categories: [],
      },
      axisTemplate: {
        categories: []
      }
    };
  },
});
