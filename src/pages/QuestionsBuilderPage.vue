<template>
    <q-page class="flex flex-center content-start">
      <AxisSetter></AxisSetter>
    </q-page>
  </template>

<script>
import AxisSetter from "src/components/AxisSetter.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "QuestionBuilderPage",
  components: { AxisSetter },
});
</script>