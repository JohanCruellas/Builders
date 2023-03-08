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
      categoryDatas: this.stakeData,
    };
  },
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
  // mounted() {
  //   this.sourceData.push(templateStore.sourceDataTemplate.filter((dataSource) => {dataSource.stakeId === this.stakeId}))
  // }
});
</script>
