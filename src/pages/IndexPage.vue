<template>
  <q-page class="flex flex-center">
    <SourceDataBuilder></SourceDataBuilder>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import SourceDataBuilder from "../components/SourceDataBuilder.vue";

export default defineComponent({
  name: "IndexPage",
  components: { SourceDataBuilder },
});
</script>
