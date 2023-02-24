import { defineStore } from "pinia";

export const useTemplateStore = defineStore("templateStore", {
  state: () => {
    return {
      categories: [
        {
          name: "Gouvernance",
          datas: [
            {
              data_key: "",
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
              data_key: "",
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
              data_key: "",
              info: "",
              text: "Effectif total ",
            },
            {
              data_key: "",
              info: "",
              text: "CDI ",
            },
            {
              data_key: "",
              info: "",
              text: "Nombre d'Accidents du travail",
            },
            {
              data_key: "",
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
              data_key: "",
              info: "",
              text: "Volume de déchets total (tonnes)",
            },
            {
              data_key: "",
              info: "",
              text: "Consommation électricité (KwH)",
            },
            {
              data_key: "",
              info: "",
              text: "Nombre d'unités d'œuvres",
            },
            {
              data_key: "",
              info: "",
              text: "Volume de déchets total (tonnes)",
            },
          ],
          color: "#A9D18E",
        },
        {
          name: "Conduite des affaires",
          datas: [
            {
              data_key: "",
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
      questionsTemplate: {
        categories: [
          {
            name: "Gourvernance",
            children: [
              {
                name: "Sous-Gouvernance 1",
                info: "",
                color: "#FFD966",
                questions: []
              },
              {
                name: "Sous-Gouvernance 2",
                info: "",
                color: "#FFD966",
                questions: []
              },
              {
                name: "Sous-Gouvernance 3",
                info: "",
                color: "#FFD966",
                questions: []
              }
            ],
            questions: [

            ],
            info: "",
            color: "#FFD966",
          },
          {
            name: "Achats responsables",
            children: [],
            questions: [

            ],
            info: "",
            color: "#F8CBAD",
          }, {
            name: "Relations et conditions de travail",
            children: [],
            questions: [

            ],
            info: "",
            color: "#D6DCE5",
          }, {
            name: "Environnement",
            children: [],
            questions: [

            ],
            info: "",
            color: "#A9D18E",
          }
        ]
      }
    };
  },
});
