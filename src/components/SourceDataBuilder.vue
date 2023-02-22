<template>
  <q-list>
    <q-item v-for="(data, dataIndex) in categoryDatas" :key="dataIndex" style="width:100%">
        <q-item-section class="q-mr-md ">{{ data.text }}</q-item-section>
        <q-item-section avatar nowrap>
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
      categoryDatas: templateStore.categories[this.categoryIndexProp].datas,
      categoryName: templateStore.categories[this.categoryIndexProp].name,
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
        dataName: this.categoryDatas[dataIndex].text,
        tooltip: this.categoryDatas[dataIndex].info,
        select: this.categoryName,
        stockedIndexes: [categoryIndex, dataIndex],
      };

      this.$emit("currentDatasSettings", currentDatasSettings);
    },
  },
});
</script>
