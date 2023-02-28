<template>
  <q-page class="flex flex-center">
    <q-select
      v-model="lang"
      :options="langOptions"
      label="Quasar Language"
      filled
      dense
      borderless
      emit-value
      map-options
      options-dense
      style="min-width: 150px"
      class="language fixed-right"
    />
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
// import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      lang: this.$i18n.locale,
      langOptions: [
        { value: "enUS", label: "English" },
        { value: "frFR", label: "Français" },
      ],
    };
  },
  components: {
    // SourceDataCategories,
    // QuestionCategories,
    IndicatorBuilder,
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang;
    },
  },
});
</script>

<style scoped>
.language {
  margin: 1em
}
</style>