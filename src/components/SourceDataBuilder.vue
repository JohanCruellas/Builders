<template>
  <div class="q-pa-md container bg-grey-2">
    <div
      class="categories"
      v-for="(category, categoryIndex) in categories"
      :key="categoryIndex"
    >
      <div class="bg-category" :style="{ 'background-color': category.color }">
        <div class="category-title">{{ category.name }}</div>
        <q-card class="card">
          <q-scroll-area class="scroll-area">
            <ul>
              <li v-for="(data, dataIndex) in category.datas" :key="dataIndex">
                <div class="flex">
                  <div class="q-mr-md">{{ data.text }}</div>
                  <q-icon
                    name="settings"
                    class="cursor-pointer"
                    @click="openUpdateModal(categoryIndex, dataIndex)"
                  ></q-icon>
                  <q-icon
                    name="close"
                    class="cursor-pointer"
                    @click="removeData(categoryIndex, dataIndex)"
                  ></q-icon>
                </div>
              </li>
            </ul>
          </q-scroll-area>
        </q-card>
      </div>
    </div>
  </div>
  <div style="width: 100%" class="flex flex-center">
    <q-btn label="Ajouter une nouvelle donnée" @click="openAddModal" />
  </div>

  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 100%">
      <q-card-section>
        <q-form class="form">
          <q-input v-model="dataName" label="Nom de la donnée" />
          <q-input v-model="tooltip" label="Info tooltip" />
          <q-select v-model="select" :options="options"></q-select>
          <div class="flex flex-center">
            <q-btn
              v-if="isEdited"
              label="Modifier"
              type="submit"
              color="primary"
              @click="saveEdit"
            ></q-btn>
            <q-btn
              v-else
              label="Enregistrer"
              type="submit"
              color="primary"
              @click="addData"
            />
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions class="justify-end">
        <q-btn flat label="Retour" v-close-popup float-right />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { SourceData } from "../classes/source_data.js";

export default defineComponent({
  name: "sourceDataBuilder",
  data() {
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
      persistent: false,
      dataName: "",
      tooltip: "",
      select: "",
      options: [],
      stockedIndexes: [],
      isEdited: false,
    };
  },
  methods: {
    addData() {
      let selectedCategory = this.categories.find(
        (category) => category.name == this.select
      );
      selectedCategory.datas.push(new SourceData(this.tooltip, this.dataName));
    },

    openAddModal() {
      this.persistent = true;
      this.isEdited = false;
    },

    removeData(categoryIndex, dataIndex) {
      let dataCategory = this.categories[categoryIndex].datas;
      dataCategory.splice(dataIndex, 1);
    },
    openUpdateModal(categoryIndex, dataIndex) {
      this.persistent = true;
      this.isEdited = true;

      this.dataName = this.categories[categoryIndex].datas[dataIndex].text;
      this.tooltip = this.categories[categoryIndex].datas[dataIndex].info;
      this.select = this.categories[categoryIndex].name;
      this.stockedIndexes = [categoryIndex, dataIndex];
    },

    saveEdit() {
      this.categories[this.stockedIndexes[0]].datas[
        this.stockedIndexes[1]
      ].text = this.dataName;
      this.categories[this.stockedIndexes[0]].datas[
        this.stockedIndexes[1]
      ].info = this.tooltip;

      if (this.select !== this.categories[this.stockedIndexes[0]].name) {
        let selectedItem = this.categories[this.stockedIndexes[0]].datas.splice(
          this.stockedIndexes[1],
          1
        )[0];

        this.categories
          .find((category) => category.name == this.select)
          .datas.push(selectedItem);
        console.log(this.categories);
      }

      this.persistent = false;
    },

  },
  mounted() {

    this.categories.forEach((category) => {
      this.options.push(category.name);
    });
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  column-gap: 1em;
  row-gap: 1em;
  width: 90%;
  max-height: 80vh;
  height: 100vh;
  border: 2px solid black;
}

.categories {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 40%;
}

.bg-category {
  width: 100%;
  height: 100%;
  padding: 0.5em;
}

.card {
  margin: 0.5em auto;
  width: 95%;
  height: 80%;
  background-color: rgb(248, 240, 235);
}

.scroll-area {
  height: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  row-gap: 1em;
}
</style>
