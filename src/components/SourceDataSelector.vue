<template>
  <q-card-section>
    <q-form class="form">
      <label class="title">{{ $t('sourceDataSelectorTitle') }}</label>

      <!-- barre de recherche de données sources-->
      <q-btn-dropdown color="primary" :label="$t('sourceDataCategorySelect')">
        <!-- <div v-for="(category, categoryIndex) in categoryOptions" :key="categoryIndex">
          
          <q-checkbox v-model="checkedCategories" :val="category.id" :label="category.label"></q-checkbox>
        </div> -->

        <q-option-group :options="categoryOptions" type="checkbox" v-model="checkedCategories"
          @update:model-value="pickedDataCategory = true" /> <!-- @update:model-value="log(test)" -->
      </q-btn-dropdown>
      <q-select v-if="pickedDataCategory === true" :options="stakeOptions" v-model="checkedStakes" filled></q-select>

      <q-input :label="$t('sourceDataSearchInput')" v-model="dataName"></q-input>

      <q-scroll-area class="scroll">
        <q-list v-for="(data, dataIndex) in filteredDatas" :key="dataIndex" bordered separator class="data">
          <q-item clickable @click="getSelectedDatas(dataIndex)">
            <q-item-section>
              <q-item-label>{{ $getTrad(data.label, $i18n.locale) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-form>
  </q-card-section>
</template>

<script>
import { defineComponent } from "vue";
import { useTemplateStore } from "src/stores/templateStore";
const templateStore = useTemplateStore();

export default defineComponent({
  name: "IndicatorBuilder",
  data() {
    return {
      categories: templateStore.axisTemplate.categories,
      datas: templateStore.sourceDataTemplate,
      pickedDataCategory: false,
      checkedCategories: [],
      checkedStakes: [],
      dataName: "",
      dataOptions: [],
      selectedData: [],
      indicatorData: [],
      modal: false,
      dataProp: '',

    };
  },
  computed: {

    allDatas() {
      return templateStore.sourceDataTemplate;
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

      this.checkedCategories.forEach((element) => this.categories.forEach(
        (category) => {
          if (category.id == element) {
            category.stakes.forEach((stake) => {
              array.push({ label: stake.label[this.$store.lang], value: stake.id });
            });
          }
        }
      ))
      return array
    },

    // computed qui gère les cas si l'utilisateur filtre par catégorie + enjeu et/ou tapant une string pour chercher une donnée en particulier

    filteredDatas() {
      if (this.checkedCategories.length === 0) {
        if (this.dataName === "") {
          return this.dataOptions;
        } else {
          return this.dataOptions.filter((element) =>
            element.label[this.$store.lang].toLowerCase().includes(this.dataName.toLowerCase())
          );
        }
      } else {
        if (this.checkedStakes.length === 0) {
          return this.dataOptions.filter(
            (element) =>
              element.label[this.$store.lang].toLowerCase().includes(this.dataName.toLowerCase()) &&
              this.checkedCategories.some(
                (category) => category === element.axisId
              )
          );
        } else {
          return this.dataOptions.filter(
            (element) =>
              element.label[this.$store.lang].toLowerCase().includes(this.dataName.toLowerCase()) &&
              this.checkedCategories.some(
                (axis) => axis === element.axisId
              ) && this.checkedStakes.value === element.stakeId
          );
        }
      }
    },

    // selectedDatas() {
    //   this.getSelectedDatas();
    //   return this.selectedData;
    // },
  },
  methods: {
    log(element) {
      console.log(element)
    },
    // affiche dans une liste toutes les données sources déjà stockées
    getAllData() {
      let array = [];
      // console.log(Object.entries(this.datas))
      Object.entries(this.datas).forEach(element => {
        this.dataOptions.push({ value: element[0], label: element[1].text, axisId: element[1].axisId, stakeId: element[1].stakeId })
      });
      return array
      // this.categories.forEach((category) => {
      //   console.log(category)

      //     // this.dataOptions.push({
      //     //   label: data.text,
      //     //   category: category.text,
      //     //   data_key: data.data_key,
      //     // });
      //     // // éviter de push valeur déjà présente dans dataOptions

      //     // this.dataOptions = [...new Set(this.dataOptions)];

      // });
    },

    // créé un nouveau tableau qui concatène les données sources et ce qui est entré dans la formule de calcul
    getSelectedDatas(index) {
 
      this.selectedData.push(this.filteredDatas[index].value);
      this.indicatorData.push(this.filteredDatas[index].value);
      this.indicatorData = [...new Set(this.indicatorData)];
      this.$emit("selectedData", this.selectedData);
      this.selectedData = [];
    },
  },
  mounted() {
    this.getAllData();
  },

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
