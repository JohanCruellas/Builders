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
      },
      documents: [
        {
          "id": "d0128a84-8e36-4db4-af91-981bb85aeb60",
          "document_key": "d0128a84-8e36-4db4-af91-981bb85aeb60",
          "name": "Bilan Carbone 01",
          "template": "<div><h1>Ceci est un bilan carbone : {{d0128a84-8e36-4db4-af91-981bb85aeb61}}</h1></div>"
        },
        {
          "id": "d0128a84-8e36-4db4-af91-981bb85aeb50",
          "document_key": "d0128a84-8e36-4db4-af91-981bb85aeg55",
          "name": "Bilan Carbone 02",
          "template": "<div><h1>Ceci est un bilan carbone : {{d0128a84-8e36-4db4-af91-981bb85aeb61}}</h1></div>"
        },
        {
          "id": "d0128a84-8e36-4db4-af91-981bb85aeb40",
          "document_key": "d0128a84-8e36-4db4-af91-981bb85aez88",
          "name": "Bilan Carbone 03",
          "template": "<div><h1>Ceci est un bilan carbone : {{d0128a84-8e36-4db4-af91-981bb85aeb61}}</h1></div>"
        }
      ],
      selectedNodes: []
    };
  },
});
