import { defineStore } from "pinia";

export const useTemplateStore = defineStore("templateStore", {
  state: () => {
    return {
      sourceDataTemplate: {},
      indicatorsTemplate: {},
      questionsTemplate: {
        "e614be2d-c644-4a70-ac95-d10ebb8cdfss": {
          stakeId: "e614be2d-c644-4a70-ac95-d10ebb8cdf15",
          axisId: "e614be2d-c644-4a70-ac95-d10ebb8cdf14",
          text: "MockQuestion1",
          options: []
        },
        "e614be2d-c644-4a70-ac95-d10ebb8cdfee": {
          stakeId: "e614be2d-c644-4a70-ac95-d10ebb8cdf15",
          axisId: "e614be2d-c644-4a70-ac95-d10ebb8cdf14",
          text: "MockQuestion2",
          options: []
        },
        "e614be2d-c644-4a70-ac95-d10ebb8cdfzzz": {
          stakeId: "e614be2d-c644-4a70-ac95-d10ebb8cdfzz",
          axisId: "e614be2d-c644-4a70-ac95-qshdbjqsdhj",
          text: "MockQuestionNotInAxis",
          options: []
        },
      },
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
