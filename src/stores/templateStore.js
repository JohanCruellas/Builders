import { defineStore } from "pinia";

export const useTemplateStore = defineStore("templateStore", {
  state: () => {
    return {
      sourceDataTemplate: {
        categories: [
          {
            text: { frFR: "Gouvernance", enUS: "Governance" },
            datas: [
              {
                data_key: "data_key_1",
                info: {
                  frFR: "",
                  enUS: "",
                },
                text: {
                  frFR: "Nombre de réunions du COMEX intégrant le suivi de la démarche RSE",
                  enUS: "Number of COMEX reunions integrating the RSE process monitoring",
                },
              },
            ],
            color: "#FFD966",
          },
          {
            text: {
              frFR: "Achats responsables",
              enUS: "Responsible purchases",
            },
            datas: [
              {
                data_key: "data_key_2",
                info: {
                  frFR: "",
                  enUS: "",
                },
                text: {
                  frFR: "",
                  enUS: "",
                },
              },
            ],
            color: "#F8CBAD",
          },
          {
            text: {
              frFR: "Relations et conditions de travail",
              enUS: "Relationships and working conditions",
            },

            datas: [
              {
                data_key: "data_key_3",

                info: {
                  frFR: "",
                  enUS: "",
                },
                text: {
                  frFR: "Effectif total ",
                  enUS: "Total headcount",
                },
              },
              {
                data_key: "data_key_4",

                info: "",
                text: {
                  frFR: "CDI",
                  enUS: "Permanent contract",
                },
              },
              {
                data_key: "data_key_5",

                info: "",
                text: {
                  frFR: "Nombre d'Accidents du travail",
                  enUS: "Number of work-related accidents",
                },
              },
              {
                data_key: "data_key_6",

                info: "",
                text: {
                  frFR: "Chiffre d'affaires",
                  enUS: "Turnover",
                },
              },
            ],
            color: "#D6DCE5",
          },
          {
            text: { frFR: "Environnement", enUS: "Environment" },

            datas: [
              {
                data_key: "data_key_7",

                iinfo: {
                  frFR: "",
                  enUS: "",
                },
                text: {
                  frFR: "Volume de déchets total (tonnes)",
                  enUS: "Waste total volume (tons",
                },
              },
              {
                data_key: "data_key_8",

                info: "",
                text: {
                  frFR: "Consommation électricité (KwH)",
                  enUS: "Electricity consumption (KwH)",
                },
              },
              {
                data_key: "data_key_9",

                info: "",
                text: {
                  frFR: "Nombre d'unités d'œuvres",
                  enUS: "Number of work unit",
                },
              },
            ],
            color: "#A9D18E",
          },
          {
            text: {
              frFR: "Conduite des affaires",
              enUS: "Business management",
            },
            datas: [
              {
                data_key: "data_key_10",

                info: {
                  frFR: "",
                  enUS: "",
                },
                text: "",
              },
            ],
            color: "#B4C7E7",
          },
          {
            text: {
              frFR: "Clients et consommateurs",
              enUS: "Customers and consumers",
            },
            datas: [
              {
                data_key: "",
                info: {
                  frFR: "",
                  enUS: "",
                },
                text: "",
              },
            ],
            color: "#FF781D",
          },
          {
            text: {
              frFR: "Communautés et développement local",
              enUS: "Communities and local development",
            },
            datas: [
              {
                data_key: "",
                info: {
                  frFR: "",
                  enUS: "",
                },
                text: "",
              },
            ],
            color: "#F6B600",
          },
        ],
      },
      indicatorsTemplate: {
        indicators: [
          {
            indicator_key: "d0128a84-8e36-4db4-af91-981bb85aeb60",
            text: {
              frFR: "Pourcentage de femmes dans l'entreprise",
              enUS: "Percentage of women in the company",
            },
            info: {
              frFR: "",
              enUS: "",
            },
            type: {
              frFR: "Pourcentage",
              enUS: "Percent",
            },
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
            info: {
                  frFR: "",
                  enUS: "",
                },
            type: {
              frFR: "Ratio",
              enUS: "Ratio",
            },
            data_keys: [
              "d0128a84-8e36-4db4-af91-981bb85aeb60 Nombre d'hommes",
              "d0128a84-8e36-4db4-af91-981bb85aeb60 Nombre de femmes",
            ],
          },
          {
            indicator_key: "sdf3543544-3sdf45fds4-34fg4353d",
            text: {
              frFR: "Salaire médian",
              enUS: "Average salary",
            },
            info: {
                  frFR: "",
                  enUS: "",
                },
            type: {
              frFR: "Valeur brute",
              enUS: "Raw value",
            },
            data_keys: [
              "d0128a84-8e36-4db4-af91-98544ds54sqq Somme des salaires",
              "d0128a84-8e36-4db4-af91-2354sqdqsd45 Nombre d'employés'",
            ],
          },
          // {
          //   indicator_key: "sdf3543544-3sdf45fds4-34fg4353d",
          //   text: {
          //     frFR: "Nombre d'employés",
          //     enUS: "Number of employees",
          //   },
          //   type: {
          //     frFR: "Donnée source",
          //     enUS: "Source data",
          //   },
          //   data_keys: [
          //     "d0128a84-8e36-4db4-af91-981bb85aeb60 Nombre d'employés",
          //   ],
          // },
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
