<template>
    <q-page class="flex flex-center">
      <AxisBuilder></AxisBuilder>
    </q-page>
  </template>
  
  <script>

  import AxisBuilder from "src/components/AxisBuilder.vue";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "AxisBuilderPage",
    components: { AxisBuilder },
  });
  </script>
  