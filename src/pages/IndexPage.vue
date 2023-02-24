<template>
  <q-page class="flex flex-center">
    <!-- <SourceDataCategories></SourceDataCategories> -->
    <!-- <QuestionBuilder></QuestionBuilder> -->
    <!-- <QuestionCategories></QuestionCategories> -->
    <IndicatorBuilder></IndicatorBuilder>
  </q-page>
</template>

<script>
import QuestionBuilder from "src/components/QuestionBuilder.vue";
import SourceDataCategories from "../components/SourceDataCategories.vue";
import IndicatorBuilder from "src/components/IndicatorBuilder.vue";
import QuestionCategories from "src/components/QuestionCategories.vue";
import DocumentBuilder from "src/components/DocumentBuilder.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    // SourceDataCategories,
    // QuestionCategories,
    IndicatorBuilder,
  },
});
</script>
