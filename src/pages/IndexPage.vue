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

export default defineComponent({
  name: "IndexPage",
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
});
</script>
