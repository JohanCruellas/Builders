import { defineStore } from "pinia";

export const useTemplateStore = defineStore("templateStore", {
  state: () => {
    return {
      templateDataSource: {
        categories: [
          {
            text: { frFR: "Gouvernance", enUS: "Governance" },
            datas: [
              {
                data_key: "data_key_1",
                info: "",
                text: "Nombre de réunions du COMEX intégrant le suivi de la démarche RSE",
              },
            ],
            color: "#FFD966",
          },
          {
            text: { frFR: "Achats responsables", enUS: "Responsible purchases" },
            datas: [
              {
                data_key: "data_key_2",

                info: "",
                text: "",
              },
            ],
            color: "#F8CBAD",
          },
          {
            text: "Relations et conditions de travail",
            datas: [
              {
                data_key: "data_key_3",

                info: "",
                text: "Effectif total ",
              },
              {
                data_key: "data_key_4",

                info: "",
                text: "CDI ",
              },
              {
                data_key: "data_key_5",

                info: "",
                text: "Nombre d'Accidents du travail",
              },
              {
                data_key: "data_key_6",

                info: "",
                text: "Chiffre d'affaires",
              },
            ],
            color: "#D6DCE5",
          },
          {
            text: "Environnement",
            datas: [
              {
                data_key: "data_key_7",

                info: "",
                text: "Volume de déchets total (tonnes)",
              },
              {
                data_key: "data_key_8",

                info: "",
                text: "Consommation électricité (KwH)",
              },
              {
                data_key: "data_key_9",

                info: "",
                text: "Nombre d'unités d'œuvres",
              },
            ],
            color: "#A9D18E",
          },
          {
            text: "Conduite des affaires",
            datas: [
              {
                data_key: "data_key_10",

                info: "",
                text: "",
              },
            ],
            color: "#B4C7E7",
          },
          {
            text: "Clients et consommateurs",
            datas: [
              {
                data_key: "",
                info: "",
                text: "",
              },
            ],
            color: "#FF781D",
          },
          {
            text: "Communautés et développement local",
            datas: [
              {
                data_key: "",
                info: "",
                text: "",
              },
            ],
            color: "#F6B600",
          },
        ],
      },
      templateIndicators: {
        indicators: [
          {
            indicator_key: "d0128a84-8e36-4db4-af91-981bb85aeb60",
            text: {
              frFR: "Pourcentage de femmes dans l'entreprise",
              enUS: "Percentage of women in the company",
            },
            type: "Percent",
            formula:
              "#data:d0128a84-8e36-4db4-af91-981bb85aeb60 / #data:d0128a84-8e36-4db4-af91-981bb85aeb61 * 100",
            data_keys: [
              "d0128a84-8e36-4db4-af91-981bb85aeb60",
              "d0128a84-8e36-4db4-af91-981bb85aeb61",
            ],
          },
          {
            indicator_key: "d0128a84-8e36-4db4-af91-981bb85aeb60",
            text: {
              frFR: "Parité Homme/Femme",
              enUS: "Man/Woman parity",
            },
            type: "Compare",
            data_keys: [
              "d0128a84-8e36-4db4-af91-981bb85aeb60 Nombre d'hommes",
              "d0128a84-8e36-4db4-af91-981bb85aeb60 Nombre de femmes",
            ],
          },
        ],
        color: "#F8CBAD",
      },
      templateQuestions: {
        categories: [
          {
            name: "Gourvernance",
            children: [
              {
                name: "Sous-Gouvernance 1",
                info: "",
                color: "#FFD966",
                questions: [],
              },
              {
                name: "Sous-Gouvernance 2",
                info: "",
                color: "#FFD966",
                questions: [],
              },
              {
                name: "Sous-Gouvernance 3",
                info: "",
                color: "#FFD966",
                questions: [],
              },
            ],
            questions: [],
            info: "",
            color: "#FFD966",
          },
          {
            name: "Achats responsables",
            children: [],
            questions: [],
            info: "",
            color: "#F8CBAD",
          },
          {
            name: "Relations et conditions de travail",
            children: [],
            questions: [],
            info: "",
            color: "#D6DCE5",
          },
          {
            name: "Environnement",
            children: [],
            questions: [],
            info: "",
            color: "#A9D18E",
          },
        ],
      },
      templateAxis: {
        categories: []
      }
    };
  },
});
