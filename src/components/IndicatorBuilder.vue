<template>

<!-- <q-layout view="hHh lpR fFf"> -->

<!-- <q-header elevated class="bg-primary text-white" height-hint="98">
  <q-toolbar>
    <q-btn dense flat round icon="menu" @click="left = !left" />

    <q-toolbar-title>
      
    </q-toolbar-title>
  </q-toolbar>

  <q-tabs align="left">
    <q-route-tab to="/page1" label="Page One" />
    <q-route-tab to="/page2" label="Page Two" />
    <q-route-tab to="/page3" label="Page Three" />
  </q-tabs>
</q-header>

<q-drawer show-if-above v-model="left" side="left" bordered>

</q-drawer> -->

<q-page-container>
  <router-view />
</q-page-container>

<!-- </q-layout> -->
  
  <div class="flex justify-evenly indicatorBuilderPage" style="width: 100vw">
    <q-card v-if="isShown" class="addIndicatorModal">
      <SourceDataSelector @selectedData="updateFormula"></SourceDataSelector>

      <q-card-section>
        <q-form class="form">
          <label class="title" v-if="isModified">{{
            $t("indicatorModifyTitle")
          }}</label>
          <label class="title" v-else>{{ $t("indicatorAddTitle") }}</label>
          <q-input
            :label="$t('indicatorNameInput')"
            v-model="indicatorName"
          ></q-input>
          <q-select
            :label="$t('indicatorTypeInput')"
            v-model="indicatorType"
            :options="indicatorOptions"
            option-value="type"
            option-label="name"
          ></q-select>
          <q-input
            :label="$t('indicatorFormulaInput')"
            v-model="formula"
          ></q-input>

          <q-btn
            :label="$t('indicatorModifyBtn')"
            type="submit"
            color="primary"
            @click="modifyIndicator(indicatorIndex)"
            v-if="isModified"
          ></q-btn>
          <q-btn
            :label="$t('indicatorSaveBtn')"
            type="submit"
            color="primary"
            @click="addIndicator"
            v-else
          ></q-btn>
        </q-form>
      </q-card-section>

      <q-card-actions class="justify-end">
        <q-btn
          flat
          :label="$t('indicatorReturnBtn')"
          float-right
          @click="this.isShown = false"
        />
      </q-card-actions>
    </q-card>

    <q-card class="indicatorBuilderWrapper">
      <label class="title q-my-md">{{ $t("indicatorListTitle") }}</label>
      <q-card class="card categoryTabs">
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
          <q-tab>{{ category.name }}</q-tab>
        </q-tabs>
      </q-card>
      <q-scroll-area class="indicatorScroll">
        <q-input
          :label="$t('indicatorInput')"
          v-model="indicatorInput"
          filled
        ></q-input>
        <q-list class="indicatorList">
          <q-item
            v-for="(indicator, indicatorIndex) in filteredIndicators"
            :key="indicatorIndex"
          >
            <q-item-section class="q-mr-md">{{
              indicator.text[getLocalLanguage]
            }}</q-item-section>
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
        :label="$t('indicatorAddButton')"
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
import SourceDataSelector from "./SourceDataSelector.vue";

const templateStore = useTemplateStore();

export default defineComponent({
  name: "IndicatorBuilder",
  data() {
    return {
      categories: templateStore.templateDataSource.categories,
      indicators: templateStore.templateIndicators.indicators,
      isEdited: false,
      formula: [],
      dataOptions: [],
      indicatorInput: "",
      indicatorName: "",
      indicatorType: "",
      indicatorDataKeys: [],
      indicatorOptions: [
        { type: "percent", name: "Pourcentage" },
        { type: "ratio", name: "Ratio" },
        { type: "calcul", name: "Autre" }, // noms placeholder pour les valeurs type salaire médian
      ],
      indicatorIndex: "",
      isShown: false,
      isModified: false,
      lang: "",
      currentIndicatorIndex: "",
      tab: "",
      left: false
    };
  },
  methods: {
    // ajoute un nouvel indicateur
    addIndicator() {

      this.indicators.push({
        indicator_key: "",
        text: {[this.getLocalLanguage]: this.indicatorName},
        type: this.indicatorType.type,
        formula: this.formula,
        data_keys: Object.values(this.indicatorDataKeys),
      });

      console.log(this.indicators);
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

      this.currentIndicatorIndex = index;
      
      this.indicatorName = this.indicators[index].text[this.getLocalLanguage];

      this.indicatorType = this.indicators[index].type;

      this.formula = this.indicators[index].formula;
    },

    modifyIndicator(index) {
      this.indicators[index].text[this.getLocalLanguage] = this.indicatorName;
      this.indicators[index].type = this.indicatorType;
      this.indicators[index].formula = this.formula;

      this.isModified = false;
      this.isShown = false;
    },

    updateFormula(event) {
      let newFormulaArray = this.formula.concat(event);
      this.formula = newFormulaArray;
    },

    getLang() {
      this.lang = this.getLocalLanguage;
    }
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

    filteredIndicators() {
      if (this.indicatorInput === "") {
        return this.indicators;
      } else {
        let filteredIndicators = this.indicators.filter((element) =>
          element.text.toLowerCase().includes(this.indicatorInput.toLowerCase())
        );
        return filteredIndicators;
      }
    },

    selectedDatas() {
      this.getSelectedDatas();
      return this.selectedData;
    },

    // getLocalLanguage() {
    //   return this.$i18n.locale;
    // },
  },
  components: {
    SourceDataSelector,
  },
  watch: {
    getLocalLanguage() {
      if(this.isShown) {
        this.indicatorName = this.indicators[this.currentIndicatorIndex].text[this.$i18n.locale];
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.indicatorBuilderPage {
  align-items: center;
}

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
  margin: 2em auto;
}

.title {
  text-align: center;
  font-size: 2em;
}

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

.tabs:nth-child(odd) {
  background-color: rgb(224, 232, 240);
}

.addIndicatorModal {
  width: 20%;
}


.indicatorBuilderWrapper {
  width: 65%;
}

.indicatorBuilderWrapper {
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  background-color: beige;
  height: 70vh;
  padding: 1em;
  row-gap: 1em;
}

.addIndicatorModal {
  background-color: beige;
}

.categoryTabs {
  margin: 0 auto;
}
</style>
