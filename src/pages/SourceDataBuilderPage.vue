<template>
    <q-page class="flex flex-center">
      <SourceDataCategories></SourceDataCategories>
    </q-page>
  </template>
  
  <script>
  import SourceDataBuilder from "src/components/SourceDataBuilder.vue";
import SourceDataCategories from "src/components/SourceDataCategories.vue";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "SourceDataBuilderPage",
    components: { SourceDataCategories },
  });
  </script>
  