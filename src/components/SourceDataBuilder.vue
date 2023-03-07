<template>
  <q-list>
    <q-item v-for="(data, dataIndex) in categoryDatas" :key="dataIndex" style="width:100%">
        <q-item-section class="q-mr-md ">{{ $getTrad(data.text, $i18n.locale) }}</q-item-section>
        <q-item-section avatar>
          <q-icon
          name="settings"
          class="cursor-pointer"
          @click="openUpdateModal(data, dataIndex)"
        ></q-icon>
        </q-item-section>
        <q-item-section avatar>
          <q-icon
          name="close"
          class="cursor-pointer"
          @click="removeData(dataIndex)"
        ></q-icon>
        </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent } from "vue";
import { useTemplateStore } from "src/stores/templateStore";
const templateStore = useTemplateStore();


export default defineComponent({
  name: "sourceDataBuilder",
  props: ['stakeData'],
  data() {
    return {
      // categoryDatas: templateStore.sourceDataTemplate.categories[this.categoryIndexProp].datas,
      // categoryText: templateStore.sourceDataTemplate.categories[this.categoryIndexProp].text,
      categoryDatas: [
              {
                data_key: "data_key_3",

                info: {
                  frFR: "test",
                  enUS: "test",
                },
                text: {
                  frFR: "Effectif total ",
                  enUS: "Total headcount",
                },
              },
              {
                data_key: "data_key_4",

                info: "",
                text: {
                  frFR: "CDI",
                  enUS: "Permanent contract",
                },
              },
              {
                data_key: "data_key_5",

                info: "",
                text: {
                  frFR: "Nombre d'Accidents du travail",
                  enUS: "Number of work-related accidents",
                },
              },
              {
                data_key: "data_key_6",

                info: "",
                text: {
                  frFR: "Chiffre d'affaires",
                  enUS: "Turnover",
                },
              },
            ]
    };
  },
  // emits: ['currentDatasSettings'],
    // setup(props, context) {
    //     context.emit('currentDatasSettings')
    // },
  methods: {
    removeData(dataIndex) {
      this.categoryDatas.splice(dataIndex, 1);
    },
    openUpdateModal(data,dataIndex) {
      let currentDatasSettings =
      {
        persistent: true,
        isEdited: true,
        dataText: data.text[this.$i18n.locale],
        tooltip: data.info[this.$i18n.locale],
        axisIndex: 4, // mockup data, récuprer l'index de l'axe depuis prop stake-data
        index: dataIndex,
      };
      this.$emit("currentDatasSettings", currentDatasSettings);
    },
  },
  watch: {
    stakeData() {
      console.log(this.stakeData)
    }
  },

});
</script>
