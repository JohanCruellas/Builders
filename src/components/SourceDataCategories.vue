<template>
  <div class="q-pa-md container bg-grey-2">
    <div class="categories" v-for="(category, categoryIndex) in categories" :key="categoryIndex">
      <div class="bg-category" :style="{ 'background-color': category.color }">
        <div class="category-title">{{ category.name }}</div>
        <q-card class="card">
          <q-scroll-area class="scroll-area">
            <SourceDataBuilder :categoryIndexProp="categoryIndex" @currentDatasSettings="showDataSettings">
            </SourceDataBuilder>
          </q-scroll-area>
        </q-card>
      </div>
    </div>
  </div>
  <div style="width: 100%" class="flex flex-center q-ma-md">
    <q-btn label="Ajouter une nouvelle donnée" @click="openAddModal()" class="q-ma-md" />
    <q-btn label="JSONIput" @click="toJSON()" class="q-ma-md" />
  </div>

  <q-card dark bordered class="bg-grey-9 my-card">
    <q-card-section>
      <div class="text-h6">JSON Output</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
      <pre>{{ JSONData }}</pre>
    </q-card-section>
  </q-card>

  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width: 100%">
      <q-card-section>
        <q-form class="form">
          <q-input v-model="dataName" label="Nom de la donnée" />
          <q-input v-model="tooltip" label="Info tooltip" />
          <q-select v-model="select" :options="options"></q-select>
          <div class="flex flex-center">
            <q-btn v-if="isEdited" label="Modifier" type="submit" color="primary" @click="saveEdit"></q-btn>
            <q-btn v-else label="Enregistrer" type="submit" color="primary" @click="addData" />
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
import SourceDataBuilder from "./SourceDataBuilder.vue";
import { useTemplateStore } from "src/stores/templateStore";
import { SourceData } from "src/classes/source_data";

const templateStore = useTemplateStore();

export default defineComponent({
  name: "SourceDataCategories",
  data() {
    return {
      categories: [],
      persistent: false,
      dataName: "",
      tooltip: "",
      select: "",
      options: [],
      stockedIndexes: [],
      isEdited: false,
      JSONData: null,

    };
  },
  methods: {
    openAddModal() {
      this.persistent = true;
      this.isEdited = false;
    },
    addData() {
      let selectedCategory = this.categories.find(
        (category) => category.name == this.select
      );
      selectedCategory.datas.push(new SourceData(this.tooltip, this.dataName));

      this.dataName = "";
      this.tooltip = "";
      this.select = "";
      this.persistent = false;
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
    showDataSettings(event) {
      this.persistent = event.persistent;
      this.dataName = event.dataName;
      this.tooltip = event.tooltip;
      this.select = event.select;
      this.stockedIndexes = event.stockedIndexes;
      this.isEdited = event.isEdited;
    },
    toJSON() {
      this.JSONData = JSON.stringify(templateStore.categories, null, 2)
    }
  },

  mounted() {
    this.categories = templateStore.categories;
    this.categories.forEach((category) => {
      this.options.push(category.name);
    });
  },
  components: {
    SourceDataBuilder,
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
