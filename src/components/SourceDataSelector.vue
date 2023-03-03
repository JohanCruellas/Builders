<template>
  <q-card-section>
    <q-form class="form">
      <label class="title">{{ $t('sourceDataSelectorTitle') }}</label>

      <!-- barre de recherche de données sources-->
      <q-btn-dropdown color="primary" :label="$t('sourceDataSelect')">
        <div
          v-for="(category, categoryIndex) in categories"
          :key="categoryIndex"
        >
          <!-- checkbox pour la sélection des catégories à filtrer -->
          <q-checkbox
            v-model="checkedCategories"
            :val="category.name"
            :label="category.text[$i18n.locale]"
          ></q-checkbox>
        </div>
      </q-btn-dropdown>

      <q-input :label="$t('sourceDataSearchInput')" v-model="dataName"></q-input>

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
      categories: templateStore.sourceDataTemplate.categories,
      checkedCategories: [],
      dataName: "",
      dataOptions: [],
      selectedData: [],
      indicatorData: [],
      modal: false,
      dataProp: '',
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
            category: category.text,
            data_key: data.data_key,
          });
          // éviter de push valeur déjà présente dans dataOptions

          this.dataOptions = [...new Set(this.dataOptions)];
        });
      });
    },

    // créé un nouveau tableau qui concatène les données sources et ce qui est entré dans la formule de calcul
    getSelectedDatas(index) {
      this.selectedData.push(this.filteredDatas[index].data_key);
      this.indicatorData.push(this.filteredDatas[index].data_key);
      this.indicatorData = [...new Set(this.indicatorData)];
      this.$emit("selectedData", this.selectedData);
      this.selectedData = [];
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
