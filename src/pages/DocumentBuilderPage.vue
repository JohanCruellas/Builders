<template>
    <q-page class="flex flex-center">
      <!-- <SourceDataBuilder></SourceDataBuilder> -->
      <!-- <QuestionBuilder></QuestionBuilder> -->
      <!-- <AxisSetter></AxisSetter> -->
      <DocumentBuilder></DocumentBuilder>
    </q-page>
  </template>
  
  <script>
  import DocumentBuilder from "src/components/DocumentBuilder.vue";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "DocumentBuilderPage",
    components: { DocumentBuilder },
  });
  </script>
  