<template>
  <q-page class="flex flex-center">
    <SourceDataCategories></SourceDataCategories>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import SourceDataCategories from "../components/SourceDataCategories.vue";

export default defineComponent({
  name: "IndexPage",
  components: { SourceDataCategories },
});
</script>
