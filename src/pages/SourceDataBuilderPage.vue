<template>
  <AxisSetter @current-datas-settings="showDataSettings"></AxisSetter>
  <div style="width: 100%" class="flex flex-center q-ma-md">
    <q-btn :label="$t('sourceDataAddButton')" @click="openAddModal()" class="q-ma-md" />
  </div>
  <!-- modale qui s'ouvre quand icone du compo SourceDataBuilder est cliquée -->
  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width: 100%">
      <q-card-section>
        <q-form class="form">
          <q-input v-model="dataText" :label="$t('sourceDataNameInput')">
            <template v-slot:after>
              <q-icon v-if="isEdited" name="translate" class="cursor-pointer" @click="
                this.$openModal({
                  index: this.currentIndicatorIndex,
                  axisIndex: this.axisIndex,
                  info: this.tooltip,
                  type: 'sourceData',
                  input: 'text',
                })">
              </q-icon>
            </template>
          </q-input>
          <q-input v-model="tooltip" :label="$t('sourceDataTooltipInput')">
            <template v-slot:after>
              <q-icon v-if="isEdited" name="translate" class="cursor-pointer" @click="
                this.$openModal({
                  index: this.currentIndicatorIndex,
                  axisIndex: this.axisIndex,
                  info: this.tooltip,
                  type: 'sourceData',
                  input: 'tooltip',
                })
              "></q-icon>
            </template></q-input>
          <q-select v-model="selectCategory" :label="$t('sourceDataCategorySelect')" :options="categoryOptions"
            @update:model-value="isSelected = false"></q-select>
          <q-select :disable="isSelected" v-model="selectStake" :label="$t('sourceDataStakeSelect')"
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
  </q-dialog>
  <TranslateModal></TranslateModal>
</template>

<script>
import { defineComponent } from "vue";
import { useTemplateStore } from "src/stores/templateStore";
import { SourceData } from "src/classes/source_data";
import AxisSetter from "src/components/AxisSetter.vue";
import TranslateModal from "src/components/TranslateModal.vue";



const templateStore = useTemplateStore();


export default defineComponent({
  name: "SourceDataCategories",
  emits: ['currentDatasSettings'],
  data() {
    return {
      categories: templateStore.sourceDataTemplate.categories,
      persistent: false,
      dataText: "",
      tooltip: "",
      selectCategory: "",
      selectStake: "",
      isSelected: true,
      axisIndex: '',
      currentIndicatorIndex: '',
      stockedIndexes: [],
      isEdited: false, // = isModified
      JSONData: null,
    };
  },
  computed: {
    categoryOptions() {
      let array = [];
      this.categories.forEach((category) => {
        array.push(category.text[this.$i18n.locale]);
      });
      return array
    },

    stakeOptions() {
      let array = [];

      let category = this.categories.find((category) => {
        return category.text[this.$store.lang] == this.selectCategory;
      })

      if (category) {
        category.children.forEach((stake) => {
          array.push(stake.text[this.$i18n.locale]);
        });
      }
      return array
    }
  },
  methods: {


    // ouvre la modale d'ajout de données
    openAddModal() {
      this.persistent = true;
      this.isEdited = false;

      //  rénitialisation à zéro pour éviter d'afficher les données si ajout de données après modification de données

      this.dataText = "";
      this.tooltip = "";
      this.selectCategory = "";
    },

    // ajoute la donnée 
    addData() {
      let selectedCategory = this.categories.find(
        (category) => category.text[this.$store.lang] == this.selectCategory
      );
   
      let test = selectedCategory.children.find(child => child.text[this.$store.lang] == this.selectStake);
      console.log(test)
      test.children.push(new SourceData(this.tooltip, this.dataText));

      this.dataText = "";
      this.tooltip = "";
      this.selectCategory = "";
      this.persistent = false;
    },


    saveEdit() {
      this.categories[this.stockedIndexes[0]].children[
        this.stockedIndexes[1]
      ].text = this.dataText;
      this.categories[this.stockedIndexes[0]].children[
        this.stockedIndexes[1]
      ].info = this.tooltip;

      if (this.select !== this.categories[this.stockedIndexes[0]].name) {
        let selectedItem = this.categories[this.stockedIndexes[0]].children.splice(
          this.stockedIndexes[1],
          1
        )[0];

        this.categories
          .find((category) => category.name == this.select)
          .children.push(selectedItem);
        console.log(this.categories);
      }

      this.persistent = false;
    },


    showDataSettings(event) {
      this.persistent = event.persistent;
      this.dataText = event.dataText;
      this.tooltip = event.tooltip;
      this.select = event.select;
      this.isEdited = event.isEdited;
      this.currentIndicatorIndex = event.index;
      this.axisIndex = event.axisIndex;
    },
  },

  // mounted() {
  //   this.categories.forEach((category) => {
  //     this.options.push(category.text[this.$i18n.locale]);
  //   });


  // },
  components: {
    AxisSetter,
    TranslateModal
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
}</style>
