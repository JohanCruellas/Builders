<template>
    <q-page class="flex flex-center content-start">
      <QuestionCategories></QuestionCategories>
    </q-page>
  </template>

<script>
import QuestionCategories from "src/components/QuestionCategories.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "QuestionBuilderPage",
  components: { QuestionCategories },
});
</script>