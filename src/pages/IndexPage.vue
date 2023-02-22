<template>
  <q-page class="flex flex-center">
    <!-- <SourceDataBuilder></SourceDataBuilder> -->
    <QuestionBuilder></QuestionBuilder>
  </q-page>
</template>

<script>
import QuestionBuilder from "src/components/QuestionBuilder.vue";
import { defineComponent } from "vue";
import SourceDataCategories from "../components/SourceDataCategories.vue";

export default defineComponent({
  name: "IndexPage",
  components: { QuestionBuilder },
});
</script>
