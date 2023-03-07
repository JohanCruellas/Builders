<template>
  <q-list>
    <q-item v-for="(data, dataIndex) in categoryDatas" :key="dataIndex" style="width:100%">
        <q-item-section class="q-mr-md ">{{ $getTrad(data.text, $i18n.locale) }}</q-item-section>
        <q-item-section avatar>
          <q-icon
          name="settings"
          class="cursor-pointer"
          @click="openUpdateModal(this.categoryIndexProp, dataIndex)"
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
  props: ["categoryIndexProp"],
  data() {
    return {
      categoryDatas: templateStore.sourceDataTemplate.categories[this.categoryIndexProp].datas,
      categoryText: templateStore.sourceDataTemplate.categories[this.categoryIndexProp].text,
    };
  },
  methods: {
    removeData(dataIndex) {
      this.categoryDatas.splice(dataIndex, 1);
    },
    openUpdateModal(categoryIndex, dataIndex) {
      let currentDatasSettings = {
        persistent: true,
        isEdited: true,
        dataText: this.categoryDatas[dataIndex].text[this.$i18n.locale],
        tooltip: this.categoryDatas[dataIndex].info[this.$i18n.locale],
        select: this.categoryText[this.$i18n.locale],
        stockedIndexes: [categoryIndex, dataIndex],
      };
      this.$parent.$emit("currentDatasSettings", currentDatasSettings);
    },
  },
});
</script>
