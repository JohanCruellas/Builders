import { defineStore } from "pinia";

export const useTemplateStore = defineStore("templateStore", {
  state: () => {
    return {
      sourceDataTemplate: [],
      indicatorsTemplate: [],
      questionsTemplate: [],
      axisTemplate: {
        categories: [{
          id: "e614be2d-c644-4a70-ac95-d10ebb8cdf14",
          label: "Axis 1",
          color: "#FFFFFF",
          stakes: [{
            id: "e614be2d-c644-4a70-ac95-d10ebb8cdf15",
            label: "Stake 1",
            parentId: "e614be2d-c644-4a70-ac95-d10ebb8cdf14",
          }]
        }]
      }
    };
  },
});
