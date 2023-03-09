import { defineStore } from "pinia";

export const useTemplateStore = defineStore("templateStore", {
  state: () => {
    return {
      sourceDataTemplate: {
        "e614be2d-c644-4a70-ac95-d10ebb8cdf12": {
          // id: 'e614be2d-c644-4a70-ac95-d10ebb8cdf12',
          stakeId: 'e614be2d-c644-4a70-ac95-d10ebb8cdf15',
          axisId: "e614be2d-c644-4a70-ac95-d10ebb8cdf14",
          text: { enUS: "test 1", frFR: 'test 1' },
          info: { enUS: "I am test1", frFR: 'je suis test1' }
        },
        "e614be2d-c644-4a70-ac95-d10ebb8cdf16": {
          // id: 'e614be2d-c644-4a70-ac95-d10ebb8cdf16"',
          stakeId: 'e614be2d-c644-4a70-ac95-d10ebb8cdf19',
          axisId: "e614be2d-c644-4a70-ac95-d10ebb8cdf11",
          text: { enUS: "test 2", frFR: 'test 2' },
          info: { enUS: "I am test2", frFR: 'je suis test2' }
        },
      },
      indicatorsTemplate: [],
      questionsTemplate: [],
      axisTemplate: {
        categories: [
          {
            id: "e614be2d-c644-4a70-ac95-d10ebb8cdf14",
            label: { enUS: "Axis 1", frFR: 'Axe 1' },
            color: "#FFFFFF",
            stakes: [
              {
                id: "e614be2d-c644-4a70-ac95-d10ebb8cdf15",
                label: { enUS: "Stake 1", frFR: 'Enjeu 1' },
                parentId: "e614be2d-c644-4a70-ac95-d10ebb8cdf14",
              },
              {
                id: "e614be2d-c644-4a70-ac95-d10ebb8cdf20",
                label: { enUS: "Stake 2", frFR: 'Enjeu 2' },
                parentId: "e614be2d-c644-4a70-ac95-d10ebb8cdf14",
              }],
          },
          {
            id: "e614be2d-c644-4a70-ac95-d10ebb8cdf11",
            label: { enUS: "Axis 2", frFR: 'Axe 2' },
            color: "#FFFFFF",
            stakes: [
              {
                id: "e614be2d-c644-4a70-ac95-d10ebb8cdf19",
                label: { enUS: "Stake 1", frFR: 'Enjeu 1' },
                parentId: "e614be2d-c644-4a70-ac95-d10ebb8cdf11",
              },
              {
                id: "e614be2d-c644-4a70-ac95-d10ebb8cdf26",
                label: { enUS: "Stake 2", frFR: 'Enjeu 2' },
                parentId: "e614be2d-c644-4a70-ac95-d10ebb8cdf11",
              }],
          }
        ]
      }
    };
  },
});
