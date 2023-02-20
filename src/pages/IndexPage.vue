<template>
  <q-page class="flex flex-center">
    <QuestionBuilder></QuestionBuilder>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import QuestionBuilder from '../components/QuestionBuilder.vue';

export default defineComponent({
    name: "IndexPage",
    components: { QuestionBuilder }
})
</script>
