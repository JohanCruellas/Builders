import { defineStore } from "pinia";

export const useTemplateStore = defineStore("templateStore", {
  state: () => {
    return {
      sourceDataTemplate: {
        "e614be2d-c644-4a70-ac95-d10ebb8cdf12": {
          // id: 'e614be2d-c644-4a70-ac95-d10ebb8cdf12',
          stakeId: 'e614be2d-c644-4a70-ac95-d10ebb8cdf15',
          axisId: "e614be2d-c644-4a70-ac95-d10ebb8cdf14",
          text: { enUS: "data 1 axis1 stake1", frFR: 'data 1 axe1 enjeu1' },
          tooltip: { enUS: "I am test1", frFR: 'je suis test1' }
        },
        "e614be2d-c644-4a70-ac95-d10ebb8cdf13": {
          // id: 'e614be2d-c644-4a70-ac95-d10ebb8cdf12',
          stakeId: 'e614be2d-c644-4a70-ac95-d10ebb8cdf15',
          axisId: "e614be2d-c644-4a70-ac95-d10ebb8cdf14",
          text: { enUS: "data 2 axis1 stake1", frFR: 'data 2 axe1 enjeu1' },
          tooltip: { enUS: "I am test1", frFR: 'je suis test1' }
        },
        "e614be2d-c644-4a70-ac95-d10ebb8cdf16": {
          // id: 'e614be2d-c644-4a70-ac95-d10ebb8cdf16"',
          stakeId: 'e614be2d-c644-4a70-ac95-d10ebb8cdf19',
          axisId: "e614be2d-c644-4a70-ac95-d10ebb8cdf11",
          text: { enUS: "data 1 axis2 stake1", frFR: 'data 1 axe2 enjeu1' },
          tooltip: { enUS: "I am test2", frFR: 'je suis test2' }
        },
        "e614be2d-c644-4a70-ac95-d10ebb8cdf55": {
          // id: 'e614be2d-c644-4a70-ac95-d10ebb8cdf12',
          stakeId: 'e614be2d-c644-4a70-ac95-d10ebb8cdf20',
          axisId: "e614be2d-c644-4a70-ac95-d10ebb8cdf14",
          text: { enUS: "data 1 axis1 stake2", frFR: 'data 1 axe1 enjeu2' },
          tooltip: { enUS: "I am test1", frFR: 'je suis test1' }
        },
        "e614be2d-c644-4a70-ac95-d10ebb8cdf30": {
          // id: 'e614be2d-c644-4a70-ac95-d10ebb8cdf16"',
          stakeId: 'e614be2d-c644-4a70-ac95-d10ebb8cdf26',
          axisId: "e614be2d-c644-4a70-ac95-d10ebb8cdf11",
          text: { enUS: "data 1 axis2 stake2", frFR: 'data 1 axe2 stake2' },
          tooltip: { enUS: "I am test2", frFR: 'je suis test2' }
        },
      },
      indicatorsTemplate: {
        "e614be2d-c644-4a70-ac95-d10ebb8cdf12": {
          // id: 'e614be2d-c644-4a70-ac95-d10ebb8cdf12',
          stakeId: 'e614be2d-c644-4a70-ac95-d10ebb8cdf15',
          axisId: "e614be2d-c644-4a70-ac95-d10ebb8cdf14",
          text: { enUS: "indicator 1", frFR: 'indicateur 1' },
          tooltip: { enUS: "I am indicator1", frFR: 'je suis indicateur1' },
          type: { enUS: "percent", frFR: 'pourcentage' },
          formula: 'formule indicateur 1',
        },
        "e614be2d-c644-4a70-ac95-d10ebb8cdf16": {
          // id: 'e614be2d-c644-4a70-ac95-d10ebb8cdf16"',
          stakeId: 'e614be2d-c644-4a70-ac95-d10ebb8cdf19',
          axisId: "e614be2d-c644-4a70-ac95-d10ebb8cdf11",
          text: { enUS: "indicator 2", frFR: 'indicateur 2' },
          tooltip: { enUS: "I am indicator2", frFR: 'je suis indicateur2' },
          type: { enUS: "Raw value", frFR: 'Valeur brute' },
          formula: 'formule indicateur 2',
        },
      },
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
        categories: [
          {
            id: "e614be2d-c644-4a70-ac95-d10ebb8cdf14",
            label: { enUS: "Axis 1", frFR: 'Axe 1' },
            color: "#FFFFFF",
            stakes: [
              {
                id: "e614be2d-c644-4a70-ac95-d10ebb8cdf15",
                label: { enUS: "Stake 1 of axis 1", frFR: 'Enjeu 1 de l\'axe 1' },
                parentId: "e614be2d-c644-4a70-ac95-d10ebb8cdf14",
              },
              {
                id: "e614be2d-c644-4a70-ac95-d10ebb8cdf20",
                label: { enUS: "Stake 2 of axis 1", frFR: 'Enjeu 2 de l\'axe 1' },
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
                label: { enUS: "Stake 1 of axis 1", frFR: 'Enjeu 1 de l\'axe 2' },
                parentId: "e614be2d-c644-4a70-ac95-d10ebb8cdf11",
              },
              {
                id: "e614be2d-c644-4a70-ac95-d10ebb8cdf26",
                label: { enUS: "Stake 2 of axis 2", frFR: 'Enjeu 2 de l\'axe 2' },
                parentId: "e614be2d-c644-4a70-ac95-d10ebb8cdf11",
              }],
          }
        ]
      }
    };
  },
});
