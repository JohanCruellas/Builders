<template>
  <div class="flex justify-evenly indicatorBuilderPage">
    <!-- <q-card v-if="isShown" class="addIndicatorModal">
      <SourceDataSelector @selectedData="updateFormula"></SourceDataSelector>

      <q-card-section>
        <q-form class="form">
          <label class="title" v-if="isModified">{{
            $t("indicatorModifyTitle")
          }}</label>
          <label class="title" v-else>{{ $t("indicatorAddTitle") }}</label>
          <q-input :label="$t('indicatorNameInput')" v-model="indicatorName">
            <template v-slot:after>
              <q-icon v-if="isModified" name="translate" class="cursor-pointer" @click="
                this.$openModal({
                  index: this.currentIndicatorIndex,
                  type: 'indicators',
                  input: 'text',
                })
              "></q-icon>
            </template>
          </q-input>
          <q-input :label="$t('indicatorTooltipInput')" v-model="indicatorTooltip">
            <template v-slot:after>
              <q-icon v-if="isModified" name="translate" class="cursor-pointer" @click="
                this.$openModal({
                  index: this.currentIndicatorIndex,
                  type: 'indicators',
                  input: 'tooltip',
                })
              "></q-icon>
            </template>
          </q-input>
          <q-select :label="$t('indicatorTypeInput')" v-model="indicatorType" :options="indicatorOptions"><template
              v-slot:after>
              <q-icon v-if="isModified" name="translate" class="cursor-pointer" @click="
                this.$openModal({
                  index: this.currentIndicatorIndex,
                  type: 'indicators',
                  input: 'select',
                })
              "></q-icon> </template></q-select>
          <q-input :label="$t('indicatorFormulaInput')" v-model="formula"></q-input>

          <q-btn :label="$t('modifyBtn')" type="submit" color="primary" @click="modifyIndicator(indicatorIndex)"
            v-if="isModified"></q-btn>
          <q-btn :label="$t('saveBtn')" type="submit" color="primary" @click="addIndicator" v-else></q-btn>
        </q-form>
      </q-card-section>

      <q-card-actions class="justify-end">
        <q-btn flat :label="$t('closeBtn')" float-right @click="this.isShown = false" />
      </q-card-actions>
    </q-card> -->

    <!-- <q-card class="indicatorBuilderWrapper"> -->

    <!-- <q-scroll-area class="indicatorScroll">
        <q-input :label="$t('indicatorInput')" v-model="indicatorInput" filled></q-input> -->
    <q-list class="indicatorList">
      <q-item v-for="([indicatorKey, indicatorValue], indicatorIndex) in Object.entries(filteredIndicators)"
        :key="indicatorIndex">
        <q-item-section class="q-mr-md">{{
          $getTrad(indicatorValue.text, $i18n.locale)
        }}</q-item-section>
        <q-item-section avatar>
          <q-icon name="settings" class="cursor-pointer"
            @click="openModifyIndicatorModal(indicatorValue, indicatorKey)"></q-icon>
        </q-item-section>
        <q-item-section avatar>
          <q-icon name="close" class="cursor-pointer" @click="removeIndicator(indicatorKey)"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>
    <!-- </q-scroll-area> -->
    <!-- <q-btn :label="$t('indicatorAddButton')" color="primary" @click="openAddIndicatorModal" class="q-mt-lg"></q-btn> -->
    <!-- </q-card> -->
  </div>

  <!-- <TranslateModal></TranslateModal> -->
</template>

<script>
import { defineComponent } from "vue";
import { useTemplateStore } from "src/stores/templateStore";
// import SourceDataSelector from "./SourceDataSelector.vue";
// import TranslateModal from "src/components/TranslateModal.vue";

const templateStore = useTemplateStore();

export default defineComponent({
  name: "IndicatorBuilder",
  props: ['stakeData'],
  data() {
    return {
      categories: templateStore.sourceDataTemplate.categories,
      indicators: templateStore.indicatorsTemplate,
      // isEdited: false,
      formula: [],
      dataOptions: [],
      indicatorInput: "",
      indicatorName: "",
      indicatorTooltip: "",
      indicatorType: "",
      indicatorDataKeys: [],
      indicatorOptions: [
        this.$t("percent"),
        this.$t("ratio"),
        this.$t("rawValue"),
        this.$t("sourceData"),
      ],

      indicatorIndex: "",
      // isShown: false,
      // isModified: false,
      lang: "",
      // currentIndicatorIndex: "",
      // tab: "",
      left: false,
      modal: false,
      dataProp: "",
    };
  },
  methods: {
    // ajoute un nouvel indicateur
    // addIndicator() {
    //   this.indicators.push({
    //     indicator_key: "",
    //     text: { [this.$i18n.locale]: this.indicatorName },
    //     info: { [this.$i18n.locale]: this.indicatorTooltip },
    //     type: { [this.$i18n.locale]: this.indicatorType },
    //     formula: this.formula,
    //     data_keys: Object.values(this.indicatorDataKeys),
    //   });

    //   this.indicatorName = "";
    //   this.indicatorTooltip = "";
    //   this.indicatorType = "";
    //   this.formula = "";
    // },

    // openAddIndicatorModal() {
    //   this.persistent = true;
    //   this.isEdited = false;
    //   this.isShown = true;

    //   this.indicatorName = "";
    //   this.indicatorTooltip = "";
    //   this.indicatorType = "";
    //   this.formula = "";
    // },

    removeIndicator(key) {
      delete templateStore.indicatorsTemplate[key];
    },

    openModifyIndicatorModal(indicatorValue, indicatorKey) {
      // this.isShown = true;
      // this.isModified = true;
      let currentIndicatorSettings = {
        persistent: true,
        isEdited: true,
        indicatorText: indicatorValue.text[this.$i18n.locale],
        indicatorTooltip: indicatorValue.tooltip[this.$i18n.locale],
        indicatorType: indicatorValue.type[this.$i18n.locale],
        formula: indicatorValue.formula,
        key: indicatorKey,
        axisId: indicatorValue.axisId,
        stakeId: indicatorValue.stakeId,
      }
      this.$emit("currentIndicatorSettings", currentIndicatorSettings);
    },

    // modifyIndicator(index) {
    //   this.indicators[index].text[this.$i18n.locale] = this.indicatorName;
    //   this.indicators[index].info[this.$i18n.locale] = this.indicatorTooltip;
    //   this.indicators[index].type[this.$i18n.locale] = this.indicatorType;
    //   this.indicators[index].formula = this.formula;

    //   this.isModified = false;
    //   this.isShown = false;
    // },

    // updateFormula(event) {
    //   let newFormulaArray = this.formula.concat(Array.from(event));
    //   this.formula = newFormulaArray;
    // },
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
        // TODO: adapter cette computed
        let filteredIndicators = {};
        console.log(this.indicators);
        Object.entries(this.indicators).forEach(([key, object]) => {
          if (object.stakeId === this.stakeData.id) {
            object.text.toLowerCase().includes(this.indicatorInput.toLowerCase())
          }
        })

        // this.indicators.filter((element) =>
        //   element.text.toLowerCase().includes(this.indicatorInput.toLowerCase())
        // );
        return filteredIndicators;
      }
    },

    selectedDatas() {
      this.getSelectedDatas();
      return this.selectedData;
    },
  },
  components: {
    // SourceDataSelector,
    // TranslateModal,
  },
});
</script>

<style lang="scss" scoped>
// .indicatorBuilderPage {
//   align-items: center;
// }

.form,
.indicatorList {
  display: flex;
  flex-direction: column;
  // row-gap: 2em;
  // padding: 1em;
  background-color: white;
}

.indicatorScroll {
  flex-grow: 1;
}

.indicatorList {
  width: 100%;
  // margin: 2em auto;
}

// .title {
//   text-align: center; utilisé globalement dans App.vue
//   font-size: 2em;
// }

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
