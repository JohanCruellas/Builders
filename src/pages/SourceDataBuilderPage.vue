<template>
  <AxisSetter @new-emit="showDataSettings"></AxisSetter>
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
                  key: this.currentKey,
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
                  key: this.currentKey,
                  info: this.tooltip,
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
  emits: ['newEmit'],
  data() {
    return {
      categories: templateStore.axisTemplate.categories,
      // sourceDatas: templateStore.sourceDataTemplate,
      currentCategory: null,
      currentStake: null,
      currentKey: '',
      // options: [],
      persistent: false,
      dataText: "",
      tooltip: "",
      pickedCategory: null,
      pickedStake: null,
      isDisabled: true,
      isEdited: false, // = isModified
    };
  },
  computed: {

    sourceDatas() {
      return templateStore.sourceDataTemplate;
    },

    categoryOptions() {
      let array = [];
      this.categories.forEach((category) => {
        array.push({label: category.label[this.$store.lang], value: category.id}); 
      });
      return array
    },

    stakeOptions() {
      let array = [];
      
      let category = this.categories.find((category) => {
        return category.id == this.pickedCategory.value; 
      })

      if (category) {
        category.stakes.forEach((stake) => {
          array.push({label: stake.label[this.$store.lang], value: stake.id}); 
        });
      }
      return array
    },

  },
  methods: {


    // ouvre la modale d'ajout de données
    openAddModal() {
      this.persistent = true;
      this.isEdited = false;

      //  rénitialisation à zéro pour éviter d'afficher les données si ajout de données après modification de données

      this.dataText = "";
      this.tooltip = "";
      this.pickedCategory = "";
      this.pickedStake = "";
    },

    // ajoute la donnée 
    addData() {
      
      const newSourceData = new SourceData({ [this.$i18n.locale]: this.dataText }, { [this.$i18n.locale]: this.tooltip }, this.pickedCategory.value, this.pickedStake.value);
      templateStore.sourceDataTemplate[newSourceData.sourceData_key] = newSourceData;

      this.dataText = "";
      this.tooltip = "";
      this.pickedCategory = "";
      this.pickedStake = "";

    },

    // affiche les données dans le formulaire d'édition
    showDataSettings(event) {
      
      this.isEdited = event.isEdited;
      this.isDisabled = false;
      
      let currentCategory = this.categories.find((axis) => axis.id === event.axisId);
      let currentStake = currentCategory.stakes.find((stake) => stake.id === event.stakeId);
      this.currentKey = event.key;

      this.pickedCategory = {label:currentCategory.label[this.$store.lang], value: currentCategory.id};
      this.pickedStake = {label: currentStake.label[this.$store.lang], value: currentStake.id};
      this.persistent = event.persistent;
      this.dataText = event.dataText;
      this.tooltip = event.tooltip;
    },

    saveEdit() {
      let currentData = this.sourceDatas[this.currentKey]
      currentData.text[this.$store.lang] = this.dataText;
      currentData.info[this.$store.lang] = this.tooltip;
      currentData.axisId = this.pickedCategory.value;
      currentData.stakeId = this.pickedStake.value;
      
      this.persistent = false;
    },
  },

  mounted() {
    // this.sourceDataTemplate.forEach((category) => {
    //   this.options.push(category.label[this.$store.lang]);
    // });
  //   console.log(this.options)
  },
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
