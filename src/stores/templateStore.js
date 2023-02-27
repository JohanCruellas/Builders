import { defineStore } from "pinia";

export const useTemplateStore = defineStore("templateStore", {
  state: () => {
    return {
      templateDataSource: {
        categories: [
          {
            name: "Gouvernance",
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
            name: "Achats responsables",
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
            name: "Relations et conditions de travail",
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
            name: "Environnement",
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
            name: "Conduite des affaires",
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
            name: "Clients et consommateurs",
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
            name: "Communautés et développement local",
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
            text: "Pourcentage de femmes dans l'entreprise",
            type: "Percent",
            formula:
              "{{#data:d0128a84-8e36-4db4-af91-981bb85aeb60}} / {{d0128a84-8e36-4db4-af91-981bb85aeb61}} * 100",
            data_keys: [
              "d0128a84-8e36-4db4-af91-981bb85aeb60 Nombre de femmes",
              "d0128a84-8e36-4db4-af91-981bb85aeb61 Nombre d'empployés",
            ],
          },
          {
            indicator_key: "d0128a84-8e36-4db4-af91-981bb85aeb60",
            text: "Parité Homme/Femme",
            type: "Compare",
            data_keys: [
              "d0128a84-8e36-4db4-af91-981bb85aeb60 Nombre d'hommes",
              "d0128a84-8e36-4db4-af91-981bb85aeb60 Nombre de femmes",
            ],
          },
        ],
        color: "#F8CBAD",
      },
      questionsTemplate: {
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
    };
  },
});
