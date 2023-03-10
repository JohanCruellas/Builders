<template>
  <q-page class="flex flex-center">
    <label class="title q-my-md">{{ $t("indicatorListTitle") }}</label>
    <AxisSetter new-emit=""></AxisSetter>
    <div style="width: 100%" class="flex flex-center q-ma-md">
      <q-btn :label="$t('indicatorAddButton')" color="primary" @click="openAddIndicatorModal" class="q-mt-lg"></q-btn>
    </div>
  </q-page>

  <!-- modale qui s'ouvre quand icone settings du compo SourceDataBuilder est cliquée -->
  <!-- <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width: 100%">
      <q-card-section>
        <q-form class="form">
          <q-input v-model="dataText" :label="$t('sourceDataNameInput')">
            <template v-slot:after>
              <q-icon v-if="isEdited" name="translate" class="cursor-pointer" @click="
                this.$openModal({
                  key: this.currentKey,
                  type: 'sourceData',
                  input: 'text',
                })">
              </q-icon>
            </template>
          </q-input>
          <q-input v-model="dataTooltip" :label="$t('sourceDataTooltipInput')">
            <template v-slot:after>
              <q-icon v-if="isEdited" name="translate" class="cursor-pointer" @click="
                this.$openModal({
                  key: this.currentKey,
                  tooltip: this.dataTooltip,
                  type: 'sourceData',
                  input: 'tooltip',
                })
              "></q-icon>
            </template></q-input>
          <q-select v-model="pickedCategory" :label="$t('sourceDataCategorySelect')" :options="categoryOptions"
            @update:model-value="isDisabled = false"></q-select>
          <q-select :disable="isDisabled" v-model="pickedStake" :label="$t('sourceDataStakeSelect')"
            :options="stakeOptions"></q-select>
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
  </q-dialog> -->


  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width: 100%">
      <q-card-section>
        <SourceDataSelector @selectedData="updateFormula"></SourceDataSelector>
      </q-card-section>

      <!-- formulaire Ajouter un indicateur -->
      <q-card-section>
        <q-form class="form">
          <label class="title" v-if="isModified">{{
            $t("indicatorModifyTitle")
          }}</label>
          <label class="title" v-else>{{ $t("indicatorAddTitle") }}</label>
          <q-input :label="$t('indicatorNameInput')" v-model="indicatorText">
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
          <q-select :label="$t('indicatorCategoryInput')" v-model="pickedCategory" :options="categoryOptions"
            @update:model-value="isDisabled = false"></q-select>
          <q-select :label="$t('indicatorStakeInput')" v-model="pickedStake" :options="stakeOptions"
            :disable="isDisabled"></q-select>
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
        <q-btn flat :label="$t('closeBtn')" v-close-popup float-right />
      </q-card-actions>
    </q-card>
  </q-dialog>


  <!-- <q-card v-if="isShown" class="addIndicatorModal">
    <SourceDataSelector @selectedData="updateFormula"></SourceDataSelector>

    <q-card-section>
      <q-form class="form">
        <label class="title" v-if="isModified">{{
          $t("indicatorModifyTitle")
        }}</label>
        <label class="title" v-else>{{ $t("indicatorAddTitle") }}</label>
        <q-input :label="$t('indicatorNameInput')" v-model="indicatorText">
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
  <TranslateModal></TranslateModal>
</template>
  
<script>
import { defineComponent } from "vue";
import AxisSetter from "src/components/AxisSetter.vue";
import TranslateModal from "src/components/TranslateModal.vue";
import { useTemplateStore } from "src/stores/templateStore";
import SourceDataSelector from "src/components/SourceDataSelector.vue";
import { Indicator } from "src/classes/indicator";

const templateStore = useTemplateStore();


export default defineComponent({
  name: "IndicatorBuilderPage",
  emits: ['newEmit'],
  data() {
    return {
      categories: templateStore.axisTemplate.categories,
      currentCategory: null,
      currentStake: null,
      currentKey: '',
      persistent: false,
      indicatorText: "",
      indicatorTooltip: "",
      pickedCategory: null,
      pickedStake: null,
      isDisabled: true,
      // isEdited: false,


      formula: [],
      dataOptions: [],
      indicatorInput: "",
      indicatorType: "",
      indicatorDataKeys: [],
      indicatorOptions: [
        this.$t("percent"),
        this.$t("ratio"),
        this.$t("rawValue"),
        this.$t("sourceData"),
      ],


      indicatorIndex: "",
      isShown: false,
      isModified: false,
      lang: "",
      currentIndicatorIndex: "",
      // tab: "",
      left: false,
      modal: false,
      dataProp: "",
    }
  },
  components: {
    // SourceDataCategories,
    AxisSetter,
    TranslateModal,
    SourceDataSelector,
    // IndicatorBuilder,

  },
  computed: {
    indicators() {
      return templateStore.indicatorsTemplate;
    },

    categoryOptions() {
      let array = [];
      this.categories.forEach((category) => {
        array.push({ label: category.label[this.$store.lang], value: category.id });
      });

      return array
    },

    stakeOptions() {
      let array = [];
      if (this.pickedCategory !== null) {
        let category = this.categories.find((category) => {
          return category.id == this.pickedCategory.value;
        })

        if (category) {
        category.stakes.forEach((stake) => {
          array.push({ label: stake.label[this.$store.lang], value: stake.id });
        });
      }
      }
      
      return array
    },
  },
  methods: {
    openAddIndicatorModal() {
      this.persistent = true;
      this.isEdited = false;
      // this.isShown = true;

      this.indicatorText = "";
      this.indicatorTooltip = "";
      this.indicatorType = "";
      this.formula = "";
      this.pickedCategory = null;
      this.pickedStake = null;
    },

    addIndicator() {
      console.log(this.pickedCategory.value)

      const newIndicator = new Indicator({ [this.$i18n.locale]: this.indicatorText }, { [this.$i18n.locale]: this.indicatorTooltip }, { [this.$i18n.locale]: this.indicatorType }, this.formula, this.pickedCategory.value, this.pickedStake.value);
      templateStore.indicatorsTemplate[newIndicator.indicator_key] = newIndicator;

      // this.indicators.push({
      //   indicator_key: "",
      //   text: { [this.$i18n.locale]: this.indicatorText },
      //   indicatorTooltip: { [this.$i18n.locale]: this.indicatorTooltip },
      //   type: { [this.$i18n.locale]: this.indicatorType },
      //   formula: this.formula,
      //   data_keys: Object.values(this.indicatorDataKeys),
      // });

      this.indicatorText = "";
      this.indicatorTooltip = "";
      this.indicatorType = "";
      this.formula = "";
      this.pickedCategory = null;
      this.pickedStake = null;
    },

    // showDataSettings(event) {
      
    //   this.isModified = event.isEdited;
    //   this.isDisabled = false;
      
    //   let currentCategory = this.categories.find((axis) => axis.id === event.axisId);
    //   let currentStake = currentCategory.stakes.find((stake) => stake.id === event.stakeId);
    //   this.currentKey = event.key;

    //   this.pickedCategory = {label:currentCategory.label[this.$store.lang], value: currentCategory.id};
    //   this.pickedStake = {label: currentStake.label[this.$store.lang], value: currentStake.id};
    //   this.persistent = event.persistent;
    //   this.dataText = event.dataText;
    //   this.dataTooltip = event.dataTooltip;
    // },

    modifyIndicator(index) {
      this.indicators[index].text[this.$i18n.locale] = this.indicatorText;
      this.indicators[index].indicatorTooltip[this.$i18n.locale] = this.indicatorTooltip;
      this.indicators[index].type[this.$i18n.locale] = this.indicatorType;
      this.indicators[index].formula = this.formula;

      this.isModified = false;
      this.isShown = false;
    },

    updateFormula(event) {
      let newFormulaArray = this.formula.concat(Array.from(event));
      this.formula = newFormulaArray;
    },

    log(event) {
      console.log(event);
    },
  }
});
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  row-gap: 2em;
  padding: 1em;
  background-color: white;
}

.title {
  text-align: center;
  font-size: 2em;
}

.scroll {
  height: 10vh;
}

.data:nth-child(even) {
  background-color: aliceblue;
}

.data:nth-child(odd) {
  background-color: rgb(240, 247, 183);
}
</style>
