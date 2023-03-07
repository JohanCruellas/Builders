<template>
    <q-page class="flex flex-center">
      <IndicatorBuilder></IndicatorBuilder>
      
    </q-page>
  </template>
  
  <script>
  
  import IndicatorBuilder from "src/components/IndicatorBuilder.vue";
 
  
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "IndicatorBuilderPage",
    components: {
      // SourceDataCategories,
      // AxisSetter,
      IndicatorBuilder,

    },
  });
  </script>
  