<template>
  <q-list>
    <q-item v-for="([dataKey, dataValue], dataIndex) in Object.entries(sourceDatas)" :key="dataIndex" style="width:100%">
      <q-item-section class="q-mr-md ">{{ $getTrad(dataValue.text, $i18n.locale) }}</q-item-section>
      <q-item-section avatar>
        <q-icon name="settings" class="cursor-pointer" @click="openUpdateModal(dataValue, dataKey)"></q-icon>
      </q-item-section>
      <q-item-section avatar>
        <q-icon name="close" class="cursor-pointer" @click="removeData(dataKey)"></q-icon>
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

    };
  },
  computed: {
    sourceDatas() {
      let sourceDatasFiltered = {};
      Object.entries(templateStore.sourceDataTemplate).forEach(([key, object]) => {
        if (object.stakeId === this.stakeData.id) {
          sourceDatasFiltered[key] = object;
        }});
        return sourceDatasFiltered 
    }
  },
  methods: {
    removeData(key) {
      delete this.sourceDatas[key];
    },
    openUpdateModal(dataValue, dataKey) {
      
      let currentDatasSettings =
      {
        persistent: true,
        isEdited: true,
        dataText: dataValue.text[this.$i18n.locale],
        axisId: dataValue.axisId,
        stakeId: dataValue.stakeId,
        tooltip: dataValue.info[this.$i18n.locale],
        key: dataKey,
      };
      this.$emit("currentDatasSettings", currentDatasSettings);
    },
  },

});
</script>
