<template>
    <q-page class="flex flex-center">
      <!-- <SourceDataBuilder></SourceDataBuilder> -->
      <!-- <QuestionBuilder></QuestionBuilder> -->
      <!-- <QuestionCategories></QuestionCategories> -->
      <DocumentBuilder></DocumentBuilder>
    </q-page>
  </template>
  
  <script>
  import QuestionBuilder from "src/components/QuestionBuilder.vue";
  import SourceDataCategories from "../components/SourceDataCategories.vue";
  import QuestionCategories from "src/components/QuestionCategories.vue";
  import DocumentBuilder from "src/components/DocumentBuilder.vue";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "IndexPage",
    components: { DocumentBuilder },
  });
  </script>
  