<template>
  <q-page class="flex flex-center">
    <!-- <SourceDataCategories></SourceDataCategories> -->
    <IndicatorBuilder></IndicatorBuilder>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import SourceDataCategories from "../components/SourceDataCategories.vue";
import IndicatorBuilder from "src/components/IndicatorBuilder.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    // SourceDataCategories,
    IndicatorBuilder,
  },
});
</script>
