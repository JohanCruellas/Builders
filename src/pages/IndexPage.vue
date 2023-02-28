<template>
  <q-page class="flex flex-center">
    <q-btn @click="goRoute('SourceData')">SourceData Builder</q-btn>
    <q-btn @click="goRoute('Question')">Question Builder</q-btn>
    <q-btn @click="goRoute('Indicator')">Indicator Builder</q-btn>
    <q-btn @click="goRoute('Document')">Document Builder</q-btn>
  </q-page>
</template>

<script>

// import IndicatorBuilder from "src/components/IndicatorBuilder.vue";

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
    // IndicatorBuilder,
  },
  methods: {
    goRoute(route) {
      switch (route) {
        case 'SourceData':
          this.$router.push("DataSource")
          break;
        case 'Question':
          this.$router.push("Question")
          break;
        case 'Indicator':
          this.$router.push("Indicator")
          break;
        case 'Document':
          this.$router.push("Document")
          break;
      }
    }
  }
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