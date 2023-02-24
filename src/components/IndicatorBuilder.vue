<template>
  <div class="flex justify-evenly" style="width: 100vw">
    <q-card v-if="isShown" class="addIndicatorModal">
      <q-card-section>
        <q-form class="form">
          <label class="title">Sélection d'une donnée source</label>

          <!-- barre de recherche de données sources-->
          <q-btn-dropdown color="primary" label="Catégories">
            <div
              v-for="(category, categoryIndex) in categories"
              :key="categoryIndex"
            >
              <!-- checkbox pour la sélection des catégories à filtrer -->
              <q-checkbox
                v-model="checkedCategories"
                :val="category.name"
                :label="category.name"
              ></q-checkbox>
            </div>
          </q-btn-dropdown>

          <q-input label="Recherche de données" v-model="dataName"></q-input>

          <q-scroll-area class="scroll">
            <q-list
              v-for="(data, dataIndex) in filteredDatas"
              :key="dataIndex"
              bordered
              separator
              class="data"
            >
              <q-item clickable @click="getSelectedDatas(dataIndex)">
                <q-item-section>
                  <q-item-label>{{ data.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-form class="form">
          <label class="title" v-if="isModified">Modifier un indicateur</label>
          <label class="title" v-else>Ajout d'un indicateur</label>
          <q-input
            label="Nom de l'indicateur"
            v-model="indicatorName"
          ></q-input>
          <q-select
            label="Type de données"
            v-model="indicatorType"
            :options="indicatorOptions"
            option-value="type"
            option-label="name"
          ></q-select>
          <q-input label="Formule de calcul" v-model="formula"></q-input>

          <q-btn
            label="Modifier"
            type="submit"
            color="primary"
            @click="modifyIndicator(indicatorIndex)"
            v-if="isModified"
          ></q-btn>
          <q-btn
            label="Enregistrer"
            type="submit"
            color="primary"
            @click="addIndicator"
            v-else
          ></q-btn>
        </q-form>
      </q-card-section>

      <q-card-actions class="justify-end">
        <q-btn flat label="Retour" float-right @click="this.isShown = false" />
      </q-card-actions>
    </q-card>

    <q-card class="indicatorBuilderWrapper">
      <label class="title q-my-md">Liste des indicateurs</label>
      <!-- <q-card class="card">
        <q-tabs
          v-for="(category, categoryIndex) in categories"
          :key="categoryIndex"
          v-model="tab"
          dense
          class="text-grey tabs"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab style="width: 100%">{{ category.name }}</q-tab>
        </q-tabs>
      </q-card> -->
      <q-scroll-area class="indicatorScroll">
        <q-list class="indicatorList">
        <q-item
          v-for="(indicator, indicatorIndex) in indicators"
          :key="indicatorIndex"
        >
          <q-item-section class="q-mr-md">{{ indicator.text }}</q-item-section>
          <q-item-section avatar>
            <q-icon
              name="settings"
              class="cursor-pointer"
              @click="openModifyIndicatorModal(indicatorIndex)"
            ></q-icon>
          </q-item-section>
          <q-item-section avatar>
            <q-icon
              name="close"
              class="cursor-pointer"
              @click="removeIndicator(indicatorIndex)"
            ></q-icon>
          </q-item-section>
        </q-item>
      </q-list>
      </q-scroll-area>
      <q-btn
          label="Ajouter un indicateur"
          color="primary"
          @click="openAddIndicatorModal"
          class="q-mt-lg"
        ></q-btn>
      
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useTemplateStore } from "src/stores/templateStore";
const templateStore = useTemplateStore();

export default defineComponent({
  name: "IndicatorBuilder",
  data() {
    return {
      categories: templateStore.templateDataSource.categories,
      indicators: templateStore.templateIndicators.indicators,
      checkedCategories: [],
      isEdited: false,
      formula: [],
      dataName: "",
      dataOptions: [],
      indicatorName: "",
      indicatorType: "",
      indicatorDataKeys: [],
      indicatorOptions: [
        { type: "percent", name: "Pourcentage" },
        { type: "compare", name: "Ratio" },
      ],
      indicatorIndex: "",
      selectedData: [],
      isShown: false,
      isModified: false,
      // tab: "",
    };
  },
  methods: {
    // affiche dans une liste toutes les données sources déjà stockées
    getAllData() {
      this.categories.forEach((category) => {
        let categoryDatas = category.datas;
        categoryDatas.forEach((data) => {
          this.dataOptions.push({
            label: data.text,
            category: category.name,
            data_key: data.data_key,
          });

          // éviter de push valeur déjà présente dans dataOptions

          this.dataOptions = [...new Set(this.dataOptions)];
        });
      });
    },

    // créé un nouveau tableau qui concatène les données sources et ce qui est entré dans la formule de calcul
    getSelectedDatas(dataIndex) {
      this.selectedData.push(this.filteredDatas[dataIndex].data_key);
      this.indicatorDataKeys.push(this.filteredDatas[dataIndex].data_key);
      this.indicatorDataKeys = [...new Set(this.indicatorDataKeys)];

      console.log(this.formula)

      let newFormulaArray = this.formula.concat(this.selectedData);
      this.selectedData = [];
      this.formula = newFormulaArray;
    },

    // ajoute un nouvel indicateur
    addIndicator() {
      if (this.indicatorType.type == "percent") {
        this.indicators.push({
          indicator_key: "",
          text: this.indicatorName,
          type: this.indicatorType.type,
          formula: this.formula,
          data_keys: Object.values(this.indicatorDataKeys),
        });
      } else {
        this.indicators.push({
          indicator_key: "",
          text: this.indicatorName,
          type: this.indicatorType.type,
          data_keys: Object.values(this.indicatorDataKeys),
        });
      }
    },

    openAddIndicatorModal() {
      this.persistent = true;
      this.isEdited = false;
      this.isShown = true;

      this.indicatorName = "";
      this.indicatorType = "";
      this.formula = "";
    },

    removeIndicator(index) {
      this.indicators.splice(index, 1);
    },

    openModifyIndicatorModal(index) {
      this.isShown = true;
      this.isModified = true;
      this.indicatorIndex = index;

      this.indicatorName = this.indicators[index].text;
      this.indicatorType = this.indicators[index].type;
      this.formula = this.indicators[index].formula;
    },

    modifyIndicator(index) {
      this.indicators[index].text = this.indicatorName;
      this.indicators[index].type = this.indicatorType;
      this.indicators[index].formula = this.formula;

      this.isModified = false;
    },
  },
  mounted() {
    this.getAllData();
  },
  computed: {
    // computed qui gère les cas si l'utilisateur filtre par catégorie et/ou tapant une string pour chercher une donnée en particulier

    filteredDatas() {
      if (this.checkedCategories.length === 0) {
        if (this.dataName === "") {
          return this.dataOptions;
        } else {
          return this.dataOptions.filter((element) =>
            element.label.toLowerCase().includes(this.dataName.toLowerCase())
          );
        }
      } else {
        return this.dataOptions.filter(
          (element) =>
            element.label.toLowerCase().includes(this.dataName.toLowerCase()) &&
            this.checkedCategories.some(
              (category) => category === element.category
            )
        );
      }
    },

    selectedDatas() {
      this.getSelectedDatas();
      return this.selectedData;
    },
  },
});
</script>

<style lang="scss" scoped>
.form,
.indicatorList {
  display: flex;
  flex-direction: column;
  row-gap: 2em;
  padding: 1em;
  background-color: white;
}

.indicatorScroll {
  flex-grow: 1;
}

.indicatorList {
  width: 90%;
  margin: 1em auto;
}

.title {
  text-align: center;
  font-size: 2em;
}

.scroll {
  height: 10vh;
}

.data:nth-child(even),
.tabs:nth-child(even) {
  background-color: aliceblue;
}

.card {
  width: 50vw;
  display: flex;
  flex-wrap: wrap;
}

.tabs {
  flex-grow: 1;
}

.data:nth-child(odd) {
  background-color: rgb(240, 247, 183);
}

.tabs:nth-child(odd) {
  background-color: rgb(224, 232, 240);
}

.addIndicatorModal,
.indicatorBuilderWrapper {
  width: 45%;
}

.indicatorBuilderWrapper {
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  background-color: beige;
  height: 70vh;
  padding: 1em;
}

.addIndicatorModal {
  background-color: beige;
}
</style>
