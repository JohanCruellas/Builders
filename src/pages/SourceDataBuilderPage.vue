<template>
  <!-- <label class="title">{{ $t("sourceDataListTitle") }}</label>
  <div class="q-pa-md container bg-grey-2">
    <div class="categories" v-for="(category, categoryIndex) in categories" :key="categoryIndex">
      <div class="bg-category" :style="{ 'background-color': category.color }">
        <div class="category-title">{{ $getTrad(category.text, $i18n.locale) }}</div>
        <q-card class="card">
          <q-scroll-area class="scroll-area">
            <SourceDataBuilder :categoryIndexProp="categoryIndex" @currentDatasSettings="showDataSettings">
            </SourceDataBuilder>
          </q-scroll-area>
        </q-card>
      </div>
    </div>
  </div> -->
  <AxisSetter></AxisSetter>
  <div style="width: 100%" class="flex flex-center q-ma-md">
    <q-btn :label="$t('sourceDataAddButton')" @click="openAddModal()" class="q-ma-md" />
  </div>
  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width: 100%">
      <q-card-section>
        <q-form class="form">
          <q-input v-model="dataText" :label="$t('sourceDataNameInput')">
          </q-input>
          <q-input v-model="tooltip" :label="$t('sourceDataTooltipInput')" />
          <q-select v-model="select" :label="$t('sourceDataSelect')" :options="options"></q-select>
          <div class="flex flex-center">
            <q-btn v-if="isEdited" :label="$t('modifyBtn')" type="submit" color="primary" @click="saveEdit"></q-btn>
            <q-btn v-else :label="$t('saveBtn')" type="submit" color="primary" @click="addData" />
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions class="justify-end">
        <q-btn flat :label="$t('closeBtn')" v-close-popup float-right />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { useTemplateStore } from "src/stores/templateStore";
import { SourceData } from "src/classes/source_data";
import AxisSetter from "src/components/AxisSetter.vue";


const templateStore = useTemplateStore();


export default defineComponent({
  name: "SourceDataCategories",
  data() {
    return {
      categories: [],
      persistent: false,
      dataText: "",
      tooltip: "",
      select: "",
      options: [],
      stockedIndexes: [],
      isEdited: false,
      JSONData: null,
    };
  },
  methods: {

    // ouvre la modale d'ajout de données
    openAddModal() {
      this.persistent = true;
      this.isEdited = false;

      //  rénitialisation à zéro pour éviter d'afficher les données si ajout de données après modification de données

      this.dataText = "";
      this.tooltip = "";
      this.select = "";
    },

    // ajoute la donnée 
    addData() {
      let selectedCategory = this.categories.find(
        (category) => category.name == this.select
      );
      selectedCategory.datas.push(new SourceData(this.tooltip, this.dataText));

      this.dataText = "";
      this.tooltip = "";
      this.select = "";
      this.persistent = false;
    },


    saveEdit() {
      this.categories[this.stockedIndexes[0]].datas[
        this.stockedIndexes[1]
      ].text = this.dataText;
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
      this.dataText = event.dataText;
      this.tooltip = event.tooltip;
      this.select = event.select;
      this.stockedIndexes = event.stockedIndexes;
      this.isEdited = event.isEdited;
    },


    toJSON() {
      this.JSONData = JSON.stringify(templateStore.categories, null, 2);
    },
  },

  mounted() {
    this.categories = templateStore.sourceDataTemplate.categories;
    this.categories.forEach((category) => {
      this.options.push(category.text[this.$i18n.locale]);
    });


  },
  components: {
    AxisSetter
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
